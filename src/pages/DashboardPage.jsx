import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckSquare, Clock, Flame, Plus, ArrowRight, Droplet,
  Wind, Headphones, Send, MessageSquare, Heart, ChevronRight, Sparkles, Calendar
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

  const [waterMl, setWaterMl] = useState(1250);
  const waterTarget = 2000;
  const [curhatInput, setCurhatInput] = useState('');
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Tarik Napas perlahan (4 detik)... 🌸');
  const [isPlayingLofi, setIsPlayingLofi] = useState(false);

  const recentThreads = communityData.threads.slice(0, 2);

  const handleMoodSelect = (moodId) => logMood(moodId, 'Check-in cepat dari beranda', ['Check-in Beranda']);
  const handleAddWater = () => setWaterMl((prev) => Math.min(prev + 250, 3000));
  const handleSendCurhat = (e) => {
    e.preventDefault();
    navigate('/curhat', { state: { initialPrompt: curhatInput } });
  };

  const triggerBreathingExercise = () => {
    setShowBreathing(true);
    setBreathPhase('Tarik Napas perlahan (4 detik)... 🌸');
    setTimeout(() => {
      setBreathPhase('Tahan napas (7 detik)... 🧘');
      setTimeout(() => {
        setBreathPhase('Hembuskan pelan lewat mulut (8 detik)... 🍃');
        setTimeout(() => setBreathPhase('Hebat! Tubuhmu kini lebih tenang ✨'), 8000);
      }, 7000);
    }, 4000);
  };

  return (
    <div>
      {/* ── Header Block ── */}
      <div
        className="px-5 sm:px-8 pt-6 pb-10"
        style={{ backgroundColor: '#C8BA96' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#5C4A3A' }}>
          Dashboard Mahasiswa
        </p>
        <h1 className="font-display text-3xl sm:text-4xl" style={{ color: '#8B0A0A' }}>
          Halo, {user?.name?.split(' ')[0] || 'Teman'}! ☀️
        </h1>
        <p className="font-hand text-base mt-1" style={{ color: '#1F3A7A' }}>
          Mulai harimu dengan niat baik.
        </p>
        {/* Stats row */}
        <div className="flex items-center gap-6 mt-4">
          {[
            { val: urgentTasks.length, lbl: 'Tugas Mendesak', icon: '📋' },
            { val: '1j 45m', lbl: 'Waktu Fokus', icon: '⏱️' },
            { val: `${user?.wellnessStreak || 5} 🔥`, lbl: 'Hari Streak', icon: '' },
          ].map((s) => (
            <div key={s.lbl}>
              <div className="font-display text-2xl" style={{ color: '#8B0A0A' }}>
                {s.icon} {s.val}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C4A3A' }}>
                {s.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Card Section ── */}
      <div className="px-5 sm:px-8 py-8 space-y-6">

        {/* Mood Check-in */}
        <section
          className="p-5 rounded-3xl"
          style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg" style={{ color: '#2B2B2B' }}>
              Perasaanmu hari ini? 🌱
            </h2>
            <Link
              to="/mood"
              className="text-xs font-bold hover:underline"
              style={{ color: '#8B0A0A' }}
            >
              Catat Lengkap →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
              const isSelected = todayMood?.moodId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleMoodSelect(opt.id)}
                  className="hs-btn py-2 px-4 text-xs"
                  style={
                    isSelected
                      ? { backgroundColor: '#8B0A0A', color: '#C8BA96', border: '2px solid #342B27' }
                      : { backgroundColor: '#DDD0A8', color: '#2B2B2B', border: '2px solid #5C4A3A' }
                  }
                >
                  <span>{opt.emoji}</span> {opt.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* 3-col cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Urgent Tasks */}
          <article
            className="p-5 flex flex-col rounded-3xl"
            style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{ color: '#2B2B2B' }}>📋 Tugas Mendesak</h3>
              <span
                className="hs-chip text-[10px]"
                style={{ background: '#C8BA96', color: '#8B0A0A', border: '1px solid #5C4A3A' }}
              >
                Due Segera
              </span>
            </div>
            <ul className="space-y-2.5 flex-1">
              {urgentTasks.slice(0, 3).map((task) => (
                <li
                  key={task.id}
                  className="p-3 rounded-xl"
                  style={{ background: '#C8BA96', border: '1px solid #5C4A3A' }}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={task.status === 'Selesai'}
                      onChange={() => toggleTaskStatus(task.id)}
                      className="mt-0.5 w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: '#8B0A0A' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-bold leading-snug ${task.status === 'Selesai' ? 'line-through' : ''}`}
                        style={{ color: task.status === 'Selesai' ? '#5C4A3A' : '#2B2B2B' }}
                      >
                        {task.course}
                      </p>
                      <p className="text-[11px] truncate" style={{ color: '#5C4A3A' }}>{task.title}</p>
                      <span className="text-[10px] font-bold" style={{ color: '#8B0A0A' }}>
                        {task.dueLabel || 'Hari ini'}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/tasks"
              className="mt-4 block w-full py-2 rounded-full text-xs font-black text-center transition"
              style={{ border: '2px solid #8B0A0A', color: '#8B0A0A' }}
            >
              Lihat Semua {tasks.length} Tugas →
            </Link>
          </article>

          {/* Card 2: Schedule */}
          <article
            className="p-5 flex flex-col rounded-3xl"
            style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{ color: '#2B2B2B' }}>📅 Agenda Hari Ini</h3>
              <span
                className="hs-chip text-[10px]"
                style={{ background: '#4A8DB7', color: '#DDD0A8' }}
              >
                Hari Ini
              </span>
            </div>
            <div className="space-y-3 flex-1">
              {[
                { time: '10:00', label: 'Interaksi Manusia & Komputer', sub: 'R.Lab 304 · Dr. Ir. Herman', alert: '🔔 Mulai dalam 45 mnt', color: '#8B0A0A' },
                { time: '14:00', label: 'Diskusi Kelompok Sempro', sub: 'Discord · Bersama Arya & Fika', color: '#4A8DB7' },
                { time: '19:30', label: 'Study Jam TemanKampus', sub: 'Voice Room · Pomodoro Bareng', color: '#5C4A3A' },
              ].map((s, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                    style={{ backgroundColor: s.color, color: '#C8BA96' }}
                  >
                    {s.time.split(':')[0]}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-xs font-bold" style={{ color: '#2B2B2B' }}>{s.label}</p>
                    <p className="text-[11px]" style={{ color: '#5C4A3A' }}>{s.sub}</p>
                    {s.alert && (
                      <p className="text-[10px] font-bold mt-0.5" style={{ color: '#8B0A0A' }}>{s.alert}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/tasks"
              className="mt-4 block w-full py-2 rounded-full text-xs font-black text-center transition"
              style={{ border: '2px solid #4A8DB7', color: '#4A8DB7' }}
            >
              Buka Kalender Akademik →
            </Link>
          </article>

          {/* Card 3: Wellness */}
          <article
            className="p-5 flex flex-col rounded-3xl"
            style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{ color: '#2B2B2B' }}>🌿 Rehat & Nutrisi</h3>
              <span
                className="hs-chip text-[10px]"
                style={{ background: '#C8BA96', color: '#5C4A3A', border: '1px solid #5C4A3A' }}
              >
                Self-Care
              </span>
            </div>
            <div className="space-y-3 flex-1">
              {/* Water */}
              <div
                className="p-3 rounded-xl"
                style={{ background: '#C8BA96', border: '1px solid #5C4A3A' }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <p className="text-xs font-bold" style={{ color: '#2B2B2B' }}>💧 Hidrasi</p>
                    <p className="text-[10px]" style={{ color: '#5C4A3A' }}>{waterMl}/{waterTarget} ml</p>
                  </div>
                  <button
                    onClick={handleAddWater}
                    className="px-3 py-1 font-bold text-[10px] rounded-full"
                    style={{ backgroundColor: '#4A8DB7', color: '#DDD0A8' }}
                  >
                    +250ml
                  </button>
                </div>
                <div className="w-full rounded-full h-1.5" style={{ background: '#5C4A3A30' }}>
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min((waterMl / waterTarget) * 100, 100)}%`, backgroundColor: '#4A8DB7' }}
                  />
                </div>
              </div>
              {/* Breathing */}
              <div
                className="p-3 rounded-xl flex items-center justify-between"
                style={{ background: '#C8BA96', border: '1px solid #5C4A3A' }}
              >
                <div>
                  <p className="text-xs font-bold" style={{ color: '#2B2B2B' }}>🌬️ Napas 4-7-8</p>
                  <p className="text-[10px]" style={{ color: '#5C4A3A' }}>Relaksasi 3 menit</p>
                </div>
                <button
                  onClick={triggerBreathingExercise}
                  className="px-3 py-1.5 font-bold text-[10px] rounded-full"
                  style={{ backgroundColor: '#8B0A0A', color: '#C8BA96' }}
                >
                  Mulai
                </button>
              </div>
              {/* Lo-fi */}
              <div
                className="p-3 rounded-xl flex items-center justify-between"
                style={{ background: '#C8BA96', border: '1px solid #5C4A3A' }}
              >
                <div>
                  <p className="text-xs font-bold" style={{ color: '#2B2B2B' }}>🎧 Lo-Fi Hujan Kampus</p>
                  <p className="text-[10px]" style={{ color: '#5C4A3A' }}>
                    {isPlayingLofi ? 'Memutar... 🎵' : 'Musik penenang belajar'}
                  </p>
                </div>
                <button
                  onClick={() => setIsPlayingLofi(!isPlayingLofi)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition"
                  style={{ backgroundColor: isPlayingLofi ? '#8B0A0A' : '#5C4A3A', color: '#C8BA96' }}
                >
                  <span className="text-xs">{isPlayingLofi ? '⏸' : '▶'}</span>
                </button>
              </div>
            </div>
          </article>
        </section>

        {/* Community + Mimi row */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Mimi AI */}
          <div
            className="lg:col-span-5 rounded-3xl p-6 text-white flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #8B0A0A 0%, #4A2010 100%)' }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="hs-chip text-[10px] uppercase"
                  style={{ background: 'rgba(247,240,218,0.2)', color: '#C8BA96' }}
                >
                  AI Companion
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: '#C8BA9699' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Mimi Online
                </span>
              </div>
              <h3 className="font-black text-xl mb-1.5">Ada yang mengganjal di pikiranmu?</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(247,240,218,0.75)' }}>
                Mimi siap mendengarkan tanpa menghakimi. Ceritakan keluh kesahmu kapan saja.
              </p>
              <div className="space-y-2">
                {[
                  { text: '"Mimi, aku takut nilai sempro besok..."', prompt: 'Mimi, aku takut nilai sempro besok mengecewakan...' },
                  { text: '"Gimana cara ngilangin rasa bersalah pas istirahat?"', prompt: 'Gimana cara ngilangin rasa bersalah kalau lagi istirahat?' },
                ].map((q) => (
                  <button
                    key={q.text}
                    onClick={() => navigate('/curhat', { state: { initialPrompt: q.prompt } })}
                    className="w-full text-left p-2.5 rounded-xl border text-xs text-white transition"
                    style={{ background: 'rgba(247,240,218,0.12)', borderColor: 'rgba(247,240,218,0.2)' }}
                  >
                    💬 {q.text}
                  </button>
                ))}
              </div>
            </div>
            <form
              onSubmit={handleSendCurhat}
              className="mt-5 pt-4 flex items-center gap-2"
              style={{ borderTop: '1px solid rgba(247,240,218,0.15)' }}
            >
              <input
                type="text"
                value={curhatInput}
                onChange={(e) => setCurhatInput(e.target.value)}
                placeholder="Tulis ceritamu ke Mimi..."
                className="flex-1 text-xs rounded-xl px-4 py-2.5 border focus:outline-none transition"
                style={{
                  background: 'rgba(247,240,218,0.15)',
                  color: '#C8BA96',
                  borderColor: 'rgba(247,240,218,0.2)',
                }}
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl transition shrink-0"
                style={{ background: 'rgba(247,240,218,0.25)', color: '#C8BA96' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Community Threads */}
          <div
            className="lg:col-span-7 p-6 flex flex-col rounded-3xl"
            style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider" style={{ color: '#4A8DB7' }}>
                  Ruang Aman Berbagi
                </p>
                <h3 className="font-black text-lg" style={{ color: '#2B2B2B' }}>
                  Diskusi Hangat Mahasiswa
                </h3>
              </div>
              <Link
                to="/community"
                className="text-xs font-bold hover:underline uppercase"
                style={{ color: '#8B0A0A' }}
              >
                Lihat Semua →
              </Link>
            </div>
            <div className="space-y-3 flex-1">
              {recentThreads.map((thread) => (
                <Link
                  key={thread.id}
                  to="/community"
                  className="block p-3.5 rounded-2xl transition"
                  style={{ background: '#C8BA96', border: '1px solid #5C4A3A' }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="hs-chip text-[10px]"
                      style={{ background: '#4A8DB7', color: '#DDD0A8' }}
                    >
                      {thread.category}
                    </span>
                    <span className="text-[10px]" style={{ color: '#5C4A3A' }}>{thread.timeAgo}</span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2" style={{ color: '#2B2B2B' }}>
                    "{thread.title}"
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-[10px]" style={{ color: '#5C4A3A' }}>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />{thread.repliesCount} respon
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" style={{ color: '#F6D0D6' }} />{thread.hugs} pelukan
                    </span>
                    <span className="ml-auto font-bold" style={{ color: '#4A8DB7' }}>{thread.faculty}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div
              className="mt-4 pt-3 flex items-center justify-between text-xs"
              style={{ borderTop: '1px solid #C8BA96' }}
            >
              <span style={{ color: '#5C4A3A' }}>Ingin berbagi ceritamu?</span>
              <Link
                to="/community"
                className="px-4 py-2 rounded-full font-black text-[10px] transition"
                style={{ backgroundColor: '#8B0A0A', color: '#C8BA96' }}
              >
                + Tulis Anonim
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Breathing Modal */}
      {showBreathing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div
            className="rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl"
            style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
          >
            <span className="text-4xl animate-bounce inline-block">🌸</span>
            <h3 className="font-black text-xl" style={{ color: '#2B2B2B' }}>Latihan Napas 4-7-8</h3>
            <div
              className="p-4 rounded-2xl text-sm font-bold"
              style={{ background: '#C8BA96', color: '#8B0A0A' }}
            >
              {breathPhase}
            </div>
            <button
              onClick={() => setShowBreathing(false)}
              className="w-full py-3 rounded-full text-xs font-black uppercase tracking-wider"
              style={{ backgroundColor: '#8B0A0A', color: '#C8BA96' }}
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

