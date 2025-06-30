// src/components/ProtectedRoute.tsx
import { useAuth } from "@/context/AuthContext";
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  const { userId } = useAuth();
  if (!isAuthenticated) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/" />;
  }

  // if (!userId) {
  //   return <Navigate to="/" replace />;
  // }
  return children;
};

export default ProtectedRoute;
