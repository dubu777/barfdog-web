"use client";

import * as styles from "./DeliveryOptions.css";
import Divider from "@/components/ui/divider/Divider";
import MealFrequency from "./mealFrequency/MealFrequency";
import DeliveryCycle from "./deliveryCycle/DeliveryCycle";
import Text from "@/components/ui/text/Text";
import { commonWrapper } from "@/styles/common.css";
import { DeliveryPlan, MealPlan, SubscriptionOrderSheet } from "@/types";
import SubscriptionItemList from "./subscriptionItemList/SubscriptionItemList";
import SubscriptionSummary from "./subscriptionSummary/SubscriptionSummary";
import { CalculatedRecipe } from "@/hooks/subscription/useSubscriptionCalculation";

interface DeliveryOptionsProps {
  orderSheetData: SubscriptionOrderSheet;
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  totalPlanDiscountedPrice: number;
  totalOriginalPrice: number;
  totalDiscountAmount: number;
  calculatedRecipes: CalculatedRecipe[];
}

export default function DeliveryOptions({
  orderSheetData,
  mealPlan,
  deliveryPlan,
  totalPlanDiscountedPrice,
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
        rawFoodItems={orderSheetData.recipeList}
      />
      <Divider />
      <SubscriptionSummary
        totalPlanDiscountedPrice={totalPlanDiscountedPrice}
        totalOriginalPrice={totalOriginalPrice}
        discountAmount={totalDiscountAmount}
        deliveryPlan={deliveryPlan}
      />
    </section>
  );
}
