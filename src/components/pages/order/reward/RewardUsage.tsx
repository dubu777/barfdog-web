
import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "../OrderSheetCommon.css";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useState } from "react";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import InputField from "@/components/common/inputField/InputField";
import useForm from "@/hooks/useForm";
import { validateAddPost, validateReward } from "@/utils/validate";

interface RewardUsageProps {
  userTotalReward: number;
  appliedReward: number;
}

export default function RewardUsage ({userTotalReward, appliedReward}: RewardUsageProps) {
  const applyReward = useForm({
    initialValue: {
      appliedReward: 0,
      userTotalReward: 0,
    },
    validate: validateReward,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  };
  return (
    <div className={styles.orderSheetWrapper}>
      <div className={styles.orderSheetTitleWrapper}>
      <DefaultText type="title4">적립금</DefaultText>
      <DefaultText type="label4">{formatNumberWithCommas(userTotalReward)}원 보유</DefaultText>
      </div>
        <div className={styles.orderSheetContentWrapper({direction: 'row'})}>
          <InputField
            {...applyReward.getInputProps("appliedReward")}
            placeholder="0"
          />
          <DefaultButton type="gray" size="sm" >전액사용</DefaultButton>
        </div>
    </div>
  )
}