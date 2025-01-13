
import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "../OrderSheetCommon.css";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useState } from "react";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";

interface RewardUsageProps {
  userTotalReward: number;
  appliedReward: number;
}

export default function RewardUsage ({userTotalReward, appliedReward}: RewardUsageProps) {
  const [inputValue, setInputValue] = useState("")
  return (
    <div className={styles.orderSheetWrapper}>
      <div className={styles.orderSheetTitleWrapper}>
      <DefaultText type="title4">적립금</DefaultText>
      <DefaultText type="label4">{formatNumberWithCommas(userTotalReward)}원 보유</DefaultText>
      </div>
        <div className={styles.orderSheetContentWrapper({direction: 'row'})}>
          <DefaultTextField type="number" id="reward" name="reward" value={inputValue}/>
          <DefaultButton type="gray" size="sm" >전액사용</DefaultButton>
        </div>
    </div>
  )
}