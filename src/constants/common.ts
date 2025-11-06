const DISCOUNT_UNIT = {
  FIXED_RATE: '%',
  FLAT_RATE: '원',
} as const;

const COUPON_TARGET = {
  ALL: "전체",
  SUBSCRIBE: "정기구독",
  GENERAL: "일반상품",
} as const;

export {
  DISCOUNT_UNIT,
  COUPON_TARGET,
}