import React, { useState } from 'react';
import { Check, X, Lock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import plansData from '../mock-data/plans.json';

const PremiumPage = () => {
  const { user, upgradeToPremium, setUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('pro_monthly');
  const [selectedMethod, setSelectedMethod] = useState('qris');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');

  const plans = plansData.plans;
  const paymentMethods = plansData.paymentMethods;

  const activePlanObj = plans.find((p) => p.id === selectedPlan) || plans[1];

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
    }, 1000);
  };

  const handleResetFree = () => setUser((prev) => ({ ...prev, isPremium: false }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-2xl sm:text-[28px] font-semibold tracking-[-0.02em] text-ink leading-tight">
          Paket TemanKampus Pro
        </h1>
        <p className="text-sm text-ink-secondary mt-1.5 leading-relaxed">
          Tarif ramah mahasiswa mulai Rp 8.100 per bulan. Akses curhat Mimi AI tanpa batas kuota harian, seluruh suara latar fokus, dan ekspor laporan mood.
        </p>
      </div>

      {/* Active Pro Banner */}
      {user?.isPremium && (
        <div className="p-5 surface-calm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2
              className="w-5 h-5 text-accent shrink-0 mt-0.5"
              strokeWidth={1.5}
            />
            <div>
              <p className="text-sm font-medium text-ink">Akun aktif sebagai TemanKampus Pro</p>
              <p className="text-xs text-ink-secondary mt-0.5">
                Seluruh fitur akademik dan kesehatan mental tersedia tanpa batas kuota.
              </p>
            </div>
          </div>
          <button
            onClick={handleResetFree}
            className="btn-secondary h-8 px-3 text-xs shrink-0"
          >
            Reset ke paket bebas (demo)
          </button>
        </div>
      )}

      {/* Plans Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {plans.map((plan) => {
          const isCurrentActive =
            (!user?.isPremium && plan.id === 'free') ||
            (user?.isPremium &&
              (plan.id === 'pro_monthly' || plan.id === 'pro_semester'));
          const isRecommended = plan.id === 'pro_monthly';

          return (
            <div
              key={plan.id}
              className={`p-6 rounded-xl bg-paper-card flex flex-col justify-between border ${
                isRecommended
                  ? 'border-accent shadow-subtle'
                  : 'border-line shadow-subtle'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-medium text-ink-secondary">
                    {plan.name}
                  </span>
                  {plan.badge && (
                    <span
                      className={`font-mono text-[11px] px-2 py-0.5 rounded-md ${
                        isRecommended
                          ? 'bg-accent-soft text-accent font-medium'
                          : 'bg-paper-raised text-ink-muted'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl sm:text-3xl font-medium text-ink tabular">
                    {plan.priceFormatted}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-xs text-ink-muted">/ {plan.billingCycle}</span>
                  )}
                </div>

                <p className="text-xs text-ink-secondary mt-2.5 leading-relaxed min-h-[36px]">
                  {plan.tagline}
                </p>

                <div className="mt-5 pt-5 border-t border-line space-y-2.5">
                  <ul className="space-y-2.5 text-xs">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-ink">
                        <Check
                          className="w-4 h-4 text-accent shrink-0 mt-0.5"
                          strokeWidth={1.5}
                        />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                    {plan.unavailableFeatures?.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-ink-muted/70"
                      >
                        <X className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-line">
                {isCurrentActive ? (
                  <button
                    disabled
                    className="w-full h-9 rounded-lg bg-paper-raised border border-line text-xs font-medium text-ink-muted cursor-default"
                  >
                    Paket aktif saat ini
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenPayment(plan.id)}
                    className={`w-full h-9 text-xs ${
                      isRecommended ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* Comparison Table */}
      <section className="surface-card overflow-hidden">
        <div className="px-6 py-4 border-b border-line">
          <h2 className="text-sm font-medium text-ink">Perbandingan fitur paket</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-line bg-paper-raised/50 text-ink-secondary">
                <th className="py-3 px-6 font-medium">Fitur platform</th>
                <th className="py-3 px-6 font-medium">Mahasiswa Bebas</th>
                <th className="py-3 px-6 font-medium text-accent">TemanKampus Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ['Sesi curhat AI Mimi', '10 pesan / hari', 'Tanpa batas kuota 24/7'],
                ['Laporan & riwayat emosi', 'Riwayat 7 hari', 'Analisis bulanan & ekspor PDF'],
                ['Audio ambience ruang fokus', 'Hujan kampus standar', 'Semua suara latar lengkap'],
                ['Daftar & arsip tugas', 'Maksimal 30 tugas aktif', 'Tanpa batas'],
                ['Dukungan bantuan konseling', 'Hotline standar', 'Prioritas rujukan kampus'],
              ].map(([feat, free, pro]) => (
                <tr key={feat} className="hover:bg-paper-raised/30 transition-colors">
                  <td className="py-3.5 px-6 font-medium text-ink">{feat}</td>
                  <td className="py-3.5 px-6 text-ink-secondary">{free}</td>
                  <td className="py-3.5 px-6 font-medium text-ink">{pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-[2px]"
          onClick={() => setIsPaymentModalOpen(false)}
        >
          <div
            className="bg-paper-card rounded-2xl max-w-md w-full border border-line-strong shadow-float overflow-hidden animate-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-line flex items-center justify-between">
              <div>
                <p className="font-mono text-[11px] text-ink-muted">
                  Simulasi pembayaran sandbox
                </p>
                <h3 className="text-base font-semibold text-ink mt-0.5">
                  Aktivasi {activePlanObj.name}
                </h3>
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                aria-label="Tutup"
                className="w-8 h-8 rounded-lg text-ink-muted hover:text-ink hover:bg-paper-raised flex items-center justify-center"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {paymentStatus === 'success' ? (
              <div className="p-8 text-center space-y-4">
                <CheckCircle2
                  className="w-10 h-10 text-semantic-positive mx-auto"
                  strokeWidth={1.5}
                />
                <div>
                  <h4 className="text-base font-semibold text-ink">
                    Aktivasi Pro berhasil
                  </h4>
                  <p className="text-xs text-ink-secondary mt-1">
                    Seluruh fitur TemanKampus Pro kini aktif pada akun demomu.
                  </p>
                </div>
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="btn-primary w-full"
                >
                  Kembali ke halaman Pro
                </button>
              </div>
            ) : (
              <div className="p-6 space-y-5">
                <div className="p-4 rounded-xl bg-paper border border-line flex items-center justify-between">
                  <div>
                    <p className="text-xs text-ink-muted">Total pembayaran</p>
                    <p className="font-mono text-lg font-medium text-ink tabular mt-0.5">
                      {activePlanObj.priceFormatted}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-ink-muted">
                    {activePlanObj.billingCycle}
                  </span>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {paymentMethods.map((group) => (
                    <div key={group.category} className="space-y-1.5">
                      <p className="text-xs font-medium text-ink-muted">
                        {group.category}
                      </p>
                      {group.items.map((method) => {
                        const active = selectedMethod === method.id;
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setSelectedMethod(method.id)}
                            className={`w-full px-3.5 py-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-colors duration-150 ${
                              active
                                ? 'bg-paper-raised border-accent text-ink font-medium'
                                : 'bg-paper-card border-line text-ink-secondary hover:bg-paper-raised/50'
                            }`}
                          >
                            <span className="truncate">{method.name}</span>
                            <span className="font-mono text-[11px] text-ink-muted tabular shrink-0 ml-2">
                              {method.fee === 0 ? 'Gratis' : `+Rp ${method.fee}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-2.5">
                  <button
                    onClick={handleProcessPayment}
                    disabled={paymentStatus === 'processing'}
                    className="btn-primary w-full h-10"
                  >
                    <Lock className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>
                      {paymentStatus === 'processing'
                        ? 'Memproses pembayaran...'
                        : 'Konfirmasi pembayaran demo'}
                    </span>
                  </button>
                  <p className="text-[11px] text-ink-muted text-center">
                    Mode simulasi MVP — tidak ada saldo yang dipotong.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumPage;
