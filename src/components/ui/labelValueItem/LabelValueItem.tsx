"use client";

import Text from "@/components/ui/text/Text";
import * as styles from "./LabelValueItem.css";
import { fontColors, textStyles } from "@/components/ui/text/Text.css";
import { ReactNode } from "react";

interface LabelValueItemProps {
  label: string;
  labelType?: keyof typeof textStyles;
  labelColor?: keyof typeof fontColors;
  labelWidth?: 60 | 80 | 100 | 120;
  value?: ReactNode;
  valueColor?: keyof typeof fontColors;
  valueType?: keyof typeof textStyles;
  align?: "start" | "center" | "end";
  justify?: "start" | "between";
  gap?: 6 | 12;
  className?: string;
}

export default function LabelValueItem({
  label,
  labelType = "label2",
  labelColor = "gray800",
  labelWidth = 100,
  value,
  valueColor = "gray700",
  valueType = "body2",
  align = "center",
  justify = "start",
  gap = 6,
  className = "",
}: LabelValueItemProps) {
  const isNullish = value === null || value === undefined;
  const isEmptyString = typeof value === "string" && value.trim() === "";

  const displayValue = isNullish || isEmptyString ? "-" : value;
  return (
    <div
      className={`${styles.labelValueItemContainer({
        align,
        gap,
        justify,
      })} ${className}`}
    >
      <Text
        type={labelType}
        color={labelColor}
        className={styles.labelText({ width: labelWidth })}
      >
        {label}
      </Text>
      <Text type={valueType} color={valueColor} className={styles.valueText}>
        {displayValue}
      </Text>
    </div>
  );
}
