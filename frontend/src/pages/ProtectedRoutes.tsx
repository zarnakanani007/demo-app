import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface Props {
  children: JSX.Element;
  adminOnly?: boolean;
  allowAdmin?: boolean;
  redirectIfLoggedIn?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ 
  children, 
  adminOnly = false, 
  allowAdmin = true,
  redirectIfLoggedIn = false 
}) => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  console.log('🛡️ ProtectedRoute:', { token, user: user?.role, adminOnly, allowAdmin });

  // Redirect logged-in users from auth pages
  if (redirectIfLoggedIn && token) {
    return <Navigate to={user?.role === "admin" ? "/dashboard" : "/home"} replace />;
  }

  // Require authentication
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only routes
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  // Block admin from user routes
  if (!allowAdmin && user?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;


