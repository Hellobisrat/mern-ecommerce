import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export default function ProtectedRoute({ adminOnly = false }) {
  const { user, loading } = useUserStore();
  console.log("ProtectedRoute user:", user);

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && !user.isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}