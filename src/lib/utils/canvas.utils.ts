import type { CanvasCell } from "$lib/editor/editor.types";

/**
 * Reads the canvas element content and joins it on a single string.
 * @param canvas The canvas element.
 * @returns The string with the canvas content.
 */
export function sanitizeCanvas(canvas: HTMLElement) {
  let result: string = "";

  for (let y = 0, yn = canvas.children.length; y < yn; y++) {
    const row = canvas.children[y];

    for (let x = 0, xn = row.children.length; x < xn; x++) {
      const cell = row.children[x];
      result += cell.textContent;
    }

    result += "\n";
  }

  // Removes the last \n before returning.
  return result.slice(0, -1);
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
