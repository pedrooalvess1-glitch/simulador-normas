#!/usr/bin/env bash
# Baixa o Godot (Linux x86_64) da Release oficial, confere a SHA-512 e deixa o binário em DESTINO.
# Uso: tools/ambiente/instalar_godot.sh [DESTINO] [--templates windows,linux,web]   (opções em qualquer ordem)
#   Sem --templates baixa só o editor (~78 MB). Com --templates baixa o .tpz (~1,3 GB) só se faltar
#   alguma plataforma pedida, confere a soma e extrai só essas plataformas para
#   ~/.local/share/godot/export_templates/<versão>.stable/.
# Saída: imprime o caminho do binário na última linha.
set -euo pipefail
AQUI="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$AQUI/versoes.env"
DESTINO="$HOME/.cache/simulador-normas/godot"
TEMPLATES=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --templates) TEMPLATES="${2:?informe as plataformas, ex.: --templates windows,linux}"; shift 2 ;;
    --templates=*) TEMPLATES="${1#--templates=}"; shift ;;
    -*) echo "Opção desconhecida: $1" >&2; exit 2 ;;
    *) DESTINO="$1"; shift ;;
  esac
done
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
  T="$HOME/.local/share/godot/export_templates/${GODOT_VERSION}.stable"
  PADROES=(templates/version.txt)
  FALTA=0
  IFS=',' read -ra PLATS <<< "$TEMPLATES"
  for p in "${PLATS[@]}"; do
    case "$p" in
      windows) g="windows_*_x86_64*.exe" ;;
      linux)   g="linux_*.x86_64" ;;
      web)     g="web_nothreads_*.zip" ;;
      *) echo "Plataforma desconhecida: $p" >&2; exit 2 ;;
    esac
    PADROES+=("templates/$g")
    compgen -G "$T/$g" > /dev/null || FALTA=1
  done
  [[ "$(cat "$T/version.txt" 2>/dev/null)" == "${GODOT_VERSION}.stable" ]] || FALTA=1
  if [[ "$FALTA" == 1 ]]; then  # só baixa o .tpz se faltar alguma plataforma pedida
    mkdir -p "$T"
    baixar "$TPZ" "$GODOT_TEMPLATES_TPZ_SHA512"
    unzip -oqj "$DESTINO/$TPZ" "${PADROES[@]}" -d "$T"
    rm -f "$DESTINO/$TPZ"  # 1,3 GB: só as plataformas extraídas ficam
  fi
fi
echo "$BIN"
