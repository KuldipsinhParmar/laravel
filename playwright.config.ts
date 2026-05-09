import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/playwright',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL: 'http://127.0.0.1:8000',
        trace: 'on-first-retry',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    webServer: {
        command:
            'bash -lc \'set -e; test -f .env || cp .env.example .env; php artisan key:generate --force; touch database/database.sqlite; php artisan migrate --force; exec env AUTO_VERIFY_EMAILS=1 php artisan serve --host=127.0.0.1 --port=8000\'',
        url: 'http://127.0.0.1:8000',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        stdout: 'pipe',
        stderr: 'pipe',
    },
});
