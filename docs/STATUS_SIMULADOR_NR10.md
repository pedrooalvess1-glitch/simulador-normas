# Simulador NR-10 — status do projeto e do protótipo

> Documento de passagem de sessão. Criado em 02/11/2026; atualizado em 03/11/2026 (rev2, edição única; rev3, agente com permissão total e fase Treino).
> Objetivo: permitir que uma nova sessão continue o projeto **sem refazer o raciocínio** já feito.
> Leia na ordem: §0 → §2.1 (situação do projeto) → §2.2 (próximos passos) → §3 e §7 (as mais importantes para a revisão de conteúdo).
>
> **Escopo normativo: edição única.** Só a NR-10 na redação da **Portaria MTE 737/2026** (`00_INDICE` §1.1).

---

## Histórico de revisões

| Revisão | Data | Mudança |
|---|---|---|
| rev1 | 02/11/2026 | Versão inicial: status do protótipo v2 (three.js), auditoria de cobertura e prompt de continuação. |
| rev2 | 03/11/2026 | **Edição única (Portaria MTE 737/2026).** Nova §2.1 com a situação do projeto (guia, passos 1–24). §1, §3.2, §4.2, §5, §5.1, §6, §7 e §8 sem o modelo de duas edições. O protótipo passou a "v2 · edição única" (`simulador-nr10-codigo-fonte-edicao-unica.zip`). §10 com o resultado dos testes desta revisão. §11 (prompt) substituída por ponteiro para o guia. A cópia deste arquivo dentro do zip virou ponteiro para `docs/STATUS_SIMULADOR_NR10.md`. |
| rev3 | 03/11/2026 | Agente com permissão total (U1–U4). Prova provável em 13/12/2026. PDF conferido (133 itens). Protótipo **v3**: fase Treino (simulado, revisão espaçada, gerador, cartões, painel) e base `REF` com 10.2.4.1 e Art. 1º, 2º e 4º. Commit `rev3` preparado para o primeiro *push*. §1 reduzida (repositório público). Nova §2.2. |

---

## 0. Como usar este documento

1. Este arquivo fica em `docs/` do repositório `simulador-normas`. O agente lê o repositório; não é preciso anexar nada.
2. Regras permanentes do agente: `CLAUDE.md` (raiz). Passos operacionais: `docs/01_PASSO_A_PASSO_INICIO_CLAUDE_CODE.md`.
3. A fonte de verdade do conteúdo é o PDF da Portaria MTE nº 737/2026 em `docs/referencias/`.
4. O protótipo three.js (Trilha 1, ferramenta de estudo) fica em `prototipo/`; o HTML offline pronto, em `prototipo/dist/`.
5. O que está em §3 são **decisões didáticas tomadas e justificadas**. O que está em §7 e §8 são **lacunas conhecidas**.

---

## 1. Contexto do usuário

- **Autor:** Pedro Alves, engenheiro eletricista. (Rev3: dados pessoais reduzidos, porque o repositório é público.)
- **Para que serve o simulador:** dominar a NR-10 para uso permanente e para concursos de Engenheiro Elétrico. A próxima prova (banca FACET) tem data provável de **13/12/2026** (Aditivo 2 do edital, de 30/10/2026; antes era 22/11/2026). A estratégia principal de estudo dele é resolver provas passadas.
- **Vigência e escopo:** a Portaria MTE 737/2026 entra em vigor um ano após a publicação (Art. 5º; DOU de 01/06/2026) [FONTE: PDF]. O simulador implementa **só** essa redação (edição única), decisão reafirmada pelo usuário em 03/11/2026 também para o material de estudo.
- **Como ele quer trabalhar (rev3):** curva de aprendizado mínima em Blender, Godot e VS Code; o agente opera tudo; ele só manda fotos, testa, concede permissões e responde o essencial (`CLAUDE.md` §2).
- **Preferências de resposta:** ver `CLAUDE.md` §8.
- **Pedido original (resumo fiel):** "operação variável em 3D de um local de operação flexível", com cenários variados conforme a NR-10; pelo menos 4 módulos, podendo ser mais; camadas do macro ao micro; cada ação com fundamento na norma; ambientes industriais, civis, manutenção, obra do zero; incluir fardamento/EPI, protocolos de entrada, sinalização, estação de trabalho, ergonomia, responsáveis, APR, habilitação, qualificação, proteção individual e coletiva, energização e desenergização, pré e pós-trabalho. Meta: entender a aplicação da NR-10 **sem ler linha por linha e sem montar fluxograma de correlações à mão**.

---

## 2. O que existe hoje

| Entregável | Descrição |
|---|---|
| Repositório `pedrooalvess1-glitch/simulador-normas` | Público, MIT. Remoto ainda só com o `Initial commit`. O commit `rev3` (documentos rev3, PDF, protótipo v3, `CLAUDE.md`, `AGENTS.md`, `tools/`) está pronto e entra com o passo 25. Depois disso, o GitHub é a fonte da verdade. |
| `prototipo/` | Protótipo **v3** (three.js r128): 13 módulos, incluindo a fase **Treino**. |
| `prototipo/dist/simulador-nr10-offline.html` | App autocontido (~920 KB). Abre com duplo clique, sem internet. |
| Artifact no claude.ai | Ainda a v2 (com chips "≠ 2004"). Republicar com a v3 é o passo T2b do guia. |
| `simulador-nr10-codigo-fonte*.zip` | Versões antigas do protótipo. Substituídas pelo repositório; só histórico. |

