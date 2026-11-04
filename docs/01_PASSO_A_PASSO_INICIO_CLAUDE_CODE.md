# Passo a passo do projeto com o Claude Code

> Complementa o `00_INDICE_E_DECISOES_INFRAESTRUTURA.md`.
> **O agente opera o projeto inteiro.** Você só faz quatro coisas (U1–U4, abaixo). Os passos marcados com 🤖 são do agente; os marcados com 👤 são seus.
> **[VERIFICAR]** = o detalhe da ferramenta pode ter mudado; o agente confere na documentação oficial.

---

## Ordem de execução

As etapas A, B e C estão concluídas (C tem dois passos pendentes). A ordem daqui em diante é:

**E (infraestrutura do repositório) → F (documentos de planejamento) → D (ambiente de execução) → G (esqueleto Godot e fatia vertical) → H (ciclo de correção).**

A Etapa D vem depois da F porque as ferramentas só são instaladas e configuradas depois do planejamento: a configuração segue os documentos, e não o contrário (decisão do usuário, `DECISOES.md` 20). A Etapa T (protótipo de estudo) está congelada; a Etapa I acontece quando você mandar uma foto.

---

## Escopo do conteúdo

1. **Edição única:** só a NR-10 na redação da **Portaria MTE 737/2026** (`00_INDICE` §1.1).
2. **Conteúdo só da NR-10:** o que o simulador ensina, cobra e corrige precisa de um item da NR-10. Remissão a outra norma aparece só como remissão; valores de outras normas e práticas de concessionária ficam fora (`00_INDICE` §1.4).

---

## Quem opera cada passo

### Seu papel (só isto)

| # | Você faz | Quando |
|---|---|---|
| **U1** | Manda fotos de objetos para virar modelo 3D e diz "parece / não parece" à prévia | Quando quiser um equipamento no simulador |
| **U2** | Usa o simulador e conta na conversa o que estranhou (conteúdo e didática) | Sempre que usar |
| **U3** | Concede acesso: deixa o notebook ligado com o app Claude Desktop aberto quando o agente avisar, e aprova os pedidos de acesso (pastas, aplicativos, página do GitHub) | Etapa D e testes no notebook |
| **U4** | Responde perguntas essenciais | Raramente: só o que muda o resultado e só você sabe |

### O que o agente faz
Todo o resto: documentos, código, testes, modelos 3D (Blender por script), Godot por linha de comando, Git, *pull requests*, *merge*, CI, Releases, issues e os testes no seu notebook (abrir o executável, medir o desempenho, ler os logs).

### Onde o agente trabalha

| Ambiente | Para quê |
|---|---|
| **Sessão na nuvem** (Claude Code no claude.ai, com o repositório anexado) — principal | Documentos, código, Git e PRs, Godot *headless* para Linux, Blender (`bpy`), testes. Não precisa do notebook ligado. |
| **GitHub Actions** | CI a cada PR; testes e exportação do Godot; Releases. |
| **Seu notebook, a partir da sessão na nuvem** | Arquivos pela ponte do app Claude Desktop; tela pelo controle de aplicativos (abrir o `.exe`, ler o painel F3); navegador logado no GitHub para o que a API não permite. |
| **Sessão Local** (Claude Desktop → aba *Code*) | Reserva, só se algum passo exigir um terminal no Windows. |

### Regras fixas do agente

1. No notebook, só as pastas `C:\projetos\simulador-normas-testes`, `C:\projetos\simulador-normas`, `C:\ferramentas` e `C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT`, e só os aplicativos do projeto. Outras pastas, só com pedido seu.
2. Todo trabalho em *branch* + *pull request*; *merge* (squash) **só com CI verde**. Nunca `push --force` na `main`, nunca reescrever histórico.
3. Nunca comitar tokens, `.env`, fotos suas ou dados pessoais (repositório público).
4. Texto da norma só do PDF em `docs/referencias/`; nada "de memória".
5. Pergunta ao usuário só o essencial (R8); o resto decide e registra como [INFERÊNCIA] em `docs/DECISOES.md`.
6. Nenhuma ferramenta é instalada ou configurada antes de concluída a Etapa F, salvo pedido seu.

