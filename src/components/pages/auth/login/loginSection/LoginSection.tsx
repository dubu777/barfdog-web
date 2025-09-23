"use client";
import * as styles from "./LoginSection.css";
import { useSearchParams } from "next/navigation";
import LoginForm from "@/components/pages/auth/login/loginForm/LoginForm";
import { useEmailLogin } from "@/api/auth/mutations/useEmailLogin";
import { useFormHandler } from "@/hooks/useFormHandler";
import { LoginFormValues } from "@/types";
import { defaultLoginValues, loginSchema } from "@/utils/validation/auth/auth";
import { useMemo } from "react";
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import SocialLoginButton from "../socialLoginButton/SocialLoginButton";
import { OAUTH_CLIENT_CONFIG, PROVIDERS } from "@/config/oauthClient";

export default function LoginSection() {
  const searchParams = useSearchParams();
  const nextPath = useMemo(
    () => searchParams.get("next") ?? "/",
    [searchParams]
  );

  const { mutate: emailLogin } = useEmailLogin();

  const { handleSubmit, control, isValid } = useFormHandler<LoginFormValues>(
    loginSchema,
    defaultLoginValues(null)
  );

  const handleLogin = (data: LoginFormValues) => {
    const formData = {
      email: data.email,
      password: data.password,
    };
    // 로그인 호출, 성공 시 nextPath로 풀 리로드
    emailLogin(formData, {
      onSuccess: () => {
        // 풀 리로드로 쿠키 적용 보장하면서 원래 경로로 이동
        window.location.href = nextPath;
      },
    });
  };

  return (
    <div
      className={commonWrapper({
        direction: "col",
        height: "fullWithHeader",
        backgroundColors: "gray50",
      })}
    >
      <div className={styles.loginContainer}>
        <div
          className={commonWrapper({
            direction: "col",
            gap: 4,
            padding: "0/20",
          })}
        >
          <Text type="title1">👋 안녕하세요 보호자님!</Text>
          <Text type="body3" color="gray500">
            다양한 맞춤 서비스를 위해 로그인해주세요
          </Text>
        </div>
        <LoginForm
          control={control}
          handleSubmit={handleSubmit}
          handleLogin={handleLogin}
          isValid={isValid}
        />
        <span className={styles.lineBox}>
          <em className={styles.line} />
          <Text type="body3" color="gray500">
            또는
          </Text>
          <em className={styles.line} />
        </span>
        <div className={commonWrapper({ gap: 16 })}>
          {PROVIDERS.map((provider) => {
            return (
              <SocialLoginButton
                key={provider}
                provider={provider}
                nextPath={nextPath}
                config={OAUTH_CLIENT_CONFIG[provider]}
                showSymbolButton={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
