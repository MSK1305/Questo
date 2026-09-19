// frontend/src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { token } = useAuth(); // We only need the token now

  // If there is no token, redirect to login immediately
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If there is a token, render the protected page
  return <Outlet />;
};

export default ProtectedRoute;
