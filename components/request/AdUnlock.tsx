'use client';

import { Lock, Unlock, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdUnlockProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export function AdUnlock({ isUnlocked, onUnlock }: AdUnlockProps) {
  if (isUnlocked) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center py-2"
      >
        <div className="text-3xl animate-bounce">✅</div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-white/5 border border-white/10 rounded-xl text-center">
      <div className="text-3xl mb-2">🔒</div>
      <h3 className="font-semibold text-white mb-1">Unlock to Submit</h3>
      <p className="text-xs text-gray-400 mb-4">
        Watch a short ad to unlock the submit button
      </p>
      <button 
        type="button"
        onClick={onUnlock}
        className="w-full bg-white/10 border border-white/20 text-gray-300 rounded-xl py-3 text-sm transition-colors disabled:opacity-50 active:scale-95 transition-transform duration-100"
      >
        ▶ Watch Ad to Unlock
      </button>
    </div>
  );
}
