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
| 1. Banco de questões do Treino | 114 |
| 2. História: passos interativos (OS 0731) | 15 |
| 3. Missão: passos de marcar e de ordenar (OS 0457) | 4 |
| 4. História: objetos da cena | 27 |
| 5. Cartões de fatos do Treino | 42 |
| 6. Gerador de questões do Treino | 43 |
| 7. Interpretações nos documentos de planejamento | 8 |
| **Total** | **253** |

Situação: a validar: 253

**Revisar primeiro** (entradas com alerta):

- *outra norma ou concessionária* (1): V-d14440
- *mecanismo físico* (15): V-bae021, V-98cae5, V-c9916e, V-cab9bf, V-3edac7, V-20dc67, V-de333a, V-3ea7d6, V-01d056, V-a3a98b, V-e11a31, V-ffa7b7, V-bb0a38, V-aee8c0, V-f6acf3
- *prática de campo* (10): V-cab9bf, V-4258b5, V-74206c, V-01d056, V-f0e752, V-5d7c1d, V-920745, V-9d6caf, V-e55ee9, V-051511
- *interpretação rotulada* (7): V-9d6caf, V-aee8c0, V-54c7d5, V-e55ee9, V-f6acf3, V-73a3dd, V-051511

---

## 1. Banco de questões do Treino

Questões dos módulos, listas de classificação convertidas e decisões de escolha única da Missão e da História. São as que aparecem no Simulado e na Revisão.

### V-9db905 · Enquadramento
- **Pergunta:** String fotovoltaica de 1.200 Vcc em uma usina solar. Em que faixa ela está?
- **Alternativas** (✔ = resposta do simulador):
  - A) EBT
  - **✔** B) BT
  - C) MT
  - D) AT
- **Explicação:** Em corrente contínua, a BT vai de mais de 120 V até 1.500 V. 1.200 Vcc é BT.
- **Itens citados:** g-bt
- **Situação:** a validar

### V-c0eecd · Enquadramento
- **Pergunta:** Cabine primária de 13,8 kV. Faixa pela NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) BT
  - **✔** B) MT
  - C) AT
- **Explicação:** MT vai de mais de 1.000 V CA até 36.200 V CA (glossário).
- **Itens citados:** g-mt
- **Situação:** a validar

### V-f06916 · Enquadramento
- **Pergunta:** Rack de telecom em 48 Vcc, fora de área classificada. A NR-10 se aplica?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim, integralmente
  - **✔** B) Não: é extrabaixa tensão
  - C) Só o capítulo de EPI
- **Explicação:** 48 Vcc não passa de 120 Vcc, logo é EBT. O 10.2.4 exclui a EBT, exceto para o 10.6.6 (explosão e incêndio).
- **Itens citados:** 10.2.4 · g-ebt
- **Situação:** a validar

### V-289c64 · Enquadramento
- **Pergunta:** Supermercado com 300 kW instalados, alimentado em 380 V, sem atividade em MT. O PIE é obrigatório pela NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim, porque passa de 75 kW
  - **✔** B) Não: o PIE é exigido de quem integra o SEP ou atua em MT/AT
  - C) Sim, todo estabelecimento comercial
- **Explicação:** O 10.15.6 exige o PIE de quem integra o SEP ou realiza atividades em MT/AT; a carga instalada não é critério. Projeto e documentação de aterramento continuam exigidos.
- **Itens citados:** 10.15.6 · 10.15.3
- **Situação:** a validar

### V-2e6bf0 · Enquadramento
- **Pergunta:** Equipe de provedor instala fibra óptica em postes da distribuidora. Qual treinamento inicial?
- **Alternativas** (✔ = resposta do simulador):
  - A) Básico 40 h + Complementar SEP 40 h
  - **✔** B) Específico de compartilhamento de infraestrutura do SEP, 40 h
  - C) Nenhum: não mexem na rede elétrica
- **Explicação:** O 10.9.9 cria o treinamento específico, e os itens 10.9.4 e 10.9.5 dispensam Básico e Complementar SEP de quem o faz.
- **Itens citados:** 10.9.9 · 10.9.4 · 10.9.5
- **Situação:** a validar

### V-9a8c2a · Enquadramento
- **Pergunta:** Até onde vai o Sistema Elétrico de Potência?
- **Alternativas** (✔ = resposta do simulador):
  - A) Até a subestação da distribuidora
  - **✔** B) Até a medição, inclusive
  - C) Até o quadro geral do consumidor
- **Explicação:** Pelo glossário, o SEP compreende geração, transmissão e distribuição até a medição, inclusive.
- **Itens citados:** g-sep
- **Situação:** a validar

### V-0d7aa4 · Enquadramento
- **Pergunta:** Linha de 138 kV. Quais são Rr e Rc?
- **Alternativas** (✔ = resposta do simulador):
  - A) 1,10 m e 3,10 m
  - **✔** B) 1,20 m e 3,20 m
  - C) 1,60 m e 3,60 m
- **Explicação:** 138 kV cai na faixa ≥ 132 e < 150 kV do Anexo II.
- **Itens citados:** AII
- **Situação:** a validar

### V-8e802e · Enquadramento
- **Pergunta:** Serviço energizado em um QGBT de 380 V de uma indústria (SEC). O item 10.14.2 proíbe fazê-lo sozinho?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim
  - **✔** B) Não: o 10.14.2 vale para energizado em MT/AT e para serviços no SEP
- **Explicação:** A vedação do trabalho individual alcança energizado em MT/AT e qualquer serviço no SEP. Em BT no SEC, a decisão sai da análise de risco.
- **Itens citados:** 10.14.2 · 10.7.3
- **Situação:** a validar

### V-c53739 · Zonas e alcance da norma
- **Pergunta:** Rede de 13,8 kV. Um pintor está a 1,0 m da parte energizada.
- **Alternativas** (✔ = resposta do simulador):
  - A) Zona livre: pode trabalhar
  - **✔** B) Zona controlada: só trabalhador autorizado pode estar ali
  - C) Zona de risco
- **Explicação:** Faixa ≥ 10 e < 15 kV: Rr 0,38 m e Rc 1,38 m. 1,0 m está entre os dois. Pintor não autorizado ali é grave e iminente risco.
- **Itens citados:** AII · 10.2.2 · 10.16.1
- **Situação:** a validar

### V-4281d9 · Zonas e alcance da norma
- **Pergunta:** QGBT de 380 V. Eletricista a 0,50 m do barramento, segurando um tubo de alumínio de 0,40 m apontado para ele.
- **Alternativas** (✔ = resposta do simulador):
  - A) ZL
  - B) ZC
  - **✔** C) ZR
- **Explicação:** Extensão condutora conta: a ponta fica a 0,10 m, dentro de Rr = 0,20 m.
- **Itens citados:** 10.2.2 · AII
- **Situação:** a validar

### V-9da012 · Zonas e alcance da norma
- **Pergunta:** Linha de 138 kV. A ponta da lança de um caminhão guindauto chega a 3,0 m do condutor.
- **Alternativas** (✔ = resposta do simulador):
  - A) ZL
  - **✔** B) ZC
  - C) ZR
- **Explicação:** Faixa ≥ 132 e < 150 kV: Rr 1,20 m e Rc 3,20 m. A lança metálica é extensão condutora, então o operador está em trabalho em proximidade.
- **Itens citados:** AII · g-prox
- **Situação:** a validar

### V-d6bc04 · Zonas e alcance da norma
- **Pergunta:** Cubículo de 13,8 kV com superfície isolante adequada entre a parte viva e o trabalhador, que está a 0,30 m do outro lado.
- **Alternativas** (✔ = resposta do simulador):
  - A) ZR
  - B) ZC
  - **✔** C) ZL
- **Explicação:** Pela Figura 2 do Anexo II, do lado oposto da superfície isolante a região é zona livre.
- **Itens citados:** AII
- **Situação:** a validar

### V-90dc69 · Zonas e alcance da norma
- **Pergunta:** Operador a 2,0 m de um CCM de 480 V com a porta aberta. Está fora da zona controlada (Rc 0,70 m), mas exposto a arco. A NR-10 se aplica a ele?
- **Alternativas** (✔ = resposta do simulador):
  - A) Não: está fora da ZC
  - **✔** B) Sim: a norma vale onde há exposição ao arco, mesmo sem entrada na ZC
- **Explicação:** Choque depende de contato; arco irradia energia a distância. Por isso o 10.2.3 estende o alcance da norma para além da geometria das zonas.
- **Itens citados:** 10.2.3 · g-dseg
- **Situação:** a validar

### V-75a11e · Energizado e proximidade
- **Pergunta:** Intervenção energizada em 13,8 kV dentro da zona de risco. O religador do alimentador está em automático.
- **Alternativas** (✔ = resposta do simulador):
  - A) Pode seguir com EPI adequado
  - **✔** B) Desativar (bloquear) o religamento automático e sinalizar essa condição antes de intervir
  - C) Basta avisar o centro de operação
- **Explicação:** —
- **Itens citados:** 10.14.3 · 10.14.3.1
- **Situação:** a validar

### V-951d1d · Energizado e proximidade
- **Pergunta:** Uma pessoa sem treinamento liga o disjuntor de iluminação num quadro de BT projetado para operação segura.
- **Alternativas** (✔ = resposta do simulador):
  - A) Proibido: só autorizados
  - **✔** B) Permitido: é operação elementar
  - C) Exige permissão de trabalho
- **Explicação:** —
- **Itens citados:** 10.14.1.1 · g-opel
- **Situação:** a validar

### V-6dfd3e · Energizado e proximidade
- **Pergunta:** Serviço energizado em 13,8 kV na cabine de uma indústria (SEC). Um eletricista pode fazê-lo sozinho?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim, se for PLH
  - **✔** B) Não: serviço energizado em MT/AT nunca é individual
- **Explicação:** Quem está sozinho não tem quem desligue a fonte, chame socorro ou faça o resgate. O 10.14.2 vale para MT/AT energizada e para todo serviço no SEP.
- **Itens citados:** 10.14.2
- **Situação:** a validar

### V-ba60f8 · Energizado e proximidade
- **Pergunta:** Sem outra previsão em regulamento, fabricante ou critério do PLH, com que frequência se ensaiam luvas isolantes de BT?
- **Alternativas** (✔ = resposta do simulador):
  - A) A cada 2 anos
  - **✔** B) Anualmente
  - C) Só quando apresentarem defeito
- **Explicação:** Vale o menor intervalo entre regulamentações, fabricante e PLH; na ausência de previsão, anual. Não ensaiar é GIR.
- **Itens citados:** 10.14.4 · 10.14.4.1 · 10.16.1
- **Situação:** a validar

### V-afb54a · Energizado e proximidade
- **Pergunta:** Ensaios elétricos de campo e o comissionamento de uma instalação seguem qual regime?
- **Alternativas** (✔ = resposta do simulador):
  - A) Livre, pois a instalação ainda não opera
  - **✔** B) O do 10.14 (energizado), sob responsabilidade de PLH, realizados por profissional autorizado
- **Explicação:** —
- **Itens citados:** 10.12.9 · 10.14.1
- **Situação:** a validar

### V-66e7f0 · Energizado e proximidade
- **Pergunta:** O eletricista no pátio não vê o colega na sala de comando. O que a norma exige?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada, se houver procedimento
  - **✔** B) Equipamentos de comunicação em perfeito estado, com comunicação permanente com a equipe e a sala de comando
- **Explicação:** —
- **Itens citados:** 10.12.4 · 10.12.4.1
- **Situação:** a validar

### V-d14440 · Energizado e proximidade
- **Pergunta:** Uma fábrica tem cogeração própria. O que ela precisa garantir em relação à rede?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada, a concessionária se protege
  - **✔** B) Medidas que impeçam a energização de instalações de outras organizações, salvo condições autorizadas pela ANEEL
- **Explicação:** É o retorno de tensão pela rede, que pega desprevenido quem trabalha num circuito que deveria estar sem fonte.
- **Itens citados:** 10.14.5
- **Alertas:** outra norma ou concessionária
- **Situação:** a validar

### V-9b3d10 · Energizado e proximidade
- **Pergunta:** Um circuito foi desligado, mas um gerador portátil pode realimentá-lo. Como ele deve ser tratado?
- **Alternativas** (✔ = resposta do simulador):
  - A) Como desenergizado
  - **✔** B) Como energizado, seguindo o capítulo 10.14, até que toda a sequência de desenergização seja cumprida
- **Explicação:** —
- **Itens citados:** 10.5.2 · 10.13.1
- **Situação:** a validar

### V-f3d88c · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “O QDC tem disjuntor geral com dispositivo para cadeado e etiqueta que indica se o circuito está ligado ou desligado.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Conforme
  - B) Não conforme
