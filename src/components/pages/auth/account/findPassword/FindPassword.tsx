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
import useModal from "@/hooks/useModal";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";

const FindPassword = () => {
  const router = useRouter();
  const { isOpen, onClose, onToggle } = useModal();
  const { handleSubmit, control, errors, isValid } =
    useFormHandler<TemporaryPassword>(
      sendTempPwSchema,
      defaultSendTempPwValues
    );
  const { mutate } = useSendTemporaryPassword();
  const { addToast } = useToastStore();

  const onSubmit = (data: TemporaryPassword) => {
    const body = {
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
    };
    mutate(body, {
      onSuccess: () => {
        onToggle();
      },
      onError: () => {
        addToast("일치하는 정보를 찾을 수 없습니다", "above-button");
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
      <AlertModal
        title="임시 비밀번호가 발급되었습니다"
        content="가입 시 등록하신 연락처로 임시 비밀번호가 발급되었습니다"
        confirmText="로그인하기"
        cancelText="돌아가기"
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => router.push("/login")}
      />
    </section>
  );
};

export default FindPassword;
