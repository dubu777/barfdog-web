"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import { FindEmailValues } from "@/utils/validation/auth/findEmail";
import { commonWrapper } from "@/styles/common.css";
import { VerificationStep } from "@/types";

interface FindEmailFormProps {
  form: UseFormReturn<FindEmailValues>;
  infoMessage: string;
  requestError: string;
  verifyError: string;
  step: VerificationStep;
  authCode: string;
  onRequestCode: (form: FindEmailValues) => void;
  onAuthCodeChange: (code: string) => void;
}

export default function FindEmailForm({
  form,
  infoMessage,
  requestError,
  verifyError,
  step,
  authCode,
  onRequestCode,
  onAuthCodeChange,
}: FindEmailFormProps) {
  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = form;

  const isRequested = step !== "request";

  return (
    <>
      <InputField
        {...register("memberName")}
        id="memberName"
        label="이름"
        isRequired
        placeholder="이름 입력"
        error={errors?.memberName?.message}
      />
      <div className={commonWrapper({ direction: "col", gap: 8 })}>
        <InputField
          {...register("phoneNumber")}
          id="phoneNumber"
          label="휴대폰 번호"
          isRequired
          placeholder="- 제외 숫자만 입력"
          error={errors?.phoneNumber?.message ?? requestError}
          confirmButton
          confirmButtonDisabled={!isValid}
          confirmButtonText={isRequested ? "재전송" : "인증번호"}
          onSubmit={handleSubmit(onRequestCode)}
        />
        {isRequested && (
          <InputField
            placeholder="인증번호 입력"
            success={infoMessage}
            error={verifyError}
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
