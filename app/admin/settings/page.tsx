'use client';

import { useState } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl">
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-8">🔐 Security</h2>
        <div className="glass-panel p-6 md:p-8 rounded-2xl">
          <ChangePasswordForm />
        </div>
        <p className="mt-4 text-sm text-text-muted">Password is stored in database. No <code className="bg-white/5 px-1 rounded text-white">.env.local</code> changes needed.</p>
      </div>
    </div>
  );
}

function ChangePasswordForm() {
  const [fields, setFields] = useState({ current: '', newPass: '', confirm: '' });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (fields.newPass !== fields.confirm) { setStatus({ type: 'error', message: 'Passwords do not match' }); return; }
    if (fields.newPass.length < 6) { setStatus({ type: 'error', message: 'Password too short' }); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/change-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ currentPassword: fields.current, newPassword: fields.newPass }) });
      const data = await res.json();
      if (data.success) { setStatus({ type: 'success', message: 'Password updated!' }); setFields({ current: '', newPass: '', confirm: '' }); }
      else setStatus({ type: 'error', message: data.error || 'Update failed' });
    } catch { setStatus({ type: 'error', message: 'An error occurred' }); }
    setLoading(false);
  };

  const Eye = ({ on }: { on: boolean }) => on ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  );

  const pwFields = [
    { key: 'current' as const, label: 'Current Password' },
    { key: 'newPass' as const, label: 'New Password' },
    { key: 'confirm' as const, label: 'Confirm New Password' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {pwFields.map(f => (
          <div key={f.key}>
            <label className="text-sm font-medium text-text-secondary block mb-2">{f.label}</label>
            <div className="relative">
              <input type={show[f.key] ? 'text' : 'password'} value={fields[f.key]} onChange={e => setFields(p => ({...p, [f.key]: e.target.value}))}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:border-accent-red focus:ring-1" placeholder="••••••••" required />
              <button  type="button" onClick={() => setShow(p => ({...p, [f.key]: !p[f.key]}))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1">
                <Eye on={show[f.key]} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {status && <p className={cn('text-sm font-medium text-center', status.type === 'success' ? 'text-green-500' : 'text-accent-red')}>{status.message}</p>}
      <button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-accent-red text-white font-bold hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all flex justify-center items-center gap-2 active:scale-95 transition-transform duration-100">
        {loading && <LoadingSpinner size={20} />}
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  );
}
