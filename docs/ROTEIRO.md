# Roteiro do projeto

> Passos do projeto, ordem de execução, esforço de cada passo e regra de autonomia. Lido em toda sessão, junto com `CLAUDE.md` e `docs/STATUS_SIMULADOR_NR10.md`.
> 🤖 = passo do agente · 👤 = passo do usuário (U1–U4 do `CLAUDE.md` §2). Modelo: **Opus 5.5** em todos os passos; `médio`, `alto` e `extra` = esforço sugerido (§2).

---

## 1. Regra de autonomia

O usuário não aprova passo a passo. A um "continue" (ou qualquer pedido de trabalho), o agente segue os passos pendentes do esforço da sessão (§2), na ordem da §3, um PR por item, até acabar o limite da sessão ou chegar a um **ponto de parada**:

| # | Situação | O que o agente faz |
|---|---|---|
| P1 | Decisão que só o usuário pode tomar: conteúdo que a banca cobra, gosto didático, prioridade que mude o que ele recebe | Pergunta em uma frase, com a opção recomendada, e segue com o que não depende da resposta |
| P2 | Ação que não dá para desfazer: apagar Artifact, *branch* ou arquivo que não seja dele; reescrever histórico; publicar fora do repositório | Prepara tudo, descreve a ação e espera o "sim" |
| P3 | Precisa do usuário fisicamente: foto (U1); notebook ligado, aprovação de acesso ou login no navegador (U3) | Pede só isso e segue com outro item |
| P4 | CI vermelho que não consegue consertar após 3 tentativas, ou texto da norma que não bate com o PDF | Para o item, explica a causa e passa ao seguinte |

Fora desses casos, o agente decide, registra a decisão em `docs/DECISOES.md` quando ela for de projeto, e segue. Ao fim da sessão, avisa em poucas linhas o que entrou na `main` e atualiza o próximo passo e o esforço dele no `STATUS` §1.

**Para abrir uma sessão:** anexar o repositório, escolher Opus 5.5 com o esforço do próximo passo (`STATUS` §1) e escrever "Claudinho, continue o simulador-normas." Para mudar o foco, dizer só o objetivo (ex.: "comece pelo documento 14").

---

## 2. Esforço

| Nível | Critério |
|---|---|
| `médio` | Trabalho mecânico ou com modelo pronto; o CI ou a conferência no PDF pegam o erro, e refazer é barato |
| `alto` | Desenho com inferência sobre a NR-10 ou contrato usado por vários módulos; um erro vira retrabalho em outros passos |
| `extra` | Fundação: conteúdo central da norma, esquema da norma como dado, solver elétrico, arquitetura e revisão cruzada; um erro contamina tudo o que vem depois |

1. O usuário escolhe o esforço no seletor do app. Ele vale para a sessão inteira; o agente não o muda.
2. Numa sessão de esforço X, o agente executa os passos pendentes de nível X, na ordem da §3.
3. Se um passo de nível X depende de um passo de nível menor ainda pendente, o agente faz o pré-requisito na mesma sessão, no escopo mínimo que ele pede (sem revisão além da do próprio passo).
4. O agente não executa passo de nível maior que o da sessão.
5. Quando nenhum passo do nível da sessão puder avançar, o agente para e diz qual esforço escolher para o próximo bloco.
6. Corrigir ou ajustar algo já pronto (Etapa H, validação) tem o nível do passo que o produziu.

---

## 3. Passos pendentes, na ordem de execução

**E (infraestrutura do repositório) → F (documentos) → D (ambiente de execução) → G (esqueleto Godot e fatia vertical) → H (ciclo de correção).** As ferramentas só são instaladas depois do planejamento, para que a configuração siga os documentos (decisão 20). Passos seguidos do mesmo nível formam um bloco de sessão. A Etapa I acontece quando chegar uma foto. A Trilha 1 está congelada (melhorias registradas no `prototipo/README.md` §4).

