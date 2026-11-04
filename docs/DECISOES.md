# Registro de decisões

> Só decisões vigentes. Cada uma: data, contexto, escolha, motivo e consequências. Quando uma decisão deixa de valer, ela sai deste arquivo (o registro fica no Git); os números são identificadores fixos e não são reaproveitados.
> Decisões tomadas pelo agente sem perguntar (por não serem essenciais, regra R8) levam a marca **[INFERÊNCIA]**; o usuário pode revertê-las a qualquer momento.

| # | Data | Decisão | Situação |
|---|---|---|---|
| 1 | 03/11/2026 | Godot 4.7.2 standard | Vigente |
| 2 | 03/11/2026 | Renderizador Compatibility (ANGLE/D3D11 no computador de teste) | Vigente |
| 3 | 03/11/2026 | Edição única: NR-10 da Portaria MTE 737/2026 | Vigente |
| 4 | 03/11/2026 | Sem texturas e sem sombras em tempo real (todos os perfis) | Vigente |
| 5 | 03/11/2026 | Repositório público + licença MIT | Vigente |
| 7 | 03/11/2026 | Campanha antes do Modo Livre | Vigente |
| 8 | 03/11/2026 | Agente com permissão total; usuário só nas tarefas U1–U4 | Vigente |
| 9 | 04/11/2026 | Duas trilhas: protótipo de estudo (congelado) × projeto principal em Godot (foco) | Vigente |
| 10 | 03/11/2026 | Protótipo vira projeto ativo em `prototipo/` | Vigente [INFERÊNCIA] |
| 11 | 03/11/2026 | Fotos de referência ficam fora do Git | Vigente [INFERÊNCIA] |
| 12 | 03/11/2026 | Módulo História em SVG estático | Vigente |
| 13 | 04/11/2026 | CI mínimo antes dos modelos de documento | Vigente [INFERÊNCIA] |
| 14 | 04/11/2026 | Documentação descreve só o estado atual | Vigente |
| 15 | 04/11/2026 | Trabalho contínuo com pontos de parada definidos | Vigente |
| 16 | 04/11/2026 | Godot do notebook na pasta da área de trabalho | Vigente |
| 17 | 04/11/2026 | Conteúdo só da NR-10 | Vigente |
| 18 | 04/11/2026 | Só o Claude Code no projeto | Vigente |
| 19 | 04/11/2026 | Nuvem como ambiente principal; notebook como alvo de desempenho | Vigente [INFERÊNCIA] |
| 20 | 04/11/2026 | Planejamento antes das ferramentas | Vigente |
| 21 | 04/11/2026 | Menos documentos: sem documento 20; documentos-base absorvidos | Vigente [INFERÊNCIA] |
| 22 | 04/11/2026 | Campanha organizada por capítulos de papel | Vigente [INFERÊNCIA] |

---

### Decisão 1 — Godot 4.7.2 standard
- **Contexto:** motor gratuito (R1), leve em GPU integrada (R3), com cenas em texto legíveis por agente.
- **Opções:** Unity, Unreal, web pura (three.js + Electron/Tauri), Godot.
- **Escolha:** Godot `4.7.2.stable`, versão "standard" (GDScript, sem .NET).
- **Motivo:** licença MIT; cenas `.tscn`/`.tres` em texto; menos código do que web pura; exportação web possível. Detalhe na `00_INDICE` §3.1.

### Decisão 2 — Renderizador Compatibility
- **Contexto:** GPU integrada Radeon R5 com driver AMD de 2020.
- **Escolha:** `gl_compatibility`. No computador de teste ele roda via ANGLE sobre Direct3D 11 (passo 17 do guia).
- **Motivo:** é o renderizador mais leve do Godot e o mesmo da exportação web.

### Decisão 3 — Edição única: Portaria MTE 737/2026
- **Contexto:** a NR-10 tem duas redações publicadas (Portaria 598/2004 e Portaria MTE 737/2026).
- **Escolha:** edição única, a da Portaria MTE 737/2026.
- **Motivos:** (1) duas edições multiplicam a complexidade do motor (versionamento de regras, precedência, testes duplicados); (2) os próximos concursos cobram a redação atualizada.
- **Consequências:** não há conceito de edição; o motor é orientado a dados (outra norma = outro pacote; um pacote = uma norma numa redação). Vale também para o protótipo de estudo.

### Decisão 4 — Sem texturas e sem sombras em tempo real
- **Contexto:** passo 17: ~496 FPS sem sombra e ~75 FPS com sombra numa cena trivial.
- **Escolha:** cores chapadas ou paleta única; placas e etiquetas com `Label3D`; nenhuma sombra em tempo real em nenhum perfil [INFERÊNCIA na extensão aos perfis Médio/Alto].
- **Motivo:** sombra e textura são o que mais pesa em GPU integrada; não ensinam nada (R2).

