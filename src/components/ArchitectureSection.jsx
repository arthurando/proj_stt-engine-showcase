import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ShoppingBag,
  Rss,
  Users,
  Brain,
  Sparkles,
  MessageSquare,
  Bot,
  BarChart3,
  RefreshCw,
  ClipboardList,
  Heart,
  Mail,
  Video,
  Image,
  Database,
  HardDrive,
  Layers,
  Store,
} from 'lucide-react';
import { useLang } from '../i18n';

const LAYERS = [
  {
    labelKey: 'arch_layer_storefront',
    color: '#3b82f6',
    colorLight: 'rgba(59, 130, 246, 0.15)',
    direction: 'left',
    services: [
      { name: 'Shopify Hydrogen', subtitle: 'SSR Store', icon: ShoppingBag },
      { name: 'Google Merchant Feed', icon: Rss },
      { name: 'Affiliate Portal', icon: Users },
    ],
  },
  {
    labelKey: 'arch_layer_intelligence',
    color: '#8b5cf6',
    colorLight: 'rgba(139, 92, 246, 0.15)',
    direction: 'right',
    services: [
      { name: 'AI Recommendations', icon: Sparkles },
      { name: 'AI Orchestrator', subtitle: 'Intelligence Hub', icon: Brain, glow: true },
      { name: 'AI Content Generator', icon: MessageSquare },
      { name: 'AI Shopping Agent', icon: Bot },
    ],
  },
  {
    labelKey: 'arch_layer_operations',
    color: '#10b981',
    colorLight: 'rgba(16, 185, 129, 0.15)',
    direction: 'left',
    services: [
      { name: 'CRM Engine', subtitle: '212K customers', icon: BarChart3 },
      { name: 'Shopify Sync', subtitle: 'Real-time', icon: RefreshCw },
      { name: 'PO Management', icon: ClipboardList },
      { name: 'Loyalty Engine', icon: Heart },
    ],
  },
  {
    labelKey: 'arch_layer_content',
    color: '#f59e0b',
    colorLight: 'rgba(245, 158, 11, 0.15)',
    direction: 'right',
    services: [
      { name: 'Social Autopilot', icon: Rss },
      { name: 'EDM Engine', icon: Mail },
      { name: 'Video Editor', icon: Video },
      { name: 'Image Overlay', icon: Image },
    ],
  },
  {
    labelKey: 'arch_layer_data',
    color: '#06b6d4',
    colorLight: 'rgba(6, 182, 212, 0.15)',
    direction: 'left',
    services: [
      { name: 'Database', subtitle: '170 tables', icon: Database },
      { name: 'Cloud Storage', icon: HardDrive },
      { name: 'Redis / BullMQ', icon: Layers },
      { name: 'Shopify API', icon: Store },
    ],
  },
];

function ServiceBox({ service, layerColor, delay }) {
  const isGlow = service.glow;
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay }}
      className={`
        relative flex items-center gap-3 px-4 py-3 rounded-xl
        bg-[#1e293b]/40 backdrop-blur border border-white/5
        hover:border-white/10 transition-all duration-300
        ${isGlow ? 'min-w-[220px] py-4 px-5' : ''}
      `}
      style={{
        borderLeft: `4px solid ${layerColor}`,
        ...(isGlow
          ? {
              boxShadow: `0 0 30px ${layerColor}40, 0 0 60px ${layerColor}20`,
              borderColor: `${layerColor}60`,
              border: `1px solid ${layerColor}50`,
              borderLeft: `4px solid ${layerColor}`,
            }
          : {}),
      }}
    >
      {isGlow && (
        <div
          className="absolute inset-0 rounded-xl opacity-20 blur-xl -z-10"
          style={{ background: layerColor }}
        />
      )}
      <div
        className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ background: `${layerColor}20` }}
      >
        <Icon size={isGlow ? 20 : 18} style={{ color: layerColor }} />
      </div>
      <div className="min-w-0">
        <div className={`font-semibold text-white leading-tight ${isGlow ? 'text-base' : 'text-sm'}`}>
          {service.name}
        </div>
        {service.subtitle && (
          <div className="text-xs text-gray-400 mt-0.5">{service.subtitle}</div>
        )}
      </div>
      {isGlow && (
        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full pulse-dot" style={{ background: layerColor }} />
      )}
    </motion.div>
  );
}

function LayerRow({ layer, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const fromLeft = layer.direction === 'left';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      className="relative"
    >
      {/* Layer container */}
      <div className="flex flex-col lg:flex-row items-stretch gap-4">
        {/* Layer label */}
        <div
          className="shrink-0 lg:w-48 flex items-center gap-2 px-4 py-2 rounded-xl lg:rounded-l-xl lg:rounded-r-none"
          style={{ background: layer.colorLight }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: layer.color }} />
          <span className="text-sm font-semibold whitespace-nowrap" style={{ color: layer.color }}>
            {layer.label}
          </span>
        </div>

        {/* Service boxes */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-3">
          {layer.services.map((service, si) => (
            <ServiceBox
              key={service.name}
              service={service}
              layerColor={layer.color}
              delay={index * 0.12 + si * 0.08}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ConnectionLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      preserveAspectRatio="none"
    >
      {/* Vertical flow lines between layers */}
      {[1, 2, 3, 4].map((i) => {
        const y1 = `${i * 20 - 2}%`;
        const y2 = `${i * 20 + 2}%`;
        return (
          <g key={i}>
            <line
              x1="30%"
              y1={y1}
              x2="30%"
              y2={y2}
              stroke="rgba(99, 102, 241, 0.3)"
              strokeWidth="1.5"
              className="flow-line"
            />
            <line
              x1="50%"
              y1={y1}
              x2="50%"
              y2={y2}
              stroke="rgba(99, 102, 241, 0.3)"
              strokeWidth="1.5"
              className="flow-line"
            />
            <line
              x1="70%"
              y1={y1}
              x2="70%"
              y2={y2}
              stroke="rgba(99, 102, 241, 0.3)"
              strokeWidth="1.5"
              className="flow-line"
            />
          </g>
        );
      })}
    </svg>
  );
}

export default function ArchitectureSection() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const layers = LAYERS.map((layer) => ({
    ...layer,
    label: t(layer.labelKey),
  }));

  return (
    <section
      id="architecture"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('arch_title')}
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            {t('arch_subtitle')}
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <div className="relative">
          <ConnectionLines />

          <div className="relative z-10 flex flex-col gap-6">
            {layers.map((layer, i) => (
              <LayerRow key={layer.labelKey} layer={layer} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
