import { auth, db } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { doc, setDoc, getDoc, getDocs, collection, query, where } from "firebase/firestore";

// SIGN UP (COMMON)
export const addUser = async (email, password, role, extraData = {}) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
        email,
        role,
        ...extraData,
        createdAt: new Date()
    });

    return userCredential;
};

// LOGIN
export const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

//GET CURRENT USER
export const getUserData = async (uid) => {
    const docRef = doc(db, "users", uid);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
        return {
            id: snap.id,
            ...snap.data()
        };
    } else {
        throw new Error("User data not found");
    }
};

//GET ALL USERS
export const getAllUsers = async () => {
    const snap = await getDocs(collection(db, "users"));
    return snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

//GET VOLUNTEERS
export const getVolunteers = async () => {
    const q = query(collection(db, "users"), where("role", "==", "volunteer"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id, //IMPORTANT: must match volunteerId
        ...doc.data()
    }));
};

// LOGOUT
export const logout = async () => {
    return await signOut(auth);
};