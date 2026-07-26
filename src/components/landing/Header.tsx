'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/brand/Logo';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Cloud, CloudFog, CloudRain, CloudDrizzle, CloudLightning, Menu, X, Compass, Loader2, ChevronDown, CalendarDays } from 'lucide-react';

interface HeaderProps {
  onOpenInquiry: () => void;
}

type WeatherState = {
  temperature: number | null;
  weatherCode: number | null;
  isLoading: boolean;
  error: boolean;
};

type WeatherHistoryDay = {
  date: string;
  label: string;
  max: number | null;
  min: number | null;
  weatherCode: number | null;
};

const SHILLONG = {
  name: 'Shillong, Meghalaya',
  latitude: 25.5788,
  longitude: 91.8933,
};

function getWeatherMeta(code: number | null) {
  if (code === null) return { label: 'Fetching live weather', icon: Cloud, tint: '#94A3B8' };

  if (code === 0) return { label: 'Clear skies', icon: Sun, tint: '#F59E0B' };
  if (code === 1 || code === 2) return { label: 'Partly cloudy', icon: Cloud, tint: '#E2E8F0' };
  if (code === 3) return { label: 'Overcast', icon: Cloud, tint: '#CBD5E1' };
  if (code === 45 || code === 48) return { label: 'Foggy', icon: CloudFog, tint: '#94A3B8' };
  if (code >= 51 && code <= 57) return { label: 'Drizzle', icon: CloudDrizzle, tint: '#22D3EE' };
  if (code >= 61 && code <= 67) return { label: 'Rain', icon: CloudRain, tint: '#06B6D4' };
  if (code >= 71 && code <= 77) return { label: 'Snow', icon: Cloud, tint: '#E2E8F0' };
  if (code >= 80 && code <= 82) return { label: 'Showers', icon: CloudRain, tint: '#22D3EE' };
  if (code >= 95) return { label: 'Stormy', icon: CloudLightning, tint: '#F59E0B' };

  return { label: 'Live weather', icon: Cloud, tint: '#94A3B8' };
}

function formatShortDate(dateString: string) {
  return new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric' }).format(new Date(dateString));
}

function formatDayLabel(dateString: string) {
  return new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(new Date(dateString));
}

