/**
 * ============================================================================
 * CENTRALIZED PORTFOLIO PROJECTS DATA (SELECTED WORKS)
 * Pemilik Website: Abu Hafsh Muhammad | Autosmart Digital Solutions
 * ============================================================================
 * PETUNJUK EDIT UNTUK PEMILIK WEBSITE:
 * 1. Setiap proyek di bawah ini memiliki field `previewImage` dan `screenshots`.
 *    Jika Anda sudah memiliki file screenshot asli (format .webp / .png),
 *    masukkan path-nya ke `previewImage` (contoh: "/projects/afiyah-tour.webp").
 * 2. Jika `previewImage` kosong (""), website secara otomatis merender
 *    Interactive System Blueprint Preview berlabel jelas (sesuai PRD 5.6).
 * 3. Jangan memasukkan URL palsu pada `liveUrl`. Isi `liveUrl` hanya dengan
 *    tautan proyek aktif yang sudah memperoleh izin publikasi.
 * ============================================================================
 */

import { BilingualText } from './profile';

export type ProjectCategoryFilter =
  | 'All Projects'
  | 'Business Website'
  | 'E-Commerce'
  | 'Landing Page'
  | 'Business Applications'
  | 'Dashboard & Automation'
  | 'Experimental Projects';

export const PROJECT_FILTER_CATEGORIES: {
  value: ProjectCategoryFilter;
  label: BilingualText;
}[] = [
  { value: 'All Projects', label: { id: 'Semua Proyek', en: 'All Projects' } },
  { value: 'Business Website', label: { id: 'Website Bisnis & Travel', en: 'Business Website' } },
  { value: 'E-Commerce', label: { id: 'E-Commerce', en: 'E-Commerce' } },
  { value: 'Landing Page', label: { id: 'Landing Page', en: 'Landing Page' } },
  { value: 'Business Applications', label: { id: 'Aplikasi Bisnis', en: 'Business Applications' } },
  { value: 'Dashboard & Automation', label: { id: 'Dashboard & Otomasi', en: 'Dashboard & Automation' } },
  { value: 'Experimental Projects', label: { id: 'Proyek Eksperimental', en: 'Experimental Projects' } },
];

export type VerificationStatusType = 'completed_pending_confirm' | 'in_progress' | 'prototype';

