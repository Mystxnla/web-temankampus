import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  Smile,
  Calendar,
  AlertTriangle,
  HeartHandshake,
  Wind,
  Headphones,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { useMood } from '../context/MoodContext';

const MoodPage = () => {
  const { openHelpModal } = useOutletContext();
  const {
    history,
    options,
    recommendations,
    todayMood,
    hasCheckedInToday,
    isConsecutiveNegative,
    logMood,
    dismissAlert
  } = useMood();

  // Active form state
  const [selectedMoodId, setSelectedMoodId] = useState(todayMood?.moodId || 'baik');
  const [energyLevel, setEnergyLevel] = useState(todayMood?.energyLevel || 3);
  const [journalNote, setJournalNote] = useState(todayMood?.note || '');
  const [selectedTags, setSelectedTags] = useState(todayMood?.tags || ['Kuliah']);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Available emotion tags
  const availableTags = [
    'Tugas Menumpuk',
    'Bimbingan Dospem',
    'Kurang Tidur',
    'Ujian / Kuis',
    'Diskusi Kelompok',
    'Organisasi Kampus',
    'Olahraga Pagi',
    'Waktu Istirahat'
  ];

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logMood(selectedMoodId, journalNote, selectedTags, energyLevel);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Calculate 7-day stats
  const last7Days = history.slice(0, 7);
  const avgScore = (
    last7Days.reduce((acc, curr) => acc + (curr.score || 3), 0) / (last7Days.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-secondary font-bold text-xs uppercase tracking-wider mb-2">
          <Smile className="w-3.5 h-3.5" />
          <span>Kesehatan Mental & Emosional</span>
        </div>
        <h1 className="text-3xl font-display uppercase tracking-wide text-dark">
          Mood Tracker & Riwayat Kesejahteraan
        </h1>
        <p className="text-xs sm:text-sm text-[#786D94]">
          Lacak ritme emosi perkuliahanmu, kenali pemicu kelelahan, dan pelihara keseimbangan diri.
        </p>
      </div>

      {/* 1. CONSECUTIVE NEGATIVE MOOD SMART ALERT (PRD Section 5.3 & 6.3) */}
      {isConsecutiveNegative && (
        <div className="bg-gradient-to-r from-amber-500 via-primary to-secondary p-0.5 rounded-3xl shadow-lg animate-fadeIn">
          <div className="bg-white rounded-[22px] p-6 sm:p-7 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-border-light">
              <div className="flex items-center gap-2.5 text-primary">
                <AlertTriangle className="w-6 h-6 shrink-0" />
                <h3 className="text-lg font-display uppercase tracking-wide text-dark">
                  Kamu Telah Mengalami Stres / Kelelahan Beberapa Hari Ini 🌱
                </h3>
              </div>
              <button
                onClick={dismissAlert}
                className="text-xs font-bold text-[#786D94] hover:text-dark hover:underline"
              >
                Tutup Notifikasi ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Sistem mendeteksi bahwa energimu sedang terkuras selama 3 sesi check-in terakhir. Jangan biarkan burnout menumpuk ya. Kamu pantas mendapatkan istirahat tanpa rasa bersalah.
            </p>

            {/* Smart Recommendations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {recommendations.rest.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-surface-container-low border border-border-purple space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{rec.icon}</span>
                    <span className="text-[10px] font-black bg-primary-container text-primary px-2 py-0.5 rounded-md">
                      {rec.duration}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-dark">{rec.title}</p>
                  <p className="text-[11px] text-[#786D94] leading-normal">{rec.description}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={openHelpModal}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Hubungi Bantuan Profesional</span>
              </button>
              <Link
                to="/curhat"
                className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary-hover text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2"
              >
                <span>Curhat ke Mimi AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. DAILY CHECK-IN FORM & 7-DAY ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Check-In Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-border-light shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-border-light">
            <div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                Jurnal Refleksi Hari Ini
              </span>
              <h2 className="text-xl font-display text-dark uppercase tracking-wide">
                Catat Kondisi Emosimu
              </h2>
            </div>
            {hasCheckedInToday && (
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Sudah Check-In
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 4 Mood Choices */}
            <div>
              <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                1. Pilih Kondisi Dominan Hari Ini
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {options.map((opt) => {
                  const isSelected = selectedMoodId === opt.id;
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setSelectedMoodId(opt.id)}
                      className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                        isSelected
                          ? 'border-primary bg-primary text-white shadow-md scale-105 ring-2 ring-primary'
                          : 'border-border-light bg-surface-container-low hover:border-primary text-dark'
                      }`}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <span className="text-[11px] font-bold leading-tight">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Energy Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-dark uppercase tracking-wider">
                  2. Tingkat Energi & Stamina (1 - 5)
                </label>
                <span className="text-xs font-extrabold text-primary px-2.5 py-0.5 rounded-full bg-primary-container">
                  Level {energyLevel} dari 5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(Number(e.target.value))}
                className="w-full h-2 bg-secondary-container rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-[#9E94B8] font-bold pt-1">
                <span>1 (Habis Total)</span>
                <span>3 (Cukup Stabil)</span>
                <span>5 (Maksimal)</span>
              </div>
            </div>

            {/* Tags Selector */}
            <div>
              <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                3. Apa yang Mempengaruhi Perasaanmu?
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`text-xs px-3 py-1.5 rounded-full border font-bold transition flex items-center gap-1 ${
                        active
                          ? 'bg-secondary text-white border-secondary shadow-xs'
                          : 'bg-surface-container-low text-[#5A4F72] border-border-light hover:border-secondary'
                      }`}
                    >
                      <span># {tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Journal Note */}
            <div>
              <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                4. Cerita Singkat / Catatan Pribadi (Privat & Aman)
              </label>
              <textarea
                rows="3"
                value={journalNote}
                onChange={(e) => setJournalNote(e.target.value)}
                placeholder="Tulis apa saja yang sedang kamu pikirkan, keluhan tugas kuliah, atau rasa syukur kecil hari ini..."
                className="w-full px-4 py-3 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark placeholder-[#9E94B8] transition"
              />
            </div>

            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Check-in emosi berhasil disimpan! Statistik mingguanmu telah diperbarui.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-wider transition shadow-md shadow-primary/30"
            >
              Simpan Check-In Hari Ini ✨
            </button>
          </form>
        </div>

        {/* 7-Day History Chart & Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Visual Weekly Chart Card */}
          <div className="bg-white rounded-3xl p-6 border border-border-light shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border-light">
              <div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                  Tren 7 Hari Terakhir
                </span>
                <h3 className="text-xl font-display text-dark uppercase tracking-wide">
                  Grafik Kesejahteraan
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-display text-primary px-2.5 py-0.5 rounded-md bg-primary-container">
                  Avg {avgScore}/4.0
                </span>
              </div>
            </div>

            {/* Bar Chart Visualization */}
            <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
              {last7Days
                .slice()
                .reverse()
                .map((item, idx) => {
                  const heightPercent = (item.score / 4) * 100;
                  const isToday = idx === last7Days.length - 1;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-base sm:text-lg">{item.emoji}</span>
                      <div className="w-full bg-surface-container rounded-t-xl h-24 flex items-end overflow-hidden">
                        <div
                          className={`w-full rounded-t-xl transition-all duration-500 ${
                            item.moodId === 'baik'
                              ? 'bg-emerald-400'
                              : item.moodId === 'biasa'
                              ? 'bg-secondary'
                              : item.moodId === 'stres'
                              ? 'bg-amber-400'
                              : 'bg-primary'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span
                        className={`text-[11px] font-bold ${
                          isToday ? 'text-primary font-black' : 'text-[#786D94]'
                        }`}
                      >
                        {item.dayName}
                      </span>
                    </div>
                  );
                })}
            </div>

            {/* Quick Chart Legend */}
            <div className="pt-3 border-t border-border-light flex flex-wrap items-center justify-between text-[10px] font-bold text-[#786D94]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Semangat
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary" /> Biasa
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Stres
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary" /> Lelah
              </span>
            </div>
          </div>

          {/* Calming Audio & Breathing Shortcut */}
          <div className="bg-gradient-to-br from-secondary to-[#5218A6] rounded-3xl p-6 text-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest font-black bg-white/20 px-2.5 py-0.5 rounded-full">
                Audio Relaksasi
              </span>
              <span className="text-xs text-pink-200 font-bold">10 Menit</span>
            </div>
            <h4 className="text-lg font-display uppercase tracking-wide">
              Meditasi Singkat Melepas Stres Skripsi
            </h4>
            <p className="text-xs text-purple-200 leading-relaxed">
              Panduan audio hening terarah untuk menormalkan detak jantung sebelum presentasi atau bimbingan.
            </p>
            <Link
              to="/focus"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-dark text-xs font-bold uppercase tracking-wider hover:bg-pink-100 transition shadow-sm mt-1"
            >
              <span>Dengarkan di Ruang Fokus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. DETAILED LOG HISTORY CARDS */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-border-light shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border-light">
          <h3 className="text-xl font-display text-dark uppercase tracking-wide">
            Riwayat Catatan Jurnal Emosional
          </h3>
          <span className="text-xs text-[#786D94]">Tersimpan lokal & privat</span>
        </div>

        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-surface-container-low border border-border-light hover:border-border-purple transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white border border-border-light flex items-center justify-center text-xl shadow-xs shrink-0">
                  {item.emoji}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-dark">{item.label}</span>
                    <span className="text-[10px] text-[#9E94B8]">
                      {item.date} ({item.dayName})
                    </span>
                    <span className="text-[10px] bg-secondary-container text-secondary font-extrabold px-2 py-0.5 rounded-md">
                      Energi {item.energyLevel || 3}/5
                    </span>
                  </div>
                  <p className="text-xs text-[#5A4F72] mt-1 leading-relaxed">{item.note}</p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {item.tags?.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-white border border-border-light text-[#786D94] px-2 py-0.5 rounded-full"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MoodPage;
