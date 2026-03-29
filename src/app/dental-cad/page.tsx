'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

// ─── Content ──────────────────────────────────────────────────────────────────

const CONTENT = {
    pl: {
        tag: 'APM Digital Lab — R&D',
        thesis1: 'Ręczne projektowanie szyn stomatologicznych.',
        thesis2: 'Zastąpione algorytmem.',
        intro: 'Każdy istniejący workflow CAD/CAM w stomatologii wymaga ręcznej ingerencji technika przy każdym przypadku: korekty modelu, dopasowania konturów, weryfikacji geometrii. Czas od skanu do gotowego projektu to godziny pracy. Jakość i powtarzalność zależą od osoby siedzącej przy klawiaturze.',
        introAccent: 'Budujemy coś innego.',

        engineLabel: 'Pipeline, nie narzędzie',
        engineP1: 'Budujemy zautomatyzowany pipeline CAD napisany w C++. Jego zadaniem jest przyjęcie cyfrowego skanu zębowego i wygenerowanie gotowej geometrii szyny — bez ręcznej ingerencji na żadnym etapie. System zastępuje komercyjne narzędzia CAD/CAM w tej jednej, precyzyjnie zdefiniowanej klasie zadań.',
        engineP2: 'Pipeline składa się z trzech spójnych etapów. Najpierw skan wczytywany jest jako siatka trójkątów i automatycznie segmentowany — algorytm wyznacza granice każdego zęba na podstawie analizy krzywizny powierzchni i nadaje mu numer FDI. Następnie dla każdego zęba generowana jest geometria nakładki: dwustronny offset tworzy zamknięty shell o zadanej grubości i luzie klinicznym. Krawędź dziąsłowa jest przycinana i wygładzana z interpolowanym przejściem w przestrzeniach międzyzębowych. Wynik eksportowany jest jako plik STL do slicera.',

        practiceLabel: 'Co to oznacza w praktyce',
        practiceP: 'Technik wysyła skan. System zwraca gotową geometrię. Grubość, luz kliniczny, linia dziąsłowa — wszystko jako parametry, nie jako efekt ręcznego kształtowania. Ten sam skan i te same parametry zawsze dają matematycznie identyczny wynik.',
        practiceItems: [
            'Automatyczna segmentacja zębów z numeracją FDI i możliwością ręcznej korekty w interfejsie graficznym',
            'Grubość nakładki i luz kliniczny jako zdefiniowane parametry — nie ręczne przybliżenia',
            'Gładka krawędź dziąsłowa z interpolowanym przejściem w przestrzeniach międzyzębowych',
            'Output: topologicznie spójny plik STL gotowy bezpośrednio do slicera i druku',
        ],
        practiceNote: 'Stan aktualny: działający system end-to-end na skanach klinicznych. Trwają prace rozwojowe, udoskonalające i optymalizacyjne.',

        whyLabel: 'Dlaczego to ma znaczenie',
        whyP1: 'Ręczny workflow CAD/CAM oznacza, że jakość projektu zależy od technika: jego doświadczenia, zmęczenia, dnia tygodnia. Każdy przypadek to kilkadziesiąt minut do kilku godzin pracy. Każda korekta to nowy czas. Wyniki są powtarzalne tylko o tyle, o ile powtarzalny jest człowiek.',
        whyP2: 'Nasz pipeline jest deterministyczny. Te same dane wejściowe zawsze generują ten sam output — nie przybliżony, nie "wystarczająco dobry", lecz matematycznie identyczny. Skalowalność tego modelu to nie przyspieszenie istniejącego procesu. To eliminacja jego zmienności.',
        whyQuote1: 'Nie zamiast technika.',
        whyQuote2: 'Technik kontroluje. Algorytm eliminuje powtarzalną robotę.',

        roadmapLabel: 'Roadmap',
        roadmapIntro: 'Silnik to platforma. Moduły kliniczne to aplikacje zbudowane na jego fundamencie — każdy kolejny korzysta z tych samych geometrycznych operacji.',

        forLabel: 'Dla kogo',
        forItems: [
            'Dla laboratoriów protetycznych, dla których jakość kliniczna jest bezwzględnym priorytetem — nie tańszy workflow, lecz wyniki geometryczne niemożliwe do osiągnięcia konwencjonalnymi metodami.',
            'Dla klinik z ambicją skrócenia czasu od skanu do gotowego produktu klinicznego z dni do godzin — bez kompromisów na żadnym etapie łańcucha geometrycznego.',
            'Dla podmiotów, które dostrzegają, że fundamenty cyfrowej stomatologii są przepisywane od nowa — i chcą uczestniczyć w tej rozmowie zanim stanie się to oczywiste.',
        ],

        ctaText: 'Jesteśmy w fazie aktywnego rozwoju. Jeśli chcesz być wśród pierwszych, którzy to zobaczą — napisz.',
        back: '← APM Digital Lab',
    },

    en: {
        tag: 'APM Digital Lab — R&D',
        thesis1: 'Manual dental splint design.',
        thesis2: 'Replaced by an algorithm.',
        intro: 'Every existing CAD/CAM workflow in dentistry requires manual technician intervention on every case: model corrections, contour adjustments, geometry verification. Time from scan to finished design is measured in hours. Quality and repeatability depend on the person at the keyboard.',
        introAccent: 'We\'re building something different.',

        engineLabel: 'A pipeline, not a tool',
        engineP1: 'We are building an automated CAD pipeline written in C++. Its purpose is to receive a digital dental scan and produce finished splint geometry — without manual intervention at any stage. The system replaces commercial CAD/CAM tools for this one, precisely defined class of tasks.',
        engineP2: 'The pipeline consists of three coherent stages. First, the scan is loaded as a triangle mesh and automatically segmented — an algorithm identifies each tooth boundary using surface curvature analysis and assigns FDI numbering. Then, for each tooth, the splint geometry is generated: a bilateral mesh offset creates a closed shell with defined thickness and clinical clearance. The gingival margin is trimmed and smoothed with an interpolated transition at interproximal spaces. The result is exported as an STL file for the slicer.',

        practiceLabel: 'What this means in practice',
        practiceP: 'The technician sends a scan. The system returns finished geometry. Thickness, clinical clearance, gingival line — all defined as parameters, not as the result of manual shaping. The same scan and the same parameters always produce a mathematically identical result.',
        practiceItems: [
            'Automatic tooth segmentation with FDI numbering and manual correction tools in the graphical interface',
            'Splint thickness and clinical clearance as defined parameters — not manual approximations',
            'Smooth gingival margin with interpolated transitions at interproximal spaces',
            'Output: topologically consistent STL file ready directly for the slicer and printing',
        ],
        practiceNote: 'Current state: working end-to-end system on clinical scans. Development, refinement, and optimisation work ongoing.',

        whyLabel: 'Why this matters',
        whyP1: 'A manual CAD/CAM workflow means quality depends on the technician: their experience, fatigue, day of the week. Each case takes tens of minutes to several hours. Each correction means additional time. Results are repeatable only to the degree that a human is repeatable.',
        whyP2: 'Our pipeline is deterministic. The same inputs always produce the same output — not approximate, not "good enough", but mathematically identical. The scalability of this model is not an acceleration of the existing process. It is the elimination of its variability.',
        whyQuote1: 'Not a replacement for the technician.',
        whyQuote2: 'The technician stays in control. The algorithm eliminates the repetitive work.',

        roadmapLabel: 'Roadmap',
        roadmapIntro: 'The engine is a platform. Clinical modules are applications built on its foundation — each subsequent one reuses the same geometric operations.',

        forLabel: 'Who it\'s for',
        forItems: [
            'Dental labs for whom clinical quality is the absolute constraint — not a cheaper workflow, but geometric outcomes that conventional pipelines cannot produce.',
            'Clinics that want to reduce time from scan to finished clinical product from days to hours — without compromise at any stage of the geometric chain.',
            'Those who see that the foundations of digital dentistry are being rewritten — and want to be part of that conversation before it becomes obvious.',
        ],

        ctaText: 'We are in active development. If you want to be among the first to see it — write.',
        back: '← APM Digital Lab',
    },
} as const;

