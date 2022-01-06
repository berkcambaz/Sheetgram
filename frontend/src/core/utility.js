/**
 * 
 * @param {number} number 
 */
export function clampNumber(number) {
  if (number > 999999) return Math.floor(number / 1000000).toString() + "m";
  if (number > 999) return Math.floor(number / 1000).toString() + "k";
  return number;
}