---

## Etapa A — Contas e decisões iniciais (passos 1–8) ✅ concluída

- [x] **1.** GitHub `pedrooalvess1-glitch`. **2.** 2FA ativo. **3.** Repositório **público** (nunca comitar segredos ou dados pessoais). **4.** Nome `simulador-normas`. **5.** Licença MIT. **6.** Claude Pro, Claude Desktop. **7.** Notebook Acer 2018, Windows 10 Pro, AMD A10-9600P, Radeon R5 integrada + R7 M340, 7,5 GB de RAM. **8.** Pasta `C:\projetos`.

## Etapa B — Ferramentas no notebook (passos 9–18) ✅ concluída

- [x] **9–18.** Git 2.56.0 (identidade `Pedro Alves`), VS Code 1.140.0 com `godot-tools`, Godot `4.7.2.stable` em `C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT` (export templates só Windows x86_64), Blender 4.5.10 LTS. Passo 17: Compatibility via ANGLE/D3D11 na R5, ~496 FPS sem sombra e ~75 FPS com sombra (cena trivial) → **sem sombras em tempo real e sem texturas**. Essas instalações ficam como reserva: o trabalho com Godot e Blender roda na nuvem; o notebook é o alvo de desempenho.

## Etapa C — Repositório (passos 19–28)

- [x] **19–22.** Repositório criado; pastas com `.gitkeep`; documentos em `docs/`.
- [x] **23.** PDF da Portaria em `docs/referencias/portaria-mte-no-737-nova-nr-10.pdf` (673.795 bytes; 133 itens numerados).
- [x] **24.** 🤖 Protótipo em `prototipo/` (Trilha 1).
- [x] **25.** 🤖 GitHub vinculado ao Claude; projeto inteiro na `main`; CI ativo.
- [ ] **27.** 🤖 Criar os rótulos `bug`, `conteudo-norma`, `desempenho`, `didatica`, `docs`, `ideia`, `trilha-1`, `trilha-2`, `arte` (API REST; se o *proxy* recusar, pelo navegador na Etapa D).
- A proteção da `main` fica no passo 34 (Etapa D), feita pelo navegador, porque a API de configurações do repositório não é acessível pela sessão na nuvem. Não há quadro no GitHub Projects: a API dele é GraphQL, bloqueada na nuvem; o `STATUS`, o `PROXIMA_SESSAO` e as issues bastam.

## Etapa E — Infraestrutura do repositório (passos 35–46)

- [x] **35.** 🤖 `CLAUDE.md` (regras permanentes).
- [ ] **38.** 🤖 `docs/CONVENCOES.md` (nomes de arquivos e de nós; idioma: código em inglês, textos ao jogador em português; mensagens de commit; numeração de versões do motor e do pacote).
- [ ] **39.** 🤖 `docs/GLOSSARIO_DO_PROJETO.md` (motor, pacote, missão, capítulo, fase F1–F8, verbo, gate, consequência, severidade, debrief, fatia vertical, trilha, remissão).
- [ ] **40.** 🤖 Modelos de issue (`bug`, `conteudo-norma`, `desempenho`). O agente os preenche a partir do que você contar na conversa.
- [ ] **41.** 🤖 Modelo de pull request.
- [x] **42.** 🤖 CI (`.github/workflows/ci.yml`): build do protótipo, `node --check`, `dist/` igual ao build e conferência dos itens contra o PDF.
- [ ] **42b.** 🤖 CI: checar links internos quebrados entre os `.md`.
- [ ] **43.** 🤖 `docs/_MODELO_DOCUMENTO.md` (formato da `00_INDICE` §5).
- [x] **44.** 🤖 `docs/PENDENCIAS_DE_VERIFICACAO.md`.
- [x] **45.** 🤖 `docs/DECISOES.md`.

