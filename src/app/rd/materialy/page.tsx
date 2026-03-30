'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

export default function MaterialyPage() {
    const { t } = useTranslation();

    const testsItems = t('rdMaterialy.testsItems') as string[];

    return (
        <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white pt-28 pb-40 px-6">
            <div className="max-w-2xl mx-auto">

                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-20">
                    {t('rdMaterialy.tag')}
                </p>

                <h1 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-3">
                    {t('rdMaterialy.thesis1')}
                </h1>
                <h2 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-14 text-zinc-400 dark:text-zinc-500">
                    {t('rdMaterialy.thesis2')}
                </h2>

                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    {t('rdMaterialy.intro')}
                </p>
                <p className="text-zinc-900 dark:text-white text-xl font-light mb-24">
                    {t('rdMaterialy.introAccent')}
                </p>

                <Section label={t('rdMaterialy.testsLabel') as string}>
                    <p>{t('rdMaterialy.testsP')}</p>
                    <ul className="space-y-3 mt-6">
                        {Array.isArray(testsItems) && testsItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0 mt-2.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </Section>

                <Section label={t('rdMaterialy.findingsLabel') as string}>
                    <p>{t('rdMaterialy.findingsP1')}</p>
                    <p>{t('rdMaterialy.findingsP2')}</p>
                    <p className="text-zinc-400 dark:text-zinc-500 text-sm pl-4 border-l border-zinc-200 dark:border-zinc-800">
                        {t('rdMaterialy.findingsNote')}
                    </p>
                </Section>

                <Section label={t('rdMaterialy.softwareLabel') as string}>
                    <p>{t('rdMaterialy.softwareP')}</p>
                    <p className="text-zinc-400 dark:text-zinc-500 text-sm pl-4 border-l border-zinc-200 dark:border-zinc-800">
                        {t('rdMaterialy.softwareNote')}
                    </p>
                </Section>

                <Section label={t('rdMaterialy.livingLabel') as string}>
                    <p>{t('rdMaterialy.livingP')}</p>
                    <div className="mt-8 pl-6 border-l border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-900 dark:text-white font-light">{t('rdMaterialy.livingAccent')}</p>
                    </div>
                </Section>

                <div className="mt-4">
                    <Link
                        href={t('rdMaterialy.backHref') as string}
                        className="text-xs text-zinc-400 dark:text-zinc-700 hover:text-zinc-600 dark:hover:text-zinc-500 transition-colors"
                    >
                        {t('rdMaterialy.back')}
                    </Link>
                </div>

            </div>
        </main>
    );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="mb-20">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 mb-8">
                {label}
            </p>
            <div className="space-y-5 text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {children}
            </div>
        </div>
    );
}
