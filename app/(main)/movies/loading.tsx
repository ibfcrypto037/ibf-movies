export default function Loading() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-4">
      {Array.from({length: 18}).map((_, i) => (
        <div key={i} className="aspect-[2/3] rounded-lg bg-white/5 animate-pulse" />
      ))}
    </div>
  )
}
