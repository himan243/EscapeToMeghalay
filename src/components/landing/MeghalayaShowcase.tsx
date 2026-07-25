'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import destinations from '@/data/destinations.json';
import { Compass, MapPin, Calendar, Mountain, ArrowRight } from 'lucide-react';

const S = {
  section: {
    padding: '100px 0',
    position: 'relative' as const,
    overflow: 'hidden',
    background: 'linear-gradient(180deg, #02100A 0%, #061E14 100%)',
  },
  glow1: {
    position: 'absolute' as const,
    top: '30%', left: '-80px',
    width: '400px', height: '400px',
    background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
    borderRadius: '50%', pointerEvents: 'none' as const,
  },
  glow2: {
    position: 'absolute' as const,
    bottom: '10%', right: '-80px',
    width: '400px', height: '400px',
    background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
    borderRadius: '50%', pointerEvents: 'none' as const,
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative' as const,
    zIndex: 10,
  },
  eyebrow: {
    fontSize: '11px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 700,
    letterSpacing: '0.28em',
    textTransform: 'uppercase' as const,
    color: '#10B981',
    marginBottom: '12px',
    display: 'block',
  },
  heading: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(28px, 5vw, 52px)',
    fontWeight: 400,
    color: '#F1F5F9',
    lineHeight: 1.12,
    marginBottom: '16px',
  },
  subtext: {
    color: 'rgba(148,163,184,0.85)',
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    lineHeight: 1.7,
    maxWidth: '620px',
    margin: '0 auto',
  },
  tab: (active: boolean): React.CSSProperties => ({
    padding: '10px 22px',
    borderRadius: '9999px',
    fontSize: '13px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    border: active ? '1px solid rgba(16,185,129,0.6)' : '1px solid rgba(71,85,105,0.4)',
    background: active
      ? 'linear-gradient(135deg, rgba(5,150,105,0.85), rgba(8,145,178,0.85))'
      : 'rgba(15,23,42,0.45)',
    backdropFilter: 'blur(12px)',
    color: active ? '#FFFFFF' : 'rgba(203,213,225,0.8)',
    transform: active ? 'scale(1.04)' : 'scale(1)',
    boxShadow: active ? '0 6px 20px rgba(5,150,105,0.35)' : 'none',
    transition: 'all 0.3s ease',
  }),
  card: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px',
    background: 'rgba(10,39,27,0.5)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(20,79,55,0.45)',
    borderRadius: '28px',
    padding: '28px',
    boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
  },
  imgWrap: {
    position: 'relative' as const,
    height: '420px',
    borderRadius: '18px',
    overflow: 'hidden',
  },
  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 28px',
    borderRadius: '9999px',
    border: 'none',
    background: 'linear-gradient(135deg, #059669, #0891B2)',
    color: 'white',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 6px 24px rgba(5,150,105,0.4)',
    transition: 'all 0.3s ease',
  },
};

interface MeghalayaShowcaseProps {
  onSelectDestination: (name: string) => void;
}

export function MeghalayaShowcase({ onSelectDestination }: MeghalayaShowcaseProps) {
  const [activeTab, setActiveTab] = useState(0);
  const current = destinations[activeTab];

  return (
    <section id="showcase" style={S.section}>
      <div style={S.glow1} aria-hidden />
      <div style={S.glow2} aria-hidden />

      <div style={S.container}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={S.eyebrow}>EDITORIAL SHOWCASE</span>
          <h2 style={S.heading}>Stories Written in Mist &amp; Stone</h2>
          <p style={S.subtext}>
            Meghalaya is not a destination you merely visit. It is an emotional sanctuary where clouds descend to meet living rainforests.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '44px', justifyContent: 'flex-start' }}>
          {destinations.map((d, i) => (
            <button key={d.id} onClick={() => setActiveTab(i)} style={S.tab(activeTab === i)}>
              {d.name}
            </button>
          ))}
        </div>

        {/* Feature Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            style={{ ...S.card }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'start' }}>
              {/* Image */}
              <div style={S.imgWrap}>
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,12,8,0.85) 0%, transparent 55%)' }} />

                {/* Region badge */}
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px', borderRadius: '9999px',
                  background: 'rgba(6,30,20,0.75)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  color: '#6EE7B7', fontSize: '11px', fontFamily: 'var(--font-sans)',
                }}>
                  <MapPin size={12} style={{ color: '#10B981' }} />
                  <span>{current.region}</span>
                </div>

                {/* Highlight quote */}
                <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.22em', color: '#F59E0B', fontFamily: 'var(--font-sans)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                    SIGNATURE MOMENT
                  </span>
                  <p style={{ color: 'rgba(226,232,240,0.9)', fontFamily: 'var(--font-serif)', fontSize: '16px', fontStyle: 'italic', lineHeight: 1.5 }}>
                    "{current.keyHighlight}"
                  </p>
                </div>
              </div>

              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '10px', letterSpacing: '0.25em', color: '#10B981', fontFamily: 'var(--font-sans)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                    CHAPTER {activeTab + 1} OF {destinations.length}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 4vw, 42px)', color: '#F8FAFC', fontWeight: 400, lineHeight: 1.1, marginBottom: '6px' }}>
                    {current.name}
                  </h3>
                  <p style={{ color: '#34D399', fontFamily: 'var(--font-sans)', fontSize: '14px', fontStyle: 'italic', marginBottom: '20px' }}>
                    {current.tagline}
                  </p>
                  <p style={{ color: 'rgba(148,163,184,0.85)', fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: 1.75 }}>
                    {current.story}
                  </p>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', paddingTop: '20px', borderTop: '1px solid rgba(20,79,55,0.4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(6,30,20,0.7)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', display: 'flex' }}>
                      <Mountain size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'rgba(148,163,184,0.6)', fontFamily: 'var(--font-sans)' }}>Elevation</div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>{current.elevation}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(8,145,178,0.12)', border: '1px solid rgba(6,182,212,0.3)', color: '#06B6D4', display: 'flex' }}>
                      <Calendar size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'rgba(148,163,184,0.6)', fontFamily: 'var(--font-sans)' }}>Best Season</div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>{current.bestTime}</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectDestination(current.name)}
                  style={S.ctaBtn}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
                >
                  <Compass size={16} />
                  <span>Plan Journey to {current.name}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
