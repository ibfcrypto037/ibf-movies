'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAdminTimeout() {
  const router = useRouter();
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let warningId: NodeJS.Timeout;

    const resetTimer = () => {
      localStorage.setItem('adminLastActivity', Date.now().toString());
      setWarningMessage('');
      
      clearTimeout(timeoutId);
      clearTimeout(warningId);

      // Warning at 55 minutes
      warningId = setTimeout(() => {
        setWarningMessage('Session expiring in 5 minutes');
      }, 55 * 60 * 1000);

      // Timeout at 60 minutes
      timeoutId = setTimeout(() => {
        document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        localStorage.removeItem('adminLastActivity');
        router.push('/admin/login?expired=true');
      }, 60 * 60 * 1000);
    };

    // Initialize
    const lastActivity = localStorage.getItem('adminLastActivity');
    if (lastActivity) {
      const timeSinceLastActivity = Date.now() - parseInt(lastActivity, 10);
      if (timeSinceLastActivity > 60 * 60 * 1000) {
        document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        localStorage.removeItem('adminLastActivity');
        router.push('/admin/login?expired=true');
        return;
      }
    }

    resetTimer();

    // Listeners
    const events = ['mousemove', 'mousedown', 'click', 'scroll', 'keypress', 'keydown'];
    const handleEvent = () => resetTimer();

    events.forEach(event => {
      window.addEventListener(event, handleEvent);
    });

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(warningId);
      events.forEach(event => {
        window.removeEventListener(event, handleEvent);
      });
    };
  }, [router]);

  return { warningMessage, setWarningMessage };
}