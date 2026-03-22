'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import Image from 'next/image';
import Link from 'next/link';

export default function Technology() {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress: imageProgress } = useScroll({
        target: imageRef,
        offset: ['start end', 'end start'],
    });

    const imageY = useTransform(imageProgress, [0, 1], [80, -80]);
    const imageRotate = useTransform(imageProgress, [0, 0.5, 1], [-3, 0, 3]);

    return (
        <section ref={containerRef} id="technology" className="relative py-32 px-6 overflow-hidden border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Text content */}
                    <div>
                        <FadeIn y={20}>
                            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-8 text-zinc-900 dark:text-white">
                                {t('technology.title')}
                            </h2>
                        </FadeIn>

                        <FadeIn y={16} delay={0.1}>
                            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-12">
                                {t('technology.description')}
                            </p>
                        </FadeIn>

                        <div className="space-y-6">
                            {['digital', 'precision', 'material'].map((item, index) => (
                                <FadeIn key={item} delay={0.1 + index * 0.1} y={12}>
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700/50 transition-colors group">
                                        <div className="w-2 h-2 bg-zinc-900 dark:bg-white rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                        <div>
                                            <h3 className="font-light mb-1 text-zinc-800 dark:text-zinc-200">
                                                {t(`technology.points.${item}.title`)}
                                            </h3>
                                            <p className="text-sm text-zinc-500">
                                                {t(`technology.points.${item}.desc`)}
                                            </p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>

                        <FadeIn y={8} delay={0.45}>
                            <Link
                                href="/rd/materialy"
                                className="group inline-flex items-center gap-3 mt-8 px-5 py-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 hover:border-emerald-400 dark:hover:border-emerald-700 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/40 transition-all duration-300"
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                                <span className="text-sm text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors">
                                    {t('technology.researchLink')}
                                </span>
                                <svg className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-600 group-hover:translate-x-0.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-all ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </FadeIn>
                    </div>

                    {/* Image - transparent PNG, scaled 1.25x, no border */}
                    <motion.div
                        ref={imageRef}
                        style={{
                            y: imageY,
                            rotate: imageRotate,
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1.25 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
                        className="relative aspect-square"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src="/images/technology/render.webp"
                                alt="Digital dental technology"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={false}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
