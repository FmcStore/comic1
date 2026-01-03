"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ComicCard from '@/components/ComicCard';
import { API_CONFIG } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_CONFIG.proxy + encodeURIComponent(`${API_CONFIG.baseUrl}/home`))
      .then(res => setData(res.data.data || res.data.result))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-amber-500"/></div>;

  return (
    <main className="container mx-auto px-4 pb-24 pt-20">
      <h2 className="text-xl font-bold mb-4 border-l-4 border-amber-500 pl-3">Populer</h2>
      <div className="flex gap-4 overflow-x-auto pb-6 hide-scroll">
        {data?.hotUpdates?.map((item: any, idx: number) => (
          <div key={idx} className="min-w-[150px]"><ComicCard {...item} /></div>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-4 border-l-4 border-amber-500 pl-3 mt-4">Terbaru</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {data?.latestReleases?.map((item: any, idx: number) => (
          <ComicCard key={idx} {...item} chapter={item.chapters?.[0]?.title} />
        ))}
      </div>
    </main>
  );
}