Versões do protótipo:
- **v1**: 7 "camadas" independentes.
- **v2**: reorganizada pela arquitetura da norma (§3), com Mapa, primers, registro de erros, Documentação/GIR, Missão integrada.
- **v2 · edição única**: v2 sem chips "≠ 2004", sem `DIFF`, sem modo 2004.
- **v3 (atual, 03/11/2026)**: fase **Treino** (§5.2) e base `REF` completa nos itens numerados (133 de 133).

### 2.1 Situação do projeto (03/11/2026)

Passos do guia `01_PASSO_A_PASSO_INICIO_CLAUDE_CODE.md` (rev2):

| Etapa | Passos | Situação |
|---|---|---|
| A — Contas e decisões | 1–8 | Concluída: GitHub `pedrooalvess1-glitch` com 2FA; repositório público `simulador-normas`, MIT; Claude Pro com a aba Code; computador de teste (notebook Acer 2018, Radeon R5 integrada, 7,5 GB de RAM); pasta `C:\projetos`. |
| B — Ferramentas | 9–18 | Concluída: Git 2.56.0, VS Code 1.140.0 com `godot-tools`, Godot 4.7.2 standard (export templates só Windows x86_64), Blender 4.5.10 LTS. Passo 17: Compatibility via ANGLE/D3D11 na R5, ~496 FPS sem sombra e ~75 FPS com sombra (cena trivial). |
| C — Repositório | 19–22 | Concluídos: repositório criado e clonado em `C:\projetos\simulador-normas`; pastas com `.gitkeep`; documentos de planejamento copiados para `docs/`. |
| C — Repositório | 23 | Concluído: `docs/referencias/portaria-mte-no-737-nova-nr-10.pdf` (673.795 bytes), conferido em 03/11/2026. |
| C — Repositório | 24–25 | Preparados: commit `rev3` com o protótipo em `prototipo/`. Falta o *push*: vincular o GitHub à conversa (U3) ou fazer no passo 31 da sessão Local. |
| C — Repositório | 26–28 | Pendentes (agente, via `gh`). A cópia local em `C:\projetos\simulador-normas` ainda tem os `.md` da rev1 fora do Git: o passo 31 sincroniza com o GitHub. |
| D | 29–30 | 👤 Abrir a sessão Local (modo Auto ou Bypass) e fazer login do GitHub uma vez. |
| E | 35–36, 44–45 | Escritos na rev3 (entram com o passo 25): `CLAUDE.md`, `AGENTS.md`, `docs/PENDENCIAS_DE_VERIFICACAO.md`, `docs/DECISOES.md`. |
| D a H | demais | Pendentes; todos do agente, exceto os testes no notebook (69, 76, 79). |
| T | T1–T2 | Concluídos: fase Treino e HTML offline. T2b (Artifact v3) pendente. |

Conferência no PDF (rev3): `tools/conferir_itens_portaria.py` achou 133 itens numerados; todos os números de 2026 citados nos documentos existem; as pendências 12–19 da `00_INDICE` §10 foram resolvidas. Relatório em `docs/CONFERENCIA_ITENS.md`.

### 2.2 Próximos passos (em ordem)

1. 👤 Vincular a conta do GitHub à conversa do Claude (o agente faz o passo 25 na hora) **ou** abrir a sessão Local e fazer o login do GitHub (passos 29–30).
2. 🤖 Passos 31–34: sincronizar, testar Git, Godot e Blender.
3. 🤖 Treino v4 (Trilha 1): explicação dos distratores, mais questões de 5 alternativas, cartões dos itens nunca exercitados.
4. 🤖 Etapa E restante (38–43, 46) e Etapa F (documentos 01, 14, 04…).
5. 👤 Quando quiser: mandar a primeira foto de equipamento (Etapa I).

---

## 3. Arquitetura didática (decisões tomadas)

### 3.1 Diagnóstico que motivou a v2
1. Módulos eram ilhas: não mostravam que um item se apoia em outro (ex.: 10.4.1 projeta o dispositivo que recebe o cadeado na etapa c do 10.13.1). Isso era exatamente a dor do usuário.
2. A ordem "macro → micro" era arbitrária (Zonas ficava por último, embora o Anexo II defina o alcance da norma pelo 10.2.2).
3. Não havia caso integrado; a norma é aplicada em sequência numa ordem de serviço.
4. Faltavam capítulos inteiros (10.15, 10.12, áreas classificadas, sobretensões).

