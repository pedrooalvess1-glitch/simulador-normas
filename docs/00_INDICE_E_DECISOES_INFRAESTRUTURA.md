# Simulador de Normas (NR-10 primeiro): índice mestre e decisões de infraestrutura

> Documento de **entrada** do projeto. Ele é lido antes de qualquer outro.
> Objetivo: construir uma **infraestrutura reutilizável** (motor genérico + pacotes de norma), planejada em documentos `.md` versionados no GitHub, para que sessões com agente de código implementem tudo de forma incremental.
> Primeiro pacote: **NR-10, na redação da Portaria MTE 737/2026 (edição única, §1.1)**. Primeiro modo: **Campanha**. O **Modo Livre** (missões aleatórias) vem depois, mas os contratos de dados já nascem preparados para ele.
>
> Legenda: **[FONTE]** = dito em fonte citada na pesquisa · **[PRÁTICA]** = prática comum, não verificada em fonte específica; só cenário, nunca cobrada (§1.4) · **[INFERÊNCIA]** = decisão ou recomendação do projeto · **[INTERPRETAÇÃO]** = leitura do simulador sobre o texto da norma · **[VERIFICAR]** = detalhe de ferramenta ou fato externo a confirmar antes de virar código · **[VERIFICAR NA PORTARIA]** = número ou texto da NR-10 ainda não conferido no PDF oficial.
>
> **Conferência de itens:** os números de item citados nos documentos são conferidos contra o PDF da Portaria (`docs/referencias/portaria-mte-no-737-nova-nr-10.pdf`) com `tools/conferir_itens_portaria.py`, também no CI; o relatório fica em `docs/CONFERENCIA_ITENS.md`.
>
> **Modelo de operação:** o Claude Code opera o projeto inteiro (repositório, ferramentas e o computador do usuário). O usuário só traz fotos de objetos, usa o simulador, concede acessos e responde às perguntas essenciais (§1.2).
>
> **Fase atual:** planejamento do projeto principal (Godot). Nenhuma ferramenta é instalada ou configurada antes de o planejamento terminar (§9).

---

## 1. Requisitos de base (restrições que governam todas as decisões)

| # | Requisito | Consequência no projeto |
|---|---|---|
| R1 | **Todas as ferramentas gratuitas** | Godot (MIT), Blender (GPL), Git/GitHub (plano gratuito), gdUnit4 (MIT), Inno Setup. Nada com licença paga ou assinatura obrigatória dentro do software ou da sua cadeia de build. |
| R2 | **Ferramenta de treinamento**, não produto visual polido | Estilo **low-poly com cores chapadas**. O esforço vai para regras, interação e feedback. |
| R3 | **Rodar bem em GPU integrada com 2 GB** (memória compartilhada) | Renderizador **Compatibility** do Godot (OpenGL 3.3), sem texturas pesadas, orçamento de desempenho fixo (§3.3). |
| R4 | **O conteúdo é o mais importante** | Norma como dados, fidelidade ao texto, rastreabilidade item → interação → feedback. |
| R5 | **Campanha primeiro**, Modo Livre depois | Roadmap em duas fases (§9). Os esquemas de missão servem aos dois modos desde o início. |
| R6 | **Extensível a outras normas e ambientes** (industrial, comercial, residencial, concessionária) | Separação rígida motor × pacote (§4). |
| R7 | **Uso permanente**, não só para a prova | **Edição única:** o simulador implementa só a NR-10 na redação da **Portaria MTE 737/2026** (§1.1). Não há seletor de edição, edição padrão nem mapeamento entre redações. |
| R8 | **Interferência mínima do usuário** | O usuário não aprende Blender, Godot nem qualquer outra ferramenta. O agente opera as ferramentas, o repositório e o computador do usuário (§1.2). Toda pergunta ao usuário precisa ser essencial: uma decisão que só ele pode tomar ou que não dá para desfazer. |
| R9 | **Conteúdo só da NR-10** | O que o simulador ensina, cobra e corrige vem só do texto da Portaria MTE 737/2026. Se a NR-10 não traz a informação, ela não é buscada em outra norma (§1.4). |

### 1.1 Decisão: edição única da norma

