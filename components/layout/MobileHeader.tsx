'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MobileHeader() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) return null;

  return (
    <header className="md:hidden sticky top-0 z-50
      flex items-center justify-between
      px-4 py-3
      backdrop-blur-xl bg-black/60
      border-b border-white/10">
      <Link href="/" className="flex items-center gap-2">
        <Image 
          src="/logo.svg" 
          alt="IbfMovies" 
          width={32} 
          height={32} 
        />
        <span className="font-bold text-base">
          <span className="text-accent-red">Ibf</span>
          <span className="text-white">Movies</span>
        </span>
      </Link>
    </header>
  )
}
