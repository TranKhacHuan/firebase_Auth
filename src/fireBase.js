// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9s2u3I2btKQM4FOGnN2WXizYkAX3CH84",
  authDomain: "fir-auth-556be.firebaseapp.com",
  projectId: "fir-auth-556be",
  storageBucket: "fir-auth-556be.appspot.com",
  messagingSenderId: "620938079019",
  appId: "1:620938079019:web:c213f5232f700df62df36e",
  measurementId: "G-LGLL96YEW1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
