import type { ShapeType } from "$lib/editor/shapes/shapes.types";
import type { ToolType } from "$lib/editor/tools/tools.types";
import { writable } from "svelte/store";

export const selectedChar = writable("x");
export const selectedColor = writable("#ffffff");
export const selectedShape = writable<[ShapeType, number]>(["brush", 0]);
export const selectedTool = writable<ToolType>("symbols");
