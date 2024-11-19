import Link from 'next/link';

export default function Home() {
  return (
      <div className="relative">
          {/* Background Image */}
          <img
              src="/images/barber.jpg"
              alt="Barber cutting hair"
              className="w-full h-screen object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-between">
              {/* Header */}
              <header className="flex justify-between items-center px-10 py-6">
                  <div className="flex items-center space-x-3">
                      {/* Logo */}
                      <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                          <i className="fas fa-cut text-black text-2xl"></i>
                      </div>
                      <span className="text-3xl font-bold text-white">BRBER</span>
                  </div>
                  <nav className="space-x-6 text-lg">
  <Link href="/" className="text-yellow-600 hover:underline">
    Home
  </Link>
  <Link href="/home/about" className="text-white hover:underline">
    About
  </Link>
  <Link href="#" className="text-white hover:underline">
    Services
  </Link>
  <Link href="#" className="text-white hover:underline">
    Portfolio
  </Link>
  <Link href="#" className="text-white hover:underline">
    Contact
  </Link>
</nav>

                  <div className="space-x-4">
                      <button className="bg-yellow-600 text-black px-5 py-2 font-semibold rounded-md shadow hover:bg-yellow-500">
                          BOOKING NOW
                      </button>
                      <button className="bg-yellow-600 text-black px-5 py-2 font-semibold rounded-md shadow hover:bg-yellow-500">
                          OUR ORDER
                      </button>
                  </div>
              </header>

              {/* Main Content */}
              <main className="flex flex-col items-start px-10 space-y-4 mt-32">
                  <span className="text-yellow-600 text-lg">WITH KELOMPOK 5 PBW</span>
                  <h1 className="text-6xl font-extrabold text-white leading-tight">
                      CUKURIN DONG BANG
                  </h1>
                  <h2 className="text-8xl font-bold text-black opacity-10 leading-none">
                      GET MORE CONFIDENT
                  </h2>
              </main>

              {/* Footer */}
              <footer className="flex justify-between items-center px-10 py-6 bg-yellow-600 text-black">
                  <span className="text-lg font-semibold">MAKE AN APPOINTMENT NOW</span>
                  <i className="fas fa-arrow-right text-2xl"></i>
              </footer>
          </div>
      </div>
  );
}
