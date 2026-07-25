'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import testimonialsData from '@/data/testimonials.json';
import { Star, Quote } from 'lucide-react';

function TestimonialCard({ t }: { t: typeof testimonialsData[0] }) {
  return (
    <div style={{
      background: 'rgba(10,39,27,0.55)',
      backdropFilter: 'blur(18px)',
      border: '1px solid rgba(20,79,55,0.4)',
      borderRadius: '20px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '20px',
      transition: 'border-color 0.3s ease',
    }}>
      {/* Stars & Quote */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '3px' }}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={14} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
          ))}
        </div>
        <Quote size={18} style={{ color: 'rgba(16,185,129,0.3)' }} />
      </div>

      <p style={{ color: 'rgba(203,213,225,0.85)', fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.7, fontStyle: 'italic' }}>
        "{t.review}"
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '14px', borderTop: '1px solid rgba(20,79,55,0.35)' }}>
        <div style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(16,185,129,0.3)', flexShrink: 0 }}>
          <Image src={t.avatar} alt={t.name} fill style={{ objectFit: 'cover' }} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: '#F1F5F9', fontSize: '14px' }}>{t.name}</span>
            <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#fff', fontSize: '9px' }}>✓</span>
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(100,116,139,0.9)', fontFamily: 'var(--font-sans)' }}>{t.tripType}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialWall() {
  const [isPaused, setIsPaused] = useState(false);

  const col1 = testimonialsData.slice(0, 5);
  const col2 = testimonialsData.slice(5, 10);
  const col3 = testimonialsData.slice(10, 15);
  const repeat = (arr: typeof testimonialsData) => [...arr, ...arr, ...arr];

  return (
    <section id="reviews" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #02100A 0%, #03130C 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div aria-hidden style={{ position: 'absolute', top: '25%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#10B981', marginBottom: '12px', display: 'block' }}>
            UNFILTERED MEMORIES
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 400, color: '#F1F5F9', lineHeight: 1.12, marginBottom: '16px' }}>
            Voices of the Cloud Wanderers
          </h2>
          <p style={{ color: 'rgba(148,163,184,0.85)', fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto' }}>
            Real stories from travelers who trusted us with their journey into the heart of Meghalaya.
          </p>
        </div>

        {/* Scrolling Wall */}
        <div
          style={{ position: 'relative', height: '620px', overflow: 'hidden', borderRadius: '28px', border: '1px solid rgba(20,79,55,0.35)', background: 'rgba(6,30,20,0.3)' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top mask */}
          <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to bottom, #03130C, transparent)', zIndex: 20, pointerEvents: 'none' }} />
          {/* Bottom mask */}
          <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, #03130C, transparent)', zIndex: 20, pointerEvents: 'none' }} />

          {isPaused && (
            <div style={{ position: 'absolute', top: 16, right: 20, zIndex: 30, display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(6,30,20,0.9)', border: '1px solid rgba(16,185,129,0.3)', color: '#34D399', fontSize: '11px', fontFamily: 'var(--font-sans)' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981' }} />
              <span>Hover Paused</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', height: '100%', padding: '20px' }}>
            {/* Column 1 – scrolls up */}
            <div style={{ overflow: 'hidden' }}>
              <div style={{ animation: `marqueeUp 30s linear infinite`, animationPlayState: isPaused ? 'paused' : 'running' }}>
                {repeat(col1).map((t, i) => <TestimonialCard key={`c1-${i}`} t={t} />)}
              </div>
            </div>

            {/* Column 2 – scrolls down */}
            <div style={{ overflow: 'hidden' }}>
              <div style={{ animation: `marqueeDown 35s linear infinite`, animationPlayState: isPaused ? 'paused' : 'running' }}>
                {repeat(col2).map((t, i) => <TestimonialCard key={`c2-${i}`} t={t} />)}
              </div>
            </div>

            {/* Column 3 – scrolls up slower */}
            <div style={{ overflow: 'hidden' }}>
              <div style={{ animation: `marqueeUp 40s linear infinite`, animationPlayState: isPaused ? 'paused' : 'running' }}>
                {repeat(col3).map((t, i) => <TestimonialCard key={`c3-${i}`} t={t} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
