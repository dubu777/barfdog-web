import React, {
  forwardRef,
  useRef,
  ReactNode,
  ChangeEvent,
  useState,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { mergeRefs } from "@/utils";
import DefaultText from "../defaultText/DefaultText";
import {
  inputContainerStyle,
  baseButtonStyle,
  confirmButtonStyle,
  inputBaseStyle,
  inputBoxStyle,
  inputError,
  inputErrorTextStyle,
  inputStyle,
  inputVariants,
  inputWrapStyle,
  rightButtonsStyle,
  searchButtonStyle,
  labelStyle,
  unitStyle,
} from "./InputField.css";

import SearchIcon from "/public/images/icons/search.svg";
import InputClearIcon from "/public/images/icons/input_clear.svg";
import VisibilityIcon from "/public/images/icons/visibility.svg";
import VisibilityOffIcon from "/public/images/icons/visibility_off.svg";
import { pointColor } from "@/styles/common.css";
import Button from "@/components/common/button/Button";
import ErrorIcon from '/public/images/icons/close_small.svg';
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import { COLORS } from "@/constants/style";

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
  confirmButtonText?: string
  clearButton?: boolean;
  searchButton?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent) => void;
  onReset?: () => void;
  onSubmit?: () => void;
  className?: string;
  label?: string;
  labelColor?: "gray700" | "gray800";
  labelPosition?: "top" | "left";
  isRequired?: boolean;
  isReadOnly?: boolean;
  unit?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      disabled = false,
      error,
      touched,
      onChange,
      onBlur,
      variants = 'box',
      width,
      masking = false,
      maskingButton = false,
      confirmButton = false,
      confirmButtonText = "입력",
      clearButton = false,
      searchButton = false,
      onReset,
      onSubmit,
      // icon = null,
      className,
      label,
      isRequired,
      isReadOnly,
      labelColor = "gray700",
      unit,
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
      setIsMasked((prev) => !prev);
      // 커서 위치 복원
      if (innerRef?.current) {
        const selectionStart = innerRef.current?.selectionStart;
        const selectionEnd = innerRef.current?.selectionEnd;
        setTimeout(() => {
          innerRef.current?.setSelectionRange(selectionStart, selectionEnd);
        }, 0);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>,) => {
        if (e.key === 'Enter' && onSubmit) {
          // enter onSubmit event 적용
          e.preventDefault();
          onSubmit();
        }
    }

    const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if(onReset) {
        onReset();
      }
    }

      const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if(onSubmit) {
        onSubmit();
      }
    }
    return (
      <div
        onClick={handlePressInput}
        className={`${inputContainerStyle} ${className || ""}`}
        style={{ width: width || "100%" }}
      >
        {/* label 유무에 따라 상단 노출 */}
        {label &&
          <DefaultText type='label4' color={labelColor} className={labelStyle}>
            {label} {isRequired && <span className={pointColor}>*</span>}
          </DefaultText>
        }
        <div className={inputBoxStyle} style={{ width: width || '100%' }}>
          <div
            className={`${inputWrapStyle} ${inputBaseStyle} ${inputVariants[variants]} ${error ? inputError[variants] : ''} ${disabled ? 'disabled' : ''}`}
            style={{ flex: confirmButton ? '1 0 0' : 'unset' }}
          >
            {/* 검색 기능 추가 필요 */}
            {searchButton && (
              <button className={searchButtonStyle}>
                <SvgIcon src={SearchIcon} size={24} />
              </button>
            )}
            <input
              {...props}
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              disabled={disabled}
              className={inputStyle}
              type={isMasked ? "password" : props.type}
              value={props.value}
              onChange={(e) => {
                onChange?.(e);
              }}
              onBlur={(e) => {
                if (onBlur) {
                  onBlur?.(e);
                }
              }}
              onKeyDown={handleKeyDown}
            />
              {unit && (
              <DefaultText type="headline3" color="gray900" className={unitStyle}>
                {unit}
              </DefaultText>
            )}
            <div className={rightButtonsStyle}>
              {/* 비밀번호 숨김 토글 기능 */}
              {masking && maskingButton && (
                <button
                  onClick={handleToggleMasking}
                  className={baseButtonStyle}
                >
                  <SvgIcon src={isMasked ? VisibilityOffIcon : VisibilityIcon} size={24} />
                </button>
              )}
              {/* value 리셋 기능 */}
              {clearButton &&
              <button onClick={handleReset} className={baseButtonStyle}>
                <SvgIcon src={InputClearIcon} size={24} />
              </button>
              }
            </div>
          </div>
          {/* 버튼 사이드 confirm 버튼 (인증하기 / 확인 등)*/}
          {confirmButton &&
          <Button
            variant='outline'
            onClick={handleSubmit}
            size='lg'
            className={confirmButtonStyle}
          >
            {confirmButtonText}
          </Button>
          }
        </div>
        {error && (
          <div className={inputErrorTextStyle}>
            <SvgIcon src={ErrorIcon} color='red' />
            <DefaultText type="caption" color="red" align="left">
              {error}
            </DefaultText>
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
