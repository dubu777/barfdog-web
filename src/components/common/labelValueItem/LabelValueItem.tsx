"use client";

import Text from "@/components/common/text/Text";
import * as styles from "./LabelValueItem.css";
import {
  fontColors,
  textStyles,
} from "@/components/common/text/Text.css";
import { ReactNode } from "react";

interface LabelValueItemProps {
  label: string;
  labelType?: keyof typeof textStyles;
  labelColor?: keyof typeof fontColors;
  labelWidth?: 80 | 100 | 120;
  value?: ReactNode;
  valueColor?: keyof typeof fontColors;
  valueType?: keyof typeof textStyles;
  align?: "start" | "center" | "end";
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
}: LabelValueItemProps) {
  const isNullish = value === null || value === undefined;
  const isEmptyString = typeof value === "string" && value.trim() === "";

  const displayValue = isNullish || isEmptyString ? "-" : value;
  return (
    <div className={styles.labelValueItemContainer({ align })}>
      <Text
        type={labelType}
        color={labelColor}
        className={styles.labelText({ width: labelWidth })}
      >
        {label}
      </Text>
      <Text type={valueType} color={valueColor}>
        {displayValue}
      </Text>
    </div>
  );
}
