export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-red-600 border-t-transparent animate-spin" />
        <p className="text-gray-400 text-sm">Loading IbfMovies...</p>
      </div>
    </div>
  )
}
