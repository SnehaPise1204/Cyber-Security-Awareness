// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD8JmtEakrUlaUJM9MlyHQn0Afn75aMEio",
  authDomain: "cybersecurityweb-3ae81.firebaseapp.com",
  projectId: "cybersecurityweb-3ae81",
  storageBucket: "cybersecurityweb-3ae81.appspot.com",
  messagingSenderId: "1002468836321",
  appId: "1:1002468836321:web:502005ca3c199fb39908a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export named instances
export const auth = getAuth(app);
export const db = getFirestore(app);
