"""Teste do pipeline de arte sem GPU: cubo low-poly de cor chapada → .glb + prévia .png.

Uso: <python do venv bpy> tools/ambiente/teste_blender.py <saida.glb> <saida.png>
Prova que o bpy exporta glTF e renderiza a prévia (motor Workbench, CPU) na sessão na nuvem.
"""
import math
import sys

import bpy

saida_glb, saida_png = sys.argv[-2], sys.argv[-1]
bpy.ops.wm.read_factory_settings(use_empty=True)

bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0, 0.5))
cubo = bpy.context.active_object
cubo.name = "cubo"
bpy.ops.object.origin_set(type="ORIGIN_CURSOR")  # origem no chão (z = 0), como pede o CLAUDE.md §6

def srgb_para_linear(hexa: str) -> tuple:
    """A paleta é escrita em hex sRGB (o que se vê na tela). O Blender e o glTF guardam cor linear,
    e o importador do Godot converte de volta para sRGB. Sem esta conversão a cor chega clara demais."""
    def canal(c: float) -> float:
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return tuple(canal(int(hexa[i:i + 2], 16) / 255) for i in (0, 2, 4)) + (1.0,)


COR_HEX = "e65a0d"  # laranja de teste
cor = srgb_para_linear(COR_HEX)
mat = bpy.data.materials.new("laranja_chapado")
mat.use_nodes = True
bsdf = mat.node_tree.nodes["Principled BSDF"]
bsdf.inputs["Base Color"].default_value = cor   # vai para o glTF
bsdf.inputs["Roughness"].default_value = 1.0
mat.diffuse_color = cor                          # é a cor que o Workbench mostra na prévia
cubo.data.materials.append(mat)

bpy.ops.export_scene.gltf(filepath=saida_glb, export_format="GLB", use_selection=True)

cena = bpy.context.scene
cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam"))
cena.collection.objects.link(cam)
cam.location = (2.2, -2.2, 1.8)
cam.rotation_euler = (math.radians(65), 0, math.radians(45))
cena.camera = cam
cena.render.engine = "BLENDER_WORKBENCH"
cena.display.shading.light = "STUDIO"
cena.display.shading.color_type = "MATERIAL"
cena.render.resolution_x, cena.render.resolution_y = 640, 480
cena.render.filepath = saida_png
bpy.ops.render.render(write_still=True)

triangulos = sum(len(p.vertices) - 2 for p in cubo.data.polygons)
print(f"bpy {bpy.app.version_string} · {triangulos} triângulos · {saida_glb} · {saida_png}")
