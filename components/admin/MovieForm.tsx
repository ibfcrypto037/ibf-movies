'use client';

import { useState } from 'react';
import { MovieFormData } from '@/types';
import { useLanguages } from '@/hooks/useLanguages';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { X } from 'lucide-react';
import { adminAddMovie, adminUpdateMovie } from '@/lib/admin-client';

interface MovieFormProps {
  onClose: () => void;
  onSaved: () => void;
  initialData?: Partial<MovieFormData>;
  movieId?: string; // if present, this is an edit
}

export function MovieForm({ onClose, onSaved, initialData, movieId }: MovieFormProps) {
  const { languages, loading: langLoading } = useLanguages();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<MovieFormData>({
    title: initialData?.title || '',
    poster: initialData?.poster || '',
    year: initialData?.year || new Date().getFullYear(),
    language: initialData?.language || '',
    genre: initialData?.genre || '',
    description: initialData?.description || '',
    is_active: initialData?.is_active ?? true,
    links: {
      '480p': initialData?.links?.['480p'] || '',
      '720p': initialData?.links?.['720p'] || '',
      '1080p': initialData?.links?.['1080p'] || '',
    },
  });

  const [toggles, setToggles] = useState({
    '480p': !!formData.links['480p'],
    '720p': !!formData.links['720p'],
    '1080p': !!formData.links['1080p'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = movieId
      ? await adminUpdateMovie(movieId, formData)
      : await adminAddMovie(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      onSaved();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-bg-card border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">{movieId ? 'Edit Movie' : 'Add New Movie'}</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors active:scale-95 transition-transform duration-100"><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Movie Title *</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Poster URL *</label>
              <input required type="url" value={formData.poster} onChange={e => setFormData({...formData, poster: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Year *</label>
              <input required type="number" value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Language *</label>
              {langLoading ? <LoadingSpinner size={20} /> : (
                <select required value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 appearance-none cursor-pointer">
                  <option value="">Select language</option>
                  {languages.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Genre *</label>
              <input required value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1" />
            </div>
            <div className="flex items-center h-full pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="w-5 h-5 accent-accent-red" />
                <span className="text-sm font-medium">Active (Visible to users)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Description *</label>
            <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1 resize-none" />
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="font-medium text-white mb-4">Download Links</h3>
            {(['480p', '720p', '1080p'] as const).map(quality => (
              <div key={quality} className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={toggles[quality]} onChange={e => setToggles({...toggles, [quality]: e.target.checked})} className="w-5 h-5 accent-accent-red" />
                  <span className="text-sm font-bold text-accent-blue">{quality}</span>
                </label>
                {toggles[quality] && (
                  <div className="space-y-2">
                    <input type="url" required={toggles[quality]} placeholder={`Download URL for ${quality}`}
                      value={typeof formData.links[quality] === 'string' ? formData.links[quality] as string : (formData.links[quality] as any)?.url || ''}
                      onChange={e => setFormData({...formData, links: {...formData.links, [quality]: {...((formData.links[quality] as any) || {}), url: e.target.value}}})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-red focus:ring-1" />
                    <input type="text" placeholder="File size e.g. 700 MB"
                      value={typeof formData.links[quality] === 'string' ? '' : (formData.links[quality] as any)?.size || ''}
                      onChange={e => setFormData({...formData, links: {...formData.links, [quality]: {url: typeof formData.links[quality] === 'string' ? formData.links[quality] as string : (formData.links[quality] as any)?.url || '', size: e.target.value}}})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-accent-red focus:ring-1" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {error && <p className="text-accent-red text-sm font-medium">{error}</p>}

          <div className="pt-6">
            <button disabled={loading} type="submit" className="w-full py-4 rounded-xl bg-accent-red text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all flex justify-center gap-2 active:scale-95 transition-transform duration-100">
              {loading && <LoadingSpinner size={20} />}
              {loading ? 'Saving...' : movieId ? 'Update Movie' : 'Publish Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
