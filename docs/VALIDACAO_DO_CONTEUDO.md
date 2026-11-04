# Validação do conteúdo do software

> **Gerado por `tools/validacao/gerar.py` — não edite à mão.** Reúne tudo o que o software pergunta e a resposta que ele
> dá, para o usuário conferir contra a NR-10. As respostas e explicações foram escritas pelo agente: são **inferências**
> até serem validadas. Hoje a fonte é o protótipo (Trilha 1); o projeto Godot entra aqui quando tiver conteúdo.
>
> **Como validar:** diga na conversa, por exemplo, "V-1a2b3c ok" ou "V-1a2b3c errado: a resposta certa é …".
> O agente grava a situação em `tools/validacao/status.json` e gera este arquivo de novo. Se o texto de uma entrada
> mudar, o ID muda e ela volta a "a validar".
>
> **Alertas** (heurística por palavras, para priorizar): *mecanismo físico* = explicação física do porquê de um item;
> *prática de campo* = detalhe que não vem da NR-10; *outra norma* = menção a norma fora da NR-10; *interpretação
> rotulada* = trecho já marcado como leitura do simulador; *sem item citado* e *item fora da base* = falha de rastreio.

## Resumo

| Seção | Entradas |
|---|---|
| 1. Banco de questões do Treino | 129 |
| 2. Histórias: passos interativos | 35 |
| 3. Missão: passos de marcar e de ordenar (OS 0457) | 4 |
| 4. Histórias: objetos das cenas | 88 |
| 5. Cartões de fatos do Treino | 42 |
| 6. Gerador de questões do Treino | 43 |
| 7. Interpretações nos documentos de planejamento | 8 |
| **Total** | **349** |

Situação: a validar: 349

**Revisar primeiro** (entradas com alerta):

- *outra norma ou concessionária* (1): V-aa520b
- *mecanismo físico* (15): V-5126d4, V-be596e, V-be8240, V-cab9bf, V-3edac7, V-20dc67, V-de333a, V-3ea7d6, V-900dd4, V-59b3a3, V-d0fc5b, V-caaf28, V-3b0a0d, V-aee8c0, V-f6acf3
- *prática de campo* (13): V-cab9bf, V-4258b5, V-9f5e1d, V-6a4e38, V-049feb, V-37be4a, V-900dd4, V-d097a9, V-e6bc3f, V-b5f01b, V-9d6caf, V-e55ee9, V-051511
- *interpretação rotulada* (9): V-d83457, V-ed4aed, V-9d6caf, V-aee8c0, V-54c7d5, V-e55ee9, V-f6acf3, V-73a3dd, V-051511

---

## 1. Banco de questões do Treino

Questões dos módulos, listas de classificação convertidas e decisões de escolha única da Missão e da História. São as que aparecem no Simulado e na Revisão.

### V-ffc039 · Enquadramento
- **Pergunta:** String fotovoltaica de 1.200 Vcc em uma usina solar. Em que faixa ela está?
- **Alternativas** (✔ = resposta do simulador):
  - A) EBT — *por que não:* A EBT em corrente contínua vai até 120 V; 1.200 Vcc está muito acima. (g-ebt)
  - **✔** B) BT
  - C) MT — *por que não:* A MT em corrente contínua começa acima de 1.500 V; 1.200 Vcc ainda é BT. (g-mt)
  - D) AT — *por que não:* A AT em corrente contínua é acima de 3.000 V. (g-at)
  - E) Fora da NR-10, por ser corrente contínua — *por que não:* O 10.2.1 inclui instalações em corrente alternada e/ou contínua, e o glossário dá as faixas também em CC. (10.2.1, g-bt)
- **Explicação:** Em corrente contínua, a BT vai de mais de 120 V até 1.500 V. 1.200 Vcc é BT.
- **Itens citados:** g-bt
- **Situação:** a validar

### V-233f8d · Enquadramento
- **Pergunta:** Cabine primária de 13,8 kV. Faixa pela NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) BT — *por que não:* A BT em corrente alternada vai só até 1.000 V; 13,8 kV passa disso. (g-bt)
  - **✔** B) MT
  - C) AT — *por que não:* A AT em corrente alternada começa acima de 36.200 V; 13,8 kV fica abaixo. (g-at)
  - D) EBT — *por que não:* A EBT em corrente alternada vai até 50 V. (g-ebt)
  - E) Fora da NR-10: é instalação do consumidor — *por que não:* O 10.2.1 alcança geração, transmissão, distribuição e consumo, em baixa, média e/ou alta tensão. (10.2.1)
- **Explicação:** MT vai de mais de 1.000 V CA até 36.200 V CA (glossário).
- **Itens citados:** g-mt
- **Situação:** a validar

### V-c14ca4 · Enquadramento
- **Pergunta:** Rack de telecom em 48 Vcc, fora de área classificada. A NR-10 se aplica?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim, integralmente — *por que não:* 48 Vcc não passa de 120 V em CC: é EBT, e o 10.2.4 exclui a EBT da NR-10. (10.2.4, g-ebt)
  - **✔** B) Não: é extrabaixa tensão
  - C) Só o capítulo de EPI — *por que não:* A única exceção do 10.2.4 é o 10.6.6 (proteção contra explosão e incêndio), não o capítulo de EPI. (10.2.4)
  - D) Sim, porque toda instalação em corrente contínua está na NR-10 — *por que não:* A corrente contínua está no alcance (10.2.1), mas o 10.2.4 exclui a EBT, em CA ou em CC. (10.2.1, 10.2.4)
  - E) Não: a NR-10 só alcança corrente alternada — *por que não:* A resposta é "não", mas pelo motivo errado: o 10.2.1 inclui corrente contínua; a exclusão vem da faixa de tensão (10.2.4). (10.2.1, 10.2.4)
- **Explicação:** 48 Vcc não passa de 120 Vcc, logo é EBT. O 10.2.4 exclui a EBT, exceto para o 10.6.6 (explosão e incêndio).
- **Itens citados:** 10.2.4 · g-ebt
- **Situação:** a validar

### V-f5ee3b · Enquadramento
- **Pergunta:** Supermercado com 300 kW instalados, alimentado em 380 V, sem atividade em MT. O PIE é obrigatório pela NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim, porque passa de 75 kW — *por que não:* A carga instalada não é critério no 10.15.6: valem integrar o SEP ou realizar atividades em MT/AT. (10.15.6)
  - **✔** B) Não: o PIE é exigido de quem integra o SEP ou atua em MT/AT
  - C) Sim, todo estabelecimento comercial — *por que não:* O 10.15.6 não usa o tipo de estabelecimento como critério. (10.15.6)
  - D) Sim, porque tem eletricistas próprios autorizados — *por que não:* Ter autorizados obriga a documentação do 10.15.4; organizá-la como PIE só é exigido de quem integra o SEP ou atua em MT/AT (10.15.6). (10.15.4, 10.15.6)
  - E) Não: comércio não precisa de nenhum documento da NR-10 — *por que não:* Toda organização dispõe de projeto elétrico e da documentação das inspeções e medições do aterramento (10.15.3). (10.15.3)
- **Explicação:** O 10.15.6 exige o PIE de quem integra o SEP ou realiza atividades em MT/AT; a carga instalada não é critério. Projeto e documentação de aterramento continuam exigidos.
- **Itens citados:** 10.15.6 · 10.15.3
- **Situação:** a validar

### V-88f020 · Enquadramento
- **Pergunta:** Equipe de provedor instala fibra óptica em postes da distribuidora. Qual treinamento inicial?
- **Alternativas** (✔ = resposta do simulador):
  - A) Básico 40 h + Complementar SEP 40 h — *por que não:* O 10.9.4 e o 10.9.5 dispensam o Básico e o Complementar do SEP de quem faz o Específico de compartilhamento. (10.9.4, 10.9.5)
  - **✔** B) Específico de compartilhamento de infraestrutura do SEP, 40 h
  - C) Nenhum: não mexem na rede elétrica — *por que não:* Trabalho em proximidade com compartilhamento de infraestrutura do SEP exige o Específico (10.9.9) e trabalhador autorizado (10.14.1). (10.9.9, 10.14.1)
  - D) Específico e pontual, 8 h — *por que não:* O Específico e pontual é para profissionais estrangeiros e/ou não residentes no país, em serviços pontuais de até 30 dias (10.9.8). (10.9.8)
  - E) Básico 40 h + Específico de compartilhamento 40 h — *por que não:* O 10.9.4 exclui do Básico quem faz o Específico de compartilhamento. (10.9.4)
- **Explicação:** O 10.9.9 cria o treinamento específico, e os itens 10.9.4 e 10.9.5 dispensam Básico e Complementar SEP de quem o faz.
- **Itens citados:** 10.9.9 · 10.9.4 · 10.9.5
- **Situação:** a validar

### V-becc25 · Enquadramento
- **Pergunta:** Até onde vai o Sistema Elétrico de Potência?
- **Alternativas** (✔ = resposta do simulador):
  - A) Até a subestação da distribuidora — *por que não:* O glossário estende o SEP pela distribuição até a medição, inclusive; a subestação fica antes. (g-sep)
  - **✔** B) Até a medição, inclusive
  - C) Até o quadro geral do consumidor — *por que não:* O quadro geral fica depois da medição, já na instalação do consumidor. (g-sep)
  - D) Até a medição, exclusive — *por que não:* O glossário diz até a medição, inclusive: a medição faz parte do SEP. (g-sep)
  - E) Só até a transmissão; a distribuição é outro sistema — *por que não:* O glossário inclui geração, transmissão e distribuição no SEP. (g-sep)
- **Explicação:** Pelo glossário, o SEP compreende geração, transmissão e distribuição até a medição, inclusive.
- **Itens citados:** g-sep
- **Situação:** a validar

### V-996e8f · Enquadramento
- **Pergunta:** Linha de 138 kV. Quais são Rr e Rc?
- **Alternativas** (✔ = resposta do simulador):
  - A) 1,10 m e 3,10 m — *por que não:* É a linha ≥ 110 e < 132 kV; 138 kV já passou de 132. (AII)
  - **✔** B) 1,20 m e 3,20 m
  - C) 1,60 m e 3,60 m — *por que não:* É a linha ≥ 150 e < 220 kV; 138 kV não chega a 150. (AII)
  - D) 1,00 m e 2,00 m — *por que não:* É a linha ≥ 70 e < 110 kV. (AII)
  - E) 1,20 m e 2,20 m — *por que não:* O Rr está certo, mas o Rc da linha ≥ 132 e < 150 kV é 3,20 m: a partir de 110 kV a distância entre Rr e Rc deixa de ser 1,00 m. (AII)
- **Explicação:** 138 kV cai na faixa ≥ 132 e < 150 kV do Anexo II.
- **Itens citados:** AII
- **Situação:** a validar

### V-47cdf3 · Enquadramento
- **Pergunta:** Serviço energizado em um QGBT de 380 V de uma indústria (SEC). O item 10.14.2 proíbe fazê-lo sozinho?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim — *por que não:* O 10.14.2 alcança serviço energizado em MT/AT e qualquer serviço no SEP; um QGBT de 380 V de indústria não é nenhum dos dois. (10.14.2)
  - **✔** B) Não: o 10.14.2 vale para energizado em MT/AT e para serviços no SEP
  - C) Sim: todo serviço energizado, em qualquer tensão, exige mais de um trabalhador — *por que não:* A vedação do 10.14.2 é restrita a MT/AT energizada e ao SEP. (10.14.2)
  - D) Sim, porque 380 V já é média tensão no SEC — *por que não:* 380 V é BT pelo glossário (até 1.000 V CA), em qualquer sistema. (g-bt)
  - E) Não: o 10.14.2 só vale para o SEP — *por que não:* A resposta é "não", mas o motivo está errado: o 10.14.2 também alcança MT/AT energizada no SEC. (10.14.2)
- **Explicação:** A vedação do trabalho individual alcança energizado em MT/AT e qualquer serviço no SEP. Em BT no SEC, a decisão sai da análise de risco.
- **Itens citados:** 10.14.2 · 10.7.3
- **Situação:** a validar

### V-365c68 · Zonas e alcance da norma
- **Pergunta:** Rede de 13,8 kV. Um pintor está a 1,0 m da parte energizada.
- **Alternativas** (✔ = resposta do simulador):
  - A) Zona livre: pode trabalhar — *por que não:* Para 10 a 15 kV a zona livre começa em Rc = 1,38 m; a 1,0 m ele está na zona controlada. (AII)
  - **✔** B) Zona controlada: só trabalhador autorizado pode estar ali
  - C) Zona de risco — *por que não:* A zona de risco vai só até Rr = 0,38 m. (AII)
  - D) Zona controlada: qualquer trabalhador pode estar ali com instrução formal — *por que não:* A zona controlada só admite profissionais autorizados (glossário); a instrução formal do 10.14.1.2 é para quem fica na zona livre e na vizinhança da zona controlada. (g-zc, 10.14.1.2)
  - E) Fora das zonas do Anexo II, por estar a mais de 0,38 m — *por que não:* Passar de Rr só tira da zona de risco; até Rc = 1,38 m ainda é zona controlada. (AII)
- **Explicação:** Faixa ≥ 10 e < 15 kV: Rr 0,38 m e Rc 1,38 m. 1,0 m está entre os dois. Pintor não autorizado ali é grave e iminente risco.
- **Itens citados:** AII · 10.2.2 · 10.16.1
- **Situação:** a validar

### V-82473e · Zonas e alcance da norma
- **Pergunta:** QGBT de 380 V. Eletricista a 0,50 m do barramento, segurando um tubo de alumínio de 0,40 m apontado para ele.
- **Alternativas** (✔ = resposta do simulador):
  - A) ZL — *por que não:* Até o corpo (0,50 m) está dentro de Rc = 0,70 m. (AII)
  - B) ZC — *por que não:* Pelo corpo seria ZC, mas a ponta do tubo condutor fica a 0,10 m, dentro de Rr = 0,20 m. (AII, 10.2.2)
  - **✔** C) ZR
  - D) ZC, porque a distância se mede do corpo, não da ferramenta — *por que não:* O 10.2.2 conta a entrada por meio de extensões condutoras: vale a ponta do tubo. (10.2.2, g-prox)
  - E) Fora do alcance da NR-10, porque o tubo não toca o barramento — *por que não:* Basta poder entrar na zona controlada, com o corpo ou com extensões condutoras (10.2.2); contato não é condição. (10.2.2)
- **Explicação:** Extensão condutora conta: a ponta fica a 0,10 m, dentro de Rr = 0,20 m.
- **Itens citados:** 10.2.2 · AII
- **Situação:** a validar

### V-a1f974 · Zonas e alcance da norma
- **Pergunta:** Linha de 138 kV. A ponta da lança de um caminhão guindauto chega a 3,0 m do condutor.
- **Alternativas** (✔ = resposta do simulador):
  - A) ZL — *por que não:* A zona livre começa em Rc = 3,20 m; a ponta da lança está a 3,0 m. (AII)
  - **✔** B) ZC
  - C) ZR — *por que não:* Para 132 a 150 kV a zona de risco vai só até Rr = 1,20 m. (AII)
  - D) ZL, porque o operador está na cabine, a mais de 3,20 m — *por que não:* A lança metálica é extensão condutora: conta a posição da ponta (glossário, trabalho em proximidade). (g-prox, 10.2.2)
  - E) ZR, porque toda aproximação de máquina em AT é zona de risco — *por que não:* A zona sai da tabela do Anexo II pela distância; 3,0 m fica entre Rr e Rc. (AII)
- **Explicação:** Faixa ≥ 132 e < 150 kV: Rr 1,20 m e Rc 3,20 m. A lança metálica é extensão condutora, então o operador está em trabalho em proximidade.
- **Itens citados:** AII · g-prox
- **Situação:** a validar

### V-c9026e · Zonas e alcance da norma
- **Pergunta:** Cubículo de 13,8 kV com superfície isolante adequada entre a parte viva e o trabalhador, que está a 0,30 m do outro lado.
- **Alternativas** (✔ = resposta do simulador):
  - A) ZR — *por que não:* Sem a superfície, 0,30 m seria zona de risco (Rr = 0,38 m); com a superfície isolante adequada interposta vale a Figura 2 do Anexo II. (AII)
  - B) ZC — *por que não:* Sem a superfície seria a zona de risco, e não a controlada; com ela, vale a Figura 2 do Anexo II. (AII)
  - **✔** C) ZL
  - D) ZC, porque a superfície isolante rebaixa a zona em um nível — *por que não:* A Figura 2 não rebaixa a zona em um nível: do outro lado da superfície isolante a região é zona livre. (AII)
  - E) Depende só da distância: a superfície isolante não muda a zona — *por que não:* A Figura 2 do Anexo II existe justamente para a interposição de superfície de separação física adequada. (AII)
- **Explicação:** Pela Figura 2 do Anexo II, do lado oposto da superfície isolante a região é zona livre.
- **Itens citados:** AII
- **Situação:** a validar

### V-b876c7 · Zonas e alcance da norma
- **Pergunta:** Operador a 2,0 m de um CCM de 480 V com a porta aberta. Está fora da zona controlada (Rc 0,70 m), mas exposto a arco. A NR-10 se aplica a ele?
- **Alternativas** (✔ = resposta do simulador):
  - A) Não: está fora da ZC — *por que não:* A zona controlada delimita o alcance pelo choque; o 10.2.3 estende a NR-10 à exposição ao arco mesmo sem entrada na zona controlada. (10.2.3)
  - **✔** B) Sim: a norma vale onde há exposição ao arco, mesmo sem entrada na ZC
  - C) Só se ele usar ferramenta condutora que alcance a ZC — *por que não:* Isso é o 10.2.2 (extensões condutoras); o 10.2.3 alcança a exposição ao arco por si só. (10.2.2, 10.2.3)
  - D) Não: em 480 V o arco só é tratado dentro da zona controlada — *por que não:* O 10.2.3 não distingue tensão nem depende da zona controlada; o Anexo IV tem linhas de CCM de 600 V. (10.2.3, AIV-I)
  - E) Sim, mas só se ele for eletricista — *por que não:* O alcance do 10.2.3 depende da exposição ao arco, não da função. Quem faz atividade não elétrica só fica dispensado de EPI de arco se a análise de risco mostrar que não está exposto (10.11.2.4). (10.2.3, 10.11.2.4)
- **Explicação:** Choque depende de contato; arco irradia energia a distância. Por isso o 10.2.3 estende o alcance da norma para além da geometria das zonas.
- **Itens citados:** 10.2.3 · g-dseg
- **Situação:** a validar

### V-32550f · Energizado e proximidade
- **Pergunta:** Intervenção energizada em 13,8 kV dentro da zona de risco. O religador do alimentador está em automático.
- **Alternativas** (✔ = resposta do simulador):
  - A) Pode seguir com EPI adequado — *por que não:* EPI é o último nível da hierarquia (10.5.4) e não substitui a desativação exigida pelo 10.14.3. (10.14.3, 10.5.4)
  - **✔** B) Desativar (bloquear) o religamento automático e sinalizar essa condição antes de intervir
  - C) Basta avisar o centro de operação — *por que não:* Avisar não desativa nada: o 10.14.3 exige a desativação (bloqueio) do religamento automático. (10.14.3)
  - D) Desativar o religamento só se a intervenção for no SEP — *por que não:* O 10.14.3 vale para intervenção energizada em MT/AT dentro da zona de risco, no SEP ou fora dele. (10.14.3)
  - E) Desativar o religamento; sinalizar é opcional — *por que não:* O 10.14.3.1 exige sinalizar os dispositivos desativados com a identificação da condição de desativação. (10.14.3.1)
- **Explicação:** —
- **Itens citados:** 10.14.3 · 10.14.3.1
- **Situação:** a validar

### V-45657a · Energizado e proximidade
- **Pergunta:** Uma pessoa sem treinamento liga o disjuntor de iluminação num quadro de BT projetado para operação segura.
- **Alternativas** (✔ = resposta do simulador):
  - A) Proibido: só autorizados — *por que não:* O 10.14.1 exige autorizados nos serviços em eletricidade, mas o 10.14.1.1 abre exceção para operações elementares em BT. (10.14.1, 10.14.1.1)
  - **✔** B) Permitido: é operação elementar
  - C) Exige permissão de trabalho — *por que não:* Operação elementar não é serviço em eletricidade: pode ser feita por qualquer pessoa não advertida (10.14.1.1). (10.14.1.1, g-opel)
  - D) Permitido só para quem tem o treinamento Básico — *por que não:* O 10.14.1.1 admite qualquer pessoa não advertida. (10.14.1.1)
  - E) Permitido em qualquer tensão, por ser só ligar e desligar — *por que não:* O 10.14.1.1 restringe a operação elementar à baixa tensão, em sistemas projetados e mantidos para uso seguro. (10.14.1.1)
- **Explicação:** —
- **Itens citados:** 10.14.1.1 · g-opel
- **Situação:** a validar

### V-acb3a2 · Energizado e proximidade
- **Pergunta:** Serviço energizado em 13,8 kV na cabine de uma indústria (SEC). Um eletricista pode fazê-lo sozinho?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim, se for PLH — *por que não:* A habilitação não muda a vedação do 10.14.2. (10.14.2)
  - **✔** B) Não: serviço energizado em MT/AT nunca é individual
  - C) Sim, se a permissão de trabalho autorizar — *por que não:* A PT não afasta a vedação do 10.14.2. (10.14.2, 10.7.2)
  - D) Sim, porque o 10.14.2 só vale para o SEP — *por que não:* O 10.14.2 alcança também serviços energizados em MT/AT fora do SEP. (10.14.2)
  - E) Não, salvo com o religamento automático bloqueado — *por que não:* Bloquear o religamento (10.14.3) é exigência a mais na zona de risco; não substitui a equipe do 10.14.2. (10.14.3, 10.14.2)
- **Explicação:** Quem está sozinho não tem quem desligue a fonte, chame socorro ou faça o resgate. O 10.14.2 vale para MT/AT energizada e para todo serviço no SEP.
- **Itens citados:** 10.14.2
- **Situação:** a validar

### V-19f0ed · Energizado e proximidade
- **Pergunta:** Sem outra previsão em regulamento, fabricante ou critério do PLH, com que frequência se ensaiam luvas isolantes de BT?
- **Alternativas** (✔ = resposta do simulador):
  - A) A cada 2 anos — *por que não:* Bienal é o treinamento periódico (10.9.10), não o ensaio; sem outra previsão, o ensaio é anual. (10.14.4.1, 10.9.10)
  - **✔** B) Anualmente
  - C) Só quando apresentarem defeito — *por que não:* O ensaio é periódico, e não fazê-lo é grave e iminente risco (10.16.1 d). (10.14.4.1, 10.16.1)
  - D) A cada 6 meses, sempre — *por que não:* A NR-10 não fixa 6 meses: vale o menor intervalo entre regulamentações, fabricante e PLH; sem previsão, anual. (10.14.4.1)
  - E) Não precisam de ensaio, por serem de baixa tensão — *por que não:* O 10.14.4 b inclui expressamente luvas e mangas isolantes para baixa tensão. (10.14.4)
- **Explicação:** Vale o menor intervalo entre regulamentações, fabricante e PLH; na ausência de previsão, anual. Não ensaiar é GIR.
- **Itens citados:** 10.14.4 · 10.14.4.1 · 10.16.1
- **Situação:** a validar

### V-e19503 · Energizado e proximidade
- **Pergunta:** Ensaios elétricos de campo e o comissionamento de uma instalação seguem qual regime?
- **Alternativas** (✔ = resposta do simulador):
  - A) Livre, pois a instalação ainda não opera — *por que não:* O 10.12.1 vale independentemente do estado de energização, e o 10.12.9 remete ensaios e comissionamento ao 10.14. (10.12.1, 10.12.9)
  - **✔** B) O do 10.14 (energizado), sob responsabilidade de PLH, realizados por profissional autorizado
  - C) O do 10.13, porque a instalação ainda não foi energizada — *por que não:* O 10.12.9 manda ensaios e comissionamento atenderem ao 10.14 (energizado), não ao 10.13. (10.12.9)
  - D) O do 10.14, feitos por qualquer eletricista, sem PLH — *por que não:* O 10.12.9 exige responsabilidade de PLH e execução por profissional autorizado. (10.12.9)
  - E) Só o procedimento do fabricante do equipamento — *por que não:* A NR-10 define o regime: capítulo 10.14, sob responsabilidade de PLH (10.12.9). (10.12.9)
- **Explicação:** —
- **Itens citados:** 10.12.9 · 10.14.1
- **Situação:** a validar

### V-53f97a · Energizado e proximidade
- **Pergunta:** O eletricista no pátio não vê o colega na sala de comando. O que a norma exige?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada, se houver procedimento — *por que não:* O 10.12.4 garante comunicação direta e visual em todo serviço; sem ela, vale o 10.12.4.1. (10.12.4, 10.12.4.1)
  - **✔** B) Equipamentos de comunicação em perfeito estado, com comunicação permanente com a equipe e a sala de comando
  - C) Parar o serviço até haver contato visual — *por que não:* A norma não manda parar: sem comunicação direta e visual, exige equipamentos de comunicação (10.12.4.1). (10.12.4.1)
  - D) Rádio, só se houver sinal de celular no local — *por que não:* Os equipamentos devem permitir comunicação permanente independentemente das condições locais, de interferências ou da ausência de sinais. (10.12.4.1)
  - E) Comunicação com o colega; com a sala de comando é opcional — *por que não:* O 10.12.4.1 inclui o centro de operação ou a sala de comando. (10.12.4.1)
- **Explicação:** —
- **Itens citados:** 10.12.4 · 10.12.4.1
- **Situação:** a validar

### V-aa520b · Energizado e proximidade
- **Pergunta:** Uma fábrica tem cogeração própria. O que ela precisa garantir em relação à rede?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada, a concessionária se protege — *por que não:* O 10.14.5 põe a obrigação em quem possui geração própria. (10.14.5)
  - **✔** B) Medidas que impeçam a energização de instalações de outras organizações, salvo condições autorizadas pela ANEEL
  - C) Desligar a cogeração só quando a distribuidora pedir — *por que não:* O 10.14.5 exige medidas que impeçam energizar instalações de outras organizações, não uma ação sob pedido. (10.14.5)
  - D) Medidas que impeçam a energização, sem nenhuma exceção — *por que não:* O 10.14.5 ressalva as condições autorizadas pela ANEEL. (10.14.5)
  - E) Nada, se a cogeração for de fonte renovável — *por que não:* O 10.14.5 não distingue a fonte da geração própria. (10.14.5)
- **Explicação:** É o retorno de tensão pela rede, que pega desprevenido quem trabalha num circuito que deveria estar sem fonte.
- **Itens citados:** 10.14.5
- **Alertas:** outra norma ou concessionária
- **Situação:** a validar

### V-669872 · Energizado e proximidade
- **Pergunta:** Um circuito foi desligado, mas um gerador portátil pode realimentá-lo. Como ele deve ser tratado?
- **Alternativas** (✔ = resposta do simulador):
  - A) Como desenergizado — *por que não:* Só é desenergizada a instalação liberada pela sequência do 10.13.1; desligada com possibilidade de energização segue o 10.14 (10.5.2). (10.5.2, 10.13.1)
  - **✔** B) Como energizado, seguindo o capítulo 10.14, até que toda a sequência de desenergização seja cumprida
  - C) Como desenergizado, se o disjuntor estiver bloqueado — *por que não:* O bloqueio cuida de uma fonte; com outra fonte possível, a instalação continua com possibilidade de energização. (10.5.2, 10.13.1)
  - D) Como energizado só enquanto o gerador estiver ligado — *por que não:* O 10.5.2 fala em possibilidade de energização por qualquer meio ou razão; não importa o gerador estar ligado agora. (10.5.2)
  - E) Como extrabaixa tensão, por ser fonte portátil — *por que não:* A faixa depende do valor da tensão, não de a fonte ser portátil. (g-ebt)
- **Explicação:** —
- **Itens citados:** 10.5.2 · 10.13.1
- **Situação:** a validar

### V-55f09c · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “O QDC tem disjuntor geral com dispositivo para cadeado e etiqueta que indica se o circuito está ligado ou desligado.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Conforme: atende ao desligamento com impedimento de reenergização e indicação da condição operativa (10.4.1)
  - B) Não conforme: o 10.4.1 exige seccionamento de ação simultânea em todo circuito — *por que não:* Ação simultânea é o 10.4.2, e na medida do possível; o 10.4.1 pede impedimento de reenergização e sinalização com indicação da condição operativa. (10.4.1, 10.4.2)
  - C) Não conforme: todo QDC precisa de aterramento fixo no seccionamento — *por que não:* Recursos fixos de aterramento são exigidos quando tecnicamente viáveis e necessários (10.4.5); o que todo projeto prevê são condições para aterramento temporário (10.4.6). (10.4.5, 10.4.6)
  - D) Conforme, mas só porque o QDC é de média tensão — *por que não:* O 10.4.1 vale para os projetos de instalações elétricas em geral, sem faixa de tensão. (10.4.1)
  - E) Não conforme: a etiqueta precisa ser substituída por cadeado — *por que não:* O 10.4.1 pede os dois: recurso para impedimento de reenergização e sinalização com indicação da condição operativa. (10.4.1)
- **Explicação:** Atende ao desligamento com impedimento de reenergização e indicação da condição operativa.
- **Itens citados:** 10.4.1
- **Situação:** a validar

### V-538824 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “O motor trifásico da bomba é seccionado por três disjuntores monopolares independentes, sem acoplamento.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não conforme: o projeto deve prever, na medida do possível, seccionamento de ação simultânea (10.4.2)
  - B) Conforme: três disjuntores monopolares cortam as três fases, o que basta — *por que não:* Cortar as fases uma a uma não é ação simultânea, que o 10.4.2 pede na medida do possível. (10.4.2)
  - C) Conforme: ação simultânea só é exigida em MT/AT — *por que não:* O 10.4.2 não tem faixa de tensão. (10.4.2)
  - D) Não conforme: o circuito do motor exige DDR pelo 10.6.4 — *por que não:* O 10.6.4 lista os circuitos com DDR obrigatório (áreas molhadas, tomadas externas etc.); o problema aqui é o seccionamento. (10.6.4, 10.4.2)
  - E) Conforme, desde que cada disjuntor tenha etiqueta própria — *por que não:* Sinalização não supre o seccionamento de ação simultânea do 10.4.2. (10.4.2)
- **Explicação:** O projeto deve prever, na medida do possível, seccionamento de ação simultânea.
- **Itens citados:** 10.4.2
- **Situação:** a validar

### V-884c4e · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “Cabos de CFTV e de força passam no mesmo eletroduto, sem definição no projeto.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não conforme: circuitos de finalidades distintas são identificados e instalados separadamente, salvo compartilhamento definido em projeto (10.4.3.1)
  - B) Conforme: compartilhar eletroduto é sempre permitido se os cabos forem isolados — *por que não:* O compartilhamento só vale quando a tecnologia permite e está definido em projeto. (10.4.3.1)
  - C) Não conforme só por falta de identificação; separar não é exigido — *por que não:* O 10.4.3.1 exige identificar e instalar separadamente. (10.4.3.1)
  - D) Conforme, se o eletricista registrar a decisão na PT — *por que não:* A exceção do 10.4.3.1 depende do projeto, não da PT. (10.4.3.1)
  - E) Conforme: o 10.4.3.1 só trata de circuitos de tração elétrica — *por que não:* Tração é só um dos exemplos; o item cita comunicação, sinalização, controle e tração. (10.4.3.1)
- **Explicação:** Circuitos de finalidades distintas são identificados e instalados separadamente, salvo compartilhamento definido em projeto.
- **Itens citados:** 10.4.3.1 · 10.12.10
- **Situação:** a validar

### V-68219e · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “O projeto não especifica o esquema de aterramento nem se neutro e PE são interligados.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não conforme: o projeto define o esquema de aterramento e se neutro e PE são interligados (10.4.4)
  - B) Conforme: isso é decidido na obra pelo eletricista — *por que não:* O 10.4.4 põe essa definição no projeto. (10.4.4)
  - C) Conforme: basta o projeto prever aterramento temporário — *por que não:* As condições de aterramento temporário (10.4.6) são outro requisito e não substituem o 10.4.4. (10.4.6, 10.4.4)
  - D) Não conforme: o projeto deve sempre interligar neutro e PE — *por que não:* O 10.4.4 manda definir a obrigatoriedade ou não da interligação; não impõe uma resposta. (10.4.4)
  - E) Conforme, se as medições de aterramento forem documentadas — *por que não:* Documentar inspeções e medições (10.15.3) não substitui a definição no projeto. (10.15.3, 10.4.4)
- **Explicação:** Esses dois pontos são conteúdo obrigatório do projeto.
- **Itens citados:** 10.4.4
- **Situação:** a validar

### V-2c8227 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “Não há ponto previsto para conectar aterramento temporário no QGBT.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não conforme: todo projeto prevê condições para a adoção de aterramento temporário (10.4.6)
  - B) Conforme: aterramento temporário só é usado em média e alta tensão — *por que não:* O 10.4.6 diz todo projeto, e a alínea d do 10.13.1 não tem faixa de tensão. (10.4.6, 10.13.1)
  - C) Conforme: o 10.4.5 só pede recursos fixos quando viável e necessário — *por que não:* O 10.4.5 trata de aterramento fixo no seccionamento; o temporário é o 10.4.6, sem condição. (10.4.5, 10.4.6)
  - D) Não conforme: o QGBT precisa de chave de aterramento fixa — *por que não:* O recurso fixo é exigido quando tecnicamente viável e necessário (10.4.5); a exigência sem condição é a do temporário (10.4.6). (10.4.5, 10.4.6)
  - E) Conforme, se a equipe levar o próprio conjunto de aterramento — *por que não:* Levar o conjunto não supre as condições que o projeto deve prever no QGBT. [INTERPRETAÇÃO] (10.4.6)
- **Explicação:** Todo projeto prevê condições para aterramento temporário.
- **Itens citados:** 10.4.6
- **Situação:** a validar

### V-914aa5 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “O memorial descreve o princípio de funcionamento dos DR e sua compatibilidade com a instalação.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Conforme: atende às alíneas e e f do conteúdo mínimo do memorial (10.4.9)
  - B) Não conforme: o funcionamento da proteção é assunto do procedimento de trabalho — *por que não:* O conteúdo do procedimento está no 10.7.1.1; o princípio funcional dos dispositivos de proteção é a alínea e do memorial. (10.4.9, 10.7.1.1)
  - C) Não conforme: o memorial deveria trazer o estudo de energia incidente no lugar disso — *por que não:* O estudo de energia incidente é o 10.4.12, quando aplicável; não substitui as alíneas e e f do 10.4.9. (10.4.12, 10.4.9)
  - D) Conforme, mas é opcional: o 10.4.9 é só recomendação — *por que não:* O 10.4.9 lista o conteúdo mínimo do memorial: é obrigatório. (10.4.9)
  - E) Não conforme: DR não pode constar do memorial, só do diagrama — *por que não:* A alínea e pede justamente o princípio funcional dos dispositivos de proteção destinados à segurança das pessoas. (10.4.9)
