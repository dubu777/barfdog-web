import * as styles from "./LoginForm.css";
import Link from "next/link";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import { LoginFormValues } from "@/types/auth/login";
import { useAuthStore } from "@/store/useAuthStore";
import { defaultLoginValues, loginSchema } from "@/utils/validation/authValidation";

interface LoginFormProps {
  redirect: 'find-id' | 'find-password';
}

const LoginForm = ({ redirect }: LoginFormProps) => {
  const { tempEmailUserInfo, tempPwUserInfo } = useAuthStore();
  const initialUserEmail =
    redirect === 'find-id' ? tempEmailUserInfo && tempEmailUserInfo.email
      : redirect === 'find-password' ? tempPwUserInfo && tempPwUserInfo.email : '';
  const { handleSubmit, control, watch, errors, isValid } = useFormHandler<LoginFormValues>(loginSchema, defaultLoginValues(initialUserEmail))

  const onSubmit = (data: LoginFormValues) => {
    console.log(data)

  }
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
              type='text'
              id='password'
              placeholder='비밀번호를 입력해주세요'
              onSubmit={field.value !== '' ? handleSubmit(onSubmit) : undefined}
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