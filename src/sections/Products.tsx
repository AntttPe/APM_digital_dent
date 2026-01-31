'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '@/lib/i18n';

export default function Products() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const products = [
    {
      key: 'aligners',
      gradient: 'from-blue-500/10 to-cyan-500/10',
      accentColor: 'from-blue-500 to-cyan-500',
    },
    {
      key: 'guards',
      gradient: 'from-violet-500/10 to-purple-500/10',
      accentColor: 'from-violet-500 to-purple-500',
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
            const { scrollYProgress: productProgress } = useScroll({
              target: productRef,
              offset: ['start end', 'end start'],
            });

            // ZMIANA: Usunięto rotację.
            // Zostawiamy tylko subtelny ruch w pionie (parallax) dla poczucia głębi
            const y = useTransform(
              productProgress,
              [0, 0.5, 1],
              [50, 0, -50] // Zmniejszony zakres ruchu dla większego spokoju
            );

            // ZMIANA: Bardzo delikatne skalowanie (z 0.95 do 1.0), ledwo zauważalne
            const imageScale = useTransform(
              productProgress,
              [0, 0.5, 1],
              [0.95, 1, 0.95]
            );

            return (
              <motion.div
                key={product.key}
                ref={productRef}
                style={{ y }} // Aplikujemy tylko przesunięcie w pionie
                className={`grid md:grid-cols-2 gap-16 items-center ${
                  isEven ? '' : 'md:grid-flow-dense'
                }`}
              >
                <motion.div
                  style={{
                    scale: imageScale,
                    // rotate: imageRotate <- USUNIĘTE
                  }}
                  className={isEven ? 'md:col-start-1' : 'md:col-start-2'}
                >
                  {/* Future Blender-rendered product sequence */}
                  <div className={`relative aspect-square rounded-3xl bg-gradient-to-br ${product.gradient} border border-zinc-800/50 overflow-hidden group shadow-2xl shadow-black/50`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.accentColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Placeholder na render - teraz stabilny */}
                      <div className="w-32 h-32 border border-zinc-700/50 rounded-full" />
                    </div>
                  </div>
                </motion.div>

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

                  <ul className="space-y-4">
                    {(t(`products.${product.key}.features`) as string[]).map((feature, i) => (
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
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