- **Explicação:** Alíneas e e f do memorial descritivo.
- **Itens citados:** 10.4.9
- **Situação:** a validar

### V-c74b39 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “O projeto veio de um escritório no exterior e não tem responsável técnico habilitado no Brasil.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não conforme: projeto elaborado fora do Brasil fica sob responsabilidade técnica de PLH (10.4.8.1)
  - B) Conforme: basta seguir a norma internacional aplicável — *por que não:* Normas internacionais entram na ausência ou omissão das oficiais (10.2.1), mas o projeto continua sob PLH (10.4.8.1). (10.2.1, 10.4.8.1)
  - C) Conforme, se o projeto for traduzido para o português — *por que não:* A língua portuguesa é exigência da documentação (10.15.1); não substitui o PLH. (10.15.1, 10.4.8.1)
  - D) Não conforme: projeto elaborado fora do Brasil é proibido — *por que não:* O 10.4.8.1 admite o projeto de fora, sob responsabilidade técnica de PLH. (10.4.8.1)
  - E) Conforme, se o eletricista autorizado assinar o projeto — *por que não:* Autorização não é habilitação: a responsabilidade é de PLH (10.4.8, 10.8.2). (10.4.8, 10.8.2)
- **Explicação:** Projeto feito fora do Brasil fica sob responsabilidade técnica de PLH.
- **Itens citados:** 10.4.8.1 · 10.4.8
- **Situação:** a validar

### V-3de562 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “A garagem foi ampliada, mas o projeto ficou na versão original.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não conforme: o projeto é mantido atualizado de forma a corresponder ao executado (10.4.13)
  - B) Conforme: ampliação pequena dispensa atualização — *por que não:* O 10.4.13 não tem limite de porte. (10.4.13)
  - C) Conforme, se a ampliação estiver anotada na PT do serviço — *por que não:* A PT é encerrada e arquivada (10.7.2.3), mas não atualiza o projeto. (10.7.2.3, 10.4.13)
  - D) Não conforme, e é grave e iminente risco pelo 10.16.1 — *por que não:* Projeto desatualizado não está entre as quatro situações do 10.16.1. (10.16.1)
  - E) Conforme: atualizar o projeto só é exigido de quem tem PIE — *por que não:* O 10.4.13 vale para todo projeto, e toda organização dispõe de projeto (10.15.3). (10.4.13, 10.15.3)
- **Explicação:** O projeto corresponde ao executado.
- **Itens citados:** 10.4.13 · 10.4.7
- **Situação:** a validar

### V-000d07 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “A frente do QGBT tem espaço livre e iluminação suficiente para manutenção.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Conforme: atende ao espaço seguro (10.4.3) e à iluminação adequada com posição de trabalho segura (10.4.10)
  - B) Não conforme: iluminação é tema só da NR-17, fora do projeto elétrico — *por que não:* O 10.4.10 põe a iluminação no projeto, de acordo com a NR-17. (10.4.10)
  - C) Não conforme: espaço livre só é exigido em MT/AT — *por que não:* O 10.4.3 não tem faixa de tensão. (10.4.3)
  - D) Conforme, mas o espaço seguro só vale durante a construção — *por que não:* O 10.4.3 considera a operação e os serviços de construção e manutenção. (10.4.3)
  - E) Não conforme: a frente do QGBT deveria ter armário para guardar ferramentas — *por que não:* Pelo 10.12.8, locais de serviços elétricos e invólucros não podem guardar objetos. (10.12.8)
- **Explicação:** Espaço seguro e iluminação adequada conforme NR-17.
- **Itens citados:** 10.4.3 · 10.4.10
- **Situação:** a validar

### V-5126d4 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “Para o QGBT de 380 V com 30 kA de curto presumido, o projeto inclui estudo de energia incidente.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Conforme: o projeto considera, quando aplicável, o estudo de energia incidente (10.4.12)
  - B) Não conforme: estudo de energia incidente só vale para MT/AT — *por que não:* O 10.4.12 não tem faixa de tensão. (10.4.12)
  - C) Não conforme: com estudo, o Anexo IV fica proibido — *por que não:* Os dois convivem: o 10.11.2.3 exige o estudo fora das condições do Anexo IV ou para categoria menor que a dele. (10.11.2.3)
  - D) Conforme, e o estudo é obrigatório em todo QGBT — *por que não:* A resposta é "conforme", mas o 10.4.12 diz quando aplicável. (10.4.12)
  - E) Não conforme: o estudo fica no PIE, não no projeto — *por que não:* O 10.4.12 põe o estudo no projeto; o PIE organiza a documentação de quem integra o SEP ou atua em MT/AT (10.15.6). (10.4.12, 10.15.6)
- **Explicação:** Estudo de energia incidente quando aplicável, para definir a proteção contra os efeitos térmicos do arco.
- **Itens citados:** 10.4.12 · 10.6.5
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-5632f0 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “O projeto fica trancado na sala do engenheiro e os eletricistas autorizados não têm acesso.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não conforme: o projeto fica disponível aos autorizados, às autoridades competentes e a outras pessoas autorizadas pela organização (10.4.7)
  - B) Conforme: o projeto é documento sigiloso da organização — *por que não:* O 10.4.7 e o 10.15.2 exigem disponibilidade. (10.4.7, 10.15.2)
  - C) Conforme, se uma cópia for mostrada à fiscalização quando pedida — *por que não:* Os autorizados também têm acesso, e a documentação fica sempre disponível. (10.4.7, 10.15.2)
  - D) Não conforme: o projeto deve ficar afixado na porta do QGBT — *por que não:* A norma exige disponibilidade, não afixação; o meio digital é admitido (10.15.1). (10.4.7, 10.15.1)
  - E) Não conforme: o projeto deve estar disponível a qualquer pessoa — *por que não:* O 10.4.7 limita aos autorizados, às autoridades e a outras pessoas autorizadas pela organização. (10.4.7)
- **Explicação:** O projeto fica disponível aos trabalhadores autorizados, às autoridades e a outras pessoas autorizadas.
- **Itens citados:** 10.4.7 · 10.15.2
- **Situação:** a validar

### V-96ee8d · Proteção coletiva
- **Pergunta:** Como regra, a proteção coletiva contra choque é assegurada por quê?
- **Alternativas** (✔ = resposta do simulador):
  - A) Só pela proteção básica — *por que não:* Uma só proteção vale apenas nas condições das normas técnicas, descritas no memorial (10.6.1.2); a regra é a combinação (10.6.1.1). (10.6.1.1, 10.6.1.2)
  - **✔** B) Pela aplicação conjunta de proteção básica e supletiva, por meios independentes ou por medida que garanta as duas
  - C) Pelo DDR, que substitui as demais — *por que não:* O DDR é proteção adicional obrigatória nos casos do 10.6.4; não substitui a básica nem a supletiva. (10.6.4, g-adic)
  - D) Só pela proteção supletiva, desde que haja aterramento — *por que não:* O 10.6.1.1 pede as duas em conjunto; uma só, apenas nas condições do 10.6.1.2. (10.6.1.1, 10.6.1.2)
  - E) Pelo EPI isolante, a última barreira — *por que não:* EPI é proteção individual, último nível da hierarquia do 10.5.4; não é medida coletiva. (10.5.4, 10.11.1)
- **Explicação:** Duas camadas independentes: uma impede o contato com a parte viva, a outra impede que a massa fique perigosa se a primeira falhar. Só nas condições das normas técnicas, descritas no memorial, admite-se uma delas.
- **Itens citados:** 10.6.1.1 · 10.6.1.2
- **Situação:** a validar

### V-769935 · Proteção coletiva
- **Pergunta:** Obstáculos e colocação fora do alcance são classificados como…
- **Alternativas** (✔ = resposta do simulador):
  - A) proteção básica completa — *por que não:* A proteção básica se faz por isolação, barreiras ou invólucros e limitação da tensão (10.6.2); o obstáculo não impede o contato deliberado. (10.6.2, 10.6.2.1)
  - **✔** B) proteção parcial, aplicável conforme normas técnicas
  - C) proteção supletiva — *por que não:* Supletiva cuida de massas acidentalmente vivas: seccionamento automático, aterramento, equipotencialização, isolação suplementar e separação elétrica (10.6.3). (10.6.3)
  - D) proteção adicional, como o DDR — *por que não:* Proteção adicional é a do DDR do 10.6.4; obstáculo é proteção parcial. (g-adic, 10.6.2.1)
  - E) medida proibida pela NR-10 — *por que não:* O 10.6.2.1 admite, conforme requisitos de normas técnicas. (10.6.2.1)
- **Explicação:** O obstáculo impede o contato acidental, mas não o contato deliberado. Por isso a norma o chama de proteção parcial.
- **Itens citados:** 10.6.2.1 · g-adic
- **Situação:** a validar

### V-72648f · Proteção coletiva
- **Pergunta:** Qual destas NÃO está entre as medidas coletivas contra arco do 10.6.5?
- **Alternativas** (✔ = resposta do simulador):
  - A) Painel resistente a arco — *por que não:* Está no 10.6.5, alínea b. (10.6.5)
  - B) Seleção de tempos de interrupção muito curtos — *por que não:* Está no 10.6.5, alínea h. (10.6.5)
  - **✔** C) Vestimenta AR de categoria 2
  - D) Chave de aterramento resistente ao curto-circuito presumido — *por que não:* Está no 10.6.5, alínea d. (10.6.5)
  - E) Dispositivos limitadores de corrente — *por que não:* Está no 10.6.5, alínea g. (10.6.5)
- **Explicação:** Vestimenta é EPI, último nível da hierarquia (10.11). As demais alternativas são medidas coletivas do 10.6.5.
- **Itens citados:** 10.6.5 · 10.11.2
- **Situação:** a validar

### V-4f9fb1 · Proteção coletiva
- **Pergunta:** Um motor à prova de explosão foi reparado e volta para a área classificada. O que a norma exige?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada, se o reparo foi bem feito — *por que não:* O 10.6.6.1.1 cita expressamente os equipamentos reparados. (10.6.6.1.1)
  - **✔** B) Seleção e manutenção conforme o estudo de classificação de áreas e certificado segundo as normas técnicas
  - C) Apenas novo ensaio dielétrico — *por que não:* O 10.6.6.1.1 pede seleção e manutenção conforme o estudo de classificação de áreas, com certificado; um ensaio não substitui isso. (10.6.6.1.1)
  - D) Só pode voltar se for trocado por motor novo — *por que não:* O reparado pode voltar, selecionado e mantido conforme o estudo e certificado. (10.6.6.1.1)
  - E) Certificado só é exigido de equipamento importado — *por que não:* O 10.6.6.1.1 alcança fabricados, importados e reparados. (10.6.6.1.1)
- **Explicação:** —
- **Itens citados:** 10.6.6.1.1
- **Situação:** a validar

### V-794496 · Proteção coletiva
- **Pergunta:** Serviço em eletricidade dentro de área classificada exige…
- **Alternativas** (✔ = resposta do simulador):
  - A) só procedimento de trabalho — *por que não:* Na área classificada o 10.6.6.1.2 soma PT, análise de risco, procedimento e trabalhador autorizado. (10.6.6.1.2)
  - **✔** B) permissão de trabalho precedida de análise de risco, procedimento de trabalho e trabalhador autorizado
  - C) só treinamento Complementar de Área Classificada — *por que não:* O complementar (10.9.7) é exigido, mas não basta: o 10.6.6.1.2 pede PT e procedimento. (10.9.7, 10.6.6.1.2)
  - D) PT só se a atividade for não rotineira — *por que não:* Na área classificada o 10.6.6.1.2 exige PT sem distinguir rotineira e não rotineira. (10.6.6.1.2)
  - E) Permissão de trabalho aprovada pelo bombeiro civil — *por que não:* A PT é precedida de análise de risco e o serviço é feito por trabalhador autorizado; a NR-10 não dá esse papel ao bombeiro. (10.6.6.1.2, 10.7.2)
- **Explicação:** Note que aqui a PT é obrigatória mesmo que a atividade seja rotineira. O treinamento complementar de 16 h também é exigido, pelo 10.9.7.
- **Itens citados:** 10.6.6.1.2 · 10.9.7
- **Situação:** a validar

### V-99d1db · Proteção coletiva
- **Pergunta:** Um processo acumula eletricidade estática capaz de provocar ignição. O que a norma pede?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sinalização apenas — *por que não:* O 10.6.6.2 exige proteção específica e dispositivos de descarga. (10.6.6.2)
  - **✔** B) Proteção específica e dispositivos de descarga elétrica, conforme projeto
  - C) EPI antiestático para todos — *por que não:* EPI é o último nível (10.5.4); o 10.6.6.2 exige medida no processo ou equipamento. (10.6.6.2, 10.5.4)
  - D) Nada, se a instalação for de extrabaixa tensão — *por que não:* O 10.6.6 (explosão e incêndio) vale até para a EBT, pela exceção do 10.2.4. (10.6.6.2, 10.2.4)
  - E) Proteção específica, sem precisar constar do projeto — *por que não:* O 10.6.6.2 diz conforme projeto. (10.6.6.2)
- **Explicação:** —
- **Itens citados:** 10.6.6.2
- **Situação:** a validar

### V-a5290a · Proteção coletiva
- **Pergunta:** Proteção contra sobretensões e contra descargas atmosféricas são…
- **Alternativas** (✔ = resposta do simulador):
  - A) opcionais — *por que não:* A organização deve adotar as duas (10.6.7, 10.6.8). (10.6.7, 10.6.8)
  - **✔** B) medidas de proteção coletiva definidas em projeto, observando as normas técnicas citadas no 10.2.1
  - C) responsabilidade exclusiva da concessionária — *por que não:* A obrigação é da organização, conforme o próprio projeto. (10.6.7, 10.6.8)
  - D) medidas de proteção individual — *por que não:* Estão no capítulo de proteção coletiva. (10.6.7, 10.6.8)
  - E) exigidas só em área classificada — *por que não:* O 10.6.7 e o 10.6.8 não se limitam a área classificada. (10.6.7, 10.6.8)
- **Explicação:** —
- **Itens citados:** 10.6.7 · 10.6.8 · 10.2.1
- **Situação:** a validar

### V-c8e3e0 · Proteção coletiva
- **Pergunta:** Instalação elétrica de área classificada sem medidas de proteção coletiva caracteriza…
- **Alternativas** (✔ = resposta do simulador):
  - A) não conformidade comum — *por que não:* Está na alínea a do 10.16.1. (10.16.1)
  - **✔** B) grave e iminente risco, com embargo ou interdição sem a metodologia da NR-3
  - C) infração apenas da NR-23 — *por que não:* O 10.6.6 remete à NR-23, mas a falta de proteção coletiva em área classificada é grave e iminente risco da própria NR-10 (10.16.1 a). (10.6.6, 10.16.1)
  - D) grave e iminente risco, mas a interdição segue a metodologia da NR-3 — *por que não:* O 10.16.1 dispensa justamente a metodologia da NR-3 nessas situações. (10.16.1)
  - E) grave e iminente risco só se houver atmosfera explosiva no momento — *por que não:* A alínea a do 10.16.1 é a ausência de medidas coletivas em instalações de áreas classificadas, sem essa condição. (10.16.1)
- **Explicação:** —
- **Itens citados:** 10.16.1 · 10.6.6.1
- **Situação:** a validar

### V-bd049e · Proteção individual e arco
- **Pergunta:** Painel 220 V · Icc 18 kA · eliminação 0,03 s · trabalho a 455 mm
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Categoria 1
  - B) Categoria 2 — *por que não:* Categoria 2 é a linha de painéis acima de 240 V até 600 V; 220 V fica na linha de até 240 V. (AIV-I)
  - C) Categoria 3 — *por que não:* O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC). (AIV-I)
  - D) Categoria 4 — *por que não:* Categoria 4 vem de tempos maiores (0,24 a 0,5 s) ou de 1 a 15 kV; com 0,03 s este painel cabe na linha da Categoria 1. (AIV-I)
  - E) Fora do Anexo IV · estudo de energia incidente — *por que não:* 18 kA ≤ 25 kA, 0,03 s ≤ 0,03 s e 455 mm ≥ 455 mm: os parâmetros cabem na linha, considerados em conjunto. (10.11.2.1, AIV-I)
- **Explicação:** Linha dos painéis de até 240 V: até 25 kA, 0,03 s, 455 mm → Categoria 1 (mínimo 4 cal/cm²).
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-27a0f6 · Proteção individual e arco
- **Pergunta:** Painel 440 V · Icc 22 kA · 0,03 s · 455 mm
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1 — *por que não:* Categoria 1 é a linha de até 240 V; 440 V está acima. (AIV-I)
  - **✔** B) Categoria 2
  - C) Categoria 3 — *por que não:* O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC). (AIV-I)
  - D) Categoria 4 — *por que não:* Os parâmetros cabem na linha dos painéis de 240 a 600 V (25 kA, 0,03 s, 455 mm): Categoria 2. (AIV-I)
  - E) Fora do Anexo IV · estudo de energia incidente — *por que não:* 22 kA ≤ 25 kA, 0,03 s e 455 mm: cabe na linha. (10.11.2.1, AIV-I)
- **Explicação:** Painéis acima de 240 V até 600 V, até 25 kA → Categoria 2 (mínimo 8 cal/cm²).
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-f9894c · Proteção individual e arco
- **Pergunta:** CCM 480 V · Icc 40 kA · eliminação 0,30 s · 455 mm
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1 — *por que não:* Categoria 1 só existe na linha de painéis ou outros equipamentos de até 240 V. (AIV-I)
  - B) Categoria 2 — *por que não:* A linha de CCM com Categoria 2 exige 0,03 s; com 0,30 s vale a linha de 42 kA e 0,33 s. (AIV-I)
  - C) Categoria 3 — *por que não:* O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC). (AIV-I)
  - **✔** D) Categoria 4
  - E) Fora do Anexo IV · estudo de energia incidente — *por que não:* 40 kA ≤ 42 kA e 0,30 s ≤ 0,33 s, a 455 mm: cabe na linha de CCM da Categoria 4. (AIV-I, 10.11.2.1)
- **Explicação:** Cabe na linha CCM 42 kA e 0,33 s → Categoria 4. Com 0,03 s seria Categoria 2: o tempo de eliminação pesa mais que a corrente.
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-4463df · Proteção individual e arco
- **Pergunta:** Cubículo metal-clad 13,8 kV · Icc 31,5 kA · 0,20 s · 910 mm
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1 — *por que não:* Categoria 1 só existe na linha de painéis ou outros equipamentos de até 240 V. (AIV-I)
  - B) Categoria 2 — *por que não:* Categoria 2 só aparece em linhas de até 600 V com 0,03 s. (AIV-I)
  - C) Categoria 3 — *por que não:* O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC). (AIV-I)
  - **✔** D) Categoria 4
  - E) Fora do Anexo IV · estudo de energia incidente — *por que não:* 31,5 kA ≤ 35 kA, 0,20 s ≤ 0,24 s e 910 mm: cabe na linha da aparelhagem revestida de metal. (AIV-I, 10.11.2.1)
- **Explicação:** Aparelhagem revestida de metal de 1 a 15 kV, até 35 kA e 0,24 s → Categoria 4.
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-49bbe9 · Proteção individual e arco
- **Pergunta:** Banco de baterias 220 Vcc · Icc 4 kA · sem dispositivo de proteção conhecido
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1 — *por que não:* O Quadro II (CC) começa na Categoria 2. (AIV-II)
  - B) Categoria 2 — *por que não:* No Quadro II, a Categoria 2 é para corrente abaixo de 3 kA. (AIV-II)
  - **✔** C) Categoria 3
  - D) Categoria 4 — *por que não:* No Quadro II, a Categoria 4 é de 7 kA a menos de 10 kA. (AIV-II)
  - E) Fora do Anexo IV · estudo de energia incidente — *por que não:* 220 V está entre 150 e 600 V, e 4 kA cabe na faixa de 3 a menos de 7 kA; sem proteção conhecida, a nota 2 assume 2 s, que é o parâmetro do próprio quadro. (AIV-II)
- **Explicação:** Quadro II: de 3 a menos de 7 kA → Categoria 3. Sem dispositivo de proteção, assume-se arco de 2 s.
- **Itens citados:** AIV-II
- **Situação:** a validar

### V-7a37c0 · Proteção individual e arco
- **Pergunta:** Painel 380 V · Icc 50 kA · eliminação 0,10 s · 455 mm
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1 — *por que não:* A linha de até 240 V vai só até 25 kA e 0,03 s. (AIV-I)
  - B) Categoria 2 — *por que não:* As linhas de Categoria 2 de até 600 V exigem 0,03 s; aqui são 0,10 s. (AIV-I, 10.11.2.2)
  - C) Categoria 3 — *por que não:* O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC). (AIV-I)
  - D) Categoria 4 — *por que não:* A linha de quadros de distribuição de 600 V (Categoria 4) vai até 35 kA; 50 kA passa. E "painel" é outra linha do quadro. (AIV-I, 10.11.2.2)
  - **✔** E) Fora do Anexo IV · estudo de energia incidente
- **Explicação:** Nenhuma linha cobre 50 kA com 0,10 s: painéis vão até 25 kA, quadros de distribuição até 35 kA, e as linhas de 65 kA exigem 0,03 s. Qualquer parâmetro pior impede o Anexo IV, e a organização faz estudo de energia incidente. Atenção à tradução: no Quadro I, "painéis" e "quadros de distribuição de 600 V" são linhas diferentes (a segunda leva à Categoria 4).
- **Itens citados:** 10.11.2.2 · 10.11.2.3 · 10.6.5
- **Situação:** a validar

### V-da4079 · Proteção individual e arco
- **Pergunta:** Painel 220 V · Icc 20 kA · 0,03 s · protegido por fusível limitador de 160 A. Qual a menor categoria que o Anexo IV admite?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Categoria 1
  - B) Categoria 2 — *por que não:* A linha de até 240 V já dá Categoria 1; a nota só reduz, nunca abaixo da 1. (AIV-I)
  - C) Categoria 3 — *por que não:* O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC). (AIV-I)
  - D) Categoria 4 — *por que não:* Os parâmetros cabem na linha da Categoria 1. (AIV-I)
  - E) Fora do Anexo IV · estudo de energia incidente — *por que não:* 20 kA ≤ 25 kA, 0,03 s e 455 mm: cabe na linha de até 240 V. (AIV-I)
- **Explicação:** A nota permite reduzir uma categoria quando há fusível ou disjuntor limitador de até 200 A, mas nunca abaixo da Categoria 1.
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-7bfcb7 · Proteção individual e arco
- **Pergunta:** Painel 440 V · Icc 20 kA · 0,03 s · protegido por disjuntor limitador de 100 A. Qual a menor categoria que o Anexo IV admite?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Categoria 1
  - B) Categoria 2 — *por que não:* É a categoria da linha, mas a nota permite reduzir um número com fusível ou disjuntor limitador de até 200 A. (AIV-I)
  - C) Categoria 3 — *por que não:* O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC). (AIV-I)
  - D) Categoria 4 — *por que não:* Os parâmetros cabem na linha da Categoria 2, antes da redução. (AIV-I)
  - E) Fora do Anexo IV · estudo de energia incidente — *por que não:* 20 kA ≤ 25 kA, 0,03 s e 455 mm: cabe na linha. (AIV-I)
- **Explicação:** Categoria 2 da linha; a nota permite reduzir uma categoria com limitador de corrente de até 200 A → Categoria 1.
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-4cf6d3 · Proteção individual e arco
- **Pergunta:** Cubículo 13,8 kV resistente a arco · Icc 25 kA · 0,20 s · portas fechadas e travadas · dentro da classificação do equipamento
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1 — *por que não:* Equipamento resistente a arco de 1 a 15 kV, portas fechadas e travadas, dentro da classificação: N/A. (AIV-I)
  - B) Categoria 2 — *por que não:* Equipamento resistente a arco de 1 a 15 kV, portas fechadas e travadas, dentro da classificação: N/A. (AIV-I)
  - C) Categoria 4 — *por que não:* Seria a categoria com a porta aberta, pela linha do equipamento não resistente. (AIV-I)
  - **✔** D) N/A · resistente a arco, portas fechadas
  - E) Fora do Anexo IV · estudo de energia incidente — *por que não:* O Quadro I tem linha própria para equipamentos resistentes a arco de 1 a 15 kV. (AIV-I)
- **Explicação:** Para equipamentos resistentes a arco nessas condições, a categoria é N/A.
- **Itens citados:** AIV-I · 10.6.5
- **Situação:** a validar

### V-350a71 · Proteção individual e arco
- **Pergunta:** O mesmo cubículo resistente a arco (25 kA, 0,20 s, 910 mm), mas com a porta aberta para extrair o disjuntor
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1 — *por que não:* Categoria 1 só existe na linha de painéis ou outros equipamentos de até 240 V. (AIV-I)
  - B) Categoria 2 — *por que não:* Categoria 2 só aparece em linhas de até 600 V. (AIV-I)
  - **✔** C) Categoria 4
  - D) N/A · resistente a arco, portas fechadas — *por que não:* N/A exige portas fechadas e travadas; com a porta aberta vale a linha do equipamento não resistente (nota * do Quadro I). (AIV-I)
  - E) Fora do Anexo IV · estudo de energia incidente — *por que não:* 25 kA ≤ 35 kA, 0,20 s ≤ 0,24 s e 910 mm: cabe na linha da aparelhagem revestida de metal. (AIV-I)
- **Explicação:** Com portas abertas vale a linha do equipamento não resistente a arco: aparelhagem revestida de metal 1–15 kV → Categoria 4.
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-330aec · Documentação e grave e iminente risco
- **Pergunta:** Pelo 10.16.1, como se enquadra esta situação? “Instalação de área classificada sem medidas de proteção coletiva”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Grave e iminente risco: alínea a do 10.16.1 (área classificada sem proteção coletiva)
  - B) Grave e iminente risco: alínea b do 10.16.1 (desenergização ou reenergização fora do 10.13) — *por que não:* A alínea b é a não adoção da sequência de desenergização (10.13.1) ou de reenergização (10.13.2), ou das alternativas do 10.13.4. (10.16.1)
  - C) Grave e iminente risco: alínea c do 10.16.1 (trabalhador que não atende ao capítulo 10.10) — *por que não:* A alínea c é serviço em eletricidade ou trabalho em proximidade feito por quem não atende ao capítulo 10.10 (autorização). (10.16.1)
  - D) Grave e iminente risco: alínea d do 10.16.1 (falta de ensaios e testes de isolação) — *por que não:* A alínea d é a não realização de ensaios e testes de isolação em equipamentos, ferramentas, dispositivos isolantes e EPI/EPC. (10.16.1)
  - E) Não conformidade, mas fora da lista do 10.16.1 — *por que não:* É exatamente a alínea a do 10.16.1: ausência de proteção coletiva em instalação de área classificada. (10.16.1, 10.6.6.1)
- **Explicação:** —
- **Itens citados:** 10.16.1
- **Situação:** a validar

### V-6542af · Documentação e grave e iminente risco
- **Pergunta:** Pelo 10.16.1, como se enquadra esta situação? “Equipe aterrou o circuito sem constatar ausência de tensão”
- **Alternativas** (✔ = resposta do simulador):
  - A) Grave e iminente risco: alínea a do 10.16.1 (área classificada sem proteção coletiva) — *por que não:* A alínea a é só a ausência de medidas de proteção coletiva em instalações elétricas de áreas classificadas. (10.16.1)
  - **✔** B) Grave e iminente risco: alínea b do 10.16.1 (desenergização ou reenergização fora do 10.13)
  - C) Grave e iminente risco: alínea c do 10.16.1 (trabalhador que não atende ao capítulo 10.10) — *por que não:* A alínea c é serviço em eletricidade ou trabalho em proximidade feito por quem não atende ao capítulo 10.10 (autorização). (10.16.1)
  - D) Grave e iminente risco: alínea d do 10.16.1 (falta de ensaios e testes de isolação) — *por que não:* A alínea d é a não realização de ensaios e testes de isolação em equipamentos, ferramentas, dispositivos isolantes e EPI/EPC. (10.16.1)
  - E) Não conformidade, mas fora da lista do 10.16.1 — *por que não:* Aterrar sem constatar a ausência de tensão é não adotar a sequência do 10.13.1 (alínea d): alínea b do 10.16.1. (10.16.1, 10.13.1)
- **Explicação:** Falha na sequência de desenergização.
- **Itens citados:** 10.16.1 · 10.13.1
- **Situação:** a validar

### V-b0ec71 · Documentação e grave e iminente risco
- **Pergunta:** Pelo 10.16.1, como se enquadra esta situação? “Ajudante sem treinamento nem autorização trocando disjuntor energizado no QGBT”
- **Alternativas** (✔ = resposta do simulador):
  - A) Grave e iminente risco: alínea a do 10.16.1 (área classificada sem proteção coletiva) — *por que não:* A alínea a é só a ausência de medidas de proteção coletiva em instalações elétricas de áreas classificadas. (10.16.1)
  - B) Grave e iminente risco: alínea b do 10.16.1 (desenergização ou reenergização fora do 10.13) — *por que não:* A alínea b é a não adoção da sequência de desenergização (10.13.1) ou de reenergização (10.13.2), ou das alternativas do 10.13.4. (10.16.1)
  - **✔** C) Grave e iminente risco: alínea c do 10.16.1 (trabalhador que não atende ao capítulo 10.10)
  - D) Grave e iminente risco: alínea d do 10.16.1 (falta de ensaios e testes de isolação) — *por que não:* A alínea d é a não realização de ensaios e testes de isolação em equipamentos, ferramentas, dispositivos isolantes e EPI/EPC. (10.16.1)
  - E) Não conformidade, mas fora da lista do 10.16.1 — *por que não:* Quem não tem treinamento nem autorização não atende ao capítulo 10.10: alínea c do 10.16.1. (10.16.1, 10.10.2.1)
- **Explicação:** Trabalhador que não atende ao capítulo 10.10.
- **Itens citados:** 10.16.1 · 10.10.2.1
- **Situação:** a validar

### V-e2d9a7 · Documentação e grave e iminente risco
- **Pergunta:** Pelo 10.16.1, como se enquadra esta situação? “Luvas isolantes em uso sem ensaio dielétrico”
- **Alternativas** (✔ = resposta do simulador):
  - A) Grave e iminente risco: alínea a do 10.16.1 (área classificada sem proteção coletiva) — *por que não:* A alínea a é só a ausência de medidas de proteção coletiva em instalações elétricas de áreas classificadas. (10.16.1)
  - B) Grave e iminente risco: alínea b do 10.16.1 (desenergização ou reenergização fora do 10.13) — *por que não:* A alínea b é a não adoção da sequência de desenergização (10.13.1) ou de reenergização (10.13.2), ou das alternativas do 10.13.4. (10.16.1)
  - C) Grave e iminente risco: alínea c do 10.16.1 (trabalhador que não atende ao capítulo 10.10) — *por que não:* A alínea c é serviço em eletricidade ou trabalho em proximidade feito por quem não atende ao capítulo 10.10 (autorização). (10.16.1)
  - **✔** D) Grave e iminente risco: alínea d do 10.16.1 (falta de ensaios e testes de isolação)
  - E) Não conformidade, mas fora da lista do 10.16.1 — *por que não:* EPI isolante sem ensaio é a alínea d do 10.16.1. (10.16.1, 10.14.4)
- **Explicação:** —
- **Itens citados:** 10.16.1 · 10.14.4
- **Situação:** a validar

### V-5304b4 · Documentação e grave e iminente risco
- **Pergunta:** Pelo 10.16.1, como se enquadra esta situação? “Painel com circuitos sem identificação”
- **Alternativas** (✔ = resposta do simulador):
  - A) Grave e iminente risco: alínea a do 10.16.1 (área classificada sem proteção coletiva) — *por que não:* A alínea a é só a ausência de medidas de proteção coletiva em instalações elétricas de áreas classificadas. (10.16.1)
  - B) Grave e iminente risco: alínea b do 10.16.1 (desenergização ou reenergização fora do 10.13) — *por que não:* A alínea b é a não adoção da sequência de desenergização (10.13.1) ou de reenergização (10.13.2), ou das alternativas do 10.13.4. (10.16.1)
  - C) Grave e iminente risco: alínea c do 10.16.1 (trabalhador que não atende ao capítulo 10.10) — *por que não:* A alínea c é serviço em eletricidade ou trabalho em proximidade feito por quem não atende ao capítulo 10.10 (autorização). (10.16.1)
  - D) Grave e iminente risco: alínea d do 10.16.1 (falta de ensaios e testes de isolação) — *por que não:* A alínea d é a não realização de ensaios e testes de isolação em equipamentos, ferramentas, dispositivos isolantes e EPI/EPC. (10.16.1)
  - **✔** E) Não conformidade, mas fora da lista do 10.16.1
- **Explicação:** Não conformidade com 10.7.7, mas fora da lista do 10.16.1.
- **Itens citados:** 10.7.7
- **Situação:** a validar

### V-09f8a2 · Documentação e grave e iminente risco
- **Pergunta:** Pelo 10.16.1, como se enquadra esta situação? “Diagrama unifilar desatualizado”
- **Alternativas** (✔ = resposta do simulador):
  - A) Grave e iminente risco: alínea a do 10.16.1 (área classificada sem proteção coletiva) — *por que não:* A alínea a é só a ausência de medidas de proteção coletiva em instalações elétricas de áreas classificadas. (10.16.1)
  - B) Grave e iminente risco: alínea b do 10.16.1 (desenergização ou reenergização fora do 10.13) — *por que não:* A alínea b é a não adoção da sequência de desenergização (10.13.1) ou de reenergização (10.13.2), ou das alternativas do 10.13.4. (10.16.1)
  - C) Grave e iminente risco: alínea c do 10.16.1 (trabalhador que não atende ao capítulo 10.10) — *por que não:* A alínea c é serviço em eletricidade ou trabalho em proximidade feito por quem não atende ao capítulo 10.10 (autorização). (10.16.1)
  - D) Grave e iminente risco: alínea d do 10.16.1 (falta de ensaios e testes de isolação) — *por que não:* A alínea d é a não realização de ensaios e testes de isolação em equipamentos, ferramentas, dispositivos isolantes e EPI/EPC. (10.16.1)
  - **✔** E) Não conformidade, mas fora da lista do 10.16.1
