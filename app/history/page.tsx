"use client";

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import ComicCard from '@/components/ComicCard';
import { History, Clock } from 'lucide-react';

export default function HistoryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { history } = useStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="container mx-auto px-4 py-24 min-h-screen">
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <History className="text-amber-500 w-6 h-6" />
        <h1 className="text-2xl font-bold">Riwayat Baca</h1>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-4">
          <Clock className="w-16 h-16 opacity-20" />
          <p>Belum ada riwayat membaca.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {history.map((item, idx) => (
            <div key={`${item.slug}-${idx}`} className="relative group">
              {/* Overlay indikator 'Terakhir Dibaca' */}
              <div className="absolute top-2 right-2 z-10 bg-black/80 text-amber-500 text-[10px] px-2 py-1 rounded border border-amber-500/20 backdrop-blur-sm">
                {new Date(item.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
              </div>
              
              <ComicCard 
                {...item}
                // Override prop 'chapter' untuk menampilkan chapter terakhir yang dibaca
                chapter={item.lastChapterTitle || 'Belum dibaca'}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
                                                                       }
