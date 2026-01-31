'use client';

import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '@/lib/i18n';

export default function Technology() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={containerRef} id="technology" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-8">
              {t('technology.title')}
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed mb-12">
              {t('technology.description')}
            </p>

            <div className="space-y-6">
              {['digital', 'precision', 'material'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50"
                >
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-light mb-1">
                      {t(`technology.points.${item}.title`)}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {t(`technology.points.${item}.desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Future Three.js scene or video sequence */}
            <motion.div
              style={{
                rotateY: scrollYProgress,
              }}
              className="aspect-square rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
