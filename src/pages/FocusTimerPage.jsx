import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX,
  CheckSquare,
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import timerData from '../mock-data/timer.json';
import KucingMascot from '../components/KucingMascot';

const ACCENT = '#8B0A0A';

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

  useEffect(() => {
    if (continuousMinutes >= 90) setShowRestAlert(true);
  }, [continuousMinutes]);

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

  const totalSessionDots = 6;
  const sessionDots = Array.from({ length: totalSessionDots }, (_, i) => {
    if (i < completedSessions) return 'done';
    if (i === completedSessions && activePreset === 'focus') return 'active';
    return 'pending';
  });

  return (
    <div>
      {/* ── Header Block ── */}
      <div
        className="px-5 sm:px-8 pt-6 pb-10"
        style={{ backgroundColor: '#C8BA96' }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#5C4A3A' }}>
              Ruang Fokus Pomodoro
            </p>
            <h1 className="font-display text-3xl sm:text-4xl" style={{ color: '#8B0A0A' }}>
              Fokus lebih dalam,
            </h1>
            <p className="font-hand text-base mt-1" style={{ color: '#1F3A7A' }}>
              rehat secukupnya.
            </p>
          </div>
          <KucingMascot pose="stressed" size={130} />
        </div>
        {/* Session dots */}
        <div className="flex items-center gap-2 mt-4">
          <p className="text-xs font-bold" style={{ color: '#5C4A3A' }}>Sesi hari ini:</p>
          <div className="flex items-center gap-1.5">
            {sessionDots.map((status, i) => (
              <div
                key={i}
                className={`session-dot ${status === 'active' ? 'session-dot-active' : ''}`}
                style={{
                  backgroundColor:
                    status === 'done'
                      ? '#8B0A0A'
                      : status === 'active'
                      ? '#C8BA96'
                      : 'rgba(117,104,91,0.25)',
                  color:
                    status === 'done'
                      ? '#C8BA96'
                      : status === 'active'
                      ? '#8B0A0A'
                      : '#5C4A3A',
                  border: status === 'active' ? '2px solid #8B0A0A' : 'none',
                }}
              >
                {status === 'done' ? '✓' : i + 1}
              </div>
            ))}
          </div>
          <span className="text-[10px] ml-1" style={{ color: '#5C4A3A' }}>
            {completedSessions}/{totalSessionDots} sesi
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="px-5 sm:px-8 py-8 space-y-6">

        {/* Rest alert */}
        {showRestAlert && (
          <div
            className="p-4 rounded-2xl flex items-start sm:items-center gap-3 justify-between"
            style={{ background: 'linear-gradient(135deg, #8B0A0A, #4A2010)', color: '#C8BA96' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">☕</span>
              <div>
                <p className="font-black text-sm">Waktunya rehat! Sudah belajar lebih dari 90 menit.</p>
                <p className="text-xs" style={{ color: 'rgba(247,240,218,0.8)' }}>
                  Berdiri, regangkan badan, dan minum air sebelum lanjut.
                </p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => {
                  setShowRestAlert(false);
                  setContinuousMinutes(0);
                  handlePresetChange('long_break');
                }}
                className="px-3 py-1.5 text-xs font-black rounded-full"
                style={{ background: '#C8BA96', color: '#8B0A0A' }}
              >
                Istirahat 15 mnt
              </button>
              <button
                onClick={() => setShowRestAlert(false)}
                className="px-3 py-1.5 text-xs font-bold rounded-full"
                style={{ background: 'rgba(247,240,218,0.2)', color: '#C8BA96' }}
              >
                Nanti
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Timer widget */}
          <div
            className="lg:col-span-7 p-6 sm:p-8 flex flex-col items-center text-center rounded-3xl"
            style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
          >
            {/* Preset tabs */}
            <div
              className="flex rounded-2xl p-1 mb-8 w-full max-w-sm"
              style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A' }}
            >
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePresetChange(p.id)}
                  className="flex-1 py-2 rounded-xl text-xs font-black transition-all uppercase tracking-wider"
                  style={
                    activePreset === p.id
                      ? { backgroundColor: '#8B0A0A', color: '#C8BA96' }
                      : { color: '#5C4A3A' }
                  }
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* SVG Circular progress */}
            <div className="relative w-64 h-64 flex items-center justify-center my-2">
              <svg className="w-full h-full" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="100" cy="100" r={radius} fill="none" stroke="#C8BA96" strokeWidth="12" />
                <circle
                  cx="100" cy="100" r={radius} fill="none"
                  stroke="#8B0A0A" strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span
                  className="text-5xl font-black"
                  style={{ fontFamily: 'Nunito, sans-serif', color: '#2B2B2B' }}
                >
                  {formatTime(timeLeft)}
                </span>
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mt-2"
                  style={{ backgroundColor: '#8B0A0A', color: '#C8BA96' }}
                >
                  {activePreset === 'focus' ? '🎯 Fokus Sesi' : '☕ Rehat Sehat'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handleReset}
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition icon-btn"
                style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#5C4A3A' }}
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
                style={{ backgroundColor: '#8B0A0A', color: '#C8BA96', border: '2px solid #342B27' }}
              >
                {isRunning
                  ? <><Pause className="w-5 h-5" /><span>Jeda</span></>
                  : <><Play className="w-5 h-5 fill-current" /><span>Mulai Belajar</span></>
                }
              </button>
              <button
                onClick={handleSkip}
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition icon-btn"
                style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#5C4A3A' }}
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Task selector */}
            <div
              className="mt-8 pt-5 w-full max-w-md text-left"
              style={{ borderTop: '1px solid #C8BA96' }}
            >
              <p
                className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1"
                style={{ color: '#5C4A3A' }}
              >
                <CheckSquare className="w-3.5 h-3.5" style={{ color: '#8B0A0A' }} />
                Tugas yang sedang dikerjakan:
              </p>
              <select
                value={activeFocusTaskId}
                onChange={(e) => setActiveFocusTaskId(e.target.value)}
                className="w-full text-xs font-bold p-3 rounded-2xl"
                style={{
                  background: '#C8BA96',
                  border: '1.5px solid #5C4A3A',
                  color: '#2B2B2B',
                }}
              >
                {tasks.map((t) => (
                  <option key={t.id} value={t.id}>{t.course} — {t.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-5 space-y-5">
            {/* Audio Ambience */}
            <div
              className="p-5 space-y-4 rounded-3xl"
              style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-black" style={{ color: '#2B2B2B' }}>🎵 Study Ambience</h3>
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition"
                  style={
                    isPlayingAudio
                      ? { backgroundColor: '#8B0A0A', color: '#C8BA96' }
                      : { background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#5C4A3A' }
                  }
                >
                  {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {soundscapes.map((sound) => {
                  const isSelected = activeSoundscape === sound.id;
                  return (
                    <button
                      key={sound.id}
                      onClick={() => { setActiveSoundscape(sound.id); setIsPlayingAudio(true); }}
                      className="p-3 rounded-2xl text-left transition flex flex-col gap-1"
                      style={
                        isSelected
                          ? { backgroundColor: '#4A8DB7', border: '2px solid #342B27', color: '#DDD0A8' }
                          : { background: '#C8BA96', border: '1px solid #5C4A3A', color: '#2B2B2B' }
                      }
                    >
                      <span className="text-lg">{sound.icon}</span>
                      <p className="text-xs font-bold">{sound.name}</p>
                      <p
                        className="text-[10px] truncate"
                        style={{ color: isSelected ? 'rgba(255,255,255,0.75)' : '#5C4A3A' }}
                      >
                        {sound.description}
                      </p>
                    </button>
                  );
                })}
              </div>
              {isPlayingAudio && (
                <div className="flex items-center gap-2 pt-1">
                  <Volume2 className="w-3.5 h-3.5" style={{ color: '#5C4A3A' }} />
                  <input
                    type="range" min="0" max="100" value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="flex-1 h-1.5 rounded-lg cursor-pointer"
                    style={{ accentColor: '#8B0A0A' }}
                  />
                  <span className="text-xs w-7" style={{ color: '#5C4A3A' }}>{volume}%</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div
              className="p-5 space-y-4 rounded-3xl"
              style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
            >
              <h3 className="font-black" style={{ color: '#2B2B2B' }}>📊 Statistik Fokus Hari Ini</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { lbl: 'Total Waktu Fokus', val: `${totalFocusMinutes} mnt`, color: '#8B0A0A' },
                  { lbl: 'Sesi Selesai', val: `${completedSessions} sesi`, color: '#4A8DB7' },
                ].map((s) => (
                  <div
                    key={s.lbl}
                    className="p-4 rounded-2xl"
                    style={{ background: '#C8BA96', border: '1px solid #5C4A3A' }}
                  >
                    <p
                      className="text-[10px] font-black uppercase tracking-wider mb-1"
                      style={{ color: s.color }}
                    >
                      {s.lbl}
                    </p>
                    <p className="font-display text-xl" style={{ color: '#2B2B2B' }}>{s.val}</p>
                    <p className="text-[10px]" style={{ color: '#5C4A3A' }}>Hari ini</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#5C4A3A' }}>
                  Aktivitas Terakhir
                </p>
                {timerData.recentSessions.slice(0, 3).map((sess) => (
                  <div
                    key={sess.id}
                    className="p-2.5 rounded-xl flex items-center justify-between text-xs"
                    style={{ background: '#C8BA96', border: '1px solid #5C4A3A' }}
                  >
                    <div className="truncate mr-2">
                      <p className="font-bold truncate" style={{ color: '#2B2B2B' }}>{sess.task}</p>
                      <p className="text-[10px]" style={{ color: '#5C4A3A' }}>{sess.course}</p>
                    </div>
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded-lg shrink-0"
                      style={{ backgroundColor: '#8B0A0A', color: '#C8BA96' }}
                    >
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

