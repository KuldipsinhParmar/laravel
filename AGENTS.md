# AGENTS.md

## Cursor Cloud specific instructions

### Application Overview

This is a Laravel 13 application using PHP 8.4, SQLite (default), Vite/Tailwind for frontend, PHPUnit for tests, and Playwright for E2E tests. No external services (MySQL, Redis, Docker) are required for development — everything runs on SQLite.

### Running the Application

```bash
# Start the dev server (serves on http://127.0.0.1:8000)
php artisan serve --host=127.0.0.1 --port=8000

# Or use the composer dev script which starts server + queue + logs + vite concurrently:
composer dev
```

### Key Commands

| Task | Command |
|------|---------|
| Lint (check) | `./vendor/bin/pint --test` |
| Lint (fix) | `./vendor/bin/pint` |
| PHP tests | `php artisan test` |
| Playwright E2E | `PLAYWRIGHT_BASE_URL=http://127.0.0.1:8000 npx playwright test` |
| Build frontend | `npm run build` |
| Vite dev server | `npm run dev` |
| Fresh migrations | `php artisan migrate:fresh --force` |

### Gotchas

- **Storage directories must exist**: Laravel requires `storage/framework/views`, `storage/framework/cache`, `storage/framework/sessions`, `storage/logs`, and `bootstrap/cache`. If tests fail with "Please provide a valid cache path", create these directories.
- **Node version**: CI uses Node 20. Use `nvm use 20` before running npm commands.
- **`.npmrc` has `ignore-scripts=true`**: npm install won't run postinstall scripts. Playwright browsers must be installed separately with `npx playwright install --with-deps chromium`.
- **Playwright needs a running server**: Start `php artisan serve` before running Playwright tests.
- **PHPUnit uses in-memory SQLite**: Tests don't require the `database/database.sqlite` file; they use `:memory:` (configured in `phpunit.xml`).
