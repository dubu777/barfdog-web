import DefaultText from "@/components/common/defaultText/DefaultText";
import { mealFrequencyButtonWrapper, selectOptionWrapper } from "../DeliveryOptions.css";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { commonWrapper } from "@/styles/common.css";
import { deliveryOptions } from "@/constants";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { useEffect } from "react";

export default function DeliveryCycle() {
  const { control } = useFormContext<SubscriptionValues>();
  const mealFrequency = useWatch({ control, name: "mealFrequency" });

  const availableCycles =
    mealFrequency === 1
      ? deliveryOptions.deliveryCycle.filter((opt) => opt.value === 4)
      : deliveryOptions.deliveryCycle;
  return (
    <div className={selectOptionWrapper}>
      <DefaultText type="title4">배송주기</DefaultText>

      <Controller
        name="deliveryCycle"
        control={control}
        render={({ field }) => {
          // mealFrequency 가 1 이면 자동으로 4 선택.
          useEffect(() => {
            if (mealFrequency === 1) {
              field.onChange(4);
            }
          }, [mealFrequency]);

          return (
            <div className={commonWrapper({ gap: 8, justify: "start" })}>
              {availableCycles.map((item) => (
                <div className={mealFrequencyButtonWrapper} key={item.value}>
                  <SurveyButton
                    label={item.label}
                    value={item.value}
                    isChecked={field.value === item.value}
                    inputType="normal"
                    onToggle={() => field.onChange(item.value)}
                  />
                </div>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
}