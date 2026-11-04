# Protótipo three.js (Trilha 1, congelada)

Ferramenta de estudo da NR-10 (Portaria MTE 737/2026). **Congelada:** só muda a pedido do usuário. Tudo o que o protótipo pergunta e responde está em `docs/VALIDACAO_DO_CONTEUDO.md`, para validação.

**Usar:** baixe [`dist/simulador-nr10-offline.html`](dist/simulador-nr10-offline.html) e abra com duplo clique (sem internet). A mesma versão está no Artifact `https://claude.ai/artifact/DB8sPFyo8WbQEGVVdmfjxD`. Existe um segundo link (`…/YJ357CT4K7ahbnstJkS3H6`) com uma versão desatualizada: não usar; apagar só com a confirmação do usuário.

## 1. Construir e testar

```bash
python3 build.py && node --check bundle.js     # bundle.js e simulador-nr10.html (formato do Artifact, three.js via cdnjs)
python3 build.py --offline                      # simulador-nr10-offline.html (three.js embutido)
cp simulador-nr10-offline.html dist/            # o CI reprova se dist/ for diferente do build
python3 tools/teste_playwright.py               # percorre todos os módulos, a Missão, tema escuro e 390 px; timeout ≥ 9 min
```
Não comitar `bundle.js`, `simulador-nr10*.html` fora de `dist/` nem `tools/shots/`.

## 2. Estrutura

A ordem dos capítulos da NR-10 segue a hierarquia de controle do 10.5.4, e o app segue essa ordem em fases:

| Fase | Pergunta | Módulos (id) | Capítulos |
|---|---|---|---|
| História (abre por padrão) | Como os itens aparecem numa atividade real? | `historia` (cabine 13,8 kV), `hist_qdc` (QDC de prédio, BT), `hist_obra` (canteiro, instalação temporária), `hist_sep` (rede de distribuição, SEP) | transversal |
| Mapa | Como a norma se organiza? | `mapa` | todos |
| I Aplicação | A NR-10 me alcança? Com que intensidade? | `enq` → `zonas` | 10.1, 10.2, Anexos I e II |
| II Controle | Como o risco é controlado, na ordem da hierarquia? | `projeto` → `coletiva` → `organizacao` → `pessoas` → `individual` | 10.3–10.11, Anexos III e IV |
| III Execução | Como se trabalha? | `desenergizado` → `energizado` | 10.12–10.14 |
| IV Prova | Como se comprova e o que paralisa? | `documentacao` | 10.15, 10.16 |
| Missão | Tudo junto (OS 0457, 12 decisões) | `missao` | transversal |
| Treino | Fixar: simulado, revisão espaçada (Leitner, 5 caixas), gerador (11 tipos), 42 cartões, painel. Formato de banca: 5 alternativas e o porquê de cada alternativa errada, com o item | `treino` | transversal |

Arquivos, na ordem de concatenação do `build.py` (importa para `const` globais): `refs.js` e `refs2.js` (base `REF`: texto da norma por item; `n:1` = nota do simulador), `engine.js` (motor 3D e interface), `qbank.js` (banco de questões, revisão espaçada, estatísticas), `mapa.js`, `m1.js`, `m7.js`, `m2.js`, `m4.js`, `m5.js`, `m3.js`, `m6.js`, `m8.js` (módulos), `missao.js`, `historia.js` (motor `makeStory` + história 1), `historias.js` (histórias 2 a 4), `banca.js` (camada de banca sobre o banco: alternativas até 5 e explicação `w` de cada errada, chaveada pelo ID da questão), `treino.js`, `main.js` (ordem visual em `ORDER`). `primers.py` guarda os textos dos primers. Licença do three.js r128 em `vendor/THREE-LICENSE.txt` (MIT). Progresso do aluno em `localStorage['nr10sim.v1']`; o botão **Progresso** exporta e importa esse objeto em JSON (`PROG`, em `qbank.js`).

## 3. Cobertura da base `REF`

| Medida | Resultado |
|---|---|
| Itens numerados no PDF / com texto na `REF` | 133 / 133 |
| Na `REF`, mas nunca exercitados | `10.2.4.1, 10.4.11, 10.7.10, 10.8.3.1, 10.8.4.1, 10.8.4.1.1, 10.10.1, 10.12.2` |
| Termos do glossário (Anexo I) | 57 na norma, 16 na `REF`; faltam também ATPV, EBT e ELIM do Anexo IV |
| Textos da `REF` não literais | 10.1.1 (cortado), 10.7.7 (`[a)]` repetido no texto publicado), 10.8.4 (prosa), 10.9.2 (Quadro I em linha), 10.15.4 e 10.15.7 (condensados), `AII`, `AIV-I/II/III` (tabelas em linha), `art5` (com nota) |
| Anexo III e notas do Quadro III do Anexo IV | Só resumidos |
| Ligações tracejadas do Mapa (`k:'t'`) | Interpretação do simulador, a validar |

## 4. Melhorias registradas (só se o usuário pedir; esforço do Opus 5.5 pelo critério do `docs/ROTEIRO.md` §2)

1. `alto` Exercitar os itens da tabela acima e montar a matriz item → tarefa.
2. `médio` Glossário: os 41 termos ausentes + ATPV, EBT e ELIM, com texto literal do PDF.
3. `alto` Anexo III e notas do Quadro III do Anexo IV exercitados.

## 5. Armadilhas técnicas

1. three.js r128 não tem `Texture.userData`: use uma propriedade própria (`tex.__keep=true`).
2. O CSS de classe sobrepõe atributos de apresentação SVG (`text-anchor`): use uma classe específica.
3. `.loading{display:grid}` vence o atributo `hidden`: por isso existe `[hidden]{display:none!important}`.
4. Materiais compartilhados quebram o destaque: `M()` cria sempre material novo.
5. Anexo IV: "painel" e "quadro de distribuição" são linhas diferentes da tabela.
6. O Artifact bloqueia `alert/confirm/prompt`, downloads e hosts fora da lista permitida.
7. Sem `<meta charset="utf-8">` os acentos quebram no arquivo local (o build offline já inclui).
8. Teste headless: renderização lenta; timeout ≥ 9 min e bloquear cdnjs e Google Fonts.
9. Comentário `//` dentro de linha concatenada engole o resto da linha: use `/* */`.
10. `const` usado antes da declaração entre arquivos quebra o app: respeite a ordem do `build.py`.
11. Retângulos de clique sobrepostos na cena SVG da História travam o teste Playwright: alvo grande (painel inteiro) fica fora da lista de alvos, e o rótulo fica dentro da área de clique.
12. Na caça a não conformidades, o `fx` de um alvo não pode esconder outro alvo da mesma caça (ex.: fechar a porta que mostra o que está dentro).
13. `bancaQ` casa as explicações `w` pelo texto da alternativa: mudar o texto de uma alternativa num módulo exige mudar a chave em `banca.js`.
