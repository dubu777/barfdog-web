"use client";

import { useGetSubscriptionDetailV2 } from "@/api/subscription/queries/useGetSubscriptionDetailV2";
import Text from "@/components/common/text/Text";
import { commonWrapper, marginStyles } from "@/styles/common.css";
import PlanPicker from "./planPicker/PlanPicker";
import { calculateDeliveryCyclePackCount } from "@/utils/subscription/calculateRecipe";
import SubscriptionItemPicker from "./subscriptionItemPicker/SubscriptionItemPicker";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import useModal from "@/hooks/useModal";
import PlanBottomSheet from "./bottomSheet/PlanBottomSheet";
import { FormProvider, useForm } from "react-hook-form";
import {
  defaultSubscriptionValues,
  subscriptionSchema,
  SubscriptionValues,
} from "@/utils/validation/subscriptionValidation";
import { yupResolver } from "@hookform/resolvers/yup";

interface SubscriptionEditProps {
  reportId: number;
}

export default function SubscriptionEdit({ reportId }: SubscriptionEditProps) {
  const { data: detailData } = useGetSubscriptionDetailV2(reportId);
  console.log(detailData, "detailData");

  const { isOpen, onClose, onToggle } = useModal();

  const form = useForm<SubscriptionValues>({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: defaultSubscriptionValues,
    mode: "all",
  });

  // 변경 가능 회차
  const editableSeq = detailData.next
    ? detailData.subscriptionCount + 1
    : detailData.subscriptionCount;

  const packCount = calculateDeliveryCyclePackCount(
    detailData.mealPlan,
    detailData.deliveryPlan,
    detailData.rawFoods.length
  );

  const handleOpenPlanSheet = () => {
    onToggle();
  };
  const handleGoToRawFoodOptions = () => {
    console.log("go to raw food options");
  };

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
          식단 변경은 {editableSeq}회차부터 적용됩니다.
        </Text>
      </div>
      <FormProvider {...form}>
        <PlanPicker
          mealPlan={detailData.mealPlan}
          deliveryPlan={detailData.deliveryPlan}
          onClick={handleOpenPlanSheet}
        />
        <SubscriptionItemPicker
          mealPlan={detailData.mealPlan}
          deliveryPlan={detailData.deliveryPlan}
          rawFoods={detailData.rawFoods}
          packCount={packCount}
          onClick={handleGoToRawFoodOptions}
        />
        <ButtonDocked
          primaryButtonLabel="식단 변경하기"
          onPrimaryClick={() => {}}
          type="full-button"
          isPrimaryDisabled={true}
        />
        {isOpen && (
          <PlanBottomSheet
            isOpen={isOpen}
            onClose={onClose}
            onCommit={() => {}}
          />
        )}
      </FormProvider>
    </div>
  );
}
