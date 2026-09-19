// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layout & Pages
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Quest from "./features/addQuest/quest/Quest";
import StartCampaign from "./pages/StartCampaign";
import QuestLog from "./features/quest-log/QuestLog";
import Leaderboard from "./features/leaderboard/Leaderboard";
import Login from "./user/Login";
import Signup from "./user/SignUp";
import VerifyEmail from "./user/VerifyEmail";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes inside AppLayout */}
          <Route path="/" element={<AppLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="verify-email" element={<VerifyEmail />} />

            {/* Protected Routes (nested inside layout, wrapped by ProtectedRoute) */}
            <Route element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add" element={<Quest />} />
              <Route path="start" element={<StartCampaign />} />
              <Route path="log" element={<QuestLog />} />
              <Route path="leaderboard" element={<Leaderboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
