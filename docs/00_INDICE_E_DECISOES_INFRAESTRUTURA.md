# Simulador de Normas (NR-10 primeiro): índice mestre e decisões de infraestrutura

> Documento de **entrada** do projeto. Ele é lido antes de qualquer outro.
> Objetivo: construir uma **infraestrutura reutilizável** (motor genérico + pacotes de norma), planejada em documentos `.md` versionados no GitHub, para que sessões com agente de código implementem tudo de forma incremental.
> Primeiro pacote: **NR-10, na redação da Portaria MTE 737/2026 (edição única, §1.1)**. Primeiro modo: **Campanha**. O **Modo Livre** (missões aleatórias) vem depois, mas os contratos de dados já nascem preparados para ele.
>
> Legenda: **[FONTE]** = dito em fonte citada na pesquisa · **[PRÁTICA]** = prática comum, não verificada em fonte específica · **[INFERÊNCIA]** = decisão ou recomendação do projeto · **[INTERPRETAÇÃO]** = leitura do simulador sobre o texto da norma · **[VERIFICAR]** = detalhe de ferramenta ou fato externo a confirmar antes de virar código · **[VERIFICAR NA PORTARIA]** = número ou texto da NR-10 ainda não conferido no PDF oficial.
>
> **Conferência de itens:** na rev3 (03/11/2026), todos os números de item citados nos documentos foram conferidos contra o PDF da Portaria (`docs/referencias/portaria-mte-no-737-nova-nr-10.pdf`) com `tools/conferir_itens_portaria.py`. Todos os números da redação de 2026 existem no PDF; o relatório fica em `docs/CONFERENCIA_ITENS.md`.
>
> **Modelo de operação (rev3):** o agente de IA opera o projeto inteiro (computador, ferramentas e GitHub). O usuário só traz fotos de objetos, testa e usa o simulador, concede permissões e responde às perguntas essenciais (§1.2).

---

## Histórico de revisões

| Revisão | Data | Mudança |
|---|---|---|
| rev1 | 03/11/2026 | Versão inicial (edição 2026 padrão + edição 2004 alternativa). |
| rev2 | 03/11/2026 | **Edição única: Portaria MTE 737/2026.** Nova §1.1 com a decisão e os motivos; R7, §4, §5.2, §5.3, §7.1, §9, §10 e §11 sem o modelo de duas edições. Pendências que só existiam por causa da redação de 2004 marcadas "resolvida: fora de escopo (edição única)". Estrutura de pastas (§4) e lista de documentos (§5.0) alinhadas ao guia `01_PASSO_A_PASSO_INICIO_CLAUDE_CODE.md` rev2. §8.1 alinhada à seção "Quem opera cada passo" do guia. Novas pendências 12–21. Legenda com [INTERPRETAÇÃO] e [VERIFICAR NA PORTARIA]. |
| rev3 | 03/11/2026 | **Autonomia do agente e duas trilhas.** Novo requisito R8 (interferência mínima do usuário) e nova §1.2 (modelo de operação: o agente opera computador, Blender, Godot e GitHub; papel do usuário em 4 tarefas). Nova §1.3 (duas trilhas: estudo para a prova no protótipo offline × projeto Godot). §3.1: VS Code e Blender deixam de exigir aprendizado do usuário. §4: pastas `prototipo/` e `art/`. §8 reescrita para o agente com permissão total (modo Auto ou Bypass, merge automático com CI verde). §9 com a Trilha 1. §10: pendências 12–19 resolvidas pela conferência no PDF; 20–21 parcialmente. §11: prompt da primeira sessão local. |

---

## 1. Requisitos de base (restrições que governam todas as decisões)

| # | Requisito | Consequência no projeto |
|---|---|---|
| R1 | **Todas as ferramentas gratuitas** | Godot (MIT), VS Code, Blender (GPL), Git/GitHub (plano gratuito), gdUnit4 (MIT), Inno Setup. Nada com licença paga ou assinatura obrigatória dentro do software ou da sua cadeia de build. |
| R2 | **Ferramenta de treinamento**, não produto visual polido | Estilo **low-poly com cores chapadas**. O esforço vai para regras, interação e feedback. |
| R3 | **Rodar bem em GPU integrada com 2 GB** (memória compartilhada) | Renderizador **Compatibility** do Godot (OpenGL 3.3), sem texturas pesadas, orçamento de desempenho fixo (§3.3). |
| R4 | **O conteúdo é o mais importante** | Norma como dados, fidelidade ao texto, rastreabilidade item → interação → feedback. |
| R5 | **Campanha primeiro**, Modo Livre depois | Roadmap em duas fases (§9). Os esquemas de missão servem aos dois modos desde o início. |
| R6 | **Extensível a outras normas e ambientes** (industrial, comercial, residencial, concessionária) | Separação rígida motor × pacote (§4). |
| R7 | **Uso permanente**, não só para a prova | **Edição única:** o simulador implementa só a NR-10 na redação da **Portaria MTE 737/2026** (§1.1). Não há seletor de edição, edição padrão nem mapeamento entre redações. |
| R8 | **Interferência mínima do usuário** (rev3) | O usuário não aprende Blender, Godot nem VS Code. O agente opera as ferramentas e o repositório (§1.2). Toda pergunta ao usuário precisa ser essencial: uma decisão que só ele pode tomar ou que não dá para desfazer. |

### 1.1 Decisão: edição única da norma (rev2)

- **Decisão:** o projeto usa uma única redação da NR-10, a da **Portaria MTE 737/2026**.
- **Motivos** (registrados como decididos):
  1. Suportar duas edições multiplica a complexidade do motor (versionamento de regras, precedência entre edições, testes duplicados).
  2. Os próximos concursos cobram a redação atualizada.
