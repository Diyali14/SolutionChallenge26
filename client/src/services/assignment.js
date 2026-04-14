import { db } from "../firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "firebase/firestore";

const assignmentRef = collection(db, "assignments");

// CREATE
export const addAssignment = async (data) => {
    return await addDoc(assignmentRef, data);
};

// READ
export const getAssignments = async () => {
    const snapshot = await getDocs(assignmentRef);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// DELETE
export const deleteAssignment = async (id) => {
    const docRef = doc(db, "assignments", id);
    return await deleteDoc(docRef);
};