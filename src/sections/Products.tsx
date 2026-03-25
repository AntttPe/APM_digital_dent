'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '@/lib/i18n';
import VideoSequence from '@/components/ui/VideoSequence';
import FadeIn from '@/components/ui/FadeIn';
import Link from 'next/link';

export default function Products() {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);

    const products = [
        {
            key: 'retainers',
            slug: 'szyny-retencyjne',
            gradient: 'from-blue-500/10 to-cyan-500/10',
            accentColor: 'from-blue-500 to-cyan-500',
            hasSequence: true,
            sequencePath: '/images/products/retainers/sequence',
            frameCount: 120,
        },
        {
            key: 'guards',
            slug: 'szyny-relaksacyjne',
            gradient: 'from-pink-500/10 to-rose-500/10',
            accentColor: 'from-pink-500 to-rose-500',
            hasSequence: true,
            sequencePath: '/images/products/guards/sequence',
            frameCount: 120,
        },
        {
            key: 'aligners',
            slug: 'szyny-do-wybielania',
            gradient: 'from-zinc-400/10 to-slate-300/10',
            accentColor: 'from-zinc-100 to-white',
            hasSequence: true,
            sequencePath: '/images/products/aligners/sequence',
            frameCount: 120,
        },
    ];

    return (
        <section
            ref={containerRef}
            id="products"
            className="relative py-32 px-6 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black"
        >
            <div className="max-w-7xl mx-auto">
                <FadeIn y={24} className="text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-zinc-900 dark:text-white">
                        {t('products.title')}
                    </h2>
                    <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
                        {t('products.subtitle')}
                    </p>
                </FadeIn>

                <div className="space-y-48">
                    {products.map((product, index) => {
                        const isEven = index % 2 === 0;
                        const productRef = useRef<HTMLDivElement>(null);
                        const features = t(`products.${product.key}.features`);

                        return (
                            <FadeIn
                                key={product.key}
                                y={40}
                                delay={0.1}
                            >
                                <div
                                    ref={productRef}
                                    className={`grid md:grid-cols-2 gap-16 items-center ${
                                        isEven ? '' : 'md:grid-flow-dense'
                                    }`}
                                >
                                    {/* Product image — always dark container */}
                                    <div className={isEven ? 'md:col-start-1' : 'md:col-start-2'}>
                                        <div className={`relative aspect-square rounded-3xl bg-zinc-950 bg-gradient-to-br ${product.gradient} border border-zinc-800/50 overflow-hidden`}>
                                            {product.hasSequence ? (
                                                <VideoSequence
                                                    frameCount={product.frameCount!}
                                                    basePath={product.sequencePath!}
                                                    scrollTarget={productRef}
                                                    fileExtension="webp"
                                                    className="rounded-3xl"
                                                />
                                            ) : (
                                                <>
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${product.accentColor} opacity-0 hover:opacity-5 transition-opacity duration-500`} />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-32 h-32 border border-zinc-700 rounded-full animate-pulse" />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <FadeIn
                                        x={isEven ? 30 : -30}
                                        y={0}
                                        delay={0.2}
                                        className={isEven ? 'md:col-start-2' : 'md:col-start-1'}
                                    >
                                        <div className="inline-block mb-4">
                                            <div className={`h-1 w-12 bg-gradient-to-r ${product.accentColor}`} />
                                        </div>

                                        <h3 className="text-4xl md:text-5xl font-light mb-6 text-zinc-900 dark:text-white">
                                            {t(`products.${product.key}.title`)}
                                        </h3>

                                        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed text-lg">
                                            {t(`products.${product.key}.description`)}
                                        </p>

                                        <ul className="space-y-4 mb-8">
                                            {Array.isArray(features) && features.map((feature: string, i: number) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 bg-gradient-to-r ${product.accentColor}`} />
                                                    <span className="text-sm text-zinc-500 dark:text-zinc-500">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link href={`/produkty/${product.slug}`}>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-700 transition-all bg-zinc-50 dark:bg-zinc-900/30 hover:bg-zinc-100 dark:hover:bg-zinc-900/50"
                                            >
                                                <span className="text-sm text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                                                    {t('products.cta')}
                                                </span>
                                                <svg
                                                    className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 group-hover:translate-x-1 transition-all"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </motion.button>
                                        </Link>
                                    </FadeIn>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>

                {/* Gallery CTA */}
                <FadeIn y={16} delay={0.2} className="mt-24 flex flex-col items-center gap-4 text-center">
                    <p className="text-sm text-zinc-400 dark:text-zinc-600">
                        {t('products.galleryLabel')}
                    </p>
                    <Link href="/galeria">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/30 hover:border-zinc-500 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all"
                        >
                            <svg className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3 3h18M3 9h18" />
                            </svg>
                            <span className="text-sm text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                                {t('products.galleryCta')}
                            </span>
                            <svg className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
}
