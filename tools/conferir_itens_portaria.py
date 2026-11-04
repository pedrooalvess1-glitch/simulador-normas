#!/usr/bin/env python3
"""Confere os números de item da NR-10 citados nos documentos contra o PDF da Portaria MTE 737/2026.

Uso (na raiz do repositório):
    python tools/conferir_itens_portaria.py --pdf docs/referencias/<portaria>.pdf --docs docs
    python tools/conferir_itens_portaria.py --pdf ... --docs docs --refs docs/referencias/prototipo-threejs/codigo-fonte

O que faz:
  1. Extrai o texto do PDF (pypdf; se não houver, tenta o pdftotext do Poppler).
  2. Acha cada item numerado (linha que começa com 10.x.y...) e guarda o início do texto.
  3. Lista todos os itens 10.x.y citados nos .md de --docs (não entra em docs/referencias/).
  4. Gera um relatório Markdown:
       - itens citados que NÃO existem no PDF  -> viram [VERIFICAR NA PORTARIA];
       - cada item citado com o início do texto no PDF, para conferir se o tema bate;
       - itens do PDF que nenhum documento cita (dica de cobertura).
  5. Opcional (--refs): compara o texto de cada item da base REF do protótipo com o do PDF
     e aponta os que não são literais (precisa do Node.js no PATH).

Só lê arquivos; não altera nada. Requisitos: Python 3.9+ e `pip install pypdf` (ou o pdftotext).
Limite conhecido: só confere itens numerados; glossário (Anexo I) e tabelas dos anexos ficam de fora.
"""
from __future__ import annotations

import argparse
import difflib
import json
import re
import shutil
import subprocess
import sys
import unicodedata
from pathlib import Path

ITEM_LINHA = re.compile(r"^\s*(10(?:\.\d+){2,})\s*[.\-–—]?\s+(\S.*)$")
CAPITULO = re.compile(r"^\s*(10\.\d+\s+[A-ZÀ-Ý][A-ZÀ-Ý ,\-–]+|ANEXO\b.*)$")
ITEM_CITADO = re.compile(r"(?<![\d.])(10(?:\.\d+){2,})(?![\d])")


def chave(item: str) -> list[int]:
    return [int(x) for x in item.split(".")]


def texto_do_pdf(pdf: Path) -> str:
    try:
        from pypdf import PdfReader  # type: ignore
        return "\n".join((p.extract_text() or "") for p in PdfReader(str(pdf)).pages)
    except ImportError:
        pass
    exe = shutil.which("pdftotext")
    if exe:
        out = subprocess.run([exe, "-layout", str(pdf), "-"], capture_output=True, check=True)
        return out.stdout.decode("utf-8", errors="replace")
    sys.exit("Instale o pypdf (pip install pypdf) ou o pdftotext (Poppler) para ler o PDF.")


def itens_do_pdf(texto: str) -> dict[str, str]:
    """Mapa item -> texto (a partir da linha em que o item começa, até o próximo item)."""
    itens: dict[str, list[str]] = {}
    atual = None
    for linha in texto.splitlines():
        m = ITEM_LINHA.match(linha)
        if m and m.group(1) not in itens:
            atual = m.group(1)
            itens[atual] = [m.group(2).strip()]
        elif CAPITULO.match(linha):
            atual = None                      # título de capítulo ou anexo encerra o item
        elif atual and linha.strip():
            if sum(len(x) for x in itens[atual]) < 3000:
                itens[atual].append(linha.strip())
    return {k: " ".join(v) for k, v in itens.items()}


def citacoes(docs: Path) -> dict[str, list[str]]:
    achados: dict[str, list[str]] = {}
    for md in sorted(docs.rglob("*.md")):
        if "referencias" in md.relative_to(docs).parts or md.name == "CONFERENCIA_ITENS.md":
            continue                      # o próprio relatório não conta como citação
        for n, linha in enumerate(md.read_text(encoding="utf-8").splitlines(), 1):
            for item in ITEM_CITADO.findall(linha):
                achados.setdefault(item, []).append(f"{md.relative_to(docs)}:{n}")
    return achados


def base_ref(pasta: Path) -> dict[str, str] | None:
    node = shutil.which("node")
    if not node:
        print("Node.js não encontrado: comparação com a base REF ignorada.", file=sys.stderr)
        return None
    js = (
        "const fs=require('fs'),p=process.argv[1];"
        "let s=fs.readFileSync(p+'/refs.js','utf8').replace(/const REF/,'global.REF').replace(/const DIFF/,'global.DIFF');"
        "eval(s);eval(fs.readFileSync(p+'/refs2.js','utf8'));"
        "const o={};for(const k of Object.keys(REF))if(/^10\\./.test(k))o[k]=REF[k].x;"
        "process.stdout.write(JSON.stringify(o));"
    )
    out = subprocess.run([node, "-e", js, str(pasta)], capture_output=True, check=True)
    return json.loads(out.stdout.decode("utf-8"))


