extends GdUnitTestSuite
## Prova que o gdUnit4 roda headless no Godot 4.7.2 e transforma em teste as decisões de render
## (decisões 4 e 27, CLAUDE.md §1.8): Compatibility, MSAA de no máximo 2× no padrão (perfil Leve), luz sem sombra,
## cor sem textura.


func test_project_uses_compatibility_renderer() -> void:
	assert_str(ProjectSettings.get_setting("rendering/renderer/rendering_method")).is_equal("gl_compatibility")


func test_msaa_at_most_2x() -> void:
	# Configuração do projeto = perfil Leve. 0 = desligado, 1 = 2× (decisão 27)
	assert_int(ProjectSettings.get_setting("rendering/anti_aliasing/quality/msaa_3d", 0)).is_less_equal(Viewport.MSAA_2X)


func test_diagnostics_monitors_return_numbers() -> void:
	for monitor in [Performance.TIME_FPS, Performance.RENDER_TOTAL_DRAW_CALLS_IN_FRAME,
			Performance.RENDER_TOTAL_PRIMITIVES_IN_FRAME, Performance.RENDER_VIDEO_MEM_USED]:
		assert_float(Performance.get_monitor(monitor)).is_greater_equal(0.0)


func test_main_scene_follows_visual_style() -> void:
	var main: Node3D = auto_free(load("res://main.tscn").instantiate())
	add_child(main)
	await get_tree().process_frame
	assert_str(main.diagnostics_line()).contains("godot=4.7.2").contains("method=gl_compatibility")
	var lights := 0
	var materials := 0
	for node in main.find_children("*", "", true, false):
		if node is Light3D:
			lights += 1
			assert_bool((node as Light3D).shadow_enabled).override_failure_message("%s com sombra" % node.name).is_false()
		for mat in _materials_of(node):
			materials += 1
			assert_object(mat.albedo_texture).override_failure_message("%s com textura" % node.name).is_null()
	assert_int(lights).is_greater(0)
	assert_int(materials).is_greater(0)


func _materials_of(node: Node) -> Array[StandardMaterial3D]:
	var out: Array[StandardMaterial3D] = []
	var mesh: Mesh = null
	if node is MeshInstance3D:
		mesh = (node as MeshInstance3D).mesh
		if (node as MeshInstance3D).material_override is StandardMaterial3D:
			out.append((node as MeshInstance3D).material_override)
	elif node is MultiMeshInstance3D and (node as MultiMeshInstance3D).multimesh:
		mesh = (node as MultiMeshInstance3D).multimesh.mesh
	if mesh:
		for i in mesh.get_surface_count():
			if mesh.surface_get_material(i) is StandardMaterial3D:
				out.append(mesh.surface_get_material(i))
	return out
