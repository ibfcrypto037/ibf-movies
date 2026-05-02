'use client';

import { useState, useEffect } from 'react';
import { getLanguages } from '@/lib/api';
import { adminAddLanguage, adminDeleteLanguage } from '@/lib/admin-client';
import { Language } from '@/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Plus, Trash2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AdminLanguagesPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newLang, setNewLang] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => { fetchLanguages(); }, []);

  const fetchLanguages = async () => {
    setLoading(true);
    const { data, error: err } = await getLanguages();
    if (err) setError(err.message);
    else setLanguages(data ?? []);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLang.trim()) return;
    setAdding(true);
    setError(null);
    const { data, error: err } = await adminAddLanguage(newLang.trim());
    if (err) setError(err);
    else if (data) { setLanguages(prev => [...prev, data].sort((a, b) => a.name.localeCompare(b.name))); setNewLang(''); }
    setAdding(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    await adminDeleteLanguage(id);
    setLanguages(prev => prev.filter(l => l.id !== id));
    alert('Language deleted');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Manage Languages</h1>
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      <div className="glass-panel p-6 rounded-2xl mb-8">
        <form onSubmit={handleAdd} className="flex gap-4">
          <input type="text" value={newLang} onChange={e => setNewLang(e.target.value)} placeholder="Add new language..." className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1" />
          <button type="submit" disabled={!newLang.trim() || adding} className="px-6 py-3 bg-accent-red hover:bg-accent-red/90 disabled:opacity-50 text-white font-medium rounded-xl flex items-center gap-2 active:scale-95 transition-transform duration-100">
            {adding ? <LoadingSpinner size={18} /> : <Plus size={20} />} Add
          </button>
        </form>
      </div>
      {loading ? <LoadingSpinner size={40} className="py-12" /> : (
        <div className="bg-[#111111] rounded-xl overflow-hidden border border-white/10">
          {languages.map((lang) => (
            <div key={lang.id} className="bg-[#111111] border-b border-white/5 px-4 py-3 flex justify-between items-center last:border-b-0">
              <div className="flex items-center gap-2">
                <span className="text-base">🌐</span>
                <span className="text-white font-medium text-sm">{lang.name}</span>
              </div>
              <button  
                onClick={() => handleDelete(lang.id, lang.name)} 
                className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/30 rounded-lg px-3 py-1 text-xs transition-all duration-200 flex items-center gap-1"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
