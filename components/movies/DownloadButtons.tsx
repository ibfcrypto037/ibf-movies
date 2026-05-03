'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { DownloadLinks, DownloadQuality } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAdUnlock } from '@/hooks/useAdUnlock';
import { Toast } from '@/components/ui/Toast';
import { showRewardedInterstitial } from '@/lib/monetag';

export function DownloadButtons({ links }: { links: DownloadLinks }) {
  const [loading, setLoading] = useState<DownloadQuality | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success'; isVisible: boolean }>({ message: '', type: 'error', isVisible: false });
  const { watchAd } = useAdUnlock();

  const handleDownload = async (quality: DownloadQuality, url: string) => {
    if (!url || url === '#' || url === '') return;
    if (loading) return;
    setLoading(quality);

    try {
      // Open link in new tab FIRST
      // This prevents browser popup blocking
      const newWindow = window.open('', '_blank', 'noopener,noreferrer');

      // Then show ad
      await showRewardedInterstitial();

      // After ad set the URL in already opened tab
      if (newWindow) {
        newWindow.location.href = url;
      } else {
        // Fallback if popup was blocked
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch {
      // If anything fails still redirect
      window.open(url, '_blank', 'noopener,noreferrer');
    } finally {
      setLoading(null);
    }
  };

  const styles = {
    '480p': 'bg-zinc-700 hover:bg-zinc-600',
    '720p': 'bg-blue-700 hover:bg-blue-600',
    '1080p': 'bg-gradient-to-r from-accent-red to-accent-red py-4'
  };

  return (
    <div className="flex flex-col gap-3 w-full mt-6">
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />
      {(['480p', '720p', '1080p'] as DownloadQuality[]).map((quality) => {
        if (!links[quality]) return null;
        
        const linkData = links[quality];
        const url = typeof linkData === 'string' ? linkData : linkData?.url;
        const size = typeof linkData === 'string' ? null : linkData?.size;

        const isPremium = quality === '1080p';
        const isLoading = loading === quality;

        return (
          <motion.button
            key={quality}
            onClick={() => url && handleDownload(quality, url)}
            disabled={isLoading}
            className={cn(
              "flex items-center justify-between px-6 py-3 rounded-xl font-bold transition-colors w-full disabled:opacity-70 active:scale-95 transition-transform duration-100",
              styles[quality],
              isPremium ? "text-lg shadow-lg" : "text-base"
            )}
          >
            <div className="flex items-center gap-3">
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
              <span>Download {quality} {isPremium ? 'Full HD' : quality === '720p' ? 'HD' : 'SD'}</span>
            </div>
            {size && <span className="text-white/70 font-medium text-sm">{size}</span>}
          </motion.button>
        );
      })}
    </div>
  );
}