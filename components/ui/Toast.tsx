'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'success', isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const bgStyles = {
    success: 'bg-green-500/90',
    error: 'bg-red-600/90',
    info: 'bg-blue-500/90'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -60, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`fixed top-4 left-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl text-white backdrop-blur-sm ${bgStyles[type]}`}
        >
          {type === 'success' && <CheckCircle2 className="text-white" size={20} />}
          {type === 'error' && <XCircle className="text-white" size={20} />}
          {type === 'info' && <Info className="text-white" size={20} />}
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
