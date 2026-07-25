'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, Send, Calendar, Users, Compass, DollarSign, Mail, Phone, User, CheckCircle2 } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px 11px 38px',
  borderRadius: '12px',
  border: '1px solid rgba(30,41,59,0.9)',
  background: 'rgba(2,12,8,0.6)',
  color: '#F1F5F9',
  fontFamily: 'var(--font-sans)',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontFamily: 'var(--font-sans)',
  fontWeight: 500,
  color: 'rgba(148,163,184,0.85)',
  marginBottom: '7px',
  display: 'block',
};

const iconWrapStyle: React.CSSProperties = {
  position: 'absolute',
  left: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'rgba(100,116,139,0.7)',
  pointerEvents: 'none',
  display: 'flex',
};

export function InquiryModal({ isOpen, onClose, initialPackage = '' }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDates: '',
    travelersCount: '2 Travelers (Couple)',
    preferredExperience: initialPackage || 'Private Tours',
    budget: 'Standard Luxury (₹25k – ₹40k/person)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors: ['#10B981', '#06B6D4', '#F59E0B'] });
      } catch {}
    }, 900);
  };

  if (!isOpen) return null;

  const overlay: React.CSSProperties = { position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(2,12,8,0.88)', backdropFilter: 'blur(18px)' };

  const modalBox: React.CSSProperties = { background: 'rgba(6,30,20,0.97)', backdropFilter: 'blur(24px)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '28px', padding: 'clamp(24px, 5vw, 44px)', maxWidth: '680px', width: '100%', maxHeight: '92vh', overflowY: 'auto', position: 'relative', boxShadow: '0 48px 100px rgba(0,0,0,0.7)' };

  return (
    <div style={overlay}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        style={modalBox}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 18, padding: '8px', borderRadius: '50%', border: '1px solid rgba(71,85,105,0.5)', background: 'rgba(15,23,42,0.6)', color: '#94A3B8', cursor: 'pointer', display: 'flex', zIndex: 10 }}>
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '34px', color: '#F8FAFC', fontWeight: 400 }}>Your Journey Begins Here</h3>
            <p style={{ color: 'rgba(148,163,184,0.85)', fontFamily: 'var(--font-sans)', fontSize: '15px', lineHeight: 1.7, maxWidth: '420px' }}>
              Thank you, <span style={{ color: '#10B981', fontWeight: 600 }}>{formData.name}</span>. Our Meghalaya curator received your inquiry for <span style={{ color: '#F1F5F9' }}>{formData.preferredExperience}</span>. We will reach out via WhatsApp/Email within 4 hours.
            </p>
            <button onClick={() => { setSubmitted(false); onClose(); }} style={{ padding: '14px 36px', borderRadius: '9999px', border: 'none', background: 'linear-gradient(135deg, #059669, #0891B2)', color: 'white', fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '28px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: '#10B981', display: 'block', marginBottom: '8px' }}>
                PERSONALIZED CURATION
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 4vw, 38px)', color: '#F1F5F9', fontWeight: 400, marginBottom: '8px' }}>
                Inquire About Your Trip
              </h3>
              <p style={{ color: 'rgba(148,163,184,0.75)', fontFamily: 'var(--font-sans)', fontSize: '14px' }}>
                Share your preferences and our Shillong team will assemble a bespoke itinerary.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '18px' }}>
                {/* Name */}
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <div style={{ position: 'relative' }}>
                    <div style={iconWrapStyle}><User size={15} /></div>
                    <input required type="text" placeholder="Eleanor Vance" value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <div style={{ position: 'relative' }}>
                    <div style={iconWrapStyle}><Mail size={15} /></div>
                    <input required type="email" placeholder="eleanor@example.com" value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                {/* Phone */}
                <div>
                  <label style={labelStyle}>Phone / WhatsApp *</label>
                  <div style={{ position: 'relative' }}>
                    <div style={iconWrapStyle}><Phone size={15} /></div>
                    <input required type="tel" placeholder="+91 98765 43210" value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                {/* Travel Dates */}
                <div>
                  <label style={labelStyle}>Tentative Travel Dates</label>
                  <div style={{ position: 'relative' }}>
                    <div style={iconWrapStyle}><Calendar size={15} /></div>
                    <input type="text" placeholder="e.g. Mid November 2026" value={formData.travelDates}
                      onChange={e => setFormData({ ...formData, travelDates: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                {/* Travelers */}
                <div>
                  <label style={labelStyle}>Travelers</label>
                  <div style={{ position: 'relative' }}>
                    <div style={iconWrapStyle}><Users size={15} /></div>
                    <select value={formData.travelersCount} onChange={e => setFormData({ ...formData, travelersCount: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option>1 Traveler (Solo)</option>
                      <option>2 Travelers (Couple)</option>
                      <option>3–5 Travelers (Family/Friends)</option>
                      <option>6+ Group Expedition</option>
                    </select>
                  </div>
                </div>
                {/* Experience */}
                <div>
                  <label style={labelStyle}>Preferred Experience</label>
                  <div style={{ position: 'relative' }}>
                    <div style={iconWrapStyle}><Compass size={15} /></div>
                    <input type="text" placeholder="e.g. Secrets of Abode of Clouds" value={formData.preferredExperience}
                      onChange={e => setFormData({ ...formData, preferredExperience: e.target.value })} style={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div style={{ marginBottom: '18px' }}>
                <label style={labelStyle}>Budget Preference (Optional)</label>
                <div style={{ position: 'relative' }}>
                  <div style={iconWrapStyle}><DollarSign size={15} /></div>
                  <select value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option>Flexible Luxury / No limit</option>
                    <option>Standard Luxury (₹25k – ₹40k/person)</option>
                    <option>Comfort Homestays (₹15k – ₹25k/person)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Special Notes or Requirements</label>
                <textarea rows={3} placeholder="Tell us about dietary needs, mobility preferences, celebration plans..."
                  value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...inputStyle, padding: '12px 14px', resize: 'vertical', minHeight: '90px' }} />
              </div>

              <button type="submit" disabled={loading} style={{ width: '100%', padding: '15px', borderRadius: '14px', border: 'none', background: loading ? 'rgba(5,150,105,0.5)' : 'linear-gradient(135deg, #059669 0%, #0891B2 100%)', color: 'white', fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 28px rgba(5,150,105,0.35)', transition: 'all 0.3s ease' }}>
                {loading ? <span>Curating your itinerary…</span> : (<><Send size={16} /><span>Send Inquiry Request</span></>)}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
