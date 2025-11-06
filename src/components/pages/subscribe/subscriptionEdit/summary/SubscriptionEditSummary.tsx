"use client";

import Text from "@/components/ui/text/Text";
import { commonWrapper, marginStyles } from "@/styles/common.css";
import {
  DeliveryPlan,
  MealPlan,
  RecipeFormItem,
  RecipeListType,
  SubscriptionInfoResponse,
} from "@/types";
import PlanPicker from "./planPicker/PlanPicker";
import SubscriptionItemPicker from "./subscriptionItemPicker/SubscriptionItemPicker";
import { de } from "date-fns/locale";
import { RecipeCatalogMap } from "@/utils/subscription/buildRecipeCatalog";
import { CalculatedRecipe } from "@/hooks/subscription/useSubscriptionCalculation";

interface SubscriptionEditProps {
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  packCount: number;
  recipeCatalog: RecipeCatalogMap;
  subscriptionCount: number;
  onOpenPlanSheet: () => void;
  onGoToEdit: () => void;
  calculatedRecipes: CalculatedRecipe[];
}

export default function SubscriptionEditSummary({
  mealPlan,
  deliveryPlan,
  recipeCatalog,
  subscriptionCount,
  packCount,
  onOpenPlanSheet,
  onGoToEdit,
  calculatedRecipes,
}: SubscriptionEditProps) {
  return (
    <div
      className={commonWrapper({
        direction: "col",
        gap: 20,
        padding: "40/20",
        align: "start",
      })}
    >
      <div>
        <Text type="title3" className={marginStyles({ bottom: 4 })}>
          아래의 정보 확인 후<br />
          식단 변경을 진행해 주세요
        </Text>
        <Text type="body2" color="red">
          식단 변경은 {subscriptionCount + 1}회차부터 적용됩니다.
        </Text>
      </div>
      <PlanPicker
        mealPlan={mealPlan}
        deliveryPlan={deliveryPlan}
        onClick={onOpenPlanSheet}
      />
      <SubscriptionItemPicker
        mealPlan={mealPlan}
        deliveryPlan={deliveryPlan}
        packCount={packCount}
        onClick={onGoToEdit}
        calculatedRecipes={calculatedRecipes}
        recipeCatalog={recipeCatalog}
      />
    </div>
  );
}
