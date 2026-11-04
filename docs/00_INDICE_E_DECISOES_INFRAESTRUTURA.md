# Simulador de Normas (NR-10 primeiro): índice mestre e decisões de infraestrutura

> Documento de **entrada** do projeto. Ele é lido antes de qualquer outro.
> Objetivo: construir uma **infraestrutura reutilizável** (motor genérico + pacotes de norma), planejada em documentos `.md` versionados no GitHub, para que sessões com agente de código implementem tudo de forma incremental.
> Primeiro pacote: **NR-10, na redação da Portaria MTE 737/2026 (edição única, §1.1)**. Primeiro modo: **Campanha**. O **Modo Livre** (missões aleatórias) vem depois, mas os contratos de dados já nascem preparados para ele.
>
> Legenda: **[FONTE]** = dito em fonte citada na pesquisa · **[PRÁTICA]** = prática comum, não verificada em fonte específica; só cenário, nunca cobrada (§1.4) · **[INFERÊNCIA]** = decisão ou recomendação do projeto · **[INTERPRETAÇÃO]** = leitura do simulador sobre o texto da norma · **[VERIFICAR]** = detalhe de ferramenta ou fato externo a confirmar antes de virar código · **[VERIFICAR NA PORTARIA]** = número ou texto da NR-10 ainda não conferido no PDF oficial.
>
> **Conferência de itens:** os números de item citados nos documentos são conferidos contra o PDF da Portaria (`docs/referencias/portaria-mte-no-737-nova-nr-10.pdf`) com `tools/conferir_itens_portaria.py`, também no CI; o relatório fica em `docs/CONFERENCIA_ITENS.md`.
>
> **Fase atual:** planejamento do projeto principal (Godot). Nenhuma ferramenta é instalada ou configurada antes de o planejamento terminar (§8).

---

## 1. Requisitos de base (restrições que governam todas as decisões)

| # | Requisito | Consequência no projeto |
|---|---|---|
| R1 | **Todas as ferramentas gratuitas** | Godot (MIT), Blender (GPL), Git/GitHub (plano gratuito), gdUnit4 (MIT), Inno Setup. Nada com licença paga ou assinatura obrigatória dentro do software ou da sua cadeia de build. |
| R2 | **Ferramenta de treinamento**, não produto visual polido | Estilo **low-poly com cores chapadas**. O esforço vai para regras, interação e feedback. |
| R3 | **Rodar bem em GPU integrada com 2 GB** (memória compartilhada) | Renderizador **Compatibility** do Godot (OpenGL 3.3), sem texturas pesadas, orçamento de desempenho fixo (§3.3). |
| R4 | **O conteúdo é o mais importante** | Norma como dados, fidelidade ao texto, rastreabilidade item → interação → feedback. |
| R5 | **Campanha primeiro**, Modo Livre depois | Roadmap em duas fases (§8). Os esquemas de missão servem aos dois modos desde o início. |
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
  5. Fonte de verdade do conteúdo: o PDF da Portaria MTE 737/2026 em `docs/referencias/` (passo 23 do roteiro).

### 1.2 Modelo de operação

**Decisão do usuário:** todo o projeto é conduzido no Claude Code, com permissão total para operar o repositório, as ferramentas e o notebook do usuário. O usuário só faz as tarefas U1–U4. Papéis, ambientes de trabalho e salvaguardas ficam num só lugar: `CLAUDE.md` §2–§3.

### 1.3 Duas trilhas

1. **Trilha 1 — protótipo de estudo** (`prototipo/`, three.js): **congelada** por decisão do usuário; o HTML offline segue disponível e só muda a pedido dele (`prototipo/README.md`).
2. **Trilha 2 — projeto principal** (Godot 4.7.2, `engine/` e `packs/`): **foco atual**, em planejamento.

### 1.4 Decisão: conteúdo só da NR-10

**Decisão do usuário:** todo o conteúdo de base do simulador vem da NR-10 (Portaria MTE 737/2026). O simulador existe para o **entendimento da norma**; se a NR-10 não traz uma informação, ela não é buscada nem conferida em outra norma.

