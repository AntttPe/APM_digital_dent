'use client';

import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '@/lib/i18n';
import VideoSequence from '@/components/ui/VideoSequence';
import Link from 'next/link';

export default function Products() {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

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
        {
            key: 'fixedRetainer',
            slug: 'retencja-stala-drukowana',
            gradient: 'from-emerald-500/10 to-teal-500/10',
            accentColor: 'from-emerald-500 to-teal-500',
            hasSequence: false, // Zmień na true gdy dodasz sekwencję
            sequencePath: '/images/products/fixed-retainer/sequence',
            frameCount: 120,
        },
    ];

    return (
        <section
            ref={containerRef}
            id="products"
            className="relative py-32 px-6"
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
                        {t('products.title')}
                    </h2>
                    <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
                        {t('products.subtitle')}
                    </p>
                </motion.div>

                <div className="space-y-48">
                    {products.map((product, index) => {
                        const isEven = index % 2 === 0;
                        const productRef = useRef<HTMLDivElement>(null);
                        const features = t(`products.${product.key}.features`);

                        return (
                            <motion.div
                                key={product.key}
                                ref={productRef}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.8 }}
                                className={`grid md:grid-cols-2 gap-16 items-center ${
                                    isEven ? '' : 'md:grid-flow-dense'
                                }`}
                            >
                                <div className={isEven ? 'md:col-start-1' : 'md:col-start-2'}>
                                    <div className={`relative aspect-square rounded-3xl bg-gradient-to-br ${product.gradient} border border-zinc-800/50 overflow-hidden`}>
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

                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className={isEven ? 'md:col-start-2' : 'md:col-start-1'}
                                >
                                    <div className="inline-block mb-4">
                                        <div className={`h-1 w-12 bg-gradient-to-r ${product.accentColor}`} />
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-light mb-6">
                                        {t(`products.${product.key}.title`)}
                                    </h3>

                                    <p className="text-zinc-400 mb-8 leading-relaxed text-lg">
                                        {t(`products.${product.key}.description`)}
                                    </p>

                                    <ul className="space-y-4 mb-8">
                                        {Array.isArray(features) && features.map((feature: string, i: number) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-start gap-3"
                                            >
                                                <div className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 bg-gradient-to-r ${product.accentColor}`} />
                                                <span className="text-sm text-zinc-500">{feature}</span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <Link href={`/produkty/${product.slug}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-800 hover:border-zinc-700 transition-all bg-zinc-900/30 hover:bg-zinc-900/50"
                                        >
                                            <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                                                {t('products.cta')}
                                            </span>
                                            <svg
                                                className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-1 transition-all"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}