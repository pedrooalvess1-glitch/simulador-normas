extends GdUnitTestSuite
## Prova que o gdUnit4 roda headless e que as APIs do painel F3 existem no Godot 4.7.2.

func test_diagnostics_apis_exist() -> void:
	assert_bool(RenderingServer.has_method("get_video_adapter_name")).is_true()
	assert_bool(RenderingServer.has_method("get_current_rendering_method")).is_true()
	assert_int(Performance.RENDER_VIDEO_MEM_USED).is_greater_equal(0)
	assert_int(Performance.RENDER_TOTAL_DRAW_CALLS_IN_FRAME).is_greater_equal(0)

func test_main_scene_builds() -> void:
	var main: Node3D = auto_free(load("res://main.tscn").instantiate())
	add_child(main)
	await get_tree().process_frame
	assert_int(main.get_child_count()).is_greater(10)
	assert_str(main.diagnostics_line()).contains("godot=4.7.2")
