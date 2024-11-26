"use client"; // Tambahkan ini di bagian atas file

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Untuk navigasi ke halaman Home

export default function Reservation() {
  const router = useRouter(); // Inisialisasi router
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });
  const [services, setServices] = useState(["Grooming"]); // Default layanan
  const [success, setSuccess] = useState(false); // Untuk menampilkan pesan sukses
  const [totalPrice, setTotalPrice] = useState<number>(0); // Untuk menyimpan total harga

  // Harga per layanan
  const servicePrices: { [key: string]: number } = {
    Grooming: 75000,
    "Hair Straightening": 50000,
    "Hair Spa": 50000,
    Waxing: 35000,
    "Hot Towel Service": 20000,
    "Hair Coloring": 125000,
  };

  // Menghitung total harga berdasarkan layanan yang dipilih
  const calculateTotalPrice = () => {
    return services.reduce((total, service) => {
      return total + (servicePrices[service] || 0);
    }, 0);
  };

  // Mengupdate total harga hanya di sisi klien
  useEffect(() => {
    const calculatedPrice = calculateTotalPrice();
    setTotalPrice(calculatedPrice);
  }, [services]); // Akan dihitung ulang setiap kali layanan berubah

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addService = () => {
    setServices([...services, ""]);
  };

  const removeService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const updateService = (index: number, value: string) => {
    const updatedServices = [...services];
    updatedServices[index] = value;
    setServices(updatedServices);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(true); // Tampilkan pesan sukses

    // Navigasi ke halaman Home setelah 3 detik
    setTimeout(() => {
      setSuccess(false); // Sembunyikan pesan sukses
      router.push("/"); // Navigasi ke Home
    }, 3000);
  };

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

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center py-10">
        <div
          className="p-8 rounded-lg shadow-lg w-full max-w-md z-10"
          style={{
            background: "rgba(26, 19, 16, 0.85)", // Warna latar semi-transparan
            backdropFilter: "blur(8px)", // Efek blur
            border: "1px solid rgba(255, 255, 255, 0.1)", // Border halus
          }}
        >
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Reservasi Barbershop
          </h2>
          {success && (
            <div className="mb-4 p-4 bg-green-600 text-white text-center rounded-lg">
              Reservasi Telah Dibuat! Anda akan diarahkan ke Home...
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-lg shadow-sm text-white"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300"
              >
                Nomor Telepon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-lg shadow-sm text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-lg shadow-sm text-white"
              />
            </div>

            {/* Services */}
            <div>
              <label
                htmlFor="services"
                className="block text-sm font-medium text-gray-300"
              >
                Pilih Layanan
              </label>
              {services.map((service, index) => (
                <div key={index} className="flex space-x-2 mt-2">
                  <select
                    value={service}
                    onChange={(e) => updateService(index, e.target.value)}
                    required
                    className="block w-full p-2 bg-black border border-gray-600 rounded-lg shadow-sm text-white"
                  >
                    <option value="" disabled hidden>
                      Pilih Layanan
                    </option>
                    <option value="Grooming">Grooming</option>
                    <option value="Hair Straightening">Hair Straightening</option>
                    <option value="Hair Spa">Hair Spa</option>
                    <option value="Waxing">Waxing</option>
                    <option value="Hot Towel Service">Hot Towel Service</option>
                    <option value="Hair Coloring">Hair Coloring</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="bg-red-600 text-white px-3 rounded-lg hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addService}
                className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
              >
                Tambah Layanan
              </button>
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-300"
              >
                Tanggal Reservasi
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-lg shadow-sm text-white"
              />
            </div>

            {/* Time */}
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-300"
              >
                Waktu Reservasi
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-lg shadow-sm text-white"
              />
            </div>

            {/* Total Price */}
            <div className="mt-4 text-white text-lg">
              <p>Total Harga: Rp {totalPrice.toLocaleString()}</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 rounded-lg shadow-lg hover:bg-yellow-700 transition"
            >
              Buat Reservasi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
