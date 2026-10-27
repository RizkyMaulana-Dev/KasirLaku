#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT="$SCRIPT_DIR"
MODEL="${1:-tokenharbor/deepseek-v4.1-flash:free}"

if ! command -v opencode >/dev/null 2>&1; then
  echo "opencode not found in PATH" >&2
  exit 1
fi

exec opencode run \
  --model "$MODEL" \
  --file "$PROJECT/PRD.md" \
  --file "$PROJECT/DESIGN.md" \
  "Kamu adalah engineer untuk KasirLaku. Baca PRD.md dan DESIGN.md di project root. Lakukan perubahan kecil yang diminta, sesuai design token yang ada. Jangan ubah struktur atau styling yang belum diatur. Jawab dengan perubahan file + alasan singkat."
