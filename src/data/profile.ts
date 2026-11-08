/**
 * ============================================================================
 * CENTRALIZED PROFILE, BRAND, TIMELINE & WORKFLOW CONFIGURATION
 * Pemilik Website: Abu Hafsh Muhammad | Autosmart Digital Solutions
 * ============================================================================
 * PETUNJUK EDIT UNTUK PEMILIK WEBSITE:
 * 1. Ganti nilai pada `CONTACT_CONFIG` di bawah ini dengan nomor WhatsApp,
 *    alamat email, dan URL media sosial asli Anda.
 * 2. Selama nilai masih diawali dengan "GANTI_DENGAN_", tombol kontak langsung
 *    tersebut akan otomatis disembunyikan dari publik agar pengunjung tidak
 *    melihat teks placeholder (sesuai aturan PRD Bab 9).
 * 3. Untuk mengganti foto profil di Hero & About, isi `photoUrl` pada
 *    `PROFILE_CONFIG` dengan path gambar Anda (misal: "/foto-abu-hafsh.webp").
 * ============================================================================
 */

export type Language = 'id' | 'en';

export interface ContactConfig {
  WHATSAPP_NUMBER: string;
  EMAIL_ADDRESS: string;
  GITHUB_URL: string;
  INSTAGRAM_URL: string;
  LINKEDIN_URL: string;
  APPS_SCRIPT_WEBHOOK_URL: string;
}

const envWebhookUrl =
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  typeof import.meta.env.VITE_APPS_SCRIPT_WEBHOOK_URL === 'string'
    ? import.meta.env.VITE_APPS_SCRIPT_WEBHOOK_URL.trim()
    : '';

export const CONTACT_CONFIG: ContactConfig = {
  // Ganti dengan nomor WhatsApp aktif format internasional tanpa '+' (contoh: "6281234567890")
  WHATSAPP_NUMBER: 'GANTI_DENGAN_NOMOR_AKTIF',
  // Ganti dengan alamat email aktif (contoh: "contact@autosmartdigital.com")
  EMAIL_ADDRESS: 'GANTI_DENGAN_EMAIL_AKTIF',
  // Ganti dengan URL profil GitHub penuh (contoh: "https://github.com/abuhafsh")
  GITHUB_URL: 'GANTI_DENGAN_URL_GITHUB',
  // Ganti dengan URL profil Instagram penuh (contoh: "https://instagram.com/abuhafsh")
  INSTAGRAM_URL: 'GANTI_DENGAN_URL_INSTAGRAM',
  // Ganti dengan URL profil LinkedIn penuh (contoh: "https://linkedin.com/in/abuhafsh")
  LINKEDIN_URL: 'GANTI_DENGAN_URL_LINKEDIN',
  // URL Web App Google Apps Script (berakhiran /exec) untuk menyimpan data form otomatis ke Google Sheets.
  // Bisa diisi lewat Environment Variable Vercel (VITE_APPS_SCRIPT_WEBHOOK_URL) atau langsung di sini:
  APPS_SCRIPT_WEBHOOK_URL:
    envWebhookUrl ||
    'https://script.google.com/macros/s/AKfycbwlSjHIRrchWHLk88nplEg0ba52c1r0MSkhpjbQNrck1C6UwEtae7EmYTGigGdZhSKY/exec',
};

export interface BilingualText {
  id: string;
  en: string;
}

export interface ExpertiseCategory {
  id: string;
  code: string;
  title: BilingualText;
  description: BilingualText;
  scopes: string[];
  visualTheme: 'web' | 'automation' | 'finance' | 'ai';
}

export interface JourneyMilestone {
  id: string;
  phase: BilingualText;
  title: BilingualText;
  organization: string;
  category: 'business' | 'development' | 'automation' | 'ai' | 'education';
  description: BilingualText;
  highlights: {
    id: string[];
    en: string[];
  };
}

export interface EducationAndCredentialItem {
  id: string;
  label: BilingualText;
  institutionPlaceholder: string;
  notes: BilingualText;
  isConfigured: boolean;
}

