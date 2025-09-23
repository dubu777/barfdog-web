import React from "react";
import Divider from "@/components/common/divider/Divider";
import OrderSection from "../../common/orderSection/OrderSection";
import { DeliveryPlan, MealPlan, RawFoodItemSummary } from "@/types";
import * as styles from "./SubscriptionOrderItemList.css";
import RecipeItemCard from "@/components/pages/subscribe/deliveryOptions/subscriptionItemList/recipeItemCard/RecipeItemCard";
import { calculateDeliveryCyclePackCount } from "@/utils/subscription/calculateRecipe";

interface SubscriptionOrderItemListProps {
  rawFoodList: RawFoodItemSummary[];
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
}

export default function SubscriptionOrderItemList({
  rawFoodList,
  mealPlan,
  deliveryPlan,
}: SubscriptionOrderItemListProps) {
  const packCount = calculateDeliveryCyclePackCount(
    mealPlan,
    deliveryPlan,
    rawFoodList.length
  );
  return (
    <OrderSection title="구독 상품" style={{ gap: "20px" }}>
      <div className={styles.orderItemListContainer}>
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
            {index < array.length - 1 && (
              <Divider thickness={1} style={{ margin: "16px 0" }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </OrderSection>
  );
}
