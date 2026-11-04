# Simulador NR-10 — Plano: arquitetura revisada ("Ordem de Serviço jogável")

> É o documento de **direção de conteúdo e didática** do projeto. Na arquitetura atual (`00_INDICE` §3–§4: Godot 4.7.2), ele é a base para os documentos 01, 11, 14 e 15.
> **Do `STATUS_SIMULADOR_NR10.md` valem:** §1 (contexto), §4 (build e API do protótipo), §6 (bases de dados), §7 (auditoria de fidelidade), §9 (armadilhas técnicas) e §10 (testes).
> Todos os documentos ficam em `docs/` do repositório; o PDF da Portaria MTE 737/2026 fica em `docs/referencias/`.
>
> **Escopo normativo: edição única.** Só a NR-10 na redação da **Portaria MTE 737/2026** (`00_INDICE` §1.1). Todo número de item deste plano é dessa redação.
>
> **Conferência de itens:** os números citados são conferidos no PDF da Portaria (`docs/referencias/`) com `tools/conferir_itens_portaria.py` (relatório em `docs/CONFERENCIA_ITENS.md`). Fatos já conferidos e pendências abertas: `docs/PENDENCIAS_DE_VERIFICACAO.md`.
>
> Legenda: **[FONTE]** · **[PRÁTICA]** · **[INFERÊNCIA]** · **[INTERPRETAÇÃO]** · **[VERIFICAR]** · **[VERIFICAR NA PORTARIA]** (definições na `00_INDICE`).

---

## 0. Resumo

1. O modo principal passa a ser uma **campanha de Ordens de Serviço**: o jogador executa um serviço real e o serviço **só avança quando a norma é aplicada no mundo 3D**. "Ordem de Serviço" é a unidade de jogo [PRÁTICA: termo de gestão de manutenção]; o documento que a NR-10 exige é o procedimento de trabalho (10.7.1) ou a permissão de trabalho (10.7.2).
2. A norma vira um **motor de regras** com **um pacote**: a Portaria MTE 737/2026. Cada item vira um *gate*, uma *consequência* ou uma *verificação*.
3. A eletricidade vira um **modelo topológico** (grafo com fontes, chaves, trafos, terra). "Energizado" passa a ser calculado, não pintado. Isso permite backfeed, carga residual, tensão induzida e FV que não desliga.
4. **Verdade invisível:** o mundo energizado e o desenergizado têm a mesma aparência. Só o detector (autotestado, na faixa certa, fase a fase) revela o estado. A "visão raio-x" aparece no **debrief**.
5. A interação é por **verbos + inventário** (inspecionar, operar, bloquear, medir, aterrar, cobrir, sinalizar, autorizar, assinar), não por checklist.
6. A pontuação é por **severidade** (fatal, grave, leve). Erro fatal encerra a missão com replay. Não há badges nem ranking.
7. **Edição única** (D7): não há alternância de redação; o conteúdo é o da Portaria MTE 737/2026.
8. As missões seguem a **estatística de acidentes** (ABRACOPEL: rede aérea e construção civil lideram) e o peso de prova.
9. Os 12 módulos do protótipo formam a **Biblioteca** (referência, Mapa da norma, treino de fatos) e alimentam o debrief e a revisão espaçada.

---

## 2. Decisões (D1–D8)

Cada decisão traz o motivo.

**D1. Duas camadas: Campanha (principal) + Biblioteca (apoio).**
- As 4 fases do protótipo (Aplicação → Controle → Execução → Prova) continuam como **espinha**. Cada passo de missão recebe uma etiqueta de fase, e o debrief mostra "em que fase da norma você errou".
- Por quê: a norma é aplicada em sequência numa ordem de serviço. A hierarquia de controle (10.5.4) continua sendo a lógica, mas agora é **vivida** em vez de lida.

**D2. A norma como motor de regras.**
- Cada item relevante vira um objeto de regra com: pré-condição, *gate* (o que bloqueia), consequência do desvio e severidade.
- Há **um** pacote de regras, `RULES`, com o texto da Portaria MTE 737/2026.
- Por quê: separa conteúdo normativo de cena. Outra norma (NR-12, NR-35…) entra como outro pacote, sem reescrever o motor nem as missões (`00_INDICE` R6).

**D3. Modelo elétrico topológico (§5).**
- Por quê: sem ele, as armadilhas mais didáticas (backfeed, religador, FV, capacitor) são impossíveis de mostrar como consequência.

**D4. Verdade invisível + fading.**
- **Modo jogo:** o mundo não denuncia o estado.
- **Modo aprendiz:** um brilho de ajuda que **diminui** a cada missão concluída (fading).
- **Debrief:** raio-x completo, com fluxo de corrente animado.
- Por quê: estudos sobre feedback e treinamento em VR citados na pesquisa indicam que orientação fixa gera queda de desempenho quando é retirada, e que orientação que esmaece favorece retenção. Num estudo em VR com gás, o risco invisível só era revelado na revisão pós-ação.

**D5. Interação por verbos + inventário.**
- O jogador carrega itens (EPI vestido, cinto de ferramentas, maleta, caminhão). Seleciona um item, clica num alvo e o motor oferece os **verbos possíveis** naquele par item × alvo.
- Por quê: o pedido do usuário (item 9: "interativos ao invés de check-list").

**D6. Progressão por gates + severidade.**
- Sem procedimento de trabalho (atividade rotineira, 10.7.1) ou PT (não rotineira, 10.7.2) válidos, não há acesso à área. Sem autoteste, o detector não lê de forma confiável. Sem aterramento, a parte não fica "liberada".
- Severidade:
  - **Fatal:** encerra a missão com replay do acidente.
  - **Grave:** obriga a corrigir antes de prosseguir.
  - **Leve:** só desconta.
