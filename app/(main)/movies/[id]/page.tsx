'use client';

import { useEffect, useState } from 'react';
import { getMovieById } from '@/lib/api';
import { Movie } from '@/types';
import { DownloadButtons } from '@/components/movies/DownloadButtons';
import { RelatedMovies } from '@/components/movies/RelatedMovies';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';
import { PageTransition } from '@/components/layout/PageTransition';

export default function MovieDetailsPage({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    getMovieById(params.id).then(({ data, error }) => {
      if (error) setError(error.message);
      else setMovie(data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) return <LoadingSpinner size={64} className="min-h-[60vh]" />;
  if (error || !movie) return <ErrorMessage message={error || "Movie not found"} className="min-h-[60vh]" />;

  return (
    <PageTransition>
      <div className="max-w-[1200px] mx-auto px-0 md:px-6 py-0 md:py-12 flex flex-col md:flex-row gap-8 lg:gap-16">
        
        {/* Left Column / Mobile Top - Poster */}
        <div className="w-full md:w-[40%] lg:w-[35%] relative">
          <div className="md:sticky md:top-24">
            <div className="relative w-full aspect-[2/3] md:rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={movie.poster} 
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
              {/* Mobile Gradient Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent md:hidden" />
            </div>
          </div>
        </div>

        {/* Right Column / Mobile Bottom - Details */}
        <div className="w-full md:w-[60%] lg:w-[65%] px-4 md:px-0 -mt-20 md:mt-0 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tight">{movie.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary font-medium mb-6">
            <span>{movie.year}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>{movie.language}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <Badge>{movie.genre}</Badge>
          </div>

          <div className="mb-8">
            <p className={`text-text-primary/80 leading-relaxed text-lg ${!isExpanded ? 'line-clamp-3 md:line-clamp-none' : ''}`}>
              {movie.description}
            </p>
            <button  
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden text-accent-red font-medium mt-2"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          </div>

          <DownloadButtons links={movie.download_links} />
          
          <RelatedMovies currentMovie={movie} />
        </div>
      </div>
    </PageTransition>
  );
}
