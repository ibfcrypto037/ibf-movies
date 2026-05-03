import { useState } from 'react';
import { showRewardedInterstitial } from '@/lib/monetag';

export function useAdUnlock() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const watchAd = async () => {
    if (isLoading || isUnlocked) return
    setIsLoading(true)

    // Wait for SDK to load if not ready
    let attempts = 0
    while (typeof show_10954902 === 'undefined' && attempts < 10) {
      await new Promise(r => setTimeout(r, 500))
      attempts++
    }

    try {
      if (typeof show_10954902 !== 'undefined') {
        await showRewardedInterstitial()
        setIsUnlocked(true)
      } else {
        // SDK not loaded - use timer fallback
        setTimeLeft(5)
      }
    } catch {
      setTimeLeft(5)
    } finally {
      setIsLoading(false)
    }
  };

  const reset = () => {
    setIsUnlocked(false);
    setTimeLeft(0);
    setIsLoading(false);
  };

  return { isUnlocked, isLoading, timeLeft, watchAd, reset };
}
