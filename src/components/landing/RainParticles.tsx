'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Particle {
  id: number;
  left: string;
  duration: string;
  delay: string;
  opacity: number;
  height: number;
}

export function RainParticles() {
  const { isRainActive } = useTheme();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${1.2 + Math.random() * 1.8}s`,
      delay: `${Math.random() * 4}s`,
      opacity: 0.12 + Math.random() * 0.25,
      height: 25 + Math.random() * 45,
    }));
    setParticles(generated);
  }, []);

  if (!isRainActive) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10" aria-hidden>
      {/* Drifting mist layer */}
      <div
        className="absolute -top-10 left-0 right-0 h-80 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.15) 0%, transparent 70%)',
          animation: 'fogMove 25s ease-in-out infinite alternate',
        }}
      />

      {/* Rain streaks */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: '-60px',
            width: '1px',
            height: `${p.height}px`,
            opacity: p.opacity,
            background: 'linear-gradient(to bottom, transparent, rgba(148,230,200,0.5), transparent)',
            borderRadius: '1px',
            animation: `rainDrop ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
