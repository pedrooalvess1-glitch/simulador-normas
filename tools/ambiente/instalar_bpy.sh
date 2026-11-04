#!/usr/bin/env bash
# Cria um venv com o Blender como módulo Python (bpy), na versão de versoes.env.
# Uso: tools/ambiente/instalar_bpy.sh [DESTINO_DO_VENV]   → imprime o caminho do python do venv.
# Se uma instalação anterior parou no meio (venv sem bpy ou em outra versão), reinstala.
set -euo pipefail
AQUI="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$AQUI/versoes.env"
VENV="${1:-$HOME/.cache/simulador-normas/bpy}"
confere() {
  "$VENV/bin/python" -c "import bpy, sys; v=bpy.app.version_string; sys.exit(0 if v.startswith('${BPY_VERSION}') else f'bpy {v} != ${BPY_VERSION}')" 2>/dev/null
}
if [[ ! -x "$VENV/bin/python" ]] || ! confere; then
  [[ -x "$VENV/bin/python" ]] || "$BPY_PYTHON" -m venv "$VENV"
  "$VENV/bin/pip" install -q "bpy==${BPY_VERSION}"
fi
confere || { echo "bpy ${BPY_VERSION} não importa em $VENV" >&2; exit 1; }
echo "$VENV/bin/python"
