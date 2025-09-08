"use client";

import * as styles from "./DeliveryOptions.css";
import Divider from "@/components/common/divider/Divider";
import MealFrequency from "./mealFrequency/MealFrequency";
import DeliveryCycle from "./deliveryCycle/DeliveryCycle";
import { useFormContext, useWatch } from "react-hook-form";
import Text from "@/components/common/text/Text";
import { commonWrapper } from "@/styles/common.css";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { RawFoodOrderSheet } from "@/types";
import {
  calculateDeliveryCyclePackCount,
  calculateTotalSubscriptionPrice,
} from "@/utils/subscription/calculateRecipe";
import { useMemo } from "react";
import SubscriptionItemList from "./subscriptionItemList/SubscriptionItemList";
import SubscriptionSummary from "./subscriptionSummary/SubscriptionSummary";

interface DeliveryOptionsProps {
  rawFoodSheetData: RawFoodOrderSheet;
}

export default function DeliveryOptions({
  rawFoodSheetData,
}: DeliveryOptionsProps) {
  const { control } = useFormContext<SubscriptionValues>();

  // 폼 필드 구독
  const recipeList = useWatch({ control, name: "rawFoods" });
  const mealPlan =
    useWatch({
      control,
      name: "mealPlan",
    }) || "TWO_MEAL";
  const deliveryPlan =
    useWatch({
      control,
      name: "deliveryPlan",
    }) || "TWO_WEEK";
  const packCount = calculateDeliveryCyclePackCount(
    mealPlan,
    deliveryPlan,
    recipeList.length
  );

  const pricing = useMemo(
    () => calculateTotalSubscriptionPrice(recipeList, mealPlan, deliveryPlan),
    [recipeList, mealPlan, deliveryPlan]
  );

  return (
    <section className={styles.deliveryOptionsContainer}>
      <div className={commonWrapper({ justify: "start", padding: 20 })}>
        <Text type="title2">
          마지막으로, 식사량과
          <br />
          배송 주기를 선택해 주세요
        </Text>
      </div>
      <Divider />
      <MealFrequency />
      <Divider />
      <DeliveryCycle />
      <Divider />
      <SubscriptionItemList
        recipeList={recipeList}
        mealPlan={mealPlan}
        deliveryPlan={deliveryPlan}
        packCount={packCount}
        rawFoodItems={rawFoodSheetData.recipeList}
      />
      <Divider />
      <SubscriptionSummary
        paymentExpectedPrice={pricing.paymentExpectedPrice}
        totalOriginalPrice={pricing.totalOriginalPrice}
        discountAmount={pricing.totalDiscountAmount}
        deliveryPlan={deliveryPlan}
      />
    </section>
  );
}
