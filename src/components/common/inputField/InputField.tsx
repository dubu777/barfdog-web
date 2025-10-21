import React, {
  forwardRef,
  useRef,
  ChangeEvent,
  useState,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { mergeRefs } from "@/utils";
import Text from "../text/Text";
import * as styles from "./InputField.css";
import SearchIcon from "/public/images/icons/search.svg";
import InputClearIcon from "/public/images/icons/input_clear.svg";
import VisibilityIcon from "/public/images/icons/visibility.svg";
import VisibilityOffIcon from "/public/images/icons/visibility_off.svg";
import Button from "@/components/common/button/Button";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import InputLabel from "@/components/common/inputLabel/InputLabel";
import InputStatusMessage from "@/components/common/inputStatusMessage/InputStatusMessage";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 스타일/상태 */
  disabled?: boolean;
  error?: string;
  success?: string;
  variants?: "box" | "line";
  fullWidth?: boolean;

  /** UI 옵션 */
  masking?: boolean;
  maskingButton?: boolean;
  confirmButton?: boolean;
  confirmButtonText?: string;
  confirmButtonVariant?: "solid" | "outline";
  confirmButtonDisabled?: boolean;
  clearButton?: boolean;
  searchButton?: boolean;
  unit?: string;

  /** 라벨 */
  label?: string;
  labelColor?: "gray600" | "gray700" | "gray800" | "gray900";
  labelType?: "label4" | "headline4";
  isRequired?: boolean;

  /** 이벤트 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent) => void;
  onReset?: () => void;
  onSubmit?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;

  /** 기타 */
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      disabled = false,
      error,
      success,
      onChange,
      onBlur,
      variants = "box",
      fullWidth = true,

      masking = false,
      maskingButton = false,
      confirmButton = false,
      confirmButtonText = "입력",
      confirmButtonVariant = "outline",
      confirmButtonDisabled = false,
      clearButton = false,
      searchButton = false,
      onReset,
      onSubmit,
      onKeyDown,

      className,
      label,
      isRequired,
      labelType = "label4",
      labelColor = "gray600",
      unit,

      type,
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

    const handleInternalKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDown) {
        onKeyDown(e);
      }
      if (e.key === "Enter" && onSubmit) {
        e.preventDefault();
        onSubmit();
      }
    };

    const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (onReset) {
        onReset();
      }
    };

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (onSubmit) {
        onSubmit();
      }
    };
    return (
      <div
        onClick={handlePressInput}
        className={`${styles.container({ fullWidth })} ${className || ""}`}
      >
        {/* label 유무에 따라 상단 노출 */}
        {label && (
          <InputLabel
            label={label}
            labelType={labelType}
            labelColor={labelColor}
            isRequired={isRequired}
          />
        )}
        <div className={styles.wrapper({ fullWidth })}>
          <div
            className={styles.field({
              variant: variants,
              disabled,
              error: Boolean(error),
              hasConfirm: confirmButton,
            })}
          >
            {/* 검색 기능 추가 필요 */}
            {searchButton && (
              <button
                className={styles.prefixButton}
                type="button"
                tabIndex={-1}
              >
                <SvgIcon src={SearchIcon} size={24} aria-hidden />
              </button>
            )}
            <input
              {...props}
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              disabled={disabled}
              className={styles.input}
              type={isMasked ? "password" : type}
              onChange={(e) => {
                onChange?.(e);
              }}
              onBlur={(e) => onBlur?.(e)}
              onKeyDown={handleInternalKeyDown}
            />
            {unit && (
              <Text type="headline3" color="gray900" className={styles.unit}>
                {unit}
              </Text>
            )}
            <div className={styles.suffixGroup}>
              {/* 비밀번호 숨김 토글 기능 */}
              {masking && maskingButton && (
                <button
                  onClick={handleToggleMasking}
                  className={styles.suffixButton}
                  type="button"
                  tabIndex={-1}
                >
                  <SvgIcon
                    src={isMasked ? VisibilityOffIcon : VisibilityIcon}
                    size={24}
                    aria-hidden
                  />
                </button>
              )}
              {/* value 리셋 기능 */}
              {clearButton && (
                <button
                  onClick={handleReset}
                  className={styles.suffixButton}
                  type="button"
                  tabIndex={-1}
                >
                  <SvgIcon src={InputClearIcon} size={24} aria-hidden />
                </button>
              )}
            </div>
          </div>
          {/* 버튼 사이드 confirm 버튼 (인증하기 / 확인 등)*/}
          {confirmButton && (
            <Button
              variant={confirmButtonVariant}
              onClick={handleSubmit}
              size="inputButton"
              disabled={confirmButtonDisabled}
            >
              {confirmButtonText}
            </Button>
          )}
        </div>
        {error && <InputStatusMessage type="error" message={error} />}
        {success && <InputStatusMessage type="success" message={success} />}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
