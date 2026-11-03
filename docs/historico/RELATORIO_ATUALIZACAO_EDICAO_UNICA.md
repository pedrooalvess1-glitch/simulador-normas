# Relatório da atualização para a edição única da NR-10 (Portaria MTE 737/2026)

> Sessão de 03/11/2026. Executa os lotes 0 a 7 do `PROMPT_ATUALIZACAO_EDICAO_UNICA_NR10.md` numa só sessão, a pedido do usuário ("atualize todos os documentos").
> Documentos atualizados: `00_INDICE_E_DECISOES_INFRAESTRUTURA.md`, `PLANO_V3_SIMULADOR_NR10.md`, `ARQUITETURA_SOFTWARE_SIMULADOR_NR10.md`, `STATUS_SIMULADOR_NR10.md` (todos rev2) e o protótipo (`simulador-nr10-codigo-fonte-edicao-unica.zip`).
> **Não editado:** `01_PASSO_A_PASSO_INICIO_CLAUDE_CODE.md` (rev2), por instrução do prompt; as inconsistências encontradas nele estão na §6.

---

## 1. Limitação desta sessão: o PDF não estava disponível

1. O PDF da Portaria MTE 737/2026 **não veio anexado**, e o acesso à pasta `C:\projetos\simulador-normas` (onde ele deveria estar, passo 23) foi negado nesta sessão.
2. Pela regra 1 do prompt, nenhum texto da norma foi escrito ou corrigido de memória.
3. **O que foi feito no lugar:** todo número de item citado nos documentos foi conferido contra a base `REF` do protótipo (`refs.js` + `refs2.js`, 162 entradas), que foi extraída do PDF com `pdftotext` na sessão de 02/11/2026.
   - Isso confirma **que o número existe na redação de 2026 e qual é o tema** do item.
   - Isso **não** confirma a literalidade (a própria auditoria de 02/11 aponta textos condensados na `REF`).
4. **Como fechar a lacuna:** rodar `conferir_itens_portaria.py` (entregue nesta sessão; ver §7) com o PDF, ou anexar o PDF numa próxima sessão. Isso resolve a pendência 12 da `00_INDICE` §10.

---

## 2. Inventário (Lote 0)

### 2.1 Anexos
| Anexo | Situação |
|---|---|
| `portaria-mte-no-737-nova-nr-10.pdf` | **Ausente** (ver §1) |
| `01_PASSO_A_PASSO_INICIO_CLAUDE_CODE.md` rev2 | Lido; usado como referência; não editado |
| `00_INDICE…`, `PLANO_V3…`, `ARQUITETURA…`, `STATUS…` | Lidos e atualizados |
| `simulador-nr10-codigo-fonte.zip` | Lido; listagem abaixo |

### 2.2 Conteúdo real do zip
A estrutura tem uma pasta de topo, `codigo-fonte/` (o prompt esperava os arquivos direto na raiz). O zip novo mantém **a mesma estrutura** (`codigo-fonte/…`), conferida por `diff` das listagens.

| Arquivo | Bytes |
|---|---|
| `STATUS_SIMULADOR_NR10.md` | 25.964 |
| `build.py` | 3.329 |
| `engine.js` | 28.876 |
| `m1.js` · `m2.js` · `m3.js` · `m4.js` | 22.087 · 13.495 · 13.484 · 21.508 |
| `m5.js` · `m6.js` · `m7.js` · `m8.js` | 15.317 · 26.556 · 17.714 · 8.823 |
| `main.js` · `mapa.js` · `missao.js` | 2.336 · 20.739 · 11.403 |
| `package.json` · `primers.py` | 267 · 7.241 |
| `refs.js` · `refs2.js` · `style.css` | 51.365 · 7.908 · 24.233 |
| `tools/teste_playwright.py` | 4.119 |
| `vendor/three.min.js` · `vendor/THREE-LICENSE.txt` | 603.445 · 1.081 |

`vendor/`: three.js **r128**, licença **MIT** (© 2010-2021 three.js authors). Não modificado (conferido por `cmp`).

### 2.3 `STATUS` dentro do zip
Idêntico ao anexo (mesmo SHA-256, `f15544de…`). Havia duas fontes de verdade. **Escolha padrão desta sessão:** a cópia do zip virou um ponteiro de 3 linhas para `docs/STATUS_SIMULADOR_NR10.md` (pergunta aberta 6).

