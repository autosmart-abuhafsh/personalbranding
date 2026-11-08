import React, { useState } from 'react';
import {
  EDITABLE_CREDENTIALS,
  JOURNEY_MILESTONES,
  Language,
} from '../data/profile';

interface ExperienceProps {
  lang: Language;
}

export const Experience: React.FC<ExperienceProps> = ({ lang }) => {
  const [activeId, setActiveId] = useState<string>(JOURNEY_MILESTONES[0].id);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-perf py-20 lg:py-28 border-b border-white/10 bg-[#0A1020] bg-command-grid"
    >
      <div className="mx-auto max-w-[1280px] px-6 space-y-14">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <p className="font-mono-tech text-xs tracking-wider text-[#D5B47A]">
            06 · {lang === 'id' ? 'PERJALANAN & PENGALAMAN' : 'EXPERIENCE & JOURNEY'}
          </p>
          <h2
            id="experience-heading"
            className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] [text-wrap:balance]"
          >
            My Journey in Digital &amp; Education.
          </h2>
          <p className="text-base text-[#A5ADBD] leading-relaxed">
            {lang === 'id'
              ? 'Jejak perjalanan dalam membangun Autosmart Digital Solutions, mengembangkan sistem digital bisnis, serta berbagi keterampilan teknologi.'
              : 'Key milestones in building Autosmart Digital Solutions, engineering business systems, and teaching practical digital skills.'}
          </p>
        </div>

        {/* Interactive Vertical Timeline + Detail View */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Vertical Timeline Column */}
          <div className="lg:col-span-7 relative space-y-4">
            <div
              aria-hidden="true"
              className="hidden sm:block absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-[#D5B47A] via-[#78263F] to-white/10"
            />

            {JOURNEY_MILESTONES.map((milestone, idx) => {
              const isSelected = milestone.id === activeId;
              return (
                <div key={milestone.id} className="relative sm:pl-14">
                  {/* Timeline Node Marker */}
                  <div
                    aria-hidden="true"
                    className={`hidden sm:flex absolute left-2 top-6 h-6 w-6 items-center justify-center rounded-full border text-[10px] font-mono-tech transition-colors ${
                      isSelected
                        ? 'border-[#D5B47A] bg-[#78263F] text-[#F4F4F5]'
                        : 'border-white/20 bg-[#0A1020] text-[#A5ADBD]'
                    }`}
                  >
                    0{idx + 1}
                  </div>

                  <article
                    className={`rounded-2xl border p-6 transition-colors ${
                      isSelected
                        ? 'border-[#D5B47A]/50 bg-[#111A2E]'
                        : 'border-white/10 bg-[#111A2E]/50 hover:border-white/25'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech text-[#D5B47A]">
                      <span>0{idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{milestone.phase[lang]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#A5ADBD]">{milestone.organization}</span>
                    </div>

                    <h3 className="mt-2 font-display text-lg font-bold text-[#F4F4F5]">
                      <button
                        type="button"
                        onClick={() => setActiveId(milestone.id)}
                        className="text-left hover:text-[#D5B47A] transition-colors focus-visible:outline-2 focus-visible:outline-[#D5B47A]"
                      >
                        {milestone.title[lang]}
                      </button>
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[#A5ADBD]">
                      {milestone.description[lang]}
                    </p>

                    <ul className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-xs text-[#F4F4F5]/85">
                      {milestone.highlights[lang].map((hl, i) => (
                        <li key={i}>• {hl}</li>
                      ))}
                    </ul>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Right Column: Editable Academic & Credentials Architecture (PRD 5.7) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#111A2E]/70 p-7 space-y-6">
              <div className="space-y-2">
                <p className="font-mono-tech text-xs text-[#D5B47A]">
                  {lang === 'id'
                    ? 'KOMPONEN PENDIDIKAN & KREDENSIAL (DAPAT DIEDIT)'
                    : 'EDITABLE EDUCATION & CREDENTIALS MODULE'}
                </p>
                <h3 className="font-display text-xl font-bold text-[#F4F4F5]">
                  {lang === 'id'
                    ? 'Integritas Data & Transparansi Profil'
                    : 'Profile Data Integrity & Transparency'}
                </h3>
                <p className="text-xs leading-relaxed text-[#A5ADBD]">
                  {lang === 'id'
                    ? 'Sesuai prinsip keaslian identitas profesional, website ini tidak mencantumkan tanggal fiktif, gelar, atau nama institusi yang belum dikonfirmasi.'
                    : 'In accordance with professional authenticity standards, this portfolio never invents unverified dates, academic degrees, or institution names.'}
                </p>
              </div>

              <div className="space-y-4">
                {EDITABLE_CREDENTIALS.map((cred) => (
                  <div
                    key={cred.id}
                    className="rounded-xl border border-white/10 bg-[#0A1020] p-5 space-y-2"
                  >
                    <p className="font-display text-sm font-semibold text-[#F4F4F5]">
                      {cred.label[lang]}
                    </p>
                    <p className="text-xs leading-relaxed text-[#A5ADBD]">
                      {cred.notes[lang]}
                    </p>
                    <p className="font-mono-tech text-[11px] text-[#D5B47A] pt-1">
                      Konfigurasi: {cred.institutionPlaceholder}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
