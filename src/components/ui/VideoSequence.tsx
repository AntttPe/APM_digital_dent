'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform } from 'framer-motion';

interface VideoSequenceProps {
    frameCount: number;
    basePath: string;
    scrollTarget?: React.RefObject<HTMLElement | null>;
    className?: string;
    fileExtension?: string;
    filePrefix?: string;
}

export default function VideoSequence({
                                          frameCount,
                                          basePath,
                                          scrollTarget,
                                          className = '',
                                          fileExtension = 'webp',
                                          filePrefix = '',
                                      }: VideoSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const lastFrameRef = useRef<number>(-1);

    const { scrollYProgress } = useScroll({
        target: scrollTarget as any,
        offset: ['start end', 'end start'],
    });

    const frameIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, frameCount - 1]
    );

    // Intersection Observer - wykrywa czy sekcja jest blisko
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect(); // Przestań obserwować po załadowaniu
                }
            },
            {
                rootMargin: '300px', // Zacznij ładować 300px przed wejściem w viewport
                threshold: 0,
            }
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    // Preload wszystkich obrazów - tylko gdy shouldLoad = true
    useEffect(() => {
        if (!shouldLoad) return;

        const loadImages = async () => {
            const imageArray: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                const frameNumber = String(i).padStart(4, '0');
                img.src = `${basePath}/${filePrefix}${frameNumber}.${fileExtension}`;

                const promise = new Promise<void>((resolve, reject) => {
                    img.onload = () => resolve();
                    img.onerror = () => reject(new Error(`Failed to load frame ${i}`));
                });

                promises.push(promise);
                imageArray.push(img);
            }

            try {
                await Promise.all(promises);
                setImages(imageArray);
                setImagesLoaded(true);
            } catch (error) {
                console.error('Error loading sequence:', error);
            }
        };

        loadImages();
    }, [shouldLoad, frameCount, basePath, fileExtension, filePrefix]);

    // Renderuj ramkę z throttling dla płynności
    const renderFrame = useCallback((frameNumber: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images.length) return;

        const context = canvas.getContext('2d', {
            alpha: false,
            desynchronized: true,
        });
        if (!context) return;

        const index = Math.min(Math.max(Math.round(frameNumber), 0), images.length - 1);

        if (index === lastFrameRef.current) return;
        lastFrameRef.current = index;

        const img = images[index];

        if (img && img.complete && img.naturalWidth > 0) {
            if (canvas.width !== img.width || canvas.height !== img.height) {
                canvas.width = img.width;
                canvas.height = img.height;
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
        }
    }, [images]);

    // Nasłuchuj zmian scroll progress
    useEffect(() => {
        if (!imagesLoaded) return;

        const unsubscribe = frameIndex.on('change', (latest) => {
            requestAnimationFrame(() => renderFrame(latest));
        });

        return () => unsubscribe();
    }, [frameIndex, imagesLoaded, renderFrame]);

    return (
        <div ref={containerRef} className={`w-full h-full ${className}`}>
            {!imagesLoaded ? (
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
                    style={{
                        imageRendering: 'crisp-edges',
                        WebkitFontSmoothing: 'antialiased',
                    }}
                />
            )}
        </div>
    );
}