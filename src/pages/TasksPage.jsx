import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  List,
  Plus,
  Search,
  Trash2,
  Play,
  CheckCircle2,
  X,
  AlertTriangle,
  Clock,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];
const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
];

const formatDateToDueLabel = (isoDate) => {
  if (!isoDate) return 'Segera';
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return isoDate;
  return `${d} ${MONTH_SHORT[m - 1] || ''}, 23:59`;
};

const PRIORITY_META = {
  Tinggi: {
    dot: 'bg-accent',
    text: 'text-accent',
    bg: 'bg-accent-soft',
  },
  Sedang: {
    dot: 'bg-semantic-warning',
    text: 'text-semantic-warning',
    bg: 'bg-semantic-warning-soft',
  },
  Rendah: {
    dot: 'bg-ink-muted',
    text: 'text-ink-secondary',
    bg: 'bg-paper-raised',
  },
};

const TasksPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { tasks, addTask, editTask, toggleTaskStatus, deleteTask, setActiveFocusTaskId } = useTasks();

  const [viewMode, setViewMode] = useState('list');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [priorityFilter, setPriorityFilter] = useState('Semua');
  const [courseFilter, setCourseFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(10); // 0-indexed: 10 = November
  const [selectedCalDay, setSelectedCalDay] = useState(13);

  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (isModalOpen) {
          setIsModalOpen(false);
          setEditingTaskId(null);
        }
        if (taskToDelete) setTaskToDelete(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen, taskToDelete]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    course: 'Metodologi Penelitian',
    dueDateOnly: '2026-11-14',
    priority: 'Tinggi',
    estimatedMinutes: 45,
  });

  const openAddModal = () => {
    setEditingTaskId(null);
    setNewTask({
      title: '',
      description: '',
      course: 'Metodologi Penelitian',
      dueDateOnly: `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(selectedCalDay).padStart(2, '0')}`,
      priority: 'Sedang',
      estimatedMinutes: 45,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTaskId(task.id);
    setNewTask({
      title: task.title || '',
      description: task.description || '',
      course: task.course || '',
      dueDateOnly: task.dueDate ? task.dueDate.slice(0, 10) : '2026-11-14',
      priority: task.priority || 'Sedang',
      estimatedMinutes: task.estimatedMinutes || 45,
    });
    setIsModalOpen(true);
  };

  const courses = ['Semua', ...Array.from(new Set(tasks.map((t) => t.course)))];

  const filteredTasks = tasks.filter((t) => {
    const matchStatus = statusFilter === 'Semua' || t.status === statusFilter;
    const matchPriority = priorityFilter === 'Semua' || t.priority === priorityFilter;
    const matchCourse = courseFilter === 'Semua' || t.course === courseFilter;
    const matchSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchPriority && matchCourse && matchSearch;
  });

  const handleStartFocus = (taskId) => {
    setActiveFocusTaskId(taskId);
    navigate('/focus');
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    const payload = {
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      course: newTask.course.trim() || 'Umum',
      dueDate: `${newTask.dueDateOnly}T23:59:00`,
      dueLabel: formatDateToDueLabel(newTask.dueDateOnly),
      priority: newTask.priority,
      estimatedMinutes: Number(newTask.estimatedMinutes) || 30,
    };
    if (editingTaskId) {
      editTask(editingTaskId, payload);
    } else {
      addTask(payload);
    }
    setIsModalOpen(false);
    setEditingTaskId(null);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  const getTaskDateParts = (dueDate) => {
    if (!dueDate) return null;
    const parts = dueDate.slice(0, 10).split('-').map(Number);
    if (parts.length === 3 && !parts.some(Number.isNaN)) {
      return { year: parts[0], month: parts[1] - 1, day: parts[2] };
    }
    return null;
  };

  const isTaskOnDay = (task, day) => {
    const p = getTaskDateParts(task.dueDate);
    return p && p.year === calYear && p.month === calMonth && p.day === day;
  };

  const tasksForSelectedDay = tasks.filter((t) => isTaskOnDay(t, selectedCalDay));

  const activeCount = tasks.filter((t) => t.status !== 'Selesai').length;
  const doneCount = tasks.filter((t) => t.status === 'Selesai').length;
  const highPriorityCount = tasks.filter(
    (t) => t.priority === 'Tinggi' && t.status !== 'Selesai'
  ).length;

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayJs = new Date(calYear, calMonth, 1).getDay(); // 0=Sun..6=Sat
  const leadingBlanks = (firstDayJs + 6) % 7; // Monday-first grid
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
    setSelectedCalDay(1);
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
    setSelectedCalDay(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-semibold tracking-[-0.02em] text-ink leading-tight">
            Tugas kuliah
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            Daftar tugas aktif, prioritas, dan kalender tenggat November 2026
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="inline-flex p-1 rounded-lg bg-paper-raised border border-line">
            {[
              { mode: 'list', Icon: List, label: 'Daftar' },
              { mode: 'calendar', Icon: CalendarIcon, label: 'Kalender' },
            ].map(({ mode, Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`h-7 px-3 rounded-md text-xs font-medium inline-flex items-center gap-1.5 transition-colors duration-150 ${
                  viewMode === mode
                    ? 'bg-paper-card text-ink shadow-subtle'
                    : 'text-ink-secondary hover:text-ink'
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <button type="button" onClick={openAddModal} className="btn-primary text-xs h-9">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            <span>Tambah tugas</span>
          </button>
        </div>
      </div>

      {/* Compact Stats */}
      <section className="grid grid-cols-3 gap-4">
        <div className="surface-card p-4">
          <p className="text-xs text-ink-muted">Tugas aktif</p>
          <p className="font-mono text-2xl font-medium text-ink tabular mt-1.5">
            {activeCount}
          </p>
        </div>
        <div className="surface-card p-4">
          <p className="text-xs text-ink-muted">Prioritas tinggi</p>
          <p className="font-mono text-2xl font-medium text-accent tabular mt-1.5">
            {highPriorityCount}
          </p>
        </div>
        <div className="surface-card p-4">
          <p className="text-xs text-ink-muted">Selesai</p>
          <p className="font-mono text-2xl font-medium text-semantic-positive tabular mt-1.5">
            {doneCount}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="surface-card p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search
            className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            strokeWidth={1.5}
          />
          <input
            type="text"
            aria-label="Cari tugas atau mata kuliah"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tugas atau mata kuliah"
            className="input-field pl-9 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            aria-label="Filter status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 rounded-lg bg-paper border border-line text-xs text-ink focus:outline-none focus:border-accent"
          >
            <option value="Semua">Semua status</option>
            <option value="Belum Selesai">Belum selesai</option>
            <option value="Sedang Berjalan">Sedang berjalan</option>
            <option value="Selesai">Selesai</option>
          </select>

          <select
            aria-label="Filter prioritas"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="h-9 px-3 rounded-lg bg-paper border border-line text-xs text-ink focus:outline-none focus:border-accent"
          >
            <option value="Semua">Semua prioritas</option>
            <option value="Tinggi">Prioritas tinggi</option>
            <option value="Sedang">Prioritas sedang</option>
            <option value="Rendah">Prioritas rendah</option>
          </select>

          <select
            aria-label="Filter mata kuliah"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="h-9 px-3 rounded-lg bg-paper border border-line text-xs text-ink focus:outline-none focus:border-accent max-w-[200px]"
          >
            {courses.map((c) => (
              <option key={c} value={c}>
                {c === 'Semua' ? 'Semua mata kuliah' : c}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Main Content */}
      {viewMode === 'list' ? (
        <section className="surface-card overflow-hidden">
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <CheckCircle2
                className="w-8 h-8 text-ink-muted mx-auto"
                strokeWidth={1.5}
              />
              <p className="text-sm font-medium text-ink">
                Tidak ada tugas yang cocok dengan filter
              </p>
              <p className="text-xs text-ink-muted">
                Ubah kata kunci pencarian atau tambahkan tugas baru.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {filteredTasks.map((task) => {
                const isDone = task.status === 'Selesai';
                const pMeta = PRIORITY_META[task.priority] || PRIORITY_META.Sedang;
                return (
                  <li
                    key={task.id}
                    className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors duration-150 hover:bg-paper-raised/40 ${
                      isDone ? 'opacity-65' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <input
                        type="checkbox"
                        aria-label={`Tandai tugas ${task.title}`}
                        checked={isDone}
                        onChange={() => toggleTaskStatus(task.id)}
                        className="mt-1 w-4 h-4 rounded border-line-strong accent-accent cursor-pointer shrink-0"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-ink-secondary font-medium">
                            {task.course}
                          </span>
                          <span className="text-ink-muted">·</span>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium ${pMeta.bg} ${pMeta.text}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${pMeta.dot}`} />
                            {task.priority}
                          </span>
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-ink-muted tabular">
                            <Clock className="w-3 h-3" strokeWidth={1.5} />
                            {task.estimatedMinutes} mnt
                          </span>
                        </div>

                        <h3
                          className={`text-sm font-medium leading-snug ${
                            isDone ? 'line-through text-ink-muted' : 'text-ink'
                          }`}
                        >
                          {task.title}
                        </h3>

                        {task.description && (
                          <p className="text-xs text-ink-muted line-clamp-1">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <span className="font-mono text-xs text-ink-secondary bg-paper-raised px-2.5 py-1 rounded-md tabular">
                        {task.dueLabel || 'Tenggat'}
                      </span>

                      {!isDone && (
                        <button
                          onClick={() => handleStartFocus(task.id)}
                          title="Fokus pada tugas ini"
                          aria-label="Mulai fokus"
                          className="w-8 h-8 rounded-lg bg-paper-raised border border-line text-ink hover:border-line-strong hover:text-accent flex items-center justify-center transition-colors duration-150 active:scale-[0.98]"
                        >
                          <Play className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => openEditModal(task)}
                        title="Edit tugas"
                        aria-label={`Edit tugas ${task.title}`}
                        className="w-8 h-8 rounded-lg text-ink-muted hover:text-ink hover:bg-paper-raised flex items-center justify-center transition-colors duration-150 active:scale-[0.98]"
                      >
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setTaskToDelete(task)}
                        title="Hapus tugas"
                        aria-label={`Hapus tugas ${task.title}`}
                        className="w-8 h-8 rounded-lg text-ink-muted hover:text-semantic-danger hover:bg-semantic-danger-soft flex items-center justify-center transition-colors duration-150 active:scale-[0.98]"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      ) : (
        /* Calendar View */
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-8 surface-card p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  aria-label="Bulan sebelumnya"
                  className="w-7 h-7 rounded-md border border-line bg-paper hover:bg-paper-raised flex items-center justify-center text-ink-secondary"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <h2 className="text-sm font-medium text-ink min-w-[120px] text-center">
                  {MONTH_NAMES[calMonth]} {calYear}
                </h2>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  aria-label="Bulan berikutnya"
                  className="w-7 h-7 rounded-md border border-line bg-paper hover:bg-paper-raised flex items-center justify-center text-ink-secondary"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
              <span className="font-mono text-xs text-ink-muted tabular">
                {selectedCalDay} {MONTH_SHORT[calMonth]}
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 text-center">
              {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((d) => (
                <div key={d} className="text-xs font-medium text-ink-muted py-1.5">
                  {d}
                </div>
              ))}
              {Array.from({ length: leadingBlanks }).map((_, i) => (
                <div key={`blank-${i}`} />
              ))}
              {calendarDays.map((day) => {
                const dayTasks = tasks.filter((t) => isTaskOnDay(t, day));
                const isSelected = selectedCalDay === day;
                const isToday = calYear === 2026 && calMonth === 10 && day === 13;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedCalDay(day)}
                    className={`h-12 rounded-lg border flex flex-col items-center justify-center gap-1 transition-colors duration-150 ${
                      isSelected
                        ? 'bg-ink text-paper-card border-ink'
                        : isToday
                        ? 'bg-accent-soft text-accent border-accent/30'
                        : 'bg-paper text-ink border-line hover:bg-paper-raised'
                    }`}
                  >
                    <span className="font-mono text-xs font-medium tabular">{day}</span>
                    {dayTasks.length > 0 && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? 'bg-paper-card' : 'bg-accent'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 surface-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-ink">
                Tenggat {selectedCalDay} {MONTH_NAMES[calMonth]}
              </h3>
              <span className="font-mono text-xs text-ink-muted tabular">
                {tasksForSelectedDay.length}
              </span>
            </div>

            {tasksForSelectedDay.length === 0 ? (
              <p className="text-xs text-ink-muted py-6 text-center">
                Tidak ada tenggat tugas pada tanggal ini.
              </p>
            ) : (
              <div className="space-y-2.5">
                {tasksForSelectedDay.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-lg bg-paper border border-line hover:border-line-strong transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-ink-muted truncate">{t.course}</span>
                      <span className="font-mono text-[11px] text-accent tabular shrink-0">
                        {t.dueLabel}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-ink">{t.title}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(t)}
                        className="btn-secondary h-7 px-2.5 text-[11px]"
                      >
                        Edit
                      </button>
                      {t.status !== 'Selesai' && (
                        <button
                          type="button"
                          onClick={() => handleStartFocus(t.id)}
                          className="btn-primary h-7 px-2.5 text-[11px]"
                        >
                          Fokus
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Add Task Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-task-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-[2px]"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-paper-card rounded-2xl max-w-md w-full border border-line-strong shadow-float overflow-hidden animate-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-line flex items-center justify-between">
              <h2 id="add-task-modal-title" className="text-base font-semibold text-ink">
                {editingTaskId ? 'Edit tugas kuliah' : 'Tambah tugas baru'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Tutup"
                className="w-8 h-8 rounded-lg text-ink-muted hover:text-ink hover:bg-paper-raised flex items-center justify-center"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                  Judul tugas
                </label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Contoh: Revisi Bab 3 Metodologi"
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                    Mata kuliah
                  </label>
                  <input
                    type="text"
                    value={newTask.course}
                    onChange={(e) => setNewTask({ ...newTask, course: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                    Prioritas
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="input-field"
                  >
                    <option value="Tinggi">Tinggi</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="task-due-date"
                    className="block text-xs font-medium text-ink-secondary mb-1.5"
                  >
                    Tanggal tenggat
                  </label>
                  <input
                    id="task-due-date"
                    type="date"
                    required
                    value={newTask.dueDateOnly}
                    onChange={(e) => setNewTask({ ...newTask, dueDateOnly: e.target.value })}
                    className="input-field font-mono text-xs"
                  />
                </div>
                <div>
                  <label
                    htmlFor="task-est-minutes"
                    className="block text-xs font-medium text-ink-secondary mb-1.5"
                  >
                    Estimasi (menit)
                  </label>
                  <input
                    id="task-est-minutes"
                    type="number"
                    min="10"
                    max="300"
                    value={newTask.estimatedMinutes}
                    onChange={(e) =>
                      setNewTask({ ...newTask, estimatedMinutes: e.target.value })
                    }
                    className="input-field font-mono text-xs tabular"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                  Catatan singkat (opsional)
                </label>
                <textarea
                  rows={2}
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Detail instruksi atau referensi"
                  className="w-full p-3 rounded-lg bg-paper-card border border-line-strong text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  {editingTaskId ? 'Simpan perubahan' : 'Simpan tugas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {taskToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-task-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-[2px]"
          onClick={() => setTaskToDelete(null)}
        >
          <div
            className="bg-paper-card rounded-2xl max-w-sm w-full border border-line-strong shadow-float p-6 space-y-4 animate-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-semantic-danger-soft text-semantic-danger flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <div>
                <h3 id="delete-task-modal-title" className="text-sm font-semibold text-ink">
                  Hapus tugas ini?
                </h3>
                <p className="text-xs text-ink-secondary mt-1 leading-relaxed">
                  Tugas "{taskToDelete.title}" akan dihapus dari daftar aktifmu.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setTaskToDelete(null)}
                className="btn-secondary h-8 px-3 text-xs"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="h-8 px-3 rounded-lg bg-semantic-danger text-paper-card text-xs font-medium hover:opacity-90 transition-opacity"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
