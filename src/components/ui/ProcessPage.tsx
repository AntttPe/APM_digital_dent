'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import Link from 'next/link';

const ACCENT = '#3B82F6'; // blue-500

const steps = [
    { number: '01', key: 'scan' },
    { number: '02', key: 'produce' },
    { number: '03', key: 'ship' },
];

const EASE = [0.6, 0.05, 0.01, 0.9] as [number, number, number, number];

const connectorVariants = {
    hidden: { scaleX: 0 },
    visible: (i: number) => ({
        scaleX: 1,
        transition: {
            duration: 0.8,
            delay: 0.4 + i * 0.5,
            ease: EASE  // ← zamiast inline array
        },
    }),
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            delay: 0.1 + i * 0.15,
            ease: EASE  // ← zamiast inline array
        },
    }),
};

export default function ProcessPage() {
    const { t } = useTranslation();

    const stats = t('process.summary.stats') as Array<{ value: string; label: string }>;

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Back button */}
            <div className="fixed top-20 left-6 z-50">
                <Link href="/">
                    <motion.button
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ x: -4 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl hover:border-zinc-700 transition-all group"
                    >
                        <svg className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                            {t('process.back')}
                        </span>
                    </motion.button>
                </Link>
            </div>

            {/* ─── HERO ─────────────────────────────────────── */}
            <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">

                {/* Subtle radial glow */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,130,246,0.07) 0%, transparent 70%)',
                    }}
                />

                {/* Thin horizontal rule */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="w-16 h-px mb-10 origin-center"
                    style={{ backgroundColor: ACCENT }}
                />

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6"
                >
                    {t('process.hero.label')}
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.9, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] mb-8 max-w-4xl"
                >
                    {t('process.hero.title')}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.7 }}
                    className="text-lg md:text-xl text-zinc-400 font-light max-w-xl leading-relaxed"
                >
                    {t('process.hero.subtitle')}
                </motion.p>

                {/* Scroll cue */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-zinc-600 uppercase tracking-widest">scroll</span>
                    <div className="w-6 h-9 rounded-full border border-zinc-800 flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: ACCENT }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* ─── PROCESS STEPS ───────────────────────────── */}
            <section className="relative px-6 pb-32">
                <div className="max-w-7xl mx-auto">

                    {/* Section label */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.6 }}
                        className="text-xs uppercase tracking-[0.3em] text-zinc-600 text-center mb-20"
                    >
                        {t('process.steps.label')}
                    </motion.p>

                    {/* Cards + connectors */}
                    <div className="relative flex flex-col md:flex-row gap-0 items-stretch">

                        {steps.map((step, i) => (
                            <div key={step.key} className="flex md:flex-row flex-col items-stretch flex-1">

                                {/* ── Card ── */}
                                <motion.div
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.5, margin: '-100px' }}
                                    className="group flex-1 relative flex flex-col p-8 md:p-10 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-500 rounded-2xl bg-zinc-950/50 backdrop-blur-sm overflow-hidden"
                                >
                                    {/* Hover blue tint */}
                                    <div
                                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 70%)' }}
                                    />

                                    {/* Top row */}
                                    <div className="flex items-start justify-between mb-8">
                            <span
                                className="text-xs font-light tracking-[0.25em] uppercase"
                                style={{ color: ACCENT }}
                            >
                                {step.number}
                            </span>
                                        {/* Icon glyph */}
                                        <div className="w-10 h-10 flex items-center justify-center">

                                            {/* IKONA 1 (SVG - Skanowanie) - bez zmian */}
                                            {i === 0 && (
                                                <svg
                                                    className="w-full h-full text-zinc-700 group-hover:text-zinc-500 transition-colors duration-300"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            )}

                                            {/* IKONA 2 (PNG - Druk) - Używamy Maski */}
                                            {i === 1 && (
                                                <div
                                                    className="w-full h-full bg-zinc-700 group-hover:bg-zinc-500 transition-colors duration-300"
                                                    style={{
                                                        maskImage: "url('/images/icons/3d_printer.png')",
                                                        maskSize: 'contain',
                                                        maskRepeat: 'no-repeat',
                                                        maskPosition: 'center',
                                                        WebkitMaskImage: "url('/images/icons/3d_printer.png')", // Dla Safari/Chrome
                                                        WebkitMaskSize: 'contain',
                                                        WebkitMaskRepeat: 'no-repeat',
                                                        WebkitMaskPosition: 'center'
                                                    }}
                                                />
                                            )}

                                            {/* IKONA 3 (PNG - Wysyłka) - Używamy Maski */}
                                            {i === 2 && (
                                                <div
                                                    className="w-full h-full bg-zinc-700 group-hover:bg-zinc-500 transition-colors duration-300"
                                                    style={{
                                                        maskImage: "url('/images/icons/delivery.png')",
                                                        maskSize: 'contain',
                                                        maskRepeat: 'no-repeat',
                                                        maskPosition: 'center',
                                                        WebkitMaskImage: "url('/images/icons/delivery.png')", // Dla Safari/Chrome
                                                        WebkitMaskSize: 'contain',
                                                        WebkitMaskRepeat: 'no-repeat',
                                                        WebkitMaskPosition: 'center'
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4 leading-snug">
                                        {t(`process.steps.${step.key}.title`)}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-zinc-500 text-sm md:text-base leading-relaxed flex-1">
                                        {t(`process.steps.${step.key}.description`)}
                                    </p>

                                    {/* Bottom time tag */}
                                    <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                                        <span className="text-xs text-zinc-600 tracking-wider uppercase">
                                {t(`process.steps.${step.key}.time`)}
                            </span>
                                    </div>
                                </motion.div>

                                {/* ── Connector arrow (between cards, desktop only) ── */}
                                {i < steps.length - 1 && (
                                    <div className="hidden md:flex items-center justify-center w-10 flex-shrink-0 px-1">
                                        <motion.div
                                            custom={i}
                                            variants={connectorVariants}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, amount: 0.8 }}
                                            className="relative w-full flex items-center origin-left"
                                        >
                                            <div className="w-full h-px" style={{ backgroundColor: 'rgba(59,130,246,0.3)' }} />
                                            <svg className="absolute right-0 w-3 h-3" style={{ color: 'rgba(59,130,246,0.5)' }} viewBox="0 0 12 12" fill="currentColor">
                                                <path d="M6.293 0.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L8.586 6 6.293 3.707a1 1 0 010-1.414z" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                )}

                                {/* Mobile connector (vertical) - UPROSZCZONY */}
                                {i < steps.length - 1 && (
                                    <div className="flex md:hidden justify-center py-4">
                                        <motion.div
                                            initial={{ opacity: 0, scaleY: 0 }}
                                            whileInView={{ opacity: 1, scaleY: 1 }}
                                            viewport={{ once: true, amount: 0.8 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            className="flex flex-col items-center gap-1 origin-top"
                                        >
                                            <div className="w-px h-8" style={{ backgroundColor: 'rgba(59,130,246,0.3)' }} />
                                            <svg className="w-3 h-3" style={{ color: 'rgba(59,130,246,0.5)' }} viewBox="0 0 12 12" fill="currentColor">
                                                <path d="M6 0a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L5 9.586V1a1 1 0 011-1z" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SUMMARY METRICS ──────────────────────────── */}
            <section className="relative px-6 py-24 border-t border-zinc-900">
                <div className="max-w-7xl mx-auto">

                    <div className="grid md:grid-cols-2 gap-16 items-center">

                        {/* Left — headline */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
                                <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                                    {t('process.summary.label')}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6 leading-tight">
                                {t('process.summary.title')}
                            </h2>

                            <p className="text-zinc-500 leading-relaxed mb-8 text-sm md:text-base">
                                {t('process.summary.subtitle')}
                            </p>

                            <p className="text-xs text-zinc-700 leading-relaxed max-w-sm">
                                {t('process.summary.disclaimer')}
                            </p>
                        </motion.div>

                        {/* Right — stats */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {Array.isArray(stats) && stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="p-6 rounded-2xl border border-zinc-800/60 bg-zinc-950/40 hover:border-zinc-700 transition-colors group"
                                >
                                    <div
                                        className="text-3xl md:text-4xl font-light mb-2 tracking-tight"
                                        style={{ color: i === 0 ? ACCENT : 'white' }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-zinc-600 uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── CTA ──────────────────────────────────────── */}
            <section className="relative px-6 py-24 border-t border-zinc-900 bg-gradient-to-b from-black to-zinc-950">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
                            {t('process.cta.title')}
                        </h2>
                        <p className="text-zinc-500 mb-10 text-sm md:text-base">
                            {t('process.cta.subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/#contact"
                                className="px-8 py-3.5 rounded-full font-light text-sm text-black transition-colors"
                                style={{ backgroundColor: 'white' }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e4e4e7')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
                            >
                                {t('process.cta.button')}
                            </Link>
                            <Link
                                href="/#products"
                                className="px-8 py-3.5 rounded-full border border-zinc-700 font-light text-sm hover:bg-zinc-900 hover:border-zinc-600 transition-colors"
                            >
                                {t('process.cta.products')}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}