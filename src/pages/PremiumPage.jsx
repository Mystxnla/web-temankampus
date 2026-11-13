import React, { useState } from 'react';
import {
  Sparkles, Check, X, Lock, CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import plansData from '../mock-data/plans.json';
import KucingMascot from '../components/KucingMascot';

const PremiumPage = () => {
  const { user, upgradeToPremium, setUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('pro_monthly');
  const [selectedMethod, setSelectedMethod] = useState('qris');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');

  const plans = plansData.plans;
  const paymentMethods = plansData.paymentMethods;

  const handleOpenPayment = (planId) => {
    setSelectedPlan(planId);
    setIsPaymentModalOpen(true);
    setPaymentStatus('idle');
  };
  const handleProcessPayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => { upgradeToPremium(); setPaymentStatus('success'); }, 1500);
  };
  const handleResetFree = () => setUser((prev) => ({ ...prev, isPremium: false }));

  return (
    <div>
      {/* ── Header Block ── */}
      <div
        className="px-5 sm:px-8 pt-6 pb-10"
        style={{ backgroundColor: '#C8BA96' }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#5C4A3A' }}>
              Investasi Kesejahteraan Akademik
            </p>
            <h1 className="font-display text-3xl sm:text-4xl" style={{ color: '#8B0A0A' }}>
              Tingkatkan potensimu
            </h1>
            <p className="font-hand text-base mt-1" style={{ color: '#1F3A7A' }}>
              dengan TemanKampus Pro. ✨
            </p>
          </div>
          <KucingMascot pose="happy" size={130} />
        </div>
        <p className="text-sm mt-3 max-w-md" style={{ color: '#5C4A3A' }}>
          Terjangkau dengan tarif mahasiswa. Akses Mimi AI tanpa batas, audio fokus eksklusif, dan analisis psikologis mendalam.
        </p>
      </div>

      {/* ── Card Body ── */}
      <div className="px-5 sm:px-8 py-8 space-y-8">

        {/* Pro status banner */}
        {user?.isPremium && (
          <div
            className="p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: 'linear-gradient(135deg, #8B0A0A, #4A2010)', color: '#C8BA96' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <p className="font-black text-lg">Akunmu Aktif sebagai TemanKampus Pro!</p>
                <p className="text-xs" style={{ color: 'rgba(247,240,218,0.8)' }}>
                  Semua fitur premium aktif tanpa batasan.
                </p>
              </div>
            </div>
            <button
              onClick={handleResetFree}
              className="px-4 py-2 rounded-xl text-xs font-bold transition shrink-0"
              style={{ background: 'rgba(247,240,218,0.2)', color: '#C8BA96', border: '1px solid rgba(247,240,218,0.3)' }}
            >
              Reset ke Gratis (Demo)
            </button>
          </div>
        )}

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan) => {
            const isCurrentActive =
              (!user?.isPremium && plan.id === 'free') ||
              (user?.isPremium && plan.id === 'pro_monthly');
            return (
              <div
                key={plan.id}
                className="p-6 flex flex-col justify-between transition-all relative rounded-3xl"
                style={{
                  background: '#DDD0A8',
                  border: plan.popular ? '2.5px solid #8B0A0A' : '2px solid #5C4A3A',
                  boxShadow: plan.popular ? '0 8px 30px rgba(139,10,10,0.15)' : undefined,
                  transform: plan.popular ? 'scale(1.02)' : undefined,
                  zIndex: plan.popular ? 10 : undefined,
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-sm"
                    style={{ backgroundColor: '#8B0A0A', color: '#C8BA96' }}
                  >
                    {plan.badge}
                  </div>
                )}
                <div>
                  <span
                    className="text-xs font-black uppercase tracking-wider"
                    style={{ color: plan.popular ? '#8B0A0A' : '#4A8DB7' }}
                  >
                    {plan.name}
                  </span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="font-display text-4xl" style={{ color: '#2B2B2B' }}>
                      {plan.priceFormatted}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-xs font-bold" style={{ color: '#5C4A3A' }}>
                        /{plan.billingCycle}
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-2 leading-relaxed min-h-[36px]" style={{ color: '#5C4A3A' }}>
                    {plan.tagline}
                  </p>
                  <div
                    className="mt-5 pt-4 space-y-2.5"
                    style={{ borderTop: '1px solid #C8BA96' }}
                  >
                    <p className="text-[11px] font-black uppercase tracking-wider" style={{ color: '#2B2B2B' }}>
                      Yang kamu dapatkan:
                    </p>
                    <ul className="space-y-2 text-xs" style={{ color: '#2B2B2B' }}>
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#8B0A0A' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                      {plan.unavailableFeatures?.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2" style={{ color: '#5C4A3A50' }}>
                          <X className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-4" style={{ borderTop: '1px solid #C8BA96' }}>
                  {isCurrentActive ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider cursor-default"
                      style={{ background: '#C8BA96', color: '#5C4A3A', border: '1.5px solid #5C4A3A' }}
                    >
                      ✓ Paket Aktif Saat Ini
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenPayment(plan.id)}
                      className="w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition shadow-sm hover:scale-[1.02] active:scale-95"
                      style={
                        plan.popular
                          ? { backgroundColor: '#8B0A0A', color: '#C8BA96', border: '2px solid #342B27' }
                          : { backgroundColor: '#4A8DB7', color: '#DDD0A8', border: '2px solid #342B27' }
                      }
                    >
                      {plan.ctaText}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature comparison table */}
        <section
          className="p-6 space-y-4 rounded-3xl"
          style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
        >
          <h3
            className="font-black text-lg pb-2"
            style={{ color: '#2B2B2B', borderBottom: '1px solid #C8BA96' }}
          >
            📊 Perbandingan Detail Fitur
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr
                  className="text-[10px] uppercase tracking-wider font-bold"
                  style={{ borderBottom: '1px solid #C8BA96', color: '#5C4A3A' }}
                >
                  <th className="py-3 px-4">Fitur Platform</th>
                  <th className="py-3 px-4">Mahasiswa Bebas</th>
                  <th className="py-3 px-4 font-black" style={{ color: '#8B0A0A' }}>
                    TemanKampus Pro
                  </th>
                </tr>
              </thead>
              <tbody style={{ color: '#2B2B2B' }}>
                {[
                  ['Sesi Curhat AI Mimi', '10 Pesan / Hari', 'UNLIMITED 24/7'],
                  ['Laporan & Analisis Emosi', 'Riwayat 7 Hari', 'Bulanan & Export PDF'],
                  ['Suara Latar Ruang Fokus', 'Hujan Kampus Saja', 'Semua Suara & Lo-Fi Bebas'],
                  ['Arsip & Label Tugas', 'Maks 30 Tugas Aktif', 'Tanpa Batas'],
                  ['Dukungan Rujukan Prioritas', 'Hotline Standar', 'Fast-track Konselor Kampus'],
                ].map(([feat, free, pro], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #C8BA96' }}>
                    <td className="py-3.5 px-4 font-bold">{feat}</td>
                    <td className="py-3.5 px-4" style={{ color: '#5C4A3A' }}>{free}</td>
                    <td className="py-3.5 px-4 font-black" style={{ color: '#8B0A0A' }}>{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Payment modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div
            className="rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
            style={{ background: '#DDD0A8' }}
          >
            {/* Modal header */}
            <div
              className="p-5 flex items-center justify-between"
              style={{ background: '#C8BA96', borderBottom: '2px solid #5C4A3A' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase"
                    style={{ background: '#8B0A0A20', color: '#8B0A0A' }}
                  >
                    Sandbox Demo
                  </span>
                  <span className="text-[10px]" style={{ color: '#5C4A3A' }}>Enkripsi 256-bit</span>
                </div>
                <h3 className="font-display text-xl" style={{ color: '#8B0A0A' }}>
                  Pembayaran TemanKampus Pro 🔒
                </h3>
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition"
                style={{ background: '#5C4A3A30', color: '#2B2B2B' }}
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-5">
              {paymentStatus === 'idle' && (
                <>
                  <div
                    className="p-4 rounded-2xl flex items-center justify-between"
                    style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A' }}
                  >
                    <div>
                      <p className="text-xs font-bold" style={{ color: '#2B2B2B' }}>
                        {selectedPlan === 'pro_semester'
                          ? 'Paket Satu Semester (6 Bulan)'
                          : 'TemanKampus Pro Bulanan'}
                      </p>
                      <p className="text-[11px]" style={{ color: '#5C4A3A' }}>
                        Akses penuh semua fitur wellness
                      </p>
                    </div>
                    <span className="font-display text-lg" style={{ color: '#8B0A0A' }}>
                      {selectedPlan === 'pro_semester' ? 'Rp 49.000' : 'Rp 19.000'}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: '#5C4A3A' }}>
                      Pilih Metode Pembayaran:
                    </label>
                    {paymentMethods.map((group, gIdx) => (
                      <div key={gIdx} className="space-y-1.5">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: '#5C4A3A' }}
                        >
                          {group.category}
                        </span>
                        <div className="space-y-1.5">
                          {group.items.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setSelectedMethod(item.id)}
                              className="w-full p-3 rounded-xl text-left text-xs flex items-center justify-between transition"
                              style={
                                selectedMethod === item.id
                                  ? { border: '2px solid #8B0A0A', background: '#8B0A0A10', color: '#8B0A0A' }
                                  : { background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }
                              }
                            >
                              <span>{item.name}</span>
                              <span className="text-[10px]" style={{ color: '#5C4A3A' }}>
                                {item.fee === 0 ? 'Bebas Biaya' : '+Rp 1.000'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedMethod === 'qris' && (
                    <div
                      className="p-4 rounded-2xl text-center space-y-2"
                      style={{ border: '2px dashed #5C4A3A' }}
                    >
                      <div
                        className="w-32 h-32 mx-auto rounded-xl flex items-center justify-center font-black text-xs"
                        style={{ backgroundColor: '#8B0A0A', color: '#C8BA96' }}
                      >
                        [QRIS CODE]
                      </div>
                      <p className="text-[11px]" style={{ color: '#5C4A3A' }}>
                        Buka GoPay, OVO, ShopeePay untuk simulasi scan
                      </p>
                    </div>
                  )}
                  <button
                    onClick={handleProcessPayment}
                    className="w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#8B0A0A', color: '#C8BA96', border: '2px solid #342B27' }}
                  >
                    <Lock className="w-4 h-4" /> Bayar Sekarang & Aktifkan Pro
                  </button>
                </>
              )}
              {paymentStatus === 'processing' && (
                <div className="py-12 text-center space-y-4">
                  <div
                    className="w-12 h-12 border-4 rounded-full animate-spin mx-auto"
                    style={{ borderColor: '#8B0A0A', borderTopColor: 'transparent' }}
                  />
                  <h4 className="font-black" style={{ color: '#2B2B2B' }}>Memverifikasi Pembayaran...</h4>
                  <p className="text-xs" style={{ color: '#5C4A3A' }}>
                    Menghubungi simulasi server Midtrans/Xendit Sandbox.
                  </p>
                </div>
              )}
              {paymentStatus === 'success' && (
                <div className="py-8 text-center space-y-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: '#C8BA96', color: '#8B0A0A' }}
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-display text-2xl" style={{ color: '#8B0A0A' }}>
                    Pembayaran Berhasil! 🎉
                  </h4>
                  <p className="text-xs max-w-xs mx-auto" style={{ color: '#5C4A3A' }}>
                    Selamat, akun <strong>{user?.name}</strong> kini aktif sebagai{' '}
                    <strong>TemanKampus Pro</strong>.
                  </p>
                  <button
                    onClick={() => setIsPaymentModalOpen(false)}
                    className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm"
                    style={{ backgroundColor: '#8B0A0A', color: '#C8BA96', border: '2px solid #342B27' }}
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