export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  categoryLabel: BilingualText;
  filterTags: ProjectCategoryFilter[];
  shortDescription: BilingualText;
  overview: BilingualText;
  background: BilingualText;
  challenge: BilingualText;
  solution: BilingualText;
  features: {
    id: string[];
    en: string[];
  };
  technologies: string[];
  statusType: VerificationStatusType;
  statusBadge: BilingualText;
  verificationNote: BilingualText;
  previewImage: string; // Isi dengan path gambar asli jika tersedia, biarkan "" untuk Blueprint Placeholder
  screenshots: {
    title: BilingualText;
    caption: BilingualText;
    imageUrl: string;
    blueprintType: 'travel-home' | 'travel-packages' | 'corporate-showcase' | 'ecommerce-catalog' | 'apps-script-dashboard';
  }[];
  liveUrl: string; // Kosongkan "" jika link publik belum dikonfirmasi agar tidak membuat link palsu
  featuredSpan?: 'wide' | 'normal';
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'afiyah-tour',
    code: 'PROJECT 01',
    title: 'Afiyah Tour',
    categoryLabel: {
      id: 'Travel & Umrah Website',
      en: 'Travel & Umrah Website',
    },
    filterTags: ['Business Website', 'Landing Page'],
    shortDescription: {
      id: 'Pengembangan website untuk bisnis travel dan layanan perjalanan umrah dengan penyajian paket perjalanan yang terstruktur.',
      en: 'Website development for a travel business and Umrah pilgrimage service featuring structured travel package presentations.',
    },
    overview: {
      id: 'Afiyah Tour merupakan proyek pengembangan website bisnis perjalanan dan layanan umrah yang dirancang untuk menyajikan informasi program perjalanan, jadwal, serta fasilitas layanan secara jelas dan terpercaya bagi calon jamaah.',
      en: 'Afiyah Tour is a travel and Umrah service website project designed to present pilgrimage programs, schedules, and service facilities clearly and credibly for prospective travelers.',
    },
    background: {
      id: 'Bisnis perjalanan ibadah umrah dan wisata membutuhkan pusat informasi digital yang rapi agar calon jamaah dapat mempelajari detail paket perjalanan, rincian fasilitas, serta menghubungi tim layanan dengan mudah.',
      en: 'Travel and Umrah pilgrimage operators require a well-structured digital information hub so prospective pilgrims can review package details, included facilities, and easily connect with service consultants.',
    },
    challenge: {
      id: 'Menyusun struktur informasi paket perjalanan yang mudah dinavigasi di perangkat seluler maupun desktop, sekaligus memudahkan tim internal dalam memperbarui katalog paket perjalanan.',
      en: 'Structuring travel package details so they remain easy to navigate across mobile and desktop devices while enabling internal teams to update package offerings effortlessly.',
    },
    solution: {
      id: 'Mengembangkan website berbasis WordPress yang diintegrasikan dengan WP Travel Engine untuk pengelolaan paket perjalanan, tampilan rincian itinerary, serta halaman informasi layanan yang terstruktur.',
      en: 'Developed a WordPress-based platform integrated with WP Travel Engine for structured travel package management, itinerary breakdowns, and accessible service landing pages.',
    },
    features: {
      id: [
        'Website bisnis travel dengan identitas visual yang rapi dan profesional',
        'Penyajian informasi perjalanan umrah dan wisata secara terstruktur',
        'Tampilan katalog layanan dan detail paket perjalanan berbasis WP Travel Engine',
        'Desain responsif yang nyaman diakses melalui smartphone maupun desktop',
      ],
      en: [
        'Professional travel business website with a clean visual identity',
        'Structured presentation of Umrah and travel itinerary information',
        'Service catalog and travel package detail views powered by WP Travel Engine',
        'Responsive layout optimized for both smartphone and desktop visitors',
      ],
    },
    technologies: ['WordPress', 'WP Travel Engine', 'HTML', 'CSS', 'Responsive UI/UX'],
    statusType: 'completed_pending_confirm',
    statusBadge: {
      id: 'Completed · Konfirmasi Publikasi',
      en: 'Completed · Publication Confirmation',
    },
    verificationNote: {
      id: 'Pengembangan selesai — tautan live dan tangkapan layar final ditampilkan setelah konfirmasi izin publikasi resmi.',
      en: 'Development completed — live URL and final screenshots are displayed upon official publication permission confirmation.',
    },
    previewImage: '',
    screenshots: [
      {
        title: { id: 'Halaman Utama & Sorotan Layanan Perjalanan', en: 'Main Landing & Travel Service Highlights' },
        caption: {
          id: 'Pratinjau arsitektur tata letak halaman utama Afiyah Tour (Ganti dengan screenshot asli pada src/data/projects.ts).',
          en: 'Architectural layout preview of the Afiyah Tour main page (Replace with actual screenshot in src/data/projects.ts).',
        },
        imageUrl: '',
        blueprintType: 'travel-home',
      },
      {
        title: { id: 'Katalog & Detail Paket Umrah (WP Travel Engine)', en: 'Umrah Package Catalog & Details (WP Travel Engine)' },
        caption: {
          id: 'Struktur penyajian informasi paket perjalanan, fasilitas, dan jadwal keberangkatan.',
          en: 'Structured presentation of travel packages, facilities, and departure schedules.',
        },
        imageUrl: '',
        blueprintType: 'travel-packages',
      },
    ],
    liveUrl: '',
    featuredSpan: 'wide',
  },
  {
    id: 'kang-kayu-jombaa',
    code: 'PROJECT 02',
    title: 'Kang Kayu Jombaa',
    categoryLabel: {
      id: 'Business Website',
      en: 'Business Website',
    },
    filterTags: ['Business Website', 'Landing Page'],
    shortDescription: {
      id: 'Pengembangan website bisnis untuk membantu memperkuat kehadiran digital, katalog karya, dan identitas usaha.',
      en: 'Business website development crafted to strengthen digital presence, product showcase, and brand identity.',
    },
    overview: {
      id: 'Kang Kayu Jombaa adalah proyek pengembangan website bisnis yang difokuskan untuk menghadirkan identitas digital yang profesional, memperkenalkan profil usaha, serta menampilkan layanan dan produk secara terorganisir.',
      en: 'Kang Kayu Jombaa is a business website development project focused on establishing a credible digital identity, introducing the company profile, and showcasing products and services in an organized layout.',
    },
    background: {
      id: 'Kehadiran digital yang profesional membantu usaha lokal dan bisnis kreatif menjangkau pelanggan yang lebih luas serta membangun kepercayaan sejak kunjungan pertama.',
      en: 'A strong digital presence helps local and craftsmanship businesses reach a broader audience and build immediate trust from the first visit.',
    },
    challenge: {
      id: 'Menampilkan karakter usaha dan informasi produk secara ringkas, cepat diakses, dan mudah dihubungi oleh calon pelanggan.',
      en: 'Presenting the business character and product information concisely with fast loading times and clear customer contact pathways.',
    },
    solution: {
      id: 'Merancang struktur website bisnis yang menonjolkan keunggulan produk, galeri karya, profil usaha, serta integrasi tombol konsultasi langsung.',
      en: 'Designed a clean business website architecture highlighting core product strengths, portfolio gallery, business profile, and direct consultation triggers.',
    },
    features: {
      id: [
        'Halaman profil bisnis dan identitas merek yang kuat',
        'Etalase produk dan dokumentasi hasil karya',
        'Navigasi informasi layanan yang ringkas dan jelas',
        'Integrasi alur kontak bagi calon pelanggan',
      ],
      en: [
        'Strong business profile and brand identity presentation',
        'Structured product showcase and work documentation',
        'Clear and concise service information navigation',
        'Direct customer inquiry and contact integration',
      ],
    },
    technologies: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'Website UI/UX'],
    statusType: 'completed_pending_confirm',
    statusBadge: {
      id: 'Completed · Verifikasi Publikasi',
      en: 'Completed · Pending Publication Check',
    },
    verificationNote: {
      id: 'Status selesai — tautan aktif dan screenshot final dapat diaktifkan setelah verifikasi publikasi pemilik usaha.',
      en: 'Completed status — live link and final screenshots can be activated upon business owner publication verification.',
    },
    previewImage: '',
    screenshots: [
      {
        title: { id: 'Tampilan Identitas Bisnis & Katalog Produk', en: 'Business Identity & Product Showcase View' },
        caption: {
          id: 'Placeholder terlabel untuk pratinjau halaman Kang Kayu Jombaa (Siap diganti dengan aset gambar terverifikasi).',
          en: 'Labeled architectural placeholder for Kang Kayu Jombaa (Ready to be replaced with verified image assets).',
        },
        imageUrl: '',
        blueprintType: 'corporate-showcase',
      },
    ],
    liveUrl: '',
    featuredSpan: 'normal',
  },
  {
    id: 'asbabalshefaa',
    code: 'PROJECT 03',
    title: 'Asbabalshefaa',
    categoryLabel: {
      id: 'E-Commerce Website',
      en: 'E-Commerce Website',
    },
    filterTags: ['E-Commerce', 'Business Website'],
    shortDescription: {
      id: 'Pengembangan website toko online dengan fitur katalog produk, pengelolaan pesanan, dan penyesuaian pengalaman belanja.',
      en: 'Online store development featuring product catalogs, order management, and a tailored shopping experience.',
    },
    overview: {
      id: 'Asbabalshefaa merupakan proyek pengembangan toko online (e-commerce) berbasis WordPress dan WooCommerce yang dirancang untuk mendukung penjualan produk secara digital dengan tata kelola katalog dan pesanan yang terstruktur.',
      en: 'Asbabalshefaa is an e-commerce store development project built with WordPress and WooCommerce, designed to support digital product sales with structured catalog and order management.',
    },
    background: {
      id: 'Transformasi penjualan ke ranah toko online membutuhkan sistem katalog yang tertata, informasi produk yang detail, serta alur pemesanan yang memudahkan pembeli.',
      en: 'Transitioning sales into a dedicated online store requires an organized product catalog, detailed product specifications, and a frictionless checkout flow.',
    },
    challenge: {
      id: 'Menyesuaikan antarmuka toko online WooCommerce agar tetap ringan, mudah digunakan oleh pelanggan, dan praktis dikelola oleh admin toko.',
      en: 'Customizing the WooCommerce storefront so it remains lightweight and intuitive for shoppers while staying straightforward for store administrators to manage.',
    },
    solution: {
      id: 'Mengimplementasikan WordPress dan WooCommerce dengan penataan kategori produk, halaman detail produk, keranjang belanja, dan sistem pengelolaan pesanan.',
      en: 'Implemented WordPress and WooCommerce with structured product categories, detailed product views, shopping cart flows, and back-office order management.',
    },
    features: {
      id: [
        'Katalog produk terstruktur dengan kategori dan pencarian',
        'Sistem keranjang belanja dan alur pemesanan WooCommerce',
        'Pengelolaan stok, harga, dan pesanan untuk admin toko',
        'Penyesuaian tampilan pengalaman belanja yang responsif',
      ],
      en: [
        'Structured product catalog with category filtering and search',
        'Shopping cart and checkout flow powered by WooCommerce',
        'Inventory, pricing, and order management for store admins',
        'Tailored, mobile-responsive shopping experience',
      ],
    },
    technologies: ['WordPress', 'WooCommerce', 'HTML', 'CSS', 'E-Commerce UI'],
    statusType: 'in_progress',
    statusBadge: {
      id: 'In Progress / Pending Verification',
      en: 'In Progress / Pending Verification',
    },
    verificationNote: {
      id: 'Proyek sedang dalam tahap pengembangan / verifikasi akhir dan belum ditampilkan sebagai rilis final publik.',
      en: 'Project is currently in active development / pending final verification prior to public release.',
    },
    previewImage: '',
    screenshots: [
      {
        title: { id: 'Arsitektur Katalog Produk & Pengelolaan Pesanan', en: 'Product Catalog & Order Management Architecture' },
        caption: {
          id: 'Pratinjau struktur toko online WooCommerce Asbabalshefaa (Dalam tahap pengembangan / verifikasi).',
          en: 'Structural preview of the Asbabalshefaa WooCommerce storefront (In progress / pending verification).',
        },
        imageUrl: '',
        blueprintType: 'ecommerce-catalog',
      },
    ],
    liveUrl: '',
    featuredSpan: 'normal',
  },
  {
    id: 'business-application-system',
    code: 'PROJECT 04',
    title: 'Business Application System',
    categoryLabel: {
      id: 'Business Application & Dashboard',
      en: 'Business Application & Dashboard',
    },
    filterTags: ['Business Applications', 'Dashboard & Automation', 'Experimental Projects'],
    shortDescription: {
      id: 'Eksplorasi pengembangan aplikasi bisnis berbasis Google Apps Script dan Google Sheets untuk pengelolaan data, administrasi, dan operasional.',
      en: 'Exploration of business application systems powered by Google Apps Script and Google Sheets for data, administration, and operations.',
    },
    overview: {
      id: 'Business Application System adalah inisiatif eksplorasi dan pembuatan prototipe sistem aplikasi internal yang memanfaatkan ekosistem Google Apps Script dan Google Sheets untuk otomatisasi administrasi, pengelolaan inventaris, CRM, dan dashboard keuangan.',
      en: 'Business Application System is an exploratory R&D and prototyping initiative leveraging Google Apps Script and Google Sheets to automate administration, inventory tracking, CRM, and financial dashboards.',
    },
    background: {
      id: 'Banyak bisnis dan organisasi membutuhkan sistem pencatatan terstruktur dan dashboard pemantauan operasional tanpa harus membangun infrastruktur server yang rumit dan mahal.',
      en: 'Many growing businesses and organizations need structured data recording and operational dashboards without the overhead of complex, high-cost server infrastructure.',
    },
    challenge: {
      id: 'Mengubah lembaran kerja spreadsheet manual yang rawan kesalahan menjadi antarmuka aplikasi web yang tervalidasi, otomatis, dan menyajikan laporan secara real-time.',
      en: 'Transforming error-prone manual spreadsheets into validated, automated web application interfaces that generate clear real-time management reports.',
    },
    solution: {
      id: 'Merancang arsitektur aplikasi web kustom di atas Google Apps Script yang terhubung langsung dengan struktur database Google Sheets untuk input data terstandar, rekapitulasi otomatis, dan visualisasi metrik bisnis.',
      en: 'Engineered a custom web application layer on top of Google Apps Script connected directly to structured Google Sheets databases for standardized input, automated aggregation, and business metric visualization.',
    },
    features: {
      id: [
        'Antarmuka input data operasional & administrasi tervalidasi',
        'Integrasi dua arah dengan Google Sheets melalui Google Apps Script',
        'Dashboard ringkasan laporan keuangan dan pemantauan aktivitas',
        'Otomasi alur kerja untuk meminimalkan pekerjaan rekapitulasi manual',
      ],
      en: [
        'Validated operational and administrative data entry interface',
        'Bi-directional Google Sheets integration via Google Apps Script',
        'Financial summary dashboard and activity monitoring views',
        'Workflow automation reducing repetitive manual data reconciliation',
      ],
    },
    technologies: ['Google Apps Script', 'Google Sheets', 'JavaScript', 'HTML', 'CSS', 'Dashboard Systems'],
    statusType: 'prototype',
    statusBadge: {
      id: 'Prototype / Experimental',
      en: 'Prototype / Experimental',
    },
    verificationNote: {
      id: 'Eksplorasi prototipe sistem aplikasi bisnis internal — demonstrasi interaktif struktur dashboard tersedia pada pratinjau di bawah.',
      en: 'Internal business application system prototype — interactive dashboard architecture preview available below.',
    },
    previewImage: '',
    screenshots: [
      {
        title: { id: 'Simulasi Antarmuka Dashboard & Otomasi Google Apps Script', en: 'Google Apps Script Dashboard & Automation Interface Blueprint' },
        caption: {
          id: 'Pratinjau arsitektur modul administrasi, pencatatan keuangan, dan sinkronisasi Google Sheets.',
          en: 'Architectural preview of administration modules, financial ledger tracking, and Google Sheets synchronization.',
        },
        imageUrl: '',
        blueprintType: 'apps-script-dashboard',
      },
    ],
    liveUrl: '',
    featuredSpan: 'wide',
  },
];
