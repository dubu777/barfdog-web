import { PlanName } from "@/types";
import { useState } from "react";

export default function useSubscription() {
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<PlanName | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<string | null>("0.8");

  const maxRecipesSelections = 2;
  const handleSelectedRecipe = (recipeId: number) => {
    const selectedSet = new Set(selectedRecipes);
    if (selectedSet.has(recipeId)) {
      selectedSet.delete(recipeId);
    } else {
      if (selectedSet.size >= maxRecipesSelections) {
        alert("레시피는 2개까지 선택 가능합니다.");
        return;
      }
      selectedSet.add(recipeId);
    }
    setSelectedRecipes(Array.from(selectedSet));
  };

  const handleSelectedPlan = (planName: PlanName) => {
    setSelectedPlan(planName);
  };

  const handleSelectedVolume = (value: string) => {
    setSelectedVolume(value);
  };

  return {
    selectedPlan,
    selectedRecipes,
    selectedVolume,
    handleSelectedPlan,
    handleSelectedRecipe,
    handleSelectedVolume,
  };
}
