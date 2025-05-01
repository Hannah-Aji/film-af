// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3X5qSNGzpsq5VqQs6hVNeY33UAC6ky3w",
  authDomain: "film-af-database.firebaseapp.com",
  projectId: "film-af-database",
  storageBucket: "film-af-database.appspot.com",
  messagingSenderId: "384207927013",
  appId: "1:384207927013:web:5b536f34a6d837a953060c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { app };
