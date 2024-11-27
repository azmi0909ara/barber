"use client";

import { useState, useEffect } from "react";
import { firestore, auth } from "../../../firebase"; // Import Firestore db and auth
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { useRouter } from "next/navigation"; // For navigation in Next.js 13+
import AuthModal from '../components/AuthModal';

const UserInfoPage = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Use next/navigation for routing
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Get the current user data
  useEffect(() => {
    if (!auth.currentUser) {
      // If no user is logged in, open the auth modal
      setIsAuthOpen(true);
    }
  }, [router]);

  // Function to save user info to Firestore
  const saveUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!auth.currentUser) {
        setError("No user is logged in");
        return;
      }

      const userRef = doc(firestore, "users", auth.currentUser.uid);
      const snapshot = await getDoc(userRef);

      // If user document does not exist, create it
      if (!snapshot.exists()) {
        await setDoc(userRef, {
          fullName,
          phoneNumber,
          createdAt: new Date(),
        });
      } else {
        // Update the existing document with the new information
        await setDoc(
          userRef,
          { fullName, phoneNumber },
          { merge: true } // Merge the new fields with existing data
        );
      }

      // Navigate to a different page after saving data (e.g., home page)
      router.push("/");

    } catch (err) {
      setError("Error saving data, please try again.");
      console.error(err);
    }
  };

  return (
    <>
      {isAuthOpen && <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />}

      
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-[#1a1310] rounded-lg p-8 max-w-md w-full shadow-lg border border-[#6c541d]">
          <h2 className="text-2xl font-bold text-[#f6c744] mb-6">Complete Your Information</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={saveUserInfo} className="space-y-4">
            <div>
              <label className="block text-[#f6c744] mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-[#6c541d] rounded focus:outline-none focus:ring-2 focus:ring-[#f6c744] text-black"
                required
                minLength={3}
              />
            </div>
            <div>
              <label className="block text-[#f6c744] mb-2">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border border-[#6c541d] rounded focus:outline-none focus:ring-2 focus:ring-[#f6c744] text-black"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#f6c744] text-[#1a1310] py-2 rounded hover:bg-[#e0b73a]"
            >
              Save Information
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserInfoPage;
