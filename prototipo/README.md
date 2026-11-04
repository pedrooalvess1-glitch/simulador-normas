# Protótipo three.js (Trilha 1)

Ferramenta de estudo da NR-10 (Portaria MTE 737/2026) enquanto o projeto Godot é construído.

```bash
python3 build.py && node --check bundle.js     # gera bundle.js e simulador-nr10.html (formato Artifact)
python3 build.py --offline                      # gera simulador-nr10-offline.html (three.js embutido)
cp simulador-nr10-offline.html dist/            # atualiza a versão baixável
python3 tools/teste_playwright.py               # teste headless (precisa de Playwright + Chromium)
```

Arquivos: `refs.js`/`refs2.js` (texto da norma), `engine.js` (motor 3D e interface), `qbank.js` (banco de questões, revisão espaçada, estatísticas), `mapa.js`, `m1.js`–`m8.js` (módulos), `missao.js`, `treino.js` (fase Treino), `main.js`. Detalhes em `docs/STATUS_SIMULADOR_NR10.md` §4–§6. Licença do three.js r128 em `vendor/THREE-LICENSE.txt` (MIT).
