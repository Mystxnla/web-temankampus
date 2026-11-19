import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useOutletContext, Link } from 'react-router-dom';
import { Send, Phone, Trash2, AlertOctagon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import KucingMascot from '../components/KucingMascot';
import curhatData from '../mock-data/curhat.json';

const CurhatAIPage = () => {
  const location = useLocation();
  const { openHelpModal } = useOutletContext();
  const { user } = useAuth();

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('temankampus_curhat_messages');
    return saved ? JSON.parse(saved) : curhatData.initialMessages;
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [dailyQuotaUsed, setDailyQuotaUsed] = useState(3);
  const [showCrisisCard, setShowCrisisCard] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('temankampus_curhat_messages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (location.state?.initialPrompt) {
      handleSendMessage(location.state.initialPrompt);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const nowLabel =
      new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date()) + ' WIB';

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: nowLabel,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setDailyQuotaUsed((prev) => prev + 1);

    const lowerText = text.toLowerCase();
    const crisisRule = curhatData.responseRules.find(
      (rule) => rule.isCrisis && rule.keywords.some((k) => lowerText.includes(k))
    );

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      const replyTime =
        new Intl.DateTimeFormat('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date()) + ' WIB';

      if (crisisRule) {
        setShowCrisisCard(true);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai_${Date.now()}`,
            sender: 'mimi',
            text: crisisRule.response,
            isCrisis: true,
            timestamp: replyTime,
          },
        ]);
        return;
      }

      const matchedRule = curhatData.responseRules.find(
        (rule) => !rule.isCrisis && rule.keywords.some((k) => lowerText.includes(k))
      );

      let responseText = '';
      if (matchedRule) {
        responseText = matchedRule.response;
      } else if (text.length > 80) {
        responseText =
          'Terima kasih sudah menuangkan ceritamu secara terbuka. Situasi seperti ini memang bisa menguras pikiran dan tenaga.\n\nKalau kita urai pelan-pelan, bagian mana yang paling terasa mendesak untuk ditangani hari ini?';
      } else if (
        lowerText.includes('?') ||
        lowerText.includes('gimana') ||
        lowerText.includes('bagaimana')
      ) {
        responseText =
          'Pertanyaan yang sangat wajar di tengah padatnya kuliah. Terkadang kita tidak langsung menemukan jawaban sempurna, tetapi memulai dari langkah terkecil yang bisa dikendalikan sudah cukup berarti.\n\nApakah ada satu langkah kecil yang terpikirkan olehmu saat ini?';
      } else {
        responseText = curhatData.defaultResponse;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'mimi',
          text: responseText,
          isCrisis: false,
          timestamp: replyTime,
        },
      ]);
    }, 900);
  };

  const handleClearChat = () => {
    if (window.confirm('Hapus seluruh riwayat percakapan dengan Mimi?')) {
      setMessages([curhatData.initialMessages[0]]);
      setShowCrisisCard(false);
    }
  };

  const quickPrompts = curhatData.quickPrompts || [
    'Tugas menumpuk dan aku bingung mulai dari mana',
    'Aku merasa lelah dan cemas menjelang ujian',
    'Susah fokus belajar di kosan hari ini',
  ];

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-semibold tracking-[-0.02em] text-ink leading-tight">
            Teman curhat Mimi
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            Ruang bicara privat untuk mengurai tekanan kuliah. Bukan pengganti diagnosis psikolog profesional.
          </p>
        </div>
        <button
          onClick={openHelpModal}
          className="text-xs font-medium text-accent hover:underline underline-offset-4 self-start sm:self-auto shrink-0"
        >
          Layanan bantuan profesional
        </button>
      </div>

      {/* Chat Surface */}
      <section className="surface-card overflow-hidden flex flex-col h-[68vh] min-h-[480px]">
        {/* Chat Bar */}
        <div className="px-5 py-3.5 border-b border-line flex items-center justify-between gap-3 bg-paper-card">
          <div className="flex items-center gap-3 min-w-0">
            <KucingMascot pose="mark" size={32} className="shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium text-ink">Mimi</h2>
                <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-semantic-positive" />
                  Tersedia
                </span>
              </div>
              <p className="text-xs text-ink-muted truncate">
                Riwayat tersimpan lokal di perangkatmu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!user?.isPremium && (
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-paper-raised border border-line text-xs">
                <span className="font-mono text-ink-secondary tabular">
                  {dailyQuotaUsed}/10 pesan
                </span>
                <Link
                  to="/premium"
                  className="text-accent font-medium hover:underline underline-offset-2"
                >
                  Pro
                </Link>
              </div>
            )}
            <button
              onClick={handleClearChat}
              title="Hapus riwayat percakapan"
              aria-label="Hapus riwayat percakapan"
              className="w-8 h-8 rounded-lg text-ink-muted hover:text-semantic-danger hover:bg-semantic-danger-soft flex items-center justify-center transition-colors duration-150"
            >
              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-paper">
          {showCrisisCard && (
            <div className="p-4 rounded-xl bg-accent-soft border border-accent/25 space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-medium text-accent">
                <AlertOctagon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span>Layanan bantuan krisis & darurat</span>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Keselamatan dan kesehatanmu adalah prioritas utama. Hubungi layanan pendampingan berikut:
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="tel:119" className="btn-primary h-8 px-3 text-xs">
                  <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Sejiwa: 119 ext 8</span>
                </a>
                <button
                  onClick={openHelpModal}
                  className="btn-secondary h-8 px-3 text-xs"
                >
                  Hotline kampus & Yayasan Pulih
                </button>
              </div>
            </div>
          )}

          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] sm:max-w-[75%] rounded-xl px-4 py-3 space-y-1.5 ${
                    isUser
                      ? 'bg-accent text-paper-card'
                      : 'bg-paper-card border border-line text-ink'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </p>
                  <p
                    className={`font-mono text-[10px] tabular ${
                      isUser ? 'text-paper-card/60 text-right' : 'text-ink-muted'
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex justify-start">
              <div className="px-4 py-2.5 rounded-xl bg-paper-card border border-line text-xs text-ink-muted">
                Mimi sedang menuliskan tanggapan...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2.5 border-t border-line bg-paper-card flex items-center gap-2 overflow-x-auto">
          {quickPrompts.slice(0, 3).map((q) => {
            const label = typeof q === 'string' ? q : q.text || q.label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => handleSendMessage(label)}
                className="px-3 py-1.5 rounded-lg bg-paper border border-line text-xs text-ink-secondary hover:text-ink hover:bg-paper-raised transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3.5 border-t border-line bg-paper-card flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Tulis ceritamu di sini"
            className="input-field flex-1"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            aria-label="Kirim pesan"
            className="btn-primary px-4 shrink-0"
          >
            <Send className="w-4 h-4" strokeWidth={1.5} />
            <span className="hidden sm:inline">Kirim</span>
          </button>
        </form>
      </section>
    </div>
  );
};

export default CurhatAIPage;
