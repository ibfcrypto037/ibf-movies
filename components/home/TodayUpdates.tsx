'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTodayMovies } from '@/lib/api';
import { Movie } from '@/types';
import { MovieCard } from '../movies/MovieCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function TodayUpdates() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const moviesRes = await getTodayMovies();
      setMovies(moviesRes.data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section className="my-12 px-4 md:px-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Today&apos;s Updates</h2>
        <Link href="/movies" className="text-accent-red text-sm font-medium hover:underline">
          View All
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner size={40} className="py-12" />
      ) : movies.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <p className="text-text-secondary text-lg">No new movies today. Check back later!</p>
          <Link href="/movies" className="mt-4 inline-block text-accent-red font-medium hover:underline">
            Browse all movies →
          </Link>
        </div>
      ) : (
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-4 no-scrollbar">
          {movies.map(movie => (
            <div key={movie.id} className="min-w-[140px] md:min-w-0 flex-shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
