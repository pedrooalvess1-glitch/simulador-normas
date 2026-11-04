# Próxima sessão: o que fazer e como trabalhar

> Lido no início de toda sessão, junto com `CLAUDE.md` e `docs/STATUS_SIMULADOR_NR10.md`.
> Descreve só o que vem a seguir. O que já existe está no `STATUS`; o histórico, no Git.

---

## 1. Regra de autonomia (vale para toda sessão)

O usuário **não** aprova passo a passo. Quando ele diz "continue" (ou qualquer pedido de trabalho), o agente executa o backlog da §3 na ordem, um PR por item, até acabar o limite da sessão ou chegar a um **ponto de parada**.

**Pontos de parada (só estes interrompem o trabalho):**

| # | Situação | O que o agente faz |
|---|---|---|
| P1 | Decisão que só o usuário pode tomar: conteúdo que a banca cobra, gosto didático, prioridade entre itens que mude o que ele recebe | Pergunta em uma frase, com a opção recomendada, e segue com o próximo item que não depende da resposta |
| P2 | Ação que não dá para desfazer: apagar Artifact, *branch* ou arquivo que não seja dele; reescrever histórico; publicar fora do repositório | Prepara tudo, descreve a ação e espera o "sim" |
| P3 | Precisa do usuário fisicamente (U1 foto ou "parece / não parece"; U3 notebook ligado e aprovação de acesso) | Pede só isso e segue com outro item |
| P4 | CI vermelho que não consegue consertar após 3 tentativas, ou texto da norma que não bate com o PDF | Para o item, explica a causa e passa ao seguinte |

Fora desses casos, o agente decide, registra como [INFERÊNCIA] em `docs/DECISOES.md` quando for uma decisão de projeto, e segue. Ao fim, avisa em poucas linhas o que entrou na `main`.

---

## 2. Onde cada tipo de trabalho roda

| Trabalho | Ambiente | Por quê |
|---|---|---|
| Documentos, código, Git, PR, *merge* | **Sessão na nuvem** (claude.ai com o repositório anexado) | Tem Linux, Python, Node e acesso de escrita ao GitHub; não depende do notebook ligado. |
| Godot *headless* (importar, testar, exportar o `.exe`) e Blender (`bpy`) | **Sessão na nuvem** e **CI** (a partir da Etapa D) | O Godot 4.7.2 para Linux, os *export templates* e o `bpy` são baixáveis pela rede da sessão; o notebook não gasta RAM nem disco. |
| Desempenho real e conferência visual na Radeon R5 | **Notebook**, operado a partir da sessão na nuvem (arquivos pela ponte; tela pelo controle de aplicativos) | Só o hardware real mostra o FPS que vale. Exige o notebook ligado e o app Claude Desktop aberto (U3). |
| Proteger a `main`, apagar *branches*, configurações do repositório | **Navegador do usuário**, operado pelo agente | O *proxy* da sessão na nuvem bloqueia essas chamadas da API. |
| Terminal no Windows | **Sessão Local** (Claude Desktop → aba Code) | Reserva; nenhum passo planejado depende dela. |

Fase atual: **planejamento**. Nada de instalar ou configurar ferramentas antes do fim da Etapa F (decisão 20).

---

## 3. Backlog do projeto principal (em ordem)

1. **Passo 27:** criar os rótulos do repositório (`bug`, `conteudo-norma`, `desempenho`, `didatica`, `docs`, `ideia`, `trilha-1`, `trilha-2`, `arte`) pela API REST.
2. **Etapa E — infraestrutura do repositório**, um PR para o conjunto:
   - `docs/_MODELO_DOCUMENTO.md` (passo 43): o formato da `00_INDICE` §5, com campo obrigatório "Itens da NR-10 envolvidos" e as regras de escopo (R9);
   - `docs/CONVENCOES.md` (passo 38);
   - `docs/GLOSSARIO_DO_PROJETO.md` (passo 39);
   - modelos de issue e de PR em `.github/` (passos 40–41);
   - CI: checar links internos quebrados entre os `.md` (passo 42b).
3. **Etapa F — documentos de planejamento**, um PR por documento, na ordem da `00_INDICE` §5.4: 01 → 14 → 04 → 05 → 11 → 15 → 07 → 09 → 08 → 13 → 02 → 03 → 06 + 18 → 16 + 12 → 17 → 21 → 22–25 → revisão cruzada (passo 64, que absorve e retira o `PLANO_V3` e a `ARQUITETURA`).
4. **Etapa D — ambiente de execução** (passos 29–34), só depois da Etapa F. Começa com um ponto de parada P3: pedir ao usuário o notebook ligado e a aprovação de acesso.
5. **Etapa G — esqueleto Godot e fatia vertical** (passos 65–76).

Cada item: *branch* → escrever → conferência no PDF (`tools/conferir_itens_portaria.py --estrito`) → PR → CI verde → *merge* → atualizar `STATUS`, este arquivo e `DECISOES` quando houver decisão nova.

---

## 4. Trilha 1 (protótipo de estudo): congelada

O HTML offline (`prototipo/dist/simulador-nr10-offline.html`) e o Artifact seguem disponíveis para estudo. As melhorias abaixo ficam registradas e **só são feitas se o usuário pedir**:

1. Treino: explicar por que cada alternativa errada está errada, citando o item.
2. Treino: levar o banco ao formato de banca (5 alternativas).
3. Questões ou cartões para os itens nunca exercitados (`STATUS` §7) e matriz item → tarefa.
4. Glossário (Anexo I): os 41 termos ausentes da base + ATPV, EBT e ELIM do Anexo IV, com texto literal do PDF.
5. Novas histórias: BT/SEC (QDC de prédio), canteiro de obra (instalação temporária, 10.2.1), SEP/linha.
6. Anexo III e notas do Quadro III do Anexo IV exercitados.
7. Exportar/importar o progresso (JSON).
8. Navegação: a aba "Mapa" sai da linha de fases em telas ≤ ~1400 px.
9. Limpeza do código morto listado no `STATUS` §4.4.

---

## 5. Regras que não podem falhar

1. Texto da NR-10 **só do PDF** (`docs/referencias/portaria-mte-no-737-nova-nr-10.pdf`), literal e com o número do item.
2. Edição única: só a Portaria MTE 737/2026.
3. Conteúdo só da NR-10 (R9): nada de outras normas além da remissão; [PRÁTICA] só como cenário.
4. Rótulos [FONTE], [PRÁTICA], [INFERÊNCIA], [INTERPRETAÇÃO], [VERIFICAR].
5. `prototipo/dist/simulador-nr10-offline.html` igual ao build, senão o CI reprova (vale enquanto o protótipo estiver no repositório).
6. Os `.md` descrevem só o estado atual e os próximos passos.
7. Resposta ao usuário: PT-BR, numerada, ponto a ponto, explicando o mecanismo de cada decisão (`CLAUDE.md` §8).

---

## 6. Como abrir a sessão

Anexe o repositório `pedrooalvess1-glitch/simulador-normas` e escreva:

```
Claudinho, continue o simulador-normas.
```

Para mudar o foco, diga só o objetivo, por exemplo: "continue, mas comece pelo documento 14" ou "retome a Trilha 1 pelo item 1".
