"use client";

import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./OrderSummaryRow.css";
import { fontColors, textStyles } from "@/components/common/defaultText/DefaultText.css";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";


interface OrderSummaryRowProps {
  label: string;
  value: number;
  valueType?: keyof typeof textStyles;
  freeText?: string;
  /** plainColor가 true면, computed color를 무시하고 항상 "gray900"을 적용 */
  plainColor?: boolean;
  /** plus가 true면, value가 0보다 커도 "-" 기호를 붙이지 않음 */
  plus?: boolean;
}

export default function OrderSummaryRow({
  label,
  value,
  valueType = "body2",
  freeText,
  plainColor = false,
  plus = false,
}: OrderSummaryRowProps) {
  const formattedValue = (() => {
    if (plus) {
      return value === 0 && freeText ? freeText : `${formatNumberWithCommas(value)}원`;
    } else {
      if (value > 0) {
        return `-${formatNumberWithCommas(value)}원`;
      } else if (value === 0 && freeText) {
        return freeText;
      } else {
        return `${formatNumberWithCommas(value)}원`;
      }
    }
  })();
  const computedValueColor = (() => {
    if (plainColor) {
      return "gray900"
    } else if ( value > 0 || (value === 0 && freeText)) {
      return "red"
    } else {
      return "gray900"
    }
  })()
  return (
    <div className={styles.orderSummaryRowContainer}>
      <DefaultText type="label2" color="gray700">
        {label}
      </DefaultText>
      <DefaultText type={valueType} color={computedValueColor}>
        {formattedValue}
      </DefaultText>
    </div>
  );
}