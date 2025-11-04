"use client";

import Text from "@/components/ui/text/Text";
import * as styles from "./OrderSummaryRow.css";
import { fontColors, textStyles } from "@/components/ui/text/Text.css";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";


interface OrderSummaryRowProps {
  label: string;
  labelType?: keyof typeof textStyles;
  labelColor?: keyof typeof fontColors;
  value: number;
  valueColor?: keyof typeof fontColors;
  valueType?: keyof typeof textStyles;
  freeText?: string;
  /** plainColor가 true면, computed color를 무시하고 항상 "gray900"을 적용 */
  plainColor?: boolean;
  /** plus가 true면, value가 0보다 커도 "-" 기호를 붙이지 않음 */
  plus?: boolean;
}

export default function OrderSummaryRow({
  label,
  labelType = "label2",
  labelColor = "gray700",
  value,
  valueColor,
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
      <Text type={labelType} color={labelColor}>
        {label}
      </Text>
      <Text type={valueType} color={valueColor ?? computedValueColor}>
        {formattedValue}
      </Text>
    </div>
  );
}