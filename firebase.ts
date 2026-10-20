// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: "tracking-expense-5ede3.firebaseapp.com",
  projectId: "tracking-expense-5ede3",
  storageBucket: "tracking-expense-5ede3.firebasestorage.app",
  messagingSenderId: "630532742248",
  appId: "1:630532742248:web:25c328c1e1f136db682fdd",
  measurementId: "G-E99MNQSQQL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, analytics, db };
