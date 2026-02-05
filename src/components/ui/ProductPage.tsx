'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

interface ProductPageProps {
    productKey: string;
    imagePath: string;
    accentColor: string;
    gradient: string;
}

export default function ProductPage({
                                        productKey,
                                        imagePath,
                                        accentColor,
                                        gradient
                                    }: ProductPageProps) {
    const { t } = useTranslation();

    const description = t(`productPage.${productKey}.description`);
    const features = t(`productPage.${productKey}.features`);
    const specs = t(`productPage.${productKey}.specs`);
    const pricingIncludes = t('productPage.pricing.includes');

    return (
        <div className="min-h-screen bg-black">
            {/* Back button */}
            <div className="fixed top-20 left-6 z-50">
                <Link href="/#products">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ x: -5 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl hover:border-zinc-700 transition-all group"
                    >
                        <svg
                            className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
              {t('productPage.back')}
            </span>
                    </motion.button>
                </Link>
            </div>

            {/* Hero section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black" />

                <div className="relative z-10 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block mb-4">
                            <div className={`h-1 w-16 mx-auto bg-gradient-to-r ${accentColor}`} />
                        </div>

                        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
                            {t(`productPage.${productKey}.title`)}
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light">
                            {t(`productPage.${productKey}.tagline`)}
                        </p>
                    </motion.div>

                    {/* Main product image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative aspect-[16/10] max-w-5xl mx-auto mb-20"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl`} />
                        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-zinc-800/50">
                            <Image
                                src={imagePath}
                                alt={t(`productPage.${productKey}.title`)}
                                fill
                                className="object-contain p-8"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Description & Features */}
            <section className="relative py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 mb-24">
                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl font-light mb-6">{t('productPage.about')}</h2>
                            <div className="space-y-4 text-zinc-400 leading-relaxed">
                                {Array.isArray(description) && description.map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        </motion.div>

                        {/* Key features */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl font-light mb-6">{t('productPage.keyFeatures')}</h2>
                            <ul className="space-y-4">
                                {Array.isArray(features) && features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 bg-gradient-to-r ${accentColor}`} />
                                        <span className="text-zinc-400">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Technical specs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8 mb-24"
                    >
                        {Array.isArray(specs) && specs.map((spec: {label: string, value: string}, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50"
                            >
                                <div className="text-sm text-zinc-500 mb-2">{spec.label}</div>
                                <div className="text-xl font-light text-zinc-200">{spec.value}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Pricing */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <div className="p-12 rounded-3xl bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-zinc-800/50">
                            <h2 className="text-2xl font-light mb-4">{t('productPage.pricing.title')}</h2>

                            <div className="mb-8">
                                <div className={`text-6xl font-light bg-gradient-to-r ${accentColor} bg-clip-text text-transparent`}>
                                    {t(`productPage.${productKey}.price`)}
                                </div>
                                <div className="text-zinc-500 mt-2">
                                    {t('productPage.pricing.perUnit')}
                                </div>
                            </div>

                            <div className="space-y-3 text-sm text-zinc-400 mb-8">
                                {Array.isArray(pricingIncludes) && pricingIncludes.map((item, i) => (
                                    <div key={i} className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/#contact"
                                className="inline-block px-8 py-4 bg-white text-black rounded-full font-light hover:bg-zinc-200 transition-colors"
                            >
                                {t('productPage.pricing.cta')}
                            </Link>

                            <p className="text-xs text-zinc-600 mt-6">
                                {t('productPage.pricing.note')}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-light mb-6"
                    >
                        {t('productPage.cta.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-zinc-400 mb-12"
                    >
                        {t('productPage.cta.subtitle')}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/#contact"
                            className="inline-block px-8 py-4 border border-zinc-700 rounded-full hover:bg-zinc-900 transition-colors"
                        >
                            {t('productPage.cta.button')}
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}