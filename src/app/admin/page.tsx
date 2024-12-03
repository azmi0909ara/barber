// Login.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username === "admin098" && password === "barber098") {
      setError("");
      setLoginSuccess(true);
      setTimeout(() => {
        setIsLoggedIn(true);
        router.push("/adminIsi"); // Navigate to admin dashboard after successful login
      }, 2000); // Redirect after animation
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[#1a1310] overflow-hidden">
        <img
          src="/images/barber.jpg"
          alt="Barber Background"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md p-8 bg-[#1a1310] rounded-lg shadow-lg border border-[#6c541d]">
        <h1 className="text-3xl font-bold text-center text-[#f6c744] mb-6">
          Admin Login
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-[#f6c744] mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full px-3 py-2 border border-[#6c541d] rounded bg-[#1a1310] text-[#f6c744] placeholder-[#f6c744] focus:outline-none focus:border-[#f6c744]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-[#f6c744] mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border border-[#6c541d] rounded bg-[#1a1310] text-[#f6c744] placeholder-[#f6c744] focus:outline-none focus:border-[#f6c744]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-[#f6c744] text-[#1a1310] font-bold py-2 rounded hover:bg-[#6c541d] hover:text-white transition"
        >
          Login
        </button>
      </div>

      {/* Login Success Animation */}
      {loginSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-[#1a1310] rounded-lg p-6 shadow-lg border border-[#6c541d] flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-[#f6c744] rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-[#1a1310]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center text-[#f6c744]">
              Login Successful!
            </h2>
            <p className="text-center text-[#f6c744] mt-2">Redirecting...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
