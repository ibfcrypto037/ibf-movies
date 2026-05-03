'use client';

import { useState } from 'react';
import { submitRequest } from '@/lib/api';
import { useLanguages } from '@/hooks/useLanguages';
import { AdUnlock } from '@/components/request/AdUnlock';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageTransition } from '@/components/layout/PageTransition';
import { showAd } from '@/lib/monetag';

export default function RequestPage() {
  const [movieName, setMovieName] = useState('');
  const [language, setLanguage] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { languages, loading: langLoading } = useLanguages();

  const handleUnlock = () => {
    showAd(() => {
      setIsUnlocked(true);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUnlocked) return;
    
    setSubmitting(true);
    setMessage('');
    setError('');

    const result = await submitRequest(movieName, language);
    
    if (result.error) {
      setError(result.error.message || 'Failed to submit request');
    } else {
      setMessage('Request submitted successfully!');
      setMovieName('');
      setLanguage('');
      setIsUnlocked(false);
    }
    setSubmitting(false);
  };

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Request a Movie</h1>
        
        <div className="glass-panel p-6 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Movie Name</label>
              <input 
                required 
                value={movieName} 
                onChange={e => setMovieName(e.target.value)} 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1" 
                placeholder="e.g. Inception"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Language</label>
              {langLoading ? <LoadingSpinner size={20} /> : (
                <select 
                  required 
                  value={language} 
                  onChange={e => setLanguage(e.target.value)} 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1"
                >
                  <option value="">Select language</option>
                  {languages.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
                </select>
              )}
            </div>

            <AdUnlock isUnlocked={isUnlocked} onUnlock={handleUnlock} />

            {message && <p className="text-green-500 text-sm text-center">{message}</p>}
            {error && <p className="text-accent-red text-sm text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={!isUnlocked || submitting || !movieName || !language}
              className="w-full py-4 rounded-xl bg-accent-red text-white font-bold hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all disabled:opacity-50 flex justify-center items-center gap-2 active:scale-95 transition-transform duration-100"
            >
              {submitting ? <LoadingSpinner size={20} /> : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}