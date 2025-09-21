// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7OlOJlG6HGombrxytI4mvldAm39YZD-s",
  authDomain: "tradexmatrix-txm.firebaseapp.com",
  projectId: "tradexmatrix-txm",
  storageBucket: "tradexmatrix-txm.firebasestorage.app",
  messagingSenderId: "683396221594",
  appId: "1:683396221594:web:a7e0f26c5ce65eda8d2d23",
  measurementId: "G-WDMMDNFZ7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
