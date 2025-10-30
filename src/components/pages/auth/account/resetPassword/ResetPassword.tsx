"use client";
import * as styles from "../FindAccount.css";
import { useForm, useWatch } from "react-hook-form";
import { useToastStore } from "@/store/useToastStore";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
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
import { ResetPasswordStep, SnsProvider } from "@/types";
import AlertModal from "@/components/ui/modal/alertModal/AlertModal";
import useModal from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import Countdown from "./countdown/Countdown";
import { useAuthStore } from "@/store/useAuthStore";
import FindAccountResult from "../findAccount/result/FindAccountResult";

export default function ResetPassword() {
  const router = useRouter();
  const { addToast } = useToastStore();
  const setLoginEmail = useAuthStore((s) => s.setLoginEmail);

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

  // 상태 관리
  const [step, setStep] = useState<ResetPasswordStep>("request");
  const [authToken, setAuthToken] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [snsProvider, setSnsProvider] = useState<SnsProvider | null>(null);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState("");
  const [requestError, setRequestError] = useState("");
  const [verifyError, setVerifyError] = useState("");

  const isResetFormValid = resetForm.formState.isValid;
  const email = useWatch({
    control: requestForm.control,
    name: "email",
  });
  const { isOpen, onClose, onToggle } = useModal();

  const handleRequestCode = useCallback(
    (body: RequestResetCodeValues) => {
      requestCode(body, {
        onSuccess: (res) => {
          setStep("verify");
          setAuthToken(res.authToken);
          setExpiryDate(res.expiryDate);
          setSnsProvider(res.snsProvider);
          setRequestError("");
          setVerifyError("");
          setInfoMessage("휴대폰 번호로 인증번호가 발송됐어요");
        },
        onError: () => {
          setRequestError("입력하신 정보를 다시 확인해 주세요");
        },
      });
    },
    [requestCode, addToast]
  );

  const handleVerifyCode = useCallback(() => {
    verifyCode(
      { authToken, authCode },
      {
        onSuccess: () => {
          setStep("reset");
          setVerifyError("");
          setInfoMessage("휴대폰 번호 인증이 완료됐어요");
          setLoginEmail(email);
        },
        onError: () => {
          setVerifyError("인증번호가 일치하지 않아요");
        },
      }
    );
  }, [verifyCode, authToken, authCode, addToast]);

  const handleResetPassword = useCallback(() => {
    resetForm.handleSubmit((formData: ResetPasswordValues) => {
      const body = {
        authToken,
        authCode,
        newPassword: formData.confirmPassword,
      };
      resetPassword(body, {
        onSuccess: () => {
          onToggle();
        },
        onError: () => {
          addToast("비밀번호 변경에 실패했습니다", "above-button");
        },
      });
    })();
  }, [resetPassword, resetForm, authToken, authCode, addToast]);

  const handleExpire = useCallback(() => {
    setInfoMessage("");
    setVerifyError(
      "인증 유효시간이 초과됐어요. [재전송]을 눌러 인증번호를 다시 입력해 주세요."
    );
  }, []);

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
      {snsProvider ? (
        <FindAccountResult
          type="password"
          snsProvider={snsProvider}
          email={email}
        />
      ) : (
        <>
          <CodeRequestForm
            form={requestForm}
            infoMessage={infoMessage}
            requestError={requestError}
            verifyError={verifyError}
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
            topSlot={
              step !== "request" && expiryDate ? (
                <Countdown
                  targetDate={expiryDate}
                  sourceTz="local"
                  onExpiry={handleExpire}
                />
              ) : null
            }
          />
        </>
      )}

      <AlertModal
        title="비밀번호가 성공적으로 변경됐어요"
        content="빈경된 비밀번호로 다시 로그인해 주세요"
        confirmText="확인"
        onConfirm={() => router.push("/login")}
        isOpen={isOpen}
        onClose={onClose}
      />
    </section>
  );
}
