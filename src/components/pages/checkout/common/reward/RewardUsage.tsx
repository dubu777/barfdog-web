import * as styles from "../../OrderSheetCommon.css";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import InputField from "@/components/ui/inputField/InputField";
import OrderSection from "../orderSection/OrderSection";
import Button from "@/components/ui/button/Button";
import { useRewardStore } from "@/store/checkout/useRewardStore";
import { clampFromCommaString } from "@/utils/clampFromCommaString";
import { ChangeEvent } from "react";

export default function RewardUsage() {
  const {
    userTotalReward,
    appliedReward,
    maxAvailableReward,
    setAppliedReward,
  } = useRewardStore();

  // 전액 사용 함수
  const handleMaxReward = () => {
    if (appliedReward === maxAvailableReward) {
      setAppliedReward(0);
    } else {
      setAppliedReward(maxAvailableReward);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = clampFromCommaString(e.target.value, maxAvailableReward);
    setAppliedReward(next);
  };

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
        <InputField
          placeholder="0"
          value={formatNumberWithCommas(appliedReward)}
          onChange={handleChange}
        />

        <Button size="inputButton" onClick={handleMaxReward}>
          전액사용
        </Button>
      </div>
    </OrderSection>
  );
}
