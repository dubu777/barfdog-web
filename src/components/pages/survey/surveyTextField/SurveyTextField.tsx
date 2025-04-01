'use client';

import { surveyTitle } from '@/app/survey/Survey.css';
import * as styles from './SurveyTextField.css';
import { getNameWithPossessiveSuffix2 } from '@/utils';

interface DefaultTextFieldProps {
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  title?: string;
  unit?: string;
  placeholder?: string;
  petName?: string;
}

export default function SurveyTextField({
  id,
  value,
  onChange,
  onBlur,
  onKeyDown,
  title,
  unit,
  placeholder="",
  petName,
}: DefaultTextFieldProps) {

  const fullTitle = petName && title
    ? getNameWithPossessiveSuffix2(petName, title) 
    : title;
  
  return (
    <label htmlFor={id} className={styles.textFieldContainer}>
      <h2 className={surveyTitle}>{fullTitle}</h2>
        <div className={styles.textInputWrapper}>
          <input
            className={styles.textInput}
            type="text"
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown} 
          />
          {unit && <p className={styles.unitStyle}>{unit}</p>}
        </div>
    </label>
  )
}
