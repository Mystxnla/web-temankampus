import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Clock, Smile, MessageCircle, ArrowRight,
  ShieldCheck, School, Sparkles, Heart, ChevronRight, Play, Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BobiMascot from '../components/BobiMascot';

const BG = '#FF9266'; // Warm Apricot

const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedPreviewMood, setSelectedPreviewMood] = useState('baik');

  const features = [
    {
      icon: CheckCircle2, badge: 'PRODUKTIVITAS', title: 'Task Manager',
      desc: 'Kelola tugas per mata kuliah, deadline, dan kalender akademik.',
      to: '/tasks', color: '#F7BF52', textColor: '#7A5E00',
    },
    {
      icon: Smile, badge: 'KESEHATAN MENTAL', title: 'Mood Check-In',
      desc: 'Validasi perasaanmu setiap hari dan deteksi dini burnout.',
      to: '/mood', color: '#6FB899', textColor: '#1A5C42',
    },
    {
      icon: Clock, badge: 'FOKUS TERARAH', title: 'Pomodoro Timer',
      desc: 'Belajar 25 menit dengan ambience hujan kampus yang menenangkan.',
      to: '/focus', color: '#F28E66', textColor: '#7A3A10',
    },
    {
      icon: MessageCircle, badge: 'AI COMPANION', title: 'Teman Curhat Mimi',
      desc: 'Ruang aman curhat tanpa dihakimi, tersedia 24/7 bersama AI empatik.',
      to: '/curhat', color: '#987DC7', textColor: '#4A2A7A',
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
    <div className="min-h-screen font-sans" style={{ backgroundColor: BG }}>
      {/* ── Sticky Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: 'rgba(255,146,102,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <div className="h-16 max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/25 text-white font-black text-base flex items-center justify-center">TK</div>
            <span className="font-black text-lg text-white tracking-tight">TemanKampus</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {['#fitur', '#mood-preview', '#testimoni'].map((href, i) => (
              <a key={href} href={href}
                className="text-xs font-bold text-white/80 hover:text-white transition uppercase tracking-wider">
                {['Fitur', 'Mood Preview', 'Cerita Teman'][i]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/auth" className="text-xs font-bold text-white/80 hover:text-white transition px-3 py-1.5">Masuk</Link>
            <button
              onClick={handleDemoAccess}
              className="hs-btn bg-white text-orange-600 text-xs py-2 px-5 shadow-sm"
            >
              Daftar Gratis ✨
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="pt-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="pt-12 pb-0 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left: Bobi + Headline */}
          <div className="flex-1 flex flex-col items-start gap-5">
            {/* Category chip */}
            <span className="hs-chip bg-white/25 text-white text-xs uppercase tracking-widest">
              🌸 Ruang Aman Mahasiswa Indonesia
            </span>

            {/* 2-line bold headline */}
            <h1 className="hs-headline text-white text-5xl sm:text-6xl lg:text-7xl">
              Kuliah lebih<br />
              <span style={{ color: '#FFF1D0' }}>tenang & berdaya.</span>
            </h1>

            <p className="hs-subtext text-white/85 text-sm sm:text-base max-w-lg">
              Kelola deadline, lacak mood, fokus belajar, dan curhat ke Mimi AI — semua dalam satu platform yang memahami perjalananmu sebagai mahasiswa.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 py-3">
              {[['500+', 'Mahasiswa'], ['98%', 'Lebih Tenang'], ['24/7', 'Teman AI']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="font-black text-2xl text-white leading-none">{val}</div>
                  <div className="text-[10px] text-white/70 font-bold uppercase tracking-wider mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button onClick={handleDemoAccess}
                className="hs-btn bg-white text-orange-600 font-black shadow-md">
                Mulai Sekarang (Gratis) <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={handleDemoAccess}
                className="hs-btn bg-white/20 text-white border border-white/30">
                <Play className="w-4 h-4 fill-white" /> Demo Langsung
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-white/70 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              Gratis · Email kampus .ac.id dapat 3 bulan bonus Premium
            </div>
          </div>

          {/* Right: Bobi Mascot floating */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <BobiMascot pose="wave" size={200} accentColor="#FF9266" />
            {/* App preview card */}
            <div className="bg-white rounded-3xl shadow-card p-4 w-72 sm:w-80">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-xs font-black text-gray-800 uppercase tracking-wide">Dashboard Nadira</span>
                <span className="ml-auto text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">Smt 6</span>
              </div>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-orange-600 uppercase">Deadline Hari Ini</p>
                    <p className="text-xs font-bold text-gray-800">Revisi Bab 2 Metodologi</p>
                  </div>
                  <span className="text-[11px] font-bold text-orange-500 bg-orange-100 px-2 py-1 rounded-lg">23:59</span>
                </div>
                <div className="p-2.5 rounded-xl" style={{ background: '#987DC7' }}>
                  <p className="text-[10px] font-bold text-white/70 uppercase mb-0.5">Mimi AI</p>
                  <p className="text-xs text-white leading-snug">"Kamu sudah sampai sejauh ini, Nadira! Satu langkah lagi." 🌸</p>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: '#F28E66', color: 'white' }}>25</div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-800">Pomodoro Aktif</p>
                    <p className="text-[10px] text-gray-500">Hujan Kampus · Sesi ke-3</p>
                  </div>
                  <Flame className="w-4 h-4 text-orange-400 ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── White Card Section: Fitur ── */}
      <div className="mt-12 headspace-card py-16 px-5 sm:px-8" id="fitur">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="hs-chip" style={{ background: '#FFE3D9', color: '#C84A00' }}>Solusi Terintegrasi</span>
            <h2 className="hs-headline text-gray-900 text-3xl sm:text-4xl mt-3">
              Satu tempat untuk<br />akademik & kesehatan mental.
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">Tidak perlu berganti-ganti aplikasi. TemanKampus mengurus semuanya.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="hs-card p-5 border border-gray-100 shadow-card-sm group cursor-pointer"
                  onClick={() => handleDemoAccess()}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: f.color + '25' }}>
                    <Icon className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <span className="hs-chip text-[10px] mb-2 inline-block"
                    style={{ backgroundColor: f.color + '20', color: f.textColor }}>
                    {f.badge}
                  </span>
                  <h3 className="font-black text-gray-900 text-base mb-1">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{f.desc}</p>
                  <button className="text-xs font-bold flex items-center gap-1" style={{ color: f.color }}>
                    Coba Fitur <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mood Preview ── */}
        <div id="mood-preview" className="max-w-3xl mx-auto mt-16">
          <div className="headspace-card-full p-6 sm:p-10 text-center space-y-6" style={{ background: '#F0FFF8', border: '1.5px solid #AEDCC9' }}>
            <span className="hs-chip" style={{ background: '#6FB89920', color: '#1A5C42' }}>✨ Coba Interaktif</span>
            <h2 className="hs-headline text-gray-900 text-2xl sm:text-3xl">
              Bagaimana perasaan<br />kuliahmu hari ini?
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { id: 'baik', emoji: '✨', label: 'Semangat & Siap' },
                { id: 'biasa', emoji: '🌤️', label: 'Biasa Aja' },
                { id: 'stres', emoji: '🌧️', label: 'Kewalahan' },
                { id: 'lelah', emoji: '☕', label: 'Butuh Rehat' },
              ].map((m) => (
                <button key={m.id} onClick={() => setSelectedPreviewMood(m.id)}
                  className={`hs-btn py-2 px-4 text-xs ${selectedPreviewMood === m.id
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-green-400'}`}>
                  <span className="text-base">{m.emoji}</span> {m.label}
                </button>
              ))}
            </div>
            <div className="p-4 rounded-2xl bg-white border border-gray-100 text-left">
              {selectedPreviewMood === 'baik' && <p className="text-sm text-gray-700 leading-relaxed">"Manfaatkan momentum ini! Selesaikan 1 tugas terberatmu dengan Pomodoro 25 menit." ✨</p>}
              {selectedPreviewMood === 'biasa' && <p className="text-sm text-gray-700 leading-relaxed">"Hari biasa adalah kanvas terbaik untuk konsistensi. Susun 3 to-do dan nikmati secangkir teh." 🌤️</p>}
              {selectedPreviewMood === 'stres' && <p className="text-sm text-gray-700 leading-relaxed">"Jangan paksa selesaikan semua hari ini. Mimi siap menemanimu kapan saja." 🌧️</p>}
              {selectedPreviewMood === 'lelah' && <p className="text-sm text-gray-700 leading-relaxed">"Tutup laptop 15 menit, napas 4-7-8, minum air dingin. Tubuhmu berterima kasih." ☕</p>}
            </div>
            <button onClick={handleDemoAccess} className="text-xs font-bold text-green-600 hover:underline uppercase tracking-wider">
              Buka Dashboard Lengkap →
            </button>
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div id="testimoni" className="max-w-7xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h2 className="hs-headline text-gray-900 text-2xl sm:text-3xl">Suara teman<br />mahasiswamu.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="hs-card border border-gray-100 shadow-card-sm p-5 flex flex-col justify-between">
                <div>
                  <span className="hs-chip text-[10px] mb-3 inline-block"
                    style={{ background: '#FFE3D9', color: '#C84A00' }}>{t.tag}</span>
                  <p className="text-sm text-gray-600 leading-relaxed italic mb-4">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-orange-400 text-white font-black text-xs flex items-center justify-center">{t.avatar}</div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{t.name}</p>
                    <p className="text-[10px] text-gray-400">{t.campus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="rounded-4xl p-8 sm:p-12 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #FF9266 0%, #F28E66 40%, #987DC7 100%)' }}>
            <div className="absolute top-4 right-6 opacity-30 text-6xl">✨</div>
            <div className="relative z-10 space-y-5">
              <BobiMascot pose="wave" size={100} accentColor="#FF9266" className="mx-auto" />
              <h2 className="hs-headline text-white text-3xl sm:text-4xl">
                Mulai semester ini<br />dengan lebih tenang.
              </h2>
              <p className="text-white/85 text-sm">Bergabung bersama ribuan mahasiswa. Daftar dalam 1 menit.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button onClick={handleDemoAccess}
                  className="hs-btn bg-white text-orange-600 font-black shadow-md">
                  Buka Dashboard (Gratis) <ArrowRight className="w-4 h-4" />
                </button>
                <Link to="/premium" className="hs-btn bg-white/20 text-white border border-white/30">
                  Pelajari Pro Plan
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-400 text-white font-black text-sm flex items-center justify-center">TK</div>
            <div>
              <span className="font-black text-sm text-gray-800">TemanKampus</span>
              <p className="text-[10px]">Ruang Tenang & Tumbuh Mahasiswa Indonesia</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {['/dashboard', '/tasks', '/mood', '/curhat', '/community', '/premium'].map((path, i) => (
              <Link key={path} to={path} className="hover:text-orange-500 transition font-medium">
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
