import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  Smile, Calendar, AlertTriangle, HeartHandshake, Wind,
  Headphones, CheckCircle2, Sparkles, ArrowRight, TrendingUp, Tag
} from 'lucide-react';
import { useMood } from '../context/MoodContext';
import BobiMascot from '../components/BobiMascot';

const BG = '#6FB899'; // Sage Mint Green

const MoodPage = () => {
  const { openHelpModal } = useOutletContext();
  const { history, options, recommendations, todayMood, hasCheckedInToday, isConsecutiveNegative, logMood, dismissAlert } = useMood();

  const [selectedMoodId, setSelectedMoodId] = useState(todayMood?.moodId || 'baik');
  const [energyLevel, setEnergyLevel] = useState(todayMood?.energyLevel || 3);
  const [journalNote, setJournalNote] = useState(todayMood?.note || '');
  const [selectedTags, setSelectedTags] = useState(todayMood?.tags || ['Kuliah']);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const availableTags = ['Tugas Menumpuk', 'Bimbingan Dospem', 'Kurang Tidur', 'Ujian / Kuis', 'Diskusi Kelompok', 'Organisasi Kampus', 'Olahraga Pagi', 'Waktu Istirahat'];

  const toggleTag = (tag) => setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);

  const handleSubmit = (e) => {
    e.preventDefault();
    logMood(selectedMoodId, journalNote, selectedTags, energyLevel);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const moodColors = { baik: '#6FB899', semangat: '#F7BF52', biasa: '#5C92D1', lelah: '#F28E66', buruk: '#987DC7', anxious: '#E07070' };

  return (
    <div>
      {/* Header on sage green bg */}
      <div className="px-5 sm:px-8 pt-6 pb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Mood & Kesehatan Mental</p>
          <h1 className="hs-headline text-white text-3xl sm:text-4xl">
            Validasi perasaanmu<br />
            <span className="text-white/80 text-2xl font-bold">tanpa menghakimi diri sendiri.</span>
          </h1>
          {hasCheckedInToday && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Check-in hari ini sudah selesai ✨
            </div>
          )}
        </div>
        <BobiMascot pose="hug" size={140} accentColor={BG} />
      </div>

      {/* White card body */}
      <div className="headspace-card px-5 sm:px-8 py-8 space-y-6">

        {/* Crisis alert */}
        {isConsecutiveNegative && (
          <div className="p-4 rounded-2xl text-white flex items-start gap-3" style={{ background: '#E07070' }}>
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-black text-sm">Hai, kami memperhatikanmu 💙</p>
              <p className="text-xs text-white/85 leading-relaxed mt-1">Sudah beberapa hari kamu merasakan kondisi yang berat. Tidak ada salahnya berbicara dengan konselor profesional.</p>
            </div>
            <button onClick={openHelpModal} className="shrink-0 px-3 py-2 bg-white text-red-600 font-black text-xs rounded-full">Cari Bantuan</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Check-in form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="headspace-card-full border border-gray-100 shadow-card-sm p-6 space-y-5">
              <h2 className="font-black text-gray-900 text-xl">Check-In Hari Ini 🌱</h2>

              {/* Mood options */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Kondisi emosionalmu:</p>
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => {
                    const isSelected = selectedMoodId === opt.id;
                    return (
                      <button key={opt.id} type="button" onClick={() => setSelectedMoodId(opt.id)}
                        className={`hs-btn py-2 px-4 text-xs transition-all ${isSelected ? 'text-white shadow-md scale-105' : 'bg-gray-50 text-gray-700 border border-gray-200'}`}
                        style={isSelected ? { backgroundColor: moodColors[opt.id] || BG } : {}}>
                        <span className="text-base">{opt.emoji}</span> {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Energy level */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tingkat energi hari ini:</p>
                  <span className="text-sm font-black" style={{ color: BG }}>{energyLevel}/5</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((lv) => (
                    <button key={lv} type="button" onClick={() => setEnergyLevel(lv)}
                      className="flex-1 h-8 rounded-xl border-2 transition-all font-black text-xs"
                      style={{ borderColor: lv <= energyLevel ? BG : '#E5E7EB', backgroundColor: lv <= energyLevel ? BG : 'transparent', color: lv <= energyLevel ? 'white' : '#9CA3AF' }}>
                      {lv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Apa yang memengaruhi harimu?</p>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button key={tag} type="button" onClick={() => toggleTag(tag)}
                      className={`hs-chip text-[11px] transition-all ${selectedTags.includes(tag) ? 'text-white' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}
                      style={selectedTags.includes(tag) ? { backgroundColor: BG } : {}}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Journal */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Jurnal singkat (opsional):</p>
                <textarea value={journalNote} onChange={(e) => setJournalNote(e.target.value)}
                  rows={3} placeholder="Ceritakan apa yang kamu rasakan hari ini, tanpa filter..."
                  className="w-full p-3 rounded-2xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 text-xs text-gray-700 resize-none transition" />
              </div>

              <button type="submit"
                className="hs-btn w-full justify-center text-white"
                style={{ backgroundColor: BG }}>
                {saveSuccess ? '✅ Check-in Tersimpan!' : 'Simpan Check-in Hari Ini'}
              </button>
            </form>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5 space-y-5">
            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="headspace-card-full border border-gray-100 shadow-card-sm p-5">
                <h3 className="font-black text-gray-900 mb-3">🌿 Rekomendasi Untukmu</h3>
                <div className="space-y-2">
                  {recommendations.slice(0, 3).map((rec, i) => (
                    <div key={i} className="p-3 rounded-xl flex items-start gap-2.5" style={{ background: '#F0FFF8' }}>
                      <span className="text-lg shrink-0">{rec.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{rec.title}</p>
                        <p className="text-[11px] text-gray-500">{rec.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mood history */}
            <div className="headspace-card-full border border-gray-100 shadow-card-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-gray-900">📈 Riwayat Mood</h3>
                <span className="text-[10px] font-bold text-gray-400">7 hari terakhir</span>
              </div>
              <div className="flex items-end gap-2 h-20">
                {history.slice(-7).map((m, i) => {
                  const h = ((m.energyLevel || 3) / 5) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-lg transition-all" style={{ height: `${h}%`, minHeight: '8px', backgroundColor: moodColors[m.moodId] || BG, opacity: 0.75 + i * 0.035 }} />
                      <span className="text-[9px] text-gray-400">{m.date?.slice(5)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Professional help */}
            <div className="p-4 rounded-2xl text-white" style={{ background: 'linear-gradient(135deg, #6FB899, #419F98)' }}>
              <HeartHandshake className="w-5 h-5 mb-2" />
              <p className="font-black text-sm">Butuh bicara dengan profesional?</p>
              <p className="text-xs text-white/80 mt-1 mb-3">Konselor kampus tersedia secara online. Privat dan tanpa biaya.</p>
              <button onClick={openHelpModal} className="px-4 py-2 bg-white rounded-full text-xs font-black" style={{ color: BG }}>
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
