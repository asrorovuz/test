import { createBrowserRouter, Navigate } from "react-router";
import { AuthPage, DashboardPage, LoginPage, RegisterPage } from "./routes";
import { PrivateRoute, RedirectRoute } from "./private-router";

const Router = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/auth",
    element: (
      <RedirectRoute>
        <AuthPage />
      </RedirectRoute>
    ),
    children: [
      {
        path: "/auth",
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: "/auth/login",
        element: (
          <RedirectRoute>
            <LoginPage />
          </RedirectRoute>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <RedirectRoute>
            <RegisterPage />
          </RedirectRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <>404</>,
  },
];

const router = createBrowserRouter(Router);

export default router;
