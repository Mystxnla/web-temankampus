import React, { createContext, useContext, useState, useEffect } from 'react';
import initialMoodData from '../mock-data/moods.json';
import { hasStorageConsent } from './PrivacyContext';

const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('temankampus_mood_history_v2');
      if (saved) return JSON.parse(saved);
      const oldSaved = localStorage.getItem('temankampus_mood_history');
      if (oldSaved && !oldSaved.includes('2024') && !oldSaved.includes('2026-09')) {
        return JSON.parse(oldSaved);
      }
    } catch {
      // ignore storage errors
    }
    return initialMoodData.history;
  });

  const [alertDismissed, setAlertDismissed] = useState(false);

  useEffect(() => {
    if (hasStorageConsent()) {
      localStorage.setItem('temankampus_mood_history_v2', JSON.stringify(history));
    }
  }, [history]);

  const options = initialMoodData.options;
  const recommendations = initialMoodData.recommendations;

  // Check if user logged today
  const todayStr = new Date().toISOString().split('T')[0];
  const todayMood = history.find(h => h.date === todayStr);
  const hasCheckedInToday = Boolean(todayMood);

  // Check if last 3 consecutive check-ins are negative ('stres' or 'lelah')
  const checkConsecutiveNegative = () => {
    if (history.length < 3) return false;
    const lastThree = history.slice(0, 3);
    return lastThree.every(item => item.moodId === 'stres' || item.moodId === 'lelah');
  };

  const isConsecutiveNegative = checkConsecutiveNegative() && !alertDismissed;

  const logMood = (moodId, note = '', tags = [], energyLevel = 3) => {
    const selectedOption = options.find(o => o.id === moodId) || options[0];
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const now = new Date();
    const dayName = days[now.getDay()];

    const newEntry = {
      id: `mood_${Date.now()}`,
      date: todayStr,
      dayName,
      moodId,
      label: selectedOption.label,
      emoji: selectedOption.emoji,
      score: selectedOption.score,
      energyLevel,
      tags: tags.length > 0 ? tags : ['Check-in Harian'],
      note: note || `Kondisi terasa ${selectedOption.label.toLowerCase()} hari ini.`
    };

    // If today already logged, replace; else prepend
    setHistory(prev => {
      const filtered = prev.filter(item => item.date !== todayStr);
      return [newEntry, ...filtered];
    });

    setAlertDismissed(false);
    return newEntry;
  };

  const dismissAlert = () => setAlertDismissed(true);

  return (
    <MoodContext.Provider
      value={{
        history,
        options,
        recommendations,
        todayMood,
        hasCheckedInToday,
        isConsecutiveNegative,
        logMood,
        dismissAlert
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => useContext(MoodContext);
