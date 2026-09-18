import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNav from './BottomNav';
import ProfessionalHelpModal from './ProfessionalHelpModal';

const AppLayout = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F3FC] text-dark font-sans flex selection:bg-primary-container selection:text-primary">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        {/* Topbar Navigation */}
        <Topbar onOpenHelp={() => setIsHelpModalOpen(true)} />

        {/* Dynamic Route Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet context={{ openHelpModal: () => setIsHelpModalOpen(true) }} />
        </main>
      </div>

      {/* Mobile Bottom Navigation Dock */}
      <BottomNav />

      {/* Global Professional Emergency Counseling Modal */}
      <ProfessionalHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
};

export default AppLayout;
