# Cena de fumaça (Etapa D)

Projeto Godot mínimo, fora do simulador, para provar o ambiente: ~200 peças low-poly de cor chapada, uma luz sem sombra e o painel previsto para o F3 (FPS, *draw calls*, primitivas, VRAM, GPU, renderizador). Comandos (variáveis do `CLAUDE.md` §5):

```bash
cd tools/ambiente/fumaca
"$GODOT" --headless --path . --import
mkdir -p build && "$GODOT" --headless --path . --export-release "Windows Desktop" build/fumaca.exe   # passo 33; precisa de --templates windows
../instalar_gdunit4.sh . && "$GODOT" --headless --path . --import && GODOT_BIN="$GODOT" addons/gdUnit4/runtest.sh --headless --ignoreHeadlessMode -a res://tests
LIBGL_ALWAYS_SOFTWARE=1 xvfb-run -a "$GODOT" --path . --rendering-driver opengl3 -- --shot=/tmp/fumaca.png
```

No notebook, o `.exe` grava `fps_avg_60s=...` no log depois de um minuto.
