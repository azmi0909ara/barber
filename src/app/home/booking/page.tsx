"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebase"; // Import db from firebase.ts

export default function Reservation() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });
  const [services, setServices] = useState(["Grooming"]);
  const [success, setSuccess] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);

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
  }, [services]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save reservation to Firestore
      const reservationData = {
        services: services,
        date: formData.date,
        time: formData.time,
        totalPrice: totalPrice,
        createdAt: serverTimestamp(),
      };

      // Add a new document with a generated id
      const docRef = await addDoc(collection(db, "reservations"), reservationData);

      // Show success message
      setSuccess(true);

      // Navigate to home page after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error saving reservation: ", error);
      // Optionally, show an error message to the user
      alert("Gagal membuat reservasi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
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
            background: "rgba(26, 19, 16, 0.85)", 
            backdropFilter: "blur(8px)", 
            border: "1px solid rgba(255, 255, 255, 0.1)", 
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
                min={new Date().toISOString().split("T")[0]}
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
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-lg shadow-sm text-white"
              >
                <option value="" disabled hidden>
                  Pilih Waktu
                </option>
                {Array.from({ length: 27 }, (_, i) => {
                  const hour = Math.floor(i / 2) + 9;
                  const minute = (i % 2) === 0 ? "00" : "30";
                  const timeString = `${hour.toString().padStart(2, "0")}:${minute}`;
                  return (
                    <option
                      key={timeString}
                      value={timeString}
                      className="bg-black text-white"
                    >
                      {timeString}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Total Price */}
            <div className="mt-4 text-white text-lg">
              <p>Total Harga: Rp {totalPrice.toLocaleString()}</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-lg shadow-lg transition ${
                loading 
                  ? "bg-gray-500 cursor-not-allowed" 
                  : "bg-yellow-600 hover:bg-yellow-700"
              }`}
            >
              {loading ? "Memproses..." : "Buat Reservasi"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
