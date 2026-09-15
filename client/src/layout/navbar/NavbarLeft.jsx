const NavbarLeft = ({ onNavigate }) => {
  return (
    <div
      className="navbar-left cursor-pointer text-xl font-bold hover:text-primary transition-colors"
      onClick={() => onNavigate("/")}
    >
      Questo
    </div>
  );
};

export default NavbarLeft;
