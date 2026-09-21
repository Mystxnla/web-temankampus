import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNav from './BottomNav';
import ProfessionalHelpModal from './ProfessionalHelpModal';

// Map each route to its Headspace-style solid pastel color
const SCREEN_COLORS = {
  '/dashboard': { bg: '#5C92D1', light: '#A8C8EE', text: 'white' },
  '/tasks':     { bg: '#F7BF52', light: '#FCDDA0', text: '#1A1A2E' },
  '/mood':      { bg: '#6FB899', light: '#AEDCC9', text: 'white' },
  '/focus':     { bg: '#F28E66', light: '#F8BFA3', text: 'white' },
  '/curhat':    { bg: '#987DC7', light: '#C8B4E3', text: 'white' },
  '/community': { bg: '#419F98', light: '#86CCC8', text: 'white' },
  '/premium':   { bg: '#4F4D82', light: '#8B89BB', text: 'white' },
};

const AppLayout = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const location = useLocation();

  const screenColor = SCREEN_COLORS[location.pathname] || { bg: '#5C92D1', light: '#A8C8EE', text: 'white' };

  return (
    <div
      className="min-h-screen flex selection:bg-white/30"
      style={{ backgroundColor: screenColor.bg, transition: 'background-color 0.5s ease' }}
    >
      {/* Desktop Sidebar */}
      <Sidebar screenColor={screenColor} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0 min-h-screen">
        {/* Topbar Navigation */}
        <Topbar
          onOpenHelp={() => setIsHelpModalOpen(true)}
          screenColor={screenColor}
        />

        {/* Dynamic Route Page Container — no extra padding, pages own their layout */}
        <main className="flex-1 w-full">
          <Outlet context={{ openHelpModal: () => setIsHelpModalOpen(true), screenColor }} />
        </main>
      </div>

      {/* Mobile Bottom Navigation Dock */}
      <BottomNav screenColor={screenColor} />

      {/* Global Professional Emergency Counseling Modal */}
      <ProfessionalHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
};

export default AppLayout;
