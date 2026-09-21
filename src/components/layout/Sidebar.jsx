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
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';

const Sidebar = ({ screenColor = {} }) => {
  const { user } = useAuth();
  const { urgentTasks } = useTasks();
  const bgColor = screenColor.bg || '#5C92D1';

  const navItems = [
    { to: '/dashboard', label: 'Beranda', icon: Home, badge: null },
    {
      to: '/tasks', label: 'Tugas Kuliah', icon: CheckSquare,
      badge: urgentTasks.length > 0 ? urgentTasks.length : null,
    },
    { to: '/mood', label: 'Mood Tracker', icon: Smile, badge: null },
    { to: '/focus', label: 'Ruang Fokus', icon: Clock, badge: 'LIVE' },
    { to: '/curhat', label: 'Teman Curhat (Mimi)', icon: MessageCircle, badge: null },
    { to: '/community', label: 'Komunitas Sebaya', icon: Users, badge: null },
    {
      to: '/premium', label: 'Langganan Pro', icon: Sparkles,
      badge: user?.isPremium ? 'PRO' : 'UPGRADE',
    },
  ];

  return (
    <aside
      className="w-68 min-h-screen flex flex-col justify-between p-6 sticky top-0 shrink-0 select-none hidden lg:flex"
      style={{ backgroundColor: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)', borderRight: '1px solid rgba(255,255,255,0.20)', width: '272px' }}
    >
      <div className="space-y-8">
        {/* Brand Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div
            className="w-11 h-11 rounded-2xl text-white flex items-center justify-center font-display text-lg font-black shadow-lg group-hover:scale-105 transition-transform"
            style={{ backgroundColor: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}
          >
            TK
          </div>
          <div>
            <span className="font-display text-xl text-white font-black tracking-tight block leading-none">
              TemanKampus
            </span>
            <span className="text-[10px] text-white/70 font-bold tracking-widest block uppercase mt-0.5">
              Ruang Tenang & Tumbuh
            </span>
          </div>
        </Link>

        {/* Main Navigation */}
        <nav aria-label="Main Navigation" className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-full text-sm transition-all group font-bold ${
                    isActive
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-white/85 hover:bg-white/20 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4.5 h-4.5 shrink-0 transition ${
                        isActive ? 'text-gray-700' : 'text-white/75 group-hover:text-white'
                      }`}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span className="flex-1 text-sm">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                          isActive
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-white/25 text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom */}
      <div className="space-y-3 pt-4">
        {/* Wellness quote */}
        <div className="p-3.5 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
          <p className="text-[11.5px] text-white/80 leading-relaxed italic">
            "Istirahat bukan tanda menyerah, tapi cara tubuhmu bersiap lebih kuat." 🌸
          </p>
        </div>

        {/* User Profile Badge */}
        <Link
          to="/premium"
          className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/15 transition cursor-pointer group"
          style={{ border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <div
            className="w-10 h-10 rounded-full text-gray-800 font-extrabold text-xs flex items-center justify-center shadow-sm shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
          >
            {user?.avatar || 'TK'}
          </div>
          <div className="overflow-hidden min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">{user?.name || 'Mahasiswa'}</p>
            <p className="text-[11px] text-white/65 truncate">
              {user?.major} · Smt {user?.semester}
            </p>
          </div>
          {user?.isPremium && (
            <span className="text-[9px] bg-yellow-300 text-yellow-900 font-extrabold px-2 py-0.5 rounded-full shrink-0">
              PRO
            </span>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