- **Explicação:** Não conformidade com 10.4.13, mas fora da lista do 10.16.1.
- **Itens citados:** 10.4.13
- **Situação:** a validar

### V-100d21 · Documentação e grave e iminente risco
- **Pergunta:** Pelo 10.16.1, como se enquadra esta situação? “Religaram o disjuntor com o aterramento temporário ainda instalado”
- **Alternativas** (✔ = resposta do simulador):
  - A) Grave e iminente risco: alínea a do 10.16.1 (área classificada sem proteção coletiva) — *por que não:* A alínea a é só a ausência de medidas de proteção coletiva em instalações elétricas de áreas classificadas. (10.16.1)
  - **✔** B) Grave e iminente risco: alínea b do 10.16.1 (desenergização ou reenergização fora do 10.13)
  - C) Grave e iminente risco: alínea c do 10.16.1 (trabalhador que não atende ao capítulo 10.10) — *por que não:* A alínea c é serviço em eletricidade ou trabalho em proximidade feito por quem não atende ao capítulo 10.10 (autorização). (10.16.1)
  - D) Grave e iminente risco: alínea d do 10.16.1 (falta de ensaios e testes de isolação) — *por que não:* A alínea d é a não realização de ensaios e testes de isolação em equipamentos, ferramentas, dispositivos isolantes e EPI/EPC. (10.16.1)
  - E) Não conformidade, mas fora da lista do 10.16.1 — *por que não:* Religar com o aterramento instalado inverte a sequência do 10.13.2 (alínea d antes da g): alínea b do 10.16.1. (10.16.1, 10.13.2)
- **Explicação:** Falha na sequência de reenergização.
- **Itens citados:** 10.16.1 · 10.13.2
- **Situação:** a validar

### V-b2e5ca · Documentação e grave e iminente risco
- **Pergunta:** Pelo 10.16.1, como se enquadra esta situação? “Luminária queimada diante do CCM”
- **Alternativas** (✔ = resposta do simulador):
  - A) Grave e iminente risco: alínea a do 10.16.1 (área classificada sem proteção coletiva) — *por que não:* A alínea a é só a ausência de medidas de proteção coletiva em instalações elétricas de áreas classificadas. (10.16.1)
  - B) Grave e iminente risco: alínea b do 10.16.1 (desenergização ou reenergização fora do 10.13) — *por que não:* A alínea b é a não adoção da sequência de desenergização (10.13.1) ou de reenergização (10.13.2), ou das alternativas do 10.13.4. (10.16.1)
  - C) Grave e iminente risco: alínea c do 10.16.1 (trabalhador que não atende ao capítulo 10.10) — *por que não:* A alínea c é serviço em eletricidade ou trabalho em proximidade feito por quem não atende ao capítulo 10.10 (autorização). (10.16.1)
  - D) Grave e iminente risco: alínea d do 10.16.1 (falta de ensaios e testes de isolação) — *por que não:* A alínea d é a não realização de ensaios e testes de isolação em equipamentos, ferramentas, dispositivos isolantes e EPI/EPC. (10.16.1)
  - **✔** E) Não conformidade, mas fora da lista do 10.16.1
- **Explicação:** Não conformidade com 10.4.10, fora da lista do 10.16.1.
- **Itens citados:** 10.4.10
- **Situação:** a validar

### V-1222cf · Organização do trabalho
- **Pergunta:** Que documento libera esta atividade? “Termografia mensal dos barramentos do QGBT, prevista no plano de manutenção”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Procedimento de trabalho aprovado por PLH: a atividade é rotineira
  - B) Permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado: a atividade é não rotineira — *por que não:* Termografia mensal prevista no plano é habitual e parte do processo contínuo: atividade rotineira, com procedimento (10.7.1). (10.7.1, g-rot)
  - C) Permissão de trabalho, porque toda intervenção com o painel aberto exige PT — *por que não:* A NR-10 não liga a PT a painel aberto: PT é para o não rotineiro (10.7.2); fora de área classificada (10.6.6.1.2), o rotineiro segue procedimento (10.7.1). (10.7.1, 10.7.2, 10.6.6.1.2)
  - D) Procedimento de trabalho, porque a atividade é feita com frequência mensal ou maior — *por que não:* Rotineira independe da frequência (glossário): o critério é ser habitual e fazer parte do processo contínuo de trabalho. Se o documento está certo, o motivo está errado. (g-rot)
  - E) Nenhum documento: basta a ordem de serviço do supervisor — *por que não:* O rotineiro tem procedimento de trabalho (10.7.1) e o não rotineiro tem PT (10.7.2); ordem verbal não é nenhum dos dois. (10.7.1, 10.7.2)
- **Explicação:** Habitual e parte do processo contínuo.
- **Itens citados:** 10.7.1 · g-rot
- **Situação:** a validar

### V-baabf9 · Organização do trabalho
- **Pergunta:** Que documento libera esta atividade? “Troca emergencial de um TC queimado no cubículo de entrada”
- **Alternativas** (✔ = resposta do simulador):
  - A) Procedimento de trabalho aprovado por PLH: a atividade é rotineira — *por que não:* Troca emergencial não é habitual nem parte do processo contínuo: é não rotineira, com PT (10.7.2). (10.7.2, g-rot)
  - **✔** B) Permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado: a atividade é não rotineira
  - C) Permissão de trabalho, porque toda intervenção com o painel aberto exige PT — *por que não:* A NR-10 não liga a PT a painel aberto: PT é para o não rotineiro (10.7.2); fora de área classificada (10.6.6.1.2), o rotineiro segue procedimento (10.7.1). (10.7.1, 10.7.2, 10.6.6.1.2)
  - D) Procedimento de trabalho, porque a atividade é feita com frequência mensal ou maior — *por que não:* Rotineira independe da frequência (glossário): o critério é ser habitual e fazer parte do processo contínuo de trabalho. Se o documento está certo, o motivo está errado. (g-rot)
  - E) Nenhum documento: basta a ordem de serviço do supervisor — *por que não:* O rotineiro tem procedimento de trabalho (10.7.1) e o não rotineiro tem PT (10.7.2); ordem verbal não é nenhum dos dois. (10.7.1, 10.7.2)
- **Explicação:** —
- **Itens citados:** 10.7.2
- **Situação:** a validar

### V-95e762 · Organização do trabalho
- **Pergunta:** Que documento libera esta atividade? “Limpeza semestral programada dos painéis”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Procedimento de trabalho aprovado por PLH: a atividade é rotineira
  - B) Permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado: a atividade é não rotineira — *por que não:* Limpeza programada no plano é rotineira, mesmo sendo semestral: a frequência não é o critério. (g-rot, 10.7.1)
  - C) Permissão de trabalho, porque toda intervenção com o painel aberto exige PT — *por que não:* A NR-10 não liga a PT a painel aberto: PT é para o não rotineiro (10.7.2); fora de área classificada (10.6.6.1.2), o rotineiro segue procedimento (10.7.1). (10.7.1, 10.7.2, 10.6.6.1.2)
  - D) Procedimento de trabalho, porque a atividade é feita com frequência mensal ou maior — *por que não:* Rotineira independe da frequência (glossário): o critério é ser habitual e fazer parte do processo contínuo de trabalho. Se o documento está certo, o motivo está errado. (g-rot)
  - E) Nenhum documento: basta a ordem de serviço do supervisor — *por que não:* O rotineiro tem procedimento de trabalho (10.7.1) e o não rotineiro tem PT (10.7.2); ordem verbal não é nenhum dos dois. (10.7.1, 10.7.2)
- **Explicação:** Rotineira não depende da frequência, e sim de ser habitual e parte do processo contínuo.
- **Itens citados:** g-rot · 10.7.1
- **Situação:** a validar

### V-33fada · Organização do trabalho
- **Pergunta:** Que documento libera esta atividade? “Instalação de um alimentador novo para a ampliação da fábrica”
- **Alternativas** (✔ = resposta do simulador):
  - A) Procedimento de trabalho aprovado por PLH: a atividade é rotineira — *por que não:* Instalar um alimentador novo não faz parte do processo contínuo: é não rotineira, com PT. (10.7.2, g-rot)
  - **✔** B) Permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado: a atividade é não rotineira
  - C) Permissão de trabalho, porque toda intervenção com o painel aberto exige PT — *por que não:* A NR-10 não liga a PT a painel aberto: PT é para o não rotineiro (10.7.2); fora de área classificada (10.6.6.1.2), o rotineiro segue procedimento (10.7.1). (10.7.1, 10.7.2, 10.6.6.1.2)
  - D) Procedimento de trabalho, porque a atividade é feita com frequência mensal ou maior — *por que não:* Rotineira independe da frequência (glossário): o critério é ser habitual e fazer parte do processo contínuo de trabalho. Se o documento está certo, o motivo está errado. (g-rot)
  - E) Nenhum documento: basta a ordem de serviço do supervisor — *por que não:* O rotineiro tem procedimento de trabalho (10.7.1) e o não rotineiro tem PT (10.7.2); ordem verbal não é nenhum dos dois. (10.7.1, 10.7.2)
- **Explicação:** —
- **Itens citados:** 10.7.2
- **Situação:** a validar

### V-5a0540 · Organização do trabalho
- **Pergunta:** Que documento libera esta atividade? “Manobra diária de transferência rede/gerador prevista no procedimento operacional”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Procedimento de trabalho aprovado por PLH: a atividade é rotineira
  - B) Permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado: a atividade é não rotineira — *por que não:* Manobra diária prevista no procedimento operacional é rotineira. (10.7.1, g-rot)
  - C) Permissão de trabalho, porque toda intervenção com o painel aberto exige PT — *por que não:* A NR-10 não liga a PT a painel aberto: PT é para o não rotineiro (10.7.2); fora de área classificada (10.6.6.1.2), o rotineiro segue procedimento (10.7.1). (10.7.1, 10.7.2, 10.6.6.1.2)
  - D) Procedimento de trabalho, porque a atividade é feita com frequência mensal ou maior — *por que não:* Rotineira independe da frequência (glossário): o critério é ser habitual e fazer parte do processo contínuo de trabalho. Se o documento está certo, o motivo está errado. (g-rot)
  - E) Nenhum documento: basta a ordem de serviço do supervisor — *por que não:* O rotineiro tem procedimento de trabalho (10.7.1) e o não rotineiro tem PT (10.7.2); ordem verbal não é nenhum dos dois. (10.7.1, 10.7.2)
- **Explicação:** —
- **Itens citados:** 10.7.1
- **Situação:** a validar

### V-53e5a1 · Organização do trabalho
- **Pergunta:** Que documento libera esta atividade? “Primeira intervenção em um painel recém-adquirido, ainda sem procedimento”
- **Alternativas** (✔ = resposta do simulador):
  - A) Procedimento de trabalho aprovado por PLH: a atividade é rotineira — *por que não:* Primeira intervenção, sem procedimento, não é habitual: é não rotineira, com PT. (10.7.2, g-rot)
  - **✔** B) Permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado: a atividade é não rotineira
  - C) Permissão de trabalho, porque toda intervenção com o painel aberto exige PT — *por que não:* A NR-10 não liga a PT a painel aberto: PT é para o não rotineiro (10.7.2); fora de área classificada (10.6.6.1.2), o rotineiro segue procedimento (10.7.1). (10.7.1, 10.7.2, 10.6.6.1.2)
  - D) Procedimento de trabalho, porque a atividade é feita com frequência mensal ou maior — *por que não:* Rotineira independe da frequência (glossário): o critério é ser habitual e fazer parte do processo contínuo de trabalho. Se o documento está certo, o motivo está errado. (g-rot)
  - E) Nenhum documento: basta a ordem de serviço do supervisor — *por que não:* O rotineiro tem procedimento de trabalho (10.7.1) e o não rotineiro tem PT (10.7.2); ordem verbal não é nenhum dos dois. (10.7.1, 10.7.2)
- **Explicação:** —
- **Itens citados:** 10.7.2
- **Situação:** a validar

### V-227c89 · Pessoas e autorização
- **Pergunta:** Pela NR-10, esta afirmação é verdadeira ou falsa? “A autorização precisa constar nos documentos funcionais do trabalhador.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeira: a autorização é consignada nos documentos funcionais do trabalhador (10.10.3)
  - B) Falsa: basta o crachá com a abrangência da autorização — *por que não:* O sistema de identificação (10.10.4) é exigência a mais; a consignação nos documentos funcionais é o 10.10.3. (10.10.3, 10.10.4)
  - C) Falsa: a autorização é verbal, dada pelo supervisor no dia — *por que não:* A autorização é anuência formal da organização (10.10.2.1), consignada nos documentos funcionais. (10.10.2.1, 10.10.3)
  - D) Verdadeira, mas só para trabalhadores do SEP — *por que não:* O 10.10.3 vale para todo trabalhador autorizado. (10.10.3)
  - E) Falsa: a autorização consta só do PIE — *por que não:* O PIE organiza a documentação de quem integra o SEP ou atua em MT/AT; a consignação é nos documentos funcionais. (10.10.3, 10.15.6)
- **Explicação:** —
- **Itens citados:** 10.10.3
- **Situação:** a validar

### V-d3dbfc · Pessoas e autorização
- **Pergunta:** Pela NR-10, esta afirmação é verdadeira ou falsa? “Um engenheiro eletricista pode ser autorizado só pelo diploma, sem treinamento NR-10.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Falsa: a autorização exige treinamento com avaliação e aproveitamento satisfatórios, independentemente do cargo e da escolaridade (10.10.2.1)
  - B) Verdadeira: PLH dispensa o treinamento da NR-10 — *por que não:* O 10.10.2.1 b vale independentemente do cargo e da escolaridade. (10.10.2.1)
  - C) Verdadeira, se ele tiver registro no conselho de classe — *por que não:* O registro faz dele PLH (10.8.2), mas a autorização ainda exige exame médico e treinamento. (10.8.2, 10.10.2.1)
  - D) Falsa: engenheiro não pode ser autorizado; só técnicos — *por que não:* Profissionais habilitados estão entre os autorizados (10.10.2 a). (10.10.2)
  - E) Falsa: além do diploma, basta o exame médico — *por que não:* O 10.10.2.1 exige exame médico e treinamento, juntos. (10.10.2.1)
- **Explicação:** O treinamento vale independentemente do cargo e da escolaridade.
- **Itens citados:** 10.10.2.1
- **Situação:** a validar

### V-b8994c · Pessoas e autorização
- **Pergunta:** Pela NR-10, esta afirmação é verdadeira ou falsa? “A organização mantém um sistema que mostra, a qualquer momento, a abrangência da autorização de cada trabalhador.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeira: o sistema de identificação permite conhecer, a qualquer tempo, a abrangência da autorização de cada trabalhador (10.10.4)
  - B) Falsa: basta a anotação nos documentos funcionais — *por que não:* Os documentos funcionais (10.10.3) e o sistema de identificação (10.10.4) são exigências separadas. (10.10.3, 10.10.4)
  - C) Verdadeira, mas só para empresas com PIE — *por que não:* O 10.10.4 não depende do PIE. (10.10.4)
  - D) Falsa: a abrangência só é informada à fiscalização quando pedida — *por que não:* O 10.10.4 pede conhecer a abrangência a qualquer tempo. (10.10.4)
  - E) Verdadeira, mas só para trabalhadores de MT/AT — *por que não:* O 10.10.4 alcança cada trabalhador autorizado. (10.10.4)
- **Explicação:** —
- **Itens citados:** 10.10.4
- **Situação:** a validar

### V-de827d · Pessoas e autorização
- **Pergunta:** Pela NR-10, esta afirmação é verdadeira ou falsa? “O treinamento pode ser feito fora do expediente, pago pelo trabalhador.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Falsa: o treinamento é a cargo e custo do empregador e durante o expediente (10.9.1)
  - B) Verdadeira, se o trabalhador concordar por escrito — *por que não:* O 10.9.1 não prevê acordo para mudar custo ou horário. (10.9.1)
  - C) Falsa quanto ao custo; o horário pode ser fora do expediente — *por que não:* O 10.9.1 exige os dois: custo do empregador e durante o expediente. (10.9.1)
  - D) Verdadeira para o periódico bienal; falsa só para o inicial — *por que não:* O 10.9.1 vale para todos os treinamentos previstos na NR, inclusive o periódico. (10.9.1, 10.9.10)
  - E) Falsa: o custo é dividido entre empregador e trabalhador — *por que não:* É a cargo e custo do empregador. (10.9.1)
- **Explicação:** É a cargo e custo do empregador, durante o expediente.
- **Itens citados:** 10.9.1
- **Situação:** a validar

### V-95a435 · Pessoas e autorização
- **Pergunta:** Pela NR-10, esta afirmação é verdadeira ou falsa? “A parte prática do treinamento pode ser feita a distância.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Falsa: o conteúdo prático é presencial (10.9.13)
  - B) Verdadeira, se houver simulador virtual — *por que não:* O 10.9.13 não abre exceção. (10.9.13)
  - C) Verdadeira para o periódico; o presencial vale só no inicial — *por que não:* O 10.9.13 vale para os treinamentos previstos na NR, sem distinguir. (10.9.13)
  - D) Falsa: todo o treinamento, teoria e prática, é presencial — *por que não:* A resposta é "falsa", mas o 10.9.13 fala só do conteúdo prático. (10.9.13)
  - E) Verdadeira, se o instrutor tiver proficiência comprovada — *por que não:* A proficiência do instrutor é o 10.9.12; não muda a modalidade presencial do 10.9.13. (10.9.12, 10.9.13)
- **Explicação:** O conteúdo prático é presencial.
- **Itens citados:** 10.9.13
- **Situação:** a validar

### V-175963 · Pessoas e autorização
- **Pergunta:** Pela NR-10, esta afirmação é verdadeira ou falsa? “Quem supervisiona serviços em eletricidade também precisa ser autorizado.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeira: quem supervisiona também é autorizado (10.10.2 c)
  - B) Falsa: o supervisor só precisa ser PLH — *por que não:* O 10.10.2 c põe quem supervisiona entre os autorizados; habilitação não substitui autorização. (10.10.2)
  - C) Falsa: o supervisor não entra na zona controlada, então não precisa — *por que não:* A alínea c não depende de entrar na zona controlada. (10.10.2)
  - D) Verdadeira, mas só no SEP — *por que não:* O 10.10.2 não distingue SEP e SEC. (10.10.2)
  - E) Falsa: basta o técnico de segurança supervisionar — *por que não:* Quem supervisiona serviços em eletricidade é autorizado (10.10.2 c), e a organização o indica entre os membros da equipe (10.7.6). (10.10.2, 10.7.6)
- **Explicação:** —
- **Itens citados:** 10.10.2
- **Situação:** a validar

### V-2129eb · Pessoas e autorização
- **Pergunta:** Pela NR-10, esta afirmação é verdadeira ou falsa? “Em serviço feito em equipe, a organização indica um dos membros para supervisionar e conduzir o trabalho.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeira: a organização indica um trabalhador entre os membros da equipe para supervisão e condução (10.7.6)
  - B) Falsa: a supervisão é sempre de pessoa de fora da equipe — *por que não:* O 10.7.6 diz entre os membros da equipe. (10.7.6)
  - C) Verdadeira só para equipes com mais de dois trabalhadores — *por que não:* O 10.7.6 não tem número mínimo. (10.7.6)
  - D) Falsa: cada membro supervisiona o próprio trabalho — *por que não:* O 10.7.6 pede um trabalhador indicado. (10.7.6)
  - E) Verdadeira só em MT/AT — *por que não:* O 10.7.6 vale para serviços em eletricidade e trabalhos em proximidade feitos em equipe, sem faixa de tensão. (10.7.6)
- **Explicação:** —
- **Itens citados:** 10.7.6
- **Situação:** a validar

### V-a71202 · Pessoas e autorização
- **Pergunta:** Pela NR-10, esta afirmação é verdadeira ou falsa? “Os documentos técnicos do PIE podem ser elaborados por trabalhador-capacitado.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Falsa: os documentos técnicos do PIE são elaborados por PLH (10.15.7)
  - B) Verdadeira, se ele trabalhar sob responsabilidade de PLH autorizado — *por que não:* Isso define o trabalhador-capacitado (10.8.3 b), mas o 10.15.7 reserva a elaboração ao PLH. (10.8.3, 10.15.7)
  - C) Verdadeira para os procedimentos; o PLH elabora só o projeto — *por que não:* Os procedimentos do 10.15.4 integram o PIE, e o 10.15.7 vale para todos os documentos técnicos do PIE. (10.15.7, g-pie)
  - D) Falsa: só o técnico de segurança elabora o PIE — *por que não:* O 10.15.7 atribui ao PLH. (10.15.7)
  - E) Falsa: o PIE é elaborado pela Inspeção do Trabalho — *por que não:* O PIE é da organização, sob responsabilidade de PLH. (10.15.6)
- **Explicação:** São elaborados por PLH.
- **Itens citados:** 10.15.7
- **Situação:** a validar

### V-a947bc · Pessoas e autorização
- **Pergunta:** Pela NR-10, esta afirmação é verdadeira ou falsa? “Depois de um acidente grave que indique necessidade, a organização faz treinamento eventual, mesmo com o periódico em dia.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeira: após acidente grave ou fatal que indique a necessidade, há treinamento eventual, independentemente do periódico (10.9.11 d)
  - B) Falsa: com o periódico bienal em dia, não há outro treinamento — *por que não:* O 10.9.11 vale independentemente de já ter feito o periódico. (10.9.11)
  - C) Verdadeira, com carga horária fixa de 16 h — *por que não:* 16 h é o mínimo do periódico (10.9.10); a carga do eventual atende à situação que o motivou (10.9.11.1). (10.9.10, 10.9.11.1)
  - D) Verdadeira só se o acidente for fatal — *por que não:* A alínea d do 10.9.11 diz grave ou fatal. (10.9.11)
  - E) Falsa: o eventual só existe após afastamento de mais de 90 dias — *por que não:* O afastamento é só a alínea a; o 10.9.11 tem quatro situações. (10.9.11)
- **Explicação:** —
- **Itens citados:** 10.9.11
- **Situação:** a validar

### V-72ac42 · Pessoas e autorização
- **Pergunta:** Pela NR-10, esta afirmação é verdadeira ou falsa? “A documentação da NR-10 pode ser só digital, em português.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeira: pode ser emitida e armazenada em meio digital, conforme a NR-1, em língua portuguesa (10.15.1)
  - B) Falsa: precisa existir também em papel — *por que não:* O 10.15.1 admite o meio digital. (10.15.1)
  - C) Verdadeira, e pode estar em inglês se a matriz for estrangeira — *por que não:* O 10.15.1 exige língua portuguesa (Brasil). (10.15.1)
  - D) Falsa: a PT nunca pode ser digital — *por que não:* O 10.7.2.3 admite a PT em meio físico ou digital. (10.7.2.3)
  - E) Verdadeira, mas a versão digital fica disponível só à direção — *por que não:* Fica disponível aos trabalhadores interessados ou seus representantes e à Inspeção do Trabalho. (10.15.2)
- **Explicação:** —
- **Itens citados:** 10.15.1
- **Situação:** a validar

### V-f49c05 · Pessoas e autorização
- **Pergunta:** Pela NR-10, esta afirmação é verdadeira ou falsa? “Os instrutores precisam ter proficiência comprovada, sob responsabilidade de PLH.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeira: instrutores com comprovada proficiência, sob responsabilidade de PLH (10.9.12)
  - B) Falsa: basta o instrutor ter feito o treinamento Básico — *por que não:* O 10.9.12 exige proficiência comprovada nas áreas e assuntos específicos. (10.9.12)
  - C) Verdadeira, e o instrutor precisa ser engenheiro — *por que não:* O 10.9.12 não exige que o instrutor seja engenheiro; a responsabilidade é de PLH. (10.9.12)
  - D) Falsa: a responsabilidade é do técnico de segurança — *por que não:* É de PLH. (10.9.12)
  - E) Verdadeira só para a parte prática — *por que não:* O 10.9.12 vale para os treinamentos de segurança e saúde previstos na NR. (10.9.12)
- **Explicação:** —
- **Itens citados:** 10.9.12
- **Situação:** a validar

### V-170d90 · Desenergização e reenergização
- **Pergunta:** Um circuito desligado no disjuntor, sem bloqueio nem aterramento, está desenergizado para a NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim — *por que não:* Seccionar é só a alínea a do 10.13.1; sem o resto, a instalação está desligada com possibilidade de energização (10.5.2). (10.13.1, 10.5.2)
  - **✔** B) Não; só depois de cumprida a sequência do 10.13.1. Antes disso vale o capítulo 10.14
  - C) Sim, se o disjuntor estiver aberto e etiquetado — *por que não:* Disjuntor aberto e etiqueta são parte da sequência; o 10.13.1 exige as sete alíneas. (10.13.1)
  - D) Não; falta só o aterramento temporário — *por que não:* Faltam também a constatação da ausência de tensão, o impedimento de reenergização e as demais alíneas. (10.13.1)
  - E) Sim, para serviços em baixa tensão — *por que não:* O 10.13.1 não tem faixa de tensão. (10.13.1)
- **Explicação:** Desligada com possibilidade de energização segue as regras de instalação energizada.
- **Itens citados:** 10.13.1 · 10.5.2
- **Situação:** a validar

### V-d40826 · Desenergização e reenergização
- **Pergunta:** O PLH pode mudar a sequência de desenergização?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nunca — *por que não:* O 10.13.4 admite alterar, substituir, ampliar ou eliminar medidas. (10.13.4)
  - **✔** B) Sim, por peculiaridade da situação ou desenvolvimento tecnológico, com justificativa técnica formalizada antes e o mesmo nível de segurança
  - C) Sim, verbalmente no campo — *por que não:* A justificativa técnica é previamente formalizada. (10.13.4)
  - D) Sim, qualquer trabalhador autorizado, se registrar na PT — *por que não:* O 10.13.4 reserva a mudança ao PLH, autorizado. (10.13.4)
  - E) Sim, para ganhar tempo, mesmo com nível de segurança menor — *por que não:* O 10.13.4 exige manter o mesmo nível de segurança. (10.13.4)
- **Explicação:** —
- **Itens citados:** 10.13.4
- **Situação:** a validar

### V-62b01e · Desenergização e reenergização
- **Pergunta:** Outra equipe pode religar o alimentador que você desenergizou. O que a norma exige?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada; a responsabilidade é dela — *por que não:* O 10.13.3 põe na organização a garantia do estado de desenergização. (10.13.3)
  - **✔** B) Medidas que impeçam outras equipes ou organizações de energizar a instalação durante todo o serviço
  - C) Basta avisar a outra equipe por rádio — *por que não:* O 10.13.3 exige medidas que impeçam a energização, não só aviso. (10.13.3)
  - D) Medidas só durante a instalação do aterramento — *por que não:* O 10.13.3 diz durante toda a execução do serviço. (10.13.3)
  - E) Nada, se o aterramento temporário estiver instalado — *por que não:* O aterramento é uma alínea do 10.13.1; o 10.13.3 exige ainda impedir que outras equipes energizem. (10.13.3, 10.13.1)
- **Explicação:** —
- **Itens citados:** 10.13.3
- **Situação:** a validar

### V-a52770 · Desenergização e reenergização
- **Pergunta:** Com 89 e 52 abertos, o barramento de entrada continua energizado dentro da zona controlada. Que etapa cuida disso?
- **Alternativas** (✔ = resposta do simulador):
  - A) (c) impedimento de reenergização — *por que não:* O impedimento segura o que foi desligado; o barramento de entrada continua energizado. (10.13.1)
  - **✔** B) (e) proteção dos elementos energizados na zona controlada e contra arco
  - C) (g) delimitação da área — *por que não:* A delimitação marca a área de trabalho; a proteção dos elementos energizados na zona controlada é a alínea e. (10.13.1)
  - D) (d) constatação de ausência de tensão para o aterramento — *por que não:* A alínea d cuida do trecho a aterrar, não do que continua energizado na zona controlada. (10.13.1)
  - E) (f) sinalização de impedimento de reenergização — *por que não:* A alínea f sinaliza o impedimento; não protege os elementos energizados. (10.13.1)
- **Explicação:** —
- **Itens citados:** 10.13.1 · AII
- **Situação:** a validar

### V-aa5325 · Desenergização e reenergização
- **Pergunta:** Pelo 10.13.1, qual é a ordem das três primeiras etapas?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Seccionamento → constatação → impedimento
  - B) Seccionamento → impedimento → constatação — *por que não:* No 10.13.1, a constatação (b) vem antes do impedimento (c). (10.13.1)
  - C) Impedimento → seccionamento → constatação — *por que não:* A primeira alínea é o seccionamento (a). (10.13.1)
  - D) Constatação → seccionamento → impedimento — *por que não:* A sequência começa pelo seccionamento (a); a constatação é a alínea b. (10.13.1)
  - E) Seccionamento → aterramento → constatação — *por que não:* O aterramento é a alínea d, depois da constatação (b) e do impedimento (c). (10.13.1)
- **Explicação:** Alíneas a, b e c do 10.13.1: seccionamento ou desligamento; constatação da ausência de tensão; impedimento de reenergização. A constatação volta na alínea d, antes do aterramento.
- **Itens citados:** 10.13.1
- **Situação:** a validar

### V-03b79a · Desenergização e reenergização
- **Pergunta:** Pelo 10.13.2, qual é a primeira etapa da reenergização?
- **Alternativas** (✔ = resposta do simulador):
  - A) Remover o aterramento temporário — *por que não:* É a alínea d do 10.13.2. (10.13.2)
  - **✔** B) Retirar os obstáculos de delimitação e sinalização da área
  - C) Religar o disjuntor — *por que não:* É a última, alínea g. (10.13.2)
  - D) Retirar as ferramentas, utensílios e equipamentos — *por que não:* É a alínea b; a primeira é a retirada dos obstáculos de delimitação e sinalização. (10.13.2)
  - E) Retirar das imediações quem não participa da reenergização — *por que não:* É a alínea c. (10.13.2)
- **Explicação:** —
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-be596e · Desenergização e reenergização
- **Pergunta:** Ao abrir uma seccionadora com o disjuntor fechado, o que acontece?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada; seccionadora interrompe carga — *por que não:* Seccionadora não é dispositivo de abertura sob carga; por isso o 10.6.5 lista dispositivos de abertura sob carga entre as medidas contra arco. (10.6.5)
  - **✔** B) Forma arco nos contatos, porque seccionadora não é dispositivo de abertura sob carga
  - C) Nada, se o operador usar vestimenta de Categoria 4 — *por que não:* A vestimenta não impede o arco; EPI é o último nível da hierarquia. (10.5.4, 10.6.5)
  - D) Nada: toda seccionadora tem intertravamento com o disjuntor — *por que não:* Intertravamento é uma das medidas do 10.6.5 (alínea e), adotada conforme projeto; não existe em toda instalação. (10.6.5)
  - E) A corrente é interrompida sem arco, por ser manobra em vazio — *por que não:* Com o disjuntor fechado a manobra não é em vazio: a seccionadora abre com corrente. (10.6.5)
- **Explicação:** Por isso o 10.6.5 lista dispositivos de abertura sob carga e intertravamentos como proteção contra arco.
- **Itens citados:** 10.6.5
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-db6f65 · Documentação e grave e iminente risco
- **Pergunta:** Supermercado com 300 kW instalados, alimentado em 380 V, com dois eletricistas próprios. Precisa de PIE pela NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim, passa de 75 kW — *por que não:* Carga instalada não é critério do 10.15.6. (10.15.6)
  - **✔** B) Não; mas mantém projeto, registros de aterramento e a documentação do 10.15.4
  - C) Não precisa de documento algum — *por que não:* O 10.15.3 vale para toda organização. (10.15.3)
  - D) Sim, porque tem trabalhadores autorizados — *por que não:* Autorizados obrigam o 10.15.4; o PIE depende de integrar o SEP ou atuar em MT/AT. (10.15.4, 10.15.6)
  - E) Não; e por ser BT, também dispensa procedimentos de trabalho — *por que não:* Com autorizados, o 10.15.4 a exige procedimentos, análises de risco e PT. (10.15.4)
- **Explicação:** O PIE é para quem integra o SEP ou atua em MT/AT. Ter autorizados já obriga a documentação do 10.15.4, só que fora do formato de PIE.
- **Itens citados:** 10.15.6 · 10.15.4 · 10.15.3
- **Situação:** a validar

### V-2a6260 · Documentação e grave e iminente risco
- **Pergunta:** Indústria com cabine primária de 13,8 kV operada pelos próprios eletricistas.
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Precisa de PIE
  - B) Não precisa: não é concessionária — *por que não:* O 10.15.6 b não exige ser concessionária: basta realizar atividades em MT/AT. (10.15.6)
  - C) Não precisa: o PIE é só de quem integra o SEP — *por que não:* A alínea b do 10.15.6 inclui quem realiza atividades em MT/AT. (10.15.6)
  - D) Precisa só se a carga passar de 75 kW — *por que não:* A carga instalada não é critério. (10.15.6)
  - E) Precisa, e os documentos técnicos podem ser feitos pelo eletricista autorizado — *por que não:* Os documentos técnicos do PIE são elaborados por PLH (10.15.7). (10.15.7)
- **Explicação:** Realiza atividades em instalação de média tensão.
- **Itens citados:** 10.15.6 · g-mt
- **Situação:** a validar

### V-004112 · Documentação e grave e iminente risco
- **Pergunta:** Usina solar de 5 MW conectada à rede da distribuidora.
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Precisa de PIE: geração integra o SEP
  - B) Não precisa: é energia renovável — *por que não:* O 10.15.6 não distingue a fonte; a geração integra o SEP (glossário). (10.15.6, g-sep)
  - C) Precisa de PIE só se a tensão passar de 36,2 kV — *por que não:* A alínea a (integrar o SEP) independe da tensão. (10.15.6)
  - D) Não precisa: geração não faz parte do SEP — *por que não:* O glossário inclui a geração no SEP. (g-sep)
  - E) Precisa de PIE só um ano depois da conexão — *por que não:* O 10.15.6 não prevê carência. (10.15.6)
- **Explicação:** —
- **Itens citados:** 10.15.6 · g-sep
- **Situação:** a validar

### V-fbbafb · Documentação e grave e iminente risco
- **Pergunta:** Quem elabora os documentos técnicos do PIE?
- **Alternativas** (✔ = resposta do simulador):
  - A) Qualquer trabalhador autorizado — *por que não:* Autorização não é habilitação; o 10.15.7 exige PLH. (10.15.7)
  - **✔** B) PLH
  - C) O técnico de segurança do trabalho — *por que não:* O 10.15.7 exige PLH. (10.15.7)
  - D) O trabalhador-capacitado, sob orientação de PLH — *por que não:* O 10.15.7 exige que os documentos técnicos do PIE sejam elaborados por PLH. (10.15.7)
  - E) A distribuidora de energia — *por que não:* O PIE é da organização, sob responsabilidade de PLH. (10.15.6)
