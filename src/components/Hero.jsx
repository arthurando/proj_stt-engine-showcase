import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLang } from '../i18n';
import Plasma from './react-bits/plasma';

const STATS = [
  { value: '212,000+', key: 'hero_stat_customers' },
  { value: '8,813', key: 'hero_stat_products' },
  { value: '24', key: 'hero_stat_services' },
  { value: '$120K+', key: 'hero_stat_savings' },
  { value: '99.9%', key: 'hero_stat_uptime' },
];

function AnimatedCounter({ value, label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
      className="bg-white/5 backdrop-blur rounded-2xl p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.0 + index * 0.1, type: 'spring', stiffness: 200 }}
        className="text-3xl font-bold text-white"
      >
        {value}
      </motion.div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-animated"
    >
      {/* Plasma background */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <Plasma
          color1={[0.15, 0.05, 0.35]}
          color2={[0.05, 0.15, 0.45]}
          color3={[0.25, 0.1, 0.55]}
          speed={0.25}
          scale={4.0}
        />
      </div>
      <div className="absolute inset-0 bg-[#0a0e1a]/40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500" />
            </span>
            <span className="text-sm text-gray-300">{t('hero_badge')}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight"
          >
            <span className="text-white block">{t('hero_title_1')}</span>
            <span className="text-indigo-400 block">{t('hero_title_2')}</span>
            <span className="text-white block">{t('hero_title_3')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto"
          >
            {t('hero_subtitle')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#solution"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-8 py-4 font-semibold text-lg transition-colors"
            >
              {t('hero_cta')}
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white rounded-full px-8 py-4 font-semibold text-lg transition-colors hover:bg-white/5"
            >
              <Sparkles className="w-5 h-5" />
              {t('hero_cta2')}
            </a>
          </motion.div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {STATS.map((stat, i) => (
              <AnimatedCounter
                key={stat.key}
                value={stat.value}
                label={t(stat.key)}
                index={i}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
