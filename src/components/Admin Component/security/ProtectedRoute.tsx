// src/components/ProtectedRoute.tsx
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {

  if (!isAuthenticated) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
