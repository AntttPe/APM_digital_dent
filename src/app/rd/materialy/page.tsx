'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

const CONTENT = {
    pl: {
        tag: 'APM Digital Lab — Badania materiałowe',
        thesis1: 'Nie wybraliśmy materiału z katalogu.',
        thesis2: 'Przetestowaliśmy każdy.',
        intro: 'Zanim wyprodukowaliśmy pierwszy produkt kliniczny, przez wiele miesięcy testowaliśmy drukarki i żywice od różnych producentów. Systematycznie, empirycznie — nie na podstawie kart technicznych. Karty techniczne opisują, co materiał osiąga w warunkach laboratoryjnych producenta. Nas interesowało, co osiąga w naszych warunkach, przy naszych geometriach klinicznych.',
        introAccent: 'To jest różnica między produktem klinicznym a produktem "spełniającym wymagania".',

        testsLabel: 'Co testowaliśmy',
        testsP: 'Każda kombinacja drukarki i żywicy przechodziła przez ten sam protokół — od rzeczy podstawowych aż po te, o których producenci materiałów zazwyczaj nie piszą.',
        testsItems: [
            'Jakość wydruku — powierzchnia, rozdzielczość warstwy, wierne odwzorowanie geometrii przy różnych grubościach ścianek',
            'Dopasowanie kliniczne — precyzja osadzenia na modelu, luz przy krawędzi dziąsłowej, retencja',
            'Trwałość i wytrzymałość mechaniczna — w tym ekspozycja na warunki skrajne: temperatura, wilgoć, obciążenia okluzyjne',
            'Różne metody post-processingu — czas i intensywność naświetlania, mycie, wykończenie powierzchni',
            'Zapach i smak — bo nakładka spędza wiele godzin w jamie ustnej pacjenta i to nie jest kwestia drugorzędna',
        ],

        findingsLabel: 'Wnioski i efekt',
        findingsP1: 'Miesiące testów doprowadziły nas do opracowania własnej, indywidualnej metody produkcji — specyficznych parametrów druku, precyzyjnego protokołu post-processingu i procedury kontroli jakości skrojonych pod konkretną kombinację maszyny i materiału. Efekt jest mierzalny: dokładność wymiarowa i komfort użytkowania nakładek drukowanych cyfrowo nie mają punktu odniesienia w termoformowaniu.',
        findingsP2: 'Termoformowanie rozciąga materiał nad modelem — geometria jest przybliżeniem, grubość ścianki nierównomierna, a materiał po formowaniu ma inne właściwości niż przed. Nakładka projektowana i generowana cyfrowo, a następnie drukowana warstwa po warstwie, to inny produkt — nie lepsza wersja tego samego procesu.',
        findingsNote: 'Platforma i materiały, których używamy, zostały wybrane na podstawie wyników testów 90-dniowych — nie na podstawie materiałów marketingowych.',

        softwareLabel: 'Oprogramowanie produkcyjne',
        softwareP: 'Istniejące systemy zarządzania laboratoriami były pisane z myślą o ogólnych pracowniach protetycznych. Zbudowaliśmy własne — śledzące każde zlecenie od przyjęcia skanu do wydania gotowego produktu, z pełnym logiem parametrów druku, numeru partii żywicy i wyników kontroli jakości. Jeśli pojawi się odchylenie, jesteśmy w stanie skorelować je z konkretną partią materiału, dniem produkcyjnym lub parametrem maszyny.',
        softwareNote: 'Panel klienta z podglądem statusu zleceń w trakcie planowania.',

        livingLabel: 'Ten proces nigdy nie jest skończony',
        livingP: 'Zbudowaliśmy metodologię — ale nie uważamy jej za zamkniętą. Każda nakładka, która opuszcza laboratorium, to punkt danych. Każda opinia lekarza lub pacjenta — o dopasowaniu, komforcie, trwałości, albo o szczególe którego nie przewidzieliśmy — trafia bezpośrednio do kolejnej iteracji procesu. Nie do listy życzeń. Nie na przyszły roadmap. Do następnego cyklu produkcyjnego.',
        livingAccent: 'Jakość mierzymy nie standardem, który ustaliliśmy na początku — lecz tym, o ile jesteśmy lepsi niż miesiąc temu.',

        back: '← R&D',
        backHref: '/rd',
    },
    en: {
        tag: 'APM Digital Lab — Material research',
        thesis1: 'We didn\'t choose a material from a catalog.',
        thesis2: 'We tested every one.',
        intro: 'Before we produced the first clinical product, we spent many months testing printers and resins from different manufacturers. Systematically, empirically — not based on technical data sheets. Data sheets describe what a material achieves under the manufacturer\'s laboratory conditions. We were interested in what it achieves under our conditions, with our clinical geometries.',
        introAccent: 'That\'s the difference between a clinical product and a product that "meets requirements".',

        testsLabel: 'What we tested',
        testsP: 'Every printer-resin combination went through the same protocol — from the basics to things manufacturers rarely mention in their documentation.',
        testsItems: [
            'Print quality — surface finish, layer resolution, faithful geometry reproduction at varying wall thicknesses',
            'Clinical fit — precision of seating on the model, gingival margin clearance, retention',
            'Durability and mechanical strength — including exposure to extreme conditions: temperature, moisture, occlusal loading',
            'Different post-processing methods — curing time and intensity, washing, surface finishing',
            'Smell and taste — because the splint spends many hours in the patient\'s mouth and this is not a secondary consideration',
        ],

        findingsLabel: 'Findings and outcome',
        findingsP1: 'Months of testing led us to develop our own individual production method — specific print parameters, a precise post-processing protocol, and a quality control procedure tailored to the specific machine-material combination. The result is measurable: the dimensional accuracy and wearing comfort of digitally printed splints have no point of reference in thermoforming.',
        findingsP2: 'Thermoforming stretches material over a model — geometry is an approximation, wall thickness is uneven, and the material after forming has different properties than before. A splint designed and generated digitally, then printed layer by layer, is a different product — not a better version of the same process.',
        findingsNote: 'The platform and materials we use were selected based on 90-day test results — not based on marketing materials.',

        softwareLabel: 'Production software',
        softwareP: 'Existing lab management systems were written with general prosthetic workshops in mind. We built our own — tracking every order from scan receipt to finished product, with a full log of print parameters, resin batch number, and quality control results. If a deviation appears, we can correlate it with a specific material batch, production day, or machine parameter.',
        softwareNote: 'Client panel with order status tracking is in planning.',

        livingLabel: 'This process is never finished',
        livingP: 'We built the methodology — but we don\'t consider it complete. Every splint that leaves the laboratory is a data point. Every piece of feedback from a dentist or patient — about fit, comfort, durability, or a detail we hadn\'t considered — goes directly into the next iteration of the process. Not into a backlog. Not into a future roadmap. Into the next production cycle.',
        livingAccent: 'We measure quality not by the standard we set at the start, but by how much better we are than last month.',

        back: '← R&D',
        backHref: '/rd',
    },
} as const;

export default function MaterialyPage() {
    const { language } = useLanguage();
    const c = CONTENT[language as 'pl' | 'en'] ?? CONTENT.pl;

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

                <Section label={c.testsLabel}>
                    <p>{c.testsP}</p>
                    <ul className="space-y-3 mt-6">
                        {c.testsItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0 mt-2.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </Section>

                <Section label={c.findingsLabel}>
                    <p>{c.findingsP1}</p>
                    <p>{c.findingsP2}</p>
                    <p className="text-zinc-400 dark:text-zinc-500 text-sm pl-4 border-l border-zinc-200 dark:border-zinc-800">
                        {c.findingsNote}
                    </p>
                </Section>

                <Section label={c.softwareLabel}>
                    <p>{c.softwareP}</p>
                    <p className="text-zinc-400 dark:text-zinc-500 text-sm pl-4 border-l border-zinc-200 dark:border-zinc-800">
                        {c.softwareNote}
                    </p>
                </Section>

                <Section label={c.livingLabel}>
                    <p>{c.livingP}</p>
                    <div className="mt-8 pl-6 border-l border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-900 dark:text-white font-light">{c.livingAccent}</p>
                    </div>
                </Section>

                <div className="mt-4">
                    <Link
                        href={c.backHref}
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
