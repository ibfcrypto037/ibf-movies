import { useState } from 'react';
import { showAd } from '@/lib/monetag';

export function useAdUnlock() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  function watchAd() {
    showAd(() => {
      setIsUnlocked(true)
    })
  }

  const reset = () => {
    setIsUnlocked(false);
  };

  return { isUnlocked, watchAd, reset };
}
