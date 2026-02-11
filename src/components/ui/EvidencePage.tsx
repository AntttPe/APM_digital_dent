'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

const ACCENT = '#3B82F6';

const EASE = [0.6, 0.05, 0.01, 0.9] as [number, number, number, number];

const sources = [
    {
        number: '01',
        title: 'KeySplint Hard – Technical Data Sheet',
        detail: 'Flexural strength 60–65 MPa (ISO 20795-2)',
        type: 'Specyfikacja producenta',
        publisher: 'Keystone Industries',
        year: '2021',
        url: 'https://keyprint.keystoneindustries.com/wp-content/uploads/2021/07/KeySplint-hard_TDS_R5.pdf',
    },
    {
        number: '02',
        title: 'Wear Study – KeySplint Hard vs Lucitone 199',
        detail: 'Odporność na ścieranie porównywalna z laboratoryjnym PMMA',
        type: 'Badanie materiałowe',
        publisher: 'Keystone Industries',
        year: '2021',
        url: 'https://keyprint.keystoneindustries.com/wp-content/uploads/2021/05/Wear_Study_Keysplint_2021.pdf',
    },
    {
        number: '03',
        title: '3D-Printed Retainers vs Thermoformed – Accuracy Comparison',
        detail: '„The new method for fabricating a 3D printed retainer is accurate and reliable in comparison to the vacuum formed retainer"',
        type: 'Badanie kliniczne',
        publisher: 'Scientific Research Publishing',
        year: '2018',
        url: 'https://www.scirp.org/journal/paperinformation?paperid=79685',
    },
    {
        number: '04',
        title: 'Accuracy of 3D-Printed Splints and Retainers – Meta-analysis',
        detail: 'Brak istotnych różnic klinicznych między metodą cyfrową a tradycyjną przy wyższej powtarzalności cyfrowej',
        type: 'Meta-analiza',
        publisher: 'SAGE Journals',
        year: '2024',
        url: 'https://journals.sagepub.com/doi/10.1177/03015742241253947',
    },
    {
        number: '05',
        title: 'Thickness Reduction in Thermoformed PET-G Appliances',
        detail: 'Miejscowe zmniejszenie grubości 7–25 % w zależności od strefy; średnio 20–40 % w literaturze',
        type: 'Badanie materiałowe',
        publisher: 'PMC / NCBI',
        year: '2018',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6123073/',
    },
];

const typeColors: Record<string, string> = {
    'Specyfikacja producenta': 'text-zinc-500 border-zinc-800',
    'Badanie materiałowe': 'text-blue-400/70 border-blue-500/20',
    'Badanie kliniczne': 'text-blue-400/70 border-blue-500/20',
    'Meta-analiza': 'text-purple-400/70 border-purple-500/20',
};

export default function EvidencePage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Back button */}
            <div className="fixed top-20 left-6 z-50">
                <Link href="/">
                    <motion.button
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ x: -4 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl hover:border-zinc-700 transition-all group"
                    >
                        <svg className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">Powrót</span>
                    </motion.button>
                </Link>
            </div>

            {/* Hero */}
            <section className="relative flex flex-col items-center justify-center min-h-[50vh] px-6 text-center overflow-hidden pt-32 pb-20">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)' }}
                />

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, ease: EASE }}
                    className="w-16 h-px mb-10 origin-center"
                    style={{ backgroundColor: ACCENT }}
                />

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-5"
                >
                    Dokumentacja naukowa
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
                    className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] mb-6 max-w-3xl"
                >
                    Badania i źródła naukowe
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.7 }}
                    className="text-base md:text-lg text-zinc-400 font-light max-w-xl leading-relaxed"
                >
                    Dane techniczne i publikacje naukowe potwierdzające parametry materiałów oraz przewagę cyfrowej produkcji w stomatologii.
                </motion.p>
            </section>

            {/* Sources list */}
            <section className="px-6 pb-32">
                <div className="max-w-4xl mx-auto">

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xs uppercase tracking-[0.3em] text-zinc-600 text-center mb-16"
                    >
                        {sources.length} źródeł
                    </motion.p>

                    <div className="flex flex-col gap-4">
                        {sources.map((source, i) => (
                            <motion.a
                                key={i}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                                whileHover={{ x: 4 }}
                                className="group flex items-start gap-6 p-6 md:p-8 rounded-2xl border border-zinc-800/60 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-900/30 transition-all duration-300"
                            >
                                {/* Number */}
                                <span
                                    className="text-xs font-light tracking-[0.2em] mt-1 flex-shrink-0"
                                    style={{ color: ACCENT }}
                                >
                                    {source.number}
                                </span>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${typeColors[source.type] ?? 'text-zinc-500 border-zinc-800'}`}>
                                            {source.type}
                                        </span>
                                        <span className="text-xs text-zinc-700">{source.publisher} · {source.year}</span>
                                    </div>

                                    <h3 className="text-base md:text-lg font-light text-white mb-2 leading-snug group-hover:text-zinc-200 transition-colors">
                                        {source.title}
                                    </h3>

                                    <p className="text-sm text-zinc-500 leading-relaxed">
                                        {source.detail}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <svg
                                    className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors flex-shrink-0 mt-1"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </motion.a>
                        ))}
                    </div>

                    {/* Disclaimer */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-xs text-zinc-700 text-center mt-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Dane oparte na specyfikacji producenta KeySplint (ISO 20795-2) oraz publikacjach naukowych (2018–2024). Rzeczywiste wartości mogą się minimalnie różnić w zależności od grubości i protokołu klinicznego.
                    </motion.p>
                </div>
            </section>
        </div>
    );
}