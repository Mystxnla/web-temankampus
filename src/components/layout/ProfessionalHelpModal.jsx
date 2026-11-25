import React from 'react';
import { Phone, HeartHandshake, ShieldAlert, X, ExternalLink, LogOut } from 'lucide-react';
import initialMoods from '../../mock-data/moods.json';
import { triggerQuickExit } from '../../utils/crisisDetection';

const ProfessionalHelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const hotlines = initialMoods.recommendations.emergencySupport.hotlines;

  const getHotlineHref = (item) => {
    if (item.url) return item.url;
    if (item.tel) return `tel:${item.tel}`;
    if (item.number.startsWith('+')) {
      return `https://wa.me/${item.number.replace(/[^0-9]/g, '')}`;
    }
    return `tel:${item.number.replace(/[^0-9]/g, '')}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
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
              <span>Pusat bantuan & rujukan krisis</span>
            </div>
            <h2
              id="help-modal-title"
              className="text-lg font-semibold text-ink leading-snug"
            >
              Layanan konseling & dukungan profesional
            </h2>
            <p className="text-xs text-ink-secondary mt-1.5 leading-relaxed">
              Jika kamu berada dalam situasi berat atau membutuhkan pendampingan segera, layanan resmi berikut dapat dihubungi secara rahasia.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela bantuan"
            className="w-8 h-8 rounded-lg text-ink-muted hover:text-ink hover:bg-paper-raised flex items-center justify-center transition-colors duration-150 shrink-0"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Hotlines */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {hotlines.map((item, idx) => {
            const isExternal = Boolean(item.url || item.number.startsWith('+'));
            return (
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
                  href={getHotlineHref(item)}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  aria-label={`Hubungi ${item.name}`}
                  className="btn-primary h-8 px-3 text-xs shrink-0"
                >
                  {item.url ? (
                    <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                  ) : (
                    <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                  )}
                  <span>{item.url ? 'Buka' : 'Hubungi'}</span>
                </a>
              </div>
            );
          })}

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
        <div className="px-6 py-4 bg-paper-raised/50 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-ink-muted">
            TemanKampus bukan alat diagnosis medis dan bukan pengganti layanan darurat.
          </p>
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={triggerQuickExit}
              title="Keluar cepat ke halaman netral"
              className="btn-secondary h-8 px-3 text-xs"
            >
              <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Keluar cepat</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-primary h-8 px-4 text-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalHelpModal;