- **Consequências:**
  1. Sai o conceito de "edição": seletor, edição padrão, precedência entre edições, mapeamento 2004 ↔ 2026, missões e conteúdos duplicados por edição.
  2. O motor continua **orientado a dados** (princípio 1, §2). Isso mantém aberta a porta para **outras normas** como pacotes separados (R6). Não significa várias edições da mesma norma. Regra: **um pacote = o texto de uma norma, numa redação**.
  3. "Versão do pacote" (princípio 5) é o número de release dos dados do pacote (ex.: `nr10 0.3.0`), não uma edição da norma [INFERÊNCIA: esclarecimento de termo, para que a remoção das edições não seja confundida com a remoção do versionamento dos dados].
  4. Todo requisito, número de item, redação ou tabela que veio do texto de 2004 é conferido contra o texto de 2026 e confirmado, corrigido ou marcado [VERIFICAR NA PORTARIA].
  5. Fonte de verdade do conteúdo: o PDF da Portaria MTE 737/2026 em `docs/referencias/` (passo 23 do guia).
- Registro formal: `docs/DECISOES.md`, decisão 3 (passo 45 do guia).

### 1.2 Modelo de operação: o agente opera, o usuário decide o essencial (rev3)

**Decisão do usuário (03/11/2026):** os agentes de IA do Claude têm permissão total para operar o computador de desenvolvimento e as ferramentas, e atualizam o repositório no GitHub. A interferência do usuário fica no essencial; o resto o agente assume.

**O que o usuário faz (só isto):**

| # | Tarefa | Como |
|---|---|---|
| U1 | **Trazer fotos de objetos** para virar modelo 3D | Manda a foto na conversa ou põe em `art/fotos/` (pasta local, fora do Git). Responde "parece / não parece" à prévia que o agente gera. |
| U2 | **Testar e usar o simulador** | Abre o HTML offline (Trilha 1) ou o `.exe` da Release (Trilha 2) e conta na conversa o que achou estranho. Não precisa abrir issue: o agente abre. |
| U3 | **Conceder permissões** | Abrir a sessão Local do Claude Code na pasta do projeto, escolher o modo de permissão (abaixo) e fazer o login do GitHub uma vez (navegador). |
| U4 | **Responder perguntas essenciais** | Só as que mudam o resultado e que só ele pode responder (conteúdo da prova, gosto didático, algo irreversível). |

**O que o agente faz:** todo o resto. Escreve e revisa os documentos; cria o projeto Godot, o código e os testes; gera os modelos 3D no Blender por script (sem interface gráfica: `blender --background --python script.py`, exporta `.glb` e renderiza uma prévia `.png` para o U1); faz commits, abre e faz *merge* dos *pull requests*; configura o CI; publica Releases; transforma os relatos do U2 em issues e as corrige.

**Permissão da sessão Local** [FONTE: documentação do Claude Code, página "desktop"]:
- **Auto** (`auto`): o agente trabalha sem pedir aprovação; um classificador em segundo plano confere comandos e acessos à rede antes de rodarem. É o modo recomendado: autonomia total sem depender de você. Disponibilidade depende do modelo e da conta [VERIFICAR se aparece no seletor].
- **Bypass permissions** (`bypassPermissions`): sem nenhum pedido de aprovação. No plano Pro, precisa ligar "Allow bypass permissions mode" em Settings › Code. A documentação recomenda usá-lo só em contêiner ou máquina virtual. Use só se o Auto bloquear algo necessário.
- O modo escolhido fica salvo por pasta. Um padrão pode ir em `permissions.defaultMode` do arquivo de configuração.

**Salvaguardas que não custam tempo do usuário** [INFERÊNCIA]:
1. **Escopo de pastas:** o agente só mexe em `C:\projetos\simulador-normas` e em `C:\ferramentas` (Godot, Blender). Outras pastas (Documentos, OneDrive etc.) ficam de fora sem pedido explícito. A documentação diz que não há uma trava de pasta no Desktop, então essa regra fica no `CLAUDE.md`.
2. **Git como rede de segurança:** todo trabalho vai em *branch* + *pull request*; nada de `push --force` na `main` nem reescrita de histórico; qualquer erro é revertível.
3. **CI como porteiro:** o *merge* automático só acontece com o CI verde (proteção da `main` exigindo os *checks*, sem exigir revisão humana).
4. **Repositório público:** nunca comitar tokens, `.env`, fotos pessoais ou dados pessoais.
5. **Disco e memória:** o computador de teste tem ~9 GB livres e 7,5 GB de RAM; o agente limpa *builds* antigos e evita baixar ferramentas pesadas.

### 1.3 Duas trilhas até a prova (rev3)

A data provável da prova objetiva passou para **13/12/2026** (Aditivo 2 do edital, 30/10/2026) [FONTE: site da banca]. O software Godot não fica pronto até lá. Por isso:

| Trilha | Para quê | Onde | Prioridade até a prova |
|---|---|---|---|
| **1 — Estudo** | O usuário estuda a NR-10 enquanto o projeto é construído | Protótipo three.js em `prototipo/` (HTML offline; Artifact do claude.ai a republicar). Na rev3 ganhou a fase **Treino**: simulado no estilo de banca, revisão espaçada, gerador de questões e cartões | **Alta.** Cada melhoria entra em dias, não em semanas |
| **2 — Projeto** | Infraestrutura permanente (motor + pacotes de norma) | Godot 4.7.2 (`engine/`, `packs/`) | Avança em paralelo, sem tirar tempo de estudo do usuário |

Regra de uso do plano Claude Pro [INFERÊNCIA]: quando o limite de uso apertar, a Trilha 1 tem preferência até 13/12/2026.

---

## 2. Princípios do projeto

1. **Norma é dado, não código.** Nenhuma regra normativa dentro de cena, missão ou script do motor.
2. **O mundo é calculado a partir de fontes de energia**, nunca pintado.
3. **Um único ponto de mudança do mundo:** a função `act(verbo, item, alvo)`. Interface, testes e replay usam o mesmo caminho.
4. **Camadas:** a de baixo nunca chama a de cima. A comunicação de volta é por eventos (*signals* no Godot).
5. **Tudo reproduzível:** uma missão é definida por `(versão do pacote, versão do motor, semente)`.
6. **Verdade invisível:** o estado elétrico só é revelado por medição com instrumento válido. O "raio-x" aparece no debrief e no modo aprendiz, que esmaece com o progresso.
7. **Fidelidade:** texto da norma literal e conferido no PDF da Portaria MTE 737/2026. Toda interpretação do simulador é rotulada como tal.
8. **Verificável por máquina:** todo conteúdo passa por validação de esquema e por teste automático no CI desde o primeiro dia.
9. **Leve por padrão:** se um recurso visual não ensina nada, ele não entra.

