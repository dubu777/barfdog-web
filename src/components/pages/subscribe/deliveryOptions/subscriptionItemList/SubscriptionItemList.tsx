import Text from "@/components/ui/text/Text";
import { commonWrapper } from "@/styles/common.css";
import RecipeItemCard from "./recipeItemCard/RecipeItemCard";
import React from "react";
import Divider from "@/components/ui/divider/Divider";
import { DeliveryPlan, MealPlan, RecommendedRecipeItem } from "@/types";
import { DELIVERY_PLAN_LABEL } from "@/constants";
import { CalculatedRecipe } from "@/hooks/subscription/useSubscriptionCalculation";

interface SubscriptionItemListProps {
  rawFoodItems: RecommendedRecipeItem[];
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
        paddingY: 32,
        paddingX: 20,
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
              gramsPerMeal={item.gramsPerMeal}
              displayImageUrl={rawFoodItem?.displayImageUrl.url || ""}
              recipeName={rawFoodItem?.recipeNameKorea || ""}
            />
            {idx < calculatedRecipes.length - 1 && (
              <Divider color="gray200" height={1} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
