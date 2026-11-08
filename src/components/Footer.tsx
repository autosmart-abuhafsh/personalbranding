import React from 'react';
import { ArrowUp } from 'lucide-react';
import { CONTACT_CONFIG, Language, PROFILE_CONFIG } from '../data/profile';
import { isConfiguredContactValue } from '../utils/portfolioLogic';
import { MonogramLogo } from './MonogramLogo';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const configuredSocials = [
    { label: 'GitHub', url: CONTACT_CONFIG.GITHUB_URL },
    { label: 'LinkedIn', url: CONTACT_CONFIG.LINKEDIN_URL },
    { label: 'Instagram', url: CONTACT_CONFIG.INSTAGRAM_URL },
  ].filter((item) => isConfiguredContactValue(item.url));

  return (
    <footer className="bg-[#0A1020] pt-16 pb-12 text-[#A5ADBD]">
      <div className="mx-auto max-w-[1280px] px-6 space-y-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3.5">
              <MonogramLogo size="md" />
              <div>
                <p className="font-display text-base font-bold tracking-tight text-[#F4F4F5]">
                  ABU HAFSH MUHAMMAD
                </p>
                <p className="text-xs text-[#D5B47A]">
                  Digital Solutions &amp; Business Innovation
                </p>
              </div>
            </div>

            <p className="text-sm text-[#F4F4F5]/90">
              Founder of {PROFILE_CONFIG.brandName}.
            </p>

            <p className="font-display text-sm italic text-[#A5ADBD]">
              “Building Digital Experiences That Matter.” · “Turning Ideas Into Digital Experiences.”
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-mono-tech text-xs text-[#D5B47A]">
              {lang === 'id' ? 'NAVIGASI HALAMAN' : 'SITE NAVIGATION'}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#home" className="hover:text-[#F4F4F5] transition-colors">
                Home
              </a>
              <a href="#about" className="hover:text-[#F4F4F5] transition-colors">
                {lang === 'id' ? 'Tentang Saya' : 'About Me'}
              </a>
              <a href="#expertise" className="hover:text-[#F4F4F5] transition-colors">
                {lang === 'id' ? 'Keahlian' : 'Expertise'}
              </a>
              <a href="#services" className="hover:text-[#F4F4F5] transition-colors">
                {lang === 'id' ? 'Layanan' : 'Services'}
              </a>
              <a href="#tech-stack" className="hover:text-[#F4F4F5] transition-colors">
                Tech Stack
              </a>
              <a href="#projects" className="hover:text-[#F4F4F5] transition-colors">
                {lang === 'id' ? 'Karya Terpilih' : 'Selected Works'}
              </a>
              <a href="#experience" className="hover:text-[#F4F4F5] transition-colors">
                {lang === 'id' ? 'Perjalanan' : 'Journey'}
              </a>
              <a href="#contact" className="hover:text-[#F4F4F5] transition-colors">
                {lang === 'id' ? 'Kontak' : 'Contact'}
              </a>
            </div>
          </div>

          {/* Back to Top */}
          <div className="md:col-span-2 flex md:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label={lang === 'id' ? 'Kembali ke atas halaman' : 'Back to top'}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#111A2E] px-4 py-2.5 text-xs font-semibold text-[#F4F4F5] hover:border-[#D5B47A] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5 text-[#D5B47A]" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Creed */}
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center">
          <p>
            © {currentYear} {PROFILE_CONFIG.name} · {PROFILE_CONFIG.brandName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">
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
            <span className="font-mono-tech text-[11px] text-[#D5B47A]">
              BUILD WITH PURPOSE · DESIGN WITH MEANING · CREATE WITH TECHNOLOGY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
