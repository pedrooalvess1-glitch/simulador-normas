# CLAUDE.md — regras permanentes do projeto `simulador-normas`

> Lido no início de toda sessão de agente (Claude Code local ou na nuvem). `AGENTS.md` aponta para este arquivo.
> Estado atual: `docs/STATUS_SIMULADOR_NR10.md`. Próximos passos e regra de autonomia: `docs/PROXIMA_SESSAO.md`. Passos da Trilha 2: `docs/01_PASSO_A_PASSO_INICIO_CLAUDE_CODE.md`.

## 1. O projeto em 10 linhas
1. Simulador 3D didático e gamificado de normas regulamentadoras; o primeiro pacote é a **NR-10**.
2. **Edição única:** só a NR-10 da **Portaria MTE 737/2026**. Nada de redação de 2004, seletor de edição ou mapeamento entre redações.
3. **Norma é dado, não código:** nenhum número de item, sequência ou faixa dentro de cena, missão ou script do motor.
4. **Fidelidade:** texto da norma só do PDF em `docs/referencias/portaria-mte-no-737-nova-nr-10.pdf`, literal e com o número do item. Interpretação do simulador vai rotulada.
5. **Trilha 1 (prioridade até a prova de 13/12/2026):** protótipo three.js em `prototipo/`, usado para estudar.
6. **Trilha 2:** projeto permanente em **Godot 4.7.2** (renderizador Compatibility), em `engine/` (motor genérico) e `packs/nr10/` (conteúdo).
7. Estilo visual: low-poly, **cores chapadas, sem texturas, sem sombras em tempo real**; clareza acima de realismo.
8. Alvo de desempenho: GPU integrada (Radeon R5 via ANGLE/D3D11), 7,5 GB de RAM, pouco disco livre.
9. Campanha antes do Modo Livre; os esquemas de missão já servem aos dois.
10. Planejamento completo em `docs/00_INDICE_E_DECISOES_INFRAESTRUTURA.md`; decisões em `docs/DECISOES.md`.

## 2. Quem faz o quê
- **O usuário faz só quatro coisas:** U1 manda fotos de objetos e aprova a prévia do modelo 3D; U2 usa e testa o simulador e conta o que estranhou; U3 concede permissões (abre a sessão, escolhe o modo, faz login do GitHub); U4 responde perguntas essenciais.
- **O agente faz todo o resto**, com permissão total: documentos, código, testes, Blender por script, Godot por linha de comando, Git, PR, *merge*, CI, Releases e issues (a partir dos relatos do U2).
- **Pergunte só o essencial** (decisão que só o usuário pode tomar, ou irreversível). O resto: decida, registre como [INFERÊNCIA] em `docs/DECISOES.md` e siga.
- **Trabalho contínuo:** a um "continue", siga o backlog de `docs/PROXIMA_SESSAO.md` §3 sem pedir aprovação a cada passo; pare só nos pontos P1–P4 de `PROXIMA_SESSAO` §1.

## 3. Regras fixas
1. Trabalhe **só** em `C:\projetos\simulador-normas`, `C:\ferramentas` e `C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT` (no computador do usuário). Outras pastas, só com pedido explícito.
2. Todo trabalho em *branch* + PR; *merge* (squash) **só com CI verde**. Nunca `push --force` na `main` nem reescrita de histórico.
3. Sessão Local: comece com `git fetch origin` e sincronize com `origin/main` (o GitHub é a fonte da verdade). Antes de `reset --hard`, confira se não há trabalho local que só exista ali.
4. Repositório **público**: nunca comitar tokens, `.env`, credenciais, fotos do usuário (`art/fotos/` fica fora do Git) ou dados pessoais.
5. Nunca escreva ou corrija texto da NR-10 de memória. Rode `tools/conferir_itens_portaria.py` depois de mexer em documentos ou em `REF`.
6. Rótulos: **[FONTE]**, **[PRÁTICA]**, **[INFERÊNCIA]**, **[INTERPRETAÇÃO]**, **[VERIFICAR]**, **[VERIFICAR NA PORTARIA]**.
7. Até 13/12/2026, quando o limite de uso apertar, a Trilha 1 tem prioridade.
8. Limpe *builds* e arquivos temporários que não vão para o Git (disco curto no notebook).
9. Os `.md` descrevem **só o estado atual** e os próximos passos: sem tabela de revisões, sem "versão anterior", sem comparação com o passado. Atualize o texto no lugar; o histórico fica no Git.

## 4. Estrutura
```
docs/            planejamento (.md), DECISOES, PENDENCIAS, CONFERENCIA_ITENS; referencias/ (PDF da Portaria)
prototipo/       Trilha 1: simulador three.js (fontes, build.py, tools/teste_playwright.py, dist/)
art/             blender/ (scripts .py) · glb/ · previews/ · fotos/ (local, ignorada)
engine/          Trilha 2: motor genérico Godot (não conhece a NR-10)
packs/nr10/      Trilha 2: pacote de conteúdo da NR-10
tools/           conferir_itens_portaria.py e outras ferramentas
.github/         CI, modelos de issue e de PR
```

## 5. Comandos
```bash
# Protótipo (Trilha 1)
cd prototipo && python3 build.py && node --check bundle.js      # sintaxe
python3 build.py --offline && cp simulador-nr10-offline.html dist/   # HTML offline versionado
python3 tools/teste_playwright.py                                # teste headless (timeout ≥ 9 min)
# Conferência de itens contra o PDF
python3 tools/conferir_itens_portaria.py --pdf docs/referencias/portaria-mte-no-737-nova-nr-10.pdf --docs docs --refs prototipo --saida docs/CONFERENCIA_ITENS.md
# Godot (Trilha 2)
"C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT\Godot_v4.7.2-stable_win64_console.exe" --headless --version   # sessão Local
# Na nuvem/CI: executável Linux do Godot 4.7.2 baixado de github.com/godotengine/godot/releases
# Blender (modelos 3D)
blender --background --python art/blender/<objeto>.py           # caminho do executável: registrar aqui no passo 34
```
Não comitar `prototipo/bundle.js`, `prototipo/simulador-nr10*.html` (fora de `dist/`) nem `prototipo/tools/shots/`.

## 6. Pipeline foto → modelo 3D
1. Foto chega na conversa ou em `art/fotos/`.
2. Script `art/blender/<objeto>.py`: low-poly, cores da paleta, sem textura, escala real em metros, origem no chão.
3. Exporta `art/glb/<objeto>.glb`; renderiza `art/previews/<objeto>.png` (fundo neutro, 3/4 + frente).
4. Mostra a prévia ao usuário (U1: "parece / não parece") e só então integra ao catálogo.

## 7. Laço de trabalho
ler `STATUS` e `PROXIMA_SESSAO` → pegar o próximo item do backlog → *branch* → implementar → testar → PR → CI verde → *merge* → atualizar `STATUS`/`PROXIMA_SESSAO`/`DECISOES` → próximo item. Ao fim da sessão, avisar o usuário em poucas linhas e mandar o HTML offline novo.

## 8. Como falar com o usuário
Português do Brasil; termos técnicos em inglês quando forem do jargão. Respostas numeradas, ponto a ponto, explicando o mecanismo de cada decisão ("use X porque é melhor" não serve). Passos bem separados, sem escrita compacta. Ele conhece LLMs; não explique IA. Ele chama o assistente de "Claudinho".
