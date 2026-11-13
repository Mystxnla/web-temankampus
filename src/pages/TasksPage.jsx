import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckSquare, Calendar as CalendarIcon, List, Plus, Search,
  Trash2, Play, CheckCircle2, X
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const TasksPage = () => {
  const navigate = useNavigate();
  const { tasks, addTask, toggleTaskStatus, deleteTask, setActiveFocusTaskId } = useTasks();

  const [viewMode, setViewMode] = useState('list');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [priorityFilter, setPriorityFilter] = useState('Semua');
  const [courseFilter, setCourseFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '', description: '', course: 'Metodologi Penelitian',
    dueDate: '2026-09-21T23:59', dueLabel: '21 Sep, 23:59',
    priority: 'Tinggi', estimatedMinutes: 45,
  });
  const [selectedCalDay, setSelectedCalDay] = useState(18);

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

  const handleStartFocus = (taskId) => { setActiveFocusTaskId(taskId); navigate('/focus'); };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    addTask({ ...newTask, estimatedMinutes: Number(newTask.estimatedMinutes) || 30 });
    setIsModalOpen(false);
    setNewTask({
      title: '', description: '', course: 'Metodologi Penelitian',
      dueDate: '2026-09-22T23:59', dueLabel: '22 Sep, 23:59',
      priority: 'Sedang', estimatedMinutes: 45,
    });
  };

  // Priority badge styles
  const priorityStyle = {
    Tinggi: { bg: '#8B0A0A', text: '#C8BA96' },
    Sedang: { bg: '#4A8DB7', text: '#DDD0A8' },
    Rendah: { bg: '#C8BA96', text: '#8B0A0A', border: '1px solid #5C4A3A' },
  };

  return (
    <div>
      {/* ── Header Block ── */}
      <div
        className="px-5 sm:px-8 pt-6 pb-10"
        style={{ backgroundColor: '#C8BA96' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#5C4A3A' }}>
          Manajemen Tugas
        </p>
        <h1 className="font-display text-3xl sm:text-4xl" style={{ color: '#8B0A0A' }}>
          Kelola tugas kuliahmu
        </h1>
        <p className="font-hand text-base mt-1" style={{ color: '#1F3A7A' }}>
          tanpa panik dan tanpa ketinggalan.
        </p>
        <div className="flex items-center gap-6 mt-4">
          {[
            { val: tasks.filter((t) => t.status !== 'Selesai').length, lbl: 'Tugas Aktif' },
            { val: tasks.filter((t) => t.status === 'Selesai').length, lbl: 'Selesai' },
            { val: tasks.filter((t) => t.priority === 'Tinggi').length, lbl: 'Prioritas Tinggi' },
          ].map((s) => (
            <div key={s.lbl}>
              <div className="font-display text-2xl" style={{ color: '#8B0A0A' }}>{s.val}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C4A3A' }}>
                {s.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Top bar: view toggle + add button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              className="flex rounded-2xl p-1"
              style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A' }}
            >
              {[
                { mode: 'list', Icon: List, label: 'List' },
                { mode: 'calendar', Icon: CalendarIcon, label: 'Kalender' },
              ].map(({ mode, Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className="px-4 py-2 rounded-xl text-xs font-black transition uppercase tracking-wider"
                  style={
                    viewMode === mode
                      ? { backgroundColor: '#8B0A0A', color: '#C8BA96' }
                      : { color: '#5C4A3A' }
                  }
                >
                  <Icon className="w-3.5 h-3.5 inline mr-1.5" />{label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hs-btn text-xs py-2.5 px-5 font-black"
            style={{ backgroundColor: '#8B0A0A', color: '#C8BA96', border: '2px solid #342B27' }}
          >
            <Plus className="w-4 h-4" /> Tambah Tugas
          </button>
        </div>

        {/* Filter bar */}
        <div
          className="p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 rounded-2xl"
          style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
        >
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tugas atau mata kuliah..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl focus:outline-none transition font-bold"
              style={{
                background: '#C8BA96',
                color: '#2B2B2B',
                border: '1.5px solid #5C4A3A',
              }}
            />
            <Search className="w-4 h-4 absolute left-3 top-3" style={{ color: '#5C4A3A' }} />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              {
                label: 'Status:', value: statusFilter, setter: setStatusFilter,
                options: [['Semua', 'Semua Status'], ['Belum Selesai', 'Belum Selesai'], ['Sedang Berjalan', 'Berjalan'], ['Selesai', 'Selesai']],
              },
              {
                label: 'Prioritas:', value: priorityFilter, setter: setPriorityFilter,
                options: [['Semua', 'Semua'], ['Tinggi', '🔥 Tinggi'], ['Sedang', 'Sedang'], ['Rendah', 'Rendah']],
              },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold" style={{ color: '#5C4A3A' }}>{f.label}</span>
                <select
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  className="text-xs font-bold px-3 py-2 rounded-xl"
                  style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
                >
                  {f.options.map(([val, lbl]) => (
                    <option key={val} value={val}>{lbl}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div
                className="p-12 text-center space-y-2 rounded-3xl"
                style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
              >
                <CheckCircle2 className="w-10 h-10 mx-auto" style={{ color: '#4A8DB7' }} />
                <p className="font-black" style={{ color: '#2B2B2B' }}>Tidak ada tugas yang cocok!</p>
                <p className="text-xs" style={{ color: '#5C4A3A' }}>Coba ubah filter atau tambah tugas baru.</p>
              </div>
            ) : (
              filteredTasks.map((task) => {
                const isDone = task.status === 'Selesai';
                const ps = priorityStyle[task.priority] || priorityStyle.Sedang;
                return (
                  <div
                    key={task.id}
                    className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl transition"
                    style={{
                      background: '#DDD0A8',
                      border: `2px solid ${isDone ? '#C8BA96' : '#5C4A3A'}`,
                      opacity: isDone ? 0.65 : 1,
                    }}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggleTaskStatus(task.id)}
                        className="mt-0.5 w-5 h-5 rounded-lg cursor-pointer shrink-0"
                        style={{ accentColor: '#8B0A0A' }}
                      />
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className="text-[10px] font-black px-2.5 py-0.5 rounded-full"
                            style={{ background: '#C8BA96', color: '#8B0A0A', border: '1px solid #5C4A3A' }}
                          >
                            {task.course}
                          </span>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-lg"
                            style={{ backgroundColor: ps.bg, color: ps.text, border: ps.border }}
                          >
                            {task.priority}
                          </span>
                          <span className="text-[10px]" style={{ color: '#5C4A3A' }}>
                            ⏱️ {task.estimatedMinutes} mnt
                          </span>
                        </div>
                        <h3
                          className={`text-sm font-bold leading-snug ${isDone ? 'line-through' : ''}`}
                          style={{ color: isDone ? '#5C4A3A' : '#2B2B2B' }}
                        >
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-xs line-clamp-1" style={{ color: '#5C4A3A' }}>
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <span
                        className="text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: '#8B0A0A', color: '#C8BA96' }}
                      >
                        {task.dueLabel || 'Deadline'}
                      </span>
                      {!isDone && (
                        <button
                          onClick={() => handleStartFocus(task.id)}
                          className="w-8 h-8 rounded-xl flex items-center justify-center transition"
                          style={{ backgroundColor: '#4A8DB7', color: '#DDD0A8' }}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition hover:opacity-80"
                        style={{ background: '#C8BA96', color: '#8B0A0A' }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* Calendar view */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div
              className="lg:col-span-8 p-5 space-y-4 rounded-3xl"
              style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
            >
              <div
                className="flex items-center justify-between pb-3"
                style={{ borderBottom: '1px solid #C8BA96' }}
              >
                <h2 className="font-black text-lg" style={{ color: '#2B2B2B' }}>September 2026</h2>
                <span
                  className="hs-chip text-[10px]"
                  style={{ background: '#C8BA96', color: '#8B0A0A', border: '1px solid #5C4A3A' }}
                >
                  Semester Ganjil TA 2026/2027
                </span>
              </div>
              <div
                className="grid grid-cols-7 text-center font-bold text-xs pb-1"
                style={{ color: '#5C4A3A' }}
              >
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                <div className="h-14 rounded-xl" style={{ background: '#C8BA96' }} />
                <div className="h-14 rounded-xl" style={{ background: '#C8BA96' }} />
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                  const isSelected = selectedCalDay === day;
                  const isToday = day === 18;
                  const hasTask = [18, 19, 20, 22, 25].includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedCalDay(day)}
                      className="h-14 rounded-xl p-1.5 flex flex-col justify-between text-left transition"
                      style={{
                        background: isSelected ? '#C8BA96' : isToday ? '#4A8DB720' : '#C8BA9640',
                        border: isSelected
                          ? '2px solid #8B0A0A'
                          : isToday
                          ? '2px solid #4A8DB7'
                          : '1px solid #5C4A3A30',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${isToday ? 'w-5 h-5 rounded-full flex items-center justify-center text-[10px]' : ''}`}
                          style={
                            isToday
                              ? { backgroundColor: '#4A8DB7', color: '#DDD0A8' }
                              : { color: '#2B2B2B' }
                          }
                        >
                          {day}
                        </span>
                        {hasTask && (
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#8B0A0A' }} />
                        )}
                      </div>
                      {hasTask && (
                        <span className="text-[8px] font-black truncate" style={{ color: '#8B0A0A' }}>
                          {day === 18 ? 'Bab 2' : day === 19 ? 'Wireframe' : 'Tugas'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div
              className="lg:col-span-4 p-5 rounded-3xl"
              style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#8B0A0A' }}>
                    Jadwal Terpilih
                  </p>
                  <h3 className="font-black text-lg" style={{ color: '#2B2B2B' }}>
                    {selectedCalDay} September
                  </h3>
                </div>
                {selectedCalDay === 18 && (
                  <span
                    className="hs-chip text-[10px] font-black"
                    style={{ backgroundColor: '#8B0A0A', color: '#C8BA96' }}
                  >
                    HARI INI
                  </span>
                )}
              </div>
              {selectedCalDay === 18 ? (
                <div className="space-y-2">
                  {[
                    { badge: '📋 Deadline 23:59', title: 'Revisi Bab 2: Tinjauan Pustaka', sub: 'Metodologi Penelitian · 45 mnt' },
                    { badge: '🎓 Kuliah 10:00', title: 'Interaksi Manusia & Komputer', sub: 'Ruang Lab 304 Fasilkom' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl"
                      style={{ background: '#C8BA96', border: '1px solid #5C4A3A' }}
                    >
                      <p className="text-[10px] font-bold" style={{ color: '#8B0A0A' }}>{item.badge}</p>
                      <p className="text-xs font-bold mt-0.5" style={{ color: '#2B2B2B' }}>{item.title}</p>
                      <p className="text-[10px]" style={{ color: '#5C4A3A' }}>{item.sub}</p>
                    </div>
                  ))}
                </div>
              ) : selectedCalDay === 19 ? (
                <div
                  className="p-3 rounded-xl"
                  style={{ background: '#C8BA96', border: '1px solid #5C4A3A' }}
                >
                  <p className="text-[10px] font-bold" style={{ color: '#8B0A0A' }}>📋 Deadline 10:00</p>
                  <p className="text-xs font-bold mt-0.5" style={{ color: '#2B2B2B' }}>
                    Finalisasi Low-Fi Wireframes Mobile
                  </p>
                  <p className="text-[10px]" style={{ color: '#5C4A3A' }}>UI/UX Design Studio · 60 mnt</p>
                </div>
              ) : (
                <div className="py-8 text-center text-xs" style={{ color: '#5C4A3A' }}>
                  Tidak ada deadline hari ini 🌸
                </div>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full mt-4 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition"
                style={{ backgroundColor: '#8B0A0A', color: '#C8BA96' }}
              >
                + Tambah Tugas
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div
            className="rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
            style={{ background: '#DDD0A8' }}
          >
            {/* Modal header */}
            <div
              className="p-5 flex items-center justify-between"
              style={{ backgroundColor: '#C8BA96', borderBottom: '2px solid #5C4A3A' }}
            >
              <div>
                <h3 className="font-display text-xl" style={{ color: '#8B0A0A' }}>
                  Tambah Tugas Baru ✏️
                </h3>
                <p className="font-hand text-xs mt-0.5" style={{ color: '#1F3A7A' }}>
                  Masukkan rincian tugas untuk dicatat ke kalender.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition"
                style={{ background: '#5C4A3A30', color: '#2B2B2B' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="p-5 space-y-4">
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: '#5C4A3A' }}
                >
                  Judul Tugas
                </label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Contoh: Laporan Akhir Praktikum Jaringan"
                  className="w-full px-4 py-2.5 text-xs rounded-xl transition"
                  style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: '#5C4A3A' }}
                  >
                    Mata Kuliah
                  </label>
                  <input
                    type="text"
                    required
                    value={newTask.course}
                    onChange={(e) => setNewTask({ ...newTask, course: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl transition"
                    style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: '#5C4A3A' }}
                  >
                    Prioritas
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl"
                    style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
                  >
                    <option value="Tinggi">🔥 Tinggi</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: '#5C4A3A' }}
                  >
                    Tenggat
                  </label>
                  <input
                    type="datetime-local"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-4 py-2 text-xs rounded-xl"
                    style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: '#5C4A3A' }}
                  >
                    Estimasi (Mnt)
                  </label>
                  <input
                    type="number"
                    min="15"
                    step="15"
                    value={newTask.estimatedMinutes}
                    onChange={(e) => setNewTask({ ...newTask, estimatedMinutes: e.target.value })}
                    className="w-full px-4 py-2 text-xs rounded-xl"
                    style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
                  />
                </div>
              </div>
              <textarea
                rows="2"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Catatan tambahan..."
                className="w-full px-4 py-2.5 text-xs rounded-xl resize-none"
                style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold transition"
                  style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="hs-btn text-xs py-2.5 px-6 font-black"
                  style={{ backgroundColor: '#8B0A0A', color: '#C8BA96', border: '2px solid #342B27' }}
                >
                  Simpan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;

