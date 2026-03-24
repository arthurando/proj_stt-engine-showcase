import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Share2,
  Mail,
  RefreshCw,
  MessageCircle,
  Crown,
  Sparkles,
  Palette,
  ClipboardList,
  Store,
  Video,
  Link,
  BarChart3,
  ShoppingBag,
  Image,
  Smartphone,
} from 'lucide-react'
import { useLang } from '../i18n'

const features = [
  { key: 'crm', icon: Users, color: 'indigo' },
  { key: 'social', icon: Share2, color: 'pink' },
  { key: 'edm', icon: Mail, color: 'amber' },
  { key: 'sync', icon: RefreshCw, color: 'cyan' },
  { key: 'chat', icon: MessageCircle, color: 'green' },
  { key: 'loyalty', icon: Crown, color: 'yellow' },
  { key: 'recs', icon: Sparkles, color: 'purple' },
  { key: 'content', icon: Palette, color: 'rose' },
  { key: 'po', icon: ClipboardList, color: 'teal' },
  { key: 'storefront', icon: Store, color: 'blue' },
  { key: 'video', icon: Video, color: 'orange' },
  { key: 'affiliate', icon: Link, color: 'lime' },
  { key: 'analytics', icon: BarChart3, color: 'sky' },
  { key: 'merchant', icon: ShoppingBag, color: 'emerald' },
  { key: 'overlay', icon: Image, color: 'fuchsia' },
  { key: 'product_create', icon: Smartphone, color: 'violet' },
]

const categories = {
  All: null,
  Commerce: ['crm', 'storefront', 'po', 'loyalty', 'affiliate', 'merchant'],
  Marketing: ['social', 'edm', 'content', 'video', 'overlay', 'product_create'],
  Operations: ['sync', 'chat', 'analytics'],
  AI: ['recs', 'content', 'social', 'edm'],
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

export default function FeaturesSection() {
  const { t } = useLang()
  const [activeFilter, setActiveFilter] = useState('All')
  const [expandedKey, setExpandedKey] = useState(null)

  const filteredFeatures =
    activeFilter === 'All'
      ? features
      : features.filter((f) => categories[activeFilter]?.includes(f.key))

  const toggleExpand = (key) => {
    setExpandedKey((prev) => (prev === key ? null : key))
  }

  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('features_title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('features_subtitle')}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat)
                setExpandedKey(null)
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Feature Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredFeatures.map((feat) => {
                const Icon = feat.icon
                const isExpanded = expandedKey === feat.key

                return (
                  <motion.div
                    key={feat.key}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => toggleExpand(feat.key)}
                    className={`feature-card bg-[#1e293b]/50 border border-white/5 rounded-2xl p-6 cursor-pointer border-l-4 border-l-${feat.color}-500`}
                  >
                    <motion.div layout="position">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-${feat.color}-500/20 flex items-center justify-center`}
                        >
                          <Icon
                            className={`w-5 h-5 text-${feat.color}-400`}
                          />
                        </div>
                        <h3 className="text-white font-semibold text-lg">
                          {t(`feat_${feat.key}`)}
                        </h3>
                      </div>

                      <AnimatePresence mode="wait">
                        {isExpanded ? (
                          <motion.div
                            key="expanded"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                              {t(`feat_${feat.key}_desc`)}
                            </p>
                            <span className="inline-block bg-white/5 text-xs text-gray-400 rounded-full px-3 py-1">
                              {t(`feat_${feat.key}_stats`)}
                            </span>
                          </motion.div>
                        ) : (
                          <motion.p
                            key="collapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-gray-400 text-sm leading-relaxed line-clamp-2"
                          >
                            {t(`feat_${feat.key}_desc`)}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
