import React, { useState } from 'react';
import {
  Sparkles, Check, X, CreditCard, QrCode, ShieldCheck,
  Flame, ArrowRight, CheckCircle2, Lock, Wallet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import plansData from '../mock-data/plans.json';
import BobiMascot from '../components/BobiMascot';

const BG = '#4F4D82'; // Midnight Indigo

const PremiumPage = () => {
  const { user, upgradeToPremium, setUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('pro_monthly');
  const [selectedMethod, setSelectedMethod] = useState('qris');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');

  const plans = plansData.plans;
  const paymentMethods = plansData.paymentMethods;

  const handleOpenPayment = (planId) => { setSelectedPlan(planId); setIsPaymentModalOpen(true); setPaymentStatus('idle'); };
  const handleProcessPayment = () => { setPaymentStatus('processing'); setTimeout(() => { upgradeToPremium(); setPaymentStatus('success'); }, 1500); };
  const handleResetFree = () => setUser((prev) => ({ ...prev, isPremium: false }));

  return (
    <div>
      {/* Header on indigo bg */}
      <div className="px-5 sm:px-8 pt-6 pb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Investasi Kesejahteraan Akademik</p>
          <h1 className="hs-headline text-white text-3xl sm:text-4xl">
            Tingkatkan potensimu<br />
            <span className="text-white/80 text-2xl font-bold">dengan TemanKampus Pro. ✨</span>
          </h1>
          <p className="text-white/70 text-sm mt-3 max-w-md">
            Terjangkau dengan tarif mahasiswa. Akses Mimi AI tanpa batas, audio fokus eksklusif, dan analisis psikologis mendalam.
          </p>
        </div>
        <BobiMascot pose="wave" size={140} accentColor={BG} />
      </div>

      {/* White card body */}
      <div className="headspace-card px-5 sm:px-8 py-8 space-y-8">

        {/* Pro status banner */}
        {user?.isPremium && (
          <div className="p-5 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: 'linear-gradient(135deg, #F7BF52, #F28E66)' }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <p className="font-black text-lg text-gray-900">Akunmu Aktif sebagai TemanKampus Pro!</p>
                <p className="text-xs text-gray-700">Semua fitur premium aktif tanpa batasan.</p>
              </div>
            </div>
            <button onClick={handleResetFree} className="px-4 py-2 rounded-xl bg-white/50 hover:bg-white/70 text-gray-900 text-xs font-bold transition shrink-0">
              Reset ke Gratis (Demo)
            </button>
          </div>
        )}

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan) => {
            const isCurrentActive = (!user?.isPremium && plan.id === 'free') || (user?.isPremium && plan.id === 'pro_monthly');
            return (
              <div key={plan.id}
                className={`headspace-card-full border p-6 flex flex-col justify-between transition-all relative ${plan.popular ? 'border-2 shadow-card scale-[1.02] z-10' : 'border-gray-100 shadow-card-sm hover:border-indigo-200'}`}
                style={plan.popular ? { borderColor: BG, boxShadow: `0 8px 30px ${BG}30` } : {}}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-sm"
                    style={{ backgroundColor: BG }}>{plan.badge}</div>
                )}
                <div>
                  <span className="text-xs font-black uppercase tracking-wider" style={{ color: BG }}>{plan.name}</span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-black text-gray-900">{plan.priceFormatted}</span>
                    {plan.price > 0 && <span className="text-xs text-gray-400 font-bold">/{plan.billingCycle}</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed min-h-[36px]">{plan.tagline}</p>
                  <div className="mt-5 pt-4 border-t border-gray-100 space-y-2.5">
                    <p className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Yang kamu dapatkan:</p>
                    <ul className="space-y-2 text-xs text-gray-600">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /><span>{feat}</span>
                        </li>
                      ))}
                      {plan.unavailableFeatures?.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <X className="w-4 h-4 shrink-0 mt-0.5" /><span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  {isCurrentActive ? (
                    <button disabled className="w-full py-3 rounded-2xl bg-gray-100 text-gray-500 font-bold text-xs uppercase tracking-wider cursor-default">
                      ✓ Paket Aktif Saat Ini
                    </button>
                  ) : (
                    <button onClick={() => handleOpenPayment(plan.id)}
                      className="w-full py-3.5 rounded-2xl text-white text-xs font-black uppercase tracking-wider transition shadow-sm hover:scale-[1.02] active:scale-95"
                      style={{ backgroundColor: plan.popular ? BG : '#1A1A2E' }}>
                      {plan.ctaText}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature comparison table */}
        <section className="headspace-card-full border border-gray-100 shadow-card-sm p-6 space-y-4">
          <h3 className="font-black text-gray-900 text-lg pb-2 border-b border-gray-100">📊 Perbandingan Detail Fitur</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Fitur Platform</th>
                  <th className="py-3 px-4">Mahasiswa Bebas</th>
                  <th className="py-3 px-4 font-black" style={{ color: BG }}>TemanKampus Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {[
                  ['Sesi Curhat AI Mimi', '10 Pesan / Hari', 'UNLIMITED 24/7'],
                  ['Laporan & Analisis Emosi', 'Riwayat 7 Hari', 'Bulanan & Export PDF'],
                  ['Suara Latar Ruang Fokus', 'Hujan Kampus Saja', 'Semua Suara & Lo-Fi Bebas'],
                  ['Arsip & Label Tugas', 'Maks 30 Tugas Aktif', 'Tanpa Batas'],
                  ['Dukungan Rujukan Prioritas', 'Hotline Standar', 'Fast-track Konselor Kampus'],
                ].map(([feat, free, pro], i) => (
                  <tr key={i}>
                    <td className="py-3.5 px-4 font-bold text-gray-800">{feat}</td>
                    <td className="py-3.5 px-4">{free}</td>
                    <td className="py-3.5 px-4 font-black" style={{ color: BG }}>{pro}</td>
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
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="p-5 text-white flex items-center justify-between" style={{ backgroundColor: BG }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] bg-white/20 font-bold px-2.5 py-0.5 rounded-full uppercase">Sandbox Demo</span>
                  <span className="text-[10px] text-white/60">Enkripsi 256-bit</span>
                </div>
                <h3 className="font-black text-xl">Pembayaran TemanKampus Pro 🔒</h3>
              </div>
              <button onClick={() => setIsPaymentModalOpen(false)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition">✕</button>
            </div>
            <div className="p-6 space-y-5">
              {paymentStatus === 'idle' && (
                <>
                  <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-800">{selectedPlan === 'pro_semester' ? 'Paket Satu Semester (6 Bulan)' : 'TemanKampus Pro Bulanan'}</p>
                      <p className="text-[11px] text-gray-500">Akses penuh semua fitur wellness</p>
                    </div>
                    <span className="text-lg font-black" style={{ color: BG }}>{selectedPlan === 'pro_semester' ? 'Rp 49.000' : 'Rp 19.000'}</span>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Pilih Metode Pembayaran:</label>
                    {paymentMethods.map((group, gIdx) => (
                      <div key={gIdx} className="space-y-1.5">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{group.category}</span>
                        <div className="space-y-1.5">
                          {group.items.map((item) => (
                            <button key={item.id} onClick={() => setSelectedMethod(item.id)}
                              className={`w-full p-3 rounded-xl border text-left text-xs flex items-center justify-between transition ${selectedMethod === item.id ? 'ring-1 font-bold' : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-indigo-200'}`}
                              style={selectedMethod === item.id ? { borderColor: BG, backgroundColor: BG + '10', color: BG, '--tw-ring-color': BG } : {}}>
                              <span>{item.name}</span>
                              <span className="text-[10px] text-gray-400">{item.fee === 0 ? 'Bebas Biaya' : '+Rp 1.000'}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedMethod === 'qris' && (
                    <div className="p-4 rounded-2xl border border-dashed border-indigo-200 text-center space-y-2">
                      <div className="w-32 h-32 mx-auto rounded-xl flex items-center justify-center font-black text-xs text-white" style={{ backgroundColor: BG }}>
                        [QRIS CODE]
                      </div>
                      <p className="text-[11px] text-gray-400">Buka GoPay, OVO, ShopeePay untuk simulasi scan</p>
                    </div>
                  )}
                  <button onClick={handleProcessPayment}
                    className="w-full py-3.5 rounded-xl text-white text-xs font-black uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
                    style={{ backgroundColor: BG }}>
                    <Lock className="w-4 h-4" /> Bayar Sekarang & Aktifkan Pro
                  </button>
                </>
              )}
              {paymentStatus === 'processing' && (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: BG, borderTopColor: 'transparent' }} />
                  <h4 className="font-black text-gray-900">Memverifikasi Pembayaran...</h4>
                  <p className="text-xs text-gray-500">Menghubungi simulasi server Midtrans/Xendit Sandbox.</p>
                </div>
              )}
              {paymentStatus === 'success' && (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-black text-2xl text-gray-900">Pembayaran Berhasil! 🎉</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">Selamat, akun <strong>{user?.name}</strong> kini aktif sebagai <strong>TemanKampus Pro</strong>.</p>
                  <button onClick={() => setIsPaymentModalOpen(false)}
                    className="px-8 py-3 rounded-xl text-white text-xs font-black uppercase tracking-wider shadow-sm"
                    style={{ backgroundColor: BG }}>Kembali ke Dashboard</button>
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
