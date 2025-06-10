import { ChangeEvent, forwardRef, TextareaHTMLAttributes } from "react";
import {
  charCount, errorText,
  textareaBoxStyle,
  textareaStyle
} from "./DefaultTextarea.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { textStyles } from "@/components/common/defaultText/DefaultText.css";

interface DefaultTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  id: string;
  value: string;
  label?: string;
  error?: string;
  className?: string;
  maxLength?: number;
}

const DefaultTextarea = forwardRef<HTMLTextAreaElement, DefaultTextareaProps>(({
  id,
  error,
  className,
  maxLength,
  value,
  ...rest
}, ref) => {
  const currentLength = typeof value === 'string' || Array.isArray(value) ? value.length : 0;

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (rest.onChange) {
      rest.onChange(e);
    }
  }
  return (
    <div className={className || ''}>
      <div className={textareaBoxStyle}>
        <textarea
          id={id}
          ref={ref}
          maxLength={maxLength}
          className={`${textareaStyle({ active: value?.length !== 0 })} ${textStyles.body3}`}
          onChange={handleInputChange}
          value={value}
          {...rest}
        />
        {maxLength && (
          <DefaultText type='caption' color='gray500' className={charCount}>
            {currentLength} / {maxLength.toLocaleString()}
          </DefaultText>
        )}
      </div>
      {error && <DefaultText type='caption' color='red' align='left' className={errorText}>{error}</DefaultText>}
    </div>
  );
});

DefaultTextarea.displayName = 'DefaultTextarea';
export default DefaultTextarea;