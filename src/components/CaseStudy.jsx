import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Users, ShoppingCart, Package, Heart, Brain, Database, Quote } from 'lucide-react';
import { useLang } from '../i18n';

const STATS = [
  { value: 212000, display: '212,000+', key: 'case_stat_customers', icon: Users },
  { value: 10872, display: '10,872', key: 'case_stat_orders', icon: ShoppingCart },
  { value: 2095, display: '2,095', key: 'case_stat_products', icon: Package },
  { value: 31946, display: '31,946', key: 'case_stat_loyalty', icon: Heart },
  { value: 75000, display: '75,000+', key: 'case_stat_recs', icon: Brain },
  { value: 170, display: '170', key: 'case_stat_tables', icon: Database },
];

const TIMELINE = [
  { phase: 1, titleKey: 'case_phase_1', color: 'from-blue-500 to-blue-400' },
  { phase: 2, titleKey: 'case_phase_2', color: 'from-purple-500 to-purple-400' },
  { phase: 3, titleKey: 'case_phase_3', color: 'from-indigo-500 to-indigo-400' },
  { phase: 4, titleKey: 'case_phase_4', color: 'from-cyan-500 to-cyan-400' },
  { phase: 5, titleKey: 'case_phase_5', color: 'from-emerald-500 to-emerald-400' },
];

function CountUpStat({ targetValue, displayValue, label, icon: Icon, index }) {
  const ref = useRef(null);
  const numRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const controls = animate(0, targetValue, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(v) {
        if (numRef.current) {
          numRef.current.textContent = Math.round(v).toLocaleString() + (displayValue.includes('+') ? '+' : '');
        }
      },
    });
    return () => controls.stop();
  }, [inView, targetValue, displayValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#1e293b]/50 border border-white/10 rounded-2xl p-6 text-center hover:border-indigo-500/30 transition-colors"
    >
      <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <div
        ref={numRef}
        className="text-3xl font-bold text-white mb-1"
      >
        {displayValue}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  );
}

function CaseStudy() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const timelineRef = useRef(null);

  return (
    <section
      id="case-study"
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#0a0a1a] to-[#0d1117]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('case_title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('case_subtitle')}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-20">
          {STATS.map((stat, i) => (
            <CountUpStat
              key={stat.key}
              targetValue={stat.value}
              displayValue={stat.display}
              label={t(stat.key)}
              icon={stat.icon}
              index={i}
            />
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-2xl p-8 md:p-12 mb-20 relative"
        >
          {/* Large quote mark */}
          <div className="absolute top-6 left-8 text-8xl font-serif text-indigo-500/20 leading-none select-none">
            &ldquo;
          </div>
          <div className="relative z-10">
            <blockquote className="text-xl md:text-2xl text-gray-200 italic leading-relaxed mb-6 pl-8">
              {t('case_quote')}
            </blockquote>
            <div className="pl-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center">
                <Quote className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-indigo-300 font-medium">{t('case_author')}</span>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            {t('case_timeline_title')}
          </h3>

          <div
            ref={timelineRef}
            className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-white/10"
          >
            <div className="flex items-start gap-0 min-w-[900px] relative">
              {/* Connecting line */}
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-emerald-500/50" />

              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.15 }}
                  className="flex-1 flex flex-col items-center text-center px-2"
                >
                  {/* Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.9 + i * 0.15, type: 'spring', stiffness: 300 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-sm z-10 shadow-lg`}
                  >
                    {item.phase}
                  </motion.div>

                  {/* Label */}
                  <div className="mt-4 bg-[#1e293b]/80 border border-white/10 rounded-xl p-4 w-full">
                    <span className="text-xs text-indigo-400 font-semibold">{t('case_phase')} {item.phase}</span>
                    <p className="text-sm text-gray-300 mt-1">{t(item.titleKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CaseStudy;
