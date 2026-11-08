import React, { useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Language } from '../data/profile';
import { ProjectItem } from '../data/projects';
import { ProjectBlueprintPreview } from './ProjectBlueprintPreview';

interface ProjectModalProps {
  project: ProjectItem | null;
  lang: Language;
  onClose: () => void;
  onDiscussSimilarProject: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  lang,
  onClose,
  onDiscussSimilarProject,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#D5B47A]/35 bg-[#0A1020] p-6 sm:p-9 shadow-2xl space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech text-[#D5B47A]">
              <span>{project.code}</span>
              <span aria-hidden="true">·</span>
              <span>{project.categoryLabel[lang]}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#A5ADBD]">{project.statusBadge[lang]}</span>
            </div>
            <h2
              id="modal-project-title"
              className="font-display text-2xl sm:text-3xl font-bold text-[#F4F4F5]"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'id' ? 'Tutup detail proyek' : 'Close project details'}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#111A2E] text-[#F4F4F5] hover:border-[#D5B47A] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 1. Overview & Verification Status Note */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[#D5B47A]/25 bg-[#111A2E]/70 p-4 text-xs text-[#D5B47A]">
            {project.verificationNote[lang]}
          </div>

          <div className="space-y-2">
            <h3 className="font-mono-tech text-xs text-[#D5B47A]">
              01 · {lang === 'id' ? 'RINGKASAN PROYEK (OVERVIEW)' : 'PROJECT OVERVIEW'}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-[#F4F4F5]">
              {project.overview[lang]}
            </p>
          </div>
        </div>

        {/* 2. Project Background, 3. Business Challenge, 4. Solution */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-[#111A2E]/60 p-5 space-y-2">
            <h3 className="font-mono-tech text-xs text-[#D5B47A]">
              02 · {lang === 'id' ? 'LATAR BELAKANG' : 'BACKGROUND'}
            </h3>
            <p className="text-xs leading-relaxed text-[#A5ADBD]">
              {project.background[lang]}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111A2E]/60 p-5 space-y-2">
            <h3 className="font-mono-tech text-xs text-[#D5B47A]">
              03 · {lang === 'id' ? 'TANTANGAN BISNIS' : 'BUSINESS CHALLENGE'}
            </h3>
            <p className="text-xs leading-relaxed text-[#A5ADBD]">
              {project.challenge[lang]}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111A2E]/60 p-5 space-y-2">
            <h3 className="font-mono-tech text-xs text-[#D5B47A]">
              04 · {lang === 'id' ? 'SOLUSI DIGITAL' : 'SOLUTION'}
            </h3>
            <p className="text-xs leading-relaxed text-[#A5ADBD]">
              {project.solution[lang]}
            </p>
          </div>
        </div>

        {/* 5. Features & 6. Technology Stack */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-7 rounded-xl border border-white/10 bg-[#111A2E]/60 p-5 space-y-3">
            <h3 className="font-mono-tech text-xs text-[#D5B47A]">
              05 · {lang === 'id' ? 'FITUR & SOROTAN UTAMA' : 'KEY FEATURES & HIGHLIGHTS'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F4F4F5]/90">
              {project.features[lang].map((feat, i) => (
                <li key={i} className="leading-relaxed">
                  • {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 rounded-xl border border-white/10 bg-[#111A2E]/60 p-5 space-y-3">
            <h3 className="font-mono-tech text-xs text-[#D5B47A]">
              06 · {lang === 'id' ? 'TEKNOLOGI & PLATFORM' : 'TECHNOLOGY USED'}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-[#F4F4F5]">
              {project.technologies.join(' · ')}
            </p>
          </div>
        </div>

        {/* 7. Screenshots / Architectural Blueprints */}
        <div className="space-y-4">
          <h3 className="font-mono-tech text-xs text-[#D5B47A]">
            07 · {lang === 'id' ? 'PRATINJAU VISUAL & ARSITEKTUR' : 'SCREENSHOTS & ARCHITECTURE'}
          </h3>
          <div className="grid grid-cols-1 gap-5">
            {project.screenshots.map((shot, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-[#111A2E]/50 overflow-hidden"
              >
                <ProjectBlueprintPreview
                  title={shot.title[lang]}
                  code={`${project.code} · VIEW 0${idx + 1}`}
                  imageUrl={shot.imageUrl}
                  blueprintType={shot.blueprintType}
                  lang={lang}
                  className="h-64 border-b border-white/10"
                />
                <div className="p-4">
                  <p className="text-xs font-semibold text-[#F4F4F5]">
                    {shot.title[lang]}
                  </p>
                  <p className="text-xs text-[#A5ADBD] mt-0.5">
                    {shot.caption[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Live Project Link & Collaboration CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <div>
            <p className="font-mono-tech text-xs text-[#D5B47A]">
              08 · {lang === 'id' ? 'TAUTAN PROYEK & DISKUSI' : 'LIVE LINK & INQUIRY'}
            </p>
            <p className="text-xs text-[#A5ADBD] mt-0.5">
              {project.liveUrl
                ? project.liveUrl
                : lang === 'id'
                  ? 'Tautan publik tidak dipalsukan — silakan diskusikan studi kasus ini secara langsung.'
                  : 'No fake URLs — feel free to request a live walkthrough or discuss a similar project.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D5B47A]/40 bg-[#111A2E] px-4 py-2.5 text-xs font-semibold text-[#F4F4F5] hover:border-[#D5B47A] whitespace-nowrap shrink-0"
              >
                <span>{lang === 'id' ? 'Buka Website Live' : 'Open Live Project'}</span>
                <ArrowUpRight className="h-4 w-4 text-[#D5B47A]" />
              </a>
            )}

            <button
              type="button"
              onClick={() => {
                onDiscussSimilarProject(project.title);
                onClose();
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#78263F] px-5 py-2.5 text-xs font-semibold text-[#F4F4F5] border border-[#D5B47A]/35 hover:bg-[#8e2d4b] transition-colors whitespace-nowrap shrink-0"
            >
              <span>
                {lang === 'id'
                  ? `Diskusikan Proyek Serupa (${project.title})`
                  : `Discuss Similar Project (${project.title})`}
              </span>
              <ArrowUpRight className="h-4 w-4 text-[#D5B47A]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
