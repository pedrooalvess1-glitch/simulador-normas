# Decisões vigentes

> Índice das decisões em vigor. O detalhe de cada uma fica num só lugar, indicado na última coluna; quando uma decisão deixa de valer, ela sai da tabela (o registro fica no Git). Os números são identificadores fixos.
> **Origem:** *usuário* = decisão dele; *agente* = decidida pelo agente sem perguntar, por não ser essencial ([INFERÊNCIA]); o usuário pode revertê-la a qualquer momento.

| # | Data | Decisão | Motivo | Origem | Detalhe em |
|---|---|---|---|---|---|
| 1 | 03/11/2026 | Godot 4.7.2 standard (GDScript) | Gratuito (MIT), leve em GPU integrada, cenas em texto legíveis pelo agente | usuário | `00_INDICE` §3.1 |
| 2 | 03/11/2026 | Renderizador Compatibility | O mais leve do Godot; roda via ANGLE/D3D11 na Radeon R5 | usuário | `00_INDICE` §3.2 |
| 3 | 03/11/2026 | Edição única: NR-10 da Portaria MTE 737/2026 | Duas edições multiplicam a complexidade do motor; os concursos cobram a redação atual | usuário | `00_INDICE` §1.1 |
| 4 | 03/11/2026 | Sem texturas e sem sombras em tempo real, em todos os perfis | Medição do passo 17: ~496 FPS sem sombra × ~75 FPS com sombra; não ensinam nada | usuário (perfis Médio/Alto: agente) | `00_INDICE` §3.2 |
| 5 | 03/11/2026 | Repositório público, licença MIT | Actions sem cota; exige nunca comitar segredos ou dados pessoais | usuário | `CLAUDE.md` §3 |
| 7 | 03/11/2026 | Campanha antes do Modo Livre | A campanha valida o motor; o Modo Livre reusa o mesmo esquema de missão | usuário | `00_INDICE` §6 |
| 8 | 04/11/2026 | Agente com permissão total; usuário só em U1–U4 | O usuário não quer curva de aprendizado em ferramenta nenhuma | usuário | `CLAUDE.md` §2 |
| 9 | 04/11/2026 | Duas trilhas: protótipo de estudo (congelado) × projeto principal em Godot (foco) | O Godot não fica pronto antes da prova; o protótipo já serve para estudar | usuário | `00_INDICE` §1.3 |
| 10 | 03/11/2026 | Protótipo em `prototipo/`, com `dist/` versionado | É código ativo, não referência; o HTML offline baixa de qualquer lugar | agente | `prototipo/README.md` |
| 11 | 03/11/2026 | Fotos de referência fora do Git (`art/fotos/`) | Repositório público; fotos podem mostrar pessoas, locais ou documentos | agente | `CLAUDE.md` §6 |
| 12 | 03/11/2026 | Módulo História em SVG estático, aberto por padrão | Leve, sem GPU, funciona offline; prende cada item a um objeto e a um lugar | usuário | `prototipo/README.md` |
| 13 | 04/11/2026 | CI: *build* do protótipo, `dist/` igual ao *build* e conferência dos itens no PDF | "*Merge* só com CI verde" precisava de um CI | agente | `.github/workflows/ci.yml` |
| 14 | 04/11/2026 | Documentação só com o estado atual e o mínimo de texto | Quem lê precisa do que vale agora; o histórico está no Git | usuário | `CLAUDE.md` §3 |
| 15 | 04/11/2026 | Trabalho contínuo com pontos de parada P1–P4 | Revisão humana passo a passo não acrescenta segurança e gasta o tempo do usuário | usuário | `ROTEIRO` §1 |
| 16 | 04/11/2026 | Godot do notebook em `C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT` | Caminho informado pelo usuário | usuário | `STATUS` §3 |
| 17 | 04/11/2026 | Conteúdo só da NR-10 (R9) | O simulador serve ao entendimento da NR-10; uma só fonte verificável | usuário | `00_INDICE` §1.4 |
| 18 | 04/11/2026 | Só o Claude Code no projeto; sem `AGENTS.md` | Um arquivo de regras a menos para manter coerente | usuário (`AGENTS.md`: agente) | `CLAUDE.md` |
| 19 | 04/11/2026 | Nuvem como ambiente principal; notebook como alvo de desempenho; sessão Local como reserva | O notebook tem pouca RAM e disco; só o FPS real precisa dele | agente | `CLAUDE.md` §2 |
| 20 | 04/11/2026 | Planejamento antes das ferramentas (ordem E → F → D → G) | A configuração das ferramentas deve seguir os documentos, sem retrabalho | usuário | `ROTEIRO` §3 |
| 21 | 04/11/2026 | Menos documentos: sem documento 20; `PLANO_V3` e `ARQUITETURA` absorvidos no passo 64; passos, pendências e autonomia num só `ROTEIRO` | Cada assunto numa só fonte; dois textos sobre a mesma coisa se contradizem | agente | `00_INDICE` §5 |
| 22 | 04/11/2026 | Campanha organizada por capítulos de papel; missões M0–M9 do `PLANO_V3` como candidatas | A progressão de papel segue a ordem em que a NR-10 atribui responsabilidades | agente | `00_INDICE` §6 |
| 23 | 04/11/2026 | Inferência do agente é provisória; registro de validação gerado do conteúdo do software | O usuário valida os conceitos; o ID por hash faz a entrada voltar a "a validar" quando o texto muda | usuário (formato: agente) | `00_INDICE` §1.4, `tools/validacao/` |
| 24 | 04/11/2026 | Opus 5.5 com esforço por passo (`médio`, `alto`, `extra`); a sessão faz só os passos do seu esforço e os pré-requisitos de nível menor; documento 13 depois do 02 e 19 antes do 10, para formar blocos | Gastar tokens nas partes críticas | usuário (níveis e ordem: agente) | `ROTEIRO` §2–§3 |
| 25 | 04/11/2026 | Etapa D na nuvem antecipada, antes da Etapa F | Pedido do usuário; só baixa e fixa versões, sem configurar o projeto, então não cria retrabalho para os documentos | usuário | `ROTEIRO` §3 |
| 26 | 04/11/2026 | Versões fixadas: Godot 4.7.2 (SHA-512 no CI), Blender/`bpy` 4.5.10 LTS (Python 3.11), gdUnit4 v6.2.3 (tag e commit conferidos) | `bpy` na mesma série do notebook, para um `.py` de arte valer nos dois; a SHA-512 e o commit impedem que um download diferente passe despercebido. Na cena de fumaça o gdUnit4 é clonado a cada CI; versioná-lo no projeto do simulador (sem rede no CI) fica para o documento 17 | agente | `tools/ambiente/versoes.env` |
| 27 | 04/11/2026 | Antialiasing: MSAA 2× ou nenhum | O Compatibility não tem FXAA, SMAA nem TAA (documentação oficial; confirmado no 4.7.2) | agente | `00_INDICE` §3.2 |
| 28 | 04/11/2026 | IDs de dado e verbos em inglês `snake_case` ASCII; texto ao jogador em português em campo separado | O código compara IDs: acento e mistura de idiomas viram erro de digitação silencioso; o texto exibido pode mudar sem quebrar regra, save ou replay | agente | `CONVENCOES` §3 |
| 29 | 04/11/2026 | `main` protegida por regra (*ruleset*): PR obrigatório com 0 aprovações, *checks* `Links internos dos .md`, `Godot (versão, SHA-512 e gdUnit4)` e `Protótipo + conferência no PDF`, histórico linear, sem *push* forçado nem remoção, sem exceções | Transforma "*merge* só com CI verde" de regra escrita em bloqueio do GitHub; sem revisão humana porque o usuário não revisa código (decisão 8) | usuário (detalhes: agente) | `STATUS` §2 |
| 30 | 04/11/2026 | CI fixado: ações da série node24 (`checkout@v7`, `cache@v6`, `setup-python@v7`, `setup-node@v7`), runner `ubuntu-24.04`, Node 22 e `pypdf==6.17.0`; execução superada de PR cancelada | A série node20 está descontinuada no GitHub (aviso em toda execução) e o rótulo `ubuntu-latest` troca de sistema sozinho: fixar faz o CI só mudar por PR, como as ferramentas (decisão 26). Escolhida a maior versão com pelo menos 3 meses de lançada | agente | `.github/workflows/ci.yml` |
| 31 | 04/11/2026 | *Branch* de PR apagada automaticamente pelo GitHub no *merge* (*Automatically delete head branches*) | A sessão na nuvem não apaga *branches*; sem isso cada PR deixava uma *branch* para apagar à mão | usuário | `STATUS` §2 |