Regras que decorrem disso [INTERPRETAÇÃO do agente sobre a decisão; a validar]:
1. **O que se ensina, cobra e corrige** (questão, *gate*, consequência pontuada, cartão, debrief) precisa de um item da NR-10 por trás, citado pelo número.
2. **Remissões:** quando a NR-10 remete a outra norma (NR-1, NR-3, NR-6, NR-7, NR-17, NR-23, NR-26, ABNT NBR 5410, NBR 14039, normas ASTM e IEC do Anexo IV), o simulador mostra **só a remissão**, com o texto da própria NR-10. O conteúdo da outra norma não entra.
3. **Aplicabilidade particular fica fora do escopo:** valores e especificações de outras normas (ex.: corrente de 30 mA do DR, cores de etiqueta de luva por classe), práticas e procedimentos de concessionária, distâncias de orientação de fornecedor.
4. **Cenário pode ter realismo:** a aparência de equipamentos e ambientes pode seguir a prática de campo, rotulada [PRÁTICA], desde que nunca vire pergunta, *gate*, consequência ou correção.
5. **Explicar o mecanismo físico** de um requisito da NR-10 (por que aterrar sem constatar é curto franco, por que o transformador realimenta a rede) é permitido como explicação do item, rotulado [INTERPRETAÇÃO].
6. **Outros pacotes no futuro** (R6) seguem a mesma regra: cada pacote usa só o texto da sua norma.
7. **Postura conservadora (decisão do usuário):** toda resposta, explicação ou ligação item ↔ objeto escrita pelo agente é inferência até o usuário validar. Na dúvida, o trecho é marcado e entra como "a validar" no registro `docs/VALIDACAO_DO_CONTEUDO.md` (gerado por `tools/validacao/gerar.py`), para revisão dos conceitos.

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

Onde cada ferramenta roda e o que está instalado: `CLAUDE.md` §2 e `STATUS` §3.

**Por que Godot e não as alternativas** (o mecanismo de cada decisão):
- **Unity e Unreal** saem pela regra R1: as condições de licença para uso não-jogo e acima de certos faturamentos institucionais podem exigir planos pagos [FONTE], e o Unreal usa ativos binários, que um agente de código não consegue ler nem editar.
- **Web pura (TypeScript + three.js) empacotada em Electron/Tauri** é gratuita e leve, mas obriga a escrever à mão tudo o que um motor já entrega (gerência de cenas, interface, entrada, save, câmera, colisão). Para um desenvolvedor solo trabalhando com agente, o Godot reduz o volume de código e, por gravar cenas em texto (`.tscn`, `.tres`), continua legível para o agente [PRÁTICA].
- **Bônus do renderizador Compatibility:** é o único que o Godot 4 usa na **exportação web** (WebGL 2). Logo, uma versão de navegador fica possível sem retrabalho, útil para demonstração ou estudo rápido. Limites conferidos [FONTE: documentação oficial, "Exporting for the Web"]: precisa de servidor web (não abre por `file://` com duplo clique, ao contrário do HTML do protótipo); exportação de *thread* única é a padrão (a multi-*thread* exige cabeçalhos de isolamento de origem); o save em `user://` vai para o IndexedDB e some em janela anônima ou com cookies bloqueados; a aba em segundo plano pausa o jogo; C# não exporta para web (o projeto usa GDScript).

O protótipo em three.js tem dois papéis: é a ferramenta de estudo da Trilha 1 (§1.3, congelada) e é **fonte de conteúdo** para o Godot (textos da norma em `REF`, tabelas, questões, sequências), não código a ser portado.

### 3.2 GPU integrada: como garantir desempenho

**Mecanismo:** GPU integrada não tem VRAM própria. Ela divide a RAM do sistema e tem banda de memória e poder de preenchimento (*fill rate*) muito menores que uma placa dedicada. O que derruba o desempenho nesse caso é, em ordem: (1) texturas grandes (memória e banda), (2) sombras em tempo real (cada luz com sombra renderiza a cena de novo), (3) pós-processamento em tela cheia (cada efeito relê o quadro inteiro), (4) número de *draw calls* (custo de CPU e de driver). Contagem de polígonos é o problema menos grave para cenas de centenas de objetos low-poly.

