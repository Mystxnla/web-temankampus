import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { MoodProvider } from './context/MoodContext';

import AppLayout from './components/layout/AppLayout';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import MoodPage from './pages/MoodPage';
import FocusTimerPage from './pages/FocusTimerPage';
import CurhatAIPage from './pages/CurhatAIPage';
import CommunityPage from './pages/CommunityPage';
import PremiumPage from './pages/PremiumPage';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <MoodProvider>
          <Routes>
            {/* Public Screens */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* Authenticated Web App Screens (with Sidebar & Topbar) */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/mood" element={<MoodPage />} />
              <Route path="/focus" element={<FocusTimerPage />} />
              <Route path="/curhat" element={<CurhatAIPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/premium" element={<PremiumPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </MoodProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
