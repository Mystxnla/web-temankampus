import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNav from './BottomNav';
import ProfessionalHelpModal from './ProfessionalHelpModal';

// Semua screen pakai paper warm (#C8BA96) — konsisten dengan Figma design
const AppLayout = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#C8BA96' }}>
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0 min-h-screen">
        <Topbar onOpenHelp={() => setIsHelpModalOpen(true)} />
        <main className="flex-1 w-full">
          <Outlet context={{ openHelpModal: () => setIsHelpModalOpen(true) }} />
        </main>
      </div>

      <BottomNav />

      <ProfessionalHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
};

export default AppLayout;

