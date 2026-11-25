import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  Mail,
  Lock,
  AlertCircle,
  ArrowLeft,
  HeartHandshake,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePrivacy } from '../context/PrivacyContext';
import KucingMascot from '../components/KucingMascot';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, loginAsGuest } = useAuth();
  const { openHelpModal, openPrivacyModal, acceptStorageConsent } = usePrivacy();
  const [activeTab, setActiveTab] = useState('login');
  const [agreedPrivacy, setAgreedPrivacy] = useState(true);

  const [formData, setFormData] = useState({
    name: 'Nadira Az-Zahra',
    email: 'nadira.azzahra@ui.ac.id',
    password: 'password123',
    university: 'Universitas Indonesia',
    faculty: 'Fakultas Ilmu Komputer',
    major: 'Teknik Informatika',
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleGuestAccess = () => {
    loginAsGuest();
    navigate('/dashboard');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Yuk isi email kampusmu dulu agar bisa melanjutkan.';
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Sepertinya format email belum lengkap, coba cek lagi ya.';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Kata sandi perlu minimal 6 karakter agar akunmu tetap aman.';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    login();
    navigate('/dashboard');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Tuliskan nama panggilan atau nama lengkapmu (minimal 2 karakter).';
    }
    if (!formData.email.trim() || !validateEmail(formData.email.trim())) {
      newErrors.email = 'Masukkan alamat email kampus yang valid ya.';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Kata sandi perlu minimal 6 karakter.';
    }
    if (!formData.major.trim()) {
      newErrors.major = 'Isi program studimu agar rekomendasi terasa lebih relevan.';
    }
    if (!agreedPrivacy) {
      newErrors.privacy = 'Centang persetujuan privasi terlebih dahulu, atau gunakan mode tamu anonim.';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    acceptStorageConsent();
    login({
      name: formData.name.trim(),
      email: formData.email.trim(),
      university: formData.university,
      faculty: formData.faculty,
      major: formData.major.trim(),
      avatar: formData.name
        .trim()
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase(),
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      {/* Minimal top bar */}
      <header className="h-16 px-5 sm:px-8 max-w-[1120px] w-full mx-auto flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5">
          <KucingMascot pose="mark" size={28} />
          <span className="text-[15px] font-semibold text-ink tracking-[-0.01em]">
            TemanKampus
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openHelpModal}
            aria-label="Bantuan krisis dan layanan konseling 119"
            className="h-8 px-3 rounded-lg bg-calm-surface border border-calm-border text-xs font-medium text-accent hover:bg-accent/15 transition-colors inline-flex items-center gap-1.5"
          >
            <HeartHandshake className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
            <span>Butuh bantuan</span>
          </button>
          <Link
            to="/"
            className="text-xs text-ink-secondary hover:text-ink inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">Kembali ke beranda</span>
          </Link>
        </div>
      </header>

      {/* Main split */}
      <main className="flex-1 max-w-[1000px] w-full mx-auto px-5 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left info */}
        <div className="lg:col-span-5 space-y-5 hidden lg:block">
          <KucingMascot pose="happy" size={112} />
          <h1 className="font-serif text-3xl font-normal tracking-[-0.015em] text-ink leading-tight">
            Ruang belajar dan jeda untuk mahasiswa Indonesia
          </h1>
          <p className="text-sm text-ink-secondary leading-relaxed">
            Kelola tenggat tugas kuliah, catat mood harian, jaga sesi fokus Pomodoro, dan bercerita bersama Mimi. Kamu juga bisa langsung masuk sebagai tamu anonim tanpa registrasi.
          </p>
        </div>

        {/* Right form card */}
        <div className="lg:col-span-7">
          <div className="surface-card p-6 sm:p-8 max-w-md mx-auto">
            {/* Segmented Tab */}
            <div
              role="tablist"
              aria-label="Pilihan masuk atau daftar"
              className="grid grid-cols-2 p-1 rounded-lg bg-paper-raised border border-line mb-6"
            >
              {[
                { id: 'login', label: 'Masuk' },
                { id: 'register', label: 'Daftar akun' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setErrors({});
                  }}
                  className={`h-8 rounded-md text-xs font-medium transition-colors duration-150 ${
                    activeTab === tab.id
                      ? 'bg-paper-card text-ink shadow-subtle'
                      : 'text-ink-secondary hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-ink">Masuk ke akunmu</h2>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Gunakan akun demo yang sudah terisi, email kampusmu, atau mode tamu anonim.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="login-email"
                    className="block text-xs font-medium text-ink-secondary mb-1.5"
                  >
                    Email kampus
                  </label>
                  <div className="relative">
                    <Mail
                      className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      strokeWidth={1.5}
                    />
                    <input
                      id="login-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field pl-9"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-semantic-danger mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-medium text-ink-secondary mb-1.5"
                  >
                    Kata sandi
                  </label>
                  <div className="relative">
                    <Lock
                      className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      strokeWidth={1.5}
                    />
                    <input
                      id="login-password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input-field pl-9"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-xs text-semantic-danger mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                <button type="submit" className="btn-primary w-full h-10 mt-2">
                  <span>Masuk ke beranda</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-ink">Buat akun mahasiswa</h2>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Data disimpan lokal di perangkatmu dan dapat dihapus kapan saja.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="reg-name"
                    className="block text-xs font-medium text-ink-secondary mb-1.5"
                  >
                    Nama lengkap atau panggilan
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {errors.name && (
                    <p className="text-xs text-semantic-danger mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="reg-email"
                    className="block text-xs font-medium text-ink-secondary mb-1.5"
                  >
                    Email kampus
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {errors.email && (
                    <p className="text-xs text-semantic-danger mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="reg-university"
                      className="block text-xs font-medium text-ink-secondary mb-1.5"
                    >
                      Universitas
                    </label>
                    <input
                      id="reg-university"
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="reg-major"
                      className="block text-xs font-medium text-ink-secondary mb-1.5"
                    >
                      Program studi
                    </label>
                    <input
                      id="reg-major"
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      className="input-field"
                    />
                    {errors.major && (
                      <p className="text-xs text-semantic-danger mt-1">{errors.major}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reg-password"
                    className="block text-xs font-medium text-ink-secondary mb-1.5"
                  >
                    Kata sandi
                  </label>
                  <input
                    id="reg-password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {errors.password && (
                    <p className="text-xs text-semantic-danger mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-start gap-2 text-xs text-ink-secondary cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedPrivacy}
                      onChange={(e) => {
                        setAgreedPrivacy(e.target.checked);
                        if (errors.privacy) setErrors((prev) => ({ ...prev, privacy: '' }));
                      }}
                      className="mt-0.5 w-4 h-4 rounded accent-accent shrink-0"
                    />
                    <span>
                      Saya menyetujui penyimpanan data secara lokal sesuai{' '}
                      <button
                        type="button"
                        onClick={openPrivacyModal}
                        className="text-accent font-medium hover:underline underline-offset-2"
                      >
                        Kebijakan Privasi (UU PDP)
                      </button>
                      .
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="text-xs text-semantic-danger mt-1">{errors.privacy}</p>
                  )}
                </div>

                <button type="submit" className="btn-primary w-full h-10 mt-2">
                  <span>Daftar & masuk</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </form>
            )}

            {/* Anonymous Guest Mode */}
            <div className="mt-5 pt-5 border-t border-line space-y-2.5">
              <button
                type="button"
                onClick={handleGuestAccess}
                className="btn-secondary w-full h-10 text-xs"
              >
                <UserCheck className="w-4 h-4 text-accent" strokeWidth={1.5} />
                <span>Lanjutkan sebagai Tamu Anonim</span>
              </button>
              <p className="text-[11px] text-ink-muted text-center leading-relaxed">
                Tanpa perlu mengisi identitas pribadi. Kamu tetap bisa menggunakan seluruh fitur utama.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
