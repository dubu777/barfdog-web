import {
  SubscriptionDetail,
  SubscriptionInfoResponse,
  SubscriptionValues,
} from "@/types";
import { calculateRecipePack } from "./calculateRecipe";

export function buildInitialSubscriptionForm(
  data: SubscriptionInfoResponse
): SubscriptionValues {
  return {
    mealPlan: data.planInfo.mealCount,
    deliveryPlan: data.planInfo.weeks,
    rawFoods: data.recipeList.map((rawFood) => {
      const { packGrams, packPrice } = calculateRecipePack({
        recommendedPackGrams: rawFood.oneMealGramsPerRecipe,
        pricePerGram: rawFood.pricePerGram,
        customPackGrams: rawFood.oneMealGramsPerRecipe,
      });

      return {
        recipeId: rawFood.recipeId,
        packGrams,
        packPrice,
      };
    }),
  };
}
