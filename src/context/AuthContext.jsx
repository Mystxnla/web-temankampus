import React, { createContext, useContext, useState, useEffect } from 'react';
import initialUserData from '../mock-data/user.json';
import { hasStorageConsent } from './PrivacyContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('temankampus_user');
      return saved ? JSON.parse(saved) : initialUserData;
    } catch {
      return initialUserData;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('temankampus_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [waterMl, setWaterMl] = useState(() => {
    try {
      const saved = sessionStorage.getItem('temankampus_water_ml');
      return saved ? Number(saved) : 1250;
    } catch {
      return 1250;
    }
  });

  const [completedFocusSessions, setCompletedFocusSessions] = useState(() => {
    try {
      const saved = sessionStorage.getItem('temankampus_focus_sessions');
      return saved ? Number(saved) : 4;
    } catch {
      return 4;
    }
  });

  useEffect(() => {
    if (hasStorageConsent()) {
      localStorage.setItem('temankampus_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (hasStorageConsent()) {
      localStorage.setItem('temankampus_auth', isAuthenticated ? 'true' : 'false');
    }
  }, [isAuthenticated]);

  const addWater = (amount = 250) => {
    setWaterMl((prev) => {
      const next = Math.min(prev + amount, 3000);
      try {
        sessionStorage.setItem('temankampus_water_ml', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const recordFocusSession = (minutes = 25) => {
    setCompletedFocusSessions((prev) => {
      const next = prev + 1;
      try {
        sessionStorage.setItem('temankampus_focus_sessions', String(next));
      } catch {
        // ignore
      }
      return next;
    });
    setUser((prev) => ({
      ...prev,
      focusMinutesToday: (prev.focusMinutesToday || 105) + minutes,
    }));
  };

  const login = (customData = null) => {
    if (customData) {
      setUser((prev) => ({ ...prev, ...customData, isGuest: false }));
    }
    setIsAuthenticated(true);
  };

  const loginAsGuest = () => {
    setUser((prev) => ({
      ...prev,
      name: 'Tamu Anonim',
      email: '',
      university: 'Mode Tamu',
      faculty: 'Anonim',
      major: 'Mahasiswa',
      avatar: 'TA',
      isGuest: true,
    }));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const upgradeToPremium = () => {
    setUser((prev) => ({
      ...prev,
      isPremium: true,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginAsGuest,
        logout,
        upgradeToPremium,
        setUser,
        waterMl,
        addWater,
        completedFocusSessions,
        recordFocusSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
