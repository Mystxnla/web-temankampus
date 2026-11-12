import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useOutletContext, Link } from 'react-router-dom';
import {
  Send, Phone, Trash2, AlertOctagon
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

  useEffect(() => {
    if (location.state?.initialPrompt) {
      handleSendMessage(location.state.initialPrompt);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: `usr_${Date.now()}`, sender: 'user', text: text.trim(),
      timestamp: new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' }).format(new Date()) + ' WIB',
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
      if (crisisRule) {
        setShowCrisisCard(true);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai_${Date.now()}`, sender: 'mimi', text: crisisRule.response,
            isCrisis: true,
            timestamp: new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' }).format(new Date()) + ' WIB',
          },
        ]);
        return;
      }
      const matchedRule = curhatData.responseRules.find(
        (rule) => rule.keywords.some((k) => lowerText.includes(k))
      );
      const responseText = matchedRule ? matchedRule.response : curhatData.defaultResponse;
      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`, sender: 'mimi', text: responseText,
          isCrisis: false,
          timestamp: new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' }).format(new Date()) + ' WIB',
        },
      ]);
    }, 1100);
  };

  const handleClearChat = () => {
    if (window.confirm('Hapus seluruh riwayat percakapan dengan Mimi?')) {
      setMessages([curhatData.initialMessages[0]]);
      setShowCrisisCard(false);
    }
  };

  return (
    <div>
      {/* ── Header Block ── */}
      <div
        className="px-5 sm:px-8 pt-6 pb-8"
        style={{ background: 'linear-gradient(135deg, #8B0A0A 0%, #4A2010 100%)' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(247,240,218,0.7)' }}>
          Ruang Curhat Aman
        </p>
        <h1 className="font-display text-3xl sm:text-4xl" style={{ color: '#F7F0DA' }}>
          Cerita yuk, Mimi
        </h1>
        <p className="font-hand text-base mt-1" style={{ color: 'rgba(247,240,218,0.85)' }}>
          selalu ada untukmu. 🌸
        </p>
        {/* Disclaimer */}
        <div className="mt-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
          <p className="text-xs" style={{ color: 'rgba(247,240,218,0.7)' }}>
            Mimi adalah teman bicara AI, bukan pengganti psikolog profesional.
          </p>
          <button
            onClick={openHelpModal}
            className="text-[10px] font-black underline shrink-0"
            style={{ color: '#F7F0DA' }}
          >
            Bantuan Profesional
          </button>
        </div>
      </div>

      {/* ── Chat Container ── */}
      <div className="px-5 sm:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl overflow-hidden flex flex-col"
            style={{ height: '65vh', border: '2px solid #75685B' }}
          >
            {/* Chat header */}
            <div
              className="p-4 sm:p-5 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, #8B0A0A 0%, #4A2010 100%)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg"
                  style={{ background: 'rgba(247,240,218,0.2)', color: '#F7F0DA' }}
                >
                  🌸
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-black text-sm" style={{ color: '#F7F0DA' }}>
                      Teman Curhat Mimi
                    </h2>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(247,240,218,0.2)', color: '#F7F0DA' }}
                    >
                      AI Companion
                    </span>
                  </div>
                  <p
                    className="text-[10px] flex items-center gap-1 mt-0.5"
                    style={{ color: 'rgba(247,240,218,0.7)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Mendengarkan tanpa menghakimi · Privat
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!user?.isPremium && (
                  <div
                    className="hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl"
                    style={{ background: 'rgba(247,240,218,0.15)', color: '#F7F0DA' }}
                  >
                    <span>Kuota: {dailyQuotaUsed}/10</span>
                    <Link
                      to="/premium"
                      className="font-black underline"
                      style={{ color: '#F7F0DA' }}
                    >
                      Pro ∞
                    </Link>
                  </div>
                )}
                <button
                  onClick={handleClearChat}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition"
                  style={{ background: 'rgba(247,240,218,0.2)', color: '#F7F0DA' }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4"
              style={{ background: '#F7F0DA' }}
            >
              {showCrisisCard && (
                <div
                  className="p-4 rounded-2xl space-y-2"
                  style={{ background: '#F6D0D6', border: '2px solid #8B0A0A' }}
                >
                  <div
                    className="flex items-center gap-2 font-bold text-sm"
                    style={{ color: '#8B0A0A' }}
                  >
                    <AlertOctagon className="w-4 h-4 shrink-0" />
                    Layanan Bantuan Krisis Darurat
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#8B0A0A' }}>
                    Kami peduli dengan keselamatanmu. Hubungi layanan darurat gratis di bawah ini:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="tel:119"
                      className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                      style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA' }}
                    >
                      <Phone className="w-3.5 h-3.5" />Sejiwa: 119 ext 8
                    </a>
                    <button
                      onClick={openHelpModal}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold"
                      style={{ background: '#FFFBEF', border: '1.5px solid #8B0A0A', color: '#8B0A0A' }}
                    >
                      Hotline Lengkap →
                    </button>
                  </div>
                </div>
              )}

              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 max-w-[80%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={
                        isUser
                          ? { backgroundColor: '#8B0A0A', color: '#F7F0DA' }
                          : { backgroundColor: '#FFFBEF', color: '#8B0A0A', border: '1px solid #75685B' }
                      }
                    >
                      {isUser ? user?.avatar || 'TK' : '🌸'}
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-sm ${isUser ? 'rounded-tr-sm' : ''}`}
                      style={
                        isUser
                          ? { backgroundColor: '#8B0A0A', color: '#F7F0DA' }
                          : msg.isCrisis
                          ? { background: '#F6D0D6', color: '#8B0A0A', border: '1.5px solid #8B0A0A' }
                          : { background: '#FFFBEF', color: '#2B2B2B', border: '1.5px solid #75685B' }
                      }
                    >
                      <p>{msg.text}</p>
                      <span
                        className={`block text-[10px] mt-1 ${isUser ? 'text-right' : ''}`}
                        style={{ color: isUser ? 'rgba(247,240,218,0.6)' : '#75685B' }}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex gap-2.5 mr-auto max-w-xs items-center">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                    style={{ background: '#FFFBEF', border: '1px solid #75685B' }}
                  >
                    🌸
                  </div>
                  <div
                    className="p-3 rounded-2xl text-xs flex items-center gap-2"
                    style={{ background: '#FFFBEF', border: '1.5px solid #75685B', color: '#75685B' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-ping"
                      style={{ backgroundColor: '#8B0A0A' }}
                    />
                    Mimi sedang mengetik...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Starter chips */}
            <div
              className="px-4 py-2 flex items-center gap-2 overflow-x-auto"
              style={{ background: '#FFFBEF', borderTop: '1.5px solid #75685B' }}
            >
              <span className="text-[10px] font-bold uppercase shrink-0" style={{ color: '#75685B' }}>
                Topik:
              </span>
              {curhatData.starterPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-[11px] font-medium px-3 py-1 rounded-full transition shrink-0"
                  style={{
                    background: '#F7F0DA',
                    border: '1px solid #75685B',
                    color: '#2B2B2B',
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3"
              style={{ background: '#FFFBEF', borderTop: '1.5px solid #75685B' }}
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Tuliskan unek-unekmu ke Mimi..."
                className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-2xl transition"
                style={{
                  background: '#F7F0DA',
                  border: '1.5px solid #75685B',
                  color: '#2B2B2B',
                }}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-3.5 rounded-2xl transition disabled:opacity-50 shrink-0 shadow-sm"
                style={{ backgroundColor: '#8B0A0A', color: '#F7F0DA' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurhatAIPage;
