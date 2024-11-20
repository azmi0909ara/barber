export default function Home() {
    return (
      <div className="relative min-h-screen">
        {/* Dark wooden background */}
        <div className="absolute inset-0 bg-[#1a1310] overflow-hidden">
        <img
              src="/images/barber.jpg"
              alt="Barber cutting hair"
              className="w-full h-screen object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-between"></div>
  
        {/* Content */}
        <div className="relative min-h-screen flex flex-col justify-between">
          <div className="flex flex-col px-10 pt-48">
            <span className="text-yellow-600 text-lg mb-4">WITH KELOMPOK 5 PBW</span>
            <h1 className="text-7xl font-bold text-white tracking-wider">
              CUKURIN DONG BANG
            </h1>
          </div>
        </div>
      </div>
    );
  }
  