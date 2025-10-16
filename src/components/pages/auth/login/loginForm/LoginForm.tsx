import * as styles from "./LoginForm.css";
import Link from "next/link";
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { LoginFormValues } from "@/types";
import InputField from "@/components/common/inputField/InputField";
import { commonWrapper } from "@/styles/common.css";
import Button from "@/components/common/button/Button";
import Text from "@/components/common/text/Text";

interface LoginFormProps {
  register: UseFormRegister<LoginFormValues>;
  handleSubmit: UseFormHandleSubmit<LoginFormValues>;
  handleLogin: SubmitHandler<LoginFormValues>;
  isValid: boolean;
}

export default function LoginForm({
  register,
  handleSubmit,
  handleLogin,
}: LoginFormProps) {
  return (
    <form className={commonWrapper({ direction: "col", padding: "0/20" })}>
      <div className={commonWrapper({ direction: "col", gap: 12 })}>
        <InputField
          {...register("email")}
          id="email"
          placeholder="이메일을 입력해주세요"
        />
        <InputField
          {...register("password")}
          masking
          id="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <Button
          buttonType="submit"
          onClick={handleSubmit(handleLogin)}
          fullWidth
          className={styles.loginButton}
        >
          로그인
        </Button>
      </div>
      <div className={commonWrapper({ gap: 4 })}>
        <Link href="/signup">
          <Text type="headline4" color="gray500">
            회원가입
          </Text>
        </Link>
        <Text type="headline4" color="gray500">
          |
        </Text>
        <Link href="/find-account?type=email">
          <Text type="headline4" color="gray500">
            아이디 찾기
          </Text>
        </Link>
        <Text type="headline4" color="gray500">
          |
        </Text>
        <Link href="/find-account?type=password">
          <Text type="headline4" color="gray500">
            비밀번호 찾기
          </Text>
        </Link>
      </div>
    </form>
  );
}
