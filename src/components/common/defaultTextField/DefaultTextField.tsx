import * as styles from './DefaultTextField.css';
import {forwardRef, HTMLAttributes, ReactNode} from 'react';

interface DefaultTextFieldProps {
  type?: 'text' | 'number' | 'button';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  children?: ReactNode;
  id: string;
  name: string;
  label?: string;
  value: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  className?: HTMLAttributes<string | undefined>;
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
  className,
}, ref) => {

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

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
        onKeyDown={handleInputChange}
        className={`${styles.textFieldStyle({ size, isActive, isDisabled, isHidden })} ${className || ''}`}
        disabled={isDisabled || isHidden}
      />
      {children}
    </label>
  );
})
DefaultTextField.displayName = 'DefaultTextField';

export default DefaultTextField;