---

## 3. Plataforma

### 3.1 Stack (todas gratuitas)

| Camada | Ferramenta | Licença | Papel |
|---|---|---|---|
| Motor de jogo | **Godot 4.7.x** (versão exata fixada no projeto e no CI) [FONTE: 4.7.2 é a estável de ago/2026] | MIT | Cenas, física simples, UI, exportação |
| Linguagem | **GDScript** | — | Sintaxe parecida com Python; sem toolchain .NET; mantém a exportação web aberta |
| Renderizador | **Compatibility** (OpenGL 3.3 no desktop, WebGL 2 na web) | — | O mais leve do Godot; roda em GPU integrada [PRÁTICA] |
| Editor de código | VS Code + extensão `godot-tools` (LSP e depurador) | MIT | Edição, depuração |
| Modelagem 3D | Blender → glTF 2.0 (`.glb`) | GPL | Peças low-poly |
| Testes | gdUnit4 (headless) + validação de esquema JSON | MIT | Unidade, cena, conteúdo |
| Versionamento e CI | Git + GitHub (repositório + Actions + Releases + Issues) | Plano gratuito | Código, documentos, builds, relatórios de bug |
| Instalador Windows | Inno Setup | Gratuito | Instalação e atalho |

**Versões instaladas** (guia, passos 9–18) [FONTE: ambiente do usuário]: Godot `4.7.2.stable` (export templates só Windows x86_64), Git 2.56.0, VS Code 1.140.0, Blender 4.5.10 LTS.

**Quem usa cada ferramenta (rev3):** o agente usa Godot (linha de comando, `--headless`), Blender (Python, `--background`) e Git; o usuário não precisa abrir nenhum dos três. O VS Code fica opcional, só se o usuário quiser olhar algum arquivo.

**Por que Godot e não as alternativas** (o mecanismo de cada decisão):
- **Unity e Unreal** saem pela regra R1: as condições de licença para uso não-jogo e acima de certos faturamentos institucionais podem exigir planos pagos [FONTE], e o Unreal usa ativos binários, que um agente de código não consegue ler nem editar.
- **Web pura (TypeScript + three.js) empacotada em Electron/Tauri** é gratuita e leve, mas obriga a escrever à mão tudo o que um motor já entrega (gerência de cenas, interface, entrada, save, câmera, colisão). Para um desenvolvedor solo trabalhando com agente, o Godot reduz o volume de código e, por gravar cenas em texto (`.tscn`, `.tres`), continua legível para o agente [PRÁTICA].
- **Bônus do renderizador Compatibility:** é o mesmo que o Godot usa na **exportação web**. Logo, uma versão de navegador fica possível sem retrabalho, útil para demonstração ou estudo rápido [PRÁTICA; VERIFICAR limitações da exportação web do 4.7].

O protótipo atual em three.js passa a ser **fonte de conteúdo** (textos da norma em `REF`, tabelas, questões, sequências), não código a ser portado. Na rev2, esse conteúdo foi alinhado à edição única. Na rev3, o protótipo voltou a ser desenvolvido como ferramenta de estudo (Trilha 1, §1.3) e fica em `prototipo/`, na raiz do repositório.

### 3.2 GPU integrada: como garantir desempenho

**Mecanismo:** GPU integrada não tem VRAM própria. Ela divide a RAM do sistema e tem banda de memória e poder de preenchimento (*fill rate*) muito menores que uma placa dedicada. O que derruba o desempenho nesse caso é, em ordem: (1) texturas grandes (memória e banda), (2) sombras em tempo real (cada luz com sombra renderiza a cena de novo), (3) pós-processamento em tela cheia (cada efeito relê o quadro inteiro), (4) número de *draw calls* (custo de CPU e de driver). Contagem de polígonos é o problema menos grave para cenas de centenas de objetos low-poly.

**Medição real (guia, passo 17)** [FONTE: teste do usuário]: no computador de teste, o Godot usa a Radeon R5 via **ANGLE sobre Direct3D 11** (o driver AMD de 2020 tem OpenGL fraco). Cena trivial: ~496 FPS sem sombra e ~75 FPS com sombra direcional (V-Sync desligado). Decisão derivada no guia: **sem sombras em tempo real e sem texturas**.

Configuração padrão do projeto:
1. Renderizador `gl_compatibility`.
2. **Sem texturas de imagem.** Os materiais usam **cor chapada** ou uma **paleta única** (uma imagem 256 × 256 com faixas de cor, compartilhada por todos os modelos, no estilo Kenney). Placas de sinalização e etiquetas usam `Label3D` sobre placa de cor chapada (rev3).
3. Uma luz direcional + luz ambiente. **Sem sombras em tempo real** em nenhum perfil (rev3, conforme o passo 17 do guia).
4. Sem SSAO, SSR, glow, bloom, volumetria ou partículas em massa. O raio-x do debrief usa linhas e poucas partículas instanciadas.
5. Antialiasing: FXAA ou nenhum. Escala de resolução 3D ajustável (75–100 %).
6. Texto 3D com `Label3D` (não com texturas de texto).
7. Objetos repetidos (isoladores, cones, painéis, brita) com `MultiMeshInstance3D`.
8. Ocultar o que está fora do ambiente atual: cada ambiente é carregado como cena separada e descarregado ao sair.

Perfis de qualidade no menu: **Leve** (padrão, alvo GPU integrada), **Médio** e **Alto** (só antialiasing melhor e escala de resolução 100 %; nenhum deles liga sombras nem texturas). Se houver placa dedicada no computador de teste, o Windows permite escolher "Alto desempenho" por aplicativo em Configurações → Sistema → Tela → Gráficos [FONTE]; isso é opcional e não é requisito.

