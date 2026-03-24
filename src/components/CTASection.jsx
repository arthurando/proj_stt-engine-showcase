import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLang } from '../i18n';

function FloatingDot({ size, x, y, delay, duration }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/5"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

const DOTS = [
  { size: 6, x: 10, y: 20, delay: 0, duration: 4 },
  { size: 4, x: 25, y: 60, delay: 0.5, duration: 3.5 },
  { size: 8, x: 40, y: 30, delay: 1, duration: 5 },
  { size: 5, x: 55, y: 70, delay: 1.5, duration: 4.5 },
  { size: 3, x: 70, y: 15, delay: 0.8, duration: 3 },
  { size: 7, x: 80, y: 55, delay: 2, duration: 4.2 },
  { size: 4, x: 90, y: 35, delay: 0.3, duration: 3.8 },
  { size: 6, x: 15, y: 80, delay: 1.2, duration: 4.8 },
  { size: 5, x: 60, y: 85, delay: 0.7, duration: 3.6 },
  { size: 3, x: 35, y: 10, delay: 1.8, duration: 4.3 },
  { size: 8, x: 85, y: 75, delay: 0.2, duration: 5.2 },
  { size: 4, x: 50, y: 45, delay: 1.4, duration: 3.2 },
];

function CTASection() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)]" />

      {/* Floating particles */}
      {DOTS.map((dot, i) => (
        <FloatingDot key={i} {...dot} />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t('cta_title')}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg text-indigo-200 mb-10 max-w-xl mx-auto"
        >
          {t('cta_subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-900 font-semibold px-8 py-4 rounded-xl text-lg flex items-center gap-2 shadow-lg shadow-black/20 hover:bg-gray-100 transition-colors"
          >
            {t('cta_button')}
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* Outline button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg flex items-center gap-2 hover:border-white/50 hover:bg-white/5 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            {t('cta_button2')}
          </motion.button>
        </motion.div>

        {/* Bottom subtle line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
    </section>
  );
}

export default CTASection;
