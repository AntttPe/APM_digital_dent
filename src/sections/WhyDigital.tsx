'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import Link from 'next/link';

const ACCENT = '#3B82F6';

interface ComparisonRow {
    feature: string;
    digital: string;
    traditional: string;
    highlight?: boolean;
}

interface BarMetric {
    label: string;
    digitalLabel: string;
    traditionalLabel: string;
    digital: number;
    traditional: number;
    unit: string;
    lowerIsBetter: boolean;
}

export default function WhyDigital() {
    const { t } = useTranslation();

    const rows = t('whyDigital.table.rows') as ComparisonRow[];
    const bars = t('whyDigital.bars') as BarMetric[];

    return (
        <section className="relative py-32 px-6 overflow-hidden border-t border-zinc-200 dark:border-zinc-900 bg-sky-50 dark:bg-black">
            {/* Background glow */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse 50% 40% at 50% 80%, rgba(59,130,246,0.05) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <FadeIn y={20} className="text-center mb-20">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">
                        {t('whyDigital.label')}
                    </p>
                    <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6 max-w-3xl mx-auto text-zinc-900 dark:text-white">
                        {t('whyDigital.title')}
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-4xl mx-auto leading-relaxed">
                        {t('whyDigital.subtitle')}
                    </p>
                </FadeIn>

                {/* Bar metrics */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    {Array.isArray(bars) && bars.map((bar, i) => {
                        const maxVal = Math.max(bar.digital, bar.traditional);

                        const digitalWidth = bar.lowerIsBetter
                            ? (bar.digital / maxVal) * 100
                            : (bar.unit === '%' ? bar.digital : (bar.digital / maxVal) * 100);

                        const traditionalWidth = bar.lowerIsBetter
                            ? (bar.traditional / maxVal) * 100
                            : (bar.unit === '%' ? bar.traditional : (bar.traditional / maxVal) * 100);

                        return (
                            <FadeIn key={i} delay={i * 0.1} y={20}>
                                <div className="p-6 rounded-2xl border border-sky-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-950/40 h-full">
                                    <div className="flex items-start justify-between mb-5">
                                        <p className="text-xs uppercase tracking-wider text-zinc-500 max-w-[140px] leading-relaxed">
                                            {bar.label}
                                        </p>
                                        {bar.lowerIsBetter && (
                                            <span className="text-xs text-zinc-400 dark:text-zinc-700 italic">niższy = lepszy</span>
                                        )}
                                    </div>

                                    {/* Digital */}
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-zinc-700 dark:text-zinc-300">{bar.digitalLabel}</span>
                                            <span className="text-xs font-light tabular-nums" style={{ color: ACCENT }}>
                                                {bar.digital} {bar.unit}
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-sky-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                                            <BarFill value={digitalWidth} color={ACCENT} delay={0.3 + i * 0.1} />
                                        </div>
                                    </div>

                                    {/* Traditional */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-zinc-500 dark:text-zinc-600">{bar.traditionalLabel}</span>
                                            <span className="text-xs text-zinc-400 dark:text-zinc-600 tabular-nums">
                                                {bar.traditional} {bar.unit}
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-sky-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                                            <BarFill value={traditionalWidth} color="#94a3b8" delay={0.4 + i * 0.1} />
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>

                {/* Comparison table */}
                <FadeIn y={20} className="rounded-2xl border border-sky-100 dark:border-zinc-800/60 overflow-hidden mb-4">
                    {/* Table header */}
                    <div className="grid grid-cols-3 bg-sky-100/80 dark:bg-zinc-950/80 border-b border-sky-100 dark:border-zinc-800/60">
                        <div className="px-6 py-4">
                            <span className="text-xs uppercase tracking-wider text-zinc-500">
                                {t('whyDigital.table.colFeature')}
                            </span>
                        </div>
                        <div className="px-6 py-4 border-l border-sky-100 dark:border-zinc-800/60">
                            <span className="text-xs uppercase tracking-wider font-medium" style={{ color: ACCENT }}>
                                {t('whyDigital.table.colDigital')}
                            </span>
                        </div>
                        <div className="px-6 py-4 border-l border-sky-100 dark:border-zinc-800/60">
                            <span className="text-xs uppercase tracking-wider text-zinc-500">
                                {t('whyDigital.table.colTraditional')}
                            </span>
                        </div>
                    </div>

                    {/* Rows */}
                    {Array.isArray(rows) && rows.map((row, i) => (
                        <div
                            key={i}
                            className={`grid grid-cols-3 border-b border-sky-100/80 dark:border-zinc-900/80 last:border-b-0 transition-colors hover:bg-sky-50 dark:hover:bg-zinc-900/20 ${
                                row.highlight ? 'bg-blue-500/[0.03]' : ''
                            }`}
                        >
                            <div className="px-6 py-4 flex items-start">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                                    {row.feature}
                                </span>
                            </div>
                            <div className="px-6 py-4 border-l border-sky-100/80 dark:border-zinc-900/80 flex items-start gap-2">
                                <div
                                    className="w-1 h-1 rounded-full flex-shrink-0 mt-2"
                                    style={{ backgroundColor: ACCENT }}
                                />
                                <span className="text-sm text-zinc-900 dark:text-white font-light leading-relaxed">
                                    {row.digital}
                                </span>
                            </div>
                            <div className="px-6 py-4 border-l border-sky-100/80 dark:border-zinc-900/80 flex items-start">
                                <span className="text-sm text-zinc-400 dark:text-zinc-500 font-light leading-relaxed">
                                    {row.traditional}
                                </span>
                            </div>
                        </div>
                    ))}
                </FadeIn>

                {/* Footnote */}
                <FadeIn y={0} delay={0.2} className="text-xs text-zinc-400 dark:text-zinc-700 text-center mb-10 max-w-3xl mx-auto leading-relaxed">
                    {t('whyDigital.footnote')}
                </FadeIn>

                {/* Evidence button */}
                <FadeIn y={8} delay={0.3} className="flex justify-center">
                    <Link
                        href="/badania"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-sky-200 dark:border-zinc-800 text-xs text-zinc-500 hover:border-sky-400 dark:hover:border-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-all duration-300"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {t('whyDigital.evidenceButton')}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
}

// Helper - osobny komponent żeby useInView działał per-bar
function BarFill({ value, color, delay }: { value: number; color: string; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: inView ? `${value}%` : 0 }}
            transition={{ duration: 1.2, delay, ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number] }}
        />
    );
}
