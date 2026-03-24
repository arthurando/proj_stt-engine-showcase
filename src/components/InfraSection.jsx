import { useLang } from '../i18n'
import { motion } from 'framer-motion'
import { Server, Database, Cloud, GitBranch } from 'lucide-react'

const infra = [
  { key: 'vps', icon: Server, color: 'cyan' },
  { key: 'db', icon: Database, color: 'emerald' },
  { key: 'storage', icon: Cloud, color: 'amber' },
  { key: 'ci', icon: GitBranch, color: 'gray' },
]

const costs = [
  { key: 'vps_cost', amount: '$7.20' },
  { key: 'db_cost', amount: '$25' },
  { key: 'r2_cost', amount: '$5' },
]

export default function InfraSection() {
  const { t } = useLang()

  return (
    <section className="py-24 px-6 bg-[#0d1117]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t('infra_title')}</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t('infra_subtitle')}</p>
        </motion.div>

        {/* Infra cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {infra.map(({ key, icon: Icon, color }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1e293b]/50 border border-white/5 rounded-2xl p-6 text-center"
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-${color}-500/10 flex items-center justify-center`}>
                <Icon className={`w-7 h-7 text-${color}-400`} />
              </div>
              <h3 className="text-lg font-semibold mb-1">{t(`infra_${key}`)}</h3>
              <p className="text-sm text-gray-400">{t(`infra_${key}_spec`)}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
