// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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

// Initialize Firestore
const db = getFirestore(app);

export default db;