### 3.2 Ideia central
**A ordem dos capítulos da NR-10 já é a hierarquia de controle do 10.5.4**: eliminação (10.5) → proteção coletiva (10.6) → medidas administrativas (10.7, que pelo 10.7.12 absorve pessoas 10.8–10.10) → proteção individual (10.11). O simulador segue a arquitetura do texto em **quatro fases**, cada uma respondendo a uma pergunta:

| Fase | Pergunta | Módulos (id) | Capítulos |
|---|---|---|---|
| Mapa | Como a norma se organiza? | `mapa` | todos |
| I Aplicação | A NR-10 me alcança? Com que intensidade? | `enq` → `zonas` | 10.1, 10.2, Anexo I, Anexo II |
| II Controle | Como o risco é controlado, na ordem da hierarquia? | `projeto` → `coletiva` → `organizacao` → `pessoas` → `individual` | 10.3, 10.4, 10.5, 10.6, 10.7, 10.8–10.10, 10.11, Anexos III e IV |
| III Execução | Como se trabalha? | `desenergizado` → `energizado` | 10.12, 10.13, 10.14 |
| IV Prova | Como se comprova e o que paralisa? | `documentacao` | 10.15, 10.16 |
| Missão | Tudo junto | `missao` | transversal |

Princípios pedagógicos adotados:
- **Advance organizer:** o app abre no Mapa (visão do todo antes das partes).
- **Primer por módulo** ("Como este capítulo pensa"): lógica do capítulo em 3–5 frases + "Liga com" (links para outros módulos com o item que faz a ponte). Aberto na primeira visita, recolhido depois.
- **Toda correção cita o item** (chip clicável que abre o texto da Portaria numa gaveta lateral).
- **Explicar o mecanismo físico** quando ele existe (arco na seccionadora sob carga, aterrar sem constatar = curto franco, extensão condutora conta como corpo, backfeed pelo transformador).
- **Trilhas temáticas** = os fluxogramas de correlação prontos (choque, arco, desenergização, pessoa autorizada, documento).
- **Registro de erros por item** → heatmap no mapa e lista "Pontos fracos".
- **Missão integrada** com diagnóstico que manda o aluno de volta aos módulos onde errou.

Rev2: saiu o princípio "diferenças 2004 × 2027 sempre visíveis (chips '≠ 2004')" e a trilha "O que mudou desde 2004" (edição única).

---

## 4. Arquitetura técnica (protótipo three.js)

### 4.1 Build
- Fontes separados, concatenados por `build.py` num HTML único.
- Ordem de concatenação do JS (importa para `const` globais):
  `refs.js, refs2.js, engine.js, qbank.js, mapa.js, m1.js, m7.js, m2.js, m4.js, m5.js, m3.js, m6.js, m8.js, missao.js, treino.js, main.js`.
  A ordem visual dos módulos é definida em `main.js` (`ORDER`), não pela concatenação.
- `python3 build.py` → `simulador-nr10.html` (fragmento sem `<html>/<head>`, three.js via cdnjs r128; é o formato exigido pelo Artifact do claude.ai, que adiciona o esqueleto).
- `python3 build.py --offline` → `simulador-nr10-offline.html` (documento completo com `<meta charset="utf-8">` e `vendor/three.min.js` embutido).
- `bundle.js` é gerado a cada build (útil para `node --check bundle.js`).
- Dependências externas: three.js **r128** (UMD, global `THREE`; licença MIT, `vendor/THREE-LICENSE.txt`, © 2010-2021 three.js authors); Google Fonts (Barlow Condensed, Public Sans, IBM Plex Mono) com fallback.

### 4.2 Arquivos
| Arquivo | Conteúdo |
|---|---|
| `style.css` | Tokens de cor (claro/escuro), layout, header de fases, painel, cards, mapa SVG, gaveta. Identidade: cinza técnico + âmbar de sinalização, fita zebrada sob o header. (As classes `.diff-chip` e `.cmp` ficaram sem uso na edição única.) |
| `refs.js` | `REF` (texto da norma por item). `DIFF` ficou como objeto vazio na edição única, só para não quebrar `engine.js` e `mapa.js`. |
| `refs2.js` | Itens complementares + notas sobre NR-1/3/6/7/17/23/26 e resumo do Anexo III (`n:1` = nota do simulador, não texto da norma). |
| `engine.js` | Utilidades, motor 3D, picking, pins, interface (nav, painel, primer, gaveta), componentes de tarefa. Na edição única, `D()` devolve vazio e `openDiff()` não faz nada. |
| `mapa.js` | `chapOf()` global + módulo Mapa (grafo SVG, trilhas, pontos fracos). |
| `m1.js` | Enquadramento (+ `ZTAB`, `zoneRow`, `faixa`, `FX` globais usados por outros módulos). |
| `m2.js` | Projeto e obra (DDR, auditoria 10.4, memorial). |
| `m3.js` | Pessoas e autorização. |
| `m4.js` | Coletiva + Individual (compartilham a cena "sala de painéis"). |
| `m5.js` | Organização do trabalho (inspeção, rotina × PT, PT/APR). Exporta `window.GIR_ITEMS`. |
| `m6.js` | Desenergizado (sequências 10.13.1/10.13.2). |
| `m7.js` | Zonas + Energizado (compartilham a cena das esferas). |
| `m8.js` | Documentação e GIR. |
| `missao.js` | Missão integrada (reusa a cena de `desenergizado`). |
| `main.js` | `ORDER`, migração de progresso, `boot()`, delegação de cliques, hash. |
| `qbank.js` | *(v3)* `QB` (banco de questões registrado pelos módulos), `SRS` (Leitner, 5 caixas), `STATS` (acerto por capítulo) e o invólucro de `quiz()` que alimenta os dois. |
| `treino.js` | *(v3)* Fase Treino: simulado, revisão, gerador (11 tipos), 42 cartões, painel. Dados normativos conferidos no PDF. |
| `primers.py` | Textos dos primers (fonte usada para gerar o código; não entra no build). |
| `tools/teste_playwright.py` | Teste headless (ver §10). |
| `STATUS_SIMULADOR_NR10.md` | Na edição única, ponteiro para `docs/STATUS_SIMULADOR_NR10.md` (antes era cópia idêntica deste arquivo). |

