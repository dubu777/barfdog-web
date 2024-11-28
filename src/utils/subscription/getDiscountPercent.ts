interface DiscountData {
  _embedded?: {
    planDiscountResponseDtoList?: {
      full: number;
      half: number;
      toppingFull: number;
      toppingHalf: number;
    }[];
  };
}

export const getDiscountPercent = (
  discountData: DiscountData | undefined,
  planName: string | null
): number => {
  if (!discountData?._embedded?.planDiscountResponseDtoList?.[0]) return 0;

  const planDiscounts = discountData._embedded.planDiscountResponseDtoList[0];
  switch (planName) {
    case "FULL":
      return planDiscounts.full || 0;
    case "HALF":
      return planDiscounts.half || 0;
    case "TOPPING_FULL":
      return planDiscounts.toppingFull || 0;
    case "TOPPING_HALF":
      return planDiscounts.toppingHalf || 0;
    default:
      return 0;
  }
};