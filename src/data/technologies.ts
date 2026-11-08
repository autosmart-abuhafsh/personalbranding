/**
 * ============================================================================
 * CENTRALIZED TECHNOLOGY STACK DATA
 * Pemilik Website: Abu Hafsh Muhammad | Autosmart Digital Solutions
 * ============================================================================
 * CATATAN PENTING (Sesuai PRD Bab 5.5):
 * Hanya menampilkan teknologi inti yang dikelompokkan ke dalam 4 pilar resmi:
 * 1. Web & Website (WordPress, HTML, CSS, JavaScript)
 * 2. Business Applications (Google Apps Script, Google Sheets, Web Applications, Dashboard Systems)
 * 3. AI & Innovation (Google AI Studio, Gemini AI, Prompt Engineering)
 * 4. Creative Development (UI/UX Design, Responsive Design, Interactive Web Experience)
 *
 * Teknologi yang masih dalam tahap eksplorasi dicantumkan secara jujur pada
 * catatan transparansi terpisah tanpa diklaim sebagai keahlian yang sudah dikuasai penuh.
 * ============================================================================
 */

import { BilingualText } from './profile';

export interface TechItem {
  id: string;
  name: string;
  monogram: string;
  role: BilingualText;
}

export interface TechGroup {
  id: string;
  code: string;
  title: BilingualText;
  subtitle: BilingualText;
  orbitRadius: number;
  items: TechItem[];
}

