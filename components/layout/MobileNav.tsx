'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Film, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { showRewardedPopup } from '@/lib/monetag';

export function MobileNav() {
  const pathname = usePathname();

  const router = useRouter();
  const lastAdTime = useRef<number>(0);
  const AD_COOLDOWN = 45 * 1000; // 45 seconds

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Movies', href: '/movies', icon: Film },
    { name: 'Request', href: '/request', icon: PlusCircle },
  ];

  async function handleNavClick(tabName: string, href: string) {
    router.push(href);

    // Show popup ad only on Movies and Request tabs
    if (tabName === 'Movies' || tabName === 'Request') {
      const now = Date.now();
      if (now - lastAdTime.current > AD_COOLDOWN) {
        lastAdTime.current = now;
        try {
          await showRewardedPopup();
        } catch {
          // Silently fail, navigation already happened
        }
      }
    }
  }

  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-around h-14 shadow-2xl">
      {navLinks.map((link) => {
        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
        const Icon = link.icon;
        return (
          <div 
            key={link.name} 
            onClick={() => handleNavClick(link.name, link.href)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 relative cursor-pointer",
              isActive ? "text-accent-red" : "text-text-secondary"
            )}
          >
            <Icon size={18} />
            <span className="text-[10px] font-medium">{link.name}</span>
            {isActive && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-accent-red" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
