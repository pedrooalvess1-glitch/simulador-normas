# Simulador NR-10 — estado do projeto

> Descreve **só o estado atual** do projeto. O histórico de mudanças fica no Git (commits e PRs), não neste texto.
> Próximos passos e como abrir uma sessão: `docs/PROXIMA_SESSAO.md`. Regras do agente: `CLAUDE.md`.
> **Escopo normativo:** só a NR-10 na redação da **Portaria MTE 737/2026** (`00_INDICE` §1.1), e só o que a NR-10 traz (`00_INDICE` §1.4). Fonte de verdade do conteúdo: o PDF em `docs/referencias/`.
>
> **Fase atual:** planejamento do projeto principal (Godot), Etapas E e F do guia. Trilha 1 (protótipo de estudo) congelada.

---

## 1. Contexto

- **Autor:** Pedro Alves, engenheiro eletricista.
- **Para que serve:** dominar a NR-10 para uso permanente e para concursos de Engenheiro Elétrico. Prova em vista: Prefeitura de Floresta/PE, banca FACET, data provável **13/12/2026** (Aditivo 2 do edital, de 30/10/2026). A estratégia principal de estudo dele é resolver provas passadas.
- **Vigência:** a Portaria MTE 737/2026 entra em vigor um ano após a publicação (Art. 5º; DOU de 01/06/2026) [FONTE: PDF].
- **Como ele trabalha:** o Claude Code opera tudo, inclusive o notebook dele; ele só manda fotos, usa o simulador, concede acesso e responde o essencial (`CLAUDE.md` §2).
- **Pedido original (resumo fiel):** operação em 3D de um local de trabalho flexível, com cenários variados conforme a NR-10; camadas do macro ao micro; cada ação com fundamento na norma; ambientes industriais, civis, manutenção, obra; fardamento/EPI, protocolos de entrada, sinalização, estação de trabalho, ergonomia, responsáveis, APR, habilitação, qualificação, proteção individual e coletiva, energização e desenergização, pré e pós-trabalho. Meta: entender a aplicação da NR-10 **sem ler linha por linha e sem montar fluxograma de correlações à mão**.

---

## 2. O que existe

| Entregável | Estado |
|---|---|
| Repositório `pedrooalvess1-glitch/simulador-normas` | Público, MIT. O GitHub é a fonte da verdade. Todo trabalho entra por *branch* + PR, com o CI como porteiro. |
| CI (`.github/workflows/ci.yml`) | Roda o *build* do protótipo, `node --check`, confere que `prototipo/dist/` é igual ao *build* e confere os itens citados e a base `REF` contra o PDF (`--estrito`). *Merge* só com CI verde. |
| `prototipo/` | Trilha 1, **congelada**: protótipo three.js r128 com 14 módulos (§5), incluindo **História** (abre por padrão) e **Treino**. |
| `prototipo/dist/simulador-nr10-offline.html` | App autocontido (~975 KB). Abre com duplo clique, sem internet. |
| Artifact no claude.ai | `https://claude.ai/artifact/DB8sPFyo8WbQEGVVdmfjxD` mostra a versão atual do protótipo. Existe um segundo link (`…/YJ357CT4K7ahbnstJkS3H6`) com uma versão desatualizada: não usar; apagar só com a confirmação do usuário. |
| Trilha 2 (Godot, projeto principal) | Em planejamento. `engine/`, `packs/nr10/` e `art/` só têm a estrutura de pastas. Planejamento em `00_INDICE` (entrada) e nos documentos-base `PLANO_V3` e `ARQUITETURA`; os documentos 01–25 da `00_INDICE` §5 ainda não existem. |
| *Branches* no GitHub | Além da `main`, só há *branches* já mescladas: a sessão na nuvem não consegue apagá-las. São apagadas pelo navegador no passo 34 do guia. |

### 2.1 Ambiente do usuário