- **Explicação:** Atende ao desligamento com impedimento de reenergização e indicação da condição operativa.
- **Itens citados:** 10.4.1
- **Situação:** a validar

### V-6ae20b · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “O motor trifásico da bomba é seccionado por três disjuntores monopolares independentes, sem acoplamento.”
- **Alternativas** (✔ = resposta do simulador):
  - A) Conforme
  - **✔** B) Não conforme
- **Explicação:** O projeto deve prever, na medida do possível, seccionamento de ação simultânea.
- **Itens citados:** 10.4.2
- **Situação:** a validar

### V-812d01 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “Cabos de CFTV e de força passam no mesmo eletroduto, sem definição no projeto.”
- **Alternativas** (✔ = resposta do simulador):
  - A) Conforme
  - **✔** B) Não conforme
- **Explicação:** Circuitos de finalidades distintas são identificados e instalados separadamente, salvo compartilhamento definido em projeto.
- **Itens citados:** 10.4.3.1 · 10.12.10
- **Situação:** a validar

### V-df24e5 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “O projeto não especifica o esquema de aterramento nem se neutro e PE são interligados.”
- **Alternativas** (✔ = resposta do simulador):
  - A) Conforme
  - **✔** B) Não conforme
- **Explicação:** Esses dois pontos são conteúdo obrigatório do projeto.
- **Itens citados:** 10.4.4
- **Situação:** a validar

### V-6aea10 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “Não há ponto previsto para conectar aterramento temporário no QGBT.”
- **Alternativas** (✔ = resposta do simulador):
  - A) Conforme
  - **✔** B) Não conforme
- **Explicação:** Todo projeto prevê condições para aterramento temporário.
- **Itens citados:** 10.4.6
- **Situação:** a validar

### V-9fa9d4 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “O memorial descreve o princípio de funcionamento dos DR e sua compatibilidade com a instalação.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Conforme
  - B) Não conforme
- **Explicação:** Alíneas e e f do memorial descritivo.
- **Itens citados:** 10.4.9
- **Situação:** a validar

### V-d7aafa · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “O projeto veio de um escritório no exterior e não tem responsável técnico habilitado no Brasil.”
- **Alternativas** (✔ = resposta do simulador):
  - A) Conforme
  - **✔** B) Não conforme
- **Explicação:** Projeto feito fora do Brasil fica sob responsabilidade técnica de PLH.
- **Itens citados:** 10.4.8.1 · 10.4.8
- **Situação:** a validar

### V-907c84 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “A garagem foi ampliada, mas o projeto ficou na versão original.”
- **Alternativas** (✔ = resposta do simulador):
  - A) Conforme
  - **✔** B) Não conforme
- **Explicação:** O projeto corresponde ao executado.
- **Itens citados:** 10.4.13 · 10.4.7
- **Situação:** a validar

### V-af6145 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “A frente do QGBT tem espaço livre e iluminação suficiente para manutenção.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Conforme
  - B) Não conforme
- **Explicação:** Espaço seguro e iluminação adequada conforme NR-17.
- **Itens citados:** 10.4.3 · 10.4.10
- **Situação:** a validar

### V-bae021 · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “Para o QGBT de 380 V com 30 kA de curto presumido, o projeto inclui estudo de energia incidente.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Conforme
  - B) Não conforme
- **Explicação:** Estudo de energia incidente quando aplicável, para definir a proteção contra os efeitos térmicos do arco.
- **Itens citados:** 10.4.12 · 10.6.5
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-3b3b0d · Projeto e obra
- **Pergunta:** O projeto entregue para a obra está conforme o capítulo 10.4? “O projeto fica trancado na sala do engenheiro e os eletricistas autorizados não têm acesso.”
- **Alternativas** (✔ = resposta do simulador):
  - A) Conforme
  - **✔** B) Não conforme
- **Explicação:** O projeto fica disponível aos trabalhadores autorizados, às autoridades e a outras pessoas autorizadas.
- **Itens citados:** 10.4.7 · 10.15.2
- **Situação:** a validar

### V-568063 · Proteção coletiva
- **Pergunta:** Como regra, a proteção coletiva contra choque é assegurada por quê?
- **Alternativas** (✔ = resposta do simulador):
  - A) Só pela proteção básica
  - **✔** B) Pela aplicação conjunta de proteção básica e supletiva, por meios independentes ou por medida que garanta as duas
  - C) Pelo DDR, que substitui as demais
- **Explicação:** Duas camadas independentes: uma impede o contato com a parte viva, a outra impede que a massa fique perigosa se a primeira falhar. Só nas condições das normas técnicas, descritas no memorial, admite-se uma delas.
- **Itens citados:** 10.6.1.1 · 10.6.1.2
- **Situação:** a validar

### V-7dccf5 · Proteção coletiva
- **Pergunta:** Obstáculos e colocação fora do alcance são classificados como…
- **Alternativas** (✔ = resposta do simulador):
  - A) proteção básica completa
  - **✔** B) proteção parcial, aplicável conforme normas técnicas
  - C) proteção supletiva
- **Explicação:** O obstáculo impede o contato acidental, mas não o contato deliberado. Por isso a norma o chama de proteção parcial.
- **Itens citados:** 10.6.2.1 · g-adic
- **Situação:** a validar

### V-6f2d8c · Proteção coletiva
- **Pergunta:** Qual destas NÃO está entre as medidas coletivas contra arco do 10.6.5?
- **Alternativas** (✔ = resposta do simulador):
  - A) Painel resistente a arco
  - B) Seleção de tempos de interrupção muito curtos
  - **✔** C) Vestimenta AR de categoria 2
  - D) Chave de aterramento resistente ao curto-circuito presumido
- **Explicação:** Vestimenta é EPI, último nível da hierarquia (10.11). As outras três são medidas coletivas do 10.6.5.
- **Itens citados:** 10.6.5 · 10.11.2
- **Situação:** a validar

### V-8f1a6b · Proteção coletiva
- **Pergunta:** Um motor à prova de explosão foi reparado e volta para a área classificada. O que a norma exige?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada, se o reparo foi bem feito
  - **✔** B) Seleção e manutenção conforme o estudo de classificação de áreas e certificado segundo as normas técnicas
  - C) Apenas novo ensaio dielétrico
- **Explicação:** —
- **Itens citados:** 10.6.6.1.1
- **Situação:** a validar

### V-952a59 · Proteção coletiva
- **Pergunta:** Serviço em eletricidade dentro de área classificada exige…
- **Alternativas** (✔ = resposta do simulador):
  - A) só procedimento de trabalho
  - **✔** B) permissão de trabalho precedida de análise de risco, procedimento de trabalho e trabalhador autorizado
  - C) só treinamento Complementar de Área Classificada
- **Explicação:** Note que aqui a PT é obrigatória mesmo que a atividade seja rotineira. O treinamento complementar de 16 h também é exigido, pelo 10.9.7.
- **Itens citados:** 10.6.6.1.2 · 10.9.7
- **Situação:** a validar

### V-b3296a · Proteção coletiva
- **Pergunta:** Um processo acumula eletricidade estática capaz de provocar ignição. O que a norma pede?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sinalização apenas
  - **✔** B) Proteção específica e dispositivos de descarga elétrica, conforme projeto
  - C) EPI antiestático para todos
- **Explicação:** —
- **Itens citados:** 10.6.6.2
- **Situação:** a validar

### V-acd7f0 · Proteção coletiva
- **Pergunta:** Proteção contra sobretensões e contra descargas atmosféricas são…
- **Alternativas** (✔ = resposta do simulador):
  - A) opcionais
  - **✔** B) medidas de proteção coletiva definidas em projeto, observando as normas técnicas citadas no 10.2.1
  - C) responsabilidade exclusiva da concessionária
- **Explicação:** —
- **Itens citados:** 10.6.7 · 10.6.8 · 10.2.1
- **Situação:** a validar

### V-4e3d53 · Proteção coletiva
- **Pergunta:** Instalação elétrica de área classificada sem medidas de proteção coletiva caracteriza…
- **Alternativas** (✔ = resposta do simulador):
  - A) não conformidade comum
  - **✔** B) grave e iminente risco, com embargo ou interdição sem a metodologia da NR-3
  - C) infração apenas da NR-23
- **Explicação:** —
- **Itens citados:** 10.16.1 · 10.6.6.1
- **Situação:** a validar

### V-9b41e1 · Proteção individual e arco
- **Pergunta:** Painel 220 V · Icc 18 kA · eliminação 0,03 s · trabalho a 455 mm
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Categoria 1
  - B) Categoria 2
  - C) Categoria 3
  - D) Categoria 4
  - E) N/A · resistente a arco, portas fechadas
  - F) Fora do Anexo IV · estudo de energia incidente
- **Explicação:** Linha dos painéis de até 240 V: até 25 kA, 0,03 s, 455 mm → Categoria 1 (mínimo 4 cal/cm²).
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-65a4f5 · Proteção individual e arco
- **Pergunta:** Painel 440 V · Icc 22 kA · 0,03 s · 455 mm
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1
  - **✔** B) Categoria 2
  - C) Categoria 3
  - D) Categoria 4
  - E) N/A · resistente a arco, portas fechadas
  - F) Fora do Anexo IV · estudo de energia incidente
- **Explicação:** Painéis acima de 240 V até 600 V, até 25 kA → Categoria 2 (mínimo 8 cal/cm²).
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-706731 · Proteção individual e arco
- **Pergunta:** CCM 480 V · Icc 40 kA · eliminação 0,30 s · 455 mm
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1
  - B) Categoria 2
  - C) Categoria 3
  - **✔** D) Categoria 4
  - E) N/A · resistente a arco, portas fechadas
  - F) Fora do Anexo IV · estudo de energia incidente
- **Explicação:** Cabe na linha CCM 42 kA e 0,33 s → Categoria 4. Com 0,03 s seria Categoria 2: o tempo de eliminação pesa mais que a corrente.
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-126244 · Proteção individual e arco
- **Pergunta:** Cubículo metal-clad 13,8 kV · Icc 31,5 kA · 0,20 s · 910 mm
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1
  - B) Categoria 2
  - C) Categoria 3
  - **✔** D) Categoria 4
  - E) N/A · resistente a arco, portas fechadas
  - F) Fora do Anexo IV · estudo de energia incidente
- **Explicação:** Aparelhagem revestida de metal de 1 a 15 kV, até 35 kA e 0,24 s → Categoria 4.
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-39d569 · Proteção individual e arco
- **Pergunta:** Banco de baterias 220 Vcc · Icc 4 kA · sem dispositivo de proteção conhecido
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1
  - B) Categoria 2
  - **✔** C) Categoria 3
  - D) Categoria 4
  - E) N/A · resistente a arco, portas fechadas
  - F) Fora do Anexo IV · estudo de energia incidente
- **Explicação:** Quadro II: de 3 a menos de 7 kA → Categoria 3. Sem dispositivo de proteção, assume-se arco de 2 s.
- **Itens citados:** AIV-II
- **Situação:** a validar

### V-9a57b2 · Proteção individual e arco
- **Pergunta:** Painel 380 V · Icc 50 kA · eliminação 0,10 s · 455 mm
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1
  - B) Categoria 2
  - C) Categoria 3
  - D) Categoria 4
  - E) N/A · resistente a arco, portas fechadas
  - **✔** F) Fora do Anexo IV · estudo de energia incidente
- **Explicação:** Nenhuma linha cobre 50 kA com 0,10 s: painéis vão até 25 kA, quadros de distribuição até 35 kA, e as linhas de 65 kA exigem 0,03 s. Qualquer parâmetro pior impede o Anexo IV, e a organização faz estudo de energia incidente. Atenção à tradução: no Quadro I, "painéis" e "quadros de distribuição de 600 V" são linhas diferentes (a segunda leva à Categoria 4).
- **Itens citados:** 10.11.2.2 · 10.11.2.3 · 10.6.5
- **Situação:** a validar

### V-4397cd · Proteção individual e arco
- **Pergunta:** Painel 220 V · Icc 20 kA · 0,03 s · protegido por fusível limitador de 160 A. Qual a menor categoria que o Anexo IV admite?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Categoria 1
  - B) Categoria 2
  - C) Categoria 3
  - D) Categoria 4
  - E) N/A · resistente a arco, portas fechadas
  - F) Fora do Anexo IV · estudo de energia incidente
