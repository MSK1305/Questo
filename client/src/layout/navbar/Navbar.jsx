import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLeft from "./NavbarLeft";
import NavbarRight from "./NavbarRight";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(true);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setUser(false);
    navigate("/login");
  };

  return (
    <div className="navbar sticky top-0 z-40 flex flex-row justify-between items-center w-full h-20 px-6 bg-muted text-foreground">
      <NavbarLeft onNavigate={navigate} />
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
