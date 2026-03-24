import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../i18n';

const TOOLS = [
  { label: 'Email Marketing (Klaviyo)', cost: 7000 },
  { label: 'CRM (HubSpot)', cost: 800 },
  { label: 'Social Scheduling (Hootsuite)', cost: 700 },
  { label: 'Chat Support (Gorgias)', cost: 500 },
  { label: 'Loyalty Program (Smile.io)', cost: 2000 },
  { label: 'Data Sync (Airbyte)', cost: 500 },
  { label: 'Image Processing (Switchboard.ai)', cost: 60 },
  { label: 'Analytics Tools', cost: 700 },
  { label: 'Affiliate App', cost: 800 },
  { label: 'Content Creation (VA/Agency)', cost: 2000 },
];

const totalSaaS = TOOLS.reduce((sum, t) => sum + t.cost, 0);
const annualSavings = totalSaaS * 12;

function CostCalculator() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="savings"
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0d1117] to-[#0a0a1a]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('cost_title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('cost_subtitle')}
          </p>
        </motion.div>

        {/* Big comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1e293b]/50 border border-white/10 rounded-2xl overflow-hidden mb-10"
        >
          {/* Table header */}
          <div className="grid grid-cols-3 bg-white/5 border-b border-white/10 px-4 sm:px-6 py-4">
            <span className="text-sm font-semibold text-gray-300">{t('cost_tool')}</span>
            <span className="text-sm font-semibold text-red-400 text-right">{t('cost_typical')}</span>
            <span className="text-sm font-semibold text-emerald-400 text-right">STT Commerce OS</span>
          </div>

          {/* Table rows */}
          {TOOLS.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
              className={`grid grid-cols-3 px-4 sm:px-6 py-3.5 border-b border-white/5 items-center ${
                i % 2 === 0 ? 'bg-white/[0.02]' : ''
              }`}
            >
              <span className="text-sm text-gray-300">{tool.label}</span>
              <span className="text-sm text-red-400 text-right font-medium line-through decoration-red-500/50">
                ${tool.cost.toLocaleString()}/mo
              </span>
              <span className="text-sm text-emerald-400 text-right font-bold">
                $0
              </span>
            </motion.div>
          ))}

          {/* Total row */}
          <div className="grid grid-cols-3 px-4 sm:px-6 py-5 bg-white/5">
            <span className="text-base font-bold text-white">{t('cost_total_monthly')}</span>
            <span className="text-base font-bold text-red-400 text-right">
              ${totalSaaS.toLocaleString()}/mo
            </span>
            <span className="text-base font-bold text-emerald-400 text-right">
              {t('cost_included')}
            </span>
          </div>
        </motion.div>

        {/* Annual savings callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7, type: 'spring', stiffness: 150 }}
          className="bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border border-emerald-500/30 rounded-2xl p-8 text-center"
        >
          <p className="text-emerald-300 text-lg mb-2">{t('cost_savings_label')}</p>
          <div className="text-5xl md:text-6xl font-bold text-emerald-400 mb-2">
            ${annualSavings.toLocaleString()}
          </div>
          <p className="text-emerald-300/70 text-lg">{t('cost_savings_per_year')}</p>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="mt-4 mx-auto max-w-xs h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full"
          />
          <p className="text-gray-400 text-sm mt-4">
            <span className="text-emerald-400 font-bold">100%</span> {t('cost_savings_reduction')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default CostCalculator;
