import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  PlaySquare,
  ScrollText,
} from "lucide-react";

const SidebarMain = ({ isCollapsed, getButtonStyle }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar-main flex flex-1 flex-col justify-center gap-3 p-3 pb-30">
      <button
        onClick={() => navigate("/dashboard")}
        className={getButtonStyle("/dashboard")}
        data-tooltip-id={isCollapsed ? "sidebar-tooltip" : undefined}
        data-tooltip-content={isCollapsed ? "Dashboard" : undefined}
      >
        <LayoutDashboard className="size-5 shrink-0" />
        {!isCollapsed && <span>Dashboard</span>}
      </button>

      <button
        onClick={() => navigate("/add")}
        className={getButtonStyle("/add")}
        data-tooltip-id={isCollapsed ? "sidebar-tooltip" : undefined}
        data-tooltip-content={isCollapsed ? "Add Quest" : undefined}
      >
        <PlusCircle className="size-5 shrink-0" />
        {!isCollapsed && <span>Add Quest</span>}
      </button>

      <button
        onClick={() => navigate("/start")}
        className={getButtonStyle("/start")}
        data-tooltip-id={isCollapsed ? "sidebar-tooltip" : undefined}
        data-tooltip-content={isCollapsed ? "Start Campaign" : undefined}
      >
        <PlaySquare className="size-5 shrink-0" />
        {!isCollapsed && <span>Start Campaign</span>}
      </button>

      <button
        onClick={() => navigate("/log")}
        className={getButtonStyle("/log")}
        data-tooltip-id={isCollapsed ? "sidebar-tooltip" : undefined}
        data-tooltip-content={isCollapsed ? "Quest Log" : undefined}
      >
        <ScrollText className="size-5 shrink-0" />
        {!isCollapsed && <span>Quest Log</span>}
      </button>
    </div>
  );
};

export default SidebarMain;
