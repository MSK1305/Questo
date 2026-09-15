import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* 1. Left Fixed/Collapsible Sidebar */}
      <Sidebar />

      {/* 2. Right Main Layout Wrapper */}
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />

        {/* Main page content renders here */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
