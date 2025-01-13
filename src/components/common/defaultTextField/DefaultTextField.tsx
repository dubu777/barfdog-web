import * as styles from './DefaultTextField.css';
import {ChangeEvent, forwardRef, HTMLAttributes, ReactNode, KeyboardEvent} from 'react';

interface DefaultTextFieldProps {
  type?: 'text' | 'number' | 'button';
  size?: 'sm' | 'md';
  children?: ReactNode;
  id: string;
  name: string;
  value: string | number;
  label?: string;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  isError?: boolean;
  className?: HTMLAttributes<string | undefined> |string;
  onSubmit?: () => void;
}
const DefaultTextField = forwardRef<HTMLInputElement, DefaultTextFieldProps>(({
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
  isError = false,
  className,
  onSubmit
}, ref) => {

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(onChange) {
      onChange(e.currentTarget.value);
    }
  };

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>,) => {
    if('key' in e) {
      if (e.key === 'Enter' && onSubmit) {
        e.preventDefault();
        onSubmit();
      }
    }
  }
  return (
    <label htmlFor={id} className={styles.textFieldContainer}>
      <h3 className={styles.textFieldLabel({ isHidden: label === '' })}>{label}</h3>
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        onBlur={handleInputChange}
        onKeyDown={handleSubmit}
        className={`${styles.textFieldStyle({ size, isActive, isDisabled, isHidden, isError })} ${className || ''}`}
        disabled={isDisabled || isHidden}
      />
      {children}
    </label>
  );
})
DefaultTextField.displayName = 'DefaultTextField';

export default DefaultTextField;