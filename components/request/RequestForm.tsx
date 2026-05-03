'use client';

import { useState, useEffect } from 'react';
import { AdUnlock } from './AdUnlock';
import { useAdUnlock } from '@/hooks/useAdUnlock';
import { submitRequest } from '@/lib/api';
import { showAd } from '@/lib/monetag';
import { useLanguages } from '@/hooks/useLanguages';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';

export function RequestForm() {
  const [movieName, setMovieName] = useState('');
  const [language, setLanguage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isUnlocked, setIsUnlocked, watchAd, reset } = useAdUnlock();
  const { languages, loading: langLoading } = useLanguages();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showSuccess) {
      timeout = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showSuccess]);

  function handleSubmit() {
    if (!movieName.trim() || !language) return
    showAd(() => {
      submitRequest(movieName.trim(), language)
      setShowSuccess(true)
      setIsUnlocked(false)
      setMovieName('')
      setLanguage('')
    })
  }

  return (
    <div className="bg-[#111111] border border-white/10 p-6 md:p-8 rounded-2xl max-w-md mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-accent-red/20 blur-[60px] pointer-events-none" />
      
      <div className="relative z-10">
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-[#111111]/90 backdrop-blur-sm rounded-2xl p-8 text-center"
            >
              <div>
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-xl font-bold text-white mb-2">Request Submitted!</h2>
                <p className="text-gray-400">We&apos;ll add it within 24 hours</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎬</div>
          <h1 className="text-2xl font-bold text-white mb-2">Request a Movie</h1>
          <p className="text-sm text-gray-400">Can&apos;t find your favorite film? Let us know and we&apos;ll add it within 24 hours!</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Movie Name</label>
            <input 
              type="text" 
              required
              value={movieName}
              onChange={e => setMovieName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all placeholder:text-gray-600"
              placeholder="e.g. Inception (2010)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Language</label>
            {langLoading ? (
              <LoadingSpinner size={24} className="py-3" />
            ) : (
              <select
                required
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/50 appearance-none cursor-pointer"
              >
                <option value="" disabled>Select a language</option>
                {languages.map(lang => (
                  <option key={lang.id} value={lang.name}>{lang.name}</option>
                ))}
              </select>
            )}
          </div>

          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

          <AdUnlock isUnlocked={isUnlocked} onUnlock={watchAd} />

          <button 
            type="button"
            onClick={handleSubmit}
            disabled={!isUnlocked || !movieName || !language}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl py-3 shadow-[0_4px_15px_rgba(229,9,20,0.3)] hover:shadow-[0_6px_20px_rgba(229,9,20,0.4)] transition-all disabled:opacity-50 disabled:hover:shadow-none flex items-center justify-center gap-2 active:scale-95 transition-transform duration-100"
          >
            Submit Request →
          </button>
        </form>
      </div>
    </div>
  );
}
