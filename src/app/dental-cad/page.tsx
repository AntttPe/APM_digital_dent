import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'DentalCAD — APM Digital Lab',
    description: 'System CAD nowej generacji do stomatologii cyfrowej. Signed Distance Fields zamiast siatek wielokątów.',
    robots: { index: false, follow: false },
};

const STACK = [
    { key: 'C++20',        desc: 'rdzeń systemu' },
    { key: 'OpenVDB 12',   desc: 'renderowanie wolumetryczne (DreamWorks / Disney)' },
    { key: 'SDF pipeline', desc: 'generowanie zamkniętych powłok gotowych do druku 3D' },
    { key: 'STL output',   desc: 'kompatybilny z dowolnym skanerem wewnątrzustnym i drukarką żywiczną' },
];

export default function DentalCadPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white pt-28 pb-40 px-6">
            <div className="max-w-2xl mx-auto">

                {/* Tag */}
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-20">
                    APM Digital Lab — R&amp;D
                </p>

                {/* Opening thesis */}
                <h1 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-3 text-zinc-900 dark:text-white">
                    Zęby to nie siatki wielokątów.
                </h1>
                <h2 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-14 text-zinc-400 dark:text-zinc-500">
                    Zęby to pola.
                </h2>

                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    Każdy system CAD/CAM w stomatologii — Exocad, 3Shape, Invisalign — traktuje ludzki ząb jak obiekt geometryczny: zbiór trójkątów, powierzchnię do obrabiania. Działają tak od trzydziestu lat. I przez trzydzieści lat wszyscy projektowali nakładki i aparaty w ten sam sposób.
                </p>

                <p className="text-zinc-900 dark:text-white text-xl font-light mb-24">
                    My nie.
                </p>

                {/* Sekcja 1 */}
                <Section label="Czym jest nasz system">
                    <p>
                        Budujemy system CAD nowej generacji, w którym każdy ząb istnieje jako pole matematyczne — przestrzeń, w której każdy punkt w trójwymiarze niesie precyzyjną informację o odległości od powierzchni zęba. Nie wielokąty. Nie przybliżenia. Czysta geometria różniczkowa, liczona w każdym wokselu skanu.
                    </p>
                    <p>
                        Ta technologia — Signed Distance Fields (SDF) — na co dzień porusza oceany i burze ogniowe w hollywoodzkich produkcjach. My używamy jej do projektowania nakładek dentystycznych. Bo uważamy, że precyzja pacjenta zasługuje na narzędzia z najwyższej półki.
                    </p>
                </Section>

                {/* Sekcja 2 */}
                <Section label="Co to oznacza w praktyce">
                    <p>
                        Kiedy nasz system generuje nakładkę retencyjną, ochronną lub sportową, nie "dopasowuje szablonu". On rozumie kształt łuku zębowego — jego krzywizny, marginesy dziąsłowe, relacje okluzyjne — i na tej podstawie buduje nakładkę punkt po punkcie, z dokładnością do setnych części milimetra.
                    </p>
                    <ul className="space-y-3 mt-6">
                        {[
                            'Zachowuje kliniczny luz między zębem a materiałem nakładki',
                            'Podąża za naturalną linią dziąsłową każdego zęba osobno — nie globalną płaszczyzną cięcia',
                            'Jest gotowa do druku 3D jako zamknięta, matematycznie spójna powłoka',
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 flex-shrink-0 mt-2.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-zinc-400 dark:text-zinc-500 text-sm">
                        Czas generowania pełnego łuku: kilkadziesiąt sekund na stacji roboczej. Na urządzeniach z akceleracją GPU — jeszcze szybciej.
                    </p>
                </Section>

                {/* Sekcja 3 */}
                <Section label="Dlaczego to ważne">
                    <p>
                        Istniejące systemy mają błędy wbudowane w filozofię. Mesh-based pipeline oznacza, że każda operacja boolowska, każde zaokrąglenie, każdy offset wprowadza nowe artefakty geometryczne. Te artefakty są potem szlifowane manualnie przez technika. Godzinami.
                    </p>
                    <p>
                        Nasz pipeline jest immutable i deterministyczny. Ta sama anatomia, te same parametry — zawsze ten sam wynik. Bez losowych ząbków. Bez niespodzianek po wydruku.
                    </p>
                    <div className="mt-8 pl-6 border-l border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-900 dark:text-white font-light">
                            To nie jest ulepszenie istniejącego podejścia.
                        </p>
                        <p className="text-zinc-400 dark:text-zinc-500">
                            To jest wymiana fundamentów.
                        </p>
                    </div>
                </Section>

                {/* Stack */}
                <Section label="Stack technologiczny">
                    <p className="mb-8">
                        Dla tych, którzy chcą wiedzieć.
                    </p>
                    <div className="space-y-4">
                        {STACK.map(({ key, desc }) => (
                            <div key={key} className="flex gap-6">
                                <span className="font-mono text-sm text-zinc-900 dark:text-zinc-300 w-32 flex-shrink-0 pt-0.5">
                                    {key}
                                </span>
                                <span className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed">
                                    {desc}
                                </span>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Dla kogo */}
                <Section label="Dla kogo">
                    <ul className="space-y-4">
                        {[
                            'Dla laboratoriów protetycznych, które chcą zautomatyzować produkcję nakładek bez utraty jakości klinicznej.',
                            'Dla klinik, które chcą skrócić czas od skanu do gotowego urządzenia z dni do godzin.',
                            'Dla każdego, kto uważa, że stomatologia zasługuje na narzędzia XXI wieku.',
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 flex-shrink-0 mt-2.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </Section>

                {/* CTA */}
                <div className="pt-20 border-t border-zinc-200 dark:border-zinc-900">
                    <p className="text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                        Jesteśmy jeszcze w fazie R&amp;D. Jeśli chcesz być wśród pierwszych, którzy to zobaczą — napisz.
                    </p>
                    <a
                        href="mailto:kontakt@apmlab.pl"
                        className="inline-flex items-center gap-2 text-sm text-zinc-900 dark:text-white hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
                    >
                        kontakt@apmlab.pl
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

                {/* Back */}
                <div className="mt-16">
                    <Link
                        href="/"
                        className="text-xs text-zinc-400 dark:text-zinc-700 hover:text-zinc-600 dark:hover:text-zinc-500 transition-colors"
                    >
                        ← APM Digital Lab
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
