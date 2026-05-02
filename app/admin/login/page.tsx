'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Image from 'next/image';

import { adminLoginEdge } from '@/lib/api';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { success, error: authError } = await adminLoginEdge(password);
      if (success) {
        document.cookie = `admin_token=${password}; path=/; max-age=${60 * 60 * 24 * 7}; Secure; SameSite=Strict`;
        router.push('/admin');
        router.refresh();
      } else {
        setError(authError || 'Invalid password');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
      <div className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-md text-center">
        <div className="flex flex-col items-center mb-8">
          <Image 
            src="/logo.svg" 
            alt="IbfMovies Logo" 
            width={48} 
            height={48} 
            className="mb-4"
          />
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all text-center"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
          
          {error && <p className="text-accent-red text-sm">{error}</p>}

          <button 
            type="submit"
            disabled={loading || !password}
            className="w-full py-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95 transition-transform duration-100"
          >
            {loading && <LoadingSpinner size={20} />}
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
