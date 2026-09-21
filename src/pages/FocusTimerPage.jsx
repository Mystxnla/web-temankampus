import React, { useState, useEffect, useRef } from 'react';
import {
  Clock, Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX,
  CheckCircle, Flame, AlertCircle, CheckSquare, Sparkles
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import timerData from '../mock-data/timer.json';
import BobiMascot from '../components/BobiMascot';

const BG = '#F28E66'; // Warm Peach Amber

const FocusTimerPage = () => {
  const { tasks, activeFocusTaskId, setActiveFocusTaskId } = useTasks();
  const presets = timerData.presets;
  const soundscapes = timerData.soundscapes;

  const [activePreset, setActivePreset] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(timerData.stats.completedSessions);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(timerData.stats.todayMinutes);
  const [activeSoundscape, setActiveSoundscape] = useState('rain');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [volume, setVolume] = useState(70);
  const [continuousMinutes, setContinuousMinutes] = useState(85);
  const [showRestAlert, setShowRestAlert] = useState(false);

  const activeTask = tasks.find((t) => t.id === activeFocusTaskId) || tasks[0];

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (activePreset === 'focus') {
        setCompletedSessions((prev) => prev + 1);
        setTotalFocusMinutes((prev) => prev + Math.floor(totalTime / 60));
        setContinuousMinutes((prev) => prev + Math.floor(totalTime / 60));
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, activePreset, totalTime]);

  useEffect(() => { if (continuousMinutes >= 90) setShowRestAlert(true); }, [continuousMinutes]);

  const handlePresetChange = (presetId) => {
    setIsRunning(false);
    setActivePreset(presetId);
    const selected = presets.find((p) => p.id === presetId);
    const durationSec = (selected?.durationMinutes || 25) * 60;
    setTotalTime(durationSec);
    setTimeLeft(durationSec);
  };

  const handleReset = () => { setIsRunning(false); setTimeLeft(totalTime); };
  const handleSkip = () => {
    setIsRunning(false);
    handlePresetChange(activePreset === 'focus' ? 'short_break' : 'focus');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  // Session dot helpers
  const totalSessionDots = 6;
  const sessionDots = Array.from({ length: totalSessionDots }, (_, i) => {
    if (i < completedSessions) return 'done';
    if (i === completedSessions && activePreset === 'focus') return 'active';
    return 'pending';
  });

  return (
    <div>
      {/* Header on peach bg */}
      <div className="px-5 sm:px-8 pt-6 pb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Ruang Fokus Pomodoro</p>
          <h1 className="hs-headline text-white text-3xl sm:text-4xl">
            Fokus lebih dalam,<br />
            <span className="text-white/80 text-2xl font-bold">rehat secukupnya.</span>
          </h1>
          {/* Session dots — Headspace signature */}
          <div className="flex items-center gap-2 mt-4">
            <p className="text-white/70 text-xs font-bold">Sesi hari ini:</p>
            <div className="flex items-center gap-1.5">
              {sessionDots.map((status, i) => (
                <div key={i}
                  className={`session-dot ${status === 'active' ? 'session-dot-active' : ''}`}
                  style={{
                    backgroundColor: status === 'done' ? 'rgba(255,255,255,0.9)' : status === 'active' ? '#FFF1D0' : 'rgba(255,255,255,0.25)',
                    color: status === 'done' ? BG : status === 'active' ? BG : 'rgba(255,255,255,0.5)',
                    border: status === 'active' ? '2px solid white' : 'none',
                  }}>
                  {status === 'done' ? '✓' : i + 1}
                </div>
              ))}
            </div>
            <span className="text-white/60 text-[10px] ml-1">{completedSessions}/{totalSessionDots} sesi</span>
          </div>
        </div>
        <BobiMascot pose="headphones" size={140} accentColor={BG} />
      </div>

      {/* White card body */}
      <div className="headspace-card px-5 sm:px-8 py-8 space-y-6">

        {/* Rest alert */}
        {showRestAlert && (
          <div className="p-4 rounded-2xl text-white flex items-start sm:items-center gap-3 justify-between"
            style={{ background: 'linear-gradient(135deg, #F28E66, #E07070)' }}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">☕</span>
              <div>
                <p className="font-black text-sm">Waktunya rehat! Sudah belajar lebih dari 90 menit.</p>
                <p className="text-xs text-white/80">Berdiri, regangkan badan, dan minum air sebelum lanjut.</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { setShowRestAlert(false); setContinuousMinutes(0); handlePresetChange('long_break'); }}
                className="px-3 py-1.5 bg-white text-orange-600 text-xs font-black rounded-full">
                Istirahat 15 mnt
              </button>
              <button onClick={() => setShowRestAlert(false)} className="px-3 py-1.5 bg-white/20 text-white text-xs font-bold rounded-full">Nanti</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Timer widget */}
          <div className="lg:col-span-7 headspace-card-full border border-gray-100 shadow-card p-6 sm:p-8 flex flex-col items-center text-center">
            {/* Preset tabs */}
            <div className="flex rounded-2xl bg-gray-100 p-1 mb-8 w-full max-w-sm">
              {presets.map((p) => (
                <button key={p.id} onClick={() => handlePresetChange(p.id)}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all uppercase tracking-wider ${activePreset === p.id ? 'text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  style={activePreset === p.id ? { backgroundColor: BG } : {}}>
                  {p.label}
                </button>
              ))}
            </div>

            {/* SVG Circular progress */}
            <div className="relative w-64 h-64 flex items-center justify-center my-2">
              <svg className="w-full h-full" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="100" cy="100" r={radius} fill="none" stroke="#F3F4F6" strokeWidth="12" />
                <circle cx="100" cy="100" r={radius} fill="none"
                  stroke={BG} strokeWidth="12"
                  strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-gray-900" style={{ fontFamily: 'Nunito, sans-serif' }}>{formatTime(timeLeft)}</span>
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mt-2 text-white"
                  style={{ backgroundColor: BG }}>
                  {activePreset === 'focus' ? '🎯 Fokus Sesi' : '☕ Rehat Sehat'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-6">
              <button onClick={handleReset} className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition icon-btn">
                <RotateCcw className="w-5 h-5" />
              </button>
              <button onClick={() => setIsRunning(!isRunning)}
                className="px-8 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
                style={{ backgroundColor: BG }}>
                {isRunning ? <><Pause className="w-5 h-5" /><span>Jeda</span></> : <><Play className="w-5 h-5 fill-white" /><span>Mulai Belajar</span></>}
              </button>
              <button onClick={handleSkip} className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition icon-btn">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Task selector */}
            <div className="mt-8 pt-5 border-t border-gray-100 w-full max-w-md text-left">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <CheckSquare className="w-3.5 h-3.5" style={{ color: BG }} /> Tugas yang sedang dikerjakan:
              </p>
              <select value={activeFocusTaskId} onChange={(e) => setActiveFocusTaskId(e.target.value)}
                className="w-full text-xs font-bold p-3 rounded-2xl border border-gray-200 focus:ring-2 focus:border-orange-400 text-gray-800 bg-gray-50"
                style={{ '--tw-ring-color': BG }}>
                {tasks.map((t) => <option key={t.id} value={t.id}>{t.course} — {t.title}</option>)}
              </select>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-5 space-y-5">
            {/* Audio Ambience */}
            <div className="headspace-card-full border border-gray-100 shadow-card-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-gray-900">🎵 Study Ambience</h3>
                <button onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${isPlayingAudio ? 'text-white' : 'bg-gray-100 text-gray-500'}`}
                  style={isPlayingAudio ? { backgroundColor: BG } : {}}>
                  {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {soundscapes.map((sound) => {
                  const isSelected = activeSoundscape === sound.id;
                  return (
                    <button key={sound.id} onClick={() => { setActiveSoundscape(sound.id); setIsPlayingAudio(true); }}
                      className={`p-3 rounded-2xl border text-left transition flex flex-col gap-1 ${isSelected ? 'text-white shadow-sm' : 'bg-gray-50 border-gray-100 text-gray-700 hover:border-orange-200'}`}
                      style={isSelected ? { backgroundColor: BG, borderColor: BG } : {}}>
                      <span className="text-lg">{sound.icon}</span>
                      <p className="text-xs font-bold">{sound.name}</p>
                      <p className={`text-[10px] truncate ${isSelected ? 'text-white/75' : 'text-gray-400'}`}>{sound.description}</p>
                    </button>
                  );
                })}
              </div>
              {isPlayingAudio && (
                <div className="flex items-center gap-2 pt-1">
                  <Volume2 className="w-3.5 h-3.5 text-gray-400" />
                  <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))}
                    className="flex-1 h-1.5 rounded-lg cursor-pointer accent-orange-400" />
                  <span className="text-xs text-gray-400 w-7">{volume}%</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="headspace-card-full border border-gray-100 shadow-card-sm p-5 space-y-4">
              <h3 className="font-black text-gray-900">📊 Statistik Fokus Hari Ini</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { lbl: 'Total Waktu Fokus', val: `${totalFocusMinutes} mnt`, color: BG },
                  { lbl: 'Sesi Selesai', val: `${completedSessions} sesi`, color: '#6FB899' },
                ].map((s) => (
                  <div key={s.lbl} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: s.color }}>{s.lbl}</p>
                    <p className="text-xl font-black text-gray-900">{s.val}</p>
                    <p className="text-[10px] text-gray-400">Hari ini</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Aktivitas Terakhir</p>
                {timerData.recentSessions.slice(0, 3).map((sess) => (
                  <div key={sess.id} className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                    <div className="truncate mr-2">
                      <p className="font-bold text-gray-800 truncate">{sess.task}</p>
                      <p className="text-[10px] text-gray-400">{sess.course}</p>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-lg text-white shrink-0" style={{ backgroundColor: BG }}>
                      25 mnt · {sess.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusTimerPage;
