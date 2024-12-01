"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Gunakan usePathname untuk memeriksa jalur
import Link from "next/link";
import { User as FirebaseUser, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import AuthModal from "./AuthModal";

export default function Header(): JSX.Element | null {
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const pathname = usePathname(); // Dapatkan jalur aktif

  // Menggunakan useEffect untuk memantau perubahan status autentikasi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Jalur di mana header tidak ditampilkan
  const hiddenRoutes = ["/member", "/admin", "/orderAdmin"];

  // Pastikan semua hook telah dipanggil sebelum kondisi return
  const shouldHideHeader = hiddenRoutes.includes(pathname);

  if (shouldHideHeader) {
    return null; // Tidak menampilkan header
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 flex justify-between items-center px-10 py-6 z-50">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
          <span className="text-black font-bold">B</span>
        </div>
        <span className="text-3xl font-bold text-white">BRBER</span>
      </div>

      <nav className="space-x-8 text-lg">
        <Link href="/" className="text-white hover:text-yellow-600">
          Home
        </Link>
        <Link href="/about" className="text-white hover:text-yellow-600">
          About
        </Link>
        <Link href="/service" className="text-white hover:text-yellow-600">
          Services
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <Link href={user ? "/home/booking" : "#"}>
          <button
            className={`bg-yellow-600 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-500 ${user ? "" : "cursor-not-allowed opacity-50"}`}
            disabled={!user}
          >
            BOOKING NOW
          </button>
        </Link>

        <Link href={user ? "/order" : "#"}>
          <button className="bg-yellow-600 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-500">
            OUR ORDER
          </button>
        </Link>

        {user ? (
          <button
            onClick={handleSignOut}
            className="bg-yellow-600 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-500"
          >
            LOGOUT
          </button>
        ) : (
          <button
            onClick={() => setIsAuthOpen(true)}
            className="bg-yellow-600 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-500"
          >
            LOGIN
          </button>
        )}
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
