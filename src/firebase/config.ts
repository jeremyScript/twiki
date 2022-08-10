import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzNQDDpEDhuf7oTwjdNvcpBMeubWeUroI",
  authDomain: "twiki-f8461.firebaseapp.com",
  projectId: "twiki-f8461",
  storageBucket: "twiki-f8461.appspot.com",
  messagingSenderId: "765302028849",
  appId: "1:765302028849:web:6c5ce4d8da8f389cb57310",
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Init Firebase Authentication
const auth = getAuth(app);

// Init Firestore
const db = getFirestore(app);

export { auth, db };
