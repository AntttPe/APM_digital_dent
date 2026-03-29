'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

const EMAIL = 'kontakt@apmdental.pl';

type Product = 'retencyjna' | 'relaksacyjna' | 'wybielająca';
type Arch = 'górny' | 'dolny' | 'górny i dolny';

const THICKNESS_OPTIONS: Record<Product, string[]> = {
    retencyjna:    ['1 mm', 'Do ustalenia'],
    relaksacyjna:  ['2 mm okluzja / 1 mm strefy boczne', 'Do ustalenia'],
    'wybielająca': ['0,8 mm'],
};

const PRODUCT_LABELS_NOM: Record<Product, string> = {
    retencyjna:    'Szyna retencyjna',
    relaksacyjna:  'Szyna relaksacyjna',
    'wybielająca': 'Szyna do wybielania nakładowego',
};

const PRODUCT_LABELS_ACC: Record<Product, string> = {
    retencyjna:    'szynę retencyjną',
    relaksacyjna:  'szynę relaksacyjną',
    'wybielająca': 'szynę do wybielania nakładowego',
};

function buildEmail(fields: {
    product: Product;
    arch: Arch;
    patient: string;
    thickness: string;
    customThickness: string;
    notes: string;
    doctor: string;
    phone: string;
}): { subject: string; body: string } {
    const subject = `Zamówienie — ${PRODUCT_LABELS_NOM[fields.product]}`;
    const thicknessValue = fields.thickness === 'Do ustalenia'
        ? (fields.customThickness.trim() || 'Do ustalenia')
        : fields.thickness;

    const lines: string[] = [];
    lines.push('Dzień dobry,');
    lines.push('');
    lines.push(`Przesyłam zamówienie na ${PRODUCT_LABELS_ACC[fields.product]}.`);
    lines.push('');
    if (fields.patient.trim()) {
        lines.push(`Pacjent: ${fields.patient.trim()}`);
    }
    lines.push(`Łuk: ${fields.arch}`);
    lines.push(`Grubość: ${thicknessValue}`);
    if (fields.notes.trim()) {
        lines.push(`Uwagi: ${fields.notes.trim()}`);
    }
    lines.push('');
    lines.push('Skan w załączniku.');
    lines.push('');
    if (fields.phone.trim()) {
        lines.push(`Telefon kontaktowy: ${fields.phone.trim()}`);
        lines.push('');
    }
    lines.push('Pozdrawiam,');
    lines.push(fields.doctor.trim() || '[Podpis]');

    return { subject, body: lines.join('\n') };
}

function copyToClipboard(text: string): boolean {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(() => {});
        return true;
    }
    // fallback for non-HTTPS / older browsers
    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return true;
    } catch {
        return false;
    }
}