- **Explicação:** A nota permite reduzir uma categoria quando há fusível ou disjuntor limitador de até 200 A, mas nunca abaixo da Categoria 1.
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-a6d8a0 · Proteção individual e arco
- **Pergunta:** Painel 440 V · Icc 20 kA · 0,03 s · protegido por disjuntor limitador de 100 A. Qual a menor categoria que o Anexo IV admite?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Categoria 1
  - B) Categoria 2
  - C) Categoria 3
  - D) Categoria 4
  - E) N/A · resistente a arco, portas fechadas
  - F) Fora do Anexo IV · estudo de energia incidente
- **Explicação:** Categoria 2 da linha; a nota permite reduzir uma categoria com limitador de corrente de até 200 A → Categoria 1.
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-e905e3 · Proteção individual e arco
- **Pergunta:** Cubículo 13,8 kV resistente a arco · Icc 25 kA · 0,20 s · portas fechadas e travadas · dentro da classificação do equipamento
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1
  - B) Categoria 2
  - C) Categoria 3
  - D) Categoria 4
  - **✔** E) N/A · resistente a arco, portas fechadas
  - F) Fora do Anexo IV · estudo de energia incidente
- **Explicação:** Para equipamentos resistentes a arco nessas condições, a categoria é N/A.
- **Itens citados:** AIV-I · 10.6.5
- **Situação:** a validar

### V-bb94b4 · Proteção individual e arco
- **Pergunta:** O mesmo cubículo resistente a arco (25 kA, 0,20 s, 910 mm), mas com a porta aberta para extrair o disjuntor
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 1
  - B) Categoria 2
  - C) Categoria 3
  - **✔** D) Categoria 4
  - E) N/A · resistente a arco, portas fechadas
  - F) Fora do Anexo IV · estudo de energia incidente
- **Explicação:** Com portas abertas vale a linha do equipamento não resistente a arco: aparelhagem revestida de metal 1–15 kV → Categoria 4.
- **Itens citados:** AIV-I
- **Situação:** a validar

### V-a9d7e6 · Documentação e grave e iminente risco
- **Pergunta:** Esta situação está na lista do 10.16.1? “Instalação de área classificada sem medidas de proteção coletiva”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Grave e iminente risco (10.16.1)
  - B) Não conformidade, não é GIR
- **Explicação:** —
- **Itens citados:** 10.16.1
- **Situação:** a validar

### V-8cea1d · Documentação e grave e iminente risco
- **Pergunta:** Esta situação está na lista do 10.16.1? “Equipe aterrou o circuito sem constatar ausência de tensão”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Grave e iminente risco (10.16.1)
  - B) Não conformidade, não é GIR
- **Explicação:** Falha na sequência de desenergização.
- **Itens citados:** 10.16.1 · 10.13.1
- **Situação:** a validar

### V-61dd7c · Documentação e grave e iminente risco
- **Pergunta:** Esta situação está na lista do 10.16.1? “Ajudante sem treinamento nem autorização trocando disjuntor energizado no QGBT”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Grave e iminente risco (10.16.1)
  - B) Não conformidade, não é GIR
- **Explicação:** Trabalhador que não atende ao capítulo 10.10.
- **Itens citados:** 10.16.1 · 10.10.2.1
- **Situação:** a validar

### V-3835e9 · Documentação e grave e iminente risco
- **Pergunta:** Esta situação está na lista do 10.16.1? “Luvas isolantes em uso sem ensaio dielétrico”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Grave e iminente risco (10.16.1)
  - B) Não conformidade, não é GIR
- **Explicação:** —
- **Itens citados:** 10.16.1 · 10.14.4
- **Situação:** a validar

### V-fbb826 · Documentação e grave e iminente risco
- **Pergunta:** Esta situação está na lista do 10.16.1? “Painel com circuitos sem identificação”
- **Alternativas** (✔ = resposta do simulador):
  - A) Grave e iminente risco (10.16.1)
  - **✔** B) Não conformidade, não é GIR
- **Explicação:** Não conformidade com 10.7.7, mas fora da lista do 10.16.1.
- **Itens citados:** 10.7.7
- **Situação:** a validar

### V-4856bf · Documentação e grave e iminente risco
- **Pergunta:** Esta situação está na lista do 10.16.1? “Diagrama unifilar desatualizado”
- **Alternativas** (✔ = resposta do simulador):
  - A) Grave e iminente risco (10.16.1)
  - **✔** B) Não conformidade, não é GIR
- **Explicação:** Não conformidade com 10.4.13, mas fora da lista do 10.16.1.
- **Itens citados:** 10.4.13
- **Situação:** a validar

### V-53cdd5 · Documentação e grave e iminente risco
- **Pergunta:** Esta situação está na lista do 10.16.1? “Religaram o disjuntor com o aterramento temporário ainda instalado”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Grave e iminente risco (10.16.1)
  - B) Não conformidade, não é GIR
- **Explicação:** Falha na sequência de reenergização.
- **Itens citados:** 10.16.1 · 10.13.2
- **Situação:** a validar

### V-ecc8f0 · Documentação e grave e iminente risco
- **Pergunta:** Esta situação está na lista do 10.16.1? “Luminária queimada diante do CCM”
- **Alternativas** (✔ = resposta do simulador):
  - A) Grave e iminente risco (10.16.1)
  - **✔** B) Não conformidade, não é GIR
- **Explicação:** Não conformidade com 10.4.10, fora da lista do 10.16.1.
- **Itens citados:** 10.4.10
- **Situação:** a validar

### V-be0a89 · Organização do trabalho
- **Pergunta:** Que documento libera esta atividade? “Termografia mensal dos barramentos do QGBT, prevista no plano de manutenção”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Procedimento de trabalho (rotineira)
  - B) Permissão de trabalho (não rotineira)
- **Explicação:** Habitual e parte do processo contínuo.
- **Itens citados:** 10.7.1 · g-rot
- **Situação:** a validar

### V-dbabe3 · Organização do trabalho
- **Pergunta:** Que documento libera esta atividade? “Troca emergencial de um TC queimado no cubículo de entrada”
- **Alternativas** (✔ = resposta do simulador):
  - A) Procedimento de trabalho (rotineira)
  - **✔** B) Permissão de trabalho (não rotineira)
- **Explicação:** —
- **Itens citados:** 10.7.2
- **Situação:** a validar

### V-88213b · Organização do trabalho
- **Pergunta:** Que documento libera esta atividade? “Limpeza semestral programada dos painéis”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Procedimento de trabalho (rotineira)
  - B) Permissão de trabalho (não rotineira)
- **Explicação:** Rotineira não depende da frequência, e sim de ser habitual e parte do processo contínuo.
- **Itens citados:** g-rot · 10.7.1
- **Situação:** a validar

### V-53bb1f · Organização do trabalho
- **Pergunta:** Que documento libera esta atividade? “Instalação de um alimentador novo para a ampliação da fábrica”
- **Alternativas** (✔ = resposta do simulador):
  - A) Procedimento de trabalho (rotineira)
  - **✔** B) Permissão de trabalho (não rotineira)
- **Explicação:** —
- **Itens citados:** 10.7.2
- **Situação:** a validar

### V-09605e · Organização do trabalho
- **Pergunta:** Que documento libera esta atividade? “Manobra diária de transferência rede/gerador prevista no procedimento operacional”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Procedimento de trabalho (rotineira)
  - B) Permissão de trabalho (não rotineira)
- **Explicação:** —
- **Itens citados:** 10.7.1
- **Situação:** a validar

### V-a748f4 · Organização do trabalho
- **Pergunta:** Que documento libera esta atividade? “Primeira intervenção em um painel recém-adquirido, ainda sem procedimento”
- **Alternativas** (✔ = resposta do simulador):
  - A) Procedimento de trabalho (rotineira)
  - **✔** B) Permissão de trabalho (não rotineira)
- **Explicação:** —
- **Itens citados:** 10.7.2
- **Situação:** a validar

### V-4c6353 · Pessoas e autorização
- **Pergunta:** Verdadeiro ou falso, pela NR-10? “A autorização precisa constar nos documentos funcionais do trabalhador.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeiro
  - B) Falso
- **Explicação:** —
- **Itens citados:** 10.10.3
- **Situação:** a validar

### V-2b4223 · Pessoas e autorização
- **Pergunta:** Verdadeiro ou falso, pela NR-10? “Um engenheiro eletricista pode ser autorizado só pelo diploma, sem treinamento NR-10.”
- **Alternativas** (✔ = resposta do simulador):
  - A) Verdadeiro
  - **✔** B) Falso
- **Explicação:** O treinamento vale independentemente do cargo e da escolaridade.
- **Itens citados:** 10.10.2.1
- **Situação:** a validar

### V-b28a73 · Pessoas e autorização
- **Pergunta:** Verdadeiro ou falso, pela NR-10? “A organização mantém um sistema que mostra, a qualquer momento, a abrangência da autorização de cada trabalhador.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeiro
  - B) Falso
- **Explicação:** —
- **Itens citados:** 10.10.4
- **Situação:** a validar

### V-9b20af · Pessoas e autorização
- **Pergunta:** Verdadeiro ou falso, pela NR-10? “O treinamento pode ser feito fora do expediente, pago pelo trabalhador.”
- **Alternativas** (✔ = resposta do simulador):
  - A) Verdadeiro
  - **✔** B) Falso
- **Explicação:** É a cargo e custo do empregador, durante o expediente.
- **Itens citados:** 10.9.1
- **Situação:** a validar

### V-e1c3b0 · Pessoas e autorização
- **Pergunta:** Verdadeiro ou falso, pela NR-10? “A parte prática do treinamento pode ser feita a distância.”
- **Alternativas** (✔ = resposta do simulador):
  - A) Verdadeiro
  - **✔** B) Falso
- **Explicação:** O conteúdo prático é presencial.
- **Itens citados:** 10.9.13
- **Situação:** a validar

### V-4c2eb5 · Pessoas e autorização
- **Pergunta:** Verdadeiro ou falso, pela NR-10? “Quem supervisiona serviços em eletricidade também precisa ser autorizado.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeiro
  - B) Falso
- **Explicação:** —
- **Itens citados:** 10.10.2
- **Situação:** a validar

### V-446c5a · Pessoas e autorização
- **Pergunta:** Verdadeiro ou falso, pela NR-10? “Em serviço feito em equipe, a organização indica um dos membros para supervisionar e conduzir o trabalho.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeiro
  - B) Falso
- **Explicação:** —
- **Itens citados:** 10.7.6
- **Situação:** a validar

### V-067698 · Pessoas e autorização
- **Pergunta:** Verdadeiro ou falso, pela NR-10? “Os documentos técnicos do PIE podem ser elaborados por trabalhador-capacitado.”
- **Alternativas** (✔ = resposta do simulador):
  - A) Verdadeiro
  - **✔** B) Falso
- **Explicação:** São elaborados por PLH.
- **Itens citados:** 10.15.7
- **Situação:** a validar

### V-466009 · Pessoas e autorização
- **Pergunta:** Verdadeiro ou falso, pela NR-10? “Depois de um acidente grave que indique necessidade, a organização faz treinamento eventual, mesmo com o periódico em dia.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeiro
  - B) Falso
- **Explicação:** —
- **Itens citados:** 10.9.11
- **Situação:** a validar

### V-281c27 · Pessoas e autorização
- **Pergunta:** Verdadeiro ou falso, pela NR-10? “A documentação da NR-10 pode ser só digital, em português.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeiro
  - B) Falso
- **Explicação:** —
- **Itens citados:** 10.15.1
- **Situação:** a validar

### V-169675 · Pessoas e autorização
- **Pergunta:** Verdadeiro ou falso, pela NR-10? “Os instrutores precisam ter proficiência comprovada, sob responsabilidade de PLH.”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Verdadeiro
  - B) Falso
- **Explicação:** —
- **Itens citados:** 10.9.12
- **Situação:** a validar

### V-5590c5 · Desenergização e reenergização
- **Pergunta:** Um circuito desligado no disjuntor, sem bloqueio nem aterramento, está desenergizado para a NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim
  - **✔** B) Não; só depois de cumprida a sequência do 10.13.1. Antes disso vale o capítulo 10.14
- **Explicação:** Desligada com possibilidade de energização segue as regras de instalação energizada.
- **Itens citados:** 10.13.1 · 10.5.2
- **Situação:** a validar

### V-b0b5fe · Desenergização e reenergização
- **Pergunta:** O PLH pode mudar a sequência de desenergização?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nunca
  - **✔** B) Sim, por peculiaridade da situação ou desenvolvimento tecnológico, com justificativa técnica formalizada antes e o mesmo nível de segurança
  - C) Sim, verbalmente no campo
- **Explicação:** —
- **Itens citados:** 10.13.4
- **Situação:** a validar

### V-7e62ef · Desenergização e reenergização
- **Pergunta:** Outra equipe pode religar o alimentador que você desenergizou. O que a norma exige?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada; a responsabilidade é dela
  - **✔** B) Medidas que impeçam outras equipes ou organizações de energizar a instalação durante todo o serviço
