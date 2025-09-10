"use client";

import * as styles from "./DeliveryOptions.css";
import Divider from "@/components/common/divider/Divider";
import MealFrequency from "./mealFrequency/MealFrequency";
import DeliveryCycle from "./deliveryCycle/DeliveryCycle";
import Text from "@/components/common/text/Text";
import { commonWrapper } from "@/styles/common.css";
import { DeliveryPlan, MealPlan, RawFoodOrderSheet } from "@/types";
import SubscriptionItemList from "./subscriptionItemList/SubscriptionItemList";
import SubscriptionSummary from "./subscriptionSummary/SubscriptionSummary";
import { CalculatedRecipe } from "@/hooks/subscription/useSubscriptionCalculation";

interface DeliveryOptionsProps {
  rawFoodSheetData: RawFoodOrderSheet;
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  paymentExpectedPrice: number;
  totalOriginalPrice: number;
  totalDiscountAmount: number;
  calculatedRecipes: CalculatedRecipe[];
}

export default function DeliveryOptions({
  rawFoodSheetData,
  mealPlan,
  deliveryPlan,
  paymentExpectedPrice,
  totalOriginalPrice,
  totalDiscountAmount,
  calculatedRecipes,
}: DeliveryOptionsProps) {
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
        mealPlan={mealPlan}
        deliveryPlan={deliveryPlan}
        calculatedRecipes={calculatedRecipes}
        rawFoodItems={rawFoodSheetData.recipeList}
      />
      <Divider />
      <SubscriptionSummary
        paymentExpectedPrice={paymentExpectedPrice}
        totalOriginalPrice={totalOriginalPrice}
        discountAmount={totalDiscountAmount}
        deliveryPlan={deliveryPlan}
      />
    </section>
  );
}
