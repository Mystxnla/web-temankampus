import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  CheckCircle,
  Flame,
  AlertCircle,
  CheckSquare,
  Sparkles
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import timerData from '../mock-data/timer.json';

const FocusTimerPage = () => {
  const { tasks, activeFocusTaskId, setActiveFocusTaskId } = useTasks();

  const presets = timerData.presets;
  const soundscapes = timerData.soundscapes;

  // Active preset: 'focus' (25m), 'short_break' (5m), 'long_break' (15m)
  const [activePreset, setActivePreset] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(timerData.stats.completedSessions);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(timerData.stats.todayMinutes);

  // Soundscape state
  const [activeSoundscape, setActiveSoundscape] = useState('rain');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [volume, setVolume] = useState(70);

  // 90-minute rest alert state
  const [continuousMinutes, setContinuousMinutes] = useState(85);
  const [showRestAlert, setShowRestAlert] = useState(false);

  // Associated task
  const activeTask = tasks.find((t) => t.id === activeFocusTaskId) || tasks[0];

  // Timer interval
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
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

  // Check 90-min rest rule
  useEffect(() => {
    if (continuousMinutes >= 90) {
      setShowRestAlert(true);
    }
  }, [continuousMinutes]);

  const handlePresetChange = (presetId) => {
    setIsRunning(false);
    setActivePreset(presetId);
    const selected = presets.find((p) => p.id === presetId);
    const durationSec = (selected?.durationMinutes || 25) * 60;
    setTotalTime(durationSec);
    setTimeLeft(durationSec);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (activePreset === 'focus') {
      handlePresetChange('short_break');
    } else {
      handlePresetChange('focus');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Progress percentage
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
  const strokeDashoffset = 565 - (565 * progressPercent) / 100;

  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-secondary font-bold text-xs uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Fokus Terstruktur (Pomodoro)</span>
          </div>
          <h1 className="text-3xl font-display uppercase tracking-wide text-dark">
            Ruang Fokus & Pengingat Rehat
          </h1>
          <p className="text-xs sm:text-sm text-[#786D94]">
            Maksimalkan retensi belajar dengan interval 25 menit dan lindungi pikiran dari kelelahan berlebih.
          </p>
        </div>

        {/* Quick Streak Badge */}
        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-border-light shadow-xs">
          <Flame className="w-5 h-5 text-primary" />
          <div>
            <p className="text-[10px] font-black uppercase text-primary tracking-wider">
              Konsistensi Belajar
            </p>
            <p className="text-xs font-bold text-dark">5 Hari Berturut-Turut</p>
          </div>
        </div>
      </div>

      {/* 90-MINUTE REST ALERT BANNER (PRD Section 6.5) */}
      {showRestAlert && (
        <div className="p-5 bg-gradient-to-r from-primary to-secondary rounded-3xl text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="text-3xl">☕</span>
            <div>
              <p className="font-display text-lg uppercase tracking-wide">
                Waktunya Rehat Sejenak! (Studi &gt; 90 Menit)
              </p>
              <p className="text-xs text-purple-100 leading-relaxed">
                Otakmu butuh istirahat untuk memproses informasi. Berdirilah, regangkan badan, dan ambil minum sebelum melanjutkan.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setShowRestAlert(false);
                setContinuousMinutes(0);
                handlePresetChange('long_break');
              }}
              className="px-4 py-2 rounded-xl bg-white text-primary text-xs font-bold uppercase tracking-wider hover:bg-pink-100 transition shadow-sm"
            >
              Mulai Istirahat 15 Mnt
            </button>
            <button
              onClick={() => setShowRestAlert(false)}
              className="px-3 py-2 rounded-xl bg-white/20 text-white text-xs font-bold hover:bg-white/30 transition"
            >
              Nanti Saja
            </button>
          </div>
        </div>
      )}

      {/* MAIN TIMER CARD & CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Big Pomodoro Widget (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-4xl p-6 sm:p-10 border border-border-light shadow-sm flex flex-col items-center justify-center relative overflow-hidden text-center">
          {/* Preset Buttons */}
          <div className="flex rounded-2xl bg-surface-container-low p-1.5 border border-border-light mb-8 max-w-md w-full">
            {presets.map((p) => {
              const isActive = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePresetChange(p.id)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                    isActive
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-[#786D94] hover:text-dark'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Circular Progress & Anton Readout */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {/* Background Track */}
              <circle
                cx="100"
                cy="100"
                r="90"
                className="stroke-surface-container"
                strokeWidth="10"
                fill="none"
              />
              {/* Progress Neon Track */}
              <circle
                cx="100"
                cy="100"
                r="90"
                className="stroke-primary transition-all duration-1000 ease-linear"
                strokeWidth="10"
                strokeDasharray="565"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Centered Digital Display */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-5xl sm:text-6xl font-display text-dark tracking-wider">
                {formatTime(timeLeft)}
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary mt-1 px-3 py-0.5 rounded-full bg-primary-container">
                {activePreset === 'focus' ? 'Fokus Sesi' : 'Rehat Sehat'}
              </span>
            </div>
          </div>

          {/* Play, Pause, Reset Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleReset}
              className="p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-border-light text-[#786D94] hover:text-dark transition"
              title="Ulangi Sesi"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-8 py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Jeda Sesi</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Mulai Belajar</span>
                </>
              )}
            </button>

            <button
              onClick={handleSkip}
              className="p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-border-light text-[#786D94] hover:text-dark transition"
              title="Lewati ke Sesi Berikutnya"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Associated Task Pill */}
          <div className="mt-8 pt-6 border-t border-border-light w-full max-w-md text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#786D94] uppercase tracking-wider flex items-center gap-1">
                <CheckSquare className="w-3.5 h-3.5 text-primary" />
                Terkait dengan Tugas:
              </span>
            </div>
            <select
              value={activeFocusTaskId}
              onChange={(e) => setActiveFocusTaskId(e.target.value)}
              className="w-full text-xs font-bold p-3 rounded-2xl bg-surface-container-low border border-border-purple focus:ring-2 focus:ring-primary text-dark truncate"
            >
              {tasks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.course} — {t.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column: Audio Ambience & Productivity Logs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Audio Ambience Soundboard */}
          <div className="bg-white rounded-3xl p-6 border border-border-light shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border-light">
              <div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                  Suara Latar Penenang
                </span>
                <h3 className="text-xl font-display text-dark uppercase tracking-wide">
                  Study Ambience Player
                </h3>
              </div>
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`p-2 rounded-xl transition ${
                  isPlayingAudio
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container-low text-[#786D94]'
                }`}
              >
                {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Sound Presets */}
            <div className="grid grid-cols-2 gap-2.5">
              {soundscapes.map((sound) => {
                const isSelected = activeSoundscape === sound.id;
                return (
                  <button
                    key={sound.id}
                    onClick={() => {
                      setActiveSoundscape(sound.id);
                      setIsPlayingAudio(true);
                    }}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? 'bg-secondary text-white border-secondary shadow-xs'
                        : 'bg-surface-container-low text-dark border-border-light hover:border-secondary'
                    }`}
                  >
                    <span className="text-xl mb-1">{sound.icon}</span>
                    <p className="text-xs font-bold leading-tight">{sound.name}</p>
                    <p
                      className={`text-[10px] truncate mt-0.5 ${
                        isSelected ? 'text-purple-200' : 'text-[#786D94]'
                      }`}
                    >
                      {sound.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Volume Control */}
            {isPlayingAudio && (
              <div className="pt-2 flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-[#786D94]" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="flex-1 h-1.5 bg-secondary-container rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <span className="text-xs font-bold text-[#786D94] w-8">{volume}%</span>
              </div>
            )}
          </div>

          {/* Productivity Stats */}
          <div className="bg-white rounded-3xl p-6 border border-border-light shadow-sm space-y-4">
            <h3 className="text-xl font-display text-dark uppercase tracking-wide pb-2 border-b border-border-light">
              Statistik Fokus Hari Ini
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface-container-low border border-border-light">
                <p className="text-[10px] font-black uppercase text-secondary tracking-wider">
                  Total Waktu Fokus
                </p>
                <p className="text-2xl font-display text-dark mt-1">
                  {totalFocusMinutes} Menit
                </p>
                <p className="text-[10px] text-[#786D94]">Tercatat hari ini</p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low border border-border-light">
                <p className="text-[10px] font-black uppercase text-primary tracking-wider">
                  Sesi Selesai
                </p>
                <p className="text-2xl font-display text-dark mt-1">
                  {completedSessions} Sesi
                </p>
                <p className="text-[10px] text-[#786D94]">Target: 6 sesi</p>
              </div>
            </div>

            {/* Recent Sessions List */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-dark uppercase tracking-wider">
                Aktivitas Terakhir
              </p>
              {timerData.recentSessions.slice(0, 3).map((sess) => (
                <div
                  key={sess.id}
                  className="p-3 rounded-xl bg-surface-container-low border border-border-light flex items-center justify-between text-xs"
                >
                  <div className="truncate mr-2">
                    <p className="font-bold text-dark truncate">{sess.task}</p>
                    <p className="text-[10px] text-[#786D94]">{sess.course}</p>
                  </div>
                  <span className="text-[10px] bg-secondary-container text-secondary font-black px-2 py-0.5 rounded shrink-0">
                    25 mnt · {sess.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusTimerPage;
