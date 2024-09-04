/**
 * Calls a callback function for every point between two given points with the coordinate.
 * Implements a fast Bresenham's line algorithm.
 * @param x0 The x of the starting point.
 * @param y0 The y of the starting point.
 * @param x1 The x of the end point.
 * @param y1 The y of the end point.
 * @param callback A function to be called for every point in between.
 */
export function drawLine(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  callback: (x: number, y: number) => void
) {
  if (Math.abs(x1 - x0) > Math.abs(y1 - y0)) drawLineH(x0, y0, x1, y1, callback);
  else drawLineV(x0, y0, x1, y1, callback);
}

function drawLineH(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  callback: (x: number, y: number) => void
) {
  if (x0 > x1) {
    [x0, x1] = [x1, x0];
    [y0, y1] = [y1, y0];
  }

  const dx = x1 - x0;
  let dy = y1 - y0;
  const dir = dy < 0 ? -1 : 1;
  dy *= dir;

  if (dx === 0) return;
  let y = y0;
  let d = 2 * dy - dx;

  for (let x = x0; x <= x1; x++) {
    callback(x, y);

    if (d >= 0) {
      y += dir;
      d += -2 * dx;
    }
    d += 2 * dy;
  }
}

function drawLineV(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  callback: (x: number, y: number) => void
) {
  if (y0 > y1) {
    [x0, x1] = [x1, x0];
    [y0, y1] = [y1, y0];
  }

  let dx = x1 - x0;
  const dy = y1 - y0;
  const dir = dx < 0 ? -1 : 1;
  dx *= dir;

  if (dy === 0) return;
  let x = x0;
  let d = 2 * dx - dy;

  for (let y = y0; y <= y1; y++) {
    callback(x, y);

    if (d >= 0) {
      x += dir;
      d += -2 * dy;
    }
    d += 2 * dx;
  }
}
