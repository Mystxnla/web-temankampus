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
import BobiMascot from '../components/BobiMascot';

const BG = '#5C92D1'; // Calm Sky Blue

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
    navigate(curhatInput.trim() ? '/curhat' : '/curhat', { state: { initialPrompt: curhatInput } });
  };

  const triggerBreathingExercise = () => {
    setShowBreathing(true);
    setBreathPhase('Tarik Napas perlahan (4 detik)... 🌸');
    setTimeout(() => { setBreathPhase('Tahan napas (7 detik)... 🧘');
      setTimeout(() => { setBreathPhase('Hembuskan pelan lewat mulut (8 detik)... 🍃');
        setTimeout(() => setBreathPhase('Hebat! Tubuhmu kini lebih tenang ✨'), 8000);
      }, 7000);
    }, 4000);
  };

  return (
    <div>
      {/* ── Header Block (on blue bg) ── */}
      <div className="px-5 sm:px-8 pt-6 pb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Dashboard Mahasiswa</p>
          <h1 className="hs-headline text-white text-3xl sm:text-4xl">
            Halo, {user?.name?.split(' ')[0] || 'Teman'}! ☀️<br />
            <span className="text-white/80 text-2xl sm:text-3xl font-bold">Mulai harimu dengan niat baik.</span>
          </h1>
          {/* Stats row */}
          <div className="flex items-center gap-6 mt-4">
            {[
              { val: urgentTasks.length, lbl: 'Tugas Mendesak', icon: '📋' },
              { val: '1j 45m', lbl: 'Waktu Fokus', icon: '⏱️' },
              { val: `${user?.wellnessStreak || 5} 🔥`, lbl: 'Hari Streak', icon: '' },
            ].map((s) => (
              <div key={s.lbl}>
                <div className="text-white font-black text-xl">{s.icon} {s.val}</div>
                <div className="text-white/65 text-[10px] font-bold uppercase tracking-wider">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <BobiMascot pose="coffee" size={140} accentColor={BG} />
      </div>

      {/* ── White Card Section ── */}
      <div className="headspace-card px-5 sm:px-8 py-8 space-y-6">

        {/* Mood Check-in */}
        <section className="p-5 rounded-3xl border border-blue-100" style={{ background: '#EBF5FF' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-black text-gray-900 text-lg">Perasaanmu hari ini? 🌱</h2>
            <Link to="/mood" className="text-xs font-bold text-blue-500 hover:underline">Catat Lengkap →</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
              const isSelected = todayMood?.moodId === opt.id;
              return (
                <button key={opt.id} onClick={() => handleMoodSelect(opt.id)}
                  className={`hs-btn py-2 px-4 text-xs ${isSelected
                    ? 'bg-blue-500 text-white shadow-md scale-105'
                    : 'bg-white text-gray-700 border border-blue-100 hover:border-blue-300'}`}>
                  <span>{opt.emoji}</span> {opt.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* 3-col cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Urgent Tasks */}
          <article className="hs-card border border-gray-100 shadow-card-sm p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-900">📋 Tugas Mendesak</h3>
              <span className="hs-chip text-[10px]" style={{ background: '#FFF3CD', color: '#7A5E00' }}>Due Segera</span>
            </div>
            <ul className="space-y-2.5 flex-1">
              {urgentTasks.slice(0, 3).map((task) => (
                <li key={task.id} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-start gap-2.5">
                    <input type="checkbox" checked={task.status === 'Selesai'}
                      onChange={() => toggleTaskStatus(task.id)}
                      className="mt-0.5 w-4 h-4 rounded accent-blue-500 cursor-pointer" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold text-gray-800 leading-snug ${task.status === 'Selesai' ? 'line-through text-gray-400' : ''}`}>{task.course}</p>
                      <p className="text-[11px] text-gray-500 truncate">{task.title}</p>
                      <span className="text-[10px] font-bold text-blue-500">{task.dueLabel || 'Hari ini'}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/tasks" className="mt-4 block w-full py-2 rounded-full border border-blue-200 text-xs font-black text-blue-600 text-center hover:bg-blue-50 transition">
              Lihat Semua {tasks.length} Tugas →
            </Link>
          </article>

          {/* Card 2: Schedule */}
          <article className="hs-card border border-gray-100 shadow-card-sm p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-900">📅 Agenda Hari Ini</h3>
              <span className="hs-chip text-[10px]" style={{ background: '#D6E8FA', color: '#1A5A8C' }}>Hari Ini</span>
            </div>
            <div className="space-y-3 flex-1">
              {[
                { time: '10:00', label: 'Interaksi Manusia & Komputer', sub: 'R.Lab 304 · Dr. Ir. Herman', alert: '🔔 Mulai dalam 45 mnt', color: '#5C92D1' },
                { time: '14:00', label: 'Diskusi Kelompok Sempro', sub: 'Discord · Bersama Arya & Fika', color: '#6FB899' },
                { time: '19:30', label: 'Study Jam TemanKampus', sub: 'Voice Room · Pomodoro Bareng', color: '#F7BF52' },
              ].map((s, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                    style={{ backgroundColor: s.color }}>{s.time.split(':')[0]}</div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-xs font-bold text-gray-800">{s.label}</p>
                    <p className="text-[11px] text-gray-500">{s.sub}</p>
                    {s.alert && <p className="text-[10px] text-blue-500 font-bold mt-0.5">{s.alert}</p>}
                  </div>
                </div>
              ))}
            </div>
            <Link to="/tasks" className="mt-4 block w-full py-2 rounded-full border border-blue-200 text-xs font-black text-blue-600 text-center hover:bg-blue-50 transition">
              Buka Kalender Akademik →
            </Link>
          </article>

          {/* Card 3: Wellness */}
          <article className="hs-card border border-gray-100 shadow-card-sm p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-gray-900">🌿 Rehat & Nutrisi</h3>
              <span className="hs-chip text-[10px]" style={{ background: '#E8F5E9', color: '#1A5C42' }}>Self-Care</span>
            </div>
            <div className="space-y-3 flex-1">
              {/* Water */}
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex items-center justify-between mb-1.5">
                  <div><p className="text-xs font-bold text-gray-800">💧 Hidrasi</p><p className="text-[10px] text-gray-500">{waterMl}/{waterTarget} ml</p></div>
                  <button onClick={handleAddWater} className="px-3 py-1 bg-blue-500 text-white font-bold text-[10px] rounded-full">+250ml</button>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${Math.min((waterMl / waterTarget) * 100, 100)}%` }} />
                </div>
              </div>
              {/* Breathing */}
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-between">
                <div><p className="text-xs font-bold text-gray-800">🌬️ Napas 4-7-8</p><p className="text-[10px] text-gray-500">Relaksasi 3 menit</p></div>
                <button onClick={triggerBreathingExercise} className="px-3 py-1.5 bg-purple-500 text-white font-bold text-[10px] rounded-full">Mulai</button>
              </div>
              {/* Lo-fi */}
              <div className="p-3 rounded-xl bg-green-50 border border-green-100 flex items-center justify-between">
                <div><p className="text-xs font-bold text-gray-800">🎧 Lo-Fi Hujan Kampus</p><p className="text-[10px] text-gray-500">{isPlayingLofi ? 'Memutar... 🎵' : 'Musik penenang belajar'}</p></div>
                <button onClick={() => setIsPlayingLofi(!isPlayingLofi)}
                  className={`w-8 h-8 rounded-full text-white flex items-center justify-center transition ${isPlayingLofi ? 'bg-green-500' : 'bg-gray-400'}`}>
                  <span className="text-xs">{isPlayingLofi ? '⏸' : '▶'}</span>
                </button>
              </div>
            </div>
          </article>
        </section>

        {/* Community + Mimi row */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Mimi AI */}
          <div className="lg:col-span-5 rounded-3xl p-6 text-white flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #987DC7 0%, #6045A0 100%)' }}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="hs-chip bg-white/25 text-white text-[10px] uppercase">AI Companion</span>
                <span className="flex items-center gap-1.5 text-xs text-purple-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Mimi Online
                </span>
              </div>
              <h3 className="font-black text-xl mb-1.5">Ada yang mengganjal di pikiranmu?</h3>
              <p className="text-white/75 text-xs leading-relaxed mb-4">Mimi siap mendengarkan tanpa menghakimi. Ceritakan keluh kesahmu kapan saja.</p>
              <div className="space-y-2">
                {[
                  { text: '"Mimi, aku takut nilai sempro besok..."', prompt: 'Mimi, aku takut nilai sempro besok mengecewakan...' },
                  { text: '"Gimana cara ngilangin rasa bersalah pas istirahat?"', prompt: 'Gimana cara ngilangin rasa bersalah kalau lagi istirahat?' },
                ].map((q) => (
                  <button key={q.text} onClick={() => navigate('/curhat', { state: { initialPrompt: q.prompt } })}
                    className="w-full text-left p-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/10 text-xs text-white transition">
                    💬 {q.text}
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={handleSendCurhat} className="mt-5 pt-4 border-t border-white/15 flex items-center gap-2">
              <input type="text" value={curhatInput} onChange={(e) => setCurhatInput(e.target.value)}
                placeholder="Tulis ceritamu ke Mimi..."
                className="flex-1 bg-white/15 text-white placeholder-white/40 text-xs rounded-xl px-4 py-2.5 border border-white/20 focus:outline-none focus:bg-white focus:text-gray-800 focus:placeholder-gray-400 transition" />
              <button type="submit" className="p-2.5 bg-white/25 hover:bg-white/40 text-white rounded-xl transition shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Community Threads */}
          <div className="lg:col-span-7 hs-card border border-gray-100 shadow-card-sm p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-black text-blue-500 uppercase tracking-wider">Ruang Aman Berbagi</p>
                <h3 className="font-black text-gray-900 text-lg">Diskusi Hangat Mahasiswa</h3>
              </div>
              <Link to="/community" className="text-xs font-bold text-blue-500 hover:underline uppercase">Lihat Semua →</Link>
            </div>
            <div className="space-y-3 flex-1">
              {recentThreads.map((thread) => (
                <Link key={thread.id} to="/community"
                  className="block p-3.5 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition">
                  <div className="flex items-center justify-between mb-1">
                    <span className="hs-chip text-[10px]" style={{ background: '#D6E8FA', color: '#1A5A8C' }}>{thread.category}</span>
                    <span className="text-[10px] text-gray-400">{thread.timeAgo}</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 leading-snug line-clamp-2">"{thread.title}"</h4>
                  <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-400">
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{thread.repliesCount} respon</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-pink-400" />{thread.hugs} pelukan</span>
                    <span className="ml-auto font-bold text-blue-400">{thread.faculty}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400">Ingin berbagi ceritamu?</span>
              <Link to="/community" className="px-4 py-2 rounded-full bg-blue-500 text-white font-black text-[10px] hover:bg-blue-600 transition">
                + Tulis Anonim
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Breathing Modal */}
      {showBreathing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <span className="text-4xl animate-bounce inline-block">🌸</span>
            <h3 className="font-black text-xl text-gray-900">Latihan Napas 4-7-8</h3>
            <div className="p-4 rounded-2xl text-sm font-bold text-purple-600" style={{ background: '#F0E8FF' }}>{breathPhase}</div>
            <button onClick={() => setShowBreathing(false)}
              className="w-full py-3 rounded-full bg-gray-900 text-white text-xs font-black uppercase tracking-wider">
              Selesai Latihan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
