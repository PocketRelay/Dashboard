export function getNumberWithOrdinal(n: number): string {
  let s = ["th", "st", "nd", "rd"];
  let v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Formats a value as a roman numeral, if the value is greater
 * than 10 the value will just be formatted as a number
 *
 * @param num The number to convert
 * @returns The formatted value
 */
export function formatRomanNumeral(num: number): string {
  if (num > 10) {
    return num.toString();
  }

  if (num < 1) {
    return "";
  }

  if (num == 10) {
    return "X" + formatRomanNumeral(num - 10);
  }
  if (num >= 9) {
    return "IX" + formatRomanNumeral(num - 9);
  }
  if (num >= 5) {
    return "V" + formatRomanNumeral(num - 5);
  }
  if (num >= 4) {
    return "IV" + formatRomanNumeral(num - 4);
  }
  if (num >= 1) {
    return "I" + formatRomanNumeral(num - 1);
  }

  return "";
}