| Item | Estado |
|---|---|
| Computador de teste | Windows 10, AMD A10-9600P, Radeon R5 integrada, 7,5 GB de RAM, pouco disco livre. |
| Godot no notebook | 4.7.2 standard em `C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT` (`Godot_v4.7.2-stable_win64.exe` e `…_console.exe`); reserva. Renderizador Compatibility roda via ANGLE/D3D11 na R5: ~496 FPS sem sombra e ~75 FPS com sombra numa cena trivial → sem sombras em tempo real e sem texturas. Existe também uma pasta `C:\ferramentas\godot` de conteúdo não conferido. |
| Outras ferramentas no notebook | Git 2.56.0, VS Code 1.140.0 (`godot-tools`), Blender 4.5.10 LTS (caminho não registrado); reserva. |
| Pastas no notebook | `C:\projetos\simulador-normas` (clone antigo, fora de uso); `C:\projetos\simulador-normas-testes` (para os executáveis de teste, criada na Etapa D). |
| Claude | Plano Pro; todo o projeto no Claude Code. Ambiente principal: sessão na nuvem com o repositório anexado (*push*, PR pela API REST, *merge*). O *proxy* dessa sessão bloqueia a API GraphQL do GitHub, mudanças nas configurações do repositório e a remoção de *branches*. A sessão alcança o notebook pela ponte do app Claude Desktop (arquivos) e pelo controle de aplicativos (tela), com o app aberto. |
| Ferramentas na nuvem (verificado só o acesso) | Godot 4.7.2 para Linux e *export templates*: baixáveis do GitHub da Godot. Blender: `bpy` disponível no PyPI (série 5.x para o Python da sessão). gdUnit4: páginas do repositório bloqueadas pelo *proxy*. Nada instalado (decisão 20). |

---

## 3. Arquitetura didática do protótipo

**Ideia central:** a ordem dos capítulos da NR-10 já é a hierarquia de controle do 10.5.4: eliminação (10.5) → proteção coletiva (10.6) → medidas administrativas (10.7, que pelo 10.7.12 absorve pessoas 10.8–10.10) → proteção individual (10.11). O simulador segue essa arquitetura.

| Fase | Pergunta | Módulos (id) | Capítulos |
|---|---|---|---|
| História | Como os itens aparecem numa atividade real? | `historia` | transversal |
| Mapa | Como a norma se organiza? | `mapa` | todos |
| I Aplicação | A NR-10 me alcança? Com que intensidade? | `enq` → `zonas` | 10.1, 10.2, Anexo I, Anexo II |
| II Controle | Como o risco é controlado, na ordem da hierarquia? | `projeto` → `coletiva` → `organizacao` → `pessoas` → `individual` | 10.3–10.11, Anexos III e IV |
| III Execução | Como se trabalha? | `desenergizado` → `energizado` | 10.12, 10.13, 10.14 |
| IV Prova | Como se comprova e o que paralisa? | `documentacao` | 10.15, 10.16 |
| Missão | Tudo junto | `missao` | transversal |
| Treino | Fixar para a prova | `treino` | transversal |

Princípios pedagógicos:
- **Primer por módulo** ("Como este capítulo pensa"): lógica do capítulo em 3–5 frases + "Liga com" (links para outros módulos, com o item que faz a ponte).
- **Toda correção cita o item** (chip clicável que abre o texto da Portaria numa gaveta lateral).
- **Explicar o mecanismo físico** quando ele existe (arco na seccionadora sob carga, aterrar sem constatar = curto franco, extensão condutora conta como corpo, backfeed pelo transformador).
- **Trilhas temáticas** no Mapa = os fluxogramas de correlação prontos (choque, arco, desenergização, pessoa autorizada, documento).
- **Registro de erros por item** → heatmap no Mapa, lista "Pontos fracos" e revisão espaçada no Treino.
- **Item preso a um objeto e a um lugar** (História): o item da norma aparece no equipamento onde ele se aplica.

---

## 4. Arquitetura técnica do protótipo

