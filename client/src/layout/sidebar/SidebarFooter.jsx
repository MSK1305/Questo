import { useNavigate } from "react-router-dom";
import { Trophy } from "lucide-react";

const SidebarFooter = ({ isCollapsed, getButtonStyle }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar-footer p-3 pb-7">
      <button
        onClick={() => navigate("/leaderboard")}
        className={getButtonStyle("/leaderboard")}
        data-tooltip-id={isCollapsed ? "sidebar-tooltip" : undefined}
        data-tooltip-content={isCollapsed ? "Leaderboard" : undefined}
      >
        <Trophy className="size-5 shrink-0" />
        {!isCollapsed && <span>Leaderboard</span>}
      </button>
    </div>
  );
};

export default SidebarFooter;
