import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../Context/useAuth";

type Props = {
  children: ReactNode;
  isAdminRoute?: boolean;
};

export default function ProtectedRoute({ children, isAdminRoute = false }: Props) {
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = !isAdminRoute ? true : user?.roles.includes("Admin")

  return (user && isAdmin) ? <>{children}</> : <Navigate to="/Login" state={{ from: location }} replace />;
}
