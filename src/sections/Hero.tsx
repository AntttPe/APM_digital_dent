'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import VideoSequence from '@/components/ui/VideoSequence';

// ─── Flip to true when Blender frames are placed in: ──────────────────────────
//     /public/images/hero/sequence/0001.webp … 0060.webp
// ──────────────────────────────────────────────────────────────────────────────
const ANIMATION_READY = true;

const EASE             = [0.6, 0.05, 0.01, 0.9] as [number, number, number, number];
const TOTAL_FRAMES     = 30;
const ANIM_DURATION_MS = 1000; // czas trwania intro animacji (ms)

// Easing: ease-in-out cubic — powolny start, gładkie zatrzymanie
const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function Hero() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const frameValue = useMotionValue(0);
    const [canvasReady, setCanvasReady] = useState(false);

    // Fade tekstu i animacji podczas scrollowania sekcji
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
    const textY       = useTransform(scrollYProgress, [0, 0.45], [0, -40]);
    const animOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
    const animScale   = useTransform(scrollYProgress, [0, 0.65], [1, 1.06]);

    // ── Auto-play: klatki 0→N po wejściu na stronę ───────────────────────────
    // 200ms delay: daje przeglądarce czas na wyrenderowanie pierwszej klatki
    // zanim pętla rAF zacznie obciążać główny wątek
    useEffect(() => {
        if (!ANIMATION_READY) return;

        let startTime: number | null = null;
        let rafId: number;
        let timeoutId: ReturnType<typeof setTimeout>;

        const tick = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min(1, (timestamp - startTime) / ANIM_DURATION_MS);
            frameValue.set(easeInOutCubic(progress) * (TOTAL_FRAMES - 1));
            if (progress < 1) rafId = requestAnimationFrame(tick);
        };

        timeoutId = setTimeout(() => {
            rafId = requestAnimationFrame(tick);
        }, 200);

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(rafId);
        };
    }, [frameValue]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden flex flex-col"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-white dark:from-black dark:via-zinc-950 dark:to-black" />

            {/* LCP anchor — poza motion.div, nie dotknięty przez Framer Motion opacity.
                Serwer renderuje ten img w HTML natychmiast. Lighthouse mierzy LCP
                od załadowania tego zasobu (preloaded), nie od hydratacji JS. */}
            {ANIMATION_READY && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src="/images/hero/sequence/0001.webp"
                    alt=""
                    aria-hidden="true"
                    fetchPriority="high"
                    className="absolute inset-x-0 top-14 bottom-0 m-auto w-full max-h-[70vh] md:max-h-[85vh] object-contain mix-blend-multiply dark:mix-blend-screen pointer-events-none"
                    style={{ opacity: canvasReady ? 0 : 1, transition: 'opacity 0.3s' }}
                />
            )}

            {/* ── 3D Animation — centered below header ──────────────────────── */}
            <motion.div
                style={{ opacity: animOpacity, scale: animScale }}
                className="absolute inset-x-0 top-14 bottom-0 flex items-center justify-center pointer-events-none"
            >
                {ANIMATION_READY ? (
                    <VideoSequence
                        frameCount={TOTAL_FRAMES}
                        basePath="/images/hero/sequence"
                        fileExtension="webp"
                        frameValue={frameValue}
                        transparent
                        onFirstFrameReady={() => setCanvasReady(true)}
                        className="w-full max-h-[70vh] md:max-h-[85vh] mix-blend-multiply dark:mix-blend-screen"
                    />
                ) : (
                    /* Placeholder — soft glowing orbs */
                    <div className="relative flex items-center justify-center w-full aspect-[2/1] max-h-[85vh]">
                        <motion.div
                            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute rounded-full"
                            style={{
                                width: '55%',
                                height: '55%',
                                background: 'radial-gradient(ellipse, rgba(59,130,246,0.13) 0%, transparent 70%)',
                            }}
                        />
                        <motion.div
                            animate={{ scale: [1.05, 1, 1.05], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                            className="absolute rounded-full"
                            style={{
                                width: '28%',
                                height: '28%',
                                background: 'radial-gradient(ellipse, rgba(99,102,241,0.14) 0%, transparent 65%)',
                            }}
                        />
                        <div className="absolute rounded-full border border-blue-400/10 dark:border-zinc-800/70" style={{ width: '35%', height: '35%' }} />
                        <div className="absolute rounded-full border border-blue-400/[0.06] dark:border-zinc-800/40" style={{ width: '55%', height: '55%' }} />
                        <div className="absolute rounded-full border border-blue-400/[0.04] dark:border-zinc-800/25" style={{ width: '75%', height: '75%' }} />
                        <span className="absolute bottom-[12%] text-[10px] text-zinc-400/50 dark:text-zinc-700 uppercase tracking-[0.25em]">
                            3D Render
                        </span>
                    </div>
                )}
            </motion.div>

            {/* ── Text — centered at top, above animation ───────────────────── */}
            <motion.div
                style={{ opacity: textOpacity, y: textY }}
                className="relative z-10 flex flex-col items-center text-center
                           pt-24 md:pt-40 px-6 pb-8"
            >
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-6"
                >
                    {t('hero.tag')}
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
                    className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[1.05] mb-10 text-zinc-900 dark:text-white max-w-3xl"
                >
                    {t('hero.title')}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3"
                >
                    <Link href="#workflow">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-7 py-3.5 bg-zinc-900/90 dark:bg-white/90 backdrop-blur-sm text-white dark:text-black rounded-full text-sm font-light hover:bg-zinc-900 dark:hover:bg-white transition-colors whitespace-nowrap"
                        >
                            {t('hero.processLink')}
                        </motion.button>
                    </Link>
                    <Link href="#products">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-7 py-3.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-700/60 rounded-full text-sm font-light text-zinc-700 dark:text-zinc-200 hover:bg-white/95 dark:hover:bg-zinc-900/95 transition-colors whitespace-nowrap"
                        >
                            {t('hero.productsLink')}
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Bottom fade — płynne przejście do następnej sekcji */}
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none z-10" />

            {/* Scroll indicator — desktop only */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                style={{ opacity: textOpacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10"
            >
                <span className="text-xs text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">scroll</span>
                <div className="w-6 h-9 rounded-full border border-zinc-300 dark:border-zinc-800 flex justify-center pt-2">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-1 h-1 bg-zinc-900 dark:bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
