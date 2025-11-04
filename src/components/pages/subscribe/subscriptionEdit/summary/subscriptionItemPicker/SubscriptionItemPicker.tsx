import Card from "@/components/ui/card/Card";
import Button from "@/components/ui/button/Button";
import Divider from "@/components/ui/divider/Divider";
import { commonWrapper } from "@/styles/common.css";
import { CurrentRecipeItem, DeliveryPlan, MealPlan, RawFood } from "@/types";
import React from "react";
import RecipeItemCard from "../../../deliveryOptions/subscriptionItemList/recipeItemCard/RecipeItemCard";
import Text from "@/components/ui/text/Text";

interface SubscriptionItemPickerProps {
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  packCount: number;
  onClick: () => void;
  recipeList: CurrentRecipeItem[];
}

export default function SubscriptionItemPicker({
  recipeList,
  mealPlan,
  deliveryPlan,
  packCount,
  onClick,
}: SubscriptionItemPickerProps) {
  return (
    <Card shadow="light" padding={16} gap={12}>
      <div className={commonWrapper({ justify: "between" })}>
        <Text type="title4">구독 상품</Text>
        <Button
          variant="outline"
          intent="assistive"
          size="sm"
          onClick={onClick}
        >
          수정
        </Button>
      </div>
      <Divider thickness={2} color="gray900" />
      {recipeList.map((rawFood, idx) => (
        <React.Fragment key={rawFood.recipeId}>
          <RecipeItemCard
            mealPlan={mealPlan}
            deliveryPlan={deliveryPlan}
            originalPrice={rawFood.originalPrice}
            packCount={packCount}
            packGrams={rawFood.oneMealGramsPerRecipe}
            displayImageUrl={rawFood?.displayImageUrl.url || ""}
            recipeName={rawFood?.name || ""}
          />
          {idx < recipeList.length - 1 && (
            <Divider color="gray200" thickness={1} />
          )}
        </React.Fragment>
      ))}
    </Card>
  );
}
