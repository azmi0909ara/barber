"use client";  // Menandakan komponen ini dijalankan di sisi klien

import { useEffect, useState } from "react";
import { db } from "../../../firebase"; // Mengimpor konfigurasi Firebase dari file firebase.ts
import { collection, getDocs } from "firebase/firestore"; // Import fungsi untuk mengambil data dari Firestore
import Link from "next/link";  // Import Link untuk navigasi ke halaman admin

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

  // Fungsi untuk menangani pencetakan per order
  const handlePrint = (reservation: Reservation) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      // Membuat konten HTML untuk print
      printWindow.document.write('<html><head><title>Print Reservation</title>');
      printWindow.document.write('<style>');
      printWindow.document.write(`
        body { font-family: 'Courier New', Courier, monospace; margin: 0; padding: 0; }
        .print-container { width: 100%; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #000; background-color: #f4f4f4; }
        .header { text-align: center; font-size: 16px; font-weight: bold; margin-bottom: 20px; }
        .details { margin: 10px 0; font-size: 14px; }
        .details p { margin: 5px 0; }
        .details .label { font-weight: bold; }
        .line { border-top: 1px dashed #000; margin: 10px 0; }
        .total { font-size: 16px; font-weight: bold; margin-top: 15px; }
        .footer { text-align: center; font-size: 12px; margin-top: 20px; color: #777; }
        .logo { text-align: center; margin-bottom: 20px; }
      `);
      printWindow.document.write('</style>');
      printWindow.document.write('</head><body>');
  
      // Menambahkan logo (optional, bisa disesuaikan dengan logo perusahaan/brand)
      printWindow.document.write(`
        <div class="print-container">
          <div class="logo">
            <img src="/path/to/your/logo.png" alt="Logo" style="max-width: 150px;" />
          </div>
          <div class="header">Reservation Receipt</div>
          <div class="details">
            <p><span class="label">Customer Name:</span> ${reservation.name}</p>
            <p><span class="label">Date:</span> ${reservation.date}</p>
            <p><span class="label">Time:</span> ${reservation.time}</p>
            <p><span class="label">Services:</span> ${formatServices(reservation.services)}</p>
          </div>
          <div class="line"></div>
          <div class="total">
            <p><span class="label">Total Price:</span> ${reservation.totalPrice}</p>
          </div>
          <div class="footer">
            <p>Thank you for your reservation!</p>
            <p>Visit us again!</p>
          </div>
        </div>
      `);
  
      // Setelah konten selesai, memulai pencetakan
      printWindow.document.write('<script type="text/javascript">window.print(); window.close();</script>');
      printWindow.document.close(); // Menutup dokumen untuk memulai print
    }
  };
  

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[#1a1310] overflow-hidden">
        <img
          src="/images/barber.jpg"
          alt="Barber cutting hair"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">Reservation List</h1>

        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : reservations.length === 0 ? (
          <p className="text-white text-center">No reservations found.</p>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-yellow-600 text-black">
                  <th className="px-5 py-2">Customer Name</th>
                  <th className="px-5 py-2">Date</th>
                  <th className="px-5 py-2">Time</th>
                  <th className="px-5 py-2">Service</th>
                  <th className="px-5 py-2">Total Price</th>
                  <th className="px-5 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="bg-white p-4 text-black">
                    <td className="px-5 py-2">{reservation.name}</td>
                    <td className="px-5 py-2">{reservation.date}</td>
                    <td className="px-5 py-2">{reservation.time}</td>
                    <td className="px-5 py-2">{formatServices(reservation.services)}</td>
                    <td className="px-5 py-2">{reservation.totalPrice}</td>
                    <td className="px-5 py-2">
                      <button
                        onClick={() => handlePrint(reservation)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Button to Admin Page */}
        <div className="flex justify-end mt-6">
          <Link href="/adminIsi">
            <button className="bg-yellow-600 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-500 transition">
              Back to Admin Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminMember;
