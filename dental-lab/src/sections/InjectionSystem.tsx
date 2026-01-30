'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '@/lib/i18n';

export default function InjectionSystem() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black" />

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 border border-zinc-800 rounded-full text-xs uppercase tracking-wider text-zinc-400">
              {t('injection.tag')}
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
            {t('injection.title')}
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            {t('injection.subtitle')}
          </p>
        </div>

        {/* Future 3D model or Blender animation showcase */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/30">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {['precision', 'cost', 'workflow'].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6"
            >
              <h3 className="text-lg font-light mb-3">
                {t(`injection.features.${feature}.title`)}
              </h3>
              <p className="text-sm text-zinc-500">
                {t(`injection.features.${feature}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
