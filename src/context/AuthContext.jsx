import React, { createContext, useContext, useState, useEffect } from 'react';
import initialUserData from '../mock-data/user.json';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('temankampus_user');
    return saved ? JSON.parse(saved) : initialUserData;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('temankampus_auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('temankampus_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('temankampus_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  const login = (customData = null) => {
    if (customData) {
      setUser(prev => ({ ...prev, ...customData }));
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const upgradeToPremium = () => {
    setUser(prev => ({
      ...prev,
      isPremium: true
    }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, upgradeToPremium, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
