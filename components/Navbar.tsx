"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bookmark, History } from 'lucide-react';

export default function Navbar() {
  const path = usePathname();
  if (path.includes('/chapter/')) return null;

  return (
    <>
      <nav className="fixed top-0 w-full z-40 glass border-b border-white/5 h-16 flex items-center px-4 justify-between">
        <Link href="/" className="font-bold text-xl text-white">Fmc<span className="text-amber-500">Comic</span></Link>
        <div className="flex gap-4">
          <Link href="/bookmarks"><Bookmark size={22} /></Link>
          <Link href="/history"><History size={22} /></Link>
        </div>
      </nav>
      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 w-full glass z-40 border-t border-white/5 flex justify-around py-3 md:hidden">
        <NavItem href="/" icon={<Home size={20}/>} label="Home" active={path === '/'} />
        <NavItem href="/bookmarks" icon={<Bookmark size={20}/>} label="Saved" active={path === '/bookmarks'} />
        <NavItem href="/history" icon={<History size={20}/>} label="History" active={path === '/history'} />
      </div>
    </>
  );
}
const NavItem = ({ href, icon, label, active }: any) => (
  <Link href={href} className={`flex flex-col items-center gap-1 ${active ? 'text-amber-500' : 'text-gray-400'}`}>
    {icon} <span className="text-[10px]">{label}</span>
  </Link>
);
