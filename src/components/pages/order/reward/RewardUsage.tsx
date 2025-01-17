
import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "../OrderSheetCommon.css";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useEffect, useMemo } from "react";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import InputField from "@/components/common/inputField/InputField";
import useForm from "@/hooks/useForm";
import { validateReward } from "@/utils/validate";

interface RewardUsageProps {
  userTotalReward: number;
  maxAvailableReward: number;
  setAppliedReward: (reward: number) => void;
}

export default function RewardUsage ({userTotalReward, maxAvailableReward, setAppliedReward}: RewardUsageProps) {
  // userTotalReward 무한 렌더링 방지
  const validate = useMemo(() => {
    return (values: { appliedReward: number }) =>
      validateReward({ ...values, userTotalReward });
  }, [userTotalReward]);

  // reward - useForm
  const reward = useForm({
    initialValue: {
      appliedReward: 0,
    },
    validate,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10) || 0;

    // 보유 적립금을 초과하면 이전 유효한 값으로 되돌림
    if (inputValue > userTotalReward) {
      e.target.value = reward.values.appliedReward.toString();
      return;
    }
    
    reward.handleChange("appliedReward", inputValue);
  };

  // 최대 적립금 적용
  const handleMaxReward = () => {
    reward.handleChange("appliedReward", maxAvailableReward);
    setAppliedReward(maxAvailableReward);
  }

  useEffect(() => {
    if (!!reward.errors.appliedReward) return;
    setAppliedReward(reward.values.appliedReward);
  }, [reward.values.appliedReward, setAppliedReward]);

console.log('useForm-reward',reward);
console.log('maxAvailableReward-reward',maxAvailableReward);

  return (
    <div className={styles.orderSheetWrapper}>
      <div className={styles.orderSheetTitleWrapper}>
      <DefaultText type="title4">적립금</DefaultText>
      <DefaultText type="label4">{formatNumberWithCommas(userTotalReward)}원 보유</DefaultText>
      </div>
        <div className={styles.orderSheetContentWrapper({direction: 'row'})}>
          <InputField
            {...reward.getInputProps("appliedReward")}
            placeholder="0"
            type="number"
            error={reward.errors.appliedReward}
            touched={reward.touched.appliedReward}
            onChange={handleInputChange}
            onFocus={(e) => {
              if (e.target.value === "0") {
                e.target.value = "";
              }
            }}
          />
          <DefaultButton type="gray" size="sm" onClick={handleMaxReward}>전액사용</DefaultButton>
        </div>
    </div>
  )
}