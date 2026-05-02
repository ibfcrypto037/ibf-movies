'use client';

import { Language } from '@/types';
import { cn } from '@/lib/utils';

interface LanguageFilterProps {
  languages: Language[];
  activeLanguage: string;
  onSelect: (lang: string) => void;
}

export function LanguageFilter({ languages, activeLanguage, onSelect }: LanguageFilterProps) {
  const allLangs = [{ id: 'all', name: 'All' }, ...languages];

  return (
    <div className="flex overflow-x-auto gap-3 pb-4 mb-8 no-scrollbar md:justify-center">
      {allLangs.map((lang) => {
        const isActive = activeLanguage === lang.name;
        return (
          <button 
            key={lang.id}
            onClick={() => onSelect(lang.name)}
            className={cn(
              "px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all",
              isActive 
                ? "bg-gradient-to-r from-accent-red to-accent-red text-white shadow-[0_0_15px_rgba(229,9,20,0.3)]" 
                : "glass-panel text-text-secondary hover:text-white"
            )}
          >
            {lang.name}
          </button>
        );
      })}
    </div>
  );
}
