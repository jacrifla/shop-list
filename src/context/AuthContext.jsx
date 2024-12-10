import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Recupera o estado de autenticação e userId do localStorage, se existirem
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    return storedAuthStatus ? JSON.parse(storedAuthStatus) : false;
  });
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem('userId') || null;
  });

  // Funções para fazer login e logout
  const login = (response) => {
    if (response && response.success) {
      const { id } = response.data; 
      setIsAuthenticated(true);
      setUserId(id);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('userId', id); 
    } 
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId'); 
  };

  // Sincroniza com localStorage sempre que `isAuthenticated` ou `userId` mudar
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    if (userId !== null) {
      localStorage.setItem('userId', userId);
    }
  }, [isAuthenticated, userId]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
