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
