# Simulador NR-10: especificação de arquitetura de software

> Documento-base de **organização do código** (camadas, contratos, máquinas de estado, testes, decisões de arquitetura), a ser absorvido pelos documentos 02, 05 e 16 (passo 64 do `ROTEIRO`). O conteúdo e a didática estão no `PLANO_V3`. Os exemplos estão em JS e serão reescritos em GDScript (eventos viram *signals*).

---

## 1. Princípios (valem para todo o código)

1. **A norma é dado, não código.** Nenhum número de item, sequência ou faixa fica escrito dentro de uma cena ou de uma missão. Tudo vem de `RULES` e de `REF`.
2. **O estado elétrico é calculado, nunca desenhado.** A cena só *lê* o resultado do `elec.solve()`.
3. **Um único caminho para mudar o mundo:** `act(verbo, item, alvo)`. A interface, os testes e o replay usam a mesma função. Por isso o jogo é testável e reproduzível.
4. **Separação em camadas:** a camada de cima pode chamar a de baixo; a de baixo **nunca** chama a de cima. Quando a de baixo precisa avisar algo, usa eventos.
5. **Determinismo:** os eventos aleatórios usam um PRNG com semente gravada no log, para que o replay seja idêntico à partida.
6. **Um pacote = o texto de uma norma, numa redação.** Não existe seleção de edição nem regra de precedência entre edições. Outra norma é outro pacote. A versão do pacote (número de release dos dados) continua existindo e entra na identidade da missão (`00_INDICE` §2, princípio 5).

---

## 2. Camadas

```
┌──────────────────────────────────────────────────────────────┐
│ L5  APLICAÇÃO   main.js · roteamento (#campanha, #biblioteca)│
├──────────────────────────────────────────────────────────────┤
│ L4  APRESENTAÇÃO hud.js · debrief.js · módulos (Biblioteca)  │
├──────────────────────────────────────────────────────────────┤
│ L3  JOGO        mission.js (executor F1–F8) · srs.js · score │
├──────────────────────────────────────────────────────────────┤
│ L2  DOMÍNIO     act.js (verbos) · elec.js (solver)           │
│                 rules.js (Portaria 737/2026) · items.js      │
├──────────────────────────────────────────────────────────────┤
│ L1  MUNDO 3D    scenes/*.js · engine.js (three, picking)     │
├──────────────────────────────────────────────────────────────┤
│ L0  BASE        bus.js · store.js · rng.js · refs.js/refs2.js│
└──────────────────────────────────────────────────────────────┘
```

| Camada | Pode depender de | Não pode |
|---|---|---|
| L0 | nada | — |
| L1 | L0 | conhecer missão ou regra |
| L2 | L0, L1 (só para mapear `id` de nó ↔ objeto 3D) | tocar no DOM |
| L3 | L0–L2 | desenhar 3D diretamente |
| L4 | L0–L3 (só leitura de estado + `act`) | mudar estado sem `act` |
| L5 | tudo | — |

---

## 3. Barramento de eventos (`bus.js`): contrato

```js
bus.on(tipo, fn); bus.off(tipo, fn); bus.emit(tipo, payload);
```

| Evento | Quem emite | Payload | Quem escuta |
|---|---|---|---|
| `act:done` | act.js | `{t, verbo, item, alvo, ok, sev, refs, motivo}` | mission, hud, log, srs |
| `elec:changed` | elec.js | `{diff:[{no, Vantes, Vdepois}]}` | scenes (somente debrief/aprendiz), mission |
| `hazard` | act.js | `{tipo:'choque'│'arco'│'curto', no, sev, mec}` | mission (encerra se fatal), hud (flash) |
| `phase:enter` / `phase:exit` | mission.js | `{fase}` | hud, scenes (câmera) |
| `gate:blocked` | mission.js | `{gate, refs, dica}` | hud |
| `event:fire` | mission.js | `{id, efeito}` | elec, hud |
| `mission:end` | mission.js | `{resultado:'ok'│'fatal'│'abandono', log}` | debrief, store, srs |

