import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, ShieldAlert, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Topbar = ({ onOpenHelp, screenColor = {} }) => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat pagi';
    if (hour < 15) return 'Selamat siang';
    if (hour < 18) return 'Selamat sore';
    return 'Selamat malam';
  };

  const currentDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  return (
    <header
      className="h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none topbar-frosted"
      style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}
    >
      {/* Greeting Info */}
      <div className="flex items-center gap-3">
        {/* Mobile brand badge */}
        <div
          className="w-8 h-8 rounded-xl text-white flex items-center justify-center font-display text-sm font-black lg:hidden shadow-sm shrink-0"
          style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
        >
          TK
        </div>
        <div>
          <h1 className="text-sm sm:text-base font-bold text-white leading-tight">
            {getGreeting()}, <span className="font-black">{user?.name?.split(' ')[0] || 'Teman'}!</span> 👋
          </h1>
          <p className="text-[10px] sm:text-[11px] text-white/70 font-medium hidden sm:block">
            {currentDate}
          </p>
        </div>
      </div>

      {/* Top Right Actions */}
      <div className="flex items-center gap-2">
        {/* Quick Search */}
        <div className="relative hidden md:block">
          <input
            className="w-52 pl-9 pr-4 py-2 bg-white/15 text-xs rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/50 transition"
            placeholder="Cari tugas, topik..."
            type="text"
          />
          <Search className="w-3.5 h-3.5 text-white/60 absolute left-3 top-2.5" />
        </div>

        {/* Emergency Support */}
        <button
          onClick={onOpenHelp}
          className="text-xs bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition"
          title="Layanan bantuan & konseling"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="hidden sm:inline text-[11px]">Konseling</span>
          <ShieldAlert className="w-3.5 h-3.5 sm:hidden" />
        </button>

        {/* Pro Badge or Upgrade */}
        {user?.isPremium ? (
          <Link
            to="/premium"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-300/90 text-yellow-900 text-xs font-bold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pro Aktif</span>
          </Link>
        ) : (
          <Link
            to="/premium"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Upgrade</span>
          </Link>
        )}

        {/* Notification Bell */}
        <button className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center relative transition icon-btn">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-400" />
        </button>

        {/* User Avatar */}
        <Link
          to="/auth"
          className="w-8 h-8 rounded-full bg-white/90 text-gray-800 flex items-center justify-center transition shadow-sm icon-btn"
          title="Beralih Akun"
        >
          <span className="text-[10px] font-black">{user?.avatar || 'TK'}</span>
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
