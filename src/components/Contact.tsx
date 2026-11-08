import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Database,
  Loader2,
  Mail,
  MessageSquare,
  Settings2,
} from 'lucide-react';
import {
  CONTACT_CONFIG,
  ContactConfig,
  Language,
} from '../data/profile';
import { SERVICES_DATA } from '../data/services';
import {
  AppsScriptSubmitResult,
  buildContactDispatch,
  ContactFormInput,
  isConfiguredContactValue,
  isValidAppsScriptUrl,
  submitToAppsScript,
  validateContactForm,
} from '../utils/portfolioLogic';

interface ContactProps {
  lang: Language;
  preselectedService: string;
}

const APPS_SCRIPT_CODE_SNIPPET = `const SHEET_NAME = 'Inquiries';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = doc.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp (WIB)', 'Nama Lengkap', 'Email', 'Kategori Layanan',
        'Subjek Proyek', 'Rincian Kebutuhan / Pesan', 'Bahasa Form', 'Sumber', 'Status'
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }
    const data = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : e.parameter;
    const timestamp = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
    sheet.appendRow([
      timestamp, data.fullName || '-', data.email || '-', data.category || '-',
      data.subject || '-', data.message || '-', data.language || 'id', data.source || 'Vercel Portfolio', 'Baru Masuk'
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`;

const STORAGE_KEY = 'autosmart_contact_config_v1';

