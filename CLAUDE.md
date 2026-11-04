# CLAUDE.md — regras permanentes do projeto `simulador-normas`

> Lido no início de toda sessão do Claude Code. Todo o projeto é conduzido no Claude Code; não há outro agente.
> Estado: `docs/STATUS_SIMULADOR_NR10.md`. Passos, ordem, esforço e regra de autonomia: `docs/ROTEIRO.md`. Planejamento: `docs/00_INDICE_E_DECISOES_INFRAESTRUTURA.md`. Decisões: `docs/DECISOES.md`.

## 1. O projeto em resumo
1. Simulador 3D didático e gamificado de normas regulamentadoras; o primeiro pacote é a **NR-10**.
2. **Edição única:** só a NR-10 da **Portaria MTE 737/2026**.
3. **Conteúdo só da NR-10:** o que o simulador ensina, cobra e corrige precisa de um item da NR-10. Remissão a outra norma aparece só como remissão; valores de outras normas e práticas de concessionária ficam fora (`00_INDICE` §1.4).
4. **Norma é dado, não código:** nenhum número de item, sequência ou faixa dentro de cena, missão ou script do motor.
5. **Fidelidade:** texto da norma só do PDF em `docs/referencias/portaria-mte-no-737-nova-nr-10.pdf`, literal e com o número do item.
6. **Projeto principal (Trilha 2, foco atual):** **Godot 4.7.2** (renderizador Compatibility), em `engine/` (motor genérico) e `packs/nr10/` (conteúdo). Fase atual: **planejamento**.
7. **Trilha 1 (congelada):** protótipo three.js em `prototipo/`; só muda a pedido do usuário.
8. Estilo visual: low-poly, **cores chapadas, sem texturas, sem sombras em tempo real**.
9. Alvo de desempenho: GPU integrada (Radeon R5 via ANGLE/D3D11), 7,5 GB de RAM, pouco disco livre.

## 2. Quem faz o quê e onde
- **O usuário faz só quatro coisas:** U1 manda fotos de objetos e aprova a prévia do modelo 3D; U2 usa o simulador e conta o que estranhou; U3 concede acesso (notebook ligado com o app Claude Desktop aberto quando avisado; aprova os pedidos de acesso); U4 responde perguntas essenciais e valida o conteúdo (`docs/VALIDACAO_DO_CONTEUDO.md`).
- **O agente faz todo o resto**, com permissão total, e pergunta só o essencial (decisão que só o usuário pode tomar, ou irreversível). A um "continue", segue o `ROTEIRO` sem pedir aprovação a cada passo, só nos passos do esforço escolhido para a sessão (Opus 5.5; `médio`, `alto` ou `extra`, `ROTEIRO` §2), e para só nos pontos P1–P4 (`ROTEIRO` §1).

| Ambiente | Para quê |
|---|---|
| **Sessão na nuvem** (Claude Code no claude.ai, repositório anexado) — principal | Documentos, código, Git e PRs; Godot 4.7.2 para Linux *headless* (importar, testar, exportar o `.exe`); Blender como módulo `bpy`; Python, Node e Playwright. Não depende do notebook. |
| **GitHub Actions** | CI a cada PR; testes e exportação do Godot; Releases. |
| **Notebook do usuário**, a partir da sessão na nuvem | Arquivos pela ponte do app Claude Desktop; tela pelo controle de aplicativos (abrir o `.exe`, ler o painel F3); navegador logado no GitHub para o que a API não permite. |
| **Sessão Local** (Claude Desktop → aba *Code*) | Reserva, se algum passo exigir terminal no Windows. |

## 3. Regras fixas
1. No notebook, só as pastas `C:\projetos\simulador-normas-testes`, `C:\projetos\simulador-normas`, `C:\ferramentas` e `C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT`, e só os aplicativos do projeto (executável de teste, Godot, navegador no GitHub).
2. Todo trabalho em *branch* + PR; *merge* (squash) **só com CI verde**. Nunca `push --force` na `main` nem reescrita de histórico.
3. **Planejamento antes das ferramentas:** as versões já estão fixadas e testadas na nuvem (decisão 25); nada de criar o projeto Godot, configurar o notebook ou escolher ajustes de motor antes de concluída a Etapa F, salvo pedido do usuário.
4. Repositório **público**: nunca comitar tokens, `.env`, credenciais, fotos do usuário (`art/fotos/` fica fora do Git) ou dados pessoais.
5. Nunca escreva ou corrija texto da NR-10 de memória. Rode `tools/conferir_itens_portaria.py` depois de mexer em documentos ou em `REF`.
6. **Inferência é provisória:** toda resposta, explicação ou ligação item ↔ objeto escrita pelo agente é inferência até o usuário validar. Na dúvida, marque [INTERPRETAÇÃO] ou [VERIFICAR NA PORTARIA] e deixe a entrada "a validar" no registro de validação (`tools/validacao/`).
7. Rótulos: **[FONTE]**, **[PRÁTICA]** (só cenário, nunca cobrado), **[INFERÊNCIA]** (decisão de projeto), **[INTERPRETAÇÃO]** (leitura da norma), **[VERIFICAR]**, **[VERIFICAR NA PORTARIA]**.
8. Os `.md` descrevem **só o estado atual** e os próximos passos, com o mínimo de texto: cada assunto num só lugar, sem tabela de revisões nem comparação com o passado. O histórico fica no Git.
9. Limpe *builds* e arquivos temporários; no notebook, apague os executáveis de teste que saírem de uso.
10. Limites da sessão na nuvem: sem API GraphQL do GitHub, sem mudar configurações do repositório e sem apagar *branches*. PR pela API REST (`gh api repos/pedrooalvess1-glitch/simulador-normas/pulls --input pr.json`); o resto pelo navegador do usuário (passo 34).

