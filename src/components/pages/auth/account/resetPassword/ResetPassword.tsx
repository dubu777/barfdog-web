"use client";
import * as styles from "../FindAccount.css";
import { useForm } from "react-hook-form";
import { useToastStore } from "@/store/useToastStore";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import { useState, useMemo, useCallback } from "react";
import {
  defaultRequestResetCodeValues,
  defaultResetPasswordValues,
  requestResetCodeSchema,
  RequestResetCodeValues,
  resetPasswordSchema,
  ResetPasswordValues,
} from "@/utils/validation/auth/resetPassword";
import { useRequestPasswordResetCode } from "@/api/auth/mutations/useRequestPasswordResetCode";
import { useVerifyPasswordResetCode } from "@/api/auth/mutations/useVerifyPasswordResetCode";
import { useResetPassword } from "@/api/auth/mutations/useResetPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import CodeRequestForm from "./codeRequestForm/CodeRequestForm";
import NewPasswordForm from "./newPasswordForm/NewPasswordForm";
import { ResetPasswordStep } from "@/types";

export default function ResetPassword() {
  const { addToast } = useToastStore();
  const { mutate: requestCode } = useRequestPasswordResetCode();
  const { mutate: verifyCode } = useVerifyPasswordResetCode();
  const { mutate: resetPassword } = useResetPassword();

  // Form 관리
  const requestForm = useForm<RequestResetCodeValues>({
    resolver: yupResolver(requestResetCodeSchema),
    defaultValues: defaultRequestResetCodeValues,
    mode: "all",
  });

  const resetForm = useForm<ResetPasswordValues>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: defaultResetPasswordValues,
    mode: "all",
  });

  // State 관리
  const [step, setStep] = useState<ResetPasswordStep>("request");
  const [authToken, setAuthToken] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isResetFormValid = resetForm.formState.isValid;

  // 핸들러 함수들 (useCallback으로 최적화)
  const handleRequestCode = useCallback(
    (body: RequestResetCodeValues) => {
      setStep("verify");
      // requestCode(body, {
      //   onSuccess: () => {
      //     setStep("verify");
      //     addToast("휴대폰 번호로 인증번호가 발송됐어요", "above-button");
      //   },
      //   onError: () => {
      //     addToast("일치하는 정보를 찾을 수 없습니다", "above-button");
      //   },
      // });
    },
    [requestCode, addToast]
  );

  const handleVerifyCode = useCallback(() => {
    setStep("reset");
    setInfoMessage("휴대폰 번호 인증이 완료됐어요");
    // verifyCode(
    //   { authToken, authCode },
    //   {
    //     onSuccess: () => {
    //       setStep("reset");
    //       addToast("인증이 완료되었습니다", "above-button");
    //     },
    //     onError: () => {
    //       addToast("인증번호가 일치하지 않습니다", "above-button");
    //     },
    //   }
    // );
  }, [verifyCode, authToken, authCode, addToast]);

  const handleResetPassword = useCallback(() => {
    resetForm.handleSubmit((formData: ResetPasswordValues) => {
      const body = {
        authToken,
        authCode,
        password: formData.confirmPassword,
      };
      resetPassword(body, {
        onSuccess: () => {
          addToast("비밀번호가 변경되었습니다", "above-button");
        },
        onError: () => {
          addToast("비밀번호 변경에 실패했습니다", "above-button");
        },
      });
    })();
  }, [resetPassword, resetForm, authToken, authCode, addToast]);

  const buttonConfig = useMemo(() => {
    const configs = {
      request: {
        label: "인증확인",
        disabled: true,
        onClick: () => {},
      },
      verify: {
        label: "인증확인",
        disabled: authCode.length !== 4,
        onClick: handleVerifyCode,
      },
      reset: {
        label: "비밀번호 재설정",
        disabled: !isResetFormValid,
        onClick: handleResetPassword,
      },
    } as const;

    return configs[step];
  }, [
    step,
    authCode.length,
    isResetFormValid,
    handleVerifyCode,
    handleResetPassword,
  ]);

  return (
    <section className={styles.findAccountContainer}>
      <CodeRequestForm
        form={requestForm}
        infoMessage={infoMessage}
        errorMessage={errorMessage}
        onRequestCode={handleRequestCode}
        step={step}
        authCode={authCode}
        onAuthCodeChange={setAuthCode}
      />
      {step === "reset" && <NewPasswordForm form={resetForm} />}
      <ButtonDocked
        type="full-button"
        primaryButtonLabel={buttonConfig.label}
        onPrimaryClick={buttonConfig.onClick}
        primaryButtonSize="lg"
        isPrimaryDisabled={buttonConfig.disabled}
      />
    </section>
  );
}
