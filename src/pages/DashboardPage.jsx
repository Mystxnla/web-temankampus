import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Send,
  MessageSquare,
  Heart,
  Check,
  Droplets,
  Wind,
  Headphones,
  Play,
  Pause,
  ArrowRight,
  X,
  Calendar,
  BarChart3,
  HeartHandshake,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { useMood } from '../context/MoodContext';
import { getMoodMeta } from '../utils/moodIcons';
import communityData from '../mock-data/community.json';

const MOOD_SUPPORT_COPY = {
  baik: 'Senang dengar kamu merasa cukup baik hari ini. Kamu bisa pakai energi ini untuk satu sesi fokus pendek tanpa perlu memaksakan diri.',
  biasa: 'Hari yang biasa saja tetap valid. Pilih satu hal kecil yang paling ringan untuk dimulai pelan-pelan.',
  stres: 'Kedengarannya hari ini sedang terasa berat. Kamu tidak harus membereskan semuanya sekaligus — coba tarik napas sebentar atau cerita ke Mimi dulu.',
  lelah: 'Tubuh dan pikiranmu sedang minta jeda. Ambil waktu 5 menit untuk minum air, meregangkan bahu, atau istirahat sejenak sebelum lanjut.',
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks, urgentTasks, toggleTaskStatus, setActiveFocusTaskId } = useTasks();
  const { options, todayMood, logMood } = useMood();

  const [activeTab, setActiveTab] = useState('tenang');
  const [waterMl, setWaterMl] = useState(1250);
  const waterTarget = 2000;
  const [curhatInput, setCurhatInput] = useState('');
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathStage, setBreathStage] = useState({
    label: 'Tarik napas perlahan',
    seconds: 4,
    scale: 'scale-100',
  });
  const [isPlayingLofi, setIsPlayingLofi] = useState(false);
  const [joinedStudyJam, setJoinedStudyJam] = useState(false);

  const recentThreads = communityData.threads.slice(0, 2);
  const completedTasksCount = tasks.filter((t) => t.status === 'Selesai').length;
  const firstName = user?.name?.split(' ')[0] || 'Teman';

  const handleMoodSelect = (moodId) =>
    logMood(moodId, 'Check-in cepat dari beranda', ['Check-in Beranda']);
  const handleAddWater = () => setWaterMl((prev) => Math.min(prev + 250, 3000));
  const handleSendCurhat = (e) => {
    e.preventDefault();
    navigate('/curhat', { state: { initialPrompt: curhatInput } });
  };
  const handleFocusTask = (taskId) => {
    setActiveFocusTaskId(taskId);
    navigate('/focus');
  };

  const triggerBreathingExercise = () => {
    setShowBreathing(true);
    setBreathStage({ label: 'Tarik napas perlahan', seconds: 4, scale: 'scale-110' });
    setTimeout(() => {
      setBreathStage({ label: 'Tahan dengan tenang', seconds: 7, scale: 'scale-110' });
      setTimeout(() => {
        setBreathStage({
          label: 'Hembuskan pelan lewat mulut',
          seconds: 8,
          scale: 'scale-90',
        });
        setTimeout(() => {
          setBreathStage({
            label: 'Satu siklus selesai. Rasakan bahumu lebih rileks',
            seconds: 0,
            scale: 'scale-100',
          });
        }, 8000);
      }, 7000);
    }, 4000);
  };

  const scheduleItems = [
    {
      time: '10:00',
      label: 'Interaksi Manusia & Komputer',
      sub: 'R.Lab 304 · Fasilkom',
      isGroup: false,
    },
    {
      time: '14:00',
      label: 'Diskusi Kelompok Metopen',
      sub: 'Ruang Diskusi Perpustakaan',
      isGroup: false,
    },
    {
      time: '19:30',
      label: 'Study Jam TemanKampus',
      sub: 'Voice Room · Sesi Pomodoro bersama',
      isGroup: true,
    },
  ];

  const tabs = [
    { id: 'tenang', label: 'Ruang Tenang', icon: HeartHandshake },
    {
      id: 'kuliah',
      label: 'Prioritas & Agenda',
      icon: Calendar,
      count: urgentTasks.length > 0 ? urgentTasks.length : null,
    },
    { id: 'progres', label: 'Ringkasan Progres', icon: BarChart3 },
  ];

  const activeMoodSupport =
    todayMood?.moodId && MOOD_SUPPORT_COPY[todayMood.moodId]
      ? MOOD_SUPPORT_COPY[todayMood.moodId]
      : null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Step 1: Emotion & Calm First */}
      <section className="surface-calm p-6 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-ink leading-snug">
              Bagaimana kabarmu hari ini, {firstName}?
            </h1>
            <p className="text-sm text-ink-secondary">
              Ambil jeda sebentar untuk menyapa perasaanmu sebelum masuk ke daftar kuliah.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={triggerBreathingExercise}
              className="btn-secondary bg-paper-card h-9 px-3.5 text-xs"
            >
              <Wind className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <span>Latihan napas 4-7-8</span>
            </button>
          </div>
        </div>

        {/* 1-click Mood Check-in */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {options.map((opt) => {
            const isSelected = todayMood?.moodId === opt.id;
            const meta = getMoodMeta(opt.id);
            const Icon = meta.icon;
            return (
              <button
                key={opt.id}
                onClick={() => handleMoodSelect(opt.id)}
                className={`h-11 px-3.5 rounded-lg border text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-colors duration-150 active:scale-[0.98] ${
                  isSelected
                    ? 'bg-accent text-paper-card border-accent shadow-subtle'
                    : 'bg-paper-card text-ink border-calm-border hover:bg-paper'
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

        {/* Empathetic peer-like response based on selected mood */}
        {activeMoodSupport && (
          <div className="pt-4 border-t border-calm-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-sm text-ink-secondary leading-relaxed max-w-2xl">
              {activeMoodSupport}
            </p>
            <Link
              to="/mood"
              className="text-xs font-medium text-accent hover:underline underline-offset-4 inline-flex items-center gap-1 shrink-0"
            >
              <span>Catat di jurnal</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        )}
      </section>

      {/* Step 2: Calm Segmented Tabs (Zero Overwhelm, Everything Accessible) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
        <div
          role="tablist"
          aria-label="Bagian beranda"
          className="inline-flex p-1 rounded-lg bg-paper-raised border border-line"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`h-8 px-3.5 rounded-md text-xs font-medium inline-flex items-center gap-2 transition-colors duration-150 ${
                  active
                    ? 'bg-paper-card text-ink shadow-subtle'
                    : 'text-ink-secondary hover:text-ink'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${active ? 'text-accent' : 'text-ink-muted'}`}
                  strokeWidth={1.5}
                />
                <span>{tab.label}</span>
                {tab.count && (
                  <span className="font-mono text-[11px] text-accent tabular">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-ink-muted hidden sm:block">
          Pilih satu bagian yang kamu butuhkan saat ini
        </p>
      </div>

      {/* TAB 1: RUANG TENANG (Self-care + Mimi + Community) */}
      {activeTab === 'tenang' && (
        <div className="space-y-6 animate-enter">
          {/* Quick Self-Care Strip */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hydration */}
            <div className="surface-card p-5 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <Droplets className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-ink">Minum air hari ini</p>
                    <p className="font-mono text-xs text-ink-muted tabular">
                      {waterMl} / {waterTarget} ml
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleAddWater}
                  className="btn-secondary h-8 px-3 text-xs font-mono tabular"
                >
                  +250 ml
                </button>
              </div>
              <div className="w-full h-1.5 rounded-full bg-paper-raised overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-300 ease-unslop"
                  style={{ width: `${Math.min((waterMl / waterTarget) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Ambience */}
            <div className="surface-card p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Headphones className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">Suara hujan kampus</p>
                  <p className="text-xs text-ink-muted truncate">
                    {isPlayingLofi
                      ? 'Sedang diputar untuk menemanimu'
                      : 'Putar suara lembut saat butuh tenang'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPlayingLofi(!isPlayingLofi)}
                aria-label={isPlayingLofi ? 'Jeda audio' : 'Putar audio'}
                className={`h-9 px-3.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors duration-150 shrink-0 ${
                  isPlayingLofi
                    ? 'bg-accent text-paper-card'
                    : 'bg-paper-raised text-ink hover:bg-paper-hover'
                }`}
              >
                {isPlayingLofi ? (
                  <>
                    <Pause className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Putar</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Mimi + Community */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Mimi AI */}
            <div className="lg:col-span-5 surface-card p-5 flex flex-col justify-between gap-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-accent">Curhat ke Mimi</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-semantic-positive" />
                    Privat
                  </span>
                </div>
                <h2 className="text-base font-medium text-ink">
                  Lagi ada yang mengganjal di pikiranmu?
                </h2>
                <p className="text-xs text-ink-secondary leading-relaxed mt-1 mb-4">
                  Ceritakan saja pelan-pelan. Mimi siap mendengarkan tanpa menghakimi.
                </p>
                <div className="space-y-2">
                  {[
                    'Mimi, aku takut nilai sempro besok mengecewakan.',
                    'Gimana cara mengurangi rasa bersalah saat sedang istirahat?',
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() =>
                        navigate('/curhat', { state: { initialPrompt: prompt } })
                      }
                      className="w-full text-left px-3 py-2.5 rounded-lg bg-paper border border-line text-xs text-ink-secondary hover:text-ink hover:bg-paper-raised transition-colors duration-150"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleSendCurhat}
                className="pt-4 border-t border-line flex items-center gap-2"
              >
                <input
                  type="text"
                  value={curhatInput}
                  onChange={(e) => setCurhatInput(e.target.value)}
                  placeholder="Tulis apa yang kamu rasakan"
                  className="input-field flex-1 text-xs"
                />
                <button
                  type="submit"
                  aria-label="Kirim ke Mimi"
                  className="btn-primary w-9 h-9 p-0 shrink-0"
                >
                  <Send className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </form>
            </div>

            {/* Community Threads */}
            <div className="lg:col-span-7 surface-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-medium text-ink">
                      Cerita dari teman sekampus
                    </h2>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Kamu tidak sendirian menghadapi semester ini
                    </p>
                  </div>
                  <Link
                    to="/community"
                    className="text-xs font-medium text-accent hover:underline underline-offset-4"
                  >
                    Lihat forum
                  </Link>
                </div>

                <div className="space-y-3">
                  {recentThreads.map((thread) => (
                    <Link
                      key={thread.id}
                      to="/community"
                      className="block p-4 rounded-lg bg-paper border border-line hover:border-line-strong transition-colors duration-150"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-xs font-medium text-accent">
                          {thread.category}
                        </span>
                        <span className="font-mono text-[11px] text-ink-muted tabular">
                          {thread.timeAgo}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-ink leading-snug line-clamp-2">
                        {thread.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2.5 text-xs text-ink-muted tabular">
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.5} />
                          {thread.replies?.length || thread.repliesCount || 0} balasan
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5" strokeWidth={1.5} />
                          {thread.hugs} dukungan
                        </span>
                        <span className="ml-auto text-ink-secondary">
                          {thread.faculty}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                <span className="text-xs text-ink-muted">
                  Mau berbagi cerita atau menyemangati teman lain?
                </span>
                <Link to="/community" className="btn-secondary h-8 px-3 text-xs">
                  Tulis cerita
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: PRIORITAS & AGENDA */}
      {activeTab === 'kuliah' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-enter">
          {/* Urgent Tasks */}
          <article className="lg:col-span-7 surface-card p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-medium text-ink">Prioritas hari ini</h2>
                <p className="text-xs text-ink-muted mt-0.5">
                  Kerjakan satu per satu, mulai dari yang paling ringan
                </p>
              </div>
              <Link
                to="/tasks"
                className="text-xs font-medium text-accent hover:underline underline-offset-4"
              >
                Semua tugas ({tasks.length})
              </Link>
            </div>

            <ul className="divide-y divide-line flex-1">
              {urgentTasks.length === 0 ? (
                <li className="py-10 text-center text-sm text-ink-muted">
                  Semua tugas prioritas hari ini sudah selesai. Waktunya istirahat.
                </li>
              ) : (
                urgentTasks.slice(0, 4).map((task) => {
                  const isDone = task.status === 'Selesai';
                  return (
                    <li
                      key={task.id}
                      className="py-3.5 first:pt-1 last:pb-1 flex items-start justify-between gap-3"
                    >
                      <label className="flex items-start gap-3 cursor-pointer min-w-0 flex-1">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleTaskStatus(task.id)}
                          className="mt-0.5 w-4 h-4 rounded border-line-strong accent-accent cursor-pointer shrink-0"
                        />
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-medium leading-snug ${
                              isDone ? 'line-through text-ink-muted' : 'text-ink'
                            }`}
                          >
                            {task.title}
                          </p>
                          <p className="text-xs text-ink-muted mt-0.5">
                            {task.course} ·{' '}
                            <span className="font-mono tabular">
                              {task.dueLabel || 'Hari ini'}
                            </span>
                          </p>
                        </div>
                      </label>

                      {!isDone && (
                        <button
                          onClick={() => handleFocusTask(task.id)}
                          className="btn-secondary h-8 px-2.5 text-xs shrink-0"
                        >
                          <Play className="w-3 h-3" strokeWidth={1.5} />
                          <span>Fokus</span>
                        </button>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </article>

          {/* Today's Agenda */}
          <article className="lg:col-span-5 surface-card p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-ink">Agenda hari ini</h2>
              <span className="font-mono text-xs text-ink-muted tabular">
                13 Nov 2026
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {scheduleItems.map((s) => (
                <div
                  key={s.time}
                  className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                    s.isGroup
                      ? 'bg-calm-surface/60 border-calm-border'
                      : 'bg-paper border-line'
                  }`}
                >
                  <span className="font-mono text-xs font-medium text-ink-secondary tabular pt-0.5 w-11 shrink-0">
                    {s.time}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink leading-snug">{s.label}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{s.sub}</p>
                    {s.isGroup && (
                      <button
                        onClick={() => setJoinedStudyJam(!joinedStudyJam)}
                        className={`mt-2.5 h-7 px-3 rounded-md text-xs font-medium inline-flex items-center gap-1.5 transition-colors duration-150 ${
                          joinedStudyJam
                            ? 'bg-semantic-positive-soft text-semantic-positive'
                            : 'bg-accent text-paper-card hover:bg-accent-hover'
                        }`}
                      >
                        {joinedStudyJam ? (
                          <>
                            <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                            <span>Terdaftar pukul 19:30</span>
                          </>
                        ) : (
                          'Ikut Study Jam'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      )}

      {/* TAB 3: RINGKASAN PROGRES */}
      {activeTab === 'progres' && (
        <section className="space-y-4 animate-enter">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="surface-card p-5">
              <p className="text-xs text-ink-muted">Tugas yang sudah tuntas</p>
              <p className="font-mono text-[28px] font-medium text-ink tabular leading-none mt-2">
                {completedTasksCount}{' '}
                <span className="text-sm font-sans font-normal text-ink-muted">
                  / {tasks.length}
                </span>
              </p>
              <p className="text-xs text-ink-secondary mt-2">
                Setiap langkah kecil tetap berarti
              </p>
            </div>

            <div className="surface-card p-5">
              <p className="text-xs text-ink-muted">Waktu fokus hari ini</p>
              <p className="font-mono text-[28px] font-medium text-accent tabular leading-none mt-2">
                {user?.focusMinutesToday || 105}{' '}
                <span className="text-sm font-sans font-normal text-ink-muted">
                  menit
                </span>
              </p>
              <p className="text-xs text-ink-secondary mt-2 tabular">
                4 sesi selesai · target 6 sesi
              </p>
            </div>

            <div className="surface-card p-5">
              <p className="text-xs text-ink-muted">Konsistensi check-in mood</p>
              <p className="font-mono text-[28px] font-medium text-ink tabular leading-none mt-2">
                {user?.wellnessStreak || 5}{' '}
                <span className="text-sm font-sans font-normal text-ink-muted">
                  hari
                </span>
              </p>
              <p className="text-xs text-semantic-positive mt-2">
                +2 hari dibanding pekan lalu
              </p>
            </div>
          </div>

          <div className="surface-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-ink">
                Ingin melihat pola energimu selama seminggu terakhir?
              </p>
              <p className="text-xs text-ink-secondary mt-0.5">
                Buka Mood Tracker untuk melihat grafik 7 hari dan catatan jurnalmu.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link to="/mood" className="btn-secondary text-xs h-9">
                Lihat Mood Tracker
              </Link>
              <Link to="/focus" className="btn-primary text-xs h-9">
                Buka Ruang Fokus
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Breathing Modal */}
      {showBreathing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/35 backdrop-blur-[2px]"
          onClick={() => setShowBreathing(false)}
        >
          <div
            className="bg-paper-card rounded-2xl p-6 max-w-sm w-full border border-line-strong shadow-float space-y-6 animate-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-accent" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold text-ink">Latihan napas 4-7-8</h3>
              </div>
              <button
                onClick={() => setShowBreathing(false)}
                aria-label="Tutup"
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

            <button
              onClick={() => setShowBreathing(false)}
              className="btn-primary w-full"
            >
              Selesai latihan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