## Etapa F — Documentos de planejamento (passos 47–64)

Um documento por PR, na ordem da `00_INDICE` §5.4. O agente escreve, decide o que não é essencial (registrando) e só pergunta o essencial (U4).

Roteiro de cada documento (o agente segue sozinho):
> Ler `CLAUDE.md`, `docs/00_INDICE_E_DECISOES_INFRAESTRUTURA.md`, `docs/DECISOES.md` e os documentos já escritos. Escrever `docs/<ARQUIVO>` no formato de `docs/_MODELO_DOCUMENTO.md`. NR-10 da Portaria MTE 737/2026, edição única; conteúdo só da NR-10 (R9). Marcar fonte × prática × inferência. Rodar `tools/conferir_itens_portaria.py`. Abrir o PR e fazer o *merge* com CI verde.

- [ ] **47.** 🤖 `01_VISAO_E_PEDAGOGIA` · **48.** `14_PACOTE_NR10_NORMA` · **49.** `04_MOTOR_DE_NORMAS` · **50.** `05_MODELO_DE_ENERGIA_E_PERIGOS` · **51.** `11_CAMPANHA_NR10` · **52.** `15_AMBIENTES_NR10` · **53.** `07_CATALOGO_DE_ITENS` · **54.** `09_PERSONAGENS_E_PAPEIS` · **55.** `08_INTERACAO_VERBOS_INVENTARIO` · **56.** `13_INTERFACE_E_DOCUMENTOS` · **57.** `02_ARQUITETURA_GERAL` · **58.** `03_PLATAFORMA_E_DESEMPENHO` · **59.** `06_MUNDO_3D_E_KIT_DE_AMBIENTES` + `18_PIPELINE_DE_ARTE_LEVE` (incluir a Etapa I) · **60.** `16_DADOS_SAVES_LOG_REPLAY` + `12_AVALIACAO_E_MODELO_DO_ALUNO` · **61.** `17_TESTES_VALIDACAO_CI` · **62.** `21_ROADMAP_E_MARCOS` · **63.** `22`, `23`, `24`, `25`.
- [ ] **64.** 🤖 Revisão cruzada de `docs/`: contradições, lacunas, dependências circulares. Os documentos-base `PLANO_V3` e `ARQUITETURA` são absorvidos pelos documentos 01, 02, 05, 11, 14, 15 e 16 e saem do repositório. `10_MODO_LIVRE` e `19_NOVO_PACOTE` ficam para depois.

## Etapa D — Ambiente de execução (passos 29–34), depois da Etapa F

- [ ] **29.** 🤖 Pedir acesso (👤 **U3** aprova uma vez): pastas `C:\projetos` e a do Godot pela ponte do app Claude Desktop; controle da tela para o executável de teste, o Godot e o navegador.
- [ ] **30.** 🤖 Godot na nuvem: baixar o Godot 4.7.2 para Linux e os *export templates* do GitHub da Godot, rodar `--headless --version` e fixar a versão e a soma de verificação no CI.
- [ ] **31.** 🤖 Blender na nuvem: instalar o módulo `bpy`, gerar e exportar um cubo `.glb`, renderizar a prévia; fixar a versão (o PyPI oferece a série 5.x para o Python da sessão; o notebook tem a 4.5.10 LTS) e registrar no `CLAUDE.md` [VERIFICAR].
- [ ] **32.** 🤖 gdUnit4: definir como entra no projeto (o *proxy* da nuvem bloqueia páginas de repositórios de terceiros no GitHub; o CI não tem esse bloqueio) [VERIFICAR].
- [ ] **33.** 🤖 Teste no notebook: exportar um `.exe` trivial, copiar para `C:\projetos\simulador-normas-testes`, abrir pelo controle da tela, ler o FPS e apagar o executável.
- [ ] **34.** 🤖 GitHub pelo navegador do usuário: proteger a `main` exigindo os *checks* do CI (sem exigir revisão humana); ativar "apagar *branch* depois do *merge*"; apagar todas as *branches* já mescladas (todas, exceto a `main`).

