'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-zinc-400 mb-12">
            {t('contact.subtitle')}
          </p>

          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:contact@example.com"
              className="px-8 py-4 bg-white text-black rounded-full font-light hover:bg-zinc-200 transition-colors"
            >
              {t('contact.email')}
            </a>
            <a
              href="tel:+48123456789"
              className="px-8 py-4 border border-zinc-700 rounded-full font-light hover:bg-zinc-900 transition-colors"
            >
              {t('contact.phone')}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-24 pt-12 border-t border-zinc-800"
        >
          <p className="text-sm text-zinc-600">
            {t('contact.footer')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
