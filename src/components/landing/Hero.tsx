'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { RainParticles } from './RainParticles';

interface HeroProps {
  onOpenInquiry: () => void;
}

export function Hero({ onOpenInquiry }: HeroProps) {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
        paddingBottom: '64px',
      }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/hero.jpg"
          alt="Mist-shrouded mountains of Meghalaya"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Dark cinematic overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #020C08 0%, rgba(2,12,8,0.7) 40%, rgba(2,12,8,0.35) 100%)',
          }}
        />
        {/* Colour tint layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 30% 50%, rgba(16,185,129,0.08) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* Rain overlay */}
      <RainParticles />

      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-10%',
          width: '120%',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 18px',
            borderRadius: '9999px',
            border: '1px solid rgba(16,185,129,0.35)',
            background: 'rgba(16,185,129,0.1)',
            backdropFilter: 'blur(12px)',
            color: '#6EE7B7',
            fontSize: '11px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          <Sparkles size={14} style={{ color: '#34D399' }} />
          <span>Curated Journeys in the Abode of Clouds</span>
          <span
            style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#34D399',
              animation: 'pulseSubtle 2s ease-in-out infinite',
            }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(42px, 8vw, 88px)',
            fontWeight: 400,
            color: '#FFFFFF',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            marginBottom: '24px',
            textShadow: '0 4px 40px rgba(0,0,0,0.4)',
          }}
        >
          Escape to{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontStyle: 'italic',
            }}
          >
            Meghalaya
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          style={{
            maxWidth: '680px',
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            color: 'rgba(203,213,225,0.92)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            lineHeight: 1.65,
            marginBottom: '44px',
            textShadow: '0 2px 16px rgba(0,0,0,0.3)',
          }}
        >
          Discover hidden waterfalls, living root bridges, pristine rivers, and unforgettable journeys across Northeast India.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}
        >
          <button
            onClick={onOpenInquiry}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              borderRadius: '9999px',
              border: 'none',
              background: 'linear-gradient(135deg, #059669 0%, #0891B2 100%)',
              color: 'white',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.03em',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(5,150,105,0.45), 0 0 0 1px rgba(16,185,129,0.2)',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.02)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 16px 40px rgba(5,150,105,0.55)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(5,150,105,0.45)';
            }}
          >
            <span>Start Planning</span>
            <ArrowRight size={18} />
          </button>

          <a
            href="#experiences"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              borderRadius: '9999px',
              border: '1px solid rgba(148,163,184,0.35)',
              background: 'rgba(15,23,42,0.45)',
              backdropFilter: 'blur(16px)',
              color: 'rgba(226,232,240,0.95)',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 500,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(16,185,129,0.12)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(16,185,129,0.45)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(15,23,42,0.45)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(148,163,184,0.35)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            Explore Experiences
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{
            marginTop: '56px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            color: 'rgba(148,163,184,0.8)',
            fontSize: '13px',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#F59E0B', fontSize: '16px' }}>★★★★★</span>
            <span style={{ fontWeight: 700, color: '#F8FAFC' }}>5.0</span>
            <span style={{ color: 'rgba(148,163,184,0.6)' }}>(450+ Trips)</span>
          </div>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(148,163,184,0.4)', display: 'inline-block' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} style={{ color: '#10B981' }} />
            <span>Shillong &amp; Cherrapunji Locals</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <a
          href="#showcase"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: 'rgba(148,163,184,0.6)',
            textDecoration: 'none',
            fontSize: '10px',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          <span>Scroll</span>
          <ChevronDown size={18} style={{ color: '#10B981', animation: 'float 3s ease-in-out infinite' }} />
        </a>
      </motion.div>
    </section>
  );
}
