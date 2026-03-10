'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import VideoSequence from '@/components/ui/VideoSequence';

// ─── Flip to true when Blender frames are placed in: ──────────────────────────
//     /public/images/hero/sequence/0001.webp … 0120.webp
// ──────────────────────────────────────────────────────────────────────────────
const ANIMATION_READY = false;

const EASE = [0.6, 0.05, 0.01, 0.9] as [number, number, number, number];

export default function Hero() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
    const textY       = useTransform(scrollYProgress, [0, 0.45], [0, -40]);
    const animOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
    const animScale   = useTransform(scrollYProgress, [0, 0.65], [1, 1.06]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden flex flex-col"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-white dark:from-black dark:via-zinc-950 dark:to-black" />

            {/* ── 3D Animation — full-screen background layer ───────────── */}
            <motion.div
                style={{ opacity: animOpacity, scale: animScale }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                {ANIMATION_READY ? (
                    <VideoSequence
                        frameCount={120}
                        basePath="/images/hero/sequence"
                        fileExtension="webp"
                        scrollTarget={sectionRef}
                        transparent
                        className="w-[min(100vw,960px)] h-[min(100vw,960px)] md:w-[min(80vw,960px)] md:h-[min(80vw,960px)]"
                    />
                ) : (
                    /* Placeholder — soft glowing orbs, no hard frame */
                    <div className="relative flex items-center justify-center w-[min(100vw,900px)] h-[min(100vw,900px)] md:w-[min(80vw,900px)] md:h-[min(80vw,900px)]">
                        {/* Outer ambient glow */}
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
                        {/* Inner core glow */}
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
                        {/* Concentric rings */}
                        <div className="absolute rounded-full border border-blue-400/10 dark:border-zinc-800/70" style={{ width: '35%', height: '35%' }} />
                        <div className="absolute rounded-full border border-blue-400/[0.06] dark:border-zinc-800/40" style={{ width: '55%', height: '55%' }} />
                        <div className="absolute rounded-full border border-blue-400/[0.04] dark:border-zinc-800/25" style={{ width: '75%', height: '75%' }} />

                        <span className="absolute bottom-[12%] text-[10px] text-zinc-400/50 dark:text-zinc-700 uppercase tracking-[0.25em]">
                            3D Render
                        </span>
                    </div>
                )}
            </motion.div>

            {/* ── Text — centered at top, above animation ───────────────── */}
            <motion.div
                style={{ opacity: textOpacity, y: textY }}
                className="relative z-10 flex flex-col items-center text-center
                           pt-36 md:pt-44 px-6 pb-8"
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
                    className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[1.05] mb-6 text-zinc-900 dark:text-white max-w-3xl"
                >
                    {t('hero.title')}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
                    className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-10 max-w-sm md:max-w-md"
                >
                    {t('hero.subtitle')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3"
                >
                    <Link href="#workflow">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-7 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-light hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors whitespace-nowrap"
                        >
                            {t('hero.processLink')}
                        </motion.button>
                    </Link>
                    <Link href="#products">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-7 py-3.5 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-light text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap"
                        >
                            {t('hero.productsLink')}
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>

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
