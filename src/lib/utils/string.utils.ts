export function replaceAt(str: string, index: number, replacement: string) {
  return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}

export function charMultiply(char: string, length: number) {
  let result = "";
  for (let i = 0; i < length; i++) result += char;
  return result;
}
