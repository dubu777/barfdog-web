'use client';

import React, { forwardRef, useRef, ForwardedRef, ReactNode } from 'react';

import * as styles from './InputField.css';
import { mergeRefs } from '@/utils';
import DefaultText from '../defaultText/DefaultText';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
}


const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ disabled = false, error, touched, onChange, icon = null, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <div
        className={styles.container({
          disabled,
          error: !!error && touched,
        })}
        onClick={handlePressInput}
      >
        <div className={icon ? styles.innerContainer : undefined}>
          {icon}
          <input
            ref={ref ? mergeRefs(innerRef, ref) : innerRef}
            disabled={disabled}
            className={styles.input({ disabled })}
            onChange={(e) => {
              onChange?.(e);
            }}
            {...props}
          />
        </div>
        {touched && error && <DefaultText type="caption" className={styles.errorText}>{error}</DefaultText>}
      </div>
    );
  }
);
InputField.displayName = 'InputField';

export default InputField;