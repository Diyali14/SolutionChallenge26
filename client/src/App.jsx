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
  const [loading, setLoading] = useState(true);

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

          //ROLE-BASED REDIRECT
          if (location.pathname === "/" || location.pathname === "/login") {
            if (extraData.role === "ngo") {
              navigate("/ngo/dashboard");
            } else if (extraData.role === "volunteer") {
              navigate("/volunteer/dashboard");
            }
          }

        } catch (err) {
          console.error("User fetch error:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  if (loading) {
    return <div className="p-10">Loading app...</div>;
  }

  return (
    <>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Dashboard user={user} />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Register */}
        <Route path="/register/volunteer" element={<AddVolunteer />} />
        <Route path="/register/ngo" element={<AddNGO />} />

        <Route
          path="/volunteer/dashboard"
          element={<VolunteerDashboard user={user} />}
        />

        <Route
          path="/ngo/dashboard"
          element={<NgoDashboard user={user} />}
        />

        <Route path="/add-need" element={<AddNeed user={user} />} />
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