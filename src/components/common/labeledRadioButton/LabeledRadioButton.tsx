import CheckCircle from "/public/images/checkBox/check_circle.svg";
import * as styles from "./LabeledRadioButton.css";
import SvgIcon from "../svgIcon/SvgIcon";

export interface LabeledRadioButtonProps<T = string> {
  children: React.ReactNode;
  size?: number;
  value: T;
  isChecked: boolean;
  onToggle: (value: T) => void;
}

export default function LabeledRadioButton<T = string> ({
  children,
  size = 24,
  value,
  isChecked,
  onToggle,
}: LabeledRadioButtonProps<T>) {

  const color = isChecked ? "red" : "gray200";

  return (
    <div
      className={styles.labeledRadioButtonContainer}
      onClick={() => onToggle(value)}
    >
      <SvgIcon icon={CheckCircle} color={color} size={size} />
      {children}
    </div>
  );
}
