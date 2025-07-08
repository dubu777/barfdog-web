import DefaultText from "@/components/common/defaultText/DefaultText";
import InputField from "@/components/common/inputField/InputField";
import { SignupStepValues } from "@/utils/validation/authValidation";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface SignupStep1Props {
  onNext: () => void;
}

export default function SignupStep1({ onNext }: SignupStep1Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignupStepValues>();

  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <DefaultText type="title2">
        처음 오셨나요?
        <br />
        바프독에 오신걸 환영해요!
      </DefaultText>
      <Controller
        name="step1.name"
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            onChange={(e) => {
              field.onChange(e);
            }}
            variants="line"
            placeholder="견주님의 이름을 입력해주세요."
            label="이름"
            isRequired
            clearButton
            labelColor="gray600"
            onKeyUp={(e) => {
              const hasValue = !!field.value?.trim();
              const hasError = !!errors.step1?.name;
              if (
                (e.key === "Enter" || e.key === "Tab") &&
                hasValue &&
                !hasError
              ) {
                e.preventDefault();
                emailRef.current?.focus();
              }
            }}
          />
        )}
      />
      <Controller
        name="step1.email"
        control={control}
        render={({ field }) => (
          <InputField
            {...field}
            ref={emailRef}
            onChange={(e) => {
              field.onChange(e);
            }}
            variants="line"
            placeholder="example@gmail.com"
            label="이메일(아이디)"
            isRequired
            clearButton
            labelColor="gray600"
            confirmButton
            confirmButtonDisabled={false}
            confirmButtonText="중복확인"
          />
        )}
      />
    </>
  );
}
