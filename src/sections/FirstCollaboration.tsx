'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';

export default function FirstCollaboration() {
    const { t } = useTranslation();

    const options = t('firstCollab.options') as Array<{
        num: string;
        title: string;
        desc: string;
        tag: string;
    }>;

    return (
        <section className="relative py-28 md:py-36 px-6 border-t border-zinc-200 dark:border-zinc-900 bg-slate-50 dark:bg-black overflow-hidden">

            {/* Subtle background glow */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(20,184,166,0.04) 0%, transparent 60%)' }}
            />

            <div className="max-w-4xl mx-auto relative z-10">

                <FadeIn y={20} className="text-center mb-16">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-500 mb-5">
                        {t('firstCollab.label')}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-5 text-zinc-900 dark:text-white">
                        {t('firstCollab.title')}
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg">
                        {t('firstCollab.subtitle')}
                    </p>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-4 mb-10">
                    {Array.isArray(options) && options.map((option, i) => (
                        <FadeIn key={i} delay={0.1 + i * 0.12} y={20}>
                            <div className="relative flex flex-col h-full p-8 md:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 bg-white dark:bg-zinc-950/40 hover:border-teal-300 dark:hover:border-teal-800/60 hover:bg-teal-50/30 dark:hover:bg-teal-950/10 transition-all duration-500 group overflow-hidden">

                                {/* Large background number */}
                                <span
                                    aria-hidden="true"
                                    className="absolute bottom-4 right-5 text-[7rem] font-bold leading-none text-zinc-100 dark:text-zinc-900 select-none pointer-events-none group-hover:text-teal-50 dark:group-hover:text-teal-950/50 transition-colors duration-500"
                                >
                                    {option.num}
                                </span>

                                <div className="relative z-10 flex flex-col flex-1">
                                    <h3 className="text-xl md:text-2xl font-light text-zinc-900 dark:text-white mb-4 leading-snug">
                                        {option.title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed flex-1 mb-8">
                                        {option.desc}
                                    </p>
                                    <div className="flex items-center gap-2.5 mt-auto">
                                        <div className="w-3 h-px bg-teal-500/50 group-hover:w-5 group-hover:bg-teal-500 transition-all duration-300" />
                                        <span className="text-xs text-teal-600 dark:text-teal-500/70 tracking-wide group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors duration-300">
                                            {option.tag}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn y={12} delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/#contact">
                        <button className="px-8 py-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-light hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors">
                            {t('firstCollab.cta')}
                        </button>
                    </Link>
                    <p className="text-xs text-zinc-400 dark:text-zinc-600">
                        {t('firstCollab.note')}
                    </p>
                </FadeIn>

            </div>
        </section>
    );
}
