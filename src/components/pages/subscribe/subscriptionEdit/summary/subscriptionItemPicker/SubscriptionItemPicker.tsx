import Card from "@/components/common/card/Card";
import LabelValueItem from "@/components/common/labelValueItem/LabelValueItem";
import { DELIVERY_PLAN_LABEL, MEAL_PLAN_LABEL } from "@/constants";
import Button from "@/components/common/button/Button";
import Divider from "@/components/common/divider/Divider";
import { commonWrapper } from "@/styles/common.css";
import { DeliveryPlan, MealPlan, RawFood } from "@/types";
import React from "react";
import RecipeItemCard from "../../../deliveryOptions/subscriptionItemList/recipeItemCard/RecipeItemCard";
import Text from "@/components/common/text/Text";

interface SubscriptionItemPickerProps {
  rawFoods: RawFood[];
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  packCount: number;
  onClick: () => void;
}

export default function SubscriptionItemPicker({
  rawFoods,
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
      {rawFoods.map((rawFood, idx) => (
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
          {idx < rawFoods.length - 1 && (
            <Divider color="gray200" thickness={1} />
          )}
        </React.Fragment>
      ))}
    </Card>
  );
}
