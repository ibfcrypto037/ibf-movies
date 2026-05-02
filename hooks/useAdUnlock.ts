import { useState } from 'react';

export function useAdUnlock() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const watchAd = async () => {
    setIsLoading(true);
    // Simulate watching an ad
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUnlocked(true);
    setIsLoading(false);
  };

  const reset = () => {
    setIsUnlocked(false);
    setTimeLeft(0);
    setIsLoading(false);
  };

  return { isUnlocked, isLoading, timeLeft, watchAd, reset };
}
