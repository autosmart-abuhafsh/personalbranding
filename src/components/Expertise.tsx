import React from 'react';
import { EXPERTISE_CATEGORIES, ExpertiseCategory, Language } from '../data/profile';

interface ExpertiseProps {
  lang: Language;
}

const ExpertiseArchitecturalGraphic: React.FC<{
  theme: ExpertiseCategory['visualTheme'];
}> = ({ theme }) => {
  if (theme === 'web') {
    return (
      <svg
        viewBox="0 0 120 80"
        fill="none"
        className="h-16 w-24 shrink-0"
        aria-hidden="true"
      >
        <rect
          x="8"
          y="10"
          width="104"
          height="60"
          rx="6"
          fill="#0A1020"
          stroke="#D5B47A"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <line
          x1="8"
          y1="22"
          x2="112"
          y2="22"
          stroke="#D5B47A"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <rect x="16" y="30" width="46" height="28" rx="3" fill="#78263F" fillOpacity="0.45" />
        <rect x="68" y="30" width="36" height="10" rx="2" fill="#D5B47A" fillOpacity="0.3" />
        <rect x="68" y="46" width="28" height="12" rx="2" fill="#F4F4F5" fillOpacity="0.12" />
      </svg>
    );
  }

  if (theme === 'automation') {
    return (
      <svg
        viewBox="0 0 120 80"
        fill="none"
        className="h-16 w-24 shrink-0"
        aria-hidden="true"
      >
        <rect
          x="10"
          y="22"
          width="28"
          height="36"
          rx="5"
          fill="#0A1020"
          stroke="#D5B47A"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <rect
          x="46"
          y="14"
          width="28"
          height="52"
          rx="5"
          fill="#78263F"
          fillOpacity="0.35"
          stroke="#D5B47A"
          strokeWidth="1.5"
        />
        <rect
          x="82"
          y="22"
          width="28"
          height="36"
          rx="5"
          fill="#0A1020"
          stroke="#D5B47A"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <path d="M38 40H46M74 40H82" stroke="#D5B47A" strokeWidth="1.5" />
      </svg>
    );
  }

  if (theme === 'finance') {
    return (
      <svg
        viewBox="0 0 120 80"
        fill="none"
        className="h-16 w-24 shrink-0"
        aria-hidden="true"
      >
        <rect
          x="8"
          y="10"
          width="104"
          height="60"
          rx="6"
          fill="#0A1020"
          stroke="#D5B47A"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <rect x="22" y="42" width="12" height="18" rx="2" fill="#78263F" />
        <rect x="42" y="32" width="12" height="28" rx="2" fill="#78263F" fillOpacity="0.8" />
        <rect x="62" y="24" width="12" height="36" rx="2" fill="#D5B47A" fillOpacity="0.7" />
        <rect x="82" y="18" width="12" height="42" rx="2" fill="#D5B47A" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      className="h-16 w-24 shrink-0"
      aria-hidden="true"
    >
      <polygon
        points="60,10 100,40 60,70 20,40"
        fill="#78263F"
        fillOpacity="0.3"
        stroke="#D5B47A"
        strokeWidth="1.5"
      />
      <circle cx="60" cy="40" r="10" fill="#0A1020" stroke="#D5B47A" strokeWidth="1.5" />
      <line x1="60" y1="10" x2="60" y2="30" stroke="#D5B47A" strokeOpacity="0.5" />
      <line x1="60" y1="50" x2="60" y2="70" stroke="#D5B47A" strokeOpacity="0.5" />
    </svg>
  );
};

export const Expertise: React.FC<ExpertiseProps> = ({ lang }) => {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="section-perf py-20 lg:py-28 border-b border-white/10 bg-[#0A1020] bg-command-grid"
    >
      <div className="mx-auto max-w-[1280px] px-6 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono-tech text-xs tracking-wider text-[#D5B47A]">
              02 · {lang === 'id' ? 'BIDANG KEAHLIAN UTAMA' : 'CORE AREAS OF EXPERTISE'}
            </p>
            <h2
              id="expertise-heading"
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] [text-wrap:balance]"
            >
              {lang === 'id'
                ? 'Empat Pilar Solusi Digital & Teknologi Bisnis'
                : 'Four Pillars of Digital Solutions & Business Technology'}
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#A5ADBD] leading-relaxed">
            {lang === 'id'
              ? 'Kombinasi pengembangan web, aplikasi operasional, pengelolaan data keuangan, dan pemanfaatan AI untuk kebutuhan nyata.'
              : 'Combining web engineering, operational business apps, financial data structures, and practical AI integration.'}
          </p>
        </div>

        {/* 2x2 Architectural Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {EXPERTISE_CATEGORIES.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111A2E]/75 p-7 sm:p-8 hover:border-[#D5B47A]/40 transition-colors"
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="font-mono-tech text-xs text-[#D5B47A]">
                      PILAR {item.code}
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#F4F4F5]">
                      {item.title[lang]}
                    </h3>
                  </div>
                  <ExpertiseArchitecturalGraphic theme={item.visualTheme} />
                </div>

                <p className="text-sm leading-relaxed text-[#A5ADBD]">
                  {item.description[lang]}
                </p>
              </div>

              {/* Clean Unboxed Metadata Scope List (Zero-Pill Discipline) */}
              <div className="mt-7 pt-5 border-t border-white/10 space-y-2">
                <p className="font-mono-tech text-[11px] text-[#D5B47A]">
                  {lang === 'id' ? 'CAKUPAN PENGEMBANGAN' : 'DEVELOPMENT SCOPE'}
                </p>
                <p className="text-xs leading-relaxed text-[#F4F4F5]/90">
                  {item.scopes.map((scope, idx) => (
                    <React.Fragment key={scope}>
                      <span>{scope}</span>
                      {idx < item.scopes.length - 1 && (
                        <span aria-hidden="true" className="mx-2 text-[#D5B47A]">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
