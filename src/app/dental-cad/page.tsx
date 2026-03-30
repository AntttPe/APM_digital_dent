'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

const STATUS_STYLES = {
    active:   'text-blue-500 dark:text-blue-400',
    building: 'text-zinc-500 dark:text-zinc-400',
    planned:  'text-zinc-400 dark:text-zinc-600',
    research: 'text-zinc-300 dark:text-zinc-700',
};

const DOT_STYLES = {
    active:   'bg-blue-500',
    building: 'bg-zinc-400 dark:bg-zinc-500',
    planned:  'border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black',
    research: 'border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black',
};

type Status = keyof typeof STATUS_STYLES;

export default function DentalCadPage() {
    const { t } = useTranslation();

    const practiceItems = t('dentalCad.practiceItems') as string[];
    const roadmap = t('dentalCad.roadmap') as Array<{
        phase: string; title: string; status: Status; statusLabel: string; desc: string;
    }>;
    const forItems = t('dentalCad.forItems') as string[];

    return (
        <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white pt-28 pb-40 px-6">
            <div className="max-w-2xl mx-auto">

                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-20">
                    {t('dentalCad.tag')}
                </p>

                <h1 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-3">
                    {t('dentalCad.thesis1')}
                </h1>
                <h2 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-14 text-zinc-400 dark:text-zinc-500">
                    {t('dentalCad.thesis2')}
                </h2>

                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    {t('dentalCad.intro')}
                </p>
                <p className="text-zinc-900 dark:text-white text-xl font-light mb-24">
                    {t('dentalCad.introAccent')}
                </p>

                <Section label={t('dentalCad.engineLabel') as string}>
                    <p>{t('dentalCad.engineP1')}</p>
                    <p>{t('dentalCad.engineP2')}</p>
                </Section>

                <Section label={t('dentalCad.practiceLabel') as string}>
                    <p>{t('dentalCad.practiceP')}</p>
                    <ul className="space-y-3 mt-6">
                        {Array.isArray(practiceItems) && practiceItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 flex-shrink-0 mt-2.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-zinc-400 dark:text-zinc-500 text-sm">{t('dentalCad.practiceNote')}</p>
                </Section>

                <Section label={t('dentalCad.whyLabel') as string}>
                    <p>{t('dentalCad.whyP1')}</p>
                    <p>{t('dentalCad.whyP2')}</p>
                    <div className="mt-8 pl-6 border-l border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-900 dark:text-white font-light">{t('dentalCad.whyQuote1')}</p>
                        <p className="text-zinc-400 dark:text-zinc-500">{t('dentalCad.whyQuote2')}</p>
                    </div>
                </Section>

                <Section label={t('dentalCad.roadmapLabel') as string}>
                    <p className="mb-12">{t('dentalCad.roadmapIntro')}</p>

                    <div className="relative">
                        <div className="absolute left-[6px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />
                        <div className="space-y-10">
                            {Array.isArray(roadmap) && roadmap.map((item) => (
                                <div key={item.phase} className="relative flex gap-5 pl-7">
                                    <div className={`absolute left-0 top-[5px] w-3 h-3 rounded-full flex-shrink-0 ${DOT_STYLES[item.status]}`} />
                                    <div className="min-w-0">
                                        <div className="flex items-baseline gap-3 mb-1.5 flex-wrap">
                                            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-700 tracking-widest">
                                                {item.phase}
                                            </span>
                                            <span className="text-sm font-light text-zinc-900 dark:text-white">
                                                {item.title}
                                            </span>
                                            <span className={`text-[10px] uppercase tracking-wider ${STATUS_STYLES[item.status]}`}>
                                                {item.statusLabel}
                                            </span>
                                        </div>
                                        <p className="text-sm text-zinc-400 dark:text-zinc-500 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div className="relative flex gap-5 pl-7">
                                <div className="absolute left-[3px] top-0 flex flex-col gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-50 dark:bg-zinc-950" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                <Section label={t('dentalCad.forLabel') as string}>
                    <ul className="space-y-4">
                        {Array.isArray(forItems) && forItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 flex-shrink-0 mt-2.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </Section>

                <div className="pt-20 border-t border-zinc-200 dark:border-zinc-900">
                    <p className="text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                        {t('dentalCad.ctaText')}
                    </p>
                    <a
                        href="mailto:rd@apmdental.com"
                        className="inline-flex items-center gap-2 text-sm text-zinc-900 dark:text-white hover:text-zinc-400 dark:hover:text-zinc-400 transition-colors"
                    >
                        rd@apmdental.com
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

                <div className="mt-16">
                    <Link
                        href="/"
                        className="text-xs text-zinc-400 dark:text-zinc-700 hover:text-zinc-600 dark:hover:text-zinc-500 transition-colors"
                    >
                        {t('dentalCad.back')}
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