### Decisão 5 — Repositório público + MIT
- **Consequência:** minutos de Actions sem cota; nunca comitar segredos, fotos do usuário ou dados pessoais.

### Decisão 7 — Campanha antes do Modo Livre
- **Motivo:** a campanha valida o motor com missões roteirizadas; o Modo Livre reutiliza o mesmo esquema de missão.

### Decisão 8 — Agente com permissão total
- **Contexto:** o usuário não quer curva de aprendizado em nenhuma ferramenta e concedeu acesso total a Blender, Godot e ao seu computador.
- **Escolha:** o agente opera repositório, ferramentas e o computador do usuário (onde e como: decisão 19); faz *merge* dos próprios PRs com CI verde. O usuário só faz: U1 fotos e aprovação de prévias; U2 uso; U3 conceder acesso; U4 perguntas essenciais.
- **Salvaguardas:** escopo de pastas no `CLAUDE.md`; Git como rede de segurança (sem `push --force` na `main`); CI como porteiro; nada de segredos ou dados pessoais.

### Decisão 9 — Duas trilhas
- **Contexto:** o projeto Godot não fica pronto antes da prova (data provável 13/12/2026); o protótipo three.js já serve para estudar.
- **Escolha:** Trilha 1 (protótipo three.js de estudo) e Trilha 2 (projeto principal em Godot). Por decisão do usuário (04/11/2026), a Trilha 1 está **congelada**: o HTML offline segue disponível e só muda a pedido dele; o foco é a Trilha 2.
- **Consequência:** as melhorias já identificadas no protótipo ficam registradas em `docs/PROXIMA_SESSAO.md` §4, sem execução.

### Decisão 10 — Protótipo em `prototipo/` *[INFERÊNCIA]*
- **Escolha:** pasta `prototipo/` na raiz, com `dist/` versionado (HTML offline baixável de qualquer lugar).
- **Motivo:** o protótipo é código ativo (Trilha 1); código ativo não fica dentro de "referências".

### Decisão 11 — Fotos de referência fora do Git *[INFERÊNCIA]*
- **Escolha:** `art/fotos/` no `.gitignore`; vão para o Git só o script do Blender, o `.glb` e a prévia `.png`.
- **Motivo:** repositório público; fotos podem mostrar pessoas, locais ou documentos.

### Decisão 12 — Módulo História em SVG estático
- **Contexto:** o usuário pediu (03/11/2026) que o simulador associe os itens da NR-10 ao ambiente com um desenho de uma história e itens interativos, **sem animação**, para funcionar offline.
- **Escolha:** cena SVG desenhada em código (sem imagens externas), com estados que mudam a cada ação; cada objeto tem uma lista de itens (`HS`), e os passos da OS (`ST`) são dados, não código de cena. É o módulo de abertura do app.
- **Motivo:** SVG é leve, nítido no celular, cabe no HTML offline e não exige GPU. Ligar o item a um objeto e a um lugar ataca a dor original (correlações sem ler linha por linha).

### Decisão 13 — CI mínimo antes dos modelos de documento *[INFERÊNCIA]*
- **Contexto:** a regra "merge só com CI verde" não tinha CI para cumprir.
- **Escolha:** `.github/workflows/ci.yml` roda o *build* do protótipo, `node --check`, confere `dist/` contra o *build* e confere os itens contra o PDF (falha se um número citado não existir na Portaria).
- **Motivo:** protege o que mais importa: o app de estudo abrir e o texto da norma ser fiel ao PDF.

### Decisão 14 — Documentação descreve só o estado atual
- **Contexto:** pedido do usuário (04/11/2026).
- **Escolha:** os `.md` do projeto mapeiam o estado atual e os próximos passos. Sem tabelas de revisão, sem "versão anterior", sem comparação com versões passadas e sem decisões substituídas.
- **Motivo:** quem lê (o usuário ou uma sessão nova) precisa saber o que vale agora; o histórico já está no Git (commits e PRs) e, no texto, só confunde.
- **Consequência:** a cada PR, o agente atualiza o texto no lugar em vez de acrescentar notas de mudança.

### Decisão 15 — Trabalho contínuo com pontos de parada definidos
- **Contexto:** pedido do usuário (04/11/2026): não abrir sessão só para ouvir o próximo passo e autorizá-lo.
- **Escolha:** a um pedido de trabalho ("continue"), o agente executa o backlog de `docs/PROXIMA_SESSAO.md` §3 em sequência e só para nos pontos P1–P4 de `PROXIMA_SESSAO` §1 (decisão só do usuário, ação irreversível, ação física do usuário, falha que não consegue resolver).
- **Motivo:** cada item já passa por *branch*, CI e *merge* reversível; a revisão humana passo a passo não acrescenta segurança e gasta o tempo de estudo do usuário.