- **Decisão:** o projeto usa uma única redação da NR-10, a da **Portaria MTE 737/2026**.
- **Motivos** (registrados como decididos):
  1. Suportar duas edições multiplica a complexidade do motor (versionamento de regras, precedência entre edições, testes duplicados).
  2. Os próximos concursos cobram a redação atualizada.
- **Consequências:**
  1. Não existe o conceito de "edição": sem seletor, edição padrão, precedência entre edições ou conteúdo duplicado por edição.
  2. O motor continua **orientado a dados** (princípio 1, §2). Isso mantém aberta a porta para **outras normas** como pacotes separados (R6). Não significa várias edições da mesma norma. Regra: **um pacote = o texto de uma norma, numa redação**.
  3. "Versão do pacote" (princípio 5) é o número de release dos dados do pacote (ex.: `nr10 0.3.0`), não uma edição da norma [INFERÊNCIA: esclarecimento de termo, para que a remoção das edições não seja confundida com a remoção do versionamento dos dados].
  4. Todo requisito, número de item, redação ou tabela entra só depois de conferido no PDF de 2026; o que não foi conferido leva [VERIFICAR NA PORTARIA].
  5. Fonte de verdade do conteúdo: o PDF da Portaria MTE 737/2026 em `docs/referencias/` (passo 23 do guia).
- Registro formal: `docs/DECISOES.md`, decisão 3 (passo 45 do guia).

### 1.2 Modelo de operação: o agente opera, o usuário decide o essencial

**Decisão do usuário:** o Claude Code tem permissão total para operar o repositório, as ferramentas (Godot, Blender) e o computador do usuário. Todo o projeto é conduzido no Claude Code; não há outro agente. A interferência do usuário fica no essencial.

**O que o usuário faz (só isto):**

| # | Tarefa | Como |
|---|---|---|
| U1 | **Trazer fotos de objetos** para virar modelo 3D | Manda a foto na conversa. Responde "parece / não parece" à prévia que o agente gera. |
| U2 | **Usar o simulador** | Usa para estudar e conta na conversa o que achou estranho ou confuso (conteúdo e didática). Abrir o executável e medir desempenho no notebook é tarefa do agente. |
| U3 | **Conceder acesso** | Quando o agente avisar que vai usar o computador: deixar o notebook ligado com o app Claude Desktop aberto e aprovar os pedidos de acesso (pasta, aplicativo, página do GitHub). |
| U4 | **Responder perguntas essenciais** | Só as que mudam o resultado e que só ele pode responder (conteúdo da prova, gosto didático, algo irreversível). |

**O que o agente faz:** todo o resto. Escreve e revisa os documentos; cria o projeto Godot, o código e os testes; gera os modelos 3D no Blender por script e renderiza uma prévia `.png` para o U1; faz commits, abre e faz *merge* dos *pull requests*; configura o CI; publica Releases; testa o executável no notebook; transforma os relatos do U2 em issues e as corrige.

**Onde o agente trabalha** [INFERÊNCIA: arranjo que tira o trabalho pesado do notebook]:

| Ambiente | O que roda | Por quê |
|---|---|---|
| **Sessão na nuvem** (Claude Code no claude.ai, com o repositório anexado) — ambiente principal | Documentos, código, Git e PRs; Godot 4.7.2 para Linux em modo *headless* (importar, testar, exportar o `.exe` de Windows com os *export templates*); Blender como módulo Python (`bpy`); Python, Node e Playwright | Não depende do notebook ligado, não gasta a RAM (7,5 GB) nem o disco curto dele. O Godot para Linux e os *export templates* são baixáveis do GitHub da Godot pela rede da sessão; o `bpy` vem do PyPI [VERIFICAR na Etapa D do guia]. |
| **GitHub Actions** (CI) | As mesmas verificações a cada PR; testes e exportação do Godot; Releases | Porteiro do *merge*; roda sem a sessão aberta. |
| **Computador do usuário**, a partir da sessão na nuvem | Arquivos, pela ponte do app Claude Desktop (pasta liberada uma vez); tela, pelo controle de aplicativos (*computer use*): abrir o `.exe`, ler o painel F3, conferir a cena na Radeon R5; navegador logado no GitHub para o que a API não permite | É o alvo de desempenho real (R3). O resto não precisa dele. |
| **Sessão Local** (Claude Desktop → aba *Code*) | Terminal no Windows | Só como reserva, se algum passo exigir um terminal no Windows. |

