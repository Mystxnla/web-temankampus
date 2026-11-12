import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles, ArrowRight, Mail, Lock, CheckCircle2,
} from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [activeTab, setActiveTab] = useState('login');

  const [formData, setFormData] = useState({
    name: 'Nadira Az-Zahra',
    email: 'nadira.azzahra@ui.ac.id',
    password: 'password123',
    university: 'Universitas Indonesia',
    faculty: 'Fakultas Ilmu Komputer',
    major: 'Teknik Informatika',
    interest: 'produktivitas',
  });

  const [notification, setNotification] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login();
    navigate('/dashboard');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    login({
      name: formData.name,
      email: formData.email,
      university: formData.university,
      faculty: formData.faculty,
      major: formData.major,
      avatar: formData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase(),
    });
    navigate('/dashboard');
  };

  const handleQuickDemoLogin = () => { login(); navigate('/dashboard'); };

  // Shared input style
  const inputStyle = {
    background: '#FFFBEF',
    border: '1.5px solid #75685B',
    color: '#2B2B2B',
  };

  return (
    <div
      className="min-h-screen font-sans flex flex-col justify-between"
      style={{ backgroundColor: '#F3F3F1' }}
    >
      {/* ── Top Bar ── */}
      <header
        className="w-full sticky top-0 z-30"
        style={{
          backgroundColor: '#FFFBEF',
          borderBottom: '2.37px solid #75685B',
          boxShadow: '0 4px 0 0 #F7F0DA',
        }}
      >
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-2xl font-display text-base flex items-center justify-center shadow-sm"
              style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA' }}
            >
              TK
            </div>
            <div>
              <span className="font-display text-lg tracking-tight block leading-none" style={{ color: '#8B0A0A' }}>
                TemanKampus
              </span>
              <span className="font-hand text-[10px] tracking-wider uppercase block" style={{ color: '#75685B' }}>
                Ruang Tenang & Tumbuh
              </span>
            </div>
          </Link>
          <Link
            to="/"
            className="text-xs font-bold px-3.5 py-1.5 rounded-full transition"
            style={{ background: '#F7F0DA', border: '1.5px solid #75685B', color: '#75685B' }}
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </header>

      {/* ── Main Section ── */}
      <main className="w-full max-w-5xl mx-auto px-5 py-8 flex-1 flex flex-col justify-center">
        {/* Header */}
        <div className="mb-6">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold mb-3"
            style={{ background: '#F7F0DA', color: '#8B0A0A', border: '1px solid #75685B' }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Akses Ruang Mahasiswa</span>
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-2" style={{ color: '#8B0A0A' }}>
            Satu Tempat untuk Bereskan Tugas,<br />
            <span style={{ color: '#4A8DB7' }}>Pulihkan Semangat Setiap Hari.</span>
          </h1>
          <p className="font-hand text-sm max-w-lg" style={{ color: '#1F3A7A' }}>
            Didesain ramah untuk mahasiswa — kelola tugas tanpa panik, cek emosi harian,
            dan temukan teman senasib di ruang aman TemanKampus.
          </p>
        </div>

        {/* Auth Card Container */}
        <div
          className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          style={{ background: '#FFFBEF', border: '2.37px solid #75685B', boxShadow: '0 0 0 12px #F7F0DA, 0 0 0 16px #342B27' }}
        >
          {/* Left Info & Quick Demo Sidebar */}
          <div
            className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between"
            style={{ background: '#F7F0DA', borderRight: '2px solid #75685B' }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h2 className="font-display text-lg" style={{ color: '#8B0A0A' }}>Kenapa Bergabung?</h2>
              </div>
              <ul className="space-y-3 text-xs" style={{ color: '#2B2B2B' }}>
                {[
                  { icon: '📋', title: 'Task Manager Khusus Kuliah', desc: 'deadline terorganisir per matkul tanpa rasa overwhelmed.', accent: '#8B0A0A' },
                  { icon: '😊', title: 'Mood Check-in & Rehat', desc: 'pantau stabilitas emosimu sebelum burnout melanda.', accent: '#4A8DB7' },
                  { icon: '🌸', title: 'Teman Curhat Mimi (AI)', desc: 'teman ngobrol suportif 24/7 saat butuh didengarkan.', accent: '#8B0A0A' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-2.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: item.accent + '20', color: item.accent }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>
                      <strong>{item.title}</strong> — {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Demo Shortcut */}
            <div className="mt-6 pt-6" style={{ borderTop: '1.5px solid #75685B30' }}>
              <div
                className="p-4 rounded-3xl space-y-2.5"
                style={{ background: '#FFFBEF', border: '1.5px solid #75685B' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider" style={{ color: '#8B0A0A' }}>
                    ⚡ Akses Demo Instan
                  </span>
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full font-black"
                    style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA' }}
                  >
                    1-KLIK
                  </span>
                </div>
                <p className="font-hand text-xs leading-relaxed" style={{ color: '#1F3A7A' }}>
                  Ingin langsung eksplorasi tanpa isi formulir? Masuk langsung dengan profil demo mahasiswa.
                </p>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 px-3 rounded-2xl text-xs font-black transition flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA', border: '2px solid #342B27' }}
                >
                  <span>Masuk sebagai Nadira (UI)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Auth Forms */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center" style={{ background: '#FFFBEF' }}>
            {/* Tab Switcher */}
            <div
              className="flex rounded-full p-1 border mb-6"
              style={{ background: '#F7F0DA', borderColor: '#75685B' }}
            >
              {[
                { key: 'login', label: 'Masuk Akun' },
                { key: 'register', label: 'Daftar Akun Baru' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex-1 py-2.5 rounded-full text-xs font-black transition-all uppercase tracking-wider"
                  style={
                    activeTab === tab.key
                      ? { backgroundColor: '#8B0A0A', color: '#F7F0DA' }
                      : { color: '#75685B' }
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'login' ? (
              /* LOGIN FORM */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-xs font-bold mb-1.5"
                    style={{ color: '#2B2B2B' }}
                  >
                    Email Mahasiswa atau Email Pribadi
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-xs rounded-2xl transition focus:outline-none"
                      style={inputStyle}
                      placeholder="nama@ui.ac.id"
                    />
                    <Mail className="w-4 h-4 absolute right-3.5 top-3.5" style={{ color: '#75685B' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold" style={{ color: '#2B2B2B' }}>
                      Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={() => setNotification('Link reset password demo telah disimulasikan ke email.')}
                      className="text-[11px] font-bold hover:underline"
                      style={{ color: '#8B0A0A' }}
                    >
                      Lupa Sandi?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-xs rounded-2xl transition focus:outline-none"
                      style={inputStyle}
                      placeholder="••••••••"
                    />
                    <Lock className="w-4 h-4 absolute right-3.5 top-3.5" style={{ color: '#75685B' }} />
                  </div>
                </div>

                {notification && (
                  <div
                    className="p-3 rounded-2xl flex items-center gap-2 text-xs"
                    style={{ background: '#F7F0DA', border: '1.5px solid #75685B', color: '#2B2B2B' }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#4A8DB7' }} />
                    <span>{notification}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 mt-2"
                  style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA', border: '2px solid #342B27' }}
                >
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                {/* Campus Perk Banner */}
                <div
                  className="p-3 rounded-2xl flex items-center gap-2 text-xs font-bold"
                  style={{ background: '#F7F0DA', border: '1px solid #75685B', color: '#8B0A0A' }}
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Gunakan email kampus (.ac.id) untuk langsung coba Pro gratis 3 bulan!</span>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: '#2B2B2B' }}>
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-xs rounded-2xl transition focus:outline-none"
                    style={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: '#2B2B2B' }}>
                      Email Kampus / Pribadi
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-xs rounded-2xl transition focus:outline-none"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: '#2B2B2B' }}>
                      Kata Sandi
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-xs rounded-2xl transition focus:outline-none"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: '#2B2B2B' }}>
                      Asal Kampus
                    </label>
                    <select
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-xs rounded-2xl transition focus:outline-none"
                      style={inputStyle}
                    >
                      <option value="Universitas Indonesia">Universitas Indonesia (UI)</option>
                      <option value="Universitas Negeri Semarang">Universitas Negeri Semarang (UNNES)</option>
                      <option value="Institut Teknologi Bandung">Institut Teknologi Bandung (ITB)</option>
                      <option value="Universitas Gadjah Mada">Universitas Gadjah Mada (UGM)</option>
                      <option value="Universitas Diponegoro">Universitas Diponegoro (UNDIP)</option>
                      <option value="Universitas Lainnya">Kampus Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: '#2B2B2B' }}>
                      Program Studi / Jurusan
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-xs rounded-2xl transition focus:outline-none"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: '#2B2B2B' }}>
                    Kebutuhan Utama Saat Ini
                  </label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs rounded-2xl transition focus:outline-none"
                    style={inputStyle}
                  >
                    <option value="produktivitas">Bereskan Tugas Kuliah & Deadline Tepat Waktu</option>
                    <option value="wellness">Manajemen Stres, Emosi & Pencegahan Burnout</option>
                    <option value="komunitas">Teman Belajar Bersama & Komunitas Suportif</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 mt-1"
                  style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA', border: '2px solid #342B27' }}
                >
                  <span>Daftar & Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-[11px] text-center mt-5" style={{ color: '#75685B' }}>
              Dengan masuk, kamu menyetujui Ketentuan Privasi & Komitmen Ruang Aman TemanKampus.
            </p>
          </div>
        </div>
      </main>

      {/* ── Footer Note ── */}
      <footer
        className="w-full max-w-5xl mx-auto px-5 py-4 text-center text-xs font-semibold"
        style={{ color: '#75685B', borderTop: '2px solid #75685B' }}
      >
        TemanKampus • Ruang Tenang & Tumbuh Mahasiswa Indonesia
      </footer>
    </div>
  );
};

export default AuthPage;
