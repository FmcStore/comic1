"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ComicCard({ title, image, slug, type, chapter }: any) {
  const router = useRouter();
  const handleClick = async () => {
    try {
      const res = await axios.post('/api/mapping', { slug, type: 'series' });
      router.push(`/series/${res.data.uuid}`);
    } catch (e) { console.error(e); }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer bg-dark-800 rounded-xl overflow-hidden border border-white/5 hover:border-amber-500 transition relative">
      <div className="aspect-[3/4] relative w-full">
        <Image src={image} alt={title} fill className="object-cover" unoptimized />
        {type && <span className="absolute top-2 left-2 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded">{type}</span>}
      </div>
      <div className="p-3">
        <h3 className="text-xs font-bold text-white line-clamp-2">{title}</h3>
        <p className="text-[10px] text-gray-400 mt-1">{chapter}</p>
      </div>
    </div>
  );
}
