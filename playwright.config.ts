import { defineConfig } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3102';

export default defineConfig({
  testDir: './tests',
  outputDir: '.context/test-results',
  fullyParallel: true,
  workers: 4,
  reporter: 'list',
  use: {
    baseURL,
    // Exercise the current build, not a previously cached service worker.
    serviceWorkers: 'block',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        // Verify the static export that ships; dev streaming/HMR can shift scroll.
        command: 'npm run build:cloudflare && npm start -- --listen tcp://127.0.0.1:3102',
        url: baseURL,
        timeout: 180_000,
      },
});