- **Explicação:** —
- **Itens citados:** 10.13.3
- **Situação:** a validar

### V-6d1918 · Desenergização e reenergização
- **Pergunta:** Com 89 e 52 abertos, o barramento de entrada continua energizado dentro da zona controlada. Que etapa cuida disso?
- **Alternativas** (✔ = resposta do simulador):
  - A) (c) impedimento de reenergização
  - **✔** B) (e) proteção dos elementos energizados na zona controlada e contra arco
  - C) (g) delimitação da área
- **Explicação:** —
- **Itens citados:** 10.13.1 · AII
- **Situação:** a validar

### V-fd4e02 · Desenergização e reenergização
- **Pergunta:** Pelo 10.13.1, qual é a ordem das três primeiras etapas?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Seccionamento → constatação → impedimento
  - B) Seccionamento → impedimento → constatação
  - C) Impedimento → seccionamento → constatação
- **Explicação:** Alíneas a, b e c do 10.13.1: seccionamento ou desligamento; constatação da ausência de tensão; impedimento de reenergização. A constatação volta na alínea d, antes do aterramento.
- **Itens citados:** 10.13.1
- **Situação:** a validar

### V-fa0154 · Desenergização e reenergização
- **Pergunta:** Pelo 10.13.2, qual é a primeira etapa da reenergização?
- **Alternativas** (✔ = resposta do simulador):
  - A) Remover o aterramento temporário
  - **✔** B) Retirar os obstáculos de delimitação e sinalização da área
  - C) Religar o disjuntor
- **Explicação:** —
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-98cae5 · Desenergização e reenergização
- **Pergunta:** Ao abrir uma seccionadora com o disjuntor fechado, o que acontece?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada; seccionadora interrompe carga
  - **✔** B) Forma arco nos contatos, porque seccionadora não é dispositivo de abertura sob carga
- **Explicação:** Por isso o 10.6.5 lista dispositivos de abertura sob carga e intertravamentos como proteção contra arco.
- **Itens citados:** 10.6.5
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-8f20de · Documentação e grave e iminente risco
- **Pergunta:** Supermercado com 300 kW instalados, alimentado em 380 V, com dois eletricistas próprios. Precisa de PIE pela NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim, passa de 75 kW
  - **✔** B) Não; mas mantém projeto, registros de aterramento e a documentação do 10.15.4
  - C) Não precisa de documento algum
- **Explicação:** O PIE é para quem integra o SEP ou atua em MT/AT. Ter autorizados já obriga a documentação do 10.15.4, só que fora do formato de PIE.
- **Itens citados:** 10.15.6 · 10.15.4 · 10.15.3
- **Situação:** a validar

### V-a8254e · Documentação e grave e iminente risco
- **Pergunta:** Indústria com cabine primária de 13,8 kV operada pelos próprios eletricistas.
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Precisa de PIE
  - B) Não precisa: não é concessionária
- **Explicação:** Realiza atividades em instalação de média tensão.
- **Itens citados:** 10.15.6 · g-mt
- **Situação:** a validar

### V-68df87 · Documentação e grave e iminente risco
- **Pergunta:** Usina solar de 5 MW conectada à rede da distribuidora.
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Precisa de PIE: geração integra o SEP
  - B) Não precisa: é energia renovável
- **Explicação:** —
- **Itens citados:** 10.15.6 · g-sep
- **Situação:** a validar

### V-f8b139 · Documentação e grave e iminente risco
- **Pergunta:** Quem elabora os documentos técnicos do PIE?
- **Alternativas** (✔ = resposta do simulador):
  - A) Qualquer trabalhador autorizado
  - **✔** B) PLH
  - C) O técnico de segurança do trabalho
- **Explicação:** —
- **Itens citados:** 10.15.7 · 10.15.6
- **Situação:** a validar

### V-9fcd25 · Documentação e grave e iminente risco
- **Pergunta:** O PIE pode existir só em meio digital?
- **Alternativas** (✔ = resposta do simulador):
  - A) Não, precisa ser impresso
  - **✔** B) Sim, conforme a NR-1, em português
- **Explicação:** —
- **Itens citados:** 10.15.1
- **Situação:** a validar

### V-0bee06 · Documentação e grave e iminente risco
- **Pergunta:** A quem a documentação da NR-10 fica disponível?
- **Alternativas** (✔ = resposta do simulador):
  - A) Só à direção da empresa
  - **✔** B) Aos trabalhadores interessados ou seus representantes e à Inspeção do Trabalho
- **Explicação:** —
- **Itens citados:** 10.15.2
- **Situação:** a validar

### V-72a3b8 · Documentação e grave e iminente risco
- **Pergunta:** O que o 10.16.1 muda na fiscalização?
- **Alternativas** (✔ = resposta do simulador):
  - A) Cria multas novas
  - **✔** B) Dispensa a metodologia da NR-3 para embargar ou interditar diante de quatro condições objetivas
  - C) Proíbe a interdição de instalações do SEP
- **Explicação:** —
- **Itens citados:** 10.16.1 · NR-3
- **Situação:** a validar

### V-f42663 · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Projeto elétrico conforme o capítulo 10.4”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Toda organização
  - B) Quem tem trabalhadores autorizados
  - C) Quem tem área classificada
  - D) Conteúdo do PIE
- **Explicação:** —
- **Itens citados:** 10.15.3
- **Situação:** a validar

### V-b5b0cf · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Inspeções e medições do sistema de aterramento”
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Toda organização
  - B) Quem tem trabalhadores autorizados
  - C) Quem tem área classificada
  - D) Conteúdo do PIE
- **Explicação:** —
- **Itens citados:** 10.15.3
- **Situação:** a validar

### V-612638 · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Procedimentos de trabalho, análises de risco e PT”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização
  - **✔** B) Quem tem trabalhadores autorizados
  - C) Quem tem área classificada
  - D) Conteúdo do PIE
- **Explicação:** —
- **Itens citados:** 10.15.4
- **Situação:** a validar

### V-9b4ab3 · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Especificação de EPC, EPI e ferramental”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização
  - **✔** B) Quem tem trabalhadores autorizados
  - C) Quem tem área classificada
  - D) Conteúdo do PIE
- **Explicação:** —
- **Itens citados:** 10.15.4
- **Situação:** a validar

### V-e52712 · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Comprovação de qualificação, habilitação, capacitação, treinamento e autorização”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização
  - **✔** B) Quem tem trabalhadores autorizados
  - C) Quem tem área classificada
  - D) Conteúdo do PIE
- **Explicação:** —
- **Itens citados:** 10.15.4
- **Situação:** a validar

### V-6b8738 · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Relatórios de testes de isolação”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização
  - **✔** B) Quem tem trabalhadores autorizados
  - C) Quem tem área classificada
  - D) Conteúdo do PIE
- **Explicação:** —
- **Itens citados:** 10.15.4
- **Situação:** a validar

### V-f76c5e · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Certificação dos equipamentos instalados em área classificada”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização
  - B) Quem tem trabalhadores autorizados
  - **✔** C) Quem tem área classificada
  - D) Conteúdo do PIE
- **Explicação:** —
- **Itens citados:** 10.15.5
- **Situação:** a validar

### V-614f57 · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Inspeções de conformidade da área classificada”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização
  - B) Quem tem trabalhadores autorizados
  - **✔** C) Quem tem área classificada
  - D) Conteúdo do PIE
- **Explicação:** —
- **Itens citados:** 10.15.5
- **Situação:** a validar

### V-daa5f7 · Documentação e grave e iminente risco
- **Pergunta:** Quem é obrigado a manter este documento? “Procedimentos de resposta a emergências, com sistema de resgate”
- **Alternativas** (✔ = resposta do simulador):
  - A) Toda organização
  - B) Quem tem trabalhadores autorizados
  - C) Quem tem área classificada
  - **✔** D) Conteúdo do PIE
- **Explicação:** Conteúdo específico do PIE.
- **Itens citados:** 10.15.6.1
- **Situação:** a validar

### V-db7696 · Missão integrada
- **Pergunta:** Como esta atividade se enquadra?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) SEC em MT: PIE obrigatório, Básico e Complementar MT/AT-SEC, serviço energizado nunca individual
  - B) SEP em AT: Básico e Complementar SEP
  - C) SEC em BT: só o Básico, e PIE pela carga instalada acima de 75 kW
- **Explicação:** A cabine é do consumidor, depois da medição: SEC. 13,8 kV é MT pelo glossário. Atividade em MT obriga o PIE e o Complementar MT/AT-SEC.
- **Itens citados:** g-mt · 10.15.6 · 10.9.6 · 10.14.2
- **Situação:** a validar

### V-637698 · Missão integrada
- **Pergunta:** A empresa nunca fez esse serviço. O que libera a execução?
- **Alternativas** (✔ = resposta do simulador):
  - A) Procedimento de trabalho aprovado por PLH
  - **✔** B) Permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado
  - C) Ordem verbal do supervisor
- **Explicação:** Atividade que não é habitual nem parte do processo contínuo é não rotineira.
- **Itens citados:** 10.7.2 · g-rot
- **Situação:** a validar

### V-2e4494 · Missão integrada
- **Pergunta:** Com a 89-1 aberta, o que continua energizado e entra na análise de risco como perigo dentro da zona controlada?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada: a seccionadora isola tudo
  - **✔** B) O barramento de entrada e os contatos superiores da 89-1, do lado da fonte
  - C) Só o secundário do transformador
- **Explicação:** O lado da fonte permanece energizado. A etapa (e) do 10.13.1 existe para isso: proteger os elementos energizados na ZC e o trabalhador contra o arco.
- **Itens citados:** 10.13.1 · AII · 10.7.3
- **Situação:** a validar

### V-66959b · Missão integrada
- **Pergunta:** A equipe tem duas pessoas. O que a organização precisa definir?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada: equipe pequena dispensa
  - **✔** B) Um dos membros para supervisionar e conduzir o trabalho
  - C) Um técnico de segurança externo presente
- **Explicação:** —
- **Itens citados:** 10.7.6
- **Situação:** a validar

### V-f2864e · Missão integrada
- **Pergunta:** Para manobrar a 89-1 no cubículo metal-clad de 13,8 kV (Icc 20 kA, eliminação 0,20 s, distância de trabalho 910 mm), qual a categoria?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 2
  - B) Categoria 3
  - **✔** C) Categoria 4
  - D) Fora do Anexo IV
- **Explicação:** Linha da aparelhagem revestida de metal de 1 a 15 kV: até 35 kA, 0,24 s, 910 mm → Categoria 4, com vestimenta de pelo menos 40 cal/cm².
- **Itens citados:** AIV-I · AIV-III
- **Situação:** a validar

### V-b45184 · Missão integrada
- **Pergunta:** No local, o detector de tensão não acende ao ser testado numa fonte conhecida.
- **Alternativas** (✔ = resposta do simulador):
  - A) Usar mesmo assim: a 89-1 está visivelmente aberta
  - **✔** B) Não iniciar a operação e comunicar o superior hierárquico
  - C) Começar e trocar o detector depois
- **Explicação:** Sem detector confiável não há como cumprir a constatação de ausência de tensão. É anormalidade que afeta a segurança.
- **Itens citados:** 10.7.4.1 · 10.7.4.2 · 10.12.6.1
- **Situação:** a validar

### V-c9916e · Missão integrada
- **Pergunta:** O QGBT tem um gerador de emergência que pode alimentar o TR-01 pelo lado de 380 V. O que isso muda?
- **Alternativas** (✔ = resposta do simulador):
  - A) Nada: o lado de 13,8 kV já está seccionado
  - **✔** B) O lado de BT também precisa ser seccionado e bloqueado; enquanto houver possibilidade de energização, vale o regime de energizada
  - C) Basta avisar o operador do gerador
- **Explicação:** Alimentado pela BT, o transformador eleva a tensão do gerador de volta a 13,8 kV nas buchas de MT. Desenergizar é isolar todas as fontes.
- **Itens citados:** 10.5.2 · 10.13.1 · 10.13.3
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-0e200f · Missão integrada
- **Pergunta:** O serviço passa para o turno da noite, com dois eletricistas novos. A PT do dia vale?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim, até o fim do serviço
  - **✔** B) Não: a PT é restrita ao turno e só pode ser revalidada se não mudarem as condições nem a equipe
  - C) Sim, se o supervisor assinar de novo
- **Explicação:** —
- **Itens citados:** 10.7.2.2
- **Situação:** a validar

