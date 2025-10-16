import Card from "@/components/common/card/Card";
import Divider from "@/components/common/divider/Divider";
import Text from "@/components/common/text/Text";
import RecipeItemCard from "@/components/pages/subscribe/deliveryOptions/subscriptionItemList/recipeItemCard/RecipeItemCard";
import { commonWrapper } from "@/styles/common.css";
import { DeliveryPlan, MealPlan, RawFoodItemSummary } from "@/types";
import { calculateDeliveryCyclePackCount } from "@/utils/subscription/calculateRecipe";
import React from "react";

interface SubscriptionItemInfoProps {
  rawFoodList: RawFoodItemSummary[];
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
}

export default function SubscriptionItemInfo({
  rawFoodList,
  mealPlan,
  deliveryPlan,
}: SubscriptionItemInfoProps) {
  const packCount = calculateDeliveryCyclePackCount(
    mealPlan,
    deliveryPlan,
    rawFoodList.length
  );
  return (
    <Card shadow="light" padding={12} gap={12} align="start">
      <Text type="headline2">구독 상품</Text>
      <Divider thickness={2} color="gray900" />
      <div className={commonWrapper({ direction: "col", gap: 16 })}>
        {rawFoodList.map((item, index, array) => (
          <React.Fragment key={item.recipeId}>
            <RecipeItemCard
              mealPlan={mealPlan}
              deliveryPlan={deliveryPlan}
              originalPrice={item.originalPrice}
              packCount={packCount}
              packGrams={item.oneMealGramsPerRecipe}
              displayImageUrl={item?.displayImageUrl.url || ""}
              recipeName={item?.name || ""}
            />
            {index < array.length - 1 && <Divider thickness={1} />}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
}