### 4.1 Build
- Fontes separados, concatenados por `build.py` num HTML único.
- Ordem de concatenação do JS (importa para `const` globais): `refs.js, refs2.js, engine.js, qbank.js, mapa.js, m1.js, m7.js, m2.js, m4.js, m5.js, m3.js, m6.js, m8.js, missao.js, historia.js, treino.js, main.js`. A ordem visual dos módulos é a lista `ORDER` em `main.js`.
- `python3 build.py` → `simulador-nr10.html` (fragmento sem `<html>/<head>`, three.js via cdnjs r128; formato do Artifact do claude.ai) e `bundle.js` (para `node --check`).
- `python3 build.py --offline` → `simulador-nr10-offline.html` (documento completo, com `<meta charset="utf-8">` e `vendor/three.min.js` embutido). A cópia versionada fica em `dist/`.
- Dependências externas: three.js **r128** (UMD, global `THREE`; MIT, `vendor/THREE-LICENSE.txt`); Google Fonts (Barlow Condensed, Public Sans, IBM Plex Mono) com fallback.

### 4.2 Arquivos
| Arquivo | Conteúdo |
|---|---|
| `style.css` | Tokens de cor (claro/escuro), layout, header de fases, painel, cards, mapa SVG, gaveta. Identidade: cinza técnico + âmbar de sinalização. |
| `refs.js` | `REF`: texto da norma por item. |
| `refs2.js` | Itens complementares (inclui 10.2.4.1 e Art. 1º, 2º e 4º) + notas sobre NR-1/3/6/7/17/23/26 e resumo do Anexo III (`n:1` = nota do simulador, não texto da norma). |
| `engine.js` | Utilidades, motor 3D, picking, pins, interface (nav, painel, primer, gaveta), componentes de tarefa. |
| `qbank.js` | `QB` (banco de questões registrado pelos módulos), `SRS` (Leitner, 5 caixas), `STATS` (acerto por capítulo) e o invólucro de `quiz()` que alimenta os dois. |
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
| `historia.js` | Módulo História: dicionário `HS` (27 objetos → itens), estado `S0` do desenho, 14 passos `ST` (tipos `q`, `find`, `hunt`, `seq`), cena SVG em `scene()`. Registra as 8 questões `q` no `QB`. |
| `treino.js` | Fase Treino: simulado, revisão, gerador (11 tipos), 42 cartões, painel. |
| `main.js` | `ORDER`, migração de progresso, `boot()`, delegação de cliques, hash. |
| `primers.py` | Textos dos primers (fonte usada para gerar o código; não entra no build). |
| `tools/teste_playwright.py` | Teste headless (§10). |

### 4.3 Modelo de módulo
```js
{ id:'desenergizado', phase:'III',            // 'map' | 'I' | 'II' | 'III' | 'IV' | 'mis' | …
  name:'…', short:'…', scene:'…', vpE?:'…',   // rótulos
  primer:{logic:'…', links:[[modId, 'por quê', [refs]], …]},
  brief:'…', base:[refs],
  cam:{theta,phi,r,t:[x,y,z],rMax},           // câmera orbital
  view?:'map',                                 // Mapa: troca o canvas por SVG
  reset(), build(), info?:{hotId:{t,b,r}}, onPick?(hotId)->bool, onTask?(taskId),
  tasks:[{id:'a', title:'…', free?:1, render(el, api)}] }   // api.done() marca concluída
```
- `MODS.push(...)` em cada arquivo; `main.js` ordena por `ORDER`.
- Tarefa `free:1` não conta no progresso.

