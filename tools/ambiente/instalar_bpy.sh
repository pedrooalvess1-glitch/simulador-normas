#!/usr/bin/env bash
# Cria um venv com o Blender como módulo Python (bpy), na versão de versoes.env.
# Uso: tools/ambiente/instalar_bpy.sh [DESTINO_DO_VENV]   → imprime o caminho do python do venv.
set -euo pipefail
AQUI="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$AQUI/versoes.env"
VENV="${1:-$HOME/.cache/simulador-normas/bpy}"
if [[ ! -x "$VENV/bin/python" ]]; then
  "$BPY_PYTHON" -m venv "$VENV"
  "$VENV/bin/pip" install -q "bpy==${BPY_VERSION}"
fi
"$VENV/bin/python" -c "import bpy, sys; v=bpy.app.version_string; sys.exit(0 if v.startswith('${BPY_VERSION}') else f'bpy {v} != ${BPY_VERSION}')"
echo "$VENV/bin/python"