- Medalha única: "OS cumprida sem desvio". **Sem ranking e sem badges**: a literatura citada na pesquisa (Hanus & Fox, 2015) mostrou queda de motivação em curso gamificado com pontos e ranking.

**D7. Edição única: Portaria MTE 737/2026.**
- Motivos (registrados como decididos):
  1. Suportar duas edições multiplica a complexidade do motor (versionamento de regras, precedência, testes duplicados).
  2. Os próximos concursos cobram a redação atualizada.
- Consequência: cada um destes conteúdos tem um valor só, o da Portaria 737/2026:
  - sequência de desenergização: 10.13.1, alíneas a–g; reenergização: 10.13.2, alíneas a–g;
  - faixas de tensão: glossário (Anexo I), com MT; 13,8 kV é MT;
  - documentos: procedimento de trabalho (rotineiro, 10.7.1) ou PT (não rotineiro, 10.7.2), ambos a partir de análise de risco (10.7.3);
  - grave e iminente risco: lista do 10.16.1;
  - treinamentos: Quadro I (10.9.2), periódico bienal (10.9.10) e eventual (10.9.11);
  - cores de posição de manobra (verde "D", vermelho "L"): **não estão** na Portaria 737/2026 (conferido no PDF); no simulador são [PRÁTICA].

**D8. Ordem das missões por dados de acidente + peso de prova; ambientação em Pernambuco.**
- Dados ABRACOPEL 2025 [FONTE: pesquisa]:
  - choque elétrico: 917 acidentes e 646 mortes;
  - redes de distribuição: 379 ocorrências e 242 mortes;
  - trabalhadores da construção: 208 mortes;
  - Nordeste: 316 acidentes de choque e 236 mortes.
- Ambientação: Pernambuco (concessionária Neoenergia PE, centro de operação COD).

---

## 3. Core loop: as 8 fases de uma Ordem de Serviço

Toda missão percorre estas fases. Nem toda missão exige todas com o mesmo peso. Itens da Portaria MTE 737/2026, conferidos no PDF.

| Fase | O que o jogador faz (verbos) | Gate: não avança sem | Itens |
|---|---|---|---|
| F1 Briefing | Lê a solicitação. Classifica tensão (faixa do glossário), SEP/SEC, rotina/não rotina, trabalho energizado ou não. | Enquadramento correto | 10.1, 10.2, Anexo I (faixas, SEP, atividades rotineiras) |
| F2 Planejamento | Monta a análise de risco (cartas de risco; o formulário "APR" é [PRÁTICA]), escolhe procedimento ou PT, escala a equipe pelas fichas, pede o desligamento ao COD/concessionária. | Procedimento (rotineiro) ou PT aprovada por trabalhador autorizado (não rotineiro), precedidos de análise de risco | 10.3, 10.7.1, 10.7.1.1, 10.7.2, 10.7.2.1, 10.7.3 |
| F3 Almoxarifado | Escolhe EPI, EPC e ferramentas. Inspeciona: teste de inflação da luva, autoteste do detector, validade dos ensaios, classe da luva pela cor da etiqueta ([PRÁTICA]; ver `PENDENCIAS_DE_VERIFICACAO.md`). | Kit mínimo com ensaios válidos | 10.11, Anexo IV, 10.12.6, 10.12.6.1, 10.14.4, 10.14.4.1 |
| F4 Chegada / caça ao risco | Identifica riscos no ambiente (rede próxima, chuva, pessoa não advertida, adorno, porta aberta, escada de alumínio). Delimita e sinaliza. | Riscos críticos tratados | 10.7.3, 10.7.7, 10.7.7.1, 10.7.8, 10.13.1 g, 10.14.1.2 |
| F5 DDS e autorização | Faz a avaliação prévia, confere crachás e ASO, designa o supervisor. | Equipe autorizada, supervisor designado | 10.7.4, 10.7.4.1, 10.7.4.2, 10.7.5, 10.7.6, 10.8–10.10 (10.10.2.1, 10.10.4) |
| F6 Desenergização no mundo | Executa os verbos físicos na ordem do pacote de regras. | Sequência do 10.13.1 | 10.13.1 a–g, 10.13.3 |
| F7 Execução + evento | Responde ao evento surpresa: suspender, comunicar, recusar, refazer o teste. | Resposta correta ao evento | 10.7.4.2, 10.12.4, 10.12.4.1, 10.16.1; direito de recusa: conteúdo do Treinamento Básico (Anexo III, item 9 k); não há item próprio de suspensão |
| F8 Reenergização + encerramento | Reenergiza na ordem, encerra e arquiva a PT, registra no PIE quando aplicável. | Sequência + registro | 10.13.2 a–g, 10.7.2.3, 10.15 |
| Debrief | Replay com raio-x, linha do tempo das ações, itens da norma acionados, erros enviados à fila de revisão. | — | — |

---

## 4. Campanha: missões

Prioridade: **A** = primeiro; **B** = depois.

