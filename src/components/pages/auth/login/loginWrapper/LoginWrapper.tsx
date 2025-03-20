"use client";
import * as styles from "./LoginWrapper.css";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
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
import { isLoggedIn } from "@/utils/auth/isLoggedIn";

const LoginWrapper = () => {
  // -------> 라우팅 함수
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
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


  const handleLogin = (data: LoginFormValues) => {
    const formData = {
      email: data.email,
      password: data.password,
    };
    console.log("formData", formData);
    emailLogin(formData);
  };

  // 서버와 클라이언트의 로그인 상태 차이로 인한 에러 방지
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 로그인 중이면 로그인 페이지 접근 제한
  useEffect(() => {
    if (mounted && isLoggedIn()) {
      router.replace("/");
    }
  }, [mounted, router]);

  // 클라이언트가 마운트 되기 전에는 아무것도 렌더링하지 않음으로써 서버/클라이언트 HTML 불일치를 방지
  if (!mounted) return null;

  // 로그인 상태이면 컴포넌트 내용 대신 null 반환
  if (isLoggedIn()) return null;


  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>안녕하세요, 보호자님!</h2>
      <p className={styles.loginDescription}>
        다양한 맞춤 서비스를 위해 로그인해주세요.
      </p>
      <LoginSnsButton provider="kakao" />
      <LoginSnsButton provider="naver" />
      <LoginForm
        control={control}
        handleSubmit={handleSubmit}
        handleLogin={handleLogin}
        isValid={isValid}
      />
      <div className={styles.submitButtons}>
        <DefaultButton
          type="main"
          borderRadius="sm"
          size="lg"
          onClick={handleSubmit(handleLogin)}
          isDisabled={!isValid}
        >
          로그인
        </DefaultButton>
        <DefaultButton
          type="mainBorder"
          borderRadius="sm"
          size="lg"
          hover={false}
          linkUrl="/signup"
        >
          이메일로 회원가입
        </DefaultButton>
      </div>
    </div>
  );
};

export default LoginWrapper;
