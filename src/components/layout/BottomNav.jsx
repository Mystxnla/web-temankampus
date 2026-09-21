import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Smile, Clock, MessageCircle, Users } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

const BottomNav = () => {
  const { urgentTasks } = useTasks();

  const mobileNavItems = [
    { to: '/dashboard', label: 'Beranda', icon: Home },
    {
      to: '/tasks',
      label: 'Tugas',
      icon: CheckSquare,
      badge: urgentTasks.length > 0 ? urgentTasks.length : null,
    },
    { to: '/mood', label: 'Mood', icon: Smile },
    { to: '/focus', label: 'Fokus', icon: Clock },
    { to: '/curhat', label: 'Mimi', icon: MessageCircle },
    { to: '/community', label: 'Komunitas', icon: Users },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] px-2 py-2 flex items-center justify-around"
      style={{
        backgroundColor: '#FFFFFF',
      }}
    >
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all relative ${
                isActive
                  ? 'text-slate-900 font-extrabold'
                  : 'text-slate-400 hover:text-slate-700 font-medium'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative flex items-center justify-center">
                  {/* Active pill background */}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-xl bg-slate-100 -m-1 -mx-2.5"
                    />
                  )}
                  <Icon
                    className={`w-5 h-5 relative z-10 transition-colors ${
                      isActive ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-sm z-20">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] mt-1 tracking-tight relative z-10 ${
                    isActive ? 'text-slate-900 font-extrabold' : 'text-slate-500 font-semibold'
                  }`}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
