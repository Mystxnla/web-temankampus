import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, ShieldAlert, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import KucingMascot from '../KucingMascot';

const Topbar = ({ onOpenHelp }) => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat pagi';
    if (hour < 15) return 'Selamat siang';
    if (hour < 18) return 'Selamat sore';
    return 'Selamat malam';
  };

  const currentDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(new Date());

  return (
    <header
      className="h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none"
      style={{
        backgroundColor: '#DDD0A8',
        borderBottom: '2.37px solid #5C4A3A',
        boxShadow: '0 4px 0 0 #C8BA96',
      }}
    >
      {/* Greeting */}
      <div className="flex items-center gap-3">
        {/* Mobile logo — kucing kecil */}
        <div className="shrink-0 lg:hidden">
          <KucingMascot pose="happy" size={40} />
        </div>
        <div>
          <h1 className="font-display text-sm sm:text-base text-[#8B0A0A] leading-tight tracking-wide">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Teman'}! 👋
          </h1>
          <p className="font-hand text-[11px] text-[#1F3A7A] hidden sm:block">
            {currentDate}
          </p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <input
            className="w-52 pl-9 pr-4 py-2 text-xs rounded-full border-2 border-[#5C4A3A] focus:outline-none focus:border-[#8B0A0A] text-[#2B2B2B] placeholder-[#5C4A3A] transition font-bold"
            style={{ background: '#DDD0A8' }}
            placeholder="Cari tugas, topik..."
            type="text"
          />
          <Search className="w-3.5 h-3.5 text-[#5C4A3A] absolute left-3 top-2.5" />
        </div>

        {/* Counseling */}
        <button
          onClick={onOpenHelp}
          className="text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 transition border-2"
          style={{ background: '#F6D0D6', borderColor: '#5C4A3A', color: '#8B0A0A' }}
          title="Layanan bantuan & konseling"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B0A0A] animate-pulse" />
          <span className="hidden sm:inline text-[11px]">Konseling</span>
          <ShieldAlert className="w-3.5 h-3.5 sm:hidden" />
        </button>

        {/* Pro / Upgrade */}
        {user?.isPremium ? (
          <Link to="/premium"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border-2 transition"
            style={{ background: '#4A8DB7', borderColor: '#342B27', color: '#DDD0A8' }}>
            <Sparkles className="w-3.5 h-3.5" /><span>Pro Aktif</span>
          </Link>
        ) : (
          <Link to="/premium"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border-2 transition hover:bg-[#C8BA96]"
            style={{ background: '#DDD0A8', borderColor: '#4A8DB7', color: '#4A8DB7' }}>
            <Sparkles className="w-3.5 h-3.5" /><span>Upgrade</span>
          </Link>
        )}

        {/* Bell */}
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center relative transition icon-btn border-2"
          style={{ background: '#DDD0A8', borderColor: '#5C4A3A', color: '#2B2B2B' }}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#8B0A0A]" />
        </button>

        {/* Avatar */}
        <Link to="/auth"
          className="w-8 h-8 rounded-full flex items-center justify-center transition shadow-sm icon-btn border-2"
          style={{ background: '#8B0A0A', borderColor: '#342B27', color: '#C8BA96' }}
          title="Beralih Akun"
        >
          <span className="font-display text-[10px]">{user?.avatar || 'TK'}</span>
        </Link>
      </div>
    </header>
  );
};

export default Topbar;

