import * as styles from "./LoginForm.css";
import Link from "next/link";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";
import { Control, Controller, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { LoginFormValues } from "@/types/auth/login";

interface LoginFormProps {
  control: Control<LoginFormValues>;
  handleSubmit: UseFormHandleSubmit<LoginFormValues>;
  handleLogin: SubmitHandler<LoginFormValues>;
  isValid: boolean;
}

const LoginForm = ({ control, handleSubmit, handleLogin, isValid }: LoginFormProps) => {
  console.log(isValid)
  return (
    <form className={styles.loginForm}>
      <span className={styles.lineBox}>
        <em className={styles.line}/>
        또는 이메일로 로그인
        <em className={styles.line}/>
      </span>
      <div className={styles.loginInputContainer}>
        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <DefaultTextField
              type='text'
              id='email'
              placeholder='이메일을 입력해주세요'
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <DefaultTextField
              type='password'
              id='password'
              placeholder='비밀번호를 입력해주세요'
              onSubmit={isValid ? handleSubmit(handleLogin) : undefined}
              {...field}
            />
          )}
        />
      </div>
      <div className={styles.loginControls}>
        <Controller
          control={control}
          name='autoLogin'
          render={({ field }) => (
            <DefaultCheckbox
              id='autoLogin'
              label='자동 로그인'
              labelPosition='right'
              {...field}
            />
          )}
        />
        <div className={styles.findAccount}>
          <Link className={styles.findById} href='/account/find-id'>아이디 찾기</Link>
          <Link href='/account/find-password'>비밀번호 찾기</Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;