## Etapa G — Esqueleto Godot e fatia vertical (passos 65–76)

- [ ] **65–68.** 🤖 Projeto Godot (Compatibility, 4.7.2), gdUnit4, CI de testes, CI de exportação do `.exe` Windows.
- [ ] **69.** 🤖 Abrir o primeiro `.exe` da Release no notebook (controle da tela) e conferir se abre.
- [ ] **70–75.** 🤖 Camada base, motor de regras, solver elétrico, `act()` com 6 verbos, ambiente do Capítulo 0, Missão 0.
- [ ] **76.** 🤖 Jogar a Missão 0 no notebook e medir o FPS no painel F3. 👤 **U2:** jogar e dizer o que ficou confuso.

## Etapa H — Ciclo de correção (passos 77–80, repetidos)

- [ ] **77.** 👤 **U2:** contar na conversa o problema. 🤖 O agente busca o log no notebook (`%APPDATA%\Godot\app_userdata\<projeto>\logs` [VERIFICAR o caminho]) e abre a issue.
- [ ] **78–80.** 🤖 Corrigir em *branch*, PR, CI verde, *merge*, Release numerada, atualizar `DECISOES.md` e o roadmap.

---

## Etapa T — Trilha 1: protótipo de estudo (congelada)

- [x] **T1.** 🤖 Protótipo three.js com módulo **História**, fases I–IV, Missão e fase **Treino** (simulado, revisão espaçada, gerador, cartões, painel), em `prototipo/dist/simulador-nr10-offline.html` e no Artifact do claude.ai.
- [ ] **T2.** 👤 **U2:** usar para estudar, se quiser. Rotina sugerida [INFERÊNCIA]: 1) aba **Revisão** até zerar; 2) 15 min de **Gerador** nos temas mais fracos do painel; 3) um **Simulado** de 20 questões a cada dois dias, no ritmo da prova; 4) **Cartões** no celular nos intervalos.
- [ ] **T3.** 🤖 Melhorias registradas em `docs/PROXIMA_SESSAO.md` §4: só são feitas se você pedir.

## Etapa I — Fotos → modelos 3D

- [ ] **I1.** 👤 **U1:** mande a foto na conversa. Ajuda: objeto inteiro, uma foto de frente e uma de lado, fundo limpo e, se der, uma medida conhecida (ex.: "o painel tem 2,2 m de altura"). Evite pessoas, placas de veículo e documentos na foto.
- [ ] **I2.** 🤖 Script Python do Blender em `art/blender/<objeto>.py` (low-poly, cores chapadas da paleta, sem textura); exporta `art/glb/<objeto>.glb` e renderiza `art/previews/<objeto>.png`.
- [ ] **I3.** 👤 **U1:** responder "parece / não parece" (e o que falta).
- [ ] **I4.** 🤖 Integrar o modelo ao catálogo de itens e ao ambiente, dentro do orçamento de polígonos (`00_INDICE` §3.3).

---

## Dicas para as sessões

1. **Uma sessão, um objetivo.** Sessões curtas gastam menos do limite do plano.
2. Você não precisa dizer o passo nem aprová-lo: o agente lê este guia, o `STATUS` e o `PROXIMA_SESSAO` e continua do próximo pendente, parando só nos pontos de parada (`PROXIMA_SESSAO` §1).
3. Discordância com a norma vira issue `conteudo-norma`, com o item da Portaria MTE 737/2026.
4. Quando o agente avisar que vai testar no notebook, feche navegador e programas pesados: são 7,5 GB de RAM e pouco disco livre.
