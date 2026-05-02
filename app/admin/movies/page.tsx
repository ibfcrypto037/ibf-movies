'use client';

import { useState, useEffect, useMemo } from 'react';
import { adminGetMovies, adminToggleMovie, adminPermanentDeleteMovie, adminBulkDeleteMovies } from '@/lib/admin-client';
import { Movie } from '@/types';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, X } from 'lucide-react';
import { MovieForm } from '@/components/admin/MovieForm';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Toast } from '@/components/ui/Toast';

export const dynamic = 'force-dynamic';

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editMovie, setEditMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error' | 'info', isVisible: false });
  const itemsPerPage = 10;

  useEffect(() => { fetchMovies(); }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await adminGetMovies();
    if (err) setError(err);
    else {
      setMovies(data ?? []);
      setSelectedIds(new Set()); // Reset selection on fetch
    }
    setLoading(false);
  };

  const handleToggle = async (id: string) => {
    await adminToggleMovie(id);
    fetchMovies();
  };

  const handlePermanentDelete = async (id: string) => {
    if (!confirm('Permanently delete this movie? \nThis cannot be undone.')) return;
    await adminPermanentDeleteMovie(id);
    setToast({ message: 'Movie permanently deleted.', type: 'success', isVisible: true });
    fetchMovies();
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.size} movies permanently?`)) return;
    
    const { data, error } = await adminBulkDeleteMovies(Array.from(selectedIds));
    
    if (error) {
      setToast({ message: error, type: 'error', isVisible: true });
    } else {
      setToast({ message: `${data?.deleted || selectedIds.size} movies deleted`, type: 'success', isVisible: true });
      fetchMovies();
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(currentMovies.map(m => m.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const filteredMovies = useMemo(() => {
    if (!searchQuery.trim()) return movies;
    const lowerQuery = searchQuery.toLowerCase();
    return movies.filter(movie => movie.title.toLowerCase().includes(lowerQuery));
  }, [movies, searchQuery]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const allCurrentSelected = currentMovies.length > 0 && currentMovies.every(m => selectedIds.has(m.id));

  // Reset page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div>
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Manage Movies ({filteredMovies.length})</h1>
        <button
          onClick={() => { setEditMovie(null); setShowForm(true); }}
          className="px-6 py-3 bg-accent-red hover:bg-accent-red/90 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100"
        >
          <Plus size={20} /> Add New Movie
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies by title..." 
          className="w-full glass-panel rounded-xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-all text-text-primary placeholder:text-text-muted"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 mb-6 animate-in slide-in-from-top-2">
          <span className="font-medium text-sm">{selectedIds.size} movies selected</span>
          <button 
            onClick={handleBulkDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors active:scale-95 duration-100"
          >
            <Trash2 size={16} /> Delete Selected
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          <span>{error}</span>
          <button onClick={fetchMovies} className="text-sm underline active:scale-95 transition-transform duration-100">Retry</button>
        </div>
      )}

      {loading ? (
        <p className="text-text-secondary py-12 text-center">Loading...</p>
      ) : filteredMovies.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <p className="text-text-secondary mb-4">
            {searchQuery ? "No movies found." : "No movies yet."}
          </p>
          {!searchQuery && (
            <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-accent-red text-white font-medium rounded-xl active:scale-95 transition-transform duration-100">
              Add First Movie
            </button>
          )}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-sm font-medium text-text-secondary">
                <th className="p-4 w-12">
                  <input 
                    type="checkbox" 
                    checked={allCurrentSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-black/40 text-accent-red focus:ring-accent-red focus:ring-offset-0 cursor-pointer"
                  />
                </th>
                <th className="p-4">Poster</th>
                <th className="p-4">Title</th>
                <th className="p-4">Year</th>
                <th className="p-4">Language</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMovies.map(movie => (
                <tr key={movie.id} className={cn("border-b border-white/10 hover:bg-white/5 transition-colors", selectedIds.has(movie.id) && "bg-white/5")}>
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.has(movie.id)}
                      onChange={(e) => handleSelectOne(movie.id, e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-black/40 text-accent-red focus:ring-accent-red focus:ring-offset-0 cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <div className="relative w-12 h-16 rounded overflow-hidden bg-white/5">
                      <Image src={movie.poster} alt={movie.title} fill className="object-cover" sizes="48px" loading="lazy" />
                    </div>
                  </td>
                  <td className="p-4 font-bold max-w-[200px] truncate">{movie.title}</td>
                  <td className="p-4 text-text-secondary">{movie.year}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium">{movie.language}</span>
                  </td>
                  <td className="p-4">
                    <span className={cn('px-3 py-1 rounded-full text-xs font-medium', movie.is_active ? 'bg-green-500/20 text-green-400' : 'bg-accent-red/20 text-accent-red')}>
                      {movie.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => { setEditMovie(movie); setShowForm(true); }} className="text-text-secondary hover:text-white transition-colors active:scale-95 duration-100" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleToggle(movie.id)} className="text-text-secondary hover:text-white transition-colors active:scale-95 duration-100" title={movie.is_active ? 'Set Inactive' : 'Set Active'}>
                        {movie.is_active ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button onClick={() => handlePermanentDelete(movie.id)} className="text-text-secondary hover:text-accent-red transition-colors active:scale-95 duration-100" title="Permanent Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 p-4 border-t border-white/10">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    'w-8 h-8 rounded-lg text-xs font-bold transition-all active:scale-95 duration-100',
                    currentPage === i + 1
                      ? 'bg-accent-red text-white'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {showForm && (
        <MovieForm
          initialData={editMovie ? {
            title: editMovie.title,
            poster: editMovie.poster,
            year: editMovie.year,
            language: editMovie.language,
            genre: editMovie.genre,
            description: editMovie.description,
            is_active: editMovie.is_active,
            links: editMovie.download_links,
          } : undefined}
          movieId={editMovie?.id}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); fetchMovies(); }}
        />
      )}
    </div>
  );
}
