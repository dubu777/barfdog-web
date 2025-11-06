import { useMemo } from "react";
import { DeliveryPlan, MealPlan, SubscriptionValues } from "@/types";
import {
  calculateDeliveryCyclePackCount,
  calculateRecipeTotal,
} from "@/utils/subscription/calculateRecipe";

interface UseSubscriptionCalculationProps {
  savedSelection: SubscriptionValues["recipeList"];
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
}

export type CalculatedRecipe = SubscriptionValues["recipeList"][0] & {
  originalPrice: number;
  discountedPrice: number;
  packCount: number;
};

export interface TotalRecipePrice {
  totalOriginalPrice: number;
  totalPlanDiscountedPrice: number;
  totalDiscountAmount: number;
}

export interface SubscriptionCalculationResult {
  recipes: CalculatedRecipe[];
  totals: TotalRecipePrice;
  recipeCount: 0 | 1 | 2;
}

export const useSubscriptionCalculation = ({
  savedSelection,
  mealPlan,
  deliveryPlan,
}: UseSubscriptionCalculationProps): SubscriptionCalculationResult => {
  return useMemo(() => {
    const recipeCount = savedSelection.length as 1 | 2;
    const packCount = calculateDeliveryCyclePackCount(
      mealPlan,
      deliveryPlan,
      recipeCount
    );

    // 레시피별 계산 결과
    const recipes: CalculatedRecipe[] = savedSelection.map((item) => {
      const { originalPrice, discountedPrice } = calculateRecipeTotal(
        item.packPrice ?? 0,
        mealPlan,
        deliveryPlan,
        recipeCount
      );

      return {
        ...item,
        originalPrice,
        discountedPrice,
        packCount,
      };
    });

    const totalOriginalPrice = recipes.reduce((s, x) => s + x.originalPrice, 0);
    const totalPlanDiscountedPrice = recipes.reduce(
      (s, x) => s + x.discountedPrice,
      0
    );
    const totalDiscountAmount = totalOriginalPrice - totalPlanDiscountedPrice;

    return {
      recipes,
      totals: {
        totalOriginalPrice,
        totalPlanDiscountedPrice,
        totalDiscountAmount,
      },
      recipeCount,
    };
  }, [savedSelection, mealPlan, deliveryPlan]);
};
