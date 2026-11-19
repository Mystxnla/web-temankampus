import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNav from './BottomNav';
import ProfessionalHelpModal from './ProfessionalHelpModal';

const AppLayout = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-paper text-ink">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0 min-h-screen">
        <Topbar onOpenHelp={() => setIsHelpModalOpen(true)} />
        <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
