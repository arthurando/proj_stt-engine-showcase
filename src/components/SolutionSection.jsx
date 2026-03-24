import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown, Check } from 'lucide-react'
import { useLang } from '../i18n'

const replacements = [
  { saas: 'Klaviyo', cost: '$500–2,000/mo', module: 'EDM Engine' },
  { saas: 'HubSpot CRM', cost: '$500–1,500/mo', module: 'Sales Command Center' },
  { saas: 'Hootsuite', cost: '$200–500/mo', module: 'Social Autopilot' },
  { saas: 'Gorgias', cost: '$300–800/mo', module: 'Omnichannel Chat' },
  { saas: 'Smile.io', cost: '$200–600/mo', module: 'Loyalty & Rewards' },
  { saas: 'Airbyte', cost: '$500–1,000/mo', module: 'Real-Time Sync' },
  { saas: 'Switchboard.ai', cost: '$30–100/mo', module: 'Image Overlay Service' },
  { saas: 'Various Analytics', cost: '$200–500/mo', module: 'Performance Analytics' },
  { saas: 'Affiliate App', cost: '$200–400/mo', module: 'Affiliate & Referral' },
  { saas: 'Content Creation', cost: '$1,000–3,000/mo', module: 'AI Content Factory' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

const arrowVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

export default function SolutionSection() {
  const { t } = useLang()

  return (
    <section id="solution" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('solution_title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {t('solution_subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {replacements.map(({ saas, cost, module }, i) => (
            <motion.div
              key={i}
              variants={rowVariants}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 items-center"
            >
              {/* SaaS side — red/rose tint */}
              <div className="bg-rose-950/30 border border-rose-500/15 rounded-xl px-5 py-4 flex items-center justify-between">
                <div>
                  <span className="text-white/80 line-through decoration-rose-400/60 decoration-2">
                    {saas}
                  </span>
                </div>
                <span className="text-rose-400 text-sm font-mono whitespace-nowrap ml-3">
                  {cost}
                </span>
              </div>

              {/* Arrow */}
              <motion.div
                variants={arrowVariants}
                className="flex justify-center"
              >
                <div className="hidden md:flex w-10 h-10 rounded-full bg-white/5 items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex md:hidden w-8 h-8 rounded-full bg-white/5 items-center justify-center mx-auto">
                  <ArrowDown className="w-4 h-4 text-emerald-400" />
                </div>
              </motion.div>

              {/* Our module — green/emerald tint */}
              <div className="bg-emerald-950/30 border border-emerald-500/15 rounded-xl px-5 py-4 flex items-center justify-between">
                <span className="text-white font-medium">{module}</span>
                <span className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium whitespace-nowrap ml-3">
                  <Check className="w-4 h-4" />
                  Included
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Total savings callout */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-3">
            <span className="text-gray-400 text-sm">Total replaced:</span>
            <span className="text-emerald-400 font-bold text-lg">
              $3,630–$10,400/mo
            </span>
            <span className="text-gray-500">|</span>
            <span className="text-emerald-400 font-bold text-lg">
              $43K–$125K/yr
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
