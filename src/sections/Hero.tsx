'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { fadeIn } from '@/lib/animations';

export default function Hero() {
    const { t } = useTranslation();
    const { scrollYProgress } = useScroll();

    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background gradient */}
            <motion.div
                style={{ opacity, scale }}
                className="absolute inset-0 z-0 bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-zinc-900 dark:to-black"
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.h1
                    {...fadeIn}
                    className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-zinc-900 dark:text-white"
                >
                    {t('hero.title')}
                </motion.h1>

                <motion.p
                    {...fadeIn}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-light max-w-2xl mx-auto"
                >
                    {t('hero.subtitle')}
                </motion.p>

                <motion.div
                    {...fadeIn}
                    transition={{ delay: 0.4 }}
                    className="mt-12"
                >
                    <div className="inline-flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                        <span>{t('hero.tag')}</span>
                        <div className="w-12 h-px bg-zinc-300 dark:bg-zinc-700" />
                    </div>
                </motion.div>

                <motion.div
                    {...fadeIn}
                    transition={{ delay: 0.6 }}
                    className="mt-12"
                >
                    <Link href="#workflow">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border border-zinc-300 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all text-sm text-zinc-700 dark:text-zinc-300"
                        >
                            {t('hero.processLink')}
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            <motion.div
                style={{ opacity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-zinc-300 dark:border-zinc-700 rounded-full flex justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-zinc-900 dark:bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
