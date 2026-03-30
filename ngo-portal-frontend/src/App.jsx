import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppLayout } from "./components/layout/AppLayout";
import { Login } from "./pages/Auth/Login";

// Placeholders for routing
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Tasks } from "./pages/Tasks/Tasks";
import { AddTask } from "./pages/Tasks/AddTask";
import { TaskDetail } from "./pages/Tasks/TaskDetail";
import { Tracking } from "./pages/Tracking/Tracking";
import { Analytics } from "./pages/Analytics/Analytics";
import { Notifications } from "./pages/Notifications/Notifications";
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
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<AddTask />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