Concluídas: **A** (contas: GitHub com 2FA, repositório público MIT, Claude Pro), **B** (ferramentas no notebook, `STATUS` §3; o passo 17 mediu o Compatibility na R5 e originou a decisão 4), **C** (repositório, PDF da Portaria em `docs/referencias/`, protótipo, CI) e **E**, exceto o passo 34 (modelo de documento, convenções, glossário do projeto, modelos de issue e de PR, checagem de links no CI, rótulos).

### Etapa E — infraestrutura do repositório
- [ ] **34.** 🤖 `médio` GitHub pelo navegador embutido (👤 U3 faz o login uma vez): apagar as *branches* já mescladas e proteger a `main` exigindo os *checks* do CI (sem revisão humana).

### Etapa F — documentos de planejamento (um PR por documento)
Para cada documento da `00_INDICE` §5: ler `CLAUDE.md`, a `00_INDICE`, `DECISOES` e os documentos já escritos; escrever no formato do `_MODELO_DOCUMENTO`; conteúdo só da NR-10 (R9); toda inferência sobre a norma marcada e registrada para validação (`00_INDICE` §1.4); rodar a conferência no PDF; PR e *merge* com CI verde. Um documento só fica pronto quando suas perguntas abertas foram respondidas pelo usuário ou registradas como pendência explícita.

| Ordem | Documento | Esforço | Por que nesta posição |
|---|---|---|---|
| 1 | 01 Visão e pedagogia | `alto` | Define o que é "aprender NR-10 jogando"; todos os outros servem a isso |
| 2 | 14 Pacote NR-10 (norma) | `extra` | O conteúdo é o centro (R4); define quais itens precisam virar interação |
| 3 | 04 Motor de normas | `extra` | Formato em que o conteúdo do 14 é escrito |
| 4 | 05 Energia e perigos | `extra` | O que torna o mundo "calculado" |
| 5 | 11 Campanha NR-10 | `alto` | Quais missões, em que ordem, com que papel |
| 6 | 15 Ambientes NR-10 | `alto` | Onde as missões acontecem |
| 7 | 07 Catálogo de itens | `alto` | O que existe dentro dos ambientes |
| 8 | 09 Personagens e papéis | `alto` | Quem age e quem é instruído |
| 9 | 08 Interação | `alto` | Como o jogador age sobre itens e pessoas |
| 10 | 02 Arquitetura geral | `extra` | Consolida os contratos definidos acima |
| 11 | 13 Interface e documentos | `médio` | A interface é a camada de cima e segue os contratos do 02 |
| 12 | 03 Plataforma e desempenho | `médio` | Fixa versões e orçamento |
| 13 | 06 Mundo 3D | `médio` | Estilo e kit de peças |
| 14 | 18 Pipeline de arte | `médio` | Como produzir as peças |
| 15 | 16 Dados e replay | `alto` | Save e log; o formato é caro de mudar depois |
| 16 | 12 Avaliação | `alto` | Modelo do aluno, por item da norma |
| 17 | 17 Testes e CI | `alto` | Como provar que funciona |
| 18 | 21 Roadmap | `médio` | Sequência de entrega |
| 19 | 22, 23, 24, 25 | `médio` | Complementos |
| 20 | 19 Novo pacote | `médio` | Fase 3; só depende do 04 e do 14 |
| 21 | 10 Modo Livre | `extra` | Fase 2: gerador e planejador de solvabilidade |
| 22 | **64.** Revisão cruzada de `docs/` | `extra` | Contradições, lacunas, dependências circulares; o `PLANO_V3` e a `ARQUITETURA` são absorvidos pelos documentos 01, 02, 05, 11, 14, 15 e 16 e retirados do repositório |

