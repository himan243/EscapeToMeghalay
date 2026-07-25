'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import packagesData from '@/data/packages.json';
import { Clock, Users, Flame, Calendar, Sparkles, ArrowRight, CheckCircle2, X } from 'lucide-react';

const sectionStyle: React.CSSProperties = {
  padding: '100px 0',
  position: 'relative',
  overflow: 'hidden',
  background: '#061E14',
};

const card: React.CSSProperties = {
  background: 'rgba(10,39,27,0.5)',
  backdropFilter: 'blur(18px)',
  border: '1px solid rgba(20,79,55,0.4)',
  borderRadius: '24px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
};

interface ExperiencesProps {
  onSelectPackage: (title: string) => void;
}

export function Experiences({ onSelectPackage }: ExperiencesProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPkg, setSelectedPkg] = useState<typeof packagesData[0] | null>(null);

  const categories = ['All', 'Private Tours', 'Group Tours', 'Community-Based Tourism', 'Weekend Escapes', 'Offbeat Experiences'];

  const filtered = activeCategory === 'All'
    ? packagesData
    : packagesData.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="experiences" style={sectionStyle}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#10B981', marginBottom: '12px', display: 'block' }}>
            CURATED ITINERARIES
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 400, color: '#F1F5F9', lineHeight: 1.12, marginBottom: '16px' }}>
            Handcrafted Experiences
          </h2>
          <p style={{ color: 'rgba(148,163,184,0.85)', fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto' }}>
            Each expedition is thoughtfully tailored to preserve authentic Khasi culture, avoid crowded tourist traps, and deliver effortless comfort.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '48px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '9px 20px', borderRadius: '9999px', whiteSpace: 'nowrap',
                fontSize: '13px', fontFamily: 'var(--font-sans)', fontWeight: 500, cursor: 'pointer',
                border: activeCategory === cat ? '1px solid rgba(16,185,129,0.6)' : '1px solid rgba(71,85,105,0.4)',
                background: activeCategory === cat ? 'linear-gradient(135deg, rgba(5,150,105,0.85), rgba(8,145,178,0.85))' : 'rgba(15,23,42,0.4)',
                backdropFilter: 'blur(12px)',
                color: activeCategory === cat ? '#FFF' : 'rgba(203,213,225,0.8)',
                boxShadow: activeCategory === cat ? '0 6px 20px rgba(5,150,105,0.3)' : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
          {filtered.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              style={card}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 32px 48px rgba(0,0,0,0.4), 0 0 28px rgba(16,185,129,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '240px', flexShrink: 0, overflow: 'hidden' }}>
                <Image src={pkg.image} alt={pkg.title} fill style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,12,8,0.92) 0%, transparent 55%)' }} />

                {/* Category badge */}
                <div style={{ position: 'absolute', top: 14, left: 14, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 13px', borderRadius: '9999px', background: 'rgba(6,30,20,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16,185,129,0.3)', color: '#6EE7B7', fontSize: '11px', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                  <Sparkles size={11} style={{ color: '#10B981' }} />
                  <span>{pkg.category}</span>
                </div>

                {pkg.featured && (
                  <div style={{ position: 'absolute', top: 14, right: 14, padding: '4px 10px', borderRadius: '9999px', background: '#D97706', color: '#fff', fontSize: '10px', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.1em' }}>
                    FEATURED
                  </div>
                )}

                <div style={{ position: 'absolute', bottom: 14, left: 14 }}>
                  <span style={{ color: '#34D399', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>{pkg.priceEstimate}</span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: '#F1F5F9', fontWeight: 400, lineHeight: 1.25 }}>
                  {pkg.title}
                </h3>
                <p style={{ color: '#34D399', fontFamily: 'var(--font-sans)', fontSize: '13px', fontStyle: 'italic' }}>{pkg.tagline}</p>
                <p style={{ color: 'rgba(148,163,184,0.8)', fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {pkg.description}
                </p>

                {/* Meta */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingTop: '14px', borderTop: '1px solid rgba(20,79,55,0.35)', marginTop: 'auto' }}>
                  {[
                    { icon: <Clock size={13} style={{ color: '#10B981' }} />, val: pkg.duration },
                    { icon: <Users size={13} style={{ color: '#06B6D4' }} />, val: pkg.groupSize },
                    { icon: <Flame size={13} style={{ color: '#F59E0B' }} />, val: pkg.difficulty },
                    { icon: <Calendar size={13} style={{ color: '#22D3EE' }} />, val: pkg.season },
                  ].map(({ icon, val }, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      {icon}
                      <span style={{ fontSize: '12px', color: 'rgba(148,163,184,0.8)', fontFamily: 'var(--font-sans)' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ padding: '0 22px 22px', display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setSelectedPkg(pkg)}
                  style={{ flex: 1, padding: '10px', borderRadius: '9999px', border: '1px solid rgba(71,85,105,0.5)', background: 'rgba(15,23,42,0.4)', color: 'rgba(203,213,225,0.9)', fontFamily: 'var(--font-sans)', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  View Details
                </button>
                <button
                  onClick={() => onSelectPackage(pkg.title)}
                  style={{ flex: 1, padding: '10px', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #059669, #0891B2)', color: 'white', fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 4px 16px rgba(5,150,105,0.35)', transition: 'all 0.2s' }}
                >
                  Inquire <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Package detail modal */}
      <AnimatePresence>
        {selectedPkg && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'rgba(2,12,8,0.85)', backdropFilter: 'blur(16px)' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ background: 'rgba(10,39,27,0.95)', backdropFilter: 'blur(24px)', border: '1px solid rgba(20,79,55,0.5)', borderRadius: '28px', maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '32px', position: 'relative', boxShadow: '0 48px 96px rgba(0,0,0,0.6)' }}
            >
              <button onClick={() => setSelectedPkg(null)} style={{ position: 'absolute', top: 20, right: 20, padding: '8px', borderRadius: '50%', border: '1px solid rgba(71,85,105,0.5)', background: 'rgba(15,23,42,0.6)', color: '#94A3B8', cursor: 'pointer', display: 'flex' }}>
                <X size={18} />
              </button>

              <div style={{ position: 'relative', height: '260px', borderRadius: '18px', overflow: 'hidden', marginBottom: '24px' }}>
                <Image src={selectedPkg.image} alt={selectedPkg.title} fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,12,8,0.9) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#10B981', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>{selectedPkg.category}</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', color: '#F8FAFC', fontWeight: 400 }}>{selectedPkg.title}</h3>
                </div>
              </div>

              <p style={{ color: 'rgba(148,163,184,0.85)', fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: 1.75, marginBottom: '24px' }}>
                {selectedPkg.description}
              </p>

              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: '#F1F5F9', marginBottom: '16px' }}>Journey Highlights</h4>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedPkg.highlights.map((h, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'rgba(148,163,184,0.85)', fontFamily: 'var(--font-sans)', fontSize: '14px' }}>
                    <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid rgba(20,79,55,0.4)' }}>
                <span style={{ color: '#10B981', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '18px' }}>{selectedPkg.priceEstimate}</span>
                <button
                  onClick={() => { const t = selectedPkg.title; setSelectedPkg(null); onSelectPackage(t); }}
                  style={{ padding: '12px 26px', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #059669, #0891B2)', color: 'white', fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 6px 20px rgba(5,150,105,0.4)' }}
                >
                  Inquire For This Package
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