- **Explicação:** —
- **Itens citados:** 10.15.7 · 10.15.6
- **Situação:** a validar

### V-8cdd96 · Documentação e grave e iminente risco
- **Pergunta:** O PIE pode existir só em meio digital?
- **Alternativas** (✔ = resposta do simulador):
  - A) Não, precisa ser impresso — *por que não:* O 10.15.1 admite o meio digital, e o glossário define o PIE em meio físico ou eletrônico. (10.15.1, g-pie)
  - **✔** B) Sim, conforme a NR-1, em português
  - C) Sim, em qualquer idioma — *por que não:* O 10.15.1 exige língua portuguesa (Brasil). (10.15.1)
  - D) Sim, mas só com cópia impressa no local — *por que não:* O 10.15.1 não exige cópia em papel. (10.15.1)
  - E) Não: só a PT pode ser digital — *por que não:* O 10.15.1 vale para toda a documentação da NR. (10.15.1)
- **Explicação:** —
- **Itens citados:** 10.15.1
- **Situação:** a validar

### V-1ada5c · Documentação e grave e iminente risco
- **Pergunta:** A quem a documentação da NR-10 fica disponível?
- **Alternativas** (✔ = resposta do simulador):
  - A) Só à direção da empresa — *por que não:* O 10.15.2 inclui os trabalhadores interessados ou seus representantes e a Inspeção do Trabalho. (10.15.2)
  - **✔** B) Aos trabalhadores interessados ou seus representantes e à Inspeção do Trabalho
  - C) Só à Inspeção do Trabalho, quando requisitar — *por que não:* Também aos trabalhadores interessados ou representantes, e sempre disponível. (10.15.2)
  - D) A qualquer pessoa, inclusive ao público — *por que não:* O 10.15.2 lista trabalhadores interessados ou seus representantes e a Inspeção do Trabalho. (10.15.2)
  - E) Só ao PLH responsável — *por que não:* O 10.15.2 lista trabalhadores interessados ou seus representantes e a Inspeção do Trabalho. (10.15.2)
- **Explicação:** —
- **Itens citados:** 10.15.2
- **Situação:** a validar

### V-dbaaab · Documentação e grave e iminente risco
- **Pergunta:** O que o 10.16.1 muda na fiscalização?
- **Alternativas** (✔ = resposta do simulador):
  - A) Cria multas novas — *por que não:* O 10.16.1 trata de embargo e interdição, não de multas. (10.16.1)
  - **✔** B) Dispensa a metodologia da NR-3 para embargar ou interditar diante de quatro condições objetivas
  - C) Proíbe a interdição de instalações do SEP — *por que não:* O 10.16.1 não exclui o SEP. (10.16.1)
  - D) Obriga a interdição imediata de toda instalação sem PIE — *por que não:* Falta de PIE não está entre as quatro situações do 10.16.1. (10.16.1)
  - E) Dispensa a NR-3 em qualquer não conformidade da NR-10 — *por que não:* A dispensa vale só para as quatro situações listadas. (10.16.1)
- **Explicação:** —
- **Itens citados:** 10.16.1 · NR-3
- **Situação:** a validar

### V-111de3 · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Projeto elétrico conforme o capítulo 10.4”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Toda organização
  - B) Quem tem trabalhadores autorizados — *por que não:* O 10.15.4 lista procedimentos, análises de risco e PT; especificação de EPC, EPI e ferramental; comprovação de qualificação, treinamentos e autorização; relatórios de testes de isolação. (10.15.4)
  - C) Quem tem área classificada — *por que não:* O 10.15.5 lista os procedimentos, análises de risco e PT do 10.6.6.1.2, a certificação dos equipamentos em área classificada e as inspeções de conformidade. (10.15.5)
  - D) Conteúdo do PIE — *por que não:* O conteúdo próprio do PIE é o procedimento de resposta a emergências (10.15.6.1); o resto do PIE vem do 10.15.4 e do 10.15.5. (10.15.6.1, 10.15.6)
  - E) Só quem integra o SEP — *por que não:* Nenhum documento do 10.15 é exclusivo do SEP: o capítulo separa toda organização (10.15.3), quem tem autorizados (10.15.4), quem tem área classificada (10.15.5) e o PIE (10.15.6). (10.15.3, 10.15.4, 10.15.5, 10.15.6)
- **Explicação:** —
- **Itens citados:** 10.15.3
- **Situação:** a validar

### V-fc540d · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Inspeções e medições do sistema de aterramento”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Toda organização
  - B) Quem tem trabalhadores autorizados — *por que não:* O 10.15.4 lista procedimentos, análises de risco e PT; especificação de EPC, EPI e ferramental; comprovação de qualificação, treinamentos e autorização; relatórios de testes de isolação. (10.15.4)
  - C) Quem tem área classificada — *por que não:* O 10.15.5 lista os procedimentos, análises de risco e PT do 10.6.6.1.2, a certificação dos equipamentos em área classificada e as inspeções de conformidade. (10.15.5)
  - D) Conteúdo do PIE — *por que não:* O conteúdo próprio do PIE é o procedimento de resposta a emergências (10.15.6.1); o resto do PIE vem do 10.15.4 e do 10.15.5. (10.15.6.1, 10.15.6)
  - E) Só quem integra o SEP — *por que não:* Nenhum documento do 10.15 é exclusivo do SEP: o capítulo separa toda organização (10.15.3), quem tem autorizados (10.15.4), quem tem área classificada (10.15.5) e o PIE (10.15.6). (10.15.3, 10.15.4, 10.15.5, 10.15.6)
- **Explicação:** —
- **Itens citados:** 10.15.3
- **Situação:** a validar

### V-45334f · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Procedimentos de trabalho, análises de risco e PT”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização — *por que não:* De toda organização, o 10.15.3 exige só o projeto elétrico e a documentação das inspeções e medições do aterramento. (10.15.3)
  - **✔** B) Quem tem trabalhadores autorizados
  - C) Quem tem área classificada — *por que não:* O 10.15.5 a também pede procedimentos, análises de risco e PT, mas só os do serviço em área classificada (10.6.6.1.2); a obrigação geral é de quem tem autorizados (10.15.4 a). [INTERPRETAÇÃO] (10.15.5, 10.15.4)
  - D) Conteúdo do PIE — *por que não:* O conteúdo próprio do PIE é o procedimento de resposta a emergências (10.15.6.1); o resto do PIE vem do 10.15.4 e do 10.15.5. (10.15.6.1, 10.15.6)
  - E) Só quem integra o SEP — *por que não:* Nenhum documento do 10.15 é exclusivo do SEP: o capítulo separa toda organização (10.15.3), quem tem autorizados (10.15.4), quem tem área classificada (10.15.5) e o PIE (10.15.6). (10.15.3, 10.15.4, 10.15.5, 10.15.6)
- **Explicação:** —
- **Itens citados:** 10.15.4
- **Situação:** a validar

### V-2dbcce · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Especificação de EPC, EPI e ferramental”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização — *por que não:* De toda organização, o 10.15.3 exige só o projeto elétrico e a documentação das inspeções e medições do aterramento. (10.15.3)
  - **✔** B) Quem tem trabalhadores autorizados
  - C) Quem tem área classificada — *por que não:* O 10.15.5 lista os procedimentos, análises de risco e PT do 10.6.6.1.2, a certificação dos equipamentos em área classificada e as inspeções de conformidade. (10.15.5)
  - D) Conteúdo do PIE — *por que não:* O conteúdo próprio do PIE é o procedimento de resposta a emergências (10.15.6.1); o resto do PIE vem do 10.15.4 e do 10.15.5. (10.15.6.1, 10.15.6)
  - E) Só quem integra o SEP — *por que não:* Nenhum documento do 10.15 é exclusivo do SEP: o capítulo separa toda organização (10.15.3), quem tem autorizados (10.15.4), quem tem área classificada (10.15.5) e o PIE (10.15.6). (10.15.3, 10.15.4, 10.15.5, 10.15.6)
- **Explicação:** —
- **Itens citados:** 10.15.4
- **Situação:** a validar

### V-ddc041 · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Comprovação de qualificação, habilitação, capacitação, treinamento e autorização”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização — *por que não:* De toda organização, o 10.15.3 exige só o projeto elétrico e a documentação das inspeções e medições do aterramento. (10.15.3)
  - **✔** B) Quem tem trabalhadores autorizados
  - C) Quem tem área classificada — *por que não:* O 10.15.5 lista os procedimentos, análises de risco e PT do 10.6.6.1.2, a certificação dos equipamentos em área classificada e as inspeções de conformidade. (10.15.5)
  - D) Conteúdo do PIE — *por que não:* O conteúdo próprio do PIE é o procedimento de resposta a emergências (10.15.6.1); o resto do PIE vem do 10.15.4 e do 10.15.5. (10.15.6.1, 10.15.6)
  - E) Só quem integra o SEP — *por que não:* Nenhum documento do 10.15 é exclusivo do SEP: o capítulo separa toda organização (10.15.3), quem tem autorizados (10.15.4), quem tem área classificada (10.15.5) e o PIE (10.15.6). (10.15.3, 10.15.4, 10.15.5, 10.15.6)
- **Explicação:** —
- **Itens citados:** 10.15.4
- **Situação:** a validar

### V-bd5981 · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Relatórios de testes de isolação”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização — *por que não:* De toda organização, o 10.15.3 exige só o projeto elétrico e a documentação das inspeções e medições do aterramento. (10.15.3)
  - **✔** B) Quem tem trabalhadores autorizados
  - C) Quem tem área classificada — *por que não:* O 10.15.5 lista os procedimentos, análises de risco e PT do 10.6.6.1.2, a certificação dos equipamentos em área classificada e as inspeções de conformidade. (10.15.5)
  - D) Conteúdo do PIE — *por que não:* O conteúdo próprio do PIE é o procedimento de resposta a emergências (10.15.6.1); o resto do PIE vem do 10.15.4 e do 10.15.5. (10.15.6.1, 10.15.6)
  - E) Só quem integra o SEP — *por que não:* Nenhum documento do 10.15 é exclusivo do SEP: o capítulo separa toda organização (10.15.3), quem tem autorizados (10.15.4), quem tem área classificada (10.15.5) e o PIE (10.15.6). (10.15.3, 10.15.4, 10.15.5, 10.15.6)
- **Explicação:** —
- **Itens citados:** 10.15.4
- **Situação:** a validar

### V-5ec86a · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Certificação dos equipamentos instalados em área classificada”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização — *por que não:* De toda organização, o 10.15.3 exige só o projeto elétrico e a documentação das inspeções e medições do aterramento. (10.15.3)
  - B) Quem tem trabalhadores autorizados — *por que não:* O 10.15.4 lista procedimentos, análises de risco e PT; especificação de EPC, EPI e ferramental; comprovação de qualificação, treinamentos e autorização; relatórios de testes de isolação. (10.15.4)
  - **✔** C) Quem tem área classificada
  - D) Conteúdo do PIE — *por que não:* O conteúdo próprio do PIE é o procedimento de resposta a emergências (10.15.6.1); o resto do PIE vem do 10.15.4 e do 10.15.5. (10.15.6.1, 10.15.6)
  - E) Só quem integra o SEP — *por que não:* Nenhum documento do 10.15 é exclusivo do SEP: o capítulo separa toda organização (10.15.3), quem tem autorizados (10.15.4), quem tem área classificada (10.15.5) e o PIE (10.15.6). (10.15.3, 10.15.4, 10.15.5, 10.15.6)
- **Explicação:** —
- **Itens citados:** 10.15.5
- **Situação:** a validar

### V-b28c7f · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Inspeções de conformidade da área classificada”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização — *por que não:* De toda organização, o 10.15.3 exige só o projeto elétrico e a documentação das inspeções e medições do aterramento. (10.15.3)
  - B) Quem tem trabalhadores autorizados — *por que não:* O 10.15.4 lista procedimentos, análises de risco e PT; especificação de EPC, EPI e ferramental; comprovação de qualificação, treinamentos e autorização; relatórios de testes de isolação. (10.15.4)
  - **✔** C) Quem tem área classificada
  - D) Conteúdo do PIE — *por que não:* O conteúdo próprio do PIE é o procedimento de resposta a emergências (10.15.6.1); o resto do PIE vem do 10.15.4 e do 10.15.5. (10.15.6.1, 10.15.6)
  - E) Só quem integra o SEP — *por que não:* Nenhum documento do 10.15 é exclusivo do SEP: o capítulo separa toda organização (10.15.3), quem tem autorizados (10.15.4), quem tem área classificada (10.15.5) e o PIE (10.15.6). (10.15.3, 10.15.4, 10.15.5, 10.15.6)
- **Explicação:** —
- **Itens citados:** 10.15.5
- **Situação:** a validar

### V-c6b98d · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Procedimentos de resposta a emergências, com sistema de resgate”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização — *por que não:* De toda organização, o 10.15.3 exige só o projeto elétrico e a documentação das inspeções e medições do aterramento. (10.15.3)
  - B) Quem tem trabalhadores autorizados — *por que não:* O 10.15.4 lista procedimentos, análises de risco e PT; especificação de EPC, EPI e ferramental; comprovação de qualificação, treinamentos e autorização; relatórios de testes de isolação. (10.15.4)
  - C) Quem tem área classificada — *por que não:* O 10.15.5 lista os procedimentos, análises de risco e PT do 10.6.6.1.2, a certificação dos equipamentos em área classificada e as inspeções de conformidade. (10.15.5)
  - **✔** D) Conteúdo do PIE
  - E) Só quem integra o SEP — *por que não:* Nenhum documento do 10.15 é exclusivo do SEP: o capítulo separa toda organização (10.15.3), quem tem autorizados (10.15.4), quem tem área classificada (10.15.5) e o PIE (10.15.6). (10.15.3, 10.15.4, 10.15.5, 10.15.6)
- **Explicação:** Conteúdo específico do PIE.
- **Itens citados:** 10.15.6.1
- **Situação:** a validar

### V-618dbf · Missão integrada
- **Pergunta:** Como esta atividade se enquadra?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) SEC em MT: PIE obrigatório, Básico e Complementar MT/AT-SEC, serviço energizado nunca individual
  - B) SEP em AT: Básico e Complementar SEP — *por que não:* 13,8 kV é MT (até 36.200 V CA), e a cabine depois da medição é do consumidor. (g-mt, g-sep)
  - C) SEC em BT: só o Básico, e PIE pela carga instalada acima de 75 kW — *por que não:* 13,8 kV não é BT, e carga instalada não é critério de PIE. (g-bt, 10.15.6)
  - D) SEP em MT: Básico e Complementar do SEP, PIE obrigatório — *por que não:* Depois da medição a instalação é do consumidor: o SEP vai até a medição, inclusive. (g-sep)
  - E) Fora da NR-10: o transformador vai estar desligado — *por que não:* A NR-10 alcança manutenção em MT (10.2.1), e desligada com possibilidade de energização segue o 10.14 (10.5.2). (10.2.1, 10.5.2)
- **Explicação:** A cabine é do consumidor, depois da medição: SEC. 13,8 kV é MT pelo glossário. Atividade em MT obriga o PIE e o Complementar MT/AT-SEC.
- **Itens citados:** g-mt · 10.15.6 · 10.9.6 · 10.14.2
- **Situação:** a validar

### V-ad44e1 · Missão integrada
- **Pergunta:** A empresa nunca fez esse serviço. O que libera a execução?
- **Alternativas** (✔ = resposta do simulador):
  - A) Procedimento de trabalho aprovado por PLH — *por que não:* Procedimento é para atividade rotineira (10.7.1); serviço nunca feito é não rotineiro. (10.7.1, g-rot)
  - **✔** B) Permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado
  - C) Ordem verbal do supervisor — *por que não:* O não rotineiro exige PT (10.7.2). (10.7.2)
  - D) Só a análise de risco, sem outro documento — *por que não:* A análise de risco precede a PT; não a substitui. (10.7.2)
  - E) Permissão de trabalho aprovada pelo PLH, sem análise de risco — *por que não:* A PT é precedida de análise de riscos e aprovada por trabalhador autorizado. (10.7.2)
- **Explicação:** Atividade que não é habitual nem parte do processo contínuo é não rotineira.
- **Itens citados:** 10.7.2 · g-rot
- **Situação:** a validar

### V-a2d958 · Missão integrada
- **Pergunta:** Com a 89-1 aberta, o que continua energizado e entra na análise de risco como perigo dentro da zona controlada?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada: a seccionadora isola tudo — *por que não:* A seccionadora isola o trecho do lado da carga; o lado da fonte continua energizado e é tratado na alínea e do 10.13.1. (10.13.1)
  - **✔** B) O barramento de entrada e os contatos superiores da 89-1, do lado da fonte
  - C) Só o secundário do transformador — *por que não:* Com a 89-1 aberta, o perigo na zona controlada da cabine é o lado da fonte da 89-1. (10.13.1, AII)
  - D) Os contatos inferiores da 89-1, do lado da carga — *por que não:* Do lado da carga a 89-1 aberta isola; quem segue energizado é o lado da fonte. (10.13.1)
  - E) Só o QGBT de 380 V — *por que não:* A pergunta é sobre a zona controlada da cabine: o barramento de entrada e os contatos do lado da fonte seguem energizados. (10.13.1, AII)
- **Explicação:** O lado da fonte permanece energizado. A etapa (e) do 10.13.1 existe para isso: proteger os elementos energizados na ZC e o trabalhador contra o arco.
- **Itens citados:** 10.13.1 · AII · 10.7.3
- **Situação:** a validar

### V-4955b5 · Missão integrada
- **Pergunta:** A equipe tem duas pessoas. O que a organização precisa definir?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada: equipe pequena dispensa — *por que não:* O 10.7.6 vale para equipe de qualquer tamanho. (10.7.6)
  - **✔** B) Um dos membros para supervisionar e conduzir o trabalho
  - C) Um técnico de segurança externo presente — *por que não:* O 10.7.6 indica alguém entre os membros da equipe. (10.7.6)
  - D) Cada um supervisiona o próprio trabalho — *por que não:* O 10.7.6 pede um trabalhador indicado. (10.7.6)
  - E) Um terceiro eletricista só para observar — *por que não:* O 10.7.6 indica um dos membros da própria equipe; não exige um terceiro. (10.7.6)
- **Explicação:** —
- **Itens citados:** 10.7.6
- **Situação:** a validar

### V-68a5c1 · Missão integrada
- **Pergunta:** Para manobrar a 89-1 no cubículo metal-clad de 13,8 kV (Icc 20 kA, eliminação 0,20 s, distância de trabalho 910 mm), qual a categoria?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 2 — *por que não:* Categoria 2 só aparece em linhas de até 600 V com 0,03 s. (AIV-I)
  - B) Categoria 3 — *por que não:* O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC). (AIV-I)
  - **✔** C) Categoria 4
  - D) Fora do Anexo IV — *por que não:* 20 kA ≤ 35 kA, 0,20 s ≤ 0,24 s e 910 mm: cabe na linha. (AIV-I, 10.11.2.1)
  - E) Categoria 1 — *por que não:* Categoria 1 só existe na linha de painéis ou outros equipamentos de até 240 V. (AIV-I)
- **Explicação:** Linha da aparelhagem revestida de metal de 1 a 15 kV: até 35 kA, 0,24 s, 910 mm → Categoria 4, com vestimenta de pelo menos 40 cal/cm².
- **Itens citados:** AIV-I · AIV-III
- **Situação:** a validar

### V-6c2d93 · Missão integrada
- **Pergunta:** No local, o detector de tensão não acende ao ser testado numa fonte conhecida.
- **Alternativas** (✔ = resposta do simulador):
  - A) Usar mesmo assim: a 89-1 está visivelmente aberta — *por que não:* Sem detector confiável não se cumpre a constatação do 10.13.1; anormalidade que afeta a segurança impede o início (10.7.4.2). (10.7.4.2, 10.13.1)
  - **✔** B) Não iniciar a operação e comunicar o superior hierárquico
  - C) Começar e trocar o detector depois — *por que não:* O 10.7.4.2 manda não iniciar a operação. (10.7.4.2)
  - D) Medir com um multímetro de bolso — *por que não:* O instrumento precisa ser adequado à tensão de trabalho e à classe de isolação (10.12.6.1 a). (10.12.6.1)
  - E) Seguir: com a seccionadora visível, a constatação pode ser pulada — *por que não:* A constatação é alínea do 10.13.1; só PLH altera a sequência, com justificativa formalizada (10.13.4). (10.13.1, 10.13.4)
- **Explicação:** Sem detector confiável não há como cumprir a constatação de ausência de tensão. É anormalidade que afeta a segurança.
- **Itens citados:** 10.7.4.1 · 10.7.4.2 · 10.12.6.1
- **Situação:** a validar

### V-be8240 · Missão integrada
- **Pergunta:** O QGBT tem um gerador de emergência que pode alimentar o TR-01 pelo lado de 380 V. O que isso muda?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada: o lado de 13,8 kV já está seccionado — *por que não:* Enquanto houver possibilidade de energização por qualquer meio, vale o 10.14 (10.5.2). (10.5.2)
  - **✔** B) O lado de BT também precisa ser seccionado e bloqueado; enquanto houver possibilidade de energização, vale o regime de energizada
  - C) Basta avisar o operador do gerador — *por que não:* Aviso não é impedimento de reenergização (10.13.1 c, 10.13.3). (10.13.1, 10.13.3)
  - D) Só aterrar o lado de MT, que resolve as duas fontes — *por que não:* O aterramento é uma alínea; desenergizar exige seccionar e impedir a reenergização da fonte de BT também. [INTERPRETAÇÃO] (10.13.1, 10.5.2)
  - E) Tratar o lado de 380 V como extrabaixa tensão — *por que não:* 380 V é BT pelo glossário. (g-bt)
- **Explicação:** Alimentado pela BT, o transformador eleva a tensão do gerador de volta a 13,8 kV nas buchas de MT. Desenergizar é isolar todas as fontes.
- **Itens citados:** 10.5.2 · 10.13.1 · 10.13.3
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-ffad65 · Missão integrada
- **Pergunta:** O serviço passa para o turno da noite, com dois eletricistas novos. A PT do dia vale?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim, até o fim do serviço — *por que não:* A validade é limitada à duração da atividade e restrita ao turno. (10.7.2.2)
  - **✔** B) Não: a PT é restrita ao turno e só pode ser revalidada se não mudarem as condições nem a equipe
  - C) Sim, se o supervisor assinar de novo — *por que não:* Não cabe revalidação com mudança na equipe. (10.7.2.2)
  - D) Sim, porque a PT vale 24 horas — *por que não:* A PT é restrita ao turno de trabalho. (10.7.2.2)
  - E) Não: a PT não pode ser revalidada em hipótese alguma — *por que não:* O 10.7.2.2 admite revalidação pelo responsável pela autorização, se não mudarem as condições nem a equipe. (10.7.2.2)
- **Explicação:** —
- **Itens citados:** 10.7.2.2
- **Situação:** a validar

### V-ac7c5f · Uma OS na cabine primária
- **Pergunta:** Como esta atividade se enquadra na NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) SEC em média tensão: o PIE é obrigatório e a equipe faz o Básico e o Complementar de Média e Alta Tensão - SEC
  - B) SEP em alta tensão: Básico e Complementar do SEP — *por que não:* 13,8 kV é MT, e depois da medição a instalação é do consumidor. (g-mt, g-sep)
  - C) SEC em baixa tensão: só o Básico, e PIE pela carga instalada — *por que não:* 13,8 kV não é BT, e carga instalada não é critério de PIE. (g-bt, 10.15.6)
  - D) Fora da NR-10, porque o serviço é no transformador desligado — *por que não:* Desligado com possibilidade de energização segue o 10.14 (10.5.2); a NR-10 alcança a manutenção (10.2.1). (10.5.2, 10.2.1)
  - E) SEP em média tensão, porque a cabine recebe energia da distribuidora — *por que não:* Receber energia da distribuidora não põe a cabine no SEP: o SEP vai até a medição, inclusive. (g-sep)
- **Explicação:** Depois da medição a instalação é do consumidor (SEC): pelo glossário, o SEP vai até a medição, inclusive. 13,8 kV é MT (acima de 1.000 V até 36.200 V CA). Quem realiza atividades em MT mantém o PIE (10.15.6), e o trabalhador faz o Básico (10.9.4) e o Complementar MT/AT - SEC (10.9.6).
- **Itens citados:** g-sep · g-mt · 10.15.6 · 10.9.6
- **Situação:** a validar

### V-14bd44 · Uma OS na cabine primária
- **Pergunta:** O que libera a execução?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado
  - B) Procedimento de trabalho aprovado por PLH — *por que não:* Procedimento é para atividade rotineira (10.7.1); serviço nunca feito é não rotineiro. (10.7.1, g-rot)
  - C) Ordem verbal do supervisor — *por que não:* O não rotineiro exige PT (10.7.2). (10.7.2)
  - D) Só a análise de risco, sem outro documento — *por que não:* A análise de risco precede a PT; não a substitui. (10.7.2)
  - E) O projeto elétrico da cabine — *por que não:* O projeto fica disponível e atualizado (10.4.7), mas não libera serviço. (10.4.7, 10.7.2)
- **Explicação:** Serviço não rotineiro exige PT, precedida de análise de riscos e aprovada por trabalhador autorizado (10.7.2). Procedimento aprovado por PLH é para atividades rotineiras (10.7.1, 10.7.1.1). A PT fica disponível no local do serviço (10.7.2.3).
- **Itens citados:** 10.7.2 · 10.7.1 · g-rot · 10.7.2.3
- **Situação:** a validar

### V-3f9802 · Uma OS na cabine primária
- **Pergunta:** O que a organização precisa definir?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Indicar um dos dois para supervisionar e conduzir os trabalhos
  - B) Nada: equipe de duas pessoas dispensa supervisão — *por que não:* O 10.7.6 vale para qualquer equipe. (10.7.6)
  - C) Contratar um técnico de segurança para ficar no local — *por que não:* O 10.7.6 indica alguém entre os membros da equipe. (10.7.6)
  - D) Pôr um terceiro eletricista só para observar — *por que não:* O 10.7.6 não exige um terceiro. (10.7.6)
  - E) Deixar cada um supervisionar o próprio trabalho — *por que não:* O 10.7.6 pede um trabalhador indicado. (10.7.6)
- **Explicação:** Em serviço feito em equipe, a organização indica um trabalhador entre os membros para supervisionar e conduzir os trabalhos (10.7.6). Quem supervisiona também é autorizado (10.10.2 c).
- **Itens citados:** 10.7.6 · 10.10.2
- **Situação:** a validar

### V-f1e472 · Uma OS na cabine primária
- **Pergunta:** Qual vestimenta mínima o Anexo IV exige para manobrar a 89-1?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Categoria 4: no mínimo 40 cal/cm²
  - B) Categoria 2: no mínimo 8 cal/cm² — *por que não:* Categoria 2 só aparece em linhas de até 600 V com 0,03 s. (AIV-I)
  - C) Categoria 3: no mínimo 25 cal/cm² — *por que não:* O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC). (AIV-I)
  - D) Categoria 1: no mínimo 4 cal/cm² — *por que não:* Categoria 1 só existe na linha de painéis ou outros equipamentos de até 240 V. (AIV-I)
  - E) Nenhuma: o Anexo IV não vale para média tensão — *por que não:* O Quadro I tem linhas de 1 kV a 15 kV. (AIV-I)
- **Explicação:** A linha "aparelhagem de manobra revestida de metal, 1 kV a 15 kV" do Quadro I vale até 35 kA, até 0,24 s e a partir de 910 mm: Categoria 4. O Quadro III dá no mínimo 40 cal/cm² para a Categoria 4. Os quatro parâmetros valem em conjunto (10.11.2.1).
- **Itens citados:** AIV-I · AIV-III · 10.11.2.1
- **Situação:** a validar

### V-b4bdee · Uma OS na cabine primária
- **Pergunta:** O que a equipe faz?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não inicia a operação e comunica o superior hierárquico
  - B) Usa assim mesmo: a seccionadora vai ficar visivelmente aberta — *por que não:* Anormalidade que afeta a segurança impede o início (10.7.4.2); sem detector não há constatação do 10.13.1. (10.7.4.2, 10.13.1)
  - C) Começa e troca o detector depois — *por que não:* O 10.7.4.2 manda não iniciar a operação. (10.7.4.2)
  - D) Usa o VPIS do cubículo no lugar do detector — *por que não:* O indicador fixo não substitui a constatação com instrumento adequado e testado. [INTERPRETAÇÃO] (10.13.1, 10.12.6.1)
  - E) Mede com um multímetro de bolso — *por que não:* O instrumento precisa ser adequado à tensão de trabalho e à classe de isolação. (10.12.6.1)
- **Explicação:** Anormalidade que afeta a segurança, constatada na avaliação prévia: a operação não é iniciada e o superior é comunicado (10.7.4.2). O instrumento precisa ser adequado à tensão e à classe de isolação (10.12.6.1). Sem detector confiável não há como cumprir a constatação de ausência de tensão do 10.13.1. Um detector reserva, testado, chega do almoxarifado.
- **Itens citados:** 10.7.4 · 10.7.4.2 · 10.12.6.1
- **Situação:** a validar

### V-a2f363 · Uma OS na cabine primária
- **Pergunta:** A PT do turno da manhã continua valendo?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não: a PT é restrita ao turno e, com a equipe toda trocada, não pode ser revalidada
  - B) Sim, até o fim do serviço — *por que não:* A validade é restrita ao turno. (10.7.2.2)
  - C) Sim, se o supervisor da noite assinar embaixo — *por que não:* Com a equipe toda trocada, não cabe revalidação. (10.7.2.2)
  - D) Sim, porque a PT vale 24 horas — *por que não:* A PT é restrita ao turno. (10.7.2.2)
  - E) Não existe PT em serviço de manutenção — *por que não:* A PT existe para todo serviço não rotineiro (10.7.2). (10.7.2)
- **Explicação:** A PT vale pela duração da atividade, restrita ao turno, e só pode ser revalidada se não mudarem as condições estabelecidas nem toda a equipe (10.7.2.2). A nova PT lista todos os envolvidos e suas autorizações (10.7.2.1 c).
- **Itens citados:** 10.7.2.2 · 10.7.2.1
- **Situação:** a validar

### V-15aa7b · Uma OS na cabine primária
- **Pergunta:** O que acontece com a permissão de trabalho?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) É encerrada e arquivada de forma a permitir a rastreabilidade
  - B) É descartada, porque o serviço terminou — *por que não:* Ao final, a PT é encerrada e arquivada. (10.7.2.3)
  - C) Fica com o executante, como comprovante pessoal — *por que não:* Ela é arquivada pela organização, para rastreabilidade. (10.7.2.3)
  - D) É reutilizada no próximo serviço parecido — *por que não:* A PT vale só para a atividade e o turno. (10.7.2.2)
  - E) É entregue à distribuidora — *por que não:* A PT é encerrada e arquivada; a NR-10 não manda entregá-la à distribuidora. (10.7.2.3)
- **Explicação:** A PT fica disponível no local durante o serviço e, ao final, é encerrada e arquivada de forma a permitir a rastreabilidade (10.7.2.3). Se a instalação mudou, o projeto é atualizado para corresponder ao executado (10.4.13).
- **Itens citados:** 10.7.2.3 · 10.4.13
- **Situação:** a validar

### V-88f4c8 · Uma OS na cabine primária
- **Pergunta:** Como a NR-10 trata esse desvio?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) É condição de grave e iminente risco: permite embargo ou interdição sem a metodologia da NR-3
  - B) É só uma não conformidade, corrigida no próximo serviço — *por que não:* Pular a constatação é não adotar a sequência do 10.13.1: alínea b do 10.16.1. (10.16.1)
  - C) Gera multa, mas nunca interdição — *por que não:* O 10.16.1 permite embargo ou interdição. (10.16.1)
  - D) Só conta se houver acidente — *por que não:* O 10.16.1 não depende de acidente. (10.16.1)
  - E) Depende de a fábrica ter PIE — *por que não:* O 10.16.1 não depende do PIE. (10.16.1)
- **Explicação:** O 10.16.1 b inclui a não adoção dos procedimentos de desenergização (10.13.1) ou de reenergização (10.13.2), ou das alternativas permitidas pelo 10.13.4. Os documentos do serviço ficam no PIE, que esta fábrica mantém por atuar em média tensão (10.15.6).
- **Itens citados:** 10.16.1 · 10.13.4 · 10.15.6
- **Situação:** a validar

### V-e2b601 · Uma OS no QDC de um prédio
- **Pergunta:** Como esta atividade se enquadra na NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) SEC em baixa tensão: os autorizados fazem o Básico, e o condomínio mantém projeto, registros de aterramento e a documentação do 10.15.4, sem obrigação de PIE
  - B) SEC em baixa tensão, mas com PIE obrigatório por ser edifício comercial — *por que não:* O 10.15.6 não usa o tipo de edificação: o PIE é de quem integra o SEP ou realiza atividades em MT/AT. (10.15.6)
  - C) SEP, porque o prédio é alimentado pela distribuidora — *por que não:* O SEP vai até a medição, inclusive; o QDC fica depois dela. (g-sep)
  - D) Fora da NR-10, porque o serviço é num quadro de 220 V — *por que não:* 220 V é BT, dentro do alcance do 10.2.1; só a EBT fica fora (10.2.4). (g-bt, 10.2.1, 10.2.4)
  - E) SEC em baixa tensão: Básico e Complementar de Média e Alta Tensão - SEC — *por que não:* O complementar MT/AT-SEC é para quem atua em média e alta tensão. (10.9.6)
- **Explicação:** Depois da medição a instalação é do consumidor; 380/220 V é BT (até 1.000 V CA). O PIE é só de quem integra o SEP ou atua em MT/AT (10.15.6). Toda organização dispõe de projeto e documentação do aterramento (10.15.3), e quem tem autorizados mantém a documentação do 10.15.4. O autorizado faz o Básico (10.9.4).
- **Itens citados:** g-bt · 10.15.6 · 10.15.3 · 10.15.4 · 10.9.4
- **Situação:** a validar

