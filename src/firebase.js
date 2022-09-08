// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, setDoc,  serverTimestamp,  query, where, orderBy,  onSnapshot, updateDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyDgU3obR1wbAdZunYpQQhnNR40d5Kf-J-U",
  authDomain: "parking-ticketing-system-b0c2d.firebaseapp.com",
  projectId: "parking-ticketing-system-b0c2d",
  storageBucket: "parking-ticketing-system-b0c2d.appspot.com",
  messagingSenderId: "884287949351",
  appId: "1:884287949351:web:bdefd47b9e42bbd1979c02",
  measurementId: "G-00DGHPTNKP"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);


const user = auth.currentUser;

export {
  app, db, auth, firebaseConfig, user, analytics, createUserWithEmailAndPassword, signInWithEmailAndPassword, collection, signOut, setDoc, getDocs, onAuthStateChanged, doc,
  getStorage, ref, uploadBytes, getDownloadURL, listAll,  serverTimestamp, addDoc,  query, where, orderBy,  onSnapshot, updateDoc
}



