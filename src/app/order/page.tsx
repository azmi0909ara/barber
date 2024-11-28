// pages/admin/member.tsx
"use client";  // Menandakan komponen ini dijalankan di sisi klien

import { useEffect, useState } from "react";
import { db } from "../../../firebase"; // Mengimpor konfigurasi Firebase dari file firebase.ts
import { collection, getDocs } from "firebase/firestore"; // Import fungsi untuk mengambil data dari Firestore

interface Reservation {
  id: string;
  name: string;
  date: string;
  time: string;
  services: string | string[]; // Bisa berupa string atau array
  totalPrice: string;
}

const AdminMember: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ambil data dari koleksi 'reservations' Firestore
    const fetchReservations = async () => {
      try {
        const reservationsCollection = collection(db, "reservations");
        const snapshot = await getDocs(reservationsCollection);
        const reservationsList: Reservation[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Reservation, "id">), // Mengambil data reservasi, dan menambahkan ID dokumen
        }));
        setReservations(reservationsList);
      } catch (error) {
        console.error("Error fetching reservations: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Fungsi untuk memformat kolom services agar terpisah dengan koma
  const formatServices = (services: string | string[]) => {
    if (Array.isArray(services)) {
      return services.join(", "); // Gabungkan dengan koma jika dalam bentuk array
    }
    return services; // Jika dalam bentuk string, tidak perlu perubahan
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[#1a1310] overflow-hidden">
        <img
          src="/images/barber.jpg"
          alt="Barber cutting hair"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <h1 className="text-4xl font-bold text-white mb-6">Reservation List</h1>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : reservations.length === 0 ? (
          <p className="text-white">No reservations found.</p>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-yellow-600 text-black">
                  <th className="px-4 py-2">Customer Name</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Service</th>
                  <th className="px-4 py-2">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="bg-white p-4 text-black">
                    <td className="px-4 py-2">{reservation.name}</td>
                    <td className="px-4 py-2">{reservation.date}</td>
                    <td className="px-4 py-2">{reservation.time}</td>
                    <td className="px-4 py-2">{formatServices(reservation.services)}</td>
                    <td className="px-4 py-2">{reservation.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMember;
