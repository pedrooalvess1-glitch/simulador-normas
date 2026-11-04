# Pendências de verificação

> Cópia de trabalho da `00_INDICE_E_DECISOES_INFRAESTRUTURA.md` §10 (passo 44 do guia). Quando uma pendência mudar, atualize as duas.
> Pendências que só existiam por causa da redação de 2004 estão marcadas "resolvida: fora de escopo (edição única)".
> Conferência no PDF: rode `tools/conferir_itens_portaria.py` (saída em `docs/CONFERENCIA_ITENS.md`).

## Lista de pendências

Nada desta lista vira código como fato antes de ser confirmado. Esta lista é a base do `docs/PENDENCIAS_DE_VERIFICACAO.md` (passo 44).

| # | Pendência | Status (rev3) |
|---|---|---|
| 1 | Requisitos mínimos do renderizador Compatibility do Godot 4.7 (versão de OpenGL e drivers de GPUs integradas antigas). | Parcialmente respondida: no computador de teste, roda via ANGLE/D3D11 na Radeon R5 (passo 17). Falta a referência oficial. |
| 22 | *(nova, rev3)* Se o modo **Auto** do Claude Code aparece no Desktop para o plano do usuário. | Aberta [VERIFICAR] (o agente confere na primeira sessão Local) |
| 2 | Limitações da exportação web no Godot 4.7. | Aberta |
| 3 | Nomes exatos das APIs de diagnóstico de GPU e memória de vídeo no 4.7. | Aberta |
| 4 | Viabilidade de renderizar capturas de tela no contêiner de nuvem sem GPU (para o agente conferir cenas). | Aberta (a sessão de código é Local; ver §8.1) |
| 5 | Cotas atuais do GitHub Actions para repositório privado. | Resolvida: fora de escopo (repositório público, passo 3) |
| 6 | Plano e custo atuais do Codex, se for usado. | Aberta (só se o Codex for usado) |
| 7 | Mapeamento sistemático item a item entre as edições 2004 e 2026. | **Resolvida: fora de escopo (edição única)** |
| 8 | Itens da redação 2026 que vieram de pesquisa web (marcados com `*` no PLANO), a conferir no PDF. | **Resolvida (rev3):** conferidos no PDF; o único que não batia (extintor, "10.12.4") é a pendência 13. |
| 9 | Se o item 10.14.1 do texto de 2004 foi revogado pela Portaria SEPRT 915/2019. | **Resolvida: fora de escopo (edição única)** |
| 10 | Textos oficiais de NR-12, NR-33 e NR-35 (necessários para a Fase 3). | Aberta |
| 11 | Procedimentos de visita a subestações de concessionárias (CHESF, Neoenergia, CEMIG, COPEL). | Aberta |
| 12 | Reconferir no PDF todos os números de item citados nos documentos de `docs/`. | **Resolvida (rev3):** 133 itens no PDF; todos os números de 2026 citados existem (`docs/CONFERENCIA_ITENS.md`). Rodar o script de novo a cada documento novo. |
| 13 | Item da NR-10/2026 sobre extintor e combate a incêndio. | **Resolvida (rev3):** o PDF não tem item sobre extintor; a referência é só a NR-23. |
| 14 | Onde a NR-10/2026 trata a suspensão do trabalho e o direito de recusa. | **Resolvida (rev3):** "direito de recusa" aparece só como conteúdo do Treinamento Básico (Anexo III, item 9, alínea k). Não há item de suspensão; o mais próximo é o 10.7.4.2 (anormalidade na avaliação prévia: não iniciar e comunicar). |
| 15 | Se a NR-10/2026 mantém a convenção de cores de posição de manobra (verde "D" / vermelho "L"). | **Resolvida (rev3):** não mantém (nenhuma ocorrência de verde/vermelho no PDF). No simulador é [PRÁTICA]. |
| 16 | Se o termo "ordem de serviço" aparece na NR-10/2026. | **Resolvida (rev3):** não aparece. "Ordem de Serviço" é só a unidade de jogo [PRÁTICA]; o documento normativo é o procedimento (10.7.1) ou a PT (10.7.2). |
| 17 | Item 10.2.4.1 fora da `REF`. | **Resolvida (rev3):** texto literal incluído em `refs2.js` (com os Art. 1º, 2º e 4º da Portaria). Falta exercitá-lo numa tarefa. |
| 18 | Item da NR-10/2026 sobre trabalho em altura e cinto. | **Resolvida (rev3):** não há; a referência é só a NR-35. |
| 19 | Se a NR-10/2026 tem capítulo próprio de emergência. | **Resolvida (rev3):** não tem. Emergência aparece em 10.7.3 h, 10.15.6.1 e nos conteúdos de primeiros socorros e resgate do Anexo III. |
| 20 | "DR 30 mA". | **Parcial (rev3):** confirmado que a NR-10/2026 só diz "alta sensibilidade" (10.6.4 e Anexo III). O valor 30 mA vem de norma técnica (ABNT NBR 5410) [VERIFICAR a norma]. |
| 21 | Cor da etiqueta da luva isolante por classe. | **Parcial (rev3):** a NR-10/2026 não trata de cores de luva; o Anexo IV (Quadro III, notas) cita a ASTM D120 para luvas isolantes. Confirmar a tabela de cores nessa norma [VERIFICAR]. |
