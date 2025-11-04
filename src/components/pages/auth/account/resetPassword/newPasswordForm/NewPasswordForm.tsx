"use client";
import { UseFormReturn, useWatch } from "react-hook-form";
import InputField from "@/components/ui/inputField/InputField";
import { commonWrapper } from "@/styles/common.css";
import { ResetPasswordValues } from "@/utils/validation/auth/resetPassword";
import {
  getPasswordCriteria,
  isValidPassword,
  PasswordCriteriaItem,
} from "@/utils/validation/auth/password";
import { useMemo, useRef } from "react";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import CheckIcon from "public/images/survey/check_small.svg";
import Text from "@/components/ui/text/Text";
import { useEnterFocus } from "@/hooks/common/useEnterFocus";

interface NewPasswordFormProps {
  form: UseFormReturn<ResetPasswordValues>;
}

export default function NewPasswordForm({ form }: NewPasswordFormProps) {
  const { control, register, setFocus, getFieldState, trigger } = form;

  const password = useWatch({ control, name: "newPassword" });

  const { bind } = useEnterFocus({
    fieldNames: ["newPassword", "confirmPassword"],
    setFocus,
    getFieldState,
    trigger,
  });

  const criteria: PasswordCriteriaItem[] = useMemo(
    () => getPasswordCriteria(password),
    [password]
  );

  const isValid: boolean = useMemo(() => isValidPassword(password), [password]);

  const confirmRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <InputField
        {...register("newPassword")}
        masking
        maskingButton
        placeholder="새 비밀번호"
        label="새 비밀번호"
        isRequired
        labelColor="gray600"
        onKeyUp={bind("newPassword")}
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

      <InputField
        {...register("confirmPassword")}
        masking
        maskingButton
        placeholder="새 비밀번호 확인"
        label="새 비밀번호 확인"
        isRequired
        labelColor="gray600"
      />
    </>
  );
}
