import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import KucingMascot from '../components/KucingMascot';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('login');

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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Kata sandi minimal 6 karakter';
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
      newErrors.name = 'Nama lengkap minimal 2 karakter';
    }
    if (!formData.email.trim() || !validateEmail(formData.email.trim())) {
      newErrors.email = 'Masukkan email kampus yang valid';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Kata sandi minimal 6 karakter';
    }
    if (!formData.major.trim()) {
      newErrors.major = 'Program studi wajib diisi';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

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
      <header className="h-16 px-5 sm:px-8 max-w-[1120px] w-full mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <KucingMascot pose="mark" size={28} />
          <span className="text-[15px] font-semibold text-ink tracking-[-0.01em]">
            TemanKampus
          </span>
        </Link>
        <Link
          to="/"
          className="text-xs text-ink-secondary hover:text-ink inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>Kembali ke beranda</span>
        </Link>
      </header>

      {/* Main split */}
      <main className="flex-1 max-w-[1000px] w-full mx-auto px-5 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left info */}
        <div className="lg:col-span-5 space-y-5 hidden lg:block">
          <KucingMascot pose="happy" size={112} />
          <h1 className="font-serif text-3xl font-normal tracking-[-0.015em] text-ink leading-tight">
            Ruang belajar dan jeda untuk mahasiswa Indonesia
          </h1>
          <p className="text-sm text-ink-secondary leading-relaxed">
            Kelola tenggat tugas kuliah, catat mood harian, jaga sesi fokus Pomodoro, dan bercerita bersama Mimi dalam satu tempat.
          </p>
        </div>

        {/* Right form card */}
        <div className="lg:col-span-7">
          <div className="surface-card p-6 sm:p-8 max-w-md mx-auto">
            {/* Segmented Tab */}
            <div className="grid grid-cols-2 p-1 rounded-lg bg-paper-raised border border-line mb-6">
              {[
                { id: 'login', label: 'Masuk' },
                { id: 'register', label: 'Daftar akun' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
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
                    Gunakan akun demo yang sudah terisi atau email kampusmu
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                    Email kampus
                  </label>
                  <div className="relative">
                    <Mail
                      className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      strokeWidth={1.5}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field pl-9"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-semantic-danger mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                    Kata sandi
                  </label>
                  <div className="relative">
                    <Lock
                      className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      strokeWidth={1.5}
                    />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input-field pl-9"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-xs text-semantic-danger mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {errors.password}
                    </p>
                  )}
                </div>

                <button type="submit" className="btn-primary w-full h-10 mt-2">
                  <span>Masuk ke dashboard</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-ink">Buat akun mahasiswa</h2>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Data disimpan lokal untuk keperluan prototipe MVP
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                    Nama lengkap
                  </label>
                  <input
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
                  <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                    Email kampus
                  </label>
                  <input
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                      Universitas
                    </label>
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                      Program studi
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                    Kata sandi
                  </label>
                  <input
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

                <button type="submit" className="btn-primary w-full h-10 mt-2">
                  <span>Daftar & masuk</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
