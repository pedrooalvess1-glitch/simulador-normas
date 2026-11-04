# Pendências de verificação

> Nada da lista aberta vira código como fato antes de ser confirmado.
> Conferência de itens no PDF: `tools/conferir_itens_portaria.py` (saída em `docs/CONFERENCIA_ITENS.md`).

## 1. Pendências abertas

| # | Pendência | Estado |
|---|---|---|
| 1 | Requisitos mínimos do renderizador Compatibility do Godot 4.7 (versão de OpenGL e drivers de GPUs integradas antigas). | Parcial: no computador de teste, roda via ANGLE/D3D11 na Radeon R5. Falta a referência oficial. |
| 2 | Limitações da exportação web no Godot 4.7. | Aberta |
| 3 | Nomes exatos das APIs de diagnóstico de GPU e memória de vídeo no 4.7. | Aberta |
| 4 | Capturas de tela de cenas Godot no contêiner da nuvem, sem GPU (para o agente conferir cenas). | Aberta. O executável Linux do Godot 4.7.2 é baixável na nuvem; falta testar renderização sem GPU. |
| 6 | Plano e custo atuais do Codex, se for usado. | Aberta (só se o Codex for usado) |
| 10 | Textos oficiais de NR-12, NR-33 e NR-35 (necessários para a Fase 3). | Aberta |
| 11 | Procedimentos de visita a subestações de concessionárias (CHESF, Neoenergia, CEMIG, COPEL). | Aberta |
| 20 | "DR 30 mA". | Parcial: a NR-10/2026 só diz "alta sensibilidade" (10.6.4 e Anexo III). O valor 30 mA vem de norma técnica (ABNT NBR 5410) [VERIFICAR a norma]. |
| 21 | Cor da etiqueta da luva isolante por classe. | Parcial: a NR-10/2026 não trata de cores de luva; o Anexo IV (Quadro III, notas) cita a ASTM D120. Confirmar a tabela de cores nessa norma [VERIFICAR]. |
| 22 | Se o modo **Auto** do Claude Code aparece no Desktop para o plano do usuário. | Aberta [VERIFICAR] (o agente confere na primeira sessão Local) |

## 2. Fatos já conferidos no PDF da Portaria MTE 737/2026

| Assunto | O que o PDF diz |
|---|---|
| Itens numerados | 133. Todos os números citados no protótipo e nos documentos existem (o CI confere a cada PR). |
| Extintor e combate a incêndio | Não há item na NR-10/2026; a referência é a NR-23. |
| Trabalho em altura e cinto | Não há item na NR-10/2026; a referência é a NR-35. |
| Suspensão do trabalho e direito de recusa | "Direito de recusa" aparece só como conteúdo do Treinamento Básico (Anexo III, item 9, alínea k). Não há item de suspensão; o mais próximo é o 10.7.4.2 (anormalidade na avaliação prévia: não iniciar e comunicar). |
| Cores de posição de manobra (verde "D" / vermelho "L") | Não aparecem no PDF. No simulador são [PRÁTICA]. |
| "Ordem de serviço" | O termo não aparece. No simulador é só a unidade de jogo [PRÁTICA]; o documento normativo é o procedimento (10.7.1) ou a PT (10.7.2). |
| Emergência | Não há capítulo próprio. Aparece em 10.7.3 h, 10.15.6.1 e nos conteúdos de primeiros socorros e resgate do Anexo III. |
| 10.2.4.1 e Art. 1º, 2º e 4º | Texto literal na base `REF` (`refs2.js`). |
| "Responsável técnico" e "responsável pela instalação" | Não aparecem como termos; só "responsabilidade técnica de PLH" (10.4.8.1). O simulador mapeia para PLH e para a organização [INTERPRETAÇÃO]. |