### 4.4 API do motor (`engine.js`)
- 3D: `box/boxB/cyl/sph/grp/rod/line/sag/plate/label/person`, materiais via `M()` (sempre material novo por mesh), `setEm(mesh,hex,intensity)`, `tween(dur,fn,done)`.
- Hotspots: `hot(obj,id,label,{dy,noPin})` → clicável + marcador. O clique chama `mod.onPick(id)`; se retornar falso, usa `mod.info[id]`.
- UI: `loadModule(id)`, `reloadScene()`, `selectTask(i)`, `gotoTask(id)`, `activeTask()`, `fb({k:'ok|err|info|warn', t, b, r:[refs], gir})`, `toast()`, `banner()`, `cardHTML()`, `R(ref)`, `Rs([refs])`, `openRef/openIndex`.
- Componentes: `quiz(el,api,questions)` com `{q,o[],a,x,r[]}`; `classify(el,api,{options,items:[{t,a,x,r,gir}]})`; `pickList(el,api,{items:[{t,c}],x,r,onDone})`.
- Erros: `miss(refs)` incrementa `Store.data.miss[ref]`.
- Estado em `localStorage['nr10sim.v1']`: `done[mod][task]`, `miss[ref]`, `pr[mod]`, `hist` (História) e os dados do Treino (`srs`, `st`, `sims`, `dias`, `prova`).
- Hash: `#mapa`, `#enq`, `#historia`, … abre o módulo. Sem hash, abre a História.
- **Código morto a remover:** `DIFF` (objeto vazio em `refs.js`), `D()`/`openDiff()` em `engine.js`, o clique em `[data-diff]` em `main.js` e as classes `.diff-chip`/`.cmp` em `style.css`. Não aparecem na tela.

---

## 5. Inventário de módulos

| id | Fase | Cena | Tarefas | Itens-base |
|---|---|---|---|---|
| `historia` | História | Desenho SVG estático da cabine primária 13,8 kV de uma fábrica (sem 3D, sem animação), com 27 objetos clicáveis; o desenho muda de estado a cada ação (lâminas, cadeado, etiqueta, aterramento, cones) | História (OS em 14 passos: enquadramento, PT, equipe, supervisão, ferramental, vestimenta, caça a 4 não conformidades, avaliação prévia, 10.13.1 nos objetos, gerador com QTA, troca de turno, 10.13.2, encerramento, fiscalização) · Explorar a cena (livre) · Itens × cena (livre) | 10.7.2, 10.13.1, 10.13.2, 10.14.5, 10.12.6.1, Anexo IV |
| `mapa` | Mapa | SVG | Explorar (6 capítulos) · Trilhas (5) · Pontos fracos (livre) | 10.1.1, 10.5.4, 10.16.1 |
| `enq` | I | Cadeia geração → transmissão → distribuição → poste com telecom → medição → cabine → indústria → gerador; chão dividido SEP/SEC | Cadeia (8 pontos) · Classificador · Casos (8 questões) | 10.1.1, 10.2.1, 10.2.4, glossário, Anexo II |
| `zonas` | I | Parte energizada com esferas ZR/ZC em escala real, trabalhador móvel, extensão condutora/isolante | Bancada (ZR, ZC, ZL) · Situações (5) | Anexo II, glossário ZR/ZC/ZL, 10.2.2, 10.2.3 |
| `projeto` | II | Casa/restaurante em planta, QDC, padrão, haste, bomba de incêndio | DDR (alíneas a–e, exceção 10.6.4.1) · Auditoria do 10.4 (11 afirmações) · Memorial 10.4.9 | 10.4.1, 10.4.8, 10.4.9, 10.6.4, 10.6.4.1 |
| `coletiva` | II | Sala de painéis (220 V, 440 V, CCM 480 V, metal-clad 13,8 kV, baterias 220 Vcc, tapete) | Hierarquia (ordenar 4 níveis + classificar 14 medidas) · Arco, Ex e surtos (8) | 10.5.1, 10.5.4, 10.6.1, 10.6.1.1, 10.6.5, 10.6.6 |
| `organizacao` | II | Sala elétrica com 10 não conformidades + 4 itens conformes | Inspeção (relatório 10.7.11) · Rotina × PT (6) · PT e APR | 10.7.1–10.7.4, 10.7.11 |
| `pessoas` | II | Pátio com 9 trabalhadores (fichas) e quadro de autorizações | Equipe (9 fichas) · Autorização (11 V/F) | 10.8.1–10.8.3, 10.10.2, 10.10.2.1, 10.9.2 |
| `individual` | II | Sala de painéis + manequim que muda conforme o EPI | Categoria (10 cenários do Anexo IV) · Vestir EPI | 10.11.x, Anexo IV Quadros I e III |
| `desenergizado` | III | Subestação abrigada 13,8 kV (cubículo de entrada sempre energizado, 89-1, 52-1, TR-01, barra de terra, carrinho de ferramental, visitante) | Desenergizar (7 etapas do 10.13.1) · Reenergizar (7 etapas do 10.13.2) · Pegadinhas (7) | 10.13.1–10.13.4, 10.16.1 |
| `energizado` | III | Cena das esferas | Regras (9) · Bancada | 10.5.2, 10.14.1–10.14.4, 10.12.1 |
| `documentacao` | IV | Arquivo técnico: estante PIE com 9 pastas, mesa, auditor-fiscal | Quem guarda o quê (9) · Precisa de PIE? (7) · GIR (8) | 10.15.3–10.15.7, 10.16.1 |
| `missao` | Missão | Reusa a subestação | OS 0457: 12 decisões → diagnóstico por módulo | 10.7.2, 10.7.4, 10.13.1, 10.13.2, 10.15.6 |
| `treino` | Treino | Painel de estudo (sem 3D) | Simulado · Revisão · Gerador · Cartões (todas livres) | 10.9.2, 10.13.1, 10.13.2, Anexo II, Anexo IV |

