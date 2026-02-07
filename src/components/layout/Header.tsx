'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isProductPage = pathname?.startsWith('/produkty/');

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
      scrollY,
      [0, 100],
      ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );

  // Funkcja do budowania linków - jeśli jesteśmy na podstronie, wracamy do głównej
  const getNavLink = (section: string) => {
    return isProductPage ? `/#${section}` : `#${section}`;
  };

  return (
      <motion.header
          style={{ backgroundColor }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-zinc-900/0"
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-light tracking-wider hover:text-zinc-400 transition-colors">
            {t('header.logo')}
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link
                href={getNavLink('workflow')}
                className="text-zinc-400 hover:text-white transition-colors"
            >
              {t('header.nav.workflow')}
            </Link>
            <Link
                href={getNavLink('products')}
                className="text-zinc-400 hover:text-white transition-colors"
            >
              {t('header.nav.products')}
            </Link>
            <Link
                href="/proces"
                className="text-zinc-400 hover:text-white transition-colors"
            >
              {t('header.nav.process')}
            </Link>
            <Link
                href={getNavLink('technology')}
                className="text-zinc-400 hover:text-white transition-colors"
            >
              {t('header.nav.technology')}
            </Link>
            <Link
                href={getNavLink('contact')}
                className="text-zinc-400 hover:text-white transition-colors"
            >
              {t('header.nav.contact')}
            </Link>
          </div>
        </nav>
      </motion.header>
  );
}