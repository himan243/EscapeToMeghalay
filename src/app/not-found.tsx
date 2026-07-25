'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#061E14] text-slate-100 flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Logo */}
      <div className="w-full max-w-7xl flex items-center justify-between py-4">
        <Logo variant="horizontal" />
      </div>

      {/* 404 Content */}
      <div className="max-w-xl text-center space-y-6 z-10 py-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-emerald-500/30 text-emerald-400 text-xs font-sans uppercase tracking-widest">
          <Compass className="w-4 h-4 animate-spin" />
          <span>404 — Lost In The Mist</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl font-normal text-white">
          Wandering Off Path?
        </h1>

        <p className="text-slate-300 font-sans text-base leading-relaxed">
          The trail you are looking for has been shrouded in Cherrapunji mountain fog. Let us guide you back to the main journey.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-sans font-medium text-sm transition-all shadow-xl flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return To Escape Home</span>
          </Link>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-xs text-slate-500 font-sans">
        © {new Date().getFullYear()} Escape to Meghalaya. All rights reserved.
      </div>
    </div>
  );
}
