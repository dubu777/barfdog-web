"use client";
import * as styles from "./SurveyButton3.css";

interface SurveyButton3Props {
  value: string | boolean | number;
  isChecked: boolean;
  label: string;
  onChange: (value: string | boolean | number) => void;
  layoutType?: "row" | "col" | "grid";
}

export default function SurveyButton3({
  value,
  isChecked,
  label,
  onChange,
  layoutType = 'col',
}: SurveyButton3Props) {
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
