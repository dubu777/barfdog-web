import SvgIcon from "../svgIcon/SvgIcon";
import CheckCircle from "/public/images/option/check_circle.svg";
import CheckSquare from "/public/images/option/check_square.svg";
import NoneCheckSquare from "/public/images/option/none_check_square.svg";
import * as styles from "./LabeledCheckBox.css";

export interface LabeledCheckboxProps<T = string> {
  children: React.ReactNode;
  iconSize?: number;
  value: T;
  isChecked: boolean;
  iconType?: "circle" | "square";
  onToggle: (value: T) => void;
}

export default function LabeledCheckbox<T = string>({
  children,
  iconSize = 24,
  value,
  isChecked,
  iconType = "square",
  onToggle,
}: LabeledCheckboxProps<T>) {
  const icon =
    iconType === "circle"
      ? CheckCircle
      : isChecked
      ? CheckSquare
      : NoneCheckSquare;
  const color =
    iconType === "circle" ? (isChecked ? "red" : "gray200") : undefined;

  return (
    <div
      className={styles.labelCheckedBoxContainer}
      onClick={() => onToggle(value)}
    >
      <SvgIcon src={icon} size={iconSize} {...(color && { color })} />
      {children}
    </div>
  );
}
