/**
 * ============================================================================
 * GOOGLE APPS SCRIPT — DATABASE FORMULIR PORTOFOLIO ABU HAFSH MUHAMMAD
 * Brand: Autosmart Digital Solutions
 * ============================================================================
 * CARA PASANG DI GOOGLE SHEETS:
 * 1. Buat Google Sheets baru (misal: "Database Klien - Autosmart Digital").
 * 2. Klik menu Extensions (Ekstensi) > Apps Script.
 * 3. Hapus kode yang ada, lalu tempel (paste) seluruh kode ini.
 * 4. Klik tombol Save (Simpan).
 * 5. Klik tombol Deploy > New deployment (Deployment baru).
 * 6. Pilih jenis: "Web app".
 *    - Execute as: "Me" (Saya)
 *    - Who has access: "Anyone" (Siapa saja) -> PENTING agar form website bisa mengirim data tanpa login.
 * 7. Klik Deploy, berikan izin akses (Authorize access), lalu salin URL Web App
 *    yang berakhiran `/exec`.
 * 8. Tempel URL `/exec` tersebut ke:
 *    - Environment Variable Vercel: `VITE_APPS_SCRIPT_WEBHOOK_URL`
 *    - ATAU di file `src/data/profile.ts` pada `APPS_SCRIPT_WEBHOOK_URL`.
 * ============================================================================
 */

const SHEET_NAME = 'Inquiries';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName(SHEET_NAME);

    // Buat sheet dan baris header otomatis jika belum ada
    if (!sheet) {
      sheet = doc.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp (WIB)',
        'Nama Lengkap',
        'Email',
        'Kategori Layanan',
        'Subjek Proyek',
        'Rincian Kebutuhan / Pesan',
        'Bahasa Form',
        'Sumber Halaman',
        'Status Tindak Lanjut'
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

    // Parsing data dari JSON string (text/plain) atau parameter form
    let data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    const timestamp = Utilities.formatDate(
      new Date(),
      'Asia/Jakarta',
      'yyyy-MM-dd HH:mm:ss'
    );

    sheet.appendRow([
      timestamp,
      data.fullName || '-',
      data.email || '-',
      data.category || '-',
      data.subject || '-',
      data.message || '-',
      data.language || 'id',
      data.source || 'Portfolio Website',
      'Baru Masuk'
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'success',
        message: 'Data pelanggan berhasil disimpan ke Google Sheets.'
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'error',
        message: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'active',
      service: 'Autosmart Digital Solutions — Portfolio Form Database Endpoint'
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