O pacote de regras é carregado uma vez, na inicialização; não há evento de troca de pacote.

---

## 4. Modelo de domínio

### 4.1 Grafo elétrico (`elec.js`)
```js
G = { nos:{ id:{ Vn:13.8, aterrado:false, obj3d:'cub-entrada.barra' } },
      arestas:{ id:{ tipo:'secc'|'disj'|'fus'|'religador'|'trafo'|'cond'|'terraTemp'|'chaveTerra',
                     a:'no1', b:'no2', estado:'fechado'|'aberto'|'extraido',
                     relacao?:13.8/0.38, bloqueios:[pessoaId], etiquetas:[...] } },
      fontes:{ id:{ tipo:'rede'|'gerador'|'fv'|'bateria'|'residual'|'inducao', no, V, ativa, decai?:{tau} } } };

elec.solve(G) -> { V:{no:kV}, fontesDe:{no:[fonteId]}, aterrado:{no:bool} }
```
**Algoritmo:**
1. BFS a partir de cada fonte ativa, percorrendo só as arestas `fechado`.
2. Ao passar por um `trafo`, multiplica ou divide a tensão pela relação (vale nos **dois sentidos**: é assim que surge o backfeed).
3. Um nó ligado à terra por `terraTemp` ou `chaveTerra` fica `aterrado` e com V = 0.
   - Se esse nó também é alcançado por uma fonte ativa → `hazard{tipo:'curto'}`.
4. `residual`: V decai como `V0·e^(−t/τ)` e zera quando o nó é aterrado.
5. `inducao`: só vale num trecho **isolado de fontes e não aterrado**.

A complexidade é O(N + A) por chamada. Grafos de missão têm menos de 200 elementos, então é instantâneo.

### 4.2 Verbos (`act.js`): o único ponto de mutação
```js
act(verbo, itemId, alvoId) -> {ok, sev, refs, motivo}
// pipeline:
// 1. valida: o item está no inventário? o verbo é permitido para o par item×alvo? (items.js)
// 2. pré-condições físicas: EPI vestido? detector autotestado? distância ao alvo vs Anexo II?
// 3. aplica o efeito no grafo ou no mundo (abrir chave, pôr cadeado, instalar terra, vestir EPI)
// 4. elec.solve() → verifica as consequências de RULES.consequencias
// 5. verifica a ordem: compara com RULES.seqDesenerg / RULES.seqReenerg (desvio de ordem ≠ consequência física)
// 6. emite act:done (+ hazard se houver) e grava no log
```
**Verbos:**

| Grupo | Verbos |
|---|---|
| Ver | `inspecionar` |
| Manobrar | `operar` (abrir/fechar/extrair) |
| Bloquear | `bloquear`, `desbloquear`, `etiquetar` |
| Testar | `autotestar`, `medir` |
| Aterrar e proteger | `aterrar`, `desaterrar`, `cobrir`, `descobrir` |
| Área | `delimitar`, `sinalizar` |
| EPI | `vestir`, `retirar`, `inspecionarEPI` (inflar luva, data de ensaio) |
| Pessoas e documentos | `autorizar`, `designar`, `assinar`, `encerrarDoc` |
| Comunicação | `chamarCOD` |
| Recusa | `suspender`, `recusar` |
| Movimento | `mover` (posição do jogador; usado no cálculo de zona) |

### 4.3 Catálogo de itens (`items.js`)
```js
ITEMS[id] = { id, nome, build:()=>THREE.Group, slot:'vestido'|'cinto'|'maleta'|'caminhao'|'mundo',
  estadoInicial:{...}, verbos:{ verbo:{ alvos:['tipoAlvo'], requer:[itemIds], efeito:(ctx)=>{} } },
  refs:[...], glos?:'g-travamento', visual:{ dicas:'...' } };   // refs: chaves de REF (Portaria 737/2026)
```
`refs` é uma lista simples de chaves de `REF`.

**Alvos tipados:** `fase`, `dispositivo`, `pontoTerra`, `parteViva`, `area`, `pessoa`, `documento`. A cena marca cada objeto 3D clicável com `userData.alvo = {tipo, id}`.

