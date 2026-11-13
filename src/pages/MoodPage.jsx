import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  HeartHandshake, CheckCircle2, AlertTriangle
} from 'lucide-react';
import { useMood } from '../context/MoodContext';
import KucingMascot from '../components/KucingMascot';

const MoodPage = () => {
  const { openHelpModal } = useOutletContext();
  const {
    history, options, recommendations, todayMood,
    hasCheckedInToday, isConsecutiveNegative, logMood, dismissAlert,
  } = useMood();

  const [selectedMoodId, setSelectedMoodId] = useState(todayMood?.moodId || 'baik');
  const [energyLevel, setEnergyLevel] = useState(todayMood?.energyLevel || 3);
  const [journalNote, setJournalNote] = useState(todayMood?.note || '');
  const [selectedTags, setSelectedTags] = useState(todayMood?.tags || ['Kuliah']);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const availableTags = [
    'Tugas Menumpuk', 'Bimbingan Dospem', 'Kurang Tidur', 'Ujian / Kuis',
    'Diskusi Kelompok', 'Organisasi Kampus', 'Olahraga Pagi', 'Waktu Istirahat',
  ];

  const toggleTag = (tag) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    logMood(selectedMoodId, journalNote, selectedTags, energyLevel);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Use red/blue alternating for mood history bars
  const moodBarColors = ['#8B0A0A', '#4A8DB7', '#8B0A0A', '#4A8DB7', '#8B0A0A', '#4A8DB7', '#8B0A0A'];

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
              Mood & Kesehatan Mental
            </p>
            <h1 className="font-display text-3xl sm:text-4xl" style={{ color: '#4A8DB7' }}>
              Validasi perasaanmu
            </h1>
            <p className="font-hand text-base mt-1" style={{ color: '#1F3A7A' }}>
              tanpa menghakimi diri sendiri.
            </p>
          </div>
          <KucingMascot pose="happy" size={130} />
        </div>
        {hasCheckedInToday && (
          <div
            className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: '#4A8DB720', color: '#4A8DB7', border: '1px solid #4A8DB7' }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Check-in hari ini sudah selesai ✨
          </div>
        )}
      </div>

      {/* ── Card Body ── */}
      <div className="px-5 sm:px-8 py-8 space-y-6">

        {/* Crisis alert */}
        {isConsecutiveNegative && (
          <div
            className="p-4 rounded-2xl flex items-start gap-3"
            style={{ background: '#8B0A0A', color: '#C8BA96' }}
          >
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-black text-sm">Hai, kami memperhatikanmu 💙</p>
              <p className="text-xs leading-relaxed mt-1" style={{ color: 'rgba(247,240,218,0.85)' }}>
                Sudah beberapa hari kamu merasakan kondisi yang berat. Tidak ada salahnya berbicara dengan konselor profesional.
              </p>
            </div>
            <button
              onClick={openHelpModal}
              className="shrink-0 px-3 py-2 rounded-full text-xs font-black"
              style={{ background: '#C8BA96', color: '#8B0A0A' }}
            >
              Cari Bantuan
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Check-in form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5 rounded-3xl"
              style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
            >
              <h2 className="font-black text-xl" style={{ color: '#2B2B2B' }}>Check-In Hari Ini 🌱</h2>

              {/* Mood options */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#5C4A3A' }}>
                  Kondisi emosionalmu:
                </p>
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => {
                    const isSelected = selectedMoodId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedMoodId(opt.id)}
                        className="hs-btn py-2 px-4 text-xs transition-all"
                        style={
                          isSelected
                            ? { backgroundColor: '#8B0A0A', color: '#C8BA96', border: '2px solid #342B27' }
                            : { backgroundColor: '#C8BA96', color: '#2B2B2B', border: '1.5px solid #5C4A3A' }
                        }
                      >
                        <span className="text-base">{opt.emoji}</span> {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Energy level */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#5C4A3A' }}>
                    Tingkat energi hari ini:
                  </p>
                  <span className="text-sm font-black" style={{ color: '#4A8DB7' }}>
                    {energyLevel}/5
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((lv) => (
                    <button
                      key={lv}
                      type="button"
                      onClick={() => setEnergyLevel(lv)}
                      className="flex-1 h-8 rounded-xl border-2 transition-all font-black text-xs"
                      style={{
                        borderColor: lv <= energyLevel ? '#4A8DB7' : '#5C4A3A30',
                        backgroundColor: lv <= energyLevel ? '#4A8DB7' : 'transparent',
                        color: lv <= energyLevel ? '#DDD0A8' : '#5C4A3A',
                      }}
                    >
                      {lv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#5C4A3A' }}>
                  Apa yang memengaruhi harimu?
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className="hs-chip text-[11px] transition-all"
                      style={
                        selectedTags.includes(tag)
                          ? { backgroundColor: '#4A8DB7', color: '#DDD0A8', border: 'none' }
                          : { background: '#C8BA96', color: '#5C4A3A', border: '1px solid #5C4A3A' }
                      }
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Journal */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#5C4A3A' }}>
                  Jurnal singkat (opsional):
                </p>
                <textarea
                  value={journalNote}
                  onChange={(e) => setJournalNote(e.target.value)}
                  rows={3}
                  placeholder="Ceritakan apa yang kamu rasakan hari ini, tanpa filter..."
                  className="w-full p-3 rounded-2xl text-xs resize-none transition"
                  style={{
                    background: '#C8BA96',
                    border: '1.5px solid #5C4A3A',
                    color: '#2B2B2B',
                  }}
                />
              </div>

              <button
                type="submit"
                className="hs-btn w-full justify-center font-black"
                style={{ backgroundColor: '#8B0A0A', color: '#C8BA96', border: '2px solid #342B27' }}
              >
                {saveSuccess ? '✅ Check-in Tersimpan!' : 'Simpan Check-in Hari Ini'}
              </button>
            </form>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5 space-y-5">
            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div
                className="p-5 rounded-3xl"
                style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
              >
                <h3 className="font-black mb-3" style={{ color: '#2B2B2B' }}>🌿 Rekomendasi Untukmu</h3>
                <div className="space-y-2">
                  {recommendations.slice(0, 3).map((rec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl flex items-start gap-2.5"
                      style={{ background: '#C8BA96', border: '1px solid #5C4A3A' }}
                    >
                      <span className="text-lg shrink-0">{rec.icon}</span>
                      <div>
                        <p className="text-xs font-bold" style={{ color: '#2B2B2B' }}>{rec.title}</p>
                        <p className="text-[11px]" style={{ color: '#5C4A3A' }}>{rec.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mood history */}
            <div
              className="p-5 rounded-3xl"
              style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black" style={{ color: '#2B2B2B' }}>📈 Riwayat Mood</h3>
                <span className="text-[10px] font-bold" style={{ color: '#5C4A3A' }}>7 hari terakhir</span>
              </div>
              <div className="flex items-end gap-2 h-20">
                {history.slice(-7).map((m, i) => {
                  const h = ((m.energyLevel || 3) / 5) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-lg transition-all"
                        style={{
                          height: `${h}%`,
                          minHeight: '8px',
                          backgroundColor: moodBarColors[i % moodBarColors.length],
                          opacity: 0.75 + i * 0.035,
                        }}
                      />
                      <span className="text-[9px]" style={{ color: '#5C4A3A' }}>
                        {m.date?.slice(5)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Professional help */}
            <div
              className="p-4 rounded-2xl text-white"
              style={{ background: 'linear-gradient(135deg, #4A8DB7, #1F3A7A)' }}
            >
              <HeartHandshake className="w-5 h-5 mb-2" />
              <p className="font-black text-sm">Butuh bicara dengan profesional?</p>
              <p className="text-xs mt-1 mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Konselor kampus tersedia secara online. Privat dan tanpa biaya.
              </p>
              <button
                onClick={openHelpModal}
                className="px-4 py-2 rounded-full text-xs font-black"
                style={{ background: '#C8BA96', color: '#1F3A7A' }}
              >
                Hubungi Sekarang →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodPage;

