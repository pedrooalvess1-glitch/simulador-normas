# Registro de decisões

> Só decisões vigentes. Cada uma: data, contexto, escolha, motivo e consequências. Quando uma decisão deixa de valer, ela sai deste arquivo (o registro fica no Git).
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
| 9 | 03/11/2026 | Duas trilhas: estudo no protótipo (prioridade até a prova) × projeto Godot | Vigente |
| 10 | 03/11/2026 | Protótipo vira projeto ativo em `prototipo/` | Vigente [INFERÊNCIA] |
| 11 | 03/11/2026 | Fotos de referência ficam fora do Git | Vigente [INFERÊNCIA] |
| 12 | 03/11/2026 | Módulo História em SVG estático | Vigente |
| 13 | 04/11/2026 | CI mínimo antes dos modelos de documento | Vigente [INFERÊNCIA] |
| 14 | 04/11/2026 | Documentação descreve só o estado atual | Vigente |
| 15 | 04/11/2026 | Trabalho contínuo com pontos de parada definidos | Vigente |
| 16 | 04/11/2026 | Godot na pasta da área de trabalho | Vigente |

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
- **Contexto:** o usuário quer curva de aprendizado mínima em Blender, Godot e VS Code e precisa do tempo para estudar para a prova.
- **Escolha:** o agente opera computador, ferramentas e GitHub (sessão Local em modo **Auto**, ou **Bypass permissions** se o Auto não estiver disponível); faz *merge* dos próprios PRs com CI verde. O usuário só faz: U1 fotos e aprovação de prévias; U2 uso e testes; U3 permissões; U4 perguntas essenciais.
- **Salvaguardas:** escopo de pastas no `CLAUDE.md`; Git como rede de segurança (sem `push --force` na `main`); CI como porteiro; nada de segredos ou dados pessoais.

### Decisão 9 — Duas trilhas
- **Contexto:** a prova objetiva tem data provável de 13/12/2026 (Aditivo 2 do edital, 30/10/2026); o projeto Godot não fica pronto até lá.
- **Escolha:** Trilha 1 (estudo no protótipo three.js, com fase Treino) e Trilha 2 (Godot). Até a prova, a Trilha 1 tem prioridade no limite de uso do plano.

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
- **Motivo:** protege o que mais importa até a prova: o app abrir e o texto da norma ser fiel.

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
- **Escolha:** `C:\Users\Pedro Alves\Desktop\POTENCIAIS_CONCURSOS\SOFTWARE-NR10\GODOT` é o caminho do Godot 4.7.2 usado pelo agente na sessão Local, e entra no escopo de pastas do `CLAUDE.md`.
