import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useOutletContext, Link } from 'react-router-dom';
import {
  MessageCircle,
  ShieldAlert,
  Send,
  Sparkles,
  Phone,
  Trash2,
  Lock,
  Heart,
  AlertOctagon,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
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

  // Handle incoming initial prompt from dashboard shortcut
  useEffect(() => {
    if (location.state?.initialPrompt) {
      handleSendMessage(location.state.initialPrompt);
      // Clear history state to avoid re-triggering on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date()) + ' WIB'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setDailyQuotaUsed((prev) => prev + 1);

    // Check crisis keywords (PRD Section 5.4 & 6.8)
    const lowerText = text.toLowerCase();
    const crisisRule = curhatData.responseRules.find(
      (rule) => rule.isCrisis && rule.keywords.some((k) => lowerText.includes(k))
    );

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (crisisRule) {
        setShowCrisisCard(true);
        const aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'mimi',
          text: crisisRule.response,
          isCrisis: true,
          timestamp: new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
          }).format(new Date()) + ' WIB'
        };
        setMessages((prev) => [...prev, aiResponse]);
        return;
      }

      // Check standard contextual rule
      const matchedRule = curhatData.responseRules.find((rule) =>
        rule.keywords.some((k) => lowerText.includes(k))
      );

      const responseText = matchedRule ? matchedRule.response : curhatData.defaultResponse;

      const aiResponse = {
        id: `ai_${Date.now()}`,
        sender: 'mimi',
        text: responseText,
        isCrisis: false,
        timestamp: new Intl.DateTimeFormat('id-ID', {
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date()) + ' WIB'
      };

      setMessages((prev) => [...prev, aiResponse]);
    }, 1100);
  };

  const handleClearChat = () => {
    if (window.confirm('Hapus seluruh riwayat percakapan dengan Mimi?')) {
      setMessages([curhatData.initialMessages[0]]);
      setShowCrisisCard(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 select-none">
      {/* 1. MANDATORY DISCLAIMER BANNER (PRD Section 6.8) */}
      <div className="bg-surface-container border border-border-purple rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5 text-xs text-[#5A4F72]">
          <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 animate-ping" />
          <p className="leading-relaxed">
            <strong className="text-dark">Disclaimer Penting:</strong> Mimi adalah teman bicara awal & asisten refleksi diri, <u>BUKAN</u> pengganti diagnosis atau terapi psikolog profesional.
          </p>
        </div>
        <button
          onClick={openHelpModal}
          className="px-4 py-2 rounded-xl bg-primary-container text-primary hover:bg-[#FFC6DC] text-xs font-bold transition flex items-center gap-1.5 shrink-0 uppercase tracking-wider"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Hubungi Bantuan Profesional</span>
        </button>
      </div>

      {/* 2. MAIN CHAT CONTAINER */}
      <div className="bg-white rounded-4xl border border-border-light shadow-sm flex flex-col h-[74vh] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-border-light bg-surface-container-low/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center font-display text-lg shadow-md shadow-primary/25">
              🌸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-dark leading-none">
                  Teman Curhat Mimi
                </h2>
                <span className="text-[10px] bg-secondary-container text-secondary font-black px-2 py-0.5 rounded-full">
                  AI Companion
                </span>
              </div>
              <p className="text-[11px] text-[#786D94] flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Mendengarkan tanpa menghakimi · Enkripsi Privat
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {!user?.isPremium && (
              <div className="hidden sm:flex items-center gap-2 text-xs bg-surface-container px-3 py-1.5 rounded-xl border border-border-light">
                <span className="text-[#786D94] font-medium">Kuota Harian:</span>
                <span className="font-bold text-primary">{dailyQuotaUsed}/10 pesan</span>
                <Link to="/premium" className="text-secondary font-extrabold hover:underline ml-1">
                  Pro ∞
                </Link>
              </div>
            )}
            <button
              onClick={handleClearChat}
              className="p-2.5 rounded-xl text-[#786D94] hover:text-red-600 hover:bg-red-50 transition"
              title="Hapus riwayat percakapan"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FAF7FD]/40">
          {/* Emergency Crisis Helpline Card if Triggered */}
          {showCrisisCard && (
            <div className="p-5 bg-red-50 border-2 border-red-300 rounded-3xl text-red-900 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2.5 font-bold text-sm text-red-700">
                <AlertOctagon className="w-5 h-5 text-red-600 shrink-0" />
                <span>Layanan Bantuan & Hotline Krisis Darurat 24 Jam</span>
              </div>
              <p className="text-xs text-red-800 leading-relaxed">
                Kami sangat peduli dengan keselamatanmu. Jika kamu merasa tertekan atau memiliki dorongan menyakiti diri, hubungi layanan darurat bebas biaya di bawah ini:
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href="tel:119"
                  className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Telepon Sejiwa: 119 ext 8</span>
                </a>
                <button
                  onClick={openHelpModal}
                  className="px-4 py-2 rounded-xl bg-white border border-red-300 text-red-800 text-xs font-bold hover:bg-red-100 transition"
                >
                  Daftar Hotline Lengkap →
                </button>
              </div>
            </div>
          )}

          {/* Message List */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isUser
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-secondary-container text-secondary'
                  }`}
                >
                  {isUser ? user?.avatar || 'TK' : '🌸'}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    isUser
                      ? 'bg-primary text-white rounded-tr-xs'
                      : msg.isCrisis
                      ? 'bg-red-100 text-red-900 border border-red-300 rounded-tl-xs'
                      : 'bg-white text-dark border border-border-light rounded-tl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-1.5 font-medium ${
                      isUser ? 'text-pink-200 text-right' : 'text-[#9E94B8]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 mr-auto max-w-xs items-center">
              <div className="w-8 h-8 rounded-full bg-secondary-container text-secondary flex items-center justify-center text-xs font-bold">
                🌸
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-border-light text-xs text-[#786D94] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span>Mimi sedang mengetik pesan penuh empati...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Conversation Starter Chips */}
        <div className="px-4 py-2 bg-surface-container-low border-t border-border-light flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-[#786D94] uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            Topik Curhat:
          </span>
          {curhatData.starterPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] font-medium px-3 py-1 rounded-full bg-white hover:bg-primary-container text-dark hover:text-primary border border-border-light transition shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-white border-t border-border-light flex items-center gap-2 sm:gap-3"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Tuliskan unek-unekmu, tugas yang membebani, atau harimu ke Mimi..."
            className="flex-1 bg-surface-container-low text-xs sm:text-sm px-4 py-3 rounded-2xl border border-border-purple focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-dark placeholder-[#9E94B8] transition"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-3.5 rounded-2xl bg-primary hover:bg-primary-hover disabled:opacity-50 text-white transition shadow-md shadow-primary/25 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CurhatAIPage;