**Limites conhecidos da sessão na nuvem** [FONTE: testes no repositório, 04/11/2026]: o *proxy* não permite a API GraphQL do GitHub, mudanças nas configurações do repositório (proteção da `main`, apagar *branch* mesclada automaticamente) nem apagar *branches*. Esses passos são feitos pelo agente no navegador do usuário, já logado no GitHub (Etapa D do guia).

**Salvaguardas que não custam tempo do usuário** [INFERÊNCIA]:
1. **Escopo no computador do usuário:** pastas `C:\projetos\simulador-normas-testes` (executáveis de teste, criada na Etapa D), `C:\projetos\simulador-normas` (clone antigo, usado só se a sessão Local for necessária), `C:\ferramentas` e `C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT`; na tela, só os aplicativos do projeto (executável de teste, Godot, navegador no GitHub). Outras pastas e aplicativos, só com pedido explícito.
2. **Git como rede de segurança:** todo trabalho vai em *branch* + *pull request*; nada de `push --force` na `main` nem reescrita de histórico; qualquer erro é revertível.
3. **CI como porteiro:** o *merge* só acontece com o CI verde.
4. **Repositório público:** nunca comitar tokens, `.env`, fotos pessoais ou dados pessoais.
5. **Disco e memória:** o trabalho pesado roda na nuvem; no notebook ficam só os executáveis de teste, que o agente apaga quando saem de uso.

### 1.3 Duas trilhas

| Trilha | Para quê | Onde | Situação |
|---|---|---|---|
| **1 — Estudo** | O usuário estuda a NR-10 enquanto o projeto principal é construído | Protótipo three.js em `prototipo/` (HTML offline em `prototipo/dist/` e Artifact do claude.ai): módulo **História**, fases da norma, Missão e fase **Treino** | **Congelada** por decisão do usuário: o HTML offline segue disponível para estudo e só muda a pedido dele. As melhorias já identificadas ficam registradas em `docs/PROXIMA_SESSAO.md`. |
| **2 — Projeto principal** | Infraestrutura permanente (motor + pacotes de norma) | Godot 4.7.2 (`engine/`, `packs/`) | **Foco atual**, na fase de planejamento (Etapas E e F do guia). |

### 1.4 Decisão: conteúdo só da NR-10

**Decisão do usuário:** todo o conteúdo de base do simulador vem da NR-10 (Portaria MTE 737/2026). O simulador existe para o **entendimento da norma**; se a NR-10 não traz uma informação, ela não é buscada nem conferida em outra norma.

Regras que decorrem disso [INTERPRETAÇÃO do agente sobre a decisão; o usuário pode ajustar]:
1. **O que se ensina, cobra e corrige** (questão, *gate*, consequência pontuada, cartão, debrief) precisa de um item da NR-10 por trás, citado pelo número.
2. **Remissões:** quando a NR-10 remete a outra norma (NR-1, NR-3, NR-6, NR-7, NR-17, NR-23, NR-26, ABNT NBR 5410, NBR 14039, normas ASTM e IEC do Anexo IV), o simulador mostra **só a remissão**, com o texto da própria NR-10. O conteúdo da outra norma não entra.
3. **Aplicabilidade particular fica fora do escopo:** valores e especificações de outras normas (ex.: corrente de 30 mA do DR, cores de etiqueta de luva por classe), práticas e procedimentos de concessionária, distâncias de orientação de fornecedor.
4. **Cenário pode ter realismo:** a aparência de equipamentos e ambientes pode seguir a prática de campo, rotulada [PRÁTICA], desde que nunca vire pergunta, *gate*, consequência ou correção.
5. **Explicar o mecanismo físico** de um requisito da NR-10 (por que aterrar sem constatar é curto franco, por que o transformador realimenta a rede) continua permitido: é explicação do item, não conteúdo de outra norma. Vai rotulado [INTERPRETAÇÃO].
6. **Outros pacotes no futuro** (R6) seguem a mesma regra: cada pacote usa só o texto da sua norma.

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
| Modelagem 3D | Blender → glTF 2.0 (`.glb`) | GPL | Peças low-poly |
| Testes | gdUnit4 (headless) + validação de esquema JSON | MIT | Unidade, cena, conteúdo |
| Versionamento e CI | Git + GitHub (repositório + Actions + Releases + Issues) | Plano gratuito | Código, documentos, builds, relatórios de bug |
| Instalador Windows | Inno Setup | Gratuito | Instalação e atalho |

