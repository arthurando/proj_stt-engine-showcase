export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5 bg-[#0a0e1a]">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs text-gray-700">
          &copy; {new Date().getFullYear()} STT Commerce OS
        </p>
      </div>
    </footer>
  )
}
