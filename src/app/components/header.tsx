"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User as FirebaseUser, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import AuthModal from './AuthModal';

export default function Header(): JSX.Element {
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign out failed:', err);
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
        <Link href="home/about" className="text-white hover:text-yellow-600">
          About
        </Link>
        <Link href="home/service" className="text-white hover:text-yellow-600">
          Services
        </Link>
      </nav>

      <div className="space-x-4 flex items-center">
        <button 
          type="button"
          className="bg-yellow-600 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-500"
        >
          BOOKING NOW
        </button>
        <button 
          type="button"
          className="bg-yellow-600 text-black px-6 py-2 font-semibold rounded hover:bg-yellow-500"
        >
          OUR ORDER
        </button>
        
        {user ? (
          <button
            onClick={handleSignOut}
            type="button"
            className="bg-red-600 text-white px-6 py-2 font-semibold rounded hover:bg-red-500"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => setIsAuthOpen(true)}
            type="button"
            className="bg-blue-600 text-white px-6 py-2 font-semibold rounded hover:bg-blue-500"
          >
            Sign In
          </button>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </header>
  );
}