| id | Ambiente / tensão | Trama | Eventos e armadilhas | Itens exercitados (principais) | Prio |
|---|---|---|---|---|---|
| M0 | Residência, QDC 220/127 V | Trocar um DR defeituoso. Missão tutorial dos verbos. | Adorno (anel), escada de alumínio, morador que religa o disjuntor, neutro tratado como "não vivo". | 10.13.1 em BT; bloqueio de disjuntor (10.13.1 c); detector bipolar (10.13.1 b, 10.12.6.1); DDR (10.6.4; o valor 30 mA é de norma técnica, pendência 20); adornos (10.7.8); glossário "partes vivas" (inclui o neutro; termo do Anexo I ainda fora da `REF`) | A |
| M3 | Cabine primária 13,8 kV (**reusa a cena `desenergizado` e a OS 0457**) | Manutenção do TR-01. | VPIS apagado por LED queimado; visitante; troca de turno; gerador do cliente. | 10.13.1, 10.13.2, 10.13.3; procedimento/PT (10.7.1, 10.7.2; troca de turno: 10.7.2.2); desligada com possibilidade de energização (10.5.2); lâmpadas verde "D" e vermelha "L" ([PRÁTICA]; não estão na NR-10/2026); seccionadora com abertura visível; aterramento do cubículo (10.4.6); tapete isolante; vara de manobra; extintor de CO₂ (NR-23; a NR-10/2026 não tem item sobre extintor) | A |
| M2 | Rede aérea 13,8 kV (desenergizada) | Substituir uma chave fusível ou um isolador. | Religador não bloqueado; backfeed pelo gerador de um cliente através do trafo de distribuição; tensão induzida por linha paralela; chuva. | Pedido ao COD; comunicação permanente com o centro de operação (10.12.4.1); bloqueio de religamento automático (impedimento de reenergização, 10.13.1 c; em energizado na ZR, 10.14.3) [INTERPRETAÇÃO]; aterramento a montante e a jusante [PRÁTICA]; detector por aproximação no bastão; cesto aéreo isolado; aterramento do caminhão [PRÁTICA]; sinalização de via pública (10.7.7, alínea grafada "[a)]" no texto publicado); condições meteorológicas na análise de risco (10.7.3 c); NR-35 | A |
| M1 | Canteiro de obras com rede 13,8 kV a ~2 m da fachada | O jogador é o engenheiro responsável pela obra. | Andaime, vergalhões e grua (extensões condutoras); quadro provisório aberto; extensões no chão molhado; pintor não advertido. | Anexo II (zonas: Rr 0,38 / Rc 1,38 m para ≥ 10 e < 15 kV); trabalho em proximidade (10.2.2); instalações de caráter temporário (10.2.1); instrução formal a quem faz atividade não elétrica (10.14.1.2); NR-18 18.6 [VERIFICAR: fora da NR-10] (DR, quadro com bloqueio, rede próxima só com proteção contra choque e arco); pedido de cobertura isolante ou desligamento | B+ |
| M4 | Sala elétrica industrial: CCM 480 V, inversor de frequência, banco de capacitores | Medição/ajuste em gaveta energizada e manutenção de um inversor. | Barramento CC do inversor ainda carregado; capacitor sem descarga; categoria de EPI de arco errada; iluminação ruim e postura forçada. | Anexo IV (categoria, ATPV, distância de arco); seleção de EPI de arco (10.11.2); proteção coletiva contra arco (10.6.5); aterramento estático; **ergonomia 10.4.10 / NR-17 no mundo** (altura do painel, iluminação, espaço livre); inspeção da sala (10.7.11; reusa as 10 não conformidades do m5) | B |
| M7 | Linha viva 13,8 kV (métodos ao contato e à distância) | Trocar um isolador com a rede energizada. | Começa a chover; colega sozinho; religamento ativo; luva com etiqueta de classe errada. | Trabalho energizado (capítulo 10.14): nunca sozinho em MT/AT (10.14.2); PT (10.7.2) e procedimento (10.7.1); bloqueio do religamento automático (10.14.3, 10.14.3.1); ensaio dielétrico (10.14.4); luvas classe 2 (etiqueta amarela) + mangas ([PRÁTICA], pendência 21); coberturas isolantes laranja [PRÁTICA] | B |
| M8 | Fiscalização: auditor-fiscal visita a empresa | Defender a documentação. | Prontuário incompleto; laudo vencido; situação de GIR em curso. | Documentação (10.15.3–10.15.7; PIE 10.15.6); GIR (10.16.1); reusa o módulo `documentacao` (m8) | B |
| M5 | FV em telhado, 1000 Vcc | Trocar o fusível da string box. | Abrir a seccionadora **não** desenergiza o lado dos módulos; arco em CC não se extingue sozinho; dupla fonte via inversor; altura. | Desligada, mas com possibilidade de energização → regras do capítulo 10.14 (10.5.2); faixas CC do glossário (BT até 1.500 Vcc; MT acima de 1.500 até 3.000 Vcc; 1.000 Vcc é BT); escolha entre lona opaca, trabalhar como energizado ou trabalhar à noite [INFERÊNCIA: opções didáticas]; NR-35 | B |
| M6 | Posto de combustível (área classificada) | Trocar uma luminária na zona 1. | Ferramenta comum; equipamento sem marcação Ex; ausência de explosímetro; ausência de PT. | Proteção coletiva em área classificada (10.6.6.1); equipamento Ex certificado (10.6.6.1.1; no Brasil, certificação Inmetro [INTERPRETAÇÃO]); PT (10.7.2); documentação de área classificada (10.15.5); projeto (10.4.11); treinamento Complementar de Área Classificada, 16 h (10.9.7, Quadro I); explosímetro [PRÁTICA] | B |
| M9 | "Obra do zero" (projeto) | Projetar a instalação de um restaurante. | Decisões de projeto têm efeito depois: sem ponto de aterramento temporário previsto, a M3 fica mais difícil; sem dispositivo bloqueável, não há onde pôr o cadeado. | Projeto (10.4): dispositivo que permita impedimento de reenergização (10.4.2), espaço seguro (10.4.3), previsão de aterramento temporário (10.4.6), memorial (10.4.9), DDR previsto em projeto (10.6.4); reusa o `projeto` (m2) | B |

