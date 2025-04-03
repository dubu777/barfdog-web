import * as styles from "../../OrderSheetCommon.css";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import InputField from "@/components/common/inputField/InputField";
import OrderSection from "../orderSection/OrderSection";

import { OrderFormValues } from "@/utils/validation/rewardValidation";
import {
  Control,
  Controller,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import Button from "@/components/common/button/Button";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import { ORDER_MESSAGE, ORDER_TYPE } from "@/constants";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useRewardStore } from "@/store/order/useRewardStore";
import { OrderType } from "@/types";

interface RewardUsageProps {
  control: Control<OrderFormValues>;
  maxAvailableReward: number;
  setValue: UseFormSetValue<OrderFormValues>;
  orderType: OrderType;
}

export default function RewardUsage({
  control,
  maxAvailableReward,
  orderType,
  setValue,
}: RewardUsageProps) {
  const {
    userTotalReward,
    rewardAutoApply,
    setAppliedReward,
    setRewardAutoApply,
  } = useRewardStore();

  const appliedReward = useWatch({ control, name: "appliedReward" });

  // 전액 사용 함수
  const handleMaxReward = () => {
    if (appliedReward === maxAvailableReward) {
      setValue("appliedReward", 0);
      setAppliedReward(0);
    } else {
      setValue("appliedReward", maxAvailableReward);
      setAppliedReward(maxAvailableReward);
    }
  };

  // 자동적용 API 개발시 코드 추가 예정
  const handleSetRewardAutoApply = (value: boolean | null) => {
    setRewardAutoApply(value === null ? false : value);
  };

  const { onToggle, isSelected } = useToggleOption<boolean>(
    rewardAutoApply,
    "checkbox",
    setRewardAutoApply
  );

  return (
    <OrderSection
      title="적립금"
      subTitleParts={[
        {
          text: `${formatNumberWithCommas(userTotalReward)}P\u00A0`,
          color: "red",
        },
        { text: "보유", color: "gray700" },
      ]}
    >
      <div className={styles.orderCommonWrapper({ direction: "row" })}>
        <Controller
          name="appliedReward"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="0"
              type="number"
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
        <Button
          type="primary"
          variant="solid"
          size="inputButton"
          onClick={handleMaxReward}
        >
          전액사용
        </Button>
      </div>
      {orderType === ORDER_TYPE.SUBSCRIPTION && (
        <LabeledCheckbox
          value={true}
          isChecked={isSelected(true)}
          onToggle={() => onToggle(true)}
        >
          <DefaultText type="label2">
            {ORDER_MESSAGE.REWARD_AUTO_APPLY}
          </DefaultText>
        </LabeledCheckbox>
      )}
    </OrderSection>
  );
}
