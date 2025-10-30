import Text from "@/components/ui/text/Text";
import {
  mealFrequencyButtonWrapper,
  selectOptionWrapper,
} from "../DeliveryOptions.css";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { commonWrapper } from "@/styles/common.css";
import { deliveryOptions } from "@/constants";
import SurveyButton from "@/components/domain/survey/surveyButton/SurveyButton";
import { useEffect } from "react";
import { SubscriptionValues } from "@/types";

interface DeliveryCycleProps {
  source?: "edit" | "order";
}

export default function DeliveryCycle({ source }: DeliveryCycleProps) {
  const { control } = useFormContext<SubscriptionValues>();
  const mealPlan = useWatch({ control, name: "mealPlan" }) || 2;

  // deliveryCycle 필드 컨트롤러
  const { field: cycleField } = useController({
    name: "deliveryPlan",
    control,
  });

  // mealFrequency가 1인 경우 자동으로 4 선택
  useEffect(() => {
    if (mealPlan === 1) {
      cycleField.onChange(4);
    }
  }, [mealPlan]);

  // 선택 가능한 주기 결정
  const availableCycles =
    mealPlan === 1
      ? deliveryOptions.deliveryPlan.filter((opt) => opt.value === 4)
      : deliveryOptions.deliveryPlan;

  return (
    <div className={selectOptionWrapper({ source })}>
      <Text type="title4">배송주기</Text>
      <div className={commonWrapper({ gap: 8, justify: "start" })}>
        {availableCycles.map((item) => (
          <div className={mealFrequencyButtonWrapper} key={item.value}>
            <SurveyButton
              label={item.label}
              value={item.value}
              isChecked={cycleField.value === item.value}
              inputType="normal"
              onToggle={() => cycleField.onChange(item.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