**Medição real (roteiro, passo 17)** [FONTE: teste do usuário]: no computador de teste, o Godot usa a Radeon R5 via **ANGLE sobre Direct3D 11** (o driver AMD de 2020 tem OpenGL fraco). Cena trivial: ~496 FPS sem sombra e ~75 FPS com sombra direcional (V-Sync desligado). Decisão derivada: **sem sombras em tempo real e sem texturas**.

Configuração padrão do projeto:
1. Renderizador `gl_compatibility`.
2. **Sem texturas de imagem.** Os materiais usam **cor chapada** ou uma **paleta única** (uma imagem 256 × 256 com faixas de cor, compartilhada por todos os modelos, no estilo Kenney). Placas de sinalização e etiquetas usam `Label3D` sobre placa de cor chapada.
3. Uma luz direcional + luz ambiente. **Sem sombras em tempo real** em nenhum perfil (medição do passo 17).
4. Sem SSAO, SSR, glow, bloom, volumetria ou partículas em massa. O raio-x do debrief usa linhas e poucas partículas instanciadas.
5. Antialiasing: MSAA 3D 2× ou nenhum. O Compatibility não tem FXAA, SMAA nem TAA (só Forward+ e Mobile) [FONTE: documentação oficial, "3D antialiasing"; confirmado no 4.7.2]. Escala de resolução 3D ajustável (75–100 %).
6. Texto 3D com `Label3D` (não com texturas de texto).
7. Objetos repetidos (isoladores, cones, painéis, brita) com `MultiMeshInstance3D`.
8. Ocultar o que está fora do ambiente atual: cada ambiente é carregado como cena separada e descarregado ao sair.

Perfis de qualidade no menu: **Leve** (padrão, alvo GPU integrada), **Médio** e **Alto** (só MSAA 2×/4× e escala de resolução 100 %; nenhum deles liga sombras nem texturas). Se houver placa dedicada no computador de teste, o Windows permite escolher "Alto desempenho" por aplicativo em Configurações → Sistema → Tela → Gráficos [FONTE]; isso é opcional e não é requisito.

**Verificação no próprio jogo:** na inicialização, gravar em log `RenderingServer.get_video_adapter_name()`, o renderizador em uso e o FPS médio do primeiro minuto. Um atalho (F3) mostra um painel com FPS, *draw calls*, memória de vídeo estimada e nome da GPU. APIs conferidas no 4.7.2 (passo 30): `RenderingServer.get_video_adapter_name()`, `get_video_adapter_vendor()`, `get_video_adapter_api_version()`, `get_current_rendering_method()`; `Performance.get_monitor()` com `TIME_FPS`, `RENDER_TOTAL_DRAW_CALLS_IN_FRAME`, `RENDER_TOTAL_PRIMITIVES_IN_FRAME` e `RENDER_VIDEO_MEM_USED` [FONTE: teste na sessão na nuvem].

**Requisito mínimo oficial do Compatibility:** GPU integrada com OpenGL 3.3 completo; o exemplo citado é a própria **AMD Radeon R5 (Kaveri)** [FONTE: documentação oficial, "System requirements"]. Exportar exige os *export templates* (até 1,5 GB instalados; o projeto extrai só Windows e Linux x86_64).

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

As subpastas de `engine/` e `packs/nr10/` são criadas junto com o projeto Godot (passo 65). `prototipo/` fica na raiz porque é código (Trilha 1, congelada), não referência.

```
repo/
  docs/                    ← todos os .md de planejamento (versionados)
    referencias/           ← PDF da Portaria MTE 737/2026 (fonte de verdade), relatórios de pesquisa
  prototipo/               ← simulador three.js de estudo (Trilha 1, congelada)
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
  tools/                   ← conferência no PDF, registro de validação, validação de esquema, exportação
  .github/                 ← workflows de CI, modelos de issue e de pull request
  CLAUDE.md                ← regras permanentes do agente de código
```

