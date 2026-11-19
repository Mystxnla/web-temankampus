import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, HeartHandshake, Check, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
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

const Topbar = ({ onOpenHelp }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Tenggat tugas hari ini',
      desc: 'Revisi Bab 2: Tinjauan Pustaka pukul 23:59 WIB.',
      time: '1 jam lalu',
      read: false,
      to: '/tasks',
    },
    {
      id: 2,
      title: 'Check-in mood harian',
      desc: 'Luangkan 1 menit untuk menyapa perasaanmu hari ini.',
      time: '3 jam lalu',
      read: false,
      to: '/mood',
    },
    {
      id: 3,
      title: 'Balasan di komunitas',
      desc: 'Dimas Saputra membalas diskusi skripsi di forum sebaya.',
      time: '5 jam lalu',
      read: false,
      to: '/community',
    },
  ]);

  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 bg-paper/95 backdrop-blur-sm border-b border-line select-none">
      {/* Page context */}
      <div className="flex items-center gap-3 min-w-0">
        <Link to="/dashboard" className="shrink-0 lg:hidden">
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
      <div className="flex items-center gap-2">
        <form onSubmit={handleSearchSubmit} className="relative hidden lg:block">
          <Search
            className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            strokeWidth={1.5}
          />
          <input
            className="w-48 h-8 pl-9 pr-3 text-xs rounded-lg bg-paper-card border border-line text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent transition-colors duration-150"
            placeholder="Cari tugas"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <button
          onClick={onOpenHelp}
          className="h-8 px-3 rounded-lg bg-calm-surface border border-calm-border text-xs font-medium text-accent hover:bg-accent/15 transition-colors duration-150 flex items-center gap-1.5 active:scale-[0.98]"
          title="Layanan konseling dan dukungan profesional"
        >
          <HeartHandshake className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          <span className="hidden sm:inline">Butuh bantuan</span>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifikasi"
            aria-label="Notifikasi"
            className="w-8 h-8 rounded-lg bg-paper-card border border-line text-ink-secondary hover:text-ink hover:bg-paper-raised flex items-center justify-center relative transition-colors duration-150 active:scale-[0.98]"
          >
            <Bell className="w-4 h-4" strokeWidth={1.5} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-paper-card border border-line-strong shadow-float overflow-hidden z-50 animate-enter">
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
                      setNotifications((prev) =>
                        prev.map((item) =>
                          item.id === n.id ? { ...item, read: true } : item
                        )
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

        {/* Account switch */}
        <Link
          to="/auth"
          className="w-8 h-8 rounded-lg bg-accent text-paper-card font-mono text-xs font-medium flex items-center justify-center hover:bg-accent-hover transition-colors duration-150"
          title="Akun"
        >
          {user?.avatar || 'TK'}
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