**Ordem recomendada de implementação** (no protótipo): motor → **M3** (reaproveita a cena e é a de maior peso de prova) → **M0** (tutorial barato) → **M2** → M1 → M4 → M7 → M8 → M5 → M6 → M9. Na arquitetura Godot, a fatia vertical começa pelo Capítulo 0 (residência), conforme o `00_INDICE` §9.

---

## 5. Modelo elétrico (D3): especificação

**Grafo**
- Nós: barras, terminais e pontos de conexão.
- Arestas, cada uma com tipo e estado:
  - condutor;
  - seccionadora (aberta / fechada; abertura visível);
  - disjuntor (aberto / fechado / extraído);
  - fusível (íntegro / aberto);
  - chave fusível;
  - religador (com religamento automático ativo ou bloqueado);
  - **trafo** (acopla dois níveis de tensão **nos dois sentidos**, pela relação de transformação; é isso que produz o backfeed);
  - aterramento temporário (liga as fases à terra);
  - chave de aterramento.

**Fontes**
- Rede da concessionária (através do religador).
- Gerador do cliente (pode partir sozinho num evento).
- FV (fonte enquanto houver luz).
- Bateria.
- Capacitor ou cabo longo: carga residual com decaimento no tempo.
- Indução de linha paralela: aparece só em trecho isolado **e não aterrado**.

**Solver**
- Busca em largura (BFS) a partir das fontes ativas, pelas arestas fechadas, propagando a tensão através dos trafos.
- Saída por nó: `V` (kV), conjunto de fontes, `aterrado` (bool), `bloqueado` (há cadeado no dispositivo que o isola).
- Recalcula a cada ação.

**Estados lógicos** (usados pela lógica e pelo debrief; **não** são mostrados no modo jogo):
`ENERGIZADO` → `DESLIGADO_NAO_CONSTATADO` → `AUSENCIA_CONSTATADA` → `ATERRADO` → `LIBERADO` (aterrado + sinalizado + zona controlada protegida).

**Consequências físicas** (avaliadas a cada ação; a severidade vem do pacote de regras):

| Ação | Mecanismo | Severidade típica |
|---|---|---|
| Fechar aterramento em nó energizado | Curto franco, arco | Fatal (ou grave, se o EPI de arco for adequado) |
| Tocar parte com V > EBT sem isolação | Choque | Fatal |
| Entrar na ZR sem condição | Choque ou arco por aproximação | Fatal |
| Abrir seccionadora sob carga | Arco na abertura | Grave/fatal |
| Reenergizar com pessoa ou aterramento no circuito | Curto, choque | Fatal |
| Trabalhar em trecho isolado mas não aterrado | Tensão induzida / backfeed | Grave/fatal, conforme o evento |

**Detector** (item com estado próprio)
- `autotestado`: vale por N minutos de jogo.
- `faixa`: BT ou MT.
- `método`: contato ou aproximação.
- Leitura **fase a fase**.
- Sem autoteste, ou com faixa errada, a leitura é **enganosa** e o debrief explica por quê.

---

## 6. Linguagem visual de estado (energizado × desenergizado)

| Elemento | Modo jogo | Modo aprendiz (esmaece) | Debrief raio-x |
|---|---|---|---|
| Condutor / barramento | Aparência idêntica, energizado ou não | Brilho suave que diminui a cada missão | Partículas fluindo a partir da fonte; cor = **nível de tensão** (paleta própria com legenda) |
| Disjuntor | Lâmpada **vermelha = ligado ("L")**, **verde = desligado ("D")** [PRÁTICA; a Portaria 737/2026 não traz a convenção] + bandeirola mecânica | idem | idem |
| Seccionadora | Lâminas visíveis; a abertura visível é a prova do seccionamento | idem | idem |
| VPIS (LED por fase no cubículo) | Aceso acima de ~45 % da tensão nominal [PRÁTICA]. **Pode estar queimado** (evento). **Nunca libera o estado.** | idem | Mostra se o LED mentiu |
| Aterramento temporário | Grampos + cabo de cobre com capa transparente (~95 mm²) [PRÁTICA] + grampo de terra | idem | Cor de "aterrado" |
| Zonas (Anexo II) | Cascas translúcidas (ZR vermelha, ZC âmbar) **só depois** de o jogador identificar a tensão | Sempre visíveis, esmaecendo | Visíveis |
| Limite de arco (Anexo IV) | Casca tracejada, depois de calcular a categoria | idem | idem |
| Bloqueio | Cadeado colorido por pessoa + garra múltipla + etiqueta "NÃO OPERE" com nome e data | — | — |
| Acidente | Flash curto + som → tela de incidente → replay | — | Replay com raio-x |

**Conflito de cores a evitar:** nos diagramas do ONS, vermelho = 500 kV e verde = 230 kV, o que colide com vermelho = ligado. Por isso:
- no **sinóptico do HUD**: cor = nível de tensão; **estado por símbolo** (cheio = fechado, vazado = aberto, símbolo de terra = aterrado);
- o sinóptico só mostra o que o jogador **já verificou** ou o que o COD informou por rádio.

---

## 7. Catálogo de itens por ambiente (para modelagem 3D)

