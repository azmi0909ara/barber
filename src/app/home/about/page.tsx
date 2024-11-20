export default function About() {
  return (
    <div className="bg-black text-white">
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/barber.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70">
          {/* Main Content */}
          <section className="text-center py-24">
            <h1 className="text-4xl font-bold">About US</h1>
          </section>

          {/* About Section */}
          <section className="py-16 px-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative">
                {/* Placeholder for image */}
                <div className="w-full h-80 bg-yellow-600 rounded-lg"></div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-xl font-semibold text-yellow-600">
                  ABOUT OUR COMPANY
                </h2>
                <h1 className="text-3xl md:text-4xl font-bold">Cukurin Dong</h1>
                <p className="text-gray-300">
                  Ini adalah website barbershop dimana customer dapat menerima
                  service pemotongan rambut sesuai pesanan customer yang kami
                  cintai
                </p>
                <p className="text-gray-300">
                  Terima kasih dan semoga kalian semua nyaman dengan pelayanan
                  dari kami semua. Saranghe.
                </p>
                <div className="pt-4">
                  <p className="font-bold">Kelompok 5</p>
                  <span className="italic">Sang pencipta</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}