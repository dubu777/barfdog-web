"use client";
import * as yup from "yup";
import { commonWrapper } from "@/styles/common.css";
import { Controller } from "react-hook-form";
import InputField from "@/components/ui/inputField/InputField";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import InputStatusMessage from "@/components/ui/inputStatusMessage/InputStatusMessage";
import { useFormHandler } from "@/hooks/useFormHandler";
import { getPasswordCriteria, isValidPassword } from "@/utils/validation/auth/password";
import { useChangePassword } from "@/api/mypage/account/mutations/useChangePassword";
import { ChangePassword as ChangePasswordType } from "@/types/mypage/account";
import { useApiResponseHandler } from "@/hooks/useApiResponseHandler";

const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("비밀번호는 필수입니다."),
  newPassword: yup.string().required("새 비밀번호를 입력해주세요"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "비밀번호가 일치하지 않습니다")
    .required("비밀번호 확인은 필수입니다"),
});

const defaultChangePasswordValues: ChangePasswordType = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function ChangePassword() {
  const {
    handleSubmit,
    control,
    errors,
    reset,
    trigger,
    clearErrors,
    dirtyFields,
    setValue,
    setError,
    isValid,
  } = useFormHandler<ChangePasswordType>(
    changePasswordSchema,
    defaultChangePasswordValues
  );
  
  const { mutate } = useChangePassword();
  const { handleSuccess, handleError } = useApiResponseHandler();

  const onSubmit = (data: ChangePasswordType) => {
    mutate(data, {
      onSuccess: () => {
        handleSuccess('비밀번호 변경이 완료됐습니다', "above-button");
        setTimeout(() => {
          if (window.document.activeElement instanceof HTMLElement) {
            window.document.activeElement.blur();
            clearErrors();
            reset(undefined, { keepErrors: false, keepDirty: false });
          }
        }, 0);
      },
      onError: (error) => {
        const errorMessage = handleError(error, "비밀번호 변경에 실패했습니다.", true);
        
        setError("oldPassword", { message: errorMessage });
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
          name="oldPassword"
          control={control}
          render={({ field }) => {
            const passwordError = errors?.oldPassword?.message;
            return (
              <div className={commonWrapper({ width: 'full', direction: 'col', align: 'start', gap: 8 })}>
                <InputField
                  {...field}
                  type="password"
                  variants="box"
                  placeholder="기존 비밀번호를 입력해주세요."
                  label="기존 비밀번호"
                  onReset={() => setValue("oldPassword", "")}
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
                onReset={() => setValue("newPassword", "", { shouldValidate: true })}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("confirmNewPassword");
                }}
                {...inputProps}
              />
              {dirtyFields?.newPassword && (
                <div className={commonWrapper({ direction: 'col', gap: 4 })}>
                  {getPasswordCriteria(field.value).map(({ label, ok }) => {
                    return (
                      <InputStatusMessage
                        key={label} type={ok ? 'success' : 'error'}
                        message={label}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        />
        <Controller
          name="confirmNewPassword"
          control={control}
          render={({ field }) => {
            const newPasswordConfirmError = errors?.confirmNewPassword?.message;
            return (
              <div className={commonWrapper({ width: 'full', direction: 'col', align: 'start', gap: 8 })}>
                <InputField
                  {...field}
                  type="password"
                  variants="box"
                  placeholder="새 비밀번호를 확인을 입력해주세요."
                  label="새 비밀번호 확인"
                  onReset={() => setValue("confirmNewPassword", "", { shouldValidate: true })}
                  onSubmit={
                    !isValidPassword(field.value)
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
        isPrimaryDisabled={!isValid}
      />
    </section>
  );
};