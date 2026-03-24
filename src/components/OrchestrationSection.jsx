import { useLang } from '../i18n'
import { motion } from 'framer-motion'
import { Bot, GitBranch, Shield, Rocket, Wand2, Brain } from 'lucide-react'

const icons = [Bot, GitBranch, Shield, Rocket, Wand2, Brain]

export default function OrchestrationSection() {
  const { t } = useLang()
  const features = t('orchestration_features')

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('orchestration_title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('orchestration_subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 mx-auto">
              {/* Central brain */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.4)]">
                  <Brain className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>

              {/* Orbiting nodes */}
              {['CRM', 'Social', 'EDM', 'Sync', 'Chat', 'Video'].map((label, i) => {
                const angle = (i * 60 - 90) * (Math.PI / 180)
                const x = Math.cos(angle) * 120 + 144 - 24
                const y = Math.sin(angle) * 120 + 144 - 24
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="absolute w-12 h-12 rounded-xl bg-[#1e293b] border border-white/10 flex items-center justify-center text-xs font-medium text-gray-300"
                    style={{ left: x, top: y }}
                  >
                    {label}
                  </motion.div>
                )
              })}

              {/* Connecting lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 288 288">
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = (i * 60 - 90) * (Math.PI / 180)
                  const x = Math.cos(angle) * 120 + 144
                  const y = Math.sin(angle) * 120 + 144
                  return (
                    <line
                      key={i}
                      x1="144" y1="144" x2={x} y2={y}
                      stroke="rgba(99,102,241,0.2)"
                      strokeWidth="1"
                      className="flow-line"
                    />
                  )
                })}
              </svg>
            </div>
          </motion.div>

          {/* Right: Feature list */}
          <div className="space-y-4">
            {Array.isArray(features) && features.map((feature, i) => {
              const Icon = icons[i] || Bot
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#1e293b]/40 border border-white/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed pt-2">{feature}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
