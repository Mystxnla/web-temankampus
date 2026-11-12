import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, CheckSquare, Smile, Clock, MessageCircle, Users, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';

const Sidebar = () => {
  const { user } = useAuth();
  const { urgentTasks } = useTasks();

  const navItems = [
    { to: '/dashboard', label: 'Beranda',             icon: Home,          badge: null },
    { to: '/tasks',     label: 'Tugas Kuliah',        icon: CheckSquare,
      badge: urgentTasks.length > 0 ? urgentTasks.length : null },
    { to: '/mood',      label: 'Mood Tracker',        icon: Smile,         badge: null },
    { to: '/focus',     label: 'Ruang Fokus',         icon: Clock,         badge: 'LIVE' },
    { to: '/curhat',    label: 'Teman Curhat (Mimi)', icon: MessageCircle, badge: null },
    { to: '/community', label: 'Komunitas Sebaya',    icon: Users,         badge: null },
    { to: '/premium',   label: 'Langganan Pro',       icon: Sparkles,
      badge: user?.isPremium ? 'PRO' : 'UPGRADE' },
  ];

  return (
    <aside
      className="hidden lg:flex w-[272px] min-h-screen flex-col justify-between p-5 sticky top-0 shrink-0 select-none"
      style={{
        backgroundColor: '#FFFBEF',
        borderRight: '2.37px solid #75685B',
        boxShadow: '4px 0 0 0 #F7F0DA',
      }}
    >
      <div className="space-y-6">
        {/* Brand */}
        <Link to="/dashboard" className="flex items-center gap-3 group mt-1">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center font-display text-lg shadow-md shrink-0 group-hover:scale-105 transition-transform"
            style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA' }}
          >
            TK
          </div>
          <div>
            <span className="font-display text-xl text-[#8B0A0A] tracking-wide block leading-none">
              TemanKampus
            </span>
            <span className="font-hand text-[11px] text-[#1F3A7A] block mt-0.5">
              Ruang Tenang & Tumbuh
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav aria-label="Main Navigation" className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm transition-all font-bold ${
                    isActive
                      ? 'bg-[#8B0A0A] text-[#F7F0DA] shadow-md'
                      : 'text-[#2B2B2B] hover:bg-[#F7F0DA] hover:text-[#8B0A0A]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className="shrink-0"
                      style={{ width: '18px', height: '18px',
                        color: isActive ? '#F7F0DA' : '#75685B' }}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-black"
                        style={isActive
                          ? { background: 'rgba(247,240,218,0.3)', color: '#F7F0DA' }
                          : typeof item.badge === 'number'
                          ? { background: '#8B0A0A', color: '#F7F0DA' }
                          : { background: '#4A8DB7', color: '#FFFBEF' }
                        }
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

      {/* Bottom */}
      <div className="space-y-3 pt-4 border-t-2 border-[#F7F0DA]">
        {/* Wellness quote */}
        <div className="p-3.5 rounded-2xl" style={{ background: '#F7F0DA', border: '1.5px solid #75685B' }}>
          <p className="font-hand text-[12px] text-[#1F3A7A] leading-relaxed">
            "Istirahat bukan tanda menyerah, tapi cara tubuhmu bersiap lebih kuat." 🌸
          </p>
        </div>

        {/* User Profile */}
        <Link
          to="/premium"
          className="flex items-center gap-3 p-2.5 rounded-2xl transition cursor-pointer hover:bg-[#F7F0DA]"
          style={{ border: '1.5px solid #75685B' }}
        >
          <div
            className="w-10 h-10 rounded-full font-black text-xs flex items-center justify-center shadow-sm shrink-0"
            style={{ background: '#8B0A0A', color: '#F7F0DA' }}
          >
            {user?.avatar || 'TK'}
          </div>
          <div className="overflow-hidden min-w-0 flex-1">
            <p className="text-xs font-bold text-[#2B2B2B] truncate">{user?.name || 'Mahasiswa'}</p>
            <p className="font-hand text-[11px] text-[#1F3A7A] truncate">
              {user?.major} · Smt {user?.semester}
            </p>
          </div>
          {user?.isPremium && (
            <span className="text-[9px] font-black px-2 py-0.5 rounded-full shrink-0"
              style={{ background: '#4A8DB7', color: '#FFFBEF' }}>
              PRO
            </span>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
