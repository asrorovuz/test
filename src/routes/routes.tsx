import { lazy } from "react";

// auth apge 
const LoginPage = lazy(() => import("../pages/auth/login"));
const AuthPage = lazy(() => import("../pages/auth"));
const RegisterPage = lazy(() => import("../pages/auth/register"));


// dashpoard page 
const DashboardPage = lazy(() => import("../pages/dashboard"));

export { LoginPage, RegisterPage, DashboardPage, AuthPage }