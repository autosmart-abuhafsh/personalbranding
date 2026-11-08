import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isConfiguredContactValue,
  sanitizeWhatsAppNumber,
  filterProjectsByCategory,
  validateContactForm,
  buildContactDispatch,
  isValidAppsScriptUrl,
  normalizeAppsScriptUrl,
  buildAppsScriptPayload,
  submitToAppsScript,
} from './portfolioLogic';
import { PROJECTS_DATA } from '../data/projects';
import { CONTACT_CONFIG } from '../data/profile';

test('isConfiguredContactValue hides default GANTI_DENGAN_* placeholders', () => {
  assert.equal(isConfiguredContactValue('GANTI_DENGAN_NOMOR_AKTIF'), false);
  assert.equal(isConfiguredContactValue('GANTI_DENGAN_EMAIL_AKTIF'), false);
  assert.equal(isConfiguredContactValue('GANTI_DENGAN_URL_WEB_APP_APPS_SCRIPT'), false);
  assert.equal(isConfiguredContactValue(''), false);
  assert.equal(isConfiguredContactValue('   '), false);
  assert.equal(isConfiguredContactValue('contact@autosmart.id'), true);
  assert.equal(isConfiguredContactValue('6281234567890'), true);
});

test('sanitizeWhatsAppNumber formats Indonesian and international numbers cleanly', () => {
  assert.equal(sanitizeWhatsAppNumber('GANTI_DENGAN_NOMOR_AKTIF'), '');
  assert.equal(sanitizeWhatsAppNumber('0812-3456-7890'), '6281234567890');
  assert.equal(sanitizeWhatsAppNumber('+62 812 9999 0000'), '6281299990000');
});

test('filterProjectsByCategory returns expected project subsets', () => {
  const all = filterProjectsByCategory(PROJECTS_DATA, 'All Projects');
  assert.equal(all.length, 4);

  const ecommerce = filterProjectsByCategory(PROJECTS_DATA, 'E-Commerce');
  assert.equal(ecommerce.length, 1);
  assert.equal(ecommerce[0].id, 'asbabalshefaa');

  const businessApps = filterProjectsByCategory(PROJECTS_DATA, 'Business Applications');
  assert.equal(businessApps.length, 1);
  assert.equal(businessApps[0].id, 'business-application-system');

  const businessWeb = filterProjectsByCategory(PROJECTS_DATA, 'Business Website');
  assert.equal(businessWeb.length, 3);
});

test('validateContactForm rejects incomplete inputs and accepts valid briefs', () => {
  const invalidResult = validateContactForm(
    {
      fullName: 'A',
      email: 'not-an-email',
      subject: 'Hi',
      category: '',
      message: 'Short',
    },
    'id',
  );
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.subject);
  assert.ok(invalidResult.errors.category);
  assert.ok(invalidResult.errors.message);

  const validResult = validateContactForm(
    {
      fullName: 'Budi Santoso',
      email: 'budi@perusahaan.co.id',
      subject: 'Pengembangan Dashboard Keuangan & Otomasi',
      category: 'Financial Management Dashboard',
      message: 'Kami membutuhkan dashboard laporan arus kas terintegrasi Google Sheets.',
    },
    'id',
  );
  assert.equal(validResult.valid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('buildContactDispatch constructs accurate mailto and WhatsApp links based on configuration', () => {
  const sampleInput = {
    fullName: 'Ahmad Fauzi',
    email: 'ahmad@travel.id',
    subject: 'Pembuatan Website Travel Umrah',
    category: 'WordPress Website Development',
    message: 'Ingin membuat website paket perjalanan umrah seperti Afiyah Tour.',
  };

  // Default unconfigured state
  const unconfigured = buildContactDispatch(sampleInput, CONTACT_CONFIG, 'id');
  assert.equal(unconfigured.hasConfiguredEmail, false);
  assert.equal(unconfigured.hasConfiguredWhatsApp, false);
  assert.equal(unconfigured.whatsappUrl, null);
  assert.ok(unconfigured.mailtoUrl.startsWith('mailto:?subject='));

  // Configured state
  const configured = buildContactDispatch(
    sampleInput,
    {
      ...CONTACT_CONFIG,
      WHATSAPP_NUMBER: '081234567890',
      EMAIL_ADDRESS: 'abuhafsh@autosmart.id',
    },
    'id',
  );
  assert.equal(configured.hasConfiguredEmail, true);
  assert.equal(configured.hasConfiguredWhatsApp, true);
  assert.ok(configured.mailtoUrl.startsWith('mailto:abuhafsh@autosmart.id?subject='));
  assert.ok(configured.whatsappUrl?.startsWith('https://wa.me/6281234567890?text='));
});

test('Apps Script integration validates URL, builds payload, and submits via CORS-safe text/plain POST', async () => {
  assert.equal(isValidAppsScriptUrl('GANTI_DENGAN_URL_WEB_APP_APPS_SCRIPT'), false);
  assert.equal(isValidAppsScriptUrl('not-a-url'), false);
  assert.equal(
    isValidAppsScriptUrl('https://script.google.com/macros/s/AKfycbx12345/exec'),
    true,
  );
  assert.equal(
    normalizeAppsScriptUrl(
      'https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnQpLH0&lib=MZlu6BMDx25H5aAPbs_KHeZvkCWubFdXR',
    ),
    'https://script.google.com/macros/s/AKfycbwlSjHIRrchWHLk88nplEg0ba52c1r0MSkhpjbQNrck1C6UwEtae7EmYTGigGdZhSKY/exec',
  );

  const sampleInput = {
    fullName: 'Siti Rahma',
    email: 'siti@organisasi.org',
    subject: 'Integrasi Google Sheets & Apps Script',
    category: 'Google Sheets & Apps Script Integration',
    message: 'Kami ingin mengotomatiskan laporan keuangan bulanan ke Google Sheets.',
  };

  const payload = buildAppsScriptPayload(sampleInput, 'id', '2026-11-07T00:00:00.000Z');
  assert.equal(payload.fullName, 'Siti Rahma');
  assert.equal(payload.category, 'Google Sheets & Apps Script Integration');
  assert.equal(payload.timestamp, '2026-11-07T00:00:00.000Z');

  // Unconfigured webhook returns unconfigured_webhook
  const unconfRes = await submitToAppsScript(
    'GANTI_DENGAN_URL_WEB_APP_APPS_SCRIPT',
    sampleInput,
    'id',
  );
  assert.equal(unconfRes.status, 'unconfigured_webhook');

  // Configured webhook invokes fetch with text/plain JSON body
  let capturedUrl = '';
  let capturedInit: RequestInit | undefined;
  const mockFetch = (async (url: string | URL | Request, init?: RequestInit) => {
    capturedUrl = String(url);
    capturedInit = init;
    return new Response(JSON.stringify({ status: 'success' }), { status: 200 });
  }) as typeof fetch;

  const savedRes = await submitToAppsScript(
    'https://script.google.com/macros/s/AKfycbx12345/exec',
    sampleInput,
    'id',
    mockFetch,
  );

  assert.equal(savedRes.status, 'saved_to_apps_script');
  assert.equal(capturedUrl, 'https://script.google.com/macros/s/AKfycbx12345/exec');
  assert.equal(capturedInit?.method, 'POST');
  assert.deepEqual(capturedInit?.headers, {
    'Content-Type': 'text/plain;charset=utf-8',
  });
  const parsedBody = JSON.parse(String(capturedInit?.body));
  assert.equal(parsedBody.fullName, 'Siti Rahma');
  assert.equal(parsedBody.email, 'siti@organisasi.org');
});
