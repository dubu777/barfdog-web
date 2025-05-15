/** 
 * 주어진 숫자를 지정한 소수 자리에서 반올림.
 * @param value 반올림할 원본 숫자
 * @param decimals 소수 몇 자리까지 반올림할지
 */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

// 주어진 숫자를 지정한 소수 자리에서 버림.
export function ceilTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.ceil(value * factor) / factor;
}

// 주어진 숫자가 최소값과 최대값 사이에 있는지 확인하고, 범위를 벗어나면 해당 범위로 제한.
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}