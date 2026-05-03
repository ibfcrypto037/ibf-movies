import { useState } from 'react';
import { showRewardedInterstitial } from '@/lib/monetag';

export function useAdUnlock() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const watchAd = async () => {
    if (isLoading || isUnlocked) return
    setIsLoading(true)
    try {
      await showRewardedInterstitial()
      setIsUnlocked(true)
    } catch {
      // Start 5 second fallback timer
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
