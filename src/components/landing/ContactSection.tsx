'use client';

import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Camera, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1px solid rgba(30,41,59,0.8)',
    background: 'rgba(2,12,8,0.55)',
    color: '#F1F5F9',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
  };

  const contactLinks = [
    {
      href: 'https://wa.me/919876543210',
      icon: <MessageSquare size={22} />,
      label: 'Instant WhatsApp',
      value: '+91 98765 43210',
      accent: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
      border: 'rgba(16,185,129,0.3)',
    },
    {
      href: 'mailto:hello@escapetomeghalaya.com',
      icon: <Mail size={22} />,
      label: 'Curations Email',
      value: 'hello@escapetomeghalaya.com',
      accent: '#06B6D4',
      bg: 'rgba(6,182,212,0.1)',
      border: 'rgba(6,182,212,0.25)',
    },
    {
      href: 'tel:+919876543210',
      icon: <Phone size={22} />,
      label: 'Direct Helpline',
      value: '+91 98765 43210',
      accent: '#22D3EE',
      bg: 'rgba(34,211,238,0.08)',
      border: 'rgba(34,211,238,0.25)',
    },
    {
      href: 'https://www.instagram.com/escape_to_meghalaya',
      icon: <Camera size={22} />,
      label: 'Instagram',
      value: '@escape_to_meghalaya',
      accent: '#F59E0B',
      bg: 'rgba(245,158,11,0.08)',
      border: 'rgba(245,158,11,0.25)',
    },
  ];

  return (
    <section id="contact" style={{ padding: '100px 0', background: '#04170F', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#10B981', marginBottom: '12px', display: 'block' }}>
            GET IN TOUCH
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 400, color: '#F1F5F9', lineHeight: 1.12, marginBottom: '16px' }}>
            Connect With Our Curation Team
          </h2>
          <p style={{ color: 'rgba(148,163,184,0.85)', fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            Questions about best seasons, fitness levels, corporate retreats, or family travel? We are always here.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px', alignItems: 'start' }}>
          {/* Contact Links Card */}
          <div style={{ background: 'rgba(10,39,27,0.5)', backdropFilter: 'blur(18px)', border: '1px solid rgba(20,79,55,0.4)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#F1F5F9', fontWeight: 400, marginBottom: '8px' }}>Direct Touchpoints</h3>

            {contactLinks.map((cl, i) => (
              <a key={i} href={cl.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 18px', borderRadius: '16px', background: cl.bg, border: `1px solid ${cl.border}`, textDecoration: 'none', transition: 'all 0.25s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(4px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(0)'; }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: `${cl.bg}`, border: `1px solid ${cl.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cl.accent, flexShrink: 0 }}>
                  {cl.icon}
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'rgba(100,116,139,0.8)', display: 'block', fontFamily: 'var(--font-sans)', marginBottom: '2px' }}>{cl.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9', fontFamily: 'var(--font-sans)' }}>{cl.value}</span>
                </div>
              </a>
            ))}

            {/* Office */}
            <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(20,79,55,0.35)' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: '#F1F5F9', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <MapPin size={18} style={{ color: '#10B981' }} /> Our Local Base
              </h4>
              <p style={{ color: 'rgba(148,163,184,0.8)', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.7, marginBottom: '8px' }}>
                <strong style={{ color: '#F1F5F9' }}>Shillong HQ:</strong> Pine Mount Ridge, Upper Laitumkhrah, Shillong, Meghalaya 793003
              </p>
              <p style={{ color: 'rgba(148,163,184,0.8)', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.7, marginBottom: '12px' }}>
                <strong style={{ color: '#F1F5F9' }}>Sohra Base:</strong> Nohkalikai Viewpoint Trailhead, Cherrapunji 793108
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(100,116,139,0.8)', fontSize: '12px', fontFamily: 'var(--font-sans)' }}>
                <Clock size={13} style={{ color: '#10B981' }} />
                <span>8:00 AM – 9:00 PM IST, Monday – Sunday</span>
              </div>
            </div>
          </div>

          {/* Quick Form */}
          <div style={{ background: 'rgba(10,39,27,0.5)', backdropFilter: 'blur(18px)', border: '1px solid rgba(20,79,55,0.4)', borderRadius: '24px', padding: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#F1F5F9', fontWeight: 400, marginBottom: '6px' }}>Send Us a Note</h3>
            <p style={{ color: 'rgba(148,163,184,0.7)', fontFamily: 'var(--font-sans)', fontSize: '14px', marginBottom: '28px' }}>Prefer a direct message? Fill out the quick form below.</p>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 24px', background: 'rgba(16,185,129,0.07)', borderRadius: '18px', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <CheckCircle2 size={48} style={{ color: '#10B981' }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: '#F1F5F9', fontWeight: 400 }}>Message Dispatched!</h4>
                <p style={{ color: 'rgba(148,163,184,0.8)', fontFamily: 'var(--font-sans)', fontSize: '14px' }}>We will reply via email/phone shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: 'rgba(148,163,184,0.8)', fontFamily: 'var(--font-sans)', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Your Name</label>
                    <input required type="text" placeholder="e.g. Rahul Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: 'rgba(148,163,184,0.8)', fontFamily: 'var(--font-sans)', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Email</label>
                    <input required type="email" placeholder="rahul@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'rgba(148,163,184,0.8)', fontFamily: 'var(--font-sans)', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Phone / WhatsApp</label>
                  <input required type="tel" placeholder="+91 98765 00000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'rgba(148,163,184,0.8)', fontFamily: 'var(--font-sans)', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Message</label>
                  <textarea required rows={4} placeholder="Ask about travel dates, vehicle options, or itinerary customization…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, padding: '12px 14px', resize: 'vertical' }} />
                </div>
                <button type="submit" style={{ padding: '14px', borderRadius: '13px', border: 'none', background: 'linear-gradient(135deg, #059669, #0891B2)', color: 'white', fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(5,150,105,0.35)' }}>
                  <Send size={16} />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
