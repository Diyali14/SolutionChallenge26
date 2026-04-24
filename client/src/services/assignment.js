import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const assignmentRef = collection(db, "assignments");

//GET ALL ASSIGNMENTS
export const getAssignments = async () => {
    const snapshot = await getDocs(assignmentRef);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// GET ASSIGNMENTS BY NEED (VERY USEFUL)
export const getAssignmentsByNeed = async (needId) => {
    const q = query(assignmentRef, where("needId", "==", needId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};