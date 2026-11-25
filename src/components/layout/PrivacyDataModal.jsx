import React, { useState } from 'react';
import { ShieldCheck, Trash2, CheckCircle2, X, Lock } from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';

const PrivacyDataModal = ({ isOpen, onClose }) => {
  const { consentStatus, acceptStorageConsent, useTemporarySession, clearAllUserData } =
    usePrivacy();
  const [confirmClear, setConfirmClear] = useState(false);
  const [clearedSuccess, setClearedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirmClear = () => {
    clearAllUserData();
    setConfirmClear(false);
    setClearedSuccess(true);
    setTimeout(() => {
      window.location.reload();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div
        className="bg-paper-card rounded-2xl max-w-lg w-full border border-line-strong shadow-float overflow-hidden animate-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-line flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-accent mb-1.5">
              <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
              <span>Kebijakan Privasi & Kontrol Data (UU PDP)</span>
            </div>
            <h2
              id="privacy-modal-title"
              className="text-lg font-semibold text-ink leading-snug"
            >
              Kendali penuh atas data pribadimu
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela privasi"
            className="w-8 h-8 rounded-lg text-ink-muted hover:text-ink hover:bg-paper-raised flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto text-xs text-ink-secondary leading-relaxed">
          <div className="p-4 rounded-xl bg-calm-surface border border-calm-border space-y-1.5">
            <p className="font-medium text-ink flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
              <span>Penyimpanan lokal di perangkatmu</span>
            </p>
            <p>
              Seluruh catatan mood, jurnal harian, percakapan dengan Mimi, daftar tugas, dan preferensi akun hanya tersimpan secara lokal di browser perangkat ini dan tidak dikirim ke server eksternal tanpa izinmu.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-ink">Status penyimpanan saat ini:</p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={acceptStorageConsent}
                className={`h-8 px-3 rounded-lg border text-xs font-medium transition-colors ${
                  consentStatus === 'accepted'
                    ? 'bg-accent text-paper-card border-accent'
                    : 'bg-paper text-ink border-line hover:bg-paper-raised'
                }`}
              >
                Simpan lokal di perangkat
              </button>
              <button
                type="button"
                onClick={useTemporarySession}
                className={`h-8 px-3 rounded-lg border text-xs font-medium transition-colors ${
                  consentStatus === 'temporary'
                    ? 'bg-ink text-paper-card border-ink'
                    : 'bg-paper text-ink border-line hover:bg-paper-raised'
                }`}
              >
                Mode sesi sementara (tanpa simpan)
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-paper-raised/60 border border-line space-y-3">
            <div>
              <p className="font-medium text-ink">Hapus seluruh data sesi mandiri</p>
              <p className="mt-1">
                Menghapus riwayat mood, percakapan curhat Mimi, daftar tugas, postingan komunitas lokal, serta pengaturan akun dari browser ini.
              </p>
            </div>

            {clearedSuccess ? (
              <div className="p-3 rounded-lg bg-semantic-positive-soft text-semantic-positive font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span>Seluruh data lokal berhasil dihapus. Memuat ulang...</span>
              </div>
            ) : confirmClear ? (
              <div className="p-3 rounded-lg bg-semantic-danger-soft border border-line space-y-2.5">
                <p className="font-medium text-ink">
                  Yakin ingin menghapus seluruh riwayat sesi dari perangkat ini?
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleConfirmClear}
                    className="h-8 px-3 rounded-lg bg-semantic-danger text-paper-card text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    Ya, hapus semua data
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="btn-secondary h-8 px-3 text-xs"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="h-8 px-3 rounded-lg border border-line-strong bg-paper-card text-semantic-danger hover:bg-semantic-danger-soft text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Hapus semua data saya</span>
              </button>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-paper-raised/50 border-t border-line flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary h-8 px-4 text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyDataModal;
