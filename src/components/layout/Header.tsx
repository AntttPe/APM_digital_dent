'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import LanguageSwitch from '@/components/ui/LanguageSwitch';

export default function Header() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );

  return (
    <motion.header
      style={{ backgroundColor }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-zinc-900/0"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-sm font-light tracking-wider">
          {t('header.logo')}
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#workflow" className="text-zinc-400 hover:text-white transition-colors">
              {t('header.nav.workflow')}
            </a>
            <a href="#products" className="text-zinc-400 hover:text-white transition-colors">
              {t('header.nav.products')}
            </a>
            <a href="#technology" className="text-zinc-400 hover:text-white transition-colors">
              {t('header.nav.technology')}
            </a>
            <a href="#contact" className="text-zinc-400 hover:text-white transition-colors">
              {t('header.nav.contact')}
            </a>
          </div>

          <LanguageSwitch />
        </div>
      </nav>
    </motion.header>
  );
}
