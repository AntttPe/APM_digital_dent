'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';

type ProductKey = 'retainers' | 'guards' | 'aligners';

const PRODUCT_ACCENTS: Record<ProductKey, { dot: string; tab: string; border: string }> = {
    retainers: {
        dot: 'bg-blue-500',
        tab: 'bg-blue-600 text-white',
        border: 'border-blue-200 dark:border-blue-900/50',
    },
    guards: {
        dot: 'bg-pink-500',
        tab: 'bg-pink-600 text-white',
        border: 'border-pink-200 dark:border-pink-900/50',
    },
    aligners: {
        dot: 'bg-zinc-500',
        tab: 'bg-zinc-700 text-white',
        border: 'border-zinc-200 dark:border-zinc-700/50',
    },
};

function AccordionItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-start justify-between gap-4 py-5 text-left"
            >
                <span className="text-sm md:text-base text-zinc-800 dark:text-zinc-200 font-light leading-snug">
                    {question}
                </span>
                <motion.svg
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 mt-0.5 w-4 h-4 text-zinc-400 dark:text-zinc-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </motion.svg>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function StepList({ steps }: { steps: string[] }) {
    return (
        <ol className="space-y-3">
            {steps.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[11px] text-zinc-500 dark:text-zinc-500 font-light mt-0.5">
                        {i + 1}
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {step}
                    </span>
                </li>
            ))}
        </ol>
    );
}

function BulletList({ items, variant }: { items: string[]; variant: 'normal' | 'warn' }) {
    const dotColor = variant === 'normal' ? 'bg-emerald-500' : 'bg-amber-500';
    return (
        <ul className="space-y-2.5">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                    <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${dotColor}`} />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {item}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default function PatientGuidePage() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<ProductKey>('retainers');

    const tabs: ProductKey[] = ['retainers', 'guards', 'aligners'];
    const accent = PRODUCT_ACCENTS[activeTab];

    const cleaning = t(`patient.products.${activeTab}.cleaning`) as string[];
    const wearing  = t(`patient.products.${activeTab}.wearing`)  as string[];
    const normal   = t(`patient.products.${activeTab}.normal`)   as string[];
    const watchOut = t(`patient.products.${activeTab}.watchOut`) as string[];
    const faqItems = t('patient.faq.items') as { q: string; a: string }[];

    return (
        <div className="bg-white dark:bg-black text-zinc-900 dark:text-white min-h-screen">

            {/* ── Hero ──────────────────────────────────────────────────── */}
            <section className="pt-28 md:pt-36 pb-16 px-6 border-b border-zinc-100 dark:border-zinc-900">
                <div className="max-w-2xl mx-auto text-center">
                    <FadeIn y={16}>
                        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-5">
                            {t('patient.tag')}
                        </p>
                        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-5">
                            {t('patient.title')}
                        </h1>
                        <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
                            {t('patient.subtitle')}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* ── Warning banner ────────────────────────────────────────── */}
            <FadeIn y={12} className="px-6 pt-10 pb-0">
                <div className="max-w-2xl mx-auto">
                    <div className="flex gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40">
                        <svg className="flex-shrink-0 w-5 h-5 text-amber-600 dark:text-amber-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <div>
                            <p className="text-sm font-normal text-amber-800 dark:text-amber-400 mb-0.5">
                                {t('patient.warning.title')}
                            </p>
                            <p className="text-xs text-amber-700 dark:text-amber-500/80 leading-relaxed">
                                {t('patient.warning.text')}
                            </p>
                        </div>
                    </div>
                </div>
            </FadeIn>

            {/* ── Product tabs ──────────────────────────────────────────── */}
            <section className="px-6 pt-12 pb-16">
                <div className="max-w-2xl mx-auto">

                    {/* Tab selector */}
                    <FadeIn y={12} delay={0.1} className="mb-10">
                        <p className="text-xs text-zinc-400 dark:text-zinc-600 mb-3">
                            {t('patient.tabLabel')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {tabs.map(tab => {
                                const isActive = activeTab === tab;
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-5 py-2 rounded-full text-sm font-light transition-all duration-200 ${
                                            isActive
                                                ? PRODUCT_ACCENTS[tab].tab
                                                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                                        }`}
                                    >
                                        {t(`patient.tabs.${tab}`)}
                                    </button>
                                );
                            })}
                        </div>
                    </FadeIn>

                    {/* Tab content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-8"
                        >
                            {/* Description */}
                            <div className={`p-5 rounded-2xl border ${accent.border} bg-zinc-50 dark:bg-zinc-950/60`}>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
                                    <span className="text-sm font-light text-zinc-900 dark:text-white">
                                        {t(`patient.products.${activeTab}.title`)}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    {t(`patient.products.${activeTab}.description`)}
                                </p>
                            </div>

                            {/* Cleaning */}
                            <div>
                                <h3 className="text-base font-light text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L9.5 14.5m5.25-11.396c.251.023.501.05.75.082M4.5 17.25a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zm10.5 0a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z" />
                                    </svg>
                                    {t('patient.sections.cleaning')}
                                </h3>
                                <StepList steps={cleaning} />
                            </div>

                            {/* Wearing */}
                            <div>
                                <h3 className="text-base font-light text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {t('patient.sections.wearing')}
                                </h3>
                                <StepList steps={wearing} />
                            </div>

                            {/* Normal + Watchout */}
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                                    <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-500 mb-4">
                                        {t('patient.sections.normalTitle')}
                                    </p>
                                    <BulletList items={normal} variant="normal" />
                                </div>
                                <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
                                    <p className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-500 mb-4">
                                        {t('patient.sections.warningTitle')}
                                    </p>
                                    <BulletList items={watchOut} variant="warn" />
                                </div>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* ── FAQ ───────────────────────────────────────────────────── */}
            <section className="px-6 py-16 border-t border-zinc-100 dark:border-zinc-900">
                <div className="max-w-2xl mx-auto">
                    <FadeIn y={20}>
                        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-10">
                            {t('patient.faq.title')}
                        </h2>
                        <div>
                            {faqItems.map((item, i) => (
                                <AccordionItem key={i} question={item.q} answer={item.a} />
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Contact your dentist ──────────────────────────────────── */}
            <section className="px-6 py-16 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950/60">
                <div className="max-w-2xl mx-auto text-center">
                    <FadeIn y={16}>
                        <div className="w-12 h-12 mx-auto mb-6 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
                            {t('patient.dentistContact.title')}
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mx-auto mb-6">
                            {t('patient.dentistContact.text')}
                        </p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-600">
                            {t('patient.dentistContact.note')}
                        </p>
                    </FadeIn>
                </div>
            </section>

        </div>
    );
}
