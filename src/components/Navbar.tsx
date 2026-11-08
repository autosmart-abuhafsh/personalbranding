import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Language } from '../data/profile';
import { MonogramLogo } from './MonogramLogo';

interface NavbarProps {
  lang: Language;
}

export const Navbar: React.FC<NavbarProps> = React.memo(({ lang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const scrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 24;
      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'expertise',
      'services',
      'tech-stack',
      'projects',
      'experience',
      'workflow',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-25% 0px -60% 0px',
        threshold: 0,
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'about', label: lang === 'id' ? 'Tentang' : 'About', href: '#about' },
    { id: 'expertise', label: lang === 'id' ? 'Keahlian' : 'Expertise', href: '#expertise' },
    { id: 'services', label: lang === 'id' ? 'Layanan' : 'Services', href: '#services' },
    { id: 'projects', label: lang === 'id' ? 'Karya' : 'Works', href: '#projects' },
    { id: 'workflow', label: lang === 'id' ? 'Alur Kerja' : 'Workflow', href: '#workflow' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-[#0A1020] border-b border-white/10 shadow-lg shadow-black/30'
          : 'bg-[#0A1020]/95 border-b border-white/5'
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          className="group flex items-center gap-3 font-display text-base font-semibold tracking-tight text-[#F4F4F5] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B47A]"
        >
          <MonogramLogo size="sm" />
          <span>Abu Hafsh Muhammad</span>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label={lang === 'id' ? 'Navigasi Utama' : 'Primary Navigation'}
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A5ADBD]"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#F4F4F5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D5B47A] ${
                  isActive ? 'text-[#D5B47A]' : 'text-[#A5ADBD]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#D5B47A] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#78263F] px-4 py-2 text-xs font-semibold text-[#F4F4F5] border border-[#D5B47A]/30 hover:bg-[#8e2d4b] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5B47A]"
          >
            {lang === 'id' ? 'Diskusikan Proyek' : "Let's Collaborate"}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen
                ? lang === 'id'
                  ? 'Tutup menu navigasi'
                  : 'Close navigation menu'
                : lang === 'id'
                  ? 'Buka menu navigasi'
                  : 'Open navigation menu'
            }
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#111A2E] text-[#F4F4F5] hover:border-[#D5B47A]/50 focus-visible:outline-2 focus-visible:outline-[#D5B47A]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label={lang === 'id' ? 'Navigasi Seluler' : 'Mobile Navigation'}
          className="md:hidden border-t border-white/10 bg-[#0A1020] px-6 py-5 space-y-3"
        >
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={handleNavClick}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#F4F4F5] hover:bg-[#111A2E] hover:text-[#D5B47A] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#experience"
              onClick={handleNavClick}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#A5ADBD] hover:bg-[#111A2E] hover:text-[#F4F4F5] transition-colors"
            >
              {lang === 'id' ? 'Perjalanan & Pengalaman' : 'Experience & Journey'}
            </a>
            <a
              href="#tech-stack"
              onClick={handleNavClick}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#A5ADBD] hover:bg-[#111A2E] hover:text-[#F4F4F5] transition-colors"
            >
              {lang === 'id' ? 'Teknologi' : 'Tech Stack'}
            </a>
          </div>
          <div className="pt-2 border-t border-white/10">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="flex w-full items-center justify-center rounded-lg bg-[#78263F] px-4 py-2.5 text-sm font-semibold text-[#F4F4F5] border border-[#D5B47A]/30 hover:bg-[#8e2d4b] transition-colors"
            >
              {lang === 'id' ? 'Hubungi Saya' : 'Contact Me'}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
});
