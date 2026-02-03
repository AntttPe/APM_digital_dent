'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from '@/lib/i18n';

export default function Software() {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const isStatsInView = useInView(statsRef, { once: true, margin: '-100px' });

    const [performanceMultiplier, setPerformanceMultiplier] = useState(0);
    const targetMultiplier = 10; // 10× szybciej

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    // Animacja liczby
    useEffect(() => {
        if (!isStatsInView) return;

        const duration = 2500;
        const steps = 60;
        const increment = targetMultiplier / steps;
        const stepDuration = duration / steps;

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetMultiplier) {
                setPerformanceMultiplier(targetMultiplier);
                clearInterval(timer);
            } else {
                setPerformanceMultiplier(Math.floor(current * 10) / 10);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isStatsInView]);

    const capabilities = [
        { key: 'anatomy', icon: '🦷' },
        { key: 'recognition', icon: 'AI' },
        { key: 'reconstruction', icon: '↻' },
        { key: 'gpu', icon: 'GPU', isAnimated: true },
    ];

    const focus = ['aligners', 'retainers', 'guards'];

    return (
        <section
            ref={containerRef}
            className="relative py-48 px-6 overflow-hidden"
        >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                </div>
            </div>

            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 max-w-7xl mx-auto"
            >
                {/* Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6"
                >
          <span className="inline-block px-4 py-2 border border-zinc-800 rounded-full text-xs uppercase tracking-wider text-zinc-400">
            {t('software.tag')}
          </span>
                </motion.div>

                {/* Main title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-center"
                >
                    {t('software.title')}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-2xl md:text-3xl font-light text-zinc-500 max-w-4xl mx-auto text-center mb-20"
                >
                    {t('software.subtitle')}
                </motion.p>

                {/* Vision statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-3xl mx-auto mb-24"
                >
                    <p className="text-lg text-zinc-400 leading-relaxed text-center">
                        {t('software.vision')}
                    </p>
                </motion.div>

                {/* Visual placeholder - może być ekran z UI, animacja, itp */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-800/50 bg-zinc-900/30 mb-24"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5" />

                    {/* Grid overlay */}
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }} />

                    {/* Placeholder content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-4 opacity-20">⚡</div>
                            <div className="text-zinc-700 text-sm uppercase tracking-wider">
                                Software visualization
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Why new system */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto mb-24 text-center"
                >
                    <h3 className="text-3xl font-light mb-6">{t('software.why.title')}</h3>
                    <p className="text-zinc-400 leading-relaxed mb-8">
                        {t('software.why.description')}
                    </p>
                    <div className="inline-block">
                        <div className="text-zinc-600 text-sm space-y-2">
                            {(t('software.why.old') as string[]).map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-zinc-700">×</span>
                                    <span className="line-through">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 text-zinc-300 font-light"
                        >
                            {t('software.why.new')}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Capabilities grid */}
                <div ref={statsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {capabilities.map((capability, index) => (
                        <motion.div
                            key={capability.key}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: [0.6, 0.05, 0.01, 0.9]
                            }}
                            className="relative p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700/50 transition-all group"
                        >
                            <div className="mb-4">
                                {capability.isAnimated ? (
                                    <div className="text-4xl font-light text-blue-400">
                                        {performanceMultiplier.toFixed(1)}×
                                    </div>
                                ) : (
                                    <div className="text-3xl group-hover:scale-110 transition-transform">
                                        {capability.icon}
                                    </div>
                                )}
                            </div>

                            <h4 className="text-lg font-light mb-2 text-zinc-200">
                                {t(`software.capabilities.${capability.key}.title`)}
                            </h4>

                            <p className="text-sm text-zinc-500 leading-relaxed">
                                {t(`software.capabilities.${capability.key}.desc`)}
                            </p>

                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>

                {/* Focus areas */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-24"
                >
                    <h3 className="text-2xl font-light mb-8 text-center text-zinc-300">
                        {t('software.focus.title')}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {focus.map((item, index) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="px-6 py-3 rounded-full border border-zinc-800 bg-zinc-900/30 text-zinc-400 text-sm hover:border-zinc-700 hover:text-zinc-300 transition-all"
                            >
                                {t(`software.focus.items.${item}`)}
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-center text-zinc-600 text-sm mt-6">
                        {t('software.focus.subtitle')}
                    </p>
                </motion.div>

                {/* Philosophy */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mb-24 text-center"
                >
                    <h3 className="text-2xl font-light mb-6 text-zinc-300">
                        {t('software.philosophy.title')}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed mb-8">
                        {t('software.philosophy.description')}
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-zinc-500">
                        {(t('software.philosophy.steps') as string[]).map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="flex items-center gap-2"
                            >
                                <span className="text-zinc-700">{i + 1}.</span>
                                <span>{step}</span>
                                {i < 2 && <span className="hidden md:inline text-zinc-800">→</span>}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Status */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-6 py-3 rounded-full bg-zinc-900/50 border border-zinc-800">
                        <p className="text-sm text-zinc-500">
                            {t('software.status')}
                        </p>
                    </div>
                </motion.div>

                {/* Closing statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <p className="text-xl md:text-2xl font-light text-zinc-400 leading-relaxed">
                        {t('software.closing')}
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}