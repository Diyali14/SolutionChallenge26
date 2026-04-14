import express from "express";
import cors from "cors";
import { db } from "./firebaseAdmin.js";
import { callSpringBoot } from "./services/matchingService.js";
import storeResults from "./utils/storeResult.js";
import formatData from "./utils/formatData.js";

const app = express();

app.use(cors());
app.use(express.json());

// Test
app.get("/", (req, res) => {
    res.send("Backend running ");
});

// Add Need
app.post("/add-need", async (req, res) => {
    try {
        const { title, description, location, priority, skills, category } = req.body;

        const docRef = await db.collection("needs").add({
            title,
            description,
            location,
            priority,
            skills,
            category,
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

// Add Volunteer
app.post("/add-volunteer", async (req, res) => {
    try {
        const { name, email, skills, location, availability, role } = req.body;

        const docRef = await db.collection("users").add({
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

// Matching Endpoint
app.post("/run-matching", async (req, res) => {
    try {
        // 1. Fetch Needs
        const needsSnap = await db.collection("needs").get();
        const needs = needsSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // 2. Fetch Users (volunteers)
        const usersSnap = await db.collection("users").get();
        const users = usersSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // 3. Transform
        const formattedData = formatData(needs, users);

        // 4. Call Spring Boot
        const result = await callSpringBoot(formattedData);

        // 5. Store Results
        await storeResults(result.optimizedNeeds);

        res.json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
