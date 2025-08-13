// [EXAM] Route protégée (rôles)
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ton hook existant

export default function ProtectedRouteExam({ roles = [] }) {
  const { user, isAuthenticated, hasRole } = useAuth();
  const loc = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: loc }} />;
  }

  if (roles.length && !hasRole(roles)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
