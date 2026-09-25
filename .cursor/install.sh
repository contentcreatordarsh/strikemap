#!/usr/bin/env bash
# Cloud Agent install: prepare all locally runnable StrikeMap components.
# Idempotent: safe to re-run against a warm checkout or cached snapshot.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

# --- System dependency: Python venv module (only if missing) -------------
if ! python3 -m venv --help >/dev/null 2>&1; then
  echo "[install] python3 venv module missing; installing python3-venv"
  sudo apt-get update -qq
  sudo apt-get install -y --no-install-recommends python3-venv
fi

# --- Primary: strikemap-platform (Cloudflare Workers stack) --------------
echo "[install] strikemap-platform: deps, client build, local D1 migrations"
( cd strikemap-platform \
  && npm ci \
  && npm run build:client \
  && npm run db:migrate:local )

# --- Map UI: web (Next.js) ----------------------------------------------
echo "[install] web: deps"
( cd web && npm ci )

# --- Origin: Flask app ---------------------------------------------------
echo "[install] origin: virtualenv + deps"
( cd origin \
  && python3 -m venv .venv \
  && ./.venv/bin/pip install --upgrade pip >/dev/null \
  && ./.venv/bin/pip install -r requirements.txt )

echo "[install] done"