export default function EmailGenerator() {
    const [product, setProduct]               = useState<Product>('retencyjna');
    const [arch, setArch]                     = useState<Arch>('górny');
    const [patient, setPatient]               = useState('');
    const [thickness, setThickness]           = useState(THICKNESS_OPTIONS.retencyjna[0]);
    const [customThickness, setCustomThickness] = useState('');
    const [notes, setNotes]                   = useState('');
    const [doctor, setDoctor]                 = useState('');
    const [phone, setPhone]                   = useState('');
    const [copied, setCopied]                 = useState(false);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
        const parts = digits.match(/.{1,3}/g) || [];
        setPhone(parts.join(' '));
    };

    const handleProductChange = (p: Product) => {
        setProduct(p);
        setThickness(THICKNESS_OPTIONS[p][0]);
        setCustomThickness('');
    };

    const { subject, body } = useMemo(
        () => buildEmail({ product, arch, patient, thickness, customThickness, notes, doctor, phone }),
        [product, arch, patient, thickness, customThickness, notes, doctor, phone]
    );

    const fullText = `Temat: ${subject}\n\n${body}`;

    const handleCopy = () => {
        copyToClipboard(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white pt-28 pb-40 px-6">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-14">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-5">
                        APM Digital Lab — Generator zamówienia
                    </p>
                    <h1 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-4">
                        Szablon maila do zamówienia
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
                        Wypełnij poniższy formularz, skopiuj gotową treść i wyślij na nasz adres wraz ze skanem pacjenta.
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                        <svg className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">
                            To narzędzie działa wyłącznie w przeglądarce — żadne dane nie są nigdzie wysyłane ani zapisywane.
                        </span>
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

                    {/* ── FORM ── */}
                    <div className="space-y-8">

                        {/* Produkt */}
                        <fieldset>
                            <legend className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 mb-3">
                                Produkt
                            </legend>
                            <div className="space-y-2">
                                {(['retencyjna', 'relaksacyjna', 'wybielająca'] as Product[]).map((p) => (
                                    <label key={p} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                            product === p
                                                ? 'border-blue-500 bg-blue-500'
                                                : 'border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-400'
                                        }`}>
                                            {product === p && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                        <span className={`text-sm font-light transition-colors ${
                                            product === p ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-500'
                                        }`}>
                                            {PRODUCT_LABELS_NOM[p]}
                                        </span>
                                        <input
                                            type="radio"
                                            name="product"
                                            value={p}
                                            checked={product === p}
                                            onChange={() => handleProductChange(p)}
                                            className="sr-only"
                                        />
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        {/* Łuk */}
                        <fieldset>
                            <legend className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 mb-3">
                                Łuk
                            </legend>
                            <div className="flex gap-3 flex-wrap">
                                {(['górny', 'dolny', 'górny i dolny'] as Arch[]).map((a) => (
                                    <button
                                        key={a}
                                        type="button"
                                        onClick={() => setArch(a)}
                                        className={`px-4 py-2 rounded-lg text-sm font-light border transition-all duration-200 capitalize ${
                                            arch === a
                                                ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                                : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700'
                                        }`}
                                    >
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        {/* Pacjent */}
                        <div>
                            <label className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 block mb-3">
                                Pacjent
                            </label>
                            <input
                                type="text"
                                value={patient}
                                onChange={(e) => setPatient(e.target.value)}
                                placeholder="Podaj imię pacjenta"
                                maxLength={40}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm font-light text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
                            />
                            <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-600">
                                Nakładka będzie podpisana tym imieniem.
                            </p>
                        </div>

                        {/* Grubość */}
                        <div>
                            <label className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 block mb-3">
                                Grubość
                            </label>

                            {THICKNESS_OPTIONS[product].length === 1 ? (
                                <div className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm font-light text-zinc-500 dark:text-zinc-500">
                                    {THICKNESS_OPTIONS[product][0]}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {THICKNESS_OPTIONS[product].map((t) => (
                                        <label key={t} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                                thickness === t
                                                    ? 'border-blue-500 bg-blue-500'
                                                    : 'border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-400'
                                            }`}>
                                                {thickness === t && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                            </div>
                                            <span className={`text-sm font-light transition-colors ${
                                                thickness === t ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-500'
                                            }`}>
                                                {t}
                                            </span>
                                            <input
                                                type="radio"
                                                name="thickness"
                                                value={t}
                                                checked={thickness === t}
                                                onChange={() => setThickness(t)}
                                                className="sr-only"
                                            />
                                        </label>
                                    ))}
                                </div>
                            )}

                            {/* Custom thickness input when "Do ustalenia" is selected */}
                            {thickness === 'Do ustalenia' && (
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        value={customThickness}
                                        onChange={(e) => setCustomThickness(e.target.value)}
                                        placeholder="Wpisz preferowaną grubość lub opis"
                                        className="w-full px-4 py-3 rounded-xl border border-blue-300 dark:border-blue-800 bg-transparent text-sm font-light text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-600">
                                        Opisz preferencje lub pozostaw puste — skontaktujemy się.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Uwagi */}
                        <div>
                            <label className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 block mb-3">
                                Uwagi <span className="normal-case tracking-normal text-zinc-300 dark:text-zinc-700">(opcjonalne)</span>
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Dodatkowe wymagania, preferencje, uwagi kliniczne…"
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm font-light text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>

                        {/* Gabinet / Dr */}
                        <div>
                            <label className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 block mb-3">
                                Gabinet / Podpis <span className="normal-case tracking-normal text-zinc-300 dark:text-zinc-700">(opcjonalne)</span>
                            </label>
                            <input
                                type="text"
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                                placeholder="np. Dr Kowalski, Gabinet Dentystyczny XYZ"
                                maxLength={80}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm font-light text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
                            />
                        </div>

                        {/* Telefon */}
                        <div>
                            <label className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 block mb-3">
                                Telefon kontaktowy <span className="normal-case tracking-normal text-zinc-300 dark:text-zinc-700">(opcjonalne)</span>
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="600 000 000"
                                maxLength={11}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm font-light text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
                            />
                            <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-600">
                                Do kontaktu w razie pytań przed realizacją.
                            </p>
                        </div>
                    </div>

                    {/* ── PREVIEW ── */}
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 mb-4">
                            Podgląd
                        </p>

                        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
                            {/* Email header */}
                            <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
                                <p className="text-xs text-zinc-400 dark:text-zinc-600 mb-1">Do:</p>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 font-light">{EMAIL}</p>
                                <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-2 mb-1">Temat:</p>
                                <p className="text-sm text-zinc-900 dark:text-white font-light">{subject}</p>
                            </div>
                            {/* Email body */}
                            <div className="px-5 py-5">
                                <pre className="text-sm text-zinc-700 dark:text-zinc-300 font-light leading-relaxed whitespace-pre-wrap font-sans">
                                    {body}
                                </pre>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-5 flex flex-col sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={handleCopy}
                                className={`flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-light transition-all duration-300 ${
                                    copied
                                        ? 'bg-emerald-500 text-white border border-emerald-500'
                                        : 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 border border-transparent'
                                }`}
                            >
                                {copied ? (
                                    <>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Skopiowano!
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Kopiuj treść maila
                                    </>
                                )}
                            </button>

                            <a
                                href={mailtoHref}
                                className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-light border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Otwórz w kliencie pocztowym
                            </a>
                        </div>

                        <div className="mt-4 flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30">
                            <svg className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <p className="text-xs text-amber-700 dark:text-amber-400 font-light">
                                Pamiętaj o dołączeniu skanu do wiadomości.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back */}
                <div className="mt-20">
                    <Link
                        href="/#contact"
                        className="text-xs text-zinc-400 dark:text-zinc-700 hover:text-zinc-600 dark:hover:text-zinc-500 transition-colors"
                    >
                        ← Powrót
                    </Link>
                </div>
            </div>
        </div>
    );
}
