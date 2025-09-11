"use client";
import { Controller, UseFormReturn } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import { commonWrapper } from "@/styles/common.css";
import { RequestResetCodeValues } from "@/utils/validation/auth/resetPassword";
import { ResetPasswordStep } from "@/types";

interface CodeRequestFormProps {
  form: UseFormReturn<RequestResetCodeValues>;
  infoMessage: string;
  errorMessage: string;
  step: ResetPasswordStep;
  authCode: string;
  onRequestCode: (form: RequestResetCodeValues) => void;
  onAuthCodeChange: (code: string) => void;
}

export default function CodeRequestForm({
  form,
  infoMessage,
  errorMessage,
  step,
  authCode,
  onRequestCode,
  onAuthCodeChange,
}: CodeRequestFormProps) {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = form;
  const isVerified = step === "reset";
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
            disabled={isVerified}
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
            disabled={isVerified}
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
              disabled={isVerified}
              placeholder="- 제외 숫자만 입력"
              error={errors?.phoneNumber?.message}
              {...field}
              confirmButton
              confirmButtonDisabled={!isValid || isVerified}
              confirmButtonText="인증번호"
              onSubmit={handleSubmit(onRequestCode)}
            />
          )}
        />
        {step !== "request" && (
          <InputField
            placeholder="인증번호 입력"
            success={infoMessage}
            error={errorMessage}
            value={authCode}
            disabled={isVerified}
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
