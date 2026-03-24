import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLang } from '../i18n';

const NAV_KEYS = [
  { key: 'nav_problem', href: '#problem' },
  { key: 'nav_solution', href: '#solution' },
  { key: 'nav_architecture', href: '#architecture' },
  { key: 'nav_features', href: '#features' },
  { key: 'nav_savings', href: '#savings' },
  { key: 'nav_case_study', href: '#case-study' },
];

export default function Navigation() {
  const { t, lang, setLang } = useLang();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastScrollY || currentY < 80);
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'zh' : 'en');
  };

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="text-white font-bold text-xl tracking-tight shrink-0">
            STT Commerce OS
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_KEYS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Right side: lang toggle + mobile hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/20 rounded-full transition-all hover:bg-white/5"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? '繁中' : 'EN'}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_KEYS.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  onClick={handleNavClick}
                  className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {t(key)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