Formato: item — pistas visuais — verbos — refs (Portaria MTE 737/2026, conferidas contra a `REF`).
Os itens marcados com 🔤 são termos do glossário e devem abrir a **definição literal** do glossário ao serem inspecionados. Isso fecha a lacuna dos 41 termos ausentes (STATUS §7) de forma natural: o glossário vira objeto.

### 7.1 Itens comuns a todos os ambientes
| Item | Pistas visuais | Verbos | Refs |
|---|---|---|---|
| Cadeado individual 🔤(travamento) | Corpo plástico ~38 mm, cor por pessoa, etiqueta com nome | bloquear, remover (só o dono) | 10.13.1 c |
| Garra de bloqueio múltiplo | Tesoura de náilon, 6 furos | instalar, adicionar cadeado | 10.13.1 c |
| Etiqueta "NÃO OPERE / HOMEM TRABALHANDO" 🔤(sinalização) | PVC vermelho/branco 7,5 × 14 cm, ilhós, nome/data | preencher, fixar | 10.13.1 f; 10.7.7 e |
| Detector de tensão BT (bipolar) | Duas pontas, escala de LEDs | autotestar, medir fase a fase | 10.13.1 b, d; 10.12.6.1 |
| Detector MT por aproximação | Caixa na ponta do bastão, LED vermelho + bip, botão de teste | acoplar ao bastão, autotestar, medir | 10.13.1 b, d; 10.12.6.1 |
| Multímetro / alicate amperímetro | Capa amarela, "CAT III 1000 V / CAT IV 600 V" | conferir categoria, medir | 10.12.6.1 (alínea b: categoria compatível com surtos) |
| Megôhmetro | Caixa com cabos "HV" | ensaiar (só autorizado) | 10.12.9 |
| Luvas isolantes + luva de cobertura | **Cor da etiqueta por classe:** 00 bege, 0 vermelha, 1 branca, 2 amarela, 3 verde, 4 laranja ([PRÁTICA], pendência 21) | teste de inflação, conferir data do ensaio | 10.14.4 b; 10.14.4.1; 10.12.6 |
| Mangas isolantes | Borracha do ombro ao punho | vestir | 10.14.4 b |
| Capacete classe B com jugular | Sem partes metálicas | vestir | NR-6 |
| Óculos / protetor facial de arco | Visor esverdeado com etiqueta "cal/cm²" | vestir, conferir ATPV | Anexo IV (Quadro III) |
| Balaclava / vestimenta com ATPV 🔤(indumentária) | Camisa e calça FR azul-marinho ou cáqui; Cat. 4 = macacão com capuz | vestir, conferir categoria (Cat. 1 = 4, 2 = 8, 3 = 25, 4 = 40 cal/cm²) | 10.11.2; 10.11.3; Anexo IV |
| Botina sem metal | Biqueira composta | vestir | 10.7.8.1; Anexo IV, Quadro III (calçado sem componentes metálicos expostos) |
| Adornos (anel, relógio, corrente) | Itens de "caça ao risco" | retirar | 10.7.8 |
| Cinto paraquedista + talabarte | Fitas laranja/preta | vestir, ancorar | NR-35 (a NR-10/2026 não tem item sobre altura) |
| Fita zebrada, corrente plástica, cones, placas 🔤(barreira, sinalização) | Amarelo/preto ou vermelho/branco | delimitar | 10.13.1 g; 10.7.7 c, d |
| Prancheta com procedimento, PT e análise de risco ("OS" e "APR" são [PRÁTICA]: os termos não aparecem na NR-10/2026) | Documento físico no local | ler, preencher, assinar, encerrar | 10.7.1, 10.7.1.1, 10.7.2, 10.7.2.1, 10.7.2.3, 10.7.3 |
| Crachá de autorização + ASO | Crachá com escopo da autorização | conferir | 10.10.4; 10.10.2.1; 10.7.5 |
| Rádio | Portátil, no cinto ou no caminhão | chamar COD, receber liberação | 10.12.4.1 |
| Extintor de CO₂ | Cilindro vermelho com difusor | usar | NR-23 (a NR-10/2026 não tem item sobre extintor) |

