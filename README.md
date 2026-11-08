# Abu Hafsh Muhammad — Autosmart Digital Solutions Portfolio

Website portofolio resmi **Abu Hafsh Muhammad** (*Founder Autosmart Digital Solutions*). Dibangun menggunakan **React 19 + TypeScript + Tailwind CSS v4 + Three.js**, siap di-deploy ke **GitHub Pages** maupun **Vercel (`vercel.app`)**, serta terintegrasi dengan **Google Apps Script** sebagai database formulir kontak.

---

## Cara Mengaktifkan di GitHub Pages (`autosmart-abuhafsh/profileabuhafsh`)

Karena aplikasi ini menggunakan **Vite + React + TypeScript**, file `/index.html` di root memanggil `/src/main.tsx` yang harus melalui proses build terlebih dahulu. Jika di **Settings → Pages** dipilih `main` → `/ (root)`, GitHub akan membaca file mentah yang belum di-compile sehingga halaman menjadi kosong/eror.

Kami sudah menyiapkan **2 cara mudah** di repository ini (pilih salah satu di halaman **Settings → Pages** pada GitHub Anda):

### Cara 1 (Paling Cepat — Tanpa Ubah Source): Gunakan Folder `/docs`
1. Buka repository GitHub Anda (`autosmart-abuhafsh/profileabuhafsh`) → **Settings** → **Pages**.
2. Pada bagian **Build and deployment** → **Source**, biarkan **Deploy from a branch**.
3. Pada bagian **Branch**, biarkan **`main`**, lalu ubah pilihan di sebelahnya dari **`/ (root)`** menjadi **`/docs`**.
4. Klik tombol **Save**.
5. Tunggu ~1 menit, lalu buka: `https://autosmart-abuhafsh.github.io/profileabuhafsh/`

### Cara 2 (Otomatis Build Setiap Update): Gunakan `GitHub Actions`
1. Buka repository GitHub Anda → **Settings** → **Pages**.
2. Pada bagian **Build and deployment** → **Source**, ubah dropdown dari `Deploy from a branch` menjadi **`GitHub Actions`**.
3. File workflow `.github/workflows/deploy.yml` yang sudah ada di repository ini akan otomatis meng-install dependency, menjalankan `npm run build`, dan men-deploy website ke GitHub Pages.

---

## Cara Deploy ke Vercel (`vercel.app`)

1. Buka [vercel.com/new](https://vercel.com/new) dan import repository GitHub **`autosmart-abuhafsh/profileabuhafsh`**.
2. File `vercel.json` sudah dikonfigurasi otomatis (`Framework: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
3. *(Opsional)* Tambahkan Environment Variable `VITE_APPS_SCRIPT_WEBHOOK_URL` dengan URL Web App Google Apps Script Anda.
4. Klik **Deploy**.

---

## Integrasi Database Google Apps Script (Formulir Kontak)

1. Buka Google Sheets baru → klik **Extensions (Ekstensi)** → **Apps Script**.
2. Salin seluruh isi file [`google-apps-script/Code.gs`](./google-apps-script/Code.gs) ke editor Apps Script, lalu simpan.
3. Klik **Deploy** → **New deployment** → pilih jenis **Web app**.
4. Atur **Execute as**: `Me` dan **Who has access**: `Anyone (Siapa saja)`.
5. Salin **Web App URL** (`https://script.google.com/macros/s/.../exec`), lalu tempelkan di menu **"Atur URL Apps Script & Kontak"** di bagian bawah halaman website atau di Environment Variable `VITE_APPS_SCRIPT_WEBHOOK_URL`.
