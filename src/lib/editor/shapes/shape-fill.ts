import type { CanvasCell } from "../editor.types";

export function drawFill(
  x0: number,
  y0: number,
  w: number,
  h: number,
  char: string,
  foreground: string,
  background: string,
  content: CanvasCell[][],
  callback: (x: number, y: number) => void
) {
  const queue: number[] = [];
  const toReplace = content[y0][x0].join("");

  // Exits if target is already the desired character.
  if (toReplace === `${char}${foreground}${background}`) return;

  queue.unshift(x0, y0);
  while (queue.length) {
    const y = queue.pop()!;
    const x = queue.pop()!;

    if (x < 0 || x >= w || y < 0 || y >= h || content[y][x].join("") !== toReplace) continue;

    callback(x, y);
    queue.unshift(x - 1, y);
    queue.unshift(x + 1, y);
    queue.unshift(x, y - 1);
    queue.unshift(x, y + 1);
  }
}
