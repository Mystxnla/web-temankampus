import React from 'react';

/**
 * KucingMascot — Maskot kucing flat-vector TemanKampus
 * pose: 'happy' | 'stressed' | 'mark'
 * size: number px (default 120)
 */
const KucingMascot = ({ pose = 'happy', size = 120, className = '' }) => {
  if (pose === 'mark') {
    return (
      <span
        style={{ width: size, height: size }}
        className={`inline-flex items-center justify-center rounded-lg bg-calm-surface border border-calm-border overflow-hidden shrink-0 ${className}`}
      >
        <img
          src="/mascot-mark.png"
          alt="Logo maskot TemanKampus"
          width={size}
          height={size}
          className="w-full h-full object-contain p-0.5 select-none"
          draggable={false}
        />
      </span>
    );
  }

  return (
    <img
      src="/mascot-cat.png"
      alt="Maskot kucing TemanKampus"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`object-contain select-none ${className}`}
      draggable={false}
    />
  );
};

export default KucingMascot;
