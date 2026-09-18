import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  CheckSquare,
  Smile,
  Clock,
  MessageCircle,
  Users,
  Sparkles,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';

const Sidebar = () => {
  const { user } = useAuth();
  const { urgentTasks } = useTasks();

  const navItems = [
    {
      to: '/dashboard',
      label: 'Beranda',
      icon: Home,
      badge: null
    },
    {
      to: '/tasks',
      label: 'Tugas Kuliah',
      icon: CheckSquare,
      badge: urgentTasks.length > 0 ? urgentTasks.length : null,
      badgeColor: 'bg-primary-container text-primary'
    },
    {
      to: '/mood',
      label: 'Mood Tracker',
      icon: Smile,
      badge: null
    },
    {
      to: '/focus',
      label: 'Ruang Fokus',
      icon: Clock,
      badge: 'LIVE',
      badgeColor: 'bg-secondary-container text-secondary font-black'
    },
    {
      to: '/curhat',
      label: 'Teman Curhat (Mimi)',
      icon: MessageCircle,
      badge: null
    },
    {
      to: '/community',
      label: 'Komunitas Sebaya',
      icon: Users,
      badge: null
    },
    {
      to: '/premium',
      label: 'Langganan Pro',
      icon: Sparkles,
      badge: user?.isPremium ? 'PRO' : 'UPGRADE',
      badgeColor: user?.isPremium ? 'bg-amber-100 text-amber-700 font-black' : 'bg-primary/10 text-primary font-bold'
    }
  ];

  return (
    <aside className="w-72 bg-white/95 backdrop-blur-md border-r border-border-light min-h-screen flex flex-col justify-between p-6 sticky top-0 shrink-0 select-none shadow-sm hidden lg:flex">
      <div className="space-y-8">
        {/* Brand Logo inspired by Pop Lilac style */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 font-display text-2xl tracking-wider group-hover:scale-105 transition-transform">
            TK
          </div>
          <div>
            <span className="font-display text-2xl text-dark tracking-wide block leading-none">
              TEMANKAMPUS
            </span>
            <span className="text-[10px] text-primary font-bold tracking-widest block uppercase mt-0.5">
              Ruang Tenang & Tumbuh
            </span>
          </div>
        </Link>

        {/* Main Navigation Menu */}
        <nav aria-label="Main Navigation" className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all group font-semibold ${
                    isActive
                      ? 'bg-primary text-white font-bold shadow-md shadow-primary/25'
                      : 'text-[#3A3350] hover:bg-surface-container hover:text-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-5 h-5 transition ${
                        isActive ? 'text-white' : 'text-[#8E84A3] group-hover:text-primary'
                      }`}
                    />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`ml-auto text-[11px] px-2.5 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/25 text-white font-black'
                            : item.badgeColor
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive && !item.badge && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-white animate-ping" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom: Gentle Wellness Quote & User Profile Card */}
      <div className="space-y-4 pt-4 border-t border-border-light">
        {/* Mini reminder callout */}
        <div className="p-3.5 bg-surface-container-low border border-[#E9D5FF] rounded-2xl">
          <div className="flex items-center gap-2 text-secondary font-bold text-xs mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            Pengingat Hangat
          </div>
          <p className="text-[12px] text-[#5A4F72] leading-relaxed">
            "Istirahat bukan tanda menyerah, tapi cara tubuhmu bersiap lebih kuat." 🌸
          </p>
        </div>

        {/* User Profile Badge */}
        <Link
          to="/premium"
          className="flex items-center gap-3 p-2.5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-border-light transition cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-primary text-white font-extrabold text-xs flex items-center justify-center shadow-sm shrink-0">
            {user?.avatar || 'TK'}
          </div>
          <div className="overflow-hidden min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-dark truncate">{user?.name || 'Mahasiswa'}</p>
              {user?.isPremium && (
                <span className="text-[9px] bg-amber-200 text-amber-900 font-extrabold px-1.5 py-0.2 rounded">
                  PRO
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#786D94] truncate">
              {user?.major} · Smt {user?.semester}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8E84A3] ml-auto shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
