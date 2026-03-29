'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

interface FAQItem {
    q: string;
    a: string;
}

interface FAQCategory {
    title: string;
    items: FAQItem[];
}

const EASE = [0.6, 0.05, 0.01, 0.9] as [number, number, number, number];

function AccordionItem({ item, index, isOpen, onToggle }: {
    item: FAQItem;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="border-b border-zinc-100 dark:border-zinc-800/60 last:border-0">
            <button
                onClick={onToggle}
                className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                aria-expanded={isOpen}
            >
                <span className="flex items-start gap-4">
                    <span className="text-xs text-zinc-300 dark:text-zinc-700 font-light mt-0.5 tabular-nums flex-shrink-0">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm md:text-base font-light text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors leading-relaxed">
                        {item.q}
                    </span>
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="flex-shrink-0 mt-0.5"
                >
                    <svg
                        className="w-4 h-4 text-zinc-400 dark:text-zinc-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                    >
                        <p className="pl-8 pb-6 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            {item.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQPage() {
    const { t } = useTranslation();
    const categories = t('faq.categories') as FAQCategory[];
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    const toggle = (key: string) => {
        setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Flatten all items for question counter
    let globalIndex = 0;

    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white">
            <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">

                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="mb-20"
                >
                    <div className="h-px w-10 bg-gradient-to-r from-blue-500 to-cyan-500 mb-8" />
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-4">
                        APM Dental Lab
                    </p>
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05] mb-5">
                        {t('faq.title') as string}
                    </h1>
                    <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {t('faq.subtitle') as string}
                    </p>
                </motion.div>

                {/* Categories */}
                <div className="space-y-16">
                    {Array.isArray(categories) && categories.map((category, catIndex) => (
                        <motion.section
                            key={catIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: catIndex * 0.07, ease: EASE }}
                        >
                            <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 mb-2 pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
                                {category.title}
                            </p>
                            <div>
                                {category.items.map((item, itemIndex) => {
                                    const key = `${catIndex}-${itemIndex}`;
                                    const currentIndex = globalIndex++;
                                    return (
                                        <AccordionItem
                                            key={key}
                                            item={item}
                                            index={currentIndex}
                                            isOpen={!!openItems[key]}
                                            onToggle={() => toggle(key)}
                                        />
                                    );
                                })}
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                    className="mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                    <div>
                        <p className="text-sm font-light text-zinc-700 dark:text-zinc-300 mb-1">
                            {t('faq.cta.label') as string}
                        </p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-600">
                            {t('faq.cta.note') as string}
                        </p>
                    </div>
                    <Link
                        href="/#contact"
                        className="flex-shrink-0 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-light hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                    >
                        {t('faq.cta.button') as string}
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
