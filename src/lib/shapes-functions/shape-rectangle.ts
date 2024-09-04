import { getMinMax } from "../utils/number.utils";

export function drawFilledRect(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  callback: (x: number, y: number) => void
) {
  const [minX, maxX] = getMinMax(x0, x1);
  const [minY, maxY] = getMinMax(y0, y1);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      callback(x, y);
    }
  }
}

export function drawOutlinedRect(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  callback: (x: number, y: number) => void
) {
  const [minX, maxX] = getMinMax(x0, x1);
  const [minY, maxY] = getMinMax(y0, y1);

  for (let y = minY + 1; y < maxY; y++) {
    callback(minX, y);
    callback(maxX, y);
  }
  for (let x = minX; x <= maxX; x++) {
    callback(x, minY);
    callback(x, maxY);
  }
}