### V-4eb0e5 · Uma OS no QDC de um prédio
- **Pergunta:** O que libera a execução?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) O procedimento de trabalho, elaborado a partir de análise de risco e aprovado por PLH
  - B) Permissão de trabalho, porque todo serviço em quadro exige PT — *por que não:* PT é para o não rotineiro (10.7.2); este serviço é rotineiro. (10.7.2, g-rot)
  - C) Nada: trocar disjuntor é operação elementar — *por que não:* Operação elementar é ligar e desligar (glossário); trocar disjuntor é serviço em eletricidade, só para autorizados (10.14.1). (g-opel, 10.14.1)
  - D) Procedimento de trabalho aprovado pelo próprio eletricista — *por que não:* O procedimento é aprovado por PLH. (10.7.1.1)
  - E) Permissão de trabalho emitida pelo síndico — *por que não:* Além de a atividade ser rotineira, a PT é aprovada por trabalhador autorizado (10.7.2). (10.7.2)
- **Explicação:** Serviço rotineiro (habitual e parte do processo contínuo) é executado mediante procedimento de trabalho elaborado a partir de análise de risco (10.7.1), aprovado por PLH (10.7.1.1).
- **Itens citados:** 10.7.1 · 10.7.1.1 · g-rot
- **Situação:** a validar

### V-0ce3f0 · Uma OS no QDC de um prédio
- **Pergunta:** Como a NR-10 trata o DR desse circuito?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) É exigido pela alínea e do 10.6.4 (copa-cozinha em edificação não residencial), mas, para instalação existente, essa alínea só vale um ano depois da vigência da Portaria (art. 3º)
  - B) Não é exigido: a lista do 10.6.4 só vale para residências — *por que não:* A alínea d é de locais de habitação; a alínea e é justamente de edificações não residenciais. (10.6.4)
  - C) É exigido desde a publicação da Portaria, sem prazo nenhum — *por que não:* A Portaria vale um ano após a publicação (art. 5º), e a alínea e, para instalação existente, um ano depois disso (art. 3º). (art5, art3)
  - D) Só seria exigido se a copa-cozinha tivesse chuveiro — *por que não:* Banheira ou chuveiro é a alínea a; copa-cozinha em edificação não residencial é a e. (10.6.4)
  - E) Não é exigido: o DR é proteção adicional facultativa — *por que não:* O 10.6.4 chama o DDR de proteção coletiva adicional obrigatória nas situações listadas. (10.6.4, g-adic)
- **Explicação:** O 10.6.4 e torna o DDR de alta sensibilidade obrigatório nos pontos de tomada de copas-cozinhas em edificações não residenciais. O art. 3º da Portaria adia essa alínea, para as instalações já existentes, a um ano depois da vigência; e a Portaria entra em vigor um ano após a publicação (art. 5º).
- **Itens citados:** 10.6.4 · art3 · art5
- **Situação:** a validar

### V-fb55d5 · Uma OS no QDC de um prédio
- **Pergunta:** Ela pode?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Pode: ligar e desligar circuitos em BT, em quadro feito para uso seguro, é operação elementar, permitida a qualquer pessoa não advertida
  - B) Não: só trabalhador autorizado pode operar disjuntor — *por que não:* O 10.14.1 exige autorizados nos serviços em eletricidade, mas o 10.14.1.1 abre exceção para a operação elementar em BT. (10.14.1, 10.14.1.1)
  - C) Pode, mas só com permissão de trabalho — *por que não:* Operação elementar não é serviço em eletricidade e não pede PT. (10.14.1.1)
  - D) Pode, se tiver feito o Básico de 40 h — *por que não:* O 10.14.1.1 admite qualquer pessoa não advertida. (10.14.1.1)
  - E) Pode, e também poderia num quadro de média tensão — *por que não:* A operação elementar do 10.14.1.1 é só em baixa tensão. (10.14.1.1)
- **Explicação:** O 10.14.1.1 admite operações elementares, como ligar e desligar circuitos, em baixa tensão, em sistemas projetados, construídos, instalados e mantidos para uso seguro, por qualquer pessoa não advertida.
- **Itens citados:** 10.14.1.1 · g-opel
- **Situação:** a validar

### V-c59c11 · Uma OS no QDC de um prédio
- **Pergunta:** O que acontece com o projeto do quadro?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) É atualizado para corresponder ao executado e fica disponível aos trabalhadores autorizados
  - B) Nada: trocar um componente não muda o projeto — *por que não:* Entrou um dispositivo novo no quadro: o 10.4.13 pede o projeto igual ao executado. (10.4.13)
  - C) É atualizado só na próxima reforma grande — *por que não:* O 10.4.13 não espera reforma: o projeto acompanha o executado. (10.4.13)
  - D) Vai para o PIE do prédio — *por que não:* Sem SEP nem MT/AT, o condomínio não é obrigado a ter PIE (10.15.6). (10.15.6)
  - E) Fica guardado só com o síndico — *por que não:* O projeto fica disponível aos autorizados e às autoridades (10.4.7). (10.4.7)
- **Explicação:** O projeto é mantido atualizado de forma a corresponder ao executado (10.4.13) e fica disponível aos trabalhadores autorizados, às autoridades competentes e a outras pessoas autorizadas pela organização (10.4.7). Toda organização dispõe de projeto elétrico (10.15.3).
- **Itens citados:** 10.4.13 · 10.4.7 · 10.15.3
- **Situação:** a validar

### V-464d8e · Uma OS no canteiro de obra
- **Pergunta:** A NR-10 se aplica a esta instalação provisória?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Sim: a NR-10 alcança instalações de caráter permanente ou temporário, inclusive nas etapas de construção e montagem
  - B) Não: só alcança instalações permanentes — *por que não:* O 10.2.1 diz de caráter permanente ou temporário. (10.2.1)
  - C) Só depois que o prédio for entregue — *por que não:* Construção e montagem estão no 10.2.1. (10.2.1)
  - D) Só na rede de média tensão, que é da distribuidora — *por que não:* O 10.2.1 inclui a baixa tensão, e 380/220 V é BT. (10.2.1, g-bt)
  - E) Não: canteiro de obra tem norma própria e fica fora da NR-10 — *por que não:* O 10.2.1 não exclui canteiros; outra norma pode somar exigências, não afastar a NR-10. [INTERPRETAÇÃO] (10.2.1)
- **Explicação:** O 10.2.1 aplica a NR-10 às etapas de projeto, construção, montagem, comissionamento, operação e manutenção de instalações de baixa, média e/ou alta tensão, de caráter permanente ou temporário.
- **Itens citados:** 10.2.1
- **Situação:** a validar

### V-76f699 · Uma OS no canteiro de obra
- **Pergunta:** O que a NR-10 exige do projeto desta instalação provisória?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Projeto sob responsabilidade de PLH, mantido atualizado de forma a corresponder ao executado e disponível aos autorizados
  - B) Nada: instalação provisória dispensa projeto — *por que não:* O 10.15.3 vale para toda organização, e o 10.2.1 inclui as instalações temporárias. (10.15.3, 10.2.1)
  - C) Só um croqui feito pelo eletricista — *por que não:* O projeto fica sob responsabilidade de PLH. (10.4.8)
  - D) Projeto só depois da desmontagem, para registro — *por que não:* O projeto corresponde ao executado durante toda a vida da instalação. (10.4.13)
  - E) Projeto só se a carga do canteiro passar de 75 kW — *por que não:* A NR-10 não usa carga instalada como critério para o projeto. (10.15.3)
- **Explicação:** Toda organização dispõe de projeto elétrico conforme o capítulo 10.4 (10.15.3), sob responsabilidade de PLH (10.4.8), disponível aos autorizados (10.4.7) e atualizado conforme o executado (10.4.13).
- **Itens citados:** 10.15.3 · 10.4.8 · 10.4.7 · 10.4.13
- **Situação:** a validar

### V-bdb6cf · Uma OS no canteiro de obra
- **Pergunta:** O DR de alta sensibilidade nesses circuitos é…
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Obrigatório, como proteção coletiva adicional: tomadas em áreas externas à edificação (10.6.4 b)
  - B) Opcional, porque a instalação é provisória — *por que não:* O 10.6.4 b não distingue instalação provisória. (10.6.4, 10.2.1)
  - C) Obrigatório só daqui a um ano, como nas instalações existentes — *por que não:* O art. 3º adia só a alínea e do 10.6.4, e só para instalações existentes; esta é a alínea b, num circuito novo. (art3, 10.6.4)
  - D) Dispensado se as tomadas tiverem pino de terra — *por que não:* Aterramento é proteção supletiva (10.6.3); o DDR é proteção adicional obrigatória que se soma a ela. (10.6.3, 10.6.4)
  - E) Obrigatório só para tomadas acima de 32 A — *por que não:* 32 A aparece na alínea c, para tomadas internas que alimentam equipamentos no exterior; a alínea b não tem limite de corrente. (10.6.4)
- **Explicação:** O 10.6.4 b torna obrigatório o DDR de alta sensibilidade nos circuitos que alimentam tomadas em áreas externas à edificação. O adiamento do art. 3º vale só para a alínea e, e só para instalações existentes.
- **Itens citados:** 10.6.4 · art3 · g-adic
- **Situação:** a validar

### V-30aa28 · Uma OS no canteiro de obra
- **Pergunta:** O que a NR-10 exige para ele?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Treinamento Específico e pontual (8 h), com acompanhamento presencial e permanente de trabalhador autorizado, sob responsabilidade de PLH
  - B) Básico de 40 h, como qualquer autorizado — *por que não:* Para estrangeiro ou não residente em serviço pontual de até 30 dias, o treinamento previsto é o Específico e pontual. (10.9.8, 10.9.2)
  - C) Nada: o treinamento feito na Alemanha vale aqui — *por que não:* O 10.9.8 manda a organização promover o Específico e pontual. (10.9.8)
  - D) Específico e pontual (8 h), e depois ele pode trabalhar sozinho — *por que não:* O acompanhamento presencial e permanente de trabalhador autorizado vale durante todo o serviço. (10.9.8)
  - E) Específico e pontual, válido para permanência de até 90 dias — *por que não:* O limite é de 30 dias corridos. (10.9.8)
- **Explicação:** O 10.9.8 cria o treinamento Específico e pontual para profissionais estrangeiros e/ou não residentes no país que entram na zona controlada para serviços pontuais, com permanência máxima de 30 dias corridos, sob acompanhamento presencial e permanente de trabalhador autorizado e responsabilidade de PLH. Carga: 8 h (Quadro I).
- **Itens citados:** 10.9.8 · 10.9.2
- **Situação:** a validar

### V-8133fa · Uma OS no canteiro de obra
- **Pergunta:** Como a NR-10 trata essa situação?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Grave e iminente risco (10.16.1 c): permite embargo ou interdição sem a metodologia da NR-3
  - B) Não conformidade leve, porque a instalação é provisória — *por que não:* O 10.16.1 não distingue instalação provisória. (10.16.1, 10.2.1)
  - C) Grave e iminente risco só se houver acidente — *por que não:* O 10.16.1 não depende de acidente. (10.16.1)
  - D) Infração da construtora, mas sem possibilidade de interdição — *por que não:* O 10.16.1 permite embargo ou interdição. (10.16.1)
  - E) Grave e iminente risco pela alínea a, por ser canteiro de obra — *por que não:* A alínea a é a área classificada sem proteção coletiva; aqui é a alínea c. (10.16.1)
- **Explicação:** Serviço em eletricidade feito por trabalhador que não atende ao capítulo 10.10 é a alínea c do 10.16.1, que dispensa a metodologia da NR-3 para embargo ou interdição.
- **Itens citados:** 10.16.1 · 10.10.2.1
- **Situação:** a validar

### V-d5d081 · Uma OS na rede de distribuição
- **Pergunta:** Como esta atividade se enquadra na NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) SEP: Básico e Complementar do SEP (80 h), PIE obrigatório e serviço nunca individual
  - B) SEC em MT: Básico e Complementar de Média e Alta Tensão - SEC — *por que não:* A rede da distribuidora integra o SEP; o complementar MT/AT-SEC é para o sistema de consumo. (g-sep, 10.9.6)
  - C) SEP: só o Complementar do SEP, que dispensa o Básico — *por que não:* O Básico só é dispensado para quem faz o Específico de compartilhamento (10.9.4). (10.9.4)
  - D) SEP, mas o serviço desenergizado pode ser feito por um eletricista sozinho — *por que não:* O 10.14.2 veda o trabalho individual em todo serviço executado no SEP. (10.14.2)
  - E) SEP em alta tensão, por ser rede da distribuidora — *por que não:* A faixa vem da tensão: 13,8 kV é MT (até 36.200 V CA). (g-mt)
- **Explicação:** A distribuição integra o SEP (glossário). O autorizado faz o Básico (10.9.4) e o Complementar do SEP (10.9.5): 40 + 40 h. Quem integra o SEP mantém o PIE (10.15.6), e serviços no SEP não podem ser feitos individualmente, energizados ou não (10.14.2). 13,8 kV é MT.
- **Itens citados:** g-sep · 10.9.4 · 10.9.5 · 10.15.6 · 10.14.2
- **Situação:** a validar

### V-eb1bf4 · Uma OS na rede de distribuição
- **Pergunta:** O que a NR-10 exige?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Medidas que impeçam outras equipes ou organizações de energizar o trecho durante todo o serviço, além do impedimento de reenergização sob controle da equipe
  - B) Nada: com a chave aberta, o religador não importa — *por que não:* Enquanto houver possibilidade de energização, a instalação não está desenergizada (10.5.2), e o 10.13.3 exige impedir outras equipes. (10.5.2, 10.13.3)
  - C) Só desativar o religamento automático, como no serviço energizado — *por que não:* O 10.14.3 é do serviço energizado em MT/AT na zona de risco; aqui vale a sequência completa do 10.13.1 e o 10.13.3. (10.14.3, 10.13.1, 10.13.3)
  - D) Basta avisar o centro de operação por rádio — *por que não:* Aviso não é medida que impeça a energização. (10.13.3)
  - E) Desligar a subestação inteira durante o serviço — *por que não:* A NR-10 exige medidas que impeçam a energização do trecho, não uma medida específica como essa. [INTERPRETAÇÃO] (10.13.3)
- **Explicação:** A organização garante o estado de desenergização durante toda a execução, impedindo que outras equipes ou organizações energizem as instalações (10.13.3). O impedimento de reenergização (10.13.1 c) fica sob controle dos trabalhadores envolvidos (glossário).
- **Itens citados:** 10.13.3 · 10.13.1
- **Situação:** a validar

### V-8c6138 · Uma OS na rede de distribuição
- **Pergunta:** Como a equipe trata a rede, mesmo com a chave do trecho aberta?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Como energizada, pelo capítulo 10.14, até cumprir a sequência do 10.13.1: há possibilidade de energização por outra fonte
  - B) Como desenergizada: microgeração é pequena demais para energizar a rede — *por que não:* O 10.5.2 fala em possibilidade de energização por qualquer meio ou razão, sem limite de potência. (10.5.2)
  - C) Como extrabaixa tensão, porque painel solar gera corrente contínua — *por que não:* A rede de BT continua em BT: a faixa depende do valor da tensão na rede. (g-bt, 10.5.2)
  - D) Não se preocupa: o risco é só de quem tem a geração própria — *por que não:* O 10.14.5 obriga quem tem geração própria, mas a equipe ainda trata a instalação pelo 10.5.2. [INTERPRETAÇÃO] (10.14.5, 10.5.2)
  - E) Basta aterrar o lado da fonte principal — *por que não:* O aterramento é uma alínea; enquanto houver outra fonte possível, a instalação não está desenergizada. [INTERPRETAÇÃO] (10.13.1, 10.5.2)
- **Explicação:** Instalação desligada, mas com possibilidade de energização por qualquer meio ou razão, segue o capítulo 10.14 (10.5.2). Só é desenergizada depois da sequência do 10.13.1. Quem tem geração própria também impede a energização de instalações de outras organizações (10.14.5).
- **Itens citados:** 10.5.2 · 10.13.1 · 10.14.5
- **Situação:** a validar

### V-5c0d60 · Uma OS na rede de distribuição
- **Pergunta:** O que a equipe faz?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Interrompe o serviço: condições meteorológicas adversas entram na análise de risco e podem ser condição impeditiva
  - B) Continua: a rede está aterrada, então não há risco — *por que não:* O aterramento não afasta as condições meteorológicas adversas da análise de risco. (10.7.3)
  - C) Continua, com luvas isolantes — *por que não:* EPI é o último nível da hierarquia e não resolve condição impeditiva. (10.5.4, 10.7.3)
  - D) Continua, se o encarregado autorizar verbalmente — *por que não:* Condição impeditiva prevista na análise de risco e na PT não é dispensada verbalmente. (10.7.3, 10.7.2.1)
  - E) Só para se começar a chover no local — *por que não:* A análise de risco considera condições meteorológicas adversas, não só a chuva no local. (10.7.3)
- **Explicação:** A análise de risco considera as condições meteorológicas adversas (10.7.3 c) e as condições impeditivas (10.7.3 g); a PT também traz as condições impeditivas (10.7.2.1 e). Condição impeditiva impede a realização ou a continuidade do serviço (glossário). [INTERPRETAÇÃO: a decisão concreta sai da análise de risco da equipe.]
- **Itens citados:** 10.7.3 · 10.7.2.1
- **Situação:** a validar

### V-f3dfc1 · Uma OS na rede de distribuição
- **Pergunta:** Onde fica a documentação deste serviço?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) No PIE da distribuidora, sob responsabilidade de PLH, que também traz os procedimentos de resposta a emergências e o sistema de resgate
  - B) Só no caminhão, até o fim do turno — *por que não:* No fim, a PT é encerrada e arquivada para rastreabilidade. (10.7.2.3)
  - C) No PIE do provedor de internet — *por que não:* O serviço e a PT são da distribuidora, que integra o SEP e mantém o próprio PIE. (10.15.6)
  - D) Em lugar nenhum: serviço desenergizado não gera documento — *por que não:* O serviço não rotineiro tem PT (10.7.2), e o 10.15.4 exige procedimentos, análises de risco e PT. (10.7.2, 10.15.4)
  - E) Só com a ANEEL — *por que não:* A NR-10 manda a organização manter a documentação disponível aos trabalhadores e à Inspeção do Trabalho (10.15.2). (10.15.2)
- **Explicação:** A PT é encerrada e arquivada para rastreabilidade (10.7.2.3). Quem integra o SEP organiza a documentação do 10.15.4 na forma de PIE, sob responsabilidade de PLH (10.15.6), com procedimentos de resposta a emergências e o sistema de resgate disponível (10.15.6.1).
- **Itens citados:** 10.15.6 · 10.15.6.1 · 10.7.2.3
- **Situação:** a validar

---

## 2. Histórias: passos interativos

Passos em que o aluno clica nos objetos da cena, em cada uma das histórias. As questões de escolha das histórias estão na seção 1.

### V-115019 · Uma OS na cabine primária · F2 · Equipe · achar o objeto
- **Situação:** Três eletricistas se apresentam. Ana: engenheira eletricista com registro no CREA, ASO apto, Básico e Complementar MT/AT - SEC em dia. Bruno: técnico em eletrotécnica, ASO apto, mesmos treinamentos. Caio: era trabalhador-capacitado na empresa onde trabalhava antes; foi contratado ontem.
- **Tarefa:** Clique em quem não pode compor a equipe.
- **Resposta do simulador:** Caio · capacitado em outra empresa
- **Explicação:** Caio fica fora. A capacitação só vale para a organização que capacitou o trabalhador e nas condições estabelecidas pelo PLH responsável (10.8.3.3). Para ser autorizado aqui, Caio precisa de anuência formal da organização, ASO apto e treinamento com aproveitamento (10.10.2.1).
- **Itens citados:** 10.8.3.3 · 10.10.2.1
- **Situação:** a validar

### V-9f3cb8 · Uma OS na cabine primária · F3 · Almoxarifado · achar o objeto
- **Situação:** No carrinho: detector de tensão para MT, conjunto de aterramento temporário, cadeado, etiqueta, anteparo isolante, cones e corrente, luvas isolantes e vestimenta contra arco. A etiqueta das luvas mostra o último ensaio dielétrico há 14 meses. O fabricante e o PLH não definiram outro prazo.
- **Tarefa:** Clique no item que não pode ser usado hoje.
- **Resposta do simulador:** Luvas isolantes
- **Explicação:** Luvas com ensaio vencido. Luvas e mangas isolantes passam por ensaio dielétrico (10.14.4 b). Sem prazo menor previsto, o ensaio é anual (10.14.4.1): 14 meses é ensaio vencido. Não ensaiar EPI isolante é uma das condições de grave e iminente risco (10.16.1 d). O almoxarifado troca as luvas.
- **Itens citados:** 10.14.4 · 10.14.4.1 · 10.16.1
- **Situação:** a validar

### V-8ab367 · Uma OS na cabine primária · F4 · Chegada · não conformidade
- **Objeto:** QGBT 380 V
- **Não conformidade:** Porta do QGBT aberta
- **Explicação:** Sem intervenção em curso, a porta do painel fica permanentemente fechada, com sinalização do nível de tensão e de advertência (10.7.7.1). A equipe fecha a porta.
- **Itens citados:** 10.7.7.1
- **Situação:** a validar

### V-c949d8 · Uma OS na cabine primária · F4 · Chegada · não conformidade
- **Objeto:** Bruno · técnico em eletrotécnica
- **Não conformidade:** Bruno está de relógio
- **Explicação:** É vedado o uso de adornos pessoais nos serviços em eletricidade (10.7.8). Bruno guarda o relógio fora da cabine.
- **Itens citados:** 10.7.8
- **Situação:** a validar

### V-6f7f18 · Uma OS na cabine primária · F4 · Chegada · não conformidade
- **Objeto:** Escada de alumínio
- **Não conformidade:** Escada de alumínio encostada no cubículo
- **Explicação:** É extensão condutora. Entrar na zona controlada com parte do corpo ou com extensões condutoras é trabalho em proximidade (10.2.2; glossário). A escada sai da cabine.
- **Itens citados:** 10.2.2 · g-prox
- **Situação:** a validar

### V-e9326a · Uma OS na cabine primária · F4 · Chegada · não conformidade
- **Objeto:** Pintor terceirizado
- **Não conformidade:** Pintor trabalhando ao lado dos cubículos
- **Explicação:** Para quem faz atividade não elétrica na vizinhança da zona controlada, a organização faz análise de risco e dá instrução formal (10.14.1.2). Ele sai da área até ser instruído.
- **Itens citados:** 10.14.1.2 · g-zc
- **Situação:** a validar

### V-cab9bf · Uma OS na cabine primária · F6 · Desenergização · sequência do 10.13.1
- **Sequência do simulador:**
  1. (a) Abrir o disjuntor 52-1: O disjuntor interrompe a corrente de carga. A lâmpada passa de vermelha para verde.
  2. (a) Abrir a seccionadora 89-1: Abertura visível, já sem carga.
  3. (b) Constatar a ausência de tensão nas buchas do TR-01: Detector testado, fase a fase: sem tensão no ponto de trabalho.
  4. (c) Travar a 89-1 com cadeado pessoal: Impedimento de reenergização. Só quem colocou o cadeado o retira.
  5. (d) Constatar de novo, no ponto onde o aterramento será ligado: A constatação se repete antes do aterramento.
  6. (d) Instalar o aterramento temporário com equipotencialização: Grampos primeiro na barra de terra, depois em cada fase, com as três interligadas.
  7. (e) Instalar o anteparo isolante sobre as partes ainda energizadas: O barramento de entrada continua energizado dentro da zona controlada. A alínea e inclui a proteção contra os efeitos do arco (vestimenta Categoria 4).
  8. (f) Fixar a etiqueta de impedimento de reenergização: Quem bloqueou, por quê e desde quando.
  9. (g) Delimitar e sinalizar a área de trabalho: Cones e corrente fecham a área.
- **Itens citados:** 10.13.1
- **Alertas:** mecanismo físico · prática de campo
- **Situação:** a validar

### V-3edac7 · Uma OS na cabine primária · F6 · Desenergização · erro de ordem
- **Erro:** Arco na seccionadora
- **Explicação:** Abrir a seccionadora com o disjuntor fechado forma arco nos contatos: ela não é dispositivo de abertura sob carga. Dispositivos de abertura sob carga aparecem no 10.6.5 c como proteção contra arco.
- **Itens citados:** 10.6.5 · 10.13.1
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-20dc67 · Uma OS na cabine primária · F6 · Desenergização · erro de ordem
- **Erro:** Aterramento sem constatação
- **Explicação:** Se o circuito estiver energizado, o grampo fecha um curto franco com arco na frente de quem o segura. A alínea d manda constatar a ausência de tensão para instalar o aterramento.
- **Itens citados:** 10.13.1
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-fe147d · Uma OS na cabine primária · F6 · Desenergização · erro de ordem
- **Erro:** Impedimento antes da constatação
- **Explicação:** No 10.13.1, a constatação da ausência de tensão (alínea b) vem antes do impedimento de reenergização (alínea c).
- **Itens citados:** 10.13.1
- **Situação:** a validar

### V-de333a · Uma OS na cabine primária · F7 · Evento · achar o objeto
- **Situação:** Bruno vai começar o reaperto quando Ana lembra: o QGBT tem um gerador de emergência com QTA. Se faltar energia na fábrica, o gerador parte sozinho e alimenta o barramento de 380 V, ligado ao secundário do TR-01.
- **Tarefa:** Clique onde a equipe precisa agir antes de tocar nas buchas.
- **Resposta do simulador:** QGBT 380 V, Gerador de emergência com QTA
- **Explicação:** Bloquear também o lado de 380 V. Alimentado pelo lado de 380 V, o transformador eleva a tensão de volta a 13,8 kV nas buchas de MT (backfeed). Enquanto a instalação puder ser energizada por qualquer meio, valem as regras do capítulo 10.14 (10.5.2), e a organização garante o estado desenergizado durante todo o serviço (10.13.3). A equipe abre e bloqueia a chave do QGBT que alimenta o TR-01. [INTERPRETAÇÃO: aplicar o 10.13.1 a todas as fontes.]
- **Itens citados:** 10.5.2 · 10.13.3 · 10.13.1
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-4258b5 · Uma OS na cabine primária · F8 · Reenergização · sequência do 10.13.2
- **Sequência do simulador:**
  1. (a) Retirar cones e corrente: A reenergização começa pela retirada dos obstáculos de delimitação e sinalização.
  2. (b) Recolher ferramentas, utensílios e equipamentos: Nada fica dentro do cubículo ou sobre o transformador.
  3. (c) Retirar das imediações quem não participa da reenergização: Davi sai da cabine.
  4. (d) Remover o aterramento temporário e a equipotencialização: Primeiro as fases, por último a barra de terra.
  5. (e) Retirar o anteparo isolante: As proteções dos elementos energizados saem só agora.
  6. (f) Remover a etiqueta de impedimento
  7. (g) Retirar o cadeado da 89-1: Pelo mesmo trabalhador que o colocou.
  8. (g) Desbloquear o lado de 380 V: O bloqueio do QGBT também sai.
  9. (g) Fechar a seccionadora 89-1: Fecha sem carga, com o disjuntor ainda aberto.
  10. (g) Fechar o disjuntor 52-1: O disjuntor estabelece a corrente. Instalação reenergizada.
- **Itens citados:** 10.13.2
- **Alertas:** prática de campo
- **Situação:** a validar

### V-3ea7d6 · Uma OS na cabine primária · F8 · Reenergização · erro de ordem
- **Erro:** Religamento com aterramento instalado
- **Explicação:** Fechar o circuito com o aterramento temporário ligado põe a fonte em curto franco. Não seguir a sequência de reenergização é condição de grave e iminente risco (10.16.1 b).
- **Itens citados:** 10.13.2 · 10.16.1
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-df08a1 · Uma OS na cabine primária · F8 · Reenergização · erro de ordem
- **Erro:** Disjuntor antes da seccionadora
- **Explicação:** A seccionadora fecha primeiro, sem carga; depois o disjuntor estabelece a corrente.
- **Itens citados:** 10.13.2 · 10.6.5
- **Situação:** a validar

### V-3adfd6 · Uma OS na cabine primária · F8 · Reenergização · erro de ordem
- **Erro:** Aterramento retirado cedo
- **Explicação:** Na sequência do 10.13.2, o aterramento sai só na alínea d, depois de retirar delimitação, ferramentas e pessoas não envolvidas.
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-9f857f · Uma OS no QDC de um prédio · F2 · Equipe · achar o objeto
- **Situação:** Rita: eletricista, ASO apto, Básico e periódico em dia. Léo: técnico em eletrotécnica, ASO apto, periódico em dia; voltou ontem de 120 dias de afastamento. Joana: recepcionista, vai abrir o shaft para a equipe.
- **Tarefa:** Clique em quem não pode começar o serviço hoje.
- **Resposta do simulador:** Léo · técnico em eletrotécnica
- **Explicação:** Léo precisa do treinamento eventual. Depois de afastamento por mais de 90 dias, a organização faz treinamento eventual, mesmo com o periódico em dia (10.9.11 a), com carga e conteúdo ligados à situação que o motivou (10.9.11.1). Joana só abre a porta e fica fora da zona controlada.
- **Itens citados:** 10.9.11 · 10.9.11.1
- **Situação:** a validar

### V-dece24 · Uma OS no QDC de um prédio · F3 · Chegada · não conformidade
- **Objeto:** Caixas de papelão guardadas no shaft
- **Não conformidade:** Caixas guardadas no shaft
- **Explicação:** O shaft é local de serviços elétricos: é proibido usá-lo para guardar objetos (10.12.8). As caixas saem.
- **Itens citados:** 10.12.8
- **Situação:** a validar

### V-2d3f04 · Uma OS no QDC de um prédio · F3 · Chegada · não conformidade
- **Objeto:** Disjuntores dos circuitos
- **Não conformidade:** Circuitos sem identificação
- **Explicação:** A sinalização identifica os circuitos elétricos (10.7.7 a), como o memorial do projeto define (10.4.9 b). Rita identifica o circuito da copa-cozinha antes de mexer.
- **Itens citados:** 10.7.7 · 10.4.9
- **Situação:** a validar

### V-f4ee4d · Uma OS no QDC de um prédio · F3 · Chegada · não conformidade
- **Objeto:** Rita · eletricista predial
- **Não conformidade:** Rita está de anel
- **Explicação:** É vedado o uso de adornos pessoais nos serviços em eletricidade (10.7.8). O anel fica guardado fora do shaft.
- **Itens citados:** 10.7.8
- **Situação:** a validar

### V-d83457 · Uma OS no QDC de um prédio · F3 · Chegada · não conformidade
- **Objeto:** Furadeira com plugue adaptado
- **Não conformidade:** Furadeira com plugue adaptado
- **Explicação:** Só ferramentas compatíveis com a instalação, preservando as características de proteção (10.12.5). O adaptador que tira o pino de terra anula a proteção. [INTERPRETAÇÃO]
- **Itens citados:** 10.12.5
- **Alertas:** interpretação rotulada
- **Situação:** a validar

### V-9f5e1d · Uma OS no QDC de um prédio · F4 · Desenergização · sequência do 10.13.1
- **Sequência do simulador:**
  1. (a) Desligar o disjuntor geral do QDC: Seccionamento do quadro.
  2. (b) Constatar a ausência de tensão no barramento: Instrumento adequado à tensão e testado antes [PRÁTICA]: sem tensão no barramento.
  3. (c) Travar o disjuntor geral com cadeado pessoal: Impedimento de reenergização sob controle de quem trabalha.
  4. (d) Constatar de novo, no ponto do aterramento: A constatação se repete antes de aterrar.
  5. (d) Instalar o aterramento temporário no barramento, com equipotencialização: As fases e o neutro interligados e aterrados.
  6. (e) Cobrir os bornes de entrada do disjuntor geral: O lado da fonte continua energizado a poucos centímetros da mão: dentro da zona controlada.
  7. (f) Fixar a etiqueta de impedimento no disjuntor geral: Quem bloqueou, por quê e desde quando.
  8. (g) Delimitar e sinalizar a área no corredor: O corredor do andar tem circulação de pessoas.
- **Itens citados:** 10.13.1
- **Alertas:** prática de campo
- **Situação:** a validar

### V-69beea · Uma OS no QDC de um prédio · F4 · Desenergização · erro de ordem
- **Erro:** Aterramento sem constatação
- **Explicação:** A alínea d manda constatar a ausência de tensão para instalar o aterramento temporário. Pular essa etapa é grave e iminente risco (10.16.1 b).
- **Itens citados:** 10.13.1 · 10.16.1
- **Situação:** a validar

### V-fe147d · Uma OS no QDC de um prédio · F4 · Desenergização · erro de ordem
- **Erro:** Impedimento antes da constatação
- **Explicação:** No 10.13.1, a constatação da ausência de tensão (alínea b) vem antes do impedimento de reenergização (alínea c).
- **Itens citados:** 10.13.1
- **Situação:** a validar

### V-2ebca9 · Uma OS no canteiro de obra · F3 · Ronda no canteiro · não conformidade
- **Objeto:** Quadro de distribuição provisório (QDP) · 380/220 V
- **Não conformidade:** Porta do QDP aberta, sem sinalização
- **Explicação:** Fora de intervenção, a porta fica permanentemente fechada, com sinalização do nível de tensão, de choque e arco e de restrição de acesso (10.7.7.1). A placa vai para a porta, que fecha assim que a ronda acabar.
- **Itens citados:** 10.7.7.1
- **Situação:** a validar

### V-79de2e · Uma OS no canteiro de obra · F3 · Ronda no canteiro · não conformidade
- **Objeto:** Sacos de cimento dentro do QDP
- **Não conformidade:** Sacos de cimento dentro do QDP
- **Explicação:** Invólucro de equipamento elétrico não é depósito (10.12.8).
- **Itens citados:** 10.12.8
- **Situação:** a validar

### V-a17b1f · Uma OS no canteiro de obra · F3 · Ronda no canteiro · não conformidade
- **Objeto:** DR do QDP
- **Não conformidade:** DR nunca testado
- **Explicação:** Os sistemas de proteção são inspecionados, testados e controlados periodicamente (10.12.7). O teste entra na rotina do canteiro.
- **Itens citados:** 10.12.7
- **Situação:** a validar

### V-83c32e · Uma OS no canteiro de obra · F3 · Ronda no canteiro · não conformidade
- **Objeto:** Eletroduto com força e interfone
- **Não conformidade:** Interfone no eletroduto de força
- **Explicação:** Circuitos de finalidades distintas são identificados e instalados separadamente, salvo compartilhamento definido em projeto (10.4.3.1, 10.12.10).
- **Itens citados:** 10.4.3.1 · 10.12.10
- **Situação:** a validar

