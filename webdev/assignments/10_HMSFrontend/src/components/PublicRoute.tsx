import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) return <Navigate to={"/dashboard"} replace />;
  return <Outlet />;
}

export default PublicRoute;
