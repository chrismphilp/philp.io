import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1,
  use: {
    baseURL: process.env.IMAGE_TEST_URL || 'http://127.0.0.1:4175',
    viewport: { width: 1280, height: 900 },
  },
  webServer: process.env.IMAGE_TEST_URL
    ? undefined
    : { command: 'npm start -- --listen tcp://127.0.0.1:4175', port: 4175 },
});