### V-cf5505 · Uma OS no canteiro de obra · F3 · Ronda no canteiro · não conformidade
- **Objeto:** Servente erguendo vergalhões junto à rede
- **Não conformidade:** Vergalhões erguidos junto à rede de 13,8 kV
- **Explicação:** Um vergalhão de 6 m é extensão condutora e pode entrar na zona controlada (Rc = 1,38 m): isso é trabalho em proximidade, só para autorizados (10.2.2, 10.14.1). Para quem trabalha na vizinhança, análise de risco e instrução formal (10.14.1.2). O material passa a ser movimentado longe da rede.
- **Itens citados:** 10.2.2 · AII · 10.14.1 · 10.14.1.2
- **Situação:** a validar

### V-6a4e38 · Uma OS no canteiro de obra · F5 · Reenergização · sequência do 10.13.2
- **Sequência do simulador:**
  1. (a) Retirar cones e fita: Primeiro os obstáculos de delimitação e sinalização.
  2. (b) Recolher ferramentas e sobras de cabo: Nada fica dentro do QDP.
  3. (c) Retirar o ajudante das imediações: Ele não participa da reenergização.
  4. (d) Remover o aterramento temporário e a equipotencialização: Só agora, com área, ferramentas e pessoas liberadas.
  5. (e) Retirar o anteparo dos bornes de entrada: A proteção dos elementos energizados sai depois do aterramento.
  6. (f) Remover a etiqueta de impedimento
  7. (g) Retirar o cadeado e religar o disjuntor geral: Pelo mesmo trabalhador que o colocou [PRÁTICA]. Porta fechada em seguida.
- **Itens citados:** 10.13.2
- **Alertas:** prática de campo
- **Situação:** a validar

### V-7ef72f · Uma OS no canteiro de obra · F5 · Reenergização · erro de ordem
- **Erro:** Religamento com aterramento instalado
- **Explicação:** Religar com o aterramento temporário ainda ligado inverte a sequência do 10.13.2. Não seguir a sequência de reenergização é grave e iminente risco (10.16.1 b).
- **Itens citados:** 10.13.2 · 10.16.1
- **Situação:** a validar

### V-ae5c0f · Uma OS no canteiro de obra · F5 · Reenergização · erro de ordem
- **Erro:** Aterramento retirado cedo
- **Explicação:** O aterramento sai só na alínea d, depois da delimitação (a), das ferramentas (b) e das pessoas não envolvidas (c).
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-c5fe17 · Uma OS na rede de distribuição · F2 · No local · achar o objeto
- **Situação:** Chegando ao poste, a equipe encontra um técnico do provedor de internet subindo a escada para lançar fibra no mesmo poste, sem combinar nada com a distribuidora.
- **Tarefa:** Clique em quem precisa entrar no planejamento antes de começar.
- **Resposta do simulador:** Técnico do provedor de internet
- **Explicação:** Ações integradas com o provedor. Quando a atuação independente é tecnicamente inviável, as organizações do compartilhamento executam ações integradas (10.7.9). Trabalhos simultâneos entram na análise de risco (10.7.3 f). O técnico do provedor faz o Específico de compartilhamento de 40 h (10.9.9).
- **Itens citados:** 10.7.9 · 10.7.3 · 10.9.9
- **Situação:** a validar

### V-049feb · Uma OS na rede de distribuição · F4 · Desenergização · sequência do 10.13.1
- **Sequência do simulador:**
  1. (a) Abrir a chave fusível do trecho: Seccionamento com abertura visível.
  2. (b) Constatar a ausência de tensão na rede de MT: Detector adequado à tensão e testado antes [PRÁTICA].
  3. (c) Bloquear a chave e registrar o impedimento no centro de operação: Impedimento sob controle da equipe; o centro de operação não manobra o trecho.
  4. (d) Constatar de novo, nos pontos de aterramento: A constatação se repete antes de aterrar.
  5. (d) Instalar o aterramento temporário dos dois lados do ponto de trabalho: Com equipotencialização dos condutores [os dois lados: PRÁTICA].
  6. (e) Cobrir a rede de BT, que continua energizada: Ela fica dentro da zona controlada do ponto de trabalho.
  7. (f) Sinalizar o impedimento de reenergização na chave
  8. (g) Delimitar e sinalizar a área na rua: Inclui a sinalização para veículos e pedestres.
- **Itens citados:** 10.13.1
- **Alertas:** prática de campo
- **Situação:** a validar

### V-e318ea · Uma OS na rede de distribuição · F4 · Desenergização · erro de ordem
- **Erro:** Aterramento sem constatação
- **Explicação:** A alínea d manda constatar a ausência de tensão para instalar o aterramento. Pular a constatação é grave e iminente risco (10.16.1 b).
- **Itens citados:** 10.13.1 · 10.16.1
- **Situação:** a validar

### V-fe147d · Uma OS na rede de distribuição · F4 · Desenergização · erro de ordem
- **Erro:** Impedimento antes da constatação
- **Explicação:** No 10.13.1, a constatação da ausência de tensão (alínea b) vem antes do impedimento de reenergização (alínea c).
- **Itens citados:** 10.13.1
- **Situação:** a validar

---

## 3. Missão: passos de marcar e de ordenar (OS 0457)

As decisões de escolha única da Missão estão na seção 1.

### V-fa5374 · Missão · Equipe
- **Pergunta:** Marque quem pode compor a equipe deste serviço.
- **Marcações do simulador** (✔ = marcar):
  - **✔** Ana · engenheira, CREA ativo, ASO apta, Básico e Complementar MT/AT-SEC em dia
  - **✔** Bruno · técnico qualificado, ASO apto, Básico e Complementar MT/AT-SEC em dia
  - ✘ Carla · capacitada na empresa anterior, sem convalidação nesta
  - ✘ Fábio · voltou ontem de 120 dias de afastamento, sem treinamento eventual
  - ✘ Joana · técnica qualificada, ASO apta, só com o Básico
  - ✘ Igor · pedreiro da obra vizinha
- **Explicação:** Carla: capacitação só vale onde foi feita. Fábio: afastamento acima de 90 dias pede treinamento eventual. Joana: serviço em MT no SEC pede o Complementar MT/AT-SEC. Igor: atividade não elétrica, fora da equipe de serviço em eletricidade.
- **Itens citados:** 10.8.3.3 · 10.9.11 · 10.9.6 · 10.10.2.1
- **Situação:** a validar

### V-6e6d85 · Missão · Desenergização
- **Pergunta:** Ponha as etapas do 10.13.1 em ordem.
- **Ordem do simulador:**
  1. Seccionamento ou desligamento
  2. Constatação da ausência de tensão
  3. Impedimento de reenergização
  4. Constatação para o aterramento temporário com equipotencialização
  5. Proteção dos elementos energizados na ZC e contra arco
  6. Sinalização de impedimento de reenergização
  7. Delimitação e sinalização da área de trabalho
- **Explicação:** A constatação da ausência de tensão (b) vem antes do impedimento de reenergização (c) e se repete antes do aterramento temporário (d). A sequência termina com a delimitação e sinalização da área de trabalho (g).
- **Itens citados:** 10.13.1
- **Situação:** a validar

### V-370dee · Missão · Reenergização
- **Pergunta:** Serviço terminado. Ponha as etapas do 10.13.2 em ordem.
- **Ordem do simulador:**
  1. Retirada dos obstáculos de delimitação e sinalização
  2. Retirada de ferramentas, utensílios e equipamentos
  3. Retirada dos trabalhadores não envolvidos
  4. Remoção do aterramento temporário e da equipotencialização
  5. Retirada das proteções dos elementos energizados
  6. Remoção da sinalização de impedimento
  7. Desbloqueio e religamento
- **Explicação:** 
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-a8468d · Missão · Encerramento
- **Pergunta:** O que precisa acontecer no encerramento?
- **Marcações do simulador** (✔ = marcar):
  - **✔** Encerrar e arquivar a PT para rastreabilidade
  - **✔** Atualizar o projeto se a instalação mudou
  - **✔** Manter no PIE os relatórios de ensaio do ferramental isolante
  - ✘ Descartar a análise de risco, já que o serviço terminou
  - ✘ Entregar a PT ao executante como comprovante pessoal
- **Explicação:** A PT é encerrada e arquivada; o projeto corresponde ao executado; o PIE reúne procedimentos, análises, PT e relatórios de ensaio.
- **Itens citados:** 10.7.2.3 · 10.4.13 · 10.15.4 · 10.15.6
- **Situação:** a validar

---

## 4. Histórias: objetos das cenas

O que cada objeto é e quais itens se aplicam a ele ("Explorar a cena").

### V-7ce080 · Uma OS na cabine primária · objeto · Porta da cabine
- **Texto do simulador:** Local de serviço elétrico: uso exclusivo, proibido guardar objetos (10.12.8). Sinalização de advertência e de restrição de acesso (10.7.7).
- **Itens citados:** 10.12.8 · 10.7.7
- **Situação:** a validar

### V-7d1e01 · Uma OS na cabine primária · objeto · Quadro de documentos (PT e unifilar)
- **Texto do simulador:** A PT fica disponível no local do serviço e, no fim, é encerrada e arquivada (10.7.2.3). O projeto fica disponível aos trabalhadores autorizados e atualizado (10.4.7, 10.4.13).
- **Itens citados:** 10.7.2.3 · 10.4.7 · 10.4.13
- **Situação:** a validar

### V-532836 · Uma OS na cabine primária · objeto · Extintor de CO₂
- **Texto do simulador:** A proteção contra incêndio segue a NR-23, citada no 10.6.6. A NR-10 de 2026 não tem item próprio sobre extintor.
- **Itens citados:** 10.6.6 · NR-23
- **Situação:** a validar

### V-80437a · Uma OS na cabine primária · objeto · Cubículo de entrada · barramento 13,8 kV
- **Texto do simulador:** Lado da fonte: continua energizado mesmo com o 52-1 e a 89-1 abertos. Para 13,8 kV, Rr = 0,38 m e Rc = 1,38 m (Anexo II).
- **Itens citados:** AII · g-zr · g-zc
- **Situação:** a validar

### V-37be4a · Uma OS na cabine primária · objeto · Indicador de presença de tensão (VPIS)
- **Texto do simulador:** Os LEDs indicam tensão na saída da 89-1, mas não substituem a constatação com detector testado (10.13.1 b). [PRÁTICA: o LED pode estar queimado.]
- **Itens citados:** 10.13.1 · 10.12.6.1
- **Alertas:** prática de campo
- **Situação:** a validar

### V-c3176f · Uma OS na cabine primária · objeto · Seccionadora 89-1
- **Texto do simulador:** Seccionamento com abertura visível (10.13.1 a). O projeto especifica dispositivo com recurso para impedimento de reenergização e sinalização (10.4.1) e, se possível, de ação simultânea (10.4.2).
- **Itens citados:** 10.13.1 · 10.4.1 · 10.4.2
- **Situação:** a validar

### V-900dd4 · Uma OS na cabine primária · objeto · Disjuntor 52-1
- **Texto do simulador:** Interrompe a corrente de carga; por isso abre antes da seccionadora. Dispositivo de abertura sob carga é proteção coletiva contra arco (10.6.5 c). Lâmpada vermelha = ligado, verde = desligado [PRÁTICA].
- **Itens citados:** 10.6.5 · 10.13.1
- **Alertas:** mecanismo físico · prática de campo
- **Situação:** a validar

### V-b9d118 · Uma OS na cabine primária · objeto · TR-01 · ponto de trabalho
- **Texto do simulador:** Transformador de 1000 kVA, 13,8 kV/380 V. Desligado não é desenergizado: enquanto puder ser energizado por qualquer meio, valem as regras do capítulo 10.14 (10.5.2).
- **Itens citados:** 10.5.2 · 10.13.1
- **Situação:** a validar

### V-5139df · Uma OS na cabine primária · objeto · Barra de terra
- **Texto do simulador:** O projeto prevê condições para o aterramento temporário (10.4.6) e define o esquema de aterramento (10.4.4).
- **Itens citados:** 10.4.6 · 10.4.4
- **Situação:** a validar

### V-b44bfa · Uma OS na cabine primária · objeto · QGBT 380 V
- **Texto do simulador:** Painel com porta mantida fechada fora de intervenção e sinalização do nível de tensão, de choque e de arco (10.7.7.1).
- **Itens citados:** 10.7.7.1
- **Situação:** a validar

### V-1a9fe7 · Uma OS na cabine primária · objeto · Gerador de emergência com QTA
- **Texto do simulador:** Fonte própria: pode energizar a instalação pelo lado de 380 V. A geração própria também não pode energizar instalações de outras organizações (10.14.5).
- **Itens citados:** 10.14.5 · 10.5.2
- **Situação:** a validar

### V-d097a9 · Uma OS na cabine primária · objeto · Tapete isolante
- **Texto do simulador:** Isolação no piso diante dos cubículos [PRÁTICA]. Equipamentos isolantes passam por ensaio dielétrico (10.14.4).
- **Itens citados:** 10.14.4 · 10.6.2
- **Alertas:** prática de campo
- **Situação:** a validar

### V-e6bc3f · Uma OS na cabine primária · objeto · Detector de tensão por aproximação (MT)
- **Texto do simulador:** Adequado à tensão e à classe de isolação, com categoria compatível com surtos e aferido (10.12.6.1). Testado numa fonte conhecida antes do uso [PRÁTICA].
- **Itens citados:** 10.12.6.1 · 10.13.1
- **Alertas:** prática de campo
- **Situação:** a validar

### V-a2390a · Uma OS na cabine primária · objeto · Conjunto de aterramento temporário
- **Texto do simulador:** Grampos e cabos para aterrar e equipotencializar as fases (10.13.1 d). O ferramental isolante passa por ensaio (10.14.4).
- **Itens citados:** 10.13.1 · 10.14.4
- **Situação:** a validar

### V-b5f01b · Uma OS na cabine primária · objeto · Cadeado pessoal
- **Texto do simulador:** Impedimento de reenergização (10.13.1 c). Só quem colocou o cadeado o retira [PRÁTICA].
- **Itens citados:** 10.13.1 · 10.7.7
- **Alertas:** prática de campo
- **Situação:** a validar

### V-3334dc · Uma OS na cabine primária · objeto · Etiqueta de impedimento
- **Texto do simulador:** Sinalização de impedimento de reenergização (10.13.1 f; 10.7.7 e).
- **Itens citados:** 10.13.1 · 10.7.7
- **Situação:** a validar

### V-34070d · Uma OS na cabine primária · objeto · Anteparo isolante
- **Texto do simulador:** Protege os elementos que continuam energizados na zona controlada e os trabalhadores contra o arco (10.13.1 e). Barreira é proteção básica (10.6.2 b).
- **Itens citados:** 10.13.1 · 10.6.2 · AII
- **Situação:** a validar

### V-93e29d · Uma OS na cabine primária · objeto · Cones e corrente
- **Texto do simulador:** Delimitação e sinalização da área de trabalho (10.13.1 g; 10.7.7 d).
- **Itens citados:** 10.13.1 · 10.7.7
- **Situação:** a validar

### V-5d7555 · Uma OS na cabine primária · objeto · Luvas isolantes
- **Texto do simulador:** Ensaio dielétrico no menor prazo entre regulamento, fabricante e critério do PLH; sem previsão, anual (10.14.4, 10.14.4.1).
- **Itens citados:** 10.14.4 · 10.14.4.1
- **Situação:** a validar

### V-77f9fe · Uma OS na cabine primária · objeto · Vestimenta contra arco
- **Texto do simulador:** Escolhida pelos Quadros do Anexo IV (10.11.2). A indumentária não pode ter material condutível (10.7.8.1).
- **Itens citados:** 10.11.2 · AIV-III · 10.7.8.1
- **Situação:** a validar

### V-765b86 · Uma OS na cabine primária · objeto · Ana · engenheira eletricista (PLH)
- **Texto do simulador:** Qualificada em curso da área elétrica e com registro no conselho de classe: é PLH (10.8.2). ASO apto e treinamentos em dia: pode ser autorizada (10.10.2.1).
- **Itens citados:** 10.8.2 · 10.10.2.1
- **Situação:** a validar

### V-6e3e11 · Uma OS na cabine primária · objeto · Bruno · técnico em eletrotécnica
- **Texto do simulador:** Trabalhador qualificado (10.8.1), com exame de saúde (10.7.5) e treinamentos em dia.
- **Itens citados:** 10.8.1 · 10.7.5
- **Situação:** a validar

### V-30a2b3 · Uma OS na cabine primária · objeto · Caio · capacitado em outra empresa
- **Texto do simulador:** A capacitação só vale para a organização que capacitou e nas condições do PLH responsável (10.8.3.3).
- **Itens citados:** 10.8.3.3
- **Situação:** a validar

### V-cae6fb · Uma OS na cabine primária · objeto · Pintor terceirizado
- **Texto do simulador:** Atividade não elétrica na vizinhança da zona controlada: análise de risco e instrução formal (10.14.1.2).
- **Itens citados:** 10.14.1.2
- **Situação:** a validar

### V-840474 · Uma OS na cabine primária · objeto · Escada de alumínio
- **Texto do simulador:** Extensão condutora: entrar na zona controlada com ela é trabalho em proximidade (10.2.2; glossário).
- **Itens citados:** 10.2.2 · g-prox
- **Situação:** a validar

### V-dd33c3 · Uma OS na cabine primária · objeto · Ferramentas do reaperto
- **Texto do simulador:** Na reenergização, ferramentas, utensílios e equipamentos são retirados antes de remover o aterramento (10.13.2 b).
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-e99383 · Uma OS na cabine primária · objeto · Davi · mecânico de manutenção
- **Texto do simulador:** Não participa da reenergização: sai das imediações (10.13.2 c).
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-07ec6b · Uma OS no QDC de um prédio · objeto · Shaft elétrico do 3º andar
- **Texto do simulador:** Local de serviços elétricos: exclusivo para essa finalidade, proibido guardar objetos (10.12.8).
- **Itens citados:** 10.12.8
- **Situação:** a validar

### V-290603 · Uma OS no QDC de um prédio · objeto · Caixas de papelão guardadas no shaft
- **Texto do simulador:** Locais de serviços elétricos e invólucros não podem ser usados para armazenamento ou guarda de objetos (10.12.8).
- **Itens citados:** 10.12.8
- **Situação:** a validar

### V-0ef034 · Uma OS no QDC de um prédio · objeto · QDC do 3º andar · 380/220 V
- **Texto do simulador:** Quadro com porta mantida fechada fora de intervenção e sinalização do nível de tensão, de choque, de arco e de restrição de acesso (10.7.7.1).
- **Itens citados:** 10.7.7.1
- **Situação:** a validar

### V-079cfa · Uma OS no QDC de um prédio · objeto · Disjuntor geral do QDC
- **Texto do simulador:** O projeto especifica dispositivo de desligamento com recurso para impedimento de reenergização e sinalização da condição operativa (10.4.1). Seccionamento: alínea a do 10.13.1.
- **Itens citados:** 10.4.1 · 10.13.1
- **Situação:** a validar

### V-b983ee · Uma OS no QDC de um prédio · objeto · Bornes de entrada do disjuntor geral
- **Texto do simulador:** Lado da fonte: continuam energizados com o disjuntor geral aberto. Abaixo de 1 kV, Rr = 0,20 m e Rc = 0,70 m (Anexo II).
- **Itens citados:** AII · 10.13.1
- **Situação:** a validar

### V-fd6cd2 · Uma OS no QDC de um prédio · objeto · Barramento do QDC
- **Texto do simulador:** Ponto onde se constata a ausência de tensão (10.13.1 b) e onde o projeto prevê condições para o aterramento temporário (10.4.6).
- **Itens citados:** 10.13.1 · 10.4.6
- **Situação:** a validar

### V-17c3ef · Uma OS no QDC de um prédio · objeto · Disjuntores dos circuitos
- **Texto do simulador:** Circuitos identificados (10.7.7 a), com o sistema de identificação descrito no memorial do projeto (10.4.9 b).
- **Itens citados:** 10.7.7 · 10.4.9
- **Situação:** a validar

### V-5192f4 · Uma OS no QDC de um prédio · objeto · DR do circuito da copa-cozinha
- **Texto do simulador:** Proteção adicional obrigatória nos circuitos de tomada de copas-cozinhas em edificação não residencial (10.6.4 e). Para instalação existente, essa alínea vale um ano depois da vigência da Portaria (art. 3º).
- **Itens citados:** 10.6.4 · art3
- **Situação:** a validar

### V-40efc9 · Uma OS no QDC de um prédio · objeto · Copa-cozinha do escritório
- **Texto do simulador:** Ponto de tomada em copa-cozinha de edificação não residencial: alínea e do 10.6.4.
- **Itens citados:** 10.6.4
- **Situação:** a validar

### V-ed4aed · Uma OS no QDC de um prédio · objeto · Furadeira com plugue adaptado
- **Texto do simulador:** Só podem ser usados equipamentos e ferramentas elétricas compatíveis com a instalação existente, preservando as características de proteção (10.12.5). O adaptador que elimina o pino de terra não preserva. [INTERPRETAÇÃO]
- **Itens citados:** 10.12.5
- **Alertas:** interpretação rotulada
- **Situação:** a validar

### V-4068b6 · Uma OS no QDC de um prédio · objeto · Projeto e procedimento de trabalho
- **Texto do simulador:** O procedimento é aprovado por PLH (10.7.1.1). O projeto fica disponível aos autorizados e atualizado conforme o executado (10.4.7, 10.4.13).
- **Itens citados:** 10.7.1.1 · 10.4.7 · 10.4.13
- **Situação:** a validar

### V-21318c · Uma OS no QDC de um prédio · objeto · Rita · eletricista predial
- **Texto do simulador:** Autorizada: ASO apto e treinamento com aproveitamento (10.10.2.1). É vedado o uso de adornos pessoais no serviço (10.7.8).
- **Itens citados:** 10.10.2.1 · 10.7.8
- **Situação:** a validar

### V-9ab6f7 · Uma OS no QDC de um prédio · objeto · Léo · técnico em eletrotécnica
- **Texto do simulador:** Voltou de 120 dias de afastamento: antes de voltar ao serviço, treinamento eventual (10.9.11 a).
- **Itens citados:** 10.9.11
- **Situação:** a validar

### V-a423f5 · Uma OS no QDC de um prédio · objeto · Joana · recepcionista
- **Texto do simulador:** Pessoa não advertida: pode fazer operações elementares em BT, como ligar e desligar circuitos em quadro feito para uso seguro (10.14.1.1).
- **Itens citados:** 10.14.1.1 · g-opel
- **Situação:** a validar

### V-39bd44 · Uma OS no QDC de um prédio · objeto · Multímetro / detector de BT
- **Texto do simulador:** Adequado à tensão de trabalho e à classe de isolação, com categoria compatível com surtos e aferido (10.12.6.1).
- **Itens citados:** 10.12.6.1
- **Situação:** a validar

### V-188aee · Uma OS no QDC de um prédio · objeto · Cadeado pessoal
- **Texto do simulador:** Impedimento de reenergização (10.13.1 c).
- **Itens citados:** 10.13.1
- **Situação:** a validar

### V-fa8174 · Uma OS no QDC de um prédio · objeto · Etiqueta de impedimento
- **Texto do simulador:** Sinalização de impedimento de reenergização (10.13.1 f; 10.7.7 e).
- **Itens citados:** 10.13.1 · 10.7.7
- **Situação:** a validar

### V-8900a6 · Uma OS no QDC de um prédio · objeto · Anteparo isolante
- **Texto do simulador:** Protege os elementos que continuam energizados na zona controlada (10.13.1 e). Barreira é proteção básica (10.6.2 b).
- **Itens citados:** 10.13.1 · 10.6.2
- **Situação:** a validar

### V-9575d0 · Uma OS no QDC de um prédio · objeto · Conjunto de aterramento temporário de BT
- **Texto do simulador:** Aterramento com equipotencialização dos condutores (10.13.1 d).
- **Itens citados:** 10.13.1
- **Situação:** a validar

### V-81f5f2 · Uma OS no QDC de um prédio · objeto · Cones e corrente
- **Texto do simulador:** Delimitação e sinalização da área de trabalho no corredor (10.13.1 g; 10.7.7 d).
- **Itens citados:** 10.13.1 · 10.7.7
- **Situação:** a validar

### V-3fe860 · Uma OS no canteiro de obra · objeto · Quadro de distribuição provisório (QDP) · 380/220 V
- **Texto do simulador:** A NR-10 alcança instalações de caráter permanente ou temporário (10.2.1). Porta mantida fechada fora de intervenção, com sinalização de tensão, choque, arco e restrição de acesso (10.7.7.1).
- **Itens citados:** 10.2.1 · 10.7.7.1
- **Situação:** a validar

### V-f34fcf · Uma OS no canteiro de obra · objeto · Disjuntor geral do QDP
- **Texto do simulador:** Dispositivo de desligamento com recurso para impedimento de reenergização e sinalização da condição operativa (10.4.1).
- **Itens citados:** 10.4.1 · 10.13.2
- **Situação:** a validar

### V-575d8d · Uma OS no canteiro de obra · objeto · Bornes de entrada do QDP
- **Texto do simulador:** Lado da fonte: continuam energizados com o disjuntor geral aberto (Anexo II, < 1 kV: Rr 0,20 m, Rc 0,70 m).
- **Itens citados:** AII
- **Situação:** a validar

### V-e72cfe · Uma OS no canteiro de obra · objeto · Sacos de cimento dentro do QDP
- **Texto do simulador:** Invólucros de equipamentos elétricos são exclusivos para essa finalidade: proibido guardar objetos (10.12.8).
- **Itens citados:** 10.12.8
- **Situação:** a validar

### V-afbb3a · Uma OS no canteiro de obra · objeto · DR do QDP
- **Texto do simulador:** Os sistemas de proteção são mantidos em condições seguras, inspecionados, testados e controlados periodicamente (10.12.7).
- **Itens citados:** 10.12.7 · 10.6.4
- **Situação:** a validar

### V-1e8219 · Uma OS no canteiro de obra · objeto · Eletroduto com força e interfone
- **Texto do simulador:** Circuitos de finalidades distintas são identificados e instalados separadamente, salvo compartilhamento definido em projeto (10.4.3.1, 10.12.10).
- **Itens citados:** 10.4.3.1 · 10.12.10
- **Situação:** a validar

### V-31328b · Uma OS no canteiro de obra · objeto · Tomadas novas no pátio
- **Texto do simulador:** Tomadas em áreas externas à edificação: DDR de alta sensibilidade obrigatório (10.6.4 b).
- **Itens citados:** 10.6.4
- **Situação:** a validar

### V-094f15 · Uma OS no canteiro de obra · objeto · Betoneira nova
- **Texto do simulador:** Equipamento compatível com a instalação existente, preservando as características de proteção (10.12.5).
- **Itens citados:** 10.12.5
- **Situação:** a validar

### V-9a3cc4 · Uma OS no canteiro de obra · objeto · Rede de distribuição 13,8 kV na calçada
- **Texto do simulador:** Pertence à distribuidora (SEP). Para 13,8 kV, Rr = 0,38 m e Rc = 1,38 m (Anexo II). Chegar à zona controlada com o corpo ou com extensões condutoras é trabalho em proximidade (10.2.2).
- **Itens citados:** AII · 10.2.2 · g-sep
- **Situação:** a validar

### V-c472ae · Uma OS no canteiro de obra · objeto · Servente erguendo vergalhões junto à rede
- **Texto do simulador:** Vergalhão é extensão condutora: perto da rede, pode entrar na zona controlada (10.2.2), o que só cabe a autorizados (10.14.1).
- **Itens citados:** 10.2.2 · 10.14.1
- **Situação:** a validar

### V-90c44d · Uma OS no canteiro de obra · objeto · Projeto do canteiro
- **Texto do simulador:** Sob responsabilidade de PLH (10.4.8), disponível aos autorizados e atualizado conforme o executado (10.4.7, 10.4.13).
- **Itens citados:** 10.4.8 · 10.4.7 · 10.4.13
- **Situação:** a validar

### V-94dc46 · Uma OS no canteiro de obra · objeto · Marta · engenheira residente (PLH)
- **Texto do simulador:** Qualificada e com registro no conselho de classe (10.8.2). Responde pelo projeto e pelo acompanhamento do técnico estrangeiro.
- **Itens citados:** 10.8.2 · 10.9.8
- **Situação:** a validar

### V-f698d2 · Uma OS no canteiro de obra · objeto · Tiago · eletricista autorizado
- **Texto do simulador:** ASO apto e treinamento com aproveitamento (10.10.2.1).
- **Itens citados:** 10.10.2.1
- **Situação:** a validar

### V-93dfbc · Uma OS no canteiro de obra · objeto · Klaus · técnico do fabricante do elevador de obra
- **Texto do simulador:** Estrangeiro, 12 dias de serviço na zona controlada: treinamento Específico e pontual, acompanhado presencial e permanentemente por trabalhador autorizado (10.9.8).
- **Itens citados:** 10.9.8
- **Situação:** a validar

### V-d2dc7d · Uma OS no canteiro de obra · objeto · Ajudante da obra
- **Texto do simulador:** Não participa da reenergização: sai das imediações (10.13.2 c).
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-912885 · Uma OS no canteiro de obra · objeto · Ferramentas e sobras de cabo
- **Texto do simulador:** Na reenergização, ferramentas, utensílios e equipamentos saem antes do aterramento (10.13.2 b).
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-f8eaf3 · Uma OS no canteiro de obra · objeto · Cadeado pessoal
- **Texto do simulador:** Impedimento de reenergização (10.13.1 c); sai na alínea g do 10.13.2.
- **Itens citados:** 10.13.1 · 10.13.2
- **Situação:** a validar

### V-178e96 · Uma OS no canteiro de obra · objeto · Etiqueta de impedimento
- **Texto do simulador:** Removida na alínea f do 10.13.2.
- **Itens citados:** 10.13.2 · 10.7.7
- **Situação:** a validar

### V-87507c · Uma OS no canteiro de obra · objeto · Aterramento temporário
- **Texto do simulador:** Removido na alínea d do 10.13.2, depois de retirar delimitação, ferramentas e pessoas não envolvidas.
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-66b1cc · Uma OS no canteiro de obra · objeto · Anteparo isolante dos bornes
- **Texto do simulador:** Proteção dos elementos energizados: sai na alínea e do 10.13.2.
- **Itens citados:** 10.13.2 · 10.13.1
- **Situação:** a validar

### V-8d0c26 · Uma OS no canteiro de obra · objeto · Cones e fita
- **Texto do simulador:** Obstáculos de delimitação e sinalização: a reenergização começa por eles (10.13.2 a).
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-ba14cf · Uma OS na rede de distribuição · objeto · Poste com rede de MT, rede de BT e fibra
- **Texto do simulador:** Infraestrutura do SEP compartilhada com um provedor de telecomunicações (glossário: compartilhamento de infraestrutura).
- **Itens citados:** g-comp · g-sep
- **Situação:** a validar

### V-c15688 · Uma OS na rede de distribuição · objeto · Isolador quebrado · ponto de trabalho
- **Texto do simulador:** Rede de 13,8 kV: MT. Rr = 0,38 m e Rc = 1,38 m (Anexo II).
- **Itens citados:** g-mt · AII
- **Situação:** a validar

### V-0b1397 · Uma OS na rede de distribuição · objeto · Rede de média tensão 13,8 kV
- **Texto do simulador:** Desligada não é desenergizada: enquanto puder ser energizada por qualquer meio, valem as regras do 10.14 (10.5.2).
- **Itens citados:** 10.5.2 · 10.13.1
- **Situação:** a validar

### V-378f29 · Uma OS na rede de distribuição · objeto · Rede de baixa tensão (continua energizada)
- **Texto do simulador:** Elemento energizado dentro da zona controlada do ponto de trabalho: alínea e do 10.13.1.
- **Itens citados:** 10.13.1 · AII
- **Situação:** a validar

### V-ef29ae · Uma OS na rede de distribuição · objeto · Cabo de fibra óptica do provedor
- **Texto do simulador:** Compartilhamento de infraestrutura do SEP (glossário).
- **Itens citados:** g-comp
- **Situação:** a validar

### V-bee5bc · Uma OS na rede de distribuição · objeto · Técnico do provedor de internet
- **Texto do simulador:** Trabalho em proximidade com compartilhamento de infraestrutura do SEP: treinamento Específico de 40 h (10.9.9) e autorização (10.14.1). As organizações executam ações integradas quando a atuação independente é tecnicamente inviável (10.7.9).
- **Itens citados:** 10.9.9 · 10.14.1 · 10.7.9
- **Situação:** a validar

### V-4f9616 · Uma OS na rede de distribuição · objeto · Chave fusível do trecho
- **Texto do simulador:** Seccionamento (10.13.1 a). Com recurso para impedimento de reenergização e sinalização (10.4.1).
- **Itens citados:** 10.13.1 · 10.4.1
- **Situação:** a validar

### V-6d9739 · Uma OS na rede de distribuição · objeto · Rádio · centro de operação
- **Texto do simulador:** Comunicação permanente com a equipe e o centro de operação (10.12.4.1). O centro de operação também impede que outras equipes energizem o trecho (10.13.3).
- **Itens citados:** 10.12.4.1 · 10.13.3
- **Situação:** a validar

### V-40c206 · Uma OS na rede de distribuição · objeto · Casas com painéis solares
- **Texto do simulador:** Microgeração na rede de BT: possibilidade de energização por outra fonte (10.5.2). Quem tem geração própria impede a energização de instalações de outras organizações (10.14.5).
- **Itens citados:** 10.5.2 · 10.14.5
- **Situação:** a validar

### V-6edfdb · Uma OS na rede de distribuição · objeto · Caminhão com cesto aéreo
- **Texto do simulador:** Equipamentos com isolação elétrica são adequados às tensões envolvidas, inspecionados e testados (10.12.6); os de MT/AT passam por ensaio dielétrico (10.14.4 a).
- **Itens citados:** 10.12.6 · 10.14.4
- **Situação:** a validar

### V-ae382d · Uma OS na rede de distribuição · objeto · Nuvens de tempestade
- **Texto do simulador:** Condições meteorológicas adversas entram na análise de risco (10.7.3 c) e podem ser condição impeditiva (10.7.3 g).
- **Itens citados:** 10.7.3
- **Situação:** a validar

### V-2da410 · Uma OS na rede de distribuição · objeto · Edu · encarregado
- **Texto do simulador:** Indicado pela organização para supervisionar e conduzir o serviço da equipe (10.7.6); também é autorizado (10.10.2 c).
- **Itens citados:** 10.7.6 · 10.10.2
- **Situação:** a validar

### V-db695d · Uma OS na rede de distribuição · objeto · Fábio · eletricista de linha
- **Texto do simulador:** Autorizado: Básico e Complementar do SEP (10.9.4, 10.9.5).
- **Itens citados:** 10.9.4 · 10.9.5
- **Situação:** a validar

