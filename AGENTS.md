# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Laravel 13 application using PHP 8.4, SQLite (dev/test), Vite + Tailwind CSS frontend. See `composer.json` scripts section for available commands.

### Key commands

| Task | Command |
|------|---------|
| Dev server (all services) | `composer dev` |
| PHP tests | `php artisan test` |
| Lint (Pint) | `./vendor/bin/pint --test` |
| Lint fix | `./vendor/bin/pint` |
| Vite build | `npm run build` |
| Playwright tests | `PLAYWRIGHT_BASE_URL=http://127.0.0.1:8000 npx playwright test` |

### Non-obvious setup notes

- The repository's `storage/framework/{cache/data,sessions,testing,views}` directories are **not tracked by git**. After a fresh clone, you must create them or tests/views will fail with "Please provide a valid cache path." Run: `mkdir -p storage/framework/{cache/data,sessions,testing,views} storage/app/public`
- The `.npmrc` sets `ignore-scripts=true`, so npm lifecycle scripts don't run automatically.
- Playwright tests require the Laravel dev server to be running on port 8000 first (`php artisan serve --host=127.0.0.1 --port=8000`).
- PHPUnit tests use SQLite in-memory (`:memory:`) — see `phpunit.xml`. No database server is needed for PHP tests.
- The `composer dev` script runs `php artisan serve`, `queue:listen`, `pail`, and `npm run dev` concurrently via `npx concurrently`. You can also run `php artisan serve` alone if you only need the backend.
