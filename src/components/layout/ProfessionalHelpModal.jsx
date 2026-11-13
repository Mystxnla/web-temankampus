import React from 'react';
import { Phone, HeartHandshake, ShieldAlert, X, ExternalLink, MessageCircle } from 'lucide-react';
import initialMoods from '../../mock-data/moods.json';

const ProfessionalHelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const hotlines = initialMoods.recommendations.emergencySupport.hotlines;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full border-2 border-primary/20 shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4 text-white" />
            <span>Pusat Bantuan & Rujukan Medis</span>
          </div>
          <h2 className="text-2xl font-display uppercase tracking-wide">
            Kamu Tidak Sendirian, Bantuan Selalu Ada
          </h2>
          <p className="text-white/80 text-xs mt-1 leading-relaxed">
            Jika kamu sedang berada dalam situasi krisis emosional atau membutuhkan pendampingan profesional, layanan di bawah ini siap membantumu secara rahasia dan aman.
          </p>
        </div>

        {/* Hotlines List */}
        <div className="p-6 space-y-3.5 max-h-[60vh] overflow-y-auto">
          {hotlines.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-surface-container-low border border-border-light hover:border-primary-container transition flex items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <p className="text-xs font-bold text-dark">{item.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-primary font-mono">{item.number}</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-md text-secondary font-bold border border-border-light">
                    {item.type}
                  </span>
                </div>
              </div>
              <a
                href={item.number.startsWith('+') ? `https://wa.me/${item.number.replace(/[^0-9]/g, '')}` : `tel:${item.number}`}
                className="px-4 py-2 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold tracking-wide transition flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Hubungi</span>
              </a>
            </div>
          ))}

          {/* Campus PKM Support Banner */}
          <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9] flex items-start gap-3 mt-4">
            <HeartHandshake className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-[#1B5E20]">Layanan Konseling Kemahasiswaan Kampus</p>
              <p className="text-[#388E3C] mt-0.5 leading-relaxed">
                Sebagian besar universitas (UI, UNNES, ITB, UGM, dll.) menyediakan konselor sebaya dan psikolog gratis bagi mahasiswa aktif. Kunjungi Gedung PKM / Kemahasiswaan fakultasmu.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface-container border-t border-border-light flex items-center justify-between text-xs">
          <p className="text-on-surface-variant text-[11px]">
            TemanKampus adalah platform pendukung, bukan pengganti layanan darurat.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-dark hover:bg-black text-white text-xs font-bold transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalHelpModal;

