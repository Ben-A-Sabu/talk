
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chat-app-d14d2.firebaseapp.com",
  projectId: "chat-app-d14d2",
  storageBucket: "chat-app-d14d2.appspot.com",
  messagingSenderId: "629605195396",
  appId: "1:629605195396:web:7c1e5a4a657459c7deecd1"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);// to access firestore
export const auth = getAuth(app);
export const storage = getStorage(app);// to upload images