'use client';
import * as styles from "./LoginWrapper.css";
import { useSearchParams } from "next/navigation";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import LoginSnsButton from "@/components/pages/auth/login/loginSnsButton/LoginSnsButton";
import LoginForm from "@/components/pages/auth/login/loginForm/LoginForm";
import { useEmailLogin } from "@/api/auth/mutations/useEmailLogin";
import { useFormHandler } from "@/hooks/useFormHandler";
import { LoginFormValues } from "@/types";
import { defaultLoginValues, loginSchema } from "@/utils/validation/authValidation";
import { useAuthStore } from "@/store/useAuthStore";
import { AUTH_CONFIG } from "@/constants/auth";
import { useMemo } from "react";

const LoginWrapper = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  // 아이디 찾기, 비밀번호 찾기 성공시 사용자 정보 데이터 값
  const { tempEmailUserInfo, tempPwUserInfo } = useAuthStore();
  
  const initialUserEmail = useMemo(() => {
    if (redirect === 'find-id') return tempEmailUserInfo?.email || '';
    if (redirect === 'find-password') return tempPwUserInfo?.email || '';
    return '';
  }, [redirect, tempEmailUserInfo, tempPwUserInfo]);

  const { handleSubmit, control, isValid } = useFormHandler<LoginFormValues>(loginSchema, defaultLoginValues(initialUserEmail));
  const { mutate } = useEmailLogin();

  const handleLogin = (data: LoginFormValues) => {
    const formData = {
      email: data.email,
      password: data.password,
    }
    console.log('formData', formData);
    mutate(formData)
  }


  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>안녕하세요, 보호자님!</h2>
      <p className={styles.loginDescription}>다양한 맞춤 서비스를 위해 로그인해주세요.</p>
      <LoginSnsButton provider='kakao' />
      <LoginSnsButton provider='naver' />
      <LoginForm
        control={control}
        handleSubmit={handleSubmit}
        handleLogin={handleLogin}
        isValid={isValid}
      />
      <div className={styles.submitButtons}>
        <DefaultButton
          type='main'
          borderRadius='sm'
          size='lg'
          onClick={handleSubmit(handleLogin)}
          isDisabled={!isValid}
        >
          로그인
        </DefaultButton>
        <DefaultButton
          type='mainBorder'
          borderRadius='sm'
          size='lg'
          hover={false}
          linkUrl='/signup'
        >
          이메일로 회원가입
        </DefaultButton>
      </div>
    </div>
  );
};

export default LoginWrapper;