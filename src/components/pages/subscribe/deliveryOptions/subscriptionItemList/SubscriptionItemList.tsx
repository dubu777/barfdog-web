import Text from "@/components/common/text/Text";
import { commonWrapper } from "@/styles/common.css";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import RecipeItemCard from "./recipeItemCard/RecipeItemCard";
import React from "react";
import Divider from "@/components/common/divider/Divider";
import { DeliveryPlan, MealPlan, RawFoodOrderItem } from "@/types";
import { DELIVERY_PLAN_LABEL } from "@/constants";

interface SubscriptionItemListProps {
  recipeList: SubscriptionValues["rawFoods"];
  rawFoodItems: RawFoodOrderItem[];
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  packCount: number;
}

export default function SubscriptionItemList({
  recipeList,
  rawFoodItems,
  mealPlan,
  deliveryPlan,
  packCount,
}: SubscriptionItemListProps) {
  return (
    <div
      className={commonWrapper({
        direction: "col",
        gap: 20,
        align: "start",
        padding: 32,
      })}
    >
      <Text type="title4">
        <Text type="title4" color="red">
          {DELIVERY_PLAN_LABEL[deliveryPlan]}
        </Text>
        에 한 번씩 <br />
        아래의 상품이 배송돼요
      </Text>
      {recipeList.map((item, idx) => {
        // rawFoodItems에서 해당 recipeId에 맞는 정보 찾기
        const rawFoodItem = rawFoodItems.find(
          (rawItem) => rawItem.recipeId === item.recipeId
        );

        return (
          <React.Fragment key={item.recipeId}>
            <RecipeItemCard
              packGrams={item.oneMealGramsPerRecipe}
              originPrice={item.originalPrice ?? 0}
              mealPlan={mealPlan}
              deliveryPlan={deliveryPlan}
              packCount={packCount}
              displayImageUrl={rawFoodItem?.displayImageUrl || ""}
              recipeName={rawFoodItem?.recipeNameKorea || ""}
            />
            {idx < recipeList.length - 1 && (
              <Divider color="gray200" thickness={1} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
