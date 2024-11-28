/**
 * 숫자를 천 단위로 쉼표를 추가하여 포맷팅하는 함수
 * @param num - 포맷팅할 숫자
 * @returns 쉼표가 추가된 문자열
 */
export const formatNumberWithCommas = (num: number): string => {
  return isNaN(num) ? '0' : num.toLocaleString();
};