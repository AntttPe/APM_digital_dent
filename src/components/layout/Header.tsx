'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const EASE = [0.6, 0.05, 0.01, 0.9] as [number, number, number, number];

export default function Header() {
    const { t } = useTranslation();
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const [isOpen, setIsOpen] = useState(false);

    const { scrollY } = useScroll();
    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
    );

    const getNavLink = (section: string) =>
        isHomePage ? `#${section}` : `/#${section}`;

    // Blokuj scroll gdy menu otwarte
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Zamknij menu na ESC
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
                style={{ backgroundColor }}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-zinc-900/0"
            >
                <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="hover:opacity-75 transition-opacity" onClick={() => setIsOpen(false)}>
                        <Image
                            src="/images/logos/website.svg"
                            alt="APM Dental Lab"
                            width={160}
                            height={25}
                            priority
                        />
                    </Link>

                    <div className="flex items-center gap-6">
                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center gap-6 text-sm">
                            {navLinks.map(({ label, href }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

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
                                className="block w-5 h-px bg-white origin-center"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                                className="block w-5 h-px bg-white origin-center"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3, ease: EASE }}
                                className="block w-5 h-px bg-white origin-center"
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
                        className="fixed inset-0 z-[55] bg-black/97 flex flex-col items-center justify-center md:hidden"
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
                                        className="flex items-center justify-between w-full py-4 border-b border-zinc-900 text-2xl font-light text-zinc-200 hover:text-white transition-colors group"
                                    >
                                        <span>{label}</span>
                                        <span className="text-zinc-700 group-hover:text-zinc-400 transition-colors text-lg">→</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Bottom bar z language switch */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.35 }}
                            className="absolute bottom-10 flex items-center gap-4"
                        >
                            <LanguageSwitch />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
