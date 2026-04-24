import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAA3bZE0AAl6cHL9ptUQO-IhJe1qbcc_Us",
    authDomain: "smart-resource-allocatio-884f1.firebaseapp.com",
    projectId: "smart-resource-allocatio-884f1",
    storageBucket: "smart-resource-allocatio-884f1.firebasestorage.app",
    messagingSenderId: "145200832811",
    appId: "1:145200832811:web:8134119c7a4d19e8de256e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);