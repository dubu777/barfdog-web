import DefaultText from "@/components/common/defaultText/DefaultText";
import {
  mealFrequencyButtonWrapper,
  selectOptionWrapper,
} from "../DeliveryOptions.css";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { commonWrapper } from "@/styles/common.css";
import { deliveryOptions } from "@/constants";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { useEffect } from "react";

export default function DeliveryCycle() {
  const { control } = useFormContext<SubscriptionValues>();
  const mealFrequency = useWatch({ control, name: "mealFrequency" });

  // deliveryCycle 필드 컨트롤러
  const { field: cycleField } = useController({
    name: "deliveryCycle",
    control,
  });

  // mealFrequency가 1인 경우 자동으로 4 선택
  useEffect(() => {
    if (mealFrequency === 1) {
      cycleField.onChange(4);
    }
  }, [mealFrequency, cycleField]);

  // 선택 가능한 주기 결정
  const availableCycles =
    mealFrequency === 1
      ? deliveryOptions.deliveryCycle.filter((opt) => opt.value === 4)
      : deliveryOptions.deliveryCycle;

  return (
    <div className={selectOptionWrapper}>
      <DefaultText type="title4">배송주기</DefaultText>
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
