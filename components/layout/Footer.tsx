import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full py-8 text-center text-text-muted text-sm mt-12 border-t border-white/5 flex flex-col items-center gap-4">
      <p>© {new Date().getFullYear()} IbfMovies. All rights reserved.</p>
      <Link href="/admin" className="text-[10px] text-gray-800 hover:text-gray-600 transition-colors">
        Admin
      </Link>
    </footer>
  );
}
