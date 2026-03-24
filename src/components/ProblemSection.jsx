import { motion } from 'framer-motion'
import { Layers, TrendingUp, MousePointerClick, BrainCircuit } from 'lucide-react'
import { useLang } from '../i18n'

const problems = [
  {
    key: 'fragmented',
    icon: Layers,
    color: 'bg-rose-500/20 text-rose-400',
  },
  {
    key: 'cost',
    icon: TrendingUp,
    color: 'bg-amber-500/20 text-amber-400',
  },
  {
    key: 'manual',
    icon: MousePointerClick,
    color: 'bg-cyan-500/20 text-cyan-400',
  },
  {
    key: 'no_ai',
    icon: BrainCircuit,
    color: 'bg-purple-500/20 text-purple-400',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function ProblemSection() {
  const { t } = useLang()

  return (
    <section id="problem" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('problem_title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {t('problem_subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {problems.map(({ key, icon: Icon, color }) => (
            <motion.div
              key={key}
              variants={cardVariants}
              className="bg-[#1e293b]/60 border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
            >
              <div className={`w-14 h-14 rounded-full ${color} flex items-center justify-center mb-5`}>
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t(`problem_${key}`)}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {t(`problem_${key}_desc`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
