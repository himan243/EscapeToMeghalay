'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { ArrowUp, Camera, Globe, Video, ShieldCheck, FileText, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Footer() {
  const [modal, setModal] = useState<'privacy' | 'terms' | null>(null);

  const navLinks = [
    { label: 'Home', href: '#hero' }, { label: 'Meghalaya Stories', href: '#showcase' },
    { label: 'Curated Packages', href: '#experiences' }, { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Visual Gallery', href: '#gallery' }, { label: 'Traveler Reviews', href: '#reviews' },
  ];
  const highlights = [
    'Dawki River', 'Nohkalikai Falls', 'Living Root Bridges',
    'Laitlum Canyons', 'Krang Suri Pools', 'Mawphlang Sacred Grove',
  ];

  const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '10px' };
  const link: React.CSSProperties = { color: 'rgba(100,116,139,0.85)', fontFamily: 'var(--font-sans)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s ease', cursor: 'pointer', background: 'none', border: 'none', padding: 0, textAlign: 'left' };

  return (
    <footer style={{ background: '#020C08', borderTop: '1px solid rgba(20,79,55,0.3)', paddingTop: '72px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', gridColumn: 'span 2' as 'span 2' }}>
            <Logo variant="horizontal" />
            <p style={{ color: 'rgba(100,116,139,0.8)', fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.75, maxWidth: '320px' }}>
              Curated luxury, eco-community journeys, and offbeat expeditions across Meghalaya and Northeast India. Experiential travel rooted in peace, wonder, and respect.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { href: 'https://www.instagram.com/escape_to_meghalaya', icon: <Camera size={16} />, title: 'Instagram' },
                { href: '#', icon: <Globe size={16} />, title: 'Facebook' },
                { href: '#', icon: <Video size={16} />, title: 'YouTube' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" title={s.title}
                  style={{ padding: '9px', borderRadius: '10px', background: 'rgba(10,39,27,0.6)', border: '1px solid rgba(20,79,55,0.4)', color: 'rgba(100,116,139,0.8)', textDecoration: 'none', display: 'flex', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#10B981'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(16,185,129,0.4)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(100,116,139,0.8)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(20,79,55,0.4)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={col}>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: '#F1F5F9', fontSize: '18px', fontWeight: 400, marginBottom: '6px' }}>Navigation</h4>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} style={link}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#10B981'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(100,116,139,0.85)'}
              >{l.label}</a>
            ))}
          </div>

          {/* Highlights */}
          <div style={col}>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: '#F1F5F9', fontSize: '18px', fontWeight: 400, marginBottom: '6px' }}>Highlights</h4>
            {highlights.map(h => (
              <a key={h} href="#showcase" style={link}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#10B981'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(100,116,139,0.85)'}
              >{h}</a>
            ))}
          </div>

          {/* Office */}
          <div style={col}>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: '#F1F5F9', fontSize: '18px', fontWeight: 400, marginBottom: '6px' }}>Curations Office</h4>
            <p style={{ color: 'rgba(100,116,139,0.8)', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.75 }}>
              Upper Laitumkhrah, Shillong, Meghalaya 793003
            </p>
            <span style={{ color: '#10B981', fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500 }}>hello@escapetomeghalaya.com</span>
            <span style={{ color: 'rgba(71,85,105,0.8)', fontFamily: 'var(--font-sans)', fontSize: '12px' }}>Open 7 days · 8AM – 9PM IST</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: '28px', borderTop: '1px solid rgba(20,79,55,0.3)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', color: 'rgba(71,85,105,0.8)', fontSize: '12px', fontFamily: 'var(--font-sans)' }}>
            <span>© {new Date().getFullYear()} Escape to Meghalaya. All rights reserved.</span>
            <button onClick={() => setModal('privacy')} style={{ ...link, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#10B981'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(71,85,105,0.8)'}
            ><ShieldCheck size={12} />Privacy Policy</button>
            <button onClick={() => setModal('terms')} style={{ ...link, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#10B981'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(71,85,105,0.8)'}
            ><FileText size={12} />Terms</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(71,85,105,0.7)', fontSize: '12px', fontFamily: 'var(--font-sans)' }}>
              Crafted with <Heart size={12} style={{ color: '#10B981', fill: '#10B981' }} /> for Abode of Clouds
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ padding: '9px', borderRadius: '10px', border: '1px solid rgba(20,79,55,0.4)', background: 'rgba(10,39,27,0.6)', color: 'rgba(100,116,139,0.8)', cursor: 'pointer', display: 'flex', transition: 'all 0.2s' }}
              title="Back to Top"
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#059669'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(10,39,27,0.6)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(100,116,139,0.8)'; }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Legal modals */}
      <AnimatePresence>
        {modal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'rgba(2,12,8,0.88)', backdropFilter: 'blur(18px)' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              style={{ background: 'rgba(10,39,27,0.97)', border: '1px solid rgba(20,79,55,0.4)', borderRadius: '24px', padding: '36px', maxWidth: '540px', width: '100%', position: 'relative', color: '#F1F5F9', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}
            >
              <button onClick={() => setModal(null)} style={{ position: 'absolute', top: 18, right: 18, padding: '7px', borderRadius: '50%', border: '1px solid rgba(71,85,105,0.5)', background: 'rgba(15,23,42,0.6)', color: '#94A3B8', cursor: 'pointer' }}>✕</button>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: '#F1F5F9', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                {modal === 'privacy' ? <ShieldCheck size={22} style={{ color: '#10B981' }} /> : <FileText size={22} style={{ color: '#06B6D4' }} />}
                {modal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
              <div style={{ color: 'rgba(148,163,184,0.85)', fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: 1.8, maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {modal === 'privacy' ? (
                  <>
                    <p>At <strong>Escape to Meghalaya</strong>, we respect your personal privacy. When you submit inquiries, your contact details and travel preferences are strictly used to curate your private travel itinerary.</p>
                    <p>We never sell or share guest data with third-party advertising brokers. All payments processed for custom tours use SSL-encrypted banking channels.</p>
                  </>
                ) : (
                  <>
                    <p><strong>1. Curation & Custom Booking:</strong> All tour quotes are valid for 14 calendar days. Itineraries may be modified due to local weather conditions or road closures.</p>
                    <p><strong>2. Community Guidelines:</strong> Guests must follow local Khasi tribal customs, respecting sacred forest rules and village protocols at all times.</p>
                  </>
                )}
              </div>
              <button onClick={() => setModal(null)} style={{ marginTop: '24px', width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(71,85,105,0.4)', background: 'rgba(15,23,42,0.5)', color: '#F1F5F9', fontFamily: 'var(--font-sans)', fontSize: '14px', cursor: 'pointer' }}>
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
