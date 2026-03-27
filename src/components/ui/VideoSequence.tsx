'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface VideoSequenceProps {
    frameCount: number;
    basePath: string;
    scrollTarget?: React.RefObject<HTMLElement | null>;
    className?: string;
    fileExtension?: string;
    filePrefix?: string;
    transparent?: boolean;
    frameValue?: MotionValue<number>;
    onFirstFrameReady?: () => void;
}

export default function VideoSequence({
    frameCount,
    basePath,
    scrollTarget,
    className = '',
    fileExtension = 'webp',
    filePrefix = '',
    transparent = false,
    frameValue,
    onFirstFrameReady,
}: VideoSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
    const lastFrameRef = useRef<number>(-1);
    const [firstFrameReady, setFirstFrameReady] = useState(false);
    const [animationReady, setAnimationReady] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);

    const { scrollYProgress } = useScroll({
        target: scrollTarget as any,
        offset: ['start end', 'end start'],
    });

    const internalFrameIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, frameCount - 1]
    );

    const activeFrame = frameValue ?? internalFrameIndex;

    // Intersection Observer — lazy load
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px', threshold: 0 }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    const renderFrame = useCallback((frameNumber: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d', {
            alpha: transparent,
            desynchronized: true,
        });
        if (!context) return;

        const images = imagesRef.current;
        const index = Math.min(Math.max(Math.round(frameNumber), 0), Math.max(images.length - 1, 0));
        if (index === lastFrameRef.current) return;

        const img = images[index];
        // Jeśli klatka jeszcze nie załadowana — zostaw ostatnią wyświetloną
        if (!img || !img.complete || img.naturalWidth === 0) return;

        lastFrameRef.current = index;

        if (canvas.width !== img.width || canvas.height !== img.height) {
            canvas.width = img.width;
            canvas.height = img.height;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
    }, [transparent]);

    // Progresywne ładowanie: klatka 0 → batch 1-9 → reszta w tle
    useEffect(() => {
        if (!shouldLoad) return;

        const loadOne = (index: number): Promise<void> =>
            new Promise((resolve) => {
                const img = new Image();
                const frameNumber = String(index + 1).padStart(4, '0');
                img.src = `${basePath}/${filePrefix}${frameNumber}.${fileExtension}`;
                img.onload = () => { imagesRef.current[index] = img; resolve(); };
                img.onerror = () => resolve();
            });

        const loadImages = async () => {
            imagesRef.current = new Array(frameCount).fill(null);

            // Faza 1: pierwsza klatka — pokaż natychmiast
            await loadOne(0);
            setFirstFrameReady(true);
            onFirstFrameReady?.();

            // Faza 2: pierwsze 10 klatek — animacja może startować
            const FIRST_BATCH = Math.min(10, frameCount);
            await Promise.all(
                Array.from({ length: FIRST_BATCH - 1 }, (_, i) => loadOne(i + 1))
            );
            setAnimationReady(true);

            // Faza 3: reszta w tle — nie blokuje animacji
            await Promise.all(
                Array.from({ length: frameCount - FIRST_BATCH }, (_, i) => loadOne(i + FIRST_BATCH))
            );
        };

        loadImages();
    }, [shouldLoad, frameCount, basePath, fileExtension, filePrefix, renderFrame]);

    // Pokaż klatkę 0 natychmiast po załadowaniu
    useEffect(() => {
        if (!firstFrameReady) return;
        renderFrame(activeFrame.get());
    }, [firstFrameReady]); // eslint-disable-line react-hooks/exhaustive-deps

    // Subskrybuj zmiany klatki gdy animacja gotowa
    useEffect(() => {
        if (!animationReady) return;

        const unsubscribe = activeFrame.on('change', (latest) => {
            requestAnimationFrame(() => renderFrame(latest));
        });

        return () => unsubscribe();
    }, [activeFrame, animationReady, renderFrame]);

    return (
        <div ref={containerRef} className={`w-full h-full ${className}`}>
            {!firstFrameReady ? (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900/30 rounded-3xl">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
                        <div className="text-zinc-600 text-sm">
                            {shouldLoad ? 'Ładowanie sekwencji...' : 'Przygotowywanie...'}
                        </div>
                    </div>
                </div>
            ) : (
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                />
            )}
        </div>
    );
}
