'use client';

import { surveyTitle } from '@/app/survey/Survey.css';
import * as styles from './DefaultTextField.css';

interface DefaultTextFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  title?: string;
  unit?: string;
  placeholder?: string;
}

export default function DefaultTextField({
  id,
  name,
  value,
  onChange,
  title,
  unit,
  placeholder="",
}: DefaultTextFieldProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <label htmlFor={id} className={styles.textFieldContainer}>
      {title && <h2 className={surveyTitle}>{title}</h2>}
        <div className={styles.textInputWrapper}>
          <input
            className={styles.textInput}
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
          />
          {unit && <p className={styles.unitStyle}>{unit}</p>}
        </div>
    </label>
  )
}
