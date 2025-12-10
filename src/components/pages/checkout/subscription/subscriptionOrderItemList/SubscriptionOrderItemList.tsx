import React from "react";
import Divider from "@/components/ui/divider/Divider";
import OrderSection from "../../common/orderSection/OrderSection";
import { DeliveryPlan, MealPlan, SubscribeRecipeItem } from "@/types";
import RecipeItemCard from "@/components/pages/subscribe/deliveryOptions/subscriptionItemList/recipeItemCard/RecipeItemCard";
import { calculateDeliveryCyclePackCount } from "@/utils/subscription/calculateRecipe";
import { commonWrapper } from "@/styles/common.css";

interface SubscriptionOrderItemListProps {
  recipeList: SubscribeRecipeItem[];
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
}

export default function SubscriptionOrderItemList({
  recipeList,
  mealPlan,
  deliveryPlan,
}: SubscriptionOrderItemListProps) {
  const packCount = calculateDeliveryCyclePackCount(
    mealPlan,
    deliveryPlan,
    recipeList.length
  );

  return (
    <OrderSection title="구독 상품" gap={20}>
      <div className={commonWrapper({ direction: "col", gap: 16 })}>
        {recipeList.map((item, index, array) => (
          <React.Fragment key={item.recipeId}>
            <RecipeItemCard
              mealPlan={mealPlan}
              deliveryPlan={deliveryPlan}
              originalPrice={item.totalOriginalPrice}
              packCount={packCount}
              gramsPerMeal={item.gramsPerMeal}
              displayImageUrl={item?.displayImageUrl.url || ""}
              recipeName={item?.name || ""}
            />
            {index < array.length - 1 && <Divider height={1} />}
          </React.Fragment>
        ))}
      </div>
    </OrderSection>
  );
}
