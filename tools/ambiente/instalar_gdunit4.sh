#!/usr/bin/env bash
# Copia o addon gdUnit4 (tag e commit de versoes.env) para <projeto>/addons/gdUnit4, sem a pasta test/.
# O git clone funciona pelo proxy da sessão na nuvem (as páginas e a API do GitHub de terceiros, não).
# Uso: tools/ambiente/instalar_gdunit4.sh <pasta_do_projeto_godot>
set -euo pipefail
AQUI="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$AQUI/versoes.env"
PROJETO="${1:?informe a pasta do projeto Godot}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
git -c advice.detachedHead=false clone -q --depth 1 --branch "$GDUNIT4_TAG" https://github.com/MikeSchulze/gdUnit4 "$TMP/g"
[[ "$(git -C "$TMP/g" rev-parse HEAD)" == "$GDUNIT4_COMMIT" ]] || { echo "Commit do gdUnit4 não confere" >&2; exit 1; }
rm -rf "$PROJETO/addons/gdUnit4"
mkdir -p "$PROJETO/addons"
cp -r "$TMP/g/addons/gdUnit4" "$PROJETO/addons/"
rm -rf "$PROJETO/addons/gdUnit4/test"
echo "gdUnit4 $GDUNIT4_TAG em $PROJETO/addons/gdUnit4"
