import { test, expect } from '@playwright/test';

test.describe('auth happy path', () => {
    test('register, login, dashboard, logout', async ({ page }) => {
        const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const email = `e2e-${suffix}@example.com`;
        const password = 'password';

        await page.goto('/register');
        await expect(page.locator('form[action*="register"]')).toBeVisible();

        await page.fill('input[name="name"]', 'Playwright User');
        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', password);
        await page.fill('input[name="password_confirmation"]', password);
        await page.getByRole('button', { name: /register/i }).click();

        await expect(page).toHaveURL(/\/dashboard$/);

        await page.getByRole('button', { name: 'Playwright User' }).click();
        await page.getByRole('link', { name: /log out/i }).click();
        await expect(page).toHaveURL('/');

        await page.goto('/login');
        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', password);
        await page.getByRole('button', { name: /log in/i }).click();

        await expect(page).toHaveURL(/\/dashboard$/);
        await expect(page.getByText(/you're logged in/i)).toBeVisible();

        await page.getByRole('button', { name: 'Playwright User' }).click();
        await page.getByRole('link', { name: /log out/i }).click();
        await expect(page).toHaveURL('/');
    });
});