### 4.3 Modelo de módulo
```js
{ id:'desenergizado', phase:'III',            // 'map' | 'I' | 'II' | 'III' | 'IV' | 'mis'
  name:'…', short:'…', scene:'…', vpE?:'…',   // rótulos
  primer:{logic:'…', links:[[modId, 'por quê', [refs]], …]},
  brief:'…', base:[refs], diffs?:[diffKeys],  // diffs: sem uso na edição única
  cam:{theta,phi,r,t:[x,y,z],rMax},           // câmera orbital
  view?:'map',                                 // só o Mapa: troca o canvas por SVG
  reset(), build(), info?:{hotId:{t,b,r,d}}, onPick?(hotId)->bool, onTask?(taskId),
  tasks:[{id:'a', title:'…', free?:1, render(el, api)}] }   // api.done() marca concluída
```
- `MODS.push(...)` em cada arquivo; `main.js` ordena por `ORDER`.
- Tarefa `free:1` não conta no progresso (ex.: Pontos fracos).

### 4.4 API do motor (engine.js)
- 3D: `box/boxB/cyl/sph/grp/rod/line/sag/plate/label/person`, materiais via `M()` (sempre material novo por mesh), `setEm(mesh,hex,intensity)` (emissivo base; usado para "energizado" pulsante), `tween(dur,fn,done)`.
- Hotspots: `hot(obj,id,label,{dy,noPin})` → clicável + marcador (sprite sem atenuação de tamanho). Clique chama `mod.onPick(id)`; se retornar falso, usa `mod.info[id]`.
- UI: `loadModule(id)`, `reloadScene()`, `selectTask(i)`, `gotoTask(id)`, `activeTask()`, `fb({k:'ok|err|info|warn', t, b, r:[refs], d:diffKey, gir})`, `toast()`, `banner()`, `cardHTML()`, `R(ref)`, `Rs([refs])`, `D(diffKey)`, `openRef/openDiff/openIndex`. Na edição única, `d`/`D()`/`openDiff` continuam na API, mas não produzem nada.
- Componentes: `quiz(el,api,questions)` com `{q,o[],a,x,r[],d}`; `classify(el,api,{options,items:[{t,a,x,r,d,gir}]})`; `pickList(el,api,{items:[{t,c}],x,r,onDone})`.
- Erros: `miss(refs)` incrementa `Store.data.miss[ref]` (chamado por quiz, classify, pickList, missão).
- Estado persistido em `localStorage['nr10sim.v1']`: `done[mod][task]`, `miss[ref]`, `pr[mod]` (primer visto).
- Fases: `PHASES`, `modsOf()`, `renderNav()` (linha 1 = fases com contagem; linha 2 = módulos da fase; na fase II, setas → indicando a hierarquia).
- Hash: `#mapa`, `#enq`, … abre o módulo.

---

## 5. Inventário de módulos (v2 · edição única)

