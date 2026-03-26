const { chromium } = require('playwright-extra');
// GUNAKAN 'puppeteer-extra-plugin-stealth' walaupun untuk Playwright
const stealth = require('puppeteer-extra-plugin-stealth')();

chromium.use(stealth);

(async () => {
  const userDataDir = './yahoo_session';
  
  console.log("Melancarkan browser...");
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
      channel: 'msedge', // <--- TAMBAH INI untuk paksa guna Edge

    args: [
        '--no-sandbox',
        '--disable-blink-features=AutomationControlled'
    ]
  });

  const page = await context.newPage();
  
  console.log("Membuka Yahoo Mail Beta...");
  try {
    await page.goto('https://beta-mg.mail.yahoo.com/', { waitUntil: 'networkidle' });
  } catch (err) {
    console.log("Nota: Page mungkin lambat load, teruskan login...");
  }

  console.log("Sila login secara manual sekarang (masukkan email, password & 2FA/Passkey)...");
  
  try {
    // Tunggu sehingga URL berubah ke inbox (biasanya ada perkataan 'folders')
    // Timeout 2 minit untuk bagi anda masa login manual
    await page.waitForURL('**/d/folders/**', { timeout: 120000 });
    console.log("LOGIN BERJAYA! Fail session telah dikemaskini.");
  } catch (e) {
    console.log("Masa tamat. Pastikan anda login sehingga nampak senarai email.");
  }

  // Tunggu sekejap untuk pastikan cookies disimpan
  await page.waitForTimeout(5000);
  await context.close();
  console.log("Browser ditutup. Anda kini boleh jalankan skrip test.");
})();