import React, { createContext, useContext, useState, useEffect } from 'react';

const PrivacyContext = createContext();

const CONSENT_KEY = 'temankampus_privacy_consent';
const SESSION_TEMP_KEY = 'temankampus_privacy_temp';

export const hasStorageConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
};

export const PrivacyProvider = ({ children }) => {
  const [consentStatus, setConsentStatus] = useState(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY) === 'accepted') return 'accepted';
      if (sessionStorage.getItem(SESSION_TEMP_KEY) === 'temporary') return 'temporary';
    } catch {
      // ignore storage errors
    }
    return 'pending';
  });

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const openHelpModal = () => setIsHelpModalOpen(true);
  const closeHelpModal = () => setIsHelpModalOpen(false);

  const openPrivacyModal = () => setIsPrivacyModalOpen(true);
  const closePrivacyModal = () => setIsPrivacyModalOpen(false);

  const acceptStorageConsent = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      sessionStorage.removeItem(SESSION_TEMP_KEY);
    } catch {
      // ignore
    }
    setConsentStatus('accepted');
  };

  const useTemporarySession = () => {
    try {
      sessionStorage.setItem(SESSION_TEMP_KEY, 'temporary');
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      // ignore
    }
    setConsentStatus('temporary');
  };

  const clearAllUserData = () => {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (key && key.startsWith('temankampus_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
      sessionStorage.removeItem(SESSION_TEMP_KEY);
    } catch {
      // ignore
    }
    setConsentStatus('pending');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isHelpModalOpen) setIsHelpModalOpen(false);
        if (isPrivacyModalOpen) setIsPrivacyModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHelpModalOpen, isPrivacyModalOpen]);

  return (
    <PrivacyContext.Provider
      value={{
        consentStatus,
        acceptStorageConsent,
        useTemporarySession,
        clearAllUserData,
        isHelpModalOpen,
        openHelpModal,
        closeHelpModal,
        isPrivacyModalOpen,
        openPrivacyModal,
        closePrivacyModal,
      }}
    >
      {children}
    </PrivacyContext.Provider>
  );
};

export const usePrivacy = () => useContext(PrivacyContext);
