import * as styles from "./LoginWrapper.css";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import LoginSnsButton from "@/components/pages/login/loginSnsButton/LoginSnsButton";
import LoginForm from "@/components/pages/login/loginForm/LoginForm";

const LoginWrapper = () => {
  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>안녕하세요, 보호자님!</h2>
      <p className={styles.loginDescription}>다양한 맞춤 서비스를 위해 로그인해주세요.</p>
      <LoginSnsButton type='kakao' />
      <LoginSnsButton type='naver' />
      <LoginForm />
      <div className={styles.submitButtons}>
        <DefaultButton
          type='main'
          borderRadius='sm'
          size='lg'
        >
          로그인
        </DefaultButton>
        <DefaultButton
          type='mainBorder'
          borderRadius='sm'
          size='lg'
          hover={false}
        >
          이메일로 회원가입
        </DefaultButton>
      </div>
    </div>
  );
};

export default LoginWrapper;