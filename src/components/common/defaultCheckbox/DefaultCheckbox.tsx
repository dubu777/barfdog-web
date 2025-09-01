'use client';
import { ChangeEvent, forwardRef, ReactNode } from 'react';
import { textStyles } from "@/components/common/text/Text.css";
import * as styles from './DefaultCheckbox.css';

interface DefaultCheckboxProps {
  id: string;
  name: string;
  value: boolean | undefined;
  label?: string | ReactNode;
  labelPosition?: 'right' | 'bottom';
  onChange: (value: string | boolean) => void;
}

const DefaultCheckbox = forwardRef<HTMLInputElement, DefaultCheckboxProps>(
({
  id,
  name,
  value,
  label = '',
  labelPosition = 'right',
  onChange,
  ...rest
}, ref) => {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked)
    onChange(e.target.checked);
  };
  return (
    <div className={styles.checkboxContainer({labelPosition: labelPosition})}>
      <input
        ref={ref}
        type='checkbox'
        id={id}
        name={name}
        checked={!!value}
        onChange={handleCheckboxChange}
        style={{appearance: 'none'}}
        className={styles.checkboxStyle({isChecked: value})}
        {...rest}
      />
      <label htmlFor={id} className={`${styles.checkboxLabel({isHidden: label === ''})} ${textStyles.body3}`}>
        {label}
      </label>
    </div>
  );
})

DefaultCheckbox.displayName = 'DefaultCheckbox';

export default DefaultCheckbox;