| id | Fase | Cena 3D | Tarefas | Itens-base |
|---|---|---|---|---|
| `mapa` | Mapa | SVG (sem 3D) | Explorar (abrir 6 capítulos) · Trilhas (5) · Pontos fracos (livre) | 10.1.1, 10.5.4, 10.16.1 |
| `enq` | I | Cadeia geração → transmissão → distribuição → poste com telecom → medição → cabine → indústria → gerador; chão dividido SEP/SEC | Cadeia (8 pontos) · Classificador (tensão, CA/CC, SEP/SEC, atividade, área classificada, estrangeiro → faixa do glossário, Rr/Rc, treinamentos, módulos de capacitação, PIE, individual, religamento, ensaios, arco) · Casos (8 questões) | 10.1.1, 10.2.1, 10.2.4, glossário, Anexo II |
| `zonas` | I | Parte energizada com esferas ZR/ZC em escala real, trabalhador móvel, extensão condutora/isolante, superfície isolante (clipping) | Bancada (visitar ZR, ZC, ZL) · Situações (5) | Anexo II, glossário ZR/ZC/ZL, 10.2.2, 10.2.3 |
| `projeto` | II | Casa/restaurante em planta (cômodos clicáveis), QDC, padrão, haste, bomba de incêndio | DDR (alíneas a–e, modo residencial/não residencial, exceção 10.6.4.1) · Auditoria do 10.4 (11 afirmações) · Memorial 10.4.9 | 10.4.1, 10.4.8, 10.4.9, 10.6.4, 10.6.4.1 |
| `coletiva` | II | Sala de painéis (painel 220 V, painel 440 V, CCM 480 V, metal-clad 13,8 kV, baterias 220 Vcc, tapete) | Hierarquia (ordenar 4 níveis + classificar 14 medidas: básica/parcial/supletiva/adicional/arco) · Arco, Ex e surtos (8) | 10.5.1, 10.5.4, 10.6.1, 10.6.1.1, 10.6.5, 10.6.6 |
| `organizacao` | II | Sala elétrica com 10 não conformidades + 4 itens conformes | Inspeção (relatório 10.7.11 ao final) · Rotina × PT (6) · PT e APR (conteúdo mínimo + 4 questões) | 10.7.1–10.7.4, 10.7.11 |
| `pessoas` | II | Pátio com 9 trabalhadores (fichas) e quadro de autorizações | Equipe (9 fichas) · Autorização (11 V/F) | 10.8.1–10.8.3, 10.10.2, 10.10.2.1, 10.9.2 |
| `individual` | II | Mesma sala + manequim que muda conforme o EPI | Categoria (10 cenários do Anexo IV) · Vestir EPI (passar em 2 categorias) | 10.11.x, Anexo IV Quadros I e III |
| `desenergizado` | III | Subestação abrigada 13,8 kV: cubículo de entrada (barramento sempre energizado), 89-1 com lâminas articuladas, 52-1 com lâmpada, TR-01, barra de terra, carrinho (detector, aterramento, cadeado, etiqueta, anteparo, cones), visitante | Desenergizar (7 etapas do 10.13.1; erros físicos e GIR) · Reenergizar (7 etapas do 10.13.2) · Pegadinhas (7) | 10.13.1–10.13.4, 10.16.1 |
| `energizado` | III | Mesma cena das esferas | Regras (9) · Bancada | 10.5.2, 10.14.1–10.14.4, 10.12.1 |
| `documentacao` | IV | Arquivo técnico: estante PIE com 9 pastas, mesa (doc digital), auditor-fiscal | Quem guarda o quê (9) · Precisa de PIE? (7) · GIR (8) | 10.15.3–10.15.7, 10.16.1 |
| `treino` | Treino *(v3)* | Painel de estudo (sem 3D) | Simulado (10–40 questões, cronômetro) · Revisão espaçada · Gerador (11 tipos) · Cartões (42) — todas livres, não contam no progresso | 10.9.2, 10.13.1, 10.13.2, Anexo II, Anexo IV |
| `missao` | Missão | Reusa a subestação | OS 0457: 12 decisões (enquadramento, documento, APR, equipe, supervisão, EPI, avaliação prévia, ordenar 10.13.1, backfeed pelo gerador, troca de turno/PT, ordenar 10.13.2, encerramento) → diagnóstico por módulo | 10.7.2, 10.7.4, 10.13.1, 10.13.2, 10.15.6 |

Total: 13 módulos. O banco do Treino reúne 106 questões dos módulos (quizzes + listas de classificação convertidas + decisões da Missão).

### 5.2 Fase Treino (v3, 03/11/2026)

| Tarefa | O que faz | Como aprende |
|---|---|---|
| A · Simulado | 10, 20, 25 ou 40 questões; origem: banco + gerador, só banco ou só gerador; sem tempo, 3 min ou ritmo da prova (4,5 min/questão = 3 h para 40); respostas só no fim; correção com item da norma | Erros vão para a revisão e para o acerto por capítulo |
| B · Revisão | Leitner em 5 caixas (hoje, 1, 3, 7, 14 dias); se não houver nada pendente, treina os itens com mais erros | Volta ao que você errou até fixar |
| C · Gerador | Cenários sorteados a cada vez: faixas de tensão, zonas do Anexo II, carga de treinamentos, categoria de arco CA (com variações fora da tabela e a nota do limitador), arco CC, vestimenta, sequências do 10.13, PIE, trabalho individual, treinamento eventual, validade da PT | Treina as fronteiras que as bancas cobram (1.000 V, 36,2 kV, 90 dias, "igual ou inferior") |
| D · Cartões | 42 fatos de prova, filtrados por tema, com "lembrei / não lembrei" | Entram na mesma revisão espaçada |
| Painel | Contagem regressiva (data editável), respondidas, acerto, revisões do dia, dias de estudo, simulados, acerto por capítulo, caixas, itens com mais erros | Mostra onde estudar |

As questões dos módulos também alimentam a revisão e o painel (invólucro de `quiz()` em `qbank.js`).

