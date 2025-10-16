"use client";
import { Controller, UseFormReturn } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import { commonWrapper } from "@/styles/common.css";
import { RequestResetCodeValues } from "@/utils/validation/auth/resetPassword";
import { ResetPasswordStep } from "@/types";

interface CodeRequestFormProps {
  form: UseFormReturn<RequestResetCodeValues>;
  infoMessage: string;
  requestError: string;
  verifyError: string;
  step: ResetPasswordStep;
  authCode: string;
  onRequestCode: (form: RequestResetCodeValues) => void;
  onAuthCodeChange: (code: string) => void;
}

export default function CodeRequestForm({
  form,
  infoMessage,
  requestError,
  verifyError,
  step,
  authCode,
  onRequestCode,
  onAuthCodeChange,
}: CodeRequestFormProps) {
  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = form;
  const isVerified = step === "reset";
  const isRequested = step !== "request";
  console.log(step);

  return (
    <>
      <InputField
        {...register("memberName")}
        id="memberName"
        label="이름"
        isRequired
        disabled={isVerified}
        placeholder="이름 입력"
        error={errors?.memberName?.message}
      />
      <InputField
        {...register("email")}
        id="email"
        label="이메일(아이디)"
        isRequired
        disabled={isVerified}
        placeholder="example@gmail.com."
        error={errors?.email?.message}
      />
      <div className={commonWrapper({ direction: "col", gap: 8 })}>
        <InputField
          {...register("phoneNumber")}
          id="phoneNumber"
          label="휴대폰 번호"
          isRequired
          disabled={isVerified}
          placeholder="- 제외 숫자만 입력"
          error={errors?.phoneNumber?.message ?? requestError}
          confirmButton
          confirmButtonDisabled={!isValid || isVerified}
          confirmButtonText={isRequested ? "재전송" : "인증번호"}
          onSubmit={handleSubmit(onRequestCode)}
        />
        {isRequested && (
          <InputField
            placeholder="인증번호 입력"
            success={infoMessage}
            error={verifyError}
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
