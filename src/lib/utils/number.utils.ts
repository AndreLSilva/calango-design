/**
 * Compares two numbers and returns a tuple with the first one being the smallest one.
 * @param a First number to compare.
 * @param b Last number to compare.
 * @returns Tuple with the first item being the smallest one and the last being the bigger.
 */
export function getMinMax(a: number, b: number): [number, number] {
  if (b < a) return [b, a];
  return [a, b];
}

/**
 * Warps a number if it is out of the specified bounds.
 * @param val The value to possibly be warped.
 * @param max The max limit (inclusive).
 * @param min The min limit (inclusive).
 * @returns The number in bounds.
 */
export function warp(val: number, max: number, min = 0) {
  if (val > max) return min;
  if (val < min) return max;
  return val;
}

/**
 * Calculates a hex color's luma.
 * @param hex The color.
 * @returns The color's luma.
 */
export function getLuma(hex: string) {
  const sanitized = hex.replace("#", "");
  const r = parseInt(sanitized.substring(0, 2), 16);
  const g = parseInt(sanitized.substring(2, 4), 16);
  const b = parseInt(sanitized.substring(4, 6), 16);

  return (r * 299 + g * 587 + b * 114) / 1000;
}

/**
 * Determines if a color is considered light or not.
 * @param hex The color.
 * @returns True if the color is considered to be light.
 */
export function isLightColor(hex: string) {
  return getLuma(hex) > 155;
}

/**
 * Creates a new matrix filled with a given value.
 * @param w The width of the matrix.
 * @param h The height of the matrix.
 * @param value The value to fill the matrix with.
 * @returns A two dimensions array representing the matrix.
 */
export function newMatrix<T>(w: number, h: number, value: T) {
  const matrix: T[][] = [];
  for (let y = 0; y < h; y++) {
    const row: T[] = [];
    for (let x = 0; x < w; x++) {
      row.push(value);
    }
    matrix.push(row);
  }
  return matrix;
}

/**
 * Converts the event position from screen based to canvas based.
 * @param event The mouse event containing the position.
 */
export function eventPosToLocal(event: MouseEvent, w: number, h: number) {
  const containerRect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
  const x = Math.floor(((event.x - containerRect.x) * w) / containerRect.width);
  const y = Math.floor(((event.y - containerRect.y) * h) / containerRect.height);

  return [x, y];
}

/**
 * Safely parses a value to a number avoiding returning NaN or Infinite values.
 * @param value The value containing the number to be parsed.
 * @returns A valid finite number.
 */
export function parseNumber(value: string | number | null | undefined) {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || !Number.isFinite(value)) return undefined;
  return parsed;
}
