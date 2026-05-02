'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/types';
import { getRelatedMovies } from '@/lib/api';
import { MovieCard } from './MovieCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function RelatedMovies({ currentMovie }: { currentMovie: Movie }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRelatedMovies(currentMovie.id, currentMovie.language, currentMovie.genre).then(({ data }) => {
      setMovies(data || []);
      setLoading(false);
    });
  }, [currentMovie]);

  if (loading) return <LoadingSpinner size={40} className="py-12" />;
  if (movies.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h3 className="text-2xl font-bold mb-6">Similar Movies</h3>
      <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4 no-scrollbar">
        {movies.map(movie => (
          <div key={movie.id} className="min-w-[140px] md:min-w-0 flex-shrink-0">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
