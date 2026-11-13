import React, { useState, useEffect } from 'react';
import {
  Search, Plus, MessageSquare, Heart, X, Send
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import initialCommunity from '../mock-data/community.json';
import KucingMascot from '../components/KucingMascot';

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
  const [newPost, setNewPost] = useState({
    title: '', content: '', category: 'Skripsi & Tugas Akhir', isAnonymous: false,
  });
  const [replyContent, setReplyContent] = useState('');
  const [replyAnonymous, setReplyAnonymous] = useState(false);

  useEffect(() => {
    localStorage.setItem('temankampus_community_threads', JSON.stringify(threads));
  }, [threads]);

  const categories = initialCommunity.categories;

  const filteredThreads = threads.filter((th) => {
    const matchCat = selectedCategory === 'Semua' || th.category === selectedCategory;
    const matchSearch =
      th.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      th.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleHug = (threadId, e) => {
    e?.stopPropagation();
    setThreads((prev) =>
      prev.map((th) => (th.id === threadId ? { ...th, hugs: th.hugs + 1 } : th))
    );
    if (activeThreadDetail?.id === threadId)
      setActiveThreadDetail((prev) => ({ ...prev, hugs: prev.hugs + 1 }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    const createdThread = {
      id: `th_${Date.now()}`,
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      author: newPost.isAnonymous ? 'Mahasiswa Anonim' : user?.name || 'Mahasiswa',
      faculty: newPost.isAnonymous
        ? `${user?.faculty || 'Fakultas'} (Anonim)`
        : `${user?.major || 'Mahasiswa'} ${user?.university || 'UI'}`,
      avatarColor: newPost.isAnonymous ? '#4A8DB7' : '#8B0A0A',
      isAnonymous: newPost.isAnonymous,
      timeAgo: 'Baru saja', hugs: 1, repliesCount: 0, replies: [],
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
      isAnonymous: replyAnonymous,
      timeAgo: 'Baru saja',
      content: replyContent.trim(),
      hugs: 0,
    };
    const updatedThreads = threads.map((th) =>
      th.id === activeThreadDetail.id
        ? { ...th, repliesCount: th.repliesCount + 1, replies: [...(th.replies || []), newReply] }
        : th
    );
    setThreads(updatedThreads);
    setActiveThreadDetail((prev) => ({
      ...prev,
      repliesCount: prev.repliesCount + 1,
      replies: [...(prev.replies || []), newReply],
    }));
    setReplyContent('');
  };

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
              Komunitas Mahasiswa Sebaya
            </p>
            <h1 className="font-display text-3xl sm:text-4xl" style={{ color: '#4A8DB7' }}>
              Ruang aman berbagi,
            </h1>
            <p className="font-hand text-base mt-1" style={{ color: '#1F3A7A' }}>
              tanpa takut dihakimi.
            </p>
          </div>
          <KucingMascot pose="happy" size={130} />
        </div>
        <div className="flex items-center gap-6 mt-4">
          {[
            { val: threads.length, lbl: 'Thread Aktif' },
            { val: threads.reduce((s, t) => s + t.hugs, 0), lbl: 'Pelukan Hangat' },
            { val: threads.reduce((s, t) => s + t.repliesCount, 0), lbl: 'Respon Suportif' },
          ].map((s) => (
            <div key={s.lbl}>
              <div className="font-display text-2xl" style={{ color: '#4A8DB7' }}>{s.val}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5C4A3A' }}>
                {s.lbl}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setIsNewPostModalOpen(true)}
          className="hs-btn mt-5 text-xs font-black py-2.5 px-5"
          style={{ backgroundColor: '#8B0A0A', color: '#C8BA96', border: '2px solid #342B27' }}
        >
          <Plus className="w-4 h-4" /> Tulis Cerita Baru
        </button>
      </div>

      {/* ── Card Body ── */}
      <div className="px-5 sm:px-8 py-6 space-y-5">
        {/* Search + categories */}
        <div
          className="p-4 space-y-3 rounded-2xl"
          style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik diskusi, tips skripsi..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl transition"
              style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
            />
            <Search className="w-4 h-4 absolute left-3 top-3" style={{ color: '#5C4A3A' }} />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 uppercase tracking-wider"
                style={
                  selectedCategory === cat
                    ? { backgroundColor: '#8B0A0A', color: '#C8BA96' }
                    : { background: '#C8BA96', color: '#5C4A3A', border: '1px solid #5C4A3A' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Thread feed */}
        <div className="space-y-3">
          {filteredThreads.map((thread) => (
            <div
              key={thread.id}
              onClick={() => setActiveThreadDetail(thread)}
              className="p-5 cursor-pointer space-y-3 transition rounded-3xl"
              style={{ background: '#DDD0A8', border: '2px solid #5C4A3A' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="hs-chip text-[10px]"
                    style={{ backgroundColor: '#4A8DB7', color: '#DDD0A8' }}
                  >
                    {thread.category}
                  </span>
                  <span className="text-xs" style={{ color: '#5C4A3A' }}>· {thread.timeAgo}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: '#4A8DB7' }}>{thread.faculty}</span>
              </div>
              <h3 className="font-black text-sm sm:text-base leading-snug" style={{ color: '#2B2B2B' }}>
                "{thread.title}"
              </h3>
              <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: '#5C4A3A' }}>
                {thread.content}
              </p>
              <div
                className="pt-3 flex items-center justify-between text-xs"
                style={{ borderTop: '1px solid #C8BA96', color: '#5C4A3A' }}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleHug(thread.id, e)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition hover:scale-105"
                    style={{ backgroundColor: '#F6D0D6', color: '#8B0A0A' }}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />{thread.hugs} Pelukan
                  </button>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />{thread.repliesCount} Respon
                  </span>
                </div>
                <span className="text-[11px] font-bold" style={{ color: '#8B0A0A' }}>
                  {thread.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thread detail modal */}
      {activeThreadDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div
            className="rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            style={{ background: '#DDD0A8' }}
          >
            <div
              className="p-4 flex items-center justify-between"
              style={{ background: '#C8BA96', borderBottom: '2px solid #5C4A3A' }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="hs-chip text-[10px]"
                  style={{ backgroundColor: '#4A8DB7', color: '#DDD0A8' }}
                >
                  {activeThreadDetail.category}
                </span>
                <span className="text-xs" style={{ color: '#5C4A3A' }}>{activeThreadDetail.timeAgo}</span>
              </div>
              <button
                onClick={() => setActiveThreadDetail(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition"
                style={{ background: '#5C4A3A30', color: '#2B2B2B' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto space-y-5 flex-1">
              <div className="space-y-2 pb-4" style={{ borderBottom: '1px solid #C8BA96' }}>
                <h2 className="font-black text-lg leading-snug" style={{ color: '#8B0A0A' }}>
                  "{activeThreadDetail.title}"
                </h2>
                <p className="text-xs flex items-center gap-1" style={{ color: '#5C4A3A' }}>
                  <span className="font-bold" style={{ color: '#4A8DB7' }}>{activeThreadDetail.author}</span>
                  · {activeThreadDetail.faculty}
                </p>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#2B2B2B' }}>
                  {activeThreadDetail.content}
                </p>
                <button
                  onClick={() => handleHug(activeThreadDetail.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-xs"
                  style={{ backgroundColor: '#F6D0D6', color: '#8B0A0A' }}
                >
                  <Heart className="w-4 h-4 fill-current" />
                  {activeThreadDetail.hugs} Beri Pelukan Hangat
                </button>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: '#5C4A3A' }}>
                  Respon ({activeThreadDetail.replies?.length || 0})
                </h4>
                {(!activeThreadDetail.replies || activeThreadDetail.replies.length === 0) && (
                  <p className="text-xs italic py-3" style={{ color: '#5C4A3A' }}>
                    Belum ada respon. Jadilah yang pertama!
                  </p>
                )}
                {activeThreadDetail.replies?.map((reply) => (
                  <div
                    key={reply.id}
                    className="p-3.5 rounded-2xl space-y-1"
                    style={{ background: '#C8BA96', border: '1px solid #5C4A3A' }}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold" style={{ color: '#2B2B2B' }}>{reply.author}</span>
                      <span className="text-[10px]" style={{ color: '#5C4A3A' }}>{reply.timeAgo}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#2B2B2B' }}>{reply.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <form
              onSubmit={handleAddReply}
              className="p-4 space-y-2.5"
              style={{ background: '#DDD0A8', borderTop: '2px solid #5C4A3A' }}
            >
              <div className="flex items-center justify-between text-[11px]" style={{ color: '#5C4A3A' }}>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={replyAnonymous}
                    onChange={(e) => setReplyAnonymous(e.target.checked)}
                    className="w-3.5 h-3.5 rounded"
                    style={{ accentColor: '#8B0A0A' }}
                  />
                  Kirim sebagai Anonim
                </label>
                <span>Jaga etika & empati kampus</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Tuliskan kata penyemangat..."
                  className="flex-1 px-4 py-2.5 text-xs rounded-xl transition"
                  style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
                />
                <button
                  type="submit"
                  disabled={!replyContent.trim()}
                  className="px-4 py-2.5 text-xs font-bold rounded-xl transition disabled:opacity-50 shrink-0"
                  style={{ backgroundColor: '#8B0A0A', color: '#C8BA96' }}
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New post modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div
            className="rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
            style={{ background: '#DDD0A8' }}
          >
            {/* Modal header */}
            <div
              className="p-5 flex items-center justify-between"
              style={{ background: '#C8BA96', borderBottom: '2px solid #5C4A3A' }}
            >
              <div>
                <h3 className="font-display text-xl" style={{ color: '#8B0A0A' }}>
                  Tulis Cerita & Diskusi Baru 🌱
                </h3>
                <p className="font-hand text-xs mt-0.5" style={{ color: '#1F3A7A' }}>
                  Ruang aman berbagi tanpa takut dihakimi.
                </p>
              </div>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition"
                style={{ background: '#5C4A3A30', color: '#2B2B2B' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreatePost} className="p-5 space-y-4">
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: '#5C4A3A' }}
                >
                  Kategori
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl"
                  style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
                >
                  {categories.filter((c) => c !== 'Semua').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: '#5C4A3A' }}
                >
                  Judul Cerita / Pertanyaan
                </label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Cara mengatasi overthinking sebelum seminar proposal..."
                  className="w-full px-4 py-2.5 text-xs rounded-xl transition"
                  style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: '#5C4A3A' }}
                >
                  Isi Cerita
                </label>
                <textarea
                  rows="4"
                  required
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Ceritakan detail situasimu..."
                  className="w-full px-4 py-2.5 text-xs rounded-xl resize-none transition"
                  style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
                />
              </div>
              <div
                className="p-3 rounded-xl flex items-center justify-between"
                style={{ background: '#C8BA96', border: '1px solid #5C4A3A' }}
              >
                <div>
                  <p className="text-xs font-bold" style={{ color: '#2B2B2B' }}>Posting sebagai Anonim</p>
                  <p className="text-[10px]" style={{ color: '#5C4A3A' }}>Identitasmu tidak akan terlihat</p>
                </div>
                <input
                  type="checkbox"
                  checked={newPost.isAnonymous}
                  onChange={(e) => setNewPost({ ...newPost, isAnonymous: e.target.checked })}
                  className="w-4 h-4 rounded cursor-pointer"
                  style={{ accentColor: '#8B0A0A' }}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold transition"
                  style={{ background: '#C8BA96', border: '1.5px solid #5C4A3A', color: '#2B2B2B' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-sm"
                  style={{ backgroundColor: '#8B0A0A', color: '#C8BA96', border: '2px solid #342B27' }}
                >
                  Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;

