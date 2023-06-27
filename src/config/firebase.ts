// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6VXcmEa9IXpgf2Ax1nVQ5go22WPjnDPE",
  authDomain: "react-typescript-8a513.firebaseapp.com",
  projectId: "react-typescript-8a513",
  storageBucket: "react-typescript-8a513.appspot.com",
  messagingSenderId: "1089999528533",
  appId: "1:1089999528533:web:789ecb5fb0777eeec4aadc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
