import * as styles from "../../OrderSheetCommon.css";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import InputField from "@/components/ui/inputField/InputField";
import OrderSection from "../orderSection/OrderSection";
import Button from "@/components/ui/button/Button";
import LabeledCheckbox from "@/components/ui/labeledCheckBox/LabeledCheckBox";
import { ORDER_MESSAGE, ORDER_TYPE } from "@/constants";
import Text from "@/components/ui/text/Text";
import { useToggleOption } from "@/hooks/useToggleOption";
import { useRewardStore } from "@/store/checkout/useRewardStore";
import { OrderType } from "@/types";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import { commonWrapper } from "@/styles/common.css";
import { clampFromCommaString } from "@/utils/clampFromCommaString";
import { ChangeEvent } from "react";

interface RewardUsageProps {
  orderType: OrderType;
  isAutoUseReward?: boolean;
}

export default function RewardUsage({
  orderType,
  isAutoUseReward = false,
}: RewardUsageProps) {
  const {
    userTotalReward,
    autoUseReward,
    appliedReward,
    maxAvailableReward,
    setAppliedReward,
    setAutoUseReward,
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

  const { onToggle, isSelected } = useToggleOption<boolean>(
    autoUseReward,
    "checkbox",
    setAutoUseReward
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
        <InputField
          placeholder="0"
          value={formatNumberWithCommas(appliedReward)}
          onChange={handleChange}
        />

        <Button size="inputButton" onClick={handleMaxReward}>
          전액사용
        </Button>
      </div>
      {orderType === ORDER_TYPE.SUBSCRIPTION &&
        (isAutoUseReward ? (
          <div
            className={commonWrapper({
              direction: "col",
              align: "start",
              gap: 8,
            })}
          >
            <InfoBox text="적립금 자동 사용 적용중" color="blue" fullWidth />
            <div
              className={commonWrapper({ direction: "col", align: "start" })}
            >
              <Text type="caption" color="gray700">
                {ORDER_MESSAGE.REWARD_AUTO_APPLY_NOTICE_1}
              </Text>
              <Text type="caption" color="gray700">
                {ORDER_MESSAGE.REWARD_AUTO_APPLY_NOTICE_2}
              </Text>
            </div>
          </div>
        ) : (
          <LabeledCheckbox
            value={true}
            isChecked={isSelected(true)}
            onToggle={() => onToggle(true)}
          >
            <Text type="label2">{ORDER_MESSAGE.REWARD_AUTO_APPLY}</Text>
          </LabeledCheckbox>
        ))}
    </OrderSection>
  );
}
