"use client";

import { usePathname } from "next/navigation"; // Import hook untuk mendapatkan path aktif

export default function Footer() {
  const pathname = usePathname(); // Mendapatkan path saat ini

  // Daftar halaman di mana footer tidak ditampilkan
  const hiddenPaths = ["/admin", "/adminIsi", "/member", "/history", "/orderAdmin"];

  // Jika path saat ini termasuk dalam hiddenPaths, jangan tampilkan footer
  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-yellow-600 py-6 px-10">
      <div className="flex justify-between items-center">
        <span className="text-black text-lg font-bold">MAKE AN APPOINTMENT NOW</span>
        <div className="w-8 h-8 flex items-center justify-center"></div>
      </div>
    </footer>
  );
}
