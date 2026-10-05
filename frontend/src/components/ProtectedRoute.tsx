import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRole?: "author" | "admin";
}

const ProtectedRoute = ({
  allowedRole,
}: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  if (!token || !userString) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(userString);
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }
  if (allowedRole && user.role !== allowedRole) {
    if (user.role === "author") {
      return <Navigate to="/author/dashboard" replace />;
    }

    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;