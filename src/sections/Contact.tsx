'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';

// ─── Zmień na docelowy adres email ────────────────────────────────────────────
const EMAIL = 'kontakt@apmdental.pl';
// ──────────────────────────────────────────────────────────────────────────────

export default function Contact() {
    const { t } = useTranslation();

    return (
        <section
            id="contact"
            className="relative py-32 md:py-44 px-6 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black overflow-hidden"
        >
            {/* Dekoracyjny @ w tle */}
            <div
                aria-hidden
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            >
                <span className="text-[32vw] font-light leading-none text-zinc-100 dark:text-zinc-950 translate-y-[10%]">
                    @
                </span>
            </div>

            {/* Ambient glow */}
            <div
                aria-hidden
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 65%)',
                }}
            />

            <div className="relative max-w-4xl mx-auto">

                {/* Nagłówek */}
                <FadeIn y={24} className="mb-16 md:mb-20">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-6">
                        {t('contact.tag')}
                    </p>
                    <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-zinc-900 dark:text-white">
                        {t('contact.title')}
                    </h2>
                    <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                        {t('contact.subtitle')}
                    </p>
                </FadeIn>

                {/* Główny element — adres email */}
                <FadeIn y={16} delay={0.15}>
                    <a
                        href={`mailto:${EMAIL}`}
                        className="group block"
                        aria-label={`Wyślij email na ${EMAIL}`}
                    >
                        <div className="flex items-center gap-4 md:gap-6 mb-4">
                            <span className="text-2xl md:text-4xl lg:text-[2.75rem] font-light text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 break-all leading-tight">
                                {EMAIL}
                            </span>

                            <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                className="flex-shrink-0 w-11 h-11 md:w-13 md:h-13 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors duration-300"
                            >
                                {/* Mail icon */}
                                <svg
                                    className="w-5 h-5 text-white dark:text-black"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Linia — zmienia kolor na hover */}
                        <div className="h-px bg-zinc-200 dark:bg-zinc-800 group-hover:bg-blue-500 dark:group-hover:bg-blue-500 transition-colors duration-300" />
                    </a>

                    <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-600">
                        {t('contact.hint')}
                    </p>
                </FadeIn>

                {/* Statusy */}
                <FadeIn y={12} delay={0.3} className="mt-14 flex flex-wrap gap-6 md:gap-10">
                    <div className="flex items-center gap-2.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                            {t('contact.responseTime')}
                        </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                            {t('contact.formats')}
                        </span>
                    </div>
                </FadeIn>

                {/* Generator button */}
                <FadeIn y={8} delay={0.35} className="mt-12">
                    <Link
                        href="/zamowienie"
                        className="group inline-flex items-center gap-3 px-5 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all duration-300"
                    >
                        <svg className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                            <span className="text-sm font-light text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors block">
                                Wygeneruj szablon zamówienia →
                            </span>
                            <span className="text-xs text-zinc-400 dark:text-zinc-600">
                                Wypełnij formularz, skopiuj i wyślij ze skanem
                            </span>
                        </div>
                    </Link>
                </FadeIn>

                {/* FAQ hint */}
                <FadeIn y={8} delay={0.4}>
                    <Link href="/faq" className="inline-flex items-center gap-2 mt-6 group">
                        <span className="text-xs text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                            {t('faq.contactHint') as string}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors underline underline-offset-2">
                            {t('faq.contactLink') as string} →
                        </span>
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
}
