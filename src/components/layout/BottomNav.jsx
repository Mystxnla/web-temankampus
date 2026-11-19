import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Smile, Clock, MessageCircle, Users } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

const BottomNav = () => {
  const { urgentTasks } = useTasks();

  const mobileNavItems = [
    { to: '/dashboard', label: 'Beranda', icon: Home },
    { to: '/mood', label: 'Mood', icon: Smile },
    { to: '/curhat', label: 'Mimi', icon: MessageCircle },
    {
      to: '/tasks',
      label: 'Tugas',
      icon: CheckSquare,
      badge: urgentTasks.length > 0 ? urgentTasks.length : null,
    },
    { to: '/focus', label: 'Fokus', icon: Clock },
    { to: '/community', label: 'Forum', icon: Users },
  ];

  return (
    <nav
      aria-label="Navigasi mobile"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-16 px-2 bg-paper-card/95 backdrop-blur-sm border-t border-line flex items-center justify-around"
    >
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-w-[48px] py-1.5 px-2 rounded-lg transition-colors duration-150 ${
                isActive ? 'text-accent bg-accent-soft' : 'text-ink-muted hover:text-ink'
              }`
            }
          >
            <div className="relative">
              <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-md bg-accent text-paper-card font-mono text-[10px] font-medium tabular flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium leading-none">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
