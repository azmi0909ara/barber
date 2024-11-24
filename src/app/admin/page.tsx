import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[#1a1310] overflow-hidden">
        <img
          src="/images/barber.jpg" // Ganti path ini dengan path gambar Anda
          alt="Barber cutting hair"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Card 1 */}
        <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-yellow-500 bg-opacity-80">
          <div>
            <h2 className="text-4xl font-bold text-white">Member</h2>
          </div>
          <div className="text-white text-3xl">👤</div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center justify-between p-4 rounded-lg shadow-lg bg-teal-500 bg-opacity-80">
          <div>
            <h2 className="text-4xl font-bold text-white">Our Order</h2>
          </div>
          <div className="text-white text-3xl">🛒</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
