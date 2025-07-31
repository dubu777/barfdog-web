import * as styles from "./LoginForm.css";
import Link from "next/link";
import {
  Control,
  Controller,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { LoginFormValues } from "@/types";
import InputField from "@/components/common/inputField/InputField";
import { commonWrapper } from "@/styles/common.css";
import Button from "@/components/common/button/Button";
import DefaultText from "@/components/common/defaultText/DefaultText";

interface LoginFormProps {
  control: Control<LoginFormValues>;
  handleSubmit: UseFormHandleSubmit<LoginFormValues>;
  handleLogin: SubmitHandler<LoginFormValues>;
  isValid: boolean;
}

const LoginForm = ({
  control,
  handleSubmit,
  handleLogin,
  isValid,
}: LoginFormProps) => {
  return (
    <form className={commonWrapper({ direction: "col", padding: 20 })}>
      <div className={commonWrapper({ direction: "col", gap: 12 })}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <InputField
              id="email"
              placeholder="이메일을 입력해주세요"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <InputField
              masking
              id="password"
              placeholder="비밀번호를 입력해주세요"
              onSubmit={isValid ? handleSubmit(handleLogin) : undefined}
              {...field}
            />
          )}
        />
        <Button
          onClick={handleSubmit(handleLogin)}
          fullWidth
          className={styles.loginButton}
        >
          로그인
        </Button>
      </div>
      <div className={commonWrapper({ gap: 4, justify: "end" })}>
        <Link href="/signup">
          <DefaultText type="headline4" color="gray400">
            회원가입
          </DefaultText>
        </Link>
        <DefaultText type="headline4" color="gray400">
          |
        </DefaultText>
        <Link href="/find-account">
          <DefaultText type="headline4" color="gray400">
            계정찾기
          </DefaultText>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
