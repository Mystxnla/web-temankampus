import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  X,
  CreditCard,
  QrCode,
  ShieldCheck,
  Flame,
  ArrowRight,
  CheckCircle2,
  Lock,
  Wallet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import plansData from '../mock-data/plans.json';

const PremiumPage = () => {
  const { user, upgradeToPremium, setUser } = useAuth();

  const [selectedPlan, setSelectedPlan] = useState('pro_monthly');
  const [selectedMethod, setSelectedMethod] = useState('qris');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'processing', 'success'

  const plans = plansData.plans;
  const paymentMethods = plansData.paymentMethods;

  const handleOpenPayment = (planId) => {
    setSelectedPlan(planId);
    setIsPaymentModalOpen(true);
    setPaymentStatus('idle');
  };

  const handleProcessPayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      upgradeToPremium();
      setPaymentStatus('success');
    }, 1500);
  };

  const handleResetFree = () => {
    setUser((prev) => ({ ...prev, isPremium: false }));
  };

  return (
    <div className="space-y-8 select-none max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-container text-primary font-black text-xs uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Investasi Kesejahteraan Akademik</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display uppercase tracking-wide text-dark">
          Tingkatkan Potensimu dengan TemanKampus Pro
        </h1>
        <p className="text-xs sm:text-sm text-[#786D94] leading-relaxed">
          Dirancang terjangkau dengan tarif mahasiswa Indonesia. Dapatkan akses curhat AI tanpa batas, audio fokus eksklusif, dan analisis psikologis mendalam.
        </p>
      </div>

      {/* Active Pro Status Notification Banner */}
      {user?.isPremium && (
        <div className="p-5 bg-gradient-to-r from-amber-500 to-primary rounded-3xl text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="font-display text-lg uppercase tracking-wide">
                Akunmu Sedang Berlangganan TemanKampus Pro!
              </p>
              <p className="text-xs text-pink-100">
                Semua fitur premium aktif tanpa batasan (AI Mimi 24/7 & Laporan PDF).
              </p>
            </div>
          </div>
          <button
            onClick={handleResetFree}
            className="px-4 py-2 rounded-xl bg-white text-dark text-xs font-bold hover:bg-gray-100 transition shadow-sm shrink-0"
          >
            Reset ke Gratis (Demo Mode)
          </button>
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => {
          const isProPlan = plan.id !== 'free';
          const isCurrentActive = (!user?.isPremium && plan.id === 'free') || (user?.isPremium && plan.id === 'pro_monthly');

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-4xl p-6 sm:p-7 border transition-all flex flex-col justify-between relative shadow-sm ${
                plan.popular
                  ? 'border-2 border-primary shadow-pop-pink scale-102 z-10'
                  : 'border-border-light hover:border-border-purple'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="mb-4">
                  <span className="text-xs font-extrabold text-secondary uppercase tracking-wider">
                    {plan.name}
                  </span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl sm:text-4xl font-display text-dark tracking-wide">
                      {plan.priceFormatted}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-xs text-[#786D94] font-bold">/{plan.billingCycle}</span>
                    )}
                  </div>
                  <p className="text-xs text-[#5A4F72] mt-2 leading-relaxed min-h-[36px]">
                    {plan.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-light space-y-3">
                  <p className="text-[11px] font-bold text-dark uppercase tracking-wider">
                    Fitur yang didapatkan:
                  </p>
                  <ul className="space-y-2 text-xs text-[#4A4062]">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                    {plan.unavailableFeatures?.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-400">
                        <X className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border-light">
                {isCurrentActive ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-2xl bg-surface-container text-dark font-bold text-xs uppercase tracking-wider cursor-default"
                  >
                    ✓ Paket Aktif Saat Ini
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenPayment(plan.id)}
                    className={`w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition shadow-sm ${
                      plan.popular
                        ? 'bg-primary hover:bg-primary-hover text-white shadow-primary/30'
                        : 'bg-dark hover:bg-black text-white'
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix */}
      <section className="bg-white rounded-4xl p-6 sm:p-8 border border-border-light shadow-sm space-y-5">
        <h3 className="text-xl font-display text-dark uppercase tracking-wide pb-2 border-b border-border-light">
          Perbandingan Detail Fitur
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border-light text-[#786D94] uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Fitur Platform</th>
                <th className="py-3 px-4">Mahasiswa Bebas</th>
                <th className="py-3 px-4 text-primary">TemanKampus Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light text-[#4A4062]">
              <tr>
                <td className="py-3.5 px-4 font-bold text-dark">Sesi Curhat AI Mimi</td>
                <td className="py-3.5 px-4">10 Pesan / Hari</td>
                <td className="py-3.5 px-4 font-extrabold text-primary">UNLIMITED 24/7</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-dark">Laporan & Analisis Emosi</td>
                <td className="py-3.5 px-4">Riwayat 7 Hari</td>
                <td className="py-3.5 px-4 font-extrabold text-primary">Bulanan & Export PDF</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-dark">Suara Latar Ruang Fokus</td>
                <td className="py-3.5 px-4">Hujan Kampus Saja</td>
                <td className="py-3.5 px-4 font-extrabold text-primary">Semua Suara & Lo-Fi Bebas</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-dark">Arsip & Label Tugas</td>
                <td className="py-3.5 px-4">Maks 30 Tugas Aktif</td>
                <td className="py-3.5 px-4 font-extrabold text-primary">Tanpa Batas</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-dark">Dukungan Rujukan Prioritas</td>
                <td className="py-3.5 px-4">Hotline Standar</td>
                <td className="py-3.5 px-4 font-extrabold text-primary">Fast-track Konselor Kampus</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SIMULATED PAYMENT GATEWAY MODAL (Midtrans / Xendit Sandbox) */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full border-2 border-primary/30 shadow-2xl overflow-hidden">
            {/* Payment Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-white/20 text-white font-bold px-2.5 py-0.5 rounded-full uppercase">
                    Sandbox Demo Gateway
                  </span>
                  <span className="text-[10px] text-pink-200">Enkripsi 256-bit</span>
                </div>
                <h3 className="text-xl font-display uppercase tracking-wide mt-1">
                  Pembayaran TemanKampus Pro
                </h3>
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {paymentStatus === 'idle' && (
                <>
                  {/* Order Summary */}
                  <div className="p-4 rounded-2xl bg-surface-container-low border border-border-light flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-dark">
                        {selectedPlan === 'pro_semester' ? 'Paket Satu Semester (6 Bulan)' : 'TemanKampus Pro Bulanan'}
                      </p>
                      <p className="text-[11px] text-[#786D94]">Akses penuh semua fitur wellness</p>
                    </div>
                    <span className="text-base font-display text-primary">
                      {selectedPlan === 'pro_semester' ? 'Rp 49.000' : 'Rp 19.000'}
                    </span>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider">
                      Pilih Metode Pembayaran:
                    </label>

                    {paymentMethods.map((group, gIdx) => (
                      <div key={gIdx} className="space-y-1.5">
                        <span className="text-[10px] font-bold text-[#786D94] uppercase tracking-wider">
                          {group.category}
                        </span>
                        <div className="space-y-1.5">
                          {group.items.map((item) => (
                            <button
                              type="button"
                              key={item.id}
                              onClick={() => setSelectedMethod(item.id)}
                              className={`w-full p-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                                selectedMethod === item.id
                                  ? 'border-primary bg-primary-container/40 text-primary font-bold ring-1 ring-primary'
                                  : 'border-border-light bg-surface-container-low text-dark hover:border-border-purple'
                              }`}
                            >
                              <span>{item.name}</span>
                              <span className="text-[10px] text-[#9E94B8]">
                                {item.fee === 0 ? 'Bebas Biaya' : '+Rp 1.000'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* QRIS Sandbox Graphic if QRIS selected */}
                  {selectedMethod === 'qris' && (
                    <div className="p-4 rounded-2xl bg-white border border-border-purple text-center space-y-2">
                      <div className="w-32 h-32 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center p-2">
                        {/* Mock QR Code Pattern */}
                        <div className="w-full h-full bg-dark rounded-lg flex items-center justify-center text-white font-display text-xs">
                          [QRIS CODE]
                        </div>
                      </div>
                      <p className="text-[11px] text-[#786D94]">
                        Buka GoPay, OVO, ShopeePay, atau BCA Mobile untuk simulasi scan
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleProcessPayment}
                    className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-wider transition shadow-md shadow-primary/30 flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Bayar Sekarang & Aktifkan Pro</span>
                  </button>
                </>
              )}

              {paymentStatus === 'processing' && (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <h4 className="text-base font-display text-dark uppercase tracking-wide">
                    Memverifikasi Pembayaran...
                  </h4>
                  <p className="text-xs text-[#786D94]">
                    Menghubungi simulasi server Midtrans/Xendit Sandbox. Mohon tunggu sebentar.
                  </p>
                </div>
              )}

              {paymentStatus === 'success' && (
                <div className="py-8 text-center space-y-4 animate-scaleUp">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-display text-dark uppercase tracking-wide">
                    Pembayaran Berhasil! 🎉
                  </h4>
                  <p className="text-xs text-[#5A4F72] leading-relaxed max-w-xs mx-auto">
                    Selamat, akun <strong>{user?.name}</strong> kini telah aktif sebagai <strong>TemanKampus Pro</strong>.
                  </p>
                  <button
                    onClick={() => setIsPaymentModalOpen(false)}
                    className="px-8 py-3 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-wider shadow-md hover:bg-primary-hover transition"
                  >
                    Kembali ke Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumPage;
