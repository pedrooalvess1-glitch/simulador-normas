# simulador-normas

Simulador didático de normas regulamentadoras. Primeiro pacote: **NR-10**, na redação da **Portaria MTE 737/2026** (edição única). O conteúdo vem só do texto da NR-10.

## Estudar agora (Trilha 1, protótipo congelado)
Baixe e abra com duplo clique: [`prototipo/dist/simulador-nr10-offline.html`](prototipo/dist/simulador-nr10-offline.html).
Abre na fase **História**: quatro ordens de serviço contadas sobre o desenho da instalação (cabine primária de 13,8 kV, QDC de prédio comercial, canteiro de obra e rede de distribuição do SEP). A fase **Treino** tem simulado no estilo de banca (5 alternativas e o porquê de cada alternativa errada, com o item), revisão espaçada dos erros, gerador de questões e cartões de fatos. O botão **Progresso** exporta e importa o progresso em JSON, para levar a outro computador ou navegador.

## Projeto principal (Trilha 2, em planejamento)
Motor genérico em Godot 4.7.2 (`engine/`) + pacotes de conteúdo (`packs/`). Estado em [`docs/STATUS_SIMULADOR_NR10.md`](docs/STATUS_SIMULADOR_NR10.md); planejamento em [`docs/00_INDICE_E_DECISOES_INFRAESTRUTURA.md`](docs/00_INDICE_E_DECISOES_INFRAESTRUTURA.md).

## Desenvolvimento
Conduzido no Claude Code. Regras permanentes em [`CLAUDE.md`](CLAUDE.md); passos em [`docs/ROTEIRO.md`](docs/ROTEIRO.md).

## Validação do conteúdo
Tudo o que o software pergunta e responde, para conferir contra a NR-10: [`docs/VALIDACAO_DO_CONTEUDO.md`](docs/VALIDACAO_DO_CONTEUDO.md).

Texto da norma: Portaria MTE nº 737/2026 (DOU de 01/06/2026), cópia em `docs/referencias/`. Código sob licença MIT.
