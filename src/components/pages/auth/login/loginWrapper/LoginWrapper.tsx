"use client";
import * as styles from "./LoginWrapper.css";
import { useRouter, useSearchParams } from "next/navigation";
import LoginSnsButton from "@/components/pages/auth/login/loginSnsButton/LoginSnsButton";
import LoginForm from "@/components/pages/auth/login/loginForm/LoginForm";
import { useEmailLogin } from "@/api/auth/mutations/useEmailLogin";
import { useFormHandler } from "@/hooks/useFormHandler";
import { LoginFormValues } from "@/types";
import {
  defaultLoginValues,
  loginSchema,
} from "@/utils/validation/authValidation";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useMemo, useState } from "react";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";
import { getCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { resetStores } from "@/store/resetStores";
import { commonWrapper } from "@/styles/common.css";
import DefaultText from "@/components/common/defaultText/DefaultText";

const LoginWrapper = () => {
  // -------> 라우팅 함수
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const nextPath = useMemo(
    () => searchParams.get("next") ?? "/",
    [searchParams]
  );

  const router = useRouter();

  // ------->상태관리
  const [mounted, setMounted] = useState(false);
  const { tempEmailUserInfo, tempPwUserInfo } = useAuthStore();

  const { mutate: emailLogin } = useEmailLogin();

  const initialUserEmail = useMemo(() => {
    if (redirect === "find-id") return tempEmailUserInfo?.email || "";
    if (redirect === "find-password") return tempPwUserInfo?.email || "";
    return "";
  }, [redirect, tempEmailUserInfo, tempPwUserInfo]);

  const { handleSubmit, control, isValid } = useFormHandler<LoginFormValues>(
    loginSchema,
    defaultLoginValues(initialUserEmail)
  );

  // ------->cookie 초기화시 stores reset 을 위한 login 확인 용도
  const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
  const isLoggedIn = isAuthenticated(token);

  const handleLogin = (data: LoginFormValues) => {
    const formData = {
      email: data.email,
      password: data.password,
    };
    console.log("formData", formData);
    // 로그인 호출, 성공 시 nextPath로 풀 리로드
    emailLogin(formData, {
      onSuccess: () => {
        // ❷ 풀 리로드로 쿠키 적용 보장하면서 원래 경로로 이동
        window.location.href = nextPath;
      },
    });
  };

  // 서버와 클라이언트의 로그인 상태 차이로 인한 에러 방지
  useEffect(() => {
    setMounted(true);
    if (!isLoggedIn) {
      resetStores();
    }
  }, [isLoggedIn]);

  // 로그인 중이면 로그인 페이지 접근 제한
  useEffect(() => {
    if (mounted && isAuthenticated()) {
      router.replace("/");
    }
  }, [mounted, router]);

  // 클라이언트가 마운트 되기 전에는 아무것도 렌더링하지 않음으로써 서버/클라이언트 HTML 불일치를 방지
  if (!mounted) return null;

  // 로그인 상태이면 컴포넌트 내용 대신 null 반환
  if (isAuthenticated()) return null;

  return (
    <div className={styles.loginContainer}>
      <div className={commonWrapper({ direction: "col", gap: 4, padding: 20 })}>
        <DefaultText type="title1">👋 안녕하세요 보호자님!</DefaultText>
        <DefaultText type="body3" color="gray500">
          다양한 맞춤 서비스를 위해 로그인해주세요
        </DefaultText>
      </div>
      <LoginForm
        control={control}
        handleSubmit={handleSubmit}
        handleLogin={handleLogin}
        isValid={isValid}
      />
      <span className={styles.lineBox}>
        <em className={styles.line} />
        <DefaultText type="body3" color="gray500">
          또는 SNS 간편 로그인
        </DefaultText>
        <em className={styles.line} />
      </span>
      <div className={commonWrapper({ gap: 8, direction: "col", padding: 20 })}>
        <LoginSnsButton provider="naver" />
        <LoginSnsButton provider="kakao" />
      </div>
    </div>
  );
};

export default LoginWrapper;
