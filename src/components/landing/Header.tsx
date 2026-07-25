'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/brand/Logo';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, CloudRain, Menu, X, Compass } from 'lucide-react';

interface HeaderProps {
  onOpenInquiry: () => void;
}

export function Header({ onOpenInquiry }: HeaderProps) {
  const { theme, toggleTheme, isRainActive, toggleRain } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.5s ease',
        padding: scrolled ? '12px 0' : '24px 0',
        background: scrolled
          ? 'rgba(6,30,20,0.88)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.1), transparent)',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(16,185,129,0.15)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#hero">
          <Logo variant="horizontal" />
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'none', gap: '32px' }} className="lg-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: 'rgba(226,232,240,0.9)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontFamily: 'var(--font-sans)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#10B981')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(226,232,240,0.9)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Rain toggle */}
          <button
            onClick={toggleRain}
            className="rain-toggle"
            title={isRainActive ? 'Pause Rain' : 'Enable Rain'}
            style={{
              padding: '8px',
              borderRadius: '50%',
              border: `1px solid ${isRainActive ? 'rgba(16,185,129,0.5)' : 'rgba(71,85,105,0.5)'}`,
              background: isRainActive ? 'rgba(16,185,129,0.15)' : 'rgba(15,23,42,0.4)',
              color: isRainActive ? '#34D399' : '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <CloudRain size={16} />
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            title={theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
            style={{
              padding: '8px',
              borderRadius: '50%',
              border: '1px solid rgba(71,85,105,0.5)',
              background: 'rgba(15,23,42,0.4)',
              color: theme === 'dark' ? '#F59E0B' : '#34D399',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenInquiry}
            className="primary-cta"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: '9999px',
              border: 'none',
              background: 'linear-gradient(135deg, rgba(5,150,105,0.92), rgba(8,145,178,0.88))',
              color: 'rgba(255,255,255,0.96)',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(5,150,105,0.22)',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 14px 34px rgba(5,150,105,0.28)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 30px rgba(5,150,105,0.22)';
            }}
          >
            <Compass size={15} />
            <span className="cta-label">Plan My Trip</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              padding: '8px',
              borderRadius: '12px',
              border: '1px solid rgba(16,185,129,0.3)',
              background: 'rgba(6,30,20,0.5)',
              color: '#6EE7B7',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            className="mobile-menu-btn"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(6,30,20,0.72)',
              backdropFilter: 'blur(26px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(26px) saturate(1.2)',
              borderBottom: '1px solid rgba(255,255,255,0.10)',
              padding: '20px 24px 28px',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#CBD5E1',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <button
              onClick={() => { setMobileOpen(false); onOpenInquiry(); }}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                border: 'none',
                background: 'linear-gradient(135deg, rgba(5,150,105,0.92), rgba(8,145,178,0.88))',
                color: 'rgba(255,255,255,0.96)',
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                boxShadow: '0 10px 28px rgba(5,150,105,0.24)',
              }}
            >
              Plan My Trip
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .lg-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 640px) {
          .rain-toggle, .theme-toggle { display: none; }
          .primary-cta {
            padding: 10px 14px !important;
            gap: 0 !important;
          }
          .primary-cta .cta-label {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
