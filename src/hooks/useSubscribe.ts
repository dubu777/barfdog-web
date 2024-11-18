import { useState } from "react";

interface useSubscribeProps {}

export default function useSubscribe() {
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
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

  const handleSelectedPlan = (planName: string) => {
    setSelectedPlan(planName);
  };

  return {
    selectedPlan,
    selectedRecipes,
    handleSelectedPlan,
    handleSelectedRecipe,
    
  };
}
