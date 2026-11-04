# Passo a passo do projeto com o Claude Code

> Complementa o `00_INDICE_E_DECISOES_INFRAESTRUTURA.md`.
> **O agente opera o projeto inteiro.** Você só faz quatro coisas (U1–U4, abaixo). Os passos marcados com 🤖 são do agente; os marcados com 👤 são seus.
> **[VERIFICAR]** = o detalhe da ferramenta pode ter mudado; o agente confere na documentação oficial.

---

## Decisão de escopo: edição única da norma

O simulador implementa **somente** a NR-10 na redação da **Portaria MTE 737/2026**. Motivos: (1) duas edições multiplicam a complexidade do motor; (2) os próximos concursos cobram a redação atualizada. Detalhe na `00_INDICE` §1.1.

---

## Quem opera cada passo

### Seu papel (só isto)

| # | Você faz | Quando |
|---|---|---|
| **U1** | Manda fotos de objetos para virar modelo 3D e diz "parece / não parece" à prévia | Quando quiser um equipamento no simulador |
| **U2** | Usa e testa o simulador; conta na conversa o que estranhou | Sempre que estudar |
| **U3** | Concede permissões: abre a sessão Local, escolhe o modo, faz o login do GitHub uma vez | Passos 29–30 e quando o app pedir |
| **U4** | Responde perguntas essenciais | Raramente: só o que muda o resultado e só você sabe |

### O que o agente faz
Todo o resto: documentos, código, testes, modelos 3D (Blender por script), Godot por linha de comando, Git, *pull requests*, *merge*, CI, Releases, issues.

### Onde o agente trabalha

| Sessão | Para quê | Modo de permissão |
|---|---|---|
| **Local** (Claude Desktop → aba *Code* → pasta `C:\projetos\simulador-normas`) | Tudo que precisa do seu computador: Godot, Blender, Git local, `.exe` | **Auto** (recomendado) ou **Bypass permissions** [FONTE: docs do Claude Code, "desktop"] |
| **Nuvem** (chat do claude.ai com o repositório anexado) | Documentos, protótipo da Trilha 1, Godot *headless* (Linux), GitHub, Artifact, sem o computador ligado | Gerenciado pela própria sessão |

- **Auto:** sem pedidos de aprovação; um classificador confere comandos e rede antes de rodar. Se não aparecer no seletor, use Bypass [VERIFICAR disponibilidade no seu plano].
- **Bypass permissions:** sem nenhum pedido. No Pro, ligue "Allow bypass permissions mode" em Settings › Code. A documentação recomenda usá-lo só em ambiente isolado; aqui a proteção vem das regras abaixo e do Git.

### Regras fixas do agente

1. Trabalha **só** em `C:\projetos\simulador-normas`, `C:\ferramentas` e na pasta do Godot (`C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT`). Outras pastas, só com pedido seu.
2. Todo trabalho em *branch* + *pull request*; *merge* (squash) **só com CI verde**. Nunca `push --force` na `main`, nunca reescrever histórico.
3. No começo de cada sessão Local: `git fetch` e sincroniza com `origin/main` (o GitHub é a fonte da verdade).
4. Nunca comitar tokens, `.env`, fotos suas ou dados pessoais (repositório público).
5. Texto da norma só do PDF em `docs/referencias/`; nada "de memória".
6. Pergunta ao usuário só o essencial (R8); o resto decide e registra como [INFERÊNCIA] em `docs/DECISOES.md`.
7. Testes no computador real (69, 76, 79) continuam com você (U2), porque só você sente o desempenho e a clareza.

---

## Etapa A — Contas e decisões iniciais (passos 1–8) ✅ concluída

- [x] **1.** GitHub `pedrooalvess1-glitch`. **2.** 2FA ativo. **3.** Repositório **público** (nunca comitar segredos ou dados pessoais). **4.** Nome `simulador-normas`. **5.** Licença MIT. **6.** Claude Pro, Claude Desktop com aba Code. **7.** Notebook Acer 2018, Windows 10 Pro, AMD A10-9600P, Radeon R5 integrada + R7 M340, 7,5 GB de RAM. **8.** Pasta `C:\projetos`.

## Etapa B — Ferramentas no computador (passos 9–18) ✅ concluída

- [x] **9–18.** Git 2.56.0 (identidade `Pedro Alves`), VS Code 1.140.0 com `godot-tools`, Godot `4.7.2.stable` em `C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT` (export templates só Windows x86_64), Blender 4.5.10 LTS. Passo 17: Compatibility via ANGLE/D3D11 na R5, ~496 FPS sem sombra e ~75 FPS com sombra (cena trivial) → **sem sombras em tempo real e sem texturas**.

## Etapa C — Repositório (passos 19–28)

