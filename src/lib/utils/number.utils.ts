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
