import { useEffect, useState } from "react";
import { getNeeds, getActiveNeeds } from "../services/need";
//import { getVolunteers } from "../services/volunteer";
import { getUserData } from "../services/user";
import { FiCheckCircle, FiClipboard, FiActivity, FiMapPin, FiStar, FiTrendingUp, FiGift, FiCpu } from "react-icons/fi";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    CartesianGrid
} from "recharts";

function VolunteerDashboard({ user }) {
    const [needs, setNeeds] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [assigned, setAssigned] = useState([]);
    const [fulfilled, setFulfilled] = useState([]);
    const [activeNeeds, setActiveNeeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const needsData = await getNeeds();
            const volunteerData = await getUserData();

            setNeeds(needsData);
            setVolunteers(volunteerData);

            // Mocking specialized data
            setAssigned(needsData.slice(0, 2));
            setFulfilled(needsData.filter(n => n.status === 'completed').slice(0, 3));

            const active = await getActiveNeeds();
            setActiveNeeds(active);
        } catch (err) {
            console.error("Error fetching volunteer data:", err);
        } finally {
            setLoading(false);
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

    const StatCard = ({ title, count, icon: Icon, colorClass, border }) => (
        <div className={`premium-card p-6 h-full flex flex-col justify-between group ${border ? 'border-sage-200' : 'border-none shadow-sm'}`}>
            <div className={`w-14 h-14 rounded-3xl ${colorClass} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-sage-200/20`}>
                <Icon className="text-2xl" />
            </div>
            <div className="pt-6">
                <h3 className="text-3xl font-extrabold text-warm-900 tracking-tighter leading-none mb-2">{count}</h3>
                <p className="text-[10px] font-black text-sage-400 uppercase tracking-widest">{title}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-warm-50 py-12 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-10 border-b border-warm-200/50">
                    <div className="space-y-4">
                        <span className="section-tag">Hero Portal</span>
                        <h2 className="text-5xl font-extrabold text-warm-900 tracking-tighter leading-tight">
                            Personal <span className="text-sage-500">Missions.</span><br/>
                            <span className="text-3xl font-light italic text-sage-400">Transforming capability into impact.</span>
                        </h2>
                        <p className="text-lg text-sage-600 font-medium opacity-80 max-w-xl">
                            Welcome back, {user?.name || 'Volunteer'}. You have <span className="text-sage-600 font-bold">{assigned.length} priority missions</span> awaiting your contribution.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-white p-4 rounded-[2.5rem] shadow-xl shadow-warm-200/50 border border-warm-100">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-sage-100 text-sage-600 flex items-center justify-center text-2xl font-black shadow-inner">
                            {user?.name?.[0] || 'V'}
                        </div>
                        <div className="pr-6 space-y-1">
                            <p className="text-[10px] font-black text-sage-400 uppercase tracking-[0.2em] leading-none mb-1">Impact Level</p>
                            <p className="text-lg font-extrabold text-sage-800 leading-none">Elite Contributor</p>
                            <div className="h-1 w-full bg-sage-50 rounded-full mt-2 overflow-hidden shadow-inner">
                                <div className="h-full w-3/4 bg-sage-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCard title="Active Network Needs" count={needs.length} icon={FiClipboard} colorClass="bg-sage-600 text-white" border={false} />
                    <StatCard title="Global Peers" count={volunteers.length} icon={FiStar} colorClass="bg-white text-sage-600 shadow-inner" border={true} />
                    <StatCard title="Regions Impacted" count="14" icon={FiMapPin} colorClass="bg-white text-accent-gold shadow-inner" border={true} />
                    <StatCard title="Contribution Accuracy" count="98%" icon={FiTrendingUp} colorClass="bg-white text-sage-800 shadow-inner" border={true} />
                </div>

                <div className="grid lg:grid-cols-3 gap-12 pt-8">
                    {/* Mission Control Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <section className="space-y-8">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-2xl font-extrabold text-warm-900 tracking-tight flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-sage-600 rounded-full"></span>
                                    Current Assignments
                                </h3>
                                <span className="text-[10px] font-black text-sage-400 bg-white px-3 py-1 rounded-full border border-warm-100 uppercase tracking-widest shadow-sm">Priority Tasks</span>
                            </div>

                            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
                                {loading ? (
                                    <div className="h-48 bg-white rounded-[2.5rem] animate-pulse"></div>
                                ) : assigned.map((n) => (
                                    <div key={n.id} className="premium-card p-10 border-none relative group hover:-translate-y-2">
                                        <div className="absolute top-8 right-8 p-3 bg-warm-50 text-sage-400 rounded-2xl group-hover:bg-sage-600 group-hover:text-white transition-all duration-500">
                                            <FiGift className="text-xl" />
                                        </div>
                                        <div className="space-y-4">
                                            <span className="text-[10px] font-black text-sage-700 bg-sage-100 px-3 py-1 rounded-full uppercase tracking-tighter shadow-inner">Urgent Requirement</span>
                                            <h4 className="text-2xl font-extrabold text-warm-900 leading-tight group-hover:text-sage-600 transition-colors uppercase tracking-tighter">{n.title}</h4>
                                            <p className="text-sm text-sage-700 leading-relaxed opacity-70 font-medium line-clamp-2">{n.description}</p>
                                            <div className="pt-6 flex items-center justify-between border-t border-warm-50">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-sage-50 flex items-center justify-center">
                                                        <FiMapPin className="text-xs text-sage-500" />
                                                    </div>
                                                    <span className="text-xs font-bold text-sage-400 uppercase tracking-widest">{n.location}</span>
                                                </div>
                                                <button className="text-xs font-black text-sage-600 hover:text-sage-900 uppercase tracking-widest transition-colors flex items-center gap-2">
                                                    Details <FiTrendingUp className="rotate-45" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-8">
                             <h3 className="text-2xl font-extrabold text-warm-900 tracking-tight flex items-center gap-3 px-2">
                                <span className="w-1.5 h-6 bg-sage-300 rounded-full"></span>
                                Impact Log
                            </h3>
                            <div className="space-y-4">
                                {fulfilled.length > 0 ? fulfilled.map((n) => (
                                    <div key={n.id} className="premium-card !p-6 flex items-center justify-between border-none hover:translate-x-1">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-sage-50 text-sage-600 rounded-2xl flex items-center justify-center shadow-inner">
                                                <FiCheckCircle className="text-2xl" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-extrabold text-warm-900 tracking-tight">{n.title}</h4>
                                                <p className="text-xs font-bold text-sage-300 uppercase tracking-widest mt-1">Status: Verified Deployment</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-sage-700 bg-sage-100 px-3 py-1 rounded-full uppercase tracking-tighter inline-block shadow-sm">Reward Granted</p>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-sm font-medium text-sage-400 italic text-center py-10 opacity-60">Your impact journey is just beginning.</p>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Discovery & Insights Column */}
                    <div className="space-y-12">
                        <div className="premium-card p-10 border-none h-full shadow-2xl shadow-sage-200/20">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-2xl font-extrabold text-warm-900 tracking-tight">Ecosystem</h3>
                                <FiCpu className="text-sage-200 text-3xl" />
                            </div>
                            <div className="h-64 mb-12">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={categoryCounts()}>
                                        <CartesianGrid strokeDasharray="1 5" vertical={false} stroke="#f5f3ef" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#7d9d85', fontSize: 10, fontWeight: 800}} />
                                        <Tooltip 
                                            contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 48px -10px rgba(0,0,0,0.1)', padding: '16px'}}
                                        />
                                        <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                                            {categoryCounts().map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-8">
                                <h4 className="text-xs font-black text-sage-300 uppercase tracking-[0.3em] pl-1">Global Demand Trend</h4>
                                {['Educational Infrastructure', 'Crisis Logistics', 'Nutritional Supply'].map((skill, i) => (
                                    <div key={skill} className="space-y-3">
                                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-tighter">
                                            <span className="text-sage-700">{skill}</span>
                                            <span className="text-sage-400">{85 - (i * 15)}% Volume</span>
                                        </div>
                                        <div className="h-2 w-full bg-warm-50 rounded-full overflow-hidden shadow-inner border border-warm-100/50">
                                            <div 
                                                className="h-full bg-sage-500 rounded-full shadow-lg shadow-sage-100" 
                                                style={{width: `${85 - (i * 15)}%`}}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VolunteerDashboard;
