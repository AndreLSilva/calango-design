import { colorsPalette } from "$lib/editor/colors-palette/colors-palette";
import type { CanvasCell } from "$lib/editor/editor.types";

/**
 * Reads the canvas element content and joins it on a single string.
 * @param canvas The canvas element.
 * @returns The string with the canvas content.
 */
export function sanitizeCanvas(canvas: HTMLElement) {
  let result: string = "";
  let currentFg: number | undefined = undefined;
  let currentBg: number | undefined = undefined;

  for (let y = 0, yn = canvas.children.length; y < yn; y++) {
    const row = canvas.children[y];

    for (let x = 0, xn = row.children.length; x < xn; x++) {
      const cell = row.children[x] as HTMLSpanElement;
      const fg = getStyleColorCode(cell.style.color);
      const bg = getStyleColorCode(cell.style.backgroundColor);

      // If current cell doesn't have a foreground or background color defined, adds a reset style character.
      if ((currentFg || currentBg) && (!fg || !bg)) {
        result += "\x1b[m";
        currentFg = undefined;
        currentBg = undefined;
      }
      // If the cell foreground color is different from the current style, adds a new color character to match the style.
      if (fg && fg !== currentFg) {
        result += `\x1b[38:5:${fg}m`;
        currentFg = fg;
      }
      // If the cell background color is different from the current style, adds a new color character to match the style.
      if (bg && bg !== currentBg) {
        result += `\x1b[48:5:${bg}m`;
        currentBg = bg;
      }

      result += cell.textContent;
    }

    result += "\n";
  }

  // Removes the last \n added on the join.
  result = result.slice(0, -1);
  // If string ends with a style being set, adds the reset character at the end of it.
  if (currentFg || currentBg) result += "\x1b[m";

  return result;
}

function getStyleColorCode(color: string): number | undefined {
  if (!color) return;
  return colorsPalette.indexOf(rgb2hex(color));
}

function rgb2hex(rgb: string): string {
  const sanitized = rgb.substring(4, rgb.length - 1).split(", ");
  const hexValues = sanitized.map((c) => `0${parseInt(c).toString(16)}`.slice(-2));

  return `#${hexValues.join("")}`;
}

/**
 * Parses a string to a canvas' content matrix.
 * @param content The string to be parsed.
 * @returns A canvas' content matrix matching the provided content.
 */
export function decodeCanvas(content: string) {
  const contentMatrix: CanvasCell[][] = [];

  content.split("\n").forEach((line) => {
    const row: CanvasCell[] = [];

    for (let i = 0, n = line.length; i < n; i++) {
      row.push([line[i], "", ""]);
    }

    contentMatrix.push(row);
  });

  return contentMatrix;
}
