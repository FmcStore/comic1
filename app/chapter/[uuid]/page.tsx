"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { API_CONFIG } from '@/lib/constants';
import { useStore } from '@/store/useStore';
import { Loader2, ChevronLeft, ChevronRight, Home } from 'lucide-react';

export default function ChapterReader() {
  const { uuid } = useParams();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [nav, setNav] = useState({ prev: '', next: '' });
  const [loading, setLoading] = useState(true);
  const [showUI, setShowUI] = useState(true);
  const { addToHistory } = useStore();

  useEffect(() => {
    const init = async () => {
      if(!uuid) return;
      setLoading(true);
      try {
        const map = await axios.get(`/api/mapping?uuid=${uuid}`);
        const realSlug = map.data.slug;
        const res = await axios.get(API_CONFIG.proxy + encodeURIComponent(`${API_CONFIG.baseUrl}/chapter/${realSlug}`));
        const data = res.data.data || res.data.result;
        
        setImages(data.images || []);
        setNav(data.navigation || {});
        
        addToHistory({
          uuid: uuid as string,
          slug: realSlug,
          title: data.title,
          image: data.images?.[0] || '',
          updatedAt: Date.now()
        });
      } catch (e) { console.error(e); } 
      finally { setLoading(false); }
    };
    init();
  }, [uuid]);

  const handleNav = async (targetSlug: string) => {
    if(!targetSlug) return;
    setLoading(true);
    const res = await axios.post('/api/mapping', { slug: targetSlug, type: 'chapter' });
    router.push(`/chapter/${res.data.uuid}`);
  };

  if (loading) return <div className="h-screen bg-black flex flex-col items-center justify-center gap-2 z-50 fixed inset-0"><Loader2 className="animate-spin text-amber-500"/><span className="text-amber-500 text-xs">Memuat Gambar...</span></div>;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      {/* Top Header */}
      <div className={`fixed top-0 w-full p-4 bg-gradient-to-b from-black to-transparent z-50 flex justify-between transition-transform ${showUI ? '' : '-translate-y-full'}`}>
        <button onClick={() => router.back()} className="p-2 bg-white/20 rounded-full text-white"><ChevronLeft size={20}/></button>
        <button onClick={() => router.push('/')} className="p-2 bg-white/20 rounded-full text-white"><Home size={20}/></button>
      </div>

      {/* Images */}
      <div className="w-full max-w-3xl pb-24" onClick={() => setShowUI(!showUI)}>
        {images.map((img, idx) => (
          <img key={idx} src={img} loading="lazy" className="w-full mb-0.5" alt={`page-${idx}`} />
        ))}
      </div>

      {/* Bottom Nav */}
      <div className={`fixed bottom-6 flex gap-4 glass px-6 py-3 rounded-full z-50 transition-transform ${showUI ? '' : 'translate-y-24'}`}>
        <button disabled={!nav.prev} onClick={() => handleNav(nav.prev)} className="p-2 bg-white/10 rounded-full disabled:opacity-20"><ChevronLeft/></button>
        <span className="text-amber-500 font-bold text-xs flex items-center">MENU</span>
        <button disabled={!nav.next} onClick={() => handleNav(nav.next)} className="p-2 bg-amber-500 text-black rounded-full disabled:opacity-20"><ChevronRight/></button>
      </div>
    </div>
  );
}
