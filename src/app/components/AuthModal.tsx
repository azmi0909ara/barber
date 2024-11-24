import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  AuthError,
} from "firebase/auth";
import { auth } from "../../../firebase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const googleProvider = new GoogleAuthProvider();

export default function AuthModal({
  isOpen,
  onClose,
}: AuthModalProps): JSX.Element | null {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        // Create user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Update profile with username
        await updateProfile(userCredential.user, {
          displayName: username,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
      resetForm();
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message || "Authentication failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
      resetForm();
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message || "Google sign-in failed");
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setError("");
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1a1310] rounded-lg p-8 max-w-md w-full shadow-lg border border-[#6c541d]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#f6c744]">
            {isRegistering ? "Register" : "Sign In"}
          </h2>
          <button
            onClick={onClose}
            className="text-[#f6c744] hover:text-white"
            type="button"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-[#f6c744] mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                className="w-full px-4 py-2 border border-[#6c541d] rounded focus:outline-none focus:ring-2 focus:ring-[#f6c744] text-black"
                required={isRegistering}
                minLength={3}
              />
            </div>
          )}
          <div>
            <label className="block text-[#f6c744] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full px-4 py-2 border border-[#6c541d] rounded focus:outline-none focus:ring-2 focus:ring-[#f6c744] text-black"
              required
            />
          </div>
          <div>
            <label className="block text-[#f6c744] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="w-full px-4 py-2 border border-[#6c541d] rounded focus:outline-none focus:ring-2 focus:ring-[#f6c744] text-black"
              required
              minLength={6}
            />
          </div>
          {isRegistering && (
            <div>
              <label className="block text-[#f6c744] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full px-4 py-2 border border-[#6c541d] rounded focus:outline-none focus:ring-2 focus:ring-[#f6c744] text-black"
                required={isRegistering}
                minLength={6}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#f6c744] text-[#1a1310] py-2 rounded hover:bg-[#e0b73a]"
          >
            {isRegistering ? "Register with Email" : "Sign in with Email"}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full bg-transparent border border-[#6c541d] text-[#f6c744] py-2 rounded hover:bg-[#6c541d] hover:text-white flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={toggleMode}
            className="text-[#f6c744] hover:text-white font-medium"
          >
            {isRegistering
              ? "Already have an account? Sign in"
              : "Need an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