**O que mudou no protótipo na edição única (03/11/2026):**
1. `refs.js`: `DIFF` esvaziado; campo `d` removido de 7 entradas de `REF` (10.13.1, 10.13.2, 10.14.2, 10.15.6, 10.16.1, g-mt, g-at); `art5` sem a frase "a redação de 2004 segue em vigor até lá" (o resto da nota do simulador foi mantido e rotulado).
2. 24 campos `d:'<chave DIFF>'` removidos de questões, cartões e fichas (m1, m3, m4, m5, m6, m7, m8, missao) e 5 listas `diffs:[…]` removidas dos módulos (m1, m3, m5, m6, m8).
3. `m1.js`: `faixa2004()` removida; o classificador mostra uma só faixa (glossário); textos das questões sem a comparação com 2004.
4. `m6.js`: sequência `old` (10.5.1/10.5.2 de 2004), seletor de redação e ações escondidas no modo 2004 removidos; a pergunta "Na redação de 2004, qual é a ordem…" virou "Pelo 10.13.1, qual é a ordem das três primeiras etapas?" (resposta: seccionamento → constatação → impedimento, alíneas a–c); notas das etapas citam a alínea em vez de "etapa nova da redação de 2027".
5. `mapa.js`: trilha "O que mudou desde 2004" removida (agora são 5 trilhas) e o ramo de código que a desenhava.
6. `missao.js`, `m3.js`, `m8.js`: explicações sem a comparação com 2004.
7. `engine.js`: `D()` devolve vazio, `openDiff()` vazia e o aviso "Este item mudou em relação à redação de 2004" saiu da gaveta. Cada ponto desativado leva o comentário `// edição única: Portaria 737/2026 — seletor desativado`.
8. Sem mudança: `main.js` (o clique em `[data-diff]` chama `openDiff`, que não faz nada), `style.css`, `build.py` (o cabeçalho diz "Portaria MTE nº 737/2026 · nova redação, em vigor a partir de junho de 2027"), `primers.py`, `package.json`, `tools/`, `vendor/`.

### 5.1 Detalhes de conteúdo que já foram validados (contra o PDF, na sessão de 02/11)
- Faixas (glossário): EBT ≤ 50 V CA / 120 V CC; BT até 1.000 V CA / 1.500 V CC; MT até 36,2 kV CA / 3.000 V CC; AT acima.
- Anexo II: tabela completa em `ZTAB` (m1.js), com faixa e exemplo.
- Treinamentos (Quadro I): Básico 40 h; SEP 40 h; MT/AT-SEC 16 h; Área classificada 16 h; Específico e pontual 8 h; Compartilhamento 40 h. Periódico bienal com 16 h; eventual (afastamento > 90 dias, modificações, mudança de procedimento, acidente grave).
- Capacitação (10.8.4): SEP 40 + 16 + 40 h; SEC 40 + 16 + 24 h; compartilhamento 24 h. O texto publicado tem alíneas duplicadas (a, b, c, a, d).
- Anexo IV: atenção à tradução — "painéis" (panelboards) e "quadros de distribuição de 600 V" (switchboards) são linhas diferentes (Cat. 2 × Cat. 4). Os cenários foram redigidos para evitar ambiguidade. Nota do limitador de corrente: "pode ser reduzida" uma categoria, nunca abaixo da 1 (as questões perguntam "menor categoria admitida").
- 10.6.4 alínea d (habitação) fala em "pontos de utilização"; alínea e (não residencial) fala em "pontos de tomada" e só vale para instalações existentes um ano após a vigência (Art. 3º).

---

## 6. Bases de dados

- **`REF`**: 166 entradas (132 em `refs.js` + 34 em `refs2.js`; a v3 acrescentou `10.2.4.1`, `art1`, `art2`, `art4` com texto literal do PDF). Chaves:
  - itens `10.x.y`;
  - glossário `g-*` (16 termos);
  - `AII`, `AIII` (resumo), `AIV-I`, `AIV-II`, `AIV-III`;
  - `art1` a `art5`;
  - `NR-1/3/6/7/17/23/26` (notas).
  - Campo `n:1` marca nota do simulador. O campo `d` (ligação com `DIFF`) saiu na edição única.
- **`DIFF`**: vazio na edição única (tinha 11 chaves de comparação com 2004: `seq, reen, faixas, pie, recic, capac, indiv, trein, pt, gir, autor`).
- **Mapa** (`mapa.js`):
  - `CH`: 27 nós (20 capítulos/anexos + 7 NRs) com posição no SVG 1000×650.
  - `E`: 59 remissões item → item, `k:'x'` = citação explícita no texto, `k:'t'` = ligação de conteúdo (**interpretação do simulador; precisa ser validada**).
  - `TR`: 5 trilhas (era 6; saiu "O que mudou desde 2004").
  - `MODOF`: capítulo → módulo.
- **Missão** (`missao.js`): `ST`, 12 passos dos tipos `q` (escolha), `m` (múltipla exata) e `o` (ordenar).

---

## 7. Auditoria de cobertura frente à norma

