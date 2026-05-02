import { Film, MessageSquare, Globe, Upload } from 'lucide-react';
import Link from 'next/link';

export function StatsCards() {
  const stats = [
    { label: 'Total Movies', value: '4,289', icon: Film, color: 'text-accent-red', bg: 'bg-accent-red/10' },
    { label: 'Pending Requests', value: '142', icon: MessageSquare, color: 'text-accent-red', bg: 'bg-accent-red/10' },
    { label: 'Languages', value: '12', icon: Globe, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
    { label: 'Today Uploads', value: '24', icon: Upload, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="glass-panel p-4 md:p-6 rounded-2xl">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
              <Icon size={24} />
            </div>
            <h3 className="text-text-secondary text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
