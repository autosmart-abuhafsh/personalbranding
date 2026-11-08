import React from 'react';
import { Language, PROFILE_CONFIG } from '../data/profile';
import { MonogramLogo } from './MonogramLogo';

interface AboutProps {
  lang: Language;
  customPhotoUrl: string;
}

export const About: React.FC<AboutProps> = ({ lang, customPhotoUrl }) => {
  const activePhoto = customPhotoUrl || PROFILE_CONFIG.photoUrl;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-perf py-20 lg:py-28 border-b border-white/10 bg-[#0A1020]"
    >
      <div className="mx-auto max-w-[1280px] px-6 space-y-14">
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-3">
          <p className="font-mono-tech text-xs tracking-wider text-[#D5B47A]">
            01 · {lang === 'id' ? 'TENTANG SAYA & FILOSOFI' : 'ABOUT ME & PHILOSOPHY'}
          </p>
          <h2
            id="about-heading"
            className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] [text-wrap:balance]"
          >
            {PROFILE_CONFIG.about.title}
          </h2>
          <p className="text-base text-[#A5ADBD] leading-relaxed">
            {PROFILE_CONFIG.about.subtitle[lang]}
          </p>
        </div>

        {/* Main Editorial Split */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Narrative & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 rounded-2xl border border-white/10 bg-[#111A2E]/65 p-7 sm:p-9">
            <div className="space-y-5 text-base leading-relaxed text-[#F4F4F5]/90">
              <p>{PROFILE_CONFIG.about.paragraph1[lang]}</p>
              <p className="text-[#A5ADBD]">{PROFILE_CONFIG.about.paragraph2[lang]}</p>
            </div>

            {/* Brand Philosophy Box (All-around hairline border, zero thick left bar) */}
            <div className="rounded-xl border border-[#D5B47A]/25 bg-[#0A1020]/80 p-6 space-y-2">
              <p className="font-mono-tech text-xs text-[#D5B47A]">
                {lang === 'id'
                  ? 'FILOSOFI AUTOSMART DIGITAL SOLUTIONS'
                  : 'AUTOSMART DIGITAL SOLUTIONS PHILOSOPHY'}
              </p>
              <p className="font-display text-base font-medium text-[#F4F4F5] leading-relaxed">
                “{PROFILE_CONFIG.brandPhilosophy[lang]}”
              </p>
            </div>

            {/* Three Editorial Pillars */}
            <div className="grid grid-cols-1 gap-6 pt-2 sm:grid-cols-3 border-t border-white/10">
              {PROFILE_CONFIG.about.pillars.map((pillar, idx) => (
                <div key={idx} className="space-y-1.5">
                  <p className="font-display text-sm font-semibold text-[#F4F4F5]">
                    {pillar.title[lang]}
                  </p>
                  <p className="text-xs leading-relaxed text-[#A5ADBD]">
                    {pillar.body[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Personal Identity & Autosmart Founder Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111A2E]/65 p-7 sm:p-9 space-y-8">
            {/* Portrait / Monogram Architectural Crest */}
            <div className="flex items-center gap-5 border-b border-white/10 pb-6">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[#D5B47A]/35 bg-[#0A1020] flex items-center justify-center">
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
                <p className="font-mono-tech text-[11px] text-[#D5B47A]">
                  IDENTITAS PEMILIK
                </p>
                <h3 className="font-display text-xl font-bold text-[#F4F4F5]">
                  {PROFILE_CONFIG.name}
                </h3>
                <p className="text-xs text-[#A5ADBD]">
                  {PROFILE_CONFIG.brandName} · {PROFILE_CONFIG.brandPositioning}
                </p>
              </div>
            </div>

            {/* Professional Roles List (Clean unboxed typography) */}
            <div className="space-y-3">
              <p className="font-mono-tech text-xs text-[#D5B47A]">
                {lang === 'id' ? 'PERAN & FOKUS PROFESIONAL' : 'PROFESSIONAL ROLES & FOCUS'}
              </p>
              <ul className="divide-y divide-white/10 text-sm text-[#F4F4F5]">
                {PROFILE_CONFIG.roles.map((role, index) => (
                  <li
                    key={index}
                    className="py-2.5 flex items-center justify-between gap-4"
                  >
                    <span>{role[lang]}</span>
                    <span className="font-mono-tech text-xs text-[#A5ADBD]">
                      0{index + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Founder Footnote */}
            <div className="rounded-xl border border-white/10 bg-[#0A1020] p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#F4F4F5]">
                  {PROFILE_CONFIG.brandName}
                </p>
                <p className="text-xs text-[#A5ADBD]">
                  {PROFILE_CONFIG.location[lang]}
                </p>
              </div>
              <a
                href="#services"
                className="text-xs font-semibold text-[#D5B47A] hover:underline whitespace-nowrap shrink-0"
              >
                {lang === 'id' ? 'Lihat Layanan →' : 'View Services →'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
