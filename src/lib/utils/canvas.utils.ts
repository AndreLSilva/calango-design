import { colorsPalette } from "$lib/editor/colors-palette/colors-palette";
import type { CanvasCell } from "$lib/editor/editor.types";

const escChar = "\u001b";

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
        result += `${escChar}[m`;
        currentFg = undefined;
        currentBg = undefined;
      }
      // If the cell foreground color is different from the current style, adds a new color character to match the style.
      if (fg && fg !== currentFg) {
        result += `${escChar}[38:5:${fg}m`;
        currentFg = fg;
      }
      // If the cell background color is different from the current style, adds a new color character to match the style.
      if (bg && bg !== currentBg) {
        result += `${escChar}[48:5:${bg}m`;
        currentBg = bg;
      }

      result += cell.textContent;
    }

    result += "\n";
  }

  // Removes the last \n added on the join.
  result = result.slice(0, -1);
  // If string ends with a style being set, adds the reset character at the end of it.
  if (currentFg || currentBg) result += `${escChar}[m`;

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
  let fg: string | undefined = undefined;
  let bg: string | undefined = undefined;

  content.split("\n").forEach((line) => {
    const row: CanvasCell[] = [];

    for (let i = 0, n = line.length; i < n; i++) {
      // Escape character check. This indicates a style change, not a drawn symbol.
      if (line[i] === escChar) {
        // Reset code.
        if (line.substring(i + 1, i + 3) === "[m") {
          // Resets the styles.
          fg = undefined;
          bg = undefined;

          // Continues the characters loop after the escape code.
          i += 2;
          continue;
        }
        // Color code.
        const colorCodeMatch = line.substring(i + 1, i + 11).match(/^\[(3|4)8:5:\d+m/);
        if (colorCodeMatch) {
          // Gets hex color based on the color code.
          const colorCode = Number(colorCodeMatch[0].substring(6, colorCodeMatch[0].length - 1));
          const color = colorsPalette[colorCode];
          // Sets either the foreground or background color.
          if (colorCodeMatch[0].substring(1, 2) === "3") fg = color;
          else bg = color;

          // Continues the characters loop after the escape code.
          i += colorCodeMatch[0].length;
          continue;
        }
      }

      // Pushes the current drawn character with the target styles.
      row.push([line[i], fg ?? "", bg ?? ""]);
    }

    contentMatrix.push(row);
  });

  return contentMatrix;
}
