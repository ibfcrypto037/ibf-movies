export function AppDownloadBanner() {
  return (
    <div className="mx-4 mb-4 p-4 rounded-xl
      bg-gradient-to-r from-zinc-900 to-zinc-800
      border border-yellow-500/40">
      <div className="flex items-center 
                      justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">⚠️</span>
            <p className="text-yellow-400 font-bold text-sm">
              Required to Watch & Download
            </p>
          </div>
          <p className="text-gray-300 text-xs leading-relaxed">
            To watch or download movies from IbfMovies,
            you must install 
            <span className="text-white font-semibold">
            {" "}PlayerJet App</span> on your device first.
            It supports all video formats for best quality!
          </p>
        </div>
        <a
          href="https://play.google.com/store/apps/details?id=com.rs.playerjet"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 
            bg-yellow-500 hover:bg-yellow-400
            active:scale-95 text-black 
            text-xs font-bold
            px-3 py-2 rounded-xl
            transition-all duration-200
            whitespace-nowrap">
          Install Now
        </a>
      </div>
    </div>
  )
}
