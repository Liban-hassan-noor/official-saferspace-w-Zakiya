// Import the core Firebase functionality
import { initializeApp } from "firebase/app";

// Import Firestore database service
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// (Optional) Import analytics service
//import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration object — replace values only if you regenerate the config
const firebaseConfig = {
  apiKey: "AIzaSyBbZE7wjc48SwCdEifkOVRBlo60risbl7M",
  authDomain: "saferspace-5852d.firebaseapp.com",
  projectId: "saferspace-5852d",
  storageBucket: "saferspace-5852d.firebasestorage.app",
  messagingSenderId: "303403366876",
  appId: "1:303403366876:web:b0b688938c399548713719",
  measurementId: "G-QZW1MSQXXP",
};


// Initialize auth






// Initialize the Firebase app using the config above
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Optional: Auto sign-in anonymously on startup
signInAnonymously(auth).catch(console.error);
// Initialize Firestore (the database)
const db = getFirestore(app);

// (Optional) Initialize Firebase Analytics
//const analytics = getAnalytics(app);

// Export the Firestore database so you can use it in your components
export { db };
