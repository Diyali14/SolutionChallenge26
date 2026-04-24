import { db } from "../firebase";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    query,
    where
} from "firebase/firestore";

const needRef = collection(db, "needs");

// CREATE
export const addNeed = async (data) => {
    return await addDoc(needRef, {
        ...data,
        createdAt: serverTimestamp()
    });
};

// READ
export const getNeeds = async () => {
    const snapshot = await getDocs(needRef);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

//GET ACTIVE NEEDS
export const getActiveNeeds = async () => {
    const q = query(
        needRef,
        where("status", "in", ["pending", "ongoing"])
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// UPDATE
export const updateNeed = async (id, updatedData) => {
    const docRef = doc(db, "needs", id);
    return await updateDoc(docRef, updatedData);
};

// DELETE
export const deleteNeed = async (id) => {
    const docRef = doc(db, "needs", id);
    return await deleteDoc(docRef);
};