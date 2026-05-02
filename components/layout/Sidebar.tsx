'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Film, MessageSquare, Globe, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Movies', href: '/admin/movies', icon: Film },
    { name: 'Requests', href: '/admin/requests', icon: MessageSquare },
    { name: 'Languages', href: '/admin/languages', icon: Globe },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 glass-panel h-screen sticky top-0 hidden md:flex flex-col border-r border-white/10 bg-black/40">
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <h2 className="text-xl font-bold bg-gradient-to-r from-accent-red to-accent-red bg-clip-text text-transparent">
          IbfMovies Admin
        </h2>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent-red text-white animate-pulse">
          LIVE
        </span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                isActive ? "bg-accent-red/20 text-accent-red border border-accent-red/20" : "text-text-secondary hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-accent-red/20 hover:text-accent-red transition-all font-medium text-sm w-full active:scale-95 transition-transform duration-100">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
