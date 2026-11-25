import React, { useState, useEffect } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import {
  Search,
  Plus,
  MessageSquare,
  Heart,
  X,
  Share2,
  Check,
  Send,
  Phone,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { hasStorageConsent } from '../context/PrivacyContext';
import { detectCrisisKeyword } from '../utils/crisisDetection';
import ClinicalDisclaimerBanner from '../components/layout/ClinicalDisclaimerBanner';
import initialCommunity from '../mock-data/community.json';

const CommunityPage = () => {
  const { openHelpModal } = useOutletContext();
  const location = useLocation();
  const { user } = useAuth();
  const [threads, setThreads] = useState(() => {
    try {
      const saved = localStorage.getItem('temankampus_community_threads');
      return saved ? JSON.parse(saved) : initialCommunity.threads;
    } catch {
      return initialCommunity.threads;
    }
  });
  const [huggedIds, setHuggedIds] = useState([]);
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
    if (hasStorageConsent()) {
      localStorage.setItem('temankampus_community_threads', JSON.stringify(threads));
    }
  }, [threads]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (isNewPostModalOpen) setIsNewPostModalOpen(false);
        if (activeThreadDetail) setActiveThreadDetail(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isNewPostModalOpen, activeThreadDetail]);

  const hasCrisisInNewPost =
    detectCrisisKeyword(newPost.title) || detectCrisisKeyword(newPost.content);
  const hasCrisisInReply = detectCrisisKeyword(replyContent);

  const categories = initialCommunity.categories;

  const filteredThreads = threads.filter((th) => {
    const matchCat =
      selectedCategory === 'Semua' || th.category === selectedCategory;
    const matchSearch =
      th.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      th.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  useEffect(() => {
    if (location.state?.openNewPost) {
      setIsNewPostModalOpen(true);
      window.history.replaceState({}, document.title);
    } else if (location.state?.openThreadId) {
      const target = threads.find((t) => t.id === location.state.openThreadId);
      if (target) setActiveThreadDetail(target);
      window.history.replaceState({}, document.title);
    } else if (location.hash) {
      const hashId = location.hash.replace('#', '');
      const target = threads.find((t) => t.id === hashId);
      if (target) setActiveThreadDetail(target);
    }
  }, [location.state, location.hash]);

  const handleHug = (threadId, e) => {
    e?.stopPropagation();
    const alreadyHugged = huggedIds.includes(threadId);
    const delta = alreadyHugged ? -1 : 1;
    setHuggedIds((prev) =>
      alreadyHugged ? prev.filter((id) => id !== threadId) : [...prev, threadId]
    );
    setThreads((prev) =>
      prev.map((th) =>
        th.id === threadId ? { ...th, hugs: Math.max(0, th.hugs + delta) } : th
      )
    );
    if (activeThreadDetail?.id === threadId) {
      setActiveThreadDetail((prev) => ({
        ...prev,
        hugs: Math.max(0, prev.hugs + delta),
      }));
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
      <ClinicalDisclaimerBanner compact />

      <section className="space-y-3">
        <div className="relative max-w-md">
          <Search
            className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            strokeWidth={1.5}
          />
          <input
            type="text"
            aria-label="Cari topik diskusi komunitas"
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
              role="button"
              tabIndex={0}
              onClick={() => setActiveThreadDetail(thread)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveThreadDetail(thread);
                }
              }}
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
                  type="button"
                  aria-pressed={huggedIds.includes(thread.id)}
                  onClick={(e) => handleHug(thread.id, e)}
                  className={`h-8 px-2.5 rounded-lg text-xs inline-flex items-center gap-1.5 transition-colors duration-150 tabular ${
                    huggedIds.includes(thread.id)
                      ? 'bg-accent-soft text-accent font-medium'
                      : 'text-ink-secondary hover:bg-paper-raised hover:text-accent'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${huggedIds.includes(thread.id) ? 'fill-accent' : ''}`}
                    strokeWidth={1.5}
                  />
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
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-post-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-[2px]"
          onClick={() => setIsNewPostModalOpen(false)}
        >
          <div
            className="bg-paper-card rounded-2xl max-w-lg w-full border border-line-strong shadow-float overflow-hidden animate-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-line flex items-center justify-between">
              <h2 id="new-post-modal-title" className="text-base font-semibold text-ink">
                Tulis cerita baru
              </h2>
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
                  aria-label="Isi cerita komunitas"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Ceritakan pengalaman atau pertanyaanmu secara terbuka"
                  className="w-full p-3 rounded-lg bg-paper-card border border-line-strong text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent resize-none"
                />
                {hasCrisisInNewPost && (
                  <div
                    role="alert"
                    className="mt-2 p-3 rounded-xl bg-accent-soft border border-accent/30 space-y-2"
                  >
                    <p className="text-xs font-medium text-ink">
                      Jika kamu sedang berada dalam situasi krisis, layanan profesional 24 jam siap membantumu sekarang:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a href="tel:119" className="btn-primary h-7 px-2.5 text-xs">
                        <Phone className="w-3 h-3" strokeWidth={1.5} />
                        <span>119 ext 8</span>
                      </a>
                      <a
                        href="https://healing119.id"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary h-7 px-2.5 text-xs"
                      >
                        <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                        <span>Healing119.id</span>
                      </a>
                      <button
                        type="button"
                        onClick={openHelpModal}
                        className="btn-secondary h-7 px-2.5 text-xs"
                      >
                        Kontak lainnya
                      </button>
                    </div>
                  </div>
                )}
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
          role="dialog"
          aria-modal="true"
          aria-labelledby="thread-detail-title"
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

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  aria-pressed={huggedIds.includes(activeThreadDetail.id)}
                  onClick={(e) => handleHug(activeThreadDetail.id, e)}
                  className={`h-8 px-3 rounded-lg text-xs inline-flex items-center gap-1.5 transition-colors tabular border ${
                    huggedIds.includes(activeThreadDetail.id)
                      ? 'bg-accent-soft text-accent border-accent/30 font-medium'
                      : 'bg-paper text-ink-secondary border-line hover:bg-paper-raised'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      huggedIds.includes(activeThreadDetail.id) ? 'fill-accent' : ''
                    }`}
                    strokeWidth={1.5}
                  />
                  <span>{activeThreadDetail.hugs} dukungan</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => handleShare(activeThreadDetail, e)}
                  className="h-8 px-3 rounded-lg text-xs bg-paper border border-line text-ink-secondary hover:bg-paper-raised inline-flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === activeThreadDetail.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-semantic-positive" strokeWidth={1.5} />
                      <span className="text-semantic-positive">Tautan tersalin</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Bagikan</span>
                    </>
                  )}
                </button>
              </div>

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
              {hasCrisisInReply && (
                <div
                  role="alert"
                  className="p-2.5 rounded-lg bg-accent-soft border border-accent/30 flex flex-wrap items-center justify-between gap-2 text-xs"
                >
                  <span className="text-ink font-medium">
                    Butuh dukungan segera? Hubungi 119 ext 8 atau Healing119.id.
                  </span>
                  <button
                    type="button"
                    onClick={openHelpModal}
                    className="text-accent font-medium hover:underline"
                  >
                    Buka kontak
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  aria-label="Tulis balasan diskusi"
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
