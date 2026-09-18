import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  Calendar as CalendarIcon,
  List,
  Plus,
  Search,
  Filter,
  Trash2,
  Clock,
  Play,
  CheckCircle2,
  X,
  AlertCircle
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const TasksPage = () => {
  const navigate = useNavigate();
  const {
    tasks,
    addTask,
    toggleTaskStatus,
    deleteTask,
    setActiveFocusTaskId
  } = useTasks();

  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [priorityFilter, setPriorityFilter] = useState('Semua');
  const [courseFilter, setCourseFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Task Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    course: 'Metodologi Penelitian',
    dueDate: '2026-09-21T23:59',
    dueLabel: '21 Sep, 23:59',
    priority: 'Tinggi',
    estimatedMinutes: 45
  });

  // Calendar selected date
  const [selectedCalDay, setSelectedCalDay] = useState(18);

  // Distinct courses
  const courses = ['Semua', ...Array.from(new Set(tasks.map((t) => t.course)))];

  // Filtering logic
  const filteredTasks = tasks.filter((t) => {
    const matchStatus =
      statusFilter === 'Semua' ||
      (statusFilter === 'Belum Selesai' && t.status === 'Belum Selesai') ||
      (statusFilter === 'Sedang Berjalan' && t.status === 'Sedang Berjalan') ||
      (statusFilter === 'Selesai' && t.status === 'Selesai');

    const matchPriority =
      priorityFilter === 'Semua' || t.priority === priorityFilter;

    const matchCourse =
      courseFilter === 'Semua' || t.course === courseFilter;

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

    addTask({
      ...newTask,
      estimatedMinutes: Number(newTask.estimatedMinutes) || 30
    });

    setIsModalOpen(false);
    setNewTask({
      title: '',
      description: '',
      course: 'Metodologi Penelitian',
      dueDate: '2026-09-22T23:59',
      dueLabel: '22 Sep, 23:59',
      priority: 'Sedang',
      estimatedMinutes: 45
    });
  };

  return (
    <div className="space-y-6 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container text-primary font-bold text-xs uppercase tracking-wider mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Manajemen Tugas & Deadline</span>
          </div>
          <h1 className="text-3xl font-display uppercase tracking-wide text-dark">
            Daftar Tugas & Kalender Akademik
          </h1>
          <p className="text-xs sm:text-sm text-[#786D94]">
            Pantau semua tugas per mata kuliah, atur waktu pengerjaan, dan selesaikan tepat waktu.
          </p>
        </div>

        {/* View Switcher & Add Button */}
        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-2xl p-1 border border-border-light shadow-xs">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition uppercase tracking-wider ${
                viewMode === 'list'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-[#786D94] hover:text-dark'
              }`}
            >
              <List className="w-4 h-4" />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition uppercase tracking-wider ${
                viewMode === 'calendar'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-[#786D94] hover:text-dark'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Kalender</span>
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-primary/30 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Tugas</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-border-light shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tugas atau mata kuliah..."
            className="w-full pl-9 pr-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark placeholder-[#9E94B8] transition"
          />
          <Search className="w-4 h-4 text-[#9E94B8] absolute left-3 top-3" />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#786D94]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-bold bg-surface-container-low px-3 py-2 rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary text-dark"
            >
              <option value="Semua">Semua Status</option>
              <option value="Belum Selesai">Belum Selesai</option>
              <option value="Sedang Berjalan">Sedang Berjalan</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#786D94]">Prioritas:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-xs font-bold bg-surface-container-low px-3 py-2 rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary text-dark"
            >
              <option value="Semua">Semua Prioritas</option>
              <option value="Tinggi">Tinggi 🔥</option>
              <option value="Sedang">Sedang</option>
              <option value="Rendah">Rendah</option>
            </select>
          </div>

          {/* Course Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#786D94]">Matkul:</span>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="text-xs font-bold bg-surface-container-low px-3 py-2 rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary text-dark max-w-[140px] truncate"
            >
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'list' ? (
        /* LIST VIEW */
        <div className="space-y-3.5">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-border-light space-y-3">
              <CheckCircle2 className="w-12 h-12 text-secondary mx-auto" />
              <h3 className="text-xl font-display text-dark">Tidak Ada Tugas yang Cocok</h3>
              <p className="text-xs text-[#786D94]">
                Coba ubah kata kunci pencarian atau bersihkan filter di atas.
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isDone = task.status === 'Selesai';
              return (
                <div
                  key={task.id}
                  className={`bg-white rounded-3xl p-5 border transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isDone
                      ? 'border-gray-200 bg-gray-50/70 opacity-75'
                      : 'border-border-light hover:border-border-purple hover:shadow-md'
                  }`}
                >
                  {/* Left: Checkbox + Title + Meta */}
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleTaskStatus(task.id)}
                      className="mt-1 w-5 h-5 text-primary rounded-lg border-border-purple focus:ring-primary cursor-pointer shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-secondary-container text-secondary">
                          {task.course}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                            task.priority === 'Tinggi'
                              ? 'bg-primary-container text-primary'
                              : task.priority === 'Sedang'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {task.priority}
                        </span>
                        <span className="text-[10px] text-[#9E94B8]">
                          ⏱️ {task.estimatedMinutes} menit
                        </span>
                      </div>

                      <h3
                        className={`text-sm sm:text-base font-bold text-dark leading-snug ${
                          isDone ? 'line-through text-gray-400' : ''
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-xs text-[#786D94] line-clamp-1">{task.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Right: Deadline Badge + Actions */}
                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-display text-primary px-3 py-1 rounded-full bg-primary-container">
                        {task.dueLabel || 'Tenggat Waktu'}
                      </span>
                    </div>

                    {!isDone && (
                      <button
                        onClick={() => handleStartFocus(task.id)}
                        className="p-2.5 rounded-xl bg-dark hover:bg-black text-white transition flex items-center gap-1.5 text-xs font-bold shadow-xs"
                        title="Mulai Sesi Fokus Pomodoro untuk tugas ini"
                      >
                        <Play className="w-3.5 h-3.5 text-primary fill-current" />
                        <span className="hidden md:inline">Fokus ⏱️</span>
                      </button>
                    )}

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Hapus tugas"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* CALENDAR VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Calendar Grid (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-border-light shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-border-light">
              <h2 className="text-xl font-display text-dark uppercase tracking-wide">
                September 2026
              </h2>
              <span className="text-xs text-secondary font-bold bg-secondary-container px-3 py-1 rounded-full">
                Semester Ganjil TA 2026/2027
              </span>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 text-center font-bold text-xs text-[#786D94] pb-2">
              <span>Min</span>
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
            </div>

            {/* Calendar Days Matrix (Sample September 2026: 1st is Tuesday) */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty offset for Sunday and Monday */}
              <div className="h-16 rounded-2xl bg-surface-container-low/40" />
              <div className="h-16 rounded-2xl bg-surface-container-low/40" />

              {/* Days 1 to 30 */}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                const isSelected = selectedCalDay === day;
                const isToday = day === 18;
                // Check if any tasks due on this date (simple day simulation)
                const hasTask = day === 18 || day === 19 || day === 20 || day === 22 || day === 25;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedCalDay(day)}
                    className={`h-16 rounded-2xl p-1.5 flex flex-col justify-between text-left transition relative border ${
                      isSelected
                        ? 'border-primary bg-primary-container/40 ring-2 ring-primary'
                        : isToday
                        ? 'border-secondary bg-secondary-container/30'
                        : 'border-border-light hover:border-border-purple bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold ${
                          isToday
                            ? 'w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center'
                            : 'text-dark'
                        }`}
                      >
                        {day}
                      </span>
                      {hasTask && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    {hasTask && (
                      <span className="text-[9px] font-black text-primary truncate">
                        {day === 18 ? 'Bab 2 Skripsi' : day === 19 ? 'Wireframe' : 'Tugas Kuliah'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Date Details (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-border-light shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border-light">
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    Jadwal Terpilih
                  </span>
                  <h3 className="text-xl font-display text-dark uppercase">
                    {selectedCalDay} September 2026
                  </h3>
                </div>
                {selectedCalDay === 18 && (
                  <span className="text-xs bg-primary text-white font-extrabold px-2.5 py-1 rounded-full">
                    HARI INI
                  </span>
                )}
              </div>

              {selectedCalDay === 18 ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-surface-container-low border border-primary-container">
                    <span className="text-[10px] font-bold text-primary">Deadline 23:59 WIB</span>
                    <p className="text-xs font-bold text-dark mt-0.5">Revisi Bab 2: Tinjauan Pustaka</p>
                    <p className="text-[11px] text-[#786D94]">Metodologi Penelitian · Est 45 mnt</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-surface-container-low border border-border-light">
                    <span className="text-[10px] font-bold text-secondary">Kuliah 10:00 WIB</span>
                    <p className="text-xs font-bold text-dark mt-0.5">Interaksi Manusia & Komputer</p>
                    <p className="text-[11px] text-[#786D94]">Ruang Lab 304 Fasilkom</p>
                  </div>
                </div>
              ) : selectedCalDay === 19 ? (
                <div className="p-3 rounded-2xl bg-surface-container-low border border-primary-container">
                  <span className="text-[10px] font-bold text-primary">Deadline 10:00 WIB</span>
                  <p className="text-xs font-bold text-dark mt-0.5">Finalisasi Low-Fi Wireframes Mobile</p>
                  <p className="text-[11px] text-[#786D94]">UI/UX Design Studio · Est 60 mnt</p>
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-[#786D94]">
                  Tidak ada deadline mendesak pada tanggal ini. Waktu luang untuk istirahat atau cicil materi!
                </div>
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-4 py-3 rounded-2xl bg-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition"
            >
              + Tambah Tugas ke Tanggal Ini
            </button>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH TUGAS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full border-2 border-primary/30 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-5 text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-display uppercase tracking-wide">
                  Tambah Tugas Kuliah Baru
                </h3>
                <p className="text-xs text-white/80">Masukkan rincian tugas untuk dicatat ke kalender.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                  Judul Tugas
                </label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Contoh: Laporan Akhir Praktikum Jaringan"
                  className="w-full px-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                    Mata Kuliah
                  </label>
                  <input
                    type="text"
                    required
                    value={newTask.course}
                    onChange={(e) => setNewTask({ ...newTask, course: e.target.value })}
                    placeholder="Nama Mata Kuliah"
                    className="w-full px-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                    Prioritas
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                  >
                    <option value="Tinggi">Tinggi 🔥</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                    Tenggat Tanggal & Waktu
                  </label>
                  <input
                    type="datetime-local"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-4 py-2 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                    Estimasi Pengerjaan (Menit)
                  </label>
                  <input
                    type="number"
                    min="15"
                    step="15"
                    value={newTask.estimatedMinutes}
                    onChange={(e) => setNewTask({ ...newTask, estimatedMinutes: e.target.value })}
                    className="w-full px-4 py-2 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows="2"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Detail instruksi, link referensi, atau pembagian kelompok..."
                  className="w-full px-4 py-2 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-border-light text-xs font-bold text-dark hover:bg-gray-100 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider transition shadow-md"
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
