import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';

const PrivacyConsentBanner = () => {
  const {
    consentStatus,
    acceptStorageConsent,
    useTemporarySession,
    openPrivacyModal,
  } = usePrivacy();

  if (consentStatus !== 'pending') return null;

  return (
    <aside
      role="region"
      aria-label="Persetujuan privasi dan penyimpanan data lokal"
      className="fixed bottom-16 lg:bottom-4 left-4 right-4 lg:left-auto lg:right-6 z-40 lg:max-w-md rounded-xl bg-paper-card border border-line-strong shadow-float p-3.5 animate-enter"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <ShieldCheck
            className="w-4 h-4 text-accent shrink-0 mt-0.5"
            strokeWidth={1.5}
          />
          <div className="space-y-1 text-xs">
            <p className="font-medium text-ink">
              Privasi & penyimpanan data lokal (UU PDP)
            </p>
            <p className="text-ink-secondary leading-relaxed">
              Catatan mood, curhat, dan tugasmu disimpan hanya di perangkat ini agar bisa dilanjutkan kapan saja. Kamu dapat menggunakan mode sementara atau menghapus semua data kapan pun.{' '}
              <button
                type="button"
                onClick={openPrivacyModal}
                className="text-accent font-medium hover:underline underline-offset-2"
              >
                Pelajari privasi
              </button>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={useTemporarySession}
            className="btn-secondary h-8 px-3 text-xs"
          >
            Sesi sementara
          </button>
          <button
            type="button"
            onClick={acceptStorageConsent}
            className="btn-primary h-8 px-3.5 text-xs"
          >
            Setuju & simpan
          </button>
        </div>
      </div>
    </aside>
  );
};

export default PrivacyConsentBanner;
