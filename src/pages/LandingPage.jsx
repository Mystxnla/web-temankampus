import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  Smile,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  School,
  Sparkles,
  Heart,
  ChevronRight,
  Play,
  Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedPreviewMood, setSelectedPreviewMood] = useState('baik');

  const partnerCampuses = [
    { name: 'Universitas Indonesia (UI)', tag: 'Depok' },
    { name: 'Institut Teknologi Bandung (ITB)', tag: 'Ganesha' },
    { name: 'Universitas Gadjah Mada (UGM)', tag: 'Yogyakarta' },
    { name: 'Universitas Negeri Semarang (UNNES)', tag: 'Sekaran' },
    { name: 'Universitas Diponegoro (UNDIP)', tag: 'Tembalang' },
    { name: 'Universitas Airlangga (UNAIR)', tag: 'Surabaya' }
  ];

  const features = [
    {
      icon: CheckCircle2,
      badge: 'PRODUKTIVITAS',
      badgeColor: 'bg-primary-container text-primary',
      title: 'Task & Deadline Manager',
      desc: 'Kelola tugas per mata kuliah, atur prioritas, dan pantau deadline dalam tampilan list atau kalender akademik yang rapi.',
      color: 'border-[#EFE4FB]'
    },
    {
      icon: Smile,
      badge: 'KESEHATAN MENTAL',
      badgeColor: 'bg-secondary-container text-secondary',
      title: 'Mood Check-In & Jurnal Harian',
      desc: 'Validasi perasaanmu setiap hari dalam 10 detik. Dapatkan rekomendasi aktivitas dan deteksi dini jika kamu mengalami kejenuhan berulang.',
      color: 'border-[#E2CEFD]'
    },
    {
      icon: Clock,
      badge: 'FOKUS TERARAH',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      title: 'Pomodoro Focus Timer',
      desc: 'Belajar terstruktur 25 menit dengan iringan audio relaksasi hujan kampus. Dilengkapi pengingat rehat cerdas pencegah burnout.',
      color: 'border-[#C8E6C9]'
    },
    {
      icon: MessageCircle,
      badge: 'AI COMPANION 24/7',
      badgeColor: 'bg-primary/10 text-primary',
      title: 'Teman Curhat AI (Mimi)',
      desc: 'Ruang aman tumpahkan kekhawatiran bimbingan skripsi atau overthinking nilai kuliah tanpa dihakimi, dilengkapi proteksi krisis.',
      color: 'border-[#FFD9E8]'
    }
  ];

  const testimonials = [
    {
      quote: 'Dulu selalu overthinking tiap mau bimbingan revisi bab 2. Fitur Pomodoro sama Mimi AI ngebantu banget bikin aku ga panik.',
      name: 'Nadira Az-Zahra',
      campus: 'Teknik Informatika · Universitas Indonesia',
      avatar: 'NA',
      tag: 'Skripsi Selesai Tepat Waktu'
    },
    {
      quote: 'Mood tracker-nya ngingetin kalau aku udah 3 hari begadang. Fitur pengingat rehat bener-bener penyelamat dari burnout organisasi.',
      name: 'Rian Pratama',
      campus: 'Teknik Sipil · UNNES Semarang',
      avatar: 'RP',
      tag: 'Pengguna Aktif 4 Bulan'
    },
    {
      quote: 'Forum komunitasnya sangat suportif, ga toxic kaya medsos lain. Rasanya nemu teman seperjuangan yang senasib di perantauan.',
      name: 'Alya Salsabila',
      campus: 'Psikologi · UGM Yogyakarta',
      avatar: 'AS',
      tag: 'Member Komunitas Sebaya'
    }
  ];

  const handleDemoAccess = () => {
    login();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F0FF] text-dark font-sans selection:bg-primary-container selection:text-primary">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#F5F0FF]/90 backdrop-blur-xl border-b border-[#E2D5F8]/70">
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-display text-xl tracking-wider shadow-sm">
              TK
            </div>
            <div>
              <span className="font-display text-2xl uppercase tracking-wide text-dark block leading-none">
                TemanKampus
              </span>
              <span className="text-[10px] text-primary font-bold tracking-wider uppercase">
                Ruang Tenang & Tumbuh
              </span>
            </div>
          </Link>

          {/* Navigation links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#fitur" className="text-sm font-bold text-on-surface-variant hover:text-primary transition uppercase tracking-wider">
              Fitur Utama
            </a>
            <a href="#mood-preview" className="text-sm font-bold text-on-surface-variant hover:text-primary transition uppercase tracking-wider">
              Cek Kondisi Diri
            </a>
            <a href="#testimoni" className="text-sm font-bold text-on-surface-variant hover:text-primary transition uppercase tracking-wider">
              Cerita Mahasiswa
            </a>
            <Link to="/premium" className="text-sm font-bold text-on-surface-variant hover:text-primary transition uppercase tracking-wider">
              Biaya & Paket
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/auth"
              className="text-xs sm:text-sm font-bold text-dark hover:text-primary transition px-3 py-2 uppercase tracking-wider"
            >
              Masuk
            </Link>
            <button
              onClick={handleDemoAccess}
              className="inline-flex items-center justify-center text-xs sm:text-sm font-bold uppercase tracking-wider bg-primary hover:bg-primary-hover text-white rounded-xl px-5 py-2.5 transition-all shadow-md shadow-primary/30 hover:-translate-y-0.5"
            >
              Daftar Gratis
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="pt-24 sm:pt-28 pb-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-14 pb-16 overflow-hidden relative">
          {/* Ambient background glows */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-[#EADDFF]/50 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-44 right-10 w-[350px] h-[350px] bg-[#FFD9E3]/40 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-6 flex flex-col items-start gap-4">
              {/* Pill Badge with Pop style */}
              <div className="inline-flex items-center gap-2 bg-white/95 border border-[#E2D5F8] text-primary px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold">
                  Ruang Aman & Produktif Mahasiswa Indonesia
                </span>
              </div>

              {/* Anton Hero Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display uppercase text-dark tracking-tight leading-[0.98]">
                KULIAH LEBIH TENANG, <br />
                <span className="text-primary">TUGAS SELESAI</span> TEPAT WAKTU.
              </h1>

              {/* Subtext */}
              <p className="text-sm sm:text-base text-on-surface-variant max-w-xl font-normal leading-relaxed">
                Kelola deadline akademik tanpa burnout. TemanKampus memadukan task management terpusat dengan pelacak kesehatan emosional dan teman curhat AI ramah 24/7.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-lg py-3 border-y border-[#DED6F1]/80 my-2">
                <div>
                  <span className="font-display text-2xl sm:text-3xl uppercase font-bold text-dark">500+</span>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">Target Mahasiswa</p>
                </div>
                <div>
                  <span className="font-display text-2xl sm:text-3xl uppercase font-bold text-primary">98%</span>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">Lebih Tenang</p>
                </div>
                <div>
                  <span className="font-display text-2xl sm:text-3xl uppercase font-bold text-secondary">24/7</span>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">Teman Curhat AI</p>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-2">
                <button
                  onClick={handleDemoAccess}
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all"
                >
                  <span>Mulai Sekarang (Gratis)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDemoAccess}
                  className="inline-flex items-center justify-center gap-2 bg-dark hover:bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-colors"
                >
                  <Play className="w-4 h-4 text-primary fill-current" />
                  <span>Jelajahi Demo Mahasiswa</span>
                </button>
              </div>

              {/* Trust Sub-label */}
              <div className="flex items-center gap-2 text-on-surface-variant pt-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <p className="text-[11px]">
                  100% Gratis fitur dasar • Tanpa kartu kredit • Email kampus (<code className="bg-white border border-[#E2D5F8] px-1 py-0.5 rounded font-mono text-primary font-bold">.ac.id</code>) dapat bonus 3 bulan
                </p>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-[520px] bg-white rounded-3xl p-4 sm:p-5 border-2 border-dark shadow-pop-lg overflow-hidden">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-border-light mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-xs font-bold uppercase tracking-wide text-dark">
                      Simulasi Dashboard Mahasiswa
                    </span>
                  </div>
                  <span className="text-[10px] bg-secondary-container text-secondary font-extrabold px-2.5 py-0.5 rounded-full">
                    Semester Genap 2026
                  </span>
                </div>

                {/* Dashboard Card Preview */}
                <div className="space-y-3.5">
                  {/* Urgent Task Pill */}
                  <div className="p-3.5 rounded-2xl bg-surface-container-low border border-border-light flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-primary">
                        Deadline Terdekat Hari Ini
                      </span>
                      <p className="text-xs font-bold text-dark">Revisi Bab 2: Metodologi Penelitian</p>
                      <p className="text-[11px] text-[#786D94]">Est. 45 menit · Skripsi & TA</p>
                    </div>
                    <span className="text-xs font-display text-primary px-3 py-1 rounded-full bg-primary-container">
                      23:59 WIB
                    </span>
                  </div>

                  {/* Mimi AI Companion Teaser */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-secondary to-purple-800 text-white shadow-sm space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase">
                        Teman Curhat Mimi
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-pink-200">
                        <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                        Online
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-purple-100">
                      "Tarik napas pelan-pelan ya Nadira, tidak ada revisi yang sia-sia. Kamu sudah sampai sejauh ini!" 🌸
                    </p>
                  </div>

                  {/* Focus Timer Mini Pill */}
                  <div className="p-3.5 rounded-2xl bg-white border border-border-light flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary-container text-secondary flex items-center justify-center font-display text-lg">
                        25:00
                      </div>
                      <div>
                        <p className="text-xs font-bold text-dark">Sesi Pomodoro Hujan Kampus</p>
                        <p className="text-[11px] text-[#786D94]">Fokus 25 mnt + Rehat 5 mnt</p>
                      </div>
                    </div>
                    <button
                      onClick={handleDemoAccess}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Buka Timer →
                    </button>
                  </div>
                </div>

                {/* Floating Capsule Badge */}
                <div className="mt-4 pt-3 border-t border-border-light flex items-center justify-between text-xs text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-primary" />
                    <span className="font-bold">5 Hari Streak Belajar Sehat</span>
                  </div>
                  <span className="text-primary font-bold">Nadira Az-Zahra · UI Depok</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campus Social Proof Banner */}
        <section className="w-full bg-[#EDE4FF]/80 border-y border-[#DED6F1] py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-dark shrink-0">
              <School className="w-5 h-5 text-primary" />
              <p className="font-display uppercase tracking-wider text-xs font-bold text-dark">
                Dirancang untuk mahasiswa dari kampus terkemuka:
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
              {partnerCampuses.map((campus, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white text-dark text-xs font-semibold border border-[#DED6F1] shadow-xs"
                >
                  {campus.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Mood Selector Preview */}
        <section id="mood-preview" className="max-w-5xl mx-auto px-4 sm:px-8 py-16">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-dark shadow-pop text-center space-y-6 relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container text-primary font-black text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Coba Interaktif</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wide text-dark">
              Bagaimana Perasaan Kuliahmu Hari Ini?
            </h2>
            <p className="text-on-surface-variant text-sm max-w-xl mx-auto">
              Cobalah memilih salah satu kondisi emosional di bawah ini untuk melihat bagaimana TemanKampus merespons kondisimu secara empati.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {[
                { id: 'baik', emoji: '✨', label: 'Semangat & Siap' },
                { id: 'biasa', emoji: '🌤️', label: 'Biasa Aja / Netral' },
                { id: 'stres', emoji: '🌧️', label: 'Kewalahan & Stres' },
                { id: 'lelah', emoji: '☕', label: 'Butuh Rehat Dulu' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedPreviewMood(m.id)}
                  className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold border transition-all flex items-center gap-2 ${
                    selectedPreviewMood === m.id
                      ? 'bg-primary text-white border-primary shadow-md scale-105'
                      : 'bg-surface-container-low text-dark border-border-light hover:border-primary'
                  }`}
                >
                  <span className="text-lg">{m.emoji}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Simulated Feedback Box */}
            <div className="p-5 rounded-2xl bg-surface-container border border-border-purple text-left max-w-2xl mx-auto transition-all">
              {selectedPreviewMood === 'baik' && (
                <div>
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    ✨ Energi Positif Terdeteksi
                  </p>
                  <p className="text-xs sm:text-sm text-dark leading-relaxed">
                    "Keren! Manfaatkan momentum baik ini untuk menuntaskan 1 tugas terberatmu lebih awal dengan Pomodoro 25 menit."
                  </p>
                </div>
              )}
              {selectedPreviewMood === 'biasa' && (
                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                    🌤️ Ketenangan yang Baik
                  </p>
                  <p className="text-xs sm:text-sm text-dark leading-relaxed">
                    "Hari biasa adalah kanvas terbaik untuk konsistensi. Susun 3 to-do prioritas dan nikmati secangkir teh hangat."
                  </p>
                </div>
              )}
              {selectedPreviewMood === 'stres' && (
                <div>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                    🌧️ Validasi Rasa Lelahmu
                  </p>
                  <p className="text-xs sm:text-sm text-dark leading-relaxed">
                    "Tugas kuliah memang menuntut banyak hal. Jangan memaksakan diri menyelesaikan semuanya hari ini. Mimi siap diajak curhat kapan saja."
                  </p>
                </div>
              )}
              {selectedPreviewMood === 'lelah' && (
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                    ☕ Waktu untuk Pemulihan Diri
                  </p>
                  <p className="text-xs sm:text-sm text-dark leading-relaxed">
                    "Tubuhmu mengirim sinyal rehat. Tutup laptop selama 15 menit, lakukan napas 4-7-8, dan minumlah segelas air dingin."
                  </p>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={handleDemoAccess}
                className="text-xs font-bold text-primary hover:underline uppercase tracking-wider"
              >
                Buka Dashboard Lengkap Mahasiswa →
              </button>
            </div>
          </div>
        </section>

        {/* 4 Core Features Section */}
        <section id="fitur" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-secondary font-black text-xs uppercase tracking-wider mb-3">
              <span>Solusi Terintegrasi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wide text-dark">
              Satu Aplikasi untuk Produktivitas & Ketenangan Jiwa
            </h2>
            <p className="text-on-surface-variant text-sm mt-2">
              Tidak perlu lagi berganti-ganti antara to-do list kaku, timer terpisah, dan catatan harian yang tercecer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-3xl p-6 border ${item.color} shadow-sm card-hover flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-display uppercase text-dark tracking-wide mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#786D94] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-5 mt-4 border-t border-border-light">
                    <button
                      onClick={handleDemoAccess}
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Coba Fitur</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Student Testimonials */}
        <section id="testimoni" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wide text-dark">
              Suara Rekan Mahasiswa di Lapangan
            </h2>
            <p className="text-on-surface-variant text-sm mt-2">
              Bagaimana TemanKampus mengubah hari perkuliahan yang penuh tekanan menjadi lebih seimbang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-border-light shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block text-[10px] font-bold bg-primary-container text-primary px-2.5 py-0.5 rounded-full mb-3">
                    {t.tag}
                  </div>
                  <p className="text-xs text-[#4A4062] leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border-light">
                  <div className="w-10 h-10 rounded-full bg-secondary text-white font-extrabold text-xs flex items-center justify-center">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-dark">{t.name}</p>
                    <p className="text-[10px] text-[#786D94]">{t.campus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
          <div className="bg-gradient-to-br from-primary via-[#D8147E] to-secondary rounded-4xl p-8 sm:p-12 text-white text-center space-y-6 shadow-pop-pink relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="text-[11px] font-black uppercase tracking-widest bg-white/20 px-3.5 py-1 rounded-full text-white inline-block">
                MVP Web App Tahap Awal
              </span>
              <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-wide leading-tight">
                Mulai Semester Ini dengan Lebih Tenang & Berdaya
              </h2>
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                Bergabunglah bersama ribuan mahasiswa lainnya. Cukup 1 menit untuk mendaftar dan rasakan perbedaannya di tugas kuliahmu berikutnya.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDemoAccess}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dark hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition shadow-lg"
                >
                  Buka Dashboard Sekarang (Gratis)
                </button>
                <Link
                  to="/premium"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold uppercase tracking-wider transition border border-white/30"
                >
                  Pelajari Paket Pro
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border-light py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-on-surface-variant">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-display text-sm">
              TK
            </div>
            <div>
              <span className="font-display text-lg text-dark">TemanKampus</span>
              <p className="text-[10px] text-[#786D94]">Ruang Tenang & Tumbuh Mahasiswa Indonesia</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <Link to="/dashboard" className="hover:text-primary">Dashboard</Link>
            <Link to="/tasks" className="hover:text-primary">Task Manager</Link>
            <Link to="/mood" className="hover:text-primary">Mood Tracker</Link>
            <Link to="/curhat" className="hover:text-primary">Curhat AI</Link>
            <Link to="/community" className="hover:text-primary">Komunitas</Link>
            <Link to="/premium" className="hover:text-primary">Langganan Pro</Link>
          </div>
          <p className="text-[11px] text-[#9E94B8]">
            © 2026 TemanKampus. Prototype MVP untuk tenant demo.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
