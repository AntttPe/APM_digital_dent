'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

export default function GaleriaPage() {
    const { t } = useTranslation();

    return (
        <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white pt-28 pb-40 px-6">
            <div className="max-w-4xl mx-auto">

                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-16">
                    {t('galeria.tag')}
                </p>

                <h1 className="text-5xl md:text-7xl font-light leading-[1.05] tracking-tight mb-3">
                    {t('galeria.title')}
                </h1>
                <p className="text-2xl md:text-3xl font-light text-zinc-400 dark:text-zinc-500 mb-24">
                    {t('galeria.subtitle')}
                </p>

                {/* Placeholder grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-20">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="aspect-square rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/60 flex items-center justify-center"
                        >
                            <svg className="w-6 h-6 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3 3h18" />
                            </svg>
                        </div>
                    ))}
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-900 pt-16 max-w-xl">
                    <p className="text-lg font-light text-zinc-900 dark:text-white mb-4">
                        {t('galeria.coming')}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10">
                        {t('galeria.comingNote')}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-600 mb-4">{t('galeria.ctaNote')}</p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 text-sm text-zinc-900 dark:text-white hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
                    >
                        {t('galeria.cta')}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                <div className="mt-16">
                    <Link href="/#products" className="text-xs text-zinc-400 dark:text-zinc-700 hover:text-zinc-600 dark:hover:text-zinc-500 transition-colors">
                        {t('galeria.back')}
                    </Link>
                </div>

            </div>
        </main>
    );
}
