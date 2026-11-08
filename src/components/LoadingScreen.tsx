import React, { useEffect, useState } from 'react';
import { MonogramLogo } from './MonogramLogo';

interface LoadingScreenProps {
  onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (params.get('autostart') === '1' || prefersReduced) {
      onFinish();
      return;
    }

    const fadeTimer = window.setTimeout(() => {
      setExiting(true);
    }, 420);

    const doneTimer = window.setTimeout(() => {
      onFinish();
    }, 680);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      role="status"
      aria-label="Memuat Portofolio Abu Hafsh Muhammad"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A1020] transition-opacity duration-300 ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center gap-5 px-6 text-center">
        <div
          className="pointer-events-none absolute -inset-16 rounded-full opacity-35 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(120,38,63,0.45) 0%, rgba(213,180,122,0.18) 50%, transparent 75%)',
          }}
        />
        <MonogramLogo size="lg" className="relative z-10 shadow-2xl" />
        <div className="relative z-10 space-y-1.5">
          <p className="font-display text-sm font-semibold tracking-wider text-[#F4F4F5]">
            ABU HAFSH MUHAMMAD
          </p>
          <p className="text-xs text-[#A5ADBD]">
            Autosmart Digital Solutions · Digital Command Center
          </p>
        </div>
        <div className="relative z-10 h-0.5 w-36 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full origin-left animate-[scaleX_0.45s_ease-out_forwards] bg-gradient-to-r from-[#78263F] via-[#D5B47A] to-[#78263F]" />
        </div>
      </div>
    </div>
  );
};
