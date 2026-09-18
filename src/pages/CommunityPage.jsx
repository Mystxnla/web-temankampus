import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  MessageSquare,
  Heart,
  Tag,
  Clock,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import initialCommunity from '../mock-data/community.json';

const CommunityPage = () => {
  const { user } = useAuth();

  const [threads, setThreads] = useState(() => {
    const saved = localStorage.getItem('temankampus_community_threads');
    return saved ? JSON.parse(saved) : initialCommunity.threads;
  });

  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [activeThreadDetail, setActiveThreadDetail] = useState(null);

  // New Post Form State
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'Skripsi & Tugas Akhir',
    isAnonymous: false
  });

  // Reply Form State
  const [replyContent, setReplyContent] = useState('');
  const [replyAnonymous, setReplyAnonymous] = useState(false);

  useEffect(() => {
    localStorage.setItem('temankampus_community_threads', JSON.stringify(threads));
  }, [threads]);

  const categories = initialCommunity.categories;

  // Filter threads
  const filteredThreads = threads.filter((th) => {
    const matchCat =
      selectedCategory === 'Semua' || th.category === selectedCategory;
    const matchSearch =
      th.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      th.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Handle Warm Hug increment
  const handleHug = (threadId, e) => {
    e?.stopPropagation();
    setThreads((prev) =>
      prev.map((th) =>
        th.id === threadId ? { ...th, hugs: th.hugs + 1 } : th
      )
    );
    if (activeThreadDetail && activeThreadDetail.id === threadId) {
      setActiveThreadDetail((prev) => ({ ...prev, hugs: prev.hugs + 1 }));
    }
  };

  // Handle New Post submission
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const createdThread = {
      id: `th_${Date.now()}`,
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      author: newPost.isAnonymous ? 'Mahasiswa Anonim' : user?.name || 'Mahasiswa',
      faculty: newPost.isAnonymous ? `${user?.faculty || 'Fakultas'} (Anonim)` : `${user?.major || 'Mahasiswa'} ${user?.university || 'UI'}`,
      avatarColor: newPost.isAnonymous ? '#712AE2' : '#FF2E93',
      isAnonymous: newPost.isAnonymous,
      timeAgo: 'Baru saja',
      hugs: 1,
      repliesCount: 0,
      replies: []
    };

    setThreads((prev) => [createdThread, ...prev]);
    setIsNewPostModalOpen(false);
    setNewPost({
      title: '',
      content: '',
      category: 'Skripsi & Tugas Akhir',
      isAnonymous: false
    });
  };

  // Handle Reply submission
  const handleAddReply = (e) => {
    e.preventDefault();
    if (!replyContent.trim() || !activeThreadDetail) return;

    const newReply = {
      id: `rep_${Date.now()}`,
      author: replyAnonymous ? 'Mahasiswa Anonim' : user?.name || 'Mahasiswa',
      faculty: replyAnonymous ? 'Fakultas Terkait (Anonim)' : user?.faculty || 'Kampus',
      isAnonymous: replyAnonymous,
      timeAgo: 'Baru saja',
      content: replyContent.trim(),
      hugs: 0
    };

    const updatedThreads = threads.map((th) => {
      if (th.id === activeThreadDetail.id) {
        return {
          ...th,
          repliesCount: th.repliesCount + 1,
          replies: [...(th.replies || []), newReply]
        };
      }
      return th;
    });

    setThreads(updatedThreads);
    setActiveThreadDetail((prev) => ({
      ...prev,
      repliesCount: prev.repliesCount + 1,
      replies: [...(prev.replies || []), newReply]
    }));
    setReplyContent('');
  };

  return (
    <div className="space-y-6 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-secondary font-bold text-xs uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Ruang Aman Berbagi Cerita</span>
          </div>
          <h1 className="text-3xl font-display uppercase tracking-wide text-dark">
            Komunitas Mahasiswa Sebaya
          </h1>
          <p className="text-xs sm:text-sm text-[#786D94]">
            Forum diskusi suportif non-toxic. Berbagi tips skripsi, atur waktu, atau curhat secara anonim.
          </p>
        </div>

        <button
          onClick={() => setIsNewPostModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-primary/30 transition flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Cerita Baru</span>
        </button>
      </div>

      {/* Category Pills & Search */}
      <div className="bg-white rounded-3xl p-5 border border-border-light shadow-sm space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik diskusi, tips skripsi, atau keluh kesah..."
            className="w-full pl-9 pr-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark placeholder-[#9E94B8] transition"
          />
          <Search className="w-4 h-4 text-[#9E94B8] absolute left-3 top-3" />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 uppercase tracking-wider ${
                selectedCategory === cat
                  ? 'bg-secondary text-white shadow-xs'
                  : 'bg-surface-container-low text-[#5A4F72] hover:text-dark hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Threads Feed */}
      <div className="space-y-4">
        {filteredThreads.map((thread) => (
          <div
            key={thread.id}
            onClick={() => setActiveThreadDetail(thread)}
            className="bg-white rounded-3xl p-6 border border-border-light hover:border-border-purple hover:shadow-md transition cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold px-3 py-0.5 rounded-full bg-secondary-container text-secondary">
                  {thread.category}
                </span>
                <span className="text-xs text-[#9E94B8]">· {thread.timeAgo}</span>
              </div>
              <span className="text-xs font-bold text-primary">{thread.faculty}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-dark hover:text-primary transition leading-snug">
              "{thread.title}"
            </h3>

            <p className="text-xs sm:text-sm text-[#5A4F72] line-clamp-2 leading-relaxed">
              {thread.content}
            </p>

            <div className="pt-3 border-t border-border-light flex items-center justify-between text-xs text-[#786D94]">
              <div className="flex items-center gap-4">
                {/* Hug Button */}
                <button
                  onClick={(e) => handleHug(thread.id, e)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-primary font-bold transition shadow-xs"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{thread.hugs} Pelukan Hangat</span>
                </button>

                {/* Reply count */}
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{thread.repliesCount} Respon Suportif</span>
                </span>
              </div>

              <span className="text-[11px] font-bold text-secondary">
                {thread.author}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: DETAIL THREAD & RESPONSES */}
      {activeThreadDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full border-2 border-secondary/30 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-5 bg-surface-container-low border-b border-border-light flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-secondary-container text-secondary">
                  {activeThreadDetail.category}
                </span>
                <span className="text-xs text-[#9E94B8]">{activeThreadDetail.timeAgo}</span>
              </div>
              <button
                onClick={() => setActiveThreadDetail(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Thread Original Post Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="space-y-3 pb-4 border-b border-border-light">
                <h2 className="text-xl font-display text-dark uppercase tracking-wide leading-snug">
                  "{activeThreadDetail.title}"
                </h2>
                <div className="flex items-center gap-2 text-xs text-[#786D94]">
                  <span className="font-bold text-primary">{activeThreadDetail.author}</span>
                  <span>·</span>
                  <span>{activeThreadDetail.faculty}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#4A4062] leading-relaxed whitespace-pre-line">
                  {activeThreadDetail.content}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => handleHug(activeThreadDetail.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-container text-primary font-extrabold text-xs shadow-xs"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>{activeThreadDetail.hugs} Beri Pelukan Hangat</span>
                  </button>
                </div>
              </div>

              {/* Replies Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">
                  Respon dari Rekan Mahasiswa ({activeThreadDetail.replies?.length || 0})
                </h4>

                {(!activeThreadDetail.replies || activeThreadDetail.replies.length === 0) && (
                  <p className="text-xs text-[#9E94B8] italic py-4">
                    Belum ada respon. Jadilah yang pertama memberikan kata-kata penyemangat!
                  </p>
                )}

                {activeThreadDetail.replies?.map((reply) => (
                  <div
                    key={reply.id}
                    className="p-4 rounded-2xl bg-surface-container-low border border-border-light space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-dark">{reply.author}</span>
                      <span className="text-[10px] text-[#9E94B8]">{reply.timeAgo}</span>
                    </div>
                    <p className="text-xs text-[#4A4062] leading-relaxed">{reply.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply Input Bar */}
            <form onSubmit={handleAddReply} className="p-4 bg-white border-t border-border-light space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-[#786D94]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={replyAnonymous}
                    onChange={(e) => setReplyAnonymous(e.target.checked)}
                    className="w-3.5 h-3.5 text-primary rounded"
                  />
                  <span>Kirim sebagai Mahasiswa Anonim</span>
                </label>
                <span>Saling jaga etika & empati kampus</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Tuliskan kata penyemangat atau saran suportif..."
                  className="flex-1 bg-surface-container-low px-4 py-2.5 text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark"
                />
                <button
                  type="submit"
                  disabled={!replyContent.trim()}
                  className="px-4 py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-xs shrink-0"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TULIS CERITA BARU */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full border-2 border-primary/30 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-5 text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-display uppercase tracking-wide">
                  Tulis Cerita & Diskusi Baru
                </h3>
                <p className="text-xs text-white/80">Ruang aman berbagi tanpa takut dihakimi.</p>
              </div>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                  Kategori Diskusi
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                >
                  {categories.filter((c) => c !== 'Semua').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                  Judul Cerita / Pertanyaan
                </label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Contoh: Cara mengatasi overthinking sebelum seminar proposal..."
                  className="w-full px-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                  Isi Cerita Lengkap
                </label>
                <textarea
                  rows="4"
                  required
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Ceritakan detail situasimu, kendala yang dialami, atau saran yang kamu cari..."
                  className="w-full px-4 py-2.5 bg-surface-container-low text-xs rounded-xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark transition"
                />
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-border-light flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-dark">Posting sebagai Anonim</p>
                  <p className="text-[10px] text-[#786D94]">Nama dan identitas akunmu tidak akan terlihat</p>
                </div>
                <input
                  type="checkbox"
                  checked={newPost.isAnonymous}
                  onChange={(e) => setNewPost({ ...newPost, isAnonymous: e.target.checked })}
                  className="w-4 h-4 text-primary rounded cursor-pointer"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-border-light text-xs font-bold text-dark hover:bg-gray-100 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider transition shadow-md"
                >
                  Publikasikan Cerita
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