// ─── Roadmap data ─────────────────────────────────────────────────────────────

const ROADMAP = {
    pl: [
        {
            phase: '01',
            title: 'Silnik geometryczny',
            status: 'active' as const,
            statusLabel: 'Aktywna faza',
            desc: 'SDF pipeline, algebraicznie czyste operacje wolumetryczne, deterministyczny output topologicznie poprawnej powłoki STL. Fundament wszystkich modułów poniżej.',
        },
        {
            phase: '02',
            title: 'Moduł: Nakładki stomatologiczne',
            status: 'building' as const,
            statusLabel: 'W budowie',
            desc: 'Pierwsza kliniczna aplikacja silnika. Nakładki retencyjne, relaksacyjne i wybielające generowane automatycznie z danych skanu wewnątrzustnego. Kliniczny luz jako parametr pola, indywidualna linia dziąsłowa per-ząb, pełna gotowość do druku.',
        },
        {
            phase: '03',
            title: 'Moduł: Korony i mosty',
            status: 'planned' as const,
            statusLabel: 'Planowane',
            desc: 'Nie kolejna biblioteka szablonów. Planujemy zintegrować generatywny model anatomiczny wytrenowany na tysiącach naturalnych morfologii zębowych — silnik nie generuje korony, która "pasuje", lecz taką, która wygląda jakby była tam od zawsze. Morfologia guzków, bruzd i grzbietów obliczana jako ciągłe pole dopasowane do fenotypu zębowego pacjenta. Kontakty okluzyjne optymalizowane automatycznie w przestrzeni SDF.',
        },
        {
            phase: '04',
            title: 'Moduł: Wypełnienia i techniki małoinwazyjne',
            status: 'planned' as const,
            statusLabel: 'Planowane',
            desc: 'Wypełnienia kompozytowe klas I–V z precyzyjną kontrolą geometrii kontaktu proksymalnego. Natywne wsparcie techniki flow injection — automatyczna generacja matryc sekcyjnych i kanałów iniekcyjnych pod odbudowę minimalnie inwazyjną.',
        },
        {
            phase: '05',
            title: 'Moduł: Ortodoncja',
            status: 'research' as const,
            statusLabel: 'Badania',
            desc: 'Symulacja przemieszczenia zębów jako ciągłej transformacji pola — bez oddzielnych siatek na każdy etap leczenia. Każda pozycja docelowa to izopowierzchnia w przestrzeni wolumetrycznej. Automatyczne planowanie sekwencji ustawienia zębów z uwzględnieniem geometrii korzeni, grubości kości wyrostka i relacji okluzyjnych — cały plan leczenia jako spójna trajektoria w jednym modelu anatomicznym.',
        },
    ],
    en: [
        {
            phase: '01',
            title: 'Geometry engine',
            status: 'active' as const,
            statusLabel: 'Active phase',
            desc: 'SDF pipeline, algebraically clean volumetric operations, deterministic output of a topologically correct STL shell. Foundation for all modules below.',
        },
        {
            phase: '02',
            title: 'Module: Dental splints',
            status: 'building' as const,
            statusLabel: 'In development',
            desc: 'First clinical application of the engine. Retention, occlusal, and whitening splints generated automatically from intraoral scan data. Clinical clearance as a field parameter, per-tooth gingival margin, print-ready output.',
        },
        {
            phase: '03',
            title: 'Module: Crowns and bridges',
            status: 'planned' as const,
            statusLabel: 'Planned',
            desc: 'Not another template library. We plan to integrate a generative anatomical model trained on thousands of natural tooth morphologies — the engine doesn\'t generate a crown that "fits", but one that looks like it was always there. Cusp, fissure, and ridge morphology computed as a continuous field matched to the patient\'s dental phenotype. Occlusal contacts optimized automatically in SDF space.',
        },
        {
            phase: '04',
            title: 'Module: Restorations and minimally invasive techniques',
            status: 'planned' as const,
            statusLabel: 'Planned',
            desc: 'Class I–V composite restorations with precise proximal contact geometry control. Native support for flow injection technique — automatic generation of sectional matrices and injection channels for direct minimally invasive restorations.',
        },
        {
            phase: '05',
            title: 'Module: Orthodontics',
            status: 'research' as const,
            statusLabel: 'Research',
            desc: 'Tooth movement simulated as continuous field transformation — no separate meshes per treatment stage. Every target position is an isosurface in volumetric space. Automatic tooth positioning sequence planning accounting for root geometry, alveolar bone thickness, and occlusal relationships — the entire treatment plan as a coherent trajectory within a single anatomical model.',
        },
    ],
};

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DentalCadPage() {
    const { language } = useLanguage();
    const c  = CONTENT[language as 'pl' | 'en'] ?? CONTENT.pl;
    const rm = ROADMAP[language as 'pl' | 'en']  ?? ROADMAP.pl;

    return (
        <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white pt-28 pb-40 px-6">
            <div className="max-w-2xl mx-auto">

                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-20">
                    {c.tag}
                </p>

                <h1 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-3">
                    {c.thesis1}
                </h1>
                <h2 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-14 text-zinc-400 dark:text-zinc-500">
                    {c.thesis2}
                </h2>

                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    {c.intro}
                </p>
                <p className="text-zinc-900 dark:text-white text-xl font-light mb-24">
                    {c.introAccent}
                </p>

                <Section label={c.engineLabel}>
                    <p>{c.engineP1}</p>
                    <p>{c.engineP2}</p>
                </Section>

                <Section label={c.practiceLabel}>
                    <p>{c.practiceP}</p>
                    <ul className="space-y-3 mt-6">
                        {c.practiceItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 flex-shrink-0 mt-2.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-zinc-400 dark:text-zinc-500 text-sm">{c.practiceNote}</p>
                </Section>

                <Section label={c.whyLabel}>
                    <p>{c.whyP1}</p>
                    <p>{c.whyP2}</p>
                    <div className="mt-8 pl-6 border-l border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-900 dark:text-white font-light">{c.whyQuote1}</p>
                        <p className="text-zinc-400 dark:text-zinc-500">{c.whyQuote2}</p>
                    </div>
                </Section>

                <Section label={c.roadmapLabel}>
                    <p className="mb-12">{c.roadmapIntro}</p>

                    <div className="relative">
                        <div className="absolute left-[6px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />
                        <div className="space-y-10">
                            {rm.map((item) => (
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

                <Section label={c.forLabel}>
                    <ul className="space-y-4">
                        {c.forItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 flex-shrink-0 mt-2.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </Section>

                <div className="pt-20 border-t border-zinc-200 dark:border-zinc-900">
                    <p className="text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                        {c.ctaText}
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
                        {c.back}
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
