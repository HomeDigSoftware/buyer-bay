// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvjKzEACzc6unUFXMRo90jyIa_irltN5k",
  authDomain: "choice-a9d97.firebaseapp.com",
  projectId: "choice-a9d97",
  storageBucket: "choice-a9d97.appspot.com",
  messagingSenderId: "836099773415",
  appId: "1:836099773415:web:507680665f36b8ed3f2342",
  measurementId: "G-QD224F1N8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);