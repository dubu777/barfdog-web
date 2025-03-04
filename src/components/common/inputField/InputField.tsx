import React, { forwardRef, useRef, ReactNode, ChangeEvent, useState, KeyboardEvent } from "react";
import { mergeRefs } from "@/utils";
import DefaultText from "../defaultText/DefaultText";
import {
  inputContainerStyle,
  baseButtonStyle, confirmButtonStyle,
  inputBaseStyle,
  inputBoxStyle,
  inputError, inputErrorTextStyle, inputStyle,
  inputVariants,
  inputWrapStyle, rightButtonsStyle, searchButtonStyle, labelStyle
} from "./InputField.css";

import SearchIcon from '/public/images/icons/search.svg';
import InputClearIcon from '/public/images/icons/input_clear.svg';
import VisibilityIcon from '/public/images/icons/visibility.svg';
import VisibilityOffIcon from '/public/images/icons/visibility_off.svg';
import { pointColor } from "@/styles/common.css";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
  variants?: keyof typeof inputVariants;
  width?: number;
  masking?: boolean;
  maskingButton?: boolean;
  confirmButton?: boolean;
  confirmButtonText?: string;
  clearButton?: boolean;
  searchButton?: boolean;
  onChange?: (e: ChangeEvent) => void;
  onReset?: () => void;
  onSubmit?: () => void;
  className?: string;
  label?: string;
  labelPosition?: 'top' | 'left';
  isRequired?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      disabled = false,
      error,
      touched,
      onChange,
      variants = 'box',
      width,
      masking= false,
      maskingButton = false,
      confirmButton = false,
      confirmButtonText = '입력',
      clearButton= false,
      searchButton= false,
      onReset,
      onSubmit,
      // icon = null,
      className,
      label,
      isRequired,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const [isMasked, setIsMasked] = useState<boolean>(masking);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    const handleToggleMasking = () => {
      setIsMasked(prev => !prev);
      // 커서 위치 복원
      if (innerRef?.current) {
        const selectionStart = innerRef.current?.selectionStart;
        const selectionEnd = innerRef.current?.selectionEnd;
        setTimeout(() => {
          innerRef.current?.setSelectionRange(selectionStart, selectionEnd);
        }, 0)
      }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>,) => {
      if('key' in e) {
        if (isMasked && e.key === "Backspace") {
          // 비밀번호 type -> input 모두선택 후 backspace 방지
          if(onChange) {
            onChange({
              target: { value: (props?.value as string).slice(0, -1) },
            } as React.ChangeEvent<HTMLInputElement>);
          }
          e.preventDefault();
        }

        if (e.key === 'Enter' && onSubmit) {
          // enter onSubmit event 적용
          e.preventDefault();
          onSubmit();
        }
      }
    }
    return (
      <div onClick={handlePressInput} className={`${inputContainerStyle} ${className || ''}`} style={{ width: width || '100%' }}>
        {/* label 유무에 따라 상단 노출 */}
        {label &&
          <DefaultText type='label4' className={labelStyle}>
            {label} {isRequired && <span className={pointColor}>*</span>}
          </DefaultText>
        }
        <div className={inputBoxStyle} style={{ width: width || '100%' }}>
          <div className={`${inputWrapStyle} ${inputBaseStyle} ${inputVariants[variants]} ${error ? inputError[variants] : ''} ${disabled ? 'disabled' : ''}`}>
            {/* 검색 기능 추가 필요 */}
            {searchButton &&
              <button className={searchButtonStyle}>
                <SearchIcon/>
              </button>
            }
            <input
              {...props}
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              disabled={disabled}
              className={inputStyle}
              type={isMasked ? 'password' : props.type}
              value={props.value}
              onChange={(e) => {
                onChange?.(e);
              }}
              onKeyDown={handleKeyDown}
            />
            <div className={rightButtonsStyle}>
              {/* 비밀번호 숨김 토글 기능 */}
              {masking && maskingButton &&
              <button onClick={handleToggleMasking} className={baseButtonStyle}>
                {isMasked ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
              }
              {/* value 리셋 기능 */}
              {clearButton &&
              <button onClick={onReset} className={baseButtonStyle}>
                <InputClearIcon />
              </button>
              }
            </div>
          </div>
          {/* 버튼 사이드 confirm 버튼 (인증하기 / 확인 등)*/}
          {confirmButton &&
          <button onClick={onSubmit} disabled={disabled} className={confirmButtonStyle}>
            {confirmButtonText}
          </button>
          }
        </div>
        {touched && error && (
          <div className={inputErrorTextStyle}>
            <DefaultText type="caption" color="red" align="left">
              {error}
            </DefaultText>
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
export default InputField;
