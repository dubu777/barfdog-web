"use client";
import { Controller, UseFormReturn } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import { commonWrapper } from "@/styles/common.css";
import { RequestResetCodeValues } from "@/utils/validation/auth/resetPassword";
import { ResetPasswordStep } from "@/types";

interface CodeRequestFormProps {
  form: UseFormReturn<RequestResetCodeValues>;
  infoMessage: string;
  isRequested: boolean;
  authCode: string;
  onRequestCode: (form: RequestResetCodeValues) => void;
  onAuthCodeChange: (code: string) => void;
}

export default function CodeRequestForm({
  form,
  infoMessage,
  isRequested,
  authCode,
  onRequestCode,
  onAuthCodeChange,
}: CodeRequestFormProps) {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = form;

  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <InputField
            id="name"
            label="이름"
            isRequired
            placeholder="이름 입력"
            error={errors?.name?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <InputField
            id="email"
            label="이메일(아이디)"
            isRequired
            placeholder="example@gmail.com."
            error={errors?.email?.message}
            {...field}
          />
        )}
      />
      <div className={commonWrapper({ direction: "col", gap: 8 })}>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <InputField
              id="phoneNumber"
              label="휴대폰 번호"
              isRequired
              placeholder="- 제외 숫자만 입력"
              error={errors?.phoneNumber?.message}
              {...field}
              confirmButton
              confirmButtonDisabled={!isValid}
              confirmButtonText="인증번호"
              onSubmit={handleSubmit(onRequestCode)}
            />
          )}
        />
        {isRequested && (
          <InputField
            placeholder="인증번호 입력"
            error={infoMessage}
            value={authCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              onAuthCodeChange(value);
            }}
            maxLength={4}
          />
        )}
      </div>
    </>
  );
}
