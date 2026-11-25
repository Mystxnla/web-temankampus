import React, { useState, useRef, useEffect } from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import {
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  Check,
  Wind,
  Activity,
  Headphones,
  Phone,
  ExternalLink,
  ArrowRight,
  X,
} from 'lucide-react';
import { useMood } from '../context/MoodContext';
import { getMoodMeta } from '../utils/moodIcons';
import { detectCrisisKeyword } from '../utils/crisisDetection';
import ClinicalDisclaimerBanner from '../components/layout/ClinicalDisclaimerBanner';

const REC_ICONS = [Wind, Activity, Headphones];

const MoodPage = () => {
  const navigate = useNavigate();
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
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathStage, setBreathStage] = useState({
    label: 'Tarik napas perlahan',
    seconds: 4,
    scale: 'scale-100',
  });
  const breathTimersRef = useRef([]);

  const clearBreathTimers = () => {
    breathTimersRef.current.forEach((id) => clearTimeout(id));
    breathTimersRef.current = [];
  };

  const closeBreathing = () => {
    clearBreathTimers();
    setShowBreathing(false);
  };

  const startBreathing = () => {
    clearBreathTimers();
    setShowBreathing(true);
    setBreathStage({ label: 'Tarik napas perlahan', seconds: 4, scale: 'scale-110' });
    const t1 = setTimeout(() => {
      setBreathStage({ label: 'Tahan dengan tenang', seconds: 7, scale: 'scale-110' });
    }, 4000);
    const t2 = setTimeout(() => {
      setBreathStage({ label: 'Hembuskan pelan lewat mulut', seconds: 8, scale: 'scale-90' });
    }, 11000);
    const t3 = setTimeout(() => {
      setBreathStage({
        label: 'Satu siklus selesai. Rasakan bahumu lebih rileks',
        seconds: 0,
        scale: 'scale-100',
      });
    }, 19000);
    breathTimersRef.current = [t1, t2, t3];
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showBreathing) closeBreathing();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      clearBreathTimers();
    };
  }, [showBreathing]);

  const handleRecAction = (index) => {
    if (index === 0) {
      startBreathing();
    } else if (index === 1) {
      navigate('/focus?preset=short_break');
    } else {
      navigate('/focus?sound=rain&play=1');
    }
  };

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
  const restRecommendations = Array.isArray(recommendations?.rest)
    ? recommendations.rest
    : [];
  const hasCrisisInJournal = detectCrisisKeyword(journalNote);

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

      {/* Clinical Disclaimer */}
      <ClinicalDisclaimerBanner compact />

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
            <label
              htmlFor="mood-journal-note"
              className="block text-xs font-medium text-ink-secondary"
            >
              Catatan jurnal singkat (opsional)
            </label>
            <textarea
              id="mood-journal-note"
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              rows={3}
              placeholder="Tuliskan hal yang sedang kamu rasakan atau pikirkan hari ini"
              className="w-full p-3 rounded-lg bg-paper border border-line-strong text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent resize-none"
            />
            {hasCrisisInJournal && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-accent-soft border border-accent/30 space-y-2.5 animate-enter"
              >
                <p className="text-xs font-medium text-ink">
                  Kamu tidak harus menghadapi beban seberat ini sendirian. Layanan pendampingan darurat siap mendengarkanmu sekarang:
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href="tel:119" className="btn-primary h-8 px-3 text-xs">
                    <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Hubungi 119 ext 8</span>
                  </a>
                  <a
                    href="https://healing119.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary h-8 px-3 text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Healing119.id</span>
                  </a>
                  <button
                    type="button"
                    onClick={openHelpModal}
                    className="btn-secondary h-8 px-3 text-xs"
                  >
                    Semua kontak bantuan
                  </button>
                </div>
              </div>
            )}
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

          {/* Next Step Guidance after Check-in */}
          {(saveSuccess || hasCheckedInToday) && (
            <div className="p-4 rounded-xl bg-calm-surface border border-calm-border space-y-2.5 animate-enter">
              <p className="text-xs font-medium text-ink">
                Langkah yang disarankan setelah check-in:
              </p>
              <p className="text-xs text-ink-secondary leading-relaxed">
                {selectedMoodId === 'stres' || selectedMoodId === 'lelah'
                  ? 'Kondisimu sedang butuh ruang tenang. Kamu bisa latihan napas sebentar atau bercerita ke Mimi tanpa tekanan.'
                  : 'Energi hari ini cukup stabil. Kamu bisa mulai dari satu tugas paling ringan dengan sesi fokus 25 menit.'}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                {selectedMoodId === 'stres' || selectedMoodId === 'lelah' ? (
                  <>
                    <button
                      type="button"
                      onClick={startBreathing}
                      className="btn-primary h-8 px-3 text-xs"
                    >
                      <Wind className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Latihan napas 4-7-8</span>
                    </button>
                    <Link to="/curhat" className="btn-secondary bg-paper-card h-8 px-3 text-xs">
                      <span>Cerita ke Mimi</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/focus" className="btn-primary h-8 px-3 text-xs">
                      <span>Mulai Ruang Fokus</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </Link>
                    <Link to="/tasks" className="btn-secondary bg-paper-card h-8 px-3 text-xs">
                      <span>Lihat daftar tugas</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
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
          {restRecommendations.length > 0 && (
            <section className="surface-card p-5 space-y-3">
              <h3 className="text-sm font-medium text-ink">Rekomendasi rehat</h3>
              <div className="space-y-2.5">
                {restRecommendations.slice(0, 3).map((rec, i) => {
                  const Icon = REC_ICONS[i % REC_ICONS.length];
                  const actionLabel =
                    i === 0
                      ? 'Mulai latihan'
                      : i === 1
                      ? 'Timer 5 menit'
                      : 'Putar audio';
                  return (
                    <button
                      key={rec.title}
                      type="button"
                      onClick={() => handleRecAction(i)}
                      className="w-full text-left p-3 rounded-lg bg-paper border border-line hover:border-line-strong hover:bg-paper-raised/50 transition-colors flex items-start gap-3 group"
                    >
                      <Icon
                        className="w-4 h-4 text-accent shrink-0 mt-0.5"
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
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-accent mt-1.5 group-hover:underline">
                          <span>{actionLabel}</span>
                          <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                        </span>
                      </div>
                    </button>
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

      {/* Breathing Modal inside MoodPage */}
      {showBreathing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mood-breathing-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/35 backdrop-blur-[2px]"
          onClick={closeBreathing}
        >
          <div
            className="bg-paper-card rounded-2xl p-6 max-w-sm w-full border border-line-strong shadow-float space-y-6 animate-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-accent" strokeWidth={1.5} />
                <h3 id="mood-breathing-title" className="text-sm font-semibold text-ink">
                  Latihan napas 4-7-8
                </h3>
              </div>
              <button
                type="button"
                onClick={closeBreathing}
                aria-label="Tutup latihan napas"
                className="w-7 h-7 rounded-lg text-ink-muted hover:text-ink hover:bg-paper-raised flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
            <div className="py-4 flex flex-col items-center justify-center gap-5">
              <div
                className={`w-32 h-32 rounded-full bg-calm-surface border border-calm-border flex items-center justify-center transition-transform duration-[2500ms] ease-unslop ${breathStage.scale}`}
              >
                <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center">
                  <span className="font-mono text-lg font-medium text-accent tabular">
                    {breathStage.seconds > 0 ? `${breathStage.seconds} dtk` : 'Tenang'}
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-ink text-center">
                {breathStage.label}
              </p>
            </div>
            <button type="button" onClick={closeBreathing} className="btn-primary w-full">
              Selesai latihan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodPage;
