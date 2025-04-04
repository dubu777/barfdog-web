"use client";
import * as styles from "./SurveyButton.css";

interface SurveyButtonProps {
  value: string | boolean | number;
  isChecked: boolean;
  label: string;
  onChange: (value: string | boolean | number) => void;
  layoutType?: "row" | "col" | "grid";
}

export default function SurveyButton({
  value,
  isChecked,
  label,
  onChange,
  layoutType = 'col',
}: SurveyButtonProps) {
  return (
      <button
        type="button"
        className={styles.buttonStyle({ checked: isChecked, type: layoutType })}
        onClick={() => onChange(value)}
      >
        {label}
      </button>
  );
}
