'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';

interface ProductPageProps {
    productKey: string;
    imagePath: string;
    accentColor: string;
    gradient: string;
}

const EASE = [0.6, 0.05, 0.01, 0.9] as [number, number, number, number];

export default function ProductPage({ productKey, imagePath, accentColor, gradient }: ProductPageProps) {
    const { t } = useTranslation();

    const title       = t(`productPage.${productKey}.title`) as string;
    const tagline     = t(`productPage.${productKey}.tagline`) as string;
    const description = t(`productPage.${productKey}.description`) as string[];
    const features    = t(`productPage.${productKey}.features`) as string[];
    const specs       = t(`productPage.${productKey}.specs`) as { label: string; value: string }[];
    const price       = t(`productPage.${productKey}.price`) as string;
    const includes    = t('productPage.pricing.includes') as string[];

    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white">

            {/* Back */}
            <div className="fixed top-20 left-6 z-50">
                <Link href="/#products">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ x: -5 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl hover:border-zinc-400 dark:hover:border-zinc-700 transition-all group"
                    >
                        <svg className="w-4 h-4 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                            {t('productPage.back')}
                        </span>
                    </motion.button>
                </Link>
            </div>

            {/* Main layout */}
            <div className="max-w-7xl mx-auto px-6 pt-28 pb-24">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

                    {/* ── LEFT — sticky image ── */}
                    <div className="w-full lg:w-[48%] lg:sticky lg:top-28">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, ease: EASE }}
                            className="relative aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800/60"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                            <Image
                                src={imagePath}
                                alt={title}
                                fill
                                className="object-contain p-8 md:p-12"
                                priority
                            />
                        </motion.div>

                        {/* Specs under image — desktop only */}
                        <div className="hidden lg:grid grid-cols-3 gap-3 mt-4">
                            {Array.isArray(specs) && specs.map((spec, i) => (
                                <FadeIn key={i} delay={0.4 + i * 0.08} y={10}>
                                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50">
                                        <div className="text-xs text-zinc-400 dark:text-zinc-600 mb-1">{spec.label}</div>
                                        <div className="text-sm font-light text-zinc-800 dark:text-zinc-200 leading-snug">{spec.value}</div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT — content ── */}
                    <div className="w-full lg:w-[52%]">

                        {/* Tag + title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: EASE }}
                        >
                            <div className={`h-0.5 w-10 bg-gradient-to-r ${accentColor} mb-6`} />
                            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-3">
                                {t('productPage.category')}
                            </p>
                            <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05] mb-4">
                                {title}
                            </h1>
                            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
                                {tagline}
                            </p>
                        </motion.div>

                        {/* Description */}
                        <FadeIn y={16} delay={0.15}>
                            <div className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10 pb-10 border-b border-zinc-100 dark:border-zinc-800/60">
                                {Array.isArray(description) && description.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        </FadeIn>

                        {/* Features */}
                        <FadeIn y={16} delay={0.2}>
                            <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 mb-4">
                                {t('productPage.keyFeatures')}
                            </p>
                            <ul className="space-y-2.5 mb-10 pb-10 border-b border-zinc-100 dark:border-zinc-800/60">
                                {Array.isArray(features) && features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${accentColor}`} />
                                        <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>

                        {/* Specs — mobile only */}
                        <FadeIn y={16} delay={0.25} className="lg:hidden mb-10 pb-10 border-b border-zinc-100 dark:border-zinc-800/60">
                            <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 mb-4">
                                {t('productPage.specs')}
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {Array.isArray(specs) && specs.map((spec, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50">
                                        <div className="text-xs text-zinc-400 dark:text-zinc-600 mb-1">{spec.label}</div>
                                        <div className="text-sm font-light text-zinc-800 dark:text-zinc-200 leading-snug">{spec.value}</div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        {/* Comparison bars — fixedRetainer only */}
                        {productKey === 'fixedRetainer' && (
                            <FadeIn y={20} delay={0.25} className="mb-10 pb-10 border-b border-zinc-100 dark:border-zinc-800/60">
                                <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 mb-6">
                                    {t('productPage.comparison.title')}
                                </p>
                                <div className="space-y-8">
                                    {(t('productPage.comparison.items') as Array<{ label: string; wire: number; printed: number; description: string }>).map((item, i) => (
                                        <div key={i}>
                                            <h3 className="text-sm font-light text-zinc-700 dark:text-zinc-300 mb-1">{item.label}</h3>
                                            <p className="text-xs text-zinc-400 mb-3">{item.description}</p>
                                            <div className="space-y-2">
                                                <div>
                                                    <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-1">{t('productPage.comparison.printed')}</span>
                                                    <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${item.printed}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1.4, delay: i * 0.15 + 0.3, ease: EASE }}
                                                            className={`h-full bg-gradient-to-r ${accentColor} rounded-full`}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-zinc-400 uppercase tracking-wider block mb-1">{t('productPage.comparison.wire')}</span>
                                                    <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${item.wire}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1.2, delay: i * 0.15 + 0.4, ease: EASE }}
                                                            className="h-full bg-zinc-300 dark:bg-zinc-700 rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        )}

                        {/* Pricing */}
                        <FadeIn y={16} delay={0.3}>
                            <div className="mb-8">
                                <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 mb-4">
                                    {t('productPage.pricing.title')}
                                </p>

                                <div className="flex items-baseline gap-2 mb-5">
                                    <span className={`text-5xl font-light bg-gradient-to-r ${accentColor} bg-clip-text text-transparent`}>
                                        {price}
                                    </span>
                                    <span className="text-sm text-zinc-400">{t('productPage.pricing.perUnit')} · netto</span>
                                </div>

                                <div className="space-y-2 mb-3">
                                    {Array.isArray(includes) && includes.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2.5">
                                            <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm text-zinc-500 dark:text-zinc-400">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-xs text-zinc-400 dark:text-zinc-600 mb-7">
                                    {t('productPage.pricing.note')}
                                </p>

                                {/* CTAs */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href="/#contact"
                                        className="flex-1 text-center px-6 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-light hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                                    >
                                        Zapytaj o zamówienie
                                    </Link>
                                    <Link
                                        href="/proces"
                                        className="flex-1 text-center px-6 py-3.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm font-light hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                                    >
                                        Jak zamawiać?
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </div>
    );
}