### 2.4 Ocorrências por arquivo (após triagem dos falsos positivos, como `classList.toggle` e "medição")

| Arquivo | Ocorrências relevantes | Onde | Ação |
|---|---|---|---|
| `00_INDICE` | 9 | R7, §4 (`norm/` com "edições"), §5.2 (doc 04), §5.3 (doc 14), §7.1, §9, §10 (itens 7, 9) | Reescrever; pendências marcadas "resolvida: fora de escopo" |
| `PLANO_V3` | 47 | §0, D2, D7, §3 (coluna 2004), §4, §6, §7 (refs 2004/2026), §8 (coluna 2004), §9 (quase toda), §10, §11, §12, §14 | Reescrever; conferir números |
| `ARQUITETURA` | 10 | §1, §2, §3 (`version:changed`), §4.3, §4.4, §6, §8, §10, §11 (ADR 4), §13, §14 | Remover edição do esquema, regras, save, UI e testes |
| `STATUS` | 13 | §1, §3.2, §4.2, §5, §5.1, §6, §7 (item 7), §8, §11 | Reescrever; nova §2.1 |
| `refs.js` | 19 | bloco `DIFF` (11 chaves), 7 campos `d`, `art5` | `DIFF` vazio; campos `d` removidos; `art5` sem a frase sobre 2004 |
| `engine.js` | 3 | `D()`, aviso na gaveta de `openRef`, `openDiff()` | Neutralizados (comentário de edição única) |
| `m1.js` | 16 | `faixa2004`, `fxTile`, 4 textos, 3 `D()`, 6 `d`, 1 `diffs` | Removidos/reescritos |
| `m3.js` | 8 | 2 textos, 5 `d`, 1 `diffs` | Removidos/reescritos |
| `m4.js` · `m7.js` | 1 · 1 | 1 `d` cada | Removidos |
| `m5.js` | 2 | 1 `d`, 1 `diffs` | Removidos |
| `m6.js` | 17 | `SEQ.old`, seletor, `hidden`, `bindMode`, teste de modo no `onPick`, texto "Troque a redação…", 4 notas, 2 `fb`, 2 questões, 2 `d`, 1 `diffs` | Removidos/reescritos (autocontido no arquivo) |
| `m8.js` | 7 | 2 textos, 4 `d`, 1 `diffs` | Removidos/reescritos |
| `missao.js` | 6 | 2 textos, 4 `d` | Removidos/reescritos |
| `mapa.js` | 3 | trilha "O que mudou desde 2004", ramo de desenho, `stepChap` | Removidos |
| `main.js` | 1 | clique em `[data-diff]` | Mantido (inerte; mexer exigiria refatorar) |
| `style.css` | 2 | `.diff-chip`, `.cmp` | Mantidos (sem uso) |
| `build.py` | 1 | cabeçalho "nova redação, em vigor a partir de junho de 2027" | Mantido (é vigência, não seletor) |
| `primers.py`, `package.json`, `tools/` | 0 | — | Sem mudança |

---

## 3. O que mudou, arquivo por arquivo