export const TECH_STACK_GROUPS: TechGroup[] = [
  {
    id: 'web-website',
    code: 'STACK 01',
    title: {
      id: 'Web & Website',
      en: 'Web & Website',
    },
    subtitle: {
      id: 'Fondasi pengembangan website bisnis, landing page, dan pengelolaan konten.',
      en: 'Core foundation for business websites, landing pages, and content management.',
    },
    orbitRadius: 120,
    items: [
      {
        id: 'wordpress',
        name: 'WordPress',
        monogram: 'WP',
        role: {
          id: 'CMS utama untuk company profile, travel & umrah, serta e-commerce WooCommerce',
          en: 'Primary CMS for company profiles, travel & Umrah portals, and WooCommerce stores',
        },
      },
      {
        id: 'html',
        name: 'HTML',
        monogram: 'HT',
        role: {
          id: 'Struktur semantik halaman web dan antarmuka aplikasi',
          en: 'Semantic web document structure and application markup',
        },
      },
      {
        id: 'css',
        name: 'CSS',
        monogram: 'CS',
        role: {
          id: 'Penataan gaya visual, tata letak responsif, dan estetika antarmuka',
          en: 'Visual styling, responsive layouts, and interface aesthetics',
        },
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        monogram: 'JS',
        role: {
          id: 'Logika interaktif halaman web, validasi data, dan skrip otomasi',
          en: 'Interactive web logic, data validation, and automation scripting',
        },
      },
    ],
  },
  {
    id: 'business-applications',
    code: 'STACK 02',
    title: {
      id: 'Business Applications',
      en: 'Business Applications',
    },
    subtitle: {
      id: 'Ekosistem pengembangan aplikasi operasional, administrasi, dan otomasi data.',
      en: 'Operational application ecosystem for administration and data automation.',
    },
    orbitRadius: 175,
    items: [
      {
        id: 'google-apps-script',
        name: 'Google Apps Script',
        monogram: 'AS',
        role: {
          id: 'Mesin otomasi alur kerja dan backend aplikasi web terintegrasi Google Workspace',
          en: 'Workflow automation engine and web app backend within Google Workspace',
        },
      },
      {
        id: 'google-sheets',
        name: 'Google Sheets',
        monogram: 'GS',
        role: {
          id: 'Manajemen basis data terstruktur, kalkulasi keuangan, dan pelaporan langsung',
          en: 'Structured data management, financial calculation, and live reporting',
        },
      },
      {
        id: 'web-applications',
        name: 'Web Applications',
        monogram: 'WA',
        role: {
          id: 'Sistem aplikasi bisnis untuk kebutuhan CRM, inventaris, dan administrasi',
          en: 'Business application systems for CRM, inventory, and administration',
        },
      },
      {
        id: 'dashboard-systems',
        name: 'Dashboard Systems',
        monogram: 'DS',
        role: {
          id: 'Panel kendali visual untuk pemantauan data operasional dan metrik keuangan',
          en: 'Visual control panels for monitoring operational data and financial metrics',
        },
      },
    ],
  },
  {
    id: 'ai-innovation',
    code: 'STACK 03',
    title: {
      id: 'AI & Innovation',
      en: 'AI & Innovation',
    },
    subtitle: {
      id: 'Pemanfaatan kecerdasan buatan untuk akselerasi pengembangan dan efisiensi kerja.',
      en: 'Leveraging artificial intelligence for development acceleration and workflow efficiency.',
    },
    orbitRadius: 230,
    items: [
      {
        id: 'google-ai-studio',
        name: 'Google AI Studio',
        monogram: 'AI',
        role: {
          id: 'Lingkungan pengembangan dan eksplorasi solusi digital berbantuan AI',
          en: 'Development and prototyping environment for AI-assisted digital solutions',
        },
      },
      {
        id: 'gemini-ai',
        name: 'Gemini AI',
        monogram: 'GM',
        role: {
          id: 'Integrasi model bahasa cerdas untuk produktivitas, analisis, dan otomasi tugas',
          en: 'Intelligent model integration for productivity, analysis, and task automation',
        },
      },
      {
        id: 'prompt-engineering',
        name: 'Prompt Engineering',
        monogram: 'PE',
        role: {
          id: 'Penyusunan instruksi sistem terstruktur untuk hasil output AI yang presisi',
          en: 'Structured system instruction design for accurate and reliable AI outputs',
        },
      },
    ],
  },
  {
    id: 'creative-development',
    code: 'STACK 04',
    title: {
      id: 'Creative Development',
      en: 'Creative Development',
    },
    subtitle: {
      id: 'Pendekatan desain pengalaman pengguna yang fungsional, responsif, dan nyaman.',
      en: 'Functional, responsive, and human-centered user experience design.',
    },
    orbitRadius: 285,
    items: [
      {
        id: 'ui-ux-design',
        name: 'UI/UX Design',
        monogram: 'UX',
        role: {
          id: 'Perancangan tata letak antarmuka yang bersih, jelas, dan berorientasi pengguna',
          en: 'Clean, legible, and user-oriented interface architecture design',
        },
      },
      {
        id: 'responsive-design',
        name: 'Responsive Design',
        monogram: 'RD',
        role: {
          id: 'Adaptasi tampilan optimal di perangkat desktop, tablet, dan smartphone',
          en: 'Seamless visual adaptation across desktop, tablet, and smartphone screens',
        },
      },
      {
        id: 'interactive-web',
        name: 'Interactive Web Experience',
        monogram: 'IX',
        role: {
          id: 'Penyajian informasi digital yang hidup, terstruktur, dan berkesan',
          en: 'Engaging, structured, and memorable digital information presentation',
        },
      },
    ],
  },
];

export const TECH_EXPLORATION_NOTE: BilingualText = {
  id: 'Catatan Transparansi: Fokus utama praktik saya terletak pada pengembangan solusi fungsional menggunakan WordPress, ekosistem Google Apps Script & Google Sheets, serta AI-Assisted Development melalui Google AI Studio. Teknologi web modern lainnya terus dieksplorasi secara berkelanjutan sesuai kebutuhan proyek.',
  en: 'Transparency Note: My primary hands-on practice centers on building functional solutions with WordPress, the Google Apps Script & Google Sheets ecosystem, and AI-Assisted Development via Google AI Studio. Modern frontend frameworks and 3D web technologies are continuously explored as project needs evolve.',
};
