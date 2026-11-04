# Próxima sessão: continuar o simulador NR-10 offline

> Arquivo de passagem gerado em 04/11/2026 ao fim da sessão que fez a rev3, a rev4 e o primeiro *push*.
> Como usar: abra uma sessão nova do Claude Code com o repositório `pedrooalvess1-glitch/simulador-normas` selecionado e cole o bloco do §6 como primeira mensagem. O `CLAUDE.md` é carregado sozinho.

---

## 1. Onde o projeto está

| Item | Estado em 04/11/2026 |
|---|---|
| Repositório | `pedrooalvess1-glitch/simulador-normas` (público, MIT). `main` em dia (PRs #1, #2 e #3). O GitHub é a fonte da verdade. |
| GitHub ↔ Claude | Vinculado (app "Claude" instalado no repositório). A sessão na nuvem consegue *push*, abrir PR (API REST; a GraphQL é bloqueada) e fazer *merge*. |
| CI | `.github/workflows/ci.yml`: build do protótipo, `node --check`, `dist/` igual ao build e itens contra o PDF (`--estrito`). *Merge* só com CI verde. |
| Simulador offline | **v4**, em `prototipo/dist/simulador-nr10-offline.html` (~975 KB, abre com duplo clique, sem internet). |
| Artifact no claude.ai | v4 publicada num link novo (`https://claude.ai/artifact/DB8sPFyo8WbQEGVVdmfjxD`). O link antigo (`…/YJ357CT4K7ahbnstJkS3H6`) ainda mostra a v2: ignorar ou apagar com a confirmação do usuário. |
| Prova | Engenheiro Elétrico, Prefeitura de Floresta/PE (banca FACET), data provável **13/12/2026**. Até lá, a Trilha 1 (este simulador) tem prioridade. |

## 2. O que a v4 tem (resumo)

1. **História** (abre por padrão, `historia.js`): desenho SVG estático da cabine primária 13,8 kV com 27 objetos clicáveis ligados a itens; OS em 14 passos (questões, achar objetos, caça a 4 não conformidades, 10.13.1 e 10.13.2 aplicados na cena); explorar a cena; índice item × cena.
2. **Mapa, fases I–IV e Missão** (cenas 3D three.js r128): enquadramento, zonas, projeto, coletiva, organização, pessoas, individual, desenergizado, energizado, documentação, Missão OS 0457.
3. **Treino** (`treino.js` + `qbank.js`): simulado de 10–40 questões com cronômetro, revisão espaçada (Leitner, 5 caixas), gerador de 11 tipos de cenário, 42 cartões, painel com contagem regressiva. Banco: 114 questões.

Detalhe completo: `docs/STATUS_SIMULADOR_NR10.md` §4–§8.

## 3. Backlog da versão offline (ordem sugerida)

Prioridade = o que mais ajuda a acertar questão de banca até 13/12.

1. **Treino v4 · distratores:** em toda questão, explicar por que cada alternativa errada está errada, citando o item. (Hoje só a certa é explicada.)
2. **Treino v4 · 5 alternativas:** levar o banco ao formato de banca (A–E). Muitas questões têm 2 a 4.
3. **Itens nunca exercitados:** criar questões ou cartões para `10.4.5, 10.4.11, 10.7.10, 10.8.3.1, 10.8.4.1, 10.8.4.1.1, 10.10.1, 10.12.2, 10.12.5, 10.12.7` e uma matriz item → tarefa (STATUS §7, lacuna 1).
4. **Glossário (Anexo I):** 41 termos ausentes da base + ATPV, EBT e ELIM do Anexo IV. Texto literal do PDF, nunca de memória.
5. **História 2 e 3:** novas OS em outros ambientes, reaproveitando o formato `HS`/`ST`: BT/SEC (QDC de prédio), canteiro de obra (instalação temporária, 10.2.1) e, se der tempo, SEP/linha.
6. **Anexo III e Anexo IV Quadro III:** conteúdos mínimos dos treinamentos e notas de rodapé exercitados (hoje só resumidos).
7. **Exportar/importar progresso** (JSON) para não perder o Treino ao trocar de navegador (hoje só `localStorage`).
8. **Navegação:** a aba "Mapa" sai da linha de fases em telas ≤ ~1400 px.

Cada item: *branch* → implementar → `python3 build.py --offline && cp simulador-nr10-offline.html dist/` → teste → PR → CI verde → *merge* → republicar o Artifact (mesmo link) → atualizar `STATUS`.

## 4. Regras que não podem falhar

1. Texto da NR-10 **só do PDF** (`docs/referencias/portaria-mte-no-737-nova-nr-10.pdf`), literal e com o número do item. Rodar o script de conferência depois de mexer em `REF` ou em `docs/`.
2. Edição única: só a Portaria MTE 737/2026.
3. Rótulos [FONTE], [PRÁTICA], [INFERÊNCIA], [INTERPRETAÇÃO], [VERIFICAR].
4. `dist/simulador-nr10-offline.html` tem de ser idêntico ao build, senão o CI reprova.
5. Não comitar `prototipo/bundle.js` nem `prototipo/simulador-nr10*.html` fora de `dist/`.
6. Resposta ao usuário: PT-BR, numerada, ponto a ponto, explicando o mecanismo de cada decisão (`CLAUDE.md` §8).

## 5. Comandos

```bash
cd prototipo
python3 build.py && node --check bundle.js                       # sintaxe + fragmento do Artifact
python3 build.py --offline && cp simulador-nr10-offline.html dist/
python3 tools/teste_playwright.py                                # teste headless (timeout ≥ 9 min)
cd ..
python3 tools/conferir_itens_portaria.py --pdf docs/referencias/portaria-mte-no-737-nova-nr-10.pdf \
  --docs docs --refs prototipo --saida docs/CONFERENCIA_ITENS.md --estrito
# PR pela API REST:  gh api repos/pedrooalvess1-glitch/simulador-normas/pulls --input pr.json
```

Armadilhas já vistas: comentário `//` dentro de linha concatenada engole o resto (use `/* */`); `const` usado antes da declaração entre arquivos (cuidado com a ordem do `build.py`); retângulos de clique sobrepostos na cena SVG travam o teste Playwright.

## 6. Prompt para colar na nova sessão

```
Claudinho, vamos continuar o projeto simulador-normas (Trilha 1: simulador NR-10 offline).
1. Leia docs/PROXIMA_SESSAO.md e docs/STATUS_SIMULADOR_NR10.md.
2. Sincronize com origin/main e confira que o CI da main está verde.
3. Siga o backlog do §3 do PROXIMA_SESSAO.md, começando pelo item 1, um PR por item, com CI verde antes do merge.
4. A cada PR com mudança no app, atualize prototipo/dist/, republique o Artifact v4 (mesmo link) e me mande o HTML offline novo.
5. Ao fim, atualize STATUS e este arquivo de passagem.
Responda em PT-BR, numerado e ponto a ponto. Você tem permissão total no repositório (CLAUDE.md §2).
```
