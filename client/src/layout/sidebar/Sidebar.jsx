import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import SidebarMain from "./SidebarMain";
import SidebarFooter from "./SidebarFooter";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  // Default the dashboard to be selected on load if at root
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [location.pathname, navigate]);

  // Returns the correct styling based on the active route
  const getButtonStyle = (path) =>
    `flex items-center gap-3 w-full p-2.5 border-2 rounded-lg transition-all font-medium text-left cursor-pointer ${
      isCollapsed ? "justify-center" : ""
    } ${
      location.pathname === path
        ? "bg-accent text-accent-foreground border-accent shadow-md"
        : "bg-card text-foreground border-border hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-md"
    }`;

  return (
    <div
      className={`sidebar sticky top-0 h-screen border-r-2 border-border flex flex-col bg-muted text-foreground transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-44"
      }`}
    >
      <SidebarHeader
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isHeaderHovered={isHeaderHovered}
        setIsHeaderHovered={setIsHeaderHovered}
      />

      <SidebarMain isCollapsed={isCollapsed} getButtonStyle={getButtonStyle} />

      <SidebarFooter
        isCollapsed={isCollapsed}
        getButtonStyle={getButtonStyle}
      />

      {/* Shared Tooltip */}
      <Tooltip
        id="sidebar-tooltip"
        place="right"
        className="bg-popover text-popover-foreground px-3 py-1.5 rounded-md shadow-md text-sm font-medium border border-border z-50"
      />
    </div>
  );
};

export default Sidebar;
