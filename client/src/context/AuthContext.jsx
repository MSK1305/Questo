// frontend/src/context/AuthContext.jsx
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // 1. LAZY INITIALIZATION: Read from localStorage ONCE during initial render.
  // This prevents the "setState in effect" warning and extra renders.
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("userToken") || null;
  });

  // 2. Login function
  const login = (userData, tokenString) => {
    setUser(userData);
    setToken(tokenString);
    localStorage.setItem("userToken", tokenString);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  // 3. Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
  };

  // Notice we removed 'loading' from the value object, as it's no longer needed!
  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