### Decisão 16 — Godot na pasta da área de trabalho
- **Contexto:** o usuário informou (04/11/2026) o caminho exato do Godot.
- **Escolha:** `C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT` é o caminho do Godot 4.7.2 para Windows no notebook, e entra no escopo de pastas do `CLAUDE.md`. Ele fica como reserva (decisão 19).

### Decisão 17 — Conteúdo só da NR-10
- **Contexto:** decisão do usuário (04/11/2026): o simulador serve ao entendimento da NR-10; se a NR-10 não traz uma informação, ela não é buscada em outra norma; a aplicabilidade particular (ex.: cor da etiqueta da luva) fica fora do escopo.
- **Escolha:** requisito R9 e regras da `00_INDICE` §1.4: só o que tem item da NR-10 é ensinado, cobrado ou corrigido; remissão a outra norma aparece só como remissão; [PRÁTICA] serve só para dar realismo ao cenário; a explicação física de um requisito continua permitida, rotulada [INTERPRETAÇÃO].
- **Motivo:** mantém o conteúdo verificável contra uma única fonte (o PDF) e evita que o simulador ensine como norma o que é de outra norma ou de prática de campo.
- **Consequências:** `PENDENCIAS_DE_VERIFICACAO.md` só registra pendências da NR-10 e de ferramentas; nenhum documento cobra itens de outras normas (NR-35, NR-18, cores de luva, valor de 30 mA do DR).

### Decisão 18 — Só o Claude Code no projeto
- **Contexto:** o usuário informou (04/11/2026) que todo o projeto é conduzido no Claude Code.
- **Escolha:** sem outro agente de código e sem outra ferramenta de IA no fluxo. Não há `AGENTS.md` (ponteiro para outros agentes) [INFERÊNCIA]; as regras ficam só no `CLAUDE.md`.
- **Motivo:** um arquivo de regras a menos para manter coerente.

### Decisão 19 — Nuvem como ambiente principal; notebook como alvo de desempenho *[INFERÊNCIA]*
- **Contexto:** o notebook tem 7,5 GB de RAM e pouco disco; a sessão na nuvem tem Linux, rede para baixar o Godot para Linux e os *export templates* do GitHub da Godot, e o `bpy` do PyPI; a sessão na nuvem também alcança o notebook (arquivos pela ponte, tela pelo controle de aplicativos).
- **Escolha:** documentos, código, Godot *headless*, Blender (`bpy`), testes e exportação rodam na nuvem e no CI. O notebook recebe só o executável de teste, aberto pelo agente pelo controle da tela para medir o desempenho real. A sessão Local fica como reserva.
- **Motivo:** o notebook não precisa ficar ligado nem ter RAM e disco livres para o trabalho pesado; o que só ele pode medir (FPS na Radeon R5) continua sendo medido nele.
- **Limites conhecidos:** a sessão na nuvem não muda configurações do repositório nem apaga *branches* pela API; isso é feito no navegador do usuário (passo 34 do guia).

### Decisão 20 — Planejamento antes das ferramentas
- **Contexto:** decisão do usuário (04/11/2026): o planejamento evita retrabalho, então as ferramentas não são mexidas agora.
- **Escolha:** ordem E → F → D → G no guia. Nenhuma instalação ou configuração de Godot, Blender, gdUnit4 ou do notebook antes de concluída a Etapa F, salvo pedido do usuário.

### Decisão 21 — Menos documentos *[INFERÊNCIA]*
- **Escolha:** (1) o documento `20_FLUXO_DE_TRABALHO_COM_AGENTE` sai da lista: o fluxo já está no `CLAUDE.md`, na `00_INDICE` §8 e no `PROXIMA_SESSAO.md`; (2) o `PLANO_V3` e a `ARQUITETURA` são absorvidos pelos documentos 01, 02, 05, 11, 14, 15 e 16 e retirados do repositório na revisão cruzada (passo 64).
- **Motivo:** cada assunto com uma única fonte; dois textos sobre a mesma coisa acabam se contradizendo.

### Decisão 22 — Campanha organizada por capítulos de papel *[INFERÊNCIA]*
- **Contexto:** a `00_INDICE` §6 organiza a campanha em capítulos por papel do protagonista; o `PLANO_V3` §4 lista missões M0–M9 por ambiente.
- **Escolha:** a estrutura é a dos capítulos; as missões M0–M9 são candidatas distribuídas nos capítulos (`00_INDICE` §6). O documento 11 fecha a distribuição.
- **Motivo:** a progressão de papel segue a ordem em que a NR-10 atribui responsabilidades (autorizado → supervisor → PLH); o ambiente é o lugar onde isso acontece.