### V-99f81d · Uma OS na cabine primária
- **Pergunta:** Como esta atividade se enquadra na NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) SEC em média tensão: o PIE é obrigatório e a equipe faz o Básico e o Complementar de Média e Alta Tensão - SEC
  - B) SEP em alta tensão: Básico e Complementar do SEP
  - C) SEC em baixa tensão: só o Básico, e PIE pela carga instalada
  - D) Fora da NR-10, porque o serviço é no transformador desligado
  - E) SEP em média tensão, porque a cabine recebe energia da distribuidora
- **Explicação:** Depois da medição a instalação é do consumidor (SEC): pelo glossário, o SEP vai até a medição, inclusive. 13,8 kV é MT (acima de 1.000 V até 36.200 V CA). Quem realiza atividades em MT mantém o PIE (10.15.6), e o trabalhador faz o Básico (10.9.4) e o Complementar MT/AT - SEC (10.9.6).
- **Itens citados:** g-sep · g-mt · 10.15.6 · 10.9.6
- **Situação:** a validar

### V-eb4744 · Uma OS na cabine primária
- **Pergunta:** O que libera a execução?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado
  - B) Procedimento de trabalho aprovado por PLH
  - C) Ordem verbal do supervisor
  - D) Só a análise de risco, sem outro documento
  - E) O projeto elétrico da cabine
- **Explicação:** Serviço não rotineiro exige PT, precedida de análise de riscos e aprovada por trabalhador autorizado (10.7.2). Procedimento aprovado por PLH é para atividades rotineiras (10.7.1, 10.7.1.1). A PT fica disponível no local do serviço (10.7.2.3).
- **Itens citados:** 10.7.2 · 10.7.1 · g-rot · 10.7.2.3
- **Situação:** a validar

### V-5aae39 · Uma OS na cabine primária
- **Pergunta:** O que a organização precisa definir?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Indicar um dos dois para supervisionar e conduzir os trabalhos
  - B) Nada: equipe de duas pessoas dispensa supervisão
  - C) Contratar um técnico de segurança para ficar no local
  - D) Pôr um terceiro eletricista só para observar
  - E) Deixar cada um supervisionar o próprio trabalho
- **Explicação:** Em serviço feito em equipe, a organização indica um trabalhador entre os membros para supervisionar e conduzir os trabalhos (10.7.6). Quem supervisiona também é autorizado (10.10.2 c).
- **Itens citados:** 10.7.6 · 10.10.2
- **Situação:** a validar

### V-99622f · Uma OS na cabine primária
- **Pergunta:** Qual vestimenta mínima o Anexo IV exige para manobrar a 89-1?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Categoria 4: no mínimo 40 cal/cm²
  - B) Categoria 2: no mínimo 8 cal/cm²
  - C) Categoria 3: no mínimo 25 cal/cm²
  - D) Categoria 1: no mínimo 4 cal/cm²
  - E) Nenhuma: o Anexo IV não vale para média tensão
- **Explicação:** A linha "aparelhagem de manobra revestida de metal, 1 kV a 15 kV" do Quadro I vale até 35 kA, até 0,24 s e a partir de 910 mm: Categoria 4. O Quadro III dá no mínimo 40 cal/cm² para a Categoria 4. Os quatro parâmetros valem em conjunto (10.11.2.1).
- **Itens citados:** AIV-I · AIV-III · 10.11.2.1
- **Situação:** a validar

### V-2a0c72 · Uma OS na cabine primária
- **Pergunta:** O que a equipe faz?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não inicia a operação e comunica o superior hierárquico
  - B) Usa assim mesmo: a seccionadora vai ficar visivelmente aberta
  - C) Começa e troca o detector depois
  - D) Usa o VPIS do cubículo no lugar do detector
  - E) Mede com um multímetro de bolso
- **Explicação:** Anormalidade que afeta a segurança, constatada na avaliação prévia: a operação não é iniciada e o superior é comunicado (10.7.4.2). O instrumento precisa ser adequado à tensão e à classe de isolação (10.12.6.1). Sem detector confiável não há como cumprir a constatação de ausência de tensão do 10.13.1. Um detector reserva, testado, chega do almoxarifado.
- **Itens citados:** 10.7.4 · 10.7.4.2 · 10.12.6.1
- **Situação:** a validar

### V-93f6de · Uma OS na cabine primária
- **Pergunta:** A PT do turno da manhã continua valendo?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não: a PT é restrita ao turno e, com a equipe toda trocada, não pode ser revalidada
  - B) Sim, até o fim do serviço
  - C) Sim, se o supervisor da noite assinar embaixo
  - D) Sim, porque a PT vale 24 horas
  - E) Não existe PT em serviço de manutenção
- **Explicação:** A PT vale pela duração da atividade, restrita ao turno, e só pode ser revalidada se não mudarem as condições estabelecidas nem toda a equipe (10.7.2.2). A nova PT lista todos os envolvidos e suas autorizações (10.7.2.1 c).
- **Itens citados:** 10.7.2.2 · 10.7.2.1
- **Situação:** a validar

### V-240467 · Uma OS na cabine primária
- **Pergunta:** O que acontece com a permissão de trabalho?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) É encerrada e arquivada de forma a permitir a rastreabilidade
  - B) É descartada, porque o serviço terminou
  - C) Fica com o executante, como comprovante pessoal
  - D) É reutilizada no próximo serviço parecido
  - E) É entregue à distribuidora
- **Explicação:** A PT fica disponível no local durante o serviço e, ao final, é encerrada e arquivada de forma a permitir a rastreabilidade (10.7.2.3). Se a instalação mudou, o projeto é atualizado para corresponder ao executado (10.4.13).
- **Itens citados:** 10.7.2.3 · 10.4.13
- **Situação:** a validar

### V-066509 · Uma OS na cabine primária
- **Pergunta:** Como a NR-10 trata esse desvio?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) É condição de grave e iminente risco: permite embargo ou interdição sem a metodologia da NR-3
  - B) É só uma não conformidade, corrigida no próximo serviço
  - C) Gera multa, mas nunca interdição
  - D) Só conta se houver acidente
  - E) Depende de a fábrica ter PIE
- **Explicação:** O 10.16.1 b inclui a não adoção dos procedimentos de desenergização (10.13.1) ou de reenergização (10.13.2), ou das alternativas permitidas pelo 10.13.4. Os documentos do serviço ficam no PIE, que esta fábrica mantém por atuar em média tensão (10.15.6).
- **Itens citados:** 10.16.1 · 10.13.4 · 10.15.6
- **Situação:** a validar

---

## 2. História: passos interativos (OS 0731)

Passos em que o aluno clica nos objetos da cena. As questões de escolha da História estão na seção 1.

### V-115019 · F2 · Equipe · achar o objeto
- **Situação:** Três eletricistas se apresentam. Ana: engenheira eletricista com registro no CREA, ASO apto, Básico e Complementar MT/AT - SEC em dia. Bruno: técnico em eletrotécnica, ASO apto, mesmos treinamentos. Caio: era trabalhador-capacitado na empresa onde trabalhava antes; foi contratado ontem.
- **Tarefa:** Clique em quem não pode compor a equipe.
- **Resposta do simulador:** Caio · capacitado em outra empresa
- **Explicação:** Caio fica fora. A capacitação só vale para a organização que capacitou o trabalhador e nas condições estabelecidas pelo PLH responsável (10.8.3.3). Para ser autorizado aqui, Caio precisa de anuência formal da organização, ASO apto e treinamento com aproveitamento (10.10.2.1).
- **Itens citados:** 10.8.3.3 · 10.10.2.1
- **Situação:** a validar

### V-9f3cb8 · F3 · Almoxarifado · achar o objeto
- **Situação:** No carrinho: detector de tensão para MT, conjunto de aterramento temporário, cadeado, etiqueta, anteparo isolante, cones e corrente, luvas isolantes e vestimenta contra arco. A etiqueta das luvas mostra o último ensaio dielétrico há 14 meses. O fabricante e o PLH não definiram outro prazo.
- **Tarefa:** Clique no item que não pode ser usado hoje.
- **Resposta do simulador:** Luvas isolantes
- **Explicação:** Luvas com ensaio vencido. Luvas e mangas isolantes passam por ensaio dielétrico (10.14.4 b). Sem prazo menor previsto, o ensaio é anual (10.14.4.1): 14 meses é ensaio vencido. Não ensaiar EPI isolante é uma das condições de grave e iminente risco (10.16.1 d). O almoxarifado troca as luvas.
- **Itens citados:** 10.14.4 · 10.14.4.1 · 10.16.1
- **Situação:** a validar

### V-8ab367 · F4 · Chegada · não conformidade
- **Objeto:** QGBT 380 V
- **Não conformidade:** Porta do QGBT aberta
- **Explicação:** Sem intervenção em curso, a porta do painel fica permanentemente fechada, com sinalização do nível de tensão e de advertência (10.7.7.1). A equipe fecha a porta.
- **Itens citados:** 10.7.7.1
- **Situação:** a validar

### V-c949d8 · F4 · Chegada · não conformidade
- **Objeto:** Bruno · técnico em eletrotécnica
- **Não conformidade:** Bruno está de relógio
- **Explicação:** É vedado o uso de adornos pessoais nos serviços em eletricidade (10.7.8). Bruno guarda o relógio fora da cabine.
- **Itens citados:** 10.7.8
- **Situação:** a validar

### V-6f7f18 · F4 · Chegada · não conformidade
- **Objeto:** Escada de alumínio
- **Não conformidade:** Escada de alumínio encostada no cubículo
- **Explicação:** É extensão condutora. Entrar na zona controlada com parte do corpo ou com extensões condutoras é trabalho em proximidade (10.2.2; glossário). A escada sai da cabine.
- **Itens citados:** 10.2.2 · g-prox
- **Situação:** a validar

### V-e9326a · F4 · Chegada · não conformidade
- **Objeto:** Pintor terceirizado
- **Não conformidade:** Pintor trabalhando ao lado dos cubículos
- **Explicação:** Para quem faz atividade não elétrica na vizinhança da zona controlada, a organização faz análise de risco e dá instrução formal (10.14.1.2). Ele sai da área até ser instruído.
- **Itens citados:** 10.14.1.2 · g-zc
- **Situação:** a validar

### V-cab9bf · F6 · Desenergização · sequência do 10.13.1
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

### V-3edac7 · F6 · Desenergização · erro de ordem
- **Erro:** Arco na seccionadora
- **Explicação:** Abrir a seccionadora com o disjuntor fechado forma arco nos contatos: ela não é dispositivo de abertura sob carga. Dispositivos de abertura sob carga aparecem no 10.6.5 c como proteção contra arco.
- **Itens citados:** 10.6.5 · 10.13.1
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-20dc67 · F6 · Desenergização · erro de ordem
- **Erro:** Aterramento sem constatação
- **Explicação:** Se o circuito estiver energizado, o grampo fecha um curto franco com arco na frente de quem o segura. A alínea d manda constatar a ausência de tensão para instalar o aterramento.
- **Itens citados:** 10.13.1
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-fe147d · F6 · Desenergização · erro de ordem
- **Erro:** Impedimento antes da constatação
- **Explicação:** No 10.13.1, a constatação da ausência de tensão (alínea b) vem antes do impedimento de reenergização (alínea c).
- **Itens citados:** 10.13.1
- **Situação:** a validar

### V-de333a · F7 · Evento · achar o objeto
- **Situação:** Bruno vai começar o reaperto quando Ana lembra: o QGBT tem um gerador de emergência com QTA. Se faltar energia na fábrica, o gerador parte sozinho e alimenta o barramento de 380 V, ligado ao secundário do TR-01.
- **Tarefa:** Clique onde a equipe precisa agir antes de tocar nas buchas.
- **Resposta do simulador:** QGBT 380 V, Gerador de emergência com QTA
- **Explicação:** Bloquear também o lado de 380 V. Alimentado pelo lado de 380 V, o transformador eleva a tensão de volta a 13,8 kV nas buchas de MT (backfeed). Enquanto a instalação puder ser energizada por qualquer meio, valem as regras do capítulo 10.14 (10.5.2), e a organização garante o estado desenergizado durante todo o serviço (10.13.3). A equipe abre e bloqueia a chave do QGBT que alimenta o TR-01. [INTERPRETAÇÃO: aplicar o 10.13.1 a todas as fontes.]
- **Itens citados:** 10.5.2 · 10.13.3 · 10.13.1
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-4258b5 · F8 · Reenergização · sequência do 10.13.2
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

