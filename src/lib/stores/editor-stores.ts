import { writable } from "svelte/store";

export const selectedChar = writable("x");
export const selectedColor = writable("#ffffff");
export const selectedShape = writable("Brush");
export const selectedTool = writable("Symbol");
