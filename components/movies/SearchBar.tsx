'use client';

import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [localValue, onChange]);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={24} />
      <input 
        type="text" 
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search movies by title..." 
        className="w-full glass-panel rounded-full py-4 pl-12 pr-6 text-lg focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-all text-text-primary placeholder:text-text-muted shadow-lg"
      />
    </div>
  );
}
