'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { MeghalayaShowcase } from '@/components/landing/MeghalayaShowcase';
import { Experiences } from '@/components/landing/Experiences';
import { ValueProps } from '@/components/landing/ValueProps';
import { Gallery } from '@/components/landing/Gallery';
import { TestimonialWall } from '@/components/landing/TestimonialWall';
import { InquirySection } from '@/components/landing/InquirySection';
import { ContactSection } from '@/components/landing/ContactSection';
import { Footer } from '@/components/landing/Footer';
import { InquiryModal } from '@/components/landing/InquiryModal';
import { useTheme } from '@/context/ThemeContext';
import overallBackdrop from '../../GhfKNAuXAAACkiF.jpg';
import janailarFalls from '../../janailar-falls.avif';
import mawkdok from '../../mawkdok.avif';

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const { theme } = useTheme();

  const handleOpenInquiry = (pkg: string = '') => {
    setSelectedPackage(pkg);
    setIsInquiryOpen(true);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        color: 'var(--text-primary)',
        overflowX: 'hidden',
        position: 'relative',
        isolation: 'isolate',
        background:
          theme === 'dark'
            ? 'radial-gradient(circle at top, rgba(8,145,178,0.18), transparent 30%), radial-gradient(circle at 20% 20%, rgba(16,185,129,0.12), transparent 28%), linear-gradient(180deg, #04120C 0%, #061E14 42%, #020C08 100%)'
            : 'radial-gradient(circle at top, rgba(8,145,178,0.12), transparent 28%), radial-gradient(circle at 80% 15%, rgba(16,185,129,0.10), transparent 26%), linear-gradient(180deg, #F8FAFC 0%, #EEF7F4 48%, #E6F0ED 100%)',
        transition: 'background 0.45s ease, color 0.45s ease',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src={overallBackdrop}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: theme === 'dark' ? 0.38 : 0.28, filter: 'saturate(1.22) contrast(1.1)' }}
          />
        </div>

        <div style={{ position: 'absolute', inset: '-6% -12% 48% -10%' }}>
          <Image
            src={janailarFalls}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: theme === 'dark' ? 0.46 : 0.34, filter: 'saturate(1.24) contrast(1.12)' }}
          />
        </div>
        <div style={{ position: 'absolute', inset: '40% -8% -14% 34%' }}>
          <Image
            src={mawkdok}
            alt=""
            fill
            sizes="(max-width: 768px) 120vw, 66vw"
            style={{ objectFit: 'cover', opacity: theme === 'dark' ? 0.36 : 0.28, filter: 'saturate(1.24) contrast(1.12)' }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              theme === 'dark'
                ? 'linear-gradient(125deg, rgba(6,30,20,0.12) 0%, rgba(8,145,178,0.09) 46%, rgba(4,18,12,0.20) 100%)'
                : 'linear-gradient(125deg, rgba(248,250,252,0.12) 0%, rgba(34,211,238,0.08) 46%, rgba(226,240,234,0.14) 100%)',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header onOpenInquiry={() => handleOpenInquiry()} />
        <Hero onOpenInquiry={() => handleOpenInquiry()} />
        <MeghalayaShowcase onSelectDestination={(name) => handleOpenInquiry(`Journey to ${name}`)} />
        <Experiences onSelectPackage={(title) => handleOpenInquiry(title)} />
        <ValueProps />
        <Gallery />
        <TestimonialWall />
        <InquirySection onOpenInquiry={() => handleOpenInquiry()} />
        <ContactSection />
        <Footer />
        <InquiryModal
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
          initialPackage={selectedPackage}
        />
      </div>
    </main>
  );
}
