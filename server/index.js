import "dotenv/config";
import express from "express";
import cors from "cors";
import { db } from "./firebaseAdmin.js";
import { callSpringBoot } from "./services/matchingService.js";
import storeResults from "./utils/storeResult.js";
import formatData from "./utils/formatData.js";

const app = express();

//app.use(cors());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://resonet-black.vercel.app"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// Add Need
app.post("/add-need", async (req, res) => {
    try {
        const { title, description, location, priority, skills, category, ngoID } = req.body;

        const docRef = await db.collection("needs").add({
            title,
            description,
            location,
            priority,
            skills,
            category,
            ngoID,
            status: "pending",
            createdAt: new Date()
        });

        res.json({ success: true, id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Needs
app.get("/get-needs", async (req, res) => {
    try {
        const snapshot = await db.collection("needs").get();

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Mark Need as Completed
app.post("/complete-need/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection("needs").doc(id).update({
            status: "completed"
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Volunteer
app.post("/add-volunteer", async (req, res) => {
    try {
        const { name, email, skills, location, availability, role } = req.body;

        const docRef = await db.collection("users").add({
            uid,
            name,
            email,
            skills,
            location,
            availability,
            role: "volunteer"
        });

        res.json({ success: true, id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add NGO
app.post("/add-ngo", async (req, res) => {
    try {
        const { name, email, type, location, phone, description, role } = req.body;

        const docRef = await db.collection("users").add({
            name,
            email,
            type,
            location,
            phone,
            description,
            role: "ngo"
        });

        res.json({ success: true, id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Get Assignments
app.get("/get-assignments", async (req, res) => {
    try {
        const snapshot = await db.collection("assignments").get();

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// // Matching Endpoint
// app.post("/run-matching", async (req, res) => {

//     try {
//         const { uid } = req.body;
//         if (!uid) {
//             return res.status(400).json({ error: "UID is required" });
//         }

//         // 1. Fetch Needs
//         const needsSnap = await db.collection("needs").get();
//         const needs = needsSnap.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));

//         // 2. Fetch Only Current User (volunteers)
//         const userDoc = await db.collection("users").doc(uid).get();
//         if (!userDoc.exists) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         const users = [{
//             id: uid,
//             ...userDoc.data()
//         }];

//         // 3. Transform
//         const formattedData = formatData(needs, users);

//         // 4. Call Spring Boot
//         const result = await callSpringBoot(formattedData);

//         // 5. Store Results
//         await storeResults(result.optimizedNeeds);

//         for (const item of result.optimizedNeeds) {
//             const { needId, matchScore } = item;

//             // check duplicate
//             const existingSnap = await db
//                 .collection("assignments")
//                 .where("volunteerId", "==", uid)
//                 .where("needId", "==", needId)
//                 .get();
//             if (!existingSnap.empty) continue;
//             const newRef = db.collection("assignments").doc();
//             batch.set(newRef, {
//                 volunteerId: uid,
//                 needId,
//                 matchScore
//             });
//         }

//         await batch.commit();
//         res.json({ success: true });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// });

app.post("/run-matching", async (req, res) => {
    try {
        console.log("HEADERS:", req.headers);
        console.log("BODY RECEIVED:", req.body);

        const uid = req.body?.uid;

        if (!uid) {
            return res.status(400).json({ error: "UID is required" });
        }

        console.log("🔥 RUN MATCHING FOR UID:", uid);

        // Fetch needs
        const needsSnap = await db.collection("needs").get();
        const needs = needsSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Fetch user
        const userDoc = await db.collection("users").doc(uid).get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: "User not found" });
        }

        const users = [{
            id: uid,
            ...userDoc.data()
        }];

        // Format + match
        const formattedData = formatData(needs, users);
        const result = await callSpringBoot(formattedData);

        // Store results correctly
        await storeResults(result.optimizedNeeds, uid);

        res.json({ success: true });

    } catch (error) {
        console.error("❌ Matching Error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