**Banco do Treino:** 114 questões (quizzes dos módulos, listas de classificação convertidas, decisões da Missão e 8 da História).

### 5.1 Fase Treino

| Tarefa | O que faz | Como aprende |
|---|---|---|
| A · Simulado | 10, 20, 25 ou 40 questões; origem: banco + gerador, só banco ou só gerador; sem tempo, 3 min ou ritmo da prova (4,5 min/questão); respostas só no fim; correção com item da norma | Erros vão para a revisão e para o acerto por capítulo |
| B · Revisão | Leitner em 5 caixas (hoje, 1, 3, 7, 14 dias); sem pendências, treina os itens com mais erros | Volta ao que você errou até fixar |
| C · Gerador | 11 tipos de cenário sorteado: faixas de tensão, zonas do Anexo II, carga de treinamentos, categoria de arco CA e CC, vestimenta, sequências do 10.13, PIE, trabalho individual, treinamento eventual, validade da PT | Treina as fronteiras que as bancas cobram (1.000 V, 36,2 kV, 90 dias, "igual ou inferior") |
| D · Cartões | 42 fatos de prova, filtrados por tema, com "lembrei / não lembrei" | Entram na mesma revisão espaçada |
| Painel | Contagem regressiva (data editável), respondidas, acerto, revisões do dia, dias de estudo, simulados, acerto por capítulo, caixas, itens com mais erros | Mostra onde estudar |

**Limitação atual:** o feedback explica a alternativa certa, mas não explica por que cada distrator está errado; muitas questões têm 2 a 4 alternativas (a banca usa 5).

### 5.2 Detalhes de conteúdo validados contra o PDF
- Faixas (glossário): EBT ≤ 50 V CA / 120 V CC; BT até 1.000 V CA / 1.500 V CC; MT até 36,2 kV CA / 3.000 V CC; AT acima.
- Anexo II: tabela completa em `ZTAB` (`m1.js`), com faixa e exemplo.
- Treinamentos (Quadro I): Básico 40 h; SEP 40 h; MT/AT-SEC 16 h; Área classificada 16 h; Específico e pontual 8 h; Compartilhamento 40 h. Periódico bienal com 16 h; eventual (afastamento > 90 dias, modificações, mudança de procedimento, acidente grave).
- Capacitação (10.8.4): SEP 40 + 16 + 40 h; SEC 40 + 16 + 24 h; compartilhamento 24 h. O texto publicado tem alíneas duplicadas (a, b, c, a, d).
- Anexo IV: "painéis" (panelboards) e "quadros de distribuição de 600 V" (switchboards) são linhas diferentes (Cat. 2 × Cat. 4). Nota do limitador de corrente: "pode ser reduzida" uma categoria, nunca abaixo da 1.
- 10.6.4 alínea d (habitação) fala em "pontos de utilização"; alínea e (não residencial) fala em "pontos de tomada" e só vale para instalações existentes um ano após a vigência (Art. 3º).

