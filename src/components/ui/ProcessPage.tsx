'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import Link from 'next/link';

export default function ProcessPage() {
    const { t } = useTranslation();
    const [activeStep, setActiveStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const steps = [
        {
            number: '01',
            key: 'clinicalData',
            color: 'from-blue-500 to-cyan-500',
            icon: '✓',
        },
        {
            number: '02',
            key: 'digitalPlanning',
            color: 'from-cyan-500 to-teal-500',
            icon: '✓',
        },
        {
            number: '03',
            key: 'labProduction',
            color: 'from-teal-500 to-emerald-500',
            icon: '✓',
        },
        {
            number: '04',
            key: 'qualityControl',
            color: 'from-emerald-500 to-green-500',
            icon: '✓',
        },
        {
            number: '05',
            key: 'shipping',
            color: 'from-green-500 to-lime-500',
            icon: '✓',
        },
        {
            number: '06',
            key: 'clinicalApplication',
            color: 'from-lime-500 to-yellow-500',
            icon: '✓',
        },
    ];

    // Auto-cycle through steps - 8 seconds
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [steps.length, isAutoPlaying]);

    const handleStepClick = (index: number) => {
        setIsAutoPlaying(false);
        setActiveStep(index);
    };

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setActiveStep((prev) => (prev + 1) % steps.length);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Back button */}
            <div className="fixed top-20 left-6 z-50">
                <Link href="/">
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
                            {t('process.back')}
                        </span>
                    </motion.button>
                </Link>
            </div>

            {/* Main content - single viewport */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 max-w-7xl mx-auto w-full">

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <div className="h-1 w-16 mx-auto bg-gradient-to-r from-cyan-500 to-teal-500 mb-4" />
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3">
                        {t('process.hero.title')}
                    </h1>
                    <p className="text-base md:text-lg text-zinc-400 font-light max-w-2xl mx-auto">
                        {t('process.hero.subtitle')}
                    </p>
                </motion.div>

                {/* Timeline - horizontal, compact */}
                <div className="w-full mb-10">
                    <div className="relative">
                        {/* Background line */}
                        <div className="absolute top-6 left-0 right-0 h-0.5 bg-zinc-800" />

                        {/* Progress line */}
                        <motion.div
                            className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 via-teal-500 via-emerald-500 via-green-500 via-lime-500 to-yellow-500"
                            initial={{ width: '0%' }}
                            animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                            transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
                        />

                        {/* Steps */}
                        <div className="relative flex justify-between">
                            {steps.map((step, index) => {
                                const isActive = index === activeStep;
                                const isPassed = index < activeStep;

                                return (
                                    <motion.button
                                        key={step.key}
                                        onClick={() => handleStepClick(index)}
                                        className="flex flex-col items-center group cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {/* Dot container */}
                                        <div className="relative mb-3">
                                            {/* Outer glow when active */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeGlow"
                                                    className={`absolute -inset-2 bg-gradient-to-r ${step.color} opacity-30 blur-xl rounded-full`}
                                                    transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
                                                />
                                            )}

                                            {/* Dot */}
                                            <motion.div
                                                className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                                                    isActive
                                                        ? `bg-gradient-to-r ${step.color} border-transparent shadow-lg`
                                                        : isPassed
                                                            ? 'bg-zinc-800 border-zinc-700'
                                                            : 'bg-zinc-900 border-zinc-800'
                                                }`}
                                                animate={{
                                                    scale: isActive ? 1.1 : 1,
                                                }}
                                                transition={{ duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
                                            >
                                                <span className={`text-xs font-light ${
                                                    isActive ? 'text-black' : 'text-zinc-500'
                                                }`}>
                                                    {step.number}
                                                </span>
                                            </motion.div>
                                        </div>

                                        {/* Label */}
                                        <span className={`text-xs text-center max-w-[90px] transition-colors duration-300 ${
                                            isActive
                                                ? 'text-white'
                                                : isPassed
                                                    ? 'text-zinc-500'
                                                    : 'text-zinc-600'
                                        }`}>
                                            {t(`process.steps.${step.key}.title`)}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Content - animated details */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
                        className="w-full grid md:grid-cols-2 gap-8 items-center mb-8"
                    >
                        {/* Visual */}
                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                                className="relative aspect-square rounded-3xl overflow-hidden max-w-md mx-auto"
                            >
                                {/* Gradient background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${steps[activeStep].color} opacity-10`} />

                                {/* Icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.span
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                                        className="text-8xl opacity-20"
                                    >
                                        {steps[activeStep].icon}
                                    </motion.span>
                                </div>

                                {/* Step number */}
                                <div className="absolute top-6 left-6">
                                    <div className={`text-6xl font-light text-transparent bg-clip-text bg-gradient-to-br ${steps[activeStep].color}`}>
                                        {steps[activeStep].number}
                                    </div>
                                </div>

                                {/* Border */}
                                <div className="absolute inset-0 border border-zinc-800/50 rounded-3xl" />
                            </motion.div>
                        </div>

                        {/* Text content */}
                        <div>
                            <div className={`h-1 w-12 bg-gradient-to-r ${steps[activeStep].color} mb-4`} />

                            <h2 className="text-2xl md:text-3xl font-light mb-3">
                                {t(`process.steps.${steps[activeStep].key}.title`)}
                            </h2>

                            <p className="text-zinc-400 leading-relaxed mb-6 text-sm md:text-base">
                                {t(`process.steps.${steps[activeStep].key}.description`)}
                            </p>

                            {/* Time indicator */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800">
                                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm text-zinc-500">
                                    {t(`process.steps.${steps[activeStep].key}.time`)}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation controls */}
                <div className="flex items-center gap-3">
                    {/* Manual controls - show only when not auto-playing */}
                    <AnimatePresence>
                        {!isAutoPlaying && (
                            <>
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={handlePrev}
                                    className="p-2 rounded-full border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </motion.button>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Progress dots indicator */}
                    <div className="flex items-center gap-2">
                        {steps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleStepClick(index)}
                                className="group"
                            >
                                <div className={`h-1.5 rounded-full transition-all duration-500 ${
                                    index === activeStep
                                        ? 'w-8 bg-white'
                                        : 'w-1.5 bg-zinc-700 group-hover:bg-zinc-600'
                                }`} />
                            </button>
                        ))}
                    </div>

                    {/* Manual controls - show only when not auto-playing */}
                    <AnimatePresence>
                        {!isAutoPlaying && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleNext}
                                className="p-2 rounded-full border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Summary section - key metrics */}
            <div className="border-t border-zinc-900 py-16 px-6 bg-gradient-to-b from-black to-zinc-950">
                <div className="max-w-7xl mx-auto">
                    {/* Main highlight */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-sm text-emerald-400 font-light">
                                {t('process.summary.highlight')}
                            </span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-light mb-4">
                            {t('process.summary.title')}
                        </h3>
                        <p className="text-zinc-500 max-w-2xl mx-auto">
                            {t('process.summary.subtitle')}
                        </p>
                    </motion.div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {(t('process.summary.stats') as Array<{value: string, label: string, color: string}>).map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-all group"
                            >
                                <div className={`text-3xl md:text-4xl font-light mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                    {stat.value}
                                </div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-zinc-900"
                    >
                        <div className="text-center md:text-left">
                            <h4 className="text-xl font-light mb-2">
                                {t('process.cta.title')}
                            </h4>
                            <p className="text-sm text-zinc-500">
                                {t('process.cta.subtitle')}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                href="/#contact"
                                className="px-6 py-3 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors font-light text-sm"
                            >
                                {t('process.cta.button')}
                            </Link>
                            <Link
                                href="/#products"
                                className="px-6 py-3 border border-zinc-700 rounded-full hover:bg-zinc-900 transition-colors font-light text-sm"
                            >
                                {t('process.cta.products')}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}