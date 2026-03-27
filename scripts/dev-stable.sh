#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-3012}"

bash "${PROJECT_DIR}/scripts/dev-clean.sh"

echo "Starting stable dev server on http://localhost:${PORT}"
cd "${PROJECT_DIR}"
WATCHPACK_POLLING=true npm run dev -- --port "${PORT}"
