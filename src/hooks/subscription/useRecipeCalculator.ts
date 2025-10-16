import { useMemo } from "react";
import {
  calculateRecipePack,
  CalculateRecipePackReturn,
} from "@/utils/subscription/calculateRecipe";
import { RawFoodOrderItem, SubscriptionValues } from "@/types";

interface UseRecipeCalculatorProps {
  originalRecipes: RawFoodOrderItem[];
  savedRecipes: SubscriptionValues["rawFoods"];
}

export const useRecipeCalculator = ({
  originalRecipes,
  savedRecipes,
}: UseRecipeCalculatorProps) => {
  const gramsMap = useMemo(() => {
    const m = new Map<number, number>();
    for (const e of savedRecipes ?? []) m.set(e.recipeId, e.packGrams);
    return m;
  }, [savedRecipes]);

  const packMap = useMemo(() => {
    const map: Record<number, CalculateRecipePackReturn> = {};
    for (const rawFoodItem of originalRecipes) {
      const custom = gramsMap.get(rawFoodItem.recipeId);
      map[rawFoodItem.recipeId] = calculateRecipePack({
        recommendedPackGrams: rawFoodItem.oneMealRecommendGram,
        pricePerGram: rawFoodItem.pricePerGram,
        customPackGrams: custom,
      });
    }
    return map;
  }, [originalRecipes, gramsMap]);

  return { packMap };
};
