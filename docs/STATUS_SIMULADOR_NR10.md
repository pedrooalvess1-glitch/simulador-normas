# Estado do projeto

> Só o estado atual; o histórico fica no Git. Próximos passos: `docs/ROTEIRO.md`. Regras: `CLAUDE.md`.

## 1. Fase atual

**Planejamento do projeto principal (Godot)**: Etapas E e D concluídas (D antecipada, decisão 25). Próximo bloco: Etapa F (documentos). A Trilha 1 (protótipo de estudo) está congelada.

**Próximo passo:** documento 01 (Etapa F), Opus 5.5 com esforço `alto`.

## 2. O que existe

| Item | Estado |
|---|---|
| Repositório `pedrooalvess1-glitch/simulador-normas` | Público, MIT. O GitHub é a fonte da verdade; todo trabalho entra por *branch* + PR. |
| CI (`.github/workflows/ci.yml`) | *Build* do protótipo, `node --check`, `prototipo/dist/` igual ao *build*, conferência dos itens citados em `docs/` e na base `REF` contra o PDF (`--estrito`), links internos dos `.md` e o Godot fixado (SHA-512, versão e testes gdUnit4 da cena de fumaça). *Merge* só com CI verde. |
| Issues | Modelos `bug`, `conteudo-norma` e `desempenho`; modelo de PR; rótulos `bug`, `conteudo-norma`, `desempenho`, `didatica`, `docs`, `ideia`, `trilha-1`, `trilha-2`, `arte`. |
| Documentos | `00_INDICE` (entrada), `ROTEIRO`, `DECISOES`, `CONVENCOES`, `GLOSSARIO_DO_PROJETO`, `_MODELO_DOCUMENTO`, este arquivo e os documentos-base `PLANO_V3` e `ARQUITETURA`. Os documentos 01–25 da `00_INDICE` §5 ainda não existem. Gerados: `CONFERENCIA_ITENS.md` e `VALIDACAO_DO_CONTEUDO.md`. |
| Projeto Godot | `engine/`, `packs/nr10/` e `art/` só têm a estrutura de pastas. |
| Protótipo (Trilha 1, congelado) | `prototipo/`, documentado no `prototipo/README.md`; HTML offline em `prototipo/dist/` e Artifact no claude.ai. |
| Validação do conteúdo | `docs/VALIDACAO_DO_CONTEUDO.md` (gerado): questões, passos, objetos, cartões, amostras do gerador e interpretações dos documentos; nenhuma entrada validada ainda. |
| *Branches* no GitHub | Só a `main`, protegida pela regra "main protegida (CI verde)": PR obrigatório (sem revisão humana), os 3 *checks* do CI obrigatórios, histórico linear, sem *push* forçado nem remoção (decisão 29). O GitHub apaga a *branch* de cada PR no *merge* (decisão 31). |

## 3. Ambiente

| Item | Estado |
|---|---|
| Notebook (alvo de desempenho) | Windows 10, AMD A10-9600P, Radeon R5 integrada, 7,5 GB de RAM, pouco disco livre. Compatibility via ANGLE/D3D11 na R5: ~496 FPS sem sombra e ~75 FPS com sombra numa cena trivial. |
| Ferramentas no notebook (reserva) | Godot 4.7.2 em `C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT` (export templates só Windows x86_64); Blender 4.5.10 LTS (caminho não registrado); Git 2.56.0; VS Code 1.140.0. Existe também `C:\ferramentas\godot`, de conteúdo não conferido. |
| Pastas no notebook | Acesso pela ponte concedido a `C:\projetos` e à pasta do Godot. `C:\projetos\simulador-normas-testes` (executáveis de teste; vazia); `C:\projetos\simulador-normas` (clone antigo, fora de uso); `C:\projetos\teste-godot` (projeto do teste do passo 17, do usuário). Pasta do Godot: editor 4.7.2 `win64` e `win64_console`, mais o `.zip` baixado (86 MB, pode ser apagado se faltar disco). |
| Teste do `.exe` (passo 33) | Cena de fumaça (`tools/ambiente/fumaca/`, ~200 peças, 15 *draw calls*, ~3,8 mil primitivas, 19,6 MB de VRAM): **249–283 FPS** na R5, adaptador `ANGLE (AMD Radeon R5 Graphics, Direct3D11, D3D11-27.20.1034.6)`, `gl_compatibility`. O controle da tela abre o `.exe` pelo Explorador (só clique) e lê o painel; o próprio `.exe` precisa ser aprovado como aplicativo depois de aberto. |
| Sessão na nuvem (ambiente principal) | Plano Pro. *Push*, PR pela API REST e *merge*. O *proxy* bloqueia a API GraphQL, mudanças nas configurações do repositório e a remoção de *branches* (feitas pelo navegador, logado no GitHub; a de *branches* de PR é automática). Alcança o notebook pela ponte do app Claude Desktop (arquivos) e pelo controle de aplicativos (tela). |
| Ferramentas na nuvem | Instaladas por `tools/ambiente/` a cada sessão (o contêiner é descartável), com versão e soma conferidas: Godot 4.7.2 *headless* + *export templates* Windows/Linux; `bpy` 4.5.10 LTS em venv Python 3.11 (o Python 3.13 da sessão só tem a série 5.x); gdUnit4 v6.2.3 por `git clone` (o *proxy* bloqueia páginas e API de terceiros, não o Git); Xvfb + Mesa llvmpipe para captura de cena sem GPU; Node e Playwright com Chromium. |
