'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Film, Home, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { showPopupAd } from '@/lib/monetag';

export function Navbar() {
  const pathname = usePathname();

  const router = useRouter();
  const lastAdTime = useRef<number>(0);
  const AD_COOLDOWN = 45 * 1000;

  if (pathname.startsWith('/admin')) return null;

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Movies', href: '/movies', icon: Film },
    { name: 'Request', href: '/request', icon: PlusCircle },
  ];

  function handleNavClick(tabName: string, href: string) {
    router.push(href)
    if (tabName === 'Movies' || tabName === 'Request') {
      const now = Date.now()
      if (now - lastAdTime.current > AD_COOLDOWN) {
        lastAdTime.current = now
        showPopupAd(() => {})
      }
    }
  }

  return (
    <nav className="hidden md:flex sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20 h-12">
      <div className="w-full max-w-6xl mx-auto px-4 flex items-center justify-between h-full">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="IbfMovies Logo" width={36} height={36} />
          <span className="text-lg font-bold">
            <span className="text-[#E50914]">Ibf</span><span className="text-white">Movies</span>
          </span>
        </Link>
        
        <div className="flex-1 max-w-xs mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search movies..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 h-8 text-sm focus:outline-none focus:border-accent-red/50 focus:ring-1 focus:ring-accent-red/50 transition-all text-text-primary placeholder:text-text-muted"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.name, link.href)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent-red",
                  isActive ? "text-accent-red" : "text-text-secondary"
                )}
              >
                <Icon size={16} />
                {link.name}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