### V-c365f1 · Uma OS na rede de distribuição · objeto · Gil · eletricista de linha
- **Texto do simulador:** Serviço no SEP não pode ser feito individualmente (10.14.2).
- **Itens citados:** 10.14.2
- **Situação:** a validar

### V-e18cc4 · Uma OS na rede de distribuição · objeto · Detector de tensão para MT
- **Texto do simulador:** Adequado à tensão e à classe de isolação, aferido (10.12.6.1).
- **Itens citados:** 10.12.6.1 · 10.13.1
- **Situação:** a validar

### V-9d1e43 · Uma OS na rede de distribuição · objeto · Conjunto de aterramento temporário de MT
- **Texto do simulador:** Aterramento com equipotencialização (10.13.1 d). Ferramental isolante passa por ensaio (10.14.4).
- **Itens citados:** 10.13.1 · 10.14.4
- **Situação:** a validar

### V-2ae617 · Uma OS na rede de distribuição · objeto · Coberturas isolantes
- **Texto do simulador:** Protegem os elementos energizados na zona controlada (10.13.1 e). EPC isolante passa por ensaio (10.14.4).
- **Itens citados:** 10.13.1 · 10.14.4
- **Situação:** a validar

### V-335169 · Uma OS na rede de distribuição · objeto · Etiqueta de impedimento
- **Texto do simulador:** Sinalização de impedimento de reenergização (10.13.1 f; 10.7.7 e).
- **Itens citados:** 10.13.1 · 10.7.7
- **Situação:** a validar

### V-99c97f · Uma OS na rede de distribuição · objeto · Cones e sinalização de via
- **Texto do simulador:** Delimitação da área (10.13.1 g) e sinalização de áreas de circulação, vias públicas e veículos (10.7.7).
- **Itens citados:** 10.13.1 · 10.7.7
- **Situação:** a validar

### V-e46428 · Uma OS na rede de distribuição · objeto · PT e análise de risco da equipe
- **Texto do simulador:** A PT fica disponível no local, em meio físico ou digital, e no fim é encerrada e arquivada (10.7.2.3). A documentação vai para o PIE da distribuidora (10.15.6).
- **Itens citados:** 10.7.2.3 · 10.15.6
- **Situação:** a validar

---

## 5. Cartões de fatos do Treino

Frente e verso, como aparecem no Treino.

### V-aa65e7 · Cartão · Treinamentos
- **Frente:** Carga horária mínima do treinamento inicial Básico
- **Verso:** 40 h (Quadro I).
- **Itens citados:** 10.9.2
- **Situação:** a validar

### V-cb7ab2 · Cartão · Treinamentos
- **Frente:** Complementar do SEP
- **Verso:** 40 h, para quem faz serviços no SEP ou trabalha em sua proximidade.
- **Itens citados:** 10.9.2 · 10.9.5
- **Situação:** a validar

### V-d1fa0d · Cartão · Treinamentos
- **Frente:** Complementar de Média e Alta Tensão - SEC
- **Verso:** 16 h, para quem faz serviços em MT/AT ou trabalha em sua proximidade no SEC.
- **Itens citados:** 10.9.2 · 10.9.6
- **Situação:** a validar

### V-2d4897 · Cartão · Treinamentos
- **Frente:** Complementar de Área Classificada
- **Verso:** 16 h.
- **Itens citados:** 10.9.2 · 10.9.7
- **Situação:** a validar

### V-f08186 · Cartão · Treinamentos
- **Frente:** Específico e pontual: carga e para quem
- **Verso:** 8 h; profissionais estrangeiros ou não residentes no país que entram na zona controlada para serviços pontuais, por no máximo 30 dias corridos, com acompanhamento presencial e permanente de trabalhador autorizado, sob responsabilidade de PLH.
- **Itens citados:** 10.9.2 · 10.9.8
- **Situação:** a validar

### V-948cfa · Cartão · Treinamentos
- **Frente:** Específico de compartilhamento de infraestrutura do SEP
- **Verso:** 40 h. Quem faz este treinamento não faz o Básico nem o Complementar do SEP.
- **Itens citados:** 10.9.2 · 10.9.4 · 10.9.5 · 10.9.9
- **Situação:** a validar

### V-cd9cc3 · Cartão · Treinamentos
- **Frente:** Treinamento periódico
- **Verso:** Bienal, com carga horária mínima de 16 h.
- **Itens citados:** 10.9.10
- **Situação:** a validar

### V-2e77bb · Cartão · Treinamentos
- **Frente:** Treinamento eventual: as quatro situações
- **Verso:** a) retorno de afastamento ou inatividade por mais de 90 dias; b) modificações significativas nas instalações ou troca de métodos, processos e organização do trabalho; c) mudança nos procedimentos, condições ou operações que altere os riscos; d) acidente grave ou fatal que indique necessidade de novo treinamento.
- **Itens citados:** 10.9.11
- **Situação:** a validar

### V-ad14fe · Cartão · Pessoas
- **Frente:** Onde vale a capacitação do trabalhador-capacitado?
- **Verso:** Só na organização que o capacitou e nas condições estabelecidas pelo PLH autorizado responsável pela capacitação.
- **Itens citados:** 10.8.3.3
- **Situação:** a validar

### V-46e7c0 · Cartão · Pessoas
- **Frente:** Módulos mínimos da capacitação
- **Verso:** Fundamentos de eletricidade básica 40 h e Qualidade, saúde, meio ambiente 16 h (SEP e SEC); Fundamentos de SEP 40 h (só SEP); Sistema elétrico de consumo 24 h (só SEC); Compartilhamento de infraestruturas do SEP 24 h (só compartilhamento).
- **Itens citados:** 10.8.4
- **Situação:** a validar

### V-0f299c · Cartão · Pessoas
- **Frente:** Requisitos para a autorização (anuência formal)
- **Verso:** a) ser previamente apto em exame médico ocupacional; b) treinamento de segurança com avaliação e aproveitamento satisfatórios, independentemente do cargo e escolaridade.
- **Itens citados:** 10.10.2.1 · 10.7.5
- **Situação:** a validar

### V-ca0e2b · Cartão · Pessoas
- **Frente:** Quem é considerado PLH
- **Verso:** Trabalhador previamente qualificado pelo Sistema Oficial de Ensino em curso específico na área elétrica e com registro no competente conselho de classe.
- **Itens citados:** 10.8.2
- **Situação:** a validar

### V-c72ec1 · Cartão · Pessoas
- **Frente:** Supervisão de equipe
- **Verso:** A organização indica um trabalhador entre os membros da equipe para supervisionar e conduzir os trabalhos.
- **Itens citados:** 10.7.6
- **Situação:** a validar

### V-2e721b · Cartão · Faixas e zonas
- **Frente:** Faixas de tensão (CA / CC)
- **Verso:** EBT ≤ 50 V / 120 V; BT até 1.000 V / 1.500 V; MT até 36.200 V / 3.000 V; AT acima disso.
- **Itens citados:** g-ebt · g-bt · g-mt · g-at
- **Situação:** a validar

### V-f3a2fd · Cartão · Faixas e zonas
- **Frente:** Por que a MT em CC vai até 3.000 V?
- **Verso:** Por causa do limite de tensão usado na alimentação do transporte sobre trilhos (observação do glossário).
- **Itens citados:** g-mt
- **Situação:** a validar

### V-c5ea98 · Cartão · Faixas e zonas
- **Frente:** A NR-10 se aplica à extrabaixa tensão?
- **Verso:** Não, exceto para o item 10.6.6 e subitens (explosão e incêndio).
- **Itens citados:** 10.2.4
- **Situação:** a validar

### V-0065e4 · Cartão · Faixas e zonas
- **Frente:** Rr e Rc abaixo de 1 kV
- **Verso:** 0,20 m e 0,70 m.
- **Itens citados:** AII
- **Situação:** a validar

### V-7b16f1 · Cartão · Faixas e zonas
- **Frente:** Rr e Rc de 13,8 kV
- **Verso:** 0,38 m e 1,38 m (faixa ≥ 10 e < 15 kV).
- **Itens citados:** AII
- **Situação:** a validar

### V-c18d30 · Cartão · Faixas e zonas
- **Frente:** Rr e Rc de 69 kV
- **Verso:** 0,90 m e 1,90 m (faixa ≥ 60 e < 70 kV).
- **Itens citados:** AII
- **Situação:** a validar

### V-29b63a · Cartão · Faixas e zonas
- **Frente:** Rr e Rc de 138 kV
- **Verso:** 1,20 m e 3,20 m (faixa ≥ 132 e < 150 kV).
- **Itens citados:** AII
- **Situação:** a validar

### V-3e1545 · Cartão · Faixas e zonas
- **Frente:** Em trifásico, qual tensão entra no Anexo II?
- **Verso:** A tensão composta (eficaz entre fases).
- **Itens citados:** AII
- **Situação:** a validar

### V-e6e6dc · Cartão · Sequências
- **Frente:** Desenergização (10.13.1), as 7 alíneas
- **Verso:** a) seccionamento ou desligamento; b) constatação da ausência de tensão; c) impedimento de reenergização; d) constatação de ausência de tensão para a instalação de aterramento temporário com equipotencialização dos condutores dos circuitos; e) proteção dos elementos energizados existentes na zona controlada (Anexo II desta NR) e proteção dos trabalhadores para os efeitos do arco elétrico; f) instalação da sinalização de impedimento de reenergização; g) delimitação e sinalização da área de trabalho.
- **Itens citados:** 10.13.1
- **Situação:** a validar

### V-88cba9 · Cartão · Sequências
- **Frente:** Reenergização (10.13.2), as 7 alíneas
- **Verso:** a) retirada dos obstáculos de delimitação e sinalização do espaço seguro de trabalho; b) retirada das ferramentas, utensílios e equipamentos; c) retirada das imediações de todos os trabalhadores não envolvidos no processo de reenergização; d) remoção do aterramento temporário e da equipotencialização; e) retirada das proteções dos elementos energizados nas imediações; f) remoção da sinalização de impedimento de reenergização; g) desbloqueio, se houver, e religamento dos dispositivos de seccionamento.
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-72af9f · Cartão · Sequências
- **Frente:** Quem pode alterar as sequências do 10.13?
- **Verso:** PLH, autorizado, com justificativa técnica previamente formalizada, mantendo o mesmo nível de segurança.
- **Itens citados:** 10.13.4
- **Situação:** a validar

### V-eb44d9 · Cartão · Sequências
- **Frente:** Garantia da desenergização
- **Verso:** A organização impede que outras equipes ou organizações energizem as instalações durante todo o serviço.
- **Itens citados:** 10.13.3
- **Situação:** a validar

### V-a6a46b · Cartão · Documentos
- **Frente:** Procedimento de trabalho: quando e quem aprova
- **Verso:** Atividades rotineiras; elaborado a partir de análise de risco; aprovado por PLH.
- **Itens citados:** 10.7.1 · 10.7.1.1
- **Situação:** a validar

### V-962354 · Cartão · Documentos
- **Frente:** Permissão de trabalho: quando e quem aprova
- **Verso:** Atividades não rotineiras; precedida de análise de riscos; aprovada por trabalhador autorizado.
- **Itens citados:** 10.7.2
- **Situação:** a validar

### V-56d2ea · Cartão · Documentos
- **Frente:** Validade da PT
- **Verso:** Duração da atividade, restrita ao turno; pode ser revalidada se não mudarem as condições estabelecidas nem toda a equipe.
- **Itens citados:** 10.7.2.2
- **Situação:** a validar

### V-ca4435 · Cartão · Documentos
- **Frente:** Quem é obrigado a ter PIE
- **Verso:** Organizações que integram o SEP ou realizam atividades em instalações com média e alta tensão; sob responsabilidade de PLH.
- **Itens citados:** 10.15.6
- **Situação:** a validar

### V-7d65da · Cartão · Documentos
- **Frente:** Grave e iminente risco: as 4 condições do 10.16.1
- **Verso:** a) área classificada sem proteção coletiva; b) não adotar os procedimentos de desenergização (10.13.1) ou reenergização (10.13.2), ou as alternativas do 10.13.4; c) serviço ou trabalho em proximidade por quem não atende ao capítulo 10.10; d) não realizar ensaios e testes de isolação.
- **Itens citados:** 10.16.1
- **Situação:** a validar

### V-f32db5 · Cartão · EPI e arco
- **Frente:** Vestimenta mínima por categoria
- **Verso:** Cat. 1 = 4; Cat. 2 = 8; Cat. 3 = 25; Cat. 4 = 40 cal/cm² (ATPV ou EBT).
- **Itens citados:** AIV-III
- **Situação:** a validar

### V-acc7b1 · Cartão · EPI e arco
- **Frente:** Quando o Anexo IV vale?
- **Verso:** Só nas condições dele, de forma conjunta: equipamento, máxima corrente de falha, máximo tempo de eliminação e distância mínima de trabalho. Fora disso, estudo de energia incidente.
- **Itens citados:** 10.11.2.1 · 10.11.2.2 · 10.11.2.3
- **Situação:** a validar

### V-bf7ba1 · Cartão · EPI e arco
- **Frente:** Nota do limitador de corrente (Quadro I)
- **Verso:** 600 V ou menos, com fusível ou disjuntor limitador de até 200 A: a categoria pode cair um número, nunca abaixo da 1.
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-f6ae24 · Cartão · EPI e arco
- **Frente:** Adornos e indumentária
- **Verso:** É vedado usar adornos pessoais; a indumentária não pode ter materiais condutíveis (salvo as do 10.11.3).
- **Itens citados:** 10.7.8 · 10.7.8.1
- **Situação:** a validar

### V-f2d3d8 · Cartão · EPI e arco
- **Frente:** Periodicidade dos ensaios dielétricos
- **Verso:** O menor intervalo entre regulamentação, fabricante e critério do PLH; sem previsão, anual.
- **Itens citados:** 10.14.4.1
- **Situação:** a validar

### V-60df53 · Cartão · Energizado
- **Frente:** Trabalho individual
- **Verso:** Vedado em serviços energizados em média e alta tensão e em serviços no SEP.
- **Itens citados:** 10.14.2
- **Situação:** a validar

### V-ca6c2f · Cartão · Energizado
- **Frente:** Religamento automático
- **Verso:** Intervenção energizada em MT/AT dentro da zona de risco só com o religamento automático desativado (bloqueado) e sinalizado.
- **Itens citados:** 10.14.3 · 10.14.3.1
- **Situação:** a validar

### V-f5bf72 · Cartão · Energizado
- **Frente:** Comunicação sem contato visual
- **Verso:** Equipamentos de comunicação permanente com a equipe e com o centro de operação ou sala de comando.
- **Itens citados:** 10.12.4 · 10.12.4.1
- **Situação:** a validar

### V-73e402 · Cartão · Portaria
- **Frente:** Vigência da Portaria 737/2026
- **Verso:** Um ano após a publicação (DOU de 01/06/2026). A alínea "e" do 10.6.4 vale um ano depois disso para instalações existentes.
- **Itens citados:** art5 · art3
- **Situação:** a validar

### V-95c54f · Cartão · Portaria
- **Frente:** Tipificação (Art. 2º)
- **Verso:** NR-10: NR Especial. Anexos I a IV: Tipo 1.
- **Itens citados:** art2
- **Situação:** a validar

### V-3e455a · Cartão · Portaria
- **Frente:** Revogações (Art. 4º)
- **Verso:** Portarias MTE nº 598/2004 e MTPS nº 508/2016.
- **Itens citados:** art4
- **Situação:** a validar

### V-2ba8d2 · Cartão · Portaria
- **Frente:** Direito de recusa na NR-10
- **Verso:** Aparece como conteúdo do Treinamento Básico (Anexo III, item 9, alínea k).
- **Itens citados:** AIII
- **Situação:** a validar

---

## 6. Gerador de questões do Treino

O gerador sorteia valores a cada uso. Abaixo, até 4 amostras de cada tipo, com sorteio fixo; validar as amostras valida a regra do tipo (tabelas em `prototipo/treino.js`).

### V-9a19d3 · Gerador · Faixas de tensão
- **Pergunta:** Tensão de 110 V em corrente alternada, entre fases. Em que faixa ela está pelo glossário da NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) EBT — *por que não:* EBT é a tensão não superior a 50 V CA ou 120 V CC. (g-ebt)
  - B) AT — *por que não:* AT é a tensão superior a 36.200 V CA ou 3.000 V CC. (g-at)
  - C) MT — *por que não:* MT é a tensão superior a 1.000 V CA (1.500 V CC) e igual ou inferior a 36.200 V CA (3.000 V CC). (g-mt)
  - **✔** D) BT
  - E) Depende do tipo de instalação, não só da tensão — *por que não:* As faixas do glossário dependem só do valor da tensão, em CA ou CC, entre fases ou entre fase e terra. (g-bt)
- **Explicação:** BT: tensão superior a 50 V CA (120 V CC) e igual ou inferior a 1.000 V CA (1.500 V CC). Repare nas fronteiras: o limite superior de cada faixa é "igual ou inferior".
- **Itens citados:** g-bt
- **Situação:** a validar

### V-27d9ae · Gerador · Faixas de tensão
- **Pergunta:** Tensão de 220 V em corrente alternada, entre fases. Em que faixa ela está pelo glossário da NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) EBT — *por que não:* EBT é a tensão não superior a 50 V CA ou 120 V CC. (g-ebt)
  - B) MT — *por que não:* MT é a tensão superior a 1.000 V CA (1.500 V CC) e igual ou inferior a 36.200 V CA (3.000 V CC). (g-mt)
  - C) AT — *por que não:* AT é a tensão superior a 36.200 V CA ou 3.000 V CC. (g-at)
  - **✔** D) BT
  - E) Depende do tipo de instalação, não só da tensão — *por que não:* As faixas do glossário dependem só do valor da tensão, em CA ou CC, entre fases ou entre fase e terra. (g-bt)
- **Explicação:** BT: tensão superior a 50 V CA (120 V CC) e igual ou inferior a 1.000 V CA (1.500 V CC). Repare nas fronteiras: o limite superior de cada faixa é "igual ou inferior".
- **Itens citados:** g-bt
- **Situação:** a validar

### V-64aa8b · Gerador · Faixas de tensão
- **Pergunta:** Tensão de 2,3 kV em corrente alternada, entre fases. Em que faixa ela está pelo glossário da NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) MT
  - B) EBT — *por que não:* EBT é a tensão não superior a 50 V CA ou 120 V CC. (g-ebt)
  - C) Depende do tipo de instalação, não só da tensão — *por que não:* As faixas do glossário dependem só do valor da tensão, em CA ou CC, entre fases ou entre fase e terra. (g-mt)
  - D) BT — *por que não:* BT é a tensão superior a 50 V CA (120 V CC) e igual ou inferior a 1.000 V CA (1.500 V CC). (g-bt)
  - E) AT — *por que não:* AT é a tensão superior a 36.200 V CA ou 3.000 V CC. (g-at)
- **Explicação:** MT: tensão superior a 1.000 V CA (1.500 V CC) e igual ou inferior a 36.200 V CA (3.000 V CC). Repare nas fronteiras: o limite superior de cada faixa é "igual ou inferior".
- **Itens citados:** g-mt
- **Situação:** a validar

### V-915f36 · Gerador · Faixas de tensão
- **Pergunta:** Tensão de 440 V em corrente alternada, entre fases. Em que faixa ela está pelo glossário da NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) Depende do tipo de instalação, não só da tensão — *por que não:* As faixas do glossário dependem só do valor da tensão, em CA ou CC, entre fases ou entre fase e terra. (g-bt)
  - B) EBT — *por que não:* EBT é a tensão não superior a 50 V CA ou 120 V CC. (g-ebt)
  - **✔** C) BT
  - D) AT — *por que não:* AT é a tensão superior a 36.200 V CA ou 3.000 V CC. (g-at)
  - E) MT — *por que não:* MT é a tensão superior a 1.000 V CA (1.500 V CC) e igual ou inferior a 36.200 V CA (3.000 V CC). (g-mt)
- **Explicação:** BT: tensão superior a 50 V CA (120 V CC) e igual ou inferior a 1.000 V CA (1.500 V CC). Repare nas fronteiras: o limite superior de cada faixa é "igual ou inferior".
- **Itens citados:** g-bt
- **Situação:** a validar

### V-eddd3a · Gerador · Zonas (Anexo II)
- **Pergunta:** Instalação de 88 kV (tensão nominal entre fases). Quais são os raios da zona de risco e da zona controlada pelo Anexo II?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Rr = 1,00 m · Rc = 2,00 m
  - B) Rr = 1,20 m · Rc = 3,20 m — *por que não:* São os raios da linha ≥ 132 e < 150 kV do Anexo II, outra faixa de tensão. (AII)
  - C) Rr = 0,83 m · Rc = 1,83 m — *por que não:* São os raios da linha ≥ 45 e < 60 kV do Anexo II, outra faixa de tensão. (AII)
  - D) Rr = 1,10 m · Rc = 3,10 m — *por que não:* São os raios da linha ≥ 110 e < 132 kV do Anexo II, outra faixa de tensão. (AII)
  - E) Rr = 0,90 m · Rc = 1,90 m — *por que não:* São os raios da linha ≥ 60 e < 70 kV do Anexo II, outra faixa de tensão. (AII)
- **Explicação:** Linha ≥ 70 e < 110 kV do Anexo II. Fronteira: o limite inferior entra na faixa (≥) e o superior não (<).
- **Itens citados:** AII
- **Situação:** a validar

### V-cb8883 · Gerador · Zonas (Anexo II)
- **Pergunta:** Instalação de 13,8 kV (tensão nominal entre fases). Quais são os raios da zona de risco e da zona controlada pelo Anexo II?
- **Alternativas** (✔ = resposta do simulador):
  - A) Rr = 0,56 m · Rc = 1,56 m — *por que não:* São os raios da linha ≥ 20 e < 30 kV do Anexo II, outra faixa de tensão. (AII)
  - B) Rr = 0,25 m · Rc = 1,25 m — *por que não:* São os raios da linha ≥ 3 e < 6 kV do Anexo II, outra faixa de tensão. (AII)
  - **✔** C) Rr = 0,38 m · Rc = 1,38 m
  - D) Rr = 0,40 m · Rc = 1,40 m — *por que não:* São os raios da linha ≥ 15 e < 20 kV do Anexo II, outra faixa de tensão. (AII)
  - E) Rr = 0,35 m · Rc = 1,35 m — *por que não:* São os raios da linha ≥ 6 e < 10 kV do Anexo II, outra faixa de tensão. (AII)
- **Explicação:** Linha ≥ 10 e < 15 kV do Anexo II. Fronteira: o limite inferior entra na faixa (≥) e o superior não (<).
- **Itens citados:** AII
- **Situação:** a validar

### V-532205 · Gerador · Zonas (Anexo II)
- **Pergunta:** Instalação de 23 kV (tensão nominal entre fases). Quais são os raios da zona de risco e da zona controlada pelo Anexo II?
- **Alternativas** (✔ = resposta do simulador):
  - A) Rr = 0,40 m · Rc = 1,40 m — *por que não:* São os raios da linha ≥ 15 e < 20 kV do Anexo II, outra faixa de tensão. (AII)
  - B) Rr = 0,58 m · Rc = 1,58 m — *por que não:* São os raios da linha ≥ 30 e < 36 kV do Anexo II, outra faixa de tensão. (AII)
  - C) Rr = 0,38 m · Rc = 1,38 m — *por que não:* São os raios da linha ≥ 10 e < 15 kV do Anexo II, outra faixa de tensão. (AII)
  - D) Rr = 0,63 m · Rc = 1,63 m — *por que não:* São os raios da linha ≥ 36 e < 45 kV do Anexo II, outra faixa de tensão. (AII)
  - **✔** E) Rr = 0,56 m · Rc = 1,56 m
- **Explicação:** Linha ≥ 20 e < 30 kV do Anexo II. Fronteira: o limite inferior entra na faixa (≥) e o superior não (<).
- **Itens citados:** AII
- **Situação:** a validar

### V-c8ed81 · Gerador · Zonas (Anexo II)
- **Pergunta:** Instalação de 138 kV (tensão nominal entre fases). Quais são os raios da zona de risco e da zona controlada pelo Anexo II?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Rr = 1,20 m · Rc = 3,20 m
  - B) Rr = 1,10 m · Rc = 3,10 m — *por que não:* São os raios da linha ≥ 110 e < 132 kV do Anexo II, outra faixa de tensão. (AII)
  - C) Rr = 1,00 m · Rc = 2,00 m — *por que não:* São os raios da linha ≥ 70 e < 110 kV do Anexo II, outra faixa de tensão. (AII)
- **Explicação:** Linha ≥ 132 e < 150 kV do Anexo II. Fronteira: o limite inferior entra na faixa (≥) e o superior não (<).
- **Itens citados:** AII
- **Situação:** a validar

### V-77f31b · Gerador · Treinamentos (Quadro I)
- **Pergunta:** Eletricista autorizado de uma distribuidora (SEP) que também atua em área classificada. Qual é a carga horária mínima total dos treinamentos iniciais?
- **Alternativas** (✔ = resposta do simulador):
  - A) 72 h — *por que não:* 72 h é o Básico mais dois complementares de 16 h. (10.9.2)
  - B) 16 h — *por que não:* 16 h é um complementar isolado (MT/AT-SEC ou Área Classificada) ou o periódico bienal; nenhum deles substitui o Básico do autorizado. (10.9.2, 10.9.4)
  - C) 120 h — *por que não:* 120 h não corresponde a uma soma de treinamentos do Quadro I exigida para um só trabalhador. (10.9.2)
  - **✔** D) 96 h
  - E) 56 h — *por que não:* 56 h é o Básico mais um complementar de 16 h. (10.9.2)
- **Explicação:** Básico 40 h + Complementar do SEP 40 h + Complementar de Área Classificada 16 h. Cargas do Quadro I do 10.9.2.
- **Itens citados:** 10.9.2 · 10.9.4 · 10.9.5 · 10.9.7
- **Situação:** a validar

### V-1d1f8f · Gerador · Treinamentos (Quadro I)
- **Pergunta:** Eletricista autorizado de uma indústria (SEC) que só trabalha em baixa tensão. Qual é a carga horária mínima total dos treinamentos iniciais?
- **Alternativas** (✔ = resposta do simulador):
  - A) 80 h — *por que não:* 80 h é o Básico mais o Complementar do SEP. (10.9.2, 10.9.5)
  - B) 120 h — *por que não:* 120 h não corresponde a uma soma de treinamentos do Quadro I exigida para um só trabalhador. (10.9.2)
  - **✔** C) 40 h
  - D) 96 h — *por que não:* 96 h é o Básico, o Complementar do SEP e um complementar de 16 h. (10.9.2)
  - E) 8 h — *por que não:* 8 h é o Específico e pontual, para estrangeiros ou não residentes em serviço pontual (10.9.8). (10.9.8)
- **Explicação:** Básico 40 h. Cargas do Quadro I do 10.9.2.
- **Itens citados:** 10.9.2 · 10.9.4
- **Situação:** a validar

### V-3f45a5 · Gerador · Treinamentos (Quadro I)
- **Pergunta:** Eletricista autorizado de uma distribuidora (SEP). Qual é a carga horária mínima total dos treinamentos iniciais?
- **Alternativas** (✔ = resposta do simulador):
  - A) 16 h — *por que não:* 16 h é um complementar isolado (MT/AT-SEC ou Área Classificada) ou o periódico bienal; nenhum deles substitui o Básico do autorizado. (10.9.2, 10.9.4)
  - B) 72 h — *por que não:* 72 h é o Básico mais dois complementares de 16 h. (10.9.2)
  - C) 120 h — *por que não:* 120 h não corresponde a uma soma de treinamentos do Quadro I exigida para um só trabalhador. (10.9.2)
  - **✔** D) 80 h
  - E) 40 h — *por que não:* 40 h é só o Básico (ou só o Específico de compartilhamento). (10.9.2)
- **Explicação:** Básico 40 h + Complementar do SEP 40 h. Cargas do Quadro I do 10.9.2.
- **Itens citados:** 10.9.2 · 10.9.4 · 10.9.5
- **Situação:** a validar

### V-b80f0a · Gerador · Treinamentos (Quadro I)
- **Pergunta:** Eletricista autorizado de uma indústria (SEC) que opera a cabine primária de 13,8 kV. Qual é a carga horária mínima total dos treinamentos iniciais?
- **Alternativas** (✔ = resposta do simulador):
  - A) 72 h — *por que não:* 72 h é o Básico mais dois complementares de 16 h. (10.9.2)
  - **✔** B) 56 h
  - C) 16 h — *por que não:* 16 h é um complementar isolado (MT/AT-SEC ou Área Classificada) ou o periódico bienal; nenhum deles substitui o Básico do autorizado. (10.9.2, 10.9.4)
  - D) 80 h — *por que não:* 80 h é o Básico mais o Complementar do SEP. (10.9.2, 10.9.5)
  - E) 120 h — *por que não:* 120 h não corresponde a uma soma de treinamentos do Quadro I exigida para um só trabalhador. (10.9.2)
- **Explicação:** Básico 40 h + Complementar de Média e Alta Tensão - SEC 16 h. Cargas do Quadro I do 10.9.2.
- **Itens citados:** 10.9.2 · 10.9.4 · 10.9.6
- **Situação:** a validar

### V-613229 · Gerador · Categoria de arco (CA)
- **Pergunta:** Aparelhagem de distribuição de 600 V (com disjuntores de potência ou interruptores com fusível) e quadros de distribuição de 600 V: corrente de falha disponível de 35 kA, tempo de eliminação de 0,50 s, distância de trabalho de 455 mm. Qual é a categoria de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 2 — *por que não:* Abaixo da categoria do Anexo IV: categoria menor só com estudo de energia incidente. (10.11.2.3)
  - B) Fora do Anexo IV: fazer estudo de energia incidente — *por que não:* Corrente, tempo e distância cabem na linha do equipamento: o Anexo IV se aplica. (10.11.2.1)
  - **✔** C) Categoria 4
  - D) Categoria 1 — *por que não:* Abaixo da categoria do Anexo IV: categoria menor só com estudo de energia incidente. (10.11.2.3)
  - E) Categoria 3 — *por que não:* O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC). (AIV-I)
- **Explicação:** Dentro da linha do Quadro I (até 35 kA, até 0,50 s, a partir de 455 mm): Categoria 4. Valores menores de corrente e tempo, ou distância maior, continuam dentro da linha.
- **Itens citados:** AIV-I · 10.11.2.1
- **Situação:** a validar

### V-0d90e2 · Gerador · Categoria de arco (CA)
- **Pergunta:** Outro equipamento de 1 kV a 15 kV: corrente de falha disponível de 28 kA, tempo de eliminação de 0,24 s, distância de trabalho de 1060 mm. Qual é a categoria de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Categoria 4
  - B) Categoria 1 — *por que não:* Abaixo da categoria do Anexo IV: categoria menor só com estudo de energia incidente. (10.11.2.3)
  - C) Categoria 3 — *por que não:* O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC). (AIV-I)
  - D) Fora do Anexo IV: fazer estudo de energia incidente — *por que não:* Corrente, tempo e distância cabem na linha do equipamento: o Anexo IV se aplica. (10.11.2.1)
  - E) Categoria 2 — *por que não:* Abaixo da categoria do Anexo IV: categoria menor só com estudo de energia incidente. (10.11.2.3)
- **Explicação:** Dentro da linha do Quadro I (até 35 kA, até 0,24 s, a partir de 910 mm): Categoria 4. Valores menores de corrente e tempo, ou distância maior, continuam dentro da linha.
- **Itens citados:** AIV-I · 10.11.2.1
- **Situação:** a validar

### V-8254f6 · Gerador · Categoria de arco (CA)
- **Pergunta:** Painel ou outro equipamento com classificação superior a 240 V e até 600 V: corrente de falha disponível de 25 kA, tempo de eliminação de 0,06 s, distância de trabalho de 455 mm. Qual é a categoria de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 3 — *por que não:* O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC). (AIV-I)
  - **✔** B) Fora do Anexo IV: fazer estudo de energia incidente
  - C) Categoria 1 — *por que não:* Algum parâmetro saiu da linha do Quadro I, e isso impede o Anexo IV. (10.11.2.2)
  - D) Categoria 2 — *por que não:* Algum parâmetro saiu da linha do Quadro I, e isso impede o Anexo IV. (10.11.2.2)
  - E) Categoria 4 — *por que não:* Algum parâmetro saiu da linha do Quadro I, e isso impede o Anexo IV. (10.11.2.2)
- **Explicação:** O parâmetro de tempo saiu da linha do Quadro I. Corrente maior, tempo maior ou distância menor impede o Anexo IV; vale o estudo de energia incidente.
- **Itens citados:** 10.11.2.2 · 10.11.2.3 · AIV-I
- **Situação:** a validar

### V-8e6325 · Gerador · Categoria de arco (CA)
- **Pergunta:** Partida de motor NEMA E2 (contator com fusível), 2,3 kV a 7,2 kV: corrente de falha disponível de 35 kA, tempo de eliminação de 0,24 s, distância de trabalho de 910 mm. Qual é a categoria de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 3 — *por que não:* O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC). (AIV-I)
  - B) Categoria 2 — *por que não:* Abaixo da categoria do Anexo IV: categoria menor só com estudo de energia incidente. (10.11.2.3)
  - C) Categoria 1 — *por que não:* Abaixo da categoria do Anexo IV: categoria menor só com estudo de energia incidente. (10.11.2.3)
  - **✔** D) Categoria 4
  - E) Fora do Anexo IV: fazer estudo de energia incidente — *por que não:* Corrente, tempo e distância cabem na linha do equipamento: o Anexo IV se aplica. (10.11.2.1)
- **Explicação:** Dentro da linha do Quadro I (até 35 kA, até 0,24 s, a partir de 910 mm): Categoria 4. Valores menores de corrente e tempo, ou distância maior, continuam dentro da linha.
- **Itens citados:** AIV-I · 10.11.2.1
- **Situação:** a validar

### V-59b3a3 · Gerador · Categoria de arco (CC)
- **Pergunta:** Banco de baterias de 220 V CC, corrente de curto-circuito disponível de 2,7 kA, arco de até 2 s a 455 mm. Qual é a categoria de EPI pelo Quadro II do Anexo IV?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 4 — *por que não:* Categoria 4 é de 7 a menos de 10 kA. (AIV-II)
  - B) Fora do Anexo IV: estudo de energia incidente — *por que não:* 220 V está entre 150 e 600 V, e 2,7 kA está abaixo de 10 kA: cabe no Quadro II. (AIV-II)
  - C) Categoria 1 — *por que não:* O Quadro II (CC) começa na Categoria 2. (AIV-II)
  - **✔** D) Categoria 2
  - E) Categoria 3 — *por que não:* Categoria 3 é de 3 a menos de 7 kA. (AIV-II)
