"use client";
import * as styles from "../../FindAccount.css";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import { commonWrapper } from "@/styles/common.css";
import { ResetPasswordValues } from "@/utils/validation/auth/resetPassword";
import {
  getPasswordCriteria,
  isValidPassword,
  PasswordCriteriaItem,
} from "@/utils/validation/auth/password";
import { useMemo, useRef } from "react";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import CheckIcon from "public/images/survey/check_small.svg";
import Text from "@/components/common/text/Text";

interface NewPasswordFormProps {
  form: UseFormReturn<ResetPasswordValues>;
}

export default function NewPasswordForm({ form }: NewPasswordFormProps) {
  const { control } = form;

  const password = useWatch({ control, name: "newPassword" });

  const criteria: PasswordCriteriaItem[] = useMemo(
    () => getPasswordCriteria(password),
    [password]
  );

  const isValid: boolean = useMemo(() => isValidPassword(password), [password]);

  const confirmRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            onChange={(e) => {
              field.onChange(e);
            }}
            masking
            maskingButton
            placeholder="새 비밀번호"
            label="새 비밀번호"
            isRequired
            labelColor="gray600"
            onKeyUp={(e) => {
              if ((e.key === "Enter" || e.key === "Tab") && isValid) {
                e.preventDefault();
                confirmRef.current?.focus();
              }
            }}
          />
        )}
      />
      {password.length > 0 && (
        <ul
          className={commonWrapper({
            direction: "col",
            gap: 4,
            align: "start",
          })}
        >
          {criteria.map(({ label, ok }) => (
            <li key={label} className={commonWrapper({ justify: "start" })}>
              <SvgIcon
                src={CheckIcon}
                size={18}
                color={ok ? "blue500" : "gray600"}
              />
              <Text type="caption" color={ok ? "blue500" : "gray600"}>
                {label}
              </Text>
            </li>
          ))}
        </ul>
      )}
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            ref={confirmRef}
            onChange={(e) => {
              field.onChange(e);
            }}
            masking
            maskingButton
            placeholder="새 비밀번호 확인"
            label="새 비밀번호 확인"
            isRequired
            labelColor="gray600"
          />
        )}
      />
    </>
  );
}
