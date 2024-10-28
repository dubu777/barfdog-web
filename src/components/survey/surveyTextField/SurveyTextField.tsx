'use client';

import { surveyTitle } from '@/app/survey/Survey.css';
import * as styles from './SurveyTextField.css';
import { getPetNameWithSuffix } from '@/utils';

interface DefaultTextFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  title?: string;
  unit?: string;
  placeholder?: string;
  petName?: string;
}

export default function SurveyTextField({
  id,
  name,
  value,
  onChange,
  onBlur,
  onKeyDown,
  title,
  unit,
  placeholder="",
  petName,
}: DefaultTextFieldProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const fullTitle = petName && title
    ? getPetNameWithSuffix(petName, title) 
    : title;
  
  return (
    <label htmlFor={id} className={styles.textFieldContainer}>
      <h2 className={surveyTitle}>{fullTitle}</h2>
        <div className={styles.textInputWrapper}>
          <input
            className={styles.textInput}
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown} 
          />
          {unit && <p className={styles.unitStyle}>{unit}</p>}
        </div>
    </label>
  )
}
