#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Cleaning local Next.js runtime state..."

# Kill only `next dev` processes that belong to this repo path.
PIDS="$(
  python3 - "$PROJECT_DIR" <<'PY'
import subprocess
import sys

root = sys.argv[1]
out = subprocess.check_output(["ps", "-ax", "-o", "pid=,command="], text=True)
for raw in out.splitlines():
    line = raw.strip()
    if not line:
        continue
    parts = line.split(None, 1)
    if len(parts) != 2:
        continue
    pid, cmd = parts
    if "next dev" in cmd and root in cmd:
        print(pid)
PY
)"

if [ -n "${PIDS}" ]; then
  echo "Stopping existing Next dev processes: ${PIDS}"
  kill ${PIDS} || true
  sleep 1
fi

rm -rf "${PROJECT_DIR}/.next"
echo "Removed ${PROJECT_DIR}/.next"