### V-3ea7d6 · F8 · Reenergização · erro de ordem
- **Erro:** Religamento com aterramento instalado
- **Explicação:** Fechar o circuito com o aterramento temporário ligado põe a fonte em curto franco. Não seguir a sequência de reenergização é condição de grave e iminente risco (10.16.1 b).
- **Itens citados:** 10.13.2 · 10.16.1
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-df08a1 · F8 · Reenergização · erro de ordem
- **Erro:** Disjuntor antes da seccionadora
- **Explicação:** A seccionadora fecha primeiro, sem carga; depois o disjuntor estabelece a corrente.
- **Itens citados:** 10.13.2 · 10.6.5
- **Situação:** a validar

### V-3adfd6 · F8 · Reenergização · erro de ordem
- **Erro:** Aterramento retirado cedo
- **Explicação:** Na sequência do 10.13.2, o aterramento sai só na alínea d, depois de retirar delimitação, ferramentas e pessoas não envolvidas.
- **Itens citados:** 10.13.2
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

## 4. História: objetos da cena

O que cada objeto é e quais itens se aplicam a ele ("Explorar a cena").

### V-780043 · Objeto · Porta da cabine
- **Texto do simulador:** Local de serviço elétrico: uso exclusivo, proibido guardar objetos (10.12.8). Sinalização de advertência e de restrição de acesso (10.7.7).
- **Itens citados:** 10.12.8 · 10.7.7
- **Situação:** a validar

### V-e6aa6f · Objeto · Quadro de documentos (PT e unifilar)
- **Texto do simulador:** A PT fica disponível no local do serviço e, no fim, é encerrada e arquivada (10.7.2.3). O projeto fica disponível aos trabalhadores autorizados e atualizado (10.4.7, 10.4.13).
- **Itens citados:** 10.7.2.3 · 10.4.7 · 10.4.13
- **Situação:** a validar

### V-8296d6 · Objeto · Extintor de CO₂
- **Texto do simulador:** A proteção contra incêndio segue a NR-23, citada no 10.6.6. A NR-10 de 2026 não tem item próprio sobre extintor.
- **Itens citados:** 10.6.6 · NR-23
- **Situação:** a validar

### V-20c7ce · Objeto · Cubículo de entrada · barramento 13,8 kV
- **Texto do simulador:** Lado da fonte: continua energizado mesmo com o 52-1 e a 89-1 abertos. Para 13,8 kV, Rr = 0,38 m e Rc = 1,38 m (Anexo II).
- **Itens citados:** AII · g-zr · g-zc
- **Situação:** a validar

### V-74206c · Objeto · Indicador de presença de tensão (VPIS)
- **Texto do simulador:** Os LEDs indicam tensão na saída da 89-1, mas não substituem a constatação com detector testado (10.13.1 b). [PRÁTICA: o LED pode estar queimado.]
- **Itens citados:** 10.13.1 · 10.12.6.1
- **Alertas:** prática de campo
- **Situação:** a validar

### V-6ed9a3 · Objeto · Seccionadora 89-1
- **Texto do simulador:** Seccionamento com abertura visível (10.13.1 a). O projeto especifica dispositivo com recurso para impedimento de reenergização e sinalização (10.4.1) e, se possível, de ação simultânea (10.4.2).
- **Itens citados:** 10.13.1 · 10.4.1 · 10.4.2
- **Situação:** a validar

### V-01d056 · Objeto · Disjuntor 52-1
- **Texto do simulador:** Interrompe a corrente de carga; por isso abre antes da seccionadora. Dispositivo de abertura sob carga é proteção coletiva contra arco (10.6.5 c). Lâmpada vermelha = ligado, verde = desligado [PRÁTICA].
- **Itens citados:** 10.6.5 · 10.13.1
- **Alertas:** mecanismo físico · prática de campo
- **Situação:** a validar

### V-d4b365 · Objeto · TR-01 · ponto de trabalho
- **Texto do simulador:** Transformador de 1000 kVA, 13,8 kV/380 V. Desligado não é desenergizado: enquanto puder ser energizado por qualquer meio, valem as regras do capítulo 10.14 (10.5.2).
- **Itens citados:** 10.5.2 · 10.13.1
- **Situação:** a validar

### V-5bf83a · Objeto · Barra de terra
- **Texto do simulador:** O projeto prevê condições para o aterramento temporário (10.4.6) e define o esquema de aterramento (10.4.4).
- **Itens citados:** 10.4.6 · 10.4.4
- **Situação:** a validar

### V-951c78 · Objeto · QGBT 380 V
- **Texto do simulador:** Painel com porta mantida fechada fora de intervenção e sinalização do nível de tensão, de choque e de arco (10.7.7.1).
- **Itens citados:** 10.7.7.1
- **Situação:** a validar

### V-22e14b · Objeto · Gerador de emergência com QTA
- **Texto do simulador:** Fonte própria: pode energizar a instalação pelo lado de 380 V. A geração própria também não pode energizar instalações de outras organizações (10.14.5).
- **Itens citados:** 10.14.5 · 10.5.2
- **Situação:** a validar

### V-f0e752 · Objeto · Tapete isolante
- **Texto do simulador:** Isolação no piso diante dos cubículos [PRÁTICA]. Equipamentos isolantes passam por ensaio dielétrico (10.14.4).
- **Itens citados:** 10.14.4 · 10.6.2
- **Alertas:** prática de campo
- **Situação:** a validar

### V-5d7c1d · Objeto · Detector de tensão por aproximação (MT)
- **Texto do simulador:** Adequado à tensão e à classe de isolação, com categoria compatível com surtos e aferido (10.12.6.1). Testado numa fonte conhecida antes do uso [PRÁTICA].
- **Itens citados:** 10.12.6.1 · 10.13.1
- **Alertas:** prática de campo
- **Situação:** a validar

### V-57c2ad · Objeto · Conjunto de aterramento temporário
- **Texto do simulador:** Grampos e cabos para aterrar e equipotencializar as fases (10.13.1 d). O ferramental isolante passa por ensaio (10.14.4).
- **Itens citados:** 10.13.1 · 10.14.4
- **Situação:** a validar

### V-920745 · Objeto · Cadeado pessoal
- **Texto do simulador:** Impedimento de reenergização (10.13.1 c). Só quem colocou o cadeado o retira [PRÁTICA].
- **Itens citados:** 10.13.1 · 10.7.7
- **Alertas:** prática de campo
- **Situação:** a validar

### V-7766b3 · Objeto · Etiqueta de impedimento
- **Texto do simulador:** Sinalização de impedimento de reenergização (10.13.1 f; 10.7.7 e).
- **Itens citados:** 10.13.1 · 10.7.7
- **Situação:** a validar

### V-72d3e1 · Objeto · Anteparo isolante
- **Texto do simulador:** Protege os elementos que continuam energizados na zona controlada e os trabalhadores contra o arco (10.13.1 e). Barreira é proteção básica (10.6.2 b).
- **Itens citados:** 10.13.1 · 10.6.2 · AII
- **Situação:** a validar

### V-d2ae85 · Objeto · Cones e corrente
- **Texto do simulador:** Delimitação e sinalização da área de trabalho (10.13.1 g; 10.7.7 d).
- **Itens citados:** 10.13.1 · 10.7.7
- **Situação:** a validar

### V-538430 · Objeto · Luvas isolantes
- **Texto do simulador:** Ensaio dielétrico no menor prazo entre regulamento, fabricante e critério do PLH; sem previsão, anual (10.14.4, 10.14.4.1).
- **Itens citados:** 10.14.4 · 10.14.4.1
- **Situação:** a validar

### V-bbd45a · Objeto · Vestimenta contra arco
- **Texto do simulador:** Escolhida pelos Quadros do Anexo IV (10.11.2). A indumentária não pode ter material condutível (10.7.8.1).
- **Itens citados:** 10.11.2 · AIV-III · 10.7.8.1
- **Situação:** a validar

### V-b9a30b · Objeto · Ana · engenheira eletricista (PLH)
- **Texto do simulador:** Qualificada em curso da área elétrica e com registro no conselho de classe: é PLH (10.8.2). ASO apto e treinamentos em dia: pode ser autorizada (10.10.2.1).
- **Itens citados:** 10.8.2 · 10.10.2.1
- **Situação:** a validar

### V-4c011e · Objeto · Bruno · técnico em eletrotécnica
- **Texto do simulador:** Trabalhador qualificado (10.8.1), com exame de saúde (10.7.5) e treinamentos em dia.
- **Itens citados:** 10.8.1 · 10.7.5
- **Situação:** a validar

### V-b57b92 · Objeto · Caio · capacitado em outra empresa
- **Texto do simulador:** A capacitação só vale para a organização que capacitou e nas condições do PLH responsável (10.8.3.3).
- **Itens citados:** 10.8.3.3
- **Situação:** a validar

### V-83c175 · Objeto · Pintor terceirizado
- **Texto do simulador:** Atividade não elétrica na vizinhança da zona controlada: análise de risco e instrução formal (10.14.1.2).
- **Itens citados:** 10.14.1.2
- **Situação:** a validar

### V-2e287b · Objeto · Escada de alumínio
- **Texto do simulador:** Extensão condutora: entrar na zona controlada com ela é trabalho em proximidade (10.2.2; glossário).
- **Itens citados:** 10.2.2 · g-prox
- **Situação:** a validar

### V-a29d55 · Objeto · Ferramentas do reaperto
- **Texto do simulador:** Na reenergização, ferramentas, utensílios e equipamentos são retirados antes de remover o aterramento (10.13.2 b).
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-234ab9 · Objeto · Davi · mecânico de manutenção
- **Texto do simulador:** Não participa da reenergização: sai das imediações (10.13.2 c).
- **Itens citados:** 10.13.2
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

### V-c6b665 · Gerador · Faixas de tensão
- **Pergunta:** Tensão de 110 V em corrente alternada, entre fases. Em que faixa ela está pelo glossário da NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) MT
  - B) EBT
  - **✔** C) BT
  - D) AT
- **Explicação:** BT: tensão superior a 50 V CA (120 V CC) e igual ou inferior a 1.000 V CA (1.500 V CC). Repare nas fronteiras: o limite superior de cada faixa é "igual ou inferior".
- **Itens citados:** g-bt
- **Situação:** a validar

### V-c53e93 · Gerador · Faixas de tensão
- **Pergunta:** Tensão de 220 V em corrente alternada, entre fases. Em que faixa ela está pelo glossário da NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) EBT
  - B) AT
  - C) MT
  - **✔** D) BT
- **Explicação:** BT: tensão superior a 50 V CA (120 V CC) e igual ou inferior a 1.000 V CA (1.500 V CC). Repare nas fronteiras: o limite superior de cada faixa é "igual ou inferior".
- **Itens citados:** g-bt
- **Situação:** a validar

### V-6a4251 · Gerador · Faixas de tensão
- **Pergunta:** Tensão de 500 kV em corrente alternada, entre fases. Em que faixa ela está pelo glossário da NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) EBT
  - B) BT
  - **✔** C) AT
  - D) MT
- **Explicação:** AT: tensão superior a 36.200 V CA ou 3.000 V CC. Repare nas fronteiras: o limite superior de cada faixa é "igual ou inferior".
- **Itens citados:** g-at
- **Situação:** a validar

### V-4c8baf · Gerador · Faixas de tensão
- **Pergunta:** Tensão de 69 kV em corrente alternada, entre fases. Em que faixa ela está pelo glossário da NR-10?
- **Alternativas** (✔ = resposta do simulador):
  - A) MT
  - B) EBT
  - C) BT
  - **✔** D) AT
- **Explicação:** AT: tensão superior a 36.200 V CA ou 3.000 V CC. Repare nas fronteiras: o limite superior de cada faixa é "igual ou inferior".
- **Itens citados:** g-at
- **Situação:** a validar

### V-6e8151 · Gerador · Zonas (Anexo II)
- **Pergunta:** Instalação de 36 kV (tensão nominal entre fases). Quais são os raios da zona de risco e da zona controlada pelo Anexo II?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Rr = 0,63 m · Rc = 1,63 m
  - B) Rr = 0,90 m · Rc = 1,90 m
  - C) Rr = 0,56 m · Rc = 1,56 m
  - D) Rr = 0,83 m · Rc = 1,83 m
  - E) Rr = 0,58 m · Rc = 1,58 m
- **Explicação:** Linha ≥ 36 e < 45 kV do Anexo II. Fronteira: o limite inferior entra na faixa (≥) e o superior não (<).
- **Itens citados:** AII
- **Situação:** a validar

### V-5d14d9 · Gerador · Zonas (Anexo II)
- **Pergunta:** Instalação de 13,8 kV (tensão nominal entre fases). Quais são os raios da zona de risco e da zona controlada pelo Anexo II?
- **Alternativas** (✔ = resposta do simulador):
  - A) Rr = 0,56 m · Rc = 1,56 m
  - B) Rr = 0,25 m · Rc = 1,25 m
  - **✔** C) Rr = 0,38 m · Rc = 1,38 m
  - D) Rr = 0,40 m · Rc = 1,40 m
  - E) Rr = 0,35 m · Rc = 1,35 m
