# Passo a passo do projeto com o Claude Code

> Complementa o `00_INDICE_E_DECISOES_INFRAESTRUTURA.md`.
> **rev3: o agente opera o projeto inteiro.** Você só faz quatro coisas (U1–U4, abaixo). Os passos marcados com 🤖 são do agente; os marcados com 👤 são seus.
> **[VERIFICAR]** = o detalhe da ferramenta pode ter mudado; o agente confere na documentação oficial.

---

## Histórico de revisões

| Revisão | Data | Mudança |
|---|---|---|
| rev1 | 03/11/2026 | Versão inicial (previa duas edições da norma: 2004 e 2026). |
| rev2 | 03/11/2026 | **Edição única** (Portaria MTE 737/2026). Seção "Quem opera cada passo". Passos 1–22 concluídos. |
| rev3 | 03/11/2026 | **Agente com permissão total** (decisão do usuário): modo Auto/Bypass no lugar do Manual; o agente faz *merge* com CI verde; o usuário só faz U1–U4. Passo 23 concluído (PDF em `docs/referencias/`); passos 24–25 preparados (commit pronto com protótipo em `prototipo/`, aguardando o vínculo do GitHub). Passos 35–36 e 44–45 adiantados. Novas etapas **T** (Trilha 1, estudo para a prova) e **I** (fotos → modelos 3D). |

---

## Decisão de escopo: edição única da norma

O simulador implementa **somente** a NR-10 na redação da **Portaria MTE 737/2026**. Motivos: (1) duas edições multiplicam a complexidade do motor; (2) os próximos concursos cobram a redação atualizada. Detalhe na `00_INDICE` §1.1.

---

## Quem opera cada passo (rev3)

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
| **Nuvem** (chat ligado ao GitHub) | Documentos, protótipo da Trilha 1, atualizações no GitHub sem o computador ligado | Gerenciado pela própria sessão |

- **Auto:** sem pedidos de aprovação; um classificador confere comandos e rede antes de rodar. Se não aparecer no seletor, use Bypass [VERIFICAR disponibilidade no seu plano].
- **Bypass permissions:** sem nenhum pedido. No Pro, ligue "Allow bypass permissions mode" em Settings › Code. A documentação recomenda usá-lo só em ambiente isolado; aqui a proteção vem das regras abaixo e do Git.

### Regras fixas do agente (substituem as da rev2)

1. Trabalha **só** em `C:\projetos\simulador-normas` e `C:\ferramentas`. Outras pastas, só com pedido seu.
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