def normaliza(s: str) -> str:
    s = unicodedata.normalize("NFKC", s)  # NFKC desfaz ligaduras do PDF (ﬁ → fi)
    s = re.sub(r"-\s+", "", s)          # hifenização de fim de linha
    s = s.replace("-", "")              # hífen real e quebra de linha ficam iguais
    return re.sub(r"\s+", " ", s).strip().lower()


def curto(s: str, n: int = 110) -> str:
    s = s.replace("|", "/")
    return s if len(s) <= n else s[: n - 1] + "…"


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--pdf", required=True, type=Path)
    ap.add_argument("--docs", required=True, type=Path)
    ap.add_argument("--refs", type=Path, help="pasta com refs.js e refs2.js do protótipo (opcional)")
    ap.add_argument("--saida", type=Path, help="arquivo .md de saída (padrão: imprime na tela)")
    ap.add_argument("--estrito", action="store_true",
                    help="sai com código 1 se um item citado ou da base REF não existir no PDF (uso no CI)")
    ap.add_argument("--permitir", default="10.3.9,10.8.8.2",
                    help="itens citados de propósito fora do PDF (redação de 2004 em contexto histórico)")
    a = ap.parse_args()
    erros: list[str] = []

    pdf = itens_do_pdf(texto_do_pdf(a.pdf))
    cit = citacoes(a.docs)
    faltam = sorted((i for i in cit if i not in pdf), key=chave)
    nunca = sorted((i for i in pdf if i not in cit), key=chave)

    r = [f"# Conferência de itens: documentos × PDF da Portaria\n",
         f"- PDF: `{a.pdf.name}` · itens numerados encontrados: **{len(pdf)}**",
         f"- Itens distintos citados em `{a.docs}`: **{len(cit)}**",
         f"- Citados e **ausentes do PDF**: **{len(faltam)}**",
         f"- Itens do PDF que nenhum documento cita: **{len(nunca)}**\n",
         "## 1. Citados e ausentes do PDF → [VERIFICAR NA PORTARIA]\n"]
    r += ["| Item | Onde é citado |", "|---|---|"]
    r += [f"| {i} | {', '.join(cit[i][:6])}{' …' if len(cit[i]) > 6 else ''} |" for i in faltam] or ["| — | — |"]
    r += ["\n## 2. Itens citados: o tema bate?\n",
          "Confira se o início do texto do PDF corresponde ao assunto do documento.\n",
          "| Item | Início do texto no PDF | Citado em |", "|---|---|---|"]
    for i in sorted(cit, key=chave):
        if i in pdf:
            r.append(f"| {i} | {curto(pdf[i])} | {', '.join(cit[i][:3])}{' …' if len(cit[i]) > 3 else ''} |")
    r += ["\n## 3. Itens do PDF que nenhum documento cita\n", ", ".join(nunca) or "—"]

    if a.refs:
        ref = base_ref(a.refs)
        if ref is not None:
            r += ["\n## 4. Base REF do protótipo × PDF (literalidade)\n",
                  "Similaridade < 0,95 indica texto condensado, reescrito ou item com outro conteúdo.\n",
                  "| Item | Similaridade | Situação |", "|---|---|---|"]
            for i in sorted(ref, key=chave):
                if i not in pdf:
                    r.append(f"| {i} | — | ausente do PDF |")
                    erros.append(f"REF {i} não existe no PDF")
                    continue
                x, y = normaliza(ref[i]), normaliza(pdf[i])
                sim = difflib.SequenceMatcher(None, x, y[: len(x) + 40]).ratio()
                if sim < 0.95:
                    r.append(f"| {i} | {sim:.2f} | {'conferir palavra por palavra' if sim >= 0.6 else 'tema provavelmente diferente'} |")
            faltam_ref = sorted((i for i in pdf if i not in ref), key=chave)
            r += [f"\nItens do PDF fora da base REF: {', '.join(faltam_ref) or '—'}"]
            erros += [f"item {i} do PDF fora da base REF" for i in faltam_ref]

    saida = "\n".join(r) + "\n"
    if a.saida:
        a.saida.write_text(saida, encoding="utf-8")
        print(f"Relatório gravado em {a.saida}")
    else:
        sys.stdout.write(saida)

    permitidos = {x.strip() for x in a.permitir.split(",") if x.strip()}
    erros = [f"item {i} citado em {cit[i][0]} não existe no PDF" for i in faltam if i not in permitidos] + erros
    if a.estrito:
        for e in erros:
            print(f"ERRO: {e}", file=sys.stderr)
        print(f"Conferência estrita: {len(erros)} erro(s).")
        sys.exit(1 if erros else 0)


if __name__ == "__main__":
    main()
