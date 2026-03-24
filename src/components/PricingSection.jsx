import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { useLang } from '../i18n';

const TIERS = [
  {
    titleKey: 'pricing_setup',
    descKey: 'pricing_setup_desc',
    priceKey: 'pricing_setup_price',
    featuresKey: 'pricing_setup_features',
    popular: false,
    className: 'bg-[#1e293b]/50 border border-white/10',
  },
  {
    titleKey: 'pricing_managed',
    descKey: 'pricing_managed_desc',
    priceKey: 'pricing_managed_price',
    featuresKey: 'pricing_managed_features',
    popular: true,
    className: 'bg-gradient-to-b from-indigo-900/30 to-[#1e293b]/50 border border-indigo-500/30',
  },
  {
    titleKey: 'pricing_partner',
    descKey: 'pricing_partner_desc',
    priceKey: 'pricing_partner_price',
    featuresKey: 'pricing_partner_features',
    popular: false,
    className: 'bg-[#1e293b]/50 border border-white/10',
  },
];

function PricingCard({ tier, t, index, inView }) {
  const features = t(tier.featuresKey);
  const featureList = Array.isArray(features) ? features : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
      className={`relative rounded-2xl p-8 ${tier.className} ${
        tier.popular ? 'lg:scale-105 lg:z-10' : ''
      } flex flex-col`}
    >
      {/* Popular badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-indigo-500/25">
            <Star className="w-3.5 h-3.5 fill-current" />
            {t('pricing_popular')}
          </div>
        </div>
      )}

      {/* Title & description */}
      <h3 className="text-2xl font-bold text-white mt-2">{t(tier.titleKey)}</h3>
      <p className="text-gray-400 text-sm mt-2 mb-6">{t(tier.descKey)}</p>

      {/* Price */}
      <div className="mb-8">
        <span className="text-xl font-semibold text-indigo-400">{t(tier.priceKey)}</span>
      </div>

      {/* Features list */}
      <ul className="space-y-3 flex-1">
        {featureList.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.15 + i * 0.05 }}
            className="flex items-start gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-emerald-400" />
            </div>
            <span className="text-sm text-gray-300">{feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* CTA button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`mt-8 w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
          tier.popular
            ? 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25'
            : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
        }`}
      >
        {t('cost_get_started')}
      </motion.button>
    </motion.div>
  );
}

function PricingSection() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
    >
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
            {t('pricing_title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('pricing_subtitle')}
          </p>
        </motion.div>

        {/* Pricing grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-4 items-start">
          {TIERS.map((tier, i) => (
            <PricingCard
              key={tier.titleKey}
              tier={tier}
              t={t}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
