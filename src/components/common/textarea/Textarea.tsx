import { textStyles } from "@/components/common/text/Text.css";
import {
  charCount,
  errorTextStyle,
  textareaBoxStyle, textareaContainerStyle,
  textareaStyle
} from "./Textarea.css";
import { ChangeEvent, forwardRef, TextareaHTMLAttributes } from "react";
import ErrorIcon from "/public/images/icons/close_small.svg";
import SvgIcon from "../svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  id: string;
  value: string;
  label?: string;
  error?: string;
  className?: string;
  maxLength?: number;
  fullWidth?: boolean;
  isDisabled?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  id,
  error,
  className,
  maxLength,
  value,
  fullWidth,
  isDisabled = false,
  ...rest
}, ref) => {
  const currentLength = typeof value === 'string' || Array.isArray(value) ? value.length : 0;

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (rest.onChange) {
      rest.onChange(e);
    }
  }
  return (
    <div className={textareaContainerStyle({ fullWidth })}>
      <div className={`${textareaBoxStyle} ${className ?? ''}`}>
        <textarea
          id={id}
          ref={ref}
          maxLength={maxLength}
          className={`${textareaStyle({ active: value?.length !== 0 })} ${textStyles.body3}`}
          onChange={handleInputChange}
          value={value}
          disabled={isDisabled}
          {...rest}
        />
        {maxLength && (
          <Text type='caption' color='gray500' className={charCount}>
            {currentLength} / {maxLength.toLocaleString()}
          </Text>
        )}
      </div>
      {error && (
        <div className={errorTextStyle}>
          <SvgIcon src={ErrorIcon} color="red" size={18} />
          <Text type="caption" color="red" align="left">
            {error}
          </Text>
        </div>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;