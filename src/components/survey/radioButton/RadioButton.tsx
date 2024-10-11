"use client";
import React from "react";
import * as styles from "./RadioButton.css";

interface RadioButtonProps {
  id: string;
  name: string;
  value: string | boolean | number;
  isChecked: boolean;
  label: string;
  onChange: (value: string | boolean | number) => void;
}

export default function RadioButton({
  id,
  name,
  value,
  isChecked,
  label,
  onChange,
}: RadioButtonProps) {
  const handleChange = () => {
    onChange(value);
  };

  return (
    <div className={styles.radioButtonContainer}>
      <label
        htmlFor={id}
        className={styles.buttonStyle({ checked: isChecked })}
      >
        <input
          type="radio"
          id={id}
          name={name}
          value={String(value)}
          checked={isChecked}
          onChange={handleChange}
          className={styles.hiddenInputStyle}
        />
        {label}
      </label>
    </div>
  );
}
