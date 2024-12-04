// AdminDashboard.tsx
"use client";

import React from "react";
import Link from "next/link";

const AdminDashboard: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[#1a1310] overflow-hidden">
        <img
          src="/images/barber.jpg"
          alt="Barber cutting hair"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full bg-yellow-500 bg-opacity-80 py-4 shadow-md">
        <h1 className="text-5xl font-bold text-center text-white">BRBER ADMIN</h1>
      </header>

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          {/* Card 1 - Member */}
          <Link href="/member">
            <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-yellow-500 bg-opacity-80 cursor-pointer hover:bg-yellow-600 transition">
              <div>
                <h2 className="text-4xl font-bold text-white">Member</h2>
              </div>
              <div className="text-white text-3xl">👤</div>
            </div>
          </Link>

          {/* Card 2 - Our Order */}
          <Link href="/orderAdmin">
            <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-teal-500 bg-opacity-80 cursor-pointer hover:bg-teal-600 transition">
              <div>
                <h2 className="text-4xl font-bold text-white">Our Order</h2>
              </div>
              <div className="text-white text-3xl">🛒</div>
            </div>
          </Link>

          {/* Card 3 - History */}
          <Link href="/history">
            <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-indigo-500 bg-opacity-80 cursor-pointer hover:bg-indigo-600 transition">
              <div>
                <h2 className="text-4xl font-bold text-white">History</h2>
              </div>
              <div className="text-white text-3xl">📜</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
