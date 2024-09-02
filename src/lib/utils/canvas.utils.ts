export function sanitizeCanvas(canvas: HTMLDivElement) {
  let result: string = "";

  for (let y = 1, yn = canvas.children.length - 1; y < yn; y++) {
    const row = canvas.children[y];

    for (let x = 1, xn = row.children.length - 1; x < xn; x++) {
      const cell = row.children[x];
      result += cell.textContent;
    }

    result += "\n";
  }

  return result;
}
