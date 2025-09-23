import Text from "@/components/common/text/Text";
import { commonWrapper } from "@/styles/common.css";
import RecipeItemCard from "./recipeItemCard/RecipeItemCard";
import React from "react";
import Divider from "@/components/common/divider/Divider";
import { DeliveryPlan, MealPlan, RawFoodOrderItem } from "@/types";
import { DELIVERY_PLAN_LABEL } from "@/constants";
import { CalculatedRecipe } from "@/hooks/subscription/useSubscriptionCalculation";

interface SubscriptionItemListProps {
  rawFoodItems: RawFoodOrderItem[];
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  calculatedRecipes: CalculatedRecipe[];
}

export default function SubscriptionItemList({
  rawFoodItems,
  mealPlan,
  deliveryPlan,
  calculatedRecipes,
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
      {calculatedRecipes.map((item, idx) => {
        const rawFoodItem = rawFoodItems.find(
          (rawItem) => rawItem.recipeId === item.recipeId
        );

        return (
          <React.Fragment key={item.recipeId}>
            <RecipeItemCard
              mealPlan={mealPlan}
              deliveryPlan={deliveryPlan}
              originalPrice={item.originalPrice}
              packCount={item.packCount}
              packGrams={item.packGrams}
              displayImageUrl={rawFoodItem?.displayImageUrl.url || ""}
              recipeName={rawFoodItem?.recipeNameKorea || ""}
            />
            {idx < calculatedRecipes.length - 1 && (
              <Divider color="gray200" thickness={1} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
