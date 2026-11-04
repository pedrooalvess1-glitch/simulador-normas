#!/usr/bin/env python3
"""Testes do tools/checar_links.py: âncoras no formato do GitHub e detecção de link quebrado.

Uso: python3 tools/test_checar_links.py  (sai com código 1 se algum caso falhar)
"""
import importlib.util
import sys
import tempfile
from pathlib import Path

AQUI = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("checar_links", AQUI / "checar_links.py")
cl = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cl)

ANCORAS = [  # título → âncora que o GitHub gera
    ("5. Mapa dos documentos", "5-mapa-dos-documentos"),
    ("A função `act()` e o _MODELO_", "a-função-act-e-o-modelo"),
    ("Arquivo 00_INDICE e **negrito**", "arquivo-00_indice-e-negrito"),
    ("`_MODELO_DOCUMENTO.md`", "_modelo_documentomd"),
    ("Etapa D — ambiente de execução", "etapa-d--ambiente-de-execução"),
    ("Ver [o roteiro](ROTEIRO.md)", "ver-o-roteiro"),
]

falhas = [f"ancora({t!r}) = {cl.ancora(t)!r}, esperado {e!r}" for t, e in ANCORAS if cl.ancora(t) != e]

with tempfile.TemporaryDirectory() as d:
    raiz = Path(d)
    (raiz / "b.md").write_text("## Seção 1.2: teste\n## Seção 1.2: teste\n```\n## não é título\n```\n", encoding="utf-8")
    (raiz / "a.md").write_text(
        "[ok](b.md#seção-12-teste)\n[ok](b.md#seção-12-teste-1)\n[ext](https://x.org/y)\n`[código](z.md)`\n"
        "[ruim](nao-existe.md)\n[ruim](b.md#não-é-título)\n",
        encoding="utf-8",
    )
    cl.RAIZ = raiz
    erros = cl.checar()
    esperado = {"nao-existe.md", "b.md#não-é-título"}
    achados = {e.split("'")[1] for e in erros}
    if achados != esperado:
        falhas.append(f"links quebrados achados {sorted(achados)}, esperado {sorted(esperado)}")

for f in falhas:
    print("FALHOU:", f)
print(f"{len(ANCORAS) + 1 - len(falhas)}/{len(ANCORAS) + 1} casos OK")
sys.exit(1 if falhas else 0)
