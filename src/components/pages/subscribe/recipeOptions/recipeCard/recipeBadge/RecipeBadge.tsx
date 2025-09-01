"use client";

import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import * as styles from "./RecipeBadge.css";
import CloseIcon from "public/images/survey/close_small.svg";
import Text from "@/components/common/text/Text";
interface RecipeBadgeProps {
  inedibleFoodText: string;
}

export default function RecipeBadge({ inedibleFoodText }: RecipeBadgeProps) {
  return (
    <div className={styles.recipeBadgeContainer}>
      <SvgIcon src={CloseIcon} color="red" size={20} />
      <Text type="caption" color="pastelRed">
        {inedibleFoodText} 알러지가 있으니 급여에 주의해주세요
      </Text>
    </div>
  );
}
