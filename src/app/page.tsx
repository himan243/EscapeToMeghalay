'use client';

import React, { useState } from 'react';
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
        background:
          theme === 'dark'
            ? 'radial-gradient(circle at top, rgba(8,145,178,0.18), transparent 30%), radial-gradient(circle at 20% 20%, rgba(16,185,129,0.12), transparent 28%), linear-gradient(180deg, #04120C 0%, #061E14 42%, #020C08 100%)'
            : 'radial-gradient(circle at top, rgba(8,145,178,0.12), transparent 28%), radial-gradient(circle at 80% 15%, rgba(16,185,129,0.10), transparent 26%), linear-gradient(180deg, #F8FAFC 0%, #EEF7F4 48%, #E6F0ED 100%)',
        transition: 'background 0.45s ease, color 0.45s ease',
      }}
    >
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
    </main>
  );
}
