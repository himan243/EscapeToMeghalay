'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, HeartHandshake, Footprints, Sparkles, Sliders, CalendarCheck, Users } from 'lucide-react';

const values = [
  { icon: MapPin, title: 'Local Khasi Experts', description: 'Born and raised in these valleys, our guides share stories, dialects, and secret vistas passed down through generations.', accent: '#10B981' },
  { icon: Footprints, title: 'Hidden Destinations', description: 'Avoid crowded tourist hotspots. We take you to undisturbed pools, private cascades, and quiet mountain ridges.', accent: '#06B6D4' },
  { icon: Sparkles, title: 'Authentic Experiences', description: 'Immerse in genuine tribal hospitality, organic traditional cuisine, and sacred ancient botanical traditions.', accent: '#22D3EE' },
  { icon: HeartHandshake, title: 'Responsible Tourism', description: 'Over 70% of tour proceeds return directly to local indigenous village hosts, homestays, and forest conservation.', accent: '#10B981' },
  { icon: ShieldCheck, title: 'Uncompromised Safety', description: 'Well-maintained 4x4 vehicles, certified wilderness first-responders, and 24/7 on-call local support team.', accent: '#06B6D4' },
  { icon: Sliders, title: 'Personalized Itineraries', description: 'Every traveler is unique. We craft flexible daily paces matching your physical comfort and curiosity.', accent: '#22D3EE' },
  { icon: CalendarCheck, title: 'Flexible Planning', description: 'Hassle-free rescheduling, transparent pricing, and direct WhatsApp communication with your tour curator.', accent: '#10B981' },
  { icon: Users, title: 'Community Partnerships', description: 'We collaborate closely with village headmen (Dorbar Shnong) to respect local customs and sacred traditions.', accent: '#06B6D4' },
];

export function ValueProps() {
  return (
    <section id="why-us" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #03130C 0%, #020C08 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Central glow */}
      <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#10B981', marginBottom: '12px', display: 'block' }}>
            THE ESCAPE DIFFERENCE
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 400, color: '#F1F5F9', lineHeight: 1.12, marginBottom: '16px' }}>
            Why Travel With Us
          </h2>
          <p style={{ color: 'rgba(148,163,184,0.85)', fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            We bridge luxury, emotional discovery, and deep-rooted respect for Meghalaya's land and people.
          </p>
        </div>

        {/* 8-card grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{
                  background: 'rgba(10,39,27,0.5)',
                  backdropFilter: 'blur(18px)',
                  border: '1px solid rgba(20,79,55,0.4)',
                  borderRadius: '20px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                  cursor: 'default',
                }}
                onHoverStart={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.target as HTMLElement).style.boxShadow = '0 24px 40px rgba(0,0,0,0.35), 0 0 20px rgba(16,185,129,0.08)';
                }}
                onHoverEnd={(e) => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `rgba(${v.accent === '#10B981' ? '16,185,129' : '6,182,212'},0.12)`, border: `1px solid ${v.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.accent, flexShrink: 0 }}>
                  <Icon size={22} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#F1F5F9', fontWeight: 400, marginBottom: '10px', lineHeight: 1.2 }}>{v.title}</h3>
                  <p style={{ color: 'rgba(148,163,184,0.8)', fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.7 }}>{v.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
