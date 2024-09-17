import type { DesignData } from "$lib/api/designs/designs.types";
import type { DrawModeType } from "$lib/editor/draw-mode/draw-mode.types";
import type { ShapeType } from "$lib/editor/shapes/shapes.types";
import { writable } from "svelte/store";

export const editorScreen = writable<"tools" | "settings">("tools");

// Tools
export const selectedChar = writable<string>("x");
export const selectedColor = writable<[string, string]>(["", ""]);
export const selectedShape = writable<[ShapeType, number]>(["brush", 0]);
export const selectedDrawMode = writable<DrawModeType>("symbols");

// Settings
export const designData = writable<DesignData | undefined>();
export const canvasW = writable<number>(0);
export const canvasH = writable<number>(0);
