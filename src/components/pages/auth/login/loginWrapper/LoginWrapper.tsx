'use client';
import * as styles from "./LoginWrapper.css";
import { useSearchParams } from "next/navigation";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import LoginSnsButton from "@/components/pages/auth/login/loginSnsButton/LoginSnsButton";
import LoginForm from "@/components/pages/auth/login/loginForm/LoginForm";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";

const LoginWrapper = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const { pushWithQuery } = useDynamicQueryPush();
  const handleLogin = () => {
    // pushWithQuery('/', { redirect: redirect });
  }
  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>안녕하세요, 보호자님!</h2>
      <p className={styles.loginDescription}>다양한 맞춤 서비스를 위해 로그인해주세요.</p>
      <LoginSnsButton type='kakao' />
      <LoginSnsButton type='naver' />
      <LoginForm redirect={redirect as 'find-id' | 'find-password'} />
      <div className={styles.submitButtons}>
        <DefaultButton
          type='main'
          borderRadius='sm'
          size='lg'
          onClick={handleLogin}
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