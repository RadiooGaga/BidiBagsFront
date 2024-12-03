import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';


export const ProtectedRoute = ({ children, required }) => {
  const { user } = useAuth();

  if (!user) {
      return <Navigate to="/register" />;
  }

  if (user.rol !== required) {
      return <Navigate to="/account" />; 
      // Redirige si el rol no es válido
  }

  return children;
};