### 7.2 Itens específicos por ambiente
- **Residência (M0):** padrão de entrada com caixa de medição lacrada; ramal de ligação (multiplexado preto); medidor; QDC com quadro de circuitos na porta; DR "IΔn 30 mA" com botão T; DPS com janela verde/vermelha; disjuntores ("I" para cima = ligado); haste de aterramento em caixa de inspeção; BEP 🔤(equipotencialização); escada de fibra (amarela/laranja; **alumínio é armadilha**).
- **Canteiro (M1):** quadro provisório em poste, com porta bloqueável, DR e placa de perigo; extensões de dupla isolação; plugues industriais (azul ≈ 220 V, vermelho ≈ 380 V); cabos suspensos; área do transformador cercada; SPDA na grua; **rede 13,8 kV a 2–4 m da fachada**; andaime, vergalhões e grua 🔤(extensão condutora); pintor 🔤(pessoa não advertida); projeto das instalações temporárias na caixa do quadro.
- **Rede aérea (M2, M7):** poste de concreto 11–12 m com placa; cruzeta; isoladores (porcelana ou polimérico cinza); chave fusível (o cartucho cai quando o fusível abre); religador (tanque cinza + caixa de controle embaixo); trafo de distribuição (45–150 kVA); para-raios; caminhão com cesto isolado (patolas, giroflex âmbar); aterramento do veículo; **conjunto de aterramento para rede** (3 grampos em bastão + cabo ao neutro e a uma haste; aplicado a montante e a jusante); coberturas isolantes **laranja** (mangueiras, lençóis, coberturas de isolador); cones e placas de via.
- **Cabine primária 13,8 kV (M3):** alvenaria com telas metálicas entre cubículos; porta abrindo para fora com placa "PERIGO DE MORTE – ALTA TENSÃO"; cubículos de medição, proteção e transformação; seccionadora tripolar; disjuntor (PVO alto com visor de óleo, ou vácuo compacto) com bandeirola LIGADO/DESLIGADO; TCs e TPs em epóxi; relé 50/51 com LEDs de trip; trafo a óleo (radiadores, nível de óleo, poço de contenção) ou seco; malha de aterramento com barras e **pontos de conexão para aterramento temporário**; tapete isolante; vara de manobra telescópica; extintor de CO₂; iluminação de emergência; diagrama unifilar afixado na entrada; VPIS.
- **Sala industrial (M4):** fileira de painéis cinza ~2,2 m; gavetas do CCM com punho rotativo bloqueável em OFF; lâmpadas; inversor de frequência com etiqueta "aguarde X min" (barramento CC); banco de capacitores com resistores de descarga; eletrocalhas com identificação de cabos; sala de baterias (lava-olhos, ventilação, "proibido fumar"); painel metal-clad 13,8 kV com carrinho extraível (inserido / teste / extraído), manivela, chave de aterramento e VPIS.
- **FV (M5):** módulos (vidro azul-escuro/preto, moldura de alumínio, conectores MC4); string box cinza IP65 com fusíveis CC, DPS CC e seccionadora rotativa (punho vermelho em placa amarela); inversor com chaves CA e CC; lona opaca.
- **Posto (M6):** ilha de bombas com volume translúcido de zona 1/2; invólucros Ex (fundidos, muitos parafusos, placa "Ex d IIB T4 Gb" + Inmetro) 🔤(área classificada, atmosfera explosiva); explosímetro portátil; PT em porta-documento; aterramento estático do caminhão-tanque.

**Termos do glossário que viram objetos ou situações:** barreira, obstáculo, invólucro, isolação das partes vivas, colocação fora do alcance, travamento ou bloqueio, sinalização, aterramento elétrico temporário, equipotencialização, infraestrutura de aterramento, área classificada, atmosfera explosiva, partes vivas, pessoa não advertida, indumentária, impedimento de reenergização, condições impeditivas, contato direto, contato indireto, seccionamento automático da alimentação, separação elétrica, limitação da tensão, fontes de energia elétrica.
Os termos **não físicos** (anuência formal, proficiência, plano de aprendizagem, análise de risco, comissionamento, procedimento de trabalho) aparecem como **documentos ou diálogos** em F2 e F5.

---

## 8. Matriz norma → interação (esqueleto a completar)

A sessão do documento 14 deve expandir esta matriz para **todos os 133 itens + 57 termos + tabelas dos Anexos + Art. 1º a 5º** da Portaria MTE 737/2026, conferindo cada número no PDF. A regra é que cada linha diga onde o item é **exercitado** (verbo, gate ou consequência), não apenas citado.

| Tema | Itens (Portaria 737/2026) | Como é exercitado (missão · fase · mecânica) |
|---|---|---|
| Campo de aplicação e faixas de tensão | 10.1, 10.2, Anexo I | Todas · F1 · classificar a OS (13,8 kV = MT) |
| Trabalho em proximidade e zonas | 10.2.2, Anexo II | M1, M2, M7 · F4/F6 · cascas, extensões condutoras, consequência ao entrar na ZR |
| GRO / análise de risco | 10.3, 10.7.3 | Todas · F2 · montar a análise de risco com cartas; riscos não listados aparecem como evento em F7 |
| Projeto | 10.4 (memorial 10.4.9, ergonomia 10.4.10) | M9 · decisões com efeito em M3; M4 · ergonomia na cena |
| Hierarquia de controle | 10.5.4 | Debrief de todas: "qual nível da hierarquia falhou?" |
| Proteção coletiva (DDR, arco, Ex, surtos) | 10.6 (10.6.4, 10.6.5, 10.6.6.1, 10.6.7) | M0 (DDR), M4 (arco), M6 (Ex), M5 (DPS CC) |
| Procedimento / PT | 10.7.1–10.7.2 | Todas · F2 · gate documental; troca de turno = PT nova ou revalidada (10.7.2.2) |
| Pessoas: qualificado, habilitado, capacitado, autorizado | 10.8–10.10 | Todas · F2/F5 · escalar equipe pelas fichas; consequência se não autorizado |
| Treinamentos | Quadro I (10.9.2), 10.9.x | F5 · ficha com treinamento vencido; afastamento > 90 dias exige treinamento eventual (10.9.11 a) |
| EPI e vestimenta | 10.11, Anexo IV | F3 · almoxarifado; M4 · categoria de arco |
| Desenergização | 10.13.1 a–g | Todas · F6 · verbos físicos na ordem do pacote |
| Reenergização | 10.13.2 a–g | Todas · F8 |
| Alteração da sequência por PLH | 10.13.4 | M3 · evento: o PLH justifica formalmente uma alteração |
| Trabalho energizado | 10.14 | M7, M4 |
| Comunicação com o centro de operação | 10.12.4, 10.12.4.1 | M2, M7 · rádio como gate |
| Sinalização | 10.7.7, 10.7.7.1, 10.13.1 f–g | F4 · delimitar; porta do painel fechada e sinalizada |
| Emergência | 10.7.3 h (análise de risco), 10.15.6.1 (PIE) e primeiros socorros/resgate no Anexo III; não há capítulo próprio | F7 · extintor, resgate, primeiros socorros como evento |
| Responsabilidades, suspensão e direito de recusa | 10.7.4.2; 10.16 (GIR: embargo e interdição); direito de recusa: Anexo III, Treinamento Básico, item 9 k | F7 · eventos de GIR; recusar é a resposta correta |
| Documentação / prontuário | 10.15 | M8, F8 |

