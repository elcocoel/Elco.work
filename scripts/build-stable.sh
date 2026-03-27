#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

bash "${PROJECT_DIR}/scripts/dev-clean.sh"

echo "Running clean production build..."
cd "${PROJECT_DIR}"
npm run build
