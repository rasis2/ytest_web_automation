# 📧 Yahoo Mail Automation - Playwright Firefox

Projek ini adalah automasi ujian hujung-ke-hujung (**End-to-End Testing**) untuk Yahoo Mail menggunakan **Playwright** dengan browser **Firefox**. Ia merangkumi aliran kerja penuh daripada menukar tetapan notifikasi, navigasi tab, sehingga menghantar emel.

---

## 🚀 Ciri-ciri Utama

* ✅ **Custom Terminal Reporter**
  Memaparkan setiap langkah ujian secara langsung di terminal.

* 📄 **PDF Report Generation**
  Menjana laporan rasmi dalam format PDF secara automatik.

* 🔐 **Persistent Context**
  Menggunakan profil Firefox sedia ada untuk mengekalkan sesi log masuk.

* 🧩 **Step-by-Step Validation**
  Menggunakan `test.step` untuk pengurusan kod yang lebih kemas dan jelas.

---

## 🛠️ Prasyarat (Prerequisites)

Sebelum memulakan, pastikan anda telah memasang:

* [Node.js](https://nodejs.org/) (Versi 18 atau ke atas)
* Folder profil Firefox: `yahoo_session_firefox`
  (Digunakan untuk bypass login Yahoo)

---

## 📦 Langkah Setup

### 1. Clone Repository

```bash
git clone https://github.com/username-anda/yahoo-web-automation.git
cd yahoo-web-automation
```

### 2. Pasang Dependencies

```bash
npm install
```

### 3. Pasang Browser Playwright

```bash
npx playwright install firefox
```

### 4. Pasang PDF Reporter

```bash
npm install playwright-pdf-reporter --save-dev
```

---

## ⚙️ Konfigurasi Projek

### 1. package.json

Pastikan ada:

```json
"type": "module"
```

### 2. playwright.config.js

```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['./mini-reporter.js'],
    ['html'],
    ['playwright-pdf-reporter', {
      outputFolder: 'test-reports',
      outputFile: 'Yahoo_Mail_Report.pdf'
    }]
  ],
  use: {
    headless: false,
    screenshot: 'on',
  }
});
```

---

## 🏃 Cara Menjalankan Ujian

Jalankan test:

```bash
# Mode browser nampak (headed)
npx playwright test tests/web.spec.js --headed
```

---

## 📊 Laporan (Reports)

Selepas ujian selesai, laporan boleh didapati dalam 3 format:

* 🖥️ **Terminal Report (Mini Reporter)**
  Paparan langkah ujian secara live di terminal.

* 📄 **PDF Report**
  Lokasi:

  ```
  test-reports/Yahoo_Mail_Report.pdf
  ```

* 🌐 **HTML Report**
  Jalankan:

  ```bash
  npx playwright show-report
  ```

---

## 📂 Struktur Projek

```
├── tests/
│   └── web.spec.js        # Skrip automasi utama
├── mini-reporter.js       # Custom reporter terminal
├── playwright.config.js   # Konfigurasi Playwright
├── package.json           # Dependencies & config
└── yahoo_session_firefox/ # Profil Firefox (login session)
```

---

## ⚠️ Nota Penting

* 🔑 **Sesi Login**

  * Projek ini menggunakan `launchPersistentContext`
  * Anda perlu login Yahoo Mail sekali sahaja secara manual
  * Ini untuk elakkan bot detection & login berulang

* ⏱️ **Timeout**

  * Timeout diset ke **120 saat**
  * Yahoo Mail kadang lambat load (especially Settings page)

---

## 🚀 Cara Push ke GitHub

### 1. Initialize Git

```bash
git init
```

### 2. Add Files

```bash
git add .
```

### 3. Commit

```bash
git commit -m "Initial commit: Yahoo Mail Automation with PDF and Mini Reporter"
```

### 4. Connect ke GitHub Repo

```bash
git remote add origin https://github.com/username-anda/nama-repo.git
git branch -M main
git push -u origin main
```

---

## 💡 Tip Tambahan

Buat fail `.gitignore` dan masukkan:

```
node_modules/
test-results/
playwright-report/
```

👉 Ini untuk elakkan file besar & unnecessary upload ke GitHub.

---

## 📌 Penutup

Projek ini sesuai untuk:

* QA Automation Engineer
* Tester yang nak belajar Playwright
* Developer yang nak automate web testing secara real-world

---

Happy Testing 🚀