---

## 9. Fatos de conteúdo que o simulador precisa respeitar

### 9.1 Zonas e distâncias

1. **Tabela de zonas (Anexo II):** a redação de 2026 traz as fronteiras ≥/< e a observação de que, em sistemas trifásicos, vale a tensão entre fases [FONTE: `REF` `AII`].
2. **Distâncias que NÃO são da NR-10** (o debrief deve rotular como "prática", nunca como norma):
   - 1,5 m de afastamento da rede (orientação de concessionária);
   - 0,64 m em linha viva a 13,8 kV (número de fornecedor).

### 9.2 Fontes oficiais
- Texto da Portaria MTE 737/2026: `gov.br/.../normas-regulamentadoras-vigentes/nr-10-atualizada-2026-1.pdf` (cópia em `docs/referencias/`).
- Manual de Auxílio na Interpretação e Aplicação da NR-10 (MTE): não acompanha a numeração da Portaria 737/2026. Usar só para conceitos, nunca para numeração ou texto [INFERÊNCIA].

---

## 10. Campanha sobre o protótipo three.js (plano não executado)

> Esta seção descreve como a campanha seria montada **sobre o protótipo three.js**. O protótipo hoje é a ferramenta de estudo da Trilha 1 (fases, História, Missão e Treino; ver `STATUS`); a campanha de verdade será feita em **Godot 4.7.2** (`00_INDICE` §3–§4, documento 02). Esta seção fica como especificação de conteúdo e de dados.

### 10.1 O que se mantém (STATUS §4)
- three.js r128 UMD, `build.py` (online/offline), API do motor (`box/cyl/...`, `hot()`, `fb()`, `quiz/classify/pickList`, `Store`, `miss()`).
- Os módulos existentes, acessados pela aba **Biblioteca**.

### 10.2 Arquivos novos
| Arquivo | Responsabilidade |
|---|---|
| `elec.js` | Grafo, solver BFS, fontes, consequências físicas (§5) |
| `rules.js` | `RULES` (Portaria 737/2026): sequências, faixas, documentos, treinamentos, GIR, severidades |
| `items.js` | Catálogo `ITEMS`: construtor 3D, verbos, refs, termo do glossário |
| `scenes/*.js` | Ambientes: `casa`, `canteiro`, `rede`, `cabine` (refatora a cena do m6), `ccm`, `fv`, `posto` |
| `mission.js` | Executor: fases F1–F8, gates, eventos, pontuação, **log de ações** |
| `hud.js` | Inventário, prancheta (procedimento/PT), rádio COD, sinóptico, tela do detector, modo aprendiz |
| `debrief.js` | Linha do tempo, replay com raio-x, itens acionados, 3 perguntas de reflexão |
| `srs.js` | Revisão espaçada (Leitner, 5 caixas) sobre as chaves de `REF`, alimentada por `miss[]` e pelo log |
| `missions/m0.js … m9.js` | Missões declarativas |

Nova ordem de concatenação: `refs.js, refs2.js, engine.js, elec.js, rules.js, items.js, scenes/*.js, hud.js, mission.js, debrief.js, srs.js, mapa.js, m1…m8.js, missao.js, missions/*.js, main.js`.

### 10.3 Esquemas de dados
```js
// Item do catálogo
ITEMS.detectorMT = { id:'detectorMT', nome:'Detector de tensão por aproximação (MT)',
  build: () => grp(...), slot:'maleta',           // onde fica no inventário
  state: { autotestado:false, t0:null, faixa:'MT', metodo:'aprox' },
  verbs: { autotestar:{alvo:null}, medir:{alvo:'fase', requer:['bastao']} },
  refs: ['10.13.1', '10.12.6.1'], glos:null };    // um pacote: Portaria 737/2026

// Regra (pacote único)
RULES.seqDesenerg = ['seccionar','constatar','bloquear','constatar2','aterrar','protegerZC_arco','sinalizarImpedimento','delimitarArea'];  // 10.13.1 a–g (d = constatar2 + aterrar)
RULES.doc = { rotina:'procedimento', naoRotina:'PT', ref:['10.7.1','10.7.2'] };   // conferido contra a REF
RULES.consequencias = [{ quando:'aterrar && no.V>0', sev:'fatal', mec:'curto franco / arco', refs:[...] }, ...];

// Missão
MISSIONS.m3 = { id:'m3', titulo:'OS — manutenção do TR-01', cena:'cabine', tensao:13.8,
  grafo: {...},                                     // topologia inicial para elec.js
  fases: { F1:{...}, F2:{ equipe:[fichas], apr:[cartas], doc:'auto' }, F3:{ kitMin:[...] },
           F4:{ riscos:['portaAberta','visitante'] }, F6:'auto', F8:'auto' },
  eventos: [{ em:'F7', id:'geradorCliente', efeito:g => g.fonte('GER').on(), respostas:{ suspender:'ok', continuar:'fatal' }, refs:[...] }],
  debrief: { reflexao:[...3 perguntas] } };

// Log de ações (base do replay, do debrief e da SRS)
{ t, fase, verbo, item, alvo, ok, sev, refs:[...], estadoGrafo:hash }
```