---

## 6. Bases de dados

- **`REF`**: 166 entradas (132 em `refs.js` + 34 em `refs2.js`). Chaves: itens `10.x.y`; glossário `g-*` (16 termos); `AII`, `AIII` (resumo), `AIV-I`, `AIV-II`, `AIV-III`; `art1` a `art5`; `NR-1/3/6/7/17/23/26` (notas). Campo `n:1` marca nota do simulador.
- **Mapa** (`mapa.js`): `CH` (27 nós: 20 capítulos/anexos + 7 NRs, posição no SVG 1000×650); `E` (59 remissões item → item; `k:'x'` = citação explícita no texto, `k:'t'` = ligação de conteúdo, **interpretação do simulador a validar**); `TR` (5 trilhas); `MODOF` (capítulo → módulo).
- **Missão** (`missao.js`): `ST`, 12 passos dos tipos `q` (escolha), `m` (múltipla exata) e `o` (ordenar).
- **História** (`historia.js`): `HS` (27 objetos → itens) e `ST` (14 passos).

---

## 7. Cobertura frente à norma

Medida por `tools/conferir_itens_portaria.py` (relatório em `docs/CONFERENCIA_ITENS.md`):

| Medida | Resultado |
|---|---|
| Itens numerados no PDF | 133 |
| Itens com texto na base `REF` | 133 |
| **Na base, mas nunca exercitados** | `10.2.4.1, 10.4.5, 10.4.11, 10.7.10, 10.8.3.1, 10.8.4.1, 10.8.4.1.1, 10.10.1, 10.12.2, 10.12.5, 10.12.7` |
| Termos do glossário (Anexo I) | 57 na norma; **16 na base** |
| Textos da `REF` não literais | 10.1.1 (cortado no fim), 10.8.4 (prosa), 10.9.2 (Quadro I em linha), 10.15.4 e 10.15.7 (condensados); também `10.7.7` (o texto publicado repete "a)"; marcado `[a)]`), `AII`, `AIV-I/II/III` (tabelas em linha) e `art5` (com nota) |

Termos do glossário ausentes da base (41): Análise de risco; Anuência formal; Arco elétrico; Área classificada; Aterramento elétrico temporário; Atmosfera explosiva; Barreira; Choque elétrico; Colocação fora do alcance; Comissionamento; Condições impeditivas; Contato direto; Contato indireto; Documentos técnicos do PIE; Energia incidente; Equipotencialização; Estudo de classificação de áreas; Fontes de energia elétrica; Impedimento de reenergização; Indumentária; Influências externas; Infraestrutura de aterramento (grafado "fInfraestrutura" no PDF); Infraestrutura de suporte; Instalação elétrica; Invólucro; Isolação das partes vivas; Limitação da tensão; Obstáculo; Partes vivas (inclui o neutro); Pessoa não advertida; Plano de aprendizagem; Procedimento de trabalho; Proficiência; Proteção básica; Proteção supletiva; Riscos adicionais; Seccionamento automático da alimentação; Separação elétrica; Sinalização; Transmissão de energia elétrica; Travamento ou bloqueio. Também faltam as definições de ATPV, EBT (energia-limite de rompimento) e ELIM do Anexo IV.

