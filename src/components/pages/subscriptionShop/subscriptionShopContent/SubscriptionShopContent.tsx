"use client";

import useSubscription from "@/hooks/useSubscription";
import * as styles from "@/app/survey/Survey.css";
import {
  calculateOneMealGrams,
  calculateOneMealGramsWithVolume,
} from "@/utils/subscription/mealCalculations";
import {
  isOriginSubscriber,
  isToppingPlan,
} from "@/utils/subscription/subscriptionUtils";
import { getDiscountPercent } from "@/utils/subscription/getDiscountPercent";
import FooterButton from "../footerButton/FooterButton";
import RightArrowIcon from "/public/images/icons/right-arrow-white.svg";
import SelectedProductInfo from "./selectedProductInfo/SelectedProductInfo";
import PlanSelection from "./planSelection/PlanSelection";
import RecipeSelection from "./recipeSelection/RecipeSelection";
import useModal from "@/hooks/useModal";
import { validatePaymentBody } from "@/utils/subscription/validatePaymentBody";
import { useGetPlanDiscount } from "@/api/subscription/queries/useGetPlanDiscount";
import { useUpdateSubscription } from "@/api/subscription/mutations/useUpdateSubscription";
import { useGetSurveyRecipe } from "@/api/survey/queries/useGetSurveyRecipe";
import { useGetSurveyResult } from "@/api/survey/queries/useGetSurveyResult";
import { useRouter } from "next/navigation";
import { useGetDogList } from "@/api/dog/queries/useGetDogList";
import { calculateSubscribePrice } from "@/utils/subscription/subscribePriceCalulation";
import DeliveryScheduleModal from "./deliveryScheduleModal/DeliveryScheduleModal";

interface SubscriptionShopContentProps {
  reportId: number;
}

export default function SubscriptionShopContent({
  reportId,
}: SubscriptionShopContentProps) {
  const router = useRouter();
  const { data: recipeData } = useGetSurveyRecipe(reportId);

  const { data: resultData } = useGetSurveyResult(reportId);
  const { data: discountData } = useGetPlanDiscount();
  const { data: dogList } = useGetDogList();

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
  });

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

  const isCompleted =
    !isNaN(subscribePriceData.totalOriginalPriceAllRecipes) &&
    subscribePriceData.totalOriginalPriceAllRecipes !== 0;

  const { isOpen, onToggle, onClose } = useModal();

  const { mutate: updateSubscription } = useUpdateSubscription();

  const handlePayment = () => {
    const body = {
      plan: selectedPlan,
      recipeIdList: selectedRecipes,
      nextPaymentPrice: subscribePriceData.totalDiscountedPriceAllRecipes,
      oneDayRecommendKcal: resultData.foodAnalysis.oneDayRecommendKcal,
      subscribeItemList: null,
    };
    console.log("body", body);

    const validationError = validatePaymentBody(body);
    if (validationError) {
      alert(validationError);
      return;
    }
    updateSubscription(
      { subscribeId: recipeData.subscribeId, body },
      {
        onSuccess: async () => {
          router.push(
            `/order/order-sheet/subscription/${recipeData.subscribeId}`
          );
        },
      }
    );
  };

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
        subscribePriceData={subscribePriceData}
        selectedRecipeMeals={selectedRecipeMeals}
        selectedPlan={selectedPlan}
        selectedVolume={selectedVolume}
        handleSelectedVolume={handleSelectedVolume}
        oneMealGramWithVolume={oneMealGramWithVolume}
      />
      {/* <SummaryBar /> */}
      <FooterButton isDisabled={!isCompleted} onClick={onToggle}>
        결제하러 가기
        <RightArrowIcon />
      </FooterButton>
      <DeliveryScheduleModal
        isVisible={isOpen}
        onClose={onClose}
        onClickConfirm={handlePayment}
      />
    </div>
  );
}
