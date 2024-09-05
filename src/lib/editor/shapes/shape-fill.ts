export function drawFill(
  x0: number,
  y0: number,
  w: number,
  h: number,
  char: string,
  content: string[][]
) {
  const queue: number[] = [];
  const target = content[y0][x0];

  if (target === char) return; // Exits if target is already the desired character.
  queue.unshift(x0, y0);

  while (queue.length) {
    const y = queue.pop()!;
    const x = queue.pop()!;

    if (x < 0 || x >= w || y < 0 || y >= h || content[y][x] !== target) continue;

    content[y][x] = char;
    queue.unshift(x - 1, y);
    queue.unshift(x + 1, y);
    queue.unshift(x, y - 1);
    queue.unshift(x, y + 1);
  }
}