export interface WorkflowStep {
  number: string;
  code: string;
  title: BilingualText;
  description: BilingualText;
  deliverables: {
    id: string[];
    en: string[];
  };
}

export const PROFILE_CONFIG = {
  name: 'Abu Hafsh Muhammad',
  monogram: 'AH',
  brandName: 'Autosmart Digital Solutions',
  brandPositioning: 'Digital Learning & Business Solution',
  founderBadge: 'FOUNDER OF AUTOSMART DIGITAL SOLUTIONS',
  // Isi dengan path foto asli pemilik apabila sudah tersedia (contoh: "/assets/abu-hafsh-portrait.webp")
  // Jangan gunakan foto AI/manusia palsu. Biarkan kosong "" untuk menggunakan Monogram Architectural Frame.
  photoUrl: '',
  location: {
    id: 'Indonesia · Layanan Kolaborasi Digital & Remote',
    en: 'Indonesia · Digital Collaboration & Remote Solutions',
  },
  roles: [
    {
      id: 'Founder / Owner — Autosmart Digital Solutions',
      en: 'Founder / Owner — Autosmart Digital Solutions',
    },
    {
      id: 'Digital Solutions Developer',
      en: 'Digital Solutions Developer',
    },
    {
      id: 'Website & Web Application Developer',
      en: 'Website & Web Application Developer',
    },
    {
      id: 'Business Automation Enthusiast',
      en: 'Business Automation Enthusiast',
    },
    {
      id: 'Digital Technology Practitioner',
      en: 'Digital Technology Practitioner',
    },
    {
      id: 'Digital Learning Instructor',
      en: 'Digital Learning Instructor',
    },
  ],
  positioningStatement: {
    id: 'Digital Solutions Builder yang berfokus pada pengembangan website, aplikasi bisnis, dashboard manajemen, dan otomasi digital untuk membantu bisnis serta organisasi berkembang melalui teknologi.',
    en: 'Digital Solutions Builder focused on developing professional websites, business applications, management dashboards, and digital automation to help businesses and organizations grow through technology.',
  },
  brandPhilosophy: {
    id: 'Menghadirkan solusi digital yang profesional, fungsional, mudah digunakan, dan memberikan manfaat nyata bagi bisnis, organisasi, serta dunia pendidikan.',
    en: 'Delivering digital solutions that are professional, functional, intuitive to use, and create tangible value for businesses, organizations, and education.',
  },
  hero: {
    primaryHeadline: 'Building Digital Experiences That Move Businesses Forward.',
    indonesianHeadline: 'Membangun Pengalaman Digital dan Sistem Cerdas untuk Masa Depan.',
    subheadline: {
      id: 'Saya Abu Hafsh Muhammad, founder Autosmart Digital Solutions. Saya mengembangkan website profesional, aplikasi bisnis, dashboard manajemen, dan sistem otomasi digital untuk membantu bisnis serta organisasi bekerja lebih efektif.',
      en: 'I am Abu Hafsh Muhammad, founder of Autosmart Digital Solutions. I build professional websites, business applications, management dashboards, and digital automation systems to help businesses and organizations operate more effectively.',
    },
    ctaPrimaryWork: {
      id: 'Explore My Works',
      en: 'Explore My Works',
    },
    ctaPrimaryCollab: {
      id: "Let's Collaborate",
      en: "Let's Collaborate",
    },
    ctaSecondaryJourney: {
      id: 'Discover My Journey',
      en: 'Discover My Journey',
    },
    ctaSecondaryContact: {
      id: 'Contact Me',
      en: 'Contact Me',
    },
  },
  about: {
    title: 'More Than Technology. Creating Meaningful Solutions.',
    subtitle: {
      id: 'Menggabungkan ketepatan rekayasa sistem bisnis, estetika web modern, dan semangat edukasi digital.',
      en: 'Bridging structured business system engineering, modern web aesthetics, and digital education.',
    },
    paragraph1: {
      id: 'Perjalanan saya di dunia digital berawal dari ketertarikan untuk memanfaatkan teknologi sebagai solusi nyata. Saya membangun Autosmart Digital Solutions sebagai wadah untuk mengembangkan website, aplikasi bisnis, sistem otomasi, dan berbagai solusi digital yang dapat membantu kebutuhan bisnis serta organisasi.',
      en: 'My journey in the digital world began with a genuine drive to harness technology as a practical solution. I established Autosmart Digital Solutions as a dedicated hub for developing websites, business applications, automation systems, and tailored digital tools that address real organizational needs.',
    },
    paragraph2: {
      id: 'Selain mengembangkan solusi digital, saya juga memiliki ketertarikan pada dunia pendidikan dan pembelajaran. Bagi saya, teknologi bukan sekadar tentang membuat sesuatu terlihat modern, tetapi bagaimana teknologi dapat memberikan kemudahan, pengetahuan, dan dampak yang bermanfaat.',
      en: 'Beyond building digital products, I hold a deep commitment to education and digital literacy. To me, technology is never merely about making something look modern—it is about creating clarity, empowering knowledge, and delivering lasting practical impact.',
    },
    pillars: [
      {
        title: { id: 'Identitas Founder', en: 'Founder Identity' },
        body: {
          id: 'Mendirikan dan mengelola Autosmart Digital Solutions dengan fokus pada Digital Learning & Business Solution.',
          en: 'Founded and leads Autosmart Digital Solutions with a core focus on Digital Learning & Business Solutions.',
        },
      },
      {
        title: { id: 'Pendekatan Solutif', en: 'Solution-Oriented Approach' },
        body: {
          id: 'Merancang arsitektur web, aplikasi internal, dan otomasi yang selaras dengan alur operasional nyata.',
          en: 'Designing web architectures, internal applications, and automations aligned with real-world operational workflows.',
        },
      },
      {
        title: { id: 'Edukasi & Literasi Digital', en: 'Education & Digital Literacy' },
        body: {
          id: 'Berbagi pengetahuan praktis mengenai pemanfaatan teknologi, otomasi kerja, dan produktivitas digital.',
          en: 'Sharing practical knowledge on technology adoption, workflow automation, and digital productivity.',
        },
      },
    ],
  },
};

