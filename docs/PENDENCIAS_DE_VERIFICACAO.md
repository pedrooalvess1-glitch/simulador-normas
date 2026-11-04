# Pendências de verificação

> Nada da lista aberta vira código como fato antes de ser confirmado.
> Só entram aqui pendências sobre a **NR-10** e sobre as **ferramentas do projeto**. Informação que a NR-10 não traz não é buscada em outra norma (`00_INDICE` §1.4).
> Conferência de itens no PDF: `tools/conferir_itens_portaria.py` (saída em `docs/CONFERENCIA_ITENS.md`).

## 1. Pendências abertas (todas de ferramenta; resolvidas na Etapa D do guia)

| # | Pendência | Estado |
|---|---|---|
| 1 | Requisitos mínimos do renderizador Compatibility do Godot 4.7 (versão de OpenGL e drivers de GPUs integradas antigas). | Parcial: no notebook, roda via ANGLE/D3D11 na Radeon R5. Falta a referência oficial. |
| 2 | Limitações da exportação web no Godot 4.7. | Aberta (baixa prioridade: a exportação web não é requisito) |
| 3 | Nomes exatos das APIs de diagnóstico de GPU e memória de vídeo no 4.7 (painel F3). | Aberta |
| 4 | Capturas de tela de cenas Godot na sessão da nuvem, sem GPU (renderização por software), para o agente conferir cenas sem o notebook. | Aberta. Alternativa já disponível: capturas no notebook pelo controle da tela. |
| 5 | Blender na nuvem como módulo `bpy`: versão (o PyPI oferece a série 5.x para o Python da sessão; o notebook tem 4.5.10 LTS), exportação `.glb` e renderização da prévia sem GPU. | Aberta |
| 6 | gdUnit4: como instalar na sessão da nuvem (o *proxy* bloqueia páginas de repositórios de terceiros no GitHub) e no CI. | Aberta |
| 7 | Controle da tela do notebook: abrir o `.exe`, ler o painel F3 e fechar, com o app Claude Desktop aberto. | Aberta |

## 2. Fatos já conferidos no PDF da Portaria MTE 737/2026

| Assunto | O que o PDF diz |
|---|---|
| Itens numerados | 133. Todos os números citados no protótipo e nos documentos existem (o CI confere a cada PR). |
| Normas citadas pela NR-10 (remissões) | NR-1 (10.1.1, 10.3.1, 10.5.3, 10.9.1, 10.15.1, 10.15.6.1), NR-3 (10.16.1), NR-6 (10.11.1, 10.11.2, 10.11.2.3 e Anexo IV), NR-7 (10.7.5), NR-17 (10.4.10), NR-23 (10.6.6), NR-26 (10.7.7); ABNT NBR 5410, NBR 14039, NBR IEC 62271-200 e "ABNT - Atmosferas explosivas" (conteúdos do Anexo III); ABNT NBR IEC 61482-2 (definições do Anexo IV); ASTM F1506, F1959, F2178, D120 e F696 (notas do Quadro III do Anexo IV). O simulador mostra só a remissão. |
| Dispositivo DR | A NR-10 exige "dispositivo diferencial-residual (DDR) de alta sensibilidade" (10.6.4) e não fixa valor de corrente. O valor de 30 mA vem da ABNT NBR 5410 (informado pelo usuário) e fica fora do conteúdo do simulador. |
| Luvas isolantes | A NR-10 exige ensaio dielétrico de luvas e mangas (10.14.4 b, 10.14.4.1) e cita a ASTM D120 nas notas do Anexo IV. Classes e cores de etiqueta ficam fora do conteúdo. |
| Extintor e combate a incêndio | Não há item sobre extintor. O 10.6.6 exige medidas de proteção coletiva contra explosão e incêndio e remete à NR-23. |
| Trabalho em altura | Não há item nem remissão a outra norma. |
| Suspensão do trabalho e direito de recusa | "Direito de recusa" aparece só como conteúdo do Treinamento Básico (Anexo III, item 9, alínea k). Não há item de suspensão; o mais próximo é o 10.7.4.2 (anormalidade na avaliação prévia: não iniciar e comunicar). |
| Cores de posição de manobra (verde "D" / vermelho "L") | Não aparecem no PDF. No simulador são só cenário [PRÁTICA]. |
| "Ordem de serviço" | O termo não aparece. No simulador é só a unidade de jogo [PRÁTICA]; o documento normativo é o procedimento (10.7.1) ou a PT (10.7.2). |
| Emergência | Não há capítulo próprio. Aparece em 10.7.3 h, 10.15.6.1 e nos conteúdos de primeiros socorros e resgate do Anexo III. |
| 10.2.4.1 e Art. 1º, 2º e 4º | Texto literal na base `REF` (`refs2.js`). |
| "Responsável técnico" e "responsável pela instalação" | Não aparecem como termos; só "responsabilidade técnica de PLH" (10.4.8.1). O simulador mapeia para PLH e para a organização [INTERPRETAÇÃO]. |
| Área classificada | Equipamentos certificados conforme o estudo de classificação de áreas (10.6.6.1.1); serviços só com PT, análise de risco e procedimento (10.6.6.1.2). |
