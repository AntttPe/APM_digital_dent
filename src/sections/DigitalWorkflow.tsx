'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';

// Detail per step — technical specs relevant to dentists/technicians,
// same in both languages (formats and units are universal)
const stepDetails = [
    { num: '01', tag: 'STL · OBJ · PLY' },
    { num: '02', tag: '±10 µm' },
    { num: '03', tag: 'Class IIa' },
    { num: '04', tag: '1–3 dni' },
];

const stepKeys = ['scan', 'design', 'print', 'precision'] as const;

export default function DigitalWorkflow() {
    const { t } = useTranslation();

    return (
        <section id="workflow" className="relative py-28 md:py-36 px-6 overflow-hidden border-t border-zinc-200 dark:border-zinc-900 bg-slate-50 dark:bg-black">
            <div className="max-w-6xl mx-auto">

                {/* Section header */}
                <FadeIn y={20} className="mb-14 md:mb-20">
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 uppercase tracking-widest mb-5">
                        {t('workflow.label')}
                    </p>
                    <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-4 text-zinc-900 dark:text-white">
                        {t('workflow.title')}
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-500 text-base md:text-lg max-w-xl leading-relaxed">
                        {t('workflow.subtitle')}
                    </p>
                </FadeIn>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {stepKeys.map((key, i) => (
                        <FadeIn
                            key={key}
                            delay={0.1 + i * 0.1}
                            y={24}
                        >
                            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 p-6 md:p-7 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-all duration-300 group flex flex-col h-full">
                                {/* Large background step number */}
                                <span
                                    aria-hidden="true"
                                    className="absolute bottom-3 right-4 text-[6rem] font-bold leading-none text-zinc-100 dark:text-zinc-900 select-none pointer-events-none group-hover:text-zinc-200/80 dark:group-hover:text-zinc-800/80 transition-colors duration-300"
                                >
                                    {stepDetails[i].num}
                                </span>

                                {/* Content */}
                                <div className="relative z-10 flex flex-col flex-1">
                                    <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100 mb-3">
                                        {t(`workflow.steps.${key}.title`)}
                                    </h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed flex-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors duration-300">
                                        {t(`workflow.steps.${key}.desc`)}
                                    </p>

                                    {/* Detail tag */}
                                    <div className="mt-6 flex items-center gap-2.5">
                                        <div className="w-3 h-px bg-teal-500/50 group-hover:w-5 group-hover:bg-teal-500/70 transition-all duration-300" />
                                        <span className="text-xs text-teal-600 dark:text-teal-500/60 tracking-wide group-hover:text-teal-700 dark:group-hover:text-teal-500/80 transition-colors duration-300">
                                            {stepDetails[i].tag}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* CTA */}
                <FadeIn y={12} delay={0.35} className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    <p className="text-zinc-400 dark:text-zinc-600 text-sm max-w-sm leading-relaxed">
                        {t('workflow.ctaNote')}
                    </p>
                    <Link href="/proces" className="flex-shrink-0">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center gap-3 px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-full hover:border-teal-500/40 hover:bg-teal-500/5 transition-all text-sm whitespace-nowrap text-zinc-700 dark:text-zinc-300"
                        >
                            {t('workflow.cta')}
                            <span className="text-teal-600 dark:text-teal-500 group-hover:translate-x-1 transition-transform inline-block">
                                →
                            </span>
                        </motion.button>
                    </Link>
                </FadeIn>

            </div>
        </section>
    );
}
