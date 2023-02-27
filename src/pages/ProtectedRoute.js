import { Alert } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // if (!user || (requireAdmin && !user.isAdmin)) {
  //   return <Navigate to='/' replace />;
  // }

  return children;
}
