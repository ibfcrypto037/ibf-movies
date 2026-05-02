'use client';

import { LogOut } from "lucide-react";

export function LogoutButton() {
  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    window.location.href = "/admin/login";
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-text-secondary hover:text-white transition-colors p-2 active:scale-95 transition-transform duration-100"
      title="Logout"
    >
      <LogOut size={18} />
    </button>
  );
}
