import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redireciona para a página de login caso o usuário não esteja autenticado
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
