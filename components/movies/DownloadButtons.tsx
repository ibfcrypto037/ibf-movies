'use client';

import { Download } from 'lucide-react';
import { DownloadLinks, DownloadQuality } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { showAd } from '@/lib/monetag';

export function DownloadButtons({ links }: { links: DownloadLinks }) {
  function handleDownload(url: string) {
    if (!url || url === '#') return
    showAd(() => {
      window.open(url, '_blank')
    })
  }

  const styles = {
    '480p': 'bg-zinc-700 hover:bg-zinc-600',
    '720p': 'bg-blue-700 hover:bg-blue-600',
    '1080p': 'bg-gradient-to-r from-accent-red to-accent-red py-4'
  };

  return (
    <div className="flex flex-col gap-3 w-full mt-6">
      {(['480p', '720p', '1080p'] as DownloadQuality[]).map((quality) => {
        if (!links[quality]) return null;
        
        const linkData = links[quality];
        const url = typeof linkData === 'string' ? linkData : linkData?.url;
        const size = typeof linkData === 'string' ? null : linkData?.size;

        const isPremium = quality === '1080p';

        return (
          <motion.button
            key={quality}
            onClick={() => url && handleDownload(url)}
            className={cn(
              "flex items-center justify-between px-6 py-3 rounded-xl font-bold transition-colors w-full disabled:opacity-70 active:scale-95 transition-transform duration-100",
              styles[quality as keyof typeof styles],
              isPremium ? "text-lg shadow-lg" : "text-base"
            )}
          >
            <div className="flex items-center gap-3">
              <Download size={20} />
              <span>Download {quality} {isPremium ? 'Full HD' : quality === '720p' ? 'HD' : 'SD'}</span>
            </div>
            {size && <span className="text-white/70 font-medium text-sm">{size}</span>}
          </motion.button>
        );
      })}
    </div>
  );
}