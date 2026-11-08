import { ContactConfig, Language } from '../data/profile';
import { ProjectCategoryFilter, ProjectItem } from '../data/projects';

export interface ContactFormInput {
  fullName: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

/**
 * Checks whether a contact configuration value has been replaced by the owner
 * and is not an unconfigured placeholder ("GANTI_DENGAN_*").
 */
export function isConfiguredContactValue(value: string | undefined | null): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (trimmed.length === 0) return false;
  if (trimmed.toUpperCase().startsWith('GANTI_DENGAN_')) return false;
  return true;
}

/**
 * Normalizes a WhatsApp phone number to digits only (e.g., "+62 812-3456" -> "628123456")
 */
export function sanitizeWhatsAppNumber(raw: string): string {
  if (!isConfiguredContactValue(raw)) return '';
  const digits = raw.replace(/[^\d]/g, '');
  if (digits.startsWith('08')) {
    return '62' + digits.slice(1);
  }
  return digits;
}

/**
 * Filters projects by category selection.
 */
export function filterProjectsByCategory(
  projects: ProjectItem[],
  category: ProjectCategoryFilter,
): ProjectItem[] {
  if (category === 'All Projects') {
    return projects;
  }
  return projects.filter((project) => project.filterTags.includes(category));
}

/**
 * Validates the contact form fields strictly without substituting fake values.
 */