### 4.4 Pacote de regras (`rules.js`)
```js
RULES = {                                             // um pacote: NR-10, Portaria MTE 737/2026
  pacote:{ norma:'NR-10', texto:'Portaria MTE 737/2026', versao:'0.1.0' },   // versao = release dos dados
  faixas:[{nome:'EBT', ca:50, cc:120}, ...],          // glossário (Anexo I), com MT
  seqDesenerg:[...], seqReenerg:[...],                // 10.13.1 a–g e 10.13.2 a–g (nomes de verbo + alvo genérico)
  doc:{...}, treinamentos:{...}, gir:[...],           // gir: lista do 10.16.1
  zonas: ZTAB,                                        // Anexo II
  consequencias:[{ quando:(ctx)=>bool, sev, mec, refs }],
  desvios:[{ id:'ordem', sev:'grave', refs }],        // fora de ordem sem efeito físico
  gates:{ F2:(estado)=>bool, ... } };
validateRules(RULES)  // na carga: todo ref existe em REF; toda seq usa verbos válidos
```
Observações:
- `RULES` não tem chave de edição nem precedência: o motor carrega um pacote e pronto.
- `gir` é sempre uma lista (10.16.1).
- A convenção de cores das lâmpadas de posição não está na Portaria 737/2026; é dado visual do catálogo de itens/ambiente [PRÁTICA].
- O campo `pacote` diz qual norma e qual texto o pacote carrega, e a versão dos dados [INFERÊNCIA: necessário para o princípio 5 da `00_INDICE` (missão = versão do pacote + versão do motor + semente)].

---

## 5. Máquinas de estado

### 5.1 Missão (`mission.js`)
```
IDLE → BRIEF(F1) → PLAN(F2) → STORE(F3) → SITE(F4) → DDS(F5) → DESENERG(F6) → EXEC(F7) → REENERG(F8) → DEBRIEF → END
                                  │ qualquer fase: hazard fatal ───────────────────────────────────────▶ DEBRIEF(fatal)
                                  │ gate falso: permanece na fase + gate:blocked
```
- Cada fase declara: `enter()`, `gate(estado)`, `exit()`, os verbos permitidos e a câmera.
- Fases podem ser puladas por missão (`fases.F4:null`).
- O evento surpresa é agendado por gatilho (`em:'F7'`, ou após certo verbo) e resolvido pelo próximo `act` relevante.

### 5.2 Detector
`SEM_TESTE → AUTOTESTADO(t0) → [expira após N min de jogo] → SEM_TESTE`
- `medir` em `SEM_TESTE` devolve uma leitura **não confiável**: pode ser falso negativo, e o debrief explica.
- Faixa errada (detector BT em MT) → leitura inválida, ou dano + `hazard`, conforme a regra.

### 5.3 Dispositivo de manobra
`FECHADO ⇄ ABERTO → (EXTRAIDO)`
- Com `bloqueios.length > 0`, `operar` falha (`motivo:'bloqueado'`).
- Só o dono do cadeado faz `desbloquear`.

### 5.4 Ponto de trabalho
`ENERGIZADO → DESLIGADO_NAO_CONSTATADO → AUSENCIA_CONSTATADA → ATERRADO → LIBERADO`
- Derivado do grafo + log. Não é armazenado.
- Liberado = aterrado + zona controlada protegida + sinalizado.

---

## 6. Fluxo de uma ação (exemplo)

```
clique na fase B com detectorMT selecionado
 → hud: menu de verbos válidos (items.js) → usuário escolhe "medir"
 → act('medir','detectorMT','fase:TR01-B')
     ├ detector autotestado? sim
     ├ jogador dentro da ZC com EPI? sim
     ├ leitura = elec.solve().V['TR01-B']  → 0 kV
     ├ log + act:done{ok:true, refs:['10.13.1 b']}
 → mission: atualiza o progresso do gate F6 (fases medidas: A, B)
 → hud: tela do detector mostra "sem tensão" (LED apagado, sem bip)
```

---

