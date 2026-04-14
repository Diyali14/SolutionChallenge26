import { useEffect, useState } from "react";
import { getNeeds, getActiveNeeds } from "../services/need";
import { getUserData } from "../services/user";
import { FiClipboard, FiMapPin, FiStar, FiTrendingUp } from "react-icons/fi";
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    CartesianGrid
} from "recharts";
import { getAssignments } from "../services/assignment";

function VolunteerDashboard({ user }) {

    const [needs, setNeeds] = useState([]);
    const [activeNeeds, setActiveNeeds] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (!user?.uid) return;
        fetchData(user.uid);
    }, [user]);

    const fetchData = async (uid) => {
        try {
            setLoading(true);

            const needsData = await getNeeds();
            const currentUserData = await getUserData(uid);
            const assignmentsData = await getAssignments();
            const active = await getActiveNeeds();

            setNeeds(needsData);
            setCurrentUser(currentUserData);
            setAssignments(assignmentsData);
            setActiveNeeds(active);

        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    const myAssignments = assignments.filter(
        (a) => a.volunteerId === user?.uid
    );

    const runMatching = async () => {
        if (!user?.uid) {
            console.error("User not ready");
            return;
        }

        try {
            await fetch("http://localhost:5000/run-matching", {
                method: "POST"
            });

            // small delay to allow Firestore write
            setTimeout(() => {
                fetchData(user.uid);
            }, 500);

        } catch (err) {
            console.error("❌ Matching error:", err);
        }
    };

    const normalizeCategory = (cat) => {
        if (!cat) return "other";
        cat = cat.toLowerCase();
        if (cat.includes("education")) return "education";
        if (cat.includes("health")) return "health";
        if (cat.includes("food")) return "food";
        if (cat.includes("disaster")) return "disaster";
        if (cat.includes("environment")) return "environment";
        return "other";
    };

    const categoryCounts = () => {
        const counts = { education: 0, health: 0, food: 0, disaster: 0, environment: 0, other: 0 };

        activeNeeds.forEach((need) => {
            const key = normalizeCategory(need.category);
            counts[key]++;
        });

        return [
            { name: "Edu", value: counts.education, color: "#7d9d85" },
            { name: "Health", value: counts.health, color: "#bc6c25" },
            { name: "Supply", value: counts.food, color: "#d4a373" },
            { name: "Relief", value: counts.disaster, color: "#a5a5a5" },
            { name: "Eco", value: counts.environment, color: "#58715e" }
        ];
    };

    const StatCard = ({ title, count, icon: Icon }) => (
        <div className="p-6 border rounded">
            <Icon className="text-2xl mb-2" />
            <h3 className="text-2xl font-bold">{count}</h3>
            <p className="text-sm">{title}</p>
        </div>
    );

    // Optional loading UI
    if (loading) {
        return <div className="p-10">Loading dashboard...</div>;
    }

    return (
        <div className="min-h-screen p-10">

            {/* Header */}
            <h2 className="text-3xl font-bold mb-6">
                Welcome, {currentUser?.name || "Volunteer"}
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Needs" count={needs.length} icon={FiClipboard} />
                <StatCard title="Your Assignments" count={myAssignments.length} icon={FiStar} />
                <StatCard title="Regions" count="14" icon={FiMapPin} />
                <StatCard title="Accuracy" count="98%" icon={FiTrendingUp} />
            </div>

            {/* Assignments */}
            <div className="mb-10">
                <h3 className="text-xl font-bold mb-4">Your Smart Assignments</h3>

                {myAssignments.length === 0 ? (
                    <p>No assignments yet</p>
                ) : (
                    myAssignments.map((m) => {
                        const need = needs.find(n => n.id === m.needId);

                        return (
                            <div key={m.id} className="border p-4 mb-3 rounded">
                                <h4 className="font-semibold">
                                    {need?.title || "Unknown Need"}
                                </h4>
                                <p>Match Score: {m.matchScore}</p>
                            </div>
                        );
                    })
                )}

                <button
                    onClick={runMatching}
                    className="btn-premium group shadow-sage-200"
                >
                    Start Helping
                </button>
            </div>

            {/* Chart */}
            <div style={{ width: "100%", height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryCounts()}>
                        <CartesianGrid strokeDasharray="1 5" />
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Bar dataKey="value">
                            {categoryCounts().map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}

export default VolunteerDashboard;