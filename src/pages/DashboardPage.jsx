import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  Clock,
  Flame,
  Plus,
  ArrowRight,
  Droplet,
  Wind,
  Headphones,
  Send,
  MessageSquare,
  Heart,
  ChevronRight,
  Sparkles,
  Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { useMood } from '../context/MoodContext';
import communityData from '../mock-data/community.json';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks, urgentTasks, toggleTaskStatus } = useTasks();
  const { options, todayMood, logMood } = useMood();

  // Water intake state
  const [waterMl, setWaterMl] = useState(1250);
  const waterTarget = 2000;

  // Curhat quick input state
  const [curhatInput, setCurhatInput] = useState('');

  // 4-7-8 Breathing mini modal state
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Tarik Napas (4d)');

  // Lo-Fi Audio simulated state
  const [isPlayingLofi, setIsPlayingLofi] = useState(false);

  // Community threads preview
  const recentThreads = communityData.threads.slice(0, 2);

  const handleMoodSelect = (moodId) => {
    logMood(moodId, 'Check-in cepat dari beranda', ['Check-in Beranda']);
  };

  const handleAddWater = () => {
    setWaterMl((prev) => Math.min(prev + 250, 3000));
  };

  const handleSendCurhat = (e) => {
    e.preventDefault();
    if (curhatInput.trim()) {
      navigate('/curhat', { state: { initialPrompt: curhatInput } });
    } else {
      navigate('/curhat');
    }
  };

  const triggerBreathingExercise = () => {
    setShowBreathing(true);
    setBreathPhase('Tarik Napas perlahan (4 detik)... 🌸');
    setTimeout(() => {
      setBreathPhase('Tahan napas (7 detik)... 🧘');
      setTimeout(() => {
        setBreathPhase('Hembuskan pelan lewat mulut (8 detik)... 🍃');
        setTimeout(() => {
          setBreathPhase('Hebat! Tubuhmu kini lebih tenang ✨');
        }, 8000);
      }, 7000);
    }, 4000);
  };

  return (
    <div className="space-y-8 select-none">
      {/* 1. MOOD CHECK-IN BANNER */}
      <section className="bg-surface-container rounded-3xl p-6 sm:p-8 border border-border-purple shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-secondary font-black text-[11px] uppercase tracking-wider mb-3 shadow-xs border border-border-light">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Check-In Hari Ini
          </div>
          <h2 className="text-2xl sm:text-3xl font-display text-dark tracking-wide mb-2 uppercase">
            Gimana perasaanmu hari ini, {user?.name?.split(' ')[0] || 'Teman'}? 🌱
          </h2>
          <p className="text-on-surface-variant text-xs sm:text-sm mb-6 leading-relaxed">
            Validasi perasaanmu dulu sebelum mulai berkegiatan. Nafas pelan-pelan ya, tidak perlu buru-buru menuntut sempurna.
          </p>

          {/* Interactive Mood Selectors */}
          <div className="flex flex-wrap items-center gap-2.5">
            {options.map((opt) => {
              const isSelected = todayMood?.moodId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleMoodSelect(opt.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-primary text-white border-primary ring-2 ring-primary scale-105'
                      : 'bg-white hover:bg-primary-container text-dark border border-border-light hover:scale-105'
                  }`}
                >
                  <span>{opt.emoji}</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
            <Link
              to="/mood"
              className="text-xs text-primary font-extrabold hover:underline ml-2"
            >
              Catat Jurnal Lengkap →
            </Link>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 opacity-25 pointer-events-none hidden lg:block">
          <svg fill="none" height="260" viewBox="0 0 260 260" width="260">
            <circle cx="130" cy="130" fill="#E2CEFD" r="110" />
            <rect fill="#FF2E93" height="90" rx="30" transform="rotate(25 130 130)" width="90" x="85" y="85" />
          </svg>
        </div>
      </section>

      {/* 2. STUDENT METRICS SUMMARY BAR */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-border-light shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Metric Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10 w-full lg:w-auto">
          {/* Metric 1 */}
          <div className="flex items-center gap-4">
            <span className="text-4xl sm:text-5xl font-display text-dark tracking-wide">
              {urgentTasks.length}
            </span>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-primary">
                Tugas Kuliah
              </p>
              <p className="text-xs text-[#786D94]">Mendesak pekan ini</p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex items-center gap-4 sm:border-l sm:border-border-light sm:pl-8">
            <span className="text-4xl sm:text-5xl font-display text-dark tracking-wide">
              1J 45M
            </span>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-secondary">
                Waktu Fokus
              </p>
              <p className="text-xs text-[#786D94]">Pomodoro hari ini</p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex items-center gap-4 sm:border-l sm:border-border-light sm:pl-8">
            <span className="text-4xl sm:text-5xl font-display text-dark tracking-wide flex items-center gap-1">
              {user?.wellnessStreak || 5} <span className="text-2xl">🔥</span>
            </span>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-primary">
                Hari Streak
              </p>
              <p className="text-xs text-[#786D94]">Belajar sehat terjaga</p>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-start lg:justify-end shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-border-light">
          <Link
            to="/tasks"
            className="px-6 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-black tracking-wider uppercase shadow-md shadow-primary/30 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Tugas</span>
          </Link>
          <Link
            to="/focus"
            className="px-6 py-3.5 rounded-full bg-dark hover:bg-black text-white text-xs font-black tracking-wider uppercase shadow-sm transition-all flex items-center gap-2"
          >
            <span>Mulai Ruang Fokus ⏱️</span>
          </Link>
        </div>
      </section>

      {/* 3. THREE-COLUMN CARD BLOCK */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Urgent Course Tasks */}
        <article className="bg-white rounded-3xl p-6 border border-border-light shadow-sm flex flex-col justify-between hover:shadow-md hover:border-border-purple transition-all">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-border-light mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <h3 className="font-display text-xl text-dark tracking-wide uppercase">
                  Tugas Mendesak
                </h3>
              </div>
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-primary-container text-primary tracking-wide">
                Due Segera
              </span>
            </div>

            {/* Task List */}
            <ul className="space-y-3">
              {urgentTasks.slice(0, 3).map((task) => (
                <li
                  key={task.id}
                  className="p-3.5 rounded-2xl bg-surface-container-low border border-border-light hover:border-primary-container transition"
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.status === 'Selesai'}
                      onChange={() => toggleTaskStatus(task.id)}
                      className="mt-1 w-4 h-4 text-primary rounded border-border-purple focus:ring-primary cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold text-dark leading-snug ${task.status === 'Selesai' ? 'line-through text-gray-400' : ''}`}>
                        {task.course}
                      </p>
                      <p className="text-xs text-[#786D94] truncate">{task.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] bg-primary-container text-primary font-black px-2 py-0.5 rounded-md">
                          {task.dueLabel || 'Hari ini'}
                        </span>
                        <span className="text-[10px] text-[#9E94B8]">
                          ⏱️ Est. {task.estimatedMinutes} mnt
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 mt-4 border-t border-border-light">
            <Link
              to="/tasks"
              className="block w-full py-2.5 rounded-full border border-border-purple text-xs font-black text-dark text-center hover:bg-surface-container transition uppercase tracking-wider"
            >
              Lihat Semua {tasks.length} Tugas →
            </Link>
          </div>
        </article>

        {/* Card 2: Schedule & Study Sessions */}
        <article className="bg-white rounded-3xl p-6 border border-border-light shadow-sm flex flex-col justify-between hover:shadow-md hover:border-border-purple transition-all">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-border-light mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-secondary" />
                <h3 className="font-display text-xl text-dark tracking-wide uppercase">
                  Agenda & Kuliah
                </h3>
              </div>
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-secondary-container text-secondary tracking-wide">
                Hari Ini
              </span>
            </div>

            {/* Timeline List */}
            <div className="space-y-4">
              {/* Item 1 */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="w-8 h-8 rounded-full bg-primary-container text-primary font-display text-sm flex items-center justify-center">
                    10
                  </span>
                  <span className="w-0.5 h-12 bg-border-light my-1" />
                </div>
                <div className="pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-dark">Interaksi Manusia & Komputer</span>
                    <span className="text-[10px] bg-surface-container-low border border-secondary-container text-secondary font-bold px-1.5 py-0.5 rounded">
                      R.Lab 304
                    </span>
                  </div>
                  <p className="text-xs text-[#786D94]">10:00 - 12:30 WIB · Dosen: Dr. Ir. Herman</p>
                  <span className="inline-block mt-1 text-[11px] text-primary font-bold">
                    🔔 Mulai dalam 45 menit
                  </span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="w-8 h-8 rounded-full bg-secondary-container text-secondary font-display text-sm flex items-center justify-center">
                    14
                  </span>
                  <span className="w-0.5 h-10 bg-border-light my-1" />
                </div>
                <div className="pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-dark">Diskusi Kelompok Sempro</span>
                    <span className="text-[10px] bg-surface-container-low border border-secondary-container text-secondary font-bold px-1.5 py-0.5 rounded">
                      Discord
                    </span>
                  </div>
                  <p className="text-xs text-[#786D94]">14:00 - 15:30 WIB · Bersama Arya & Fika</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="w-8 h-8 rounded-full bg-surface-container text-dark font-display text-sm flex items-center justify-center">
                    19
                  </span>
                </div>
                <div className="pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-dark">Study Jam TemanKampus</span>
                    <span className="text-[10px] bg-surface-container-low border border-secondary-container text-secondary font-bold px-1.5 py-0.5 rounded">
                      Voice Room
                    </span>
                  </div>
                  <p className="text-xs text-[#786D94]">19:30 - 21:00 WIB · Sesi Pomodoro Bareng</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-border-light">
            <Link
              to="/tasks"
              className="block w-full py-2.5 rounded-full border border-border-purple text-xs font-black text-dark text-center hover:bg-surface-container transition uppercase tracking-wider"
            >
              Buka Kalender Akademik →
            </Link>
          </div>
        </article>

        {/* Card 3: Wellness & Rehat Kebiasaan */}
        <article className="bg-white rounded-3xl p-6 border border-border-light shadow-sm flex flex-col justify-between hover:shadow-md hover:border-border-purple transition-all">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-border-light mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <h3 className="font-display text-xl text-dark tracking-wide uppercase">
                  Ruang Rehat & Nutrisi
                </h3>
              </div>
              <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-primary-container text-primary tracking-wide">
                Self-Care
              </span>
            </div>

            {/* Wellness Habits */}
            <div className="space-y-3.5">
              {/* Water Habit */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-border-light">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">💧</span>
                    <div>
                      <p className="text-xs font-bold text-dark">Hidrasi Kampus</p>
                      <p className="text-[11px] text-[#786D94]">
                        Target: {waterTarget} ml ({waterMl} ml)
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleAddWater}
                    className="px-3 py-1 bg-white border border-primary-container text-primary font-extrabold text-[11px] rounded-full shadow-xs hover:bg-primary-container transition"
                  >
                    +250ml
                  </button>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-secondary-container rounded-full h-1.5 mt-2.5 overflow-hidden">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((waterMl / waterTarget) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Breathing Habit */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-border-light flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🌬️</span>
                  <div>
                    <p className="text-xs font-bold text-dark">Teknik Napas 4-7-8</p>
                    <p className="text-[11px] text-[#786D94]">Relaksasi 3 menit saat cemas tugas</p>
                  </div>
                </div>
                <button
                  onClick={triggerBreathingExercise}
                  className="px-3.5 py-1.5 bg-secondary text-white font-bold text-xs rounded-full shadow-sm hover:bg-secondary-hover transition"
                >
                  Mulai
                </button>
              </div>

              {/* Lo-Fi Habit */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-border-light flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🎧</span>
                  <div>
                    <p className="text-xs font-bold text-dark">Lo-Fi Hujan Kampus UI</p>
                    <p className="text-[11px] text-[#786D94]">
                      {isPlayingLofi ? 'Sedang Memutar... 🎵' : 'Musik ambient penenang belajar'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPlayingLofi(!isPlayingLofi)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition shadow-sm ${
                    isPlayingLofi ? 'bg-secondary text-white animate-pulse' : 'bg-primary text-white hover:bg-primary-hover'
                  }`}
                >
                  <span className="text-xs">{isPlayingLofi ? '⏸' : '▶'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-border-light">
            <Link
              to="/mood"
              className="block w-full py-2.5 rounded-full border border-border-purple text-xs font-black text-dark text-center hover:bg-surface-container transition uppercase tracking-wider"
            >
              Eksplorasi Audio Meditasi →
            </Link>
          </div>
        </article>
      </section>

      {/* 4. COMMUNITY & AI COMPANION SPLIT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mimi AI Companion Prompt Box (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-secondary to-[#5016AB] rounded-3xl p-7 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-widest font-black bg-white/20 px-3 py-1 rounded-full text-white">
                AI Companion
              </span>
              <span className="flex items-center gap-1.5 text-xs text-pink-200">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                Mimi Sedang Online
              </span>
            </div>
            <h3 className="text-2xl font-display uppercase tracking-wide mb-2 leading-tight">
              Ada yang mengganjal di pikiranmu?
            </h3>
            <p className="text-[#E0D3F8] text-xs leading-relaxed mb-6">
              Mimi siap mendengarkan tanpa menghakimi. Ceritakan tentang dosen pembimbing, kejenuhan skripsi, atau lelahnya hari ini.
            </p>

            {/* Quick conversation prompts */}
            <div className="space-y-2">
              <button
                onClick={() =>
                  navigate('/curhat', {
                    state: { initialPrompt: 'Mimi, aku takut nilai sempro besok mengecewakan...' }
                  })
                }
                className="w-full text-left p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 text-xs transition text-white font-medium"
              >
                💬 "Mimi, aku takut nilai sempro besok mengecewakan..."
              </button>
              <button
                onClick={() =>
                  navigate('/curhat', {
                    state: { initialPrompt: 'Gimana cara ngilangin rasa bersalah kalau lagi istirahat?' }
                  })
                }
                className="w-full text-left p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 text-xs transition text-white font-medium"
              >
                🌧️ "Gimana cara ngilangin rasa bersalah kalau lagi istirahat?"
              </button>
            </div>
          </div>

          {/* Quick Chat Input Box */}
          <form
            onSubmit={handleSendCurhat}
            className="relative z-10 mt-6 pt-5 border-t border-white/15 flex items-center gap-3"
          >
            <input
              type="text"
              value={curhatInput}
              onChange={(e) => setCurhatInput(e.target.value)}
              placeholder="Tulis ceritamu ke Mimi..."
              className="flex-1 bg-white/15 text-white placeholder-[#D6C5F6] text-xs rounded-xl px-4 py-2.5 border border-white/20 focus:outline-none focus:bg-white focus:text-dark focus:placeholder-gray-400 transition"
            />
            <button
              type="submit"
              className="p-2.5 bg-primary text-white hover:bg-primary-hover rounded-xl font-bold shadow-md transition shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Ruang Komunitas Mahasiswa Sebaya (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-7 border border-border-light shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-[11px] font-black tracking-wider text-primary uppercase">
                  Ruang Aman Berbagi
                </span>
                <h3 className="text-2xl font-display text-dark tracking-wide uppercase mt-0.5">
                  Diskusi Hangat Mahasiswa Sebaya
                </h3>
              </div>
              <Link
                to="/community"
                className="text-xs font-black text-secondary hover:underline uppercase tracking-wide"
              >
                Lihat Semua Thread →
              </Link>
            </div>

            {/* Community Threads */}
            <div className="space-y-4">
              {recentThreads.map((thread) => (
                <Link
                  key={thread.id}
                  to="/community"
                  className="block p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-border-light transition cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-secondary-container text-secondary">
                      {thread.category}
                    </span>
                    <span className="text-[11px] text-[#9E94B8]">{thread.timeAgo}</span>
                  </div>
                  <h4 className="text-xs font-bold text-dark leading-snug hover:text-primary transition line-clamp-2">
                    "{thread.title}"
                  </h4>
                  <div className="flex items-center gap-4 mt-3 text-[11px] text-[#786D94]">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {thread.repliesCount} respon
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-primary fill-current" />
                      {thread.hugs} pelukan
                    </span>
                    <span className="text-primary font-bold ml-auto">{thread.faculty}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Community Callout */}
          <div className="mt-5 pt-4 border-t border-border-light flex items-center justify-between text-xs">
            <span className="text-[#786D94]">Ingin berbagi ceritamu secara aman?</span>
            <Link
              to="/community"
              className="px-4 py-2 rounded-full bg-primary text-white font-extrabold hover:bg-primary-hover shadow-sm transition uppercase tracking-wider"
            >
              + Tulis Cerita Baru (Anonim)
            </Link>
          </div>
        </div>
      </section>

      {/* Mini Breathing Modal Simulation */}
      {showBreathing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full border-2 border-primary text-center space-y-4 shadow-2xl animate-scaleUp">
            <span className="text-4xl animate-bounce inline-block">🌸</span>
            <h3 className="text-xl font-display uppercase tracking-wide text-dark">
              Latihan Napas Relaksasi 4-7-8
            </h3>
            <div className="p-4 bg-surface-container rounded-2xl border border-border-purple text-sm font-bold text-secondary">
              {breathPhase}
            </div>
            <button
              onClick={() => setShowBreathing(false)}
              className="w-full py-2.5 rounded-xl bg-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition"
            >
              Selesai Latihan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