- **Explicação:** Linha ≥ 10 e < 15 kV do Anexo II. Fronteira: o limite inferior entra na faixa (≥) e o superior não (<).
- **Itens citados:** AII
- **Situação:** a validar

### V-5d76d4 · Gerador · Zonas (Anexo II)
- **Pergunta:** Instalação de 23 kV (tensão nominal entre fases). Quais são os raios da zona de risco e da zona controlada pelo Anexo II?
- **Alternativas** (✔ = resposta do simulador):
  - A) Rr = 0,40 m · Rc = 1,40 m
  - B) Rr = 0,58 m · Rc = 1,58 m
  - C) Rr = 0,38 m · Rc = 1,38 m
  - D) Rr = 0,63 m · Rc = 1,63 m
  - **✔** E) Rr = 0,56 m · Rc = 1,56 m
- **Explicação:** Linha ≥ 20 e < 30 kV do Anexo II. Fronteira: o limite inferior entra na faixa (≥) e o superior não (<).
- **Itens citados:** AII
- **Situação:** a validar

### V-6c73a5 · Gerador · Zonas (Anexo II)
- **Pergunta:** Instalação de 138 kV (tensão nominal entre fases). Quais são os raios da zona de risco e da zona controlada pelo Anexo II?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Rr = 1,20 m · Rc = 3,20 m
  - B) Rr = 1,10 m · Rc = 3,10 m
  - C) Rr = 1,00 m · Rc = 2,00 m
- **Explicação:** Linha ≥ 132 e < 150 kV do Anexo II. Fronteira: o limite inferior entra na faixa (≥) e o superior não (<).
- **Itens citados:** AII
- **Situação:** a validar

### V-615bb7 · Gerador · Treinamentos (Quadro I)
- **Pergunta:** Eletricista autorizado de uma distribuidora (SEP) que também atua em área classificada. Qual é a carga horária mínima total dos treinamentos iniciais?
- **Alternativas** (✔ = resposta do simulador):
  - A) 72 h
  - B) 16 h
  - C) 120 h
  - **✔** D) 96 h
  - E) 56 h
- **Explicação:** Básico 40 h + Complementar do SEP 40 h + Complementar de Área Classificada 16 h. Cargas do Quadro I do 10.9.2.
- **Itens citados:** 10.9.2 · 10.9.4 · 10.9.5 · 10.9.7
- **Situação:** a validar

### V-89fcb4 · Gerador · Treinamentos (Quadro I)
- **Pergunta:** Eletricista autorizado de uma indústria (SEC) que só trabalha em baixa tensão. Qual é a carga horária mínima total dos treinamentos iniciais?
- **Alternativas** (✔ = resposta do simulador):
  - A) 80 h
  - B) 120 h
  - **✔** C) 40 h
  - D) 96 h
  - E) 8 h
- **Explicação:** Básico 40 h. Cargas do Quadro I do 10.9.2.
- **Itens citados:** 10.9.2 · 10.9.4
- **Situação:** a validar

### V-4efac7 · Gerador · Treinamentos (Quadro I)
- **Pergunta:** Eletricista autorizado de uma distribuidora (SEP). Qual é a carga horária mínima total dos treinamentos iniciais?
- **Alternativas** (✔ = resposta do simulador):
  - A) 16 h
  - B) 72 h
  - C) 120 h
  - **✔** D) 80 h
  - E) 40 h
- **Explicação:** Básico 40 h + Complementar do SEP 40 h. Cargas do Quadro I do 10.9.2.
- **Itens citados:** 10.9.2 · 10.9.4 · 10.9.5
- **Situação:** a validar

### V-961b46 · Gerador · Treinamentos (Quadro I)
- **Pergunta:** Eletricista autorizado de uma indústria (SEC) que opera a cabine primária de 13,8 kV. Qual é a carga horária mínima total dos treinamentos iniciais?
- **Alternativas** (✔ = resposta do simulador):
  - A) 72 h
  - **✔** B) 56 h
  - C) 16 h
  - D) 80 h
  - E) 120 h
- **Explicação:** Básico 40 h + Complementar de Média e Alta Tensão - SEC 16 h. Cargas do Quadro I do 10.9.2.
- **Itens citados:** 10.9.2 · 10.9.4 · 10.9.6
- **Situação:** a validar

### V-be2df6 · Gerador · Categoria de arco (CA)
- **Pergunta:** Aparelhagem de distribuição de 600 V (com disjuntores de potência ou interruptores com fusível) e quadros de distribuição de 600 V: corrente de falha disponível de 35 kA, tempo de eliminação de 0,50 s, distância de trabalho de 455 mm. Qual é a categoria de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 2
  - B) Fora do Anexo IV: fazer estudo de energia incidente
  - **✔** C) Categoria 4
  - D) Categoria 1
  - E) Categoria 3
- **Explicação:** Dentro da linha do Quadro I (até 35 kA, até 0,50 s, a partir de 455 mm): Categoria 4. Valores menores de corrente e tempo, ou distância maior, continuam dentro da linha.
- **Itens citados:** AIV-I · 10.11.2.1
- **Situação:** a validar

### V-43f0b1 · Gerador · Categoria de arco (CA)
- **Pergunta:** Outro equipamento de 1 kV a 15 kV: corrente de falha disponível de 28 kA, tempo de eliminação de 0,24 s, distância de trabalho de 1060 mm. Qual é a categoria de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Categoria 4
  - B) Categoria 1
  - C) Categoria 3
  - D) Fora do Anexo IV: fazer estudo de energia incidente
  - E) Categoria 2
- **Explicação:** Dentro da linha do Quadro I (até 35 kA, até 0,24 s, a partir de 910 mm): Categoria 4. Valores menores de corrente e tempo, ou distância maior, continuam dentro da linha.
- **Itens citados:** AIV-I · 10.11.2.1
- **Situação:** a validar

### V-7da979 · Gerador · Categoria de arco (CA)
- **Pergunta:** Painel ou outro equipamento com classificação superior a 240 V e até 600 V: corrente de falha disponível de 25 kA, tempo de eliminação de 0,06 s, distância de trabalho de 455 mm. Qual é a categoria de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 3
  - **✔** B) Fora do Anexo IV: fazer estudo de energia incidente
  - C) Categoria 1
  - D) Categoria 2
  - E) Categoria 4
- **Explicação:** O parâmetro de tempo saiu da linha do Quadro I. Corrente maior, tempo maior ou distância menor impede o Anexo IV; vale o estudo de energia incidente.
- **Itens citados:** 10.11.2.2 · 10.11.2.3 · AIV-I
- **Situação:** a validar

### V-e12be4 · Gerador · Categoria de arco (CA)
- **Pergunta:** Partida de motor NEMA E2 (contator com fusível), 2,3 kV a 7,2 kV: corrente de falha disponível de 35 kA, tempo de eliminação de 0,24 s, distância de trabalho de 910 mm. Qual é a categoria de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 3
  - B) Categoria 2
  - C) Categoria 1
  - **✔** D) Categoria 4
  - E) Fora do Anexo IV: fazer estudo de energia incidente
- **Explicação:** Dentro da linha do Quadro I (até 35 kA, até 0,24 s, a partir de 910 mm): Categoria 4. Valores menores de corrente e tempo, ou distância maior, continuam dentro da linha.
- **Itens citados:** AIV-I · 10.11.2.1
- **Situação:** a validar

### V-a3a98b · Gerador · Categoria de arco (CC)
- **Pergunta:** Banco de baterias de 220 V CC, corrente de curto-circuito disponível de 2,7 kA, arco de até 2 s a 455 mm. Qual é a categoria de EPI pelo Quadro II do Anexo IV?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 4
  - B) Categoria 3
  - **✔** C) Categoria 2
  - D) Categoria 1
- **Explicação:** Quadro II (CC, acima de 150 V e até 600 V): abaixo de 3 kA → Cat. 2; de 3 a menos de 7 kA → Cat. 3; de 7 a menos de 10 kA → Cat. 4.
- **Itens citados:** AIV-II
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-e11a31 · Gerador · Categoria de arco (CC)
- **Pergunta:** Banco de baterias de 600 V CC, corrente de curto-circuito disponível de 9,8 kA, arco de até 2 s a 455 mm. Qual é a categoria de EPI pelo Quadro II do Anexo IV?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 3
  - B) Categoria 2
  - C) Categoria 1
  - **✔** D) Categoria 4
- **Explicação:** Quadro II (CC, acima de 150 V e até 600 V): abaixo de 3 kA → Cat. 2; de 3 a menos de 7 kA → Cat. 3; de 7 a menos de 10 kA → Cat. 4.
- **Itens citados:** AIV-II
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-ffa7b7 · Gerador · Categoria de arco (CC)
- **Pergunta:** Banco de baterias de 400 V CC, corrente de curto-circuito disponível de 3,8 kA, arco de até 2 s a 455 mm. Qual é a categoria de EPI pelo Quadro II do Anexo IV?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 4
  - B) Categoria 2
  - C) Categoria 1
  - **✔** D) Categoria 3
- **Explicação:** Quadro II (CC, acima de 150 V e até 600 V): abaixo de 3 kA → Cat. 2; de 3 a menos de 7 kA → Cat. 3; de 7 a menos de 10 kA → Cat. 4.
- **Itens citados:** AIV-II
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-bb0a38 · Gerador · Categoria de arco (CC)
- **Pergunta:** Banco de baterias de 220 V CC, corrente de curto-circuito disponível de 2,0 kA, arco de até 2 s a 455 mm. Qual é a categoria de EPI pelo Quadro II do Anexo IV?
- **Alternativas** (✔ = resposta do simulador):
  - A) Categoria 4
  - **✔** B) Categoria 2
  - C) Categoria 3
  - D) Categoria 1
- **Explicação:** Quadro II (CC, acima de 150 V e até 600 V): abaixo de 3 kA → Cat. 2; de 3 a menos de 7 kA → Cat. 3; de 7 a menos de 10 kA → Cat. 4.
- **Itens citados:** AIV-II
- **Alertas:** mecanismo físico
- **Situação:** a validar

### V-7f157f · Gerador · Vestimenta (cal/cm²)
- **Pergunta:** Qual é a resistência mínima ao arco (ATPV ou EBT) da vestimenta da Categoria 2 de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - A) 40 cal/cm²
  - **✔** B) 8 cal/cm²
  - C) 4 cal/cm²
  - D) 12 cal/cm²
  - E) 25 cal/cm²
- **Explicação:** Quadro III do Anexo IV: Cat. 1 = 4; Cat. 2 = 8; Cat. 3 = 25; Cat. 4 = 40 cal/cm².
- **Itens citados:** AIV-III
- **Situação:** a validar

### V-50e8c8 · Gerador · Vestimenta (cal/cm²)
- **Pergunta:** Qual é a resistência mínima ao arco (ATPV ou EBT) da vestimenta da Categoria 1 de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - A) 12 cal/cm²
  - B) 40 cal/cm²
  - C) 25 cal/cm²
  - **✔** D) 4 cal/cm²
  - E) 8 cal/cm²
- **Explicação:** Quadro III do Anexo IV: Cat. 1 = 4; Cat. 2 = 8; Cat. 3 = 25; Cat. 4 = 40 cal/cm².
- **Itens citados:** AIV-III
- **Situação:** a validar

### V-e82224 · Gerador · Vestimenta (cal/cm²)
- **Pergunta:** Qual é a resistência mínima ao arco (ATPV ou EBT) da vestimenta da Categoria 4 de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - A) 12 cal/cm²
  - B) 4 cal/cm²
  - C) 8 cal/cm²
  - D) 25 cal/cm²
  - **✔** E) 40 cal/cm²
- **Explicação:** Quadro III do Anexo IV: Cat. 1 = 4; Cat. 2 = 8; Cat. 3 = 25; Cat. 4 = 40 cal/cm².
- **Itens citados:** AIV-III
- **Situação:** a validar

### V-94f285 · Gerador · Vestimenta (cal/cm²)
- **Pergunta:** Qual é a resistência mínima ao arco (ATPV ou EBT) da vestimenta da Categoria 3 de EPI?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) 25 cal/cm²
  - B) 40 cal/cm²
  - C) 12 cal/cm²
  - D) 8 cal/cm²
  - E) 4 cal/cm²
- **Explicação:** Quadro III do Anexo IV: Cat. 1 = 4; Cat. 2 = 8; Cat. 3 = 25; Cat. 4 = 40 cal/cm².
- **Itens citados:** AIV-III
- **Situação:** a validar

