// src/firebase/firebase.js

// Import Firebase SDK directly from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your Firebase config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyC7OlOJlOJlG6HGombrxytI4mvldAm39YZD-s",
  authDomain: "tradexmatrix-txm.firebaseapp.com",
  projectId: "tradexmatrix-txm",
  storageBucket: "tradexmatrix-txm.firebasestorage.app",
  messagingSenderId: "683396221594",
  appId: "1:683396221594:web:a7e0f26c5ce65eda8d2d23",
  measurementId: "G-WDMMDNFZ7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore & Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db }; 
