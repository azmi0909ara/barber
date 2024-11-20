import { ReactNode } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import '@/styles/globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-[#1a1310]">
        <div className="relative min-h-screen">
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}