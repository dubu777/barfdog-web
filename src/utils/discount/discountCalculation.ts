/**
 * 할인율을 적용한 최종 금액을 계산
 * @param originalPrice 원래 금액
 * @param discountPercent 할인율 (0-100 사이의 값)
 * @returns 할인이 적용된 금액 (소수점 반올림)
 */
export const calculateDiscountedPrice = (
  originalPrice: number,
  discountPercent: number
): number => {
  return Math.round(originalPrice * (1 - discountPercent / 100));
};

/**
 * 할인 금액을 계산
 * @param originalPrice 원래 금액
 * @param discountPercent 할인율
 * @returns 할인 금액 (소수점 반올림)
 */
export const calculateDiscountAmount = (
  originalPrice: number,
  discountPercent: number
): number => {
  return Math.round(originalPrice * (discountPercent / 100));
};