## 7. Cenas (`scenes/*.js`): contrato

```js
SCENES[id] = { build(world, G)->{ alvos:Map(id→Object3D), pois:[{id,pos,cam}] },
               dispose(), onElec?(diff), xray(on:bool), aprendiz(nivel:0..1) };
```
- A cena **não** decide nada. Ela registra os alvos e reage a `xray` e a `aprendiz`.
- `xray`: partículas ao longo dos condutores (`InstancedMesh`), cor pelo nível de tensão, sentido a partir da fonte.

---

## 8. Persistência (`store.js`)

```js
localStorage['nr10sim.v1'] = { aprendiz:0.6,
  campanha:{ m3:{melhor:'ok', tentativas:3} },
  srs:{ ref:{caixa:1..5, prox:timestamp} }, miss:{ref:n},
  biblioteca:{ done, pr },
  ultimoLog:[...] };                    // limitar a ~500 ações
```
Sem armazenamento disponível, o app funciona do mesmo jeito, só sem guardar o progresso.

---

## 9. Estratégia de testes

| Nível | Ferramenta | O que cobre |
|---|---|---|
| Unitário | `node tools/test_elec.js` | Solver: backfeed via trafo, aterramento sob tensão → curto, residual decai, indução só em trecho isolado; `validateRules(RULES)` |
| Regras | node | A sequência de desenergização (10.13.1) e a de reenergização (10.13.2) aceitam a ordem correta e acusam um desvio por posição |
| Cenário | Playwright + `window.__sim` | Caminho ideal de cada missão; 1 fatal por missão; replay reproduz o log (mesma semente → mesmo estado final) |
| Fidelidade | `audit_cobertura.py` | Todo item do PDF da Portaria 737/2026 tem linha na matriz; nenhum item só "citado" nos temas críticos; todo `refs` existe em `REF` |
| UI | Playwright | Tema escuro, 390 px sem rolagem horizontal, zero erros de console |

```js
window.__sim = { load(missao, seed), act, state(no), phase(), log(), solve() };
```

---

## 10. Registro de decisões de arquitetura (ADRs)

| ADR | Decisão | Alternativa descartada | Motivo |
|---|---|---|---|
| 2 | `act()` como único ponto de mutação | Handlers espalhados nas cenas | Testabilidade, replay e log da SRS de graça |
| 3 | Solver BFS por chaves abertas/fechadas, sem fluxo de potência | Fluxo de carga/impedâncias | O didático é "há caminho até uma fonte?". Correntes de curto e de arco ficam tabeladas (Anexo IV), não calculadas |
| 4 | Regras como dados + predicados pequenos | Lógica de norma dentro das missões | Separa norma de cena; outra norma entra como outro pacote sem reescrever missões nem motor (`00_INDICE` R6). |
| 5 | Barramento de eventos simples | Framework reativo | Zero dependências; poucos tipos de evento |
| 6 | PRNG com semente no log | `Math.random` | Replay determinístico e testes estáveis |

---

## 11. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Regras com número de item errado | `validateRules` + números conferidos no PDF da Portaria 737/2026 antes de entrar (`tools/conferir_itens_portaria.py`, também no CI) |
| Raio-x criar falsa confiança | Raio-x **só** no debrief e no modo aprendiz (com fading); nunca durante o modo jogo |

---

## 12. Guia para criar uma missão nova (checklist do autor)

1. Escolha o ambiente (`scenes/`) e desenhe o **grafo** (fontes, chaves, trafo, pontos de terra).
2. Liste os **alvos** clicáveis e associe cada um a um nó ou aresta.
3. Defina as fases usadas (F1–F8) e o **kit mínimo** do F3.
4. Escreva 1 a 3 **eventos** com respostas certas e erradas e seus `refs`.
5. Preencha `refs` só com chaves existentes em `REF`. Interpretação do simulador vai com `n:1`.
6. Escreva 3 perguntas de reflexão para o debrief.
7. Adicione ao Playwright: caminho ideal e 1 fatal.
8. Atualize a matriz de cobertura (PLANO §8).
