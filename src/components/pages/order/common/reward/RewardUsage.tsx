import * as styles from "../../OrderSheetCommon.css";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import InputField from "@/components/common/inputField/InputField";
import OrderSection from "../orderSection/OrderSection";

import {

  OrderFormValues,
} from "@/utils/validation/rewardValidation";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

interface RewardUsageProps {
  control: Control<OrderFormValues>;
  userTotalReward: number;
  maxAvailableReward: number;
  setValue: UseFormSetValue<OrderFormValues>;
  setAppliedReward: (value: number) => void;
}

export default function RewardUsage({
  control,
  userTotalReward,
  maxAvailableReward,
  setValue,
  setAppliedReward,
}: RewardUsageProps) {
  const handleMaxReward = () => {
    setValue("appliedReward", maxAvailableReward);
    setAppliedReward(maxAvailableReward);
  };

  return (
    <OrderSection
      title="적립금"
      subTitleParts={[
        {
          text: `${formatNumberWithCommas(userTotalReward)}P\u00A0`,
          isPoint: true,
        },
        { text: "보유" },
      ]}
    >
      <div className={styles.orderSheetContentWrapper({ direction: "row" })}>
        <Controller
          name="appliedReward"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="0"
              type="text"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const inputValue = parseInt(target.value, 10) || 0;
        
                if (inputValue > maxAvailableReward) {
                  const newValue = maxAvailableReward;
                  field.onChange({
                    ...e,
                    target: {
                      ...e.target,
                      value: newValue.toString(),
                    },
                  });
                  setValue("appliedReward", newValue);
                  setAppliedReward(newValue);
                  // input에도 바로 적용되도록 value를 업데이트
                  target.value = newValue.toString();
                  return;
                }
        
                field.onChange(e);
                setAppliedReward(inputValue);
              }}
              onFocus={(e) => {
                if (e.target.value === "0") {
                  e.target.value = "";
                }
              }}
            />
          )}
        />
        <DefaultButton type="gray" size="sm" onClick={handleMaxReward}>
          전액사용
        </DefaultButton>
      </div>
    </OrderSection>
  );
}
