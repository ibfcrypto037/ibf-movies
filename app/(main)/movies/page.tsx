'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/movies/SearchBar';
import { LanguageFilter } from '@/components/movies/LanguageFilter';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { useMovies } from '@/hooks/useMovies';
import { useLanguages } from '@/hooks/useLanguages';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useDebounce } from '@/hooks/useDebounce';
import { PageTransition } from '@/components/layout/PageTransition';

export default function MoviesPage() {
  const [search, setSearch] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('All');
  const debouncedSearch = useDebounce(search, 500);
  
  const { movies, loading: moviesLoading, error, hasMore, loadMore, retry } = useMovies(activeLanguage, debouncedSearch);
  const { languages, loading: langLoading } = useLanguages();

  return (
    <PageTransition>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-accent-red to-accent-red bg-clip-text text-transparent">
          Discover Movies
        </h1>
        
        <SearchBar value={search} onChange={setSearch} />
        
        {langLoading ? (
          <LoadingSpinner className="mb-8" />
        ) : (
          <LanguageFilter 
            languages={languages} 
            activeLanguage={activeLanguage}
            onSelect={setActiveLanguage}
          />
        )}

        {error ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <p className="text-text-secondary">{error}</p>
            <button onClick={retry} className="px-6 py-2 rounded-full bg-accent-red text-white text-sm font-medium active:scale-95 transition-transform duration-100">
              Retry
            </button>
          </div>
        ) : (
          <>
            <MovieGrid movies={movies} loading={moviesLoading} error={null} />
            
            {!moviesLoading && hasMore && (
              <div className="flex justify-center mt-12">
                <button 
                  onClick={loadMore}
                  className="px-8 py-3 rounded-full glass-panel text-white font-medium hover:bg-white/10 transition-colors active:scale-95 transition-transform duration-100"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PageTransition>
  );
}
