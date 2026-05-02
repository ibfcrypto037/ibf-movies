export function MovieCardSkeleton() {
  return (
    <div className="relative aspect-[2/3] rounded-xl overflow-hidden skeleton-shimmer bg-[#1a1a1a]">
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60">
        <div className="h-4 bg-white/20 rounded w-3/4 mb-2" />
        <div className="flex justify-between">
          <div className="h-3 bg-white/20 rounded w-1/4" />
          <div className="h-3 bg-white/20 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}
