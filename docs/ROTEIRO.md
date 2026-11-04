# Roteiro do projeto

> Passos do projeto, ordem de execução e regra de autonomia. Lido em toda sessão, junto com `CLAUDE.md` e `docs/STATUS_SIMULADOR_NR10.md`.
> 🤖 = passo do agente · 👤 = passo do usuário (U1–U4 do `CLAUDE.md` §2).

---

## 1. Regra de autonomia

O usuário não aprova passo a passo. A um "continue" (ou qualquer pedido de trabalho), o agente segue os passos pendentes na ordem da §2, um PR por item, até acabar o limite da sessão ou chegar a um **ponto de parada**:

| # | Situação | O que o agente faz |
|---|---|---|
| P1 | Decisão que só o usuário pode tomar: conteúdo que a banca cobra, gosto didático, prioridade que mude o que ele recebe | Pergunta em uma frase, com a opção recomendada, e segue com o que não depende da resposta |
| P2 | Ação que não dá para desfazer: apagar Artifact, *branch* ou arquivo que não seja dele; reescrever histórico; publicar fora do repositório | Prepara tudo, descreve a ação e espera o "sim" |
| P3 | Precisa do usuário fisicamente: foto (U1); notebook ligado e aprovação de acesso (U3) | Pede só isso e segue com outro item |
| P4 | CI vermelho que não consegue consertar após 3 tentativas, ou texto da norma que não bate com o PDF | Para o item, explica a causa e passa ao seguinte |

Fora desses casos, o agente decide, registra a decisão em `docs/DECISOES.md` quando ela for de projeto, e segue. Ao fim da sessão, avisa em poucas linhas o que entrou na `main`.

**Para abrir uma sessão:** anexar o repositório e escrever "Claudinho, continue o simulador-normas." Para mudar o foco, dizer só o objetivo (ex.: "comece pelo documento 14").

---

## 2. Ordem de execução

**E (infraestrutura do repositório) → F (documentos) → D (ambiente de execução) → G (esqueleto Godot e fatia vertical) → H (ciclo de correção).** As ferramentas só são instaladas depois do planejamento, para que a configuração siga os documentos (decisão 20). A Etapa I acontece quando chegar uma foto. A Trilha 1 está congelada (melhorias registradas no `prototipo/README.md` §4).

Concluídas: **A** (contas: GitHub com 2FA, repositório público MIT, Claude Pro), **B** (ferramentas no notebook, `STATUS` §3; o passo 17 mediu o Compatibility na R5 e originou a decisão 4) e **C** (repositório, PDF da Portaria em `docs/referencias/`, protótipo, CI), exceto o passo 27.

---

## 3. Passos pendentes

### Etapa C
- [ ] **27.** 🤖 Criar os rótulos `bug`, `conteudo-norma`, `desempenho`, `didatica`, `docs`, `ideia`, `trilha-1`, `trilha-2`, `arte` (API REST; se o *proxy* recusar, no passo 34).

### Etapa E — infraestrutura do repositório (um PR para o conjunto)
- [ ] **43.** 🤖 `docs/_MODELO_DOCUMENTO.md`: o formato da `00_INDICE` §5, com o campo obrigatório "Itens da NR-10 envolvidos".
- [ ] **38.** 🤖 `docs/CONVENCOES.md`: nomes de arquivos e de nós; código em inglês e textos ao jogador em português; mensagens de commit; numeração de versões do motor e do pacote.
- [ ] **39.** 🤖 `docs/GLOSSARIO_DO_PROJETO.md`: motor, pacote, missão, capítulo, fase F1–F8, verbo, *gate*, consequência, severidade, debrief, fatia vertical, trilha, remissão.
- [ ] **40–41.** 🤖 Modelos de issue (`bug`, `conteudo-norma`, `desempenho`) e de PR em `.github/`.
- [ ] **42b.** 🤖 CI: checar links internos quebrados entre os `.md`.

