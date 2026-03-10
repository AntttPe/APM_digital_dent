'use client';

import { useTranslation } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="relative py-32 px-6 border-t border-zinc-200 dark:border-zinc-900 bg-slate-50 dark:bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn y={20}>
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8 text-zinc-900 dark:text-white">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 mb-12">
            {t('contact.subtitle')}
          </p>

          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:contact@example.com"
              className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-light hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              {t('contact.email')}
            </a>
            <a
              href="tel:+48123456789"
              className="px-8 py-4 border border-zinc-300 dark:border-zinc-700 rounded-full font-light hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-700 dark:text-zinc-300"
            >
              {t('contact.phone')}
            </a>
          </div>
        </FadeIn>

        <FadeIn y={0} delay={0.3} className="mt-24 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-400 dark:text-zinc-600">
            {t('contact.footer')}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
