import { useLang } from '../i18n'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-[#0a0e1a]">
      <div className="max-w-6xl mx-auto text-center space-y-3">
        <p className="text-sm text-gray-500">
          {t('footer_built')} <span className="text-indigo-400">Claude AI</span> {t('footer_by')}
        </p>
        <p className="text-xs text-gray-600">
          {t('footer_powered')}
        </p>
        <p className="text-xs text-gray-700">
          &copy; {new Date().getFullYear()} STT Commerce OS
        </p>
      </div>
    </footer>
  )
}
