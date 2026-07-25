'use client';

import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'icon';
  className?: string;
}

export function Logo({ variant = 'horizontal', className = '' }: LogoProps) {
  if (variant === 'icon') {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
        className={className} style={{ width: 40, height: 40 }}>
        <defs>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect x="5" y="5" width="90" height="90" rx="28" fill="url(#lg1)" fillOpacity="0.12"
          stroke="url(#lg1)" strokeWidth="2.5" />
        <path d="M20 70 L42 35 L58 55 L70 38 L80 70 Z" fill="none"
          stroke="url(#lg1)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 66 C40 60, 50 74, 75 64" fill="none"
          stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" />
        <circle cx="68" cy="28" r="5" fill="#F59E0B" />
      </svg>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', userSelect: 'none' }}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ width: 36, height: 36, flexShrink: 0 }}>
        <defs>
          <linearGradient id="hlg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect x="5" y="5" width="90" height="90" rx="24" fill="url(#hlg)" fillOpacity="0.12"
          stroke="url(#hlg)" strokeWidth="2.5" />
        <path d="M22 68 L42 34 L56 54 L70 36 L78 68 Z" fill="none"
          stroke="url(#hlg)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 64 C40 58, 50 72, 74 62" fill="none"
          stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" />
        <circle cx="68" cy="27" r="4.5" fill="#F59E0B" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{
          fontFamily: 'var(--font-serif)',
          letterSpacing: '0.05em',
          fontSize: '18px',
          fontWeight: 700,
          lineHeight: 1.1,
          color: '#F8FAFC',
        }}>
          ESCAPE{' '}
          <span style={{ color: '#10B981', fontStyle: 'italic', fontWeight: 400 }}>to</span>{' '}
          MEGHALAYA
        </span>
        <span style={{
          fontSize: '9px',
          letterSpacing: '0.28em',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          textTransform: 'uppercase',
          color: 'rgba(148,163,184,0.7)',
          marginTop: '2px',
        }}>
          CURATED NORTHEAST JOURNEYS
        </span>
      </div>
    </div>
  );
}
