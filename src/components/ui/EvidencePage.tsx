'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';

const EASE = [0.6, 0.05, 0.01, 0.9] as [number, number, number, number];

type StudyType = 'RCT' | 'in vitro' | 'przegląd' | 'specyfikacja';

interface Study {
    stat: string;
    statLabel: string;
    type: StudyType;
    title: string;
    authors: string;
    journal: string;
    year: string;
    url: string;
    finding: string;
    institution: string;
}

const typeConfig: Record<StudyType, { label: string; classes: string; dot: string }> = {
    'RCT': {
        label: 'Badanie kliniczne RCT',
        classes: 'text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/5',
        dot: 'bg-emerald-500',
    },
    'in vitro': {
        label: 'Badanie eksperymentalne',
        classes: 'text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/5',
        dot: 'bg-blue-500',
    },
    'przegląd': {
        label: 'Przegląd systematyczny',
        classes: 'text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-500/20 bg-violet-50 dark:bg-violet-500/5',
        dot: 'bg-violet-500',
    },
    'specyfikacja': {
        label: 'Dane producenta',
        classes: 'text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/30',
        dot: 'bg-zinc-400',
    },
};

const statColor: Record<StudyType, string> = {
    'RCT': 'text-emerald-600 dark:text-emerald-400',
    'in vitro': 'text-blue-600 dark:text-blue-400',
    'przegląd': 'text-violet-600 dark:text-violet-400',
    'specyfikacja': 'text-zinc-500 dark:text-zinc-400',
};

