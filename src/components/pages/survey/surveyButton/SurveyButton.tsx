import * as styles from "./SurveyButton.css";
import CheckedBox from "public/images/option/checked_selection.svg";
import CheckedRadio from "public/images/option/checked_radio.svg";
import UnCheckedRadio from "public/images/option/unchecked_radio.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface SurveyButtonProps<T> {
  label: string;
  value: T;
  isChecked: boolean;
  inputType?: "radio" | "checkbox" | "normal";
  onToggle: (value: T) => void;
}

export default function SurveyButton<T>({
  label,
  isChecked,
  inputType = "normal",
  value,
  onToggle,
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

  return (
    <button
      className={styles.surveyButtonContainer({ isChecked })}
      onClick={() => onToggle(value)}
    >
      {iconSrc && <SvgIcon src={iconSrc} />}
      <DefaultText type="headline3" color={isChecked ? "red" : "gray900"}>
        {label}
      </DefaultText>
    </button>
  );
}
