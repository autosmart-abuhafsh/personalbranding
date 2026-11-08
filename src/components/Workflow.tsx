import React, { useState } from 'react';
import { Language, WORKFLOW_STEPS } from '../data/profile';

interface WorkflowProps {
  lang: Language;
}

export const Workflow: React.FC<WorkflowProps> = ({ lang }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const progressPercent = ((activeStepIndex + 1) / WORKFLOW_STEPS.length) * 100;

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="section-perf py-20 lg:py-28 border-b border-white/10 bg-[#0A1020]"
    >
      <div className="mx-auto max-w-[1280px] px-6 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono-tech text-xs tracking-wider text-[#D5B47A]">
              07 · {lang === 'id' ? 'METODOLOGI & ALUR KERJA' : 'MY WORKFLOW — HOW I WORK'}
            </p>
            <h2
              id="workflow-heading"
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] [text-wrap:balance]"
            >
              {lang === 'id'
                ? 'Enam Tahap Terstruktur dari Diskusi Awal hingga Serah Terima'
                : 'Six Structured Stages from Discovery to Final Delivery'}
            </h2>
          </div>

          <div className="font-mono-tech text-xs text-[#D5B47A]">
            STAGE {WORKFLOW_STEPS[activeStepIndex].number} / 06 ·{' '}
            {WORKFLOW_STEPS[activeStepIndex].code}
          </div>
        </div>

        {/* Interactive Progress Bar */}
        <div className="space-y-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#111A2E]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#78263F] to-[#D5B47A] transition-transform duration-300 origin-left"
              style={{ transform: `scaleX(${progressPercent / 100})` }}
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {WORKFLOW_STEPS.map((step, index) => {
              const isCurrent = index === activeStepIndex;
              const isCompleted = index <= activeStepIndex;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStepIndex(index)}
                  className={`rounded-lg px-3 py-2 text-left transition-colors ${
                    isCurrent
                      ? 'bg-[#78263F] text-[#F4F4F5] border border-[#D5B47A]/40'
                      : isCompleted
                        ? 'bg-[#111A2E] text-[#D5B47A] border border-white/10'
                        : 'bg-[#111A2E]/40 text-[#A5ADBD] border border-white/5 hover:text-[#F4F4F5]'
                  }`}
                >
                  <p className="font-mono-tech text-[11px]">{step.number}</p>
                  <p className="font-display text-xs font-semibold truncate">
                    {step.code}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WORKFLOW_STEPS.map((step, index) => {
            const isSelected = index === activeStepIndex;
            return (
              <article
                key={step.number}
                className={`flex flex-col justify-between rounded-2xl border p-6 transition-colors ${
                  isSelected
                    ? 'border-[#D5B47A]/50 bg-[#111A2E]'
                    : 'border-white/10 bg-[#111A2E]/55 hover:border-white/25'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <span className="font-mono-tech text-xs font-semibold text-[#D5B47A]">
                      {step.number} — {step.code}
                    </span>
                    <span className="font-mono-tech text-[11px] text-[#A5ADBD]">
                      STEP 0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#F4F4F5]">
                    <button
                      type="button"
                      onClick={() => setActiveStepIndex(index)}
                      className="text-left hover:text-[#D5B47A] transition-colors focus-visible:outline-2 focus-visible:outline-[#D5B47A]"
                    >
                      {step.title[lang]}
                    </button>
                  </h3>

                  <p className="text-sm leading-relaxed text-[#A5ADBD]">
                    {step.description[lang]}
                  </p>
                </div>

                <ul className="mt-6 pt-4 border-t border-white/10 space-y-1.5 text-xs text-[#F4F4F5]/85">
                  {step.deliverables[lang].map((deliv, i) => (
                    <li key={i}>• {deliv}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
