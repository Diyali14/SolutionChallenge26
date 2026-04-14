import { auth, db } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

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
        return snap.data();
    } else {
        throw new Error("User data not found");
    }
};

// LOGOUT
export const logout = async () => {
    return await signOut(auth);
};