const studies: Study[] = [
    {
        stat: '3,5×',
        statLabel: 'krótszy czas produkcji',
        type: 'in vitro',
        title: 'Czas produkcji, dopasowanie i ścieralność szyn cyfrowych vs. konwencjonalnych',
        authors: 'Patzelt SBM, Krügel M, Wesemann C i wsp.',
        journal: 'Materials (Basel)',
        year: '2022',
        url: 'https://doi.org/10.3390/ma15031085',
        finding: 'Czas pracy technika: 47 min 52 s (cyfrowy) vs. 163 min 32 s (konwencjonalny), p=0,001. Dopasowanie ogólne szyn cyfrowych istotnie lepsze od konwencjonalnych (p=0,002). Brak istotnych różnic w ścieralności materiału (p=0,26).',
        institution: 'Universität Freiburg',
    },
    {
        stat: '25%',
        statLabel: 'lepsza dokładność vs. termoformowanie',
        type: 'in vitro',
        title: 'Wpływ technologii produkcji na dokładność powierzchni szyn CAD-CAM',
        authors: 'Orgev A, Levon JA, Chu T-MG, Morton D, Lin W-S',
        journal: 'Journal of Prosthodontics',
        year: '2023',
        url: 'https://doi.org/10.1111/jopr.13610',
        finding: 'Druk 3D: RMS intaglio 0,15±0,05 mm. Termoformowanie konwencjonalne: RMS 0,20±0,03 mm (p<0,001). Technologia produkcji istotnie wpłynęła na wierność szyn na obu powierzchniach. Obie metody dały klinicznie akceptowalne wyniki.',
        institution: 'Indiana University School of Dentistry',
    },
    {
        stat: '87%',
        statLabel: 'skuteczność kliniczna',
        type: 'RCT',
        title: 'Skuteczność kliniczna szyn 3D w leczeniu bruksizmu — dane z przeglądu PMC 2025',
        authors: 'Lei et al. (cytowane w przeglądzie PMC12294031)',
        journal: 'MDPI Dental Journal / PMC',
        year: '2025',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12294031/',
        finding: 'Szyny drukowane 3D osiągnęły wskaźnik skuteczności 87,3% w redukcji bólu vs. 82,9% dla grupy konwencjonalnej. Cyfrowy workflow (skanowanie wewnątrzustne, CAD) eliminuje błędy manualne i przekłada się na dokładniejsze dopasowanie szyny.',
        institution: 'Systematyczny przegląd PMC 2025',
    },
    {
        stat: 'RCT',
        statLabel: 'n=47 · obserwacja 3 mies.',
        type: 'RCT',
        title: 'Szyny relaksacyjne drukowane 3D vs. frezowane w bruksizmie i TMD',
        authors: 'Herpel C, Kykal J, Rues S, Schwindling FS, Rammelsberg P, Eberhard L',
        journal: 'Journal of Dentistry',
        year: '2023',
        url: 'https://www.sciencedirect.com/science/article/abs/pii/S0300571223001008',
        finding: 'Pierwsze randomizowane badanie kliniczne bezpośrednio porównujące szyny 3D vs. frezowane w bruksizmie/TMD. Szyny drukowane wykazały porównywalną skuteczność kliniczną, przeżywalność i satysfakcję pacjenta do szyn frezowanych w 3-miesięcznej obserwacji.',
        institution: 'Universität Heidelberg',
    },
    {
        stat: 'EMG',
        statLabel: 'obiektywny pomiar bruksizmu',
        type: 'RCT',
        title: 'Szyny 3D vs. konwencjonalne w bruksizmie sennym — nocne zapisy EMG',
        authors: 'Mattiello et al.',
        journal: 'Journal of Clinical Medicine',
        year: '2024',
        url: 'https://doi.org/10.3390/jcm13030776',
        finding: 'RCT (n=26, 3 miesiące) z nocnymi zapisami EMG-EKG. Istotne różnice w aktywności tonicznej bruksizmu (p=0,0009) i skurczach fazowych (p=0,002). Jedyne badanie łączące obiektywny pomiar EMG z analizą nanoindentacji materiałów szyn.',
        institution: 'Journal of Clinical Medicine',
    },
    {
        stat: '~50 µm',
        statLabel: 'RMS na powierzchni intaglio',
        type: 'in vitro',
        title: 'Dokładność szyn CAD/CAM: frezowanie vs. druk 3D — badanie porównawcze',
        authors: 'Reymus M, Hickel R, Keßler A',
        journal: 'Clinical Oral Investigations',
        year: '2020',
        url: 'https://doi.org/10.1007/s00784-020-03329-x',
        finding: 'Szyny drukowane SLA osiągnęły RMS ~50 µm na powierzchni intaglio przy optymalnej orientacji druku. Wysoka powtarzalność (precision) — odchylenia spójne i przewidywalne. Obie metody klinicznie akceptowalne.',
        institution: 'LMU München · Clinical Oral Investigations',
    },
    {
        stat: '±100 µm',
        statLabel: 'na 80% powierzchni intaglio',
        type: 'specyfikacja',
        title: 'Formlabs Dental LT Clear V2 — specyfikacja kliniczna i certyfikacja materiału',
        authors: 'Formlabs Inc.',
        journal: 'Application Guide · Regulatory Documentation',
        year: '2023',
        url: 'https://archive-media.formlabs.com/upload/AppGuide-Splints-Retainers-EN.pdf',
        finding: 'n=80 szyn: 80% powierzchni w tolerancji ±100 µm, 90% w ±125 µm. Shore D 78, wytrzymałość na rozciąganie 52 MPa, odporność na uderzenia 449 J/m. Certyfikat klasy IIa EU MDR + rejestracja FDA. Produkcja w pomieszczeniu ISO 8 / ISO 13485.',
        institution: 'Formlabs Inc. · FDA + EU MDR klasa IIa',
    },
    {
        stat: '0',
        statLabel: 'dodatkowych wizyt przy duplikacie',
        type: 'przegląd',
        title: 'Retainery drukowane 3D — przegląd systematyczny: archiwizacja cyfrowa i reproductibility',
        authors: 'Przegląd systematyczny',
        journal: 'PMC / NCBI',
        year: '2023',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10136491/',
        finding: 'Cyfrowe archiwizowanie modeli umożliwia ponowne wydrukowanie retainera lub szyny bez nowej wizyty i bez pobierania wycisku. Pacjenci, którzy gubią lub niszczą szynę, otrzymują duplikat identyczny z oryginałem bez angażowania czasu gabinetu.',
        institution: 'PMC Systematic Review',
    },
];

const heroStats = [
    { value: '3,5×', label: 'szybsza produkcja vs. tradycyjna metoda' },
    { value: '8', label: 'niezależnych badań i źródeł naukowych' },
    { value: '2018–2025', label: 'zakres czasowy analizowanej literatury' },
];

