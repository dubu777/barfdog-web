import CheckedRadio from "/public/images/option/checked_radio.svg";
import UnCheckedRadio from "/public/images/option/unchecked_radio.svg";
import CheckedSelection from "/public/images/option/checked_selection.svg";
import * as styles from "./LabeledRadioButton.css";
import SvgIcon from "../svgIcon/SvgIcon";

export interface LabeledRadioButtonProps<T = string> {
  children: React.ReactNode;
  iconSize?: number;
  optionType?: "radio" | "selection";
  value: T;
  isChecked: boolean;
  onToggle: (value: T) => void;
  fullWidth?: boolean;
  className?: string;
}

export default function LabeledRadioButton<T = string>({
  children,
  iconSize = 24,
  optionType = "radio",
  value,
  isChecked,
  onToggle,
  fullWidth = false,
  className,
}: LabeledRadioButtonProps<T>) {
  const icon = !isChecked
    ? UnCheckedRadio
    : optionType === "radio"
    ? CheckedRadio
    : CheckedSelection;
  return (
    <div
      className={`${styles.labeledRadioButtonContainer({ fullWidth })} ${
        className || ""
      }`}
      onClick={() => onToggle(value)}
    >
      <SvgIcon src={icon} size={iconSize} />
      {children}
    </div>
  );
}