Outras lacunas de fidelidade:
1. **"Citado" não é "exercitado".** Muitos itens aparecem só como chip numa explicação. Falta a matriz item → tarefa que obrigue o aluno a usar cada item.
2. **Anexo III** está só como resumo do simulador (conteúdos mínimos dos 6 treinamentos não estão literalmente na base nem são exercitados).
3. **Anexo IV, Quadro III:** as notas de rodapé (ASTM F1506/F1959, F2178, D120, F696; CN = conforme necessário; SO = seleção obrigatória) estão resumidas. O "Vestir EPI" checa só os itens principais.
4. **10.3 (GRO)** tem um único item e quase nenhum exercício. **10.12** é coberto só por questões soltas.
5. **Ligações tracejadas do Mapa** (`k:'t'`) são inferência do simulador e precisam ser separadas com rigor do que a norma diz.

---

## 8. Limitações conhecidas

- **Navegação:** em telas de até ~1400 px a aba "Mapa" sai da linha de fases (a linha rola; o item ativo fica visível).
- **Mapa:** sem seleção, as 59 arestas formam um emaranhado; o app depende das trilhas e da seleção para ficar legível.
- **Repetição:** a tarefa "Bancada" aparece em Zonas e em Energizado (mesma interface, conclusão separada).
- **Cenários:** uma só história (cabine MT) e uma só missão (OS 0457, MT). Não há BT/SEC de prédio, SEP/linha viva, área classificada nem canteiro de obra (instalação temporária, 10.2.1).
- **Ergonomia (10.4.10 e NR-17):** aparece em auditoria e inspeção, mas não é explorada na cena.
- **Progresso:** fica só no navegador (`localStorage`); trocar de navegador ou limpar dados zera. O estado 3D da desenergização e as respostas da Equipe ficam só na sessão da página.

---

## 9. Armadilhas técnicas (não repetir)

1. three.js **r128 não tem `Texture.userData`**. Use uma propriedade própria (`tex.__keep=true`).
2. O CSS de classe sobrepõe atributos de apresentação SVG (`text-anchor`). Use uma classe específica (`.mv-ph.l`).
3. `.loading{display:grid}` vence o atributo `hidden`. Por isso o CSS tem `[hidden]{display:none!important}`.
4. Pins com `sizeAttenuation:false` têm tamanho constante na tela (escala ≈ 0,042).
5. Materiais compartilhados quebram o highlight. `M()` cria sempre material novo; `setEm` guarda o emissivo-base em `material.userData.base`.
6. **Anexo IV:** não chamar painel de "quadro de distribuição" (vira outra linha da tabela).
7. O Artifact do claude.ai bloqueia `alert/confirm/prompt`, downloads e hosts fora do allowlist. Confirmações são feitas na própria página (ex.: "Zerar" pede segundo clique).
8. Ao abrir o arquivo local, faltar `<meta charset="utf-8">` quebra os acentos. O build offline já inclui.
9. Teste headless: a renderização swiftshader é lenta. Use timeout ≥ 9 min e intercepte (route) o cdnjs e o Google Fonts.
10. Comentário `//` dentro de linha concatenada engole o resto da linha: use `/* */`.
11. `const` usado antes da declaração entre arquivos quebra o app: respeite a ordem do `build.py`.
12. Retângulos de clique sobrepostos na cena SVG da História travam o teste Playwright.

---

## 10. Como testar

```bash
cd prototipo
python3 build.py && node --check bundle.js          # sintaxe
python3 build.py --offline && cp simulador-nr10-offline.html dist/
python3 tools/teste_playwright.py                    # precisa de Playwright + Chromium; timeout ≥ 9 min
cd ..
python3 tools/conferir_itens_portaria.py --pdf docs/referencias/portaria-mte-no-737-nova-nr-10.pdf \
  --docs docs --refs prototipo --saida docs/CONFERENCIA_ITENS.md --estrito
```
O teste Playwright percorre todos os módulos, executa a Missão completa, verifica tema escuro e largura de 390 px (sem rolagem horizontal) e lista erros de console. O CI roda o *build*, o `node --check`, a igualdade de `dist/` e a conferência no PDF; o Playwright roda só na sessão do agente.
