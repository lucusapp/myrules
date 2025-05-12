// 🔥 Firebase v9 modular
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Pegá acá tu config personalizada
const firebaseConfig = {
    apiKey: "AIzaSyDrvgdgD1Lhu29JP07JZ9USC0Y-1h4RCsU",
    authDomain: "myrules-a872e.firebaseapp.com",
    projectId: "myrules-a872e",
    storageBucket: "myrules-a872e.firebasestorage.app",
    messagingSenderId: "357522517017",
    appId: "1:357522517017:web:70e3a27f5a238341f5ce88",
    measurementId: "G-MLJ97V7W0Y"
  };

// Init Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
