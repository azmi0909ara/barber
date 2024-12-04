"use client";

import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";

interface Reservation {
  id: string;
  name: string;
  date: string;
  time: string;
  services: string | string[];
  totalPrice: string;
  status?: string;
}

const AdminMember: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsCollection = collection(db, "reservations");
        const snapshot = await getDocs(reservationsCollection);
        const reservationsList: Reservation[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Reservation, "id">),
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

  const formatServices = (services: string | string[]) => {
    if (Array.isArray(services)) {
      return services.join(", ");
    }
    return services;
  };

  const handleCancel = async (id: string) => {
    try {
      await deleteDoc(doc(db, "reservations", id));
      setReservations((prev) => prev.filter((reservation) => reservation.id !== id));
      alert("Reservation cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling reservation: ", error);
    }
  };

  const handlePaymentSuccess = async (id: string) => {
    try {
      const reservationRef = doc(db, "reservations", id);
      await updateDoc(reservationRef, { status: "Paid" });
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === id ? { ...reservation, status: "Paid" } : reservation
        )
      );
      alert("Payment marked as successful.");
    } catch (error) {
      console.error("Error updating reservation status: ", error);
    }
  };

  const handlePrint = (reservation: Reservation) => {
    const printWindow = window.open("", "", "height=600,width=800");
    if (printWindow) {
      printWindow.document.write(`
        <html>
        <head>
          <title>Print Reservation</title>
          <style>
            body {
              font-family: 'Courier New', Courier, monospace;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .print-container {
              width: 100%;
              max-width: 400px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #000;
              background-color: #ffffff;
            }
            .logo {
              text-align: center;
              margin-bottom: 20px;
            }
            .logo img {
              max-width: 150px;
            }
            .header {
              text-align: center;
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .details {
              margin: 10px 0;
              font-size: 14px;
            }
            .details p {
              margin: 5px 0;
            }
            .details .label {
              font-weight: bold;
            }
            .line {
              border-top: 1px dashed #000;
              margin: 10px 0;
            }
            .total {
              font-size: 16px;
              font-weight: bold;
              margin-top: 15px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              margin-top: 20px;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <div class="logo">
              <img src="/images/logo.png" alt="Logo" />
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
              <p>We look forward to serving you again!</p>
            </div>
          </div>
          <script type="text/javascript">
            window.print();
            window.close();
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleClear = async (id: string) => {
    try {
      // Fetch the reservation data first
      const reservationRef = doc(db, "reservations", id);
      const reservationSnapshot = await getDoc(reservationRef);
      const reservationData = reservationSnapshot.data();
  
      if (reservationData) {
        // Add to history collection
        await setDoc(doc(db, "history", id), {
          ...reservationData,
          clearedAt: new Date().toISOString(),
        });
  
        // Delete from reservations collection
        await deleteDoc(reservationRef);
        setReservations((prev) => prev.filter((reservation) => reservation.id !== id));
        alert("Reservation cleared successfully.");
      }
    } catch (error) {
      console.error("Error clearing reservation: ", error);
    }
  };
  

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#1a1310] overflow-hidden">
        <img
          src="/images/barber.jpg"
          alt="Barber cutting hair"
          className="w-full h-full object-cover"
        />
      </div>

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
                  <th className="px-5 py-2">Status</th>
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
                    <td className="px-5 py-2">{reservation.status || "Pending"}</td>
                    <td className="px-5 py-2">
                      {reservation.status === "Paid" ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handlePrint(reservation)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                          >
                            <img src="/images/print.png" alt="Print" className="w-6 h-6" />
                          </button>
                          <button
                            onClick={() => handleClear(reservation.id)}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                          >
                            <img src="/images/clear.png" alt="Clear" className="w-6 h-6" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handlePaymentSuccess(reservation.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => handleCancel(reservation.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
