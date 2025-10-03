import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectIfLoggedIn?: boolean; // optional: redirect logged-in users
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectIfLoggedIn = false,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);

  // If this route should redirect logged-in users (like login/register)
  if (redirectIfLoggedIn && token) {
    return <Navigate to="/" replace />;
  }

  // If this route requires login
  if (!redirectIfLoggedIn && !token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