| Arquivo | O que mudou | Por quê |
|---|---|---|
| `00_INDICE` rev2 | §1.1 nova (decisão, 2 motivos, 5 consequências); R7; §2 princípio 7 aponta o PDF; §3.1 versões instaladas; §3.2 medição do passo 17 + aviso de conflito sobre sombras; §4 árvore com `docs/referencias/` e `prototipo-threejs/`; §5.0 nova (documentos que já existem e apoio da Etapa E) + aviso de colisão do prefixo `01`; §5.2/§5.3 sem "edições"; §7.1 só 2026 (com faixas CC); §7.3 PLH com 10.7.1.1/10.4.8/10.15.6; §8.1 alinhada a "Quem opera cada passo"; §8.3 repositório já existe; §9 sem "2026/2004"; §10 em tabela com status e pendências 12–21; §11 alinhada ao guia | Remover o modelo de duas edições (lote 1); alinhar estrutura e lista de documentos ao guia rev2 |
| `PLANO_V3` rev2 | §0 renumerado (a rev1 pulava o item 2); D2 com um pacote; D6 com procedimento/PT; D7 reescrita como edição única; §3 com uma coluna de itens 2026 (asteriscos resolvidos); §4, §6, §7 e §8 com números conferidos; §9 reduzida e com a tabela de correções de numeração; §10 e §12 marcadas como legado three.js; §11 sem "por redação"; §14 substituída por ponteiro | Remover conteúdo dependente de edição (lote 2) e conferir os números |
| `ARQUITETURA` rev2 | Princípio 7 ("um pacote = uma redação"); camadas; §3 sem `version:changed`; §4.3 `refs` em lista; §4.4 `RULES` único, sem `cores`, `gir` sem `null`, campo `pacote`; §6 refs; §8 save sem `ver`; §10 testes e `__sim.load(missao, seed)`; ADR 4 com motivo atualizado; ADR 8 novo; §13 e §14 | Lote 3: tirar a edição do esquema, das regras, do save, da UI e dos testes |
| `STATUS` rev2 | §0 (onde ficam os arquivos); §1 (vigência e decisão); §2 (entregáveis); §2.1 nova (situação dos passos 1–28); §3.2; §4.2 e §4.4 (resíduos inertes); §5 (inventário + lista do que mudou no protótipo); §5.1; §6 (`DIFF` vazio, 5 trilhas); §7 item 7 resolvido; §8; §9 armadilha 10; §10 com o resultado dos testes; §11 substituída por ponteiro | Lote 4 |
| Protótipo (zip) | 54 operações de edição por script (uma delas remove os 31 campos `d`); cada operação exige a contagem exata de ocorrências, senão o script para. Detalhe na `STATUS` §5 | Lotes 5 e 6 |

### 3.1 Acréscimos além da remoção (para você aprovar ou vetar)
1. **`00_INDICE` §10, pendências 12–21:** lacunas reais achadas na conferência (ver §4).
2. **`STATUS` §2.1:** situação dos passos do guia, inclusive o fato conferido de que o remoto no GitHub só tem o `Initial commit`.
3. **`PLANO` §3:** itens de 2026 acrescentados onde a atividade já existia e só tinha número de 2004 (lista no fim da tabela).
4. **`ARQUITETURA` §4.4, campo `RULES.pacote`** (norma, texto, versão dos dados) e **§8, regra de migração do save** — ambos marcados [INFERÊNCIA].
5. **Protótipo, `m6.js`:** a questão sobre a ordem de 2004 virou uma questão sobre a ordem do 10.13.1 (mesmo objetivo didático: não trocar constatação e impedimento).
6. **`conferir_itens_portaria.py`** (§7) e o **`simulador-nr10-offline.html`** regerado da versão edição única.

---

## 4. Lista consolidada [VERIFICAR NA PORTARIA] (para `docs/PENDENCIAS_DE_VERIFICACAO.md`, passo 44)

| # | Pendência | Onde aparece |
|---|---|---|
| 12 | Reconferir no PDF todos os números de item citados em `docs/` (a rev2 conferiu só contra a `REF`) | Todos os documentos |
| 13 | Item da NR-10/2026 sobre extintor e combate a incêndio (o "10.12.4*" da rev1 é, na `REF`, "Comunicação") | PLANO §4 (M3), §7.1 |
| 14 | Onde a NR-10/2026 trata a suspensão do trabalho e o direito de recusa (na `REF`, 10.16.1 é embargo/interdição; 10.7.4.2 é anormalidade na avaliação prévia) | PLANO §3 (F7), §8 |
| 15 | Se a NR-10/2026 mantém a convenção de cores de manobra verde "D" / vermelho "L" (vinha do 10.3.9 b de 2004) | PLANO D7, §4 (M3), §6; ARQUITETURA §4.4 |
| 16 | Se o termo "ordem de serviço" aparece na NR-10/2026 | PLANO §0, §7.1; `00_INDICE` §10 |
| 17 | Item 10.2.4.1 (existe no PDF segundo a auditoria de 02/11; fora da `REF`) | PLANO §13; STATUS §7 |
| 18 | Item da NR-10/2026 sobre trabalho em altura e cinto (o 10.4.2 da rev1 é "seccionamento de ação simultânea") | PLANO §7.1 |
| 19 | Se a NR-10/2026 tem capítulo próprio de emergência (na `REF`: 10.7.3 h e 10.15.6.1) | PLANO §8 |
| — | "Responsável técnico" e "responsável pela instalação" não aparecem como termos na `REF` | `00_INDICE` §7.3 |
| — | Definições literais de "pessoa não advertida" e "partes vivas" (termos do Anexo I fora da `REF`; já na lista dos 41 termos) | `00_INDICE` §7.2; PLANO §4 (M0) |

