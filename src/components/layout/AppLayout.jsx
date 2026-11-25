import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNav from './BottomNav';
import { usePrivacy } from '../../context/PrivacyContext';

const AppLayout = () => {
  const { openHelpModal, openPrivacyModal, consentStatus } = usePrivacy();

  return (
    <div className="min-h-screen flex bg-paper text-ink">
      <Sidebar />

      <div
        className={`flex-1 flex flex-col min-w-0 min-h-screen ${
          consentStatus === 'pending' ? 'pb-36 lg:pb-24' : 'pb-16 lg:pb-0'
        }`}
      >
        <Topbar onOpenHelp={openHelpModal} onOpenPrivacy={openPrivacyModal} />
        <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet context={{ openHelpModal, openPrivacyModal }} />
        </main>
      </div>

      <BottomNav />
    </div>
  );
};

export default AppLayout;
