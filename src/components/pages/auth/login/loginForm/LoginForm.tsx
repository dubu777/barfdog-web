import * as styles from "./LoginForm.css";
import Link from "next/link";
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import InputField from "@/components/ui/inputField/InputField";
import { commonWrapper } from "@/styles/common.css";
import Button from "@/components/ui/button/Button";
import Text from "@/components/ui/text/Text";
import InfoBox from "@/components/ui/infoBox/InfoBox";
import { LoginFormValues } from "@/utils/validation/auth/login";

interface LoginFormProps {
  register: UseFormRegister<LoginFormValues>;
  handleSubmit: UseFormHandleSubmit<LoginFormValues>;
  handleSignin: SubmitHandler<LoginFormValues>;
  isFailed: boolean;
  isValid: boolean;
  onInvalid?: SubmitErrorHandler<LoginFormValues>;
}

export default function LoginForm({
  register,
  handleSubmit,
  handleSignin,
  isFailed,
  onInvalid,
}: LoginFormProps) {
  return (
    <form className={commonWrapper({ direction: "col", paddingX: 20 })}>
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
        {isFailed && (
          <InfoBox
            type="info"
            color="red"
            text="이메일 또는 비밀번호가 일치하지 않아요. 입력하신 정보를 다시 확인해 주세요"
          />
        )}
        <Button
          buttonType="submit"
          onClick={handleSubmit(handleSignin, onInvalid)}
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
