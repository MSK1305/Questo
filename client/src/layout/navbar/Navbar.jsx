// frontend/src/components/Navbar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import our context
import NavbarLeft from "./NavbarLeft";
import NavbarRight from "./NavbarRight";

const Navbar = () => {
  const navigate = useNavigate();

  // Get user data and logout function from AuthContext
  const { user, logout } = useAuth();

  // Local UI state for the profile dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Define the logout logic using context and safe redirect
  const handleLogout = () => {
    logout(); // Clears auth state & localStorage
    setIsDropdownOpen(false); // Close the dropdown
    navigate("/login", { replace: true }); // Redirect to login page
  };

  return (
    <div className="navbar sticky top-0 z-40 flex flex-row justify-between items-center w-full h-20 px-6 bg-muted text-foreground border-b border-border">
      {/* Left side of navbar (Logo / Navigation links) */}
      <NavbarLeft onNavigate={navigate} />

      {/* Right side of navbar (Profile dropdown or Auth buttons) */}
      <NavbarRight
        user={user}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        handleLogout={handleLogout}
        onNavigate={navigate}
      />
    </div>
  );
};

export default Navbar;
