import Text from "@/components/common/text/Text";
import InputField from "@/components/common/inputField/InputField";
import { SignupStepValues } from "@/utils/validation/auth/auth";
import { useFormContext } from "react-hook-form";
import { useEnterFocus } from "@/hooks/common/useEnterFocus";

export default function SignupStep1() {
  const {
    register,
    setFocus,
    getFieldState,
    trigger,
    formState: { errors },
  } = useFormContext<SignupStepValues>();

  const { bind } = useEnterFocus({
    fieldNames: ["step1.name", "step1.email"],
    setFocus,
    getFieldState,
    trigger,
  });

  return (
    <>
      <Text type="title2">
        처음 오셨나요?
        <br />
        바프독에 오신걸 환영해요!
      </Text>
      <InputField
        {...register("step1.name")}
        variants="line"
        placeholder="견주님의 이름을 입력해주세요."
        label="이름"
        isRequired
        clearButton
        labelColor="gray600"
        error={errors.step1?.name?.message}
        onKeyUp={bind("step1.name")}
      />
      <InputField
        {...register("step1.email")}
        variants="line"
        placeholder="example@gmail.com"
        label="이메일(아이디)"
        isRequired
        clearButton
        labelColor="gray600"
        confirmButton
        confirmButtonDisabled={false}
        confirmButtonText="중복확인"
        error={errors.step1?.email?.message}
      />
    </>
  );
}
