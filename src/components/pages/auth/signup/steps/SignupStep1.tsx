"use client";

import Text from "@/components/common/text/Text";
import InputField from "@/components/common/inputField/InputField";
import { SignupStepValues } from "@/utils/validation/auth/signup";
import { useFormContext, useWatch } from "react-hook-form";
import { useEnterFocus } from "@/hooks/common/useEnterFocus";
import { useCallback, useState } from "react";
import { useCheckDuplicateEmail } from "@/api/auth/queries/useCheckDuplicateEmail";

interface SignupStepProps {
  onNextStep: () => void;
}

export default function SignupStep1({ onNextStep }: SignupStepProps) {
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const {
    control,
    register,
    setFocus,
    getFieldState,
    trigger,
    setError,
    setValue,
    formState: { errors },
  } = useFormContext<SignupStepValues>();

  const email = useWatch({
    control,
    name: "step1.email",
  });

  const { bind } = useEnterFocus({
    fieldNames: ["step1.name", "step1.email"],
    setFocus,
    getFieldState,
    trigger,
  });

  const { refetch: checkDuplicate } = useCheckDuplicateEmail(email, {
    enabled: false,
  });

  const handleDuplicateCheck = useCallback(async () => {
    if (errors?.step1?.email || !email?.trim()) {
      return;
    }

    const { data } = await checkDuplicate();
    const isSuccess = data?.success;

    if (isSuccess) {
      setValue("step1.confirmEmail", true, { shouldValidate: true });
      setSuccessMessage("사용 가능한 이메일이에요");
    } else {
      setError("step1.email", {
        type: "manual",
        message: "이미 가입된 이메일이에요",
      });
      setValue("step1.confirmEmail", false, { shouldValidate: true });
      setSuccessMessage(undefined);
    }
  }, [email, checkDuplicate, setError, setValue, errors?.step1?.email]);

  const handleChangeEmail = () => {
    setValue("step1.confirmEmail", false, { shouldValidate: true });
    setSuccessMessage(undefined);
  };

  const emailReg = register("step1.email");

  return (
    <>
      <Text type="title2">
        처음 오셨나요?
        <br />
        바프독에 오신걸 환영해요!
      </Text>
      <InputField
        {...register("step1.name")}
        variants="line"
        placeholder="견주님의 이름을 입력해주세요."
        label="이름"
        isRequired
        clearButton
        autoFocus
        onReset={() => {
          setValue("step1.name", "", { shouldValidate: true });
        }}
        labelColor="gray600"
        error={errors.step1?.name?.message}
        onKeyUp={bind("step1.name")}
      />
      <InputField
        {...emailReg}
        onChange={(e) => {
          emailReg.onChange(e);
          handleChangeEmail();
        }}
        variants="line"
        placeholder="example@gmail.com"
        label="이메일(아이디)"
        isRequired
        clearButton
        onReset={() => {
          setValue("step1.email", "", { shouldValidate: true });
          setSuccessMessage(undefined);
        }}
        labelColor="gray600"
        confirmButton
        confirmButtonDisabled={false}
        confirmButtonText="중복확인"
        onSubmit={handleDuplicateCheck}
        error={errors.step1?.email?.message}
        onKeyUp={bind("step1.email")}
        success={successMessage}
      />
    </>
  );
}
