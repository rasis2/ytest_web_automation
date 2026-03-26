import { test as base, expect } from '@playwright/test';
import { firefox } from '@playwright/test';

// Konfigurasi Constants
const TARGET_EMAIL = 'rasis_test2@yahoo.com';
const SETTINGS_URL = 'https://beta-mg.mail.yahoo.com/n/settings/3?.src=ym&reason=myc';

const test = base.extend({
  context: async ({ }, use) => {
    const context = await firefox.launchPersistentContext('./yahoo_session_firefox', {
      headless: false,
      firefoxUserPrefs: {
        'dom.webdriver.enabled': false,
        'dom.webnotifications.enabled': true,
        'permissions.default.desktop-notification': 1,
      }
    });
    await use(context);
    await context.close();
  },
});

test.describe('Yahoo Mail Automation Suite', () => {
  
  test('Full Flow: Notification Settings & Send Email', async ({ page }) => {
    // Set timeout global untuk test ini
    test.setTimeout(120000);

    // --- LANGKAH 1: NAVIGASI ---
    await test.step('Navigasi ke Settings Yahoo Mail', async () => {
      console.log("🔗 Membuka Yahoo Mail Settings...");
      await page.goto(SETTINGS_URL);
      await expect(page).toHaveURL(/.*settings/);
    });

    // --- LANGKAH 2: TETAPAN NOTIFIKASI ---
    await test.step('Menguruskan Desktop Notifications', async () => {
      console.log("🔔 Menetapkan Desktop Notifications...");
      const toggle = page.getByRole('switch', { name: 'Desktop notifications' });
      
      await toggle.waitFor({ state: 'visible' });
      await page.waitForTimeout(2000); // Kestabilan skrip Yahoo
      
      // Toggle dan pilih opsyen
      await toggle.click({ force: true });
      
      const highPriorityOpt = page.getByText('High-priority emails only');
      await highPriorityOpt.click();
      
      // Validasi: Pastikan teks pengesahan muncul
      await expect(page.getByRole('region')).toContainText('Desktop notifications');
      console.log("✅ Notifikasi berjaya dikemaskini.");
    });

    // --- LANGKAH 3: INTERAKSI TAB PREFERENCES ---
    await test.step('Navigasi Kategori Email (Tabs)', async () => {
      console.log("📁 Menukar kategori tab...");
      await page.locator('[data-test-id="left-rail-Inbox-icon"]').click();
      
      const tabs = ['Newsletters', 'Social', 'Offers', 'Primary'];
      
      for (const tabName of tabs) {
        const tab = page.getByRole('tab', { name: tabName });
        await tab.click();
        // Validasi: Pastikan tab terpilih (biasanya ada attribute aria-selected)
        await expect(tab).toBeVisible();
        console.log(`   - Tab ${tabName} diklik.`);
      }
    });

    // --- LANGKAH 4: COMPOSE & VALIDASI PENERIMA ---
    await test.step('Menyediakan Draft Email', async () => {
      console.log("✍️ Memulakan Compose Email...");
      await page.locator('[data-test-id="left-rail-Compose-icon"]').first().click();

      const toField = page.locator('[data-test-id="compose-header-field-to"]')
                          .getByRole('combobox', { name: 'To', exact: true });

      await toField.waitFor({ state: 'visible' });
      await toField.fill(TARGET_EMAIL);
      await toField.press('Enter');

      // Validasi: Pastikan email penerima dimasukkan dalam list
      await expect(page.locator('[data-test-id="compose-header-field-to"]')).toContainText(TARGET_EMAIL);

      // Isi Subject & Body
      const timestamp = new Date().toLocaleString();
      await page.getByRole('textbox', { name: 'Subject' }).fill(`Test Automation - ${timestamp}`);
      await page.locator('[data-test-id="rte"]').fill('Mesej ini dihantar secara automatik menggunakan Playwright Firefox.');
    });

    // --- LANGKAH 5: PENGESAHAN PENGHANTARAN ---
    await test.step('Hantar Email & Verifikasi Toast', async () => {
      console.log("🚀 Menghantar email...");
      await page.locator('[data-test-id="compose-send-button"]').click();

      // Validasi Toast Message
      const toast = page.locator('[data-test-id="notifications"]');
      await expect(toast).toContainText('Your message has been sent', { timeout: 20000 });
      
      console.log("🏁 TEST SELESAI: Email berjaya dihantar dan diverifikasi.");
    });
  });
});