- [x] **19–22.** Repositório criado e clonado em `C:\projetos\simulador-normas`; pastas com `.gitkeep`; documentos copiados para `docs/`.
- [x] **23.** PDF da Portaria em `docs/referencias/portaria-mte-no-737-nova-nr-10.pdf` (673.795 bytes; conferido em 03/11/2026: 133 itens numerados).
- [x] **24.** 🤖 Protótipo **ativo** em `prototipo/` (ferramenta de estudo da Trilha 1).
- [x] **25.** 🤖 GitHub vinculado ao Claude; projeto inteiro na `main`.
- [ ] **26.** 🤖 Proteger a `main` exigindo os *checks* do CI (sem exigir revisão humana), via `gh api` [VERIFICAR a regra no plano gratuito].
- [ ] **27.** 🤖 Criar os rótulos `bug`, `conteudo-norma`, `desempenho`, `didatica`, `docs`, `ideia`, `trilha-1`, `trilha-2`, `arte` via `gh label create`.
- [ ] **28.** 🤖 Quadro no GitHub Projects (*A fazer · Em andamento · Em revisão · Feito*), se o token tiver o escopo `project`; senão, dispensado (o `STATUS` e as issues bastam).

## Etapa D — Primeira sessão Local (passos 29–34)

- [ ] **29.** 👤 **U3:** Claude Desktop → aba *Code* → ambiente **Local** → pasta `C:\projetos\simulador-normas` → modo **Auto** (ou Bypass). Feche programas pesados antes (RAM).
- [ ] **30.** 👤 **U3:** quando o agente pedir, faça o login do GitHub no navegador (Git Credential Manager ou `gh auth login`). É uma vez só.
- [ ] **31.** 🤖 Sincronizar a pasta local com `origin/main` (`git fetch origin` e `git reset --hard origin/main`, depois de conferir que não há trabalho local que só exista ali).
- [ ] **32.** 🤖 Teste de escrita: *branch* `teste-agente`, uma linha no README, PR, CI, *merge* e apagar a *branch*. Se o PR falhar, instalar o GitHub CLI (`winget install --id GitHub.cli`).
- [ ] **33.** 🤖 Teste do Godot: `"C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT\Godot_v4.7.2-stable_win64_console.exe" --headless --version` → `4.7.2.stable`.
- [ ] **34.** 🤖 Teste do Blender: localizar o executável e rodar `blender --background --version` [VERIFICAR o caminho de instalação]; registrar o caminho no `CLAUDE.md`.

## Etapa E — Infraestrutura do repositório (passos 35–46)

- [x] **35–36.** 🤖 `CLAUDE.md` (regras permanentes) e `AGENTS.md` (aponta para o `CLAUDE.md`).
- [x] **37.** Revisão dos dois arquivos: feita pelo agente; você só lê se quiser.
- [ ] **38.** 🤖 `docs/CONVENCOES.md` (nomes, idioma: código em inglês, textos ao jogador em português; mensagens de commit; versões).
- [ ] **39.** 🤖 `docs/GLOSSARIO_DO_PROJETO.md` (motor, pacote, missão, fase F1–F8, verbo, gate, consequência, severidade, debrief, fatia vertical, trilha).
- [ ] **40.** 🤖 Modelos de issue (`bug`, `conteudo-norma`, `desempenho`). O agente os preenche a partir do que você contar na conversa.
- [ ] **41.** 🤖 Modelo de pull request.
- [x] **42.** 🤖 CI (`.github/workflows/ci.yml`): build do protótipo, `node --check`, `dist/` igual ao build e `tools/conferir_itens_portaria.py`. Falta: links quebrados.
- [ ] **43.** 🤖 `docs/_MODELO_DOCUMENTO.md`.
- [x] **44.** 🤖 `docs/PENDENCIAS_DE_VERIFICACAO.md`.
- [x] **45.** 🤖 `docs/DECISOES.md`.
- [ ] **46.** 🤖 *Merge* do PR da Etapa E com CI verde.

## Etapa F — Documentos de planejamento (passos 47–64)

Uma sessão por documento, na ordem da `00_INDICE` §5.4. O agente escreve, decide o que não é essencial (registrando) e só pergunta o essencial (U4).

Prompt-base (o agente usa sozinho):
> "Leia `CLAUDE.md`, `docs/00_INDICE_E_DECISOES_INFRAESTRUTURA.md`, `docs/DECISOES.md` e os documentos já aprovados. Escreva `docs/<ARQUIVO>` no formato da §5 da `00_INDICE`. NR-10 da Portaria MTE 737/2026, edição única. Marque fonte × prática × inferência. Rode `tools/conferir_itens_portaria.py`. Abra o PR e faça o merge com CI verde."

- [ ] **47.** 🤖 `01_VISAO_E_PEDAGOGIA` · **48.** `14_PACOTE_NR10_NORMA` · **49.** `04_MOTOR_DE_NORMAS` · **50.** `05_MODELO_DE_ENERGIA_E_PERIGOS` · **51.** `11_CAMPANHA_NR10` · **52.** `15_AMBIENTES_NR10` · **53.** `07_CATALOGO_DE_ITENS` · **54.** `09_PERSONAGENS_E_PAPEIS` · **55.** `08_INTERACAO_VERBOS_INVENTARIO` · **56.** `13_INTERFACE_E_DOCUMENTOS` · **57.** `02_ARQUITETURA_GERAL` · **58.** `03_PLATAFORMA_E_DESEMPENHO` · **59.** `06_MUNDO_3D_E_KIT_DE_AMBIENTES` + `18_PIPELINE_DE_ARTE_LEVE` (incluir a Etapa I) · **60.** `16_DADOS_SAVES_LOG_REPLAY` + `12_AVALIACAO_E_MODELO_DO_ALUNO` · **61.** `17_TESTES_VALIDACAO_CI` · **62.** `20_FLUXO_DE_TRABALHO_COM_AGENTE` (detalha esta seção) + `21_ROADMAP_E_MARCOS` · **63.** `22`, `23`, `24`, `25`.
- [ ] **64.** 🤖 Revisão cruzada de `docs/`: contradições, lacunas, dependências circulares. `10_MODO_LIVRE` e `19_NOVO_PACOTE` ficam para depois.