> **Resolvido na rev3** [INFERÊNCIA, assumida pelo agente conforme R8]: vale a decisão medida no passo 17 do guia (sem sombras em tempo real e sem texturas) para todos os perfis. Ela é a mais coerente com R2 (treinamento, não produto visual) e R3 (GPU integrada).

**Verificação no próprio jogo:** na inicialização, gravar em log `RenderingServer.get_video_adapter_name()`, o renderizador em uso e o FPS médio do primeiro minuto. Um atalho (F3) mostra um painel com FPS, *draw calls*, memória de vídeo estimada e nome da GPU [PRÁTICA; nomes de API a VERIFICAR no 4.7].

### 3.3 Orçamento de desempenho (critério de aceite)

| Métrica | Limite por ambiente (perfil Leve) |
|---|---|
| FPS em GPU integrada de referência | ≥ 30 estável (meta 60) |
| Triângulos visíveis | ≤ 150 mil |
| Draw calls | ≤ 200 |
| Memória de texturas | ≤ 64 MB |
| Tempo de carga de um ambiente | ≤ 5 s |
| Tamanho do instalador | ≤ 200 MB |

Esses limites entram no CI como teste de regressão sempre que possível (contagem de triângulos e de texturas pode ser verificada sem GPU; FPS é medido por você no computador de teste).

---

## 4. Arquitetura em duas partes

Pastas criadas no passo 21 do guia (com `.gitkeep`): `docs/`, `docs/referencias/`, `engine/`, `packs/nr10/`, `tools/`, `.github/`. As subpastas de `engine/` e `packs/nr10/` são criadas junto com o projeto Godot (passo 65). Na rev3, `prototipo/` (antes planejado como `docs/referencias/prototipo-threejs/`) sobe para a raiz, porque deixou de ser só referência: é a ferramenta de estudo em evolução.

```
repo/
  docs/                    ← todos os .md de planejamento (versionados)
    referencias/           ← PDF da Portaria MTE 737/2026 (fonte de verdade), relatórios de pesquisa
  prototipo/               ← (rev3) simulador three.js ativo: Trilha 1, estudo para a prova
    dist/                  ← HTML offline gerado pelo build (versionado para baixar de qualquer lugar)
  art/                     ← (rev3) pipeline de arte operado pelo agente
    blender/               ← scripts .py que geram cada modelo
    glb/                   ← modelos exportados
    previews/              ← prévias .png para o usuário aprovar
    fotos/                 ← fotos de referência do usuário (local; fora do Git)
  engine/                  ← motor genérico: não conhece a NR-10
    base/     eventos, save, RNG com semente, log
    world/    carregamento de ambientes, câmera, seleção de objetos
    domain/   act(), modelo de energia, motor de regras, catálogo de itens
    game/     executor de missão, campanha, (depois) gerador, modelo do aluno
    ui/       HUD, prancheta de documentos, detector, debrief
  packs/
    nr10/                  ← primeiro pacote de conteúdo (uma redação: Portaria MTE 737/2026)
      norm/      itens, glossário (Anexo I), anexos II–IV, artigos da Portaria
      rules/     requisitos, procedimentos, verificações, consequências
      items/     catálogo de equipamentos, EPI, EPC, ferramentas
      envs/      ambientes (cenas + grafos de energia)
      campaign/  missões roteirizadas
      templates/ (fase 2) modelos de missão para o Modo Livre
      tests/     testes do pacote
  tools/                   ← validação de esquema, auditoria de cobertura, exportação
  .github/                 ← workflows de CI, modelos de issue e de pull request
  AGENTS.md / CLAUDE.md    ← instruções permanentes para o agente de código (passos 35–36)
```

- O motor só conhece **fatos, verificações, procedimentos, consequências e fontes de energia**. Tudo o que é normativo vem do pacote.
- Camadas L0–L5 (base → mundo → domínio → jogo → interface → aplicação). A de baixo nunca chama a de cima.
- Um pacote carrega **uma** redação de **uma** norma. Não há campo de edição nem regra de precedência entre edições (§1.1).

---

## 5. Mapa dos documentos de planejamento

Todos ficam em `docs/` no repositório. Formato padrão de cada um (modelo em `docs/_MODELO_DOCUMENTO.md`, passo 43):
**Objetivo · Escopo e limites · Dependências · Contratos/esquemas · Decisões (com motivo) · Exemplos · Casos de teste · Perguntas abertas · Critérios de pronto.**

### 5.0 Documentos que já existem em `docs/` (guia, passo 22)

| Arquivo | Papel | Situação |
|---|---|---|
| `00_INDICE_E_DECISOES_INFRAESTRUTURA.md` | Este arquivo: entrada, requisitos, decisões de infraestrutura | rev3 |
| `01_PASSO_A_PASSO_INICIO_CLAUDE_CODE.md` | Guia operacional; "quem opera cada passo" | rev3 (agente com permissão total) |
| `PLANO_V3_SIMULADOR_NR10.md` | Base de conteúdo e didática para os documentos 01, 11, 14 e 15 | rev3 |
| `ARQUITETURA_SOFTWARE_SIMULADOR_NR10.md` | Base para os documentos 02, 05 e 16 (exemplos em JS, a reescrever em GDScript) | rev3 |
| `STATUS_SIMULADOR_NR10.md` | Situação do projeto, inventário do protótipo, auditoria de cobertura | rev3 |

Escritos na rev3 (03/11/2026; entram no GitHub com o passo 25 do guia): `CLAUDE.md` e `AGENTS.md` (raiz; o segundo aponta para o primeiro), `docs/DECISOES.md`, `docs/PENDENCIAS_DE_VERIFICACAO.md`, `docs/CONFERENCIA_ITENS.md` (saída do script de conferência) e `docs/historico/RELATORIO_ATUALIZACAO_EDICAO_UNICA.md`. Ainda faltam, da Etapa E do guia: `CONVENCOES.md` (38), `GLOSSARIO_DO_PROJETO.md` (39), `_MODELO_DOCUMENTO.md` (43), modelos de issue e de PR (40–41) e o CI de documentos (42).

