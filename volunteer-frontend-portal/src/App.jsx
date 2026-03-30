import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppLayout } from "./components/layout/AppLayout";
import { Login } from "./pages/Auth/Login";

import { Dashboard } from "./pages/Dashboard/Dashboard";
import { ExploreTasks } from "./pages/Tasks/ExploreTasks";
import { TaskDetail } from "./pages/Tasks/TaskDetail";
import { MyTasks } from "./pages/Tasks/MyTasks";
import { Tracking } from "./pages/Tracking/Tracking";
import { Impact } from "./pages/Analytics/Impact";
import { Notifications } from "./pages/Notifications/Notifications";
import { Profile } from "./pages/Profile/Profile";
import { Settings } from "./pages/Settings/Settings";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes Wrapper */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<ExploreTasks />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
