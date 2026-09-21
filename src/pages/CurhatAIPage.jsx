import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useOutletContext, Link } from 'react-router-dom';
import {
  MessageCircle, ShieldAlert, Send, Sparkles, Phone,
  Trash2, Lock, Heart, AlertOctagon, ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import curhatData from '../mock-data/curhat.json';
import BobiMascot from '../components/BobiMascot';

const BG = '#987DC7'; // Lavender Lilac

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
      timestamp: new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' }).format(new Date()) + ' WIB'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setDailyQuotaUsed((prev) => prev + 1);

    const lowerText = text.toLowerCase();
    const crisisRule = curhatData.responseRules.find((rule) => rule.isCrisis && rule.keywords.some((k) => lowerText.includes(k)));
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (crisisRule) {
        setShowCrisisCard(true);
        setMessages((prev) => [...prev, { id: `ai_${Date.now()}`, sender: 'mimi', text: crisisRule.response, isCrisis: true, timestamp: new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' }).format(new Date()) + ' WIB' }]);
        return;
      }
      const matchedRule = curhatData.responseRules.find((rule) => rule.keywords.some((k) => lowerText.includes(k)));
      const responseText = matchedRule ? matchedRule.response : curhatData.defaultResponse;
      setMessages((prev) => [...prev, { id: `ai_${Date.now()}`, sender: 'mimi', text: responseText, isCrisis: false, timestamp: new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' }).format(new Date()) + ' WIB' }]);
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
      {/* Header on lavender bg */}
      <div className="px-5 sm:px-8 pt-6 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Ruang Curhat Aman</p>
          <h1 className="hs-headline text-white text-3xl sm:text-4xl">
            Cerita yuk, Mimi<br />
            <span className="text-white/80 text-2xl font-bold">selalu ada untukmu. 🌸</span>
          </h1>
          {/* Disclaimer */}
          <div className="mt-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
            <p className="text-white/70 text-xs">Mimi adalah teman bicara AI, bukan pengganti psikolog profesional.</p>
            <button onClick={openHelpModal} className="text-[10px] font-black text-white/90 underline shrink-0">Bantuan Profesional</button>
          </div>
        </div>
        <BobiMascot pose="tea" size={140} accentColor={BG} />
      </div>

      {/* White card — full chat */}
      <div className="headspace-card px-5 sm:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Chat container */}
          <div className="rounded-3xl border border-gray-100 shadow-card overflow-hidden flex flex-col" style={{ height: '65vh' }}>
            {/* Chat header */}
            <div className="p-4 sm:p-5 flex items-center justify-between" style={{ background: BG }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/25 text-white flex items-center justify-center text-lg">🌸</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-black text-white text-sm">Teman Curhat Mimi</h2>
                    <span className="text-[10px] bg-white/25 text-white font-bold px-2 py-0.5 rounded-full">AI Companion</span>
                  </div>
                  <p className="text-white/70 text-[10px] flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />Mendengarkan tanpa menghakimi · Privat
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!user?.isPremium && (
                  <div className="hidden sm:flex items-center gap-2 text-xs bg-white/15 px-3 py-1.5 rounded-xl text-white">
                    <span>Kuota: {dailyQuotaUsed}/10</span>
                    <Link to="/premium" className="font-black underline">Pro ∞</Link>
                  </div>
                )}
                <button onClick={handleClearChat} className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-gray-50">
              {showCrisisCard && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-red-700">
                    <AlertOctagon className="w-4 h-4 shrink-0" />Layanan Bantuan Krisis Darurat
                  </div>
                  <p className="text-xs text-red-700 leading-relaxed">Kami peduli dengan keselamatanmu. Hubungi layanan darurat gratis di bawah ini:</p>
                  <div className="flex flex-wrap gap-2">
                    <a href="tel:119" className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />Sejiwa: 119 ext 8
                    </a>
                    <button onClick={openHelpModal} className="px-3 py-1.5 rounded-xl bg-white border border-red-200 text-red-700 text-xs font-bold">
                      Hotline Lengkap →
                    </button>
                  </div>
                </div>
              )}

              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={msg.id} className={`flex gap-2.5 max-w-[80%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isUser ? 'text-white' : 'text-purple-600'}`}
                      style={isUser ? { backgroundColor: BG } : { backgroundColor: '#F0E8FF' }}>
                      {isUser ? user?.avatar || 'TK' : '🌸'}
                    </div>
                    <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-sm ${isUser ? 'text-white rounded-tr-sm' : msg.isCrisis ? 'bg-red-50 text-red-900 border border-red-200' : 'bg-white text-gray-800 border border-gray-100'}`}
                      style={isUser ? { backgroundColor: BG } : {}}>
                      <p>{msg.text}</p>
                      <span className={`block text-[10px] mt-1 ${isUser ? 'text-white/60 text-right' : 'text-gray-400'}`}>{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex gap-2.5 mr-auto max-w-xs items-center">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: '#F0E8FF' }}>🌸</div>
                  <div className="p-3 rounded-2xl bg-white border border-gray-100 text-xs text-gray-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: BG }} />
                    Mimi sedang mengetik...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Starter chips */}
            <div className="px-4 py-2 bg-white border-t border-gray-100 flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] font-bold text-gray-400 uppercase shrink-0">Topik:</span>
              {curhatData.starterPrompts.map((prompt, idx) => (
                <button key={idx} onClick={() => handleSendMessage(prompt)}
                  className="text-[11px] font-medium px-3 py-1 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-700 border border-gray-200 transition shrink-0">
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="p-3 sm:p-4 bg-white border-t border-gray-100 flex items-center gap-2 sm:gap-3">
              <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Tuliskan unek-unekmu ke Mimi..."
                className="flex-1 bg-gray-50 text-xs sm:text-sm px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 text-gray-800 placeholder-gray-400 transition" />
              <button type="submit" disabled={!inputMessage.trim()}
                className="p-3.5 rounded-2xl text-white transition disabled:opacity-50 shrink-0 shadow-sm"
                style={{ backgroundColor: BG }}>
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
