import * as styles from './DefaultTextarea.css';
import { ChangeEvent, forwardRef, TextareaHTMLAttributes } from "react";
import Text from "@/components/common/text/Text";

interface DefaultTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  id: string;
  label?: string;
  error?: string;
  className?: string;
  maxLength?: number;
  labelPosition?: 'left' | 'top';
}

const DefaultTextarea = forwardRef<HTMLTextAreaElement, DefaultTextareaProps>(({
  id,
  label,
  error,
  className,
  maxLength,
  labelPosition= 'left',
  ...rest
}, ref) => {
  const value = rest.value || '';
  const currentLength = typeof value === 'string' || Array.isArray(value) ? value.length : 0;
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (rest.onChange) {
      rest.onChange(e);
    }
  }
  return (
    <>
    <div className={`${styles.defaultTextareaContainer} ${className || ''}`}>
      {label && (
        <label htmlFor={id} className={styles.textareaLabel({ labelPosition })} >
          {label}
        </label>
      )}
      <div className={styles.textareaBox}>
        <textarea
          id={id}
          ref={ref}
          maxLength={maxLength}
          className={styles.textarea}
          onChange={handleInputChange}
          {...rest}
        />
        {maxLength && (
          <p className={styles.charCount}>
            {currentLength} / {maxLength.toLocaleString()}
          </p>
        )}
        {error && <Text type='description' size='sm' color='red' align='left' className={styles.errorText}>{error}</Text>}
      </div>
    </div>
    </>
  );
});

DefaultTextarea.displayName = 'DefaultTextarea';
export default DefaultTextarea;