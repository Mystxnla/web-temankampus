import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Smile, Clock, MessageCircle, Users } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

const BottomNav = () => {
  const { urgentTasks } = useTasks();

  const mobileNavItems = [
    { to: '/dashboard', label: 'Beranda',   icon: Home },
    { to: '/tasks',     label: 'Tugas',     icon: CheckSquare,
      badge: urgentTasks.length > 0 ? urgentTasks.length : null },
    { to: '/mood',      label: 'Mood',      icon: Smile },
    { to: '/focus',     label: 'Fokus',     icon: Clock },
    { to: '/curhat',    label: 'Mimi',      icon: MessageCircle },
    { to: '/community', label: 'Komunitas', icon: Users },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-2 py-2 flex items-center justify-around"
      style={{
        backgroundColor: '#FFFBEF',
        borderTop: '2.37px solid #75685B',
        boxShadow: '0 -4px 0 0 #F7F0DA',
      }}
    >
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all relative"
          >
            {({ isActive }) => (
              <>
                <div className="relative flex items-center justify-center">
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-xl -m-1 -mx-2.5"
                      style={{ background: '#F7F0DA' }}
                    />
                  )}
                  <Icon
                    className="w-5 h-5 relative z-10 transition-colors"
                    style={{ color: isActive ? '#8B0A0A' : '#75685B' }}
                  />
                  {item.badge && (
                    <span
                      className="absolute -top-1.5 -right-2.5 min-w-[18px] h-4 px-1 rounded-full text-[9px] font-black flex items-center justify-center shadow-sm z-20"
                      style={{ background: '#8B0A0A', color: '#F7F0DA' }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className="text-[10px] mt-1 tracking-tight relative z-10 font-bold"
                  style={{ color: isActive ? '#8B0A0A' : '#75685B' }}
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
