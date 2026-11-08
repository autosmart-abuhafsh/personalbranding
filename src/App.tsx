/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Language } from './data/profile';
import { ProjectItem } from './data/projects';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Expertise } from './components/Expertise';
import { Services } from './components/Services';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Experience } from './components/Experience';
import { Workflow } from './components/Workflow';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [introComplete, setIntroComplete] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') return true;
    }
    return false;
  });

  const [lang, setLang] = useState<Language>('id');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string>('');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div
      data-state={introComplete ? 'ready' : 'intro'}
      className="min-h-screen bg-[#0A1020] text-[#F4F4F5] flex flex-col"
    >
      {!introComplete && <LoadingScreen onFinish={() => setIntroComplete(true)} />}

      <Navbar lang={lang} />

      <main className="flex-1">
        <Hero
          lang={lang}
          onToggleLang={setLang}
          customPhotoUrl={customPhotoUrl}
          onUpdatePhotoUrl={setCustomPhotoUrl}
        />

        <About lang={lang} customPhotoUrl={customPhotoUrl} />

        <Expertise lang={lang} />

        <Services
          lang={lang}
          onSelectServiceForInquiry={(serviceTitle) =>
            setPreselectedService(serviceTitle)
          }
        />

        <TechStack lang={lang} />

        <Projects
          lang={lang}
          onOpenProjectModal={(project) => setSelectedProject(project)}
        />

        <Experience lang={lang} />

        <Workflow lang={lang} />

        <Contact lang={lang} preselectedService={preselectedService} />
      </main>

      <Footer lang={lang} />

      <ProjectModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
        onDiscussSimilarProject={(projectTitle) =>
          setPreselectedService(`Project Inquiry: ${projectTitle}`)
        }
      />
    </div>
  );
}
