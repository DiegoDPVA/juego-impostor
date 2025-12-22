// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBPdzE6a6zSmmYKH7C6K0WIgLBXFXrmFiE",
    authDomain: "impostor-51b31.firebaseapp.com",
    databaseURL: "https://impostor-51b31-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "impostor-51b31",
    storageBucket: "impostor-51b31.firebasestorage.app",
    messagingSenderId: "981256146682",
    appId: "1:981256146682:web:c1278e7d532025b2338343",
    measurementId: "G-RHJV1115J9"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);