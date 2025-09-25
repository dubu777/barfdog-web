import Text from "@/components/common/text/Text";
import InputField from "@/components/common/inputField/InputField";
import { SignupStepValues } from "@/utils/validation/auth/auth";
import { useFormContext } from "react-hook-form";

export default function SignupStep1() {
  const {
    register,
    setFocus,
    formState: { errors },
  } = useFormContext<SignupStepValues>();

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
        onKeyUp={(e) => {
          const hasValue = !!(e.currentTarget.value ?? "").trim();
          const hasError = !!errors.step1?.name;
          if (e.key === "Enter" && hasValue && !hasError) {
            e.preventDefault();
            setFocus("step1.email");
          }
        }}
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
