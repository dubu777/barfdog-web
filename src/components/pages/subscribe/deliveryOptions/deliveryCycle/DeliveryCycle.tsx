import DefaultText from "@/components/common/defaultText/DefaultText";
import { selectOptionWrapper } from "../DeliveryOptions.css";
import { Controller, useFormContext } from "react-hook-form";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { commonWrapper } from "@/styles/common.css";
import { deliveryOptions } from "@/constants";
import SurveyButton from "@/components/pages/survey/surveyButton/SurveyButton";

export default function DeliveryCycle() {
  const { control } = useFormContext<SubscriptionValues>();
  
  return (
    <div className={selectOptionWrapper}>
      <DefaultText type="title4">배송주기</DefaultText>

      <Controller
        name="deliveryCycle"
        control={control}
        render={({ field }) => (
          <div className={commonWrapper({ gap: 8 })}>
            {deliveryOptions.deliveryCycle.map((item) => (
              <SurveyButton
                key={item.value}
                label={item.label}
                value={item.value}
                isChecked={field.value === item.value}
                inputType="normal"
                onToggle={() => field.onChange(item.value)}
              />
            ))}
          </div>
        )}
      />
    </div>
  )
}