- [x] **9–18.** Git 2.56.0 (identidade `Pedro Alves`), VS Code 1.140.0 com `godot-tools`, Godot `4.7.2.stable` em `C:\ferramentas\godot\` (export templates só Windows x86_64), Blender 4.5.10 LTS. Passo 17: Compatibility via ANGLE/D3D11 na R5, ~496 FPS sem sombra e ~75 FPS com sombra (cena trivial) → **sem sombras em tempo real e sem texturas**.

## Etapa C — Repositório (passos 19–28)

- [x] **19–22.** Repositório criado e clonado em `C:\projetos\simulador-normas`; pastas com `.gitkeep`; documentos copiados para `docs/`.
- [x] **23.** PDF da Portaria em `docs/referencias/portaria-mte-no-737-nova-nr-10.pdf` (673.795 bytes; conferido em 03/11/2026: 133 itens numerados).
- [ ] **24.** 🤖 Protótipo **ativo** em `prototipo/` (rev3: sobe da pasta de referências para a raiz, porque é a ferramenta de estudo da Trilha 1). *Preparado no commit `rev3`.*
- [ ] **25.** 🤖 Primeiro *push* (documentos rev3, PDF, protótipo, `CLAUDE.md`, `AGENTS.md`, `tools/`). *Commit pronto em 03/11/2026; falta só o acesso de escrita: 👤 vincular a conta do GitHub à conversa do Claude (U3), ou o agente faz o push no passo 31 da sessão Local.*
- [ ] **26.** 🤖 Proteger a `main` exigindo os *checks* do CI (sem exigir revisão humana), via `gh api` [VERIFICAR a regra no plano gratuito].
- [ ] **27.** 🤖 Criar os rótulos `bug`, `conteudo-norma`, `desempenho`, `didatica`, `docs`, `ideia`, `trilha-1`, `trilha-2`, `arte` via `gh label create`.
- [ ] **28.** 🤖 Quadro no GitHub Projects (*A fazer · Em andamento · Em revisão · Feito*), se o token tiver o escopo `project`; senão, dispensado (o `STATUS` e as issues bastam).

## Etapa D — Primeira sessão Local (passos 29–34)

- [ ] **29.** 👤 **U3:** Claude Desktop → aba *Code* → ambiente **Local** → pasta `C:\projetos\simulador-normas` → modo **Auto** (ou Bypass). Feche programas pesados antes (RAM).
- [ ] **30.** 👤 **U3:** quando o agente pedir, faça o login do GitHub no navegador (Git Credential Manager ou `gh auth login`). É uma vez só.
- [ ] **31.** 🤖 Sincronizar a pasta local com `origin/main` (a cópia local ainda tem os `.md` da rev1 fora do Git: `git fetch origin` e `git reset --hard origin/main`; o PDF local é idêntico ao do commit `rev3`). Se o passo 25 ainda não tiver sido feito, aplicar o `simulador-normas-rev3.bundle` (`git fetch <bundle> rev3:rev3`, `git reset --hard rev3`) e fazer o *push*.
- [ ] **32.** 🤖 Teste de escrita: *branch* `teste-agente`, uma linha no README, PR, CI, *merge* e apagar a *branch*. Se o PR falhar, instalar o GitHub CLI (`winget install --id GitHub.cli`).
- [ ] **33.** 🤖 Teste do Godot: `C:\ferramentas\godot\Godot_v4.7.2-stable_win64_console.exe --headless --version` → `4.7.2.stable`.
- [ ] **34.** 🤖 Teste do Blender: localizar o executável e rodar `blender --background --version` [VERIFICAR o caminho de instalação]; registrar o caminho no `CLAUDE.md`.

## Etapa E — Infraestrutura do repositório (passos 35–46)

- [x] **35–36.** 🤖 `CLAUDE.md` (regras permanentes) e `AGENTS.md` (aponta para o `CLAUDE.md`), escritos na rev3 (entram no GitHub com o passo 25).
- [x] **37.** Revisão dos dois arquivos: feita pelo agente; você só lê se quiser.
- [ ] **38.** 🤖 `docs/CONVENCOES.md` (nomes, idioma: código em inglês, textos ao jogador em português; mensagens de commit; versões).
- [ ] **39.** 🤖 `docs/GLOSSARIO_DO_PROJETO.md` (motor, pacote, missão, fase F1–F8, verbo, gate, consequência, severidade, debrief, fatia vertical, trilha).
- [ ] **40.** 🤖 Modelos de issue (`bug`, `conteudo-norma`, `desempenho`). O agente os preenche a partir do que você contar na conversa.
- [ ] **41.** 🤖 Modelo de pull request.
- [ ] **42.** 🤖 CI de documentos (`.github/workflows/docs.yml`): links quebrados + `tools/conferir_itens_portaria.py`.
- [ ] **43.** 🤖 `docs/_MODELO_DOCUMENTO.md`.
- [x] **44.** 🤖 `docs/PENDENCIAS_DE_VERIFICACAO.md` (rev3).
- [x] **45.** 🤖 `docs/DECISOES.md` (rev3, decisões 1–11).
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

## Etapa T — Trilha 1: estudo para a prova no protótipo (rev3)

- [x] **T1.** 🤖 Fase **Treino** no protótipo (03/11/2026): simulado no estilo de banca (10 a 40 questões, cronômetro no ritmo da prova), revisão espaçada (5 caixas), gerador de questões (11 tipos de cenário sorteado), 42 cartões de fatos, painel de desempenho com contagem regressiva.
- [x] **T2.** 🤖 HTML offline (`prototipo/dist/simulador-nr10-offline.html`, também entregue na conversa).
- [ ] **T2b.** 🤖 Republicar o Artifact "Simulador NR-10" do claude.ai com a v3, para abrir no celular (o Artifact atual ainda é a v2, com os chips "≠ 2004"; ignore-o até lá).
- [ ] **T3.** 👤 **U2:** usar todo dia. Rotina sugerida [INFERÊNCIA]: 1) aba **Revisão** até zerar; 2) 15 min de **Gerador** nos temas mais fracos do painel; 3) um **Simulado** de 20 questões a cada dois dias, no ritmo da prova; 4) **Cartões** no celular nos intervalos.
- [ ] **T4.** 🤖 Treino v4: explicação de cada distrator; mais questões no formato de 5 alternativas; cartões dos itens nunca exercitados; correções do que você relatar.

## Etapa I — Fotos → modelos 3D (rev3)

- [ ] **I1.** 👤 **U1:** mande a foto na conversa (ou ponha em `art/fotos/`, que fica fora do Git). Ajuda: objeto inteiro, uma foto de frente e uma de lado, fundo limpo e, se der, uma medida conhecida (ex.: "o painel tem 2,2 m de altura"). Evite pessoas, placas de veículo e documentos na foto.
- [ ] **I2.** 🤖 Script Python do Blender em `art/blender/<objeto>.py` (low-poly, cores chapadas da paleta, sem textura), rodado com `blender --background --python`; exporta `art/glb/<objeto>.glb` e renderiza `art/previews/<objeto>.png`.
- [ ] **I3.** 👤 **U1:** responder "parece / não parece" (e o que falta).
- [ ] **I4.** 🤖 Integrar o modelo ao catálogo de itens e ao ambiente, dentro do orçamento de polígonos (`00_INDICE` §3.3).

---

## Dicas para as sessões

1. **Uma sessão, um objetivo.** Sessões curtas gastam menos do limite do plano.
2. Você não precisa dizer o passo: o agente lê este guia e o `STATUS` e continua do próximo pendente.
3. **Até a prova, a Trilha 1 tem prioridade** quando o limite de uso apertar.
4. Discordância com a norma vira issue `conteudo-norma`, com a fonte (Portaria MTE 737/2026).
5. Antes de sessões Locais pesadas (Godot, Blender), feche navegador e outros programas: o notebook tem 7,5 GB de RAM e pouco disco livre.