> **Prefixo `01` (resolvido na rev3)** [INFERÊNCIA]: o guia (`01_PASSO_A_PASSO_…`) e o futuro `01_VISAO_E_PEDAGOGIA` mantêm os nomes; os documentos sempre se citam pelo nome completo, nunca só pelo número. Renomear o guia agora quebraria referências sem ganho.

### 5.1 Projeto
| # | Arquivo | Conteúdo |
|---|---|---|
| 00 | `00_INDICE_E_DECISOES` | Este arquivo |
| 01 | `01_VISAO_E_PEDAGOGIA` | Público, objetivos de aprendizagem, princípios didáticos, fases F1–F8 de uma Ordem de Serviço, severidade, debrief |
| 20 | `20_FLUXO_DE_TRABALHO_COM_AGENTE` | Repositório, `AGENTS.md`, laço de desenvolvimento, ciclo de testes e de correção (§8) |
| 21 | `21_ROADMAP_E_MARCOS` | Fase 1 (Campanha), Fase 2 (Modo Livre), Fase 3 (outras normas), critérios de aceite por marco |

### 5.2 Motor (genérico)
| # | Arquivo | Conteúdo |
|---|---|---|
| 02 | `02_ARQUITETURA_GERAL` | Camadas, eventos, motor × pacote, contratos entre módulos, `act()` |
| 03 | `03_PLATAFORMA_E_DESEMPENHO` | Versões fixadas, renderizador, perfis de qualidade, orçamento, exportação Windows/Linux/Web |
| 04 | `04_MOTOR_DE_NORMAS` | Norma como dados: esquema, rastreabilidade item → regra, validação. **Um pacote = uma redação de uma norma** (sem edições nem precedência) |
| 05 | `05_MODELO_DE_ENERGIA_E_PERIGOS` | Modelo genérico de energia, solver elétrico, perigos (choque, arco), extensões (mecânica, altura, atmosfera) |
| 06 | `06_MUNDO_3D_E_KIT_DE_AMBIENTES` | Estilo visual low-poly, peças modulares, grade, escala, câmera, metadados nos modelos |
| 07 | `07_CATALOGO_DE_ITENS` | Formato do item (forma, estado, verbos, referências normativas) e catálogo-base comum |
| 08 | `08_INTERACAO_VERBOS_INVENTARIO` | Verbos, menu por contexto, inventário, EPI vestido, controles |
| 09 | `09_PERSONAGENS_E_PAPEIS` | Protagonista e sua progressão, NPCs, diálogos, ordens, autorização |
| 10 | `10_MODO_LIVRE_GERADOR_DE_MISSOES` | Fase 2: gerador, solvabilidade, complicações, dificuldade, semente |
| 12 | `12_AVALIACAO_E_MODELO_DO_ALUNO` | Domínio por item da norma, repetição espaçada, modo prova, relatórios |
| 13 | `13_INTERFACE_E_DOCUMENTOS` | HUD, prancheta (procedimento/PT), sinóptico, tela do detector, debrief |
| 16 | `16_DADOS_SAVES_LOG_REPLAY` | Formato de save, log de ações, replay determinístico |
| 17 | `17_TESTES_VALIDACAO_CI` | gdUnit4, esquemas, cobertura da norma, testes de desempenho, CI |
| 18 | `18_PIPELINE_DE_ARTE_LEVE` | Blender → glTF, paleta única, nomes, limites de polígonos, licenças |
| 19 | `19_COMO_CRIAR_UM_NOVO_PACOTE` | Roteiro para NR-12, NR-35, NR-33, NBR 5410 |
| 22 | `22_ACESSIBILIDADE_E_IDIOMAS` | Tamanho de fonte, contraste, daltonismo (estado nunca só por cor), legendas, textos externos para tradução |
| 23 | `23_AUDIO_E_FEEDBACK` | Sons de alerta (detector, arco, alarme), retorno sonoro de ações, volume e mudo; áudio leve |
| 24 | `24_RELATORIOS_PARA_INSTRUTOR` | Exportação de desempenho por item da norma (CSV/PDF), uso em monitoria ou turma |
| 25 | `25_DISTRIBUICAO_E_ATUALIZACAO` | Instalador, versão portátil, numeração de versões, notas de versão, atualização de pacotes sem reinstalar o motor |

### 5.3 Pacote NR-10 (conteúdo)
| # | Arquivo | Conteúdo |
|---|---|---|
| 11 | `11_CAMPANHA_NR10` | Arco narrativo, capítulos, missões roteirizadas, progressão de papel |
| 14 | `14_PACOTE_NR10_NORMA` | Itens, glossário (Anexo I), anexos II–IV e artigos da Portaria MTE 737/2026; matriz de cobertura; pendências de fidelidade |
| 15 | `15_AMBIENTES_NR10` | Inventário de cada ambiente: equipamentos, EPC, EPI, sinalização, documentos, pessoas, grafo de energia, ganchos normativos |

### 5.4 Ordem de produção (foco na Campanha)

