import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  HeartHandshake,
  Check,
  Clock,
  ShieldCheck,
  LogOut,
  Sparkles,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';
import { useMood } from '../../context/MoodContext';
import KucingMascot from '../KucingMascot';

const ROUTE_META = {
  '/dashboard': { title: 'Beranda', hint: 'Cek kabarmu dan atur ritme pelan-pelan' },
  '/mood': { title: 'Mood Tracker', hint: 'Catat perasaan dan energimu tanpa menghakimi' },
  '/curhat': { title: 'Curhat ke Mimi', hint: 'Ruang cerita privat kapan pun kamu butuh' },
  '/community': { title: 'Komunitas Sebaya', hint: 'Berbagi cerita dengan sesama mahasiswa' },
  '/tasks': { title: 'Tugas Kuliah', hint: 'Susun prioritas satu per satu' },
  '/focus': { title: 'Ruang Fokus', hint: 'Belajar tenang dengan jeda teratur' },
  '/premium': { title: 'Paket Pro', hint: 'Dukungan tambahan untuk satu semester' },
};

const Topbar = ({ onOpenHelp, onOpenPrivacy }) => {
  const { user, logout } = useAuth();
  const { urgentTasks } = useTasks();
  const { hasCheckedInToday } = useMood();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [readNotifIds, setReadNotifIds] = useState([]);

  const notifRef = useRef(null);
  const accountRef = useRef(null);

  const notifications = useMemo(() => {
    const items = [];
    if (urgentTasks.length > 0) {
      items.push({
        id: 'urgent_task',
        title: `${urgentTasks.length} tugas prioritas tinggi`,
        desc: `${urgentTasks[0].title} (${urgentTasks[0].dueLabel || 'Segera'}).`,
        time: 'Aktif',
        to: '/tasks',
      });
    }
    if (!hasCheckedInToday) {
      items.push({
        id: 'mood_checkin',
        title: 'Check-in mood harian',
        desc: 'Luangkan 1 menit untuk menyapa perasaanmu hari ini.',
        time: 'Hari ini',
        to: '/mood',
      });
    }
    items.push({
      id: 'community_update',
      title: 'Diskusi baru di komunitas sebaya',
      desc: 'Lihat cerita terbaru atau bagikan pengalamanmu secara anonim.',
      time: 'Komunitas',
      to: '/community',
    });
    return items.map((item) => ({
      ...item,
      read: readNotifIds.includes(item.id),
    }));
  }, [urgentTasks, hasCheckedInToday, readNotifIds]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    };
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
        setShowAccountMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const routeInfo = ROUTE_META[location.pathname] || {
    title: 'TemanKampus',
    hint: '',
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tasks?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setReadNotifIds(notifications.map((n) => n.id));
  };

  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
    navigate('/');
  };

  return (
    <header className="h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 bg-paper/95 backdrop-blur-sm border-b border-line select-none">
      {/* Page context */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          to="/dashboard"
          aria-label="Beranda TemanKampus"
          className="shrink-0 lg:hidden"
        >
          <KucingMascot pose="mark" size={28} />
        </Link>
        <div className="flex items-baseline gap-2.5 min-w-0">
          <span className="text-sm font-medium text-ink truncate">{routeInfo.title}</span>
          {routeInfo.hint && (
            <span className="hidden md:inline text-xs text-ink-muted truncate">
              · {routeInfo.hint}
            </span>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <form onSubmit={handleSearchSubmit} className="relative hidden lg:block">
          <Search
            className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            strokeWidth={1.5}
          />
          <input
            aria-label="Cari tugas"
            className="w-48 h-8 pl-9 pr-3 text-xs rounded-lg bg-paper-card border border-line text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent transition-colors duration-150"
            placeholder="Cari tugas"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <button
          type="button"
          onClick={onOpenHelp}
          aria-label="Bantuan krisis dan layanan konseling profesional"
          className="h-8 px-2.5 sm:px-3 rounded-lg bg-calm-surface border border-calm-border text-xs font-medium text-accent hover:bg-accent/15 transition-colors duration-150 flex items-center gap-1.5 active:scale-[0.98]"
          title="Layanan konseling dan dukungan profesional (119 ext 8)"
        >
          <HeartHandshake className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          <span className="sm:hidden">Bantuan</span>
          <span className="hidden sm:inline">Butuh bantuan</span>
        </button>

        <button
          type="button"
          onClick={onOpenPrivacy}
          title="Privasi & hapus data"
          aria-label="Privasi dan hapus data lokal"
          className="w-8 h-8 rounded-lg bg-paper-card border border-line text-ink-secondary hover:text-ink hover:bg-paper-raised flex items-center justify-center transition-colors duration-150 active:scale-[0.98]"
        >
          <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowAccountMenu(false);
            }}
            title="Notifikasi"
            aria-label="Notifikasi"
            aria-expanded={showNotifications}
            className="w-8 h-8 rounded-lg bg-paper-card border border-line text-ink-secondary hover:text-ink hover:bg-paper-raised flex items-center justify-center relative transition-colors duration-150 active:scale-[0.98]"
          >
            <Bell className="w-4 h-4" strokeWidth={1.5} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-paper-card border border-line-strong shadow-float overflow-hidden z-50 animate-enter">
              <div className="flex items-center justify-between px-4 py-3 border-b border-line">
                <span className="text-xs font-medium text-ink">
                  Notifikasi
                  {unreadCount > 0 && (
                    <span className="ml-1.5 font-mono text-ink-muted tabular">
                      {unreadCount}
                    </span>
                  )}
                </span>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-xs text-accent hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Tandai dibaca
                  </button>
                )}
              </div>
              <div className="divide-y divide-line max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      setReadNotifIds((prev) =>
                        prev.includes(n.id) ? prev : [...prev, n.id]
                      );
                      setShowNotifications(false);
                      navigate(n.to);
                    }}
                    className={`w-full text-left px-4 py-3 transition-colors duration-150 hover:bg-paper-raised ${
                      n.read ? 'opacity-70' : 'bg-paper-card'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-medium text-ink flex items-center gap-1.5">
                        {!n.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        )}
                        {n.title}
                      </span>
                      <span className="font-mono text-[11px] text-ink-muted flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3" strokeWidth={1.5} />
                        {n.time}
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      {n.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Account dropdown */}
        <div className="relative" ref={accountRef}>
          <button
            type="button"
            onClick={() => {
              setShowAccountMenu((prev) => !prev);
              setShowNotifications(false);
            }}
            aria-label="Menu akun dan profil"
            aria-expanded={showAccountMenu}
            className="w-8 h-8 rounded-lg bg-accent text-paper-card font-mono text-xs font-medium flex items-center justify-center hover:bg-accent-hover transition-colors duration-150"
            title="Menu akun"
          >
            {user?.avatar || 'TK'}
          </button>

          {showAccountMenu && (
            <div className="absolute right-0 mt-2 w-60 rounded-xl bg-paper-card border border-line-strong shadow-float overflow-hidden z-50 animate-enter">
              <div className="px-4 py-3 border-b border-line">
                <p className="text-xs font-semibold text-ink truncate">
                  {user?.name || 'Mahasiswa'}
                </p>
                <p className="text-[11px] text-ink-muted truncate mt-0.5">
                  {user?.isGuest
                    ? 'Mode Tamu Anonim'
                    : user?.university || 'Mahasiswa Indonesia'}
                </p>
              </div>
              <div className="p-1.5 space-y-0.5 text-xs">
                <Link
                  to="/premium"
                  onClick={() => setShowAccountMenu(false)}
                  className="w-full px-3 py-2 rounded-lg text-ink-secondary hover:text-ink hover:bg-paper-raised flex items-center gap-2 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                  <span>{user?.isPremium ? 'Paket Pro Aktif' : 'Lihat Paket Pro'}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setShowAccountMenu(false);
                    onOpenPrivacy();
                  }}
                  className="w-full px-3 py-2 rounded-lg text-ink-secondary hover:text-ink hover:bg-paper-raised flex items-center gap-2 transition-colors text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-ink-muted" strokeWidth={1.5} />
                  <span>Privasi & hapus data</span>
                </button>
                <Link
                  to="/auth"
                  onClick={() => setShowAccountMenu(false)}
                  className="w-full px-3 py-2 rounded-lg text-ink-secondary hover:text-ink hover:bg-paper-raised flex items-center gap-2 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-ink-muted" strokeWidth={1.5} />
                  <span>Ganti akun / masuk</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full px-3 py-2 rounded-lg text-semantic-danger hover:bg-semantic-danger-soft flex items-center gap-2 transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Keluar ke halaman awal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
