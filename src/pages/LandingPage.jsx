import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Clock, Smile, MessageCircle, ArrowRight,
  ShieldCheck, Sparkles, ChevronRight, Play, Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedPreviewMood, setSelectedPreviewMood] = useState('baik');

  const features = [
    {
      icon: CheckCircle2,
      badge: 'PRODUKTIVITAS',
      badgeColor: '#8B0A0A',
      title: 'Task Manager',
      desc: 'Kelola tugas per mata kuliah, deadline, dan kalender akademik.',
      to: '/tasks',
      numColor: '#8B0A0A',
      num: '01',
    },
    {
      icon: Smile,
      badge: 'KESEHATAN MENTAL',
      badgeColor: '#4A8DB7',
      title: 'Mood Check-In',
      desc: 'Validasi perasaanmu setiap hari dan deteksi dini burnout.',
      to: '/mood',
      numColor: '#4A8DB7',
      num: '02',
    },
    {
      icon: Clock,
      badge: 'FOKUS TERARAH',
      badgeColor: '#8B0A0A',
      title: 'Pomodoro Timer',
      desc: 'Belajar 25 menit dengan ambience hujan kampus yang menenangkan.',
      to: '/focus',
      numColor: '#8B0A0A',
      num: '03',
    },
    {
      icon: MessageCircle,
      badge: 'AI COMPANION',
      badgeColor: '#4A8DB7',
      title: 'Teman Curhat Mimi',
      desc: 'Ruang aman curhat tanpa dihakimi, tersedia 24/7 bersama AI empatik.',
      to: '/curhat',
      numColor: '#4A8DB7',
      num: '04',
    },
  ];

  const testimonials = [
    {
      quote: 'Dulu selalu overthinking tiap mau bimbingan. Pomodoro sama Mimi ngebantu banget bikin aku ga panik.',
      name: 'Nadira Az-Zahra', campus: 'Teknik Informatika · UI', avatar: 'NA', tag: 'Skripsi Tepat Waktu 🎓',
    },
    {
      quote: 'Mood tracker-nya ngingetin kalau aku udah 3 hari begadang. Fitur pengingat rehat penyelamat dari burnout.',
      name: 'Rian Pratama', campus: 'Teknik Sipil · UNNES', avatar: 'RP', tag: 'Pengguna 4 Bulan 📅',
    },
    {
      quote: 'Forum komunitasnya suportif, ga toxic kaya medsos lain. Nemu teman senasib di perantauan.',
      name: 'Alya Salsabila', campus: 'Psikologi · UGM', avatar: 'AS', tag: 'Komunitas Sebaya 👥',
    },
  ];

  const handleDemoAccess = () => { login(); navigate('/dashboard'); };

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#F3F3F1' }}>
      {/* ── Sticky Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 topbar-frosted"
        style={{
          backgroundColor: '#FFFBEF',
          borderBottom: '2px solid #75685B',
          boxShadow: '0 4px 0 0 #F7F0DA',
        }}
      >
        <div className="h-16 max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl font-display text-base flex items-center justify-center shadow-sm"
              style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA' }}
            >
              TK
            </div>
            <span className="font-display text-lg tracking-tight" style={{ color: '#8B0A0A' }}>
              TemanKampus
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {['#fitur', '#mood-preview', '#testimoni'].map((href, i) => (
              <a
                key={href}
                href={href}
                className="text-xs font-bold uppercase tracking-wider transition"
                style={{ color: '#75685B' }}
              >
                {['Fitur', 'Mood Preview', 'Cerita Teman'][i]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/auth"
              className="text-xs font-bold px-3 py-1.5 transition"
              style={{ color: '#75685B' }}
            >
              Masuk
            </Link>
            <button
              onClick={handleDemoAccess}
              className="hs-btn text-xs py-2 px-5 font-black"
              style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA', border: '2px solid #342B27' }}
            >
              Daftar Gratis ✨
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="pt-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="pt-12 pb-0 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left: Headline */}
          <div className="flex-1 flex flex-col items-start gap-5">
            {/* Category chip */}
            <span
              className="hs-chip text-xs uppercase tracking-widest"
              style={{ background: '#F7F0DA', color: '#8B0A0A', border: '1px solid #75685B' }}
            >
              🌸 Ruang Aman Mahasiswa Indonesia
            </span>

            {/* 2-line bold headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-none" style={{ color: '#8B0A0A' }}>
              Kuliah lebih<br />
              <span style={{ color: '#4A8DB7' }}>tenang & berdaya.</span>
            </h1>

            <p className="font-hand text-sm sm:text-base max-w-lg" style={{ color: '#1F3A7A' }}>
              Kelola deadline, lacak mood, fokus belajar, dan curhat ke Mimi AI — semua dalam satu platform yang memahami perjalananmu sebagai mahasiswa.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 py-3">
              {[['500+', 'Mahasiswa', '#8B0A0A'], ['98%', 'Lebih Tenang', '#4A8DB7'], ['24/7', 'Teman AI', '#8B0A0A']].map(([val, lbl, col]) => (
                <div key={lbl}>
                  <div className="font-display text-2xl leading-none" style={{ color: col }}>{val}</div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-wider mt-0.5"
                    style={{ color: '#75685B' }}
                  >
                    {lbl}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleDemoAccess}
                className="hs-btn font-black"
                style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA', border: '2px solid #342B27' }}
              >
                Mulai Sekarang (Gratis) <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleDemoAccess}
                className="hs-btn"
                style={{ backgroundColor: '#FFFBEF', color: '#1F3A7A', border: '2px solid #75685B' }}
              >
                <Play className="w-4 h-4" /> Demo Langsung
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px]" style={{ color: '#75685B' }}>
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              Gratis · Email kampus .ac.id dapat 3 bulan bonus Premium
            </div>
          </div>

          {/* Right: App preview card */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <div
              className="rounded-3xl p-4 w-72 sm:w-80"
              style={{ background: '#FFFBEF', border: '2.37px solid #75685B', boxShadow: '0 0 0 12px #F7F0DA, 0 0 0 16px #342B27' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#8B0A0A' }} />
                <span
                  className="text-xs font-black uppercase tracking-wide"
                  style={{ color: '#2B2B2B' }}
                >
                  Dashboard Nadira
                </span>
                <span
                  className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: '#4A8DB7', color: '#FFFBEF' }}
                >
                  Smt 6
                </span>
              </div>
              <div className="space-y-2.5">
                <div
                  className="p-2.5 rounded-xl flex items-center justify-between"
                  style={{ background: '#F7F0DA', border: '1px solid #75685B' }}
                >
                  <div>
                    <p className="text-[10px] font-black uppercase" style={{ color: '#8B0A0A' }}>
                      Deadline Hari Ini
                    </p>
                    <p className="text-xs font-bold" style={{ color: '#2B2B2B' }}>Revisi Bab 2 Metodologi</p>
                  </div>
                  <span
                    className="text-[11px] font-bold px-2 py-1 rounded-lg"
                    style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA' }}
                  >
                    23:59
                  </span>
                </div>
                <div
                  className="p-2.5 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #8B0A0A, #4A2010)' }}
                >
                  <p className="text-[10px] font-bold uppercase mb-0.5" style={{ color: 'rgba(247,240,218,0.7)' }}>
                    Mimi AI
                  </p>
                  <p className="text-xs leading-snug" style={{ color: '#F7F0DA' }}>
                    "Kamu sudah sampai sejauh ini, Nadira! Satu langkah lagi." 🌸
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 p-2.5 rounded-xl"
                  style={{ background: '#F7F0DA', border: '1px solid #75685B' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
                    style={{ background: '#8B0A0A', color: '#F7F0DA' }}
                  >
                    25
                  </div>
                  <div>
                    <p className="text-[11px] font-bold" style={{ color: '#2B2B2B' }}>Pomodoro Aktif</p>
                    <p className="text-[10px]" style={{ color: '#75685B' }}>Hujan Kampus · Sesi ke-3</p>
                  </div>
                  <Flame className="w-4 h-4 ml-auto" style={{ color: '#8B0A0A' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Section ── */}
      <div
        className="mt-12 py-16 px-5 sm:px-8"
        id="fitur"
        style={{ backgroundColor: '#FFFBEF', borderTop: '2.37px solid #75685B' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="hs-chip text-xs"
              style={{ background: '#F7F0DA', color: '#8B0A0A', border: '1px solid #75685B' }}
            >
              Solusi Terintegrasi
            </span>
            <h2 className="font-display text-3xl sm:text-4xl mt-3" style={{ color: '#2B2B2B' }}>
              Satu tempat untuk<br />akademik & kesehatan mental.
            </h2>
            <p
              className="font-hand text-sm mt-2 max-w-xl mx-auto"
              style={{ color: '#1F3A7A' }}
            >
              Tidak perlu berganti-ganti aplikasi. TemanKampus mengurus semuanya.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-3xl cursor-pointer transition group"
                  style={{ background: '#FFFBEF', border: '2px solid #75685B' }}
                  onClick={() => handleDemoAccess()}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: f.numColor + '20' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: f.numColor }} />
                  </div>
                  <div
                    className="font-display text-3xl leading-none mb-1"
                    style={{ color: f.numColor }}
                  >
                    {f.num}
                  </div>
                  <span
                    className="hs-chip text-[10px] mb-2 inline-block"
                    style={{ backgroundColor: f.numColor, color: '#F7F0DA' }}
                  >
                    {f.badge}
                  </span>
                  <h3 className="font-black text-base mb-1" style={{ color: '#2B2B2B' }}>{f.title}</h3>
                  <p className="font-hand text-xs leading-relaxed mb-4" style={{ color: '#1F3A7A' }}>{f.desc}</p>
                  <button
                    className="text-xs font-bold flex items-center gap-1 transition"
                    style={{ color: f.numColor }}
                  >
                    Coba Fitur <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mood Preview ── */}
        <div id="mood-preview" className="max-w-3xl mx-auto mt-16">
          <div
            className="p-6 sm:p-10 text-center space-y-6 rounded-3xl"
            style={{ background: '#F7F0DA', border: '2.37px solid #75685B', boxShadow: '0 0 0 12px #F7F0DA, 0 0 0 16px #342B27' }}
          >
            <span
              className="hs-chip text-xs"
              style={{ background: '#8B0A0A', color: '#F7F0DA' }}
            >
              ✨ Coba Interaktif
            </span>
            <h2 className="font-display text-2xl sm:text-3xl" style={{ color: '#8B0A0A' }}>
              Bagaimana perasaan<br />kuliahmu hari ini?
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { id: 'baik', emoji: '✨', label: 'Semangat & Siap' },
                { id: 'biasa', emoji: '🌤️', label: 'Biasa Aja' },
                { id: 'stres', emoji: '🌧️', label: 'Kewalahan' },
                { id: 'lelah', emoji: '☕', label: 'Butuh Rehat' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedPreviewMood(m.id)}
                  className="hs-btn py-2 px-4 text-xs"
                  style={
                    selectedPreviewMood === m.id
                      ? { backgroundColor: '#8B0A0A', color: '#F7F0DA', border: '2px solid #342B27' }
                      : { backgroundColor: '#FFFBEF', color: '#2B2B2B', border: '2px solid #75685B' }
                  }
                >
                  <span className="text-base">{m.emoji}</span> {m.label}
                </button>
              ))}
            </div>
            <div
              className="p-4 rounded-2xl text-left"
              style={{ background: '#FFFBEF', border: '1px solid #75685B' }}
            >
              {selectedPreviewMood === 'baik' && (
                <p className="font-hand text-sm leading-relaxed" style={{ color: '#1F3A7A' }}>
                  "Manfaatkan momentum ini! Selesaikan 1 tugas terberatmu dengan Pomodoro 25 menit." ✨
                </p>
              )}
              {selectedPreviewMood === 'biasa' && (
                <p className="font-hand text-sm leading-relaxed" style={{ color: '#1F3A7A' }}>
                  "Hari biasa adalah kanvas terbaik untuk konsistensi. Susun 3 to-do dan nikmati secangkir teh." 🌤️
                </p>
              )}
              {selectedPreviewMood === 'stres' && (
                <p className="font-hand text-sm leading-relaxed" style={{ color: '#1F3A7A' }}>
                  "Jangan paksa selesaikan semua hari ini. Mimi siap menemanimu kapan saja." 🌧️
                </p>
              )}
              {selectedPreviewMood === 'lelah' && (
                <p className="font-hand text-sm leading-relaxed" style={{ color: '#1F3A7A' }}>
                  "Tutup laptop 15 menit, napas 4-7-8, minum air dingin. Tubuhmu berterima kasih." ☕
                </p>
              )}
            </div>
            <button
              onClick={handleDemoAccess}
              className="text-xs font-bold uppercase tracking-wider hover:underline"
              style={{ color: '#8B0A0A' }}
            >
              Buka Dashboard Lengkap →
            </button>
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div id="testimoni" className="max-w-7xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl" style={{ color: '#2B2B2B' }}>
              Suara teman<br />mahasiswamu.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-5 flex flex-col justify-between rounded-3xl"
                style={{ background: '#FFFBEF', border: '2px solid #75685B' }}
              >
                <div>
                  <span
                    className="hs-chip text-[10px] mb-3 inline-block"
                    style={{ background: '#F7F0DA', color: '#8B0A0A', border: '1px solid #75685B' }}
                  >
                    {t.tag}
                  </span>
                  <p
                    className="font-hand text-sm leading-relaxed italic mb-4"
                    style={{ color: '#1F3A7A' }}
                  >
                    "{t.quote}"
                  </p>
                </div>
                <div
                  className="flex items-center gap-2.5 pt-3"
                  style={{ borderTop: '1px solid #F7F0DA' }}
                >
                  <div
                    className="w-9 h-9 rounded-full font-black text-xs flex items-center justify-center"
                    style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA' }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: '#2B2B2B' }}>{t.name}</p>
                    <p className="text-[10px]" style={{ color: '#75685B' }}>{t.campus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="max-w-4xl mx-auto mt-16">
          <div
            className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #8B0A0A 0%, #4A2010 100%)' }}
          >
            <div className="absolute top-4 right-6 opacity-20 text-6xl">✨</div>
            <div className="relative z-10 space-y-5">
              <div
                className="w-16 h-16 rounded-full font-display text-2xl flex items-center justify-center mx-auto"
                style={{ backgroundColor: 'rgba(247,240,218,0.2)', color: '#F7F0DA' }}
              >
                TK
              </div>
              <h2 className="font-display text-3xl sm:text-4xl" style={{ color: '#F7F0DA' }}>
                Mulai semester ini<br />dengan lebih tenang.
              </h2>
              <p className="text-sm" style={{ color: 'rgba(247,240,218,0.85)' }}>
                Bergabung bersama ribuan mahasiswa. Daftar dalam 1 menit.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleDemoAccess}
                  className="hs-btn font-black"
                  style={{ backgroundColor: '#F7F0DA', color: '#8B0A0A', border: '2px solid #342B27' }}
                >
                  Buka Dashboard (Gratis) <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/premium"
                  className="hs-btn"
                  style={{ backgroundColor: 'rgba(247,240,218,0.15)', color: '#F7F0DA', border: '2px solid rgba(247,240,218,0.3)' }}
                >
                  Pelajari Pro Plan
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer
          className="max-w-7xl mx-auto mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: '2px solid #75685B', color: '#75685B' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl font-display text-sm flex items-center justify-center"
              style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA' }}
            >
              TK
            </div>
            <div>
              <span className="font-black text-sm" style={{ color: '#2B2B2B' }}>TemanKampus</span>
              <p className="text-[10px]">Ruang Tenang & Tumbuh Mahasiswa Indonesia</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {['/dashboard', '/tasks', '/mood', '/curhat', '/community', '/premium'].map((path, i) => (
              <Link
                key={path}
                to={path}
                className="font-medium transition hover:underline"
                style={{ color: '#75685B' }}
              >
                {['Dashboard', 'Task Manager', 'Mood Tracker', 'Curhat AI', 'Komunitas', 'Premium'][i]}
              </Link>
            ))}
          </div>
          <p>© 2026 TemanKampus · Prototype MVP</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
