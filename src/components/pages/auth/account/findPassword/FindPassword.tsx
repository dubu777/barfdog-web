"use client";
import { useRouter } from "next/navigation";
import * as styles from "../FindAccount.css";
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useSendTemporaryPassword } from "@/api/auth/mutations/useFindAccount";
import { TemporaryPassword } from "@/types";
import { useToastStore } from "@/store/useToastStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
  defaultSendTempPwValues,
  sendTempPwSchema,
} from "@/utils/validation/authValidation";
import InputField from "@/components/common/inputField/InputField";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";

const FindPassword = () => {
  const router = useRouter();
  const { handleSubmit, control, errors, isValid } =
    useFormHandler<TemporaryPassword>(
      sendTempPwSchema,
      defaultSendTempPwValues
    );
  const { mutate } = useSendTemporaryPassword();
  const { setTempPwUserInfo } = useAuthStore();
  const { addToast } = useToastStore();

  const onSubmit = (data: TemporaryPassword) => {
    const body = {
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
    };
    mutate(body, {
      onSuccess: () => {
        console.log("onSuccess data", data);
        addToast("임시비밀번호가 성공적으로 발급되었습니다!");
        setTempPwUserInfo(body);

        setTimeout(() => {
          router.push("/find-account/password/result");
        }, 500);
      },
      onError: () => {
        addToast("일치하는 정보를 찾을 수 없습니다.");
      },
    });
  };
  return (
    <section className={styles.findAccountContainer}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <InputField
            id="email"
            label="이메일"
            isRequired
            placeholder="이메일을 입력해주세요."
            error={errors?.email?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <InputField
            id="name"
            label="이름"
            isRequired
            placeholder="이름을 입력해주세요."
            error={errors?.name?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <InputField
            id="phoneNumber"
            label="연락처"
            isRequired
            placeholder="휴대폰 번호를 입력해주세요."
            error={errors?.phoneNumber?.message}
            {...field}
          />
        )}
      />
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="임시 비밀번호 받기"
        onPrimaryClick={handleSubmit(onSubmit)}
        primaryButtonSize="lg"
        isPrimaryDisabled={!isValid}
      />
    </section>
  );
};

export default FindPassword;
