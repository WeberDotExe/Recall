import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/UseAuth.js";

function PublicRoute() {
  const { accessToken } = useAuth();

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;