export const Contact: React.FC<ContactProps> = React.memo(({
  lang,
  preselectedService,
}) => {
  const [formState, setFormState] = useState<ContactFormInput>({
    fullName: '',
    email: '',
    subject: '',
    category: SERVICES_DATA[0].title.en,
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appsScriptResult, setAppsScriptResult] = useState<AppsScriptSubmitResult | null>(null);
  const [preparedDispatch, setPreparedDispatch] = useState<ReturnType<
    typeof buildContactDispatch
  > | null>(null);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [copiedScriptCode, setCopiedScriptCode] = useState(false);

  const [showOwnerConfigDrawer, setShowOwnerConfigDrawer] = useState(false);
  const [showAppsScriptGuide, setShowAppsScriptGuide] = useState(false);

  const [liveContactConfig, setLiveContactConfig] = useState<ContactConfig>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ContactConfig>;
        return {
          WHATSAPP_NUMBER: isConfiguredContactValue(parsed.WHATSAPP_NUMBER)
            ? parsed.WHATSAPP_NUMBER!
            : CONTACT_CONFIG.WHATSAPP_NUMBER,
          EMAIL_ADDRESS: isConfiguredContactValue(parsed.EMAIL_ADDRESS)
            ? parsed.EMAIL_ADDRESS!
            : CONTACT_CONFIG.EMAIL_ADDRESS,
          GITHUB_URL: isConfiguredContactValue(parsed.GITHUB_URL)
            ? parsed.GITHUB_URL!
            : CONTACT_CONFIG.GITHUB_URL,
          INSTAGRAM_URL: isConfiguredContactValue(parsed.INSTAGRAM_URL)
            ? parsed.INSTAGRAM_URL!
            : CONTACT_CONFIG.INSTAGRAM_URL,
          LINKEDIN_URL: isConfiguredContactValue(parsed.LINKEDIN_URL)
            ? parsed.LINKEDIN_URL!
            : CONTACT_CONFIG.LINKEDIN_URL,
          APPS_SCRIPT_WEBHOOK_URL: isConfiguredContactValue(parsed.APPS_SCRIPT_WEBHOOK_URL)
            ? parsed.APPS_SCRIPT_WEBHOOK_URL!
            : CONTACT_CONFIG.APPS_SCRIPT_WEBHOOK_URL,
        };
      }
    } catch {
      // ignore storage errors
    }
    return CONTACT_CONFIG;
  });

  const updateLiveConfig = (patch: Partial<ContactConfig>) => {
    setLiveContactConfig((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  useEffect(() => {
    if (preselectedService) {
      setFormState((prev) => ({
        ...prev,
        category: preselectedService,
        subject:
          prev.subject ||
          (lang === 'id'
            ? `Diskusi Layanan: ${preselectedService}`
            : `Service Inquiry: ${preselectedService}`),
      }));
    }
  }, [preselectedService, lang]);

  const handleFieldChange = (
    field: keyof ContactFormInput,
    value: string,
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setPreparedDispatch(null);
    setAppsScriptResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formState, lang);
    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedDispatch(null);
      setAppsScriptResult(null);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const dispatchData = buildContactDispatch(formState, liveContactConfig, lang);
    const dbResult = await submitToAppsScript(
      liveContactConfig.APPS_SCRIPT_WEBHOOK_URL,
      formState,
      lang,
    );

    setIsSubmitting(false);
    setAppsScriptResult(dbResult);
    setPreparedDispatch(dispatchData);
  };

  const handleCopyBrief = async () => {
    if (!preparedDispatch) return;
    try {
      await navigator.clipboard.writeText(preparedDispatch.formattedBrief);
      setCopiedBrief(true);
      window.setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      setCopiedBrief(false);
    }
  };

  const handleCopyScriptCode = async () => {
    try {
      await navigator.clipboard.writeText(APPS_SCRIPT_CODE_SNIPPET);
      setCopiedScriptCode(true);
      window.setTimeout(() => setCopiedScriptCode(false), 2500);
    } catch {
      setCopiedScriptCode(false);
    }
  };

  const hasValidWebhook = isValidAppsScriptUrl(liveContactConfig.APPS_SCRIPT_WEBHOOK_URL);

  const configuredChannels = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      value: liveContactConfig.WHATSAPP_NUMBER,
      href: `https://wa.me/${liveContactConfig.WHATSAPP_NUMBER.replace(/[^\d]/g, '')}`,
      isReady: isConfiguredContactValue(liveContactConfig.WHATSAPP_NUMBER),
    },
    {
      id: 'email',
      label: 'Email',
      value: liveContactConfig.EMAIL_ADDRESS,
      href: `mailto:${liveContactConfig.EMAIL_ADDRESS}`,
      isReady: isConfiguredContactValue(liveContactConfig.EMAIL_ADDRESS),
    },
    {
      id: 'github',
      label: 'GitHub',
      value: liveContactConfig.GITHUB_URL,
      href: liveContactConfig.GITHUB_URL,
      isReady: isConfiguredContactValue(liveContactConfig.GITHUB_URL),
    },
    {
      id: 'instagram',
      label: 'Instagram',
      value: liveContactConfig.INSTAGRAM_URL,
      href: liveContactConfig.INSTAGRAM_URL,
      isReady: isConfiguredContactValue(liveContactConfig.INSTAGRAM_URL),
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: liveContactConfig.LINKEDIN_URL,
      href: liveContactConfig.LINKEDIN_URL,
      isReady: isConfiguredContactValue(liveContactConfig.LINKEDIN_URL),
    },
  ].filter((ch) => ch.isReady);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-perf py-20 lg:py-28 border-b border-white/10 bg-[#0A1020] bg-command-grid"
    >
      <div className="mx-auto max-w-[1280px] px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <p className="font-mono-tech text-xs tracking-wider text-[#D5B47A]">
            08 · {lang === 'id' ? 'DISKUSI, DATABASE APPS SCRIPT & KOLABORASI' : "LET'S BUILD SOMETHING GREAT"}
          </p>
          <h2
            id="contact-heading"
            className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F4F5] [text-wrap:balance]"
          >
            Have a Project in Mind?
          </h2>
          <p className="text-base text-[#A5ADBD] leading-relaxed">
            {lang === 'id'
              ? 'Setiap bisnis dan organisasi memiliki kebutuhan digital yang berbeda. Saat formulir dikirim, data proyek Anda otomatis tersimpan ke database Google Apps Script / Google Sheets serta siap diteruskan via WhatsApp atau Email.'
              : 'Every business and organization has distinct digital requirements. Submitting this form automatically saves your inquiry to the Google Apps Script / Google Sheets database and prepares direct WhatsApp or Email dispatch.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Direct Channels, Apps Script Status & Setup Guide */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#111A2E]/80 p-7 space-y-6">
              <div className="space-y-2">
                <p className="font-mono-tech text-xs text-[#D5B47A]">
                  AUTOSMART DIGITAL SOLUTIONS
                </p>
                <h3 className="font-display text-xl font-bold text-[#F4F4F5]">
                  {lang === 'id'
                    ? 'Integrasi Database Google Apps Script & Kontak'
                    : 'Google Apps Script Database & Direct Channels'}
                </h3>
                <p className="text-xs leading-relaxed text-[#A5ADBD]">
                  {lang === 'id'
                    ? 'Formulir di samping terintegrasi dengan webhook Google Apps Script (doPost) agar setiap data pelanggan otomatis tercatat ke Google Sheets tanpa perlu server tambahan di Vercel.'
                    : 'The inquiry form is wired to a Google Apps Script webhook (doPost) so every client submission is automatically logged into Google Sheets on Vercel.'}
                </p>
              </div>

              {/* Apps Script Connection Indicator */}
              <div className="rounded-xl border border-white/10 bg-[#0A1020] p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4F4F5]">
                    <Database className="h-3.5 w-3.5 text-[#D5B47A]" />
                    <span>
                      {lang === 'id'
                        ? 'Database Google Apps Script'
                        : 'Google Apps Script Database'}
                    </span>
                  </span>
                  <span className="font-mono-tech text-[11px] text-[#D5B47A]">
                    {hasValidWebhook
                      ? lang === 'id'
                        ? 'ENDPOINT TERHUBUNG'
                        : 'WEBHOOK CONNECTED'
                      : lang === 'id'
                        ? 'SIAP DIHUBUNGKAN'
                        : 'READY TO CONNECT'}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[#A5ADBD]">
                  {hasValidWebhook
                    ? lang === 'id'
                      ? 'URL Web App Apps Script aktif. Setiap kiriman formulir akan langsung tersimpan otomatis ke Google Sheets Anda.'
                      : 'Apps Script Web App URL is active. Every form submission is automatically saved to your Google Sheet.'
                    : lang === 'id'
                      ? 'Masukkan URL Web App Apps Script (/exec) pada tombol konfigurasi di bawah, di src/data/profile.ts, atau via VITE_APPS_SCRIPT_WEBHOOK_URL di Vercel.'
                      : 'Set your Apps Script Web App URL (/exec) below, in src/data/profile.ts, or via VITE_APPS_SCRIPT_WEBHOOK_URL in Vercel.'}
                </p>
              </div>

              {/* Render Active Channels Only When Configured */}
              {configuredChannels.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <p className="font-mono-tech text-[11px] text-[#D5B47A]">
                    {lang === 'id' ? 'KONTAK AKTIF TERVERIFIKASI' : 'VERIFIED ACTIVE CHANNELS'}
                  </p>
                  {configuredChannels.map((ch) => (
                    <a
                      key={ch.id}
                      href={ch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0A1020] px-4 py-3 text-xs font-medium text-[#F4F4F5] hover:border-[#D5B47A] transition-colors"
                    >
                      <span>{ch.label}</span>
                      <span className="font-mono-tech text-[#D5B47A] truncate max-w-[200px]">
                        {ch.value}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {/* Owner Configuration & Apps Script Guide Controls */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowOwnerConfigDrawer((prev) => !prev)}
                    aria-expanded={showOwnerConfigDrawer}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#0A1020] px-3 py-2 text-xs font-medium text-[#D5B47A] hover:border-[#D5B47A] transition-colors"
                  >
                    <Settings2 className="h-3.5 w-3.5" />
                    <span>
                      {lang === 'id'
                        ? 'Atur URL Apps Script & Kontak'
                        : 'Configure Apps Script URL & Contacts'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAppsScriptGuide((prev) => !prev)}
                    aria-expanded={showAppsScriptGuide}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#0A1020] px-3 py-2 text-xs font-medium text-[#F4F4F5] hover:border-[#D5B47A] transition-colors"
                  >
                    <Code2 className="h-3.5 w-3.5 text-[#D5B47A]" />
                    <span>
                      {lang === 'id'
                        ? 'Lihat Kode Apps Script & Panduan Vercel'
                        : 'View Apps Script Code & Vercel Guide'}
                    </span>
                  </button>
                </div>

                {showOwnerConfigDrawer && (
                  <div className="space-y-3 rounded-xl border border-[#D5B47A]/30 bg-[#0A1020] p-4">
                    <p className="text-[11px] text-[#A5ADBD]">
                      {lang === 'id'
                        ? 'Tempel URL Web App Google Apps Script (/exec) serta kontak aktif Anda untuk menguji penyimpanan otomatis:'
                        : 'Paste your Google Apps Script Web App URL (/exec) and active contacts to test automatic database saving:'}
                    </p>
                    <div>
                      <label
                        htmlFor="sim-apps-script"
                        className="block text-[11px] font-mono-tech text-[#D5B47A] mb-1"
                      >
                        APPS_SCRIPT_WEBHOOK_URL (URL /exec)
                      </label>
                      <input
                        id="sim-apps-script"
                        type="url"
                        value={liveContactConfig.APPS_SCRIPT_WEBHOOK_URL}
                        onChange={(e) =>
                          updateLiveConfig({ APPS_SCRIPT_WEBHOOK_URL: e.target.value })
                        }
                        placeholder="https://script.google.com/macros/s/.../exec"
                        className="w-full rounded-lg border border-white/15 bg-[#111A2E] px-3 py-1.5 text-xs text-[#F4F4F5]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sim-whatsapp"
                        className="block text-[11px] font-mono-tech text-[#D5B47A] mb-1"
                      >
                        WHATSAPP_NUMBER
                      </label>
                      <input
                        id="sim-whatsapp"
                        type="text"
                        value={liveContactConfig.WHATSAPP_NUMBER}
                        onChange={(e) =>
                          updateLiveConfig({ WHATSAPP_NUMBER: e.target.value })
                        }
                        placeholder="6281234567890"
                        className="w-full rounded-lg border border-white/15 bg-[#111A2E] px-3 py-1.5 text-xs text-[#F4F4F5]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sim-email"
                        className="block text-[11px] font-mono-tech text-[#D5B47A] mb-1"
                      >
                        EMAIL_ADDRESS
                      </label>
                      <input
                        id="sim-email"
                        type="text"
                        value={liveContactConfig.EMAIL_ADDRESS}
                        onChange={(e) =>
                          updateLiveConfig({ EMAIL_ADDRESS: e.target.value })
                        }
                        placeholder="contact@autosmartdigital.com"
                        className="w-full rounded-lg border border-white/15 bg-[#111A2E] px-3 py-1.5 text-xs text-[#F4F4F5]"
                      />
                    </div>
                  </div>
                )}

                {showAppsScriptGuide && (
                  <div className="space-y-3 rounded-xl border border-[#D5B47A]/35 bg-[#0A1020] p-4 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-display font-semibold text-[#D5B47A]">
                        {lang === 'id'
                          ? 'Kode Google Apps Script (File: /google-apps-script/Code.gs)'
                          : 'Google Apps Script Code (/google-apps-script/Code.gs)'}
                      </p>
                      <button
                        type="button"
                        onClick={handleCopyScriptCode}
                        className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-[#111A2E] px-2.5 py-1 text-[11px] text-[#F4F4F5] hover:border-[#D5B47A]"
                      >
                        {copiedScriptCode ? (
                          <>
                            <Check className="h-3 w-3 text-[#D5B47A]" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-[#D5B47A]" />
                            <span>Salin Code.gs</span>
                          </>
                        )}
                      </button>
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-[11px] text-[#A5ADBD]">
                      <li>Buka Google Sheets baru &rarr; klik menu <strong>Extensions &gt; Apps Script</strong>.</li>
                      <li>Tempel kode di bawah, lalu klik <strong>Deploy &gt; New deployment &gt; Web app</strong>.</li>
                      <li>Pilih <em>Execute as: Me</em> dan <em>Who has access: Anyone</em>, lalu salin URL <code>/exec</code>.</li>
                      <li>Untuk <strong>GitHub Pages</strong> (<code>autosmart-abuhafsh/profileabuhafsh</code>): di <strong>Settings &gt; Pages</strong>, ubah folder di sebelah branch <code>main</code> dari <code>/ (root)</code> menjadi <strong><code>/docs</code></strong> lalu klik <strong>Save</strong> (atau ubah Source ke <strong>GitHub Actions</strong>).</li>
                      <li>Untuk publish ke <strong>Vercel.app</strong>: file <code>vercel.json</code> sudah disiapkan. Hubungkan repo GitHub ke Vercel dan isi Environment Variable <code>VITE_APPS_SCRIPT_WEBHOOK_URL</code> dengan URL <code>/exec</code> Anda.</li>
                    </ol>
                    <pre className="max-h-44 overflow-y-auto rounded-lg border border-white/10 bg-[#111A2E] p-3 text-[10px] text-[#F4F4F5]/90 font-mono-tech">
                      {APPS_SCRIPT_CODE_SNIPPET}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact & Apps Script Auto-Save Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-white/10 bg-[#111A2E]/80 p-7 sm:p-9 space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="contact-fullname"
                    className="block text-xs font-medium text-[#F4F4F5] mb-2"
                  >
                    {lang === 'id' ? 'Nama Lengkap' : 'Full Name'} *
                  </label>
                  <input
                    id="contact-fullname"
                    type="text"
                    value={formState.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    placeholder={lang === 'id' ? 'Nama Anda atau Perusahaan' : 'Your Name or Company'}
                    className="w-full rounded-xl border border-white/15 bg-[#0A1020] px-4 py-3 text-sm text-[#F4F4F5] placeholder-[#A5ADBD]/50 focus:border-[#D5B47A] focus:outline-none"
                  />
                  {errors.fullName && (
                    <p role="alert" className="mt-1.5 text-xs text-rose-400">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-[#F4F4F5] mb-2"
                  >
                    {lang === 'id' ? 'Alamat Email' : 'Email Address'} *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="nama@perusahaan.com"
                    className="w-full rounded-xl border border-white/15 bg-[#0A1020] px-4 py-3 text-sm text-[#F4F4F5] placeholder-[#A5ADBD]/50 focus:border-[#D5B47A] focus:outline-none"
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1.5 text-xs text-rose-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Project Category */}
                <div>
                  <label
                    htmlFor="contact-category"
                    className="block text-xs font-medium text-[#F4F4F5] mb-2"
                  >
                    {lang === 'id' ? 'Kategori Proyek / Layanan' : 'Project Category'} *
                  </label>
                  <select
                    id="contact-category"
                    value={formState.category}
                    onChange={(e) => handleFieldChange('category', e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-[#0A1020] px-4 py-3 text-sm text-[#F4F4F5] focus:border-[#D5B47A] focus:outline-none"
                  >
                    {SERVICES_DATA.map((service) => (
                      <option key={service.id} value={service.title.en}>
                        {service.title[lang]}
                      </option>
                    ))}
                    <option value="General Collaboration & Digital Learning">
                      {lang === 'id'
                        ? 'Kolaborasi Umum & Pembelajaran Digital'
                        : 'General Collaboration & Digital Learning'}
                    </option>
                  </select>
                  {errors.category && (
                    <p role="alert" className="mt-1.5 text-xs text-rose-400">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-[#F4F4F5] mb-2"
                  >
                    {lang === 'id' ? 'Subjek Proyek' : 'Subject'} *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formState.subject}
                    onChange={(e) => handleFieldChange('subject', e.target.value)}
                    placeholder={
                      lang === 'id'
                        ? 'Contoh: Pembuatan Website & Dashboard'
                        : 'e.g. Website & Management Dashboard Build'
                    }
                    className="w-full rounded-xl border border-white/15 bg-[#0A1020] px-4 py-3 text-sm text-[#F4F4F5] placeholder-[#A5ADBD]/50 focus:border-[#D5B47A] focus:outline-none"
                  />
                  {errors.subject && (
                    <p role="alert" className="mt-1.5 text-xs text-rose-400">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[#F4F4F5] mb-2"
                >
                  {lang === 'id' ? 'Rincian Kebutuhan Proyek' : 'Project Details & Message'} *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  placeholder={
                    lang === 'id'
                      ? 'Ceritakan tujuan proyek, fitur utama yang dibutuhkan, atau rencana kolaborasi Anda...'
                      : 'Describe your project goals, core features needed, or collaboration plans...'
                  }
                  className="w-full rounded-xl border border-white/15 bg-[#0A1020] px-4 py-3 text-sm text-[#F4F4F5] placeholder-[#A5ADBD]/50 focus:border-[#D5B47A] focus:outline-none"
                />
                {errors.message && (
                  <p role="alert" className="mt-1.5 text-xs text-rose-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-xs text-[#A5ADBD]">
                  {lang === 'id'
                    ? 'Otomatis menyimpan ke Google Apps Script (jika terhubung) & menyiapkan pengiriman WhatsApp/Email.'
                    : 'Automatically saves to Google Apps Script (when connected) & prepares WhatsApp/Email dispatch.'}
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#78263F] px-6 py-3.5 text-xs font-semibold text-[#F4F4F5] border border-[#D5B47A]/40 hover:bg-[#8e2d4b] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-[#D5B47A]" />
                      <span>
                        {lang === 'id'
                          ? 'Menyimpan ke Apps Script...'
                          : 'Saving to Apps Script...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{lang === 'id' ? 'Send Message / Kirim & Simpan' : 'Send Message'}</span>
                      <ArrowUpRight className="h-4 w-4 text-[#D5B47A]" />
                    </>
                  )}
                </button>
              </div>

              {/* Apps Script Database Result + Functional Dispatch Panel */}
              {preparedDispatch && appsScriptResult && (
                <div
                  data-testid="contact-dispatch-panel"
                  className="mt-6 rounded-xl border border-[#D5B47A]/45 bg-[#0A1020] p-5 space-y-4"
                >
                  {/* Database Save Status Banner */}
                  {appsScriptResult.status === 'saved_to_apps_script' ? (
                    <div className="rounded-lg border border-emerald-500/35 bg-emerald-950/30 p-3.5 text-xs text-emerald-200 space-y-1">
                      <p className="font-semibold">
                        {lang === 'id'
                          ? '✓ Data Berhasil Tersimpan Otomatis di Database Google Apps Script (Google Sheets)'
                          : '✓ Inquiry Automatically Saved to Google Apps Script Database (Google Sheets)'}
                      </p>
                      <p className="text-[11px] text-emerald-300/80">
                        {lang === 'id'
                          ? 'Data Anda telah tercatat di spreadsheet. Anda juga dapat meneruskan salinan pesan langsung melalui WhatsApp atau Email di bawah ini.'
                          : 'Your details have been recorded in the spreadsheet. You can also forward a direct message via WhatsApp or Email below.'}
                      </p>
                    </div>
                  ) : appsScriptResult.status === 'unconfigured_webhook' ? (
                    <div className="rounded-lg border border-[#D5B47A]/35 bg-[#111A2E] p-3.5 text-xs text-[#F4F4F5] space-y-1">
                      <p className="font-semibold text-[#D5B47A]">
                        {lang === 'id'
                          ? 'Format Data Apps Script Siap · Menunggu URL Web App (/exec)'
                          : 'Apps Script Payload Ready · Awaiting Web App URL (/exec)'}
                      </p>
                      <p className="text-[11px] text-[#A5ADBD]">
                        {lang === 'id'
                          ? 'Begitu pemilik mengisi URL Web App Apps Script (di src/data/profile.ts, Environment Variable VITE_APPS_SCRIPT_WEBHOOK_URL di Vercel, atau tombol "Atur URL Apps Script" di kiri), data pelanggan akan otomatis masuk ke Google Sheets.'
                          : 'Once the owner sets the Apps Script Web App URL, customer submissions are automatically appended to Google Sheets.'}
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-rose-500/35 bg-rose-950/30 p-3.5 text-xs text-rose-200 space-y-1">
                      <p className="font-semibold">
                        {lang === 'id'
                          ? `Gagal menghubungi URL Apps Script (${appsScriptResult.errorMessage || 'Network Error'})`
                          : `Could not reach Apps Script URL (${appsScriptResult.errorMessage || 'Network Error'})`}
                      </p>
                      <p className="text-[11px] text-rose-300/80">
                        {lang === 'id'
                          ? 'Pastikan URL berakhiran /exec dan akses Web App diatur ke "Anyone". Silakan gunakan tombol Email atau WhatsApp di bawah untuk mengirim pesan langsung.'
                          : 'Ensure the Web App URL ends with /exec and access is set to "Anyone". Please use the Email or WhatsApp buttons below.'}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-display text-sm font-semibold text-[#D5B47A]">
                      {lang === 'id'
                        ? 'Ringkasan Data & Tindak Lanjut Langsung'
                        : 'Payload Summary & Direct Follow-up'}
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#111A2E] px-3 py-1.5 text-xs font-medium text-[#F4F4F5] hover:border-[#D5B47A]"
                    >
                      {copiedBrief ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#D5B47A]" />
                          <span>{lang === 'id' ? 'Tersalin' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-[#D5B47A]" />
                          <span>{lang === 'id' ? 'Salin Teks Brief' : 'Copy Brief Text'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="whitespace-pre-wrap rounded-lg border border-white/10 bg-[#111A2E]/80 p-3.5 text-xs text-[#F4F4F5]/90 font-mono-tech">
                    {preparedDispatch.formattedBrief}
                  </pre>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={preparedDispatch.mailtoUrl}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#78263F] px-4 py-2.5 text-xs font-semibold text-[#F4F4F5] border border-[#D5B47A]/40 hover:bg-[#8e2d4b] transition-colors"
                    >
                      <Mail className="h-4 w-4 text-[#D5B47A]" />
                      <span>
                        {lang === 'id' ? 'Buka di Aplikasi Email (mailto)' : 'Open in Email Client (mailto)'}
                      </span>
                    </a>

                    {preparedDispatch.whatsappUrl ? (
                      <a
                        href={preparedDispatch.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#D5B47A]/45 bg-[#111A2E] px-4 py-2.5 text-xs font-semibold text-[#F4F4F5] hover:border-[#D5B47A] transition-colors"
                      >
                        <MessageSquare className="h-4 w-4 text-[#D5B47A]" />
                        <span>
                          {lang === 'id' ? 'Kirim via WhatsApp' : 'Send via WhatsApp'}
                        </span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-[#A5ADBD]">
                        {lang === 'id'
                          ? 'Tip: Isi WHATSAPP_NUMBER pada tombol "Atur URL Apps Script & Kontak" di kiri atau src/data/profile.ts untuk mengaktifkan WhatsApp.'
                          : 'Tip: Set WHATSAPP_NUMBER in src/data/profile.ts to activate direct WhatsApp dispatch.'}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});
