import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles, ArrowRight, School, User, Lock, Mail, CheckCircle2,
  BookOpen, Heart, ShieldCheck, HelpCircle
} from 'lucide-react';
import BobiMascot from '../components/BobiMascot';

const BG = '#F5DFCC'; // Sandy Cream / Warm Peach (Headspace Auth theme)

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

  const handleQuickDemoLogin = () => {
    login();
    navigate('/dashboard');
  };

  return (
    <div
      className="min-h-screen font-sans flex flex-col justify-between"
      style={{ backgroundColor: BG }}
    >
      {/* ── Top Bar ── */}
      <header className="w-full max-w-5xl mx-auto px-5 pt-6 pb-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-white text-[#FF5A35] font-black text-base flex items-center justify-center shadow-card-sm">
            TK
          </div>
          <div>
            <span className="font-headline font-black text-lg text-[#2D2540] tracking-tight block leading-none">
              TemanKampus
            </span>
            <span className="text-[10px] text-[#7A6050] font-bold tracking-wider uppercase">
              Ruang Tenang & Tumbuh
            </span>
          </div>
        </Link>
        <Link
          to="/"
          className="text-xs font-extrabold text-[#5A4535] hover:text-[#2D2540] bg-white/70 hover:bg-white px-3.5 py-1.5 rounded-full transition shadow-xs"
        >
          ← Kembali ke Beranda
        </Link>
      </header>

      {/* ── Main Section ── */}
      <main className="w-full max-w-5xl mx-auto px-5 py-4 flex-1 flex flex-col justify-center">
        {/* Header Content with Bobi */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/80 text-[#8C552A] px-3.5 py-1 rounded-full text-xs font-extrabold mb-3 shadow-card-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9266]" />
              <span>Akses Ruang Mahasiswa</span>
            </div>
            <h1 className="hs-headline text-[#2D2540] text-3xl sm:text-4xl lg:text-5xl mb-2">
              Satu Tempat untuk Bereskan Tugas,<br />
              <span className="text-[#8C552A]">Pulihkan Semangat Setiap Hari.</span>
            </h1>
            <p className="text-[#5A4535] text-xs sm:text-sm max-w-lg leading-relaxed">
              Didesain ramah untuk mahasiswa — kelola tugas tanpa panik, cek emosi harian,
              dan temukan teman senasib di ruang aman TemanKampus.
            </p>
          </div>
          <div className="shrink-0">
            <BobiMascot pose="wave" size={145} accentColor="#FF9266" />
          </div>
        </div>

        {/* Auth Card Container */}
        <div className="bg-white rounded-4xl shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-black/5">
          {/* Left Info & Quick Demo Sidebar */}
          <div className="lg:col-span-5 bg-[#FAF3EC] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#EDE1D4]">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h2 className="font-headline font-black text-lg text-[#2D2540]">
                  Kenapa Bergabung?
                </h2>
              </div>
              <ul className="space-y-3 text-xs text-[#5A4535]">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#E5F5ED] text-[#2C805B] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong>Task Manager Khusus Kuliah</strong> — deadline terorganisir per matkul tanpa rasa overwhelmed.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#EBF3FC] text-[#3D74B4] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong>Mood Check-in & Rehat</strong> — pantau stabilitas emosimu sebelum burnout melanda.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#F3ECFB] text-[#7854AC] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong>Teman Curhat Mimi (AI)</strong> — teman ngobrol suportif 24/7 saat butuh didengarkan.
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Demo Shortcut */}
            <div className="mt-6 pt-6 border-t border-[#EDE1D4]">
              <div className="p-4 rounded-3xl bg-white border border-[#E8DACB] shadow-card-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-[#8C552A] uppercase tracking-wider">
                    ⚡ Akses Demo Instan
                  </span>
                  <span className="bg-[#FF5A35] text-white text-[9px] px-2 py-0.5 rounded-full font-black">
                    1-KLIK
                  </span>
                </div>
                <p className="text-[11px] text-[#7A6050] leading-relaxed">
                  Ingin langsung eksplorasi tanpa isi formulir? Masuk langsung dengan profil demo mahasiswa.
                </p>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 px-3 rounded-2xl bg-[#FF5A35] hover:bg-[#E84420] text-white text-xs font-extrabold transition shadow-card-sm flex items-center justify-center gap-2"
                >
                  <span>Masuk sebagai Nadira (UI)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Auth Forms */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
            {/* Tab Switcher */}
            <div className="flex rounded-full bg-[#FAF3EC] p-1 border border-[#EDE1D4] mb-6">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 rounded-full text-xs font-black transition-all uppercase tracking-wider ${
                  activeTab === 'login'
                    ? 'bg-white text-[#2D2540] shadow-card-sm'
                    : 'text-[#8A7869] hover:text-[#2D2540]'
                }`}
              >
                Masuk Akun
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2.5 rounded-full text-xs font-black transition-all uppercase tracking-wider ${
                  activeTab === 'register'
                    ? 'bg-white text-[#2D2540] shadow-card-sm'
                    : 'text-[#8A7869] hover:text-[#2D2540]'
                }`}
              >
                Daftar Akun Baru
              </button>
            </div>

            {activeTab === 'login' ? (
              /* LOGIN FORM */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#2D2540] mb-1.5">
                    Email Mahasiswa atau Email Pribadi
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FAF8F5] text-xs rounded-2xl border border-[#EDE1D4] focus:outline-none focus:ring-2 focus:ring-[#FF9266] focus:bg-white text-[#2D2540] transition"
                      placeholder="nama@ui.ac.id"
                    />
                    <Mail className="w-4 h-4 text-[#A8988B] absolute right-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-extrabold text-[#2D2540]">
                      Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={() => setNotification('Link reset password demo telah disimulasikan ke email.')}
                      className="text-[11px] font-bold text-[#8C552A] hover:underline"
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
                      className="w-full px-4 py-3 bg-[#FAF8F5] text-xs rounded-2xl border border-[#EDE1D4] focus:outline-none focus:ring-2 focus:ring-[#FF9266] focus:bg-white text-[#2D2540] transition"
                      placeholder="••••••••"
                    />
                    <Lock className="w-4 h-4 text-[#A8988B] absolute right-3.5 top-3.5" />
                  </div>
                </div>

                {notification && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{notification}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#FF5A35] hover:bg-[#E84420] text-white text-xs font-black uppercase tracking-wider transition shadow-card-sm flex items-center justify-center gap-2 mt-2"
                >
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                {/* Campus Perk Banner */}
                <div className="p-3 bg-[#FFF3EE] border border-[#FFD5C5] rounded-2xl flex items-center gap-2 text-[#8C552A] text-xs font-bold">
                  <Sparkles className="w-4 h-4 shrink-0 text-[#FF5A35]" />
                  <span>Gunakan email kampus (.ac.id) untuk langsung coba Pro gratis 3 bulan!</span>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#2D2540] mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] text-xs rounded-2xl border border-[#EDE1D4] focus:outline-none focus:ring-2 focus:ring-[#FF9266] focus:bg-white text-[#2D2540] transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D2540] mb-1">
                      Email Kampus / Pribadi
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] text-xs rounded-2xl border border-[#EDE1D4] focus:outline-none focus:ring-2 focus:ring-[#FF9266] focus:bg-white text-[#2D2540] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D2540] mb-1">
                      Kata Sandi
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] text-xs rounded-2xl border border-[#EDE1D4] focus:outline-none focus:ring-2 focus:ring-[#FF9266] focus:bg-white text-[#2D2540] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D2540] mb-1">
                      Asal Kampus
                    </label>
                    <select
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] text-xs rounded-2xl border border-[#EDE1D4] focus:outline-none focus:ring-2 focus:ring-[#FF9266] focus:bg-white text-[#2D2540] transition"
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
                    <label className="block text-xs font-extrabold text-[#2D2540] mb-1">
                      Program Studi / Jurusan
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] text-xs rounded-2xl border border-[#EDE1D4] focus:outline-none focus:ring-2 focus:ring-[#FF9266] focus:bg-white text-[#2D2540] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#2D2540] mb-1">
                    Kebutuhan Utama Saat Ini
                  </label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] text-xs rounded-2xl border border-[#EDE1D4] focus:outline-none focus:ring-2 focus:ring-[#FF9266] focus:bg-white text-[#2D2540] transition"
                  >
                    <option value="produktivitas">Bereskan Tugas Kuliah & Deadline Tepat Waktu</option>
                    <option value="wellness">Manajemen Stres, Emosi & Pencegahan Burnout</option>
                    <option value="komunitas">Teman Belajar Bersama & Komunitas Suportif</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#FF5A35] hover:bg-[#E84420] text-white text-xs font-black uppercase tracking-wider transition shadow-card-sm flex items-center justify-center gap-2 mt-1"
                >
                  <span>Daftar & Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-[11px] text-[#8A7869] text-center mt-5">
              Dengan masuk, kamu menyetujui Ketentuan Privasi & Komitmen Ruang Aman TemanKampus.
            </p>
          </div>
        </div>
      </main>

      {/* ── Footer Note ── */}
      <footer className="w-full max-w-5xl mx-auto px-5 py-4 text-center text-xs text-[#7A6050] font-semibold">
        TemanKampus • Ruang Tenang & Tumbuh Mahasiswa Indonesia
      </footer>
    </div>
  );
};

export default AuthPage;
