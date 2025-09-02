"use client";

import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import * as styles from "./RawFoodBadge.css";
import CloseIcon from "public/images/survey/close_small.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface RawFoodBadgeProps {
  inedibleFoodText: string;
}

export default function RawFoodBadge({ inedibleFoodText }: RawFoodBadgeProps) {
  return (
    <div className={styles.recipeBadgeContainer}>
      <SvgIcon src={CloseIcon} color="red" size={20} />
      <DefaultText type="caption" color="pastelRed">
        {inedibleFoodText} 알러지가 있으니 급여에 주의해주세요
      </DefaultText>
    </div>
  );
}