## 4. Estrutura
```
docs/            00_INDICE (entrada), ROTEIRO, STATUS, DECISOES, CONVENCOES, GLOSSARIO_DO_PROJETO, _MODELO_DOCUMENTO, documentos-base; gerados: CONFERENCIA_ITENS, VALIDACAO_DO_CONTEUDO
docs/referencias/ PDF da Portaria MTE 737/2026 (fonte de verdade)
prototipo/       Trilha 1 (congelada), documentada no próprio README
art/             blender/ (scripts .py) · glb/ · previews/ · fotos/ (local, ignorada)
engine/          Trilha 2: motor genérico Godot (não conhece a NR-10)
packs/nr10/      Trilha 2: pacote de conteúdo da NR-10
tools/           conferir_itens_portaria.py · checar_links.py · validacao/ (gerador do registro de validação)
.github/         CI · modelos de issue (bug, conteudo-norma, desempenho) e de PR
```

## 5. Comandos
```bash
# Conferência de itens contra o PDF (também no CI)
python3 tools/conferir_itens_portaria.py --pdf docs/referencias/portaria-mte-no-737-nova-nr-10.pdf --docs docs --refs prototipo --saida docs/CONFERENCIA_ITENS.md --estrito
# Links internos entre os .md (também no CI)
python3 tools/checar_links.py
# Registro de validação do conteúdo (Node + Playwright com Chromium)
python3 tools/validacao/gerar.py
# Protótipo: ver prototipo/README.md
# Ferramentas na nuvem (versões e somas em tools/ambiente/versoes.env; Godot também no CI)
GODOT=$(tools/ambiente/instalar_godot.sh | tail -1)            # + --templates windows,linux para exportar
"$GODOT" --headless --path <projeto> --export-release "Windows Desktop" build/app.exe
BPY=$(tools/ambiente/instalar_bpy.sh | tail -1)                # Blender 4.5.10 LTS como módulo (Python 3.11)
"$BPY" art/blender/<objeto>.py                                  # teste do pipeline: tools/ambiente/teste_blender.py
tools/ambiente/instalar_gdunit4.sh <projeto>                    # addon gdUnit4 v6.2.3 em addons/gdUnit4
GODOT_BIN="$GODOT" <projeto>/addons/gdUnit4/runtest.sh --headless --ignoreHeadlessMode -a res://tests
# Captura de cena sem GPU (renderização de software, Mesa llvmpipe)
LIBGL_ALWAYS_SOFTWARE=1 xvfb-run -a "$GODOT" --path <projeto> --rendering-driver opengl3 -- <argumentos da cena>
```
Versões fixadas: **Godot 4.7.2** (`4.7.2.stable.official.ed1daf0bf`), **Blender/bpy 4.5.10 LTS** (a mesma do notebook), **gdUnit4 v6.2.3**. O gdUnit4 recusa o modo *headless* sem `--ignoreHeadlessMode`; testes que dependem de `InputEvent` não funcionam *headless*. A prévia do Blender no Workbench usa `material.diffuse_color`; o glTF usa a *Base Color* do Principled BSDF: o script define as duas.

## 6. Pipeline foto → modelo 3D
1. Foto chega na conversa (guardada em `art/fotos/`, fora do Git).
2. Script `art/blender/<objeto>.py`: low-poly, cores da paleta, sem textura, escala real em metros, origem no chão.
3. Exporta `art/glb/<objeto>.glb`; renderiza `art/previews/<objeto>.png` (fundo neutro, 3/4 + frente).
4. Mostra a prévia ao usuário (U1) e só então integra ao catálogo.

## 7. Laço de trabalho
ler `STATUS` e `ROTEIRO` → pegar o próximo passo do esforço da sessão → *branch* → implementar → testar → PR → CI verde → *merge* → atualizar `STATUS`, `ROTEIRO` e `DECISOES` → próximo passo. Na Trilha 2, cada Release é testada no notebook pelo agente. Ao fim da sessão, avisar o usuário em poucas linhas.

## 8. Como falar com o usuário
Português do Brasil; termos técnicos em inglês quando forem do jargão. Respostas numeradas, ponto a ponto, explicando o mecanismo de cada decisão ("use X porque é melhor" não serve). Passos bem separados, sem escrita compacta. Ele conhece LLMs; não explique IA. Ele chama o assistente de "Claudinho".