- O motor só conhece **fatos, verificações, procedimentos, consequências e fontes de energia**. Tudo o que é normativo vem do pacote.
- Camadas L0–L5 (base → mundo → domínio → jogo → interface → aplicação). A de baixo nunca chama a de cima.
- Um pacote carrega **uma** redação de **uma** norma. Não há campo de edição nem regra de precedência entre edições (§1.1).

---

## 5. Mapa dos documentos de planejamento

Todos ficam em `docs/` no repositório. Formato padrão de cada um (modelo em `docs/_MODELO_DOCUMENTO.md`):
**Objetivo · Escopo e limites · Itens da NR-10 envolvidos (R9) · Dependências · Contratos/esquemas · Decisões (com motivo) · Exemplos · Casos de teste · Perguntas abertas · Critérios de pronto.**

### 5.0 Documentos que já existem

| Arquivo | Papel |
|---|---|
| `CLAUDE.md` (raiz) | Regras permanentes, papéis e ambientes de trabalho |
| `00_INDICE_E_DECISOES_INFRAESTRUTURA.md` | Este arquivo: requisitos, decisões de infraestrutura, mapa dos documentos, campanha, roadmap |
| `ROTEIRO.md` | Passos do projeto, ordem de execução, esforço de cada passo e regra de autonomia |
| `STATUS_SIMULADOR_NR10.md` | Estado atual |
| `DECISOES.md` | Índice das decisões vigentes |
| `_MODELO_DOCUMENTO.md` | Modelo dos documentos 01–25 |
| `CONVENCOES.md` | Nomes de arquivos e nós, idioma, commits, versões |
| `GLOSSARIO_DO_PROJETO.md` | Termos do software (motor, pacote, *gate*, severidade...) |
| `PLANO_V3_SIMULADOR_NR10.md` | Base de conteúdo e didática para os documentos 01, 11, 14 e 15 (absorvido e retirado no passo 64) |
| `ARQUITETURA_SOFTWARE_SIMULADOR_NR10.md` | Base para os documentos 02, 05 e 16, com exemplos em JS (absorvido e retirado no passo 64) |
| `CONFERENCIA_ITENS.md` | Gerado: itens citados × PDF |
| `VALIDACAO_DO_CONTEUDO.md` | Gerado: tudo o que o software pergunta e responde, para validação do usuário |

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

### 5.4 Ordem de produção

A ordem dos documentos, o motivo de cada posição, o esforço de cada um e o critério de pronto estão no `ROTEIRO` §3 (Etapa F). O fluxo de trabalho com o agente não tem documento próprio: está no `CLAUDE.md` e no `ROTEIRO`.

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

### 7.4 Outros fatos conferidos no PDF [FONTE]

