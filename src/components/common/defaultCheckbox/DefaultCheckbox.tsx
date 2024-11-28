import { ChangeEvent } from 'react';
import * as styles from './DefaultCheckbox.css';

interface DefaultCheckboxProps {
  id: string;
  name: string;
  value: boolean;
  label?: string;
  labelPosition?: 'right' | 'bottom';
  onChange: (value: string | boolean) => void;
}

export default function DefaultCheckbox({
  id,
  name,
  value,
  label = '',
  labelPosition,
  onChange,
  }: DefaultCheckboxProps) {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(!e.target.checked);
  };
  return (
    <div className={styles.checkboxContainer({ labelPosition: labelPosition })}>
      <label htmlFor={id} className={styles.checkboxLabel({ isHidden: label === '' })}>
        {label}
      </label>
      <input
        type='checkbox'
        id={id}
        name={name}
        checked={value}
        onChange={handleCheckboxChange}
        style={{ appearance: 'none' }}
        className={styles.checkboxStyle({ isChecked: value })}
      />
    </div>
  );
}
