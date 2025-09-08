import Text from "@/components/common/text/Text";
import { selectOptionWrapper } from "../DeliveryOptions.css";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { deliveryOptions } from "@/constants";
import { commonWrapper } from "@/styles/common.css";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { Controller, useFormContext } from "react-hook-form";

export default function MealFrequency() {
  const { control } = useFormContext<SubscriptionValues>();

  return (
    <div className={selectOptionWrapper}>
      <Text type="title4">식사량</Text>

      <Controller
        name="mealPlan"
        control={control}
        render={({ field }) => (
          <div className={commonWrapper({ gap: 8 })}>
            {deliveryOptions.mealPlan.map((item) => (
              <SurveyButton
                key={item.value}
                label={item.label}
                value={item.value}
                isChecked={field.value === item.value}
                chipText={item.discountRate}
                inputType="normal"
                onToggle={() => field.onChange(item.value)}
              />
            ))}
          </div>
        )}
      />
    </div>
  );
}