| Assunto | O que o PDF diz |
|---|---|
| Remissões a outras normas | NR-1 (10.1.1, 10.3.1, 10.5.3, 10.9.1, 10.15.1, 10.15.6.1), NR-3 (10.16.1), NR-6 (10.11.1, 10.11.2, 10.11.2.3, Anexo IV), NR-7 (10.7.5), NR-17 (10.4.10), NR-23 (10.6.6), NR-26 (10.7.7); ABNT NBR 5410, NBR 14039, NBR IEC 62271-200 e "ABNT - Atmosferas explosivas" (conteúdos do Anexo III); ABNT NBR IEC 61482-2 (definições do Anexo IV); ASTM F1506, F1959, F2178, D120 e F696 (notas do Quadro III do Anexo IV). Não há remissão à NR-12, NR-18, NR-33 nem NR-35. |
| Dispositivo DR | "DDR de alta sensibilidade" (10.6.4), sem valor de corrente. Os 30 mA são da NBR 5410 e ficam fora do conteúdo (§1.4). Na alínea d (habitação) o 10.6.4 fala em "pontos de utilização"; na alínea e (não residencial), em "pontos de tomada", e ela só vale para instalações existentes um ano após a vigência (Art. 3º). |
| Luvas isolantes | Ensaio dielétrico de luvas e mangas (10.14.4 b), no menor intervalo entre regulamento, fabricante e PLH (10.14.4.1). Classes e cores de etiqueta ficam fora do conteúdo. |
| Treinamentos (Quadro I, 10.9.2) | Básico 40 h; SEP 40 h; MT/AT-SEC 16 h; Área classificada 16 h; Específico e pontual 8 h; Compartilhamento 40 h. Periódico bienal com 16 h; eventual (afastamento > 90 dias, modificações, mudança de procedimento, acidente grave). |
| Capacitação (10.8.4) | SEP 40 + 16 + 40 h; SEC 40 + 16 + 24 h; compartilhamento 24 h. O texto publicado tem alíneas duplicadas (a, b, c, a, d). |
| Anexo IV | "Painéis" (panelboards) e "quadros de distribuição de 600 V" (switchboards) são linhas diferentes (Cat. 2 × Cat. 4). O limitador de corrente permite reduzir uma categoria, nunca abaixo da 1. |
| Extintor e incêndio | Não há item sobre extintor; o 10.6.6 exige proteção coletiva contra explosão e incêndio e remete à NR-23. |
| Trabalho em altura | Não há item nem remissão. |
| Direito de recusa e suspensão | "Direito de recusa" é só conteúdo do Treinamento Básico (Anexo III, item 9, alínea k). Não há item de suspensão; o mais próximo é o 10.7.4.2 (anormalidade na avaliação prévia: não iniciar e comunicar). |
| Emergência | Sem capítulo próprio: 10.7.3 h, 10.15.6.1 e conteúdos de primeiros socorros e resgate do Anexo III. |
| Área classificada | Equipamentos certificados conforme o estudo de classificação de áreas (10.6.6.1.1); serviços só com PT, análise de risco e procedimento (10.6.6.1.2). |
| Termos ausentes do PDF | "Ordem de serviço" (no simulador, só a unidade de jogo [PRÁTICA]) e cores de posição de manobra verde "D" / vermelho "L" (só cenário). |
| Vigência | Um ano após a publicação (Art. 5º; DOU de 01/06/2026). |

---

## 8. Roadmap resumido (detalhe no documento 21)

| Fase | Marco | Entrega |
|---|---|---|
| T1 | Simulador de estudo (pronto; congelado) | História, fases I–IV, Missão e Treino (simulado, revisão espaçada, gerador, cartões, painel) |
| 0 | Repositório | Estrutura, CI mínimo, `CLAUDE.md`, convenções, glossário do projeto, modelo de documento, modelos de issue e de PR (Etapa E do roteiro) |
| 0 | Planejamento | Documentos da §5 e revisão cruzada (Etapa F do `ROTEIRO`) |
| 0 | Ambiente de execução | Godot *headless* e exportação na nuvem e no CI, Blender (`bpy`), gdUnit4, primeiro teste no notebook pelo controle da tela (Etapa D) |
| 1 | Fatia vertical | Motor mínimo + Capítulo 0 (residência) jogável do início ao debrief, em Godot, no perfil Leve |
| 1 | Campanha MT | Capítulo 2 (SE abrigada) com solver elétrico, desenergização (10.13.1) e reenergização (10.13.2), aterramento, zonas |
| 1 | Campanha completa | Capítulos 1, 3, 4, 5, 6 + avaliação + relatórios |
| 2 | Modo Livre | Gerador, planejador de solvabilidade, modelo do aluno adaptativo |
| 3 | Outras normas | Primeiro pacote novo (ex.: NR-12 ou NR-35) usando o documento 19 |

**Ordem da fase 0:** repositório → planejamento → ambiente de execução. As ferramentas só são instaladas e configuradas depois do planejamento, para que a configuração siga os documentos e não o contrário (decisão do usuário).

**Fatia vertical primeiro:** antes de construir muitas missões, uma única missão completa atravessa todas as camadas (dados → regras → energia → interação → interface → debrief → save → testes → build). Isso expõe cedo os erros de arquitetura, quando ainda são baratos de corrigir.
