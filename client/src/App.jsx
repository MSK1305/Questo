import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Quest from "./features/addQuest/quest/Quest";
import StartCampaign from "./pages/StartCampaign";
import QuestLog from "./features/quest-log/QuestLog";
import Leaderboard from "./features/leaderboard/Leaderboard";
import Login from "./user/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add" element={<Quest />} />
        <Route path="start" element={<StartCampaign />} />
        <Route path="log" element={<QuestLog />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
