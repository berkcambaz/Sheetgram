/**
 * 
 * @param {number} number 
 */
export function clampNumber(number) {
  if (number > 999999) return Math.floor(number / 1000000).toString() + "m";
  if (number > 999) return Math.floor(number / 1000).toString() + "k";
  return number;
}

/**
 * 
 * @param {HTMLElement} dom 
 * @param {(ev: MouseEvent | TouchEvent) => boolean} inside 
 * @param {(ev: MouseEvent | TouchEvent) => boolean} outside 
 * @returns 
 */
export function detectClick(dom, inside, outside) {
  const func = function (ev) {
    if (dom.contains(ev.target)) return inside();
    else return outside();
  }

  document.addEventListener("click", func);
  document.addEventListener("touchstart", func);

  return () => {
    document.removeEventListener("click", func);
    document.removeEventListener("touchstart", func);
  };
}