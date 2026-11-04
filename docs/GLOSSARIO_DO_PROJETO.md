# Glossário do projeto

> Termos do **software**, não da norma. Os termos da NR-10 (partes vivas, SEP, zona controlada etc.) ficam no glossário da própria norma (Anexo I), carregado pelo pacote (documento 14). Quando um termo daqui coincide com um da norma, vale a definição da norma para o conteúdo e esta só para o código.
> Todos os termos abaixo são definições de projeto [INFERÊNCIA]. Onde cada assunto é detalhado: última coluna.

| Termo | Definição | Detalhe em |
|---|---|---|
| **Motor** | Código genérico em Godot (`engine/`) que executa missões a partir de dados. Conhece fatos, verificações, procedimentos, consequências e fontes de energia; não conhece nenhuma norma. | `00_INDICE` §4; documento 02 |
| **Pacote** | Conjunto de dados de uma norma, numa redação (`packs/<norma>/`): texto dos itens, regras, catálogo, ambientes e campanha. O primeiro é o `nr10` (Portaria MTE 737/2026). | `00_INDICE` §1.1; documentos 04, 14 |
| **Trilha** | Linha de trabalho do repositório. Trilha 1: protótipo de estudo em three.js (`prototipo/`, congelado). Trilha 2: projeto principal em Godot (foco). | `00_INDICE` §1.3 |
| **Campanha** | Sequência fixa de capítulos e missões escrita pelo autor (Fase 1 do roadmap). | `00_INDICE` §6; documento 11 |
| **Modo Livre** | Missões montadas por um gerador a partir de modelos, com semente (Fase 2). Usa o mesmo esquema de missão da campanha. | documento 10 |
| **Capítulo** | Bloco da campanha ligado a um **papel** do protagonista (eletricista autorizado, supervisor, PLH...) e a um conjunto de ambientes. | `00_INDICE` §6 |
| **Missão** | Unidade de jogo: um serviço num ambiente, com papel, requisitos e complicações, percorrendo as fases F1–F8 e terminando no debrief. No cenário aparece como "ordem de serviço" [PRÁTICA; o termo não está na NR-10]. | documento 11 |
| **Fase F1–F8** | Etapas de toda missão: F1 briefing, F2 planejamento, F3 almoxarifado, F4 chegada e caça ao risco, F5 DDS e autorização, F6 desenergização, F7 execução com evento, F8 reenergização e encerramento. | `PLANO_V3` §3; documento 01 |
| **Verbo** | Ação do jogador sobre um item ou alvo (inspecionar, operar, bloquear, medir, aterrar, sinalizar, autorizar...). Todo verbo passa por `act(verbo, item, alvo)`, o único ponto que muda o mundo. | `00_INDICE` §2; documento 08 |
| **Item (do catálogo)** | Objeto do mundo com forma, estado e verbos possíveis (equipamento, EPI, EPC, ferramenta, documento). Não confundir com **item da norma** (10.x.y). | documento 07 |
| **Gate** | Condição que impede avançar de fase enquanto não for cumprida (ex.: sem PT válida, não entra na área). Todo *gate* cita o item da NR-10 que o sustenta. | documento 04 |
| **Consequência** | Efeito de uma ação no mundo calculado (choque, arco, retorno de energia) ou na avaliação, com severidade e item da norma. | documentos 04, 05 |
| **Severidade** | Peso de um desvio: **fatal** (encerra a missão com replay), **grave** (obriga a corrigir antes de seguir), **leve** (só desconta). | `PLANO_V3` D6; documento 12 |
| **Debrief** | Tela de fim de missão: replay com "raio-x" do estado elétrico, linha do tempo, itens da norma acionados e erros enviados à revisão espaçada. | documentos 01, 13 |
| **Raio-x** | Visualização do estado elétrico real (energizado, aterrado, fluxo de corrente), mostrada só no debrief e no modo aprendiz. No jogo, o estado só aparece por medição com instrumento válido. | `00_INDICE` §2, princípio 6 |
| **Remissão** | Trecho em que a NR-10 manda seguir outra norma (NR-1, NBR 5410...). O simulador mostra só a remissão, com o texto da NR-10; o conteúdo da outra norma fica fora. | `00_INDICE` §1.4 |
| **Fatia vertical** | Primeira entrega jogável: uma única missão (Capítulo 0) atravessando todas as camadas, do dado ao *build*, para expor cedo erros de arquitetura. | `00_INDICE` §8 |
| **Semente** | Número que inicializa o gerador pseudoaleatório. Com a mesma semente e as mesmas versões de motor e pacote, a missão e o replay se repetem idênticos. | documento 16 |
| **Registro de validação** | `docs/VALIDACAO_DO_CONTEUDO.md`, gerado por `tools/validacao/`: tudo o que o software afirma sobre a norma, com estado "a validar", "ok" ou "errado". | `CLAUDE.md` §3, regra 6 |