**Onde cada ferramenta roda:**
- **Nuvem e CI (ambiente de trabalho):** Godot `4.7.2.stable` para Linux, *headless*, com os *export templates* (exporta o `.exe` de Windows); Blender como módulo Python `bpy` (a versão disponível no PyPI para o Python da sessão é da série 5.x; a versão fixada é decidida na Etapa D) [VERIFICAR]; gdUnit4 [VERIFICAR como instalar na sessão da nuvem: o *proxy* bloqueia páginas de repositórios de terceiros no GitHub].
- **Computador do usuário (alvo de desempenho)** [FONTE: ambiente do usuário]: Godot `4.7.2.stable` para Windows em `C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT` (export templates só Windows x86_64), Blender 4.5.10 LTS, Git 2.56.0, VS Code 1.140.0. Ficam como reserva; o agente usa o computador para rodar o executável exportado e medir o desempenho real.
- Quem usa: só o agente. O usuário não abre nenhuma dessas ferramentas.

**Por que Godot e não as alternativas** (o mecanismo de cada decisão):
- **Unity e Unreal** saem pela regra R1: as condições de licença para uso não-jogo e acima de certos faturamentos institucionais podem exigir planos pagos [FONTE], e o Unreal usa ativos binários, que um agente de código não consegue ler nem editar.
- **Web pura (TypeScript + three.js) empacotada em Electron/Tauri** é gratuita e leve, mas obriga a escrever à mão tudo o que um motor já entrega (gerência de cenas, interface, entrada, save, câmera, colisão). Para um desenvolvedor solo trabalhando com agente, o Godot reduz o volume de código e, por gravar cenas em texto (`.tscn`, `.tres`), continua legível para o agente [PRÁTICA].
- **Bônus do renderizador Compatibility:** é o mesmo que o Godot usa na **exportação web**. Logo, uma versão de navegador fica possível sem retrabalho, útil para demonstração ou estudo rápido [PRÁTICA; VERIFICAR limitações da exportação web do 4.7].

O protótipo em three.js tem dois papéis: é a ferramenta de estudo da Trilha 1 (§1.3), desenvolvida em `prototipo/`, e é **fonte de conteúdo** para o Godot (textos da norma em `REF`, tabelas, questões, sequências), não código a ser portado.

### 3.2 GPU integrada: como garantir desempenho

**Mecanismo:** GPU integrada não tem VRAM própria. Ela divide a RAM do sistema e tem banda de memória e poder de preenchimento (*fill rate*) muito menores que uma placa dedicada. O que derruba o desempenho nesse caso é, em ordem: (1) texturas grandes (memória e banda), (2) sombras em tempo real (cada luz com sombra renderiza a cena de novo), (3) pós-processamento em tela cheia (cada efeito relê o quadro inteiro), (4) número de *draw calls* (custo de CPU e de driver). Contagem de polígonos é o problema menos grave para cenas de centenas de objetos low-poly.

**Medição real (guia, passo 17)** [FONTE: teste do usuário]: no computador de teste, o Godot usa a Radeon R5 via **ANGLE sobre Direct3D 11** (o driver AMD de 2020 tem OpenGL fraco). Cena trivial: ~496 FPS sem sombra e ~75 FPS com sombra direcional (V-Sync desligado). Decisão derivada no guia: **sem sombras em tempo real e sem texturas**.

