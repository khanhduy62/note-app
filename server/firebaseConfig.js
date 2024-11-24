// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxouB6FpAy0jdsOtIscNFxCaQHSxfs9jc",
  authDomain: "note-app-7ddd1.firebaseapp.com",
  projectId: "note-app-7ddd1",
  storageBucket: "note-app-7ddd1.firebasestorage.app",
  messagingSenderId: "894485268520",
  appId: "1:894485268520:web:6c4de7583285040d344d1d",
  measurementId: "G-TXCR4RWNJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);