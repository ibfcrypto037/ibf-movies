'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { cn } from "@/lib/utils";
import { useAdminTimeout } from "@/hooks/useAdminTimeout";
import { Toast } from "@/components/ui/Toast";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <AdminLayoutInner>
      {children}
    </AdminLayoutInner>
  );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { warningMessage, setWarningMessage } = useAdminTimeout();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (warningMessage) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [warningMessage]);

  const tabs = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Movies', href: '/admin/movies' },
    { name: 'Requests', href: '/admin/requests' },
    { name: 'Languages', href: '/admin/languages' },
    { name: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-text-primary">
      <Toast 
        message={warningMessage} 
        type="info" 
        isVisible={showWarning} 
        onClose={() => {
          setShowWarning(false);
          setWarningMessage('');
        }} 
      />
      
      {/* Top header - always visible */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 h-12 bg-black border-b border-white/10">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" width={24} height={24} alt="logo" />
          <span className="font-bold text-sm">
            <span className="text-red-600">Ibf</span>
            <span className="text-white">Movies Admin</span>
          </span>
          <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold ml-1">LIVE</span>
        </div>
        <LogoutButton />
      </header>

      {/* Tab navigation - always visible below header */}
      <nav className="sticky top-12 z-40 bg-[#111111] border-b border-white/10 overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link 
                key={tab.name} 
                href={tab.href}
                className={cn(
                  "px-5 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2",
                  isActive 
                    ? 'text-red-500 border-red-500' 
                    : 'text-gray-400 border-transparent hover:text-gray-200'
                )}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Page content */}
      <main className="p-4">
        {children}
      </main>

    </div>
  );
}
