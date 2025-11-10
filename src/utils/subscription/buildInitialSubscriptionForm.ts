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
    recipeList: data.recipeList.map((rawFood) => {
      const { gramsPerMeal, pricePerMeal } = calculateRecipePack({
        recommendedPackGrams: rawFood.gramsPerMeal,
        pricePerGram: rawFood.pricePerGram,
        customPackGrams: rawFood.gramsPerMeal,
      });

      return {
        recipeId: rawFood.recipeId,
        gramsPerMeal,
        pricePerMeal,
      };
    }),
  };
}
