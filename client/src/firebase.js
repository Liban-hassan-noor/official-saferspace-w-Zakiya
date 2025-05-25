// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbZE7wjc48SwCdEifkOVRBlo60risbl7M",
  authDomain: "saferspace-5852d.firebaseapp.com",
  projectId: "saferspace-5852d",
  storageBucket: "saferspace-5852d.firebasestorage.app",
  messagingSenderId: "303403366876",
  appId: "1:303403366876:web:b0b688938c399548713719",
  measurementId: "G-QZW1MSQXXP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
signInAnonymously(auth).catch(console.error);
export const db = getFirestore(app);