Configuração padrão do projeto:
1. Renderizador `gl_compatibility`.
2. **Sem texturas de imagem.** Os materiais usam **cor chapada** ou uma **paleta única** (uma imagem 256 × 256 com faixas de cor, compartilhada por todos os modelos, no estilo Kenney). Placas de sinalização e etiquetas usam `Label3D` sobre placa de cor chapada.
3. Uma luz direcional + luz ambiente. **Sem sombras em tempo real** em nenhum perfil (medição do passo 17 do guia).
4. Sem SSAO, SSR, glow, bloom, volumetria ou partículas em massa. O raio-x do debrief usa linhas e poucas partículas instanciadas.
5. Antialiasing: FXAA ou nenhum. Escala de resolução 3D ajustável (75–100 %).
6. Texto 3D com `Label3D` (não com texturas de texto).
7. Objetos repetidos (isoladores, cones, painéis, brita) com `MultiMeshInstance3D`.
8. Ocultar o que está fora do ambiente atual: cada ambiente é carregado como cena separada e descarregado ao sair.

Perfis de qualidade no menu: **Leve** (padrão, alvo GPU integrada), **Médio** e **Alto** (só antialiasing melhor e escala de resolução 100 %; nenhum deles liga sombras nem texturas). Se houver placa dedicada no computador de teste, o Windows permite escolher "Alto desempenho" por aplicativo em Configurações → Sistema → Tela → Gráficos [FONTE]; isso é opcional e não é requisito.

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

Esses limites entram no CI como teste de regressão sempre que possível (contagem de triângulos e de texturas pode ser verificada sem GPU; FPS é medido pelo agente no computador de teste, pelo painel F3 e pelo controle da tela).

---

## 4. Arquitetura em duas partes

As subpastas de `engine/` e `packs/nr10/` são criadas junto com o projeto Godot (passo 65). `prototipo/` fica na raiz porque é código ativo (Trilha 1), não referência.

```
repo/
  docs/                    ← todos os .md de planejamento (versionados)
    referencias/           ← PDF da Portaria MTE 737/2026 (fonte de verdade), relatórios de pesquisa
  prototipo/               ← simulador three.js ativo: Trilha 1, estudo para a prova
    dist/                  ← HTML offline gerado pelo build (versionado para baixar de qualquer lugar)
  art/                     ← pipeline de arte operado pelo agente
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
  CLAUDE.md                ← instruções permanentes para o agente de código (passos 35–36)
```

- O motor só conhece **fatos, verificações, procedimentos, consequências e fontes de energia**. Tudo o que é normativo vem do pacote.
- Camadas L0–L5 (base → mundo → domínio → jogo → interface → aplicação). A de baixo nunca chama a de cima.
- Um pacote carrega **uma** redação de **uma** norma. Não há campo de edição nem regra de precedência entre edições (§1.1).

---

## 5. Mapa dos documentos de planejamento

Todos ficam em `docs/` no repositório. Formato padrão de cada um (modelo a criar em `docs/_MODELO_DOCUMENTO.md`, passo 43):
**Objetivo · Escopo e limites · Itens da NR-10 envolvidos (R9) · Dependências · Contratos/esquemas · Decisões (com motivo) · Exemplos · Casos de teste · Perguntas abertas · Critérios de pronto.**

### 5.0 Documentos que já existem

| Arquivo | Papel | Situação |
|---|---|---|
| `CLAUDE.md` (raiz) | Regras permanentes do agente | Vigente |
| `00_INDICE_E_DECISOES_INFRAESTRUTURA.md` | Este arquivo: entrada, requisitos, decisões de infraestrutura | Vigente |
| `01_PASSO_A_PASSO_INICIO_CLAUDE_CODE.md` | Guia operacional: passos e quem opera cada um | Vigente |
| `STATUS_SIMULADOR_NR10.md` | Estado do projeto, inventário do protótipo, lacunas de cobertura | Vigente |
| `PROXIMA_SESSAO.md` | Regra de autonomia, backlog em ordem e como abrir a próxima sessão | Vigente |
| `PLANO_V3_SIMULADOR_NR10.md` | Base de conteúdo e didática para os documentos 01, 11, 14 e 15 | Base (absorvido por eles e retirado no passo 64) |
| `ARQUITETURA_SOFTWARE_SIMULADOR_NR10.md` | Base para os documentos 02, 05 e 16 (exemplos em JS, a reescrever em GDScript) | Base (absorvido por eles e retirado no passo 64) |
| `DECISOES.md` | Decisões vigentes, com motivo | Vigente |
| `PENDENCIAS_DE_VERIFICACAO.md` | Fatos já conferidos no PDF e pendências abertas | Vigente |
| `CONFERENCIA_ITENS.md` | Saída do script de conferência contra o PDF (gerada) | Gerado |