| Ordem | Documento | Por que nesta posição |
|---|---|---|
| 1 | 01 Visão e pedagogia | Define o que é "aprender NR-10 jogando"; todos os outros servem a isso |
| 2 | 14 Pacote NR-10 (norma) | O conteúdo é o centro (R4); define quais itens precisam virar interação |
| 3 | 04 Motor de normas | Formato em que o conteúdo do 14 é escrito |
| 4 | 05 Energia e perigos | O que torna o mundo "calculado" |
| 5 | 11 Campanha NR-10 | Quais missões, em que ordem, com que papel |
| 6 | 15 Ambientes NR-10 | Onde as missões acontecem |
| 7 | 07 Catálogo de itens | O que existe dentro dos ambientes |
| 8 | 09 Personagens e papéis | Quem age e quem é instruído |
| 9 | 08 Interação | Como o jogador age sobre itens e pessoas |
| 10 | 13 Interface e documentos | Como a informação aparece |
| 11 | 02 Arquitetura geral | Consolida os contratos definidos acima |
| 12 | 03 Plataforma e desempenho | Fixa versões e orçamento |
| 13 | 06 Mundo 3D | Estilo e kit de peças |
| 14 | 18 Pipeline de arte | Como produzir as peças |
| 15 | 16 Dados e replay | Save e log |
| 16 | 12 Avaliação | Modelo do aluno |
| 17 | 17 Testes e CI | Como provar que funciona |
| 18 | 20 Fluxo com agente | Como o código será produzido |
| 19 | 21 Roadmap | Sequência de entrega |
| 20 | 22, 23, 24, 25 | Complementos |
| 21 | 10 Modo Livre | Fase 2 |
| 22 | 19 Novo pacote | Fase 3 |

Essa ordem é a mesma dos passos 47–63 do guia. Regra: cada documento só é considerado pronto quando suas **perguntas abertas** foram respondidas por você ou registradas como pendência explícita.

---

## 6. Campanha NR-10: esboço do arco (detalhe vai no documento 11)

**Ideia central:** o protagonista **progride de papel** ao longo da campanha. Cada papel destrava responsabilidades que a própria NR-10 atribui a ele, e a campanha ensina a norma na ordem em que um profissional real a encontra.

| Capítulo | Papel do protagonista | Ambientes | Foco normativo |
|---|---|---|---|
| 0 — Tutorial | Eletricista recém-autorizado | Residência (QDC) | Verbos, bloqueio, teste de ausência de tensão, EPI básico, partes vivas (inclui o neutro) |
| 1 — Baixa tensão | Eletricista autorizado | Comércio, sala de painéis de prédio | DR, gerador com QTA (retorno de energia), nobreak (CC), sinalização, porta de painel fechada |
| 2 — Média tensão abrigada | Eletricista autorizado com treinamento SEP/MT | Subestação abrigada 13,8 kV | Sequência de desenergização e reenergização, aterramento temporário, zonas, PT |
| 3 — Indústria | Supervisor / condutor dos trabalhos | Sala de máquinas, CCM | Supervisão de equipe, autorização, arco (Anexo IV), energias múltiplas com interface NR-12, ergonomia |
| 4 — Subestação ao tempo | Supervisor | SE aérea 69/13,8 kV | Manobras, comunicação com o centro de operação, religamento, tensão de passo e toque, trabalho em equipe |
| 5 — Responsável e anfitrião | Trabalhador autorizado responsável por visitas | Pátio de SE com visitantes | Pessoa não advertida, instrução formal, zona livre, acompanhamento permanente, emergência |
| 6 — Fiscalização e projeto | Profissional legalmente habilitado | Escritório técnico, auditoria | Prontuário (PIE), documentação, situações de risco grave e iminente, projeto e memorial |

Capítulos extras planejados para depois: canteiro de obras perto de rede, rede aérea de distribuição, linha viva, fotovoltaico, área classificada.

Cada missão segue as fases F1–F8 (briefing → planejamento → almoxarifado → chegada e caça ao risco → DDS e autorização → desenergização → execução com evento → reenergização e encerramento) e termina em debrief. Todas usam **uma só** sequência de desenergização (10.13.1) e de reenergização (10.13.2).

**Ponte para o Modo Livre:** toda missão da campanha é escrita com **o mesmo esquema** que o gerador usará (ambiente + serviço + papel + requisitos + complicações). A diferença é só quem preenche: na campanha, o autor; no Modo Livre, o gerador.

---

## 7. Ambientes e papéis: base já pesquisada

### 7.1 Zonas e faixas [FONTE: Portaria 737/2026, conferido no PDF]
- Anexo II, raios: < 1 kV: Rr 0,20 / Rc 0,70 m · ≥ 10 e < 15 kV: 0,38 / 1,38 m · ≥ 60 e < 70 kV: 0,90 / 1,90 m · ≥ 132 e < 150 kV: 1,20 / 3,20 m. Em sistemas trifásicos, vale a tensão entre fases (observação do Anexo II).
- Faixas (glossário, Anexo I): EBT ≤ 50 V CA / 120 V CC · BT > 50 V a 1.000 V CA (> 120 V a 1.500 V CC) · MT > 1 kV a 36,2 kV CA (> 1.500 V a 3.000 V CC) · AT > 36,2 kV CA (> 3.000 V CC). Logo, 13,8 kV é MT.

### 7.2 Ambientes (detalhe no documento 15)
- **SE aérea/ao tempo:** pátio de brita, pórticos e barramentos, seccionadoras com lâmina de terra, disjuntores, TCs/TPs, para-raios, transformador de potência com bacia de contenção, casa de comando (proteção, baterias com lava-olhos), malha de terra, cerca aterrada, sinalização. [PRÁTICA]
- **SE abrigada 13,8 kV:** cubículos, seccionadora, disjuntor, transformador, tapete isolante, vara de manobra, extintor, unifilar afixado. [PRÁTICA]
- **Sala de máquinas industrial:** motores, bombas, compressores (energia pneumática armazenada), CCM com gavetas, inversores (capacitores do barramento CC), chave de segurança local, ponte rolante. Anexo IV: CCM 600 V com 65 kA e 0,03 s = Cat. 2; com 42 kA e 0,33 s = Cat. 4 [FONTE].
- **Sala de painéis de prédio:** cabine primária, QGBT, grupo gerador com QTA (risco de retorno de energia; 10.14.5, geração própria), nobreak, prumadas, quadros de andar, painel da bomba de incêndio, DDR em áreas molhadas (10.6.4) [FONTE para os itens].
- **Pátio de SE com visitantes:** quem faz atividade não elétrica na zona livre próxima à zona controlada precisa de análise de risco e instrução formal (10.14.1.2); "pessoa não advertida" é termo do glossário (Anexo I; ainda fora da `REF`); profissional estrangeiro ou não residente na zona controlada por até 30 dias exige o treinamento "Específico e pontual" de 8 h e acompanhamento presencial e permanente de trabalhador autorizado (10.9.8 e Quadro I) [FONTE]. Regras de visita (cadastro, briefing, EPI de visitante, caminho marcado, contagem, limite por acompanhante, parada por tempestade, ponto de encontro) são [INFERÊNCIA/PRÁTICA] até serem conferidas em procedimentos de concessionárias.