export function Header({ onOpenInquiry }: HeaderProps) {
  const { isRainActive, toggleRain } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [weather, setWeather] = useState<WeatherState>({
    temperature: null,
    weatherCode: null,
    isLoading: true,
    error: false,
  });
  const [weatherHistory, setWeatherHistory] = useState<WeatherHistoryDay[]>([]);
  const weatherPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadWeather = async () => {
      try {
        setWeather((prev) => ({ ...prev, isLoading: true, error: false }));

        const today = new Date();
        const start = new Date();
        start.setDate(today.getDate() - 6);
        const startDate = start.toISOString().slice(0, 10);
        const endDate = today.toISOString().slice(0, 10);

        const [currentResponse, archiveResponse] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${SHILLONG.latitude}&longitude=${SHILLONG.longitude}&current=temperature_2m,weather_code&timezone=auto`,
            { signal: controller.signal }
          ),
          fetch(
            `https://archive-api.open-meteo.com/v1/archive?latitude=${SHILLONG.latitude}&longitude=${SHILLONG.longitude}&start_date=${startDate}&end_date=${endDate}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`,
            { signal: controller.signal }
          ),
        ]);

        if (!currentResponse.ok || !archiveResponse.ok) throw new Error('Weather request failed');

        const [currentData, archiveData] = await Promise.all([currentResponse.json(), archiveResponse.json()]);

        const history = Array.isArray(archiveData?.daily?.time)
          ? archiveData.daily.time.map((date: string, index: number) => ({
              date,
              label: formatShortDate(date),
              max: typeof archiveData?.daily?.temperature_2m_max?.[index] === 'number' ? Math.round(archiveData.daily.temperature_2m_max[index]) : null,
              min: typeof archiveData?.daily?.temperature_2m_min?.[index] === 'number' ? Math.round(archiveData.daily.temperature_2m_min[index]) : null,
              weatherCode: typeof archiveData?.daily?.weather_code?.[index] === 'number' ? archiveData.daily.weather_code[index] : null,
            }))
          : [];

        setWeatherHistory(history.slice(-7));
        setWeather({
          temperature: typeof currentData?.current?.temperature_2m === 'number' ? Math.round(currentData.current.temperature_2m) : null,
          weatherCode: typeof currentData?.current?.weather_code === 'number' ? currentData.current.weather_code : null,
          isLoading: false,
          error: false,
        });
      } catch {
        if (!controller.signal.aborted) {
          setWeather({ temperature: null, weatherCode: null, isLoading: false, error: true });
          setWeatherHistory([]);
        }
      }
    };

    loadWeather();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (weatherPanelRef.current && !weatherPanelRef.current.contains(event.target as Node)) {
        setIsWeatherOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsWeatherOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const weatherMeta = getWeatherMeta(weather.weatherCode);
  const WeatherIcon = weatherMeta.icon;
  const weatherTitle = weather.error
    ? `Unable to load live weather for ${SHILLONG.name}`
    : `${SHILLONG.name} - ${weather.temperature ?? '--'}°C - ${weatherMeta.label}`;

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

          {/* Live weather */}
          <div
            ref={weatherPanelRef}
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          >
            <button
              type="button"
              className="weather-pill"
              aria-label={weatherTitle}
              title={weatherTitle}
              onClick={() => {
                setIsWeatherOpen((prev) => !prev);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '9999px',
                border: '1px solid rgba(16,185,129,0.16)',
                background: 'rgba(10,39,27,0.30)',
                backdropFilter: 'blur(12px) saturate(1.08)',
                WebkitBackdropFilter: 'blur(12px) saturate(1.08)',
                color: weatherMeta.tint,
                cursor: 'pointer',
                transition: 'all 0.22s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.16)',
                whiteSpace: 'nowrap',
                minWidth: '54px',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.01em',
              }}
            >
              {weather.isLoading ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <span style={{ color: 'rgba(241,245,249,0.98)' }}>{weather.error ? '--°' : `${weather.temperature ?? '--'}°`}</span>}
            </button>

            <AnimatePresence>
              {isWeatherOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    right: 0,
                    width: '320px',
                    borderRadius: '20px',
                    border: '1px solid rgba(16,185,129,0.12)',
                    background: 'rgba(6,30,20,0.50)',
                    backdropFilter: 'blur(18px) saturate(1.1)',
                    WebkitBackdropFilter: 'blur(18px) saturate(1.1)',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(16,185,129,0.10)' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#10B981' }}>Meghalaya Weather</div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'rgba(241,245,249,0.9)', marginTop: '2px' }}>{SHILLONG.name}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: weatherMeta.tint }}>
                      <WeatherIcon size={16} />
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 700, color: 'rgba(241,245,249,0.96)' }}>
                        {weather.error ? '--°' : weather.isLoading ? '--°' : `${weather.temperature ?? '--'}°C`}
                      </span>
                    </div>
                  </div>

                  <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '10px 12px 14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {weatherHistory.length === 0 && (
                        <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(15,23,42,0.32)', color: 'rgba(203,213,225,0.85)', fontFamily: 'var(--font-sans)', fontSize: '13px' }}>
                          {weather.error ? 'Weather history is unavailable right now.' : 'Loading 7-day weather history...'}
                        </div>
                      )}

                      {weatherHistory.map((day) => {
                        const DayIcon = getWeatherMeta(day.weatherCode).icon;
                        return (
                          <div key={day.date} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '14px', background: 'rgba(15,23,42,0.28)', border: '1px solid rgba(16,185,129,0.08)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '30px', height: '30px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(16,185,129,0.10)', color: '#6EE7B7' }}>
                                <DayIcon size={15} />
                              </div>
                              <div>
                                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'rgba(241,245,249,0.95)' }}>{formatDayLabel(day.date)}</div>
                                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'rgba(203,213,225,0.75)' }}>{day.label}</div>
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'rgba(241,245,249,0.95)' }}>
                                {day.max ?? '--'}° / {day.min ?? '--'}°
                              </div>
                              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'rgba(203,213,225,0.75)' }}>
                                {getWeatherMeta(day.weatherCode).label}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ padding: '10px 16px 14px', borderTop: '1px solid rgba(16,185,129,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'rgba(203,213,225,0.75)' }}>Tap again or click outside to close</span>
                    <ChevronDown size={14} style={{ color: '#10B981' }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
          .rain-toggle { display: none; }
          .weather-pill {
            padding: 8px 10px !important;
            min-width: 54px !important;
            gap: 6px !important;
          }
          .primary-cta {
            padding: 10px 14px !important;
            gap: 0 !important;
          }
          .primary-cta .cta-label {
            display: none;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  );
}
