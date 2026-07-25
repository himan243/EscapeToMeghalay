import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const serif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://escapetomeghalaya.com'),
  title: 'Escape to Meghalaya | Curated Luxury & Offbeat Journeys in Northeast India',
  description:
    'Experience hidden waterfalls, living root bridges, crystal rivers in Dawki, and mist-laden canyons of Meghalaya. Handcrafted private and group expeditions.',
  keywords:
    'Escape to Meghalaya, Cherrapunji tours, Dawki river boat tour, Living root bridge trek, Shillong luxury travel, Northeast India travel packages',
  openGraph: {
    title: 'Escape to Meghalaya | Curated Journeys',
    description: 'An emotional invitation into one of the most beautiful places on Earth.',
    url: 'https://escapetomeghalaya.com',
    siteName: 'Escape to Meghalaya',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630, alt: 'Escape to Meghalaya Landscape' }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning prevents noisy browser-extension attribute mismatches
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${serif.variable} font-sans antialiased`}
        style={{ fontFamily: 'var(--font-sans)' }}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