### V-216594 · Gerador · Sequências (10.13)
- **Pergunta:** Qual é a primeira etapa da sequência de desenergização do 10.13.1?
- **Alternativas** (✔ = resposta do simulador):
  - A) impedimento de reenergização
  - **✔** B) seccionamento ou desligamento
  - C) proteção dos elementos energizados existentes na zona controlada (Anexo II desta NR) e proteção dos trabalhadores para os efeitos do arco elétrico
  - D) instalação da sinalização de impedimento de reenergização
  - E) delimitação e sinalização da área de trabalho
- **Explicação:** 10.13.1, alínea a.
- **Itens citados:** 10.13.1
- **Situação:** a validar

### V-6aa5b1 · Gerador · Sequências (10.13)
- **Pergunta:** Na sequência de reenergização do 10.13.2, qual etapa vem logo depois de “retirada dos obstáculos de delimitação e sinalização do espaço seguro de trabalho”?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) retirada das ferramentas, utensílios e equipamentos
  - B) remoção do aterramento temporário e da equipotencialização
  - C) retirada das proteções dos elementos energizados nas imediações
  - D) remoção da sinalização de impedimento de reenergização
  - E) desbloqueio, se houver, e religamento dos dispositivos de seccionamento
- **Explicação:** Alínea a → alínea b do 10.13.2.
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-b43e69 · Gerador · Sequências (10.13)
- **Pergunta:** Qual é a alínea “d” da sequência de desenergização do 10.13.1?
- **Alternativas** (✔ = resposta do simulador):
  - A) proteção dos elementos energizados existentes na zona controlada (Anexo II desta NR) e proteção dos trabalhadores para os efeitos do arco elétrico
  - B) constatação da ausência de tensão
  - C) delimitação e sinalização da área de trabalho
  - **✔** D) constatação de ausência de tensão para a instalação de aterramento temporário com equipotencialização dos condutores dos circuitos
  - E) impedimento de reenergização
- **Explicação:** 10.13.1, alínea d.
- **Itens citados:** 10.13.1
- **Situação:** a validar

### V-c66dbc · Gerador · Sequências (10.13)
- **Pergunta:** Qual é a primeira etapa da sequência de reenergização do 10.13.2?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) retirada dos obstáculos de delimitação e sinalização do espaço seguro de trabalho
  - B) remoção do aterramento temporário e da equipotencialização
  - C) remoção da sinalização de impedimento de reenergização
  - D) retirada das imediações de todos os trabalhadores não envolvidos no processo de reenergização
  - E) retirada das proteções dos elementos energizados nas imediações
- **Explicação:** 10.13.2, alínea a.
- **Itens citados:** 10.13.2
- **Situação:** a validar

### V-cd5468 · Gerador · PIE (10.15.6)
- **Pergunta:** Distribuidora de energia elétrica. A organização é obrigada a manter o PIE?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Sim: integra o SEP ou realiza atividades em média ou alta tensão
  - B) Não: não integra o SEP nem realiza atividades em média ou alta tensão
  - C) Sim: por causa da carga instalada
- **Explicação:** O 10.15.6 exige o PIE de quem integra o SEP ou realiza atividades em instalações com média e alta tensão. Carga instalada não é critério.
- **Itens citados:** 10.15.6
- **Situação:** a validar

### V-cef93c · Gerador · PIE (10.15.6)
- **Pergunta:** Condomínio residencial alimentado em 220/127 V, com um eletricista próprio. A organização é obrigada a manter o PIE?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não: não integra o SEP nem realiza atividades em média ou alta tensão
  - B) Sim: por causa da carga instalada
  - C) Sim: integra o SEP ou realiza atividades em média ou alta tensão
- **Explicação:** O 10.15.6 exige o PIE de quem integra o SEP ou realiza atividades em instalações com média e alta tensão. Carga instalada não é critério. Quem tem autorizados mantém a documentação do 10.15.4 mesmo sem PIE.
- **Itens citados:** 10.15.6
- **Situação:** a validar

### V-477df9 · Gerador · PIE (10.15.6)
- **Pergunta:** Indústria com cabine primária de 13,8 kV operada pelos próprios eletricistas. A organização é obrigada a manter o PIE?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Sim: integra o SEP ou realiza atividades em média ou alta tensão
  - B) Não: não integra o SEP nem realiza atividades em média ou alta tensão
  - C) Sim: por causa da carga instalada
- **Explicação:** O 10.15.6 exige o PIE de quem integra o SEP ou realiza atividades em instalações com média e alta tensão. Carga instalada não é critério.
- **Itens citados:** 10.15.6
- **Situação:** a validar

### V-cc4d2a · Gerador · PIE (10.15.6)
- **Pergunta:** Supermercado com 750 kW instalados, alimentado em 380 V, sem atividade em média tensão. A organização é obrigada a manter o PIE?
- **Alternativas** (✔ = resposta do simulador):
  - A) Sim: por causa da carga instalada
  - B) Sim: integra o SEP ou realiza atividades em média ou alta tensão
  - **✔** C) Não: não integra o SEP nem realiza atividades em média ou alta tensão
- **Explicação:** O 10.15.6 exige o PIE de quem integra o SEP ou realiza atividades em instalações com média e alta tensão. Carga instalada não é critério. Quem tem autorizados mantém a documentação do 10.15.4 mesmo sem PIE.
- **Itens citados:** 10.15.6
- **Situação:** a validar

### V-2b79c7 · Gerador · Trabalho individual (10.14.2)
- **Pergunta:** Manobra numa subestação de 69 kV da distribuidora (SEP). Um trabalhador pode fazer o serviço sozinho?
- **Alternativas** (✔ = resposta do simulador):
  - A) O 10.14.2 não proíbe; a análise de risco decide
  - **✔** B) Não pode ser feito individualmente
  - C) Pode, se o trabalhador for PLH
- **Explicação:** O 10.14.2 veda o trabalho individual em serviços em instalações energizadas em média e alta tensão e em todos os serviços executados no SEP. Fora disso, a decisão sai da análise de risco.
- **Itens citados:** 10.14.2 · 10.7.3
- **Situação:** a validar

### V-bad84c · Gerador · Trabalho individual (10.14.2)
- **Pergunta:** Troca de isolador numa rede de distribuição de 13,8 kV energizada. Um trabalhador pode fazer o serviço sozinho?
- **Alternativas** (✔ = resposta do simulador):
  - A) O 10.14.2 não proíbe; a análise de risco decide
  - **✔** B) Não pode ser feito individualmente
  - C) Pode, se o trabalhador for PLH
- **Explicação:** O 10.14.2 veda o trabalho individual em serviços em instalações energizadas em média e alta tensão e em todos os serviços executados no SEP. Fora disso, a decisão sai da análise de risco.
- **Itens citados:** 10.14.2 · 10.7.3
- **Situação:** a validar

### V-44563f · Gerador · Trabalho individual (10.14.2)
- **Pergunta:** Ajuste dentro de um cubículo de 13,8 kV energizado de uma indústria (SEC). Um trabalhador pode fazer o serviço sozinho?
- **Alternativas** (✔ = resposta do simulador):
  - A) Pode, se o trabalhador for PLH
  - B) O 10.14.2 não proíbe; a análise de risco decide
  - **✔** C) Não pode ser feito individualmente
- **Explicação:** O 10.14.2 veda o trabalho individual em serviços em instalações energizadas em média e alta tensão e em todos os serviços executados no SEP. Fora disso, a decisão sai da análise de risco.
- **Itens citados:** 10.14.2 · 10.7.3
- **Situação:** a validar

### V-e1b5df · Gerador · Trabalho individual (10.14.2)
- **Pergunta:** Medição num painel de 440 V energizado de um hospital (SEC). Um trabalhador pode fazer o serviço sozinho?
- **Alternativas** (✔ = resposta do simulador):
  - A) Não pode ser feito individualmente
  - **✔** B) O 10.14.2 não proíbe; a análise de risco decide
  - C) Pode, se o trabalhador for PLH
- **Explicação:** O 10.14.2 veda o trabalho individual em serviços em instalações energizadas em média e alta tensão e em todos os serviços executados no SEP. Fora disso, a decisão sai da análise de risco.
- **Itens citados:** 10.14.2 · 10.7.3
- **Situação:** a validar

### V-7cf276 · Gerador · Treinamento eventual
- **Pergunta:** Eletricista autorizado volta ao trabalho depois de 91 dias de afastamento. O periódico bienal está em dia. Ele precisa de treinamento eventual?
- **Alternativas** (✔ = resposta do simulador):
  - A) Só se o periódico bienal estiver vencido
  - **✔** B) Sim, treinamento eventual
  - C) Não
- **Explicação:** O 10.9.11 a exige treinamento eventual após afastamento ou inatividade por período superior a 90 dias, independentemente do periódico. 91 dias passa do limite.
- **Itens citados:** 10.9.11
- **Situação:** a validar

### V-b73cb9 · Gerador · Treinamento eventual
- **Pergunta:** Eletricista autorizado volta ao trabalho depois de 89 dias de afastamento. O periódico bienal está em dia. Ele precisa de treinamento eventual?
- **Alternativas** (✔ = resposta do simulador):
  - A) Só se o periódico bienal estiver vencido
  - B) Sim, treinamento eventual
  - **✔** C) Não
- **Explicação:** O 10.9.11 a exige treinamento eventual após afastamento ou inatividade por período superior a 90 dias, independentemente do periódico. 89 dias não passa do limite.
- **Itens citados:** 10.9.11
- **Situação:** a validar

### V-4d75ee · Gerador · Treinamento eventual
- **Pergunta:** Eletricista autorizado volta ao trabalho depois de 60 dias de afastamento. O periódico bienal está em dia. Ele precisa de treinamento eventual?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não
  - B) Só se o periódico bienal estiver vencido
  - C) Sim, treinamento eventual
- **Explicação:** O 10.9.11 a exige treinamento eventual após afastamento ou inatividade por período superior a 90 dias, independentemente do periódico. 60 dias não passa do limite.
- **Itens citados:** 10.9.11
- **Situação:** a validar

### V-1a51f8 · Gerador · Treinamento eventual
- **Pergunta:** Eletricista autorizado volta ao trabalho depois de 45 dias de afastamento. O periódico bienal está em dia. Ele precisa de treinamento eventual?
- **Alternativas** (✔ = resposta do simulador):
  - **✔** A) Não
  - B) Só se o periódico bienal estiver vencido
  - C) Sim, treinamento eventual
- **Explicação:** O 10.9.11 a exige treinamento eventual após afastamento ou inatividade por período superior a 90 dias, independentemente do periódico. 45 dias não passa do limite.
- **Itens citados:** 10.9.11
- **Situação:** a validar

### V-059353 · Gerador · Validade da PT
- **Pergunta:** Um serviço não rotineiro com PT vai continuar no turno seguinte, com a mesma equipe e sem mudança nas condições. O que a NR-10 prevê?
- **Alternativas** (✔ = resposta do simulador):
  - A) Precisa de nova permissão de trabalho
  - **✔** B) Pode ser revalidada pelo responsável pela autorização da PT
  - C) Continua válida até o fim do serviço, sem revalidação
- **Explicação:** Pelo 10.7.2.2, a PT vale pela duração da atividade, restrita ao turno, e pode ser revalidada quando não houver mudança nas condições estabelecidas nem em toda a equipe.
- **Itens citados:** 10.7.2.2
- **Situação:** a validar

### V-5aeabc · Gerador · Validade da PT
- **Pergunta:** Um serviço não rotineiro com PT vai continuar no turno seguinte, com toda a equipe trocada. O que a NR-10 prevê?
- **Alternativas** (✔ = resposta do simulador):
  - A) Pode ser revalidada pelo responsável pela autorização da PT
  - **✔** B) Precisa de nova permissão de trabalho
  - C) Continua válida até o fim do serviço, sem revalidação
- **Explicação:** Pelo 10.7.2.2, a PT vale pela duração da atividade, restrita ao turno, e pode ser revalidada quando não houver mudança nas condições estabelecidas nem em toda a equipe.
- **Itens citados:** 10.7.2.2
- **Situação:** a validar

### V-93b272 · Gerador · Validade da PT
- **Pergunta:** Um serviço não rotineiro com PT vai continuar no turno seguinte, depois que as condições estabelecidas na PT mudaram. O que a NR-10 prevê?
- **Alternativas** (✔ = resposta do simulador):
  - A) Pode ser revalidada pelo responsável pela autorização da PT
  - B) Continua válida até o fim do serviço, sem revalidação
  - **✔** C) Precisa de nova permissão de trabalho
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
