"use client";

import Text from "@/components/common/text/Text";
import { commonWrapper, marginStyles } from "@/styles/common.css";
import { DeliveryPlan, MealPlan, RawFood } from "@/types";
import PlanPicker from "./planPicker/PlanPicker";
import SubscriptionItemPicker from "./subscriptionItemPicker/SubscriptionItemPicker";

interface SubscriptionEditProps {
  mealPlan: MealPlan;
  deliveryPlan: DeliveryPlan;
  packCount: number;
  subscriptionCount: number;
  rawFoods: RawFood[];
  onOpenPlanSheet: () => void;
  onGoToEdit: () => void;
}

export default function SubscriptionEditSummary({
  mealPlan,
  deliveryPlan,
  packCount,
  subscriptionCount,
  rawFoods,
  onOpenPlanSheet,
  onGoToEdit,
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
          식단 변경은 {subscriptionCount}회차부터 적용됩니다.
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
        rawFoods={rawFoods}
        packCount={packCount}
        onClick={onGoToEdit}
      />
    </div>
  );
}