**Conferência de 03/11/2026 (rev3, `tools/conferir_itens_portaria.py` contra o PDF):** 133 itens numerados no PDF; 133 na base `REF` (o 10.2.4.1 entrou na v3); todos os números de 2026 citados em `docs/` existem. Textos da `REF` que não são literais (similaridade < 0,95): 10.1.1 (cortado no fim), 10.8.4 (reescrito em prosa), 10.9.2 (Quadro I em linha), 10.15.4 e 10.15.7 (condensados). Detalhe em `docs/CONFERENCIA_ITENS.md`.

**Auditoria da sessão de 02/11** (mantida como histórico):

Método: os números de item foram extraídos do PDF da Portaria 737/2026 com `pdftotext` e comparados com as chaves de `REF` e com os itens citados nos arquivos de módulo.

| Medida | Resultado |
|---|---|
| Itens numerados com 3+ níveis na norma | 133 |
| Itens com texto na base `REF` | 132 |
| Itens citados em alguma tarefa, primer, mapa ou missão | 122 |
| **Fora da base** | `10.2.4.1` (resolvido na v3) |
| **Na base, mas nunca citados nem exercitados** | `10.4.5, 10.4.11, 10.7.10, 10.8.3.1, 10.8.4.1, 10.8.4.1.1, 10.10.1, 10.12.2, 10.12.5, 10.12.7` |
| Termos do glossário (Anexo I) | 57 na norma (o script detectou 55; "Plano de aprendizagem" e "Infraestrutura de aterramento", grafado "fInfraestrutura" no PDF, escaparam da regex), **16 na base** |

Termos do glossário ainda ausentes da base (41):
Análise de risco; Anuência formal; Arco elétrico; Área classificada; Aterramento elétrico temporário; Atmosfera explosiva; Barreira; Choque elétrico; Colocação fora do alcance; Comissionamento; Condições impeditivas; Contato direto; Contato indireto; Documentos técnicos do PIE; Energia incidente; Equipotencialização; Estudo de classificação de áreas; Fontes de energia elétrica; Impedimento de reenergização; Indumentária; Influências externas; Infraestrutura de aterramento; Infraestrutura de suporte; Instalação elétrica; Invólucro; Isolação das partes vivas; Limitação da tensão; Obstáculo; Partes vivas (inclui o neutro!); Pessoa não advertida; Plano de aprendizagem; Procedimento de trabalho; Proficiência; Proteção básica; Proteção supletiva; Riscos adicionais; Seccionamento automático da alimentação; Separação elétrica; Sinalização; Transmissão de energia elétrica; Travamento ou bloqueio. Também faltam as definições de ATPV, EBT (energia-limite de rompimento) e ELIM do Anexo IV.

Outras lacunas de fidelidade:
1. **"Citado" não significa "exercitado".** Muitos itens aparecem só como chip numa explicação. Falta uma matriz item → tarefa que realmente obrigue o aluno a usar o item.
2. ~~Portaria, artigos 1º, 2º e 4º ausentes~~ **Resolvido na v3:** texto literal na base e cartões no Treino (tipificação e revogações).
3. **Anexo III** está só como resumo do simulador (conteúdos mínimos dos 6 treinamentos não estão literalmente na base nem são exercitados).
4. **Anexo IV, Quadro III**: as notas de rodapé (a–g: ASTM F1506/F1959, F2178, D120, F696; CN = conforme necessário; SO = seleção obrigatória) estão resumidas. O vestir EPI checa só os itens principais.
5. **Textos condensados, não literais, em `REF`**: `10.7.7` (o texto publicado repete "a)"; marcado como `[a)]`), `10.8.4` (reescrito em prosa), `10.9.2` (Quadro I em linha), `10.15.4` (levemente condensado), `AII`, `AIV-I/II/III` (tabelas em linha), `art5` (nota adicionada). Precisam ser reconferidos palavra por palavra.
6. **10.3 (GRO)** tem um único item e quase nenhum exercício. **10.12** é coberto só por questões soltas.
7. ~~Redação de 2004: só a desenergização tinha modo 2004 jogável; os `DIFF` `pt` e `gir` precisavam ser verificados contra o texto de 2004.~~ **Resolvida: fora de escopo (edição única).** O modo 2004 e o `DIFF` foram removidos.
8. **Ligações tracejadas do mapa** (`k:'t'`) são inferência do simulador e precisam ser separadas com rigor do que a norma diz.

---

## 8. Lacunas didáticas e limitações conhecidas

