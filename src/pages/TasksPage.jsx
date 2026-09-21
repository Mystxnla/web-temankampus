import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckSquare, Calendar as CalendarIcon, List, Plus, Search,
  Filter, Trash2, Clock, Play, CheckCircle2, X, AlertCircle
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import BobiMascot from '../components/BobiMascot';

const BG = '#F7BF52'; // Sunshine Ochre Yellow

const TasksPage = () => {
  const navigate = useNavigate();
  const { tasks, addTask, toggleTaskStatus, deleteTask, setActiveFocusTaskId } = useTasks();

  const [viewMode, setViewMode] = useState('list');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [priorityFilter, setPriorityFilter] = useState('Semua');
  const [courseFilter, setCourseFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', course: 'Metodologi Penelitian', dueDate: '2026-09-21T23:59', dueLabel: '21 Sep, 23:59', priority: 'Tinggi', estimatedMinutes: 45 });
  const [selectedCalDay, setSelectedCalDay] = useState(18);

  const courses = ['Semua', ...Array.from(new Set(tasks.map((t) => t.course)))];

  const filteredTasks = tasks.filter((t) => {
    const matchStatus = statusFilter === 'Semua' || t.status === statusFilter;
    const matchPriority = priorityFilter === 'Semua' || t.priority === priorityFilter;
    const matchCourse = courseFilter === 'Semua' || t.course === courseFilter;
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchPriority && matchCourse && matchSearch;
  });

  const handleStartFocus = (taskId) => { setActiveFocusTaskId(taskId); navigate('/focus'); };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    addTask({ ...newTask, estimatedMinutes: Number(newTask.estimatedMinutes) || 30 });
    setIsModalOpen(false);
    setNewTask({ title: '', description: '', course: 'Metodologi Penelitian', dueDate: '2026-09-22T23:59', dueLabel: '22 Sep, 23:59', priority: 'Sedang', estimatedMinutes: 45 });
  };

  const priorityColors = { Tinggi: { bg: '#FFE0B2', text: '#BF360C' }, Sedang: { bg: '#FFF9C4', text: '#7A5E00' }, Rendah: { bg: '#E8F5E9', text: '#1B5E20' } };

  return (
    <div>
      {/* Header on yellow bg */}
      <div className="px-5 sm:px-8 pt-6 pb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-gray-700/70 text-xs font-bold uppercase tracking-widest mb-1">Manajemen Tugas</p>
          <h1 className="hs-headline text-gray-900 text-3xl sm:text-4xl">
            Kelola tugas kuliahmu<br />
            <span className="text-gray-700 text-2xl font-bold">tanpa panik dan tanpa ketinggalan.</span>
          </h1>
          <div className="flex items-center gap-4 mt-4">
            {[
              { val: tasks.filter(t => t.status !== 'Selesai').length, lbl: 'Tugas Aktif' },
              { val: tasks.filter(t => t.status === 'Selesai').length, lbl: 'Selesai' },
              { val: tasks.filter(t => t.priority === 'Tinggi').length, lbl: 'Prioritas Tinggi' },
            ].map((s) => (
              <div key={s.lbl}>
                <div className="font-black text-xl text-gray-900">{s.val}</div>
                <div className="text-gray-600 text-[10px] font-bold uppercase tracking-wider">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <BobiMascot pose="checklist" size={140} accentColor={BG} />
      </div>

      {/* White card body */}
      <div className="headspace-card px-5 sm:px-8 py-6 space-y-5">
        {/* Top bar: view toggle + add button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-2xl p-1">
              <button onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition uppercase tracking-wider ${viewMode === 'list' ? 'text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                style={viewMode === 'list' ? { backgroundColor: BG } : {}}>
                <List className="w-3.5 h-3.5 inline mr-1.5" />List
              </button>
              <button onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition uppercase tracking-wider ${viewMode === 'calendar' ? 'text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                style={viewMode === 'calendar' ? { backgroundColor: BG } : {}}>
                <CalendarIcon className="w-3.5 h-3.5 inline mr-1.5" />Kalender
              </button>
            </div>
          </div>
          <button onClick={() => setIsModalOpen(true)}
            className="hs-btn text-white text-xs shadow-sm py-2.5 px-5"
            style={{ backgroundColor: '#1A1A2E' }}>
            <Plus className="w-4 h-4" /> Tambah Tugas
          </button>
        </div>

        {/* Filter bar */}
        <div className="headspace-card-full border border-gray-100 shadow-sm p-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tugas atau mata kuliah..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-800 placeholder-gray-400 transition" />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'Status:', value: statusFilter, setter: setStatusFilter, options: [['Semua', 'Semua Status'], ['Belum Selesai', 'Belum Selesai'], ['Sedang Berjalan', 'Berjalan'], ['Selesai', 'Selesai']] },
              { label: 'Prioritas:', value: priorityFilter, setter: setPriorityFilter, options: [['Semua', 'Semua'], ['Tinggi', '🔥 Tinggi'], ['Sedang', 'Sedang'], ['Rendah', 'Rendah']] },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-gray-500">{f.label}</span>
                <select value={f.value} onChange={(e) => f.setter(e.target.value)}
                  className="text-xs font-bold bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 text-gray-700">
                  {f.options.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="headspace-card-full border border-gray-100 p-12 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto" />
                <p className="font-black text-gray-900">Tidak ada tugas yang cocok!</p>
                <p className="text-xs text-gray-400">Coba ubah filter atau tambah tugas baru.</p>
              </div>
            ) : filteredTasks.map((task) => {
              const isDone = task.status === 'Selesai';
              const pc = priorityColors[task.priority] || priorityColors.Sedang;
              return (
                <div key={task.id}
                  className={`headspace-card-full border shadow-card-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${isDone ? 'opacity-60 border-gray-100' : 'border-gray-100 hover:border-yellow-300'}`}>
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <input type="checkbox" checked={isDone} onChange={() => toggleTaskStatus(task.id)}
                      className="mt-0.5 w-5 h-5 rounded-lg cursor-pointer shrink-0 accent-yellow-500" />
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: BG, color: '#5C3A00' }}>{task.course}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg" style={{ backgroundColor: pc.bg, color: pc.text }}>{task.priority}</span>
                        <span className="text-[10px] text-gray-400">⏱️ {task.estimatedMinutes} mnt</span>
                      </div>
                      <h3 className={`text-sm font-bold text-gray-900 leading-snug ${isDone ? 'line-through text-gray-400' : ''}`}>{task.title}</h3>
                      {task.description && <p className="text-xs text-gray-400 line-clamp-1">{task.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: BG, color: '#5C3A00' }}>{task.dueLabel || 'Deadline'}</span>
                    {!isDone && (
                      <button onClick={() => handleStartFocus(task.id)}
                        className="w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-black transition">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </button>
                    )}
                    <button onClick={() => deleteTask(task.id)} className="w-8 h-8 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Calendar view */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8 headspace-card-full border border-gray-100 shadow-card-sm p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h2 className="font-black text-gray-900 text-lg">September 2026</h2>
                <span className="hs-chip text-[10px]" style={{ background: '#FFF9E0', color: '#7A5E00' }}>Semester Ganjil TA 2026/2027</span>
              </div>
              <div className="grid grid-cols-7 text-center font-bold text-xs text-gray-400 pb-1">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => <span key={d}>{d}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                <div className="h-14 rounded-xl bg-gray-50" /><div className="h-14 rounded-xl bg-gray-50" />
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                  const isSelected = selectedCalDay === day;
                  const isToday = day === 18;
                  const hasTask = [18, 19, 20, 22, 25].includes(day);
                  return (
                    <button key={day} onClick={() => setSelectedCalDay(day)}
                      className={`h-14 rounded-xl p-1.5 flex flex-col justify-between text-left transition border ${isSelected ? 'border-yellow-400 ring-2 ring-yellow-200' : isToday ? 'border-blue-200' : 'border-gray-100 hover:border-yellow-200 bg-gray-50'}`}
                      style={isSelected ? { backgroundColor: BG + '30' } : isToday ? { backgroundColor: '#EBF5FF' } : {}}>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isToday ? 'w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px]' : 'text-gray-700'}`}
                          style={isToday ? { backgroundColor: '#5C92D1' } : {}}>{day}</span>
                        {hasTask && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BG }} />}
                      </div>
                      {hasTask && <span className="text-[8px] font-black truncate" style={{ color: '#7A5E00' }}>{day === 18 ? 'Bab 2' : day === 19 ? 'Wireframe' : 'Tugas'}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="lg:col-span-4 headspace-card-full border border-gray-100 shadow-card-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#7A5E00' }}>Jadwal Terpilih</p>
                  <h3 className="font-black text-gray-900 text-lg">{selectedCalDay} September</h3>
                </div>
                {selectedCalDay === 18 && <span className="hs-chip text-[10px] text-white" style={{ backgroundColor: BG, color: '#5C3A00' }}>HARI INI</span>}
              </div>
              {selectedCalDay === 18 ? (
                <div className="space-y-2">
                  {[{ badge: '📋 Deadline 23:59', title: 'Revisi Bab 2: Tinjauan Pustaka', sub: 'Metodologi Penelitian · 45 mnt' },
                    { badge: '🎓 Kuliah 10:00', title: 'Interaksi Manusia & Komputer', sub: 'Ruang Lab 304 Fasilkom' }].map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-yellow-50 border border-yellow-100">
                      <p className="text-[10px] font-bold" style={{ color: '#7A5E00' }}>{item.badge}</p>
                      <p className="text-xs font-bold text-gray-800 mt-0.5">{item.title}</p>
                      <p className="text-[10px] text-gray-500">{item.sub}</p>
                    </div>
                  ))}
                </div>
              ) : selectedCalDay === 19 ? (
                <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-100">
                  <p className="text-[10px] font-bold" style={{ color: '#7A5E00' }}>📋 Deadline 10:00</p>
                  <p className="text-xs font-bold text-gray-800 mt-0.5">Finalisasi Low-Fi Wireframes Mobile</p>
                  <p className="text-[10px] text-gray-500">UI/UX Design Studio · 60 mnt</p>
                </div>
              ) : <div className="py-8 text-center text-xs text-gray-400">Tidak ada deadline hari ini 🌸</div>}
              <button onClick={() => setIsModalOpen(true)}
                className="w-full mt-4 py-3 rounded-2xl font-black text-xs uppercase tracking-wider text-white transition"
                style={{ backgroundColor: '#1A1A2E' }}>+ Tambah Tugas</button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="p-5 text-white flex items-center justify-between" style={{ backgroundColor: BG }}>
              <div>
                <h3 className="font-black text-xl text-gray-900">Tambah Tugas Baru ✏️</h3>
                <p className="text-xs text-gray-700">Masukkan rincian tugas untuk dicatat ke kalender.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition">
                <X className="w-4 h-4 text-gray-900" />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Judul Tugas</label>
                <input type="text" required value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Contoh: Laporan Akhir Praktikum Jaringan"
                  className="w-full px-4 py-2.5 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 transition" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Mata Kuliah</label>
                  <input type="text" required value={newTask.course} onChange={(e) => setNewTask({ ...newTask, course: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Prioritas</label>
                  <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 text-xs rounded-xl border border-gray-200 text-gray-800">
                    <option value="Tinggi">🔥 Tinggi</option><option value="Sedang">Sedang</option><option value="Rendah">Rendah</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Tenggat</label>
                  <input type="datetime-local" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 text-xs rounded-xl border border-gray-200 text-gray-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Estimasi (Mnt)</label>
                  <input type="number" min="15" step="15" value={newTask.estimatedMinutes} onChange={(e) => setNewTask({ ...newTask, estimatedMinutes: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 text-xs rounded-xl border border-gray-200 text-gray-800" />
                </div>
              </div>
              <textarea rows="2" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Catatan tambahan..." className="w-full px-4 py-2.5 bg-gray-50 text-xs rounded-xl border border-gray-200 text-gray-800 resize-none" />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition">Batal</button>
                <button type="submit" className="hs-btn text-white text-xs py-2.5 px-6" style={{ backgroundColor: '#1A1A2E' }}>Simpan Tugas</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