### Etapa D — ambiente de execução
- [ ] **29.** 🤖 `médio` Pedir acesso (👤 U3 aprova uma vez): `C:\projetos` e a pasta do Godot pela ponte; controle da tela para o executável de teste, o Godot e o navegador. Criar `C:\projetos\simulador-normas-testes`.
- [ ] **30.** 🤖 `médio` Godot na nuvem: baixar o 4.7.2 para Linux e os *export templates*, rodar `--headless --version`, fixar versão e soma de verificação no CI. Conferir na documentação oficial: requisitos mínimos do Compatibility, nomes das APIs de diagnóstico de GPU e de memória de vídeo (painel F3), limitações da exportação web.
- [ ] **31.** 🤖 `médio` Blender na nuvem: instalar o `bpy`, exportar um cubo `.glb`, renderizar a prévia sem GPU; fixar a versão (o PyPI oferece a série 5.x; o notebook tem a 4.5.10 LTS) e registrar no `CLAUDE.md`.
- [ ] **32.** 🤖 `médio` gdUnit4: definir como entra no projeto (o *proxy* da nuvem bloqueia páginas de repositórios de terceiros no GitHub; o CI não tem esse bloqueio).
- [ ] **33.** 🤖 `médio` Teste no notebook: exportar um `.exe` trivial, copiá-lo para a pasta de testes, abrir pelo controle da tela, ler o FPS e apagar. Testar também capturas de cena na nuvem por renderização de software.

### Etapa G — esqueleto Godot e fatia vertical
- [ ] **65–68.** 🤖 `médio` Projeto Godot (Compatibility, 4.7.2), gdUnit4, CI de testes, CI de exportação do `.exe` Windows.
- [ ] **69.** 🤖 `médio` Abrir o primeiro `.exe` da Release no notebook e conferir se abre.
- [ ] **70.** 🤖 `médio` Camada base: eventos, save, RNG com semente, log (documento 16).
- [ ] **71.** 🤖 `extra` Motor de regras (documento 04).
- [ ] **72.** 🤖 `extra` Solver elétrico (documento 05).
- [ ] **74.** 🤖 `médio` Ambiente do Capítulo 0 (documento 15).
- [ ] **73.** 🤖 `alto` `act()` com os 6 verbos (documentos 02 e 08).
- [ ] **75.** 🤖 `alto` Missão 0 (documento 11).
- [ ] **76.** 🤖 `médio` Jogar a Missão 0 no notebook e medir o FPS (painel F3). 👤 U2: jogar e dizer o que ficou confuso.

### Etapa H — ciclo de correção (repetido)
- [ ] **77.** 👤 U2 conta o problema na conversa; 🤖 `médio` o agente busca o log no notebook (`%APPDATA%\Godot\app_userdata\<projeto>\logs`, caminho a conferir) e abre a issue.
- [ ] **78–80.** 🤖 Corrigir em *branch*, PR, CI verde, *merge*, Release numerada, atualizar `DECISOES` e o roadmap. Esforço: o do passo que produziu a parte com defeito (§2, regra 6).

### Validação do conteúdo (quando o usuário responder)
- 🤖 `médio` Registrar "V-xxxxxx ok" em `tools/validacao/status.json` e gerar o registro de novo.
- 🤖 `alto` Corrigir uma entrada marcada "errado": mudar o conteúdo, conferir no PDF e gerar o registro de novo.

### Etapa I — fotos → modelos 3D (quando chegar uma foto)
- [ ] **I1.** 👤 U1 manda a foto: objeto inteiro, de frente e de lado, fundo limpo e, se der, uma medida conhecida; sem pessoas, placas de veículo ou documentos.
- [ ] **I2.** 🤖 `médio` Script `art/blender/<objeto>.py` (`CLAUDE.md` §6): `.glb` e prévia `.png`.
- [ ] **I3.** 👤 U1 responde "parece / não parece".
- [ ] **I4.** 🤖 `médio` Integrar ao catálogo e ao ambiente, dentro do orçamento de polígonos (`00_INDICE` §3.3).
