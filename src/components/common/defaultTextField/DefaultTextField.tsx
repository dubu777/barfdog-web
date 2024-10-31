import * as styles from './DefaultTextField.css';
import { ReactNode } from 'react';

interface DefaultTextFieldProps {
  type: 'text' | 'number' | 'button';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  children?: ReactNode;
  id: string;
  name: string;
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
}

export default function DefaultTextField({
  children,
  type = 'text',
  placeholder = '',
  size = 'md',
  id,
  name,
  value,
  label = '',
  onChange,
  isActive = false,
  isDisabled = false,
  isHidden = false,
  }: DefaultTextFieldProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <label htmlFor={id} className={styles.textFieldContainer}>
      <h3 className={styles.textFieldLabel({ isHidden: label === '' })}>{label}</h3>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        className={styles.textFieldStyle({ size, isActive, isDisabled, isHidden })}
        disabled={isDisabled || isHidden}
      />
      {children}
    </label>
  );
}
