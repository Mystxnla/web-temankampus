import React from 'react';
import { Phone, HeartHandshake, ShieldAlert, X } from 'lucide-react';
import initialMoods from '../../mock-data/moods.json';

const ProfessionalHelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const hotlines = initialMoods.recommendations.emergencySupport.hotlines;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-paper-card rounded-2xl max-w-lg w-full border border-line-strong shadow-float overflow-hidden animate-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-line flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-accent mb-2">
              <ShieldAlert className="w-4 h-4" strokeWidth={1.5} />
              <span>Pusat bantuan & rujukan</span>
            </div>
            <h2 className="text-lg font-semibold text-ink leading-snug">
              Layanan konseling & dukungan profesional
            </h2>
            <p className="text-xs text-ink-secondary mt-1.5 leading-relaxed">
              Jika kamu berada dalam situasi berat atau membutuhkan pendampingan profesional, layanan berikut dapat dihubungi secara rahasia.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="w-8 h-8 rounded-lg text-ink-muted hover:text-ink hover:bg-paper-raised flex items-center justify-center transition-colors duration-150 shrink-0"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Hotlines */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {hotlines.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-paper-raised/60 border border-line flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{item.name}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="font-mono text-xs font-medium text-accent tabular">
                    {item.number}
                  </span>
                  <span className="text-xs text-ink-muted">· {item.type}</span>
                </div>
              </div>
              <a
                href={
                  item.number.startsWith('+')
                    ? `https://wa.me/${item.number.replace(/[^0-9]/g, '')}`
                    : `tel:${item.number}`
                }
                className="btn-primary h-8 px-3 text-xs shrink-0"
              >
                <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Hubungi</span>
              </a>
            </div>
          ))}

          {/* Campus counseling */}
          <div className="p-4 rounded-xl bg-semantic-positive-soft border border-line flex items-start gap-3">
            <HeartHandshake
              className="w-4 h-4 text-semantic-positive shrink-0 mt-0.5"
              strokeWidth={1.5}
            />
            <div className="text-xs">
              <p className="font-medium text-ink">Layanan konseling kemahasiswaan kampus</p>
              <p className="text-ink-secondary mt-1 leading-relaxed">
                Sebagian besar universitas menyediakan konselor sebaya dan psikolog gratis bagi mahasiswa aktif melalui unit kemahasiswaan atau klinik kampus.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-paper-raised/50 border-t border-line flex items-center justify-between gap-4">
          <p className="text-xs text-ink-muted">
            TemanKampus adalah pendamping harian, bukan pengganti layanan darurat medis.
          </p>
          <button onClick={onClose} className="btn-secondary h-8 px-4 text-xs shrink-0">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalHelpModal;
