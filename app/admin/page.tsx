'use client';

import { useState, useEffect } from 'react';
import { adminGetRequests, adminGetStats } from '@/lib/admin-client';
import { Film, MessageSquare, Globe, Upload } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { GroupedRequest } from '@/lib/admin-client';

export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ movies: 0, requests: 0, languages: 0, todayUploads: 0 });
  const [recentRequests, setRecentRequests] = useState<GroupedRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStatsAndRequests = async () => {
    try {
      const [statsRes, requestsRes] = await Promise.all([
        adminGetStats(),
        adminGetRequests(),
      ]);

      if (statsRes.data) {
        setStats({
          movies: statsRes.data.totalMovies,
          requests: statsRes.data.pendingRequests,
          languages: statsRes.data.totalLanguages,
          todayUploads: statsRes.data.todayUploads,
        });
      }

      if (requestsRes.data) {
        setRecentRequests(requestsRes.data.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsAndRequests();

    const intervalId = setInterval(() => {
      fetchStatsAndRequests();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const statCards = [
    { label: 'Total Movies', value: stats.movies, icon: Film, color: 'text-accent-red', bg: 'bg-accent-red/10' },
    { label: 'Pending Requests', value: stats.requests, icon: MessageSquare, color: 'text-accent-red', bg: 'bg-accent-red/10' },
    { label: 'Total Languages', value: stats.languages, icon: Globe, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
    { label: 'Today Uploads', value: stats.todayUploads, icon: Upload, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-panel p-4 md:p-6 rounded-2xl relative overflow-hidden">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <h3 className="text-text-secondary text-sm font-medium mb-1">{stat.label}</h3>
              <div className="h-9 flex items-center">
                {loading ? <LoadingSpinner size={24} /> : <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Top Pending Requests</h2>
          <Link href="/admin/requests" className="text-sm font-medium text-accent-red hover:underline">View All</Link>
        </div>
        {loading ? (
          <p className="text-text-secondary text-sm">Loading...</p>
        ) : recentRequests.length === 0 ? (
          <p className="text-text-secondary text-sm">No pending requests.</p>
        ) : (
          <div className="space-y-4">
            {recentRequests.map((req, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <h3 className="font-bold">{req.movie_name}</h3>
                  <p className="text-sm text-text-secondary">{req.language}</p>
                </div>
                <Badge variant="warning">{req.count} requests</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}