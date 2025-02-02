import { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router";
interface RouteProps {
  children?: ReactNode;
}

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const getToken = localStorage.getItem("token") || "";

  return getToken ? (
    children || <Outlet />
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

const RedirectRoute: FC<RouteProps> = ({ children }) => {
  const getToken = localStorage.getItem("token") || "";
  return getToken ? <Navigate to="/" replace /> : children || <Outlet />;
};

export { PrivateRoute, RedirectRoute };