CI: `.github/workflows/ci.yml`. Ainda faltam, da Etapa E do guia: `CONVENCOES.md` (38), `GLOSSARIO_DO_PROJETO.md` (39), `_MODELO_DOCUMENTO.md` (43) e modelos de issue e de PR (40–41).

> **Prefixo `01`** [INFERÊNCIA]: o guia (`01_PASSO_A_PASSO_…`) e o futuro `01_VISAO_E_PEDAGOGIA` mantêm os nomes; os documentos sempre se citam pelo nome completo, nunca só pelo número. Renomear o guia agora quebraria referências sem ganho.

### 5.1 Projeto
| # | Arquivo | Conteúdo |
|---|---|---|
| 00 | `00_INDICE_E_DECISOES` | Este arquivo |
| 01 | `01_VISAO_E_PEDAGOGIA` | Público, objetivos de aprendizagem, princípios didáticos, fases F1–F8 de uma Ordem de Serviço, severidade, debrief |
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
| 19 | `19_COMO_CRIAR_UM_NOVO_PACOTE` | Roteiro para o pacote de outra norma (ex.: NR-12, NR-33, NR-35); cada pacote usa só o texto da própria norma (R9) |
| 22 | `22_ACESSIBILIDADE_E_IDIOMAS` | Tamanho de fonte, contraste, daltonismo (estado nunca só por cor), legendas, textos externos para tradução |
| 23 | `23_AUDIO_E_FEEDBACK` | Sons de alerta (detector, arco, alarme), retorno sonoro de ações, volume e mudo; áudio leve |
| 24 | `24_RELATORIOS_PARA_INSTRUTOR` | Exportação de desempenho por item da norma (CSV/PDF), uso em monitoria ou turma |
| 25 | `25_DISTRIBUICAO_E_ATUALIZACAO` | Instalador, versão portátil, numeração de versões, notas de versão, atualização de pacotes sem reinstalar o motor |

### 5.3 Pacote NR-10 (conteúdo)
| # | Arquivo | Conteúdo |
|---|---|---|
| 11 | `11_CAMPANHA_NR10` | Arco narrativo, capítulos, missões roteirizadas, progressão de papel |
| 14 | `14_PACOTE_NR10_NORMA` | Itens, glossário (Anexo I), anexos II–IV e artigos da Portaria MTE 737/2026; remissões a outras normas (§1.4); matriz de cobertura; pendências de fidelidade |
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
| 18 | 21 Roadmap | Sequência de entrega |
| 19 | 22, 23, 24, 25 | Complementos |
| 20 | 10 Modo Livre | Fase 2 |
| 21 | 19 Novo pacote | Fase 3 |

O fluxo de trabalho com o agente não tem documento próprio: está no `CLAUDE.md`, no §8 deste arquivo e no `docs/PROXIMA_SESSAO.md`.

Essa ordem é a mesma dos passos 47–63 do guia; o passo 64 faz a revisão cruzada. Regra: cada documento só é considerado pronto quando suas **perguntas abertas** foram respondidas por você ou registradas como pendência explícita.

---

## 6. Campanha NR-10: esboço do arco (detalhe vai no documento 11)

**Ideia central:** o protagonista **progride de papel** ao longo da campanha. Cada papel destrava responsabilidades que a própria NR-10 atribui a ele, e a campanha ensina a norma na ordem em que um profissional real a encontra.

