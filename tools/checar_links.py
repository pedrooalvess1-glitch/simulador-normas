#!/usr/bin/env python3
"""Checa links internos quebrados nos arquivos Markdown do repositório.

Uso (na raiz do repositório):
    python3 tools/checar_links.py

O que faz:
  1. Percorre todos os .md do repositório (fora de .git/ e de pastas de dependência).
  2. Acha cada link Markdown [texto](destino) e cada referência [texto]: destino.
  3. Ignora links externos (http, https, mailto) e âncoras puras (#secao).
  4. Resolve o destino relativo ao arquivo (ou à raiz, se começar com /) e confere se o arquivo
     ou a pasta existe. Se houver âncora (arquivo.md#secao), confere também se o título existe.
  5. Sai com código 1 e lista os links quebrados, para o CI barrar o PR.

Só lê arquivos; não altera nada. Requisito: Python 3.9+.
"""
from __future__ import annotations

import re
import sys
import unicodedata
from pathlib import Path
from urllib.parse import unquote

RAIZ = Path(__file__).resolve().parent.parent
IGNORAR = {".git", "node_modules", ".godot", "__pycache__"}
LINK = re.compile(r"(?<!!)\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+\"[^\"]*\")?\s*\)")
IMAGEM = re.compile(r"!\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+\"[^\"]*\")?\s*\)")
REFERENCIA = re.compile(r"^\s{0,3}\[[^\]]+\]:\s*<?(\S+?)>?(?:\s+.*)?$", re.M)
CODIGO = re.compile(r"```.*?```|`[^`\n]*`", re.S)
TITULO = re.compile(r"^#{1,6}\s+(.*?)\s*#*\s*$", re.M)


def ancora(titulo: str) -> str:
    """Âncora no formato do GitHub: minúsculas, sem pontuação, espaços viram hífen (acentos ficam)."""
    t = unicodedata.normalize("NFC", titulo.strip().lower())
    t = re.sub(r"[`*_~]", "", t)
    t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", t)
    t = "".join(c for c in t if c.isalnum() or c in " -")
    return t.replace(" ", "-")


def ancoras_de(arquivo: Path, cache: dict[Path, set[str]]) -> set[str]:
    if arquivo not in cache:
        vistas: dict[str, int] = {}
        resultado = set()
        for titulo in TITULO.findall(CODIGO.sub("", arquivo.read_text(encoding="utf-8"))):
            base = ancora(titulo)
            n = vistas.get(base, 0)
            resultado.add(base if n == 0 else f"{base}-{n}")
            vistas[base] = n + 1
        cache[arquivo] = resultado
    return cache[arquivo]


def arquivos_md() -> list[Path]:
    return sorted(
        p for p in RAIZ.rglob("*.md")
        if not any(parte in IGNORAR for parte in p.relative_to(RAIZ).parts)
    )


def checar() -> list[str]:
    erros: list[str] = []
    cache: dict[Path, set[str]] = {}
    for md in arquivos_md():
        texto = CODIGO.sub("", md.read_text(encoding="utf-8"))
        destinos = LINK.findall(texto) + IMAGEM.findall(texto) + REFERENCIA.findall(texto)
        for destino in destinos:
            if re.match(r"^[a-z][a-z0-9+.-]*:", destino, re.I) or destino.startswith("#"):
                continue
            caminho, _, frag = destino.partition("#")
            caminho = unquote(caminho)
            alvo = (RAIZ / caminho.lstrip("/")) if caminho.startswith("/") else (md.parent / caminho)
            alvo = alvo.resolve()
            onde = md.relative_to(RAIZ)
            if not alvo.exists():
                erros.append(f"{onde}: link para '{destino}' — arquivo não existe")
            elif frag and alvo.suffix == ".md" and unquote(frag).lower() not in ancoras_de(alvo, cache):
                erros.append(f"{onde}: link para '{destino}' — seção '#{frag}' não existe")
    return erros


def main() -> int:
    erros = checar()
    total = len(arquivos_md())
    if erros:
        print(f"{len(erros)} link(s) interno(s) quebrado(s) em {total} arquivos .md:")
        for e in erros:
            print(f"  - {e}")
            print(f"::error::{e}", file=sys.stderr)
        return 1
    print(f"Links internos OK em {total} arquivos .md.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
