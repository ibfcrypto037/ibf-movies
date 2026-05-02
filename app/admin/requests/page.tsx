'use client';

import { useState, useEffect } from 'react';
import { adminGetRequests, adminFulfillRequest } from '@/lib/admin-client';
import { Badge } from '@/components/ui/Badge';
import { Download } from 'lucide-react';
import { Toast } from '@/components/ui/Toast';
import type { GroupedRequest } from '@/lib/admin-client';

export const dynamic = 'force-dynamic';

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<GroupedRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error' | 'info', isVisible: false });

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await adminGetRequests();
    if (err) setError(err);
    else setRequests(data ?? []);
    setLoading(false);
  };

  const handleFulfill = async (movie_name: string, language: string) => {
    if (!confirm('Mark as fulfilled and delete this request?')) return;
    await adminFulfillRequest(movie_name, language);
    setToast({ message: 'Request fulfilled and removed', type: 'success', isVisible: true });
    fetchRequests();
  };

  const exportCSV = () => {
    if (requests.length === 0) return;

    const csv = requests.map(r => 
      `"${r.movie_name.replace(/"/g, '""')}","${r.language}",${r.count}`
    ).join('\n');
    
    const header = 'Movie Name,Language,Count\n';
    const blob = new Blob([header + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ibfmovies-requests.csv';
    a.click();
    
    URL.revokeObjectURL(url);
    setToast({ message: 'Requests exported successfully', type: 'success', isVisible: true });
  };

  return (
    <div>
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">User Requests</h1>
        <button
          onClick={exportCSV}
          disabled={requests.length === 0}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2 text-sm hover:bg-white/20 transition-colors active:scale-95 duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          <span>{error}</span>
          <button onClick={fetchRequests} className="text-sm underline active:scale-95 transition-transform duration-100">Retry</button>
        </div>
      )}

      {loading ? (
        <p className="text-text-secondary py-12 text-center">Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-text-secondary py-12 text-center">No pending requests.</p>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-sm font-medium text-text-secondary">
                <th className="p-4">Movie Name</th>
                <th className="p-4">Language</th>
                <th className="p-4">Requests</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, i) => (
                <tr key={i} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold">{req.movie_name}</td>
                  <td className="p-4 text-text-secondary">{req.language}</td>
                  <td className="p-4"><Badge variant="warning">{req.count}</Badge></td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleFulfill(req.movie_name, req.language)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors active:scale-95 duration-100"
                    >
                      Mark Fulfilled
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
