import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  Check,
  Wind,
  Activity,
  Headphones,
} from 'lucide-react';
import { useMood } from '../context/MoodContext';
import { getMoodMeta } from '../utils/moodIcons';

const REC_ICONS = [Wind, Activity, Headphones];

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
  } = useMood();

  const [selectedMoodId, setSelectedMoodId] = useState(todayMood?.moodId || 'baik');
  const [energyLevel, setEnergyLevel] = useState(todayMood?.energyLevel || 3);
  const [journalNote, setJournalNote] = useState(todayMood?.note || '');
  const [selectedTags, setSelectedTags] = useState(todayMood?.tags || ['Kuliah']);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const availableTags = [
    'Tugas Menumpuk',
    'Bimbingan Dospem',
    'Kurang Tidur',
    'Ujian / Kuis',
    'Diskusi Kelompok',
    'Organisasi Kampus',
    'Olahraga Pagi',
    'Waktu Istirahat',
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

  const recent7 = history.slice(-7);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-semibold tracking-[-0.02em] text-ink leading-tight">
            Mood tracker
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            Catat kondisi emosi dan tingkat energi harian untuk mengenali pola beban kuliah
          </p>
        </div>

        {hasCheckedInToday && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-semantic-positive-soft text-semantic-positive text-xs font-medium self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Check-in hari ini tersimpan</span>
          </div>
        )}
      </div>

      {/* Crisis Alert */}
      {isConsecutiveNegative && (
        <div className="p-4 rounded-xl bg-accent-soft border border-accent/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle
              className="w-4 h-4 text-accent shrink-0 mt-0.5"
              strokeWidth={1.5}
            />
            <div>
              <p className="text-sm font-medium text-ink">
                Kondisi emosional beberapa hari terakhir terlihat berat
              </p>
              <p className="text-xs text-ink-secondary mt-0.5 leading-relaxed">
                Tidak ada salahnya berbicara dengan konselor kampus atau layanan pendampingan profesional.
              </p>
            </div>
          </div>
          <button
            onClick={openHelpModal}
            className="btn-primary h-8 px-3 text-xs shrink-0"
          >
            Lihat kontak konseling
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Check-in Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 surface-card p-6 space-y-6"
        >
          <h2 className="text-base font-medium text-ink">Check-in hari ini</h2>

          {/* Mood options */}
          <div className="space-y-2.5">
            <label className="block text-xs font-medium text-ink-secondary">
              Kondisi emosional saat ini
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {options.map((opt) => {
                const isSelected = selectedMoodId === opt.id;
                const meta = getMoodMeta(opt.id);
                const Icon = meta.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedMoodId(opt.id)}
                    className={`h-10 px-3.5 rounded-lg border text-sm font-medium flex items-center gap-2.5 transition-colors duration-150 active:scale-[0.98] ${
                      isSelected
                        ? 'bg-ink text-paper-card border-ink'
                        : 'bg-paper text-ink border-line hover:bg-paper-raised'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-paper-card' : 'text-ink-muted'
                      }`}
                      strokeWidth={1.5}
                    />
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Energy Level */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-ink-secondary">
                Tingkat energi tubuh
              </label>
              <span className="font-mono text-xs font-medium text-ink tabular">
                {energyLevel} / 5
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((lv) => {
                const filled = lv <= energyLevel;
                return (
                  <button
                    key={lv}
                    type="button"
                    onClick={() => setEnergyLevel(lv)}
                    className={`h-9 rounded-lg border font-mono text-xs font-medium tabular transition-colors duration-150 ${
                      filled
                        ? 'bg-accent text-paper-card border-accent'
                        : 'bg-paper text-ink-secondary border-line hover:bg-paper-raised'
                    }`}
                  >
                    {lv}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2.5">
            <label className="block text-xs font-medium text-ink-secondary">
              Faktor yang memengaruhi harimu
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`h-8 px-3 rounded-lg border text-xs font-medium transition-colors duration-150 ${
                      active
                        ? 'bg-ink text-paper-card border-ink'
                        : 'bg-paper text-ink-secondary border-line hover:bg-paper-raised hover:text-ink'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Journal */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-ink-secondary">
              Catatan jurnal singkat (opsional)
            </label>
            <textarea
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              rows={3}
              placeholder="Tuliskan hal yang sedang kamu rasakan atau pikirkan hari ini"
              className="w-full p-3 rounded-lg bg-paper border border-line-strong text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent resize-none"
            />
          </div>

          <button type="submit" className="btn-primary w-full h-10">
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4" strokeWidth={1.5} />
                <span>Check-in tersimpan</span>
              </>
            ) : (
              <span>Simpan check-in hari ini</span>
            )}
          </button>
        </form>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* 7-day Mood & Energy Chart (One Moment) */}
          <section className="surface-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-ink">Tren energi 7 hari</h3>
                <p className="text-xs text-ink-muted mt-0.5">Skala 1 hingga 5</p>
              </div>
              <span className="font-mono text-xs text-accent tabular">
                Hari ini: {recent7[recent7.length - 1]?.energyLevel || energyLevel}/5
              </span>
            </div>

            <div className="relative pt-4">
              {/* Muted horizontal reference lines */}
              <div className="absolute inset-x-0 top-4 bottom-6 flex flex-col justify-between pointer-events-none">
                {[5, 3, 1].map((mark) => (
                  <div key={mark} className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-ink-muted w-3 tabular">
                      {mark}
                    </span>
                    <div className="flex-1 border-t border-dashed border-line" />
                  </div>
                ))}
              </div>

              <div className="flex items-end gap-2.5 h-32 pl-5 relative z-10">
                {recent7.map((m, i) => {
                  const pct = ((m.energyLevel || 3) / 5) * 100;
                  const isLatest = i === recent7.length - 1;
                  return (
                    <div
                      key={m.id || i}
                      className="flex-1 h-full flex flex-col justify-end items-center gap-2"
                    >
                      <div className="w-full flex-1 flex items-end">
                        <div
                          className={`w-full rounded-t-md transition-[height] duration-300 ease-unslop ${
                            isLatest ? 'bg-accent' : 'bg-ink/20'
                          }`}
                          style={{ height: `${pct}%`, minHeight: '8px' }}
                          title={`${m.dayName}: Energi ${m.energyLevel}/5 (${m.label})`}
                        />
                      </div>
                      <span
                        className={`font-mono text-[11px] tabular ${
                          isLatest ? 'text-ink font-medium' : 'text-ink-muted'
                        }`}
                      >
                        {m.dayName || m.date?.slice(5)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <section className="surface-card p-5 space-y-3">
              <h3 className="text-sm font-medium text-ink">Rekomendasi rehat</h3>
              <div className="space-y-2.5">
                {recommendations.slice(0, 3).map((rec, i) => {
                  const Icon = REC_ICONS[i % REC_ICONS.length];
                  return (
                    <div
                      key={rec.title}
                      className="p-3 rounded-lg bg-paper border border-line flex items-start gap-3"
                    >
                      <Icon
                        className="w-4 h-4 text-ink-muted shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-medium text-ink">{rec.title}</p>
                          <span className="font-mono text-[11px] text-ink-muted tabular shrink-0">
                            {rec.duration}
                          </span>
                        </div>
                        <p className="text-xs text-ink-secondary mt-0.5 leading-relaxed">
                          {rec.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Professional Help */}
          <section className="surface-calm p-5 space-y-3">
            <div className="flex items-center gap-2 text-accent">
              <HeartHandshake className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-xs font-medium">Konsultasi profesional</span>
            </div>
            <p className="text-sm font-medium text-ink">
              Butuh ruang bicara bersama konselor?
            </p>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Layanan konseling kemahasiswaan kampus dan hotline Sejiwa tersedia secara rahasia.
            </p>
            <button
              onClick={openHelpModal}
              className="btn-primary h-9 px-4 text-xs"
            >
              Lihat kontak konseling
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MoodPage;
