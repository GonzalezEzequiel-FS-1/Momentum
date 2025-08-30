import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjPKMwzZTLZHxM_vGKvg5fsOnwT3a7mEM",
  authDomain: "momentum-ab390.firebaseapp.com",
  projectId: "momentum-ab390",
  storageBucket: "momentum-ab390.firebasestorage.app",
  messagingSenderId: "232640338800",
  appId: "1:232640338800:web:a082a82f842f79650b8db5",
  measurementId: "G-Q3KZG70H8C",
  appSecret:"MomentumAppSecret"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth & Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

// Lazy-load Analytics only in the browser
let analytics;
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  }).catch(console.error);
}

export { auth, analytics, app, firestore };
