"use client";

import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

interface Reservation {
  id: string;
  name: string;
  date: string;
  time: string;
  services: string | string[];
  totalPrice: string;
  status?: string;
  clearedAt?: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyCollection = collection(db, "history");
        const snapshot = await getDocs(historyCollection);
        const historyList: Reservation[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Reservation, "id">),
        }));
        setHistory(historyList);
      } catch (error) {
        console.error("Error fetching history: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatServices = (services: string | string[]) => {
    if (Array.isArray(services)) {
      return services.join(", ");
    }
    return services;
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
        <h1 className="text-4xl font-bold text-white mb-6 text-center">History</h1>

        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : history.length === 0 ? (
          <p className="text-white text-center">No history found.</p>
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
                  <th className="px-5 py-2">Cleared At</th>
                </tr>
              </thead>
              <tbody>
                {history.map((reservation) => (
                  <tr key={reservation.id} className="bg-white p-4 text-black">
                    <td className="px-5 py-2">{reservation.name}</td>
                    <td className="px-5 py-2">{reservation.date}</td>
                    <td className="px-5 py-2">{reservation.time}</td>
                    <td className="px-5 py-2">{formatServices(reservation.services)}</td>
                    <td className="px-5 py-2">{reservation.totalPrice}</td>
                    <td className="px-5 py-2">{reservation.clearedAt}</td>
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

export default History;