### 7.3 Papéis definidos na norma [FONTE]
- **Qualificado** (10.8.1), **PLH** (10.8.2; aprova procedimentos, 10.7.1.1; responde pelo projeto, 10.4.8, e pelo PIE, 10.15.6), **capacitado** (10.8.3), **autorizado** (10.10.2, inclui quem supervisiona), **supervisor / condutor dos trabalhos** indicado pela organização (10.7.6).
- "Responsável técnico" e "responsável pela instalação" não aparecem como termos no PDF (só "responsabilidade técnica de PLH", no 10.4.8.1) [FONTE: conferência rev3]. O simulador mapeia para PLH e para a organização [INTERPRETAÇÃO].

---

## 8. Fluxo de trabalho

### 8.1 Agente de código: Claude (rev3: com permissão total)
- **Claude Code numa sessão Local** do Claude Desktop (aba *Code*), na pasta `C:\projetos\simulador-normas`, modo **Auto** (ou **Bypass permissions**, se o Auto não estiver disponível ou bloquear algo necessário). Ver §1.2. É essa sessão que roda Godot, Blender e Git no computador do usuário.
- **Sessões na nuvem** (como a que produziu a rev3) servem para documentos, para o protótipo da Trilha 1 e para atualizar o GitHub pela conexão do GitHub, sem depender do computador ligado.
- **Codex** continua como alternativa equivalente em conceito, mas exige assinatura da OpenAI [VERIFICAR plano e limites atuais]; só faz sentido como revisor secundário.
- O projeto fica **agnóstico ao agente**: `AGENTS.md` aponta para o `CLAUDE.md`, que é a fonte única das regras permanentes.
- O Gemini, que você já usa para pré-processamento, pode resumir normas e catálogos antes de virarem dados — o papel de síntese e decisão continua no Claude.

### 8.2 Ciclo de uma iteração (rev3)
1. **Planejar:** o agente escolhe o próximo item do roadmap (§9), com prioridade para a Trilha 1 até a prova.
2. **Implementar:** o agente cria uma *branch*, implementa, roda os testes (sintaxe, unidade, esquema, Playwright no protótipo, gdUnit4 no Godot) e abre um *pull request* com a descrição do que mudou.
3. **Integrar:** com o CI verde, o próprio agente faz o *merge* (squash) na `main`. Sem CI verde, não há *merge*.
4. **Entregar:** o agente gera o HTML offline (Trilha 1) ou a Release com o `.exe` (Trilha 2) e avisa na conversa.
5. **Testar (usuário, U2):** você usa e conta na conversa o que estranhou, com uma captura de tela se quiser.
6. **Corrigir:** o agente transforma cada relato numa issue, corrige e volta ao passo 2.
7. **Liberar:** ao fechar um marco do §9, o agente publica uma Release numerada (ex.: `v0.3.0`) e atualiza `docs/DECISOES.md` e o roadmap.

O que **só você** verifica: clareza didática, se o conteúdo bate com o que a banca cobra, sensação de uso, desempenho real no notebook. O que o **agente** verifica sozinho: sintaxe, testes, validade dos dados, conferência dos itens contra o PDF, orçamento de polígonos e texturas, capturas de tela em modo virtual.

GitHub Actions: o repositório é **público** (guia, passo 3), e repositórios públicos têm minutos de Actions sem cota no plano gratuito [VERIFICAR valores atuais].

### 8.3 Onde e como os `.md` são escritos
- **Onde:** na pasta `docs/` do repositório. Desde a rev3, o remoto no GitHub é a fonte da verdade; a cópia local é sincronizada pelo agente no começo de cada sessão Local (`git fetch` + `git reset --hard origin/main`, depois de conferir que não há trabalho local só dele).
- **Como:** uma sessão por documento, na ordem da §5.4 (passos 47–63 do guia). O agente escreve, decide o que não é essencial (registrando como [INFERÊNCIA]) e só pergunta o que for essencial (R8). Documentos são **vivos**: mudanças entram por *pull request*, com o motivo em `docs/DECISOES.md`.

---

## 9. Roadmap resumido (detalhe no documento 21)

| Fase | Marco | Entrega |
|---|---|---|
| T1 | Treino v3 (feito em 03/11/2026) | Fase "Treino" no protótipo: simulado no estilo de banca, revisão espaçada, gerador de questões (11 tipos), 42 cartões de fatos, painel de desempenho |
| T1 | Treino v4 (até a prova) | Explicação de cada distrator; questões no formato de 5 alternativas; mais cartões dos itens nunca exercitados (PLANO §13); 10.2.4.1 e artigos da Portaria exercitados |
| 0 | Planejamento | Documentos 01, 14, 04, 05, 11, 15, 07, 09, 08, 13, 02, 03, 06, 18, 16, 12, 17, 20, 21 |
| 0 | Repositório | Estrutura, CI mínimo, `AGENTS.md`, modelos de issue |
| 1 | Fatia vertical | Motor mínimo + Capítulo 0 (residência) jogável do início ao debrief, em Godot, no perfil Leve |
| 1 | Campanha MT | Capítulo 2 (SE abrigada) com solver elétrico, desenergização (10.13.1) e reenergização (10.13.2), aterramento, zonas |
| 1 | Campanha completa | Capítulos 1, 3, 4, 5, 6 + avaliação + relatórios |
| 2 | Modo Livre | Gerador, planejador de solvabilidade, modelo do aluno adaptativo |
| 3 | Outras normas | Primeiro pacote novo (ex.: NR-12 ou NR-35) usando o documento 19 |

