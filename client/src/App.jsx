import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserData } from "./services/user";

import AddNeed from "./pages/AddNeed";
import AddVolunteer from "./pages/AddVolunteer";
import AddNGO from "./pages/AddNGO";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import NgoDashboard from "./pages/NGODashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import Login from "./pages/Login";


function AppWrapper() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const extraData = await getUserData(firebaseUser.uid);

          const fullUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...extraData
          };

          setUser(fullUser);

          //  ROLE-BASED REDIRECT
          if (location.pathname === "/" || location.pathname === "/login") {
            if (extraData.role === "ngo") {
              navigate("/ngo/dashboard");
            } else if (extraData.role === "volunteer") {
              navigate("/volunteer/dashboard");
            }
          }

        } catch (err) {
          console.error(err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Registration */}
        <Route path="/register/volunteer" element={<AddVolunteer />} />
        <Route path="/register/ngo" element={<AddNGO />} />

        {/* Dashboards */}
        <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
        <Route path="/ngo/dashboard" element={<NgoDashboard />} />

        {/* Other */}
        <Route path="/add-need" element={<AddNeed />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}