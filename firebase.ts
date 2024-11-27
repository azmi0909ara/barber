// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA57D78rdd5x_RCNQT1EhBtuBdrdbFodLs",
  authDomain: "barber-15b48.firebaseapp.com",
  projectId: "barber-15b48",
  storageBucket: "barber-15b48.firebasestorage.app",
  messagingSenderId: "215556113867",
  appId: "1:215556113867:web:30c08a848e185dcf0d224e",
  measurementId: "G-0KZEYZWEFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Getting Auth and Firestore Instances
const auth = getAuth(app);
const firestore = getFirestore(app); // Firestore instance is named "firestore"

export { firestore, auth }; // Export firestore and auth
