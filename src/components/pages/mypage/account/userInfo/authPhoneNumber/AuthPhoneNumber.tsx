import { Control, Controller, FieldErrors, UseFormClearErrors, UseFormSetError, UseFormSetValue } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import { formatPhoneNumber } from "@/utils";
import { UpdateUserInfo } from "@/types/mypage/account";
import { usePhoneAuth } from "@/hooks/usePhoneAuth";

interface AuthPhoneNumberProps {
  phoneNumber: string;
  defaultPhoneNumber: string;
  hasCheckedAuthNumber: boolean;
  authToken: string;
  control: Control<UpdateUserInfo>;
  errors: FieldErrors<UpdateUserInfo>;
  dirtyFields: Partial<UpdateUserInfo>;
  setError: UseFormSetError<UpdateUserInfo>;
  clearErrors: UseFormClearErrors<UpdateUserInfo>;
  setValue: UseFormSetValue<UpdateUserInfo>;
}

export default function AuthPhoneNumber({ 
  phoneNumber,
  defaultPhoneNumber, 
  hasCheckedAuthNumber,
  authToken,
  control,
  errors,
  dirtyFields,
  setError, 
  setValue,
  clearErrors,
}: AuthPhoneNumberProps) {

  const { 
    success, 
    isChangedPhoneNumber,
    requestAuthCode, 
    verifyAuthCode,
    changePhoneNumber,
    resetPhoneNumber,
  } = usePhoneAuth({
    setValue,
    setError,
    clearErrors,
    phoneNumber,
    defaultPhoneNumber,
    hasCheckedAuthNumber,
    authToken,
  });
  
  return (
    <>
      <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <InputField
              value={
                !isChangedPhoneNumber || hasCheckedAuthNumber
                  ? formatPhoneNumber(phoneNumber)
                  : field.value
              }
              onSubmit={() => 
                !isChangedPhoneNumber 
                  ? setValue('phoneNumber', '')
                  : requestAuthCode(field.value as string)
              }
              onChange={(e) => {
                field.onChange(e);
                changePhoneNumber(e);
              }}
              onReset={resetPhoneNumber}
              confirmButton
              confirmButtonText={
                hasCheckedAuthNumber 
                ? "번호변경" 
                : isChangedPhoneNumber
                    && authToken && isChangedPhoneNumber
                      ? "재전송"
                      : "인증번호"
              }
              confirmButtonDisabled={!phoneNumber}
              clearButton={
                isChangedPhoneNumber && 
                !authToken && 
                !hasCheckedAuthNumber
              }
              placeholder="번호만 입력해주세요"
              label="휴대폰 번호"
              isRequired
              disabled={!isChangedPhoneNumber || hasCheckedAuthNumber}
              error={isChangedPhoneNumber ? errors?.phoneNumber?.message : undefined}
              success={hasCheckedAuthNumber ? success : undefined}
            />
          )}
        />
        {!hasCheckedAuthNumber && authToken && isChangedPhoneNumber && (
          <Controller
            name="authCode"
            control={control}
            render={({ field }) => (
              <InputField
                value={field.value as string}
                onChange={(e) => {
                  field.onChange(e);
                }}
                onSubmit={() => verifyAuthCode(field.value as string)}
                error={dirtyFields.authCode ? errors?.authCode?.message : undefined}
                confirmButton
                confirmButtonText="확인"
                confirmButtonDisabled={!field.value}
                placeholder="인증번호를 입력해주세요"
                success={success}
              />
            )}
          />
        )}
    </>
  );
}