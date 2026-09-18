import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Topbar = ({ onOpenHelp }) => {
  const { user, isAuthenticated } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'SELAMAT PAGI';
    if (hour < 15) return 'SELAMAT SIANG';
    if (hour < 18) return 'SELAMAT SORE';
    return 'SELAMAT MALAM';
  };

  const currentDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-border-light px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Greeting Info */}
      <div className="flex items-center gap-3">
        {/* Mobile brand badge for screens where sidebar is hidden */}
        <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-display text-lg tracking-wider lg:hidden shadow-sm shrink-0">
          TK
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-display text-dark tracking-wide flex items-center gap-2">
            {getGreeting()}, {user?.name?.split(' ')[0]?.toUpperCase() || 'TEMAN'}!{' '}
            <span className="text-base sm:text-lg">👋</span>
          </h1>
          <p className="text-[11px] sm:text-xs text-[#786D94] font-medium hidden sm:block">
            {currentDate} · {user?.university || 'Kampus'} (27°C Cerah)
          </p>
        </div>
      </div>

      {/* Top Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Bar */}
        <div className="relative hidden md:block">
          <input
            className="w-56 lg:w-64 pl-9 pr-4 py-2 bg-[#F8F3FC] text-xs rounded-full border border-[#E9DCFA] focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark placeholder-[#9E94B8] transition"
            placeholder="Cari tugas, topik, atau tips..."
            type="text"
          />
          <Search className="w-4 h-4 text-[#9E94B8] absolute left-3 top-2.5" />
        </div>

        {/* Emergency Support / Ruang Aman button */}
        <button
          onClick={onOpenHelp}
          className="text-xs bg-primary-container hover:bg-[#FFC6DC] text-primary font-bold px-3 sm:px-4 py-2 rounded-full flex items-center gap-1.5 transition uppercase tracking-wider shadow-sm shrink-0"
          title="Layanan bantuan & konseling darurat"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="hidden xs:inline">Konseling Cepat</span>
          <ShieldAlert className="w-3.5 h-3.5 sm:hidden" />
        </button>

        {/* Pro Badge or Upgrade button */}
        {user?.isPremium ? (
          <Link
            to="/premium"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Pro Aktif</span>
          </Link>
        ) : (
          <Link
            to="/premium"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20 text-xs font-bold transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Upgrade Pro</span>
          </Link>
        )}

        {/* Notification Bell */}
        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface-container-low hover:bg-surface-container border border-[#E9DCFA] text-dark hover:text-primary flex items-center justify-center relative transition">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
        </button>

        {/* User Account / Auth trigger */}
        <Link
          to="/auth"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-dark hover:bg-black text-white flex items-center justify-center transition shadow-sm"
          title="Beralih Akun / Autentikasi"
        >
          <span className="text-xs font-bold">{user?.avatar || 'TK'}</span>
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
