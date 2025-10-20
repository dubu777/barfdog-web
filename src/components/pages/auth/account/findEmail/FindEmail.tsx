"use client";

import * as styles from "../FindAccount.css";
import { useForm } from "react-hook-form";
import { useRequestFindEmailCode } from "@/api/auth/mutations/useRequestFindEmailCode";
import { useToastStore } from "@/store/useToastStore";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import {
  defaultFindUserEmailValues,
  FindEmailValues,
  findUserEmailSchema,
} from "@/utils/validation/auth/findEmail";
import { useCallback, useMemo, useState } from "react";
import Countdown from "../resetPassword/countdown/Countdown";
import { useVerifyFindEmailCode } from "@/api/auth/mutations/useVerifyFindEmailCode";
import FindEmailForm from "./form/FindEmailForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCompletedMode } from "@/hooks/useCompletedMode";
import { useRouter } from "next/navigation";
import { VerificationStep } from "@/types";
import FindAccountResult from "../findAccount/result/FindAccountResult";
import { useAuthStore } from "@/store/useAuthStore";

export default function FindEmail() {
  const { addToast } = useToastStore();
  const router = useRouter();
  const { mutate: requestCode } = useRequestFindEmailCode();
  const { mutate: verifyCode } = useVerifyFindEmailCode();
  const { completedMode, toggleCompletedMode } = useCompletedMode();

  const [step, setStep] = useState<VerificationStep>("request");
  const [authToken, setAuthToken] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [requestError, setRequestError] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [email, setEmail] = useState("");
  const [snsProvider, setSnsProvider] = useState<string | null>(null);

  const requestForm = useForm<FindEmailValues>({
    resolver: yupResolver(findUserEmailSchema),
    defaultValues: defaultFindUserEmailValues,
    mode: "all",
  });

  const handleRequestCode = useCallback(
    (form: FindEmailValues) => {
      requestCode(form, {
        onSuccess: (res) => {
          setStep("verify");
          setAuthToken(res.authToken);
          setExpiryDate(res.expiryDate);
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
        onSuccess: (res) => {
          setEmail(res.email);
          setSnsProvider(res.snsProvider);
          setStep("verified");
          setVerifyError("");
          toggleCompletedMode();
        },
        onError: () => {
          setVerifyError("인증번호가 일치하지 않아요");
        },
      }
    );
  }, [verifyCode, authToken, authCode, addToast]);

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
      verified: {
        label: "로그인",
        disabled: false,
        onClick: () => router.push("/login"),
      },
    } as const;
    return configs[step];
  }, [step, authCode.length, handleVerifyCode]);

  return (
    <section className={styles.findAccountContainer}>
      {!completedMode ? (
        <FindEmailForm
          form={requestForm}
          infoMessage={infoMessage}
          requestError={requestError}
          verifyError={verifyError}
          onRequestCode={handleRequestCode}
          step={step}
          authCode={authCode}
          onAuthCodeChange={setAuthCode}
        />
      ) : (
        <FindAccountResult
          type="email"
          email={email}
          snsProvider={snsProvider}
        />
      )}
      <ButtonDocked
        type="full-button"
        primaryButtonLabel={buttonConfig.label}
        onPrimaryClick={buttonConfig.onClick}
        primaryButtonSize="lg"
        isPrimaryDisabled={buttonConfig.disabled}
        topSlot={
          step === "verify" && expiryDate ? (
            <Countdown
              targetDate={expiryDate}
              sourceTz="local"
              onExpiry={handleExpire}
            />
          ) : null
        }
      />
    </section>
  );
}