| Capítulo | Papel do protagonista | Ambientes | Foco normativo |
|---|---|---|---|
| 0 — Tutorial | Eletricista recém-autorizado | Residência (QDC) | Verbos, bloqueio, teste de ausência de tensão, EPI básico, partes vivas (inclui o neutro) |
| 1 — Baixa tensão | Eletricista autorizado | Comércio, sala de painéis de prédio | DR, gerador com QTA (retorno de energia), nobreak (CC), sinalização, porta de painel fechada |
| 2 — Média tensão abrigada | Eletricista autorizado com treinamento SEP/MT | Subestação abrigada 13,8 kV | Sequência de desenergização e reenergização, aterramento temporário, zonas, PT |
| 3 — Indústria | Supervisor / condutor dos trabalhos | Sala de máquinas, CCM | Supervisão de equipe (10.7.6), autorização, arco (Anexo IV), ergonomia no projeto (10.4.10) |
| 4 — Subestação ao tempo | Supervisor | SE aérea 69/13,8 kV | Manobras, comunicação com o centro de operação (10.12.4.1), bloqueio do religamento automático (10.14.3), trabalho em equipe |
| 5 — Responsável e anfitrião | Trabalhador autorizado responsável por visitas | Pátio de SE com visitantes | Pessoa não advertida, instrução formal, zona livre, acompanhamento permanente, emergência |
| 6 — Fiscalização e projeto | Profissional legalmente habilitado | Escritório técnico, auditoria | Prontuário (PIE), documentação, situações de risco grave e iminente, projeto e memorial |

Capítulos extras planejados para depois: canteiro de obras perto de rede, rede aérea de distribuição, linha viva, fotovoltaico, área classificada.

**Capítulos × missões do `PLANO_V3` §4** [INFERÊNCIA]: a estrutura da campanha é a desta seção (capítulos por papel). As missões M0–M9 do `PLANO_V3` são candidatas a missões dentro dos capítulos: Cap. 0 ← M0; Cap. 2 ← M3; Cap. 3 ← M4; Cap. 6 ← M8 e M9; capítulos extras ← M1 (canteiro), M2 (rede aérea), M7 (linha viva), M5 (fotovoltaico) e M6 (área classificada). Os capítulos 1, 4 e 5 ainda não têm missão escrita. O documento 11 fecha essa distribuição.

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
- **Pátio de SE com visitantes:** quem faz atividade não elétrica na zona livre próxima à zona controlada precisa de análise de risco e instrução formal (10.14.1.2); "pessoa não advertida" é termo do glossário (Anexo I; ainda fora da `REF`); profissional estrangeiro ou não residente na zona controlada por até 30 dias exige o treinamento "Específico e pontual" de 8 h e acompanhamento presencial e permanente de trabalhador autorizado (10.9.8 e Quadro I) [FONTE]. Regras de visita de concessionárias (cadastro, EPI de visitante, caminho marcado etc.) não estão na NR-10 e ficam fora do conteúdo (§1.4).

### 7.3 Papéis definidos na norma [FONTE]
- **Qualificado** (10.8.1), **PLH** (10.8.2; aprova procedimentos, 10.7.1.1; responde pelo projeto, 10.4.8, e pelo PIE, 10.15.6), **capacitado** (10.8.3), **autorizado** (10.10.2, inclui quem supervisiona), **supervisor / condutor dos trabalhos** indicado pela organização (10.7.6).
- "Responsável técnico" e "responsável pela instalação" não aparecem como termos no PDF (só "responsabilidade técnica de PLH", no 10.4.8.1) [FONTE: conferência no PDF]. O simulador mapeia para PLH e para a organização [INTERPRETAÇÃO].

---

## 8. Fluxo de trabalho

### 8.1 Agente de código: Claude Code, com permissão total
- Todo o projeto é conduzido no **Claude Code**. Não há outro agente nem outra ferramenta de IA no fluxo.
- Ambiente principal: a **sessão na nuvem** com o repositório anexado; o computador do usuário é usado a partir dela (§1.2).
- As regras permanentes ficam no `CLAUDE.md` (raiz), carregado em toda sessão.
- A um pedido de trabalho ("continue"), o agente segue o backlog de `docs/PROXIMA_SESSAO.md` e só para nos pontos de parada definidos lá.

