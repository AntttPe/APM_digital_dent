'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import Link from 'next/link';

const ACCENT      = '#3B82F6';
const EASE        = [0.6, 0.05, 0.01, 0.9] as [number, number, number, number];
const RING_RADIUS = 30;
const RING_CIRCUM = 2 * Math.PI * RING_RADIUS; // ≈ 188.5

interface BarMetric {
    label: string;
    digitalLabel: string;
    traditionalLabel: string;
    digital: number;
    traditional: number;
    unit: string;
    lowerIsBetter: boolean;
}

interface ProcessStep {
    text: string;
    risk?: string;
    ok?: string;
}

interface OutcomeMetric {
    value: number;
    suffix: string;
    prefix: string;
    label: string;
    sub: string;
}

export default function WhyDigital() {
    const { t } = useTranslation();

    const bars               = t('whyDigital.bars') as BarMetric[];
    const traditionalSteps   = t('whyDigital.processComparison.traditional.steps') as ProcessStep[];
    const digitalSteps       = t('whyDigital.processComparison.digital.steps') as ProcessStep[];
    const outcomes           = t('whyDigital.outcomes') as OutcomeMetric[];

    return (
        <section className="relative py-32 px-6 overflow-hidden border-t border-zinc-200 dark:border-zinc-900 bg-sky-50 dark:bg-black">
            {/* Background glow */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 70%)' }}
            />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* ── Header ───────────────────────────────────────────────── */}
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

                {/* ── Bar metrics ──────────────────────────────────────────── */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    {Array.isArray(bars) && bars.map((bar, i) => {
                        const maxVal = Math.max(bar.digital, bar.traditional);
                        const digitalWidth     = bar.unit === '%' ? bar.digital     : (bar.digital     / maxVal) * 100;
                        const traditionalWidth = bar.unit === '%' ? bar.traditional : (bar.traditional / maxVal) * 100;

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

                {/* ── Process Comparison ───────────────────────────────────── */}
                <FadeIn y={24} className="mb-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 text-center mb-10">
                        {t('whyDigital.processComparison.heading')}
                    </p>
                </FadeIn>

                <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-sky-100 dark:border-zinc-800/60 mb-20">

                    {/* Traditional — left */}
                    <div className="p-8 bg-zinc-50 dark:bg-zinc-950 border-b border-sky-100 dark:border-zinc-800/60 md:border-b-0">
                        <div className="flex items-center gap-2.5 mb-8">
                            <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                            <span className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                                {t('whyDigital.processComparison.traditional.label')}
                            </span>
                        </div>

                        <div className="space-y-6">
                            {Array.isArray(traditionalSteps) && traditionalSteps.map((step, i) => (
                                <FadeIn key={i} delay={0.08 + i * 0.07} y={10}>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center mt-0.5">
                                            <span className="text-[10px] text-zinc-400 dark:text-zinc-600 tabular-nums">{i + 1}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-light text-zinc-600 dark:text-zinc-400 leading-snug">
                                                {step.text}
                                            </p>
                                            {step.risk && (
                                                <p className="text-xs text-orange-500/80 dark:text-orange-400/60 mt-1.5 flex items-start gap-1.5">
                                                    <svg className="w-3 h-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                                    </svg>
                                                    {step.risk}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    {/* Digital — right */}
                    <div className="p-8 bg-white dark:bg-zinc-900/20 md:border-l border-sky-100 dark:border-zinc-800/60">
                        <div className="flex items-center gap-2.5 mb-8">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT }} />
                            <span className="text-xs uppercase tracking-widest" style={{ color: ACCENT }}>
                                {t('whyDigital.processComparison.digital.label')}
                            </span>
                        </div>

                        <div className="space-y-6">
                            {Array.isArray(digitalSteps) && digitalSteps.map((step, i) => (
                                <FadeIn key={i} delay={0.08 + i * 0.07} y={10}>
                                    <div className="flex gap-4">
                                        <div
                                            className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mt-0.5"
                                            style={{ borderColor: ACCENT + '50' }}
                                        >
                                            <span className="text-[10px] tabular-nums" style={{ color: ACCENT }}>{i + 1}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-light text-zinc-900 dark:text-white leading-snug">
                                                {step.text}
                                            </p>
                                            {step.ok && (
                                                <p className="text-xs text-blue-500/70 dark:text-blue-400/60 mt-1.5 flex items-start gap-1.5">
                                                    <svg className="w-3 h-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {step.ok}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Outcome Cards ─────────────────────────────────────────── */}
                <div className="grid md:grid-cols-2 gap-6 mb-20 max-w-2xl mx-auto">
                    {Array.isArray(outcomes) && outcomes.map((outcome, i) => (
                        <OutcomeCard key={i} outcome={outcome} index={i} />
                    ))}
                </div>

                {/* ── Footnote ─────────────────────────────────────────────── */}
                <FadeIn y={0} delay={0.2} className="text-xs text-zinc-400 dark:text-zinc-700 text-center mb-10 max-w-3xl mx-auto leading-relaxed">
                    {t('whyDigital.footnote')}
                </FadeIn>

                {/* ── Evidence button ───────────────────────────────────────── */}
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

// ─── Outcome Card ──────────────────────────────────────────────────────────────
function OutcomeCard({ outcome, index }: { outcome: OutcomeMetric; index: number }) {
    const ref    = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    const count        = useMotionValue(0);
    const displayValue = useTransform(count, v => Math.round(v));

    useEffect(() => {
        if (!inView) return;
        animate(count, outcome.value, {
            duration: 1.8,
            delay: 0.2 + index * 0.1,
            ease: 'easeOut',
        });
    }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

    const isPercent     = outcome.suffix === '%';
    const isMultiplier  = outcome.suffix === '×';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
            className="p-8 rounded-2xl border border-sky-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-950/40 flex flex-col"
        >
            {/* Visual */}
            <div className="flex justify-center mb-6">
                {isPercent   && <RingChart value={outcome.value} inView={inView} delay={0.3 + index * 0.1} />}
                {isMultiplier && <LifespanBars inView={inView} delay={0.3 + index * 0.1} />}
            </div>

            {/* Number */}
            <div className="flex items-baseline gap-1 mb-2">
                {outcome.prefix && (
                    <span className="text-sm text-zinc-400 dark:text-zinc-500 font-light">{outcome.prefix}</span>
                )}
                <motion.span className="text-5xl font-light text-zinc-900 dark:text-white tabular-nums leading-none">
                    {displayValue}
                </motion.span>
                <span className="text-2xl font-light" style={{ color: ACCENT }}>{outcome.suffix}</span>
            </div>

            {/* Label */}
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100 mb-2">
                {outcome.label}
            </p>

            {/* Sub */}
            <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed mt-auto">
                {outcome.sub}
            </p>
        </motion.div>
    );
}

// ─── Ring Chart (SVG donut, animowany przy wejściu w viewport) ─────────────────
function RingChart({ value, inView, delay }: { value: number; inView: boolean; delay: number }) {
    const offset = RING_CIRCUM - (value / 100) * RING_CIRCUM;

    return (
        <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
            {/* Track */}
            <circle
                cx={40} cy={40} r={RING_RADIUS}
                fill="none"
                strokeWidth={5}
                className="stroke-sky-100 dark:stroke-zinc-800"
            />
            {/* Progress */}
            <motion.circle
                cx={40} cy={40} r={RING_RADIUS}
                fill="none"
                strokeWidth={5}
                stroke={ACCENT}
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUM}
                initial={{ strokeDashoffset: RING_CIRCUM }}
                animate={{ strokeDashoffset: inView ? offset : RING_CIRCUM }}
                transition={{ duration: 1.6, delay, ease: EASE }}
            />
        </svg>
    );
}

// ─── Lifespan Bars (dla karty 3×) ─────────────────────────────────────────────
function LifespanBars({ inView, delay }: { inView: boolean; delay: number }) {
    return (
        <div className="w-full space-y-3 py-1">
            {/* Digital — 3× */}
            <div>
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Druk 3D</span>
                    <span className="text-[10px] font-light tabular-nums" style={{ color: ACCENT }}>3×</span>
                </div>
                <div className="w-full h-2 bg-sky-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: ACCENT }}
                        initial={{ width: 0 }}
                        animate={{ width: inView ? '100%' : 0 }}
                        transition={{ duration: 1.4, delay, ease: EASE }}
                    />
                </div>
            </div>
            {/* Traditional — 1× */}
            <div>
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-300 dark:text-zinc-700">Termoformowanie</span>
                    <span className="text-[10px] tabular-nums text-zinc-300 dark:text-zinc-700">1×</span>
                </div>
                <div className="w-full h-2 bg-sky-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full bg-zinc-300 dark:bg-zinc-700"
                        initial={{ width: 0 }}
                        animate={{ width: inView ? '33%' : 0 }}
                        transition={{ duration: 1.0, delay: delay + 0.2, ease: EASE }}
                    />
                </div>
            </div>
        </div>
    );
}

// ─── Bar Fill (animowany pasek, per-bar useInView) ─────────────────────────────
function BarFill({ value, color, delay }: { value: number; color: string; delay: number }) {
    const ref    = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: inView ? `${value}%` : 0 }}
            transition={{ duration: 1.2, delay, ease: EASE }}
        />
    );
}