Pendências **[VERIFICAR]** (fora da NR-10): 20 (30 mA vem da ABNT NBR 5410) e 21 (norma técnica das cores de etiqueta das luvas); NR-18 18.6 (M1).

Observação para o script da §7: `10.3.9` e `10.8.8.2` aparecem nos documentos só como referência histórica ao texto de 2004 (notas de revisão). O script vai listá-los como "ausentes do PDF", o que está correto.

### 4.1 Itens marcados [INTERPRETAÇÃO]
1. `00_INDICE` §7.3: mapear "responsável técnico/pela instalação" para PLH e para a organização.
2. PLANO M2: bloqueio do religador em trabalho desenergizado como impedimento de reenergização (10.13.1 c); o 10.14.3 é o caso energizado na ZR.
3. PLANO M6: "órgãos competentes" do 10.6.6.1.1 = Inmetro.

---

## 5. Texto sugerido para `docs/DECISOES.md` (passo 45, decisão 3)

```markdown
### Decisão 3 — Edição única da NR-10: Portaria MTE 737/2026

- **Data:** 03/11/2026
- **Contexto:** os documentos de planejamento e o protótipo three.js previam duas edições da NR-10
  (Portaria 598/2004 e Portaria MTE 737/2026), com seletor global, edição padrão, precedência entre
  edições, mapeamento 2004 ↔ 2026 e missões duplicadas por edição.
- **Opções consideradas:**
  1. Duas edições, 2026 padrão e 2004 alternativa enquanto vigente (`00_INDICE` rev1, R7).
  2. Duas edições, 2004 padrão (`PLANO_V3` rev1, D7).
  3. Edição única: Portaria MTE 737/2026.
- **Escolha:** opção 3.
- **Motivos:**
  1. Suportar duas edições multiplica a complexidade do motor (versionamento de regras,
     precedência, testes duplicados).
  2. Os próximos concursos cobram a redação atualizada.
- **Consequências:**
  - Sai o conceito de edição (seletor, edição padrão, precedência, mapeamento, conteúdo duplicado).
  - O motor continua orientado a dados: outras normas entram como pacotes separados;
    um pacote = o texto de uma norma, numa redação.
  - Todo conteúdo que veio do texto de 2004 é conferido contra a Portaria 737/2026
    (confirmado, corrigido ou marcado [VERIFICAR NA PORTARIA]).
- **Substitui:** "edição 2026 padrão + 2004 alternativa" (`00_INDICE` rev1) e D7 do `PLANO_V3` rev1.
- **Documentos afetados:** `00_INDICE` rev2, `PLANO_V3` rev2, `ARQUITETURA` rev2, `STATUS` rev2,
  guia rev2, protótipo (`simulador-nr10-codigo-fonte-edicao-unica.zip`).
```

---

## 6. Revisão cruzada (Lote 7): o que ainda está inconsistente

