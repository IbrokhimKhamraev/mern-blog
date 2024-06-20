// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-54a33.firebaseapp.com",
  projectId: "mern-blog-54a33",
  storageBucket: "mern-blog-54a33.appspot.com",
  messagingSenderId: "34840965593",
  appId: "1:34840965593:web:e4833430507c58ce5769c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);