### 8.2 Ciclo de uma iteração
1. **Planejar:** o agente pega o próximo item do backlog (`docs/PROXIMA_SESSAO.md` §3).
2. **Implementar:** o agente cria uma *branch*, implementa, roda os testes (sintaxe, unidade, esquema, conferência no PDF; gdUnit4 no Godot) e abre um *pull request* com a descrição do que mudou.
3. **Integrar:** com o CI verde, o próprio agente faz o *merge* (squash) na `main`. Sem CI verde, não há *merge*.
4. **Entregar:** na Trilha 2, o agente publica a Release com o `.exe` e avisa na conversa.
5. **Testar no notebook (agente):** o agente copia o `.exe` para a pasta de testes do computador do usuário, abre pelo controle da tela, lê o painel F3 (FPS, *draw calls*, memória) e confere a cena.
6. **Usar (usuário, U2):** você usa e conta na conversa o que estranhou.
7. **Corrigir:** o agente transforma cada relato numa issue, corrige e volta ao passo 2.
8. **Liberar:** ao fechar um marco do §9, o agente publica uma Release numerada (ex.: `v0.3.0`) e atualiza `docs/DECISOES.md` e o roadmap.

O que **só você** verifica: clareza didática, se o conteúdo bate com o que a banca cobra, sensação de uso. O que o **agente** verifica: sintaxe, testes, validade dos dados, conferência dos itens contra o PDF, orçamento de polígonos e texturas, desempenho real no notebook.

GitHub Actions: o repositório é **público** (guia, passo 3), e repositórios públicos têm minutos de Actions sem cota no plano gratuito [VERIFICAR valores atuais].

### 8.3 Onde e como os `.md` são escritos
- **Onde:** na pasta `docs/` do repositório. O remoto no GitHub é a fonte da verdade; a sessão na nuvem trabalha sobre um clone dele.
- **Como:** uma sessão por documento, na ordem da §5.4 (passos 47–63 do guia). O agente escreve, decide o que não é essencial (registrando como [INFERÊNCIA]) e só pergunta o que for essencial (R8). Documentos são **vivos** e descrevem só o estado atual: mudanças entram por *pull request*, com o motivo em `docs/DECISOES.md`; o histórico fica no Git, não no texto.

---

## 9. Roadmap resumido (detalhe no documento 21)

| Fase | Marco | Entrega |
|---|---|---|
| T1 | Simulador de estudo (pronto; congelado) | História, fases I–IV, Missão e Treino (simulado, revisão espaçada, gerador, cartões, painel) |
| 0 | Repositório | Estrutura, CI mínimo, `CLAUDE.md`, convenções, glossário do projeto, modelo de documento, modelos de issue e de PR (Etapa E do guia) |
| 0 | Planejamento | Documentos 01, 14, 04, 05, 11, 15, 07, 09, 08, 13, 02, 03, 06, 18, 16, 12, 17, 21 e revisão cruzada (Etapa F) |
| 0 | Ambiente de execução | Godot *headless* e exportação na nuvem e no CI, Blender (`bpy`), gdUnit4, primeiro teste no notebook pelo controle da tela (Etapa D) |
| 1 | Fatia vertical | Motor mínimo + Capítulo 0 (residência) jogável do início ao debrief, em Godot, no perfil Leve |
| 1 | Campanha MT | Capítulo 2 (SE abrigada) com solver elétrico, desenergização (10.13.1) e reenergização (10.13.2), aterramento, zonas |
| 1 | Campanha completa | Capítulos 1, 3, 4, 5, 6 + avaliação + relatórios |
| 2 | Modo Livre | Gerador, planejador de solvabilidade, modelo do aluno adaptativo |
| 3 | Outras normas | Primeiro pacote novo (ex.: NR-12 ou NR-35) usando o documento 19 |

**Ordem da fase 0:** repositório → planejamento → ambiente de execução. As ferramentas só são instaladas e configuradas depois do planejamento, para que a configuração siga os documentos e não o contrário (decisão do usuário).

**Fatia vertical primeiro:** antes de construir muitas missões, uma única missão completa atravessa todas as camadas (dados → regras → energia → interação → interface → debrief → save → testes → build). Isso expõe cedo os erros de arquitetura, quando ainda são baratos de corrigir.

---

## 10. Pendências de verificação

Fatos já conferidos no PDF e pendências abertas ficam num só lugar: `docs/PENDENCIAS_DE_VERIFICACAO.md`. Nada da lista aberta vira código como fato antes de ser confirmado.

---

## 11. Como abrir a próxima sessão

Ver `docs/PROXIMA_SESSAO.md` §5.
