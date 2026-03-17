'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

// ─── Zmień na docelowy adres email ────────────────────────────────────────────
const EMAIL = 'kontakt@apmlab.pl';
// ──────────────────────────────────────────────────────────────────────────────

export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-900 py-12 px-6 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-sm font-light mb-4 text-zinc-900 dark:text-white">
                            {t('footer.company.title')}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-600 leading-relaxed">
                            {t('footer.company.description')}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-light mb-4 text-zinc-900 dark:text-white">
                            {t('footer.contact.title')}
                        </h3>
                        <div className="space-y-2 text-xs text-zinc-500 dark:text-zinc-600">
                            <a
                                href={`mailto:${EMAIL}`}
                                className="block hover:text-zinc-900 dark:hover:text-white transition-colors"
                            >
                                {EMAIL}
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-light mb-4 text-zinc-900 dark:text-white">
                            {t('footer.legal.title')}
                        </h3>
                        <div className="space-y-2 text-xs text-zinc-500 dark:text-zinc-600">
                            <a href="#" className="block hover:text-zinc-900 dark:hover:text-white transition-colors">
                                {t('footer.legal.privacy')}
                            </a>
                            <a href="#" className="block hover:text-zinc-900 dark:hover:text-white transition-colors">
                                {t('footer.legal.terms')}
                            </a>
                            <Link
                                href="/pacjent"
                                className="block hover:text-zinc-900 dark:hover:text-white transition-colors"
                            >
                                {t('patient.footerLink')}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-900 text-center text-xs text-zinc-400 dark:text-zinc-700">
                    © {currentYear} {t('footer.copyright')}
                </div>
            </div>
        </footer>
    );
}
