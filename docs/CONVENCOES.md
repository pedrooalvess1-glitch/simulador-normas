# Convenções do projeto

> Nomes, idioma, commits e versões. Vale para `engine/`, `packs/`, `art/`, `tools/` e `docs/`. A Trilha 1 (`prototipo/`) mantém as convenções que já tem. Termos: `GLOSSARIO_DO_PROJETO.md`.

## 1. Arquivos e pastas

| O quê | Formato | Exemplo |
|---|---|---|
| Pastas | `snake_case`, sem acento | `engine/domain/`, `packs/nr10/envs/` |
| Documento de planejamento | `NN_NOME_EM_MAIUSCULAS.md` (número da `00_INDICE` §5, dois dígitos) | `01_VISAO_E_PEDAGOGIA.md` |
| Documento de apoio | `NOME_EM_MAIUSCULAS.md`; modelos com `_` no início | `CONVENCOES.md`, `_MODELO_DOCUMENTO.md` |
| Script GDScript | `snake_case.gd`, um `class_name` em `PascalCase` por script | `energy_solver.gd` → `class_name EnergySolver` |
| Cena e recurso Godot | `snake_case.tscn` / `.tres`, mesmo nome do script raiz | `qdc_residencial.tscn` |
| Dado do pacote | `snake_case.json` | `packs/nr10/rules/desenergizacao.json` |
| Teste | `test_<alvo>.gd`, numa pasta `tests/` que espelha a do alvo (a raiz do projeto Godot é fixada no documento 02) | `tests/domain/test_energy_solver.gd` |
| Modelo 3D | `<objeto>.py` (script Blender), `<objeto>.glb`, `<objeto>.png` (prévia) com o mesmo nome | `art/blender/seccionadora_mt.py` |
| Ferramenta | `snake_case.py` ou `.sh`, nome em português (verbo + objeto) | `tools/conferir_itens_portaria.py`, `tools/ambiente/instalar_godot.sh` |

Sem espaço, acento ou maiúscula em nome de arquivo de código, dado ou arte: o Godot importa caminhos sensíveis a maiúsculas na exportação, e o Windows não.

## 2. Nós e cenas no Godot

1. Nome de nó em `PascalCase`, descrevendo o papel: `Detector`, `PortaPainel`, `HUD`.
2. Nó que representa um item do catálogo leva o ID do item nos metadados (`set_meta("item_id", ...)`), não no nome: o nome é para quem lê a árvore, o ID é para o motor.
3. Grupos em `snake_case` no plural: `interactables`, `energy_sources`.
4. Sinais em `snake_case`, no passado, nomeando o fato: `act_done`, `gate_blocked`, `hazard_triggered`.

## 3. Idioma

| Onde | Idioma | Motivo |
|---|---|---|
| Código do motor e do pacote (identificadores, comentários, mensagens de log) | Inglês | Padrão da API do Godot e da documentação que o agente consulta; evita mistura dentro da mesma linha |
| Ferramentas de `tools/` | Português | São lidas pelo usuário e já existem assim; não entram no executável |
| IDs de dado do pacote (`item_id`, `rule_id`, verbos) | Inglês, `snake_case`, só ASCII (decisão 28) | São chaves comparadas pelo código; o texto mostrado ao jogador vem de outro campo, em português. Os nomes de verbo em português do `ARQUITETURA` (protótipo em JS) viram rótulos de exibição |
| Texto ao jogador (interface, diálogo, debrief, cartões) | Português do Brasil | Público e norma em português |
| Texto da norma | Literal do PDF da Portaria MTE 737/2026 | Fidelidade (`CLAUDE.md` §1) |
| Documentos `docs/`, issues, PRs, commits | Português do Brasil | Leitura do usuário |

Todo texto ao jogador fica em arquivos de dado do pacote ou de tradução, nunca em string dentro de script do motor (documento 22).

## 4. Mensagens de commit e títulos de PR

Formato `tipo(escopo): resumo no imperativo`, em português, até 72 caracteres; corpo opcional explicando o porquê.

| Tipo | Uso |
|---|---|
| `feat` | Funcionalidade nova no motor ou no pacote |
| `fix` | Correção de defeito |
| `docs` | Só documentação |
| `content` | Conteúdo da norma no pacote (dado, texto, ligação item ↔ objeto) |
| `art` | Modelo 3D, script Blender, prévia |
| `perf` | Desempenho (FPS, memória, carga) |
| `test` | Só testes |
| `ci` | Workflows, modelos de issue e de PR |
| `chore` | Manutenção sem efeito no comportamento |

Escopos usuais: `engine`, `nr10`, `prototipo`, `docs`, `art`, `tools`, `ambiente`, `ci`. Os títulos sugeridos nos modelos de issue (`fix:`, `content(nr10):`, `perf:`) seguem a mesma tabela. PR mesclado por *squash*: o título do PR vira o commit na `main`, então ele segue o mesmo formato. Commits do agente terminam com as linhas de coautoria da sessão.

## 5. Versões

Versionamento semântico `MAIOR.MENOR.CORREÇÃO`, separado para o motor e para cada pacote.

| Parte | Tag no Git | Sobe MAIOR quando | Sobe MENOR quando | Sobe CORREÇÃO quando |
|---|---|---|---|---|
| Motor | `engine-vX.Y.Z` | Muda um contrato que os pacotes usam (esquema, sinal, verbo) | Recurso novo compatível | Correção sem mudar contrato |
| Pacote NR-10 | `nr10-vX.Y.Z` | Muda o esquema dos dados ou o significado de uma regra já publicada | Conteúdo novo (item, missão, ambiente) | Correção de texto ou de dado |
| Release do aplicativo (motor + pacote) | `vX.Y.Z` | O motor ou o pacote sobe MAIOR | O motor ou o pacote sobe MENOR | Só CORREÇÃO em um deles |

1. Antes da 1.0, MENOR pode quebrar contrato (fase de fatia vertical).
2. O pacote declara a faixa de versões do motor com que funciona; o motor recusa pacote fora da faixa.
3. A versão do pacote é número de release dos dados, nunca edição da norma (`00_INDICE` §1.1).
4. Toda missão gravada leva `(versão do pacote, versão do motor, semente)` (`00_INDICE` §2, princípio 5).
5. Versões de ferramentas (Godot, Blender, gdUnit4) ficam fixadas num só lugar, `tools/ambiente/versoes.env`, lido pelos instaladores e pelo CI.