### Etapa F — documentos de planejamento (um PR por documento)
- [ ] **47–63.** 🤖 Os documentos da `00_INDICE` §5, na ordem da §5.4. Para cada um: ler `CLAUDE.md`, a `00_INDICE`, `DECISOES` e os documentos já escritos; escrever no formato do `_MODELO_DOCUMENTO`; conteúdo só da NR-10 (R9); toda inferência sobre a norma marcada e registrada para validação (`00_INDICE` §1.4); rodar a conferência no PDF; PR e *merge* com CI verde.
- [ ] **64.** 🤖 Revisão cruzada de `docs/`: contradições, lacunas, dependências circulares. O `PLANO_V3` e a `ARQUITETURA` são absorvidos pelos documentos 01, 02, 05, 11, 14, 15 e 16 e retirados do repositório.

### Etapa D — ambiente de execução
- [ ] **29.** 🤖 Pedir acesso (👤 U3 aprova uma vez): `C:\projetos` e a pasta do Godot pela ponte; controle da tela para o executável de teste, o Godot e o navegador. Criar `C:\projetos\simulador-normas-testes`.
- [ ] **30.** 🤖 Godot na nuvem: baixar o 4.7.2 para Linux e os *export templates*, rodar `--headless --version`, fixar versão e soma de verificação no CI. Conferir na documentação oficial: requisitos mínimos do Compatibility, nomes das APIs de diagnóstico de GPU e de memória de vídeo (painel F3), limitações da exportação web.
- [ ] **31.** 🤖 Blender na nuvem: instalar o `bpy`, exportar um cubo `.glb`, renderizar a prévia sem GPU; fixar a versão (o PyPI oferece a série 5.x; o notebook tem a 4.5.10 LTS) e registrar no `CLAUDE.md`.
- [ ] **32.** 🤖 gdUnit4: definir como entra no projeto (o *proxy* da nuvem bloqueia páginas de repositórios de terceiros no GitHub; o CI não tem esse bloqueio).
- [ ] **33.** 🤖 Teste no notebook: exportar um `.exe` trivial, copiá-lo para a pasta de testes, abrir pelo controle da tela, ler o FPS e apagar. Testar também capturas de cena na nuvem por renderização de software.
- [ ] **34.** 🤖 GitHub pelo navegador do usuário: proteger a `main` exigindo os *checks* do CI (sem revisão humana) e apagar as *branches* já mescladas.

### Etapa G — esqueleto Godot e fatia vertical
- [ ] **65–68.** 🤖 Projeto Godot (Compatibility, 4.7.2), gdUnit4, CI de testes, CI de exportação do `.exe` Windows.
- [ ] **69.** 🤖 Abrir o primeiro `.exe` da Release no notebook e conferir se abre.
- [ ] **70–75.** 🤖 Camada base, motor de regras, solver elétrico, `act()` com 6 verbos, ambiente do Capítulo 0, Missão 0.
- [ ] **76.** 🤖 Jogar a Missão 0 no notebook e medir o FPS (painel F3). 👤 U2: jogar e dizer o que ficou confuso.

### Etapa H — ciclo de correção (repetido)
- [ ] **77.** 👤 U2 conta o problema na conversa; 🤖 o agente busca o log no notebook (`%APPDATA%\Godot\app_userdata\<projeto>\logs`, caminho a conferir) e abre a issue.
- [ ] **78–80.** 🤖 Corrigir em *branch*, PR, CI verde, *merge*, Release numerada, atualizar `DECISOES` e o roadmap.

### Etapa I — fotos → modelos 3D (quando chegar uma foto)
- [ ] **I1.** 👤 U1 manda a foto: objeto inteiro, de frente e de lado, fundo limpo e, se der, uma medida conhecida; sem pessoas, placas de veículo ou documentos.
- [ ] **I2.** 🤖 Script `art/blender/<objeto>.py` (`CLAUDE.md` §6): `.glb` e prévia `.png`.
- [ ] **I3.** 👤 U1 responde "parece / não parece".
- [ ] **I4.** 🤖 Integrar ao catálogo e ao ambiente, dentro do orçamento de polígonos (`00_INDICE` §3.3).
