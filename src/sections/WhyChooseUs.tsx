'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import Link from 'next/link';

const ACCENT = '#3B82F6';
const EASE = [0.6, 0.05, 0.01, 0.9] as [number, number, number, number];

export default function WhyChooseUs() {
    const { t } = useTranslation();

    const reasons = t('whyChooseUs.reasons') as Array<{ number: string; title: string; description: string }>;
    const cases = t('whyChooseUs.cases') as Array<{ tag: string; title: string; description: string; result: string }>;

    return (
        <section className="relative py-32 px-6 overflow-hidden border-t border-zinc-900">

            {/* Background glow */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(59,130,246,0.04) 0%, transparent 60%)' }}
            />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* ── Header ── */}
                <div className="grid md:grid-cols-2 gap-12 items-end mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASE }}
                    >
                        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">
                            {t('whyChooseUs.label')}
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
                            {t('whyChooseUs.title')}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                    >
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-3">
                            {t('whyChooseUs.subtitle')}
                        </p>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                            {t('whyChooseUs.subtitleNote')}
                        </p>
                    </motion.div>
                </div>

                {/* ── 4 Reasons ── */}
                <div className="grid md:grid-cols-2 gap-4 mb-24">
                    {Array.isArray(reasons) && reasons.map((reason, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                            className="group relative flex gap-6 p-8 rounded-2xl border border-zinc-800/60 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-900/30 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover glow */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                style={{ background: 'radial-gradient(ellipse 70% 50% at 0% 100%, rgba(59,130,246,0.05) 0%, transparent 70%)' }}
                            />

                            {/* Number */}
                            <div className="flex-shrink-0 pt-1">
                                <span
                                    className="text-xs font-light tracking-[0.25em]"
                                    style={{ color: ACCENT }}
                                >
                                    {reason.number}
                                </span>
                            </div>

                            {/* Text */}
                            <div>
                                <h3 className="text-lg md:text-xl font-light text-white mb-3 leading-snug">
                                    {reason.title}
                                </h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    {reason.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── Case studies ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-600 text-center mb-16">
                        {t('whyChooseUs.casesLabel')}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-4 mb-20">
                    {Array.isArray(cases) && cases.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                            className="flex flex-col p-8 rounded-2xl border border-zinc-800/60 bg-zinc-950/40 hover:border-zinc-700 transition-all duration-500"
                        >
                            {/* Tag */}
                            <div className="mb-6">
                                <span className="text-xs px-3 py-1 rounded-full border border-zinc-800 text-zinc-500">
                                    {c.tag}
                                </span>
                            </div>

                            {/* Title */}
                            <h4 className="text-base font-light text-white mb-3 leading-snug">
                                {c.title}
                            </h4>

                            {/* Description */}
                            <p className="text-sm text-zinc-500 leading-relaxed flex-1 mb-6">
                                {c.description}
                            </p>

                            {/* Result */}
                            <div className="pt-5 border-t border-zinc-900">
                                <div className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        {c.result}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── Bottom CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                    className="relative rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-10 md:p-14 overflow-hidden"
                >
                    {/* Subtle glow */}
                    <div
                        className="pointer-events-none absolute inset-0 rounded-2xl"
                        style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 120%, rgba(59,130,246,0.07) 0%, transparent 60%)' }}
                    />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-3">
                                {t('whyChooseUs.cta.title')}
                            </h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                {t('whyChooseUs.cta.description')}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                            <Link
                                href="/#contact"
                                className="px-7 py-3.5 rounded-full text-sm font-light text-black transition-colors"
                                style={{ backgroundColor: 'white' }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e4e4e7')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
                            >
                                {t('whyChooseUs.cta.button')}
                            </Link>
                            <Link
                                href="/proces"
                                className="px-7 py-3.5 rounded-full border border-zinc-700 text-sm font-light hover:bg-zinc-900 hover:border-zinc-600 transition-colors"
                            >
                                {t('whyChooseUs.cta.secondary')}
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}