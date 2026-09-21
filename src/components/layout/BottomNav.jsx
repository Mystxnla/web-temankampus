import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Smile, Clock, MessageCircle, Users } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

const BottomNav = ({ screenColor = {} }) => {
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
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-2 py-2 flex items-center justify-around"
      style={{
        backgroundColor: 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.25)',
      }}
    >
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all relative ${
                isActive ? 'text-white scale-105' : 'text-white/60 hover:text-white/90'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  {/* Active pill background */}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.22)', margin: '-4px -6px', borderRadius: '12px' }}
                    />
                  )}
                  <Icon className="w-5 h-5 relative z-10" />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-white text-gray-800 text-[9px] font-black flex items-center justify-center shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-0.5 font-bold tracking-tight ${isActive ? 'text-white' : 'text-white/60'}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomNav;
