"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { API_CONFIG } from '@/lib/constants';
import { Loader2, Play, Bookmark, Check } from 'lucide-react';

export default function SeriesDetail() {
  const { uuid } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const { toggleBookmark, isBookmarked, addToHistory } = useStore();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const map = await axios.get(`/api/mapping?uuid=${uuid}`);
        const slug = map.data.slug;
        const res = await axios.get(API_CONFIG.proxy + encodeURIComponent(`${API_CONFIG.baseUrl}/detail/${slug}`));
        const result = res.data.data;
        setData(result);
        setSaved(isBookmarked(slug));
        addToHistory({ uuid: uuid as string, slug, title: result.title, image: result.image, updatedAt: Date.now() });
      } catch (e) { console.error(e); }
    };
    if (uuid) init();
  }, [uuid]);

  const handleRead = async (chSlug: string) => {
    const res = await axios.post('/api/mapping', { slug: chSlug, type: 'chapter' });
    router.push(`/chapter/${res.data.uuid}`);
  };

  const handleSave = () => {
    if(!data) return;
    toggleBookmark({ uuid: uuid as string, slug: data.slug || 'temp', title: data.title, image: data.image, updatedAt: Date.now() });
    setSaved(!saved);
  };

  if (!data) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-amber-500"/></div>;

  return (
    <div className="pb-24">
      <div className="relative h-[40vh] w-full">
        <Image src={data.image} alt="bg" fill className="object-cover opacity-20 blur-sm" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute -bottom-10 left-4 flex gap-4 items-end">
          <Image src={data.image} alt="cover" width={110} height={160} className="rounded-lg shadow-xl border-2 border-amber-500" unoptimized />
          <div className="mb-10">
            <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded font-bold">{data.type}</span>
            <h1 className="text-xl font-bold mt-1 line-clamp-2">{data.title}</h1>
            <p className="text-xs text-gray-400">⭐ {data.rating}</p>
          </div>
        </div>
      </div>
      <div className="container px-4 mt-14">
        <div className="flex gap-2 mb-6">
          <button onClick={() => handleRead(data.chapters[data.chapters.length - 1].slug)} className="flex-1 bg-amber-500 text-black py-3 rounded-lg font-bold flex justify-center items-center gap-2"><Play size={18}/> Baca</button>
          <button onClick={handleSave} className={`flex-1 border border-white/10 py-3 rounded-lg font-bold flex justify-center items-center gap-2 ${saved ? 'text-amber-500 border-amber-500' : ''}`}>{saved ? <Check size={18}/> : <Bookmark size={18}/>}</button>
        </div>
        <p className="text-sm text-gray-300 text-justify mb-6">{data.synopsis}</p>
        <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto custom-scroll">
          {data.chapters.map((ch: any, idx: number) => (
            <div key={idx} onClick={() => handleRead(ch.slug)} className="p-3 bg-white/5 rounded hover:bg-amber-500 hover:text-black cursor-pointer text-sm flex justify-between">
              <span>{ch.title}</span><span className="text-[10px] opacity-60">{ch.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
