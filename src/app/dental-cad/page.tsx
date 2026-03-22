'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

// ─── Content ──────────────────────────────────────────────────────────────────

const CONTENT = {
    pl: {
        tag: 'APM Digital Lab — R&D',
        thesis1: 'Zęby to nie siatki wielokątów.',
        thesis2: 'Zęby to pola.',
        intro: 'Każdy istniejący system CAD/CAM w stomatologii reprezentuje anatomię pacjenta jako siatkę wielokątów — zdyskretyzowane przybliżenie ciągłej geometrii. Każda operacja: przycięcie, offset, boolowskie łączenie — wprowadza nowe błędy topologiczne. Działają tak od trzydziestu lat. I przez trzydzieści lat wszyscy akceptowali te ograniczenia jako nieuniknione.',
        introAccent: 'My nie.',

        engineLabel: 'Nie narzędzie. Silnik.',
        engineP1: 'Budujemy silnik CAD nowej generacji — warstwę geometryczną opartą na wolumetrycznej reprezentacji pola. Każdy ząb istnieje w nim jako trójwymiarowe pole skalarne: siatka wokseli, gdzie każda wartość koduje dokładną odległość ze znakiem od najbliższej powierzchni anatomicznej. Gradient tego pola wyznacza normalną. Izopowierzchnia wyznacza geometrię. Nie wielokąty. Nie przybliżenia.',
        engineP2: 'Ta matematyka — Signed Distance Fields, zaimplementowana na bibliotece wolumetrycznej OpenVDB (open-source DreamWorks/Disney) — leży u podstaw symulacji fizycznych w produkcjach Pixara, systemu globalnego oświetlenia Lumen w Unreal Engine 5 oraz optymalizacji topologicznej komponentów strukturalnych w przemyśle aerospace i obronnym. Sprawdzona podstawa systemów wymagających deterministycznej precyzji w skali przemysłowej. My przenosimy ją do stomatologii.',

        practiceLabel: 'Co to oznacza w praktyce',
        practiceP: 'Kiedy silnik generuje nakładkę, nie "dopasowuje szablonu". On rozumie kształt łuku zębowego — krzywizny, marginesy dziąsłowe, relacje okluzyjne — i buduje geometrię punkt po punkcie, z dokładnością do setnych części milimetra.',
        practiceItems: [
            'Kliniczny luz jako parametr izopowierzchni — nie ręczny offset siatki podatny na artefakty krawędziowe',
            'Indywidualna linia dziąsłowa obliczana z lokalnej topografii każdego zęba — nie globalna płaszczyzna cięcia',
            'Output jako topologicznie spójna, zamknięta sieć — gwarantowana poprawność geometryczna bez manualnego postprocessingu',
        ],
        practiceNote: 'Czas generowania pełnego łuku: kilkadziesiąt sekund na stacji roboczej. Na GPU — szybciej.',

        whyLabel: 'Dlaczego to ważne',
        whyP1: 'Mesh-based pipeline oznacza, że każda operacja boolowska, każdy offset, każde zaokrąglenie krawędzi wprowadza potencjalne błędy: non-manifold edges, odwrócone normalne, dziury w geometrii. Systemy CAD/CAM radzą sobie z tym przez warstwę napraw — automatyczną i ręczną — którą technik wykonuje przy każdym przypadku. Godzinami.',
        whyP2: 'Nasz pipeline jest immutable i deterministyczny. Operacje na polu SDF są algebraicznie czyste — min(), max(), lerp() na polach skalarnych nie generują artefaktów topologicznych. Ta sama anatomia, te same parametry kliniczne — zawsze matematycznie poprawny output.',
        whyQuote1: 'To nie jest ulepszenie istniejącego podejścia.',
        whyQuote2: 'To jest wymiana fundamentów.',

        roadmapLabel: 'Roadmap',
        roadmapIntro: 'Silnik to platforma. Moduły kliniczne to aplikacje zbudowane na jej fundamencie — każdy kolejny korzysta z tych samych wolumetrycznych operacji geometrycznych.',

        forLabel: 'Dla kogo',
        forItems: [
            'Dla laboratoriów protetycznych, dla których jakość kliniczna jest bezwzględnym priorytetem — nie tańszy workflow, lecz wyniki geometryczne niemożliwe do osiągnięcia konwencjonalnymi metodami.',
            'Dla klinik z ambicją skrócenia czasu od skanu do gotowego produktu klinicznego z dni do godzin — bez kompromisów na żadnym etapie łańcucha geometrycznego.',
            'Dla podmiotów, które dostrzegają, że fundamenty cyfrowej stomatologii są przepisywane od nowa — i chcą uczestniczyć w tej rozmowie zanim stanie się to oczywiste.',
        ],

        ctaText: 'Jesteśmy w fazie budowy silnika. Jeśli chcesz być wśród pierwszych, którzy to zobaczą — napisz.',
        back: '← APM Digital Lab',
    },

    en: {
        tag: 'APM Digital Lab — R&D',
        thesis1: 'Teeth are not polygon meshes.',
        thesis2: 'Teeth are fields.',
        intro: 'Every existing CAD/CAM system in dentistry represents patient anatomy as a polygon mesh — a discretized approximation of continuous geometry. Every operation: trimming, offsetting, boolean union — introduces new topological errors. They have worked this way for thirty years. And for thirty years, everyone accepted those limitations as unavoidable.',
        introAccent: 'We don\'t.',

        engineLabel: 'Not a tool. An engine.',
        engineP1: 'We\'re building a next-generation CAD engine — a geometric layer based on volumetric field representation. Every tooth exists in it as a three-dimensional scalar field: a voxel grid where every value encodes the exact signed distance to the nearest anatomical surface. The field gradient defines the surface normal. The isosurface defines the geometry. No polygons. No approximations.',
        engineP2: 'This mathematics — Signed Distance Fields, implemented on the OpenVDB volumetric library (open-source DreamWorks/Disney) — underlies physical simulations in Pixar productions, the Lumen global illumination system in Unreal Engine 5, and topological optimization of structural components in aerospace and defense. A proven foundation for systems requiring deterministic precision at industrial scale. We\'re bringing it to dentistry.',

        practiceLabel: 'What this means in practice',
        practiceP: 'When the engine generates a splint, it doesn\'t "fit a template". It understands the shape of the dental arch — its curvatures, gingival margins, occlusal relationships — and builds geometry point by point, with accuracy down to hundredths of a millimeter.',
        practiceItems: [
            'Clinical clearance as an isosurface parameter — not a manual mesh offset prone to edge artifacts',
            'Individual gingival margin computed from local topography of each tooth — not a global cutting plane',
            'Output as a topologically consistent, closed manifold — guaranteed geometric correctness without manual postprocessing',
        ],
        practiceNote: 'Full arch generation time: seconds on a workstation. On GPU — faster.',

        whyLabel: 'Why this matters',
        whyP1: 'A mesh-based pipeline means every boolean operation, every offset, every edge fillet introduces potential errors: non-manifold edges, flipped normals, holes in geometry. CAD/CAM systems handle this through a repair layer — automated and manual — that technicians run on every case. For hours.',
        whyP2: 'Our pipeline is immutable and deterministic. Operations on SDF fields are algebraically clean — min(), max(), lerp() on scalar fields generate no topological artifacts. Same anatomy, same clinical parameters — always a mathematically correct output.',
        whyQuote1: 'This is not an improvement on the existing approach.',
        whyQuote2: 'This is a replacement of the foundations.',

        roadmapLabel: 'Roadmap',
        roadmapIntro: 'The engine is a platform. Clinical modules are applications built on its foundation — each subsequent one reuses the same volumetric geometric operations.',

        forLabel: 'Who it\'s for',
        forItems: [
            'Dental labs for whom clinical quality is the absolute constraint — not a cheaper workflow, but geometric outcomes that conventional pipelines cannot produce.',
            'Clinics that want to reduce time from scan to finished clinical product from days to hours — without compromise at any stage of the geometric chain.',
            'Those who see that the foundations of digital dentistry are being rewritten — and want to be part of that conversation before it becomes obvious.',
        ],

        ctaText: 'We\'re in the engine-building phase. If you want to be among the first to see it — write.',
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
