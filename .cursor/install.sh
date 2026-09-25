#!/usr/bin/env bash
# Cloud Agent install: prepare all locally runnable StrikeMap components.
# Idempotent: safe to re-run against a warm checkout or cached snapshot.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

# --- System dependency: Python venv + ensurepip (only if missing) --------
# `python3 -m venv --help` succeeds even when ensurepip is absent, so probe
# ensurepip directly (that is what actually breaks venv creation).
if ! python3 -c 'import ensurepip' >/dev/null 2>&1; then
  echo "[install] ensurepip missing; installing python3-venv + python3-pip"
  sudo apt-get update -qq
  sudo apt-get install -y --no-install-recommends python3-venv python3-pip
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
# Recreate the venv if it is missing or was left half-built (no pip).
echo "[install] origin: virtualenv + deps"
( cd origin \
  && if [ ! -x .venv/bin/pip ]; then rm -rf .venv && python3 -m venv .venv; fi \
  && ./.venv/bin/pip install --upgrade pip >/dev/null \
  && ./.venv/bin/pip install -r requirements.txt )

echo "[install] done"