**Fatia vertical primeiro:** antes de construir muitas missões, uma única missão completa atravessa todas as camadas (dados → regras → energia → interação → interface → debrief → save → testes → build). Isso expõe cedo os erros de arquitetura, quando ainda são baratos de corrigir.

---

## 10. Pendências de verificação

Nada desta lista vira código como fato antes de ser confirmado. Esta lista é a base do `docs/PENDENCIAS_DE_VERIFICACAO.md` (passo 44).

| # | Pendência | Status (rev3) |
|---|---|---|
| 1 | Requisitos mínimos do renderizador Compatibility do Godot 4.7 (versão de OpenGL e drivers de GPUs integradas antigas). | Parcialmente respondida: no computador de teste, roda via ANGLE/D3D11 na Radeon R5 (passo 17). Falta a referência oficial. |
| 22 | *(nova, rev3)* Se o modo **Auto** do Claude Code aparece no Desktop para o plano do usuário. | Aberta [VERIFICAR] (o agente confere na primeira sessão Local) |
| 2 | Limitações da exportação web no Godot 4.7. | Aberta |
| 3 | Nomes exatos das APIs de diagnóstico de GPU e memória de vídeo no 4.7. | Aberta |
| 4 | Viabilidade de renderizar capturas de tela no contêiner de nuvem sem GPU (para o agente conferir cenas). | Aberta (a sessão de código é Local; ver §8.1) |
| 5 | Cotas atuais do GitHub Actions para repositório privado. | Resolvida: fora de escopo (repositório público, passo 3) |
| 6 | Plano e custo atuais do Codex, se for usado. | Aberta (só se o Codex for usado) |
| 7 | Mapeamento sistemático item a item entre as edições 2004 e 2026. | **Resolvida: fora de escopo (edição única)** |
| 8 | Itens da redação 2026 que vieram de pesquisa web (marcados com `*` no PLANO), a conferir no PDF. | **Resolvida (rev3):** conferidos no PDF; o único que não batia (extintor, "10.12.4") é a pendência 13. |
| 9 | Se o item 10.14.1 do texto de 2004 foi revogado pela Portaria SEPRT 915/2019. | **Resolvida: fora de escopo (edição única)** |
| 10 | Textos oficiais de NR-12, NR-33 e NR-35 (necessários para a Fase 3). | Aberta |
| 11 | Procedimentos de visita a subestações de concessionárias (CHESF, Neoenergia, CEMIG, COPEL). | Aberta |
| 12 | Reconferir no PDF todos os números de item citados nos documentos de `docs/`. | **Resolvida (rev3):** 133 itens no PDF; todos os números de 2026 citados existem (`docs/CONFERENCIA_ITENS.md`). Rodar o script de novo a cada documento novo. |
| 13 | Item da NR-10/2026 sobre extintor e combate a incêndio. | **Resolvida (rev3):** o PDF não tem item sobre extintor; a referência é só a NR-23. |
| 14 | Onde a NR-10/2026 trata a suspensão do trabalho e o direito de recusa. | **Resolvida (rev3):** "direito de recusa" aparece só como conteúdo do Treinamento Básico (Anexo III, item 9, alínea k). Não há item de suspensão; o mais próximo é o 10.7.4.2 (anormalidade na avaliação prévia: não iniciar e comunicar). |
| 15 | Se a NR-10/2026 mantém a convenção de cores de posição de manobra (verde "D" / vermelho "L"). | **Resolvida (rev3):** não mantém (nenhuma ocorrência de verde/vermelho no PDF). No simulador é [PRÁTICA]. |
| 16 | Se o termo "ordem de serviço" aparece na NR-10/2026. | **Resolvida (rev3):** não aparece. "Ordem de Serviço" é só a unidade de jogo [PRÁTICA]; o documento normativo é o procedimento (10.7.1) ou a PT (10.7.2). |
| 17 | Item 10.2.4.1 fora da `REF`. | **Resolvida (rev3):** texto literal incluído em `refs2.js` (com os Art. 1º, 2º e 4º da Portaria). Falta exercitá-lo numa tarefa. |
| 18 | Item da NR-10/2026 sobre trabalho em altura e cinto. | **Resolvida (rev3):** não há; a referência é só a NR-35. |
| 19 | Se a NR-10/2026 tem capítulo próprio de emergência. | **Resolvida (rev3):** não tem. Emergência aparece em 10.7.3 h, 10.15.6.1 e nos conteúdos de primeiros socorros e resgate do Anexo III. |
| 20 | "DR 30 mA". | **Parcial (rev3):** confirmado que a NR-10/2026 só diz "alta sensibilidade" (10.6.4 e Anexo III). O valor 30 mA vem de norma técnica (ABNT NBR 5410) [VERIFICAR a norma]. |
| 21 | Cor da etiqueta da luva isolante por classe. | **Parcial (rev3):** a NR-10/2026 não trata de cores de luva; o Anexo IV (Quadro III, notas) cita a ASTM D120 para luvas isolantes. Confirmar a tabela de cores nessa norma [VERIFICAR]. |

---

## 11. Como abrir a próxima sessão (rev3)

O agente lê o repositório; não é preciso anexar nada. O remoto no GitHub é a fonte da verdade.

**Primeira sessão Local (passos 29–34 do guia).** Você (U3): abra o Claude Desktop → aba *Code* → ambiente Local → pasta `C:\projetos\simulador-normas` → modo **Auto** (ou Bypass). Cole:

"Claudinho, leia o `CLAUDE.md` e o `docs/01_PASSO_A_PASSO_INICIO_CLAUDE_CODE.md` (rev3). Sincronize a pasta local com o GitHub, rode os testes do protótipo, confira se o Godot responde em linha de comando e siga a partir do próximo passo pendente do guia. Só me pergunte o que for essencial."

**Sessões seguintes:** "Claudinho, continue o projeto pelo `CLAUDE.md`. Prioridade: Trilha 1 até a prova." Se quiser algo específico, diga só o objetivo (ex.: "faça o modelo 3D desta foto", "o simulado errou a questão X").
