"use client"; // Menandakan komponen ini dijalankan di sisi klien

import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link dari Next.js
import { db } from "../../../firebase"; // Mengimpor konfigurasi Firebase dari file firebase.ts
import { collection, getDocs } from "firebase/firestore"; // Import fungsi untuk mengambil data dari Firestore

interface User {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
}

const AdminMember: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ambil data dari koleksi 'users' Firestore
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        const usersList: User[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<User, "id">), // Mengambil data pengguna, dan menambahkan ID dokumen
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className=" p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">Member List</h1>

          {loading ? (
            <p className="text-black text-center">Loading...</p>
          ) : users.length === 0 ? (
            <p className="text-black text-center">No members found.</p>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="bg-yellow-600 text-black">
                    <th className="px-5 py-2">Name</th>
                    <th className="px-5 py-2">Email</th>
                    <th className="px-5 py-2">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="bg-white text-black">
                      <td className="px-5 py-2">{user.displayName}</td>
                      <td className="px-5 py-2">{user.email}</td>
                      <td className="px-5 py-2">{user.phoneNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Button to Admin Page */}
          <div className="flex justify-end mt-6">
            <Link href="/admin">
              <button className="bg-yellow-600 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-500 transition">
                Back to Admin Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMember;
