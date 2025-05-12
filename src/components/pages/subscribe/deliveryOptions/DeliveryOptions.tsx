"use client";

import * as styles from "./DeliveryOptions.css";
import Divider from "@/components/common/divider/Divider";
import { useUpdateSubscription } from "@/api/subscription/mutations/useUpdateSubscription";
import { useRouter } from "next/navigation";
import { useGetPlanDiscount } from "@/api/subscription/queries/useGetPlanDiscount";
import MealFrequency from "./mealFrequency/MealFrequency";
import DeliveryCycle from "./deliveryCycle/DeliveryCycle";
import { useFormContext, useWatch } from "react-hook-form";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { commonWrapper } from "@/styles/common.css";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { RecipeData } from "@/types";
import { calculateDeliveryCyclePackCount, calculateRecipeTotal } from "@/utils/subscription/calculateRecipe";
import { useEffect } from "react";
import OrderSummary from "./orderSummary/OrderSummary";

interface DeliveryOptionsProps {
  recipeData: RecipeData;

}

export default function DeliveryOptions({recipeData}: DeliveryOptionsProps) {
  const { control, setValue } =
  useFormContext<SubscriptionValues>();
  const { data: discountData } = useGetPlanDiscount();
  const { mutate: updateSubscription } = useUpdateSubscription();

  // 폼 필드 구독
  const recipeList = useWatch({ control, name: "recipeList" });
  const generalItemList = useWatch({ control, name: "generalItemList" });
  const mealFrequency = useWatch({ control, name: "mealFrequency" }) as 1 | 2;;
  const deliveryCycle = useWatch({ control, name: "deliveryCycle" }) as 2 | 4;

  const packCount = calculateDeliveryCyclePackCount(
    mealFrequency,
    deliveryCycle,
    recipeList.length as 1 | 2
  );

  useEffect(() => {
    // 필수 값이 모두 있어야 계산
    if (
      !recipeList?.length ||
      ![1, 2].includes(mealFrequency) ||
      ![2, 4].includes(deliveryCycle)
    ) {
      return;
    }

    const recipeCount = recipeList.length as 1 | 2;

    // 1) recipeList 각 항목별 originPrice / salePrice 계산
    const updatedRecipes = recipeList.map((item) => {
      const { originPrice, discountAmount, salePrice } = calculateRecipeTotal(
        item.packPrice!,
        mealFrequency as 1 | 2,
        deliveryCycle as 2 | 4,
        recipeCount
      );
      console.log(originPrice, "origin");
      console.log(salePrice, "salePrice");
      return {
        ...item,
        originPrice,
        discountAmount,
        salePrice,
      };
    });

    const isSame = JSON.stringify(recipeList) === JSON.stringify(updatedRecipes);
    if (!isSame) {
      setValue("recipeList", updatedRecipes, { shouldDirty: true });
    }

    // 2) top-level originPrice: 레시피 originPrice 합 + 일반 상품 orderPrice 합
    const sumRecipeOrigin = updatedRecipes.reduce(
      (sum, r) => sum + (r.originPrice ?? 0),
      0
    );
    const sumGeneral = generalItemList?.reduce(
      (sum, g) => sum + g.originPrice,
      0
    ) ?? 0;
    setValue("originPrice", sumRecipeOrigin + sumGeneral, {
      shouldDirty: true,
    });

    // 3) top-level finalPrice: 레시피 salePrice 합 + 일반 상품 orderPrice 합
    const sumRecipeSale = updatedRecipes.reduce(
      (sum, r) => sum + (r.salePrice ?? 0),
      0
    );
    setValue("finalPrice", sumRecipeSale + sumGeneral, {
      shouldDirty: true,
    });


  }, [
    recipeList,
    generalItemList,
    mealFrequency,
    deliveryCycle,
    setValue,
  ]);


  

  return (
    <section className={styles.deliveryOptionsContainer}>
      <div className={commonWrapper({ justify: "start", padding: 20 })}>
        <DefaultText type="title2">
          마지막으로, 식사량과
          <br />
          배송 주기를 선택해 주세요
        </DefaultText>
      </div>
      <Divider />
      <MealFrequency />
      <Divider />
      <DeliveryCycle />
      <Divider />
      <OrderSummary
        recipeList={recipeList}
        generalItemList={generalItemList}
        deliveryCycle={deliveryCycle}
        packCount={packCount}
        mealFrequency={mealFrequency}
      />
    </section>
  );
}
