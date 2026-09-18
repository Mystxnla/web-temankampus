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
      badge: urgentTasks.length > 0 ? urgentTasks.length : null
    },
    { to: '/mood', label: 'Mood', icon: Smile },
    { to: '/focus', label: 'Fokus', icon: Clock },
    { to: '/curhat', label: 'Mimi', icon: MessageCircle },
    { to: '/community', label: 'Komunitas', icon: Users }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-border-light px-2 py-2 flex items-center justify-around shadow-lg">
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive ? 'text-primary font-bold scale-105' : 'text-[#786D94] hover:text-dark'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-primary text-white text-[9px] font-black flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomNav;
