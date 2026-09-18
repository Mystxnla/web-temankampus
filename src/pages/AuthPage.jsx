import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, School, User, Lock, Mail, CheckCircle2, Shield } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'

  // Register Form State
  const [formData, setFormData] = useState({
    name: 'Nadira Az-Zahra',
    email: 'nadira.azzahra@ui.ac.id',
    password: 'password123',
    university: 'Universitas Indonesia',
    faculty: 'Fakultas Ilmu Komputer',
    major: 'Teknik Informatika',
    interest: 'produktivitas'
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
      avatar: formData.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    });
    navigate('/dashboard');
  };

  const handleQuickDemoLogin = () => {
    login();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F0FF] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Bar Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between pb-6 border-b border-border-light">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-display text-xl tracking-wider shadow-sm">
            TK
          </div>
          <div>
            <span className="font-display text-2xl text-dark tracking-wide block leading-none">
              TEMANKAMPUS
            </span>
            <span className="text-[10px] text-primary font-bold tracking-widest block uppercase">
              Ruang Tenang & Tumbuh
            </span>
          </div>
        </Link>
        <Link
          to="/"
          className="text-xs font-bold text-dark hover:text-primary transition uppercase tracking-wider"
        >
          ← Kembali ke Beranda
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full my-8 grid grid-cols-1 lg:grid-cols-12 bg-white rounded-4xl border-2 border-dark shadow-pop-lg overflow-hidden">
        {/* Left Side: Brand Story & Demo Shortcut */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#712AE2] to-[#4F13A3] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/20 text-pink-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Ruang Mahasiswa</span>
            </div>
            <h2 className="text-3xl font-display uppercase tracking-wide leading-tight">
              Satu Tempat untuk Bereskan Tugas & Pulihkan Semangat.
            </h2>
            <p className="text-xs text-purple-200 leading-relaxed">
              Didesain khusus untuk mahasiswa yang ingin mengatasi stres akademik tanpa kehilangan produktivitas kuliah.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-purple-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-300" />
                <span>Manajemen deadline tanpa overwhelmed</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-300" />
                <span>Pelacak emosi harian & pengingat rehat</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-300" />
                <span>Teman curhat Mimi siap mendengarkan 24/7</span>
              </li>
            </ul>
          </div>

          {/* Quick Demo Access Box for Tenant Presentation */}
          <div className="relative z-10 pt-6 mt-6 border-t border-white/20">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-pink-200 uppercase tracking-wider">⚡ Akses Demo Cepat</span>
                <span className="bg-primary text-white text-[9px] px-2 py-0.5 rounded-full font-black">
                  TENANT DEMO
                </span>
              </div>
              <p className="text-[11px] text-purple-100">
                Klik tombol di bawah untuk langsung masuk dengan data mahasiswa demo.
              </p>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Masuk sebagai Nadira Az-Zahra (UI)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          {/* Tab Switcher */}
          <div className="flex rounded-2xl bg-surface-container-low p-1.5 border border-border-light mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                activeTab === 'login'
                  ? 'bg-white text-primary shadow-xs'
                  : 'text-[#786D94] hover:text-dark'
              }`}
            >
              Masuk Akun
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                activeTab === 'register'
                  ? 'bg-white text-primary shadow-xs'
                  : 'text-[#786D94] hover:text-dark'
              }`}
            >
              Daftar Akun Baru
            </button>
          </div>

          {activeTab === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                  Email Mahasiswa atau Email Pribadi
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark transition"
                    placeholder="nama@ui.ac.id"
                  />
                  <Mail className="w-4 h-4 text-[#9E94B8] absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider">
                    Kata Sandi
                  </label>
                  <button
                    type="button"
                    onClick={() => setNotification('Link reset password demo telah disimulasikan ke email.')}
                    className="text-[11px] font-bold text-secondary hover:underline"
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
                    className="w-full px-4 py-3 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark transition"
                    placeholder="••••••••"
                  />
                  <Lock className="w-4 h-4 text-[#9E94B8] absolute right-3.5 top-3.5" />
                </div>
              </div>

              {notification && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl">
                  {notification}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider transition shadow-md shadow-primary/30 flex items-center justify-center gap-2 mt-2"
              >
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {/* Campus Promo Banner */}
              <div className="p-3 bg-primary-container/60 border border-primary/20 rounded-xl flex items-center gap-2 text-primary text-xs font-semibold">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Gunakan email kampus (.ac.id) untuk langsung dapat fitur Pro 3 bulan!</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                    Email Kampus / Pribadi
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                    Asal Kampus
                  </label>
                  <select
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark transition"
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
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                    Program Studi / Jurusan
                  </label>
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                  Kebutuhan Utama Saat Ini
                </label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark transition"
                >
                  <option value="produktivitas">Bereskan Tugas Kuliah & Deadline Tepat Waktu</option>
                  <option value="wellness">Manajemen Stres, Emosi & Pencegahan Burnout</option>
                  <option value="komunitas">Teman Belajar Bersama & Komunitas Suportif</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider transition shadow-md shadow-primary/30 flex items-center justify-center gap-2 mt-2"
              >
                <span>Daftar & Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#8E84A3] text-center mt-5">
            Dengan mendaftar, kamu menyetujui Ketentuan Privasi & Komitmen Ruang Aman TemanKampus.
          </p>
        </div>
      </div>

      {/* Simple Footer Note */}
      <div className="text-center text-xs text-[#9E94B8]">
        TemanKampus Web App • Tahap MVP (Fase 1 Frontend)
      </div>
    </div>
  );
};

export default AuthPage;
