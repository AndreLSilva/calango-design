import type { ShapeType } from "$lib/editor/shapes/shapes.types";
import type { DrawModeType } from "$lib/editor/draw-mode/draw-mode.types";
import { writable } from "svelte/store";

export const selectedChar = writable<string>("x");
export const selectedColor = writable<[string, string]>(["", ""]);
export const selectedShape = writable<[ShapeType, number]>(["brush", 0]);
export const selectedDrawMode = writable<DrawModeType>("symbols");
