import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3snAYEcq1iIXnKbg_WsyqllouMmIr5Go",
  authDomain: "courseroad-sofdev3.firebaseapp.com",
  projectId: "courseroad-sofdev3",
  storageBucket: "courseroad-sofdev3.appspot.com",
  messagingSenderId: "29953580726",
  appId: "1:29953580726:web:a8ef041c8a527c72e31017"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();