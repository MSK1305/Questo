import profile from "../../assets/default-avatar.png";

const NavbarRight = ({
  user,
  isDropdownOpen,
  setIsDropdownOpen,
  handleLogout,
  onNavigate,
}) => {
  return (
    <div className="navbar-right">
      {user ? (
        /* Logged In State */
        <div className="relative">
          <div
            // Changed hover:bg-card to hover:bg-accent/50 (or any custom shade) for a different hover color
            className="flex items-center gap-3 cursor-pointer select-none p-1.5 rounded-lg hover:bg-accent/50 transition-colors"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <img
              src={profile}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border border-border"
            />
            <span className="font-medium text-foreground">username</span>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  onNavigate("/profile");
                }}
                // Changed hover:bg-muted to hover:bg-accent/40 for the dropdown items
                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent/40 transition-colors cursor-pointer"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                // Changed hover:bg-muted to hover:bg-destructive/10 for a subtle tinted logout hover
                className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Logged Out State */
        <div className="btn flex items-center gap-3">
          {/* Primary Action (Login) */}
          <button
            onClick={() => onNavigate("/login")}
            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium transition-colors shadow-sm cursor-pointer"
          >
            Login
          </button>

          {/* Secondary Action (Sign Up) */}
          <button
            onClick={() => onNavigate("/signup")}
            className="bg-card text-foreground border border-border hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default NavbarRight;
