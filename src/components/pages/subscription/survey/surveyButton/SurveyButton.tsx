import * as styles from "./SurveyButton.css";
import Chips from "@/components/common/chips/Chips";

interface SurveyButtonProps {
  value: string | boolean | number;
  isChecked: boolean;
  label: string;
  onChange: (value: string | boolean | number) => void;
  layoutType?: "row" | "col" | "grid";
  chipText?: string;
}

export default function SurveyButton({
  value,
  isChecked,
  label,
  onChange,
  layoutType = 'col',
  chipText
}: SurveyButtonProps) {
  return (
      <button
        type="button"
        className={styles.buttonStyle({ checked: isChecked, type: layoutType })}
        onClick={() => onChange(value)}
      >
        {chipText &&
          <Chips variant='solid' color={isChecked ? 'red' : 'gray800'} style={{ position: 'absolute', top: '4px', left: '4px' }}>
            {chipText}
          </Chips>
        }
        {label}
      </button>
  );
}
