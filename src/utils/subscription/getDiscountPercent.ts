import { PlanDiscountResponse } from "@/types";


export const getDiscountPercent = (
  discountData: PlanDiscountResponse[] | undefined,
  planName: string | null
): number => {
  if (!discountData?.[0]) return 0;
  const planDiscounts = discountData[0];
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