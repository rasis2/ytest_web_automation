import { test, expect } from '@playwright/test';

// Nama test: Semak Tajuk Google
test('semak tajuk laman web Google', async ({ page }) => {
  // 1. Pergi ke laman web Google
  await page.goto('https://www.google.com');

  // 2. Semak sama ada tajuk halaman mengandungi perkataan "Google"
  await expect(page).toHaveTitle(/Google/);
});

// Nama test: Carian di Google
test('buat carian di Google', async ({ page }) => {
  await page.goto('https://www.google.com');

  // 3. Cari kotak carian, taip "Playwright JS" dan tekan Enter
  // Playwright menggunakan locator untuk mencari elemen
  const searchBox = page.locator('textarea[name="q"]'); // Untuk Google versi baru
  await searchBox.fill('Playwright JS');
  await searchBox.press('Enter');

  // 4. Tunggu dan semak jika keputusan carian muncul
  await expect(page).toHaveURL(/search/);
});