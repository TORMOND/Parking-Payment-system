// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, doc, getDocs, setDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgWimz22t3Qa0rDxFrCw7mQLKtLKCSk4A",
  authDomain: "parking-ticketing-system.firebaseapp.com",
  projectId: "parking-ticketing-system",
  storageBucket: "parking-ticketing-system.appspot.com",
  messagingSenderId: "848057128384",
  appId: "1:848057128384:web:bcc803b6b2806061f62425",
  measurementId: "G-3TG1PZZP59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);


const user = auth.currentUser;

export {
    app, db, auth, firebaseConfig, user, analytics, createUserWithEmailAndPassword, signInWithEmailAndPassword, collection, signOut, setDoc, getDocs, onAuthStateChanged
}