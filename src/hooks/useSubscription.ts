import { PlanName } from "@/constants";
import { useState } from "react";


export default function useSubscription() {
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<PlanName | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<string | null>('0.8');

  const maxRecipesSelections = 2;
  const handleSelectedRecipe = (recipeId: number) => {
    if (selectedRecipes.includes(recipeId)) {
      setSelectedRecipes(selectedRecipes.filter((id) => id !== recipeId));
    } else {
      if (selectedRecipes.length >= maxRecipesSelections) {
        alert("레시피는 2개까지 선택 가능합니다.");
        return;
      }
      setSelectedRecipes([...selectedRecipes, recipeId]);
    }
  };

  const handleSelectedPlan = (planName: PlanName) => {
    setSelectedPlan(planName);
  };

  const handleSelectedVolume = (value: string) => {
    setSelectedVolume(value)
  }

  return {
    selectedPlan,
    selectedRecipes,
    selectedVolume,
    handleSelectedPlan,
    handleSelectedRecipe,
    handleSelectedVolume,
  };
}
