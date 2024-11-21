"use client";

import useSubscription from "@/hooks/useSubscription";
import RecipeSelection from "@/components/pages/subscribeShop/recipeSelection/RecipeSelection";
import PlanSelection from "@/components/pages/subscribeShop/planSelection/PlanSelection";
import * as styles from "@/app/survey/Survey.css";
import SummaryBar from "../summaryBar/SummaryBar";
import SelectedProductInfo from "../selectedProductInfo/SelectedProductInfo";
import { useGetSurveyRecipe } from "@/api/queries/survey/useGetSurveyRecipe";
import { useGetSurveyResult } from "@/api/queries/survey/useGetSurveyResult";
import { calculateOneMealGrams } from "@/utils/subscription/mealCalculations";
import { isOriginSubscriber } from "@/utils/subscription/subscriptionUtils";
import { calculateSubscribePrice } from "@/utils/subscription/subscribePriceCalulation";
import { useEffect } from "react";
import { getDiscountInfo } from "@/api/subscription";
import { useGetDiscountInfo } from "@/api/queries/subscription/useGetDiscountInfo";

interface SubscribeShopContentProps {
  reportId: number;
}

export default function SubscribeShopContent({
  reportId,
}: SubscribeShopContentProps) {
  const { data: recipeData } = useGetSurveyRecipe(reportId);
  const { data: resultData } = useGetSurveyResult(reportId);
  console.log("recipeData", recipeData);
  console.log("resultData", resultData);
  const {
    selectedPlan,
    selectedRecipes,
    handleSelectedPlan,
    handleSelectedRecipe,
  } = useSubscription();

const isOrigin = isOriginSubscriber(recipeData.subscribeId)

  const oneMealGram = calculateOneMealGrams({
    selectedRecipeIds: selectedRecipes,
    recipeDtoList: recipeData.recipeDtoList,
    oneDayRecommendKcal: resultData.foodAnalysis.oneDayRecommendKcal,
    isOriginSubscriber: isOrigin
  })
  console.log('oneMealGram', oneMealGram);

  // const subscribePriceInfo = calculateSubscribePrice({
  //   oneMealGram,

  //   isOriginSubscriber: isOrigin,
  // })

  return (
    <div className={styles.subscribeShopWrapper}>
      <RecipeSelection
        onRecipeSelect={handleSelectedRecipe}
        selectedRecipes={selectedRecipes} 
        recipeData={recipeData}
        inedibleFood={resultData.inedibleFood}
      />
      <PlanSelection
        onPlanSelect={handleSelectedPlan}
        selectedPlan={selectedPlan}
        dogName={resultData.myDogName}
      />
      <SelectedProductInfo
        resultData={resultData}
        />
      {/* <SummaryBar /> */}
    </div>
  );
}
