import SvgIcon from "../svgIcon/SvgIcon";
import CheckedCircle from "/public/images/option/checked_selection.svg";
import UnCheckedCircle from "/public/images/option/unchecked_radio.svg";
import CheckedSquare from "/public/images/option/checked_square.svg";
import UnCheckedSquare from "/public/images/option/unchecked_square.svg";
import * as styles from "./LabeledCheckBox.css";

export interface LabeledCheckboxProps<T = string> {
  children: React.ReactNode;
  iconSize?: number;
  value: T;
  isChecked: boolean;
  iconType?: "circle" | "square";
  onToggle: (value: T) => void;
  className?: string;
  iconClick?: boolean;
  direction?: "row" | "col";
}

export default function LabeledCheckbox<T = string>({
  children,
  iconSize = 24,
  value,
  isChecked,
  iconType = "square",
  onToggle,
  className,
  iconClick = false,
  direction = 'row',
}: LabeledCheckboxProps<T>) {
  const iconMapping = {
    circle: {
      true: CheckedCircle,
      false: UnCheckedCircle,
    },
    square: {
      true: CheckedSquare,
      false: UnCheckedSquare,
    },
  };
  const icon = iconMapping[iconType][isChecked ? "true" : "false"];
  return (
    <div
      className={`${styles.labelCheckedBoxContainer({ direction })} ${className || ''}`}
      onClick={() => !iconClick ? onToggle(value) : undefined}
    >
      <SvgIcon src={icon} size={iconSize} onClick={() => iconClick ? onToggle(value) : undefined} />
      {children}
    </div>
  );
}
