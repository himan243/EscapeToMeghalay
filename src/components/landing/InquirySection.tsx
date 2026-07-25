'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Compass, MessageCircle, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface InquirySectionProps {
  onOpenInquiry: () => void;
}

export function InquirySection({ onOpenInquiry }: InquirySectionProps) {
  return (
    <section style={{ padding: '80px 0', background: '#020C08', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(16,185,129,0.25)', boxShadow: '0 48px 96px rgba(0,0,0,0.5)' }}>
          {/* Background image */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <Image src="/images/krangsuri.jpg" alt="Azure Krang Suri waterfall pool" fill style={{ objectFit: 'cover', opacity: 0.22 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(2,12,8,0.92) 0%, rgba(6,30,20,0.88) 100%)' }} />
          </div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 10, padding: 'clamp(40px, 8vw, 88px)', textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#10B981', marginBottom: '20px', display: 'block' }}>
                BEGIN YOUR EMOTIONAL JOURNEY
              </span>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 5.5vw, 58px)', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.08, marginBottom: '24px' }}>
                Let's Plan Your Meghalaya Adventure
              </h2>

              <p style={{ color: 'rgba(148,163,184,0.88)', fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px, 2vw, 19px)', fontWeight: 300, lineHeight: 1.7, marginBottom: '44px' }}>
                Whether you wish to trek beneath living root canopy, float on crystal waters in Dawki, or wake up to mist drifting past your lodge balcony — our local team is ready to curate your story.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginBottom: '48px' }}>
                <button
                  onClick={onOpenInquiry}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 38px', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #059669 0%, #0891B2 100%)', color: 'white', fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 32px rgba(5,150,105,0.45)', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.02)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)'; }}
                >
                  <Compass size={18} />
                  <span>Plan My Trip</span>
                  <ArrowRight size={18} />
                </button>

                <a
                  href="#contact"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 38px', borderRadius: '9999px', border: '1px solid rgba(148,163,184,0.3)', background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(14px)', color: 'rgba(226,232,240,0.9)', fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.3s ease' }}
                >
                  <MessageCircle size={18} style={{ color: '#10B981' }} />
                  <span>Contact Us</span>
                </a>
              </div>

              {/* Trust strip */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', justifyContent: 'center', paddingTop: '28px', borderTop: '1px solid rgba(20,79,55,0.4)', color: 'rgba(100,116,139,0.9)', fontSize: '13px', fontFamily: 'var(--font-sans)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} style={{ color: '#10B981' }} />
                  <span>Zero Obligation Free Consultation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HeartHandshake size={16} style={{ color: '#06B6D4' }} />
                  <span>70%+ Eco-Community Returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
