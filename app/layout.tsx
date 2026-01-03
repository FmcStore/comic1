import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = { title: 'FmcComic Pro', manifest: '/manifest.json', viewport: 'width=device-width, initial-scale=1, maximum-scale=1' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body><Navbar /><div className="min-h-screen">{children}</div></body>
    </html>
  );
}
