#!/usr/bin/env bash
# Baixa o Godot (Linux x86_64) da Release oficial, confere a SHA-512 e deixa o binário em $DESTINO.
# Uso: tools/ambiente/instalar_godot.sh [DESTINO] [--templates windows,linux,web]
#   Sem --templates baixa só o editor (~78 MB). Com --templates baixa o .tpz (~1,3 GB),
#   confere a soma e extrai só as plataformas pedidas para ~/.local/share/godot/export_templates/.
# Saída: imprime o caminho do binário na última linha.
set -euo pipefail
AQUI="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$AQUI/versoes.env"
DESTINO="${1:-$HOME/.cache/simulador-normas/godot}"
TEMPLATES=""
if [[ "${2:-}" == "--templates" ]]; then TEMPLATES="${3:?informe as plataformas, ex.: windows,linux}"; fi
URL="https://github.com/godotengine/godot/releases/download/${GODOT_TAG}"
ZIP="Godot_v${GODOT_TAG}_linux.x86_64.zip"
BIN="$DESTINO/Godot_v${GODOT_TAG}_linux.x86_64"
mkdir -p "$DESTINO"

baixar() {  # arquivo soma
  if [[ ! -f "$DESTINO/$1" ]] || ! echo "$2  $DESTINO/$1" | sha512sum -c --status; then
    curl -sSfL -o "$DESTINO/$1" "$URL/$1"
  fi
  echo "$2  $DESTINO/$1" | sha512sum -c --quiet || { echo "SHA-512 não confere: $1" >&2; exit 1; }
}

if [[ ! -x "$BIN" ]]; then
  baixar "$ZIP" "$GODOT_LINUX_ZIP_SHA512"
  unzip -oq "$DESTINO/$ZIP" -d "$DESTINO"
  chmod +x "$BIN"
fi
VERSAO="$("$BIN" --headless --version | tail -1)"
[[ "$VERSAO" == "$GODOT_BUILD" ]] || { echo "Versão inesperada: $VERSAO (esperado $GODOT_BUILD)" >&2; exit 1; }

if [[ -n "$TEMPLATES" ]]; then
  TPZ="Godot_v${GODOT_TAG}_export_templates.tpz"
  baixar "$TPZ" "$GODOT_TEMPLATES_TPZ_SHA512"
  T="$HOME/.local/share/godot/export_templates/${GODOT_VERSION}.stable"
  mkdir -p "$T"
  PADROES=(templates/version.txt)
  IFS=',' read -ra PLATS <<< "$TEMPLATES"
  for p in "${PLATS[@]}"; do
    case "$p" in
      windows) PADROES+=("templates/windows_*_x86_64*.exe") ;;
      linux)   PADROES+=("templates/linux_*.x86_64") ;;
      web)     PADROES+=("templates/web_nothreads_*.zip") ;;
      *) echo "Plataforma desconhecida: $p" >&2; exit 1 ;;
    esac
  done
  unzip -oqj "$DESTINO/$TPZ" "${PADROES[@]}" -d "$T"
  rm -f "$DESTINO/$TPZ"  # 1,3 GB: só as plataformas extraídas ficam
fi
echo "$BIN"
