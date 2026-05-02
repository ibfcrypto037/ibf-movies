'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdUnlock } from '@/hooks/useAdUnlock';

export function SupportButton() {
  const [showThanks, setShowThanks] = useState(false);
  const { watchAd } = useAdUnlock();

  const handleSupport = async () => {
    try {
      await watchAd();
      setShowThanks(true);
      setTimeout(() => setShowThanks(false), 4000);
    } catch (error) {
      console.error('Error watching ad:', error);
    }
  };

  return (
    <div className="flex justify-center my-12 px-4 relative h-[60px]">
      <AnimatePresence mode="wait">
        {!showThanks ? (
          <motion.button
            key="support-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={handleSupport}
            className="absolute flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-red to-accent-red text-white font-bold shadow-lg hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] active:scale-95 transition-transform duration-100"
          >
            <Heart fill="currentColor" />
            Support Us
          </motion.button>
        ) : (
          <motion.div
            key="thanks-msg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold shadow-[0_0_20px_rgba(34,197,94,0.4)]"
          >
            🙏 Thank you for your support!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
