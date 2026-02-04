'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';

export default function ProfessionalGate() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Sprawdź czy użytkownik już potwierdził
        const hasConfirmed = localStorage.getItem('professional_confirmed');
        if (!hasConfirmed) {
            // Opóźnienie 500ms dla lepszego UX
            setTimeout(() => setIsOpen(true), 500);
        }
    }, []);

    const handleConfirm = () => {
        setIsClosing(true);
        localStorage.setItem('professional_confirmed', 'true');
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 600);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{
                            opacity: isClosing ? 0 : 1,
                            scale: isClosing ? 0.95 : 1,
                            y: isClosing ? 20 : 0
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.6, 0.05, 0.01, 0.9]
                        }}
                        className="relative max-w-2xl w-full"
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />

                        {/* Content */}
                        <div className="relative bg-zinc-950 border border-zinc-800/50 rounded-3xl p-8 md:p-12">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 flex items-center justify-center"
                            >
                                <svg
                                    className="w-8 h-8 text-blue-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </motion.div>

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-3xl md:text-4xl font-light tracking-tight text-center mb-4"
                            >
                                {t('professionalGate.title')}
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-zinc-400 text-center mb-8 leading-relaxed"
                            >
                                {t('professionalGate.description')}
                            </motion.p>

                            {/* Target audience */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="flex flex-wrap justify-center gap-3 mb-10"
                            >
                                {(t('professionalGate.audience') as string[]).map((item, index) => (
                                    <motion.span
                                        key={item}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        className="px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-400"
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </motion.div>

                            {/* Confirm button */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleConfirm}
                                className="w-full py-4 bg-white text-black rounded-full font-light text-lg hover:bg-zinc-100 transition-colors"
                            >
                                {t('professionalGate.confirm')}
                            </motion.button>

                            {/* Note */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9, duration: 0.6 }}
                                className="text-center text-xs text-zinc-600 mt-6"
                            >
                                {t('professionalGate.note')}
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}