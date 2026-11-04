# NN — Título do documento

> Modelo dos documentos de planejamento (`00_INDICE` §5). Copie para `docs/NN_NOME_EM_MAIUSCULAS.md` (`CONVENCOES` §1), troque o título, preencha as seções na ordem e apague estas linhas de instrução (as do bloco `>` abaixo de cada título).
> Regras que valem para todas as seções: conteúdo só da NR-10 (R9, `00_INDICE` §1.4); texto da norma literal, do PDF, com o número do item; toda leitura do agente rotulada ([INTERPRETAÇÃO], [INFERÊNCIA], [VERIFICAR], [VERIFICAR NA PORTARIA]) e registrada como "a validar" (`CLAUDE.md` §3, regra 6); só o estado atual, com o mínimo de texto (`CLAUDE.md` §3, regra 8). Termos do projeto: `GLOSSARIO_DO_PROJETO.md`.

**Estado:** rascunho | pronto (pronto = todos os critérios da §10 cumpridos) · **Esforço:** `médio` | `alto` | `extra` (`ROTEIRO` §2)

## 1. Objetivo
> Uma ou duas frases: que pergunta do projeto este documento responde e quem o usa (outro documento, um módulo do motor, o pacote).

## 2. Escopo e limites
> O que está dentro e, em lista separada, o que fica fora (e em qual documento isso é tratado).

## 3. Itens da NR-10 envolvidos
> **Campo obrigatório**, mesmo nos documentos do motor genérico. Tabela com uma linha por item, anexo, termo do glossário ou artigo da Portaria que o documento usa, e o papel dele aqui. Se o documento não usa nenhum, escreva "Nenhum: o documento é genérico; o conteúdo normativo entra pelo pacote (documento 14)" e diga onde o pacote se liga a ele.

| Item / anexo / termo | Papel neste documento | Rótulo |
|---|---|---|
| 10.x.y | O que vira (gate, consequência, verificação, campo de dado, cenário) | [FONTE] / [INTERPRETAÇÃO] |

## 4. Dependências
> Documentos que precisam estar prontos antes (e o que se usa de cada um) e documentos que dependem deste.

## 5. Contratos e esquemas
> Formatos de dados, sinais (eventos), funções públicas e arquivos que outros módulos consomem. Esquema em JSON Schema ou em tabela campo · tipo · obrigatório · descrição. Nomes conforme `CONVENCOES` §2–§3.

## 6. Decisões
> Cada decisão com o mecanismo que a justifica (não basta "é melhor"), as alternativas descartadas e a origem (usuário ou agente). Decisão de projeto também entra no índice `DECISOES.md`.

| Decisão | Mecanismo / motivo | Alternativas descartadas | Origem |
|---|---|---|---|

## 7. Exemplos
> Ao menos um exemplo completo e pequeno de cada contrato da §5, com dados reais do pacote NR-10 quando houver.

## 8. Casos de teste
> Casos que viram teste automático (gdUnit4, validação de esquema, conferência no PDF) ou teste no notebook. Formato: dado → ação → resultado esperado.

## 9. Perguntas abertas
> Só as que o agente não pode decidir sozinho (ponto P1 do `ROTEIRO`), cada uma com a opção recomendada. Pergunta respondida sai daqui e vira decisão na §6.

## 10. Critérios de pronto
> Lista verificável. Itens fixos (mantenha) e os específicos do documento.

- [ ] Todas as seções preenchidas; nenhuma instrução do modelo restante.
- [ ] §3 completa; conferência no PDF sem erro (`tools/conferir_itens_portaria.py --estrito`).
- [ ] Toda inferência sobre a norma rotulada e registrada para validação.
- [ ] Perguntas abertas respondidas pelo usuário ou registradas como pendência explícita (`ROTEIRO` §3, Etapa F).
- [ ] Links internos válidos (CI).
