"use client";

import useSubscribe from "@/hooks/useSubscribe";
import RecipeSelection from "@/components/pages/subscribeShop/recipeSelection/RecipeSelection";
import PlanSelection from "@/components/pages/subscribeShop/planSelection/PlanSelection";
import * as styles from "@/app/survey/Survey.css"
import SummaryBar from "../summaryBar/SummaryBar";
import SelectedProductInfo from "../selectedProductInfo/SelectedProductInfo";

interface SubscribeShopContentProps {
  reportId: number;
}

export default function SubscribeShopContent({ reportId }: SubscribeShopContentProps) {
  const {
    selectedPlan,
    selectedRecipes,
    dogName,
    updateDogName,
    handleSelectedPlan,
    handleSelectedRecipe,
  } = useSubscribe();

  return (
    <div className={styles.subscribeShopWrapper}>
      <RecipeSelection
        reportId={reportId}
        onRecipeSelect={handleSelectedRecipe}
        selectedRecipes={selectedRecipes}
        onUpdateDogName={updateDogName}
      />
      <PlanSelection
        onPlanSelect={handleSelectedPlan}
        selectedPlan={selectedPlan}
        dogName={dogName}
      />
      <SelectedProductInfo />
      {/* <SummaryBar /> */}
    </div>
  );
}
