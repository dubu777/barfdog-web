"use client";
import * as yup from "yup";
import axios from "axios";
import { commonWrapper } from "@/styles/common.css";
import { Controller } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import InputStatusMessage from "@/components/common/inputStatusMessage/InputStatusMessage";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useToastStore } from "@/store/useToastStore";
import { ChangePassword as ChangePasswordType } from "@/types";
import { useChangePassword } from "@/api/auth/mutations/useChangePassword";

const passwordValidation = [
  {
    rule: (password: string) =>
      /[a-zA-Z]/.test(password) &&
      /\d/.test(password) &&
      /[\W_]/.test(password),
    message: "영문/숫자/특수문자 조합",
  },
  {
    rule: (password: string) => password.length >= 8,
    message: "8자 이상",
  },
  {
    rule: (password: string) =>
      password.length > 3 &&
      !/(.)\1{2,}/.test(password) && // 동일 문자 3회 이상 반복 금지
      !/(012|123|234|345|456|567|678|789|890)/.test(password) && // 연속된 숫자 패턴 금지
      !/([a-zA-Z])\1{2,}/.test(password), // 영문자 동일 문자 3회 이상 반복 금지
    message: "3회 이상 동일하거나 연속성이 없는 문자",
  },
];

const changePasswordSchema = yup.object().shape({
  password: yup.string().required("비밀번호는 필수입니다."),
  newPassword: yup.string().required("새 비밀번호를 입력해주세요"),
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref("newPassword")], "비밀번호가 일치하지 않습니다")
    .required("비밀번호 확인은 필수입니다"),
});

const defaultChangePasswordValues: ChangePasswordType = {
  password: "",
  newPassword: "",
  newPasswordConfirm: "",
};

export default function ChangePassword() {
  const {
    handleSubmit,
    control,
    errors,
    isValid,
    reset,
    trigger,
    clearErrors,
    dirtyFields,
    setValue,
    getValues,
    setError,
  } = useFormHandler<ChangePasswordType>(
    changePasswordSchema,
    defaultChangePasswordValues
  );

  const { mutate } = useChangePassword();
  const { addToast } = useToastStore();

  const isValidPasswordForm = (newPassword: string) => {
    return (
      passwordValidation.every((validation) => validation.rule(newPassword)) &&
      isValid
    );
  };

  const onSubmit = (data: ChangePasswordType) => {
    mutate(data, {
      onSuccess: (data) => {
        if (data.status === 200) {
          addToast("비밀번호 변경이 완료되었습니다!", "above-button");
          setTimeout(() => {
            if (window.document.activeElement instanceof HTMLElement) {
              window.document.activeElement.blur();
              clearErrors();
              reset(undefined, { keepErrors: false, keepDirty: false });
            }
          }, 0);
        }
      },
      onError: (error) => {
        console.log("error", error);
        if (axios.isAxiosError(error)) {
          // const errorMessage = error?.response?.data?.errors[0].defaultMessage || '비밀번호 변경에 실패했습니다.';
          const errorMessage = "기존 비밀번호가 일치하지 않습니다.";
          setError("password", { message: errorMessage });
          addToast(errorMessage, "above-button");
        }
      },
    });
  };

  const inputProps = {
    masking: true,
    isRequired: true,
    clearButton: true,
  };

  return (
    <section>
      <form className={commonWrapper({
        direction: 'col',
        gap: 20,
        align: 'start',
        padding: 20,
      })}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            const passwordError = errors?.password?.message;
            return (
              <div className={commonWrapper({ width: 'full', direction: 'col', align: 'start', gap: 8 })}>
                <InputField
                  {...field}
                  type="password"
                  variants="box"
                  placeholder="기존 비밀번호를 입력해주세요."
                  label="기존 비밀번호"
                  onReset={() => setValue("password", "")}
                  {...inputProps}
                />
                {passwordError && (
                  <InputStatusMessage
                    type={!passwordError ? 'success' : 'error'}
                    message={
                      `기존 비밀번호가 ${!passwordError ? '일치합니다' : '일치하지 않습니다'}`
                    }
                  />
                )}
              </div>
            );
          }}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <div className={commonWrapper({ width: 'full', direction: 'col', align: 'start', gap: 8 })}>
              <InputField
                {...field}
                type="password"
                variants="box"
                placeholder="새 비밀번호를 입력해주세요."
                label="새 비밀번호"
                error={errors?.newPassword?.message}
                onReset={() => setValue("newPassword", "")}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("newPasswordConfirm");
                }}
                {...inputProps}
              />
              {dirtyFields?.newPassword && (
                <div className={commonWrapper({ direction: 'col', gap: 4 })}>
                  {passwordValidation.map(({ rule, message }) => {
                    const isValid = rule(field.value);
                    return (
                      <InputStatusMessage
                        key={message} type={isValid ? 'success' : 'error'}
                        message={message}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        />
        <Controller
          name="newPasswordConfirm"
          control={control}
          render={({ field }) => {
            const newPasswordConfirmError = errors?.newPasswordConfirm?.message;
            return (
              <div className={commonWrapper({ width: 'full', direction: 'col', align: 'start', gap: 8 })}>
                <InputField
                  {...field}
                  type="password"
                  variants="box"
                  placeholder="새 비밀번호를 확인을 입력해주세요."
                  label="새 비밀번호 확인"
                  onReset={() => setValue("newPasswordConfirm", "")}
                  onSubmit={
                    !isValidPasswordForm(getValues("newPassword"))
                      ? handleSubmit(onSubmit)
                      : undefined
                  }
                  {...inputProps}
                />
                {dirtyFields.newPassword && (
                  <InputStatusMessage
                    type={!newPasswordConfirmError ? 'success' : 'error'}
                    message={
                      `비밀번호가 ${!newPasswordConfirmError ? '일치합니다' : '일치하지 않습니다'}`
                    }
                  />
                )}
              </div>
            );
          }}
        />
      </form>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="저장하기"
        onPrimaryClick={handleSubmit(onSubmit)}
        isPrimaryDisabled={!isValidPasswordForm(getValues("newPassword"))}
      />
    </section>
  );
};