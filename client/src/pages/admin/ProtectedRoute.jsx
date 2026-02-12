import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { authed, loading } = useAuth();

  // while auth status is being determined, don't render protected UI
  if (loading) return null;

  if (!authed) return <Navigate to="/admin/login" replace />;

  return children;
}
