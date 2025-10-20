"use client";
import * as styles from "./LoginSection.css";
import { useSearchParams } from "next/navigation";
import LoginForm from "@/components/pages/auth/login/loginForm/LoginForm";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useMemo, useState } from "react";
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import SocialLoginButton from "../socialLoginButton/SocialLoginButton";
import { OAUTH_CLIENT_CONFIG } from "@/config/oauthClient";
import { PROVIDERS } from "@/constants/auth";
import { useLogin } from "@/api/auth/mutations/useLogin";
import {
  defaultLoginValues,
  LoginFormValues,
  loginSchema,
} from "@/utils/validation/auth/login";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginSection() {
  const searchParams = useSearchParams();
  const { loginEmail } = useAuthStore();
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const nextPath = useMemo(
    () => searchParams.get("next") ?? "/",
    [searchParams]
  );

  const { mutate: login } = useLogin();

  const { handleSubmit, isValid, register } = useFormHandler<LoginFormValues>(
    loginSchema,
    defaultLoginValues(loginEmail)
  );

  const handleSignin = (data: LoginFormValues) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    login(body, {
      onSuccess: () => {
        // 풀 리로드로 쿠키 적용 보장하면서 원래 경로로 이동
        window.location.href = nextPath;
      },
      onError: () => {
        setIsFailed(true);
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
          register={register}
          handleSubmit={handleSubmit}
          handleSignin={handleSignin}
          isFailed={isFailed}
          isValid={isValid}
          onInvalid={() => setIsFailed(true)}
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
