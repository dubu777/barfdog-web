/** 
 * 주어진 숫자를 지정한 소수 자리에서 반올림합니다.
 * @param value 반올림할 원본 숫자
 * @param decimals 소수 몇 자리까지 반올림할지
 */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}