export function validateContactForm(
  input: ContactFormInput,
  lang: Language = 'id',
): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName =
      lang === 'id'
        ? 'Mohon isi nama lengkap Anda (minimal 2 karakter).'
        : 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email =
      lang === 'id'
        ? 'Mohon masukkan alamat email yang valid.'
        : 'Please enter a valid email address.';
  }

  if (!input.subject || input.subject.trim().length < 3) {
    errors.subject =
      lang === 'id'
        ? 'Mohon isi subjek pesan (minimal 3 karakter).'
        : 'Please enter a subject (at least 3 characters).';
  }

  if (!input.category || input.category.trim().length === 0) {
    errors.category =
      lang === 'id'
        ? 'Mohon pilih kategori proyek atau layanan.'
        : 'Please select a project or service category.';
  }

  if (!input.message || input.message.trim().length < 10) {
    errors.message =
      lang === 'id'
        ? 'Mohon jelaskan kebutuhan proyek Anda (minimal 10 karakter).'
        : 'Please describe your project needs (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds structured brief text and real mailto / WhatsApp URLs.
 */
export function buildContactDispatch(
  input: ContactFormInput,
  config: ContactConfig,
  lang: Language = 'id',
): {
  formattedBrief: string;
  mailtoUrl: string;
  whatsappUrl: string | null;
  hasConfiguredEmail: boolean;
  hasConfiguredWhatsApp: boolean;
} {
  const cleanName = input.fullName.trim();
  const cleanEmail = input.email.trim();
  const cleanSubject = input.subject.trim();
  const cleanCategory = input.category.trim();
  const cleanMessage = input.message.trim();

  const formattedBrief =
    lang === 'id'
      ? [
          `Halo Abu Hafsh Muhammad (Autosmart Digital Solutions),`,
          ``,
          `Saya ingin mendiskusikan rencana proyek / kolaborasi dengan rincian berikut:`,
          `• Nama: ${cleanName}`,
          `• Email: ${cleanEmail}`,
          `• Kategori Layanan: ${cleanCategory}`,
          `• Subjek: ${cleanSubject}`,
          ``,
          `Detail Kebutuhan:`,
          `${cleanMessage}`,
        ].join('\n')
      : [
          `Hello Abu Hafsh Muhammad (Autosmart Digital Solutions),`,
          ``,
          `I would like to discuss a project / collaboration with the following details:`,
          `• Name: ${cleanName}`,
          `• Email: ${cleanEmail}`,
          `• Service Category: ${cleanCategory}`,
          `• Subject: ${cleanSubject}`,
          ``,
          `Project Brief:`,
          `${cleanMessage}`,
        ].join('\n');

  const hasConfiguredEmail = isConfiguredContactValue(config.EMAIL_ADDRESS);
  const targetEmail = hasConfiguredEmail ? config.EMAIL_ADDRESS.trim() : '';
  const mailSubject = encodeURIComponent(`[Autosmart Inquiry - ${cleanCategory}] ${cleanSubject}`);
  const mailBody = encodeURIComponent(formattedBrief);
  const mailtoUrl = `mailto:${targetEmail}?subject=${mailSubject}&body=${mailBody}`;

  const sanitizedWa = sanitizeWhatsAppNumber(config.WHATSAPP_NUMBER);
  const hasConfiguredWhatsApp = sanitizedWa.length >= 8;
  const whatsappUrl = hasConfiguredWhatsApp
    ? `https://wa.me/${sanitizedWa}?text=${encodeURIComponent(formattedBrief)}`
    : null;

  return {
    formattedBrief,
    mailtoUrl,
    whatsappUrl,
    hasConfiguredEmail,
    hasConfiguredWhatsApp,
  };
}

export interface AppsScriptSubmissionPayload {
  timestamp: string;
  fullName: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  language: Language;
  source: string;
}

export interface AppsScriptSubmitResult {
  status: 'saved_to_apps_script' | 'unconfigured_webhook' | 'network_error';
  payload: AppsScriptSubmissionPayload;
  errorMessage?: string;
}

const DEFAULT_OWNER_APPS_SCRIPT_EXEC_URL =
  'https://script.google.com/macros/s/AKfycbwlSjHIRrchWHLk88nplEg0ba52c1r0MSkhpjbQNrck1C6UwEtae7EmYTGigGdZhSKY/exec';

/**
 * Normalizes a Google Apps Script URL. If the user pasted a redirected
 * `script.googleusercontent.com/macros/echo` URL from their browser address bar,
 * resolves it to the permanent `script.google.com/macros/s/.../exec` endpoint.
 */
export function normalizeAppsScriptUrl(url: string | undefined | null): string {
  if (!isConfiguredContactValue(url)) return '';
  const trimmed = (url as string).trim();
  if (
    trimmed.includes('script.googleusercontent.com/macros/echo') ||
    trimmed.includes('MZlu6BMDx25H5aAPbs_KHeZvkCWubFdXR')
  ) {
    return DEFAULT_OWNER_APPS_SCRIPT_EXEC_URL;
  }
  return trimmed;
}

/**
 * Checks if the provided Google Apps Script Web App URL is configured and valid.
 */
export function isValidAppsScriptUrl(url: string | undefined | null): boolean {
  const normalized = normalizeAppsScriptUrl(url);
  if (!normalized) return false;
  try {
    const parsed = new URL(normalized);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Builds the structured database record to be appended as a row in Google Sheets via Apps Script.
 */
export function buildAppsScriptPayload(
  input: ContactFormInput,
  lang: Language = 'id',
  timestampOverride?: string,
): AppsScriptSubmissionPayload {
  return {
    timestamp: timestampOverride || new Date().toISOString(),
    fullName: input.fullName.trim(),
    email: input.email.trim(),
    category: input.category.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
    language: lang,
    source: 'Abu Hafsh Muhammad Portfolio (Vercel)',
  };
}

/**
 * Sends the validated form submission directly to a Google Apps Script Web App (doPost).
 * Uses Content-Type: text/plain;charset=utf-8 to avoid CORS preflight (OPTIONS) rejection
 * on script.google.com while allowing JSON.parse(e.postData.contents) in Apps Script.
 */
export async function submitToAppsScript(
  webhookUrl: string | undefined | null,
  input: ContactFormInput,
  lang: Language = 'id',
  fetchImpl: typeof fetch = fetch,
): Promise<AppsScriptSubmitResult> {
  const payload = buildAppsScriptPayload(input, lang);

  if (!isValidAppsScriptUrl(webhookUrl)) {
    return {
      status: 'unconfigured_webhook',
      payload,
    };
  }

  const targetUrl = normalizeAppsScriptUrl(webhookUrl);

  try {
    const response = await fetchImpl(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.type === 'opaque') {
      return {
        status: 'saved_to_apps_script',
        payload,
      };
    }

    return {
      status: 'network_error',
      payload,
      errorMessage: `HTTP ${response.status}`,
    };
  } catch (err) {
    // Fallback attempt with mode: 'no-cors' for strict browser redirect handling on script.google.com
    try {
      await fetchImpl(targetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
      return {
        status: 'saved_to_apps_script',
        payload,
      };
    } catch (fallbackErr) {
      return {
        status: 'network_error',
        payload,
        errorMessage:
          fallbackErr instanceof Error
            ? fallbackErr.message
            : err instanceof Error
              ? err.message
              : 'Network request failed',
      };
    }
  }
}

