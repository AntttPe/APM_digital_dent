'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '@/lib/i18n';
import { staggerContainer } from '@/lib/animations';

export default function DigitalWorkflow() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const steps = [
    { key: 'scan', icon: '3D', delay: 0 },
    { key: 'design', icon: 'AI', delay: 0.1 },
    { key: 'print', icon: '→', delay: 0.2 },
    { key: 'precision', icon: '✓', delay: 0.3 },
  ];

  return (
    <section
      ref={containerRef}
      id="workflow"
      className="relative py-32 px-6 overflow-hidden"
    >
      <motion.div style={{ opacity, scale }} className="max-w-7xl mx-auto">
        <motion.div
          style={{ y }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
            {t('workflow.title')}
          </h2>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
            {t('workflow.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => {
            const cardProgress = useTransform(
              scrollYProgress,
              [0.2 + index * 0.1, 0.4 + index * 0.1],
              [0, 1]
            );

            const cardY = useTransform(cardProgress, [0, 1], [60, 0]);
            const cardOpacity = useTransform(cardProgress, [0, 1], [0, 1]);

            return (
              <motion.div
                key={step.key}
                style={{ y: cardY, opacity: cardOpacity }}
                className="relative"
              >
                <div className="aspect-square bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-zinc-700 transition-colors group">
                  <div className="text-4xl font-light text-zinc-600 mb-4 group-hover:text-zinc-400 transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-sm uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    {t(`workflow.steps.${step.key}.title`)}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-2 text-center">
                    {t(`workflow.steps.${step.key}.desc`)}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <motion.div
                    style={{
                      scaleX: useTransform(
                        scrollYProgress,
                        [0.3 + index * 0.1, 0.4 + index * 0.1],
                        [0, 1]
                      ),
                    }}
                    className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-zinc-800 origin-left"
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
