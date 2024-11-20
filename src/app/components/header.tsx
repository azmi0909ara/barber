import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 flex justify-between items-center px-10 py-6 z-50">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
          <span className="text-black font-bold">B</span>
        </div>
        <span className="text-3xl font-bold text-white">BRBER</span>
      </div>
      
      <nav className="space-x-8 text-lg">
        <Link href="/" className="text-yellow-600 hover:text-yellow-500">
          Home
        </Link>
        <Link href="home/about" className="text-white hover:text-yellow-600">
          About
        </Link>
        <Link href="/services" className="text-white hover:text-yellow-600">
          Services
        </Link>
      </nav>

      <div className="space-x-4">
        <button className="bg-yellow-600 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-500">
          BOOKING NOW
        </button>
        <button className="bg-yellow-600 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-500">
          OUR ORDER
        </button>
      </div>
    </header>
  );
}