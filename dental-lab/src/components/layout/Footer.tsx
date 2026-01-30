'use client';

import { useTranslation } from '@/lib/i18n';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-light mb-4">{t('footer.company.title')}</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {t('footer.company.description')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-light mb-4">{t('footer.contact.title')}</h3>
            <div className="space-y-2 text-xs text-zinc-600">
              <p>Email: contact@example.com</p>
              <p>Tel: +48 123 456 789</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-light mb-4">{t('footer.legal.title')}</h3>
            <div className="space-y-2 text-xs text-zinc-600">
              <a href="#" className="block hover:text-white transition-colors">
                {t('footer.legal.privacy')}
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                {t('footer.legal.terms')}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 text-center text-xs text-zinc-700">
          © {currentYear} {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
