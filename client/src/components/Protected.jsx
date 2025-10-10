import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

export default function Protected({ children }) {
  const { token } = useAuth();

  // If no token → redirect to login
  if (!token) return <Navigate to="/login" replace />;

  // Otherwise, render the protected page (e.g., Dashboard)
  return children;
}
