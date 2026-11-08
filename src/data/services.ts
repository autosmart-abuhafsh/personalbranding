/**
 * ============================================================================
 * CENTRALIZED PROFESSIONAL SERVICES DATA
 * Pemilik Website: Abu Hafsh Muhammad | Autosmart Digital Solutions
 * ============================================================================
 * Mencakup 11 layanan profesional sesuai PRD Bab 5.4.
 * Setiap layanan terhubung langsung ke formulir diskusi di bagian Contact.
 * ============================================================================
 */

import { BilingualText } from './profile';

export interface ServiceItem {
  id: string;
  index: string;
  title: BilingualText;
  category: 'web' | 'application' | 'data' | 'ai';
  shortDescription: BilingualText;
  capabilities: {
    id: string[];
    en: string[];
  };
  iconName:
    | 'globe'
    | 'layout'
    | 'blocks'
    | 'shopping-bag'
    | 'cpu'
    | 'bar-chart-3'
    | 'workflow'
    | 'users'
    | 'wallet'
    | 'file-spreadsheet'
    | 'sparkles';
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'professional-website',
    index: '01',
    title: {
      id: 'Professional Website Development',
      en: 'Professional Website Development',
    },
    category: 'web',
    shortDescription: {
      id: 'Pengembangan website profil perusahaan, institusi, dan bisnis dengan tampilan modern, kredibel, dan responsif.',
      en: 'Development of company profile, institutional, and business websites with a modern, credible, and responsive design.',
    },
    capabilities: {
      id: [
        'Struktur halaman company profile & informasi bisnis',
        'Desain responsif untuk desktop, tablet, dan smartphone',
        'Optimasi dasar kecepatan & struktur SEO halaman',
      ],
      en: [
        'Company profile & business information architecture',
        'Responsive design across desktop, tablet, and smartphone',
        'Foundational page speed & semantic SEO optimization',
      ],
    },
    iconName: 'globe',
  },
  {
    id: 'landing-page',
    index: '02',
    title: {
      id: 'Landing Page Development',
      en: 'Landing Page Development',
    },
    category: 'web',
    shortDescription: {
      id: 'Pembuatan halaman promosi terfokus untuk kampanye produk, layanan, acara, atau penawaran bisnis.',
      en: 'Focused promotional landing pages engineered for product launches, services, events, or business campaigns.',
    },
    capabilities: {
      id: [
        'Penyusunan alur pesan (copywriting structure) yang terarah',
        'Penempatan tombol konversi (CTA) ke WhatsApp / formulir',
        'Tampilan visual yang ringkas, cepat, dan persuasif',
      ],
      en: [
        'Clear, conversion-oriented messaging hierarchy',
        'Direct CTA integration with WhatsApp or inquiry forms',
        'Fast-loading, high-clarity visual presentation',
      ],
    },
    iconName: 'layout',
  },
  {
    id: 'wordpress-development',
    index: '03',
    title: {
      id: 'WordPress Website Development',
      en: 'WordPress Website Development',
    },
    category: 'web',
    shortDescription: {
      id: 'Pembangunan dan penyesuaian website berbasis CMS WordPress yang mudah dikelola secara mandiri oleh tim Anda.',
      en: 'Custom WordPress CMS website builds tailored for easy, independent content management by your internal team.',
    },
    capabilities: {
      id: [
        'Konfigurasi tema dan plugin sesuai kebutuhan bisnis (termasuk Travel & Umrah)',
        'Kemudahan pembaruan artikel, halaman, dan media',
        'Penataan tata letak UI/UX yang bersih dan profesional',
      ],
      en: [
        'Theme & plugin configuration tailored to business needs (including Travel & Umrah)',
        'Easy publishing workflow for articles, pages, and media',
        'Clean, professional UI/UX layout customization',
      ],
    },
    iconName: 'blocks',
  },
  {
    id: 'ecommerce-website',
    index: '04',
    title: {
      id: 'E-Commerce Website',
      en: 'E-Commerce Website',
    },
    category: 'web',
    shortDescription: {
      id: 'Pengembangan website toko online lengkap dengan katalog produk, keranjang belanja, dan manajemen pesanan.',
      en: 'Online store development complete with structured product catalogs, shopping cart flows, and order management.',
    },
    capabilities: {
      id: [
        'Implementasi toko online berbasis WooCommerce / WordPress',
        'Manajemen kategori produk, variasi, dan stok barang',
        'Alur pemesanan yang terintegrasi dan mudah digunakan pelanggan',
      ],
      en: [
        'WooCommerce / WordPress storefront implementation',
        'Product category, variant, and inventory management',
        'Streamlined customer checkout and order tracking flow',
      ],
    },
    iconName: 'shopping-bag',
  },
  {
    id: 'custom-business-web-app',
    index: '05',
    title: {
      id: 'Custom Business Web Application',
      en: 'Custom Business Web Application',
    },
    category: 'application',
    shortDescription: {
      id: 'Pengembangan aplikasi berbasis web yang dirancang khusus mengikuti alur kerja dan kebutuhan operasional bisnis.',
      en: 'Bespoke web-based applications engineered specifically around your operational workflows and business rules.',
    },
    capabilities: {
      id: [
        'Formulir input data terstruktur dan pencatatan aktivitas',
        'Sistem manajemen operasional internal berbasis browser',
        'Penyesuaian modul sesuai proses unik organisasi',
      ],
      en: [
        'Structured data input forms and activity logging',
        'Browser-based internal operational management modules',
        'Custom workflows tailored to unique organizational processes',
      ],
    },
    iconName: 'cpu',
  },
  {
    id: 'admin-dashboard',
    index: '06',
    title: {
      id: 'Admin Dashboard Development',
      en: 'Admin Dashboard Development',
    },
    category: 'application',
    shortDescription: {
      id: 'Perancangan antarmuka dashboard manajemen untuk memantau data operasional, ringkasan kinerja, dan administrasi.',
      en: 'Management dashboard interfaces designed to monitor operational data, performance summaries, and administration.',
    },
    capabilities: {
      id: [
        'Visualisasi metrik utama dan tabel data interaktif',
        'Filter laporan berdasarkan periode, kategori, atau status',
        'Tampilan panel kontrol yang rapi dan mudah dipahami',
      ],
      en: [
        'Key metric visualization and interactive data tables',
        'Report filtering by period, category, or operational status',
        'Clean, high-legibility control panel architecture',
      ],
    },
    iconName: 'bar-chart-3',
  },
  {
    id: 'business-process-automation',
    index: '07',
    title: {
      id: 'Business Process Automation',
      en: 'Business Process Automation',
    },
    category: 'application',
    shortDescription: {
      id: 'Otomatisasi tugas administrasi dan alur kerja berulang agar tim dapat bekerja lebih cepat dan minim kesalahan.',
      en: 'Automating repetitive administrative tasks and operational workflows so teams work faster with fewer manual errors.',
    },
    capabilities: {
      id: [
        'Otomasi pengolahan data dan pembuatan dokumen/laporan',
        'Sinkronisasi data antar formulir dan pusat penyimpanan',
        'Pengurangan waktu rekapitulasi manual harian/bulanan',
      ],
      en: [
        'Automated data processing and document/report generation',
        'Data synchronization across forms and central sheets',
        'Significant reduction in manual daily/monthly reconciliation',
      ],
    },
    iconName: 'workflow',
  },
  {
    id: 'crm-management-systems',
    index: '08',
    title: {
      id: 'CRM & Management Systems',
      en: 'CRM & Management Systems',
    },
    category: 'application',
    shortDescription: {
      id: 'Sistem pengelolaan data pelanggan (CRM), inventaris, maupun administrasi SDM (HRIS) yang terpusat.',
      en: 'Centralized systems for managing customer relationships (CRM), inventory tracking, or HR administration (HRIS).',
    },
    capabilities: {
      id: [
        'Pencatatan database klien, riwayat interaksi, dan tindak lanjut',
        'Pemantauan stok barang masuk/keluar (Inventory Management)',
        'Pengelolaan data administrasi tim dan operasional',
      ],
      en: [
        'Client database logging, interaction history, and follow-ups',
        'Inbound/outbound stock tracking (Inventory Management)',
        'Structured team and operational administration records',
      ],
    },
    iconName: 'users',
  },
  {
    id: 'financial-management-dashboard',
    index: '09',
    title: {
      id: 'Financial Management Dashboard',
      en: 'Financial Management Dashboard',
    },
    category: 'data',
    shortDescription: {
      id: 'Alat bantu digital untuk pencatatan arus kas, pemantauan anggaran, dan penyajian laporan keuangan bisnis.',
      en: 'Digital tools for cash-flow recording, budget monitoring, and clear business financial reporting.',
    },
    capabilities: {
      id: [
        'Rekapitulasi pemasukan, pengeluaran, dan saldo kas',
        'Analisis kategori biaya dan tren keuangan bulanan',
        'Penyajian grafik dan tabel laporan yang mudah dibaca pimpinan',
      ],
      en: [
        'Income, expense, and cash balance reconciliation',
        'Cost category breakdown and monthly financial trend analysis',
        'Executive-ready charts and structured financial tables',
      ],
    },
    iconName: 'wallet',
  },
  {
    id: 'google-sheets-apps-script',
    index: '10',
    title: {
      id: 'Google Sheets & Apps Script Integration',
      en: 'Google Sheets & Apps Script Integration',
    },
    category: 'data',
    shortDescription: {
      id: 'Pengembangan skrip kustom dan sistem terintegrasi di dalam ekosistem Google Sheets & Google Workspace.',
      en: 'Custom scripting and integrated operational systems built directly within Google Sheets and Google Workspace.',
    },
    capabilities: {
      id: [
        'Pembuatan Web App kustom dengan database Google Sheets',
        'Formula lanjutan, validasi data, dan skrip otomatisasi Apps Script',
        'Solusi sistem bisnis hemat biaya dan mudah diakses dari mana saja',
      ],
      en: [
        'Custom Web Apps backed by Google Sheets databases',
        'Advanced formulas, data validation, and Apps Script automation',
        'Cost-effective cloud business systems accessible anywhere',
      ],
    },
    iconName: 'file-spreadsheet',
  },
  {
    id: 'ai-integration-business',
    index: '11',
    title: {
      id: 'AI Integration for Business',
      en: 'AI Integration for Business',
    },
    category: 'ai',
    shortDescription: {
      id: 'Eksplorasi dan penerapan teknologi AI (seperti Gemini AI & Google AI Studio) untuk mendukung produktivitas kerja.',
      en: 'Exploration and implementation of AI tools (such as Gemini AI & Google AI Studio) to boost business productivity.',
    },
    capabilities: {
      id: [
        'Perancangan alur kerja berbantuan AI (AI Business Workflow)',
        'Penyusunan sistem Prompt Engineering untuk kebutuhan tim',
        'Eksplorasi prototipe aplikasi cerdas dengan Google AI Studio',
      ],
      en: [
        'AI-assisted business workflow design',
        'Structured prompt engineering frameworks for internal teams',
        'Smart application prototyping with Google AI Studio',
      ],
    },
    iconName: 'sparkles',
  },
];
