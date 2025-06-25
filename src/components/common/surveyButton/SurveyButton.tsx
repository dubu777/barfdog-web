import * as styles from "./SurveyButton.css";
import CheckedBox from "public/images/option/checked_selection.svg";
import CheckedRadio from "public/images/option/checked_radio.svg";
import UnCheckedRadio from "public/images/option/unchecked_radio.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";
import { ReactNode } from "react";

interface SurveyButtonProps<T> {
  label: string;
  subLabel?: string;
  value: T;
  isChecked: boolean;
  inputType?: "radio" | "checkbox" | "normal";
  chipText?: string;
  onToggle: (value: T) => void;
  isDisabled?: boolean;
  className?: string;
  rightElement?: ReactNode;
}

export default function SurveyButton<T>({
  label,
  subLabel,
  isChecked,
  inputType = "normal",
  value,
  chipText,
  onToggle,
  isDisabled = false,
  className,
  rightElement,
}: SurveyButtonProps<T>) {
  const iconSrc =
    inputType === "radio"
      ? isChecked
        ? CheckedRadio
        : UnCheckedRadio
      : inputType === "checkbox"
      ? isChecked
        ? CheckedBox
        : UnCheckedRadio
      : null;
  const labelColor = isChecked
    ? isDisabled
      ? "gray500"
      : "red"
    : isDisabled
    ? "gray300"
    : "gray900";
  return (
    <button
      disabled={isDisabled}
      className={`${styles.surveyButtonContainer({
        isChecked,
        isNormal: inputType === "normal",
      })} ${className || ""}`}
      onClick={(e) => {
        e.preventDefault();
        onToggle(value);
      }}
    >
      {iconSrc && <SvgIcon src={iconSrc} />}
      <div
        className={styles.surveyButtonContentWrapper({
          isNormal: inputType === "normal",
        })}
      >
        {chipText && (
          <Chips
            variant="solid"
            color={isChecked ? "red" : "gray800"}
            style={{ position: "absolute", top: "4px", left: "4px" }}
          >
            {chipText}
          </Chips>
        )}
        <DefaultText
          type="headline3"
          color={labelColor}
          applyLineHeight={false}
        >
          {label}
        </DefaultText>
        {subLabel && (
          <DefaultText type="body3" color="gray600" applyLineHeight={false}>
            {subLabel}
          </DefaultText>
        )}
      </div>
      {rightElement && rightElement}
    </button>
  );
}
