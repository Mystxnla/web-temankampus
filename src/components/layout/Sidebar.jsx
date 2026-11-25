import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  CheckSquare,
  Smile,
  Clock,
  MessageCircle,
  Users,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';
import KucingMascot from '../KucingMascot';

const Sidebar = () => {
  const { user } = useAuth();
  const { urgentTasks } = useTasks();

  const calmNav = [
    { to: '/dashboard', label: 'Beranda', icon: Home },
    { to: '/mood', label: 'Mood Tracker', icon: Smile },
    { to: '/curhat', label: 'Curhat ke Mimi', icon: MessageCircle },
    { to: '/community', label: 'Komunitas Sebaya', icon: Users },
  ];

  const studyNav = [
    {
      to: '/tasks',
      label: 'Tugas Kuliah',
      icon: CheckSquare,
      count: urgentTasks.length > 0 ? urgentTasks.length : null,
    },
    { to: '/focus', label: 'Ruang Fokus', icon: Clock },
  ];

  const renderLink = (item) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `h-9 px-3 rounded-lg flex items-center gap-2.5 text-sm transition-colors duration-150 ease-unslop ${
            isActive
              ? 'bg-paper-card text-ink font-medium border border-line shadow-subtle'
              : 'text-ink-secondary hover:bg-paper-raised hover:text-ink border border-transparent'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              className={`w-4 h-4 shrink-0 ${isActive ? 'text-accent' : 'text-ink-muted'}`}
              strokeWidth={1.5}
            />
            <span className="flex-1 truncate">{item.label}</span>
            {item.count !== null && item.count !== undefined && (
              <span className="font-mono text-xs tabular text-accent font-medium">
                {item.count}
              </span>
            )}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <aside className="hidden lg:flex w-[256px] h-screen flex-col justify-between p-4 sticky top-0 shrink-0 bg-paper-sidebar border-r border-line select-none">
      <div>
        {/* Brand */}
        <Link
          to="/"
          title="Kembali ke halaman utama TemanKampus"
          aria-label="TemanKampus — Kembali ke halaman utama"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-paper-raised transition-colors duration-150"
        >
          <KucingMascot pose="mark" size={32} className="shrink-0" />
          <div className="min-w-0">
            <span className="text-[15px] font-semibold text-ink tracking-[-0.01em] block leading-tight">
              TemanKampus
            </span>
            <span className="text-xs text-ink-muted block leading-tight mt-0.5">
              Teman cerita & ritme kuliah
            </span>
          </div>
        </Link>

        {/* Grouped Navigation (Mental Health First) */}
        <nav aria-label="Navigasi utama" className="mt-6">
          <p className="px-3 mb-2 text-xs font-medium text-ink-muted">Ruang Tenang</p>
          <div className="space-y-1">{calmNav.map(renderLink)}</div>

          <p className="px-3 mt-6 mb-2 text-xs font-medium text-ink-muted">Ritme Kuliah</p>
          <div className="space-y-1">{studyNav.map(renderLink)}</div>
        </nav>
      </div>

      {/* Bottom: Gentle note + Account & Pro link */}
      <div className="space-y-3 pt-4 border-t border-line">
        <div className="px-3 py-2.5 rounded-lg bg-calm-surface/80 border border-calm-border">
          <p className="text-xs text-ink-secondary leading-relaxed">
            Pelan-pelan saja hari ini. Istirahat juga bagian dari prosesmu bertahan.
          </p>
        </div>

        <Link
          to="/premium"
          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-paper-raised transition-colors duration-150 group"
        >
          <div className="w-8 h-8 rounded-lg bg-accent text-paper-card font-mono text-xs font-medium flex items-center justify-center shrink-0">
            {user?.avatar || 'TK'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-ink truncate">
              {user?.name || 'Mahasiswa'}
            </p>
            <p className="text-xs text-ink-muted truncate">
              {user?.isPremium ? 'Paket Pro aktif' : 'Lihat Paket Pro'}
            </p>
          </div>
          <ChevronRight
            className="w-4 h-4 text-ink-muted group-hover:text-ink transition-colors shrink-0"
            strokeWidth={1.5}
          />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
