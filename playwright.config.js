// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  use: {
    headless: false,
    screenshot: 'on',
  },
  /* Tambah MiniReporter di sini */
  reporter: [
    ['./mini-reporter.js'], // Reporter custom kita
    ['html'],              // Reporter HTML asal
    ['playwright-pdf-reporter', {
      outputFolder: 'test-reports',
      outputFile: 'Yahoo_Mail_Report.pdf',
    }]
  ],
});