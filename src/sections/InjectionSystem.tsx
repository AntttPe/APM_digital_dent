'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from '@/lib/i18n';

export default function InjectionSystem() {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const isStatsInView = useInView(statsRef, { once: true, margin: '-100px' });

    const [costMultiplier, setCostMultiplier] = useState(0);
    const targetMultiplier = 5; // 5× tańsze

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Animacja liczby - nalicza się stopniowo
    useEffect(() => {
        if (!isStatsInView) return;

        const duration = 2000; // 2 sekundy
        const steps = 60;
        const increment = targetMultiplier / steps;
        const stepDuration = duration / steps;

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetMultiplier) {
                setCostMultiplier(targetMultiplier);
                clearInterval(timer);
            } else {
                setCostMultiplier(Math.floor(current * 10) / 10);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isStatsInView]);

    const features = [
        {
            key: 'precision',
            icon: '1:1',
            delay: 0,
        },
        {
            key: 'time',
            icon: '⏱',
            delay: 0.15,
        },
        {
            key: 'cost',
            icon: '€',
            delay: 0.3,
            isAnimated: true,
        },
        {
            key: 'workflow',
            icon: '→',
            delay: 0.45,
        },
    ];

    return (
        <section
            ref={containerRef}
            className="relative py-48 px-6 overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

            <motion.div
                style={{ scale, opacity }}
                className="relative z-10 max-w-6xl mx-auto"
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
            {t('injection.tag')}
          </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-light tracking-tight mb-8 text-center"
                >
                    {t('injection.title')}
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl text-zinc-400 max-w-3xl mx-auto text-center mb-16"
                >
                    {t('injection.description')}
                </motion.p>

                {/* Animation placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/30 mb-20"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5" />

                    {/* Future animation/3D model integration */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-zinc-700 text-sm uppercase tracking-wider">
                            Animation space
                        </div>
                    </div>
                </motion.div>

                {/* Features grid with scroll reveal */}
                <div ref={statsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.key}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{
                                duration: 0.6,
                                delay: feature.delay,
                                ease: [0.6, 0.05, 0.01, 0.9]
                            }}
                            className="relative p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors group"
                        >
                            {/* Icon/Number */}
                            <div className="mb-4">
                                {feature.isAnimated ? (
                                    <div className="text-4xl font-light text-emerald-400">
                                        {costMultiplier.toFixed(1)}×
                                    </div>
                                ) : (
                                    <div className="text-3xl text-zinc-600 group-hover:text-zinc-500 transition-colors">
                                        {feature.icon}
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-light mb-2 text-zinc-200">
                                {t(`injection.features.${feature.key}.title`)}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                {t(`injection.features.${feature.key}.desc`)}
                            </p>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>

                {/* Additional info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm text-zinc-600">
                        {t('injection.note')}
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}