'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

export default function RdPage() {
    const { t } = useTranslation();

    const cards = t('rd.cards') as Array<{
        number: string; label: string; title: string; desc: string;
        cta: string; href: string; accent: string; dot: string;
    }>;

    return (
        <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white pt-28 pb-40 px-6">
            <div className="max-w-2xl mx-auto">

                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-16">
                    {t('rd.tag')}
                </p>

                <h1 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-4">
                    {t('rd.title')}
                </h1>
                <p className="text-zinc-400 dark:text-zinc-500 text-lg font-light mb-20">
                    {t('rd.subtitle')}
                </p>

                <div className="space-y-6">
                    {Array.isArray(cards) && cards.map((card) => (
                        <Link key={card.number} href={card.href} className="group block">
                            <div className={`relative rounded-2xl border border-zinc-200 dark:border-zinc-800/60 bg-gradient-to-br ${card.accent} p-8 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500`}>
                                <div className="flex items-start justify-between gap-6">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${card.dot}`} />
                                            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">
                                                {card.label}
                                            </span>
                                            <span className="font-mono text-[10px] text-zinc-300 dark:text-zinc-800 tracking-widest ml-auto">
                                                {card.number}
                                            </span>
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-light text-zinc-900 dark:text-white mb-3 leading-snug group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
                                            {card.title}
                                        </h2>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed mb-6">
                                            {card.desc}
                                        </p>
                                        <span className="text-xs text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                                            {card.cta}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16">
                    <Link
                        href="/"
                        className="text-xs text-zinc-400 dark:text-zinc-700 hover:text-zinc-600 dark:hover:text-zinc-500 transition-colors"
                    >
                        {t('rd.back')}
                    </Link>
                </div>

            </div>
        </main>
    );
}
