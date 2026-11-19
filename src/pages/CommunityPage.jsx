import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  MessageSquare,
  Heart,
  X,
  Share2,
  Check,
  Send,
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
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [activeThreadDetail, setActiveThreadDetail] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'Skripsi & Tugas Akhir',
    isAnonymous: false,
  });
  const [replyContent, setReplyContent] = useState('');
  const [replyAnonymous, setReplyAnonymous] = useState(false);

  useEffect(() => {
    localStorage.setItem('temankampus_community_threads', JSON.stringify(threads));
  }, [threads]);

  const categories = initialCommunity.categories;

  const filteredThreads = threads.filter((th) => {
    const matchCat =
      selectedCategory === 'Semua' || th.category === selectedCategory;
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
    if (activeThreadDetail?.id === threadId) {
      setActiveThreadDetail((prev) => ({ ...prev, hugs: prev.hugs + 1 }));
    }
  };

  const handleShare = (thread, e) => {
    e?.stopPropagation();
    const shareText = `[TemanKampus] "${thread.title}" - Diskusi Mahasiswa: ${window.location.origin}/community#${thread.id}`;
    navigator.clipboard?.writeText(shareText).catch(() => {});
    setCopiedId(thread.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    const createdThread = {
      id: `th_${Date.now()}`,
      title: newPost.title.trim(),
      content: newPost.content.trim(),
      category: newPost.category,
      author: newPost.isAnonymous ? 'Mahasiswa Anonim' : user?.name || 'Mahasiswa',
      faculty: newPost.isAnonymous
        ? `${user?.faculty || 'Fakultas'} (Anonim)`
        : `${user?.major || 'Mahasiswa'} · ${user?.university || 'UI'}`,
      isAnonymous: newPost.isAnonymous,
      timeAgo: 'Baru saja',
      hugs: 1,
      repliesCount: 0,
      replies: [],
    };
    setThreads((prev) => [createdThread, ...prev]);
    setIsNewPostModalOpen(false);
    setNewPost({
      title: '',
      content: '',
      category: 'Skripsi & Tugas Akhir',
      isAnonymous: false,
    });
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
        ? {
            ...th,
            repliesCount: (th.replies?.length || 0) + 1,
            replies: [...(th.replies || []), newReply],
          }
        : th
    );
    setThreads(updatedThreads);
    setActiveThreadDetail((prev) => ({
      ...prev,
      repliesCount: (prev.replies?.length || 0) + 1,
      replies: [...(prev.replies || []), newReply],
    }));
    setReplyContent('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-semibold tracking-[-0.02em] text-ink leading-tight">
            Komunitas sebaya
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            Forum berbagi pengalaman kuliah, skripsi, dan keseimbangan hidup secara suportif
          </p>
        </div>

        <button
          onClick={() => setIsNewPostModalOpen(true)}
          className="btn-primary text-xs h-9 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          <span>Tulis cerita</span>
        </button>
      </div>

      {/* Search & Categories */}
      <section className="space-y-3">
        <div className="relative max-w-md">
          <Search
            className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            strokeWidth={1.5}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik diskusi"
            className="input-field pl-9 text-xs"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`h-8 px-3 rounded-lg border text-xs font-medium transition-colors duration-150 ${
                  active
                    ? 'bg-ink text-paper-card border-ink'
                    : 'bg-paper-card text-ink-secondary border-line hover:bg-paper-raised hover:text-ink'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Threads List */}
      <section className="space-y-3">
        {filteredThreads.length === 0 ? (
          <div className="surface-card p-12 text-center space-y-1.5">
            <p className="text-sm font-medium text-ink">Belum ada diskusi di kategori ini</p>
            <p className="text-xs text-ink-muted">
              Coba ganti kata kunci atau mulai diskusi baru.
            </p>
          </div>
        ) : (
          filteredThreads.map((thread) => (
            <article
              key={thread.id}
              onClick={() => setActiveThreadDetail(thread)}
              className="surface-card p-5 cursor-pointer hover:border-line-strong transition-colors duration-150 space-y-3"
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium text-accent">{thread.category}</span>
                  <span className="text-ink-muted">·</span>
                  <span className="text-ink-secondary truncate">{thread.author}</span>
                  <span className="hidden sm:inline text-ink-muted truncate">
                    ({thread.faculty})
                  </span>
                </div>
                <span className="font-mono text-[11px] text-ink-muted tabular shrink-0">
                  {thread.timeAgo}
                </span>
              </div>

              <div>
                <h2 className="text-base font-medium text-ink leading-snug">
                  {thread.title}
                </h2>
                <p className="text-sm text-ink-secondary mt-1.5 leading-relaxed line-clamp-2">
                  {thread.content}
                </p>
              </div>

              <div className="pt-3 border-t border-line flex items-center gap-2">
                <button
                  onClick={(e) => handleHug(thread.id, e)}
                  className="h-8 px-2.5 rounded-lg text-xs text-ink-secondary hover:bg-paper-raised hover:text-accent inline-flex items-center gap-1.5 transition-colors duration-150 tabular"
                >
                  <Heart className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{thread.hugs} dukungan</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveThreadDetail(thread);
                  }}
                  className="h-8 px-2.5 rounded-lg text-xs text-ink-secondary hover:bg-paper-raised hover:text-ink inline-flex items-center gap-1.5 transition-colors duration-150 tabular"
                >
                  <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{thread.replies?.length || thread.repliesCount || 0} balasan</span>
                </button>

                <button
                  onClick={(e) => handleShare(thread, e)}
                  className="ml-auto h-8 px-2.5 rounded-lg text-xs text-ink-muted hover:bg-paper-raised hover:text-ink inline-flex items-center gap-1.5 transition-colors duration-150"
                >
                  {copiedId === thread.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-semantic-positive" strokeWidth={1.5} />
                      <span className="text-semantic-positive">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Bagikan</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      {/* New Post Modal */}
      {isNewPostModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-[2px]"
          onClick={() => setIsNewPostModalOpen(false)}
        >
          <div
            className="bg-paper-card rounded-2xl max-w-lg w-full border border-line-strong shadow-float overflow-hidden animate-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-line flex items-center justify-between">
              <h2 className="text-base font-semibold text-ink">Tulis cerita baru</h2>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                aria-label="Tutup"
                className="w-8 h-8 rounded-lg text-ink-muted hover:text-ink hover:bg-paper-raised flex items-center justify-center"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                  Kategori
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="input-field"
                >
                  {categories
                    .filter((c) => c !== 'Semua')
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                  Judul diskusi
                </label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Ringkasan singkat topik yang ingin kamu bahas"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1.5">
                  Isi cerita
                </label>
                <textarea
                  rows={4}
                  required
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Ceritakan pengalaman atau pertanyaanmu secara terbuka"
                  className="w-full p-3 rounded-lg bg-paper-card border border-line-strong text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-ink-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={newPost.isAnonymous}
                  onChange={(e) =>
                    setNewPost({ ...newPost, isAnonymous: e.target.checked })
                  }
                  className="w-4 h-4 rounded accent-accent"
                />
                <span>Kirim sebagai Mahasiswa Anonim</span>
              </label>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="btn-secondary"
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Terbitkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Thread Detail Modal */}
      {activeThreadDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-[2px]"
          onClick={() => setActiveThreadDetail(null)}
        >
          <div
            className="bg-paper-card rounded-2xl max-w-2xl w-full max-h-[85vh] border border-line-strong shadow-float flex flex-col overflow-hidden animate-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-line flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-ink-muted mb-1">
                  <span className="font-medium text-accent">
                    {activeThreadDetail.category}
                  </span>
                  <span>·</span>
                  <span>{activeThreadDetail.author}</span>
                  <span>·</span>
                  <span className="font-mono tabular">{activeThreadDetail.timeAgo}</span>
                </div>
                <h2 className="text-base font-semibold text-ink leading-snug">
                  {activeThreadDetail.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveThreadDetail(null)}
                aria-label="Tutup"
                className="w-8 h-8 rounded-lg text-ink-muted hover:text-ink hover:bg-paper-raised flex items-center justify-center shrink-0"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <p className="text-sm text-ink leading-relaxed whitespace-pre-line">
                {activeThreadDetail.content}
              </p>

              <div className="pt-4 border-t border-line space-y-3">
                <h3 className="text-xs font-medium text-ink-secondary">
                  Balasan ({activeThreadDetail.replies?.length || 0})
                </h3>

                {(!activeThreadDetail.replies ||
                  activeThreadDetail.replies.length === 0) ? (
                  <p className="text-xs text-ink-muted py-4">
                    Belum ada balasan. Jadilah yang pertama memberi dukungan.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {activeThreadDetail.replies.map((rep) => (
                      <div
                        key={rep.id}
                        className="p-3.5 rounded-lg bg-paper border border-line space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-ink">{rep.author}</span>
                          <span className="font-mono text-[11px] text-ink-muted tabular">
                            {rep.timeAgo}
                          </span>
                        </div>
                        <p className="text-xs text-ink-secondary leading-relaxed">
                          {rep.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <form
              onSubmit={handleAddReply}
              className="p-4 border-t border-line bg-paper space-y-2.5"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Tulis balasan yang suportif"
                  className="input-field flex-1 text-xs"
                />
                <button
                  type="submit"
                  disabled={!replyContent.trim()}
                  className="btn-primary h-9 px-3.5 text-xs shrink-0"
                >
                  <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Kirim</span>
                </button>
              </div>
              <label className="inline-flex items-center gap-2 text-xs text-ink-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={replyAnonymous}
                  onChange={(e) => setReplyAnonymous(e.target.checked)}
                  className="w-3.5 h-3.5 rounded accent-accent"
                />
                <span>Balas secara anonim</span>
              </label>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
