"use client";

import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./SelectOption.css";
import Divider from "@/components/common/divider/Divider";
import { useUpdateSubscription } from "@/api/subscription/mutations/useUpdateSubscription";
import { useRouter } from "next/navigation";
import {
  calculateOneMealGrams,
  calculateOneMealGramsWithVolume,
  calculateSubscribePrice,
  getDiscountPercent,
  isOriginSubscriber,
  isToppingPlan,
  validatePaymentBody,
} from "@/utils";
import { useGetPlanDiscount } from "@/api/subscription/queries/useGetPlanDiscount";
import { PlanName, RecipeData, ResultData } from "@/types";
import MealFrequency from "./mealFrequency/MealFrequency";
import MealAmount from "./mealAmount/MealAmount";
import DeliveryCycle from "./deliveryCycle/DeliveryCycle";
import PaymentAmount from "./paymentAmount/PaymentAmount";

interface SelectOptionProps {
  recipeData: RecipeData;
  resultData: ResultData;
  selectedRecipes: number[];
  selectedPlan: PlanName | null;
  selectedVolume: string | null;
}

export default function SelectOption({
  recipeData,
  resultData,
  selectedRecipes,
  selectedPlan,
  selectedVolume,
}: SelectOptionProps) {
  const router = useRouter();
  const { data: discountData } = useGetPlanDiscount();
  const { mutate: updateSubscription } = useUpdateSubscription();

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

  // const isCompleted =
  //   !isNaN(subscribePriceData.totalOriginalPriceAllRecipes) &&
  //   subscribePriceData.totalOriginalPriceAllRecipes !== 0;

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
            `/order/order-sheet/subscription?subscribeId=${recipeData.subscribeId}`
          );
        },
        onError: (err) => {
          console.error("updateSubscription-error", err);
        },
      }
    );
  };

  return (
    <section className={styles.selectOptionContainer}>
      <MealAmount />
      <Divider />
      <MealFrequency />
      <Divider />
      <DeliveryCycle />
      <Divider />
      <PaymentAmount />
    </section>
  );
}