## Etapa G — Esqueleto Godot e fatia vertical (passos 65–76)

- [ ] **65–68.** 🤖 Projeto Godot (Compatibility, 4.7.2), gdUnit4, CI de testes, CI de exportação do `.exe` Windows.
- [ ] **69.** 👤 **U2:** abrir o primeiro `.exe` da Release no notebook e dizer se abriu.
- [ ] **70–75.** 🤖 Camada base, motor de regras, solver elétrico, `act()` com 6 verbos, ambiente do Capítulo 0, Missão 0.
- [ ] **76.** 👤 **U2:** jogar a Missão 0, dizer o FPS do painel F3 e o que ficou confuso.

## Etapa H — Ciclo de correção (passos 77–80, repetidos)

- [ ] **77.** 👤 **U2:** contar na conversa o problema (o agente abre a issue com o log de `%APPDATA%\Godot\app_userdata\<projeto>\logs` [VERIFICAR o caminho]).
- [ ] **78–80.** 🤖 Corrigir em *branch*, PR, CI verde, *merge*, Release numerada, atualizar `DECISOES.md` e o roadmap.

---

## Etapa T — Trilha 1: estudo para a prova no protótipo

- [x] **T1.** 🤖 Fase **Treino** no protótipo: simulado no estilo de banca (10 a 40 questões, cronômetro no ritmo da prova), revisão espaçada (5 caixas), gerador de questões (11 tipos de cenário sorteado), 42 cartões de fatos, painel de desempenho com contagem regressiva.
- [x] **T2.** 🤖 HTML offline (`prototipo/dist/simulador-nr10-offline.html`).
- [x] **T1b.** 🤖 Módulo **História**: desenho estático da cabine primária com 27 objetos clicáveis ligados aos itens; uma OS em 14 passos (questões, achar objetos, caça a não conformidades, 10.13.1 e 10.13.2 aplicados na cena); explorar a cena; índice item × cena. Abre por padrão.
- [x] **T2b.** 🤖 Artifact "Simulador NR-10" no claude.ai, para abrir no celular.
- [ ] **T3.** 👤 **U2:** usar todo dia. Rotina sugerida [INFERÊNCIA]: 1) aba **Revisão** até zerar; 2) 15 min de **Gerador** nos temas mais fracos do painel; 3) um **Simulado** de 20 questões a cada dois dias, no ritmo da prova; 4) **Cartões** no celular nos intervalos.
- [ ] **T4.** 🤖 Backlog da Trilha 1 em `docs/PROXIMA_SESSAO.md` §3 (distratores, 5 alternativas, itens nunca exercitados, glossário, novas histórias) e correções do que você relatar.

## Etapa I — Fotos → modelos 3D

- [ ] **I1.** 👤 **U1:** mande a foto na conversa (ou ponha em `art/fotos/`, que fica fora do Git). Ajuda: objeto inteiro, uma foto de frente e uma de lado, fundo limpo e, se der, uma medida conhecida (ex.: "o painel tem 2,2 m de altura"). Evite pessoas, placas de veículo e documentos na foto.
- [ ] **I2.** 🤖 Script Python do Blender em `art/blender/<objeto>.py` (low-poly, cores chapadas da paleta, sem textura), rodado com `blender --background --python`; exporta `art/glb/<objeto>.glb` e renderiza `art/previews/<objeto>.png`.
- [ ] **I3.** 👤 **U1:** responder "parece / não parece" (e o que falta).
- [ ] **I4.** 🤖 Integrar o modelo ao catálogo de itens e ao ambiente, dentro do orçamento de polígonos (`00_INDICE` §3.3).

---

## Dicas para as sessões

1. **Uma sessão, um objetivo.** Sessões curtas gastam menos do limite do plano.
2. Você não precisa dizer o passo nem aprová-lo: o agente lê este guia, o `STATUS` e o `PROXIMA_SESSAO` e continua do próximo pendente, parando só nos pontos de parada (`PROXIMA_SESSAO` §1).
3. **Até a prova, a Trilha 1 tem prioridade** quando o limite de uso apertar.
4. Discordância com a norma vira issue `conteudo-norma`, com a fonte (Portaria MTE 737/2026).
5. Antes de sessões Locais pesadas (Godot, Blender), feche navegador e outros programas: o notebook tem 7,5 GB de RAM e pouco disco livre.