- **Explicação:** Quadro II (CC, acima de 150 V e até 600 V): abaixo de 3 kA → Cat. 2; de 3 a menos de 7 kA → Cat. 3; de 7 a menos de 10 kA → Cat. 4.
- **Itens citados:** AIV-II
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-d0fc5b · Gerador · Categoria de arco (CC)
- **Pergunta:** Banco de baterias de 480 V CC, corrente de curto-circuito disponível de 7,7 kA, arco de até 2 s a 455 mm. Qual é a categoria de EPI pelo Quadro II do Anexo IV?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Categoria 4
  - B) Categoria 2 — *por que não:* Categoria 2 é para corrente abaixo de 3 kA. (AIV-II)
  - C) Categoria 1 — *por que não:* O Quadro II (CC) começa na Categoria 2. (AIV-II)
  - D) Fora do Anexo IV: estudo de energia incidente — *por que não:* 480 V está entre 150 e 600 V, e 7,7 kA está abaixo de 10 kA: cabe no Quadro II. (AIV-II)
  - E) Categoria 3 — *por que não:* Categoria 3 é de 3 a menos de 7 kA. (AIV-II)
- **Explicação:** Quadro II (CC, acima de 150 V e até 600 V): abaixo de 3 kA → Cat. 2; de 3 a menos de 7 kA → Cat. 3; de 7 a menos de 10 kA → Cat. 4.
- **Itens citados:** AIV-II
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-caaf28 · Gerador · Categoria de arco (CC)
- **Pergunta:** Banco de baterias de 250 V CC, corrente de curto-circuito disponível de 1,0 kA, arco de até 2 s a 455 mm. Qual é a categoria de EPI pelo Quadro II do Anexo IV?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 3 — *por que não:* Categoria 3 é de 3 a menos de 7 kA. (AIV-II)
  - B) Categoria 4 — *por que não:* Categoria 4 é de 7 a menos de 10 kA. (AIV-II)
  - C) Categoria 1 — *por que não:* O Quadro II (CC) começa na Categoria 2. (AIV-II)
  - **✔** D) Categoria 2
  - E) Fora do Anexo IV: estudo de energia incidente — *por que não:* 250 V está entre 150 e 600 V, e 1,0 kA está abaixo de 10 kA: cabe no Quadro II. (AIV-II)
- **Explicação:** Quadro II (CC, acima de 150 V e até 600 V): abaixo de 3 kA → Cat. 2; de 3 a menos de 7 kA → Cat. 3; de 7 a menos de 10 kA → Cat. 4.
- **Itens citados:** AIV-II
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-3b0a0d · Gerador · Categoria de arco (CC)
- **Pergunta:** Banco de baterias de 250 V CC, corrente de curto-circuito disponível de 8,4 kA, arco de até 2 s a 455 mm. Qual é a categoria de EPI pelo Quadro II do Anexo IV?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 3 — *por que não:* Categoria 3 é de 3 a menos de 7 kA. (AIV-II)
  - **✔** B) Categoria 4
  - C) Categoria 1 — *por que não:* O Quadro II (CC) começa na Categoria 2. (AIV-II)
  - D) Fora do Anexo IV: estudo de energia incidente — *por que não:* 250 V está entre 150 e 600 V, e 8,4 kA está abaixo de 10 kA: cabe no Quadro II. (AIV-II)
  - E) Categoria 2 — *por que não:* Categoria 2 é para corrente abaixo de 3 kA. (AIV-II)
- **Explicação:** Quadro II (CC, acima de 150 V e até 600 V): abaixo de 3 kA → Cat. 2; de 3 a menos de 7 kA → Cat. 3; de 7 a menos de 10 kA → Cat. 4.
- **Itens citados:** AIV-II
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-b70486 · Gerador · Vestimenta (cal/cm²)
- **Pergunta:** Qual é a resistência mínima ao arco (ATPV ou EBT) da vestimenta da Categoria 1 de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - A) 25 cal/cm² — *por que não:* É o mínimo da Categoria 3. (AIV-III)
  - B) 12 cal/cm² — *por que não:* 12 cal/cm² não é mínimo de nenhuma categoria do Quadro III. (AIV-III)
  - C) 40 cal/cm² — *por que não:* É o mínimo da Categoria 4. (AIV-III)
  - D) 8 cal/cm² — *por que não:* É o mínimo da Categoria 2. (AIV-III)
  - **✔** E) 4 cal/cm²
- **Explicação:** Quadro III do Anexo IV: Cat. 1 = 4; Cat. 2 = 8; Cat. 3 = 25; Cat. 4 = 40 cal/cm².
- **Itens citados:** AIV-III
- **Situação:** a validar

### V-799dbb · Gerador · Vestimenta (cal/cm²)
- **Pergunta:** Qual é a resistência mínima ao arco (ATPV ou EBT) da vestimenta da Categoria 3 de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - A) 8 cal/cm² — *por que não:* É o mínimo da Categoria 2. (AIV-III)
  - B) 4 cal/cm² — *por que não:* É o mínimo da Categoria 1. (AIV-III)
  - C) 40 cal/cm² — *por que não:* É o mínimo da Categoria 4. (AIV-III)
  - **✔** D) 25 cal/cm²
  - E) 12 cal/cm² — *por que não:* 12 cal/cm² não é mínimo de nenhuma categoria do Quadro III. (AIV-III)
- **Explicação:** Quadro III do Anexo IV: Cat. 1 = 4; Cat. 2 = 8; Cat. 3 = 25; Cat. 4 = 40 cal/cm².
- **Itens citados:** AIV-III
- **Situação:** a validar

### V-1a4f98 · Gerador · Vestimenta (cal/cm²)
- **Pergunta:** Qual é a resistência mínima ao arco (ATPV ou EBT) da vestimenta da Categoria 4 de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - A) 8 cal/cm² — *por que não:* É o mínimo da Categoria 2. (AIV-III)
  - B) 4 cal/cm² — *por que não:* É o mínimo da Categoria 1. (AIV-III)
  - C) 12 cal/cm² — *por que não:* 12 cal/cm² não é mínimo de nenhuma categoria do Quadro III. (AIV-III)
  - **✔** D) 40 cal/cm²
  - E) 25 cal/cm² — *por que não:* É o mínimo da Categoria 3. (AIV-III)
- **Explicação:** Quadro III do Anexo IV: Cat. 1 = 4; Cat. 2 = 8; Cat. 3 = 25; Cat. 4 = 40 cal/cm².
- **Itens citados:** AIV-III
- **Situação:** a validar

### V-4b872e · Gerador · Vestimenta (cal/cm²)
- **Pergunta:** Qual é a resistência mínima ao arco (ATPV ou EBT) da vestimenta da Categoria 2 de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) 8 cal/cm²
  - B) 40 cal/cm² — *por que não:* É o mínimo da Categoria 4. (AIV-III)
  - C) 25 cal/cm² — *por que não:* É o mínimo da Categoria 3. (AIV-III)
  - D) 4 cal/cm² — *por que não:* É o mínimo da Categoria 1. (AIV-III)
  - E) 12 cal/cm² — *por que não:* 12 cal/cm² não é mínimo de nenhuma categoria do Quadro III. (AIV-III)
- **Explicação:** Quadro III do Anexo IV: Cat. 1 = 4; Cat. 2 = 8; Cat. 3 = 25; Cat. 4 = 40 cal/cm².
- **Itens citados:** AIV-III
- **Situação:** a validar

### V-f86f40 · Gerador · Sequências (10.13)
- **Pergunta:** Na sequência de reenergização do 10.13.2, qual etapa vem logo depois de “retirada das proteções dos elementos energizados nas imediações”?
- **Alternativas** (✔ = resposta do simulador):
  - A) desbloqueio, se houver, e religamento dos dispositivos de seccionamento — *por que não:* É a alínea g do 10.13.2. (10.13.2)
  - B) retirada dos obstáculos de delimitação e sinalização do espaço seguro de trabalho — *por que não:* É a alínea a do 10.13.2. (10.13.2)
  - C) remoção do aterramento temporário e da equipotencialização — *por que não:* É a alínea d do 10.13.2. (10.13.2)
  - **✔** D) remoção da sinalização de impedimento de reenergização
  - E) retirada das imediações de todos os trabalhadores não envolvidos no processo de reenergização — *por que não:* É a alínea c do 10.13.2. (10.13.2)
- **Explicação:** Alínea e → alínea f do 10.13.2.
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-61579d · Gerador · Sequências (10.13)
- **Pergunta:** Na sequência de desenergização do 10.13.1, qual etapa vem logo depois de “proteção dos elementos energizados existentes na zona controlada (Anexo II desta NR) e proteção dos trabalhadores para os efeitos do arco elétrico”?
- **Alternativas** (✔ = resposta do simulador):
  - A) delimitação e sinalização da área de trabalho — *por que não:* É a alínea g do 10.13.1. (10.13.1)
  - B) constatação de ausência de tensão para a instalação de aterramento temporário com equipotencialização dos condutores dos circuitos — *por que não:* É a alínea d do 10.13.1. (10.13.1)
  - C) constatação da ausência de tensão — *por que não:* É a alínea b do 10.13.1. (10.13.1)
  - D) impedimento de reenergização — *por que não:* É a alínea c do 10.13.1. (10.13.1)
  - **✔** E) instalação da sinalização de impedimento de reenergização
- **Explicação:** Alínea e → alínea f do 10.13.1.
- **Itens citados:** 10.13.1
- **Situação:** a validar

### V-b33559 · Gerador · Sequências (10.13)
- **Pergunta:** Qual é a primeira etapa da sequência de reenergização do 10.13.2?
- **Alternativas** (✔ = resposta do simulador):
  - A) remoção da sinalização de impedimento de reenergização — *por que não:* É a alínea f do 10.13.2. (10.13.2)
  - **✔** B) retirada dos obstáculos de delimitação e sinalização do espaço seguro de trabalho
  - C) retirada das imediações de todos os trabalhadores não envolvidos no processo de reenergização — *por que não:* É a alínea c do 10.13.2. (10.13.2)
  - D) retirada das proteções dos elementos energizados nas imediações — *por que não:* É a alínea e do 10.13.2. (10.13.2)
  - E) retirada das ferramentas, utensílios e equipamentos — *por que não:* É a alínea b do 10.13.2. (10.13.2)
- **Explicação:** 10.13.2, alínea a.
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-07c9bb · Gerador · Sequências (10.13)
- **Pergunta:** Qual é a alínea “g” da sequência de desenergização do 10.13.1?
- **Alternativas** (✔ = resposta do simulador):
  - A) seccionamento ou desligamento — *por que não:* É a alínea a do 10.13.1. (10.13.1)
  - B) instalação da sinalização de impedimento de reenergização — *por que não:* É a alínea f do 10.13.1. (10.13.1)
  - C) impedimento de reenergização — *por que não:* É a alínea c do 10.13.1. (10.13.1)
  - D) constatação de ausência de tensão para a instalação de aterramento temporário com equipotencialização dos condutores dos circuitos — *por que não:* É a alínea d do 10.13.1. (10.13.1)
  - **✔** E) delimitação e sinalização da área de trabalho
- **Explicação:** 10.13.1, alínea g.
- **Itens citados:** 10.13.1
- **Situação:** a validar

### V-1ca730 · Gerador · PIE (10.15.6)
- **Pergunta:** Supermercado com 2500 kW instalados, alimentado em 380 V, sem atividade em média tensão. A organização é obrigada a manter o PIE?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim: toda organização com trabalhadores autorizados mantém PIE — *por que não:* Ter autorizados obriga a documentação do 10.15.4; organizá-la como PIE depende de integrar o SEP ou atuar em MT/AT. (10.15.4, 10.15.6)
  - B) Não: só concessionárias de distribuição mantêm PIE — *por que não:* O 10.15.6 alcança quem integra o SEP (geração e transmissão também) ou realiza atividades em MT/AT, não só distribuidoras. (10.15.6, g-sep)
  - C) Sim: integra o SEP ou realiza atividades em média ou alta tensão — *por que não:* Esta organização não integra o SEP nem realiza atividades em MT/AT. (10.15.6)
  - **✔** D) Não: não integra o SEP nem realiza atividades em média ou alta tensão
  - E) Sim: por causa da carga instalada — *por que não:* Carga instalada não é critério do 10.15.6. (10.15.6)
- **Explicação:** O 10.15.6 exige o PIE de quem integra o SEP ou realiza atividades em instalações com média e alta tensão. Carga instalada não é critério. Quem tem autorizados mantém a documentação do 10.15.4 mesmo sem PIE.
- **Itens citados:** 10.15.6
- **Situação:** a validar

### V-61d295 · Gerador · PIE (10.15.6)
- **Pergunta:** Distribuidora de energia elétrica. A organização é obrigada a manter o PIE?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Sim: integra o SEP ou realiza atividades em média ou alta tensão
  - B) Sim: por causa da carga instalada — *por que não:* Carga instalada não é critério do 10.15.6. (10.15.6)
  - C) Sim: toda organização com trabalhadores autorizados mantém PIE — *por que não:* Ter autorizados obriga a documentação do 10.15.4; organizá-la como PIE depende de integrar o SEP ou atuar em MT/AT. (10.15.4, 10.15.6)
  - D) Não: só concessionárias de distribuição mantêm PIE — *por que não:* O 10.15.6 alcança quem integra o SEP (geração e transmissão também) ou realiza atividades em MT/AT, não só distribuidoras. (10.15.6, g-sep)
  - E) Não: não integra o SEP nem realiza atividades em média ou alta tensão — *por que não:* Esta organização integra o SEP ou realiza atividades em MT/AT. (10.15.6)
- **Explicação:** O 10.15.6 exige o PIE de quem integra o SEP ou realiza atividades em instalações com média e alta tensão. Carga instalada não é critério.
- **Itens citados:** 10.15.6
- **Situação:** a validar

### V-ed2eb5 · Gerador · PIE (10.15.6)
- **Pergunta:** Indústria com cabine primária de 13,8 kV operada pelos próprios eletricistas. A organização é obrigada a manter o PIE?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Sim: integra o SEP ou realiza atividades em média ou alta tensão
  - B) Não: não integra o SEP nem realiza atividades em média ou alta tensão — *por que não:* Esta organização integra o SEP ou realiza atividades em MT/AT. (10.15.6)
  - C) Sim: toda organização com trabalhadores autorizados mantém PIE — *por que não:* Ter autorizados obriga a documentação do 10.15.4; organizá-la como PIE depende de integrar o SEP ou atuar em MT/AT. (10.15.4, 10.15.6)
  - D) Não: só concessionárias de distribuição mantêm PIE — *por que não:* O 10.15.6 alcança quem integra o SEP (geração e transmissão também) ou realiza atividades em MT/AT, não só distribuidoras. (10.15.6, g-sep)
  - E) Sim: por causa da carga instalada — *por que não:* Carga instalada não é critério do 10.15.6. (10.15.6)
- **Explicação:** O 10.15.6 exige o PIE de quem integra o SEP ou realiza atividades em instalações com média e alta tensão. Carga instalada não é critério.
- **Itens citados:** 10.15.6
- **Situação:** a validar

### V-a64831 · Gerador · PIE (10.15.6)
- **Pergunta:** Supermercado com 750 kW instalados, alimentado em 380 V, sem atividade em média tensão. A organização é obrigada a manter o PIE?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim: toda organização com trabalhadores autorizados mantém PIE — *por que não:* Ter autorizados obriga a documentação do 10.15.4; organizá-la como PIE depende de integrar o SEP ou atuar em MT/AT. (10.15.4, 10.15.6)
  - B) Sim: integra o SEP ou realiza atividades em média ou alta tensão — *por que não:* Esta organização não integra o SEP nem realiza atividades em MT/AT. (10.15.6)
  - C) Não: só concessionárias de distribuição mantêm PIE — *por que não:* O 10.15.6 alcança quem integra o SEP (geração e transmissão também) ou realiza atividades em MT/AT, não só distribuidoras. (10.15.6, g-sep)
  - D) Sim: por causa da carga instalada — *por que não:* Carga instalada não é critério do 10.15.6. (10.15.6)
  - **✔** E) Não: não integra o SEP nem realiza atividades em média ou alta tensão
- **Explicação:** O 10.15.6 exige o PIE de quem integra o SEP ou realiza atividades em instalações com média e alta tensão. Carga instalada não é critério. Quem tem autorizados mantém a documentação do 10.15.4 mesmo sem PIE.
- **Itens citados:** 10.15.6
- **Situação:** a validar

### V-fbfe9e · Gerador · Trabalho individual (10.14.2)
- **Pergunta:** Manobra numa subestação de 69 kV da distribuidora (SEP). Um trabalhador pode fazer o serviço sozinho?
- **Alternativas** (✔ = resposta do simulador):
  - A) Pode, desde que use a vestimenta de arco adequada — *por que não:* EPI não muda o 10.14.2; fora dele, a decisão vem da análise de risco. (10.14.2, 10.5.4)
  - B) O 10.14.2 não proíbe; a análise de risco decide — *por que não:* É serviço energizado em MT/AT ou serviço no SEP: o 10.14.2 veda o trabalho individual. (10.14.2)
  - C) Pode, se a permissão de trabalho autorizar — *por que não:* A PT não afasta o 10.14.2; fora dele, a decisão vem da análise de risco. (10.14.2, 10.7.3)
  - **✔** D) Não pode ser feito individualmente
  - E) Pode, se o trabalhador for PLH — *por que não:* A habilitação não muda o 10.14.2; fora dele, quem decide é a análise de risco. (10.14.2, 10.7.3)
- **Explicação:** O 10.14.2 veda o trabalho individual em serviços em instalações energizadas em média e alta tensão e em todos os serviços executados no SEP. Fora disso, a decisão sai da análise de risco.
- **Itens citados:** 10.14.2 · 10.7.3
- **Situação:** a validar

### V-b7e3f3 · Gerador · Trabalho individual (10.14.2)
- **Pergunta:** Medição num QGBT de 380 V energizado de uma indústria (SEC). Um trabalhador pode fazer o serviço sozinho?
- **Alternativas** (✔ = resposta do simulador):
  - A) Pode, se a permissão de trabalho autorizar — *por que não:* A PT não afasta o 10.14.2; fora dele, a decisão vem da análise de risco. (10.14.2, 10.7.3)
  - B) Pode, se o trabalhador for PLH — *por que não:* A habilitação não muda o 10.14.2; fora dele, quem decide é a análise de risco. (10.14.2, 10.7.3)
  - **✔** C) O 10.14.2 não proíbe; a análise de risco decide
  - D) Pode, desde que use a vestimenta de arco adequada — *por que não:* EPI não muda o 10.14.2; fora dele, a decisão vem da análise de risco. (10.14.2, 10.5.4)
  - E) Não pode ser feito individualmente — *por que não:* O 10.14.2 só veda o trabalho individual em serviços energizados em MT/AT e em serviços no SEP; aqui não é nenhum dos dois. (10.14.2)
- **Explicação:** O 10.14.2 veda o trabalho individual em serviços em instalações energizadas em média e alta tensão e em todos os serviços executados no SEP. Fora disso, a decisão sai da análise de risco.
- **Itens citados:** 10.14.2 · 10.7.3
- **Situação:** a validar

### V-250e44 · Gerador · Trabalho individual (10.14.2)
- **Pergunta:** Medição num painel de 440 V energizado de um hospital (SEC). Um trabalhador pode fazer o serviço sozinho?
- **Alternativas** (✔ = resposta do simulador):
  - A) Pode, desde que use a vestimenta de arco adequada — *por que não:* EPI não muda o 10.14.2; fora dele, a decisão vem da análise de risco. (10.14.2, 10.5.4)
  - B) Pode, se o trabalhador for PLH — *por que não:* A habilitação não muda o 10.14.2; fora dele, quem decide é a análise de risco. (10.14.2, 10.7.3)
  - C) Não pode ser feito individualmente — *por que não:* O 10.14.2 só veda o trabalho individual em serviços energizados em MT/AT e em serviços no SEP; aqui não é nenhum dos dois. (10.14.2)
  - **✔** D) O 10.14.2 não proíbe; a análise de risco decide
  - E) Pode, se a permissão de trabalho autorizar — *por que não:* A PT não afasta o 10.14.2; fora dele, a decisão vem da análise de risco. (10.14.2, 10.7.3)
- **Explicação:** O 10.14.2 veda o trabalho individual em serviços em instalações energizadas em média e alta tensão e em todos os serviços executados no SEP. Fora disso, a decisão sai da análise de risco.
- **Itens citados:** 10.14.2 · 10.7.3
- **Situação:** a validar

### V-a4f658 · Gerador · Trabalho individual (10.14.2)
- **Pergunta:** Troca de isolador numa rede de distribuição de 13,8 kV energizada. Um trabalhador pode fazer o serviço sozinho?
- **Alternativas** (✔ = resposta do simulador):
  - A) O 10.14.2 não proíbe; a análise de risco decide — *por que não:* É serviço energizado em MT/AT ou serviço no SEP: o 10.14.2 veda o trabalho individual. (10.14.2)
  - B) Pode, se a permissão de trabalho autorizar — *por que não:* A PT não afasta o 10.14.2; fora dele, a decisão vem da análise de risco. (10.14.2, 10.7.3)
  - **✔** C) Não pode ser feito individualmente
  - D) Pode, se o trabalhador for PLH — *por que não:* A habilitação não muda o 10.14.2; fora dele, quem decide é a análise de risco. (10.14.2, 10.7.3)
  - E) Pode, desde que use a vestimenta de arco adequada — *por que não:* EPI não muda o 10.14.2; fora dele, a decisão vem da análise de risco. (10.14.2, 10.5.4)
- **Explicação:** O 10.14.2 veda o trabalho individual em serviços em instalações energizadas em média e alta tensão e em todos os serviços executados no SEP. Fora disso, a decisão sai da análise de risco.
- **Itens citados:** 10.14.2 · 10.7.3
- **Situação:** a validar

### V-daf8ec · Gerador · Treinamento eventual
- **Pergunta:** Eletricista autorizado volta ao trabalho depois de 60 dias de afastamento. O periódico bienal está em dia. Ele precisa de treinamento eventual?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim, treinamento eventual — *por que não:* 60 dias não passa de 90: o 10.9.11 a não se aplica. (10.9.11)
  - B) Só se a organização quiser: o eventual é opcional — *por que não:* O 10.9.11 diz que a organização deve realizar o eventual nas situações listadas. (10.9.11)
  - **✔** C) Não
  - D) Sim, sempre, depois de qualquer afastamento — *por que não:* O 10.9.11 a fala em afastamento ou inatividade por período superior a 90 dias, não em qualquer afastamento. (10.9.11)
  - E) Só se o periódico bienal estiver vencido — *por que não:* O eventual vale independentemente de já ter feito o periódico. (10.9.11)
- **Explicação:** O 10.9.11 a exige treinamento eventual após afastamento ou inatividade por período superior a 90 dias, independentemente do periódico. 60 dias não passa do limite.
- **Itens citados:** 10.9.11
- **Situação:** a validar

### V-ba9704 · Gerador · Treinamento eventual
- **Pergunta:** Eletricista autorizado volta ao trabalho depois de 90 dias de afastamento. O periódico bienal está em dia. Ele precisa de treinamento eventual?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim, treinamento eventual — *por que não:* 90 dias não passa de 90: o 10.9.11 a não se aplica. (10.9.11)
  - B) Só se a organização quiser: o eventual é opcional — *por que não:* O 10.9.11 diz que a organização deve realizar o eventual nas situações listadas. (10.9.11)
  - C) Sim, sempre, depois de qualquer afastamento — *por que não:* O 10.9.11 a fala em afastamento ou inatividade por período superior a 90 dias, não em qualquer afastamento. (10.9.11)
  - D) Só se o periódico bienal estiver vencido — *por que não:* O eventual vale independentemente de já ter feito o periódico. (10.9.11)
  - **✔** E) Não
- **Explicação:** O 10.9.11 a exige treinamento eventual após afastamento ou inatividade por período superior a 90 dias, independentemente do periódico. 90 dias não passa do limite.
- **Itens citados:** 10.9.11
- **Situação:** a validar

### V-5c8bd6 · Gerador · Treinamento eventual
- **Pergunta:** Eletricista autorizado volta ao trabalho depois de 100 dias de afastamento. O periódico bienal está em dia. Ele precisa de treinamento eventual?
- **Alternativas** (✔ = resposta do simulador):
  - A) Não — *por que não:* 100 dias passa de 90: o 10.9.11 a exige o eventual. (10.9.11)
  - B) Só se o periódico bienal estiver vencido — *por que não:* O eventual vale independentemente de já ter feito o periódico. (10.9.11)
  - C) Sim, sempre, depois de qualquer afastamento — *por que não:* O 10.9.11 a fala em afastamento ou inatividade por período superior a 90 dias, não em qualquer afastamento. (10.9.11)
  - D) Só se a organização quiser: o eventual é opcional — *por que não:* O 10.9.11 diz que a organização deve realizar o eventual nas situações listadas. (10.9.11)
  - **✔** E) Sim, treinamento eventual
- **Explicação:** O 10.9.11 a exige treinamento eventual após afastamento ou inatividade por período superior a 90 dias, independentemente do periódico. 100 dias passa do limite.
- **Itens citados:** 10.9.11
- **Situação:** a validar

### V-e9c82d · Gerador · Treinamento eventual
- **Pergunta:** Eletricista autorizado volta ao trabalho depois de 89 dias de afastamento. O periódico bienal está em dia. Ele precisa de treinamento eventual?
- **Alternativas** (✔ = resposta do simulador):
  - A) Só se a organização quiser: o eventual é opcional — *por que não:* O 10.9.11 diz que a organização deve realizar o eventual nas situações listadas. (10.9.11)
  - B) Sim, sempre, depois de qualquer afastamento — *por que não:* O 10.9.11 a fala em afastamento ou inatividade por período superior a 90 dias, não em qualquer afastamento. (10.9.11)
  - C) Sim, treinamento eventual — *por que não:* 89 dias não passa de 90: o 10.9.11 a não se aplica. (10.9.11)
  - **✔** D) Não
  - E) Só se o periódico bienal estiver vencido — *por que não:* O eventual vale independentemente de já ter feito o periódico. (10.9.11)
- **Explicação:** O 10.9.11 a exige treinamento eventual após afastamento ou inatividade por período superior a 90 dias, independentemente do periódico. 89 dias não passa do limite.
- **Itens citados:** 10.9.11
- **Situação:** a validar

### V-b1f43f · Gerador · Validade da PT
- **Pergunta:** Um serviço não rotineiro com PT vai continuar no turno seguinte, com a mesma equipe e sem mudança nas condições. O que a NR-10 prevê?
- **Alternativas** (✔ = resposta do simulador):
  - A) Pode ser revalidada pelo próprio executante, por escrito — *por que não:* Quem revalida é o responsável pela autorização da permissão. (10.7.2.2)
  - B) Vale 24 horas a partir da emissão, sem revalidação — *por que não:* A PT é restrita ao turno de trabalho, não a 24 horas. (10.7.2.2)
  - C) Continua válida até o fim do serviço, sem revalidação — *por que não:* A PT é restrita ao turno de trabalho. (10.7.2.2)
  - D) Precisa de nova permissão de trabalho — *por que não:* Sem mudança nas condições nem na equipe, a PT pode ser revalidada. (10.7.2.2)
  - **✔** E) Pode ser revalidada pelo responsável pela autorização da PT
- **Explicação:** Pelo 10.7.2.2, a PT vale pela duração da atividade, restrita ao turno, e pode ser revalidada quando não houver mudança nas condições estabelecidas nem em toda a equipe.
- **Itens citados:** 10.7.2.2
- **Situação:** a validar

### V-379429 · Gerador · Validade da PT
- **Pergunta:** Um serviço não rotineiro com PT vai continuar no turno seguinte, com toda a equipe trocada. O que a NR-10 prevê?
- **Alternativas** (✔ = resposta do simulador):
  - A) Pode ser revalidada pelo responsável pela autorização da PT — *por que não:* Houve mudança nas condições ou em toda a equipe: não cabe revalidação. (10.7.2.2)
  - B) Vale 24 horas a partir da emissão, sem revalidação — *por que não:* A PT é restrita ao turno de trabalho, não a 24 horas. (10.7.2.2)
  - C) Continua válida até o fim do serviço, sem revalidação — *por que não:* A PT é restrita ao turno de trabalho. (10.7.2.2)
  - **✔** D) Precisa de nova permissão de trabalho
  - E) Pode ser revalidada pelo próprio executante, por escrito — *por que não:* Quem revalida é o responsável pela autorização da permissão. (10.7.2.2)
- **Explicação:** Pelo 10.7.2.2, a PT vale pela duração da atividade, restrita ao turno, e pode ser revalidada quando não houver mudança nas condições estabelecidas nem em toda a equipe.
- **Itens citados:** 10.7.2.2
- **Situação:** a validar

### V-d7582a · Gerador · Validade da PT
- **Pergunta:** Um serviço não rotineiro com PT vai continuar no turno seguinte, depois que as condições estabelecidas na PT mudaram. O que a NR-10 prevê?
- **Alternativas** (✔ = resposta do simulador):
  - A) Pode ser revalidada pelo próprio executante, por escrito — *por que não:* Quem revalida é o responsável pela autorização da permissão. (10.7.2.2)
  - B) Pode ser revalidada pelo responsável pela autorização da PT — *por que não:* Houve mudança nas condições ou em toda a equipe: não cabe revalidação. (10.7.2.2)
  - C) Vale 24 horas a partir da emissão, sem revalidação — *por que não:* A PT é restrita ao turno de trabalho, não a 24 horas. (10.7.2.2)
  - D) Continua válida até o fim do serviço, sem revalidação — *por que não:* A PT é restrita ao turno de trabalho. (10.7.2.2)
  - **✔** E) Precisa de nova permissão de trabalho
- **Explicação:** Pelo 10.7.2.2, a PT vale pela duração da atividade, restrita ao turno, e pode ser revalidada quando não houver mudança nas condições estabelecidas nem em toda a equipe.
- **Itens citados:** 10.7.2.2
- **Situação:** a validar

---

## 7. Interpretações nos documentos de planejamento

Trechos de `docs/` e do `CLAUDE.md` rotulados [INTERPRETAÇÃO]: leituras do agente sobre a NR-10 que viram regra do projeto.

### V-9d6caf · docs/00_INDICE_E_DECISOES_INFRAESTRUTURA.md
- **Trecho:** > Legenda: [FONTE] = dito em fonte citada na pesquisa · [PRÁTICA] = prática comum, não verificada em fonte específica; só cenário, nunca cobrada (§1.4) · [INFERÊNCIA] = decisão ou recomendação do projeto · [INTERPRETAÇÃO] = leitura do simulador sobre o texto da norma · [VERIFICAR] = detalhe de ferramenta ou fato externo a confirmar antes de virar código · [VERIFICAR NA PORTARIA] = número ou texto da NR-10 ainda não conferido no PDF oficial.
- **Itens citados:** —
- **Alertas:** prática de campo · interpretação rotulada
- **Situação:** a validar

### V-8c02cd · docs/00_INDICE_E_DECISOES_INFRAESTRUTURA.md
- **Trecho:** Regras que decorrem disso [INTERPRETAÇÃO do agente sobre a decisão; a validar]:
- **Itens citados:** —
- **Situação:** a validar

### V-aee8c0 · docs/00_INDICE_E_DECISOES_INFRAESTRUTURA.md
- **Trecho:** 5. Explicar o mecanismo físico de um requisito da NR-10 (por que aterrar sem constatar é curto franco, por que o transformador realimenta a rede) é permitido como explicação do item, rotulado [INTERPRETAÇÃO].
- **Itens citados:** —
- **Alertas:** mecanismo físico · interpretação rotulada
- **Situação:** a validar

### V-54c7d5 · docs/00_INDICE_E_DECISOES_INFRAESTRUTURA.md
- **Trecho:** - "Responsável técnico" e "responsável pela instalação" não aparecem como termos no PDF (só "responsabilidade técnica de PLH", no 10.4.8.1) [FONTE: conferência no PDF]. O simulador mapeia para PLH e para a organização [INTERPRETAÇÃO].
- **Itens citados:** 10.4.8.1
- **Alertas:** interpretação rotulada
- **Situação:** a validar

### V-e55ee9 · docs/PLANO_V3_SIMULADOR_NR10.md
- **Trecho:** > Legenda: [FONTE] · [PRÁTICA] · [INFERÊNCIA] · [INTERPRETAÇÃO] · [VERIFICAR] · [VERIFICAR NA PORTARIA] (definições na 00_INDICE ).
- **Itens citados:** —
- **Alertas:** prática de campo · interpretação rotulada
- **Situação:** a validar

### V-f6acf3 · docs/PLANO_V3_SIMULADOR_NR10.md
- **Trecho:** M2 Rede aérea 13,8 kV (desenergizada) Substituir uma chave fusível ou um isolador. Religador não bloqueado; backfeed pelo gerador de um cliente através do trafo de distribuição; tensão induzida por linha paralela; chuva. Pedido ao COD; comunicação permanente com o centro de operação (10.12.4.1); bloqueio de religamento automático (impedimento de reenergização, 10.13.1 c; em energizado na ZR, 10.14.3) [INTERPRETAÇÃO]; constatação de ausência de tensão (10.13.1 b) e aterramento temporário com equipotencialização (10.13.1 d); detector por aproximação no bastão; sinalização (10.7.7); condições meteorológicas na análise de risco (10.7.3 c) A
- **Itens citados:** 10.12.4.1 · 10.13.1 · 10.14.3 · 10.7.3 · 10.7.7
- **Alertas:** mecanismo físico · interpretação rotulada
- **Situação:** a validar

### V-73a3dd · CLAUDE.md
- **Trecho:** 6. Inferência é provisória: toda resposta, explicação ou ligação item ↔ objeto escrita pelo agente é inferência até o usuário validar. Na dúvida, marque [INTERPRETAÇÃO] ou [VERIFICAR NA PORTARIA] e deixe a entrada "a validar" no registro de validação ( tools/validacao/ ).
- **Itens citados:** —
- **Alertas:** interpretação rotulada
- **Situação:** a validar

### V-051511 · CLAUDE.md
- **Trecho:** 7. Rótulos: [FONTE] , [PRÁTICA] (só cenário, nunca cobrado), [INFERÊNCIA] (decisão de projeto), [INTERPRETAÇÃO] (leitura da norma), [VERIFICAR] , [VERIFICAR NA PORTARIA] .
- **Itens citados:** —
- **Alertas:** prática de campo · interpretação rotulada
- **Situação:** a validar
