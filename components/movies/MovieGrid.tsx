'use client';

import { Movie } from '@/types';
import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from './MovieCardSkeleton';
import { EmptyState } from '../ui/EmptyState';
import { ErrorMessage } from '../ui/ErrorMessage';
import { motion, AnimatePresence } from 'framer-motion';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export function MovieGrid({ movies, loading, error }: MovieGridProps) {
  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (loading) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return <EmptyState title="No movies found" description="Try adjusting your search or language filter." />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={movies.map(m => m.id).join(',')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6"
      >
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} priority={index < 6} index={index} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
