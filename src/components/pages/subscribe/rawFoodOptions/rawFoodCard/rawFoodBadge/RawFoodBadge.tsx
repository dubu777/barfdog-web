"use client";

import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import * as styles from "./RawFoodBadge.css";
import CloseIcon from "public/images/survey/close_small.svg";
import Text from "@/components/common/text/Text";
import { INGREDIENT_CONFIG } from "@/constants/dietAnalysis";

interface RawFoodBadgeProps {
  inedibleFoods: string[];
}

export default function RawFoodBadge({ inedibleFoods }: RawFoodBadgeProps) {
  return (
    <div className={styles.recipeBadgeContainer}>
      <SvgIcon src={CloseIcon} color="red" size={20} />
      <Text type="caption" color="pastelRed">
        {inedibleFoods.map((food) => INGREDIENT_CONFIG[food].label).join(", ")}{" "}
        알러지가 있으니 급여에 주의해주세요
      </Text>
    </div>
  );
}