### 10.4 Interação
- Raycast com contorno ao passar o mouse.
- Item selecionado + alvo → **menu radial** só com os verbos válidos para o par. Verbos inválidos também aparecem, desabilitados com uma dica, porque escolher errado faz parte do aprendizado.
- Toque no celular: toque = selecionar; segundo toque = menu.
- Câmera orbital (já existe) + atalhos "ir até" por ponto de interesse.

### 10.5 Persistência e teste
- `localStorage['nr10sim.v1']` (a mesma chave do protótipo, com `done`, `miss`, `pr`).
- Grava também: missões concluídas, caixas da SRS e o último log.
- Desempenho: r128, `InstancedMesh` para itens repetidos (isoladores, cones, painéis), low-poly, `dispose()` ao trocar de cena, meta de ≤ 150 draw calls por cena.
- API de teste `window.__sim`:
  ```js
  __sim.load('m3', seed);
  __sim.act('bloquear', 'cadeado', '52-1');
  __sim.state('barraTR01');
  ```
- Playwright: caminho ideal de cada missão + 1 erro fatal por missão + tema escuro + 390 px. Manter as armadilhas da §9 do STATUS (r128 sem `Texture.userData`, `[hidden]`, materiais novos por mesh, charset, timeout ≥ 9 min).

---

## 11. Regras de didática e gamificação

1. **Severidade, não pontos:** fatal encerra com replay; grave obriga a corrigir; leve desconta. Única medalha: "OS cumprida sem desvio".
2. **Toda escolha tem um "porquê"**, inclusive os distratores.
3. **Fading do modo aprendiz:** a ajuda visual diminui a cada missão concluída e some no modo jogo.
4. **Debrief obrigatório:**
   - linha do tempo das ações;
   - replay com raio-x;
   - itens acionados;
   - 3 perguntas de reflexão ("o que você teria visto se não tivesse testado a fase B?").
5. **SRS entre missões:** 5 cartões de fatos de prova (Rr/Rc, sequências, faixas, horas de treinamento, procedimento × PT), puxados da fila de erros. *(Já existe no protótipo: fase Treino, revisão espaçada em 5 caixas e 42 cartões.)*
6. **Biblioteca** (módulos existentes + Mapa) acessível a qualquer momento. Chips de item abrem a gaveta com o texto literal.
7. **Modo prova** (estilo banca, cronometrado). Usa as mesmas `REF`. *(Já existe no protótipo: fase Treino › Simulado.)*
8. **Não exibir HUD carregado:** a pesquisa citada (Makransky et al., 2019) indica que mais imersão pode trazer mais carga cognitiva e menos aprendizado. Interface enxuta durante a ação; o detalhe fica no debrief.

---

## 12. Sprints da campanha sobre o protótipo (plano não executado)

> Sprints do protótipo three.js. Na arquitetura Godot, a sequência de entrega é a do `00_INDICE` §9 e do documento 21.

| Sprint | Entrega | Critério de aceite |
|---|---|---|
| S1 — Motor | `elec.js`, `rules.js` (Portaria 737/2026), `items.js` (itens comuns da §7.1), `mission.js`, `hud.js`, `debrief.js` mínimo | Testes unitários do solver: backfeed pelo trafo, carga residual, indução em trecho isolado não aterrado |
| S2 — M3 jogável | Cena da cabine refatorada para o grafo; OS 0457 vira missão F1–F8 | Caminho ideal; 3 erros fatais distintos (aterrar energizado, reenergizar com aterramento, confiar no VPIS) produzem replay correto |
| S3 — M0 + M2 | Casa e rede aérea | Religador e backfeed testados; detector sem autoteste gera leitura enganosa |
| S4 — M1 + M4 | Canteiro e sala industrial com ergonomia | Zonas com extensão condutora; categoria de arco do Anexo IV; NR-17 exercitada no mundo |
| S5 — M7 + M8 + SRS | Linha viva, fiscalização, revisão espaçada | Chuva suspende a M7; a SRS puxa da fila de erros |
| S6 — M5, M6, M9 | FV, posto, projeto | Efeito de projeto da M9 aparece na M3 |
| S7 — Fidelidade | Matriz completa (133 itens + 57 termos + anexos + artigos), textos literais, correções da §9 | Script de auditoria sem item "só citado" nos temas da §8 |

**Realismo de prazo** [INFERÊNCIA]: S1 e S2 já cobrem o núcleo de maior peso (sequências, zonas, procedimento/PT, EPI). Se o tempo apertar antes de uma prova, a Biblioteca e a SRS são o estudo da reta final; a campanha continua depois (`00_INDICE` R7: uso permanente).

---

## 13. Pendências de fidelidade em aberto

Numeração da Portaria MTE 737/2026.

- `10.2.4.1`: texto literal na base; falta exercitá-lo numa tarefa.
- Itens nunca exercitados: 10.4.5, 10.4.11, 10.7.10, 10.8.3.1, 10.8.4.1, 10.8.4.1.1, 10.10.1, 10.12.2, 10.12.5, 10.12.7. Cada um deve ganhar uma linha na matriz da §8.
- 41 termos do glossário fora da base: a maioria vira objeto (§7).
- Anexo III literal; notas do Quadro III do Anexo IV.
- Textos condensados a reconferir: 10.7.7, 10.8.4, 10.9.2, 10.15.4, AII, AIV, art5.
- Arestas `k:'t'` do Mapa ainda são interpretação do simulador.
- Textos da `REF` que o script de conferência aponta como não literais: 10.1.1 (cortado no fim), 10.8.4, 10.9.2, 10.15.4, 10.15.7 (`docs/CONFERENCIA_ITENS.md`, seção 4).

