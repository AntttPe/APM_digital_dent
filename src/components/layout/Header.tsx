'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValue } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const EASE = [0.6, 0.05, 0.01, 0.9] as [number, number, number, number];

export default function Header() {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const [isOpen, setIsOpen] = useState(false);

    const { scrollY } = useScroll();
    const bgColor = useMotionValue('rgba(0,0,0,0)');

    // Update background based on scroll + theme
    useEffect(() => {
        const updateBg = (value: number) => {
            const progress = Math.min(value / 100, 1);
            if (theme === 'dark') {
                bgColor.set(`rgba(0,0,0,${progress * 0.85})`);
            } else {
                bgColor.set(`rgba(255,255,255,${progress * 0.92})`);
            }
        };
        updateBg(scrollY.get());
        return scrollY.on('change', updateBg);
    }, [scrollY, bgColor, theme]);

    const getNavLink = (section: string) =>
        isHomePage ? `#${section}` : `/#${section}`;

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const navLinks = [
        { label: t('header.nav.workflow'),   href: getNavLink('workflow') },
        { label: t('header.nav.products'),   href: getNavLink('products') },
        { label: t('header.nav.process'),    href: '/proces' },
        { label: t('header.nav.technology'), href: getNavLink('technology') },
        { label: t('header.nav.contact'),    href: getNavLink('contact') },
    ];

    return (
        <>
            <motion.header
                style={{ backgroundColor: bgColor }}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-transparent"
            >
                <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="hover:opacity-80 transition-opacity" onClick={() => setIsOpen(false)}>
                        <div className="flex items-baseline gap-[14px]">
                            {/* APM — Cormorant Garamond, tonal fade A→P→M */}
                            <div
                                className="flex items-baseline leading-none"
                                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: '28px', letterSpacing: '-0.5px' }}
                            >
                                <span style={{ color: theme === 'dark' ? '#FFFFFF' : '#1A1816' }}>A</span>
                                <span style={{ color: theme === 'dark' ? '#C4C1BB' : '#666360' }}>P</span>
                                <span style={{ color: theme === 'dark' ? '#9A9890' : '#B0ADA8' }}>M</span>
                            </div>
                            {/* pipe */}
                            <span
                                className="leading-none pb-0.5"
                                style={{ fontWeight: 200, fontSize: '13px', color: theme === 'dark' ? 'rgba(255,255,255,0.18)' : '#D0CCC6' }}
                            >|</span>
                            {/* Dental Lab */}
                            <span
                                className="leading-none pb-0.5 uppercase"
                                style={{ fontWeight: 300, fontSize: '9px', letterSpacing: '0.35em', color: theme === 'dark' ? '#505050' : '#B0ADA8' }}
                            >Dental&nbsp;Lab</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center gap-6 text-sm">
                            {navLinks.map(({ label, href }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        <ThemeToggle />
                        <LanguageSwitch />

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setIsOpen(prev => !prev)}
                            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] z-[60]"
                            aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
                        >
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3, ease: EASE }}
                                className="block w-5 h-px bg-zinc-900 dark:bg-white origin-center"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                                className="block w-5 h-px bg-zinc-900 dark:bg-white origin-center"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3, ease: EASE }}
                                className="block w-5 h-px bg-zinc-900 dark:bg-white origin-center"
                            />
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[55] bg-white/98 dark:bg-black/97 flex flex-col items-center justify-center md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-2 w-full px-8">
                            {navLinks.map(({ label, href }, i) => (
                                <motion.div
                                    key={href}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.35, delay: 0.05 + i * 0.06, ease: EASE }}
                                    className="w-full"
                                >
                                    <Link
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-between w-full py-4 border-b border-zinc-200 dark:border-zinc-900 text-2xl font-light text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors group"
                                    >
                                        <span>{label}</span>
                                        <span className="text-zinc-400 dark:text-zinc-700 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors text-lg">→</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.35 }}
                            className="absolute bottom-10 flex items-center gap-4"
                        >
                            <ThemeToggle />
                            <LanguageSwitch />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
