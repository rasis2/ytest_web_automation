const { firefox } = require('playwright'); // Guna playwright biasa

(async () => {
  console.log("Melancarkan Firefox...");
  
  // Folder session baru
  const userDataDir = './yahoo_session_firefox';
  
  const context = await firefox.launchPersistentContext(userDataDir, {
    headless: false,
    // Kita set "Stealth" secara manual melalui Firefox Preferences
    firefoxUserPrefs: {
      'dom.webdriver.enabled': false,       // Sorok status bot
      'useAutomationExtension': false,     // Matikan extension automation
      'dom.webnotifications.enabled': true, // Benarkan notifikasi
      'permissions.default.desktop-notification': 1,
      'network.cookie.cookieBehavior': 0,   // Benarkan semua cookies
    }
  });

  const page = await context.newPage();

  console.log("Navigasi ke Yahoo...");
  try {
    await page.goto('https://beta-mg.mail.yahoo.com/', { waitUntil: 'domcontentloaded' });
  } catch (err) {
    console.log("Loading lambat, tapi tak apa. Teruskan...");
  }

  console.log("---------------------------------------------------------");
  console.log("SILA LOGIN MANUAL SEKARANG...");
  console.log("Pastikan anda klik 'Stay Signed In'.");
  console.log("Tunggu sehingga nampak Inbox/Email, kemudian tutup browser.");
  console.log("---------------------------------------------------------");

  // Tunggu sehingga URL ada 'folders' (tanda dah masuk inbox)
  try {
    await page.waitForURL('**/d/folders/**', { timeout: 120000 });
    console.log("Login Berjaya Dikesan!");
  } catch (e) {
    console.log("Timeout: Anda mungkin belum selesai login atau URL berbeza.");
  }

  // Beri masa untuk Firefox simpan session
  await page.waitForTimeout(5000);
  await context.close();
  console.log("Selesai! Sekarang anda boleh jalankan tests/web.spec.js");
})();