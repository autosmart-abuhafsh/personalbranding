import React, { useState } from 'react';
import { Language } from '../data/profile';
import {
  TECH_EXPLORATION_NOTE,
  TECH_STACK_GROUPS,
  TechItem,
} from '../data/technologies';

interface TechStackProps {
  lang: Language;
}

export const TechStack: React.FC<TechStackProps> = ({ lang }) => {
  const allItems = TECH_STACK_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      groupTitle: group.title[lang],
      groupCode: group.code,
    })),
  );

  const [selectedTech, setSelectedTech] = useState<
    (TechItem & { groupTitle: string; groupCode: string })
  >(allItems[0]);

  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="section-perf py-20 lg:py-28 border-b border-white/10 bg-[#0A1020] bg-command-grid"
    >
      <div className="mx-auto max-w-[1280px] px-6 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono-tech text-xs tracking-wider text-[#D5B47A]">
              04 · {lang === 'id' ? 'EKOSISTEM TEKNOLOGI' : 'TECHNOLOGY STACK'}
            </p>
            <h2
              id="tech-stack-heading"
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] [text-wrap:balance]"
            >
              {lang === 'id'
                ? 'Perangkat & Platform untuk Membangun Solusi Fungsional'
                : 'Core Platforms & Tools for Building Functional Solutions'}
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#A5ADBD] leading-relaxed">
            {lang === 'id'
              ? 'Pilih salah satu node teknologi pada konstelasi atau kartu di bawah untuk melihat peran spesifiknya dalam pengembangan proyek.'
              : 'Select any technology node in the constellation or cards below to inspect its exact role in project delivery.'}
          </p>
        </div>

        {/* Interactive Constellation + 4 Category Cards Split */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Interactive Technology Orbit Diagram */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111A2E]/75 p-6 sm:p-8">
            <div className="space-y-1">
              <p className="font-mono-tech text-xs text-[#D5B47A]">
                INTERACTIVE ORBIT INSPECTOR
              </p>
              <p className="text-xs text-[#A5ADBD]">
                {lang === 'id'
                  ? 'Klik node monogram untuk melihat detail pemanfaatan'
                  : 'Click a monogram node to inspect practical application'}
              </p>
            </div>

            {/* SVG Orbit Map */}
            <div className="relative my-6 flex items-center justify-center">
              <svg
                viewBox="0 0 360 360"
                className="w-full max-w-[320px] h-auto select-none"
                role="img"
                aria-label="Autosmart Technology Stack Orbit Map"
              >
                {/* Concentric Orbit Rings */}
                <circle
                  cx="180"
                  cy="180"
                  r="62"
                  fill="none"
                  stroke="#D5B47A"
                  strokeOpacity="0.2"
                  strokeDasharray="3 3"
                />
                <circle
                  cx="180"
                  cy="180"
                  r="108"
                  fill="none"
                  stroke="#78263F"
                  strokeOpacity="0.35"
                />
                <circle
                  cx="180"
                  cy="180"
                  r="150"
                  fill="none"
                  stroke="#D5B47A"
                  strokeOpacity="0.22"
                />

                {/* Center AH Core */}
                <circle
                  cx="180"
                  cy="180"
                  r="30"
                  fill="#0A1020"
                  stroke="#D5B47A"
                  strokeWidth="1.5"
                />
                <text
                  x="180"
                  y="185"
                  textAnchor="middle"
                  fill="#F4F4F5"
                  fontSize="14"
                  fontWeight="700"
                  fontFamily="Sora, sans-serif"
                >
                  AH
                </text>

                {/* Orbit Nodes */}
                {allItems.map((item, idx) => {
                  const total = allItems.length;
                  const angle = (idx / total) * Math.PI * 2 - Math.PI / 2;
                  const ringRadius = idx % 2 === 0 ? 108 : 148;
                  const cx = 180 + Math.cos(angle) * ringRadius;
                  const cy = 180 + Math.sin(angle) * ringRadius;
                  const isSelected = selectedTech.id === item.id;

                  return (
                    <g
                      key={item.id}
                      onClick={() => setSelectedTech(item)}
                      className="cursor-pointer"
                    >
                      <line
                        x1="180"
                        y1="180"
                        x2={cx}
                        y2={cy}
                        stroke={isSelected ? '#D5B47A' : '#ffffff'}
                        strokeOpacity={isSelected ? '0.45' : '0.06'}
                        strokeWidth={isSelected ? '1.5' : '1'}
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 19 : 15}
                        fill={isSelected ? '#78263F' : '#0A1020'}
                        stroke={isSelected ? '#D5B47A' : 'rgba(255,255,255,0.25)'}
                        strokeWidth={isSelected ? '2' : '1'}
                      />
                      <text
                        x={cx}
                        y={cy + 4}
                        textAnchor="middle"
                        fill={isSelected ? '#F4F4F5' : '#A5ADBD'}
                        fontSize="10"
                        fontWeight="600"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {item.monogram}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Active Tech Detail Card */}
            <div className="rounded-xl border border-[#D5B47A]/35 bg-[#0A1020] p-5 space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs font-mono-tech text-[#D5B47A]">
                <span>{selectedTech.groupCode} · {selectedTech.groupTitle}</span>
                <span>[{selectedTech.monogram}]</span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#F4F4F5]">
                {selectedTech.name}
              </h3>
              <p className="text-xs leading-relaxed text-[#A5ADBD]">
                {selectedTech.role[lang]}
              </p>
            </div>
          </div>

          {/* Right Column: 4 Categorized Technology Stack Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {TECH_STACK_GROUPS.map((group) => (
              <div
                key={group.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111A2E]/65 p-6 space-y-5"
              >
                <div className="space-y-2">
                  <span className="font-mono-tech text-xs text-[#D5B47A]">
                    {group.code}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#F4F4F5]">
                    {group.title[lang]}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#A5ADBD]">
                    {group.subtitle[lang]}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10">
                  {group.items.map((item) => {
                    const isSelected = selectedTech.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setSelectedTech({
                            ...item,
                            groupTitle: group.title[lang],
                            groupCode: group.code,
                          })
                        }
                        className={`w-full flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                          isSelected
                            ? 'bg-[#78263F] text-[#F4F4F5] border border-[#D5B47A]/40'
                            : 'bg-[#0A1020]/70 text-[#F4F4F5] border border-white/5 hover:border-[#D5B47A]/30'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate">{item.name}</p>
                        </div>
                        <span className="font-mono-tech text-[11px] text-[#D5B47A] shrink-0">
                          {item.monogram}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transparency Note (PRD 5.5 Compliance) */}
        <div className="rounded-xl border border-white/10 bg-[#111A2E]/45 px-6 py-4 text-xs leading-relaxed text-[#A5ADBD]">
          {TECH_EXPLORATION_NOTE[lang]}
        </div>
      </div>
    </section>
  );
};
