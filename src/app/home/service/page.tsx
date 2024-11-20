export default function Services() {
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
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Our Best Services Section */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-yellow-500 mb-8">
            OUR BEST SERVICES THAT WE OFFERING TO YOU
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Grooming Packages",
                icon: "/images/ikon.png",
                description: " barbershop menyediakan paket lengkap yang mencakup potong rambut, cukur jenggot, perawatan kulit kepala, dan styling rambut untuk memberikan pengalaman perawatan menyeluruh",
              },
              {
                title: "Hair Straightening",
                icon: "/images/ikon.png",
                description: "layanan untuk meluruskan atau mengeriting rambut sesuai kebutuhan pelanggan, biasanya menggunakan bahan kimia atau alat khusus..",
              },
              {
                title: "Hair Spa",
                icon: "/images/ikon.png",
                description: "Layanan ini mencakup perawatan rambut intensif menggunakan masker rambut dan produk khusus untuk memperbaiki kerusakan, menjaga kelembapan, dan meningkatkan kesehatan rambut..",
              },
              {
                title: " Waxing",
                icon: "/images/ikon.png",
                description: "menghilangkan rambut pada bagian wajah atau tubuh tertentu untuk pria yang menginginkan tampilan lebih rapi..",
              },
              {
                title: "Hot Towel Service",
                icon: "/images/ikon.png",
                description: "Layanan handuk panas sering ditawarkan sebelum atau setelah cukur untuk membuka pori-pori, melembutkan rambut, dan memberikan pengalaman yang lebih santai..",
              },
              {
                title: "Hair Coloring",
                icon: "/images/ikon.png",
                description: "Layanan pewarnaan rambut, baik untuk menutupi uban atau mengikuti tren gaya. Pewarnaan bisa berupa highlight, bleaching, atau warna penuh..",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg text-center"
              >
                <div className="bg-yellow-600 p-4 rounded-full mx-auto mb-4">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-10 h-10 mx-auto"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
