import React, { useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  Blocks,
  Cpu,
  FileSpreadsheet,
  Globe,
  Layout,
  ShoppingBag,
  Sparkles,
  Users,
  Wallet,
  Workflow,
} from 'lucide-react';
import { Language } from '../data/profile';
import { SERVICES_DATA, ServiceItem } from '../data/services';

interface ServicesProps {
  lang: Language;
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

const ServiceIcon: React.FC<{ name: ServiceItem['iconName'] }> = ({ name }) => {
  const props = { className: 'h-5 w-5 text-[#D5B47A]', 'aria-hidden': true as const };
  switch (name) {
    case 'globe':
      return <Globe {...props} />;
    case 'layout':
      return <Layout {...props} />;
    case 'blocks':
      return <Blocks {...props} />;
    case 'shopping-bag':
      return <ShoppingBag {...props} />;
    case 'cpu':
      return <Cpu {...props} />;
    case 'bar-chart-3':
      return <BarChart3 {...props} />;
    case 'workflow':
      return <Workflow {...props} />;
    case 'users':
      return <Users {...props} />;
    case 'wallet':
      return <Wallet {...props} />;
    case 'file-spreadsheet':
      return <FileSpreadsheet {...props} />;
    case 'sparkles':
      return <Sparkles {...props} />;
  }
};

export const Services: React.FC<ServicesProps> = ({
  lang,
  onSelectServiceForInquiry,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceItem['category']>('all');

  const categories: { value: 'all' | ServiceItem['category']; label: { id: string; en: string } }[] =
    [
      { value: 'all', label: { id: 'Semua Layanan (11)', en: 'All Services (11)' } },
      { value: 'web', label: { id: 'Website & E-Commerce', en: 'Websites & E-Commerce' } },
      {
        value: 'application',
        label: { id: 'Aplikasi Bisnis & Otomasi', en: 'Business Apps & Automation' },
      },
      { value: 'data', label: { id: 'Data & Keuangan', en: 'Data & Finance' } },
      { value: 'ai', label: { id: 'Integrasi AI', en: 'AI Integration' } },
    ];

  const visibleServices =
    activeCategory === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategory);

  const handleDiscussClick = (serviceTitle: string) => {
    onSelectServiceForInquiry(serviceTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-perf py-20 lg:py-28 border-b border-white/10 bg-[#0A1020]"
    >
      <div className="mx-auto max-w-[1280px] px-6 space-y-12">
        {/* Section Header + Category Filter Controls */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono-tech text-xs tracking-wider text-[#D5B47A]">
              03 · {lang === 'id' ? 'LAYANAN PROFESIONAL' : 'PROFESSIONAL SERVICES'}
            </p>
            <h2
              id="services-heading"
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] [text-wrap:balance]"
            >
              {lang === 'id'
                ? 'Solusi Terukur untuk Kebutuhan Website, Sistem Bisnis & Otomasi'
                : 'Tailored Solutions for Websites, Business Systems & Automation'}
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div
            role="tablist"
            aria-label={lang === 'id' ? 'Filter Kategori Layanan' : 'Filter Service Categories'}
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#111A2E] p-1.5"
          >
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#78263F] text-[#F4F4F5] border border-[#D5B47A]/35'
                      : 'text-[#A5ADBD] hover:text-[#F4F4F5]'
                  }`}
                >
                  {cat.label[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((service) => (
            <article
              key={service.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111A2E]/65 p-6 hover:border-[#D5B47A]/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0A1020]">
                    <ServiceIcon name={service.iconName} />
                  </div>
                  <span className="font-mono-tech text-xs text-[#A5ADBD]">
                    {service.index}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#F4F4F5]">
                  {service.title[lang]}
                </h3>

                <p className="text-sm leading-relaxed text-[#A5ADBD]">
                  {service.shortDescription[lang]}
                </p>

                <ul className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-[#F4F4F5]/85">
                  {service.capabilities[lang].map((cap, i) => (
                    <li key={i} className="leading-relaxed">
                      • {cap}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  type="button"
                  aria-label={
                    lang === 'id'
                      ? `Diskusikan Layanan ${service.title.id}`
                      : `Discuss This Service: ${service.title.en}`
                  }
                  onClick={() => handleDiscussClick(service.title.en)}
                  className="inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#0A1020] px-4 py-2.5 text-xs font-semibold text-[#F4F4F5] hover:border-[#D5B47A] hover:text-[#D5B47A] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>
                    {lang === 'id'
                      ? 'Diskusikan Layanan Ini · Discuss Service'
                      : 'Discuss This Service'}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#D5B47A]" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
