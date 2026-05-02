'use client';

import React, { useState } from 'react';
import { Movie } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';

export const MovieCard = React.memo(function MovieCard({ movie, priority, index = 0 }: { movie: Movie, priority?: boolean, index?: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link href={`/movies/${movie.id}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ scale: 1.05 }}
        className="relative aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer border border-white/10 hover:border-red-600/60 transition-all duration-300 ease-out hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] bg-bg-card"
      >
        <div className={`absolute inset-0 skeleton-shimmer ${loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`} />
        <Image 
          src={movie.poster} 
          alt={movie.title}
          fill
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 h-[35%] mt-auto" />
        
        {new Date(movie.uploaded_at).getTime() > Date.now() - 86400000 * 2 && (
          <div className="absolute top-2 left-2">
            <Badge variant="error" className="bg-accent-red text-white border-none text-[10px] px-2 py-0.5">NEW</Badge>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-medium text-white truncate text-xs">{movie.title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">{movie.year}</span>
            <Badge className="text-[10px] px-1.5 py-0.5">{movie.genre}</Badge>
          </div>
        </div>
      </motion.div>
    </Link>
  );
});
