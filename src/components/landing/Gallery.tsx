'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import galleryData from '@/data/gallery.json';
import { Maximize2, MapPin, Camera, X } from 'lucide-react';

const categories = ['All', 'Waterfalls', 'Rivers', 'Root Bridges', 'Canyons', 'Mist & Fog'];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState<typeof galleryData[0] | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryData
    : galleryData.filter(g => g.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="gallery" style={{ padding: '100px 0', background: '#061E14', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Header row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#10B981', marginBottom: '12px', display: 'block' }}>
              CINEMATIC VISUALS
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 400, color: '#F1F5F9', lineHeight: 1.12 }}>
              Visions of Meghalaya
            </h2>
          </div>
          <a
            href="https://www.instagram.com/escape_to_meghalaya"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '9999px', border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(10,39,27,0.5)', backdropFilter: 'blur(12px)', color: '#6EE7B7', fontSize: '12px', fontFamily: 'var(--font-sans)', textDecoration: 'none', transition: 'all 0.2s' }}
          >
            <Camera size={14} style={{ color: '#10B981' }} />
            <span>@escape_to_meghalaya</span>
          </a>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '36px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ padding: '8px 18px', borderRadius: '9999px', whiteSpace: 'nowrap', fontSize: '12px', fontFamily: 'var(--font-sans)', fontWeight: 500, cursor: 'pointer', border: activeCategory === cat ? '1px solid rgba(16,185,129,0.6)' : '1px solid rgba(71,85,105,0.4)', background: activeCategory === cat ? 'rgba(5,150,105,0.75)' : 'rgba(15,23,42,0.4)', backdropFilter: 'blur(12px)', color: activeCategory === cat ? '#FFF' : 'rgba(203,213,225,0.8)', transition: 'all 0.25s' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setLightboxImg(item)}
              style={{ position: 'relative', height: '320px', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(20,79,55,0.4)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
              whileHover={{ scale: 1.02 }}
            >
              <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,12,8,0.9) 0%, transparent 60%)', opacity: 0.85, transition: 'opacity 0.3s' }} />

              {/* Zoom icon */}
              <div style={{ position: 'absolute', top: 14, right: 14, padding: '8px', borderRadius: '10px', background: 'rgba(6,30,20,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', display: 'flex' }}>
                <Maximize2 size={15} />
              </div>

              {/* Info */}
              <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#10B981', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  <MapPin size={11} />
                  <span>{item.location}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: '#F1F5F9', fontWeight: 400 }}>{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'rgba(2,12,8,0.92)', backdropFilter: 'blur(20px)' }}
            onClick={() => setLightboxImg(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              style={{ background: 'rgba(10,39,27,0.95)', border: '1px solid rgba(20,79,55,0.5)', borderRadius: '24px', overflow: 'hidden', maxWidth: '900px', width: '100%', boxShadow: '0 48px 96px rgba(0,0,0,0.7)' }}
            >
              <div style={{ position: 'relative', height: '60vh', width: '100%' }}>
                <Image src={lightboxImg.image} alt={lightboxImg.title} fill style={{ objectFit: 'contain' }} />
                <button onClick={() => setLightboxImg(null)} style={{ position: 'absolute', top: 16, right: 16, padding: '8px', borderRadius: '50%', border: 'none', background: 'rgba(2,12,8,0.8)', color: '#fff', cursor: 'pointer', display: 'flex' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '24px 28px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px', background: 'rgba(6,30,20,0.95)' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#F1F5F9', fontWeight: 400, marginBottom: '6px' }}>{lightboxImg.title}</h3>
                  <p style={{ color: 'rgba(148,163,184,0.8)', fontFamily: 'var(--font-sans)', fontSize: '14px' }}>{lightboxImg.caption}</p>
                </div>
                <span style={{ fontSize: '12px', color: '#10B981', fontFamily: 'var(--font-sans)' }}>{lightboxImg.instagramRef}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
