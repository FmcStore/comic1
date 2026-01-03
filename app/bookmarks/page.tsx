"use client";

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import ComicCard from '@/components/ComicCard';
import { Bookmark, Ghost } from 'lucide-react';

export default function BookmarksPage() {
  // Hydration fix: Zustand persist butuh ini biar ga error antara server/client
  const [isMounted, setIsMounted] = useState(false);
  const { bookmarks } = useStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Atau return loading skeleton
  }

  return (
    <main className="container mx-auto px-4 py-24 min-h-screen">
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <Bookmark className="text-amber-500 w-6 h-6" />
        <h1 className="text-2xl font-bold">Koleksi Tersimpan</h1>
        <span className="ml-auto bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-gray-400">
          {bookmarks.length} Item
        </span>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-4">
          <Ghost className="w-16 h-16 opacity-20" />
          <p>Belum ada komik yang disimpan.</p>
          <p className="text-xs">Cari komik dan tekan tombol bookmark!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {bookmarks.map((item, idx) => (
            <ComicCard 
              key={`${item.slug}-${idx}`} 
              {...item} 
              // Tampilkan info kapan terakhir disimpan/dibaca jika ada datanya
              chapter={item.lastChapterTitle ? `Lanjut: ${item.lastChapterTitle}` : 'Tersimpan'}
            />
          ))}
        </div>
      )}
    </main>
  );
}