- **Navegação:** em larguras ≤ ~1300 px a linha de fases rola e pode esconder "Mapa" à esquerda (o item ativo é rolado para a vista).
- **Mapa:** sem seleção, as 59 arestas formam um emaranhado. O app depende das trilhas e da seleção para ficar legível.
- **Feedback dos quizzes:** explica a resposta certa, mas não explica por que cada distrator está errado (Treino v4).
- ~~Sem "modo prova"~~ **Resolvido na v3** (Treino › Simulado). Falta: questões no formato de 5 alternativas em todo o banco (muitas têm 2 a 4).
- **Repetição:** a tarefa "Bancada" aparece em Zonas e em Energizado (mesma interface, conclusão separada).
- **Missão única** (OS 0457, MT). Não há missões em BT/SEC, SEP/linha viva, área classificada ou obra.
- **Cenário civil/obra:** existe só na planta de DDR. Não há exercício de canteiro (instalações temporárias, 10.2.1 "caráter temporário").
- **Ergonomia (10.4.10 e NR-17):** aparece em auditoria e inspeção, mas não é explorada na cena.
- ~~Sem revisão espaçada~~ **Resolvido na v3** (Treino › Revisão e "treinar pontos fracos").
- *(v3)* **Navegação:** com 7 fases, em telas de até ~1400 px a aba "Mapa" sai da linha de fases (a linha rola; o item ativo fica visível).
- *(v3)* O progresso do Treino fica só no navegador (localStorage); trocar de navegador ou limpar dados zera.
- **Estado não persistido entre visitas:** o estado 3D da desenergização e as respostas da Equipe ficam só na sessão da página.
- *(rev2)* **Resíduos inertes da edição dupla:** a API ainda aceita `d`/`D()`/`openDiff` e o CSS ainda tem `.diff-chip`/`.cmp`. Não aparecem na tela; foram mantidos para não refatorar `engine.js`, `main.js` e `style.css`.

---

## 9. Armadilhas técnicas aprendidas (não repetir)

1. three.js **r128 não tem `Texture.userData`**. Use uma propriedade própria (`tex.__keep=true`).
2. O CSS de classe sobrepõe atributos de apresentação SVG (`text-anchor`). Use uma classe específica (`.mv-ph.l`).
3. `.loading{display:grid}` vence o atributo `hidden`. Por isso o CSS tem `[hidden]{display:none!important}`.
4. Pins com `sizeAttenuation:false` têm tamanho constante na tela (escala ≈ 0,042).
5. Materiais compartilhados quebram o highlight. `M()` cria sempre material novo. `setEm` guarda o emissivo-base em `material.userData.base`.
6. **Anexo IV:** não chamar painel de "quadro de distribuição" (vira outra linha da tabela).
7. O Artifact do claude.ai bloqueia `alert/confirm/prompt`, downloads e hosts fora do allowlist. Confirmações são feitas na própria página (ex.: "Zerar" pede segundo clique).
8. Ao abrir o arquivo local, faltar `<meta charset="utf-8">` quebra os acentos. O build offline já inclui.
9. Teste headless: renderização swiftshader é lenta. Use timeout ≥ 9 min e intercepte (route) o cdnjs e o Google Fonts.
10. *(rev2)* O zip do protótipo não leva arquivos gerados (`bundle.js`, `simulador-nr10*.html`, `tools/shots/`): apague-os antes de empacotar.

---

## 10. Como testar

```bash
cd codigo-fonte
python3 build.py && node --check bundle.js          # sintaxe
python3 build.py --offline                           # gera o HTML offline
python3 tools/teste_playwright.py                    # precisa de playwright + Chrome
```
O teste percorre todos os módulos, executa a Missão completa, verifica tema escuro e largura de 390 px (sem rolagem horizontal) e lista erros de console.

**Resultado na v3 (03/11/2026):** `node --check` sem erro nos 16 `.js` e no `bundle.js`; `build.py` e `--offline` sem erro; `tools/teste_playwright.py` sem erros de console e `scrollWidth` 390; teste do Treino: 300 sorteios de cada um dos 11 geradores sem questão inválida, banco com 106 questões e todas as `refs` existentes, simulado, revisão, gerador e cartões funcionando, celular escuro sem rolagem horizontal.

**Resultado na revisão edição única (03/11/2026):**
- `node --check` sem erro nos 14 arquivos `.js` e no `bundle.js`.
- `build.py` e `build.py --offline` sem erro.
- `tools/teste_playwright.py`: "no errors"; `scrollWidth` 390 no celular.
- Teste extra da desenergização (fora do zip): seletor 2004 ausente; as 7 etapas do 10.13.1 e as 7 do 10.13.2 concluem sem erro; a tarefa "Pegadinhas" abre e percorre as questões; nenhum erro de console.

---

## 11. Prompt para a nova sessão (substituído na rev2)

O prompt da rev1 pedia uma auditoria e uma implementação **sobre o protótipo three.js**, com alternância 2004/2027. Ele contradiz duas decisões já tomadas: Godot como motor (`00_INDICE` §3.1) e edição única (`00_INDICE` §1.1). Por isso foi removido.

As sessões seguem agora o guia `01_PASSO_A_PASSO_INICIO_CLAUDE_CODE.md`:
- auditoria de fidelidade e matriz de cobertura → documento `14_PACOTE_NR10_NORMA` (passo 48);
- revisão da didática e das fases → documento `01_VISAO_E_PEDAGOGIA` (passo 47);
- implementação → Etapa G (passos 65–76), em Godot.

O conteúdo útil do prompt antigo (matriz completa de 133 itens + 57 termos + anexos + artigos; reconferência dos textos condensados da §7 item 5; classificação das remissões `x`/`t` do mapa; lacunas didáticas da §8) continua valendo como pauta do documento 14.
