import { SubscriptionDetail, SubscriptionValues } from "@/types";
import { calculateRecipePack } from "./calculateRecipe";

export function buildInitialSubscriptionForm(
  detail: SubscriptionDetail
): SubscriptionValues {
  return {
    mealPlan: detail.mealPlan,
    deliveryPlan: detail.deliveryPlan,
    rawFoods: detail.rawFoods.map((rawFood) => {
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
