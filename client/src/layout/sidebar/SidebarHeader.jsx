import logo from "../../assets/logo.png";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";

const SidebarHeader = ({
  isCollapsed,
  setIsCollapsed,
  isHeaderHovered,
  setIsHeaderHovered,
}) => {
  return (
    <div
      className={`sidebar-header flex items-center p-4 h-16 ${
        isCollapsed ? "justify-center" : "justify-between"
      }`}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => setIsHeaderHovered(false)}
    >
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center justify-center cursor-pointer"
        >
          {isHeaderHovered ? (
            <SquareChevronRight className="size-8 text-foreground" />
          ) : (
            <img
              src={logo}
              alt="Questo"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
        </button>
      ) : (
        <>
          <img
            src={logo}
            alt="Questo"
            className="w-10 h-10 rounded-full object-cover ml-4"
          />
          <button
            onClick={() => setIsCollapsed(true)}
            className="text-foreground transition-transform duration-200 hover:scale-115 cursor-pointer"
          >
            <SquareChevronLeft className="size-8" />
          </button>
        </>
      )}
    </div>
  );
};

export default SidebarHeader;
