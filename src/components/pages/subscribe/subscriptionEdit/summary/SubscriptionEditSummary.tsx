"use client";

import Text from "@/components/ui/text/Text";
import { commonWrapper, marginStyles } from "@/styles/common.css";
import {
  DeliveryPlan,
  MealPlan,
  RawFood,
  SubscriptionInfoResponse,
} from "@/types";
import PlanPicker from "./planPicker/PlanPicker";
import SubscriptionItemPicker from "./subscriptionItemPicker/SubscriptionItemPicker";

interface SubscriptionEditProps {
  packCount: number;
  currentSubscriptionInfo: SubscriptionInfoResponse;
  onOpenPlanSheet: () => void;
  onGoToEdit: () => void;
}

export default function SubscriptionEditSummary({
  currentSubscriptionInfo,
  packCount,
  onOpenPlanSheet,
  onGoToEdit,
}: SubscriptionEditProps) {
  const { mealCount, weeks } = currentSubscriptionInfo.planInfo;
  const { recipeList, subscriptionCount } = currentSubscriptionInfo;
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
        mealPlan={mealCount}
        deliveryPlan={weeks}
        onClick={onOpenPlanSheet}
      />
      <SubscriptionItemPicker
        mealPlan={mealCount}
        deliveryPlan={weeks}
        recipeList={recipeList}
        packCount={packCount}
        onClick={onGoToEdit}
      />
    </div>
  );
}
