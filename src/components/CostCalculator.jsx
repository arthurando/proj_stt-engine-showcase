import { useState, useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { DollarSign, Server, ChevronDown } from 'lucide-react';
import { useLang } from '../i18n';

const DEFAULT_TOOLS = [
  { key: 'email', label: 'Email Marketing (Klaviyo)', cost: 7000 },
  { key: 'crm', label: 'CRM (HubSpot)', cost: 800 },
  { key: 'social', label: 'Social Scheduling (Hootsuite)', cost: 700 },
  { key: 'chat', label: 'Chat Support (Gorgias)', cost: 500 },
  { key: 'loyalty', label: 'Loyalty Program (Smile.io)', cost: 2000 },
  { key: 'sync', label: 'Data Sync (Airbyte)', cost: 500 },
  { key: 'image', label: 'Image Processing (Switchboard.ai)', cost: 60 },
  { key: 'analytics', label: 'Analytics Tools', cost: 700 },
  { key: 'affiliate', label: 'Affiliate App', cost: 800 },
  { key: 'content', label: 'Content Creation (VA/Agency)', cost: 2000 },
];

const INFRA_COST = 105; // $75 server + $25 database + $5 storage

function AnimatedNumber({ value, prefix = '$', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  const prevValue = useRef(0);

  useEffect(() => {
    if (!ref.current || !inView) return;
    const controls = animate(prevValue.current, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
        }
      },
    });
    prevValue.current = value;
    return () => controls.stop();
  }, [value, inView, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}

function CostCalculator() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [costs, setCosts] = useState(() =>
    Object.fromEntries(DEFAULT_TOOLS.map((tool) => [tool.key, tool.cost]))
  );

  const totalSaaS = Object.values(costs).reduce((sum, c) => sum + (Number(c) || 0), 0);
  const annualSavings = (totalSaaS - INFRA_COST) * 12;
  const savingsPercent = totalSaaS > 0 ? Math.round(((totalSaaS - INFRA_COST) / totalSaaS) * 100) : 0;

  const handleCostChange = (key, value) => {
    setCosts((prev) => ({ ...prev, [key]: value === '' ? '' : Number(value) }));
  };

  return (
    <section
      id="savings"
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0d1117] to-[#0a0a1a]" />

      <div className="relative z-10 max-w-6xl mx-auto">
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

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left: Current SaaS Stack */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-red-950/20 border border-red-500/20 rounded-2xl p-4 sm:p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-red-300">{t('cost_your_stack')}</h3>
            </div>

            <div className="space-y-3">
              {DEFAULT_TOOLS.map((tool) => (
                <div
                  key={tool.key}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm text-gray-300 flex-1 min-w-0 truncate">
                    {tool.label}
                  </span>
                  <div className="relative w-20 sm:w-28 shrink-0">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      value={costs[tool.key]}
                      onChange={(e) => handleCostChange(tool.key, e.target.value)}
                      className="w-full bg-[#1a1a2e] border border-red-500/20 rounded-lg pl-7 pr-3 py-2 text-right text-sm text-white focus:outline-none focus:border-red-400/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-red-500/20 flex items-center justify-between">
              <span className="text-lg font-semibold text-red-300">{t('cost_total_monthly')}</span>
              <span className="text-2xl font-bold text-red-400">
                <AnimatedNumber value={totalSaaS} />
                <span className="text-sm text-red-400/60 ml-1">/mo</span>
              </span>
            </div>
          </motion.div>

          {/* Right: STT Commerce OS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-4 sm:p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Server className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-emerald-300">STT Commerce OS</h3>
            </div>

            <div className="space-y-3">
              {DEFAULT_TOOLS.map((tool) => (
                <div
                  key={tool.key}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm text-gray-300 flex-1 min-w-0 truncate">
                    {tool.label}
                  </span>
                  <span className="w-28 shrink-0 text-right text-sm text-emerald-400 font-medium py-2">
                    $0 included
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-500/20">
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Private Server</span>
                  <span>$75/mo</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Database</span>
                  <span>$25/mo</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Cloud Storage</span>
                  <span>$5/mo</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-emerald-300">{t('cost_total_monthly')}</span>
                <span className="text-2xl font-bold text-emerald-400">
                  $105
                  <span className="text-sm text-emerald-400/60 ml-1">/mo</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Comparison bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-[#1e293b]/50 border border-white/10 rounded-2xl p-8 mb-8"
        >
          <div className="space-y-4">
            {/* SaaS bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-red-300">{t('cost_current_label')}</span>
                <span className="text-red-400 font-semibold">
                  <AnimatedNumber value={totalSaaS} />/mo
                </span>
              </div>
              <div className="h-4 bg-[#0a0a1a] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : {}}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
            </div>

            {/* STT bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-emerald-300">{t('cost_our')}</span>
                <span className="text-emerald-400 font-semibold">$105/mo</span>
              </div>
              <div className="h-4 bg-[#0a0a1a] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={
                    inView
                      ? { width: totalSaaS > 0 ? `${(INFRA_COST / totalSaaS) * 100}%` : '0%' }
                      : {}
                  }
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
            </div>
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
            <AnimatedNumber value={Math.max(0, annualSavings)} />
          </div>
          <p className="text-emerald-300/70 text-lg">{t('cost_savings_per_year')}</p>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="mt-4 mx-auto max-w-xs h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full"
          />
          <p className="text-gray-400 text-sm mt-4">
            <span className="text-emerald-400 font-bold">{savingsPercent}%</span> {t('cost_savings_reduction')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default CostCalculator;
