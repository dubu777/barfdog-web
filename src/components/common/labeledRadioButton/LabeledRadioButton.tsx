import CheckedRadio from "/public/images/option/checked_radio.svg";
import NoneCheckedRadio from "/public/images/option/none_checked_radio.svg";
import * as styles from "./LabeledRadioButton.css";
import SvgIcon from "../svgIcon/SvgIcon";

export interface LabeledRadioButtonProps<T = string> {
  children: React.ReactNode;
  iconSize?: number;
  value: T;
  isChecked: boolean;
  onToggle: (value: T) => void;
}

export default function LabeledRadioButton<T = string>({
  children,
  iconSize = 24,
  value,
  isChecked,
  onToggle,
}: LabeledRadioButtonProps<T>) {
  const icon = isChecked ? CheckedRadio : NoneCheckedRadio;
  return (
    <div
      className={styles.labeledRadioButtonContainer}
      onClick={() => onToggle(value)}
    >
      <SvgIcon icon={icon} size={iconSize} />
      {children}
    </div>
  );
}
