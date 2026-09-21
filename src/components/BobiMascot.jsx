import React from 'react';

/**
 * BobiMascot — TemanKampus original mascot
 * A friendly rounded blob character holding student-life items.
 *
 * Props:
 *   pose: 'wave' | 'coffee' | 'checklist' | 'hug' | 'headphones' | 'tea' | 'friends' | 'star'
 *   size: number (px, default 160)
 *   className: string
 *   accentColor: string (hex, default '#FF9266')
 */

const BobiMascot = ({ pose = 'wave', size = 160, className = '', accentColor = '#FF9266' }) => {
  const width = size;
  const height = size;

  // Shared body parts
  const Body = ({ color = '#FFF1D0', strokeColor = 'rgba(0,0,0,0.08)' }) => (
    <g>
      {/* Shadow */}
      <ellipse cx="80" cy="148" rx="30" ry="6" fill="rgba(0,0,0,0.08)" />
      {/* Body blob */}
      <path
        d="M50 110 C35 100, 30 82, 35 65 C38 52, 46 42, 58 38 C66 35, 74 34, 80 34 C86 34, 94 35, 102 38 C114 42, 122 52, 125 65 C130 82, 125 100, 110 110 C102 116, 92 120, 80 120 C68 120, 58 116, 50 110 Z"
        fill={color}
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      {/* Face: eyes */}
      <ellipse cx="70" cy="72" rx="5" ry="5.5" fill="#2D2540" />
      <ellipse cx="90" cy="72" rx="5" ry="5.5" fill="#2D2540" />
      {/* Eye glints */}
      <ellipse cx="72" cy="70" rx="1.5" ry="1.5" fill="white" />
      <ellipse cx="92" cy="70" rx="1.5" ry="1.5" fill="white" />
      {/* Cheeks */}
      <ellipse cx="62" cy="82" rx="7" ry="4.5" fill="#FFB8A0" opacity="0.6" />
      <ellipse cx="98" cy="82" rx="7" ry="4.5" fill="#FFB8A0" opacity="0.6" />
      {/* Smile */}
      <path d="M68 88 Q80 98 92 88" stroke="#2D2540" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Legs */}
      <ellipse cx="66" cy="125" rx="8" ry="8" fill={color} stroke={strokeColor} strokeWidth="1.5" />
      <ellipse cx="94" cy="125" rx="8" ry="8" fill={color} stroke={strokeColor} strokeWidth="1.5" />
      {/* Feet */}
      <ellipse cx="66" cy="134" rx="10" ry="6" fill={color} stroke={strokeColor} strokeWidth="1.5" />
      <ellipse cx="94" cy="134" rx="10" ry="6" fill={color} stroke={strokeColor} strokeWidth="1.5" />
    </g>
  );

  // ── WAVE pose (Landing) ────────────────────────────
  if (pose === 'wave') {
    return (
      <svg viewBox="0 0 160 160" width={width} height={height} className={`bobi-float ${className}`}>
        <Body />
        {/* Left arm down */}
        <ellipse cx="44" cy="92" rx="8" ry="12" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(20 44 92)" />
        {/* Right arm waving up */}
        <ellipse cx="118" cy="68" rx="8" ry="12" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(-45 118 68)" />
        {/* Waving hand dots */}
        <circle cx="122" cy="56" r="5" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
        {/* Student lanyard */}
        <rect x="76" y="112" width="8" height="20" rx="4" fill={accentColor} opacity="0.7" />
        <rect x="70" y="128" width="20" height="12" rx="4" fill={accentColor} />
        <text x="80" y="137" textAnchor="middle" fill="white" fontSize="5" fontFamily="Nunito" fontWeight="800">TK</text>
        {/* Stars around wave */}
        <text x="128" y="48" fontSize="12">✨</text>
        <text x="28" y="55" fontSize="9">⭐</text>
      </svg>
    );
  }

  // ── COFFEE pose (Dashboard) ────────────────────────────
  if (pose === 'coffee') {
    return (
      <svg viewBox="0 0 160 160" width={width} height={height} className={`bobi-bounce ${className}`}>
        <Body />
        {/* Both arms forward holding cup */}
        <ellipse cx="46" cy="95" rx="8" ry="10" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(15 46 95)" />
        <ellipse cx="114" cy="95" rx="8" ry="10" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(-15 114 95)" />
        {/* Coffee cup */}
        <rect x="64" y="108" width="32" height="26" rx="8" fill={accentColor} />
        <rect x="62" y="106" width="36" height="8" rx="4" fill="#FFF1D0" />
        {/* Cup handle */}
        <path d="M96 112 Q108 112 108 122 Q108 132 96 132" stroke={accentColor} strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Steam */}
        <path d="M72 104 Q74 98 72 92" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M80 102 Q82 96 80 90" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M88 104 Q90 98 88 92" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Coffee label */}
        <text x="80" y="123" textAnchor="middle" fill="white" fontSize="7" fontFamily="Nunito" fontWeight="800">☕</text>
      </svg>
    );
  }

  // ── CHECKLIST pose (Tasks) ────────────────────────────
  if (pose === 'checklist') {
    return (
      <svg viewBox="0 0 160 160" width={width} height={height} className={`bobi-float ${className}`}>
        <Body color="#FFF1D0" />
        {/* Left arm holding clipboard */}
        <ellipse cx="46" cy="90" rx="8" ry="12" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(10 46 90)" />
        {/* Right arm with pencil */}
        <ellipse cx="116" cy="75" rx="7" ry="11" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(-30 116 75)" />
        {/* Pencil */}
        <rect x="120" y="54" width="5" height="22" rx="2" fill="#F7BF52" />
        <polygon points="120,76 125,76 122.5,84" fill="#FFB8A0" />
        <rect x="120" y="52" width="5" height="4" rx="1" fill="#E88080" />
        {/* Clipboard */}
        <rect x="28" y="72" width="30" height="40" rx="5" fill="white" stroke={accentColor} strokeWidth="1.5" />
        <rect x="36" y="68" width="14" height="6" rx="3" fill={accentColor} />
        {/* Checklist lines */}
        <line x1="34" y1="82" x2="52" y2="82" stroke="#E0D8F0" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="34" y1="90" x2="52" y2="90" stroke="#E0D8F0" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="34" y1="98" x2="52" y2="98" stroke="#E0D8F0" strokeWidth="1.5" strokeLinecap="round" />
        {/* Check marks */}
        <path d="M31 80 l3 3 l5 -6" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M31 88 l3 3 l5 -6" stroke={accentColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Stars */}
        <text x="130" y="48" fontSize="14">⭐</text>
      </svg>
    );
  }

  // ── HUG pose (Mood) ────────────────────────────
  if (pose === 'hug') {
    return (
      <svg viewBox="0 0 160 160" width={width} height={height} className={`bobi-bounce ${className}`}>
        <Body />
        {/* Both arms out hugging */}
        <ellipse cx="40" cy="85" rx="10" ry="8" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(-30 40 85)" />
        <ellipse cx="120" cy="85" rx="10" ry="8" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(30 120 85)" />
        {/* Heart in center */}
        <path d="M80 105 C80 105, 66 95, 66 86 C66 80, 71 76, 76 78 C78 79, 80 81, 80 81 C80 81, 82 79, 84 78 C89 76, 94 80, 94 86 C94 95, 80 105, 80 105 Z"
          fill="#FF9999" />
        {/* Floating hearts */}
        <text x="28" y="65" fontSize="12">💛</text>
        <text x="118" y="58" fontSize="12">💚</text>
        <text x="75" y="42" fontSize="10">💙</text>
      </svg>
    );
  }

  // ── HEADPHONES pose (Focus Timer) ────────────────────────────
  if (pose === 'headphones') {
    return (
      <svg viewBox="0 0 160 160" width={width} height={height} className={`bobi-float ${className}`}>
        <Body />
        {/* Arms relaxed */}
        <ellipse cx="46" cy="97" rx="8" ry="10" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(15 46 97)" />
        <ellipse cx="114" cy="97" rx="8" ry="10" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(-15 114 97)" />
        {/* Headphone arc */}
        <path d="M58 60 Q80 38 102 60" stroke={accentColor} strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* Ear cups */}
        <rect x="50" y="58" width="16" height="22" rx="8" fill={accentColor} />
        <rect x="94" y="58" width="16" height="22" rx="8" fill={accentColor} />
        {/* Closed eyes (focused) */}
        <path d="M65 72 Q70 68 75 72" stroke="#2D2540" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M85 72 Q90 68 95 72" stroke="#2D2540" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Music notes */}
        <text x="118" y="50" fontSize="14">🎵</text>
        <text x="28" y="56" fontSize="11">♪</text>
      </svg>
    );
  }

  // ── TEA pose (Curhat AI) ────────────────────────────
  if (pose === 'tea') {
    return (
      <svg viewBox="0 0 160 160" width={width} height={height} className={`bobi-bounce ${className}`}>
        <Body />
        {/* Both arms forward holding teacup */}
        <ellipse cx="47" cy="97" rx="8" ry="10" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(12 47 97)" />
        <ellipse cx="113" cy="97" rx="8" ry="10" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(-12 113 97)" />
        {/* Tea cup - smaller, daintier */}
        <ellipse cx="80" cy="120" rx="18" ry="5" fill="rgba(0,0,0,0.05)" />
        <path d="M64 108 L66 124 Q80 128 94 124 L96 108 Z" fill={accentColor} opacity="0.9" />
        <ellipse cx="80" cy="108" rx="16" ry="5" fill="#FFF8F0" />
        {/* Saucer */}
        <ellipse cx="80" cy="125" rx="22" ry="5" fill="white" stroke={accentColor} strokeWidth="1.5" />
        {/* Tea liquid visible */}
        <ellipse cx="80" cy="108" rx="13" ry="3.5" fill={accentColor} opacity="0.4" />
        {/* Steam */}
        <path d="M74 104 Q76 98 74 92" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M80 102 Q82 96 80 90" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Speech bubble */}
        <rect x="96" y="38" width="50" height="30" rx="10" fill="white" />
        <polygon points="100,65 96,75 110,65" fill="white" />
        <text x="121" y="56" textAnchor="middle" fill="#987DC7" fontSize="12">🌸</text>
        <text x="121" y="62" textAnchor="middle" fill="#987DC7" fontSize="6.5" fontFamily="Nunito" fontWeight="700">Cerita yuk!</text>
      </svg>
    );
  }

  // ── FRIENDS pose (Community) ────────────────────────────
  if (pose === 'friends') {
    return (
      <svg viewBox="0 0 180 160" width={size * 1.1} height={height} className={`bobi-float ${className}`}>
        {/* Left friend blob (smaller) */}
        <g transform="translate(-20, 15) scale(0.75)">
          <ellipse cx="110" cy="148" rx="22" ry="5" fill="rgba(0,0,0,0.06)" />
          <path d="M88 108 C78 98, 75 82, 80 68 C84 56, 94 46, 106 44 C118 44, 128 54, 132 68 C137 82, 132 98, 122 108 C116 114, 110 118, 106 118 C102 118, 96 114, 88 108 Z"
            fill="#FFDCC8" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
          <ellipse cx="98" cy="76" rx="4.5" ry="5" fill="#2D2540" />
          <ellipse cx="114" cy="76" rx="4.5" ry="5" fill="#2D2540" />
          <ellipse cx="90" cy="87" rx="6" ry="4" fill="#FFB8A0" opacity="0.55" />
          <ellipse cx="122" cy="87" rx="6" ry="4" fill="#FFB8A0" opacity="0.55" />
          <path d="M94 92 Q106 101 118 92" stroke="#2D2540" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="95" cy="130" rx="7" ry="7" fill="#FFDCC8" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
          <ellipse cx="117" cy="130" rx="7" ry="7" fill="#FFDCC8" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
        </g>

        {/* Main Bobi (center) */}
        <g transform="translate(20, 0)">
          <Body accentColor={accentColor} />
          {/* Left arm going toward left friend */}
          <ellipse cx="44" cy="88" rx="8" ry="11" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(-20 44 88)" />
          {/* Right arm going toward right */}
          <ellipse cx="116" cy="88" rx="8" ry="11" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(20 116 88)" />
        </g>

        {/* Right friend blob (smaller) */}
        <g transform="translate(80, 18) scale(0.72)">
          <ellipse cx="80" cy="148" rx="22" ry="5" fill="rgba(0,0,0,0.06)" />
          <path d="M50 108 C38 98, 33 82, 38 68 C42 56, 52 46, 64 44 C76 42, 88 50, 92 64 C98 80, 93 98, 80 108 C74 114, 68 118, 64 118 C58 118, 52 114, 50 108 Z"
            fill="#C8E8FF" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
          <ellipse cx="56" cy="76" rx="4.5" ry="5" fill="#2D2540" />
          <ellipse cx="72" cy="76" rx="4.5" ry="5" fill="#2D2540" />
          <ellipse cx="48" cy="86" rx="6" ry="4" fill="#FFB8A0" opacity="0.55" />
          <ellipse cx="80" cy="86" rx="6" ry="4" fill="#FFB8A0" opacity="0.55" />
          <path d="M52 92 Q64 101 76 92" stroke="#2D2540" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        {/* High five sparkles */}
        <text x="80" y="30" fontSize="16">🎉</text>
      </svg>
    );
  }

  // ── STAR pose (Premium) ────────────────────────────
  if (pose === 'star') {
    return (
      <svg viewBox="0 0 160 160" width={width} height={height} className={`bobi-float ${className}`}>
        <Body />
        {/* Both arms raised in celebration */}
        <ellipse cx="40" cy="75" rx="8" ry="11" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(-50 40 75)" />
        <ellipse cx="120" cy="75" rx="8" ry="11" fill="#FFF1D0" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" transform="rotate(50 120 75)" />
        {/* Student card with star */}
        <rect x="62" y="108" width="36" height="24" rx="6" fill={accentColor} />
        <rect x="60" y="106" width="40" height="6" rx="3" fill="#FFE878" />
        <text x="80" y="124" textAnchor="middle" fill="white" fontSize="12">⭐</text>
        {/* Sparkles floating */}
        <text x="22" y="50" fontSize="16">✨</text>
        <text x="120" y="42" fontSize="14">🌟</text>
        <text x="105" y="62" fontSize="10">✨</text>
        <text x="35" y="68" fontSize="9">⭐</text>
      </svg>
    );
  }

  // Fallback
  return (
    <svg viewBox="0 0 160 160" width={width} height={height} className={`bobi-bounce ${className}`}>
      <Body />
    </svg>
  );
};

export default BobiMascot;
