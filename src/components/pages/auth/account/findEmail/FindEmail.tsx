"use client";

import * as styles from "../FindAccount.css";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFindUserEmail } from "@/api/auth/mutations/useFindAccount";
import { useToastStore } from "@/store/useToastStore";
import InputField from "@/components/common/inputField/InputField";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import {
  defaultFindUserEmailValues,
  FindEmailValues,
  findUserEmailSchema,
} from "@/utils/validation/auth/findEmail";

export default function FindEmail() {
  const router = useRouter();
  const { handleSubmit, control, errors, isValid } =
    useFormHandler<FindEmailValues>(
      findUserEmailSchema,
      defaultFindUserEmailValues
    );
  const { mutate } = useFindUserEmail();
  const { addToast } = useToastStore();

  const onSubmit = (form: FindEmailValues) => {
    mutate(form, {
      onSuccess: () => {
        addToast("아이디가 성공적으로 확인되었습니다!", "above-button");
        setTimeout(() => {
          router.push("/find-account?type=result");
        }, 500);
      },
      onError: () => {
        addToast("일치하는 정보를 찾을 수 없습니다.", "above-button");
      },
    });
  };
  return (
    <section className={styles.findAccountContainer}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <InputField
            id="name"
            label="이름"
            isRequired
            placeholder="견주님의 이름을 입력해주세요"
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
            label="휴대폰 번호"
            isRequired
            placeholder="번호만 입력해주세요"
            confirmButton
            confirmButtonDisabled={false}
            confirmButtonText="인증번호"
            onSubmit={() => console.log("인증번호 요청")}
            error={errors?.phoneNumber?.message}
            {...field}
          />
        )}
      />
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="확인"
        onPrimaryClick={handleSubmit(onSubmit)}
        primaryButtonSize="lg"
        isPrimaryDisabled={!isValid}
      />
    </section>
  );
}
