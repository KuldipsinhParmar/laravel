#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PORTABLE_PHP=/tmp/php-portable/merged/usr/bin/php8.4
PORTABLE_LIB=/tmp/php-portable/merged/usr/lib/aarch64-linux-gnu
PORTABLE_PHPRC=/tmp/php-portable/merged/etc/php/8.4/cli

if [[ -x "$PORTABLE_PHP" ]]; then
    export LD_LIBRARY_PATH="$PORTABLE_LIB"
    export PHPRC="$PORTABLE_PHPRC"
    PHP=("$PORTABLE_PHP")
elif command -v php >/dev/null 2>&1; then
    PHP=(php)
else
    echo 'playwright-server.sh: install PHP on PATH or bootstrap /tmp/php-portable.' >&2
    exit 1
fi

test -f .env || cp .env.example .env
"${PHP[@]}" artisan key:generate --force
mkdir -p storage/framework/views storage/framework/cache bootstrap/cache
touch database/database.sqlite
"${PHP[@]}" artisan migrate --force
# --no-reload keeps Laravel from stripping LD_LIBRARY_PATH / PHPRC when forwarding env to the PHP built-in server worker (ServeCommand passthrough list).
exec env AUTO_VERIFY_EMAILS=1 LD_LIBRARY_PATH="${LD_LIBRARY_PATH:-}" PHPRC="${PHPRC:-}" "${PHP[@]}" artisan serve --host=127.0.0.1 --port=8000 --no-reload