export const EXPERTISE_CATEGORIES: ExpertiseCategory[] = [
  {
    id: 'web-development',
    code: '01',
    title: {
      id: 'Web Development & Digital Presence',
      en: 'Web Development & Digital Presence',
    },
    description: {
      id: 'Membangun website profesional yang menarik, responsif, dan disesuaikan dengan kebutuhan identitas bisnis.',
      en: 'Building engaging, responsive, and professional websites tailored to your distinct business identity.',
    },
    scopes: [
      'Company Profile Website',
      'Business Website',
      'Landing Page',
      'E-Commerce Website',
      'Travel & Umrah Website',
      'WordPress Development',
      'Website UI/UX',
    ],
    visualTheme: 'web',
  },
  {
    id: 'business-automation',
    code: '02',
    title: {
      id: 'Business Applications & Automation',
      en: 'Business Applications & Automation',
    },
    description: {
      id: 'Mengembangkan sistem aplikasi berbasis kebutuhan operasional untuk membantu bisnis mengelola aktivitas secara lebih terstruktur.',
      en: 'Developing operational application systems to help businesses manage daily activities with greater structure and speed.',
    },
    scopes: [
      'Business Management System',
      'Admin Dashboard',
      'CRM',
      'HRIS',
      'Inventory Management',
      'Google Apps Script',
      'Google Sheets Integration',
      'Workflow Automation',
    ],
    visualTheme: 'automation',
  },
  {
    id: 'data-financial',
    code: '03',
    title: {
      id: 'Data & Financial Solutions',
      en: 'Data & Financial Solutions',
    },
    description: {
      id: 'Membangun alat bantu digital untuk pengelolaan data, administrasi, dan informasi keuangan.',
      en: 'Creating structured digital tools for data governance, administration, and clear financial reporting.',
    },
    scopes: [
      'Financial Dashboard',
      'Financial Management',
      'Financial Analysis',
      'Data Management',
      'Business Reporting',
      'Data Visualization',
    ],
    visualTheme: 'finance',
  },
  {
    id: 'ai-innovation',
    code: '04',
    title: {
      id: 'AI & Digital Innovation',
      en: 'AI & Digital Innovation',
    },
    description: {
      id: 'Mengeksplorasi pemanfaatan teknologi AI untuk mendukung produktivitas, pengembangan aplikasi, dan otomatisasi pekerjaan.',
      en: 'Exploring practical AI integration to elevate productivity, accelerate application development, and streamline workflows.',
    },
    scopes: [
      'Google AI Studio',
      'Gemini AI Integration',
      'AI-Assisted Development',
      'Prompt Engineering',
      'AI Business Workflow',
      'Digital Productivity',
    ],
    visualTheme: 'ai',
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'journey-autosmart',
    phase: { id: 'Inisiatif & Kepemimpinan Bisnis', en: 'Business Initiative & Leadership' },
    title: {
      id: 'Pengembangan & Pengelolaan Autosmart Digital Solutions',
      en: 'Building & Managing Autosmart Digital Solutions',
    },
    organization: 'Autosmart Digital Solutions',
    category: 'business',
    description: {
      id: 'Merintis dan mengembangkan Autosmart Digital Solutions sebagai entitas layanan teknologi yang berfokus pada Digital Learning & Business Solution bagi pelaku usaha, organisasi, dan institusi.',
      en: 'Founded and developed Autosmart Digital Solutions as a technology service studio focused on Digital Learning & Business Solutions for businesses, organizations, and educational institutions.',
    },
    highlights: {
      id: [
        'Perumusan solusi digital yang fungsional dan tepat guna',
        'Pendampingan transformasi kehadiran digital usaha dan organisasi',
        'Integrasi layanan pembuatan website, sistem bisnis, dan edukasi',
      ],
      en: [
        'Formulating functional and practical digital solutions',
        'Guiding digital presence transformation for businesses and organizations',
        'Integrating web development, business systems, and digital education',
      ],
    },
  },
  {
    id: 'journey-web-solutions',
    phase: { id: 'Pengembangan Web & Kehadiran Digital', en: 'Web Development & Digital Presence' },
    title: {
      id: 'Pengembangan Website & Solusi Digital untuk Bisnis',
      en: 'Developing Websites & Digital Solutions for Businesses',
    },
    organization: 'Client & Independent Projects',
    category: 'development',
    description: {
      id: 'Merancang dan membangun berbagai jenis website mulai dari company profile, website layanan perjalanan umrah & travel, hingga toko online (e-commerce) dengan fokus pada kemudahan pengelolaan.',
      en: 'Designing and building diverse web platforms ranging from company profiles and travel/Umrah portals to e-commerce stores with an emphasis on maintainability and user clarity.',
    },
    highlights: {
      id: [
        'Implementasi WordPress, WP Travel Engine, dan WooCommerce',
        'Perancangan antarmuka yang responsif di perangkat desktop dan mobile',
        'Penyusunan struktur informasi produk dan layanan bisnis',
      ],
      en: [
        'Implementing WordPress, WP Travel Engine, and WooCommerce',
        'Crafting responsive interfaces across desktop and mobile devices',
        'Structuring clear product and service information architecture',
      ],
    },
  },
  {
    id: 'journey-apps-script',
    phase: { id: 'Sistem Operasional & Otomasi', en: 'Operational Systems & Automation' },
    title: {
      id: 'Eksplorasi Aplikasi Bisnis & Otomasi Berbasis Google Apps Script',
      en: 'Business Applications & Automation with Google Apps Script',
    },
    organization: 'Autosmart System Lab',
    category: 'automation',
    description: {
      id: 'Membangun prototipe dan sistem aplikasi internal berbasis Google Apps Script serta Google Sheets untuk merapikan pencatatan data, administrasi, CRM, inventaris, dan pelaporan keuangan.',
      en: 'Building internal business application prototypes and systems powered by Google Apps Script and Google Sheets to streamline data entry, administration, CRM, inventory, and financial reporting.',
    },
    highlights: {
      id: [
        'Otomasi alur kerja administrasi dan rekapitulasi data operasional',
        'Pembuatan dashboard pemantauan keuangan dan manajemen terpusat',
        'Integrasi formulir, spreadsheet, dan aplikasi web ringan',
      ],
      en: [
        'Automating administrative workflows and operational data aggregation',
        'Creating centralized financial monitoring and management dashboards',
        'Integrating custom web apps with structured spreadsheet backends',
      ],
    },
  },
  {
    id: 'journey-ai-workflow',
    phase: { id: 'Inovasi & Produktivitas Cerdas', en: 'Smart Innovation & Productivity' },
    title: {
      id: 'Integrasi Teknologi AI dalam Alur Kerja Digital',
      en: 'Integrating AI Technology into Digital Workflows',
    },
    organization: 'AI-Assisted Development & Workflow',
    category: 'ai',
    description: {
      id: 'Memanfaatkan Google AI Studio, Gemini AI, dan teknik prompt engineering terstruktur untuk mempercepat eksplorasi pembuatan aplikasi, penyusunan sistem, serta efisiensi kerja digital.',
      en: 'Leveraging Google AI Studio, Gemini AI, and structured prompt engineering to accelerate application prototyping, system architecture design, and digital workflow efficiency.',
    },
    highlights: {
      id: [
        'Pemanfaatan Google AI Studio dan Gemini AI untuk akselerasi pengembangan',
        'Perancangan prompt terstruktur untuk kebutuhan bisnis dan dokumentasi',
        'Otomatisasi tugas berulang dengan bantuan kecerdasan buatan',
      ],
      en: [
        'Utilizing Google AI Studio and Gemini AI to accelerate development',
        'Designing structured prompts for business workflows and documentation',
        'Streamlining repetitive operational tasks with AI assistance',
      ],
    },
  },
  {
    id: 'journey-digital-education',
    phase: { id: 'Edukasi & Pemberdayaan', en: 'Education & Empowerment' },
    title: {
      id: 'Keterlibatan dalam Pembelajaran & Pengajaran Keterampilan Digital',
      en: 'Engagement in Digital Learning & Skills Instruction',
    },
    organization: 'Digital Learning & Instruction',
    category: 'education',
    description: {
      id: 'Berperan sebagai instruktur dan praktisi pembelajaran digital yang berkomitmen membantu individu maupun tim memahami teknologi secara aplikatif, mudah dipahami, dan relevan dengan kebutuhan kerja.',
      en: 'Serving as a digital learning instructor and practitioner dedicated to helping individuals and teams understand technology in an approachable, practical, and work-relevant manner.',
    },
    highlights: {
      id: [
        'Penyampaian materi teknologi dengan bahasa yang humanis dan mudah dipahami',
        'Pembelajaran berbasis praktik langsung untuk produktivitas kerja',
        'Pengembangan kurikulum dan panduan literasi digital',
      ],
      en: [
        'Delivering technical instruction in clear, human-centered language',
        'Hands-on practical learning focused on workplace productivity',
        'Developing accessible guides and digital literacy learning modules',
      ],
    },
  },
];

