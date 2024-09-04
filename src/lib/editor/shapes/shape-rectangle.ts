import { getMinMax } from "$lib/utils/number.utils";

export function drawRect(
  variant: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  callback: (x: number, y: number) => void
) {
  switch (variant) {
    case 0:
      drawFilledRect(x0, y0, x1, y1, callback);
      break;
    case 1:
      drawOutlinedRect(x0, y0, x1, y1, callback);
      break;
  }
}

function drawFilledRect(
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

function drawOutlinedRect(
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
