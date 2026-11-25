import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  Smile,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  Sun,
  Cloud,
  CloudRain,
  Coffee,
  BookOpen,
  HeartHandshake,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePrivacy } from '../context/PrivacyContext';
import KucingMascot from '../components/KucingMascot';
import ClinicalDisclaimerBanner from '../components/layout/ClinicalDisclaimerBanner';

const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { openHelpModal, openPrivacyModal } = usePrivacy();
  const [selectedPreviewMood, setSelectedPreviewMood] = useState('baik');

  const features = [
    {
      num: '01',
      icon: CheckCircle2,
      title: 'Manajemen tugas',
      desc: 'Susun tugas per mata kuliah, pantau tenggat terdekat, dan lihat kalender akademik dalam satu daftar.',
      to: '/tasks',
    },
    {
      num: '02',
      icon: Smile,
      title: 'Mood check-in',
      desc: 'Catat kondisi emosi serta tingkat energi harian untuk mengenali pola kelelahan sebelum menjadi burnout.',
      to: '/mood',
    },
    {
      num: '03',
      icon: Clock,
      title: 'Ruang fokus pomodoro',
      desc: 'Sesi belajar 25 menit terukur dengan pengingat rehat dan suara latar hujan kampus.',
      to: '/focus',
    },
    {
      num: '04',
      icon: MessageCircle,
      title: 'Teman curhat Mimi',
      desc: 'Ruang percakapan privat untuk mengurai tekanan kuliah dan mendapatkan arahan langkah kecil.',
      to: '/curhat',
    },
  ];

  const previewMoods = [
    {
      id: 'baik',
      icon: Sun,
      label: 'Semangat & siap',
      dot: 'bg-semantic-positive',
      note: 'Manfaatkan energi baik ini untuk menuntaskan satu bagian tugas terpenting lewat satu sesi Pomodoro 25 menit.',
    },
    {
      id: 'biasa',
      icon: Cloud,
      label: 'Biasa saja',
      dot: 'bg-semantic-info',
      note: 'Hari yang tenang adalah fondasi konsistensi. Pilih tiga prioritas utama hari ini dan kerjakan bertahap.',
    },
    {
      id: 'stres',
      icon: CloudRain,
      label: 'Kewalahan',
      dot: 'bg-semantic-warning',
      note: 'Tidak perlu menyelesaikan semuanya sekaligus. Pecah tugas terbesar menjadi satu langkah 15 menit atau ceritakan ke Mimi.',
    },
    {
      id: 'lelah',
      icon: Coffee,
      label: 'Butuh rehat',
      dot: 'bg-accent',
      note: 'Tutup laptop sejenak selama 15 menit, lakukan latihan napas 4-7-8, dan penuhi asupan air minum sebelum lanjut.',
    },
  ];

  const studentScenarios = [
    {
      icon: BookOpen,
      category: 'Manajemen skripsi',
      title: 'Menghadapi revisi dan bimbingan',
      desc: 'Saat dosen pembimbing memberi banyak catatan revisi dengan tenggat dekat, pecah pekerjaan ke sesi Pomodoro 25 menit agar fokus tetap terjaga.',
      solution: 'Task Manager & Ruang Fokus',
    },
    {
      icon: Clock,
      category: 'Pencegahan burnout',
      title: 'Pekan ujian dan kurang tidur',
      desc: 'Ketika begadang berulang mulai menguras konsentrasi, catatan mood harian membantu melihat pola kelelahan dan mengingatkan waktu jeda.',
      solution: 'Mood Tracker & Latihan Napas 4-7-8',
    },
    {
      icon: HeartHandshake,
      category: 'Dukungan sebaya',
      title: 'Merantau dan butuh teman cerita',
      desc: 'Saat jauh dari keluarga dan merasa cemas di kosan, Mimi dan forum mahasiswa anonim memberi ruang bercerita tanpa menghakimi.',
      solution: 'Curhat AI & Komunitas Sebaya',
    },
  ];

  const activePreviewMood =
    previewMoods.find((m) => m.id === selectedPreviewMood) || previewMoods[0];

  const handleDemoAccess = (targetPath = '/dashboard') => {
    login();
    navigate(targetPath);
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Header */}
      <header className="sticky top-0 z-50 h-16 bg-paper/95 backdrop-blur-sm border-b border-line">
        <div className="h-full max-w-[1200px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 min-w-0 shrink">
            <KucingMascot pose="mark" size={28} className="shrink-0" />
            <span className="text-[15px] sm:text-[16px] font-semibold text-ink tracking-[-0.01em] truncate">
              TemanKampus
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" aria-label="Navigasi halaman">
            <a
              href="#fitur"
              className="text-sm text-ink-secondary hover:text-ink transition-colors duration-150"
            >
              Fitur
            </a>
            <a
              href="#mood-preview"
              className="text-sm text-ink-secondary hover:text-ink transition-colors duration-150"
            >
              Simulasi mood
            </a>
            <a
              href="#skenario"
              className="text-sm text-ink-secondary hover:text-ink transition-colors duration-150"
            >
              Skenario
            </a>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={openHelpModal}
              aria-label="Bantuan krisis dan layanan konseling 119"
              className="h-8 sm:h-9 px-2 sm:px-3 rounded-lg bg-calm-surface border border-calm-border text-xs font-medium text-accent hover:bg-accent/15 transition-colors duration-150 inline-flex items-center gap-1.5 shrink-0"
            >
              <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" strokeWidth={1.5} />
              <span className="sm:hidden">119</span>
              <span className="hidden sm:inline">Butuh bantuan</span>
            </button>
            <Link
              to="/auth"
              className="text-xs sm:text-sm text-ink-secondary hover:text-ink transition-colors duration-150 px-1.5 sm:px-2 py-1 shrink-0"
            >
              Masuk
            </Link>
            <button
              type="button"
              onClick={() => handleDemoAccess('/dashboard')}
              className="btn-primary h-8 sm:h-9 px-2.5 sm:px-4 text-xs sm:text-sm shrink-0"
            >
              Mulai gratis
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-20 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-serif text-[40px] sm:text-[52px] lg:text-[58px] font-normal leading-[1.06] tracking-[-0.02em] text-ink">
              Kuliah lebih tenang, tugas tetap teratur
            </h1>

            <p className="text-base sm:text-[17px] leading-[1.6] text-ink-secondary max-w-[34rem]">
              Satu ruang kerja mahasiswa Indonesia untuk menyusun tenggat kuliah, memantau mood harian, menjaga sesi fokus Pomodoro, dan bercerita bersama Mimi AI.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleDemoAccess('/dashboard')}
                className="btn-primary h-11 px-5 text-sm"
              >
                <span>Mulai tanpa daftar</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => handleDemoAccess('/mood')}
                className="btn-secondary h-11 px-5 text-sm"
              >
                Cek mood hari ini
              </button>
            </div>

            <div className="pt-4 border-t border-line flex flex-wrap items-center gap-6 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-ink-muted" strokeWidth={1.5} />
                Akses langsung tanpa wajib registrasi
              </span>
              <span className="font-mono tabular">4 modul terintegrasi</span>
              <span className="font-mono tabular">Privat di perangkatmu</span>
            </div>
          </div>

          {/* Right: Realistic Product Preview + Refined Static Mascot */}
          <div className="lg:col-span-6">
            <div className="surface-card p-5 sm:p-6 shadow-float">
              {/* Preview window header */}
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <div className="flex items-center gap-2.5">
                  <KucingMascot pose="mark" size={24} />
                  <div>
                    <p className="text-xs font-medium text-ink">Ringkasan mahasiswa</p>
                    <p className="font-mono text-[11px] text-ink-muted tabular">
                      Semester 5 · 13 Nov 2026
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-accent bg-accent-soft px-2 py-0.5 rounded-md tabular">
                  3 tugas aktif
                </span>
              </div>

              {/* Preview body */}
              <div className="mt-4 space-y-3">
                {/* Urgent task row */}
                <div className="p-3.5 rounded-lg bg-paper-raised/70 border border-line flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-ink-muted">Metodologi Penelitian</p>
                    <p className="text-sm font-medium text-ink truncate mt-0.5">
                      Revisi Bab 2: Tinjauan Pustaka
                    </p>
                  </div>
                  <span className="font-mono text-xs text-accent font-medium tabular shrink-0">
                    23:59 WIB
                  </span>
                </div>

                {/* Focus & Mascot row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch">
                  <div className="sm:col-span-7 p-3.5 rounded-lg bg-paper-card border border-line flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-ink-muted">Ruang fokus</span>
                      <span className="font-mono text-xs text-ink-secondary tabular">
                        Sesi 4 / 6
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-medium text-ink tabular">
                        25:00
                      </span>
                      <span className="text-xs text-ink-muted">Hujan kampus</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-paper-raised overflow-hidden">
                      <div className="h-full w-2/3 rounded-full bg-accent" />
                    </div>
                  </div>

                  <div className="sm:col-span-5 p-3.5 rounded-lg bg-paper-raised/50 border border-line flex flex-col items-center justify-center text-center">
                    <KucingMascot pose="happy" size={88} />
                    <p className="text-[11px] text-ink-secondary mt-1">
                      Ritme harian terjaga
                    </p>
                  </div>
                </div>

                {/* Mimi prompt row */}
                <div className="p-3.5 rounded-lg bg-calm-surface border border-calm-border flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-mono text-[11px] text-accent">
                      Mimi · Ruang curhat
                    </p>
                    <p className="text-xs leading-relaxed text-ink-secondary">
                      Satu langkah kecil hari ini sudah cukup untuk menjaga ritme belajarmu tetap berjalan.
                    </p>
                  </div>
                  <button
                    onClick={() => handleDemoAccess('/curhat')}
                    className="text-xs font-medium text-accent underline underline-offset-4 shrink-0 hover:opacity-80 transition-opacity"
                  >
                    Buka
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ClinicalDisclaimerBanner className="mt-10" />
      </section>

      {/* Features */}
      <section id="fitur" className="border-t border-line bg-paper-card py-20">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-xl mb-12">
            <p className="text-xs font-medium text-ink-muted mb-2">Fitur inti</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-ink leading-[1.15]">
              Satu tempat untuk akademik dan kesehatan mental
            </h2>
            <p className="text-sm text-ink-secondary mt-3 leading-relaxed">
              Tanpa perlu berpindah-pindah aplikasi. Tugas kuliah, refleksi emosi, dan waktu fokus saling terhubung.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.num}
                  type="button"
                  onClick={() => handleDemoAccess(f.to)}
                  className="text-left p-5 rounded-xl bg-paper border border-line hover:border-line-strong transition-colors duration-150 flex flex-col justify-between gap-6 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-9 h-9 rounded-lg bg-paper-card border border-line flex items-center justify-center">
                        <Icon className="w-4 h-4 text-ink-secondary" strokeWidth={1.5} />
                      </div>
                      <span className="font-mono text-xs text-ink-muted tabular">
                        {f.num}
                      </span>
                    </div>
                    <h3 className="text-base font-medium text-ink mb-2">{f.title}</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">{f.desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:underline underline-offset-4">
                    Buka modul
                    <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Mood Preview */}
      <section id="mood-preview" className="border-t border-line py-20">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <div className="surface-card p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-5 space-y-3">
                <p className="text-xs font-medium text-ink-muted">Simulasi check-in</p>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-[-0.015em] text-ink leading-tight">
                  Bagaimana kondisi kuliahmu hari ini?
                </h2>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  Pilih salah satu kondisi di samping untuk melihat contoh arahan harian dari TemanKampus.
                </p>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="grid grid-cols-2 gap-2.5">
                  {previewMoods.map((m) => {
                    const Icon = m.icon;
                    const isSelected = selectedPreviewMood === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedPreviewMood(m.id)}
                        className={`h-10 px-3.5 rounded-lg border text-sm font-medium flex items-center gap-2.5 transition-colors duration-150 active:scale-[0.98] ${
                          isSelected
                            ? 'bg-ink text-paper-card border-ink'
                            : 'bg-paper text-ink border-line hover:bg-paper-raised'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? 'text-paper-card' : 'text-ink-muted'
                          }`}
                          strokeWidth={1.5}
                        />
                        <span className="truncate">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 rounded-lg bg-paper-raised/70 border border-line">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`w-2 h-2 rounded-full ${activePreviewMood.dot}`} />
                    <span className="text-xs font-medium text-ink">
                      Saran untuk kondisi {activePreviewMood.label.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {activePreviewMood.note}
                  </p>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => handleDemoAccess('/mood')}
                    className="text-sm font-medium text-accent hover:underline underline-offset-4 inline-flex items-center gap-1"
                  >
                    <span>Buka Mood Tracker lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Scenarios */}
      <section id="skenario" className="border-t border-line bg-paper-card py-20">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-xl mb-12">
            <p className="text-xs font-medium text-ink-muted mb-2">Skenario nyata</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-ink leading-[1.15]">
              Dirancang untuk ritme kehidupan perkuliahan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {studentScenarios.map((sc) => {
              const Icon = sc.icon;
              return (
                <article
                  key={sc.title}
                  className="p-6 rounded-xl bg-paper border border-line flex flex-col justify-between gap-6"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-ink-muted">{sc.category}</span>
                      <Icon className="w-4 h-4 text-ink-muted" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-medium text-ink mb-2">{sc.title}</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">{sc.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-line">
                    <p className="text-xs text-ink-muted">Fitur terkait</p>
                    <p className="text-xs font-medium text-ink mt-0.5">{sc.solution}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-line py-20">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <div className="rounded-2xl bg-calm-surface border border-calm-border text-ink p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-lg space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-[-0.015em] leading-[1.12] text-ink">
                Mulai atur semester ini dengan lebih tenang
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Coba langsung seluruh fitur manajemen tugas, mood tracker, ruang fokus, dan curhat AI di prototipe TemanKampus.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => handleDemoAccess('/dashboard')}
                className="btn-primary h-10 px-5 text-sm"
              >
                <span>Buka dashboard</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <Link
                to="/premium"
                className="btn-secondary h-10 px-4 text-sm bg-paper-card"
              >
                Paket Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line py-8">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-ink-muted">
          <div className="flex items-center gap-2.5">
            <KucingMascot pose="mark" size={24} />
            <span className="font-medium text-ink">TemanKampus</span>
            <span>· Prototipe MVP</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            {[
              { path: '/dashboard', label: 'Beranda' },
              { path: '/tasks', label: 'Tugas' },
              { path: '/mood', label: 'Mood' },
              { path: '/curhat', label: 'Mimi AI' },
              { path: '/community', label: 'Komunitas' },
              { path: '/premium', label: 'Paket Pro' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="hover:text-ink transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={openPrivacyModal}
              className="hover:text-ink transition-colors duration-150"
            >
              Privasi & hapus data
            </button>
            <button
              type="button"
              onClick={openHelpModal}
              className="text-accent font-medium hover:underline underline-offset-2"
            >
              Bantuan darurat 119
            </button>
          </div>
          <span className="font-mono tabular">© {new Date().getFullYear()} TemanKampus</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