// Komponen Pendidikan & Pengalaman Tambahan yang dapat diedit oleh pemilik website
// Tanpa mengarang tanggal, nama institusi, atau gelar yang belum dikonfirmasi (PRD 5.7)
export const EDITABLE_CREDENTIALS: EducationAndCredentialItem[] = [
  {
    id: 'cred-education',
    label: { id: 'Riwayat Pendidikan Formal & Akademik', en: 'Formal & Academic Education' },
    institutionPlaceholder: 'Dapat diperbarui pada src/data/profile.ts',
    notes: {
      id: 'Slot informasi pendidikan telah disiapkan secara modular. Pemilik website dapat menambahkan nama institusi, bidang studi, dan tahun kelulusan resmi kapan saja melalui file konfigurasi data.',
      en: 'The formal education slot is modularly prepared. The website owner can add verified institution names, fields of study, and graduation years directly in the data configuration file.',
    },
    isConfigured: false,
  },
  {
    id: 'cred-certifications',
    label: { id: 'Sertifikasi & Pelatihan Profesional', en: 'Professional Certifications & Training' },
    institutionPlaceholder: 'Dapat diperbarui pada src/data/profile.ts',
    notes: {
      id: 'Slot dokumentasi sertifikasi teknologi, kursus intensif, dan lisensi instruktur yang telah diverifikasi.',
      en: 'Dedicated slot for verified technology certifications, intensive courses, and instructor credentials.',
    },
    isConfigured: false,
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: '01',
    code: 'DISCOVER',
    title: { id: 'Discover', en: 'Discover' },
    description: {
      id: 'Memahami kebutuhan, masalah, target pengguna, dan tujuan proyek.',
      en: 'Understanding core requirements, operational challenges, target users, and project objectives.',
    },
    deliverables: {
      id: ['Pemetaan kebutuhan bisnis', 'Identifikasi masalah utama', 'Ruang lingkup solusi'],
      en: ['Business requirement mapping', 'Core problem identification', 'Solution scope definition'],
    },
  },
  {
    number: '02',
    code: 'STRATEGIZE',
    title: { id: 'Strategize', en: 'Strategize' },
    description: {
      id: 'Menyusun konsep solusi, fitur, struktur sistem, dan arah desain.',
      en: 'Formulating the solution concept, feature set, system architecture, and visual direction.',
    },
    deliverables: {
      id: ['Arsitektur informasi & alur data', 'Daftar fitur prioritas', 'Pemilihan platform teknologi'],
      en: ['Information & data flow architecture', 'Prioritized feature blueprint', 'Technology stack selection'],
    },
  },
  {
    number: '03',
    code: 'DESIGN',
    title: { id: 'Design', en: 'Design' },
    description: {
      id: 'Membangun pengalaman visual dan rancangan antarmuka yang profesional.',
      en: 'Crafting a professional visual experience and intuitive user interface layout.',
    },
    deliverables: {
      id: ['Tata letak antarmuka (UI/UX)', 'Hierarki visual & tipografi', 'Prototipe tampilan responsif'],
      en: ['UI/UX interface layout', 'Visual & typographic hierarchy', 'Responsive layout prototype'],
    },
  },
  {
    number: '04',
    code: 'DEVELOP',
    title: { id: 'Develop', en: 'Develop' },
    description: {
      id: 'Mengembangkan website, aplikasi, dashboard, dan sistem sesuai kebutuhan.',
      en: 'Developing the website, business application, dashboard, or automation system.',
    },
    deliverables: {
      id: ['Pengembangan komponen & sistem', 'Integrasi database / spreadsheet', 'Otomasi alur kerja'],
      en: ['System & component development', 'Database / spreadsheet integration', 'Workflow automation wiring'],
    },
  },
  {
    number: '05',
    code: 'TEST & OPTIMIZE',
    title: { id: 'Test & Optimize', en: 'Test & Optimize' },
    description: {
      id: 'Memeriksa fungsionalitas, responsivitas, performa, dan pengalaman pengguna.',
      en: 'Verifying functionality, multi-device responsiveness, performance, and user experience.',
    },
    deliverables: {
      id: ['Uji tampilan mobile & desktop', 'Validasi alur formulir & data', 'Optimasi kecepatan muat'],
      en: ['Mobile & desktop responsiveness QA', 'Form & data flow validation', 'Loading performance optimization'],
    },
  },
  {
    number: '06',
    code: 'DELIVER',
    title: { id: 'Deliver', en: 'Deliver' },
    description: {
      id: 'Menyerahkan hasil dan membantu proses publikasi sesuai ruang lingkup proyek.',
      en: 'Handing over the final build and assisting with deployment according to project scope.',
    },
    deliverables: {
      id: ['Publikasi / deployment sistem', 'Dokumentasi penggunaan', 'Serah terima pengelolaan'],
      en: ['System publication / deployment', 'Usage documentation', 'Management handover'],
    },
  },
];
