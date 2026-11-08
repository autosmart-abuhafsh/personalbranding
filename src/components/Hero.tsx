import React, { useRef, useState } from 'react';
import { ArrowUpRight, Compass, Globe2, Camera } from 'lucide-react';
import {
  CONTACT_CONFIG,
  Language,
  PROFILE_CONFIG,
} from '../data/profile';
import { isConfiguredContactValue } from '../utils/portfolioLogic';
import { DigitalUniverse3D } from './DigitalUniverse3D';
import { MonogramLogo } from './MonogramLogo';

interface HeroProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
  customPhotoUrl: string;
  onUpdatePhotoUrl: (url: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onToggleLang,
  customPhotoUrl,
  onUpdatePhotoUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [btnOffset, setBtnOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activePhoto = customPhotoUrl || PROFILE_CONFIG.photoUrl;

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.14;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.14;
    setBtnOffset({ x, y });
  };

  const handleMagneticLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdatePhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const configuredSocials = [
    {
      label: 'GitHub',
      url: CONTACT_CONFIG.GITHUB_URL,
      valid: isConfiguredContactValue(CONTACT_CONFIG.GITHUB_URL),
    },
    {
      label: 'LinkedIn',
      url: CONTACT_CONFIG.LINKEDIN_URL,
      valid: isConfiguredContactValue(CONTACT_CONFIG.LINKEDIN_URL),
    },
    {
      label: 'Instagram',
      url: CONTACT_CONFIG.INSTAGRAM_URL,
      valid: isConfiguredContactValue(CONTACT_CONFIG.INSTAGRAM_URL),
    },
  ].filter((item) => item.valid);

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-8 pb-20 lg:pt-12 lg:pb-24 bg-command-grid border-b border-white/10"
      style={{
        backgroundImage:
          'radial-gradient(circle at 25% 15%, rgba(120,38,63,0.22) 0%, rgba(17,26,46,0.06) 45%, transparent 75%)',
      }}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Top Utility & Language Row */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-2 text-xs tracking-wider text-[#D5B47A] font-mono-tech">
            <span>{PROFILE_CONFIG.founderBadge}</span>
            <span aria-hidden="true" className="text-white/30">
              ·
            </span>
            <span className="text-[#A5ADBD]">{PROFILE_CONFIG.brandPositioning}</span>
          </div>

          {/* Interactive Language Switcher (Bahasa Indonesia / English) */}
          <div
            role="group"
            aria-label={lang === 'id' ? 'Pilih Bahasa' : 'Select Language'}
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#111A2E] p-1"
          >
            <Globe2 className="ml-2 h-3.5 w-3.5 text-[#D5B47A]" aria-hidden="true" />
            <button
              type="button"
              onClick={() => onToggleLang('id')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                lang === 'id'
                  ? 'bg-[#78263F] text-[#F4F4F5]'
                  : 'text-[#A5ADBD] hover:text-[#F4F4F5]'
              }`}
            >
              ID · Indonesia
            </button>
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                lang === 'en'
                  ? 'bg-[#78263F] text-[#F4F4F5]'
                  : 'text-[#A5ADBD] hover:text-[#F4F4F5]'
              }`}
            >
              EN · English
            </button>
          </div>
        </div>

        {/* Main 2-Column Hero Split */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="flex flex-col justify-between lg:col-span-7 space-y-7">
            <div className="space-y-5">
              <p className="text-sm font-medium text-[#D5B47A] tracking-wide">
                {PROFILE_CONFIG.name} · {PROFILE_CONFIG.brandName}
              </p>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-[#F4F4F5] leading-[1.12] [text-wrap:balance]">
                {lang === 'id'
                  ? PROFILE_CONFIG.hero.primaryHeadline
                  : PROFILE_CONFIG.hero.primaryHeadline}
              </h1>

              <p className="font-display text-base sm:text-lg font-medium text-[#D5B47A]/90 [text-wrap:balance]">
                “{PROFILE_CONFIG.hero.indonesianHeadline}”
              </p>

              <p className="max-w-2xl text-base sm:text-[17px] leading-relaxed text-[#A5ADBD]">
                {PROFILE_CONFIG.hero.subheadline[lang]}
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="space-y-5 pt-2">
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#projects"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  style={{
                    transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#78263F] px-6 py-3.5 text-sm font-semibold text-[#F4F4F5] border border-[#D5B47A]/40 shadow-lg shadow-[#78263F]/25 hover:bg-[#8e2d4b] transition-transform duration-150 whitespace-nowrap shrink-0"
                >
                  <span>{PROFILE_CONFIG.hero.ctaPrimaryWork[lang]}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#D5B47A]" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#D5B47A]/40 bg-[#111A2E] px-6 py-3.5 text-sm font-semibold text-[#F4F4F5] hover:border-[#D5B47A] hover:bg-[#16223b] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{PROFILE_CONFIG.hero.ctaPrimaryCollab[lang]}</span>
                </a>
              </div>

              {/* Secondary Text Links */}
              <div className="flex flex-wrap items-center gap-6 pt-1 text-xs font-medium text-[#A5ADBD]">
                <a
                  href="#experience"
                  className="inline-flex items-center gap-1.5 hover:text-[#D5B47A] transition-colors whitespace-nowrap shrink-0"
                >
                  <Compass className="h-3.5 w-3.5 text-[#D5B47A]" />
                  <span>{PROFILE_CONFIG.hero.ctaSecondaryJourney[lang]}</span>
                </a>
                <span aria-hidden="true" className="text-white/20">
                  ·
                </span>
                <a
                  href="#contact"
                  className="hover:text-[#D5B47A] transition-colors whitespace-nowrap shrink-0"
                >
                  {PROFILE_CONFIG.hero.ctaSecondaryContact[lang]}
                </a>

                {configuredSocials.length > 0 && (
                  <>
                    <span aria-hidden="true" className="text-white/20">
                      ·
                    </span>
                    <div className="flex items-center gap-4">
                      {configuredSocials.map((soc) => (
                        <a
                          key={soc.label}
                          href={soc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#F4F4F5] hover:text-[#D5B47A] transition-colors"
                        >
                          {soc.label}
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Digital Universe */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <DigitalUniverse3D lang={lang} />
          </div>
        </div>

        {/* Full-Width Below-the-Split Identity & Portrait Frame Row */}
        <div className="mt-12 grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-[#111A2E]/60 p-6 lg:grid-cols-12 lg:items-center">
          {/* Authentic Portrait Frame (Or Replaceable Architectural Monogram Portrait Slot) */}
          <div className="lg:col-span-4 flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[#D5B47A]/40 bg-[#0A1020] flex items-center justify-center">
              {activePhoto ? (
                <img
                  src={activePhoto}
                  alt={PROFILE_CONFIG.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <MonogramLogo size="lg" />
              )}
            </div>
            <div className="space-y-1">
              <p className="font-display text-sm font-semibold text-[#F4F4F5]">
                {PROFILE_CONFIG.name}
              </p>
              <p className="text-xs text-[#A5ADBD]">
                Founder — {PROFILE_CONFIG.brandName}
              </p>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="owner-portrait-upload"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#D5B47A] hover:underline whitespace-nowrap shrink-0"
                >
                  <Camera className="h-3 w-3" />
                  <span>
                    {activePhoto
                      ? lang === 'id'
                        ? 'Ganti Foto Profil'
                        : 'Change Profile Photo'
                      : lang === 'id'
                        ? 'Pratinjau Foto Asli Anda'
                        : 'Preview Your Real Portrait'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Core Positioning Statement */}
          <div className="lg:col-span-8 lg:border-l lg:border-white/10 lg:pl-8 space-y-2">
            <p className="font-mono-tech text-[11px] text-[#D5B47A]">
              {lang === 'id' ? 'POSISI PROFESIONAL' : 'PROFESSIONAL POSITIONING'}
            </p>
            <p className="text-sm leading-relaxed text-[#F4F4F5]">
              {PROFILE_CONFIG.positioningStatement[lang]}
            </p>
            <p className="text-xs text-[#A5ADBD]">
              Web Development · Business Applications · Automation · Data &amp; Financial Solutions · AI Integration · Digital Learning
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
