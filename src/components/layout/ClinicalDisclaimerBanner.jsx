import React from 'react';
import { Info } from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';

const ClinicalDisclaimerBanner = ({ compact = false, className = '' }) => {
  const { openHelpModal } = usePrivacy();

  return (
    <aside
      role="note"
      aria-label="Informasi batasan layanan non-medis"
      className={`rounded-xl bg-paper-raised/80 border border-line ${
        compact ? 'px-4 py-3' : 'p-4'
      } flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${className}`}
    >
      <div className="flex items-start gap-2.5 min-w-0">
        <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
        <p className="text-xs text-ink-secondary leading-relaxed">
          <strong className="font-medium text-ink">Catatan klinis:</strong> TemanKampus adalah ruang pendamping refleksi harian,{' '}
          <strong className="font-medium text-ink">bukan alat diagnosis medis</strong> dan bukan pengganti konsultasi psikolog atau psikiater profesional.
        </p>
      </div>
      <button
        type="button"
        onClick={openHelpModal}
        className="text-xs font-medium text-accent hover:underline underline-offset-4 shrink-0 self-start sm:self-center"
      >
        Kontak darurat 119
      </button>
    </aside>
  );
};

export default ClinicalDisclaimerBanner;
