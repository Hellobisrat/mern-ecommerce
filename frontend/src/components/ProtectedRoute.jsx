import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export default function ProtectedRoute({ adminOnly = false }) {
  const { user, loading } = useUserStore();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && !user.isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}