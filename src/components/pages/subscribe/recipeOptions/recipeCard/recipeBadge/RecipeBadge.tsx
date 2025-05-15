"use client";

import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import * as styles from "./RecipeBadge.css";
import CloseIcon from "public/images/survey/close_small.svg"
import DefaultText from "@/components/common/defaultText/DefaultText";
interface RecipeBadgeProps {
  inedibleFoodText: string;
}

export default function RecipeBadge({
  inedibleFoodText,
}: RecipeBadgeProps) {
  
  return (
    <div className={styles.recipeBadgeContainer}>
      <SvgIcon src={CloseIcon} size={20} />
      <DefaultText type="caption" color="pastelRed">{inedibleFoodText} 알러지가 있으니 급여에 주의해주세요</DefaultText>
    </div>
  );
}