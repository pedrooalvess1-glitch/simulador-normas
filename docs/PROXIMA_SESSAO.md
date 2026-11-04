# Próxima sessão: o que fazer e como trabalhar

> Lido no início de toda sessão, junto com `CLAUDE.md` e `docs/STATUS_SIMULADOR_NR10.md`.
> Descreve só o que vem a seguir. O que já existe está no `STATUS`; o histórico, no Git.

---

## 1. Regra de autonomia (vale para toda sessão)

O usuário **não** aprova passo a passo. Quando ele diz "continue" (ou qualquer pedido de trabalho), o agente executa o backlog da §3 na ordem, um PR por item, até acabar o limite da sessão ou chegar a um **ponto de parada**.

**Pontos de parada (só estes interrompem o trabalho):**

| # | Situação | O que o agente faz |
|---|---|---|
| P1 | Decisão que só o usuário pode tomar: conteúdo que a banca cobra, gosto didático, prioridade entre itens do backlog que mude o que ele estuda | Pergunta em uma frase, com a opção recomendada, e segue com o próximo item que não depende da resposta |
| P2 | Ação que não dá para desfazer: apagar Artifact, *branch* ou arquivo que não seja dele; reescrever histórico; publicar fora do repositório | Prepara tudo, descreve a ação e espera o "sim" |
| P3 | Precisa do usuário fisicamente (U1 foto ou "parece / não parece"; U3 permissão, login, liberar pasta; U2 teste no notebook) | Pede só isso e segue com outro item |
| P4 | CI vermelho que não consegue consertar após 3 tentativas, ou texto da norma que não bate com o PDF | Para o item, explica a causa e passa ao seguinte |

Fora desses casos, o agente decide, registra como [INFERÊNCIA] em `docs/DECISOES.md` quando for uma decisão de projeto, e segue. Ao fim, avisa em poucas linhas o que entrou na `main` e manda o HTML offline novo.

---

## 2. Onde cada tipo de trabalho roda

| Trabalho | Sessão | Por quê |
|---|---|---|
| Protótipo (Trilha 1), documentos, CI, PR, *merge*, Artifact | **Nuvem** (chat do claude.ai com o repositório anexado) | Tem Linux com Python, Node e Playwright, acesso de escrita ao GitHub e publica o Artifact. Não depende do notebook ligado. |
| Godot em modo *headless* (importar projeto, rodar testes gdUnit4, exportar) | **Nuvem** ou **CI** | O executável Linux do Godot 4.7.2 é baixável do GitHub da Godot pela rede da sessão; o mesmo vale para o GitHub Actions. |
| Godot com janela, desempenho real na Radeon R5, Blender, qualquer `.exe` | **Local** (Claude Desktop → aba Code → pasta `C:\projetos\simulador-normas`) | Só a sessão Local roda comandos no Windows. A sessão na nuvem vê o computador só por arquivos (ler e copiar), sem terminal. |

Caminho do Godot no computador: `C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT`.

---

## 3. Backlog (ordem = o que mais ajuda a acertar questão de banca até 13/12/2026)

1. **Treino · distratores:** em toda questão, explicar por que cada alternativa errada está errada, citando o item.
2. **Treino · 5 alternativas:** levar o banco ao formato de banca (A–E).
3. **Itens nunca exercitados:** questões ou cartões para `10.2.4.1, 10.4.5, 10.4.11, 10.7.10, 10.8.3.1, 10.8.4.1, 10.8.4.1.1, 10.10.1, 10.12.2, 10.12.5, 10.12.7` e uma matriz item → tarefa (`STATUS` §7).
4. **Glossário (Anexo I):** os 41 termos ausentes da base + ATPV, EBT e ELIM do Anexo IV. Texto literal do PDF, nunca de memória.
5. **Histórias 2 e 3:** novas OS em outros ambientes, reaproveitando o formato `HS`/`ST`: BT/SEC (QDC de prédio), canteiro de obra (instalação temporária, 10.2.1) e, se der tempo, SEP/linha.
6. **Anexo III e Anexo IV Quadro III:** conteúdos mínimos dos treinamentos e notas de rodapé exercitados.
7. **Exportar/importar progresso** (JSON), para não perder o Treino ao trocar de navegador.
8. **Navegação:** a aba "Mapa" sai da linha de fases em telas ≤ ~1400 px.
9. **Limpeza:** remover o código morto listado no `STATUS` §4.4.

Cada item: *branch* → implementar → `python3 build.py --offline && cp simulador-nr10-offline.html dist/` → Playwright → conferência no PDF → PR → CI verde → *merge* → republicar o Artifact (mesmo link) → atualizar `STATUS` e este arquivo → mandar o HTML offline ao usuário.

Trilha 2 (Godot) só avança quando a Trilha 1 não tiver item pendente no limite de uso da sessão, ou se o usuário pedir. Passos pendentes dela: `docs/01_PASSO_A_PASSO_INICIO_CLAUDE_CODE.md`.

---

## 4. Regras que não podem falhar

1. Texto da NR-10 **só do PDF** (`docs/referencias/portaria-mte-no-737-nova-nr-10.pdf`), literal e com o número do item. Rodar a conferência depois de mexer em `REF` ou em `docs/`.
2. Edição única: só a Portaria MTE 737/2026.
3. Rótulos [FONTE], [PRÁTICA], [INFERÊNCIA], [INTERPRETAÇÃO], [VERIFICAR].
4. `prototipo/dist/simulador-nr10-offline.html` igual ao build, senão o CI reprova.
5. Não comitar `prototipo/bundle.js` nem `prototipo/simulador-nr10*.html` fora de `dist/`.
6. PR pela API REST (`gh api repos/pedrooalvess1-glitch/simulador-normas/pulls --input pr.json`); a GraphQL é bloqueada na sessão da nuvem.
7. Os `.md` descrevem só o estado atual e os próximos passos: nada de "rev", "versão anterior" ou "o que mudou" no texto.
8. Resposta ao usuário: PT-BR, numerada, ponto a ponto, explicando o mecanismo de cada decisão (`CLAUDE.md` §8).

---

## 5. Como abrir a sessão

Basta anexar o repositório `pedrooalvess1-glitch/simulador-normas` e escrever:

```
Claudinho, continue o simulador-normas.
```

Para mudar o foco, diga só o objetivo, por exemplo: "continue, mas comece pelo glossário" ou "o simulado errou a questão X".
