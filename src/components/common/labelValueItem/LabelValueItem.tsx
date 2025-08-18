"use client";

import DefaultText from "@/components/common/defaultText/DefaultText";
import * as styles from "./LabelValueItem.css";
import {
  fontColors,
  textStyles,
} from "@/components/common/defaultText/DefaultText.css";
import { ReactNode } from "react";

interface LabelValueItemProps {
  label: string;
  labelType?: keyof typeof textStyles;
  labelColor?: keyof typeof fontColors;
  labelWidth?: 80 | 100 | 120;
  value?: ReactNode;
  valueColor?: keyof typeof fontColors;
  valueType?: keyof typeof textStyles;
}

export default function LabelValueItem({
  label,
  labelType = "label2",
  labelColor = "gray800",
  labelWidth = 100,
  value,
  valueColor = "gray700",
  valueType = "body2",
}: LabelValueItemProps) {
  const isNullish = value === null || value === undefined;
  const isEmptyString = typeof value === "string" && value.trim() === "";

  const displayValue = isNullish || isEmptyString ? "-" : value;
  return (
    <div className={styles.labelValueItemContainer}>
      <DefaultText
        type={labelType}
        color={labelColor}
        className={styles.labelText({ width: labelWidth })}
      >
        {label}
      </DefaultText>
      <DefaultText type={valueType} color={valueColor}>
        {displayValue}
      </DefaultText>
    </div>
  );
}
