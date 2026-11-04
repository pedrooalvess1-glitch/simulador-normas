extends Node3D
## Cena de fumaça: algumas centenas de peças low-poly, cor chapada, uma luz sem sombra,
## e o painel de diagnóstico (o mesmo conteúdo previsto para o F3 do simulador).

const GRID := 14  # 14 x 14 = 196 caixas instanciadas + 12 peças avulsas

var _panel: Label
var _cam: Camera3D
var _t := 0.0
var _fps_sum := 0.0
var _fps_n := 0
var _logged_minute := false


func _ready() -> void:
	_build_world()
	_build_panel()
	print(diagnostics_line())


func _build_world() -> void:
	var env := WorldEnvironment.new()
	env.environment = Environment.new()
	env.environment.background_mode = Environment.BG_COLOR
	env.environment.background_color = Color(0.82, 0.86, 0.9)
	env.environment.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
	env.environment.ambient_light_color = Color(0.6, 0.6, 0.6)
	add_child(env)

	var sun := DirectionalLight3D.new()
	sun.rotation_degrees = Vector3(-50, 30, 0)
	sun.shadow_enabled = false
	add_child(sun)

	var floor_mesh := MeshInstance3D.new()
	var plane := PlaneMesh.new()
	plane.size = Vector2(40, 40)
	floor_mesh.mesh = plane
	floor_mesh.material_override = _flat(Color(0.55, 0.55, 0.5))
	add_child(floor_mesh)

	var box := BoxMesh.new()
	box.size = Vector3(0.8, 1.2, 0.5)
	box.material = _flat(Color(0.75, 0.75, 0.78))
	var mm := MultiMesh.new()
	mm.transform_format = MultiMesh.TRANSFORM_3D
	mm.mesh = box
	mm.instance_count = GRID * GRID
	for i in GRID * GRID:
		var x := (i % GRID - GRID / 2.0) * 2.0
		var z := (i / GRID - GRID / 2.0) * 2.0
		mm.set_instance_transform(i, Transform3D(Basis(), Vector3(x, 0.6, z)))
	var mmi := MultiMeshInstance3D.new()
	mmi.multimesh = mm
	add_child(mmi)

	var colors := [Color.ORANGE_RED, Color.GOLD, Color.SEA_GREEN, Color.STEEL_BLUE]
	for i in 12:
		var cyl := MeshInstance3D.new()
		var m := CylinderMesh.new()
		m.radial_segments = 8
		m.top_radius = 0.15
		m.bottom_radius = 0.25
		m.height = 2.0
		cyl.mesh = m
		cyl.material_override = _flat(colors[i % colors.size()])
		cyl.position = Vector3(cos(i * TAU / 12) * 6, 1.0, sin(i * TAU / 12) * 6)
		add_child(cyl)

	_cam = Camera3D.new()
	add_child(_cam)


func _flat(c: Color) -> StandardMaterial3D:
	var mat := StandardMaterial3D.new()
	mat.albedo_color = c
	mat.roughness = 1.0
	return mat


func _build_panel() -> void:
	var layer := CanvasLayer.new()
	add_child(layer)
	_panel = Label.new()
	_panel.position = Vector2(12, 12)
	_panel.add_theme_font_size_override("font_size", 22)
	_panel.add_theme_color_override("font_color", Color.BLACK)
	layer.add_child(_panel)


func diagnostics_line() -> String:
	return "adapter=%s | vendor=%s | api=%s | method=%s | godot=%s" % [
		RenderingServer.get_video_adapter_name(),
		RenderingServer.get_video_adapter_vendor(),
		RenderingServer.get_video_adapter_api_version(),
		RenderingServer.get_current_rendering_method(),
		Engine.get_version_info().string,
	]


func _process(delta: float) -> void:
	_t += delta
	_cam.position = Vector3(cos(_t * 0.2) * 22, 9, sin(_t * 0.2) * 22)
	_cam.look_at(Vector3.ZERO)
	var fps: float = Performance.get_monitor(Performance.TIME_FPS)
	if _t > 2.0:
		_fps_sum += fps
		_fps_n += 1
	var avg: float = _fps_sum / maxi(_fps_n, 1)
	_panel.text = "FPS %d (média %d)\nDraw calls %d · primitivas %d\nVRAM %.1f MB\n%s\n%s" % [
		fps, avg,
		Performance.get_monitor(Performance.RENDER_TOTAL_DRAW_CALLS_IN_FRAME),
		Performance.get_monitor(Performance.RENDER_TOTAL_PRIMITIVES_IN_FRAME),
		Performance.get_monitor(Performance.RENDER_VIDEO_MEM_USED) / 1048576.0,
		RenderingServer.get_video_adapter_name(),
		RenderingServer.get_current_rendering_method(),
	]
	_maybe_shot()
	if _t > 60.0 and not _logged_minute:
		_logged_minute = true
		print("fps_avg_60s=%d | %s" % [avg, diagnostics_line()])


var _frames := 0

## Captura de cena: `godot --path . -- --shot=res_ou_caminho.png` salva o quadro 30 e sai.
func _maybe_shot() -> void:
	_frames += 1
	for arg in OS.get_cmdline_user_args():
		if arg.begins_with("--shot=") and _frames == 30:
			var path := arg.trim_prefix("--shot=")
			get_viewport().get_texture().get_image().save_png(path)
			print("shot=%s | %s" % [path, diagnostics_line()])
			get_tree().quit()
