import React, { useState, useEffect } from 'react';
import {
  Users, Search, Plus, MessageSquare, Heart, Tag, Clock,
  X, Send, Sparkles, ShieldCheck, User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import initialCommunity from '../mock-data/community.json';
import BobiMascot from '../components/BobiMascot';

const BG = '#419F98'; // Ocean Teal

const CommunityPage = () => {
  const { user } = useAuth();
  const [threads, setThreads] = useState(() => {
    const saved = localStorage.getItem('temankampus_community_threads');
    return saved ? JSON.parse(saved) : initialCommunity.threads;
  });
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [activeThreadDetail, setActiveThreadDetail] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Skripsi & Tugas Akhir', isAnonymous: false });
  const [replyContent, setReplyContent] = useState('');
  const [replyAnonymous, setReplyAnonymous] = useState(false);

  useEffect(() => {
    localStorage.setItem('temankampus_community_threads', JSON.stringify(threads));
  }, [threads]);

  const categories = initialCommunity.categories;

  const filteredThreads = threads.filter((th) => {
    const matchCat = selectedCategory === 'Semua' || th.category === selectedCategory;
    const matchSearch = th.title.toLowerCase().includes(searchQuery.toLowerCase()) || th.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleHug = (threadId, e) => {
    e?.stopPropagation();
    setThreads((prev) => prev.map((th) => th.id === threadId ? { ...th, hugs: th.hugs + 1 } : th));
    if (activeThreadDetail?.id === threadId) setActiveThreadDetail((prev) => ({ ...prev, hugs: prev.hugs + 1 }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    const createdThread = {
      id: `th_${Date.now()}`, title: newPost.title, content: newPost.content, category: newPost.category,
      author: newPost.isAnonymous ? 'Mahasiswa Anonim' : user?.name || 'Mahasiswa',
      faculty: newPost.isAnonymous ? `${user?.faculty || 'Fakultas'} (Anonim)` : `${user?.major || 'Mahasiswa'} ${user?.university || 'UI'}`,
      avatarColor: newPost.isAnonymous ? BG : '#987DC7', isAnonymous: newPost.isAnonymous,
      timeAgo: 'Baru saja', hugs: 1, repliesCount: 0, replies: []
    };
    setThreads((prev) => [createdThread, ...prev]);
    setIsNewPostModalOpen(false);
    setNewPost({ title: '', content: '', category: 'Skripsi & Tugas Akhir', isAnonymous: false });
  };

  const handleAddReply = (e) => {
    e.preventDefault();
    if (!replyContent.trim() || !activeThreadDetail) return;
    const newReply = {
      id: `rep_${Date.now()}`,
      author: replyAnonymous ? 'Mahasiswa Anonim' : user?.name || 'Mahasiswa',
      faculty: replyAnonymous ? 'Anonim' : user?.faculty || 'Kampus',
      isAnonymous: replyAnonymous, timeAgo: 'Baru saja', content: replyContent.trim(), hugs: 0
    };
    const updatedThreads = threads.map((th) =>
      th.id === activeThreadDetail.id ? { ...th, repliesCount: th.repliesCount + 1, replies: [...(th.replies || []), newReply] } : th
    );
    setThreads(updatedThreads);
    setActiveThreadDetail((prev) => ({ ...prev, repliesCount: prev.repliesCount + 1, replies: [...(prev.replies || []), newReply] }));
    setReplyContent('');
  };

  return (
    <div>
      {/* Header on teal bg */}
      <div className="px-5 sm:px-8 pt-6 pb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Komunitas Mahasiswa Sebaya</p>
          <h1 className="hs-headline text-white text-3xl sm:text-4xl">
            Ruang aman berbagi,<br />
            <span className="text-white/80 text-2xl font-bold">tanpa takut dihakimi.</span>
          </h1>
          <div className="flex items-center gap-4 mt-4">
            {[
              { val: threads.length, lbl: 'Thread Aktif' },
              { val: threads.reduce((s, t) => s + t.hugs, 0), lbl: 'Pelukan Hangat' },
              { val: threads.reduce((s, t) => s + t.repliesCount, 0), lbl: 'Respon Suportif' },
            ].map((s) => (
              <div key={s.lbl}>
                <div className="font-black text-xl text-white">{s.val}</div>
                <div className="text-white/65 text-[10px] font-bold uppercase tracking-wider">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <BobiMascot pose="wave" size={130} accentColor={BG} />
          <button onClick={() => setIsNewPostModalOpen(true)}
            className="hs-btn bg-white text-xs font-black shadow-md py-2.5 px-5"
            style={{ color: BG }}>
            <Plus className="w-4 h-4" /> Tulis Cerita Baru
          </button>
        </div>
      </div>

      {/* White card body */}
      <div className="headspace-card px-5 sm:px-8 py-6 space-y-5">
        {/* Search + categories */}
        <div className="headspace-card-full border border-gray-100 shadow-card-sm p-4 space-y-3">
          <div className="relative">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik diskusi, tips skripsi..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-800 placeholder-gray-400 transition"
              style={{ '--tw-ring-color': BG }} />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 uppercase tracking-wider ${selectedCategory === cat ? 'text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                style={selectedCategory === cat ? { backgroundColor: BG } : {}}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Thread feed */}
        <div className="space-y-3">
          {filteredThreads.map((thread) => (
            <div key={thread.id} onClick={() => setActiveThreadDetail(thread)}
              className="headspace-card-full border border-gray-100 hover:border-teal-200 shadow-card-sm p-5 cursor-pointer space-y-3 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="hs-chip text-[10px] text-white" style={{ backgroundColor: BG }}>{thread.category}</span>
                  <span className="text-xs text-gray-400">· {thread.timeAgo}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: BG }}>{thread.faculty}</span>
              </div>
              <h3 className="font-black text-gray-900 text-sm sm:text-base leading-snug hover:text-teal-600 transition">
                "{thread.title}"
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{thread.content}</p>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <button onClick={(e) => handleHug(thread.id, e)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition hover:scale-105"
                    style={{ backgroundColor: '#FFE4EC', color: '#C0254F' }}>
                    <Heart className="w-3.5 h-3.5 fill-current" />{thread.hugs} Pelukan
                  </button>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />{thread.repliesCount} Respon
                  </span>
                </div>
                <span className="text-[11px] font-bold" style={{ color: BG }}>{thread.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thread detail modal */}
      {activeThreadDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-gray-100" style={{ backgroundColor: BG + '15' }}>
              <div className="flex items-center gap-2">
                <span className="hs-chip text-[10px] text-white" style={{ backgroundColor: BG }}>{activeThreadDetail.category}</span>
                <span className="text-xs text-gray-400">{activeThreadDetail.timeAgo}</span>
              </div>
              <button onClick={() => setActiveThreadDetail(null)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto space-y-5 flex-1">
              <div className="space-y-2 pb-4 border-b border-gray-100">
                <h2 className="font-black text-gray-900 text-lg leading-snug">"{activeThreadDetail.title}"</h2>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="font-bold" style={{ color: BG }}>{activeThreadDetail.author}</span> · {activeThreadDetail.faculty}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{activeThreadDetail.content}</p>
                <button onClick={() => handleHug(activeThreadDetail.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-xs"
                  style={{ backgroundColor: '#FFE4EC', color: '#C0254F' }}>
                  <Heart className="w-4 h-4 fill-current" />{activeThreadDetail.hugs} Beri Pelukan Hangat
                </button>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-black text-gray-700 uppercase tracking-wider">
                  Respon ({activeThreadDetail.replies?.length || 0})
                </h4>
                {(!activeThreadDetail.replies || activeThreadDetail.replies.length === 0) && (
                  <p className="text-xs text-gray-400 italic py-3">Belum ada respon. Jadilah yang pertama!</p>
                )}
                {activeThreadDetail.replies?.map((reply) => (
                  <div key={reply.id} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-800">{reply.author}</span>
                      <span className="text-[10px] text-gray-400">{reply.timeAgo}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{reply.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleAddReply} className="p-4 bg-white border-t border-gray-100 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={replyAnonymous} onChange={(e) => setReplyAnonymous(e.target.checked)} className="w-3.5 h-3.5 rounded" />
                  Kirim sebagai Anonim
                </label>
                <span>Jaga etika & empati kampus</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="text" value={replyContent} onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Tuliskan kata penyemangat..."
                  className="flex-1 bg-gray-50 px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-teal-400 text-gray-800 transition" />
                <button type="submit" disabled={!replyContent.trim()}
                  className="px-4 py-2.5 text-white rounded-xl text-xs font-bold transition disabled:opacity-50 shrink-0"
                  style={{ backgroundColor: BG }}>Kirim</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New post modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="p-5 text-white flex items-center justify-between" style={{ backgroundColor: BG }}>
              <div>
                <h3 className="font-black text-xl">Tulis Cerita & Diskusi Baru 🌱</h3>
                <p className="text-xs text-white/80">Ruang aman berbagi tanpa takut dihakimi.</p>
              </div>
              <button onClick={() => setIsNewPostModalOpen(false)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreatePost} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Kategori</label>
                <select value={newPost.category} onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 text-xs rounded-xl border border-gray-200 text-gray-800">
                  {categories.filter((c) => c !== 'Semua').map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Judul Cerita / Pertanyaan</label>
                <input type="text" required value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Cara mengatasi overthinking sebelum seminar proposal..."
                  className="w-full px-4 py-2.5 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-teal-400 text-gray-800 transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Isi Cerita</label>
                <textarea rows="4" required value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Ceritakan detail situasimu..."
                  className="w-full px-4 py-2.5 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-teal-400 text-gray-800 resize-none transition" />
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-800">Posting sebagai Anonim</p>
                  <p className="text-[10px] text-gray-500">Identitasmu tidak akan terlihat</p>
                </div>
                <input type="checkbox" checked={newPost.isAnonymous} onChange={(e) => setNewPost({ ...newPost, isAnonymous: e.target.checked })}
                  className="w-4 h-4 rounded cursor-pointer accent-teal-500" />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsNewPostModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl text-white text-xs font-black uppercase tracking-wider transition shadow-sm"
                  style={{ backgroundColor: BG }}>Publikasikan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
