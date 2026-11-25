import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  CheckSquare,
  CloudRain,
  Coffee,
  Headphones,
  BookOpen,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { ambientAudio } from '../utils/ambientAudio';
import timerData from '../mock-data/timer.json';

const SOUND_ICONS = {
  rain: CloudRain,
  cafe: Coffee,
  lofi: Headphones,
  library: BookOpen,
};

const FocusTimerPage = () => {
  const [searchParams] = useSearchParams();
  const { tasks, activeFocusTaskId, setActiveFocusTaskId } = useTasks();
  const { user, completedFocusSessions, recordFocusSession } = useAuth();
  const presets = timerData.presets;
  const soundscapes = timerData.soundscapes;

  const initialPresetId = searchParams.get('preset') || 'focus';
  const initialPresetObj = presets.find((p) => p.id === initialPresetId) || presets[0];
  const initialSound = searchParams.get('sound') || 'rain';

  const [activePreset, setActivePreset] = useState(initialPresetObj.id);
  const [timeLeft, setTimeLeft] = useState(initialPresetObj.durationMinutes * 60);
  const [totalTime, setTotalTime] = useState(initialPresetObj.durationMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [activeSoundscape, setActiveSoundscape] = useState(initialSound);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [volume, setVolume] = useState(70);
  const [continuousMinutes, setContinuousMinutes] = useState(85);
  const [showRestAlert, setShowRestAlert] = useState(false);
  const [sessionCompletedBanner, setSessionCompletedBanner] = useState(false);

  const completedSessions = completedFocusSessions;
  const totalFocusMinutes = user?.focusMinutesToday || timerData.stats.todayMinutes;

  useEffect(() => {
    if (isPlayingAudio) {
      ambientAudio.start(activeSoundscape, volume);
    } else {
      ambientAudio.stop();
    }
  }, [isPlayingAudio, activeSoundscape]);

  useEffect(() => {
    ambientAudio.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    return () => {
      ambientAudio.stop();
    };
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setSessionCompletedBanner(true);
      if (activePreset === 'focus') {
        const mins = Math.floor(totalTime / 60);
        recordFocusSession(mins);
        setContinuousMinutes((prev) => prev + mins);
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

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (activePreset === 'focus') {
      recordFocusSession(Math.max(1, Math.floor((totalTime - timeLeft) / 60) || 25));
      setSessionCompletedBanner(true);
    }
    handlePresetChange(activePreset === 'focus' ? 'short_break' : 'focus');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
  const radius = 92;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  const totalSessionDots = 6;
  const sessionDots = Array.from({ length: totalSessionDots }, (_, i) => {
    if (i < completedSessions) return 'done';
    if (i === completedSessions && activePreset === 'focus') return 'active';
    return 'pending';
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-semibold tracking-[-0.02em] text-ink leading-tight">
            Ruang fokus
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            Sesi belajar Pomodoro terstruktur dengan suara latar pilihan
          </p>
        </div>

        {/* Session Progress Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {sessionDots.map((status, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-md font-mono text-xs font-medium tabular flex items-center justify-center border ${
                  status === 'done'
                    ? 'bg-accent text-paper-card border-accent'
                    : status === 'active'
                    ? 'bg-paper-card text-accent border-accent'
                    : 'bg-paper-raised text-ink-muted border-line'
                }`}
              >
                {status === 'done' ? <Check className="w-3.5 h-3.5" strokeWidth={2} /> : i + 1}
              </div>
            ))}
          </div>
          <span className="font-mono text-xs text-ink-muted tabular ml-1">
            {completedSessions}/{totalSessionDots} sesi
          </span>
        </div>
      </div>

      {/* Session Completed Next-Step Banner */}
      {sessionCompletedBanner && (
        <div
          role="status"
          className="p-4 surface-calm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-enter"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-semantic-positive shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-ink">
                Sesi selesai! Progres fokusmu hari ini sudah tercatat.
              </p>
              <p className="text-xs text-ink-secondary mt-0.5">
                Ambil jeda 5 menit untuk mengistirahatkan mata atau tandai tugas yang selesai.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setSessionCompletedBanner(false);
                handlePresetChange('short_break');
                setIsRunning(true);
              }}
              className="btn-primary h-8 px-3 text-xs"
            >
              Mulai istirahat 5m
            </button>
            <Link to="/tasks" className="btn-secondary bg-paper-card h-8 px-3 text-xs">
              Lihat daftar tugas
            </Link>
            <button
              type="button"
              onClick={() => setSessionCompletedBanner(false)}
              className="btn-ghost h-8 px-2 text-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Rest Alert */}
      {showRestAlert && (
        <div className="p-4 surface-calm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Coffee className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium text-ink">
                Kamu sudah belajar lebih dari 90 menit berturut-turut
              </p>
              <p className="text-xs text-ink-secondary mt-0.5">
                Berdiri sejenak, regangkan bahu, dan minum air sebelum melanjutkan sesi berikutnya.
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
              className="btn-primary h-8 px-3 text-xs"
            >
              Istirahat 15 menit
            </button>
            <button
              onClick={() => setShowRestAlert(false)}
              className="btn-secondary h-8 px-3 text-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Timer Moment (Left 7 cols) */}
        <section className="lg:col-span-7 surface-card p-6 sm:p-8 flex flex-col items-center">
          {/* Preset Segmented Control */}
          <div className="w-full max-w-sm p-1 rounded-lg bg-paper-raised border border-line grid grid-cols-3 gap-1 mb-8">
            {presets.map((p) => {
              const active = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePresetChange(p.id)}
                  className={`h-8 rounded-md text-xs font-medium transition-colors duration-150 ${
                    active
                      ? 'bg-paper-card text-ink shadow-subtle'
                      : 'text-ink-secondary hover:text-ink'
                  }`}
                >
                  {p.label.split(' ')[0]} {p.durationMinutes}m
                </button>
              );
            })}
          </div>

          {/* Precision Progress Ring */}
          <div className="relative w-64 h-64 flex items-center justify-center my-2">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#EAEBE3"
                strokeWidth="6"
              />
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#356854"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="progress-ring"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-mono text-5xl font-medium text-ink tabular tracking-[-0.03em]">
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs text-ink-muted mt-2">
                {activePreset === 'focus' ? 'Sesi fokus belajar' : 'Waktu istirahat'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleReset}
              title="Reset timer"
              aria-label="Reset timer"
              className="btn-secondary w-10 h-10 p-0"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="btn-primary h-10 px-7 text-sm"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" strokeWidth={1.5} />
                  <span>Jeda</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" strokeWidth={1.5} />
                  <span>Mulai sesi</span>
                </>
              )}
            </button>
            <button
              onClick={handleSkip}
              title="Lewati sesi"
              aria-label="Lewati sesi"
              className="btn-secondary w-10 h-10 p-0"
            >
              <SkipForward className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Active Task Selector */}
          <div className="mt-8 pt-5 border-t border-line w-full max-w-md space-y-2">
            <label
              htmlFor="focus-task-select"
              className="text-xs font-medium text-ink-secondary flex items-center gap-1.5"
            >
              <CheckSquare className="w-3.5 h-3.5 text-ink-muted" strokeWidth={1.5} />
              <span>Tugas yang sedang dikerjakan</span>
            </label>
            <select
              id="focus-task-select"
              value={activeFocusTaskId}
              onChange={(e) => setActiveFocusTaskId(e.target.value)}
              className="input-field text-xs"
            >
              {tasks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.course} — {t.title}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Audio Ambience */}
          <section className="surface-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-ink">Suara latar belajar</h2>
                <p className="text-xs text-ink-muted mt-0.5">
                  {isPlayingAudio ? 'Audio aktif' : 'Audio dijeda'}
                </p>
              </div>
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                aria-label={isPlayingAudio ? 'Matikan audio' : 'Putar audio'}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 ${
                  isPlayingAudio
                    ? 'bg-accent text-paper-card'
                    : 'bg-paper-raised text-ink-secondary hover:text-ink'
                }`}
              >
                {isPlayingAudio ? (
                  <Volume2 className="w-4 h-4" strokeWidth={1.5} />
                ) : (
                  <VolumeX className="w-4 h-4" strokeWidth={1.5} />
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {soundscapes.map((sound) => {
                const isSelected = activeSoundscape === sound.id;
                const Icon = SOUND_ICONS[sound.id] || Headphones;
                return (
                  <button
                    key={sound.id}
                    onClick={() => {
                      setActiveSoundscape(sound.id);
                      setIsPlayingAudio(true);
                    }}
                    className={`p-3 rounded-lg border text-left transition-colors duration-150 space-y-1.5 ${
                      isSelected
                        ? 'bg-ink text-paper-card border-ink'
                        : 'bg-paper text-ink border-line hover:bg-paper-raised'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? 'text-paper-card' : 'text-ink-muted'
                      }`}
                      strokeWidth={1.5}
                    />
                    <p className="text-xs font-medium leading-snug">{sound.name}</p>
                    <p
                      className={`text-[11px] truncate ${
                        isSelected ? 'text-paper-card/70' : 'text-ink-muted'
                      }`}
                    >
                      {sound.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {isPlayingAudio && (
              <div className="flex items-center gap-3 pt-1">
                <Volume2 className="w-3.5 h-3.5 text-ink-muted shrink-0" strokeWidth={1.5} />
                <input
                  type="range"
                  aria-label="Volume suara latar belajar"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="flex-1 h-1.5 rounded-lg cursor-pointer accent-accent"
                />
                <span className="font-mono text-xs text-ink-muted tabular w-9 text-right">
                  {volume}%
                </span>
              </div>
            )}
          </section>

          {/* Focus Stats & Recent Sessions */}
          <section className="surface-card p-5 space-y-4">
            <h2 className="text-sm font-medium text-ink">Ringkasan fokus hari ini</h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-lg bg-paper border border-line">
                <p className="text-xs text-ink-muted">Total waktu</p>
                <p className="font-mono text-xl font-medium text-ink tabular mt-1">
                  {totalFocusMinutes} mnt
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-paper border border-line">
                <p className="text-xs text-ink-muted">Sesi selesai</p>
                <p className="font-mono text-xl font-medium text-accent tabular mt-1">
                  {completedSessions} sesi
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-ink-secondary">Sesi terakhir</p>
              <div className="divide-y divide-line border border-line rounded-lg overflow-hidden bg-paper">
                {timerData.recentSessions.slice(0, 3).map((sess) => (
                  <div
                    key={sess.id}
                    className="px-3 py-2.5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-ink truncate">
                        {sess.task}
                      </p>
                      <p className="text-[11px] text-ink-muted truncate">
                        {sess.course}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-ink-secondary tabular shrink-0">
                      {sess.duration} mnt · {sess.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FocusTimerPage;
