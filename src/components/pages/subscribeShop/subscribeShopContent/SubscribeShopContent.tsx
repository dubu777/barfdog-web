"use client";

import useSubscription from "@/hooks/useSubscription";
import RecipeSelection from "@/components/pages/subscribeShop/recipeSelection/RecipeSelection";
import PlanSelection from "@/components/pages/subscribeShop/planSelection/PlanSelection";
import * as styles from "@/app/survey/Survey.css";
import SelectedProductInfo from "../selectedProductInfo/SelectedProductInfo";
import { useGetSurveyRecipe } from "@/api/queries/survey/useGetSurveyRecipe";
import { useGetSurveyResult } from "@/api/queries/survey/useGetSurveyResult";
import { calculateOneMealGrams, calculateOneMealGramsWithVolume } from "@/utils/subscription/mealCalculations";
import { isOriginSubscriber, isToppingPlan } from "@/utils/subscription/subscriptionUtils";
import { calculateSubscribePrice } from "@/utils/subscription/subscribePriceCalulation";
import { useGetDiscountInfo } from "@/api/queries/subscription/useGetDiscountInfo";
import { getDiscountPercent } from "@/utils/subscription/getDiscountPercent";

interface SubscribeShopContentProps {
  reportId: number;
}

export default function SubscribeShopContent({
  reportId,
}: SubscribeShopContentProps) {
  const { data: recipeData } = useGetSurveyRecipe(reportId);
  const { data: resultData } = useGetSurveyResult(reportId);
  const { data: discountData } = useGetDiscountInfo();

  // 레시피, 플랜 상태 관리 커스텀 훅
  const {
    selectedPlan,
    selectedRecipes,
    selectedVolume,
    handleSelectedPlan,
    handleSelectedRecipe,
    handleSelectedVolume,
  } = useSubscription();

  // 기존 구독자 여부 확인 함수
  const isOrigin = isOriginSubscriber(recipeData.subscribeId);

  // 서버에서 받아온 플랜별 할인율에서 선택 플랜 할인율 찾아 적용
  const discountPercent = getDiscountPercent(discountData, selectedPlan);

  // 선택 레시피 한 팩당 그램 수 계산 함수
  const selectedRecipeMeals = calculateOneMealGrams({
    selectedRecipeIds: selectedRecipes,
    recipeDtoList: recipeData.recipeDtoList,
    oneDayRecommendKcal: resultData.foodAnalysis.oneDayRecommendKcal,
    isOriginSubscriber: isOrigin,
  });

  // 토핑 플랜시 토핑 용량에 따른 한 팩 당 그램 수 계산 함수
  const oneMealGramWithVolume = calculateOneMealGramsWithVolume({
    selectedRecipeIds: selectedRecipes,
    recipeDtoList: recipeData.recipeDtoList,
    oneDayRecommendKcal: resultData.foodAnalysis.oneDayRecommendKcal,
    selectedVolume,
    isOriginSubscriber: isOrigin,
  })

  // 토핑 플랜 여부에 따라 가격 계산 함수에 들어갈 값을 유동적으로 넣기 위해
  const recipeMealsToCalculate =
  isToppingPlan(selectedPlan) && oneMealGramWithVolume.length > 0
      ? oneMealGramWithVolume
      : selectedRecipeMeals;

  // 선택 플랜, 레시피의 한 팩 가격, 원가, 할인 적용된 가격 반환 함수
  const subscribePriceData = calculateSubscribePrice({
    selectedRecipeMeals: recipeMealsToCalculate,
    selectedPlan,
    discountPercent,
    isOriginSubscriber: isOrigin,
  });


  console.log("selectedRecipeMeals>>>>>>>>", selectedRecipeMeals);
  console.log("subscribePriceData>>>>>>>>", subscribePriceData);
  console.log("oneMealGramWithVolume>>>>>>>>", oneMealGramWithVolume);
  console.log("recipeData", recipeData);
  console.log("resultData", resultData);

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
      <SelectedProductInfo subscribePriceData={subscribePriceData} selectedRecipeMeals={selectedRecipeMeals} selectedPlan={selectedPlan} selectedVolume={selectedVolume} handleSelectedVolume={handleSelectedVolume} oneMealGramWithVolume={oneMealGramWithVolume}/>
      {/* <SummaryBar /> */}
    </div>
  );
}
