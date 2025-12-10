import Card from "@/components/ui/card/Card";
import Button from "@/components/ui/button/Button";
import Divider from "@/components/ui/divider/Divider";
import { commonWrapper } from "@/styles/common.css";
import { DeliveryPlan, MealPlan, RecipeFormItem } from "@/types";
import React from "react";
import RecipeItemCard from "../../../deliveryOptions/subscriptionItemList/recipeItemCard/RecipeItemCard";
import Text from "@/components/ui/text/Text";
import { CalculatedRecipe } from "@/hooks/subscription/useSubscriptionCalculation";
import { RecipeCatalogMap } from "@/utils/subscription/buildRecipeCatalog";

interface SubscriptionItemPickerProps {
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  packCount: number;
  onClick: () => void;
  calculatedRecipes: CalculatedRecipe[];
  recipeCatalog: RecipeCatalogMap;
}

export default function SubscriptionItemPicker({
  mealPlan,
  deliveryPlan,
  packCount,
  onClick,
  calculatedRecipes,
  recipeCatalog,
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
      <Divider height={2} color="gray900" />
      {calculatedRecipes.map((recipe, idx) => (
        <React.Fragment key={recipe.recipeId}>
          <RecipeItemCard
            mealPlan={mealPlan}
            deliveryPlan={deliveryPlan}
            originalPrice={recipe.originalPrice}
            packCount={packCount}
            gramsPerMeal={recipe.gramsPerMeal}
            displayImageUrl={recipeCatalog[recipe.recipeId]?.url || ""}
            recipeName={recipeCatalog[recipe.recipeId]?.name || ""}
          />
          {idx < calculatedRecipes.length - 1 && (
            <Divider color="gray200" height={1} />
          )}
        </React.Fragment>
      ))}
    </Card>
  );
}
