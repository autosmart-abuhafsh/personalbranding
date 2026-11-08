import React, { useState } from 'react';
import { ArrowUpRight, Eye } from 'lucide-react';
import { Language } from '../data/profile';
import {
  PROJECT_FILTER_CATEGORIES,
  PROJECTS_DATA,
  ProjectCategoryFilter,
  ProjectItem,
} from '../data/projects';
import { filterProjectsByCategory } from '../utils/portfolioLogic';
import { ProjectBlueprintPreview } from './ProjectBlueprintPreview';

interface ProjectsProps {
  lang: Language;
  onOpenProjectModal: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  lang,
  onOpenProjectModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategoryFilter>('All Projects');

  const filteredProjects = filterProjectsByCategory(PROJECTS_DATA, activeFilter);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-perf py-20 lg:py-28 border-b border-white/10 bg-[#0A1020]"
    >
      <div className="mx-auto max-w-[1280px] px-6 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono-tech text-xs tracking-wider text-[#D5B47A]">
              05 · {lang === 'id' ? 'KARYA & PROYEK TERPILIH' : 'SELECTED WORKS'}
            </p>
            <h2
              id="projects-heading"
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] [text-wrap:balance]"
            >
              {lang === 'id'
                ? 'Dokumentasi Proyek Website, E-Commerce & Sistem Aplikasi Bisnis'
                : 'Showcase of Websites, E-Commerce & Business Application Systems'}
            </h2>
          </div>

          <p className="max-w-md text-xs leading-relaxed text-[#A5ADBD]">
            {lang === 'id'
              ? 'Setiap proyek dilengkapi status verifikasi publikasi secara transparan tanpa klaim metrik fiktif.'
              : 'Every project includes transparent publication verification status without fabricated metrics.'}
          </p>
        </div>

        {/* Interactive Category Filter Bar */}
        <div
          role="tablist"
          aria-label={lang === 'id' ? 'Filter Kategori Proyek' : 'Filter Project Categories'}
          className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#111A2E] p-1.5"
        >
          {PROJECT_FILTER_CATEGORIES.map((cat) => {
            const isSelected = activeFilter === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveFilter(cat.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#78263F] text-[#F4F4F5] border border-[#D5B47A]/40'
                    : 'text-[#A5ADBD] hover:text-[#F4F4F5]'
                }`}
              >
                {cat.label[lang]}
              </button>
            );
          })}
        </div>

        {/* Projects Showcase Grid */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#111A2E]/50 p-12 text-center space-y-3">
            <p className="font-display text-base font-semibold text-[#F4F4F5]">
              {lang === 'id'
                ? 'Belum ada proyek pada filter kategori ini.'
                : 'No projects currently listed under this filter category.'}
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter('All Projects')}
              className="rounded-lg bg-[#78263F] px-4 py-2 text-xs font-semibold text-[#F4F4F5]"
            >
              {lang === 'id' ? 'Tampilkan Semua Proyek' : 'Show All Projects'}
            </button>
          </div>
        ) : (
          <div
            data-testid="projects-grid"
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111A2E]/70 overflow-hidden hover:border-[#D5B47A]/45 transition-colors"
              >
                {/* Visual Preview / Blueprint */}
                <div>
                  <ProjectBlueprintPreview
                    title={project.title}
                    code={project.code}
                    imageUrl={project.previewImage}
                    blueprintType={project.screenshots[0]?.blueprintType || 'corporate-showcase'}
                    lang={lang}
                    className="h-64 border-b border-white/10"
                  />

                  {/* Content Body */}
                  <div className="p-7 space-y-4">
                    {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech text-[#D5B47A]">
                      <span>{project.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.categoryLabel[lang]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#A5ADBD]">{project.statusBadge[lang]}</span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-[#F4F4F5]">
                      {project.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-[#A5ADBD]">
                      {project.shortDescription[lang]}
                    </p>

                    {/* Unboxed Tech Stack Metadata */}
                    <p className="pt-2 text-xs text-[#F4F4F5]/85">
                      <span className="text-[#A5ADBD]">
                        {lang === 'id' ? 'Teknologi: ' : 'Tech: '}
                      </span>
                      {project.technologies.join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-7 pb-7 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    aria-label={
                      lang === 'id'
                        ? `Lihat Studi Kasus ${project.title}`
                        : `View Case Study for ${project.title}`
                    }
                    onClick={() => onOpenProjectModal(project)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#78263F] px-4 py-2.5 text-xs font-semibold text-[#F4F4F5] border border-[#D5B47A]/35 hover:bg-[#8e2d4b] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Eye className="h-3.5 w-3.5 text-[#D5B47A]" />
                    <span>
                      {lang === 'id' ? 'Lihat Studi Kasus' : 'View Case Study'}
                    </span>
                  </button>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D5B47A] hover:underline whitespace-nowrap shrink-0"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-[#A5ADBD]">
                      {lang === 'id'
                        ? 'Detail & Arsitektur Tersedia'
                        : 'Case Study & Architecture Available'}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
