'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

const CONTENT = {
    pl: {
        tag: 'APM Digital Lab — R&D',
        title: 'Badania i rozwój',
        subtitle: 'Dwa równoległe projekty. Wspólna obsesja na punkcie precyzji.',
        back: '← APM Digital Lab',
        cards: [
            {
                number: '01',
                label: 'Badania materiałowe',
                title: 'Weryfikacja drukarek i żywic klinicznych',
                desc: 'Systematyczne testy kilkunastu platform druku i dziesiątek żywic medycznych przeprowadzone zanim trafił do nas pierwszy zlecenie kliniczne. Metodologia doboru materiałów, która leży u podstaw każdego produktu, który opuszcza nasze laboratorium.',
                cta: 'Metodologia →',
                href: '/rd/materialy',
                accent: 'from-emerald-500/10 to-teal-500/10',
                dot: 'bg-emerald-500',
            },
            {
                number: '02',
                label: 'DentalCAD Engine',
                title: 'Automatyczny pipeline CAD: od skanu do gotowej geometrii',
                desc: 'System napisany w C++ zastępujący ręczne projektowanie w komercyjnych narzędziach CAD/CAM. Trzy etapy: wczytanie skanu i automatyczna segmentacja zębów, generowanie geometrii szyny z zadanymi parametrami, eksport STL do druku 3D. Działający end-to-end — od pliku klinicznego do gotowej nakładki bez ingerencji ręcznej.',
                cta: 'Opis techniczny →',
                href: '/dental-cad',
                accent: 'from-blue-500/10 to-cyan-500/10',
                dot: 'bg-blue-500',
            },
        ],
    },
    en: {
        tag: 'APM Digital Lab — R&D',
        title: 'Research & Development',
        subtitle: 'Two parallel projects. One obsession with precision.',
        back: '← APM Digital Lab',
        cards: [
            {
                number: '01',
                label: 'Material research',
                title: 'Printer and clinical resin validation',
                desc: 'Systematic testing of over a dozen printing platforms and dozens of medical resins conducted before the first clinical case arrived. A material selection methodology that underlies every product that leaves our laboratory.',
                cta: 'Methodology →',
                href: '/rd/materialy',
                accent: 'from-emerald-500/10 to-teal-500/10',
                dot: 'bg-emerald-500',
            },
            {
                number: '02',
                label: 'DentalCAD Engine',
                title: 'Automated CAD pipeline: from scan to finished geometry',
                desc: 'A C++ system replacing manual design in commercial CAD/CAM tools. Three stages: scan loading and automatic tooth segmentation, splint geometry generation with defined parameters, STL export for 3D printing. A working end-to-end pipeline — from clinical file to finished splint geometry without manual intervention.',
                cta: 'Technical overview →',
                href: '/dental-cad',
                accent: 'from-blue-500/10 to-cyan-500/10',
                dot: 'bg-blue-500',
            },
        ],
    },
} as const;

export default function RdPage() {
    const { language } = useLanguage();
    const c = CONTENT[language as 'pl' | 'en'] ?? CONTENT.pl;

    return (
        <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white pt-28 pb-40 px-6">
            <div className="max-w-2xl mx-auto">

                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-16">
                    {c.tag}
                </p>

                <h1 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-4">
                    {c.title}
                </h1>
                <p className="text-zinc-400 dark:text-zinc-500 text-lg font-light mb-20">
                    {c.subtitle}
                </p>

                <div className="space-y-6">
                    {c.cards.map((card) => (
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
                        {c.back}
                    </Link>
                </div>

            </div>
        </main>
    );
}