export default function EvidencePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white">

            {/* Back */}
            <div className="fixed top-20 left-6 z-50">
                <Link href="/">
                    <motion.button
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ x: -4 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group"
                    >
                        <svg className="w-4 h-4 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">Powrót</span>
                    </motion.button>
                </Link>
            </div>

            {/* Hero */}
            <section className="relative flex flex-col items-center justify-center min-h-[45vh] px-6 text-center overflow-hidden pt-32 pb-16">
                <div className="pointer-events-none absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)' }}
                />

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, ease: EASE }}
                    className="w-12 h-px mb-10 origin-center bg-blue-500"
                />

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-5"
                >
                    Dokumentacja naukowa
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
                    className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] mb-6 max-w-3xl"
                >
                    Badania i źródła naukowe
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.7 }}
                    className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 font-light max-w-xl leading-relaxed"
                >
                    Publikacje peer-reviewed i dane techniczne potwierdzające przewagę cyfrowej produkcji szyn stomatologicznych nad metodami konwencjonalnymi.
                </motion.p>
            </section>

            {/* Key stats bar */}
            <section className="px-6 pb-16">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.7 }}
                        className="grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/50"
                    >
                        {heroStats.map((s, i) => (
                            <div key={i} className="flex flex-col items-center justify-center py-7 px-4 text-center gap-1.5">
                                <span className="text-2xl md:text-3xl font-light text-zinc-900 dark:text-white tracking-tight">{s.value}</span>
                                <span className="text-xs text-zinc-400 dark:text-zinc-500 leading-snug">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Legend */}
            <section className="px-6 pb-8">
                <div className="max-w-4xl mx-auto flex flex-wrap gap-3 items-center">
                    <span className="text-xs text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mr-2">Typ źródła</span>
                    {(Object.entries(typeConfig) as [StudyType, typeof typeConfig[StudyType]][]).map(([, cfg]) => (
                        <span key={cfg.label} className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">{cfg.label}</span>
                        </span>
                    ))}
                </div>
            </section>

            {/* Studies */}
            <section className="px-6 pb-32">
                <div className="max-w-4xl mx-auto flex flex-col gap-3">
                    {studies.map((study, i) => {
                        const cfg = typeConfig[study.type];
                        const color = statColor[study.type];
                        return (
                            <FadeIn key={i} delay={i * 0.07} y={20}>
                                <a
                                    href={study.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block rounded-2xl border border-zinc-200 dark:border-zinc-800/60 bg-white dark:bg-zinc-950/30 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 transition-all duration-300"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-stretch gap-0">

                                        {/* Stat column */}
                                        <div className="flex sm:flex-col items-center sm:items-start justify-start sm:justify-center gap-3 sm:gap-1.5 px-6 pt-6 pb-0 sm:pb-6 sm:pr-0 sm:w-40 sm:border-r border-b sm:border-b-0 border-zinc-100 dark:border-zinc-800/60 flex-shrink-0">
                                            <span className={`text-3xl md:text-4xl font-light tabular-nums leading-none ${color}`}>
                                                {study.stat}
                                            </span>
                                            <span className="text-xs text-zinc-400 dark:text-zinc-500 leading-snug sm:mt-0.5">
                                                {study.statLabel}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-6 min-w-0">
                                            {/* Badges */}
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${cfg.classes}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                                    {cfg.label}
                                                </span>
                                                <span className="text-xs text-zinc-400 dark:text-zinc-600">
                                                    {study.journal} · {study.year}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-base font-light text-zinc-900 dark:text-white leading-snug mb-1.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-100 transition-colors">
                                                {study.title}
                                            </h3>

                                            {/* Authors + institution */}
                                            <p className="text-xs text-zinc-400 dark:text-zinc-600 mb-3 leading-relaxed">
                                                {study.authors}
                                                {study.institution && (
                                                    <> · <span className="text-zinc-400 dark:text-zinc-500">{study.institution}</span></>
                                                )}
                                            </p>

                                            {/* Finding */}
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                                                {study.finding}
                                            </p>

                                            {/* Link */}
                                            {study.url && (
                                                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Przejdź do źródła
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </a>
                            </FadeIn>
                        );
                    })}
                </div>

                {/* Disclaimer */}
                <FadeIn y={0} delay={0.2} className="max-w-4xl mx-auto mt-12 p-5 rounded-xl border border-zinc-100 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-950/30">
                    <p className="text-xs text-zinc-400 dark:text-zinc-600 leading-relaxed">
                        <span className="font-medium text-zinc-500 dark:text-zinc-500">Uwaga metodologiczna.</span>{' '}
                        Większość badań porównuje workflow cyfrowy vs. konwencjonalny ogółem — nie zawsze jest to izolowane porównanie druku 3D vs. samego termoformowania PETG. Dane Formlabs dotyczą Form 2/3B z żywicą LT Clear; dla Form 4B + LT Clear V2 dostępne są wyłącznie dane producenta. Rzeczywiste wyniki kliniczne mogą się różnić w zależności od protokołu i kalibracji drukarki.
                    </p>
                </FadeIn>
            </section>
        </div>
    );
}
