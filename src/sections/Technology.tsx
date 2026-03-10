'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '@/lib/i18n';
import FadeIn from '@/components/ui/FadeIn';
import Image from 'next/image';

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
