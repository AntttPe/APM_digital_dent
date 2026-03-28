'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

export default function LegalPage() {
    const { t } = useTranslation();
    const l = (key: string) => t(`legal.${key}`) as string;

    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white">
            <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">

                <div className="mb-12">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-4">APM Dental Lab</p>
                    <h1 className="text-4xl font-light tracking-tight mb-2">{l('title')}</h1>
                    <p className="text-sm text-zinc-500">{l('updated')}</p>
                </div>

                {/* Podmiot prowadzący */}
                <section className="mb-10 pb-10 border-b border-zinc-100 dark:border-zinc-800/60">
                    <h2 className="text-base font-light mb-4 text-zinc-700 dark:text-zinc-300">{l('operator.title')}</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{l('operator.intro')}</p>
                    <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                        <p><strong className="text-zinc-800 dark:text-zinc-200">[PEŁNA NAZWA FIRMY]</strong></p>
                        <p>[ULICA I NUMER], [KOD POCZTOWY] [MIEJSCOWOŚĆ]</p>
                        <p>NIP: [NIP]</p>
                        <p>REGON: [REGON]</p>
                    </div>
                    <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-3">{l('operator.note')}</p>
                </section>

                {/* Wyroby medyczne */}
                <section className="mb-10 pb-10 border-b border-zinc-100 dark:border-zinc-800/60">
                    <h2 className="text-base font-light mb-4 text-zinc-700 dark:text-zinc-300">{l('medical.title')}</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{l('medical.body')}</p>
                </section>

                {/* Faktury */}
                <section className="mb-10 pb-10 border-b border-zinc-100 dark:border-zinc-800/60">
                    <h2 className="text-base font-light mb-4 text-zinc-700 dark:text-zinc-300">{l('invoices.title')}</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{l('invoices.body')}</p>
                </section>

                {/* Kontakt */}
                <section className="mb-12">
                    <h2 className="text-base font-light mb-4 text-zinc-700 dark:text-zinc-300">{l('contact.title')}</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {l('contact.body')}{' '}
                        <a href="mailto:kontakt@apmdental.pl" className="text-zinc-700 dark:text-zinc-300 hover:underline">
                            kontakt@apmdental.pl
                        </a>
                    </p>
                </section>

                <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
                    ← {l('back')}
                </Link>
            </div>
        </div>
    );
}