1. **Passo 23 (guia × prompt):** o prompt diz "passos 1–23 concluídos (… Portaria copiada para `docs/`)"; o guia rev2 marca o 23 como pendente. O `STATUS` §2.1 registra as duas versões e pede confirmação.
2. **Passo 24 do guia** manda copiar "o conteúdo do `simulador-nr10-codigo-fonte.zip`". Agora deve ser o zip **edição única**.
3. **Passo 44 do guia** pede a marca "resolvida: fora de escopo (rev2)"; o prompt pediu "resolvida: fora de escopo (edição única)". Usei a do prompt. São a mesma coisa; só a etiqueta difere.
4. **Prefixo `01`:** o guia e o futuro `01_VISAO_E_PEDAGOGIA` usam o mesmo número.
5. **Sombras e texturas:** o guia (passo 17) fixou "sem sombras em tempo real, sem texturas"; a `00_INDICE` §3.2 ainda prevê sombra opcional nos perfis Médio/Alto e textura em placas/etiquetas. Não mudei (decisão alheia às edições); deixei um aviso na §3.2.
6. **Duas estruturas de campanha (já existia antes):** o PLANO §4 organiza missões M0–M9 por estatística de acidente; a `00_INDICE` §6 organiza capítulos 0–6 por progressão de papel. O documento 11 precisa escolher ou fundir.
7. **Dados pessoais num repositório público:** o `STATUS` §1 tem nome completo, programa de mestrado e o concurso-alvo. O passo 3 do guia diz "nunca comitar dados pessoais". Não mexi, porque isso não é sobre edições; o primeiro *push* (passo 25) ainda não aconteceu.
8. **`package.json` do protótipo** declara licença `ISC` (padrão do `npm init`); o repositório é MIT. Sem efeito prático, porque o protótipo é só referência.
9. **Artifact publicado no claude.ai** (protótipo v2) continua com os chips "≠ 2004".
10. **Resíduos de duas edições:** nenhum ativo nos quatro documentos. As menções restantes a "2004" estão em históricos de revisão, notas "rev2" que explicam o que saiu e no Art. 4º da Portaria (revogação da 598/2004), que é conteúdo de 2026. No protótipo, só restam os pontos inertes listados na `STATUS` §8.

---

## 7. Ferramenta entregue: `conferir_itens_portaria.py`

- **Onde colocar:** `tools/` do repositório.
- **Uso:** `python tools/conferir_itens_portaria.py --pdf docs/referencias/<portaria>.pdf --docs docs --refs docs/referencias/prototipo-threejs/codigo-fonte --saida docs/CONFERENCIA_ITENS.md`
- **Saída:**
  1. itens citados que não existem no PDF;
  2. cada item citado com o início do texto no PDF (para conferir o tema);
  3. itens do PDF que nenhum documento cita;
  4. com `--refs` e Node.js no PATH: itens da `REF` cujo texto difere do PDF (similaridade < 0,95).
- **Requisitos:** Python 3.9+ e `pip install pypdf` (ou o `pdftotext` do Poppler). Só lê arquivos.
- **Teste feito aqui:** com um PDF sintético gerado da própria `REF`, com uma diferença plantada no 10.7.8. O script achou os 132 itens, listou os 3 citados e ausentes (10.2.4.1, 10.3.9, 10.8.8.2) e apontou só o 10.7.8 como texto diferente.
- **Limite:** só itens numerados; glossário e tabelas dos anexos ficam de fora.

---

## 8. Perguntas abertas

1. **PDF:** prefere anexar o PDF numa próxima sessão para eu fazer a conferência, ou rodar o script da §7 na sua máquina e me mandar o relatório?
2. **Passo 23:** o PDF já está em `docs/referencias/`? Se sim, o guia precisa do `[x]` no passo 23.
3. **Prefixo `01`:** renomear o guia (ex.: `00b_PASSO_A_PASSO_INICIO_CLAUDE_CODE.md`) ou manter os dois `01_`?
4. **Sombras e texturas nos perfis Médio/Alto:** valem para todos os perfis "sem sombras em tempo real" e "sem texturas", ou os perfis Médio/Alto podem ter sombra opcional e as placas podem ter textura?
5. **Dados pessoais no `STATUS` §1:** reduzir a "autor: Pedro Alves" + finalidade antes do *push* do passo 25?
6. **`STATUS` dentro do zip:** fica como ponteiro (escolha padrão desta sessão) ou prefere removê-lo do zip?
7. **Prova de 22/11/2026:** a rev1 punha 2004 como padrão porque essa prova cobra o texto vigente. Com a edição única, o simulador não ensina mais o texto de 2004. Confirma que o estudo do texto de 2004 para essa prova fica fora do simulador?
8. **Guia `01`:** posso fazer uma rev3 só com as correções da §6, itens 1–3 (passo 23, zip do passo 24, etiqueta do passo 44)?
9. **Artifact publicado:** quer que eu republique o Artifact "Simulador NR-10" com a versão edição única?
10. **Onde guardar** este relatório e o script: `docs/` e `tools/`?
